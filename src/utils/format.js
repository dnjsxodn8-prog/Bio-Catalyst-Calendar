// Date helpers — all input is "YYYY-MM-DD" (catalyst.date) or ISO datetime (company.nextCatalyst).

export function todayMidnightUTC() {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

export function parseDateUTC(input) {
  if (!input) return null;
  if (input instanceof Date) return Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate());
  const s = String(input);
  // YYYY-MM-DD or full ISO
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

export function daysUntil(input, base = todayMidnightUTC()) {
  const t = parseDateUTC(input);
  if (t === null) return null;
  return Math.round((t - base) / 86400000);
}

export function formatDate(input) {
  const t = parseDateUTC(input);
  if (t === null) return '';
  const d = new Date(t);
  const yy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
}

// "YYYY-MM-DD to YYYY-MM-DD" 학회 일정 파싱.
export function parseConferenceDates(dates) {
  if (!dates) return { start: null, end: null };
  const m = String(dates).match(/^(\d{4}-\d{2}-\d{2})\s+to\s+(\d{4}-\d{2}-\d{2})$/);
  if (!m) {
    // 단일 날짜 fallback
    const single = String(dates).match(/^(\d{4}-\d{2}-\d{2})$/);
    if (single) return { start: single[1], end: single[1] };
    return { start: null, end: null };
  }
  return { start: m[1], end: m[2] };
}

export function formatConferenceDates(dates) {
  const { start, end } = parseConferenceDates(dates);
  if (!start) return dates ?? '';
  if (!end || start === end) return formatDate(start);
  return `${formatDate(start)} ~ ${formatDate(end)}`;
}

// 빈 깡통 판별: body 모든 섹션이 "정보 미입력"이면 stub.
export function isStub(company) {
  const body = company?.body;
  if (!body) return true;
  const values = Object.values(body);
  if (values.length === 0) return true;
  return values.every((v) => !v || String(v).trim() === '정보 미입력');
}

// 시총: 백만 단위 정수 → "$1.2B" / "$500M" / "$80M"
export function formatMcap(mcap) {
  if (typeof mcap !== 'number' || !Number.isFinite(mcap)) return '—';
  if (mcap >= 1000) {
    const b = mcap / 1000;
    return b >= 100 ? `$${Math.round(b)}B` : `$${b.toFixed(1)}B`;
  }
  return `$${Math.round(mcap)}M`;
}
