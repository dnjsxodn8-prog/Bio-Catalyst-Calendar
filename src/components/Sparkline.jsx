// 30일 종가 sparkline (순수 SVG).
// data: [{ date: 'YYYY-MM-DD', close: number }, ...]

const COLOR = {
  up: '#34d399',     // accent.green
  down: '#f87171',   // accent.red
  flat: '#9ca3af',   // fg.muted
};

export default function Sparkline({ data, height = 48 }) {
  if (!Array.isArray(data) || data.length < 2) return null;

  const closes = data.map((d) => d.close);
  const min = Math.min(...closes);
  const max = Math.max(...closes);
  const range = max - min || 1;
  const W = 100;
  const H = height;
  const pad = 1.5; // stroke-width 만큼 여백

  const points = closes
    .map((c, i) => {
      const x = (i / (closes.length - 1)) * W;
      const y = pad + (1 - (c - min) / range) * (H - pad * 2);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');

  const first = closes[0];
  const last = closes[closes.length - 1];
  const trend = last > first ? 'up' : last < first ? 'down' : 'flat';
  const stroke = COLOR[trend];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height: `${H}px` }}
      aria-label="30-day price sparkline"
    >
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}
