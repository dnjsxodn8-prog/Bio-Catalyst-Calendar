// scripts/build-screener.mjs
// ../great-biotech-screener/data/leaderboard.csv → src/screener.generated.json
// spec 010 §3. make_viz.py 의 파싱 규칙을 1:1 JS 포팅.
//
// best-effort: leaderboard 발견 → 재생성. 없으면(Vercel 등) 커밋된 json 유지 + 경고.
// 절대 exit 1 안 함 (Calendar 빌드를 막지 않음).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const LEADERBOARD = path.resolve(ROOT, '../great-biotech-screener/data/leaderboard.csv');
const COMPANIES_DIR = path.join(ROOT, 'data/companies');
const OUT = path.join(ROOT, 'src/screener.generated.json');

main();

function main() {
  if (!fs.existsSync(LEADERBOARD)) {
    if (fs.existsSync(OUT)) {
      console.warn(`⚠ leaderboard.csv 없음 (${LEADERBOARD}) — 커밋된 ${rel(OUT)} 유지`);
    } else {
      const empty = {
        generated: new Date().toISOString(),
        source: 'great-biotech-screener/data/leaderboard.csv',
        counts: {},
        coverage: { total: 0, inCalendar: 0, missing: 0 },
        points: [],
      };
      fs.writeFileSync(OUT, JSON.stringify(empty, null, 2), 'utf8');
      console.warn(`⚠ leaderboard.csv 없음 — 빈 골격 작성: ${rel(OUT)}`);
    }
    return; // exit 0
  }

  const calendarTickers = loadCalendarTickers();
  const rows = parseCsv(fs.readFileSync(LEADERBOARD, 'utf8'));

  const points = [];
  for (const r of rows) {
    const g = toInt(r.G_conf);
    const e = toInt(r.E_conf);
    if (g === null || e === null) continue; // 전부 N/E (툴·진단) — G×E 점 없음 (make_viz 동일)

    const m = toInt(r.mcap); // 실패 → null
    const t1 = /^\d+$/.test(String(r.T1 ?? '').trim()) ? parseInt(r.T1, 10) : 0;
    const tier = (r.candidate_tier ?? '').trim();
    const disq = String(r.disqualified ?? '').trim().toLowerCase() === 'true';
    const grp = disq
      ? '부적격'
      : tier === '위대한 후보' || tier === '관찰 후보'
        ? tier
        : '무등급';
    const rl = (r.rerating_label ?? '').trim();
    const wl = (r.watchlist ?? '').trim();
    const rtRaw = String(r.R_total ?? '').trim();
    const rt = rtRaw === '' || rtRaw === 'None' ? null : round1(parseFloat(rtRaw));
    const ticker = r.ticker;

    points.push({
      t: ticker,
      c: r.company,
      g,
      e,
      t1,
      m,
      grp,
      cat: (r.next_catalyst ?? '').trim() || '—',
      lg: String(r.large_cap_flag ?? '').toLowerCase() === 'true',
      rl,
      wl,
      rt: Number.isNaN(rt) ? null : rt,
      inCalendar: calendarTickers.has(ticker),
    });
  }

  const counts = {};
  for (const p of points) counts[p.grp] = (counts[p.grp] ?? 0) + 1;
  const inCalendar = points.filter((p) => p.inCalendar).length;

  const out = {
    generated: new Date().toISOString(),
    source: 'great-biotech-screener/data/leaderboard.csv',
    counts,
    coverage: { total: points.length, inCalendar, missing: points.length - inCalendar },
    points,
  };

  fs.writeFileSync(OUT, JSON.stringify(out, null, 2), 'utf8');

  const countStr = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k} ${v}`)
    .join(' · ');
  console.log(`✅ screener points: ${points.length} (${countStr})`);
  console.log(`✅ coverage: ${inCalendar}/${points.length} in Calendar (missing ${points.length - inCalendar})`);
  console.log(`→ ${rel(OUT)}`);
}

function loadCalendarTickers() {
  const set = new Set();
  let files;
  try {
    files = fs.readdirSync(COMPANIES_DIR);
  } catch {
    return set;
  }
  for (const f of files) {
    if (f.endsWith('.md')) set.add(f.slice(0, -3));
  }
  return set;
}

function toInt(v) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (s === '') return null;
  if (!/^-?\d+$/.test(s)) return null;
  return parseInt(s, 10);
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function rel(p) {
  return path.relative(ROOT, p).replace(/\\/g, '/');
}

// 최소 CSV 파서: 따옴표/콤마/이스케이프("")/CRLF 처리. 헤더는 BOM 제거.
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
