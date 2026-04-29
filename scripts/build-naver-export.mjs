// scripts/build-naver-export.mjs
// 오늘부터 +7일 카탈리스트를 Naver 블로그용 HTML로 export.
// 인자 없음. 출력: data/imports/naver-export-{YYYY-MM-DD}.html

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'src/data.generated.json');
const OUT_DIR = path.join(ROOT, 'data/imports');

const DAYS = 7;

const PROFILE_FIELDS = [
  { key: '회사 개요', label: '회사 개요' },
  { key: '매출', label: '최근 매출' },
  { key: '플랫폼', label: '핵심 기술' },
  { key: '적응증', label: '적응증' },
  { key: '파트너', label: '파트너' },
  { key: '매출 구조', label: '매출 구조' },
  { key: '자체 판매', label: '자체 판매' },
  { key: '상업화 제품', label: '상업화 제품' },
];

const CLINICAL_FIELDS = [
  { key: '임상 디자인', label: '임상 디자인' },
  { key: '타겟 질환', label: '타겟 질환' },
  { key: '기존 치료제', label: '기존 치료제 · 차별점' },
  { key: '사전 공개 임상', label: '사전 공개 임상' },
];

const DRUG_FIELDS = [
  { key: 'Modality', label: 'Modality' },
  { key: 'MOA', label: '작용 기전 (MOA)' },
  { key: '논문', label: '주요 논문 · 참고자료' },
];

const COLORS = {
  profile: '#10b981',  // green
  clinical: '#3b82f6', // blue
  drug: '#8b5cf6',     // violet
  text: '#1f2937',
  muted: '#6b7280',
  border: '#e5e7eb',
  bg: '#f9fafb',
  bgHeader: '#f3f4f6',
  link: '#2563eb',
};

const DOW = ['일', '월', '화', '수', '목', '금', '토'];

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

function formatMcap(mcap) {
  if (typeof mcap !== 'number' || !Number.isFinite(mcap)) return '—';
  if (mcap >= 1000) {
    const b = mcap / 1000;
    return b >= 100 ? `$${Math.round(b)}B` : `$${b.toFixed(1)}B`;
  }
  return `$${Math.round(mcap)}M`;
}

function isFilled(v) {
  if (!v) return false;
  const s = String(v).trim();
  return s.length > 0 && s !== '정보 미입력';
}

// ─────────────────────── Modality 헤더 ───────────────────────

function extractBoldHeader(text) {
  if (!text) return null;
  const firstLine = String(text).trim().split('\n')[0].trim();
  const m = firstLine.match(/^\*\*([^*]+)\*\*$/);
  return m ? m[1].trim() : null;
}

function stripBoldHeader(text) {
  if (!text) return text;
  const lines = String(text).split('\n');
  if (lines[0] && /^\*\*[^*]+\*\*$/.test(lines[0].trim())) {
    return lines.slice(1).join('\n').replace(/^\n+/, '');
  }
  return text;
}

// ─────────────────────── HTML 변환 ───────────────────────

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const NCT_BASE = 'https://clinicaltrials.gov/study/';

// inline 텍스트 → HTML (bold, links, NCT, naked URL)
function renderInline(text) {
  if (text == null) return '';
  const s = String(text);
  if (!s) return '';

  // 토큰 단위로 분해. 우선순위: [text](url) > **bold** > naked URL > NCT
  const PATTERN =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(https?:\/\/[^\s,)]+)|(NCT\d{6,9})/g;

  let out = '';
  let last = 0;
  let m;
  while ((m = PATTERN.exec(s)) !== null) {
    if (m.index > last) out += escapeHtml(s.slice(last, m.index));
    if (m[1]) {
      out += `<a href="${escapeHtml(m[3])}" style="color:${COLORS.link};text-decoration:underline;">${escapeHtml(m[2])}</a>`;
    } else if (m[4]) {
      out += `<strong style="color:${COLORS.text};font-weight:700;">${renderInlineNCT(m[5])}</strong>`;
    } else if (m[6]) {
      out += `<a href="${escapeHtml(m[6])}" style="color:${COLORS.link};text-decoration:underline;word-break:break-all;">${escapeHtml(m[6])}</a>`;
    } else if (m[7]) {
      out += `<a href="${NCT_BASE}${m[7]}" style="color:${COLORS.link};text-decoration:underline;font-family:monospace;">${m[7]}</a>`;
    }
    last = PATTERN.lastIndex;
  }
  if (last < s.length) out += escapeHtml(s.slice(last));
  return out;
}

