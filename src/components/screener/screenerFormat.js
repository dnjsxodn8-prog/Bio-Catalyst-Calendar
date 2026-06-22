// 테이블·카드·차트 공용 상수/포맷 헬퍼 (spec 020).
// make_viz.py 등급 색상 (기존 Screener.jsx 에서 이관)
export const COLOR = {
  '위대한 후보': '#22c55e',
  '관찰 후보': '#3b82f6',
  무등급: '#6b7280',
  부적격: '#ef4444',
};

export function fmtMcap(m) {
  if (m == null) return '—';
  if (m >= 1000) return `$${(m / 1000).toFixed(1)}B`;
  return `$${m}M`;
}

export function fmtRunway(q) {
  return q == null ? '—' : `${q}Q`;
}

export function fmtAreas(area, max = 2) {
  if (!area || !area.length) return '—';
  if (area.length <= max) return area.join(' / ');
  return `${area.slice(0, max).join(' / ')} +${area.length - max}`;
}

// 💠 rerating 요약 라벨 ('' = 없음)
export function reratingTag(d) {
  if (d.wl === 'Primary' || d.wl === 'Aggressive') return d.wl;
  if (d.rl === 'Early Rerating Candidate') return 'Early';
  if (d.rl === 'Deep Value Watch') return 'Deep Value';
  return '';
}
