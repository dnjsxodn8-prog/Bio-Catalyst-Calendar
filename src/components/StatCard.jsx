const GRADIENTS = {
  rose: 'from-rose-900/40 to-pink-900/30 border-rose-500/20',
  orange: 'from-orange-900/40 to-amber-900/30 border-orange-500/20',
  violet: 'from-violet-900/40 to-purple-900/30 border-violet-500/20',
  emerald: 'from-emerald-900/40 to-green-900/30 border-emerald-500/20',
  amber: 'from-amber-900/40 to-yellow-900/30 border-amber-500/20',
};

const ICON_TINT = {
  rose: 'text-accent-red',
  orange: 'text-accent-orange',
  violet: 'text-accent-violet',
  emerald: 'text-accent-green',
  amber: 'text-accent-amber',
};

export default function StatCard({ label, value, sub, tone = 'emerald', icon: Icon }) {
  return (
    <div
      className={[
        'rounded-xl border bg-gradient-to-br p-4',
        GRADIENTS[tone] ?? GRADIENTS.emerald,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-xs text-fg-muted leading-snug">{label}</div>
        {Icon ? <Icon className={['w-4 h-4 shrink-0', ICON_TINT[tone]].join(' ')} /> : null}
      </div>
      <div className="mt-2 text-3xl font-semibold text-fg tabular-nums">{value}</div>
      {sub ? <div className="mt-1 text-xs text-fg-dim">{sub}</div> : null}
    </div>
  );
}
