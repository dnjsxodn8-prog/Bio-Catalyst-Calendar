// spec 017 — Home Dashboard 전면 재구성. Biotech Research Dashboard:
// ScreenerBanner → KPI strip(확장) → 3-lane 보드(Screener Signals / Catalyst Watch / Results & News)
// → 다가오는 30일 카탈리스트 table. 검색어가 있으면 Unified grouped search 모드로 전환.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScreenerBanner from '../components/dashboard/ScreenerBanner';
import KpiStrip from '../components/dashboard/KpiStrip';
import LaneScreenerSignals from '../components/dashboard/LaneScreenerSignals';
import LaneCatalystWatch from '../components/dashboard/LaneCatalystWatch';
import LaneResultsNews from '../components/dashboard/LaneResultsNews';
import UnifiedSearchResults from '../components/dashboard/UnifiedSearchResults';
import CompanyLink from '../components/CompanyLink';
import { dDelta, fmtD, dClass, fmtDate, fmtWeekday, phaseClass, typeClass } from '../utils/dDay';

export default function Dashboard({ data, query, onPick, searchIndex }) {
  const q = (query || '').trim();

  // 검색어 모드 — 홈 전체를 grouped search 결과로 전환 (spec 017 §3.6).
  if (q) {
    return <UnifiedSearchResults searchIndex={searchIndex} query={q} onPick={onPick} />;
  }

  return (
    <div className="space-y-6">
      <ScreenerBanner />

      <KpiStrip data={data} onPick={onPick} />

      {/* 3-lane 리서치 보드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        <LaneScreenerSignals data={data} />
        <LaneCatalystWatch data={data} />
        <LaneResultsNews feed={data.feed} onPick={onPick} />
      </div>

      <Upcoming30 data={data} />
    </div>
  );
}

// 전체폭 — 다가오는 30일 카탈리스트 테이블 (lane 의 이번주 보다 넓은 작업용 뷰).
function Upcoming30({ data }) {
  const rows = useMemo(
    () =>
      data.catalysts
        .map((c) => ({ ...c, _d: dDelta(c.date) }))
        .filter((c) => c._d != null && c._d >= 0 && c._d <= 30)
        .sort((a, b) => a._d - b._d),
    [data.catalysts]
  );

  return (
    <section>
      <div className="section-h">
        <h2>다가오는 30일 카탈리스트</h2>
        <Link to="/app/catalysts?within=30" className="meta flex items-center gap-1 hover:text-ink transition-colors">
          전체 {rows.length}건 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
        </Link>
      </div>
      {rows.length === 0 ? (
        <div className="panel p-6 text-center text-ink-3 text-sm">다가오는 30일 카탈리스트가 없습니다.</div>
      ) : (
        <div className="panel overflow-hidden">
          {rows.map((c, i) => (
            <CompanyLink
              key={`${c.ticker}-${c.date}-${i}`}
              ticker={c.ticker}
              className="ev-row"
              title={`${c.ticker} 상세 (Ctrl+클릭: 새 탭)`}
            >
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
          ))}
        </div>
      )}
    </section>
  );
}
