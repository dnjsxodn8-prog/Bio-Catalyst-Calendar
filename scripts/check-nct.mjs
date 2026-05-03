// scripts/check-nct.mjs
// 모든 companies/*.md 에서 NCT 번호 추출 → ClinicalTrials.gov v2 API로 상태/phase/sponsor 조회.
// LLM 토큰 0. 본문 fact-check는 후속 단계(Sonnet)에서.
//
// 사용:
//   node scripts/check-nct.mjs                    # 전체
//   node scripts/check-nct.mjs --tickers LLY,VRTX
//   node scripts/check-nct.mjs --json
//   node scripts/check-nct.mjs --flagged-only     # 종료/철회된 trial만
//
// 출력:
//   per-company: NCT id → phase, status, sponsor
//   요약: 전체 NCT 수, 404 수, 종료/철회 수

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPANIES_DIR = path.join(ROOT, 'data/companies');
const API = 'https://clinicaltrials.gov/api/v2/studies';
const THROTTLE_MS = 120;

// 우리가 본문에서 "ongoing/active"로 묘사할 가능성이 높은데, 실제는 종료된 케이스
const FLAG_STATUSES = new Set([
  'TERMINATED',
  'WITHDRAWN',
  'SUSPENDED',
  'NO_LONGER_AVAILABLE',
]);

function parseArgs(argv) {
  const args = { tickers: null, json: false, flaggedOnly: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--tickers') args.tickers = argv[++i].split(',').map((t) => t.trim().toUpperCase());
    else if (a === '--json') args.json = true;
    else if (a === '--flagged-only') args.flaggedOnly = true;
  }
  return args;
}

async function loadCompaniesWithNCT() {
  const files = (await fs.readdir(COMPANIES_DIR)).filter((f) => f.endsWith('.md'));
  const out = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(COMPANIES_DIR, f), 'utf8');
    const { data: fm } = matter(raw);
    const ticker = fm.ticker ? String(fm.ticker).toUpperCase() : null;
    if (!ticker) continue;
    const ids = Array.from(new Set(raw.match(/NCT\d{8}/g) || []));
    if (ids.length) out.push({ ticker, file: f, nctIds: ids });
  }
  return out;
}

async function fetchStudy(nctId) {
  try {
    const url = `${API}/${nctId}?fields=NCTId|BriefTitle|OverallStatus|Phase|LeadSponsorName|StudyType`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (res.status === 404) return { status: 'NOT_FOUND' };
    if (!res.ok) return { status: 'HTTP_ERROR', code: res.status };
    const data = await res.json();
    const ps = data?.protocolSection;
    if (!ps) return { status: 'EMPTY' };
    return {
      status: 'OK',
      title: ps.identificationModule?.briefTitle?.slice(0, 80),
      overallStatus: ps.statusModule?.overallStatus,
      phase: (ps.designModule?.phases || []).join('/') || null,
      sponsor: ps.sponsorCollaboratorsModule?.leadSponsor?.name,
      type: ps.designModule?.studyType,
    };
  } catch (err) {
    return { status: 'FETCH_ERROR', error: (err && err.message) || String(err) };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let companies = await loadCompaniesWithNCT();
  if (args.tickers) companies = companies.filter((c) => args.tickers.includes(c.ticker));

  const totalNct = companies.reduce((s, c) => s + c.nctIds.length, 0);
  if (!args.json) {
    console.log(`🔬 check-nct: ${companies.length}개 종목, ${totalNct}개 NCT (throttle ${THROTTLE_MS}ms)`);
  }

  // 캐싱 — 같은 NCT가 여러 파일에 등장 가능
  const cache = new Map();
  let counter = 0;
  for (const c of companies) {
    for (const id of c.nctIds) {
      if (!cache.has(id)) {
        counter++;
        if (!args.json) process.stdout.write(`[${counter}/${totalNct}] ${id} ... `);
        const r = await fetchStudy(id);
        cache.set(id, r);
        if (!args.json) {
          if (r.status === 'OK') {
            const flag = FLAG_STATUSES.has(r.overallStatus) ? '⚠' : '✓';
            console.log(`${flag} ${r.overallStatus || '?'} ${r.phase || '?'} ${r.sponsor?.slice(0, 30) || '?'}`);
          } else {
            console.log(`❌ ${r.status}${r.code ? ' '+r.code : ''}`);
          }
        }
        await new Promise((r) => setTimeout(r, THROTTLE_MS));
      }
    }
  }

  // 종목별 정리
  const reports = companies.map((c) => ({
    ticker: c.ticker,
    file: c.file,
    nct: c.nctIds.map((id) => ({ id, ...cache.get(id) })),
  }));

  if (args.json) {
    console.log(JSON.stringify(reports, null, 2));
    return;
  }

  // 요약
  const all = [...cache.values()];
  const okCount = all.filter((r) => r.status === 'OK').length;
  const notFound = all.filter((r) => r.status === 'NOT_FOUND').length;
  const errCount = all.filter((r) => r.status === 'HTTP_ERROR' || r.status === 'FETCH_ERROR').length;
  const flagged = all.filter((r) => r.status === 'OK' && FLAG_STATUSES.has(r.overallStatus));

  console.log('\n──────────────────────────');
  console.log(`✓ OK:        ${okCount}`);
  console.log(`❌ NOT_FOUND: ${notFound}`);
  console.log(`⚠ flagged:   ${flagged.length} (Terminated/Withdrawn/Suspended)`);
  console.log(`❌ error:     ${errCount}`);

  // 종목별 ⚠ / ❌ 만 다시 정리
  const issues = reports.filter((r) =>
    r.nct.some((n) => n.status !== 'OK' || FLAG_STATUSES.has(n.overallStatus))
  );
  if (issues.length) {
    console.log('\n--- 종목별 이슈 ---');
    for (const r of issues) {
      const lines = r.nct.filter((n) => n.status !== 'OK' || FLAG_STATUSES.has(n.overallStatus));
      console.log(`${r.ticker}:`);
      for (const n of lines) {
        if (n.status === 'OK') {
          console.log(`  ⚠ ${n.id} ${n.overallStatus} ${n.phase || ''}`);
        } else {
          console.log(`  ❌ ${n.id} ${n.status}${n.code ? ' '+n.code : ''}`);
        }
      }
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
