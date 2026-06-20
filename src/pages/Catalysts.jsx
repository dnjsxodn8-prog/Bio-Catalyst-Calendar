import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  dDelta,
  fmtD,
  dClass,
  fmtDate,
  phaseClass,
  typeClass,
} from '../utils/dDay';
import {
  isResolved,
  outcomeMeta,
  outcomeDate,
  outcomeSources,
  OUTCOME_ORDER,
} from '../utils/outcome';

const TYPE_FILTERS = [
  ['all', 'All', null],
  ['PDUFA', 'PDUFA', '#FBBF24'],
  ['Clinical Readout', 'Readout', '#C084FC'],
  ['Conference', 'Conference', '#60A5FA'],
  ['Regulatory', 'Regulatory', '#F472B6'],
];

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DEFAULT_PAST_DAYS = 7;
const EXPANDED_PAST_DAYS = 30;

// outcome enum → 색 배지 (index.css 가 다른 세션 소유라 인라인 스타일).
function OutcomeBadge({ outcome, size = 'sm' }) {
  const meta = outcomeMeta(outcome);
  if (!meta) return null;
  const h = size === 'sm' ? 'h-[17px] text-[9.5px] px-1.5' : 'h-[20px] text-[10.5px] px-2';
  return (
    <span
      className={`inline-flex items-center ${h} rounded mono font-semibold tracking-wide border whitespace-nowrap`}
      style={{ color: meta.color, borderColor: meta.color, background: meta.color + '1A' }}
    >
      {meta.label}
    </span>
  );
}

