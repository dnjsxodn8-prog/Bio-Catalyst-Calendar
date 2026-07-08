// 밸류에이션 표 포맷·색상·링크 헬퍼 (spec 023 §4.1)

// 금액: 해외 $M, 국내 억원 (market 별 분기)
export function fmtMoney(v, market) {
  if (v == null) return '—';
  const neg = v < 0 ? '-' : '';
  const a = Math.abs(v);
  if (market === 'kr') {
    // 입력 단위 = 억원. 1만억 = 1조.
    if (a >= 10000) return `${neg}${(a / 10000).toFixed(2)}조`;
    return `${neg}${Math.round(a).toLocaleString('en-US')}억`;
  }
  // 해외 = $M. 1000M = $1B.
  if (a >= 1000) return `${neg}$${(a / 1000).toFixed(1)}B`;
  return `${neg}$${Math.round(a).toLocaleString('en-US')}M`;
}

export function fmtRatio(v) {
  return v == null ? '—' : v.toFixed(2);
}

export function fmtPct(v) {
  return v == null ? '—' : `${v.toFixed(1)}%`;
}

// PEG 색상 스케일 (낮을수록 저평가·good). spec 023 §4.2.
// 반투명 배경 — 다크/라이트 모두에서 셀 텍스트 가독성 유지.
export function pegColor(v) {
  if (v == null) return 'transparent';
  if (v <= 0.5) return 'rgba(34, 197, 94, 0.30)'; // 진초록
  if (v <= 1.0) return 'rgba(52, 211, 153, 0.22)'; // 초록
  if (v <= 1.5) return 'rgba(163, 230, 53, 0.20)'; // 연두
  if (v <= 2.0) return 'rgba(251, 191, 36, 0.20)'; // 노랑
  if (v <= 3.0) return 'rgba(249, 115, 22, 0.20)'; // 주황
  return 'rgba(248, 113, 113, 0.20)'; // 빨강
}

// 티커 → 원본 (해외 Finviz / 국내 네이버 모바일 증권)
export function sourceUrl(row, market) {
  if (market === 'kr') return `https://m.stock.naver.com/domestic/stock/${row.t}/total`;
  return `https://finviz.com/quote.ashx?t=${encodeURIComponent(row.t)}`;
}
