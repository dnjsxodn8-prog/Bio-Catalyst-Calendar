// 단순 SVG 수평 막대 차트. Recharts는 막대 안 라벨/카운트가 까다로워서
// 데이터 양이 ≤10개라 직접 그리는 게 더 깔끔.
export default function HBarChart({ items, color = '#34d399' }) {
  const total = items.reduce((sum, d) => sum + d.count, 0) || 1;
  const max = Math.max(...items.map((d) => d.count), 1);

  return (
    <div className="space-y-2">
      {items.map((d) => {
        const pct = (d.count / total) * 100;
        const widthPct = (d.count / max) * 100;
        return (
          <div key={d.label} className="text-sm">
            <div className="flex items-baseline justify-between gap-3 mb-1">
              <span className="text-fg truncate">{d.label}</span>
              <span className="text-xs text-fg-muted font-mono tabular-nums shrink-0">
                {d.count} <span className="text-fg-dim">· {pct.toFixed(1)}%</span>
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-bg-card2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${widthPct}%`, background: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