export default function Catalysts({ data, query, onPick }) {
  const { catalysts } = data;
  const [mode, setMode] = useState('upcoming'); // 'upcoming' | 'results'
  const [view, setView] = useState('timeline');
  const [filterType, setFilterType] = useState('all');
  const [filterOutcome, setFilterOutcome] = useState('all');
  const [showOldPast, setShowOldPast] = useState(false);
  const [detail, setDetail] = useState(null); // Results 행 클릭 시 결과 상세 모달

  const q = (query || '').trim().toLowerCase();
  const matchesQuery = (c) => {
    if (!q) return true;
    const blob = [c.ticker, c.event, c.drug, c.indication, c.result]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return blob.includes(q);
  };

  // Upcoming 모드: 기존 cutoff 로직 그대로.
  const { upcoming, hiddenOldCount } = useMemo(() => {
    const cutoff = showOldPast ? -EXPANDED_PAST_DAYS : -DEFAULT_PAST_DAYS;
    const all = catalysts
      .map((c) => ({ ...c, _d: dDelta(c.date) }))
      .filter((c) => c._d != null)
      .filter((c) => filterType === 'all' || c.type === filterType)
      .filter(matchesQuery)
      .sort((a, b) => a._d - b._d);

    const hiddenWhenCollapsed = all.filter(
      (c) => c._d < -DEFAULT_PAST_DAYS && c._d >= -EXPANDED_PAST_DAYS
    );
    const visible = all.filter((c) => c._d >= cutoff);
    return { upcoming: visible, hiddenOldCount: hiddenWhenCollapsed.length };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalysts, q, filterType, showOldPast]);

  // Results 모드: 해소된 이벤트만, cutoff 없음, outcome_date 내림차순 (무제한 누적).
  const results = useMemo(() => {
    return catalysts
      .filter(isResolved)
      .filter((c) => filterType === 'all' || c.type === filterType)
      .filter((c) => filterOutcome === 'all' || c.outcome === filterOutcome)
      .filter(matchesQuery)
      .map((c) => ({ ...c, _od: outcomeDate(c) }))
      .sort((a, b) => String(b._od).localeCompare(String(a._od)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalysts, q, filterType, filterOutcome]);

  const resolvedCount = useMemo(() => catalysts.filter(isResolved).length, [catalysts]);
  const outcomesPresent = useMemo(() => {
    const set = new Set(catalysts.filter(isResolved).map((c) => c.outcome));
    return OUTCOME_ORDER.filter((o) => set.has(o));
  }, [catalysts]);

  const count = mode === 'results' ? results.length : upcoming.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="panel px-4 py-3 flex items-center gap-2 flex-wrap">
        {/* Upcoming ↔ Results */}
        <div className="flex gap-0.5 p-0.5 bg-bg-2 rounded-md border border-line">
          {[
            ['upcoming', 'Upcoming'],
            ['results', `Results${resolvedCount ? ` ${resolvedCount}` : ''}`],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setMode(v)}
              className={[
                'px-3 py-1 rounded-sm text-[12px] border-0 transition-colors',
                mode === v ? 'bg-panel-2 text-ink' : 'bg-transparent text-ink-3 hover:text-ink',
              ].join(' ')}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-line mx-1" />

        {/* type filters (both modes) */}
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
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                )}
                {l}
              </button>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase">
            {count} {mode === 'results' ? 'RESULTS' : 'EVENTS'}
          </span>
          {mode === 'upcoming' && hiddenOldCount > 0 && (
            <button
              onClick={() => setShowOldPast((s) => !s)}
              className={[
                'h-[26px] px-2.5 rounded-md text-[11px] border transition-colors',
                showOldPast
                  ? 'bg-panel-2 text-ink border-line-2'
                  : 'bg-transparent text-ink-3 border-line hover:text-ink hover:border-line-2',
              ].join(' ')}
              title={`지난 ${DEFAULT_PAST_DAYS}~${EXPANDED_PAST_DAYS}일 카탈리스트 ${hiddenOldCount}개`}
            >
              {showOldPast
                ? `지난 ${EXPANDED_PAST_DAYS}일 숨기기`
                : `+ 지난 ${EXPANDED_PAST_DAYS}일 (${hiddenOldCount})`}
            </button>
          )}
          {mode === 'upcoming' && (
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
          )}
        </div>

        {/* outcome filters (results mode) */}
        {mode === 'results' && outcomesPresent.length > 0 && (
          <div className="w-full flex items-center gap-1.5 pt-2 mt-1 border-t border-[var(--hairline)]">
            <span className="mono text-[10px] text-ink-4 tracking-[0.1em] uppercase mr-1">결과</span>
            <button
              onClick={() => setFilterOutcome('all')}
              className={[
                'h-[26px] px-2.5 rounded-md text-[11px] border transition-colors',
                filterOutcome === 'all'
                  ? 'bg-panel-2 text-ink border-line-2'
                  : 'bg-transparent text-ink-3 border-transparent hover:text-ink',
              ].join(' ')}
            >
              All
            </button>
            {outcomesPresent.map((o) => {
              const meta = outcomeMeta(o);
              const active = filterOutcome === o;
              return (
                <button
                  key={o}
                  onClick={() => setFilterOutcome(o)}
                  className={[
                    'h-[26px] px-2.5 rounded-md text-[11px] border transition-colors flex items-center gap-1.5',
                    active ? 'text-ink border-line-2 bg-panel-2' : 'text-ink-3 border-transparent hover:text-ink',
                  ].join(' ')}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: meta.color }} />
                  {meta.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {mode === 'results' ? (
        <ResultsView events={results} onOpenDetail={setDetail} />
      ) : view === 'timeline' ? (
        <TimelineView events={upcoming} onPick={onPick} />
      ) : (
        <ListView events={upcoming} onPick={onPick} />
      )}

      {detail && (
        <ResultDetailModal
          event={detail}
          onClose={() => setDetail(null)}
          onOpenCompany={(e) => {
            setDetail(null);
            onPick && onPick(e);
          }}
        />
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
                  <span className="ev-title flex items-center gap-2 min-w-0">
                    <span className="truncate">
                      {e.drug ? (
                        <>
                          <b>{e.drug}</b>
                          {e.indication && <span className="text-ink-3"> · {e.indication}</span>}
                        </>
                      ) : (
                        <span className="text-ink-2">{e.event}</span>
                      )}
                    </span>
                    {isResolved(e) && <OutcomeBadge outcome={e.outcome} />}
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
          <span className="ev-title flex items-center gap-2 min-w-0">
            <b className="truncate">{e.event}</b>
            {isResolved(e) && <OutcomeBadge outcome={e.outcome} />}
          </span>
          {e.phase ? <span className={`chip ${phaseClass(e.phase)}`}>{e.phase}</span> : <span />}
          <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
        </div>
      ))}
    </div>
  );
}

// 해소된 카탈리스트 — 결과 누적 뷰 (cutoff 없음, outcome_date 내림차순).
function ResultsView({ events, onOpenDetail }) {
  if (events.length === 0) {
    return (
      <div className="panel p-8 text-center text-ink-3 text-sm">
        아직 결과가 기록된 카탈리스트가 없습니다.
      </div>
    );
  }
  return (
    <div className="panel overflow-hidden">
      {events.map((e, i) => (
          <div
            key={`${e.ticker}-${e._od}-${i}`}
            onClick={() => onOpenDetail && onOpenDetail(e)}
            className="grid items-center gap-3.5 px-3.5 py-3 border-b border-[var(--hairline)] last:border-b-0 cursor-pointer hover:bg-white/[0.025] transition-colors"
            style={{ gridTemplateColumns: '54px 96px 60px 1fr auto auto' }}
          >
            <OutcomeBadge outcome={e.outcome} size="lg" />
            <span className="ev-date">
              {fmtDate(e._od)} · {String(e._od).slice(0, 4)}
            </span>
            <span className="ev-ticker">{e.ticker}</span>
            <div className="min-w-0">
              <div className="ev-title truncate">
                <b>{e.drug || e.ticker}</b>
                {e.indication && <span className="text-ink-3"> · {e.indication}</span>}
              </div>
              {e.result && (
                <div className="text-[12px] text-ink-3 mt-0.5 leading-snug line-clamp-2">
                  {e.result}
                </div>
              )}
            </div>
            {e.phase ? <span className={`chip ${phaseClass(e.phase)}`}>{e.phase}</span> : <span />}
            <div className="flex items-center gap-2">
              <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
              <span className="text-ink-4 text-sm">›</span>
            </div>
          </div>
      ))}
    </div>
  );
}

function hostOf(u) {
  try {
    return new URL(u).hostname.replace(/^www\./, '');
  } catch {
    return u;
  }
}

// 결과 전용 상세 모달 — outcome / 날짜 / 전체 요약 / 모든 출처. (CompanyDetail 미사용 — 다른 세션 소유)
function ResultDetailModal({ event: e, onClose, onOpenCompany }) {
  const meta = outcomeMeta(e.outcome);
  const srcs = outcomeSources(e);

  useEffect(() => {
    const onKey = (ev) => ev.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        style={{ width: 'min(580px, 95vw)' }}
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <OutcomeBadge outcome={e.outcome} size="lg" />
              <h2 className="text-lg font-bold text-ink truncate">{e.drug || e.event}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-ink-3 hover:text-ink text-2xl leading-none px-1 -mt-1"
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          {e.indication && <div className="mt-1 text-[13px] text-ink-3">{e.indication}</div>}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="ev-ticker">{e.ticker}</span>
            {e.company && <span className="text-[13px] text-ink-3">· {e.company}</span>}
            <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
            {e.phase && <span className={`chip ${phaseClass(e.phase)}`}>{e.phase}</span>}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[var(--hairline)] bg-panel-2 px-3 py-2">
              <div className="mono text-[10px] text-ink-4 uppercase tracking-wide">예정일</div>
              <div className="mono text-[13px] text-ink mt-0.5">{e.date}</div>
            </div>
            <div className="rounded-lg border border-[var(--hairline)] bg-panel-2 px-3 py-2">
              <div className="mono text-[10px] text-ink-4 uppercase tracking-wide">결과일</div>
              <div className="mono text-[13px] mt-0.5" style={{ color: meta?.color }}>
                {e.outcome_date || '—'}
              </div>
            </div>
          </div>

          {e.result && (
            <div className="mt-4">
              <div className="mono text-[10px] text-ink-4 uppercase tracking-wide mb-1">결과 요약</div>
              <p className="text-[13.5px] text-ink-2 leading-relaxed whitespace-pre-line">
                {e.result}
              </p>
            </div>
          )}

          {srcs.length > 0 && (
            <div className="mt-4">
              <div className="mono text-[10px] text-ink-4 uppercase tracking-wide mb-1.5">
                출처 ({srcs.length})
              </div>
              <ul className="flex flex-col gap-1">
                {srcs.map((u, i) => (
                  <li key={i}>
                    <a
                      href={u}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[12.5px] text-ink-3 hover:text-ink underline underline-offset-2 break-all"
                    >
                      {hostOf(u)} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => onOpenCompany(e)}
              className="h-9 px-3.5 rounded-md bg-panel-2 border border-line-2 text-[13px] text-ink hover:bg-white/[0.04] transition-colors"
            >
              종목 상세 보기 →
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
