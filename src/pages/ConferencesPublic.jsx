import { useMemo, useState } from 'react';
import publicData from '../public-data.generated.json';
import { dDelta, fmtD, dClass, fmtDate } from '../utils/dDay';
import { parseConferenceDates } from '../utils/format';

const PAST_WINDOW_DAYS = 30;

export default function ConferencesPublic() {
  const [query, setQuery] = useState('');
  const [showOldPast, setShowOldPast] = useState(false);

  const { visible, hiddenOldCount } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = (publicData.conferences || []).filter((c) => {
      if (!q) return true;
      const blob = [c.id, c.name, c.location, c.notes, ...(c.areas || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
    const annotated = matched.map((c) => {
      const { end } = parseConferenceDates(c.dates);
      return { c, dEnd: end ? dDelta(end) : null };
    });
    const isOld = (a) => a.dEnd != null && a.dEnd < -PAST_WINDOW_DAYS;
    const hidden = annotated.filter(isOld);
    return {
      visible: (showOldPast ? annotated : annotated.filter((a) => !isOld(a))).map((a) => a.c),
      hiddenOldCount: hidden.length,
    };
  }, [query, showOldPast]);

  return (
    <div className="flex flex-col gap-5">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">학회 일정</h1>
        <p className="mt-2 text-sm text-ink-3 max-w-2xl">
          ASCO · ASH · AHA · JPM 등 biotech 주요 학회 일정과 발표 기업 매핑.
        </p>
        <div className="mt-4">
          <input
            type="search"
            placeholder="학회명 / 도시 / 영역 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md h-9 px-3 rounded-md bg-panel-2 border border-line text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:border-line-2"
          />
        </div>
      </header>

      <div className="panel px-4 py-3 flex items-center gap-2.5">
        <span className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase">
          {visible.length} CONFERENCES
        </span>
        {hiddenOldCount > 0 && (
          <button
            onClick={() => setShowOldPast((s) => !s)}
            className={[
              'ml-auto h-[26px] px-2.5 rounded-md text-[11px] border transition-colors',
              showOldPast
                ? 'bg-panel-2 text-ink border-line-2'
                : 'bg-transparent text-ink-3 border-line hover:text-ink hover:border-line-2',
            ].join(' ')}
          >
            {showOldPast ? `지난 ${PAST_WINDOW_DAYS}일+ 숨기기` : `+ 지난 ${PAST_WINDOW_DAYS}일+ ${hiddenOldCount}개`}
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="panel p-8 text-center text-ink-3 text-sm">조건에 맞는 학회가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {visible.map((conf) => (
            <ConferenceCard key={conf.id} conf={conf} />
          ))}
        </div>
      )}
    </div>
  );
}

function ConferenceCard({ conf }) {
  const { start, end } = parseConferenceDates(conf.dates);
  const dStart = start ? dDelta(start) : null;
  const dEnd = end ? dDelta(end) : null;
  const ongoing = dStart != null && dEnd != null && dStart <= 0 && dEnd >= 0;
  const tierColor = conf.tier === 'Tier 1' ? '#6EE7B7' : '#60A5FA';

  const shortName = (conf.name || '')
    .replace(conf.id || '', '')
    .replace(' Annual Meeting', '')
    .replace(' Congress', '')
    .replace('  ', ' ')
    .trim();

  return (
    <div className="panel relative overflow-hidden p-4 sm:p-[18px_18px_16px]">
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[14px]"
        style={{ background: `linear-gradient(90deg, ${tierColor}, transparent)` }}
      />
      <div className="flex items-center gap-2.5 mb-3">
        <div className="mono text-[16px] sm:text-[18px] font-extrabold text-ink bg-panel-2 border border-line px-2.5 sm:px-3 py-2 rounded-lg tracking-[0.04em] shrink-0">
          {conf.id}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13.5px] font-semibold text-ink truncate">{shortName}</div>
          <div className="mono text-[10.5px] text-ink-3 tracking-[0.06em] mt-[3px] uppercase truncate">
            {conf.location}
          </div>
        </div>
        {conf.tier && (
          <span
            className="mono text-[10px] sm:text-[10.5px] font-semibold px-2 py-[3px] rounded-sm tracking-[0.05em] uppercase border shrink-0 whitespace-nowrap"
            style={{ color: tierColor, background: `${tierColor}1A`, borderColor: `${tierColor}40` }}
          >
            {conf.tier}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5 px-3 py-2 bg-bg-2 rounded-lg border border-[var(--hairline)] flex-wrap">
        <div className={`d-counter ${ongoing ? 'imminent' : dClass(dStart)}`}>
          {ongoing ? 'LIVE' : fmtD(dStart)}
        </div>
        <span className="mono text-[11px] sm:text-[11.5px] text-ink-2">
          {start && fmtDate(start)} – {end && fmtDate(end)} · {start?.slice(0, 4)}
        </span>
      </div>

      {conf.notes && <p className="text-[12.5px] text-ink-2 leading-relaxed my-3">{conf.notes}</p>}

      {(conf.areas || []).length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-1">
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

      {conf.relatedCount > 0 && (
        <div className="pt-3 mt-2 border-t border-[var(--hairline)]">
          <div className="mono text-[10.5px] text-ink-4 tracking-[0.08em] uppercase mb-2">
            발표 예정 기업 · {conf.relatedCount}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(conf.relatedTickers || []).map((t) => (
              <span key={t} className="mono text-[11px] text-ink-2 bg-panel-2 border border-line px-2 py-[2px] rounded">
                {t}
              </span>
            ))}
            {conf.relatedCount > (conf.relatedTickers || []).length && (
              <span className="text-[11px] text-ink-4 px-1 py-[2px]">
                +{conf.relatedCount - (conf.relatedTickers || []).length}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
