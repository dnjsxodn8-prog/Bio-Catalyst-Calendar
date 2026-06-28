// scripts/export-telegram.mjs
// /export-telegram <blog_url> [--from=YYYY-MM-DD --to=YYYY-MM-DD] [--dry-run] ...
//
// 지정한 날짜 범위의 catalysts.md events를 Telegram 단일 메시지로 발송.
// 네이버 카드뉴스와 같은 수준: 이벤트마다 날짜·종류·종목·약물·적응증·phase + 관전 포인트(blogNote).
// 한 통이 4096자를 넘으면 이벤트 경계에서만 자동 분할(보통 1통). 사양: specs/007-export-telegram.md.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';
import yaml from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SLEEP_MS = 200;
const TG_LIMIT = 4096;
const SAFE_LIMIT = 3900; // 분할 임계치(여유분 확보).

const SITE_URL = 'https://biotechcatalystcalendar.vercel.app/?v=1';
const DOW = ['일', '월', '화', '수', '목', '금', '토'];

// 카탈리스트 종류 → 이모지 + 한국어 라벨 (네이버 카드 색상 띠와 대응).
const TYPE_LABEL = {
  PDUFA: '🔴 PDUFA',
  'Clinical Readout': '🟠 임상 결과',
  Conference: '🔵 학회 발표',
  Earnings: '⚪ 실적',
  Regulatory: '🟢 규제',
};

// ─── env ────────────────────────────────────────────────
async function loadDotEnv() {
  const envPath = path.join(ROOT, '.env.local');
  let raw;
  try { raw = await fs.readFile(envPath, 'utf8'); }
  catch (e) { if (e.code === 'ENOENT') return; throw e; }
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (process.env[m[1]] === undefined) process.env[m[1]] = val;
  }
}

// ─── args ───────────────────────────────────────────────
function parseArgs(argv) {
  const args = { blogUrl: null, dryRun: false, since: 'HEAD', days: null, from: null, to: null, tickers: null, closingNote: null };
  const ymdRe = /^\d{4}-\d{2}-\d{2}$/;
  for (const a of argv.slice(2)) {
    if (a === '--dry-run') args.dryRun = true;
    else if (a.startsWith('--since=')) args.since = a.slice('--since='.length);
    else if (a.startsWith('--days=')) {
      const n = parseInt(a.slice('--days='.length), 10);
      if (!Number.isFinite(n) || n < 0) throw new Error(`--days는 0 이상 정수여야 함: ${a}`);
      args.days = n;
    }
    else if (a.startsWith('--from=')) {
      const v = a.slice('--from='.length);
      if (!ymdRe.test(v)) throw new Error(`--from은 YYYY-MM-DD 형식: ${a}`);
      args.from = v;
    }
    else if (a.startsWith('--to=')) {
      const v = a.slice('--to='.length);
      if (!ymdRe.test(v)) throw new Error(`--to는 YYYY-MM-DD 형식: ${a}`);
      args.to = v;
    }
    else if (a.startsWith('--tickers=')) {
      const v = a.slice('--tickers='.length).trim();
      if (!v) throw new Error('--tickers 값 필요 (콤마 구분, 예: --tickers=LLY,JNJ,MRK)');
      args.tickers = new Set(v.split(',').map(s => s.trim().toUpperCase()).filter(Boolean));
    }
    else if (a.startsWith('--closing-note=')) {
      args.closingNote = a.slice('--closing-note='.length);
    }
    else if (!a.startsWith('--') && !args.blogUrl) args.blogUrl = a;
    else throw new Error(`알 수 없는 인자: ${a}`);
  }
  if (!args.blogUrl) {
    throw new Error('blog_url 인자 필요. 사용법: node scripts/export-telegram.mjs <blog_url> [--dry-run] [--from=YYYY-MM-DD --to=YYYY-MM-DD] [--since=<ref>] [--days=N] [--tickers=A,B,C]');
  }
  if ((args.from && !args.to) || (!args.from && args.to)) {
    throw new Error('--from / --to는 함께 사용해야 함');
  }
  if (args.from && args.to && args.from > args.to) {
    throw new Error(`--from(${args.from})이 --to(${args.to})보다 늦을 수 없음`);
  }
  return args;
}

