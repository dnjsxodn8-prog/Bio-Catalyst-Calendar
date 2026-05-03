// scripts/check-mcap.mjs
// Yahoo Finance 시가총액과 frontmatter mcap 비교. LLM 토큰 0.
// 사용:
//   node scripts/check-mcap.mjs                   # 전체
//   node scripts/check-mcap.mjs --tickers LLY,VRTX
//   node scripts/check-mcap.mjs --threshold 25    # ±25% 이상만 보고
//   node scripts/check-mcap.mjs --json            # JSON 출력 (보고서용)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPANIES_DIR = path.join(ROOT, 'data/companies');
const THROTTLE_MS = 80;

function parseArgs(argv) {
  const args = { tickers: null, threshold: 20, json: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tickers') args.tickers = argv[++i].split(',').map((t) => t.trim().toUpperCase());
    else if (a === '--threshold') args.threshold = parseFloat(argv[++i]);
    else if (a === '--json') args.json = true;
  }
  return args;
}

async function loadCompanies() {
  const files = (await fs.readdir(COMPANIES_DIR)).filter((f) => f.endsWith('.md'));
  const out = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(COMPANIES_DIR, f), 'utf8');
    const { data: fm } = matter(raw);
    if (fm.ticker && fm.mcap != null) {
      out.push({ ticker: String(fm.ticker).toUpperCase(), mcap: Number(fm.mcap), file: f });
    }
  }
  return out;
}

async function fetchYahoo(ticker) {
  try {
    const q = await yahooFinance.quote(ticker, { fields: ['marketCap', 'regularMarketPrice', 'currency'] });
    if (!q || q.marketCap == null) return null;
    return {
      marketCap: q.marketCap,            // 단위: 실제 달러
      mcapMillions: Math.round(q.marketCap / 1e6),
      currency: q.currency || 'USD',
      price: q.regularMarketPrice,
    };
  } catch (err) {
    return { error: (err && err.message) || String(err) };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let companies = await loadCompanies();
  if (args.tickers) companies = companies.filter((c) => args.tickers.includes(c.ticker));

  if (!args.json) {
    console.log(`📊 check-mcap: ${companies.length} tickers (threshold ±${args.threshold}%)`);
  }

  try { yahooFinance.suppressNotices?.(['yahooSurvey']); } catch { /* */ }

  const results = [];
  for (let i = 0; i < companies.length; i++) {
    const c = companies[i];
    const y = await fetchYahoo(c.ticker);
    let status, diffPct;
    if (!y) {
      status = 'no_data';
    } else if (y.error) {
      status = 'fetch_error';
    } else {
      diffPct = ((y.mcapMillions - c.mcap) / c.mcap) * 100;
      status = Math.abs(diffPct) >= args.threshold ? 'mismatch' : 'ok';
    }
    results.push({ ticker: c.ticker, file: c.file, mdMcap: c.mcap, yahoo: y, diffPct, status });
    if (!args.json) {
      const tag =
        status === 'ok' ? '✓' :
        status === 'mismatch' ? '⚠' :
        status === 'no_data' ? '⊘' : '❌';
      const detail = y && y.mcapMillions != null
        ? `md ${c.mcap}M vs Yahoo ${y.mcapMillions}M (${diffPct > 0 ? '+' : ''}${diffPct?.toFixed(1)}%)`
        : (y?.error?.slice(0, 60) || 'no data');
      process.stdout.write(`[${i + 1}/${companies.length}] ${tag} ${c.ticker.padEnd(6)} ${detail}\n`);
    }
    if (i < companies.length - 1) await new Promise((r) => setTimeout(r, THROTTLE_MS));
  }

  if (args.json) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  const ok = results.filter((r) => r.status === 'ok').length;
  const mismatch = results.filter((r) => r.status === 'mismatch');
  const noData = results.filter((r) => r.status === 'no_data').length;
  const fetchErr = results.filter((r) => r.status === 'fetch_error').length;

  console.log('\n──────────────────────────');
  console.log(`✓ OK:        ${ok}`);
  console.log(`⚠ mismatch:  ${mismatch.length} (>= ±${args.threshold}%)`);
  console.log(`⊘ no_data:   ${noData}`);
  console.log(`❌ error:     ${fetchErr}`);
  if (mismatch.length) {
    console.log('\n--- mismatch 상세 (큰 차이순) ---');
    mismatch.sort((a, b) => Math.abs(b.diffPct) - Math.abs(a.diffPct));
    for (const m of mismatch) {
      console.log(`  ${m.ticker.padEnd(6)} md ${m.mdMcap}M → Yahoo ${m.yahoo.mcapMillions}M (${m.diffPct > 0 ? '+' : ''}${m.diffPct.toFixed(1)}%)`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
