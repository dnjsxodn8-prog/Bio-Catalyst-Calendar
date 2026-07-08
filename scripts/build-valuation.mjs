// scripts/build-valuation.mjs
// ../PEG_Screener/data/{us_raw,kr_raw}_<date>.csv → src/valuation.generated.json
// spec 023. build-screener.mjs 의 best-effort 패턴을 그대로 따른다.
//
// best-effort: 최신 날짜 CSV 발견 → 재생성. 없으면(Vercel 등) 커밋된 json 유지 + 경고.
// 절대 exit 1 안 함 (Calendar 빌드를 막지 않음).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'src/valuation.generated.json');

const SCHEMA = 1;

// PEG_Screener 형제 폴더 후보 (첫 존재 디렉터리 사용). spec 023 §1.1.
const PEG_CANDIDATES = [
  process.env.PEG_SCREENER_DIR, // 명시 override
  path.resolve(ROOT, '../PEG_Screener'), // 메인 레포에서 실행
  path.resolve(ROOT, '../../../../PEG_Screener'), // worktree(.claude/worktrees/<name>)에서 실행
].filter(Boolean);

// raw CSV 헤더 → JSON 키 (spec 023 §1.4). sector 는 제외.
const TEXT_KEYS = { ticker: 't', name: 'n', market: 'mkt', industry: 'ind', country: 'ctry', peg_method: 'pmeth' };
const NUM_KEYS = {
  peg: 'peg', market_cap: 'mc', per: 'per', forward_pe: 'fpe', pbr: 'pbr',
  roe: 'roe', roa: 'roa', roic: 'roic', dividend_yield: 'dy',
  revenue: 'rev', operating_income: 'oi', net_income: 'ni',
  operating_margin: 'om', profit_margin: 'pm', revenue_growth: 'rg', eps_growth: 'eg',
};
const MONEY_KEYS = new Set(['mc', 'rev', 'oi', 'ni']); // $M / 억원 — 소수1자리

main();

function main() {
  const dir = findPegDir();
  if (!dir) {
    keepOrSkeleton(`PEG_Screener 폴더 없음 (후보: ${PEG_CANDIDATES.map(rel).join(', ')})`);
    return;
  }

  const dataDir = path.join(dir, 'data');
  const us = buildMarket(dataDir, 'us_raw', 'us', '해외', '$M');
  const kr = buildMarket(dataDir, 'kr_raw', 'kr', '국내', '억원');

  if (!us && !kr) {
    keepOrSkeleton(`us_raw/kr_raw CSV 없음 (${rel(dataDir)})`);
    return;
  }

  const asOf = [us?.asOf, kr?.asOf].filter(Boolean).sort().at(-1) ?? null;

  const out = {
    schema: SCHEMA,
    generated: new Date().toISOString(),
    asOf,
    source: 'PEG_Screener/data/{us_raw,kr_raw}_<date>.csv',
    markets: {
      us: us?.market ?? emptyMarket('해외', '$M'),
      kr: kr?.market ?? emptyMarket('국내', '억원'),
    },
  };

  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');

  const line = (m, label) =>
    `${label} ${m.count}종 (PEG ${m.withPeg} · roa ${m.coverage.roa} · roic ${m.coverage.roic})`;
  console.log(`✅ valuation: ${line(out.markets.us, '해외')} · ${line(out.markets.kr, '국내')}`);
  console.log(`✅ asOf ${asOf} · 세부업종 해외 ${out.markets.us.industries.length} · 국내 ${out.markets.kr.industries.length}`);
  console.log(`→ ${rel(OUT)} (schema ${SCHEMA})`);
}

function findPegDir() {
  for (const c of PEG_CANDIDATES) {
    try {
      if (c && fs.existsSync(path.join(c, 'data'))) return c;
    } catch {
      /* ignore */
    }
  }
  return null;
}

