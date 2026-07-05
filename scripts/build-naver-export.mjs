// scripts/build-naver-export.mjs
// 카탈리스트를 Naver 블로그용 "카드뉴스" HTML로 export.
// 카드 1장 = 카탈리스트 1건. 핵심 필드(날짜·종류·종목·기업·약물·적응증·phase) + 관전 포인트(blogNote).
// 월간 운영(2026-07-06 사용자 결정): 기본으로 blogNote(관전 포인트) 있는 카탈리스트만 카드로 출력 → 맹탕 카드 방지.
//   중요 이벤트는 catalysts.md 에 blogNote 를 써서 큐레이션한다. 최대 10건.
// 인자: 없음(today~today+7) 또는 --from YYYY-MM-DD [--to YYYY-MM-DD] [--limit N] [--all].
//   --all  : blogNote 없는 카탈리스트도 포함(기존 동작). --limit N: 상한(기본 10).
// 출력: data/imports/naver-export-{YYYY-MM-DD}.html

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'src/data.generated.json');
const OUT_DIR = path.join(ROOT, 'data/imports');

const DAYS = 7;

const COLORS = {
  text: '#1f2937',
  muted: '#6b7280',
  border: '#e5e7eb',
  ticker: '#10b981', // green
  link: '#2563eb',
};

// 카탈리스트 종류별 강조색 + 한국어 라벨 (카드 좌측 accent · 날짜 배지)
const TYPE_STYLE = {
  PDUFA: { color: '#dc2626', label: 'PDUFA' },
  'Clinical Readout': { color: '#f59e0b', label: '임상 결과' },
  Conference: { color: '#3b82f6', label: '학회 발표' },
  Earnings: { color: '#6b7280', label: '실적' },
  Regulatory: { color: '#0d9488', label: '규제' },
};

const DOW = ['일', '월', '화', '수', '목', '금', '토'];

// 블로그 글 상단 고정 인트로 (사용자 결정 2026-06-21 — 매번 수동 붙여넣기 생략)
const INTRO_HTML = `<div style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:${COLORS.text};">
  <p style="margin:0 0 8px 0;"><a href="https://biotechcatalystcalendar.vercel.app/?v=1" style="color:${COLORS.link};text-decoration:underline;">https://biotechcatalystcalendar.vercel.app/?v=1</a></p>
  <p style="margin:0;">미국 biotech ($100M+) 와 Big Pharma의 임상 카탈리스트(PDUFA, 임상 readout, 학회 발표)를 한 곳에서 추적하는 사이트입니다.<br>
  간단히 정리해서 텔레그램 봇을 통해 매주 메시지 발송하고<br>
  자세한 분석 자료는(제 주관 따라 기업 선정) 블로그에 올릴 듯합니다.</p>
</div>`;

// ─────────────────────── 날짜 헬퍼 ───────────────────────

