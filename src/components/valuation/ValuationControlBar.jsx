import { Search, X } from 'lucide-react';

// 밸류에이션 컨트롤바: 해외/국내 탭 · 세부업종 필터 · 검색 · 결과 카운트 (spec 023 §4.1).
// 스타일은 ScreenerControlBar 톤을 따른다.
export default function ValuationControlBar({
  market,
  onMarket,
  markets, // { us: {label,count}, kr: {label,count} }
  industry,
  onIndustry,
  industries,
  q,
  onQuery,
  resultCount,
  totalCount,
}) {
  const TABS = [
    { id: 'us', label: markets.us?.label ?? '해외', count: markets.us?.count ?? 0 },
    { id: 'kr', label: markets.kr?.label ?? '국내', count: markets.kr?.count ?? 0 },
  ];
  return (
    <div className="panel p-3 flex flex-wrap items-center gap-2.5">
      {/* 시장 탭 */}
      <div className="inline-flex rounded-lg border border-line bg-panel-2 p-0.5">
        {TABS.map((t) => {
          const active = market === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onMarket(t.id)}
              className={[
                'px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors flex items-center gap-1.5',
                active ? 'bg-panel-3 text-ink border border-line-2' : 'text-ink-3 hover:text-ink-2 border border-transparent',
              ].join(' ')}
            >
              {t.label}
              <span className="num text-[11px] font-medium text-ink-4">{t.count}</span>
            </button>
          );
        })}
      </div>

      {/* 세부업종 필터 */}
      <select
        value={industry}
        onChange={(e) => onIndustry(e.target.value)}
        className="bg-panel-2 border border-line rounded-lg px-2.5 py-1.5 text-[13px] text-ink-2 outline-none focus:border-line-2 max-w-[220px]"
      >
        <option value="all">세부업종 전체</option>
        {industries.map((ind) => (
          <option key={ind} value={ind}>
            {ind}
          </option>
        ))}
      </select>

      {/* 검색 */}
      <div className="relative flex-1 min-w-[160px] max-w-[320px]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-ink-4" strokeWidth={1.8} />
        <input
          value={q}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="티커·종목명 검색…"
          className="w-full bg-panel-2 border border-line rounded-lg pl-8 pr-8 py-1.5 text-[13px] text-ink outline-none focus:border-line-2"
        />
        {q && (
          <button
            onClick={() => onQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-4 hover:text-ink-2"
            title="검색 지우기"
          >
            <X className="w-[14px] h-[14px]" strokeWidth={2} />
          </button>
        )}
      </div>

      {/* 결과 카운트 */}
      <span className="mono text-[12px] text-ink-3 ml-auto whitespace-nowrap">
        {resultCount}
        <span className="text-ink-4"> / {totalCount}</span>
      </span>
    </div>
  );
}
