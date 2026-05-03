// scripts/apply-mcap-updates.mjs
// Yahoo Finance 시총으로 frontmatter `mcap` 갱신. `verified` 도 today로.
// LLM 토큰 0. check-mcap.mjs 기반.
//
// 사용:
//   node scripts/apply-mcap-updates.mjs --dry-run         # 변경 사항 미리보기 (default)
//   node scripts/apply-mcap-updates.mjs --apply           # 실제 적용
//   node scripts/apply-mcap-updates.mjs --threshold 20    # ±N% 이상만 (기본 20)
//   node scripts/apply-mcap-updates.mjs --skip ALDX,ATRA,SGMO,VTVT  # 데이터 오류 의심 제외

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
  const args = { apply: false, threshold: 20, skip: new Set() };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--apply') args.apply = true;
    else if (a === '--dry-run') args.apply = false;
    else if (a === '--threshold') args.threshold = parseFloat(argv[++i]);
    else if (a === '--skip') args.skip = new Set(argv[++i].split(',').map((t) => t.trim().toUpperCase()));
  }
  return args;
}

// 100M 미만은 스킵 (CLAUDE.md 규칙 4)
// 1단위 정수, 합리적 round
function roundMcap(yahooM) {
  if (yahooM >= 100000) return Math.round(yahooM / 1000) * 1000;
  if (yahooM >= 10000) return Math.round(yahooM / 100) * 100;
  if (yahooM >= 1000) return Math.round(yahooM / 50) * 50;
  if (yahooM >= 100) return Math.round(yahooM / 10) * 10;
  return Math.round(yahooM);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const today = new Date().toISOString().slice(0, 10);
  console.log(`📊 apply-mcap-updates ${args.apply ? '[APPLY]' : '[DRY-RUN]'} threshold=±${args.threshold}% skip=${[...args.skip].join(',') || 'none'}\n`);

  try { yahooFinance.suppressNotices?.(['yahooSurvey']); } catch { /* */ }

  const files = (await fs.readdir(COMPANIES_DIR)).filter((f) => f.endsWith('.md'));
  const updates = [];
  const skipped = [];
  const belowFloor = [];

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const filepath = path.join(COMPANIES_DIR, f);
    const raw = await fs.readFile(filepath, 'utf8');
    const { data: fm, content: body } = matter(raw);
    if (!fm.ticker || fm.mcap == null) continue;
    const ticker = String(fm.ticker).toUpperCase();
    const mdMcap = Number(fm.mcap);

    if (args.skip.has(ticker)) {
      skipped.push({ ticker, reason: 'skip' });
      continue;
    }

    let q;
    try {
      q = await yahooFinance.quote(ticker, { fields: ['marketCap', 'regularMarketPrice'] });
    } catch (e) {
      skipped.push({ ticker, reason: 'fetch_error: ' + (e?.message || e).slice(0, 60) });
      await new Promise((r) => setTimeout(r, THROTTLE_MS));
      continue;
    }
    if (!q?.marketCap) {
      skipped.push({ ticker, reason: 'no_mcap_data' });
      await new Promise((r) => setTimeout(r, THROTTLE_MS));
      continue;
    }

    const yahooMM = q.marketCap / 1e6;
    const newMcap = roundMcap(yahooMM);
    const diffPct = ((yahooMM - mdMcap) / mdMcap) * 100;

    // < $100M 종목은 별도 보고 (제거 후보)
    if (newMcap < 100) {
      belowFloor.push({ ticker, mdMcap, yahooMcap: Math.round(yahooMM), newMcap });
      await new Promise((r) => setTimeout(r, THROTTLE_MS));
      continue;
    }

    if (Math.abs(diffPct) < args.threshold) {
      // 변경 불필요
    } else if (newMcap !== mdMcap) {
      updates.push({ ticker, file: f, mdMcap, newMcap, yahooRaw: Math.round(yahooMM), diffPct });
    }

    await new Promise((r) => setTimeout(r, THROTTLE_MS));
  }

  // 결과
  console.log(`✓ updates planned: ${updates.length}`);
  console.log(`⚠ below $100M floor: ${belowFloor.length}`);
  console.log(`⊘ skipped: ${skipped.length}`);

  if (updates.length) {
    console.log('\n--- updates (sorted by |diff%|) ---');
    updates.sort((a, b) => Math.abs(b.diffPct) - Math.abs(a.diffPct));
    for (const u of updates) {
      console.log(`  ${u.ticker.padEnd(6)} ${String(u.mdMcap).padStart(7)}M → ${String(u.newMcap).padStart(7)}M (Yahoo raw ${u.yahooRaw}M, ${u.diffPct > 0 ? '+' : ''}${u.diffPct.toFixed(1)}%)`);
    }
  }
  if (belowFloor.length) {
    console.log('\n--- below $100M floor (제거 후보, mcap·verified 갱신 X) ---');
    for (const b of belowFloor) {
      console.log(`  ${b.ticker.padEnd(6)} md ${b.mdMcap}M → Yahoo ${b.yahooMcap}M`);
    }
  }
  if (skipped.length && args.apply) {
    console.log('\n--- skipped ---');
    for (const s of skipped) console.log(`  ${s.ticker}: ${s.reason}`);
  }

  if (!args.apply) {
    console.log('\n[DRY-RUN] 변경 적용하려면 --apply 추가.');
    return;
  }

  // 실제 적용 — regex 기반 (matter.stringify는 YAML 재포맷이 심해서 사용 X)
  for (const u of updates) {
    const filepath = path.join(COMPANIES_DIR, u.file);
    let raw = await fs.readFile(filepath, 'utf8');
    // mcap: 숫자 → 새 숫자
    raw = raw.replace(/^mcap:\s*\d+\s*$/m, `mcap: ${u.newMcap}`);
    // verified: 날짜 → today (있으면 교체, 없으면 추가는 안 함 — 정상 파일은 모두 있음)
    raw = raw.replace(/^verified:\s*['"]?\d{4}-\d{2}-\d{2}['"]?\s*$/m, `verified: ${today}`);
    await fs.writeFile(filepath, raw, 'utf8');
  }
  console.log(`\n✅ ${updates.length}개 파일 갱신 완료 (verified=${today}).`);
}

main().catch((e) => { console.error(e); process.exit(1); });
