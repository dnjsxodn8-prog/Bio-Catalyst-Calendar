// 필터 드롭다운. options: ['A','B'] 또는 [{value, label}, ...]
export default function FilterSelect({ value, onChange, options, label }) {
  const isObj = options.length > 0 && typeof options[0] === 'object';
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          'h-9 pl-3 pr-8 rounded-lg bg-bg-card2 border border-border',
          'text-sm text-fg appearance-none cursor-pointer',
          'focus:outline-none focus:border-accent-green/60',
        ].join(' ')}
      >
        {options.map((o) =>
          isObj ? (
            <option key={o.value} value={o.value}>
              {label}: {o.label}
            </option>
          ) : (
            <option key={o} value={o}>
              {label}: {o === 'All' ? '전체' : o}
            </option>
          )
        )}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-fg-dim text-xs">
        ▾
      </span>
    </label>
  );
}