function renderInlineNCT(text) {
  // bold 안의 NCT만 별도 링크
  const re = /NCT\d{6,9}/g;
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out += escapeHtml(text.slice(last, m.index));
    out += `<a href="${NCT_BASE}${m[0]}" style="color:${COLORS.link};text-decoration:underline;font-family:monospace;">${m[0]}</a>`;
    last = re.lastIndex;
  }
  if (last < text.length) out += escapeHtml(text.slice(last));
  return out;
}

// body 섹션 텍스트 → HTML 블록들
function mdToHtml(text) {
  if (!text) return '';
  const s = String(text).trim();
  if (!s) return '';

  const blocks = s
    .split(/\n\s*\n/)
    .map((b) => b.split('\n').filter((l) => l !== ''))
    .filter((b) => b.length);

  const parts = [];
  for (const lines of blocks) {
    // 한 줄 + 전체 bold → sub-header
    if (lines.length === 1 && /^\*\*[^*]+\*\*$/.test(lines[0].trim())) {
      const inner = lines[0].trim().replace(/^\*\*|\*\*$/g, '');
      parts.push(
        `<div style="font-weight:700;color:${COLORS.clinical};margin:8px 0 4px 0;">${escapeHtml(inner)}</div>`,
      );
      continue;
    }
    // list
    if (/^-\s+/.test(lines[0])) {
      parts.push(renderListBlock(lines));
      continue;
    }
    // 일반 단락
    parts.push(
      `<p style="margin:6px 0;line-height:1.6;color:${COLORS.text};">${renderInline(lines.join('<br>'))}</p>`,
    );
  }
  return parts.join('\n');
}

function renderListBlock(lines) {
  // top-level "- " 시작 + 그 뒤 들여쓰기 sub-line
  const items = [];
  let cur = null;
  for (const line of lines) {
    if (/^-\s+/.test(line)) {
      if (cur) items.push(cur);
      const stripped = line.replace(/^-\s+/, '');
      cur = { main: stripped, sub: [] };
    } else if (/^\s{2,}\S/.test(line) || (cur && line.trim())) {
      if (cur) cur.sub.push(line.trim());
    }
  }
  if (cur) items.push(cur);

  const lis = items
    .map((it) => {
      let html = renderInline(it.main);
      if (it.sub.length) {
        html += `<div style="margin:2px 0 0 0;color:${COLORS.muted};font-size:13px;">`;
        html += it.sub.map((s) => renderInline(s)).join('<br>');
        html += '</div>';
      }
      return `<li style="margin:3px 0;line-height:1.55;color:${COLORS.text};">${html}</li>`;
    })
    .join('\n');

  return `<ul style="margin:6px 0;padding-left:22px;">${lis}</ul>`;
}

// ─────────────────────── 카탈리스트 윈도우 ───────────────────────

function pickWindow(catalysts, base) {
  const end = base + DAYS * 86400000;
  return catalysts
    .map((c) => ({ c, t: parseDateUTC(c.date) }))
    .filter(({ t }) => t !== null && t >= base && t <= end)
    .sort((a, b) => {
      if (a.t !== b.t) return a.t - b.t;
      return String(a.c.ticker).localeCompare(String(b.c.ticker));
    })
    .map(({ c }) => c);
}

// ─────────────────────── 렌더링 ───────────────────────

