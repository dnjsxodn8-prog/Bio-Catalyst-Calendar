import { useMemo, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterSelect from '../components/FilterSelect';
import CatalystRow from '../components/CatalystRow';
import { daysUntil } from '../utils/format';

const TYPE_OPTIONS = ['All', 'PDUFA', 'Conference', 'Clinical Readout', 'Regulatory'];
const PAST_LIMIT_DAYS = 30; // 과거 보기는 최근 30일치만

export default function Catalysts({ data }) {
  const { companies, catalysts, prices = {} } = data;
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [showPast, setShowPast] = useState(false);

  const companyByTicker = useMemo(() => {
    const m = new Map();
    for (const c of companies) m.set(c.ticker, c);
    return m;
  }, [companies]);

  const dated = useMemo(() => {
    return catalysts
      .map((c) => ({ ...c, _days: daysUntil(c.date) }))
      .filter((c) => c._days !== null);
  }, [catalysts]);

  const filterFn = (c) => {
    if (type !== 'All' && c.type !== type) return false;
    const q = query.trim().toLowerCase();
    if (q) {
      const t = `${c.ticker} ${c.event} ${c.drug ?? ''} ${c.indication ?? ''}`.toLowerCase();
      if (!t.includes(q)) return false;
    }
    return true;
  };

  const future = useMemo(
    () =>
      dated
        .filter((c) => c._days >= 0)
        .filter(filterFn)
        .sort((a, b) => a._days - b._days),
    [dated, type, query] // eslint-disable-line react-hooks/exhaustive-deps
  );
  // 과거 보기: 지난 30일치만
  const past = useMemo(
    () =>
      dated
        .filter((c) => c._days < 0 && c._days >= -PAST_LIMIT_DAYS)
        .filter(filterFn)
        .sort((a, b) => b._days - a._days), // 최근 → 오래된
    [dated, type, query] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="space-y-4">
      {/* 필터 바 */}
      <div className="flex flex-wrap items-center gap-2">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="ticker · 이벤트 · 약물 · 적응증 검색"
        />
        <FilterSelect value={type} onChange={setType} options={TYPE_OPTIONS} label="Type" />
      </div>

      {/* 카운트 */}
      <div className="flex items-center justify-between text-xs text-fg-muted">
        <div>
          <span className="text-fg font-mono tabular-nums">{future.length}</span> /{' '}
          <span className="font-mono tabular-nums">{catalysts.length}</span> 이벤트
        </div>
        <button
          onClick={() => setShowPast((s) => !s)}
          className="flex items-center gap-1 text-fg-muted hover:text-fg"
        >
          {showPast ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          과거 보기 ({past.length}, 최근 {PAST_LIMIT_DAYS}일)
        </button>
      </div>

      {/* 과거 카탈리스트 (토글 시 위쪽에 표시) */}
      {showPast && past.length > 0 ? (
        <>
          <div className="text-xs text-fg-dim uppercase tracking-wider pl-1">과거 (최근 {PAST_LIMIT_DAYS}일)</div>
          <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
            {past.map((c, i) => (
              <CatalystRow
                key={`past-${c.ticker}-${c.date}-${i}`}
                catalyst={c}
                company={companyByTicker.get(c.ticker)}
                priceCache={prices[c.ticker]}
              />
            ))}
          </div>
          <div className="text-xs text-fg-dim uppercase tracking-wider pl-1 mt-2">예정</div>
        </>
      ) : null}

      {/* 미래 카탈리스트 */}
      <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
        {future.length === 0 ? (
          <div className="p-8 text-sm text-fg-muted text-center">조건에 맞는 카탈리스트 없음.</div>
        ) : (
          future.map((c, i) => (
            <CatalystRow
              key={`${c.ticker}-${c.date}-${i}`}
              catalyst={c}
              company={companyByTicker.get(c.ticker)}
            />
          ))
        )}
      </div>
    </div>
  );
}
