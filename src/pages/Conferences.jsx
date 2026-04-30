import { useMemo } from 'react';
import { dDelta, fmtD, dClass, fmtDate } from '../utils/dDay';
import { parseConferenceDates } from '../utils/format';

export default function Conferences({ data, query, onPick }) {
  const { conferences, catalysts } = data;

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return conferences.filter((c) => {
      if (!q) return true;
      const blob = [c.id, c.name, c.location, c.notes, ...(c.areas || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [conferences, query]);

  if (filtered.length === 0) {
    return (
      <div className="panel p-8 text-center text-ink-3 text-sm">
        조건에 맞는 학회가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))' }}>
      {filtered.map((conf) => (
        <ConferenceCard
          key={conf.id}
          conf={conf}
          catalysts={catalysts}
          onPick={onPick}
        />
      ))}
    </div>
  );
}

function ConferenceCard({ conf, catalysts, onPick }) {
  const { start, end } = parseConferenceDates(conf.dates);
  const dStart = start ? dDelta(start) : null;
  const dEnd = end ? dDelta(end) : null;
  const ongoing = dStart != null && dEnd != null && dStart <= 0 && dEnd >= 0;

  const tierColor = conf.tier === 'Tier 1' ? '#6EE7B7' : '#60A5FA';

  // Linked catalysts: the conf.id appears in event/notes, or matches a tag
  const idUpper = (conf.id || '').toUpperCase();
  const re = new RegExp(`\\b${escapeRegExp(idUpper)}\\b`);
  const linked = catalysts
    .filter((c) => re.test(c.event || ''))
    .map((c) => ({ ...c, _d: dDelta(c.date) }))
    .filter((c) => c._d != null)
    .sort((a, b) => a._d - b._d);

  const shortName = (conf.name || '')
    .replace(conf.id || '', '')
    .replace(' Annual Meeting', '')
    .replace(' Congress', '')
    .replace('  ', ' ')
    .trim();

  return (
    <div className="panel relative overflow-hidden p-[18px_18px_16px]">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[14px]"
        style={{ background: `linear-gradient(90deg, ${tierColor}, transparent)` }}
      />
      <div className="flex items-center gap-2.5 mb-3">
        <div className="mono text-[18px] font-extrabold text-ink bg-panel-2 border border-line px-3 py-2 rounded-lg tracking-[0.04em]">
          {conf.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-semibold text-ink truncate">{shortName}</div>
          <div className="mono text-[10.5px] text-ink-3 tracking-[0.08em] mt-[3px] uppercase">
            {conf.location}
          </div>
        </div>
        <span
          className="mono text-[10.5px] font-semibold px-2 py-[3px] rounded-sm tracking-[0.06em] uppercase border"
          style={{
            color: tierColor,
            background: `${tierColor}1A`,
            borderColor: `${tierColor}40`,
          }}
        >
          {conf.tier}
        </span>
      </div>

      <div className="flex items-center gap-2.5 px-3 py-2 bg-bg-2 rounded-lg border border-[var(--hairline)]">
        <div className={`d-counter ${ongoing ? 'imminent' : dClass(dStart)}`}>
          {ongoing ? 'LIVE' : fmtD(dStart)}
        </div>
        <span className="mono text-[11.5px] text-ink-2">
          {start && fmtDate(start)} – {end && fmtDate(end)} · {start?.slice(0, 4)}
        </span>
      </div>

      {conf.notes && (
        <p className="text-[12.5px] text-ink-2 leading-relaxed my-3">{conf.notes}</p>
      )}

      {(conf.areas || []).length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {conf.areas.map((a) => (
            <span
              key={a}
              className="text-[11px] text-ink-3 bg-panel-2 border border-line px-2 py-[3px] rounded-sm"
            >
              {a}
            </span>
          ))}
        </div>
      )}

      {linked.length > 0 && (
        <div className="pt-3 border-t border-[var(--hairline)]">
          <div className="mono text-[10.5px] text-ink-4 tracking-[0.1em] uppercase mb-2">
            Related Catalysts · {linked.length}
          </div>
          <div className="flex flex-col gap-1">
            {linked.slice(0, 4).map((lc, j) => (
              <div
                key={`${lc.ticker}-${lc.date}-${j}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onPick && onPick(lc);
                }}
                className="flex items-center gap-2 text-xs py-1 cursor-pointer hover:bg-white/[0.025] rounded"
              >
                <span className="mono text-ink-2 font-semibold w-12">{lc.ticker}</span>
                <span className="flex-1 text-ink-3 truncate">{lc.drug || lc.event}</span>
                <span className={`d-counter ${dClass(lc._d)}`} style={{ height: 20, fontSize: 10 }}>
                  {fmtD(lc._d)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
