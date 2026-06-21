// spec 017 §3.6 — 홈 통합 검색 모드. 상단 검색어가 있으면 Dashboard 가 이 컴포넌트로 전환,
// Companies / Catalysts / Results·News / Screener Signals 4그룹을 함께 보여준다.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Activity, Newspaper, ScatterChart, ArrowRight } from 'lucide-react';
import FeedList from '../FeedList';
import CompanyLink from '../CompanyLink';
import { dDelta, fmtD, dClass, fmtDate, fmtMcap, phaseClass, typeClass } from '../../utils/dDay';

export default function UnifiedSearchResults({ searchIndex, query, onPick }) {
  const res = useMemo(
    () => (searchIndex ? searchIndex.searchGrouped(query, 6) : null),
    [searchIndex, query]
  );

  if (!res) return null;
  const { companies, catalysts, feed, signals, counts } = res;
  const totalHits =
    companies.length + catalysts.length + feed.length + signals.length;

  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-2">
        <h1 className="text-[17px] font-bold text-ink">“{query}” 검색 결과</h1>
        <span className="mono text-[11px] text-ink-3">{totalHits} hits</span>
      </div>

      {totalHits === 0 && (
        <div className="panel p-10 text-center text-ink-3 text-sm">
          “{query}” 에 해당하는 종목·카탈리스트·뉴스·스크리너 신호가 없습니다.
        </div>
      )}

      {companies.length > 0 && (
        <Group icon={Building2} color="#60A5FA" title="Companies" count={counts.companies} to="/app/companies">
          <div className="panel overflow-hidden">
            {companies.map((c) => (
              <CompanyLink
                key={c.ticker}
                ticker={c.ticker}
                title={`${c.ticker} 상세 (Ctrl+클릭: 새 탭)`}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-white/[0.025] transition-colors border-b border-[var(--hairline)] last:border-b-0"
              >
                <span className="ev-ticker flex-shrink-0">{c.ticker}</span>
                <span className="flex-1 min-w-0 text-[12.5px] text-ink-2 truncate">{c.company}</span>
                {c.modality && <span className="text-[11px] text-ink-4 truncate hidden md:inline">{c.modality}</span>}
                {c.hasScore && (
                  <span className="num text-[10.5px] text-ink-3 w-[64px] text-right">G{c.g}·E{c.e}</span>
                )}
                <span className="num text-[10.5px] text-ink-4 w-[44px] text-right">{fmtMcap(c.mcap)}</span>
              </CompanyLink>
            ))}
          </div>
        </Group>
      )}

      {catalysts.length > 0 && (
        <Group icon={Activity} color="#F87171" title="Catalysts" count={counts.catalysts} to="/app/catalysts">
          <div className="panel overflow-hidden">
            {catalysts.map((c, i) => {
              const d = dDelta(c.date);
              return (
                <CompanyLink
                  key={`${c.ticker}-${c.date}-${i}`}
                  ticker={c.ticker}
                  className="ev-row"
                  title={`${c.ticker} 상세 (Ctrl+클릭: 새 탭)`}
                >
                  <span className={`d-counter ${dClass(d)}`}>{fmtD(d)}</span>
                  <span className="ev-date">{fmtDate(c.date)} · {String(c.date).slice(0, 4)}</span>
                  <span className="ev-ticker">{c.ticker}</span>
                  <span className="ev-title">
                    {c.drug ? <b>{c.drug}</b> : <span className="text-ink-3">{c.event}</span>}
                    {c.drug && c.indication && <span className="text-ink-3"> · {c.indication}</span>}
                  </span>
                  {c.phase ? <span className={`chip ${phaseClass(c.phase)}`}>{c.phase}</span> : <span />}
                  <span className={`chip ${typeClass(c.type)}`}>{c.type}</span>
                </CompanyLink>
              );
            })}
          </div>
        </Group>
      )}

      {feed.length > 0 && (
        <Group icon={Newspaper} color="#93A4B8" title="Results & News" count={counts.feed} to="/app/news">
          <FeedList items={feed} onPickTicker={(t) => onPick && onPick(t)} />
        </Group>
      )}

      {signals.length > 0 && (
        <Group icon={ScatterChart} color="#22c55e" title="Screener Signals" count={counts.signals} to="/app/screener">
          <div className="panel overflow-hidden">
            {signals.map((p) => (
              <CompanyLink
                key={`sig-${p.t}`}
                ticker={p.t}
                title={`${p.t} 상세 (Ctrl+클릭: 새 탭)`}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-left hover:bg-white/[0.025] transition-colors border-b border-[var(--hairline)] last:border-b-0"
              >
                <span className="ev-ticker flex-shrink-0">{p.t}</span>
                <span className="flex-1 min-w-0 text-[12.5px] text-ink-2 truncate">{p.c}</span>
                <span
                  className="text-[10.5px] font-semibold flex-shrink-0"
                  style={{ color: p.grp === '위대한 후보' ? '#22c55e' : p.grp === '관찰 후보' ? '#3b82f6' : '#9CA3AF' }}
                >
                  {p.grp === '위대한 후보' ? '위대한 바이오텍' : p.grp}
                </span>
                <span className="num text-[10.5px] text-ink-3 w-[64px] text-right">G{p.g}·E{p.e}</span>
              </CompanyLink>
            ))}
          </div>
        </Group>
      )}
    </div>
  );
}

function Group({ icon: Icon, color, title, count, to, children }) {
  return (
    <section>
      <div className="section-h">
        <h2 className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.8} />
          {title}
          <span className="num text-[11px] text-ink-3 font-normal">{count}</span>
        </h2>
        <Link to={to} className="meta flex items-center gap-1 hover:text-ink transition-colors">
          더보기 <ArrowRight className="w-3 h-3" strokeWidth={1.8} />
        </Link>
      </div>
      {children}
    </section>
  );
}