function renderSummaryTable(items) {
  if (!items.length) return '';

  const rows = items
    .map(
      (c) => `
    <tr>
      <td style="border:1px solid ${COLORS.border};padding:6px 10px;font-family:monospace;color:${COLORS.muted};white-space:nowrap;">${escapeHtml(formatDateShort(c.date))}</td>
      <td style="border:1px solid ${COLORS.border};padding:6px 10px;font-family:monospace;font-weight:700;color:${COLORS.profile};">${escapeHtml(c.ticker)}</td>
      <td style="border:1px solid ${COLORS.border};padding:6px 10px;color:${COLORS.text};">${escapeHtml(c.event ?? '')}</td>
      <td style="border:1px solid ${COLORS.border};padding:6px 10px;color:${COLORS.muted};white-space:nowrap;">${escapeHtml(c.type ?? '')}</td>
    </tr>`,
    )
    .join('');

  return `
<table style="border-collapse:collapse;border:1px solid ${COLORS.border};width:100%;margin:0 0 24px 0;font-size:14px;">
  <thead>
    <tr style="background:${COLORS.bgHeader};">
      <th style="border:1px solid ${COLORS.border};padding:8px 10px;text-align:left;color:${COLORS.text};font-weight:700;">날짜</th>
      <th style="border:1px solid ${COLORS.border};padding:8px 10px;text-align:left;color:${COLORS.text};font-weight:700;">종목</th>
      <th style="border:1px solid ${COLORS.border};padding:8px 10px;text-align:left;color:${COLORS.text};font-weight:700;">카탈리스트</th>
      <th style="border:1px solid ${COLORS.border};padding:8px 10px;text-align:left;color:${COLORS.text};font-weight:700;">종류</th>
    </tr>
  </thead>
  <tbody>${rows}
  </tbody>
</table>
`;
}

function renderField(label, value) {
  if (!isFilled(value)) return '';
  return `
<div style="margin:14px 0;">
  <div style="font-size:15px;font-weight:700;color:${COLORS.text};margin-bottom:5px;border-bottom:1px solid ${COLORS.border};padding-bottom:3px;">${escapeHtml(label)}</div>
  <div style="color:${COLORS.text};font-size:14px;line-height:1.65;">${mdToHtml(value)}</div>
</div>`;
}

function renderSection(title, color, fields, body, extras = '') {
  const filled = fields.filter((f) => isFilled(body[f.key]));
  if (!filled.length && !extras) return '';

  const rendered = extras + filled.map((f) => {
    let v = body[f.key];
    if (f.key === 'Modality') v = stripBoldHeader(v);
    return renderField(f.label, v);
  }).join('');

  return `
<div style="margin:18px 0;padding:14px 16px;border-left:4px solid ${color};background:${COLORS.bg};border-radius:4px;">
  <h4 style="margin:0 0 10px 0;color:${color};font-size:15px;font-weight:700;">${escapeHtml(title)}</h4>
  ${rendered}
</div>`;
}

