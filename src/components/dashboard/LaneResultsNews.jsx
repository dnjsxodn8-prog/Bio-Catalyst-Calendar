// spec 017 §3.C — Results & News lane. 결과/뉴스를 facet chip 으로 분리 + "결과만 보기" + 전체 뉴스 CTA.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, ArrowRight } from 'lucide-react';
import FeedList from '../FeedList';
import { NEWS_TYPE_META } from '../../utils/feed';

const NEWS_TYPE_ORDER = ['Financing', 'Licensing', 'Partnership', 'MnA', 'Pipeline', 'Regulatory'];
const MAX = 5;

export default function LaneResultsNews({ feed, onPick }) {
  const items = useMemo(() => (Array.isArray(feed) ? feed : []), [feed]);
  const [facet, setFacet] = useState('all'); // 'all' | 'results' | <newsType>

  const newsTypes = useMemo(() => {
    const present = new Set(items.filter((f) => f.kind === 'news').map((f) => f.type).filter(Boolean));
    return NEWS_TYPE_ORDER.filter((t) => present.has(t));
  }, [items]);

  const filtered = useMemo(() => {
    let f = items;
    if (facet === 'results') f = items.filter((i) => i.kind === 'catalyst');
    else if (facet !== 'all') f = items.filter((i) => i.kind === 'news' && i.type === facet);
    return f.slice(0, MAX);
  }, [items, facet]);

  const facetChips = [
    ['all', '전체', '#9CA3AF'],
    ['results', '결과', '#34D399'],
    ...newsTypes.map((t) => [t, NEWS_TYPE_META[t]?.label || t, NEWS_TYPE_META[t]?.color || '#9CA3AF']),
  ];

  return (
    <section className="flex flex-col min-w-0 h-[560px]">
      <div className="section-h">
        <h2 className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#93A4B8]" strokeWidth={1.8} />
          Results &amp; News
        </h2>
        <span className="meta">{items.length} TOTAL</span>
      </div>

      {/* facet chips */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        {facetChips.map(([key, label, color]) => {
          const active = facet === key;
          return (
            <button
              key={key}
              onClick={() => setFacet(key)}
              className={[
                'h-[26px] px-2.5 rounded-md text-[11px] border transition-colors flex items-center gap-1.5',
                active ? 'bg-panel-2 text-ink border-line-2' : 'bg-transparent text-ink-3 border-transparent hover:text-ink',
              ].join(' ')}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              {label}
            </button>
          );
        })}
      </div>

      <div className="panel flex-1 min-h-0 overflow-y-auto">
        <FeedList
          items={filtered}
          onPickTicker={(t) => onPick && onPick(t)}
          emptyText="해당 facet 의 항목이 없습니다."
          bare
        />
      </div>

      <div className="mt-2.5 flex justify-end gap-2">
        <Link
          to="/app/news?kind=catalyst"
          className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md bg-transparent border border-line text-[12px] font-semibold text-ink-3 hover:text-ink hover:border-line-2 transition-colors"
        >
          결과만 보기
        </Link>
        <Link
          to="/app/news"
          className="inline-flex items-center gap-1.5 h-[30px] px-3 rounded-md bg-panel-2 border border-line-2 text-[12px] font-semibold text-ink-2 hover:text-ink hover:border-acc transition-colors"
        >
          전체 뉴스
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.8} />
        </Link>
      </div>
    </section>
  );
}