// dataDir 에서 <prefix>_<YYYY-MM-DD>.csv 중 최신 날짜 1개 → { asOf, market } | null
function buildMarket(dataDir, prefix, code, label, unit) {
  const re = new RegExp(`^${prefix}_(\\d{4}-\\d{2}-\\d{2})\\.csv$`);
  let files;
  try {
    files = fs.readdirSync(dataDir);
  } catch {
    return null;
  }
  const dated = files
    .map((f) => {
      const m = re.exec(f);
      return m ? { file: f, date: m[1] } : null;
    })
    .filter(Boolean)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // 최신 먼저
  if (!dated.length) {
    console.warn(`⚠ ${prefix}_*.csv 없음 (${rel(dataDir)})`);
    return null;
  }
  const { file, date } = dated[0];
  const rows = parseCsv(fs.readFileSync(path.join(dataDir, file), 'utf8')).map(projectRow);
  sortByPeg(rows);

  const industries = [...new Set(rows.map((r) => r.ind).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'en')
  );
  const nn = (k) => rows.filter((r) => r[k] != null).length;

  return {
    asOf: date,
    market: {
      label,
      unit,
      count: rows.length,
      withPeg: nn('peg'),
      coverage: { roa: nn('roa'), roic: nn('roic'), fpe: nn('fpe') },
      industries,
      rows,
    },
  };
}

function projectRow(r) {
  const o = {};
  for (const [csv, key] of Object.entries(TEXT_KEYS)) o[key] = cleanStr(r[csv]);
  for (const [csv, key] of Object.entries(NUM_KEYS)) {
    o[key] = toNum(r[csv], MONEY_KEYS.has(key) ? 1 : 2);
  }
  return o;
}

// PEG 오름차순, null 은 맨 뒤 (유효 PEG 먼저)
function sortByPeg(rows) {
  rows.sort((a, b) => {
    if (a.peg == null && b.peg == null) return 0;
    if (a.peg == null) return 1;
    if (b.peg == null) return -1;
    return a.peg - b.peg;
  });
}

function emptyMarket(label, unit) {
  return { label, unit, count: 0, withPeg: 0, coverage: { roa: 0, roic: 0, fpe: 0 }, industries: [], rows: [] };
}

// 커밋된 OUT 있으면 유지, 없으면 빈 골격 작성. 둘 다 exit 0.
function keepOrSkeleton(reason) {
  if (fs.existsSync(OUT)) {
    console.warn(`⚠ ${reason} — 커밋된 ${rel(OUT)} 유지`);
    return;
  }
  const empty = {
    schema: SCHEMA,
    generated: new Date().toISOString(),
    asOf: null,
    source: 'PEG_Screener/data/{us_raw,kr_raw}_<date>.csv',
    markets: { us: emptyMarket('해외', '$M'), kr: emptyMarket('국내', '억원') },
  };
  fs.writeFileSync(OUT, JSON.stringify(empty, null, 2), 'utf8');
  console.warn(`⚠ ${reason} — 빈 골격 작성: ${rel(OUT)}`);
}

function toNum(v, dp) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (s === '' || s === 'None' || s === 'nan' || s === 'NaN') return null;
  const n = parseFloat(s);
  if (Number.isNaN(n)) return null;
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}

function cleanStr(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s === '' || s === 'None' || s === 'nan' || s === 'NaN' ? null : s;
}

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, '/');
}

// 최소 CSV 파서: 따옴표/콤마/이스케이프("")/CRLF 처리. 헤더는 BOM 제거. (build-screener.mjs 와 동일)
function parseCsv(text) {
  const rows = [];
  let field = '';
  let record = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      record.push(field);
      field = '';
    } else if (ch === '\n') {
      record.push(field);
      rows.push(record);
      record = [];
      field = '';
    } else if (ch === '\r') {
      // CRLF: \n 에서 처리
    } else {
      field += ch;
    }
  }
  if (field !== '' || record.length) {
    record.push(field);
    rows.push(record);
  }
  if (!rows.length) return [];
  const header = rows[0].map((h, i) => (i === 0 ? h.replace(/^﻿/, '') : h).trim());
  const out = [];
  for (let r = 1; r < rows.length; r++) {
    if (rows[r].length === 1 && rows[r][0] === '') continue; // 빈 줄
    const obj = {};
    for (let c = 0; c < header.length; c++) obj[header[c]] = rows[r][c] ?? '';
    out.push(obj);
  }
  return out;
}
