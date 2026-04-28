// Color tier per spec 002: ≤30 red, ≤60 orange, ≤90 amber, ≤180 gray-blue, >180 gray.
// Past dates show as gray with "D+N".
function tierClasses(days) {
  if (days === null || days === undefined) return 'bg-fg-dim/20 text-fg-dim';
  if (days < 0) return 'bg-fg-dim/15 text-fg-dim';
  if (days <= 30) return 'bg-red-900/40 text-accent-red border-red-500/30';
  if (days <= 60) return 'bg-orange-900/40 text-accent-orange border-orange-500/30';
  if (days <= 90) return 'bg-amber-900/40 text-accent-amber border-amber-500/30';
  if (days <= 180) return 'bg-blue-900/30 text-blue-300 border-blue-500/20';
  return 'bg-fg-dim/15 text-fg-muted border-fg-dim/20';
}

export default function DBadge({ days }) {
  const label =
    days === null || days === undefined ? '—' : days < 0 ? `D+${-days}` : `D-${days}`;
  return (
    <span
      className={[
        'inline-flex items-center justify-center min-w-[3.25rem] px-2 py-0.5',
        'rounded-md text-xs font-mono font-semibold border tabular-nums',
        tierClasses(days),
      ].join(' ')}
    >
      {label}
    </span>
  );
}
