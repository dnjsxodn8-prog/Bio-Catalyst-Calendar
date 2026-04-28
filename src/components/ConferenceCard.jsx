import { MapPin } from 'lucide-react';
import {
  daysUntil,
  formatConferenceDates,
  parseConferenceDates,
  todayMidnightUTC,
  parseDateUTC,
} from '../utils/format';
import DBadge from './DBadge';
import { TierBadge } from './TypeBadge';
import CatalystRow from './CatalystRow';

// 학회 D-day: 시작일 기준. 단, 시작 ≤ 오늘 ≤ 종료면 "진행 중".
function conferenceStatus(dates) {
  const { start, end } = parseConferenceDates(dates);
  if (!start) return { kind: 'unknown' };
  const today = todayMidnightUTC();
  const s = parseDateUTC(start);
  const e = parseDateUTC(end);
  if (s <= today && today <= e) return { kind: 'ongoing', start, end };
  if (e < today) return { kind: 'past', days: daysUntil(start) };
  return { kind: 'future', days: daysUntil(start) };
}

export default function ConferenceCard({ conference, presentations, companyByTicker }) {
  const status = conferenceStatus(conference.dates);

  return (
    <div className="rounded-xl border border-border bg-bg-card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {status.kind === 'ongoing' ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border bg-accent-green/15 text-accent-green border-accent-green/40">
              진행중
            </span>
          ) : (
            <DBadge days={status.days} />
          )}
          <h3 className="text-base font-semibold text-accent-blue truncate">{conference.name}</h3>
        </div>
        {conference.tier ? <TierBadge tier={conference.tier} /> : null}
      </div>

      {/* 메타 정보 */}
      <div className="px-5 pb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-fg-muted">
        <span className="font-mono tabular-nums">{formatConferenceDates(conference.dates)}</span>
        {conference.location ? (
          <>
            <span className="text-fg-dim">·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {conference.location}
            </span>
          </>
        ) : null}
        {conference.areas?.length ? (
          <>
            <span className="text-fg-dim">·</span>
            <div className="flex flex-wrap gap-1">
              {conference.areas.map((a) => (
                <span key={a} className="px-1.5 py-0.5 rounded bg-bg-card2/60 text-fg-muted">
                  {a}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </div>

      {/* 메모 */}
      {conference.notes ? (
        <div className="px-5 pb-4 text-sm text-fg-muted">{conference.notes}</div>
      ) : null}

      {/* 발표 기업 목록 */}
      {presentations.length > 0 ? (
        <div className="border-t border-border">
          <div className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-fg-muted bg-bg-card2/30">
            발표 ({presentations.length})
          </div>
          <div>
            {presentations.map((c, i) => (
              <CatalystRow
                key={`${conference.id}-${c.ticker}-${c.date}-${i}`}
                catalyst={c}
                company={companyByTicker.get(c.ticker)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
