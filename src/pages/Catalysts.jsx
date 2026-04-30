import { useMemo, useState } from 'react';
import {
  dDelta,
  fmtD,
  dClass,
  fmtDate,
  phaseClass,
  typeClass,
} from '../utils/dDay';

const TYPE_FILTERS = [
  ['all', 'All', null],
  ['PDUFA', 'PDUFA', '#FBBF24'],
  ['Clinical Readout', 'Readout', '#C084FC'],
  ['Conference', 'Conference', '#60A5FA'],
  ['Regulatory', 'Regulatory', '#F472B6'],
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Catalysts({ data, query, onPick }) {
  const { catalysts } = data;
  const [view, setView] = useState('timeline');
  const [filterType, setFilterType] = useState('all');

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return catalysts
      .map((c) => ({ ...c, _d: dDelta(c.date) }))
      .filter((c) => c._d != null)
      .filter((c) => filterType === 'all' || c.type === filterType)
      .filter((c) => {
        if (!q) return true;
        const blob = [c.ticker, c.event, c.drug, c.indication].filter(Boolean).join(' ').toLowerCase();
        return blob.includes(q);
      })
      .sort((a, b) => a._d - b._d);
  }, [catalysts, query, filterType]);

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="panel px-4 py-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          {TYPE_FILTERS.map(([v, l, color]) => {
            const active = filterType === v;
            return (
              <button
                key={v}
                onClick={() => setFilterType(v)}
                className={[
                  'h-[30px] px-3 rounded-md text-xs border transition-colors flex items-center gap-1.5',
                  active
                    ? 'bg-panel-2 text-ink border-line-2'
                    : 'bg-transparent text-ink-3 border-transparent hover:text-ink',
                ].join(' ')}
              >
                {color && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: color }}
                  />
                )}
                {l}
              </button>
            );
          })}
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          <span className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase">
            {filtered.length} EVENTS
          </span>
          <div className="flex gap-0.5 p-0.5 bg-bg-2 rounded-md border border-line">
            {[
              ['timeline', 'Timeline'],
              ['list', 'List'],
            ].map(([v, l]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={[
                  'px-2.5 py-1 rounded-sm text-[11.5px] border-0 transition-colors',
                  view === v ? 'bg-panel-2 text-ink' : 'bg-transparent text-ink-3 hover:text-ink',
                ].join(' ')}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === 'timeline' ? (
        <TimelineView events={filtered} onPick={onPick} />
      ) : (
        <ListView events={filtered} onPick={onPick} />
      )}
    </div>
  );
}

function TimelineView({ events, onPick }) {
  const byMonth = useMemo(() => {
    const m = {};
    for (const e of events) {
      const key = e.date.slice(0, 7); // YYYY-MM
      m[key] = m[key] || [];
      m[key].push(e);
    }
    return m;
  }, [events]);
  const monthKeys = Object.keys(byMonth).sort();

  if (monthKeys.length === 0) {
    return (
      <div className="panel p-8 text-center text-ink-3 text-sm">
        조건에 맞는 카탈리스트가 없습니다.
      </div>
    );
  }

  return (
    <div className="panel py-2">
      {monthKeys.map((mk) => {
        const [y, m] = mk.split('-');
        return (
          <div
            key={mk}
            className="grid grid-cols-[120px_1fr] py-3.5 border-t border-[var(--hairline)] first:border-t-0"
          >
            <div className="px-4 border-r border-[var(--hairline)]">
              <div className="mono text-[11px] text-ink-3 tracking-[0.12em] uppercase">{y}</div>
              <div className="mono text-2xl font-bold text-ink tracking-[-0.02em] mt-0.5">
                {MONTH_NAMES[+m - 1]}
              </div>
              <div className="text-[11.5px] text-ink-4 mt-1.5">{byMonth[mk].length} events</div>
            </div>
            <div className="px-4 flex flex-col gap-1.5">
              {byMonth[mk].map((e, i) => (
                <div
                  key={`${e.ticker}-${e.date}-${i}`}
                  onClick={() => onPick && onPick(e)}
                  className="grid items-center gap-3.5 px-3 py-2 rounded-lg border border-[var(--hairline)] bg-panel-2 cursor-pointer hover:bg-white/[0.025] transition-colors"
                  style={{ gridTemplateColumns: '70px 56px 64px 1fr auto auto' }}
                >
                  <span className={`d-counter ${dClass(e._d)}`}>{fmtD(e._d)}</span>
                  <span className="ev-date">{fmtDate(e.date)}</span>
                  <span className="ev-ticker">{e.ticker}</span>
                  <span className="ev-title">
                    {e.drug ? (
                      <>
                        <b>{e.drug}</b>
                        {e.indication && <span className="text-ink-3"> · {e.indication}</span>}
                      </>
                    ) : (
                      <span className="text-ink-2">{e.event}</span>
                    )}
                  </span>
                  {e.phase ? (
                    <span className={`chip ${phaseClass(e.phase)}`}>{e.phase}</span>
                  ) : (
                    <span />
                  )}
                  <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ListView({ events, onPick }) {
  if (events.length === 0) {
    return (
      <div className="panel p-8 text-center text-ink-3 text-sm">
        조건에 맞는 카탈리스트가 없습니다.
      </div>
    );
  }
  return (
    <div className="panel overflow-hidden">
      {events.map((e, i) => (
        <div
          key={`${e.ticker}-${e.date}-${i}`}
          className="ev-row"
          onClick={() => onPick && onPick(e)}
        >
          <span className={`d-counter ${dClass(e._d)}`}>{fmtD(e._d)}</span>
          <span className="ev-date">
            {fmtDate(e.date)} · {e.date.slice(0, 4)}
          </span>
          <span className="ev-ticker">{e.ticker}</span>
          <span className="ev-title">
            <b>{e.event}</b>
          </span>
          {e.phase ? <span className={`chip ${phaseClass(e.phase)}`}>{e.phase}</span> : <span />}
          <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
        </div>
      ))}
    </div>
  );
}
