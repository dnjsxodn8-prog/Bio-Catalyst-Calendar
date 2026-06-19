import { useMemo, useState } from 'react';
import { Activity, ExternalLink, Newspaper, Search } from 'lucide-react';
import { outcomeMeta } from '../utils/outcome';

const NEWS_TYPE_ORDER = [
  'Financing',
  'Licensing',
  'Partnership',
  'MnA',
  'Pipeline',
  'Regulatory',
  'Personnel',
  'Other',
];

const NEWS_TYPE_META = {
  Financing: { label: 'Financing', color: '#93A4B8' },
  Licensing: { label: 'Licensing', color: '#A3A3B8' },
  Partnership: { label: 'Partner', color: '#8FA7C7' },
  MnA: { label: 'M&A', color: '#B4A28C' },
  Pipeline: { label: 'Pipeline', color: '#9CA3AF' },
  Regulatory: { label: 'Regulatory', color: '#A8A29E' },
  Personnel: { label: 'Personnel', color: '#94A3B8' },
  Other: { label: 'Other', color: '#A1A1AA' },
};

const KIND_FILTERS = [
  ['all', 'All'],
  ['catalyst', '결과'],
  ['news', '뉴스'],
];

export default function News({ data, query, onPick }) {
  const rawFeed = data?.feed;
  const feed = useMemo(() => (Array.isArray(rawFeed) ? rawFeed : []), [rawFeed]);
  const [kind, setKind] = useState('all');
  const [type, setType] = useState('all');
  const [ticker, setTicker] = useState('');

  const typeOptions = useMemo(() => {
    const present = new Set(feed.map((item) => item.type).filter(Boolean));
    const ordered = NEWS_TYPE_ORDER.filter((t) => present.has(t));
    const rest = [...present].filter((t) => !NEWS_TYPE_ORDER.includes(t)).sort();
    return [...ordered, ...rest];
  }, [feed]);

  const filtered = useMemo(() => {
    const tickerQ = ticker.trim().toUpperCase();
    const textQ = (query || '').trim().toLowerCase();
    return feed.filter((item) => {
      if (kind !== 'all' && item.kind !== kind) return false;
      if (type !== 'all' && item.type !== type) return false;
      if (tickerQ && !String(item.ticker || '').toUpperCase().includes(tickerQ)) return false;
      if (!textQ) return true;
      const blob = [item.ticker, item.type, item.outcome, item.headline, item.summary]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return blob.includes(textQ);
    });
  }, [feed, kind, query, ticker, type]);

  return (
    <div className="flex flex-col gap-4">
      <div className="panel px-4 py-3 flex items-center gap-2 flex-wrap">
        <div className="flex gap-0.5 p-0.5 bg-bg-2 rounded-md border border-line">
          {KIND_FILTERS.map(([value, label]) => (
            <button
              key={value}
              onClick={() => setKind(value)}
              className={[
                'h-[30px] px-3 rounded-sm text-[12px] border-0 transition-colors',
                kind === value ? 'bg-panel-2 text-ink' : 'bg-transparent text-ink-3 hover:text-ink',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-line mx-1" />

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setType('all')}
            className={[
              'h-[30px] px-3 rounded-md text-xs border transition-colors',
              type === 'all'
                ? 'bg-panel-2 text-ink border-line-2'
                : 'bg-transparent text-ink-3 border-transparent hover:text-ink',
            ].join(' ')}
          >
            All Type
          </button>
          {typeOptions.map((value) => {
            const active = type === value;
            const meta = typeBadgeMeta({ kind: 'news', type: value });
            return (
              <button
                key={value}
                onClick={() => setType(value)}
                className={[
                  'h-[30px] px-3 rounded-md text-xs border transition-colors flex items-center gap-1.5',
                  active
                    ? 'bg-panel-2 text-ink border-line-2'
                    : 'bg-transparent text-ink-3 border-transparent hover:text-ink',
                ].join(' ')}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
                {meta.label}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2 min-w-[180px]">
          <div className="relative w-[180px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-4" strokeWidth={1.8} />
            <input
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Ticker"
              className="w-full h-[32px] bg-bg-2 border border-line rounded-md pl-8 pr-2.5 mono text-[12px] text-ink outline-none focus:border-line-2"
            />
          </div>
          <span className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase whitespace-nowrap">
            {filtered.length} / {feed.length}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="panel p-8 text-center text-ink-3 text-sm">
          조건에 맞는 뉴스가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((item, i) => (
            <FeedCard
              key={`${item.kind}-${item.ticker}-${item.date}-${item.headline}-${i}`}
              item={item}
              onPick={onPick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FeedCard({ item, onPick }) {
  const isCatalyst = item.kind === 'catalyst';
  const badge = typeBadgeMeta(item);
  const Icon = isCatalyst ? Activity : Newspaper;

  return (
    <article className="panel p-4 transition-colors hover:bg-white/[0.018]">
      <div className="grid gap-3 lg:grid-cols-[104px_1fr]">
        <div className="flex lg:flex-col items-center lg:items-start gap-2 lg:gap-1.5">
          <div className="mono text-[12px] text-ink-3 tracking-[0.04em]">{fmtDate(item.date)}</div>
          <span
            className="inline-flex items-center gap-1.5 h-[22px] rounded border px-2 mono text-[10.5px] font-semibold tracking-wide whitespace-nowrap"
            style={{
              color: badge.color,
              borderColor: badge.color,
              background: `${badge.color}1A`,
            }}
          >
            <Icon className="w-3 h-3" strokeWidth={1.8} />
            {badge.label}
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex items-start gap-2.5 min-w-0">
            <button
              onClick={() => onPick && onPick(item.ticker)}
              className="ev-ticker mt-0.5 flex-shrink-0 hover:border-line-2"
            >
              {item.ticker}
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="m-0 text-[15px] font-bold text-ink leading-snug">{item.headline}</h2>
              {item.summary && (
                <p className="m-0 mt-1.5 text-[13px] text-ink-3 leading-relaxed">
                  {item.summary}
                </p>
              )}
            </div>
          </div>

          {Array.isArray(item.sources) && item.sources.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.sources.map((src, idx) => (
                <a
                  key={`${src}-${idx}`}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 h-[24px] rounded-md border border-[var(--hairline)] bg-panel-2 px-2 text-[11.5px] text-ink-3 hover:text-ink hover:border-line-2 transition-colors"
                >
                  {hostOf(src)}
                  <ExternalLink className="w-3 h-3" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function typeBadgeMeta(item) {
  if (item.kind === 'catalyst') {
    const meta = outcomeMeta(item.outcome);
    return meta || { label: item.outcome || 'Result', color: '#9CA3AF' };
  }
  return NEWS_TYPE_META[item.type] || { label: item.type || 'News', color: '#9CA3AF' };
}

function fmtDate(v) {
  if (!v) return '—';
  const [y, m, d] = String(v).slice(0, 10).split('-');
  if (!y || !m || !d) return String(v);
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${names[Number(m) - 1] || m} ${d}, ${y}`;
}

function hostOf(u) {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return u;
  }
}
