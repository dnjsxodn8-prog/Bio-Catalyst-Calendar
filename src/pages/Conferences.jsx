import { useMemo, useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterSelect from '../components/FilterSelect';
import ConferenceCard from '../components/ConferenceCard';
import {
  parseConferenceDates,
  todayMidnightUTC,
  parseDateUTC,
  daysUntil,
} from '../utils/format';

const PAST_LIMIT_DAYS = 30; // 과거 학회: 최근 30일치만 (종료일 기준)

export default function Conferences({ data }) {
  const { conferences, catalysts, companies } = data;
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('All');
  const [showPast, setShowPast] = useState(false);

  const companyByTicker = useMemo(() => {
    const m = new Map();
    for (const c of companies) m.set(c.ticker, c);
    return m;
  }, [companies]);

  // 학회 id (대문자) → 매칭되는 catalysts 리스트
  const presentationsByConfId = useMemo(() => {
    const m = new Map();
    for (const conf of conferences) {
      const idUpper = conf.id.toUpperCase();
      const re = new RegExp(`\\b${escapeRegExp(idUpper)}\\b`);
      const matches = catalysts
        .filter((c) => re.test(c.event || '') || c.ticker === idUpper)
        .map((c) => ({ ...c, _days: daysUntil(c.date) }))
        .sort((a, b) => (a.date || '').localeCompare(b.date || ''));
      m.set(conf.id, matches);
    }
    return m;
  }, [conferences, catalysts]);

  // 학회별 status (future / ongoing / past) + D-day 기반 정렬용
  const decorated = useMemo(() => {
    const today = todayMidnightUTC();
    return conferences.map((conf) => {
      const { start, end } = parseConferenceDates(conf.dates);
      const s = parseDateUTC(start);
      const e = parseDateUTC(end);
      let kind = 'unknown';
      if (s !== null && e !== null) {
        if (s <= today && today <= e) kind = 'ongoing';
        else if (e < today) kind = 'past';
        else kind = 'future';
      }
      const days = s !== null ? Math.round((s - today) / 86400000) : null;
      // 종료일 기준 며칠 지났는가 (양수 = 과거)
      const sinceEnd = e !== null ? Math.round((today - e) / 86400000) : null;
      return { ...conf, _kind: kind, _days: days, _sinceEnd: sinceEnd };
    });
  }, [conferences]);

  // 영역 옵션
  const areaOptions = useMemo(() => {
    const set = new Set();
    for (const c of conferences) for (const a of c.areas || []) set.add(a);
    return ['All', ...[...set].sort()];
  }, [conferences]);

  const filterFn = (c) => {
    if (area !== 'All' && !(c.areas || []).includes(area)) return false;
    const q = query.trim().toLowerCase();
    if (q) {
      const t = `${c.name} ${c.location ?? ''} ${c.notes ?? ''} ${(c.areas ?? []).join(' ')}`.toLowerCase();
      if (!t.includes(q)) return false;
    }
    return true;
  };

  const upcoming = useMemo(
    () =>
      decorated
        .filter((c) => c._kind === 'ongoing' || c._kind === 'future')
        .filter(filterFn)
        .sort((a, b) => (a._days ?? Infinity) - (b._days ?? Infinity)),
    [decorated, area, query] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const past = useMemo(
    () =>
      decorated
        .filter((c) => c._kind === 'past' && (c._sinceEnd ?? Infinity) <= PAST_LIMIT_DAYS)
        .filter(filterFn)
        .sort((a, b) => (a._sinceEnd ?? Infinity) - (b._sinceEnd ?? Infinity)), // 최근 종료 → 더 오래된
    [decorated, area, query] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="space-y-4">
      {/* 필터 바 */}
      <div className="flex flex-wrap items-center gap-2">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="학회명 · 위치 · 메모 검색"
        />
        <FilterSelect value={area} onChange={setArea} options={areaOptions} label="영역" />
      </div>

      {/* 카운트 */}
      <div className="flex items-center justify-between text-xs text-fg-muted">
        <div>
          <span className="text-fg font-mono tabular-nums">{upcoming.length}</span> /{' '}
          <span className="font-mono tabular-nums">{conferences.length}</span> 학회
        </div>
        <button
          onClick={() => setShowPast((s) => !s)}
          className="flex items-center gap-1 text-fg-muted hover:text-fg"
        >
          {showPast ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          과거 보기 ({past.length}, 최근 {PAST_LIMIT_DAYS}일)
        </button>
      </div>

      {/* 과거 학회 (토글 시 위쪽에 표시) */}
      {showPast && past.length > 0 ? (
        <>
          <div className="text-xs text-fg-dim uppercase tracking-wider pl-1">과거 (최근 {PAST_LIMIT_DAYS}일)</div>
          <div className="grid gap-4">
            {past.map((conf) => (
              <ConferenceCard
                key={`past-${conf.id}`}
                conference={conf}
                presentations={presentationsByConfId.get(conf.id) ?? []}
                companyByTicker={companyByTicker}
              />
            ))}
          </div>
          <div className="text-xs text-fg-dim uppercase tracking-wider pl-1 mt-2">예정</div>
        </>
      ) : null}

      {/* 진행 중 + 다가오는 학회 */}
      <div className="grid gap-4">
        {upcoming.length === 0 ? (
          <div className="rounded-xl border border-border bg-bg-card p-8 text-sm text-fg-muted text-center">
            조건에 맞는 학회 없음.
          </div>
        ) : (
          upcoming.map((conf) => (
            <ConferenceCard
              key={conf.id}
              conference={conf}
              presentations={presentationsByConfId.get(conf.id) ?? []}
              companyByTicker={companyByTicker}
            />
          ))
        )}
      </div>
    </div>
  );
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
