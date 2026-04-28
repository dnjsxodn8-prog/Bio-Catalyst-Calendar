// scripts/fetch-prices.mjs
// Yahoo Finance에서 일봉 종가를 받아 data/prices/{TICKER}.json에 캐시.
// spec 004 §2 (4-A) 참조.
//
// 사용:
//   node scripts/fetch-prices.mjs                       # 전체 갱신
//   node scripts/fetch-prices.mjs --tickers LLY,VRTX   # 특정 종목
//   node scripts/fetch-prices.mjs --stale-days 7       # 7일 이상 오래된 것만
//   node scripts/fetch-prices.mjs --limit 5            # 안전 상한
//   node scripts/fetch-prices.mjs --dry-run            # 저장 X, 응답 확인만

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PRICES_DIR = path.join(ROOT, 'data/prices');
const COMPANIES_DIR = path.join(ROOT, 'data/companies');

const LOOKBACK_DAYS = 45;       // 캘린더일 — 거래일 30개 여유
const KEEP_TRADING_DAYS = 30;
const THROTTLE_MS = 80;         // 분당 ~750콜. 야후 비공식이라 보수적.

function parseArgs(argv) {
  const args = { tickers: null, staleDays: null, limit: null, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tickers') {
      args.tickers = argv[++i].split(',').map((t) => t.trim().toUpperCase()).filter(Boolean);
    } else if (a === '--stale-days') {
      args.staleDays = parseInt(argv[++i], 10);
    } else if (a === '--limit') {
      args.limit = parseInt(argv[++i], 10);
    } else if (a === '--dry-run') {
      args.dryRun = true;
    } else {
      console.error(`unknown arg: ${a}`);
      process.exit(2);
    }
  }
  return args;
}

async function loadAllTickers() {
  const files = (await fs.readdir(COMPANIES_DIR)).filter((f) => f.endsWith('.md'));
  const tickers = [];
  for (const file of files) {
    const raw = await fs.readFile(path.join(COMPANIES_DIR, file), 'utf8');
    const { data: fm } = matter(raw);
    if (fm.ticker) tickers.push(String(fm.ticker).toUpperCase());
  }
  return tickers;
}

async function isStale(ticker, days) {
  try {
    const cache = JSON.parse(await fs.readFile(path.join(PRICES_DIR, `${ticker}.json`), 'utf8'));
    const ageDays = (Date.now() - new Date(cache.fetched).getTime()) / 86_400_000;
    return ageDays >= days;
  } catch {
    return true;
  }
}

async function fetchTicker(ticker) {
  const period1 = new Date(Date.now() - LOOKBACK_DAYS * 86_400_000);
  const period2 = new Date();

  const result = await yahooFinance.chart(ticker, {
    period1,
    period2,
    interval: '1d',
  });

  const quotes = (result?.quotes ?? []).filter((q) => q && q.close != null && q.date);
  if (quotes.length === 0) {
    throw new Error('empty quotes');
  }

  const data = quotes.slice(-KEEP_TRADING_DAYS).map((q) => ({
    date: new Date(q.date).toISOString().slice(0, 10),
    close: Math.round(q.close * 100) / 100,
  }));

  return {
    ticker,
    fetched: new Date().toISOString(),
    source: 'yahoo',
    currency: result?.meta?.currency ?? 'USD',
    data,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  let tickers = args.tickers ?? (await loadAllTickers());

  if (args.staleDays != null) {
    const stale = [];
    for (const t of tickers) if (await isStale(t, args.staleDays)) stale.push(t);
    tickers = stale;
  }

  if (args.limit != null) tickers = tickers.slice(0, args.limit);

  if (tickers.length === 0) {
    console.log('(대상 ticker 0개)');
    return;
  }

  console.log(
    `📈 fetch-prices: ${tickers.length} tickers (source: yahoo)${args.dryRun ? ' [dry-run]' : ''}`,
  );

  await fs.mkdir(PRICES_DIR, { recursive: true });

  // 야후의 1회성 survey notice 억제
  try { yahooFinance.suppressNotices?.(['yahooSurvey']); } catch { /* 무시 */ }

  const results = { success: [], skipped: [], failed: [] };

  for (let i = 0; i < tickers.length; i++) {
    const ticker = tickers[i];
    process.stdout.write(`[${i + 1}/${tickers.length}] ${ticker} ... `);
    try {
      const cache = await fetchTicker(ticker);
      if (!args.dryRun) {
        await fs.writeFile(
          path.join(PRICES_DIR, `${ticker}.json`),
          JSON.stringify(cache, null, 2),
          'utf8',
        );
      }
      const last = cache.data.at(-1);
      console.log(`OK (${cache.data.length}d, last ${last?.date} $${last?.close})`);
      results.success.push(ticker);
    } catch (err) {
      const msg = (err && err.message) || String(err);
      if (/not found|invalid|HTTP 404|No data|empty quotes|Schema validation/i.test(msg)) {
        console.log(`skip (${msg.slice(0, 60)})`);
        results.skipped.push(ticker);
      } else {
        console.log(`FAIL: ${msg.slice(0, 100)}`);
        results.failed.push({ ticker, msg });
      }
    }
    if (i < tickers.length - 1) {
      await new Promise((r) => setTimeout(r, THROTTLE_MS));
    }
  }

  console.log('\n──────────────────────────');
  console.log(`✅ success: ${results.success.length}`);
  if (results.skipped.length) {
    console.log(`⊘  skipped: ${results.skipped.length} (${results.skipped.join(', ')})`);
  }
  if (results.failed.length) {
    console.log(`❌ failed:  ${results.failed.length}`);
    for (const f of results.failed) console.log(`   ${f.ticker}: ${f.msg.slice(0, 100)}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('fetch-prices 실패:', err);
  process.exit(1);
});
