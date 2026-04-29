// scripts/export-telegram.mjs
// /export-telegram <blog_url> [--dry-run] [--since=<git-ref>] [--summary-only]
//
// 직전 /update에서 data/catalysts.md에 추가된 events를 Telegram으로 발송.
// Summary 1+통 (전체 한 줄 요약 + blog link) + 이벤트당 detail 1통 (4 섹션).
// 자세한 사양은 specs/007-export-telegram.md.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import matter from 'gray-matter';
import yaml from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SLEEP_MS = 200;

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
  const args = { blogUrl: null, dryRun: false, since: 'HEAD', summaryOnly: false };
  for (const a of argv.slice(2)) {
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--summary-only') args.summaryOnly = true;
    else if (a.startsWith('--since=')) args.since = a.slice('--since='.length);
    else if (!a.startsWith('--') && !args.blogUrl) args.blogUrl = a;
    else throw new Error(`알 수 없는 인자: ${a}`);
  }
  if (!args.blogUrl) {
    throw new Error('blog_url 인자 필요. 사용법: node scripts/export-telegram.mjs <blog_url> [--dry-run] [--since=<ref>] [--summary-only]');
  }
  return args;
}

// ─── catalysts diff ─────────────────────────────────────
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

// ─── company loader ─────────────────────────────────────
const companyCache = new Map();

async function loadCompany(ticker) {
  if (companyCache.has(ticker)) return companyCache.get(ticker);
  const filePath = path.join(ROOT, 'data/companies', `${ticker}.md`);
  let data = null;
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data: fm, content: body } = matter(raw);
    data = { ...fm, overview: extractOverview(body) };
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  companyCache.set(ticker, data);
  return data;
}

