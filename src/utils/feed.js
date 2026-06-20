// 피드 헬퍼 — Dashboard 최근결과 위젯 + CompanyDetail 기업별 뉴스 공용 (spec 016).
// feed 항목 shape: { date, ticker, kind:'catalyst'|'news', outcome?, type?, headline, summary, sources[] }
import { outcomeMeta } from './outcome';

export const NEWS_TYPE_META = {
  Financing: { label: 'Financing', color: '#93A4B8' },
  Licensing: { label: 'Licensing', color: '#A3A3B8' },
  Partnership: { label: 'Partner', color: '#8FA7C7' },
  MnA: { label: 'M&A', color: '#B4A28C' },
  Pipeline: { label: 'Pipeline', color: '#9CA3AF' },
  Regulatory: { label: 'Regulatory', color: '#A8A29E' },
  Personnel: { label: 'Personnel', color: '#94A3B8' },
  Other: { label: 'Other', color: '#A1A1AA' },
};

export function feedBadge(item) {
  if (item.kind === 'catalyst') {
    return outcomeMeta(item.outcome) || { label: item.outcome || 'Result', color: '#9CA3AF' };
  }
  return NEWS_TYPE_META[item.type] || { label: item.type || 'News', color: '#9CA3AF' };
}

// data.feed 에서 특정 ticker 항목만 (feed 는 이미 date 내림차순).
export function feedForTicker(data, ticker) {
  const t = String(ticker || '').toUpperCase();
  return (data?.feed || []).filter((f) => String(f.ticker || '').toUpperCase() === t);
}

export function fmtFeedDate(v) {
  if (!v) return '—';
  const [y, m, d] = String(v).slice(0, 10).split('-');
  if (!y || !m || !d) return String(v);
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[Number(m) - 1] || m} ${d}, ${y}`;
}

export function feedHost(u) {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return u;
  }
}
