// 카탈리스트 결과(outcome) 메타데이터 — spec 016 §1.1.
// src/index.css 가 다른 세션 소유라 CSS 클래스 대신 인라인 색상으로 배지를 그린다.

export const OUTCOME_META = {
  approved: { label: '승인', tone: 'pos', color: '#34D399' },
  met: { label: '충족', tone: 'pos', color: '#34D399' },
  crl: { label: 'CRL', tone: 'neg', color: '#F87171' },
  missed: { label: '미달', tone: 'neg', color: '#F87171' },
  mixed: { label: '혼조', tone: 'warn', color: '#FBBF24' },
  delayed: { label: '연기', tone: 'warn', color: '#FB923C' },
  withdrawn: { label: '철회', tone: 'gray', color: '#9CA3AF' },
};

// Results 뷰 / 필터에 노출할 순서(pending 제외).
export const OUTCOME_ORDER = ['approved', 'met', 'mixed', 'delayed', 'crl', 'missed', 'withdrawn'];

// 이벤트가 "해소"됐는가 — outcome 이 있고 pending 이 아님.
export function isResolved(e) {
  return !!e && !!e.outcome && e.outcome !== 'pending' && !!OUTCOME_META[e.outcome];
}

export function outcomeMeta(o) {
  return OUTCOME_META[o] || null;
}

// 결과 정렬·표시에 쓸 날짜 — outcome_date 우선, 없으면 예정일(date).
export function outcomeDate(e) {
  return (e && (e.outcome_date || e.date)) || null;
}

export function outcomeSources(e) {
  if (!e) return [];
  if (Array.isArray(e.outcome_sources) && e.outcome_sources.length) return e.outcome_sources;
  return Array.isArray(e.sources) ? e.sources : [];
}