function todayMidnightUTC() {
  // KST 기준 오늘의 0시(UTC). 사용자가 한국이라 KST로 결정.
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const ymd = fmt.format(new Date()); // "YYYY-MM-DD"
  const [y, m, d] = ymd.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function parseDateUTC(input) {
  if (!input) return null;
  const s = String(input);
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function formatYMD(t) {
  const d = new Date(t);
  const yy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

function formatDateShort(input) {
  // "M/D (요일)"
  const t = parseDateUTC(input);
  if (t === null) return String(input ?? '');
  const d = new Date(t);
  return `${d.getUTCMonth() + 1}/${d.getUTCDate()} (${DOW[d.getUTCDay()]})`;
}

function formatDateLong(input) {
  // "YYYY-MM-DD (요일)"
  const t = parseDateUTC(input);
  if (t === null) return String(input ?? '');
  const d = new Date(t);
  return `${formatYMD(t)} (${DOW[d.getUTCDay()]})`;
}

// ─────────────────────── HTML 헬퍼 ───────────────────────

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ─────────────────────── 카탈리스트 윈도우 ───────────────────────

function pickWindow(catalysts, base, end) {
  return catalysts
    .map((c) => ({ c, t: parseDateUTC(c.date) }))
    .filter(({ t }) => t !== null && t >= base && t <= end)
    .sort((a, b) => {
      if (a.t !== b.t) return a.t - b.t;
      return String(a.c.ticker).localeCompare(String(b.c.ticker));
    })
    .map(({ c }) => c);
}

// ─────────────────────── 카드 렌더링 ───────────────────────

function renderCard(c, company) {
  const ts = TYPE_STYLE[c.type] || { color: COLORS.muted, label: c.type || '' };
  const name = company?.company ? `<span style="color:${COLORS.muted};font-weight:500;font-size:14px;"> · ${escapeHtml(company.company)}</span>` : '';

  const dateBadge = `<span style="display:inline-block;vertical-align:middle;font-family:monospace;font-size:13px;font-weight:700;color:#ffffff;background:${ts.color};padding:3px 11px;border-radius:11px;">${escapeHtml(formatDateShort(c.date))}</span>`;
  // 배지 사이는 CSS margin 대신 &nbsp; 로 띄움 — SmartEditor 붙여넣기 시 margin 이 제거돼도 간격 유지.
  const typeBadge = ts.label
    ? `&nbsp;&nbsp;<span style="display:inline-block;vertical-align:middle;font-size:12px;font-weight:700;color:${ts.color};background:#f3f4f6;padding:3px 10px;border-radius:11px;">${escapeHtml(ts.label)}</span>`
    : '';

  const tickerLine = `<div style="font-size:17px;font-weight:700;margin:2px 0 4px 0;"><span style="font-family:monospace;color:${COLORS.ticker};">${escapeHtml(c.ticker)}</span>${name}</div>`;

  const drugLine = c.drug
    ? `<div style="font-size:16px;font-weight:700;color:#111827;margin:0 0 4px 0;">💊 ${escapeHtml(c.drug)}</div>`
    : '';

  const sub = [];
  if (c.indication) sub.push(`<span style="color:#374151;">${escapeHtml(c.indication)}</span>`);
  if (c.phase) sub.push(`<span style="display:inline-block;font-family:monospace;font-size:12px;color:${ts.color};background:#f3f4f6;padding:1px 8px;border-radius:10px;">${escapeHtml(c.phase)}</span>`);
  const subLine = sub.length
    ? `<div style="font-size:14px;line-height:1.7;">${sub.join(' &nbsp; ')}</div>`
    : '';

  // 관전 포인트 — 블로그 전용 editorial 요약(blogNote). 공개 사이트 데이터에는 미포함.
  const note = c.blogNote
    ? `\n  <div style="margin:10px 0 0 0;padding:10px 12px;background:#f9fafb;border-radius:6px;font-size:13.5px;line-height:1.7;color:#4b5563;"><span style="font-size:12px;font-weight:700;color:${ts.color};">▶ 관전 포인트</span><br>${escapeHtml(String(c.blogNote)).replace(/\n/g, '<br>')}</div>`
    : '';

  return `
<div style="border:1px solid ${COLORS.border};border-left:5px solid ${ts.color};border-radius:8px;padding:14px 16px;margin:0 0 12px 0;background:#ffffff;">
  <div style="margin-bottom:7px;">${dateBadge}${typeBadge}</div>
  ${tickerLine}
  ${drugLine}
  ${subLine}${note}
</div>`;
}

function renderDocument(items, companiesMap, baseT, endT) {
  const baseStr = formatYMD(baseT);
  const endStr = formatYMD(endT);
  const title = `${baseStr} ~ ${endStr} biotech 카탈리스트`;

  const head = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
</head>
<body style="font-size:15px;line-height:1.6;color:${COLORS.text};max-width:680px;margin:24px auto;padding:0 16px;">
${INTRO_HTML}`;

  const heading = `<h2 style="font-size:19px;font-weight:700;color:${COLORS.text};margin:0 0 16px 0;border-bottom:2px solid ${COLORS.text};padding-bottom:8px;">📅 ${escapeHtml(baseStr)} ~ ${escapeHtml(endStr)} 카탈리스트 ${items.length}건</h2>`;

  if (!items.length) {
    return `${head}
<p style="color:${COLORS.muted};font-style:italic;">이 기간(${escapeHtml(baseStr)} ~ ${escapeHtml(endStr)})에 임박한 카탈리스트가 없습니다.</p>
</body>
</html>`;
  }

  const cards = items.map((c) => renderCard(c, companiesMap.get(c.ticker))).join('\n');

  return `${head}
${heading}
${cards}
</body>
</html>`;
}

// ─────────────────────── main ───────────────────────

async function main() {
  let raw;
  try {
    raw = await fs.readFile(DATA_PATH, 'utf8');
  } catch (e) {
    console.error(`✗ ${path.relative(ROOT, DATA_PATH)} 없음. 먼저 \`npm run build-data\` 실행하세요.`);
    process.exit(1);
  }
  const data = JSON.parse(raw);
  const catalysts = Array.isArray(data.catalysts) ? data.catalysts : [];
  const companies = Array.isArray(data.companies) ? data.companies : [];
  const companiesMap = new Map(companies.map((c) => [c.ticker, c]));

  // 옵션: --from YYYY-MM-DD [--to YYYY-MM-DD]. 없으면 기존 동작(today ~ today+7).
  const argv = process.argv.slice(2);
  const getArg = (name) => {
    const i = argv.indexOf(name);
    return i >= 0 && argv[i + 1] ? argv[i + 1] : null;
  };
  const fromArg = getArg('--from');
  const toArg = getArg('--to');

  const base = fromArg ? parseDateUTC(fromArg) : todayMidnightUTC();
  if (base === null) {
    console.error(`✗ --from 날짜 형식 오류: ${fromArg} (YYYY-MM-DD 필요)`);
    process.exit(1);
  }
  const end = toArg ? parseDateUTC(toArg) : base + DAYS * 86400000;
  if (end === null) {
    console.error(`✗ --to 날짜 형식 오류: ${toArg} (YYYY-MM-DD 필요)`);
    process.exit(1);
  }

  const wantAll = argv.includes('--all');
  const limitArg = getArg('--limit');
  const limit = limitArg ? Number(limitArg) : 10;

  let items = pickWindow(catalysts, base, end);
  // 기본: 관전 포인트(blogNote) 있는 카탈리스트만 (큐레이션된 중요 이벤트). --all 이면 전체.
  if (!wantAll) items = items.filter((c) => c.blogNote && String(c.blogNote).trim());
  if (Number.isFinite(limit) && limit > 0) items = items.slice(0, limit);

  const html = renderDocument(items, companiesMap, base, end);

  await fs.mkdir(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `naver-export-${formatYMD(base)}.html`);
  await fs.writeFile(outPath, html, 'utf8');

  const rel = path.relative(ROOT, outPath).replace(/\\/g, '/');
  // 절대 경로 — Windows 백슬래시 형태 (탐색기 / cmd 에 바로 paste 가능)
  const absWin = outPath.replace(/\//g, '\\');
  // file:// URL — 브라우저 주소창 paste 용. Windows 경로의 백슬래시를 슬래시로, 공백·한글은 encodeURI 가 처리
  const fileUrl = 'file:///' + encodeURI(outPath.replace(/\\/g, '/'));

  console.log(`✅ catalysts in window: ${items.length}`);
  console.log(`→ ${rel}`);
  console.log('');
  console.log(`   경로 (탐색기·cmd):  ${absWin}`);
  console.log(`   브라우저 URL:        ${fileUrl}`);
  if (items.length) {
    console.log('');
    items.forEach((c) => {
      console.log(`   ${formatDateLong(c.date)} · ${c.ticker} · ${c.event ?? ''}`);
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
