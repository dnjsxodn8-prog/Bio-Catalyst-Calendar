import { priceSeries } from '../utils/priceSeries';

const COLOR = {
  up: '#34D399',
  down: '#F87171',
  flat: '#94A3B8',
};

export default function Sparkline({ ticker, priceCache, width = 80, height = 22, showArea = true }) {
  const s = priceSeries(ticker, priceCache);
  const color = COLOR[s.dir];
  const n = s.points.length;
  const pts = s.points.map((p, i) => {
    const x = (i / (n - 1)) * width;
    const y = height - p * (height - 4) - 2;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L${width} ${height} L0 ${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block"
      aria-label={`${ticker} 30-day price`}
    >
      {showArea && <path d={area} fill={color} fillOpacity="0.12" />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={pts[n - 1][0]} cy={pts[n - 1][1]} r="2" fill={color} />
    </svg>
  );
}
