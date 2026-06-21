// scripts/sunday-prep.mjs
// 일요일 아침 "무인 준비" 단계. git 작업·리서치·발송은 하지 않는다 (그건 대화형 /sunday 몫).
//   1) 주가 fetch (--stale-days 1)  2) build-data  3) 네이버 HTML 생성  4) 텔레그램 "준비완료" 알림
// 사용법:
//   node scripts/sunday-prep.mjs                 # 기본 (윈도우 today~today+7)
//   node scripts/sunday-prep.mjs --days=10       # 윈도우 폭 조정
//   node scripts/sunday-prep.mjs --dry           # 텔레그램 발송 안 함 (테스트)
//   node scripts/sunday-prep.mjs --skip-prices   # 주가 fetch 건너뜀 (테스트)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ─── args ───
const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const getNum = (name, def) => {
  const a = argv.find((x) => x.startsWith(name + '='));
  if (!a) return def;
  const n = parseInt(a.slice(name.length + 1), 10);
  return Number.isFinite(n) && n >= 0 ? n : def;
};
const DRY = has('--dry');
const SKIP_PRICES = has('--skip-prices');
const DAYS = getNum('--days', 7);

// ─── env (.env.local) ───
async function loadDotEnv() {
  const envPath = path.join(ROOT, '.env.local');
  let raw;
  try { raw = await fs.readFile(envPath, 'utf8'); }
  catch (e) { if (e.code === 'ENOENT') return; throw e; }
  for (const line of raw.split('\n')) {
    const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = val;
  }
}

// ─── date helpers (KST) ───
function todayKST() {
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' });
  return fmt.format(new Date()); // YYYY-MM-DD
}
function addDaysYMD(ymd, n) {
  const [y, m, d] = ymd.split('-').map(Number);
  const t = Date.UTC(y, m - 1, d) + n * 86400000;
  const dt = new Date(t);
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`;
}

function run(cmd, args) {
  return execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('TELEGRAM_BOT_TOKEN/CHAT_ID 누락 (.env.local 확인)');
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`);
}

async function main() {
  await loadDotEnv();
  const today = todayKST();
  const to = addDaysYMD(today, DAYS);

  // 1) 주가
  let priceLine = '주가: (건너뜀)';
  if (!SKIP_PRICES) {
    const out = run(process.execPath, ['scripts/fetch-prices.mjs', '--stale-days', '1']);
    const ok = (out.match(/success:\s*(\d+)/) || [])[1] ?? '?';
    const skip = (out.match(/skipped:\s*(\d+)/) || [])[1] ?? '0';
    priceLine = `주가: ${ok}종목 갱신 (skip ${skip})`;
  }

  // 2) build-data
  run(process.execPath, ['scripts/build-data.mjs']);

  // 3) 네이버 HTML
  const naverOut = run(process.execPath, ['scripts/build-naver-export.mjs', `--from`, today, `--to`, to]);
  const count = (naverOut.match(/catalysts in window:\s*(\d+)/) || [])[1] ?? '?';
  const htmlAbs = path.join(ROOT, 'data', 'imports', `naver-export-${today}.html`).replace(/\//g, '\\');

  // 4) 알림 텍스트
  const msg = [
    `🗓️ 일요일 준비 완료 — ${today}`,
    '',
    `📈 ${priceLine}`,
    `📅 카탈리스트 윈도우 ${today}~${to}: ${count}건`,
    `📄 네이버 HTML:`,
    htmlAbs,
    '',
    `노트북에서 Claude 열고 → /sunday 실행하세요.`,
    `(주가·빌드·HTML 준비됨 → 1단계 "주가는 이미 했어"로 건너뛰기 가능)`,
    Number(count) === 0 ? `※ 윈도우 ${count}건 — /sunday에서 윈도우 확장 검토` : '',
  ].filter((l) => l !== '').join('\n');

  if (DRY) {
    console.log('--- DRY (텔레그램 미발송) ---');
    console.log(msg);
  } else {
    await sendTelegram(msg);
    console.log('✅ 준비 완료 + 텔레그램 알림 발송');
    console.log(msg);
  }
}

main().catch((e) => { console.error('✗ sunday-prep 실패:', e.message); process.exit(1); });