function todayLocalYMD() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function addDaysYMD(ymd, days) {
  const d = new Date(`${ymd}T00:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ─── catalysts diff (보조 --since 모드) ──────────────────
function parseEventsFromRaw(raw) {
  const m = raw.match(/```yaml\r?\n([\s\S]*?)```/);
  if (!m) return [];
  const parsed = yaml.parse(m[1]);
  return parsed?.events ?? [];
}

function getPreviousEvents(sinceRef) {
  let raw;
  try {
    raw = execSync(`git show ${sinceRef}:data/catalysts.md`, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return [];
  }
  return parseEventsFromRaw(raw);
}

const eventKey = (e) => `${e.date}__${e.ticker}__${e.event}`;

function findAddedEvents(current, previous) {
  const prev = new Set(previous.map(eventKey));
  return current.filter(e => !prev.has(eventKey(e)));
}

// ─── company name loader (카드 헤더용) ───────────────────
const companyCache = new Map();

async function loadCompanyName(ticker) {
  if (companyCache.has(ticker)) return companyCache.get(ticker);
  let name = null;
  try {
    const raw = await fs.readFile(path.join(ROOT, 'data/companies', `${ticker}.md`), 'utf8');
    const { data: fm } = matter(raw);
    name = fm?.company ?? null;
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  companyCache.set(ticker, name);
  return name;
}

// ─── formatters ─────────────────────────────────────────
function fmtDateShort(d) {
  const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return String(d);
  return `${parseInt(m[2], 10)}/${parseInt(m[3], 10)}`;
}

function dowOf(d) {
  const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return '';
  return DOW[new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDay()];
}

// ─── 단일 digest 메시지 ──────────────────────────────────
function buildEventBlock(e) {
  const tl = TYPE_LABEL[e.type] || String(e.type ?? '');
  const company = companyCache.get(e.ticker);
  const comp = company ? ` (${company})` : '';
  const l1 = `${tl}  ${fmtDateShort(e.date)}(${dowOf(e.date)})  ${e.ticker}${comp}`;
  const ind = e.indication ? ` / ${e.indication}` : '';
  const ph = e.phase ? ` (${e.phase})` : '';
  const l2 = `💊 ${e.drug ?? '?'}${ind}${ph}`;
  const note = e.blogNote ? `\n▶ ${String(e.blogNote).trim()}` : '';
  return `${l1}\n${l2}${note}`;
}

function buildHeader(events) {
  const dates = events.map(e => e.date).filter(Boolean).sort();
  const range = dates.length
    ? `${fmtDateShort(dates[0])}~${fmtDateShort(dates[dates.length - 1])}`
    : '';
  return `🧬 이번 주 Bio Catalyst (${range}), ${events.length}건\n${SITE_URL}`;
}

function buildFooter(blogUrl, note) {
  const prefix = note ? `${note}` : '📝 블로그에도 정리해뒀음';
  return `${prefix}\n${blogUrl}`;
}

// 이벤트 블록들을 4096자 한도 안에서 메시지로 묶음. 보통 1통.
// header는 첫 통에만, footer는 마지막 통에 붙임(넘치면 footer 단독 통).
function buildMessages(events, blogUrl, closingNote) {
  const header = buildHeader(events);
  const footer = buildFooter(blogUrl, closingNote);
  const blocks = events.map(buildEventBlock);

  const messages = [];
  let cur = header;
  for (const b of blocks) {
    const candidate = `${cur}\n\n${b}`;
    if ([...candidate].length > SAFE_LIMIT) {
      messages.push(cur);
      cur = b;
    } else {
      cur = candidate;
    }
  }
  // footer 붙이기
  const withFooter = `${cur}\n\n${footer}`;
  if ([...withFooter].length > TG_LIMIT) {
    messages.push(cur);
    messages.push(footer);
  } else {
    messages.push(withFooter);
  }
  return messages;
}

// ─── send ───────────────────────────────────────────────
async function sendMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error('TELEGRAM_BOT_TOKEN 또는 TELEGRAM_CHAT_ID 환경변수 누락. .env.local을 확인하세요.');
  }
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ─── main ───────────────────────────────────────────────
async function main() {
  const args = parseArgs(process.argv);
  await loadDotEnv();

  const currentRaw = await fs.readFile(path.join(ROOT, 'data/catalysts.md'), 'utf8');
  const current = parseEventsFromRaw(currentRaw);

  let added;
  if (args.from && args.to) {
    added = current
      .filter(e => typeof e.date === 'string' && e.date >= args.from && e.date <= args.to)
      .sort((a, b) => a.date.localeCompare(b.date) || a.ticker.localeCompare(b.ticker));
    console.error(`📅 --from=${args.from} --to=${args.to} (date-range mode): ${added.length}건`);
    if (added.length === 0) { console.error('⚠️  해당 기간 events 없음. 종료.'); process.exit(0); }
  } else {
    const previous = getPreviousEvents(args.since);
    added = findAddedEvents(current, previous);
    if (added.length === 0) { console.error(`⚠️  ${args.since} 대비 추가된 events 없음. 종료.`); process.exit(0); }
    if (args.days != null) {
      const todayYmd = todayLocalYMD();
      const cutoffYmd = addDaysYMD(todayYmd, args.days);
      const before = added.length;
      added = added.filter(e => typeof e.date === 'string' && e.date >= todayYmd && e.date <= cutoffYmd);
      console.error(`📅 --days=${args.days} 필터 (${todayYmd} ~ ${cutoffYmd}): ${before}건 → ${added.length}건`);
      if (added.length === 0) { console.error('⚠️  필터 후 남은 events 없음. 종료.'); process.exit(0); }
    }
    added.sort((a, b) => String(a.date).localeCompare(String(b.date)) || String(a.ticker).localeCompare(String(b.ticker)));
  }

  if (args.tickers) {
    const before = added.length;
    added = added.filter(e => args.tickers.has(String(e.ticker).toUpperCase()));
    console.error(`🎯 --tickers=${[...args.tickers].join(',')}: ${before}건 → ${added.length}건`);
    if (added.length === 0) { console.error('⚠️  ticker 필터 후 남은 events 없음. 종료.'); process.exit(0); }
  }

  for (const e of added) await loadCompanyName(e.ticker);

  // blogNote 누락 경고 (관전 포인트 줄이 빠짐).
  for (const e of added) {
    if (!e.blogNote) console.error(`⚠️  ${e.ticker} ${e.date}: blogNote 없음 → 관전 포인트 줄 생략`);
  }

  const messages = buildMessages(added, args.blogUrl, args.closingNote);

  if (args.dryRun) {
    console.log(`\n=== DRY RUN — 총 ${messages.length}통 (events ${added.length}) ===\n`);
    messages.forEach((m, i) => {
      console.log(`--- [${i + 1}/${messages.length}] (${[...m].length} chars) ---`);
      console.log(m);
      console.log();
    });
    return;
  }

  console.log(`📤 발송: 총 ${messages.length}통 (events ${added.length})`);
  for (let i = 0; i < messages.length; i++) {
    try {
      await sendMessage(messages[i]);
      console.log(`  ✓ [${i + 1}/${messages.length}]`);
    } catch (err) {
      console.error(`  ✗ [${i + 1}/${messages.length}] 실패: ${err.message}`);
      console.error(`  → 발송 ${i}통, 실패 시점 ${i + 1}, 미발송 ${messages.length - i - 1}통`);
      process.exit(1);
    }
    if (i < messages.length - 1) await sleep(SLEEP_MS);
  }
  console.log('✅ 전체 발송 완료');
}

main().catch(err => {
  console.error('export-telegram 실패:', err.message);
  process.exit(1);
});
