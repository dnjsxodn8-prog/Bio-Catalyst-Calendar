// spec 017 §8 — My Watchlist Updates (제안서 §1.2 #7).
// 관심종목(localStorage watchlist)에 대한 다가오는 카탈리스트 + 최근 결과·뉴스를
// 홈 상단 개인화 lane 으로 모아 재방문 사용성을 만든다.
// 데이터는 가진 것만(data.catalysts·data.feed)에서 watchlist 티커로 필터링.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Activity, Newspaper, ArrowRight } from 'lucide-react';
import CompanyLink from '../CompanyLink';
import FeedList from '../FeedList';
import { dDelta, fmtD, fmtDate } from '../../utils/dDay';

const GOLD = '#FBBF24';
const MAX_CAT = 6;
const MAX_FEED = 6;

// D-day 색: 임박(≤2)=빨강, 2주내(≤14)=앰버, 그 외=뮤트. (Catalyst Watch lane 과 동일)
function ddColor(d) {
  if (d == null) return 'var(--ink-3)';
  if (d <= 2) return '#F87171';
  if (d <= 14) return '#FBBF24';
  return 'var(--ink-3)';
}

export default function LaneWatchlist({ data, watchlist, onPick }) {
  const tickers = useMemo(() => {
    const set = new Set();
    Object.values(watchlist || {}).forEach((list) =>
      (list || []).forEach((t) => set.add(String(t).toUpperCase()))
    );
    return set;
  }, [watchlist]);

  const groupCount = Object.keys(watchlist || {}).length;

  const upcoming = useMemo(() => {
    if (tickers.size === 0) return [];
    return (data.catalysts || [])
      .filter((c) => tickers.has(String(c.ticker || '').toUpperCase()))
      .map((c) => ({ ...c, _d: dDelta(c.date) }))
      .filter((c) => c._d != null && c._d >= 0)
      .sort((a, b) => a._d - b._d);
  }, [data.catalysts, tickers]);

  const updates = useMemo(() => {
    if (tickers.size === 0) return [];
    // data.feed 는 이미 date 내림차순.
    return (data.feed || []).filter((f) => tickers.has(String(f.ticker || '').toUpperCase()));
  }, [data.feed, tickers]);

  // 관심종목 없음 — 슬림 empty state + 진입 CTA (제안서 §9: 빈 lane 도 다음 행동 제공).
  if (tickers.size === 0) {
    return (
      <section className="panel px-4 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <Star className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} style={{ color: GOLD }} />
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-ink">내 관심종목 업데이트</div>
            <div className="text-[12px] text-ink-3 leading-snug">
              관심종목을 추가하면 이번 주 이벤트·결과·뉴스가 여기 모입니다. 종목 상세에서 ☆ 로 추가하세요.
            </div>
          </div>
        </div>
        <Link
          to="/app/companies"
          className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md bg-panel-2 border border-line-2 text-[12px] font-semibold text-ink-2 hover:text-ink hover:border-acc transition-colors flex-shrink-0"
        >
          종목 둘러보기
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="section-h">
        <h2 className="flex items-center gap-2">
          <Star className="w-4 h-4" strokeWidth={1.8} style={{ color: GOLD }} />
          내 관심종목 업데이트
        </h2>
        <span className="meta">
          {tickers.size} 종목 · {groupCount} 그룹
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* 다가오는 이벤트 */}
        <div className="flex flex-col min-w-0">
          <div className="meta mb-1.5 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#F87171]" strokeWidth={1.8} />
            다가오는 이벤트 · {upcoming.length}
          </div>
          {upcoming.length === 0 ? (
            <div className="panel p-5 text-center text-ink-3 text-[12.5px]">
              관심종목에 다가오는 카탈리스트가 없습니다.
            </div>
          ) : (
            <div className="panel max-h-[280px] overflow-y-auto">
              {upcoming.slice(0, MAX_CAT).map((c, i) => (
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
        </div>

        {/* 최근 결과·뉴스 */}
        <div className="flex flex-col min-w-0">
          <div className="meta mb-1.5 flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5 text-[#93A4B8]" strokeWidth={1.8} />
            최근 결과·뉴스 · {updates.length}
          </div>
          {updates.length === 0 ? (
            <div className="panel p-5 text-center text-ink-3 text-[12.5px]">
              관심종목의 최근 결과·뉴스가 없습니다.
            </div>
          ) : (
            <div className="panel max-h-[280px] overflow-y-auto">
              <FeedList
                items={updates.slice(0, MAX_FEED)}
                onPickTicker={(t) => onPick && onPick(t)}
                emptyText="관심종목의 최근 결과·뉴스가 없습니다."
                bare
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
