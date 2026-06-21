// spec 017 §3.B — Catalyst Watch lane. 다가오는 카탈리스트를 좁은 레인용 한 줄 행으로 스크롤.
// 한 줄 = [D-day(작게)] 날짜 · 티커 · 이벤트 제목(무슨약·몇상·PDUFA 등). 행 클릭 = 기업 상세
// (CompanyLink → Ctrl/⌘/가운데 클릭 시 새 탭, 여러 기업 동시 열기).
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';
import CompanyLink from '../CompanyLink';
import { dDelta, fmtD, fmtDate } from '../../utils/dDay';

// D-day 색: 임박(≤2)=빨강, 2주내(≤14)=앰버, 그 외=뮤트.
function ddColor(d) {
  if (d == null) return 'var(--ink-3)';
  if (d <= 2) return '#F87171';
  if (d <= 14) return '#FBBF24';
  return 'var(--ink-3)';
}

export default function LaneCatalystWatch({ data }) {
  const upcoming = useMemo(
    () =>
      data.catalysts
        .map((c) => ({ ...c, _d: dDelta(c.date) }))
        .filter((c) => c._d != null && c._d >= 0)
        .sort((a, b) => a._d - b._d),
    [data.catalysts]
  );

  return (
    <section className="flex flex-col min-w-0 h-[560px]">
      <div className="section-h">
        <h2 className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#F87171]" strokeWidth={1.8} />
          Catalyst Watch
        </h2>
        <span className="meta">{upcoming.length} UPCOMING</span>
      </div>

      {upcoming.length === 0 ? (
        <div className="panel p-6 text-center text-ink-3 text-sm flex-1">다가오는 카탈리스트가 없습니다.</div>
      ) : (
        <div className="panel flex-1 min-h-0 overflow-y-auto">
          {upcoming.map((c, i) => (
            <CompanyLink
              key={`${c.ticker}-${c.date}-${i}`}
              ticker={c.ticker}
              className="flex items-center gap-2.5 px-3 py-[7px] border-b border-[var(--hairline)] last:border-b-0 hover:bg-white/[0.03] transition-colors"
              title={`${c.ticker} 상세 (Ctrl+클릭: 새 탭)`}
            >
              <span
                className="mono text-[10px] font-bold w-[38px] text-right flex-shrink-0 tabular-nums"
                style={{ color: ddColor(c._d) }}
              >
                {fmtD(c._d)}
              </span>
              <span className="mono text-[10.5px] text-ink-4 w-[42px] flex-shrink-0">{fmtDate(c.date)}</span>
              <span className="ev-ticker flex-shrink-0">{c.ticker}</span>
              <span className="text-[12px] text-ink-2 truncate flex-1 min-w-0">{c.event}</span>
            </CompanyLink>
          ))}
        </div>
      )}

      <div className="mt-2.5 flex justify-end flex-shrink-0">
        <Link
          to="/app/catalysts"
          className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md bg-panel-2 border border-line-2 text-[12px] font-semibold text-ink-2 hover:text-ink hover:border-acc transition-colors"
        >
          전체 Catalyst Table
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </Link>
      </div>
    </section>
  );
}
