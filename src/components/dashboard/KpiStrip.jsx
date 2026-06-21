// spec 017 §3.1 — 확장 KPI strip(7~8종). 카탈리스트 KPI(7D/30D/PDUFA/Readout/Conference) +
// 피드 KPI(Results/News) + Watchlist KPI. 클릭 시 인라인 결과 + "전체 페이지" filter-preserving CTA.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import FeedList from '../FeedList';
import CompanyLink from '../CompanyLink';
import { dDelta, fmtD, dClass, fmtDate, fmtWeekday, phaseClass, typeClass } from '../../utils/dDay';

const catTo = (qs) => `/app/catalysts?${qs}`;

// 각 KPI 정의. kind 로 카운트/인라인 렌더/ CTA 분기.
const KPIS = [
  { key: '7d', label: '7일 이내', sub: 'this week · D-7', accent: '#F87171', kind: 'catalyst', test: (c) => c._d >= 0 && c._d <= 7, horizon: 7, cta: { to: catTo('within=7'), label: '7일 이내 전체 보기' } },
  { key: '30d', label: '30일 이내', sub: 'next 30d', accent: '#FBBF24', kind: 'catalyst', test: (c) => c._d >= 0 && c._d <= 30, horizon: 30, cta: { to: catTo('within=30'), label: '30일 이내 전체 보기' } },
  { key: 'Clinical Readout', label: '임상 readout', sub: 'clinical readouts', accent: '#C084FC', kind: 'catalyst', test: (c) => c._d >= 0 && c.type === 'Clinical Readout', horizon: 60, cta: { to: catTo('type=Clinical%20Readout'), label: 'Readout 필터로 전체 보기' } },
  { key: 'results', label: '최근 결과', sub: 'resolved outcomes', accent: '#34D399', kind: 'feed', feedKind: 'catalyst', cta: { to: '/app/news?kind=catalyst', label: '결과 전체 보기' } },
  { key: 'news', label: '최근 뉴스', sub: 'company updates', accent: '#93A4B8', kind: 'feed', feedKind: 'news', cta: { to: '/app/news?kind=news', label: '뉴스 전체 보기' } },
];

export default function KpiStrip({ data, onPick }) {
  const [selected, setSelected] = useState(null);

  const dated = useMemo(
    () => data.catalysts.map((c) => ({ ...c, _d: dDelta(c.date) })).filter((c) => c._d != null),
    [data.catalysts]
  );
  const feed = Array.isArray(data.feed) ? data.feed : [];

  const countFor = (k) => {
    if (k.kind === 'catalyst') return dated.filter(k.test).length;
    if (k.kind === 'feed') return feed.filter((f) => f.kind === k.feedKind).length;
    return 0;
  };

  const totalUpcoming = dated.filter((c) => c._d >= 0).length;

  const buckets = (window) => {
    const out = Array(Math.max(1, Math.ceil(window / 7))).fill(0);
    for (const c of dated) {
      if (c._d < 0 || c._d > window) continue;
      const b = Math.floor(c._d / 7);
      if (b < out.length) out[b] += 1;
    }
    return out.length ? out : [1];
  };

  const toggle = (key) => setSelected((p) => (p === key ? null : key));
  const sel = KPIS.find((k) => k.key === selected);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {KPIS.map((k) => {
          const active = selected === k.key;
          const value = countFor(k);
          const denom = k.kind === 'catalyst' ? totalUpcoming : feed.length;
          return (
            <button
              key={k.key}
              type="button"
              onClick={() => toggle(k.key)}
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
                {k.kind === 'catalyst' && (
                  <span className="flex items-end gap-[2px] h-[18px]">
                    {buckets(k.horizon).map((v, j, arr) => (
                      <span
                        key={j}
                        className="rounded-[1px]"
                        style={{
                          width: 4,
                          height: `${Math.max(3, Math.min(v + 1, 5) * 4)}px`,
                          background: j === arr.length - 1 ? k.accent : 'var(--ink-4)',
                          opacity: j === arr.length - 1 ? 1 : 0.5,
                        }}
                      />
                    ))}
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <span className="kpi-value">{value}</span>
                {denom > 0 && <span className="num text-[11px] text-ink-3">/ {denom}</span>}
              </div>
              <div className="kpi-sub">{k.sub}</div>
            </button>
          );
        })}
      </div>

      {sel && (
        <KpiPanel
          kpi={sel}
          dated={dated}
          feed={feed}
          onPick={onPick}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function CtaLink({ to, label }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md bg-panel-2 border border-line-2 text-[12px] font-semibold text-ink-2 hover:text-ink hover:border-acc transition-colors"
    >
      {label}
      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
    </Link>
  );
}

function EventRow({ c }) {
  return (
    <CompanyLink ticker={c.ticker} className="ev-row" title={`${c.ticker} 상세 (Ctrl+클릭: 새 탭)`}>
      <span className={`d-counter ${dClass(c._d)}`}>{fmtD(c._d)}</span>
      <span className="ev-date">{fmtDate(c.date)} · {fmtWeekday(c.date)}</span>
      <span className="ev-ticker">{c.ticker}</span>
      <span className="ev-title">
        {c.drug && <b>{c.drug}</b>}
        {c.drug && c.indication && ' · '}
        {c.indication && <span className="text-ink-3">{c.indication}</span>}
        {!c.drug && !c.indication && <span className="text-ink-3">{c.event}</span>}
      </span>
      {c.phase ? <span className={`chip ${phaseClass(c.phase)}`}>{c.phase}</span> : <span />}
      <span className={`chip ${typeClass(c.type)}`}>{c.type}</span>
    </CompanyLink>
  );
}

function KpiPanel({ kpi, dated, feed, onPick, onClose }) {
  let body;
  let n;

  if (kpi.kind === 'catalyst') {
    const events = dated.filter(kpi.test).sort((a, b) => a._d - b._d).slice(0, 12);
    n = dated.filter(kpi.test).length;
    body = events.length ? (
      <div className="panel overflow-hidden">
        {events.map((c, i) => (
          <EventRow key={`${c.ticker}-${c.date}-${i}`} c={c} />
        ))}
      </div>
    ) : <Empty text="조건에 맞는 카탈리스트가 없습니다." />;
  } else {
    const items = feed.filter((f) => f.kind === kpi.feedKind).slice(0, 6);
    n = feed.filter((f) => f.kind === kpi.feedKind).length;
    body = <FeedList items={items} onPickTicker={(t) => onPick && onPick(t)} emptyText="항목이 없습니다." />;
  }

  return (
    <section>
      <div className="section-h">
        <h2>
          <span style={{ color: kpi.accent }}>●</span> {kpi.label}
        </h2>
        <span className="meta flex items-center gap-3">
          {n} {kpi.kind === 'feed' ? 'ITEMS' : 'EVENTS'}
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
      {body}
      <div className="mt-2.5 flex justify-end">
        <CtaLink to={kpi.cta.to} label={kpi.cta.label} />
      </div>
    </section>
  );
}

function Empty({ text }) {
  return <div className="panel p-6 text-center text-ink-3 text-sm">{text}</div>;
}
