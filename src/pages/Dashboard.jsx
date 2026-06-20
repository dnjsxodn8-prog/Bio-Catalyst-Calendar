import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X, ScatterChart, ArrowRight } from 'lucide-react';
import screener from '../screener.generated.json';
import FeedList from '../components/FeedList';
import {
  dDelta,
  fmtD,
  dClass,
  fmtDate,
  fmtWeekday,
  phaseClass,
  typeClass,
} from '../utils/dDay';

export default function Dashboard({ data, query, onPick }) {
  const { catalysts } = data;
  const [selectedKpi, setSelectedKpi] = useState(null);

  const dated = useMemo(
    () =>
      catalysts
        .map((c) => ({ ...c, _d: dDelta(c.date) }))
        .filter((c) => c._d !== null),
    [catalysts]
  );

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return dated;
    return dated.filter((c) => {
      const blob = [c.ticker, c.event, c.drug, c.indication, c.type, c.phase]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [dated, query]);

  const toggleKpi = (key) =>
    setSelectedKpi((prev) => (prev === key ? null : key));

  return (
    <div className="space-y-6">
      <ScreenerBanner />
      <KpiStrip
        dated={filtered}
        selected={selectedKpi}
        onSelect={toggleKpi}
      />
      {selectedKpi && (
        <KpiList
          dated={filtered}
          selected={selectedKpi}
          onPick={onPick}
          onClose={() => setSelectedKpi(null)}
        />
      )}
      <HeroWeek dated={filtered} onPick={onPick} />
      <RecentResults feed={data.feed} onPick={onPick} />
    </div>
  );
}

function ScreenerBanner() {
  const c = screener.counts || {};
  const great = c['위대한 후보'] || 0;
  const watch = c['관찰 후보'] || 0;
  const total = screener.coverage?.total || 0;
  return (
    <Link
      to="/app/screener"
      className="group relative overflow-hidden rounded-lg flex items-center gap-4 px-5 py-4 border transition-colors"
      style={{
        background:
          'linear-gradient(120deg, rgba(34,197,94,0.10), rgba(59,130,246,0.06) 55%, var(--panel))',
        borderColor: 'rgba(34,197,94,0.30)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{ top: -70, right: -40, width: 220, height: 220, background: 'radial-gradient(closest-side, rgba(34,197,94,0.18), transparent 70%)' }}
      />
      <div
        className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 border"
        style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)' }}
      >
        <ScatterChart className="w-5 h-5" style={{ color: '#22c55e' }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-bold text-ink">Great Biotech Screener</span>
          <span className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase">G × E × T1</span>
        </div>
        <div className="text-[12.5px] text-ink-3 mt-1">
          미국 바이오텍 {total}종 G·E 스크리닝 ·{' '}
          <span className="text-[#22c55e] font-semibold">위대한 후보 {great}</span> ·{' '}
          <span className="text-[#3b82f6] font-semibold">관찰 후보 {watch}</span>
        </div>
      </div>
      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-2 group-hover:text-ink whitespace-nowrap">
        차트 열기
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
      </span>
    </Link>
  );
}

const KPI_DEFS = {
  '7d': {
    label: '7일 이내',
    accent: '#F87171',
    test: (c) => c._d >= 0 && c._d <= 7,
  },
  '30d': {
    label: '30일 이내',
    accent: '#FBBF24',
    test: (c) => c._d >= 0 && c._d <= 30,
  },
  PDUFA: {
    label: 'PDUFA 대기',
    accent: '#FBBF24',
    test: (c) => c._d >= 0 && c.type === 'PDUFA',
  },
  'Clinical Readout': {
    label: '임상 readout',
    accent: '#C084FC',
    test: (c) => c._d >= 0 && c.type === 'Clinical Readout',
  },
  Conference: {
    label: '학회 발표',
    accent: '#60A5FA',
    test: (c) => c._d >= 0 && c.type === 'Conference',
  },
};

function KpiStrip({ dated, selected, onSelect }) {
  const within = (n) => dated.filter((c) => c._d >= 0 && c._d <= n).length;
  const byType = (t) => dated.filter((c) => c.type === t && c._d >= 0).length;
  const total = dated.filter((c) => c._d >= 0).length;

  // Spark mini-bars: count per week bucket within the relevant horizon
  const buckets = (window) => {
    const out = Array(Math.max(1, Math.ceil(window / 7))).fill(0);
    for (const c of dated) {
      if (c._d < 0 || c._d > window) continue;
      const b = Math.floor(c._d / 7);
      if (b < out.length) out[b] += 1;
    }
    return out.length ? out : [1];
  };

  const kpis = [
    { key: '7d', label: '7일 이내', sub: 'this week · D-7', value: within(7), accent: '#F87171', spark: buckets(7) },
    { key: '30d', label: '30일 이내', sub: 'next 30d', value: within(30), accent: '#FBBF24', spark: buckets(30) },
    { key: 'PDUFA', label: 'PDUFA 대기', sub: 'fda decisions', value: byType('PDUFA'), accent: '#FBBF24', spark: buckets(60) },
    { key: 'Clinical Readout', label: '임상 readout', sub: 'clinical readouts', value: byType('Clinical Readout'), accent: '#C084FC', spark: buckets(60) },
    { key: 'Conference', label: '학회 발표', sub: 'conference talks', value: byType('Conference'), accent: '#60A5FA', spark: buckets(90) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {kpis.map((k) => {
        const active = selected === k.key;
        return (
          <button
            key={k.key}
            type="button"
            onClick={() => onSelect && onSelect(k.key)}
            aria-pressed={active}
            className="kpi text-left cursor-pointer transition-all hover:brightness-110"
            style={{
              '--accent-color': k.accent,
              borderColor: active ? k.accent : undefined,
              boxShadow: active ? `0 0 0 1px ${k.accent}` : undefined,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="kpi-label">{k.label}</span>
              <span className="flex items-end gap-[2px] h-[18px]">
                {k.spark.map((v, j) => (
                  <span
                    key={j}
                    className="rounded-[1px]"
                    style={{
                      width: 4,
                      height: `${Math.max(3, Math.min(v + 1, 5) * 4)}px`,
                      background: j === k.spark.length - 1 ? k.accent : 'var(--ink-4)',
                      opacity: j === k.spark.length - 1 ? 1 : 0.5,
                    }}
                  />
                ))}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="kpi-value">{k.value}</span>
              <span className="num text-[11px] text-ink-3">/ {total}</span>
            </div>
            <div className="kpi-sub">{k.sub}</div>
          </button>
        );
      })}
    </div>
  );
}

function KpiList({ dated, selected, onPick, onClose }) {
  const def = KPI_DEFS[selected];
  const events = useMemo(
    () => dated.filter(def.test).sort((a, b) => a._d - b._d),
    [dated, def]
  );

  return (
    <section>
      <div className="section-h">
        <h2>
          <span style={{ color: def.accent }}>●</span> {def.label}
        </h2>
        <span className="meta flex items-center gap-3">
          {events.length} EVENTS
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-5 h-5 rounded hover:bg-white/10 text-ink-3 hover:text-ink"
            aria-label="닫기"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.6} />
          </button>
        </span>
      </div>
      <div className="panel overflow-hidden">
        {events.length === 0 ? (
          <div className="p-6 text-center text-ink-3 text-sm">
            조건에 맞는 카탈리스트가 없습니다.
          </div>
        ) : (
          events.map((c, i) => (
            <div
              key={`${c.ticker}-${c.date}-${i}`}
              className="ev-row"
              onClick={() => onPick && onPick(c)}
            >
              <span className={`d-counter ${dClass(c._d)}`}>{fmtD(c._d)}</span>
              <span className="ev-date">
                {fmtDate(c.date)} · {fmtWeekday(c.date)}
              </span>
              <span className="ev-ticker">{c.ticker}</span>
              <span className="ev-title">
                {c.drug && <b>{c.drug}</b>}
                {c.drug && c.indication && ' · '}
                {c.indication && <span className="text-ink-3">{c.indication}</span>}
                {!c.drug && !c.indication && <span className="text-ink-3">{c.event}</span>}
              </span>
              {c.phase ? (
                <span className={`chip ${phaseClass(c.phase)}`}>{c.phase}</span>
              ) : (
                <span />
              )}
              <span className={`chip ${typeClass(c.type)}`}>{c.type}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function HeroWeek({ dated, onPick }) {
  const sorted = useMemo(
    () =>
      dated
        .filter((c) => c._d >= -1 && c._d <= 7)
        .sort((a, b) => a._d - b._d),
    [dated]
  );

  if (sorted.length === 0) {
    return (
      <div className="panel p-6 text-center text-ink-3 text-sm">
        이번 주 카탈리스트가 없습니다.
      </div>
    );
  }

  const featured = sorted[0];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5">
      {/* Featured "today" card */}
      <div
        className="relative overflow-hidden rounded-lg cursor-pointer"
        style={{
          padding: '24px 24px 20px',
          background:
            'linear-gradient(160deg, rgba(248,113,113,0.10) 0%, rgba(192,132,252,0.06) 50%, rgba(11,15,21,0.4) 100%), var(--panel)',
          border: '1px solid rgba(248,113,113,0.30)',
          boxShadow: '0 30px 60px -30px rgba(248,113,113,0.30)',
        }}
        onClick={() => onPick && onPick(featured)}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            top: -80,
            right: -60,
            width: 240,
            height: 240,
            background:
              'radial-gradient(closest-side, rgba(251,191,36,0.30), transparent 70%)',
          }}
        />
        <div className="flex items-center gap-2.5 mb-3.5">
          <span
            className="d-counter imminent"
            style={{ fontSize: 12, height: 28, padding: '0 10px' }}
          >
            {fmtD(featured._d)} {featured._d === 0 ? '· TODAY' : ''}
          </span>
          <span className={`chip ${typeClass(featured.type)}`}>{featured.type}</span>
          {featured.phase && (
            <span className={`chip ${phaseClass(featured.phase)}`}>{featured.phase}</span>
          )}
        </div>

        <div className="mono text-[11px] text-ink-3 tracking-[0.12em] uppercase mb-1.5">
          {featured.ticker} · {fmtDate(featured.date)} · {featured.date.slice(0, 4)}
        </div>
        <h2 className="m-0 text-[21px] font-bold leading-snug tracking-[-0.015em] text-ink">
          {featured.event}
        </h2>
        {(featured.drug || featured.indication) && (
          <div className="text-[13.5px] text-ink-2 mt-2.5 leading-relaxed">
            {featured.drug && <b className="text-ink">{featured.drug}</b>}
            {featured.drug && featured.indication && ' · '}
            {featured.indication}
          </div>
        )}

        <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-[var(--hairline)]">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              onPick && onPick(featured);
            }}
          >
            상세 보기 <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* This week list */}
      <div className="flex flex-col">
        <div className="section-h">
          <h2>이번 주 카탈리스트</h2>
          <span className="meta">{sorted.length} EVENTS</span>
        </div>
        <div className="panel overflow-hidden">
          {sorted.map((c, i) => (
            <div key={`${c.ticker}-${c.date}-${i}`} className="ev-row" onClick={() => onPick && onPick(c)}>
              <span className={`d-counter ${dClass(c._d)}`}>{fmtD(c._d)}</span>
              <span className="ev-date">
                {fmtDate(c.date)} · {fmtWeekday(c.date)}
              </span>
              <span className="ev-ticker">{c.ticker}</span>
              <span className="ev-title">
                {c.drug && <b>{c.drug}</b>}
                {c.drug && c.indication && ' · '}
                {c.indication && <span className="text-ink-3">{c.indication}</span>}
                {!c.drug && !c.indication && <span className="text-ink-3">{c.event}</span>}
              </span>
              {c.phase ? (
                <span className={`chip ${phaseClass(c.phase)}`}>{c.phase}</span>
              ) : (
                <span />
              )}
              <span className={`chip ${typeClass(c.type)}`}>{c.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentResults({ feed, onPick }) {
  const recent = useMemo(() => (Array.isArray(feed) ? feed.slice(0, 12) : []), [feed]);

  return (
    <section>
      <div className="section-h">
        <h2>최근 결과 · 뉴스</h2>
        <span className="meta">RECENT RESULTS &amp; NEWS · {recent.length}</span>
      </div>
      <FeedList
        items={recent}
        onPickTicker={onPick}
        emptyText="아직 기록된 결과·뉴스가 없습니다."
      />
    </section>
  );
}