function extractOverview(body) {
  const lines = body.split('\n');
  let inSection = false;
  const buf = [];
  for (const line of lines) {
    if (/^##\s+회사 개요\s*$/.test(line)) { inSection = true; continue; }
    if (!inSection) continue;
    if (/^##\s/.test(line)) break;
    if (line.trim() === '') {
      if (buf.length === 0) continue;
      break;
    }
    buf.push(line.trim());
  }
  return buf.join(' ').trim() || null;
}

// ─── formatters ─────────────────────────────────────────
function fmtMcap(mcap) {
  if (typeof mcap !== 'number' || !Number.isFinite(mcap)) return '?';
  if (mcap >= 1000) {
    const v = mcap / 1000;
    return `$${Number.isInteger(v) ? v : v.toFixed(1)}B`;
  }
  return `$${mcap}M`;
}

function fmtDateShort(d) {
  const m = String(d).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return String(d);
  return `${parseInt(m[2], 10)}/${parseInt(m[3], 10)}`;
}

function typeShort(type, phase) {
  switch (type) {
    case 'PDUFA': return 'PDUFA';
    case 'Clinical Readout': return phase ? `${phase} readout` : 'readout';
    case 'Conference': return '발표';
    case 'Earnings': return '실적';
    case 'Regulatory': return '규제';
    default: return String(type ?? '');
  }
}

function rankSource(url) {
  if (!url) return 99;
  let u;
  try { u = new URL(url); } catch { return 99; }
  const h = u.hostname.toLowerCase();
  const p = u.pathname.toLowerCase();
  if (h.includes('fda.gov') || h.includes('ema.europa.eu')) return 1;
  if (h.includes('sec.gov')) return 2;
  if (/^investor\./.test(h) || /\/(news|press|ir)/.test(p)) return 3;
  if (/(reuters|fiercebiotech|endpts|biopharmadive|statnews|nature)\.com$/.test(h)) return 4;
  return 5;
}

function pickPrimarySource(sources) {
  if (!Array.isArray(sources) || sources.length === 0) return null;
  return [...sources].sort((a, b) => rankSource(a) - rankSource(b))[0];
}

function extractNctId(url) {
  const m = String(url).match(/NCT\d+/i);
  return m ? m[0].toUpperCase() : null;
}

// ─── messages ───────────────────────────────────────────
function buildSummary(events, blogUrl) {
  const dates = events.map(e => e.date).filter(Boolean).sort();
  const range = dates.length > 0
    ? `${fmtDateShort(dates[0])} - ${fmtDateShort(dates[dates.length - 1])}`
    : '';

  const chunks = [];
  for (let i = 0; i < events.length; i += 5) chunks.push(events.slice(i, i + 5));

  return chunks.map((chunk, idx) => {
    const isFirst = idx === 0;
    const isLast = idx === chunks.length - 1;
    const head = isFirst
      ? `🧬 이번 주 Bio Catalyst (${range})`
      : `🧬 이번 주 Bio Catalyst (이어서)`;
    const lines = chunk.map(e => {
      const c = companyCache.get(e.ticker);
      const mcap = fmtMcap(c?.mcap);
      const ts = typeShort(e.type, e.phase);
      return `• ${e.ticker} (${mcap}) — ${fmtDateShort(e.date)} ${ts}: ${e.drug ?? '?'} (${e.indication ?? '?'})`;
    });
    const footer = isLast ? `\n\n📝 자세한 분석 → ${blogUrl}` : '';
    return `${head}\n\n${lines.join('\n')}${footer}`;
  });
}

function buildDetail(event) {
  if (!Array.isArray(event.sources) || event.sources.length === 0) {
    return { skip: true, reason: 'sources 없음' };
  }
  const c = companyCache.get(event.ticker);
  const primary = pickPrimarySource(event.sources);
  const ts = typeShort(event.type, event.phase);
  const dateShort = fmtDateShort(event.date);

  const sections = [];

  // Header
  sections.push(`🧬 ${event.ticker} — ${event.drug ?? '?'} ${ts} (${dateShort})`);

  // §1 카탈리스트
  const sec1 = ['📌 카탈리스트'];
  sec1.push(`${event.drug ?? '?'} / ${event.phase ?? '?'} / ${dateShort} ${ts}`);
  sec1.push(`출처 → ${primary}`);
  sections.push(sec1.join('\n'));

  // §2 기업 개요
  if (c?.overview) {
    const sec2 = [`🏢 기업 개요 (${fmtMcap(c?.mcap)})`];
    sec2.push(c.overview);
    sections.push(sec2.join('\n'));
  }

  // §3 임상 정보
  const sec3 = [];
  if (event.trialDesign) sec3.push(String(event.trialDesign).trim());
  if (event.targetDisease) sec3.push(`적응증: ${String(event.targetDisease).trim()}`);
  if (event.priorTrialUrl) {
    const nct = extractNctId(event.priorTrialUrl);
    sec3.push(`사전 공개: ${nct ?? event.priorTrialUrl}`);
  }
  if (sec3.length > 0) sections.push(['🧪 임상 정보', ...sec3].join('\n'));

  // §4 약물 정보
  const sec4 = [];
  if (c?.modality) sec4.push(`Modality: ${c.modality}`);
  if (event.moa) sec4.push(`MoA: ${String(event.moa).trim()}`);
  if (sec4.length > 0) sections.push(['💊 약물 정보', ...sec4].join('\n'));

  return { skip: false, text: sections.join('\n\n').trimEnd() };
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
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
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
  const previous = getPreviousEvents(args.since);
  const added = findAddedEvents(current, previous);

  if (added.length === 0) {
    console.error(`⚠️  ${args.since} 대비 추가된 events 없음. 종료.`);
    process.exit(0);
  }

  for (const e of added) await loadCompany(e.ticker);

  // 누락 필드 경고
  for (const e of added) {
    const missing = [];
    if (!e.trialDesign) missing.push('trialDesign');
    if (!e.targetDisease) missing.push('targetDisease');
    if (!e.priorTrialUrl) missing.push('priorTrialUrl');
    if (!e.moa) missing.push('moa');
    if (missing.length > 0) {
      console.error(`⚠️  ${e.ticker} ${e.event}: 누락 [${missing.join(', ')}] → 해당 줄/섹션 자동 생략`);
    }
  }

  const summaryChunks = buildSummary(added, args.blogUrl);

  const detailMessages = [];
  if (!args.summaryOnly) {
    for (const e of added) {
      const d = buildDetail(e);
      if (d.skip) {
        console.error(`⚠️  ${e.ticker} ${e.event}: detail 스킵 (${d.reason})`);
        continue;
      }
      detailMessages.push(d.text);
    }
  }

  const all = [...summaryChunks, ...detailMessages];

  if (args.dryRun) {
    console.log(`\n=== DRY RUN — 총 ${all.length}통 ===\n`);
    all.forEach((m, i) => {
      console.log(`--- [${i + 1}/${all.length}] (${m.length} chars) ---`);
      console.log(m);
      console.log();
    });
    return;
  }

  console.log(`📤 발송: 총 ${all.length}통 (summary ${summaryChunks.length} + detail ${detailMessages.length})`);
  for (let i = 0; i < all.length; i++) {
    try {
      await sendMessage(all[i]);
      console.log(`  ✓ [${i + 1}/${all.length}]`);
    } catch (err) {
      console.error(`  ✗ [${i + 1}/${all.length}] 실패: ${err.message}`);
      console.error(`  → 발송 ${i}통, 실패 시점 ${i + 1}, 미발송 ${all.length - i - 1}통`);
      process.exit(1);
    }
    if (i < all.length - 1) await sleep(SLEEP_MS);
  }
  console.log(`✅ 전체 발송 완료`);
}

main().catch(err => {
  console.error('export-telegram 실패:', err.message);
  process.exit(1);
});