function renderCatalyst(c, company) {
  const tickerLine = `
<h3 style="margin:32px 0 4px 0;font-size:18px;font-weight:700;color:${COLORS.text};border-top:2px solid ${COLORS.text};padding-top:14px;">
  <span style="font-family:monospace;color:${COLORS.profile};">${escapeHtml(c.ticker)}</span>
  ${company?.company ? ` &middot; ${escapeHtml(company.company)}` : ''}
</h3>`;

  // 카탈리스트 메타 박스
  const metaParts = [];
  if (c.drug) metaParts.push(`<span style="font-weight:700;color:${COLORS.text};">${escapeHtml(c.drug)}</span>`);
  if (c.indication) metaParts.push(`<span style="color:${COLORS.muted};">${escapeHtml(c.indication)}</span>`);
  if (c.phase) metaParts.push(`<span style="font-family:monospace;font-size:12px;color:${COLORS.muted};background:${COLORS.bgHeader};padding:2px 6px;border-radius:3px;">${escapeHtml(c.phase)}</span>`);
  const metaInline = metaParts.join(' &middot; ');

  const meta = `
<div style="margin:8px 0 16px 0;padding:12px 14px;border:1px solid ${COLORS.profile};background:#ecfdf5;border-radius:4px;">
  <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${COLORS.profile};margin-bottom:5px;">카탈리스트</div>
  <div style="margin:4px 0;font-size:14px;">${metaInline}</div>
  ${c.event ? `<div style="margin:4px 0;color:${COLORS.muted};font-size:14px;">${escapeHtml(c.event)}</div>` : ''}
  <div style="margin:4px 0;color:${COLORS.muted};font-size:13px;">일정: ${escapeHtml(formatDateLong(c.date))}</div>
</div>`;

  if (!company) {
    return tickerLine + meta +
      `<p style="color:${COLORS.muted};font-style:italic;font-size:14px;">기업 정보 미등록</p>`;
  }

  const body = company.body ?? {};

  // 기업 프로필: 시총 먼저 + PROFILE_FIELDS
  const mcapRow = renderField('시가총액', formatMcap(company.mcap));
  const profileSection = renderSection('🏢 기업 프로필', COLORS.profile, PROFILE_FIELDS, body, mcapRow);

  // 임상 정보
  const clinicalSection = renderSection('🧪 임상 정보', COLORS.clinical, CLINICAL_FIELDS, body);

  // 약물 정보 (Modality 헤더를 제목 부제로)
  const modalityHeader = extractBoldHeader(body['Modality']);
  const drugTitle = modalityHeader ? `💊 약물 정보 — ${modalityHeader}` : '💊 약물 정보';
  const drugSection = renderSection(drugTitle, COLORS.drug, DRUG_FIELDS, body);

  // 메모
  const memo = body['메모'];
  const memoSection = isFilled(memo)
    ? `
<div style="margin:18px 0;padding:14px 16px;border-left:4px solid ${COLORS.muted};background:${COLORS.bg};border-radius:4px;">
  <h4 style="margin:0 0 10px 0;color:${COLORS.muted};font-size:15px;font-weight:700;">📝 메모</h4>
  <div style="color:${COLORS.text};font-size:14px;line-height:1.6;">${mdToHtml(memo)}</div>
</div>`
    : '';

  // Sources
  const sources = Array.isArray(company.sources) ? company.sources : [];
  const sourcesBlock = sources.length
    ? `
<div style="margin:14px 0 8px 0;font-size:12px;color:${COLORS.muted};line-height:1.7;">
  <span style="text-transform:uppercase;letter-spacing:0.06em;font-weight:700;margin-right:8px;">Sources</span>
  ${sources
    .map(
      (u) =>
        `<a href="${escapeHtml(u)}" style="color:${COLORS.link};text-decoration:underline;margin-right:10px;word-break:break-all;">${escapeHtml(u)}</a>`,
    )
    .join('')}
</div>`
    : '';

  return tickerLine + meta + profileSection + clinicalSection + drugSection + memoSection + sourcesBlock;
}

function renderDocument(items, companiesMap, baseT) {
  const baseStr = formatYMD(baseT);
  const endStr = formatYMD(baseT + DAYS * 86400000);
  const title = `${baseStr} ~ ${endStr} biotech 카탈리스트`;

  if (!items.length) {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
</head>
<body style="font-size:15px;line-height:1.6;color:${COLORS.text};max-width:880px;margin:24px auto;padding:0 16px;">
<p style="color:${COLORS.muted};font-style:italic;">이 기간(${escapeHtml(baseStr)} ~ ${escapeHtml(endStr)})에 임박한 카탈리스트가 없습니다.</p>
</body>
</html>`;
  }

  const summary = renderSummaryTable(items);
  const details = items
    .map((c) => renderCatalyst(c, companiesMap.get(c.ticker)))
    .join('\n');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>${escapeHtml(title)}</title>
</head>
<body style="font-size:15px;line-height:1.6;color:${COLORS.text};max-width:880px;margin:24px auto;padding:0 16px;">
${summary}
${details}
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

  const base = todayMidnightUTC();
  const items = pickWindow(catalysts, base);

  const html = renderDocument(items, companiesMap, base);

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
