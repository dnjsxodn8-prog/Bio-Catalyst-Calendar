const STYLES = {
  PDUFA: 'bg-red-900/40 text-accent-red border-red-500/30',
  Conference: 'bg-blue-900/40 text-accent-blue border-blue-500/30',
  'Clinical Readout': 'bg-emerald-900/40 text-accent-green border-emerald-500/30',
  Regulatory: 'bg-emerald-900/30 text-accent-green border-emerald-500/20',
  Earnings: 'bg-fg-dim/20 text-fg-muted border-fg-dim/20',
};

const RECOMMEND_STYLES = {
  'Core Holding': 'bg-emerald-900/40 text-accent-green border-emerald-500/30',
  'Worth Monitoring': 'bg-blue-900/30 text-accent-blue border-blue-500/20',
  Speculative: 'bg-amber-900/30 text-accent-amber border-amber-500/20',
};

function Badge({ label, className }) {
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border whitespace-nowrap',
        className,
      ].join(' ')}
    >
      {label}
    </span>
  );
}

export function TypeBadge({ type }) {
  const cls = STYLES[type] ?? STYLES.Earnings;
  return <Badge label={type} className={cls} />;
}

export function RecommendBadge({ recommendation }) {
  if (!recommendation) return null;
  const cls = RECOMMEND_STYLES[recommendation] ?? STYLES.Earnings;
  return <Badge label={recommendation} className={cls} />;
}

export function TierBadge({ tier }) {
  const cls =
    tier === 'Tier 1'
      ? 'bg-violet-900/40 text-accent-violet border-violet-500/30'
      : tier === 'Tier 2'
      ? 'bg-blue-900/30 text-accent-blue border-blue-500/20'
      : 'bg-fg-dim/15 text-fg-muted border-fg-dim/20';
  return <Badge label={tier} className={cls} />;
}
