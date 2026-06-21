// 공용 피드 리스트 — Dashboard 최근결과 위젯 + CompanyDetail 기업별 뉴스에서 재사용 (spec 016 §4.3·4.4).
import { Activity, ExternalLink, Newspaper } from 'lucide-react';
import { feedBadge, fmtFeedDate, feedHost } from '../utils/feed';
import CompanyLink from './CompanyLink';

export default function FeedList({ items, onPickTicker, showTicker = true, emptyText = '항목이 없습니다.', bare = false }) {
  if (!items || items.length === 0) {
    return <div className="p-6 text-center text-ink-3 text-sm">{emptyText}</div>;
  }
  const rows = (
    <>
      {items.map((item, i) => {
        const badge = feedBadge(item);
        const Icon = item.kind === 'catalyst' ? Activity : Newspaper;
        const clickable = !!onPickTicker;
        return (
          <div
            key={`${item.kind}-${item.ticker}-${item.date}-${i}`}
            onClick={() => clickable && onPickTicker(item.ticker)}
            className={[
              'px-3.5 py-2.5 border-b border-[var(--hairline)] last:border-b-0 transition-colors',
              clickable ? 'cursor-pointer hover:bg-white/[0.025]' : '',
            ].join(' ')}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="mono text-[11px] text-ink-3 tracking-[0.04em]">{fmtFeedDate(item.date)}</span>
              <span
                className="inline-flex items-center gap-1 h-[18px] rounded border px-1.5 mono text-[10px] font-semibold tracking-wide whitespace-nowrap"
                style={{ color: badge.color, borderColor: badge.color, background: `${badge.color}1A` }}
              >
                <Icon className="w-2.5 h-2.5" strokeWidth={1.8} />
                {badge.label}
              </span>
              {showTicker && (
                <CompanyLink
                  ticker={item.ticker}
                  stop
                  className="ev-ticker hover:border-line-2"
                  title={`${item.ticker} 상세 (Ctrl+클릭: 새 탭)`}
                >
                  {item.ticker}
                </CompanyLink>
              )}
            </div>
            <div className="mt-1 text-[13px] font-semibold text-ink leading-snug">{item.headline}</div>
            {item.summary && (
              <div className="mt-0.5 text-[12px] text-ink-3 leading-snug line-clamp-2">{item.summary}</div>
            )}
            {Array.isArray(item.sources) && item.sources.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {item.sources.map((src, idx) => (
                  <a
                    key={`${src}-${idx}`}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(ev) => ev.stopPropagation()}
                    className="inline-flex items-center gap-1 h-[22px] rounded-md border border-[var(--hairline)] bg-panel-2 px-2 text-[11px] text-ink-3 hover:text-ink hover:border-line-2 transition-colors"
                  >
                    {feedHost(src)}
                    <ExternalLink className="w-2.5 h-2.5" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
  return bare ? rows : <div className="panel overflow-hidden">{rows}</div>;
}
