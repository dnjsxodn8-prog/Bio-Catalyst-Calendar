import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePrivateData } from '../store/privateData';
import { useSavedSearches } from '../utils/userPrefs';
import {
  parseFilters,
  serializeFilters,
  applyFilters,
  sortPoints,
  facetOptions,
  clearAllFacets,
} from '../utils/screenerFilters';
import ScreenerControlBar from '../components/screener/ScreenerControlBar';
import ScreenerFilterPanel from '../components/screener/ScreenerFilterPanel';
import ActiveFilterChips from '../components/screener/ActiveFilterChips';
import ScreenerTable from '../components/screener/ScreenerTable';
import ScreenerCardList from '../components/screener/ScreenerCardList';
import ScreenerChart from '../components/screener/ScreenerChart';
import { COLOR } from '../components/screener/screenerFormat';
import SelectionPanel from '../components/screener/SelectionPanel';
import ReratingSection from '../components/screener/ReratingSection';
import ScreenerCompareTray from '../components/screener/ScreenerCompareTray';
import ScreenerCompare from '../components/screener/ScreenerCompare';

const COMPARE_MAX = 4;

// 좁은 폭(모바일) 감지 → 테이블 대신 카드 리스트
function useIsNarrow(maxWidth = 720) {
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width:${maxWidth}px)`).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${maxWidth}px)`);
    const on = (e) => setNarrow(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [maxWidth]);
  return narrow;
}

