// 테이블·카드·차트 공용 상수/포맷 헬퍼 (spec 020).
// make_viz.py 등급 색상 (기존 Screener.jsx 에서 이관)
export const COLOR = {
  '위대한 후보': '#22c55e',
  '관찰 후보': '#3b82f6',
  무등급: '#6b7280',
  부적격: '#ef4444',
};

// G/E 하위점수 라벨 (GBS SPEC v0.3 §8 루브릭, 0~4 스케일). spec 020 §11.
export const G_SUB = [
  { key: 'g1', label: 'G1 기전 논리성', desc: '병인→표적→기전→효과 인과사슬 + 인간 근거 (가중 0.40·게이트)' },
  { key: 'g2', label: 'G2 표적·적응증 선택', desc: '왜 이 표적/질환인가 + unmet need (0.35)' },
  { key: 'g3', label: 'G3 차별화 FIC/BIC', desc: '효능·안전성·편의·가치 vs peer (0.25)' },
];
export const E_SUB = [
  { key: 'e1', label: 'E1 인간 근거 성숙도', desc: 'MoA가 인간 데이터로 어디까지 입증됐나 (0.25)' },
  { key: 'e2', label: 'E2 임상 설계 품질', desc: '차별성을 입증할 설계를 했나 (0.25)' },
  { key: 'e3', label: 'E3 규제 경로 명확성', desc: '승인까지 경로가 명확한가 (0.20)' },
  { key: 'e4', label: 'E4 플랫폼→제품 전환력', desc: '플랫폼을 실제 제품으로 전환한 이력 (0.15)' },
  { key: 'e5', label: 'E5 상업화·접근성', desc: '성공 시 실제 uptake 가능한 속성 (0.15)' },
];

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
