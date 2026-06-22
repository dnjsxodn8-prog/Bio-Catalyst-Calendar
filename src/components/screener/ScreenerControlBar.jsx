import { Table2, ScatterChart, SlidersHorizontal, Star, ArrowUpDown } from 'lucide-react';
import {
  SORT_KEYS,
  countActiveFacets,
  serializeFilters,
  parseFilters,
} from '../../utils/screenerFilters';

// 통합 컨트롤 바 (spec 020 §3): 뷰 토글 · 검색 · 정렬 · 필터 · 저장검색.
export default function ScreenerControlBar({
  filters,
  setFilters,
  filterOpen,
  setFilterOpen,
  saved,
  resultCount,
  totalCount,
}) {
  const f = filters;
  const facetN = countActiveFacets(f);
  const setView = (view) => setFilters({ ...f, view });
  const setSort = (key) => setFilters({ ...f, sort: { ...f.sort, key } });
  const toggleDir = () =>
    setFilters({ ...f, sort: { ...f.sort, dir: f.sort.dir === 'asc' ? 'desc' : 'asc' } });

  const onSave = () => {
    const name = window.prompt('이 검색을 저장할 이름:');
    if (name && name.trim()) saved.save(name, serializeFilters(f));
  };
  const onApply = (params) => setFilters(parseFilters(params));

  return (
    <div className="panel p-3 sticky top-[64px] z-20">
      <div className="flex items-center gap-2 flex-wrap">
        {/* 뷰 토글 */}
        <div className="inline-flex rounded-md border border-line overflow-hidden">
          <ViewTab active={f.view === 'table'} onClick={() => setView('table')} icon={Table2}>테이블</ViewTab>
          <ViewTab active={f.view === 'chart'} onClick={() => setView('chart')} icon={ScatterChart}>차트</ViewTab>
        </div>

        {/* 인라인 검색 */}
        <input
          type="text"
          value={f.q}
          onChange={(e) => setFilters({ ...f, q: e.target.value })}
          placeholder="이 목록 내 검색 (티커·회사명)"
          className="bg-panel-2 text-ink border border-line rounded-md px-3 py-1.5 text-[13px] flex-1 min-w-[160px] placeholder:text-ink-4"
        />

        {/* 정렬 */}
        <div className="flex items-center gap-1">
          <select
            value={f.sort.key}
            onChange={(e) => setSort(e.target.value)}
            className="bg-panel-2 text-ink border border-line rounded-md px-2 py-1.5 text-[12px]"
            title="정렬 기준"
          >
            {SORT_KEYS.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
          <button onClick={toggleDir} className="btn btn-icon" title={f.sort.dir === 'asc' ? '오름차순' : '내림차순'}>
            <ArrowUpDown className="w-4 h-4" strokeWidth={1.6} />
            <span className="sr-only">{f.sort.dir}</span>
          </button>
        </div>

        {/* 필터 토글 */}
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-[13px] transition-colors ${
            filterOpen || facetN
              ? 'bg-acc/15 border-acc/50 text-ink'
              : 'bg-panel-2 border-line text-ink-2 hover:border-line-2'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" strokeWidth={1.6} />
          필터{facetN ? ` (${facetN})` : ''}
        </button>

        {/* 저장검색 셀렉터 */}
        <details className="relative">
          <summary className="list-none cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-line bg-panel-2 text-ink-2 text-[13px] hover:border-line-2">
            <Star className="w-4 h-4" strokeWidth={1.6} />
            저장검색
          </summary>
          <div className="absolute right-0 mt-1.5 w-64 panel p-2 z-30 shadow-xl">
            <button
              onClick={onSave}
              className="w-full text-left px-2.5 py-1.5 rounded-md text-[13px] text-ink hover:bg-white/[0.05]"
            >
              ★ 현재 검색 저장…
            </button>
            <div className="border-t border-line my-1.5" />
            {!saved.searches.length ? (
              <div className="px-2.5 py-1.5 text-[12px] text-ink-4">저장된 검색 없음</div>
            ) : (
              saved.searches.map((s) => (
                <div key={s.id} className="flex items-center gap-1 group">
                  <button
                    onClick={() => onApply(s.params)}
                    className="flex-1 text-left px-2.5 py-1.5 rounded-md text-[13px] text-ink-2 hover:bg-white/[0.05] truncate"
                    title={s.name}
                  >
                    {s.name}
                  </button>
                  <button
                    onClick={() => saved.remove(s.id)}
                    className="px-2 py-1 text-ink-4 hover:text-danger text-[12px]"
                    title="삭제"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </details>
      </div>

      <div className="text-[12px] text-ink-4 mt-2">
        전체 {totalCount}개 중 <b className="text-ink-2">{resultCount}</b>개 표시
      </div>
    </div>
  );
}

function ViewTab({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold transition-colors ${
        active ? 'bg-ink text-bg' : 'bg-panel-2 text-ink-3 hover:text-ink-2'
      }`}
    >
      <Icon className="w-4 h-4" strokeWidth={1.6} />
      {children}
    </button>
  );
}
