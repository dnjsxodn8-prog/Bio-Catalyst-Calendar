// spec 017 §3.A — Screener Signals lane.
// 위대한 후보 / 관찰 후보 상위 + Rerating 신호(Early Rerating·Deep Value·Primary watchlist).
// cash runway 수치는 screener 데이터에 없어 rerating 라벨로 대체(§4). catalyst density 는 catalysts 조인.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ScatterChart, ArrowRight } from 'lucide-react';
import screener from '../../screener.generated.json';
import CompanyLink from '../CompanyLink';
import { dDelta, fmtMcap } from '../../utils/dDay';

const TOP_N = 5;
const RERATING_LABELS = {
  'Early Rerating Candidate': { short: 'Early Rerating', color: '#34D399' },
  'Deep Value Watch': { short: 'Deep Value', color: '#60A5FA' },
};

function rankPoints(points, grp) {
  return points
    .filter((p) => p.grp === grp)
    .sort((a, b) => (b.g + b.e) - (a.g + a.e) || (b.m ?? 0) - (a.m ?? 0))
    .slice(0, TOP_N);
}

export default function LaneScreenerSignals({ data }) {
  const points = useMemo(() => screener.points || [], []);

  const great = useMemo(() => rankPoints(points, '위대한 후보'), [points]);
  const watch = useMemo(() => rankPoints(points, '관찰 후보'), [points]);

  // Rerating 신호: 의미 있는 라벨만(Financing Trap 다수=노이즈 제외), Primary watchlist 포함.
  const signals = useMemo(
    () =>
      points
        .filter((p) => RERATING_LABELS[p.rl] || p.wl === 'Primary')
        .sort((a, b) => (b.rt ?? 0) - (a.rt ?? 0))
        .slice(0, 6),
    [points]
  );

  // 90일 내 카탈리스트 개수(density).
  const densityByTicker = useMemo(() => {
    const m = new Map();
    for (const c of data.catalysts || []) {
      const d = dDelta(c.date);
      if (d == null || d < 0 || d > 90) continue;
      m.set(c.ticker, (m.get(c.ticker) || 0) + 1);
    }
    return m;
  }, [data.catalysts]);

  return (
    <section className="flex flex-col min-w-0 h-[560px]">
      <div className="section-h">
        <h2 className="flex items-center gap-2">
          <ScatterChart className="w-4 h-4 text-[#22c55e]" strokeWidth={1.8} />
          Screener Signals
        </h2>
        <span className="meta">GBS</span>
      </div>

      <div className="panel overflow-y-auto flex-1 min-h-0">
        <Group title="위대한 바이오텍" accent="#22c55e">
          {great.map((p) => (
            <Row key={p.t} p={p} density={densityByTicker.get(p.t)} />
          ))}
        </Group>
        <Group title="관찰 후보" accent="#3b82f6">
          {watch.map((p) => (
            <Row key={p.t} p={p} density={densityByTicker.get(p.t)} />
          ))}
        </Group>
        <Group title="Rerating 신호" accent="#34D399" last>
          {signals.length === 0 ? (
            <div className="px-3.5 py-3 text-[12px] text-ink-3">활성 rerating 신호 없음</div>
          ) : (
            signals.map((p) => (
              <Row key={`sig-${p.t}`} p={p} density={densityByTicker.get(p.t)} showRerating />
            ))
          )}
        </Group>
      </div>

      <div className="mt-2.5 flex justify-end">
        <Link
          to="/app/screener"
          className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md bg-panel-2 border border-line-2 text-[12px] font-semibold text-ink-2 hover:text-ink hover:border-acc transition-colors"
        >
          스크리너 열기
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </Link>
      </div>
    </section>
  );
}

function Group({ title, accent, last, children }) {
  return (
    <div className={last ? '' : 'border-b border-[var(--hairline)]'}>
      <div className="px-3.5 pt-2.5 pb-1.5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        <span className="text-[10.5px] font-semibold text-ink-2 tracking-[0.08em] uppercase">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Row({ p, density, showRerating }) {
  const re = RERATING_LABELS[p.rl];
  return (
    <CompanyLink
      ticker={p.t}
      title={`${p.t} 상세 (Ctrl+클릭: 새 탭)`}
      className="w-full flex items-center gap-2.5 px-3.5 py-1.5 text-left hover:bg-white/[0.025] transition-colors"
    >
      <span className="ev-ticker flex-shrink-0">{p.t}</span>
      <span className="flex-1 min-w-0 text-[12px] text-ink-2 truncate">{p.c}</span>
      {showRerating && (re || p.wl === 'Primary') && (
        <span
          className="hidden sm:inline-flex items-center h-[16px] rounded px-1.5 mono text-[9px] font-semibold tracking-wide whitespace-nowrap"
          style={{
            color: re?.color || '#FBBF24',
            borderColor: re?.color || '#FBBF24',
            background: `${re?.color || '#FBBF24'}1A`,
            border: '1px solid',
          }}
        >
          {re?.short || 'Primary'}
        </span>
      )}
      {density > 0 && (
        <span className="num text-[10px] text-ink-3 flex-shrink-0" title={`90일 내 카탈리스트 ${density}건`}>
          ◆{density}
        </span>
      )}
      <span className="num text-[10.5px] text-ink-3 flex-shrink-0 w-[64px] text-right">
        G{p.g}·E{p.e}
      </span>
      <span className="num text-[10.5px] text-ink-4 flex-shrink-0 w-[44px] text-right hidden md:inline">
        {fmtMcap(p.m)}
      </span>
    </CompanyLink>
  );
}
