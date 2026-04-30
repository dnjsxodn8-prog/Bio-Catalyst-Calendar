import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  dDelta,
  fmtD,
  dClass,
  fmtDate,
  fmtWeekday,
  phaseClass,
  typeClass,
} from '../utils/dDay';

export default function Dashboard({ data, onPick }) {
  const { catalysts } = data;

  const dated = useMemo(
    () =>
      catalysts
        .map((c) => ({ ...c, _d: dDelta(c.date) }))
        .filter((c) => c._d !== null),
    [catalysts]
  );

  return (
    <div className="space-y-6">
      <KpiStrip dated={dated} />
      <HeroWeek dated={dated} onPick={onPick} />
      <RecentResults dated={dated} onPick={onPick} />
    </div>
  );
}

function KpiStrip({ dated }) {
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
    { label: '7일 이내', sub: 'this week · D-7', value: within(7), accent: '#F87171', spark: buckets(7) },
    { label: '30일 이내', sub: 'next 30d', value: within(30), accent: '#FBBF24', spark: buckets(30) },
    { label: 'PDUFA 대기', sub: 'fda decisions', value: byType('PDUFA'), accent: '#FBBF24', spark: buckets(60) },
    { label: '임상 readout', sub: 'clinical readouts', value: byType('Clinical Readout'), accent: '#C084FC', spark: buckets(60) },
    { label: '학회 발표', sub: 'conference talks', value: byType('Conference'), accent: '#60A5FA', spark: buckets(90) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {kpis.map((k) => (
        <div key={k.label} className="kpi" style={{ '--accent-color': k.accent }}>
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
        </div>
      ))}
    </div>
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

function RecentResults({ dated, onPick }) {
  const recent = useMemo(
    () =>
      dated
        .filter((c) => c._d < 0 && c._d >= -30)
        .sort((a, b) => b._d - a._d),
    [dated]
  );

  return (
    <section>
      <div className="section-h">
        <h2>최근 결과 · 30일</h2>
        <span className="meta">RECENT READOUTS · {recent.length}</span>
      </div>
      <div className="panel overflow-hidden">
        {recent.length === 0 ? (
          <div className="p-6 text-center text-ink-3 text-sm">지난 30일 내 결과가 없습니다.</div>
        ) : (
          recent.map((c, i) => (
            <div
              key={`${c.ticker}-${c.date}-${i}`}
              className="ev-row"
              onClick={() => onPick && onPick(c)}
            >
              <span className="d-counter past">{fmtD(c._d)}</span>
              <span className="ev-date">
                {fmtDate(c.date)} · {c.date.slice(0, 4)}
              </span>
              <span className="ev-ticker">{c.ticker}</span>
              <span className="ev-title">
                {c.drug && <b>{c.drug}</b>}
                {c.drug && ' · '}
                <span className="text-ink-3">{c.event}</span>
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
