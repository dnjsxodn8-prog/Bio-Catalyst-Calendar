import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import FilterSelect from '../components/FilterSelect';
import CompanyRow from '../components/CompanyRow';
import { daysUntil } from '../utils/format';

const SORTS = {
  'mcap-desc': { label: '시총 ↓', cmp: (a, b) => (b.mcap ?? 0) - (a.mcap ?? 0) },
  'mcap-asc': { label: '시총 ↑', cmp: (a, b) => (a.mcap ?? 0) - (b.mcap ?? 0) },
  'dday-asc': {
    label: 'D-day ↑',
    cmp: (a, b) => {
      const aD = a._next?._days;
      const bD = b._next?._days;
      // 카탈리스트 없는 종목은 맨 뒤로
      if (aD == null && bD == null) return (b.mcap ?? 0) - (a.mcap ?? 0);
      if (aD == null) return 1;
      if (bD == null) return -1;
      return aD - bD;
    },
  },
};

export default function Companies({ data }) {
  const { companies, catalysts, prices = {} } = data;
  const [query, setQuery] = useState('');
  const [modality, setModality] = useState('All');
  const [area, setArea] = useState('All');
  const [sortKey, setSortKey] = useState('mcap-desc');

  // ticker → 가장 가까운 미래 카탈리스트
  const nextByTicker = useMemo(() => {
    const m = new Map();
    for (const c of catalysts) {
      const days = daysUntil(c.date);
      if (days === null || days < 0) continue;
      const prev = m.get(c.ticker);
      if (!prev || days < prev._days) {
        m.set(c.ticker, { ...c, _days: days });
      }
    }
    return m;
  }, [catalysts]);

  // Modality 옵션 (데이터에 등장하는 것만)
  const modalityOptions = useMemo(() => {
    return ['All', ...new Set(companies.map((c) => c.modality).filter(Boolean))].sort((a, b) =>
      a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)
    );
  }, [companies]);

  // Area 옵션 (데이터에 등장하는 모든 영역, 유니크)
  const areaOptions = useMemo(() => {
    const set = new Set();
    for (const c of companies) for (const a of c.areas || []) set.add(a);
    return ['All', ...[...set].sort()];
  }, [companies]);

  // 필터링·정렬
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = companies
      .filter((c) => {
        if (modality !== 'All' && c.modality !== modality) return false;
        if (area !== 'All' && !(c.areas || []).includes(area)) return false;
        if (q) {
          const t = c.ticker?.toLowerCase() ?? '';
          const n = c.company?.toLowerCase() ?? '';
          if (!t.includes(q) && !n.includes(q)) return false;
        }
        return true;
      })
      .map((c) => ({ ...c, _next: nextByTicker.get(c.ticker) ?? null }));

    matched.sort(SORTS[sortKey].cmp);
    return matched;
  }, [companies, query, modality, area, sortKey, nextByTicker]);

  return (
    <div className="space-y-4">
      {/* 필터 바 */}
      <div className="flex flex-wrap items-center gap-2">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="ticker 또는 회사명 검색"
        />
        <FilterSelect value={modality} onChange={setModality} options={modalityOptions} label="Modality" />
        <FilterSelect value={area} onChange={setArea} options={areaOptions} label="영역" />
        <FilterSelect
          value={sortKey}
          onChange={setSortKey}
          options={Object.keys(SORTS).map((k) => ({ value: k, label: SORTS[k].label }))}
          label="정렬"
        />
      </div>

      {/* 카운트 */}
      <div className="text-xs text-fg-muted">
        <span className="text-fg font-mono tabular-nums">{filtered.length}</span> /{' '}
        <span className="font-mono tabular-nums">{companies.length}</span> 종목
      </div>

      {/* 행 리스트 */}
      <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-sm text-fg-muted text-center">조건에 맞는 종목 없음.</div>
        ) : (
          filtered.map((c) => (
            <CompanyRow
              key={c.ticker}
              company={c}
              nextCatalyst={c._next}
              priceCache={prices[c.ticker]}
            />
          ))
        )}
      </div>
    </div>
  );
}