export default function Screener({ query, onOpenCompany }) {
  const { screener } = usePrivateData();
  const points = useMemo(
    () => screener.points.map((p, i) => ({ ...p, _i: i })),
    [screener]
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFiltersState] = useState(() => parseFilters(searchParams));
  const [selected, setSelected] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [compareTickers, setCompareTickers] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const saved = useSavedSearches();
  const isNarrow = useIsNarrow();

  const toggleCompare = useCallback((t) => {
    setCompareTickers((prev) =>
      prev.includes(t)
        ? prev.filter((x) => x !== t)
        : prev.length >= COMPARE_MAX
          ? prev
          : [...prev, t]
    );
  }, []);

  // 선택 순서 유지하며 point 객체로 매핑
  const compareItems = useMemo(() => {
    const byT = new Map(points.map((p) => [p.t, p]));
    return compareTickers.map((t) => byT.get(t)).filter(Boolean);
  }, [compareTickers, points]);
  const compareFull = compareTickers.length >= COMPARE_MAX;
  const showCompare = compareOpen && compareItems.length >= 2;

  // 필터 변경 → 상태 + URL(replace) 동기화
  const setFilters = useCallback(
    (next) => {
      setFiltersState(next);
      setSearchParams(serializeFilters(next), { replace: true });
    },
    [setSearchParams]
  );

  // 전역 검색어(Topbar) 매칭 — 빠른 점프 카드 (기존 spec 012 §2.5 동작 유지)
  const searchMatches = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return [];
    return points
      .filter((d) => d.t.toLowerCase().includes(q) || (d.c || '').toLowerCase().includes(q))
      .sort((a, b) => {
        const ax = a.t.toLowerCase() === q ? 0 : a.t.toLowerCase().startsWith(q) ? 1 : 2;
        const bx = b.t.toLowerCase() === q ? 0 : b.t.toLowerCase().startsWith(q) ? 1 : 2;
        return ax !== bx ? ax - bx : (b.m ?? 0) - (a.m ?? 0);
      })
      .slice(0, 6);
  }, [query, points]);

  const facetOpts = useMemo(() => facetOptions(points), [points]);
  const filtered = useMemo(() => applyFilters(points, filters), [points, filters]);
  const sorted = useMemo(
    () => sortPoints(filtered, filters.sort.key, filters.sort.dir),
    [filtered, filters.sort]
  );

  const onSort = useCallback(
    (key) =>
      setFilters({
        ...filters,
        sort: {
          key,
          dir: filters.sort.key === key && filters.sort.dir === 'desc' ? 'asc' : 'desc',
        },
      }),
    [filters, setFilters]
  );

  const onChartChange = useCallback(
    (patch) => setFilters({ ...filters, chart: { ...filters.chart, ...patch } }),
    [filters, setFilters]
  );

  if (!screener.points.length) {
    return (
      <div className="panel p-8 text-center text-ink-3 text-sm">
        스크리너 데이터가 비어 있습니다. 로컬에서 <code className="mono">npm run build-screener</code> 실행 후 다시 빌드하세요.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Header counts={screener.counts} coverage={screener.coverage} generated={screener.generated} />

      {searchMatches.length > 0 && (
        <div className="panel p-4">
          <div className="text-[12px] text-ink-3 mb-2.5 mono tracking-[0.04em]">
            검색 결과 · “{query}” ({searchMatches.length})
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {searchMatches.map((d) => (
              <button
                key={d.t}
                onClick={() => onOpenCompany?.(d.t)}
                className="flex items-center gap-3 text-left bg-panel-2 border border-line rounded-[10px] px-3 py-2.5 hover:border-line-2 transition-colors"
              >
                <span className="mono text-[13px] font-bold text-ink w-[52px] flex-shrink-0 truncate">{d.t}</span>
                <span className="flex flex-col min-w-0 flex-1">
                  <span className="text-[12px] text-ink-2 truncate">{d.c}</span>
                  <span className="mono text-[11px] text-ink-3">
                    G{d.g} · E{d.e} · {d.grp}
                    {d.rl && d.rl !== 'No Rerating Signal' ? ` · ${d.rl}` : ''}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showCompare ? (
        <ScreenerCompare
          items={compareItems}
          onClose={() => setCompareOpen(false)}
          onRemove={toggleCompare}
          onOpenCompany={onOpenCompany}
        />
      ) : (
        <>
          <ScreenerControlBar
            filters={filters}
            setFilters={setFilters}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            saved={saved}
            resultCount={sorted.length}
            totalCount={points.length}
          />

          {filterOpen && (
            <ScreenerFilterPanel filters={filters} setFilters={setFilters} facetOpts={facetOpts} />
          )}

          <ActiveFilterChips filters={filters} setFilters={setFilters} />

          <SelectionPanel
            selected={selected}
            onOpenCompany={onOpenCompany}
            onClear={() => setSelected(null)}
          />

          {sorted.length === 0 ? (
            <EmptyState onClear={() => setFilters(clearAllFacets(filters))} />
          ) : filters.view === 'table' ? (
            isNarrow ? (
              <ScreenerCardList
                rows={sorted}
                selected={selected}
                onSelect={setSelected}
                onOpenCompany={onOpenCompany}
                compareSet={compareTickers}
                onToggleCompare={toggleCompare}
                compareFull={compareFull}
              />
            ) : (
              <ScreenerTable
                rows={sorted}
                sort={filters.sort}
                onSort={onSort}
                selected={selected}
                onSelect={setSelected}
                onOpenCompany={onOpenCompany}
                compareSet={compareTickers}
                onToggleCompare={toggleCompare}
                compareFull={compareFull}
                compareMax={COMPARE_MAX}
              />
            )
          ) : (
            <>
              <ScreenerChart
                points={filtered}
                chart={filters.chart}
                onChartChange={onChartChange}
                onSelect={setSelected}
              />
              <ReratingSection points={filtered} onOpenCompany={onOpenCompany} />
            </>
          )}
        </>
      )}

      {/* 트레이가 하단 콘텐츠를 가리지 않도록 여백 */}
      {compareTickers.length > 0 && <div className="h-16" />}

      <ScreenerCompareTray
        items={compareItems}
        max={COMPARE_MAX}
        onRemove={toggleCompare}
        onClear={() => {
          setCompareTickers([]);
          setCompareOpen(false);
        }}
        onOpen={() => setCompareOpen(true)}
      />
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="panel p-8 text-center text-ink-3 text-sm">
      <p>조건에 맞는 종목이 없습니다. 필터를 완화하세요.</p>
      <button
        onClick={onClear}
        className="mt-3 px-3 py-1.5 rounded-md border border-line bg-panel-2 text-ink-2 text-[13px] hover:border-line-2"
      >
        필터 전체 해제
      </button>
    </div>
  );
}

function Header({ counts, coverage, generated }) {
  const date = (generated || '').slice(0, 10);
  const order = ['위대한 후보', '관찰 후보', '무등급', '부적격'];
  return (
    <div>
      <h1 className="text-[22px] font-bold tracking-[-0.02em] text-ink">🧬 Great Biotech Screener</h1>
      <p className="text-[13px] text-ink-3 mt-1.5 leading-relaxed max-w-3xl">
        <b className="text-ink-2">G</b> 과학적 위대함 · <b className="text-ink-2">E</b> 실행/번역 능력 · <b className="text-ink-2">T1</b> 임박도 ·
        점 크기 = 시총 · 색 = 등급. 노란 테두리 = Rerating watchlist.
      </p>
      <div className="flex items-center gap-2 flex-wrap mt-3 text-[12px]">
        {order
          .filter((k) => counts[k])
          .map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-panel-2 border border-line">
              <span className="w-2 h-2 rounded-full" style={{ background: COLOR[k] }} />
              <span className="text-ink-2">{k}</span>
              <span className="num font-semibold text-ink">{counts[k]}</span>
            </span>
          ))}
        <span className="text-ink-4 ml-1">
          · {coverage?.total ?? 0}종 · Calendar 연동 {coverage?.inCalendar ?? 0}종 · {date}
        </span>
      </div>
    </div>
  );
}
