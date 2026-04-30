import { priceSeries } from '../utils/priceSeries';

export default function PctChange({ ticker, priceCache, size = 'sm' }) {
  const s = priceSeries(ticker, priceCache);
  const color = s.dir === 'up' ? '#34D399' : s.dir === 'down' ? '#F87171' : '#94A3B8';
  const sign = s.pct > 0 ? '+' : '';
  const arrow = s.dir === 'up' ? '▲' : s.dir === 'down' ? '▼' : '–';
  const fontSize = size === 'lg' ? 13 : 11.5;
  const arrowSize = size === 'lg' ? 10 : 9;
  return (
    <span
      className="num font-semibold whitespace-nowrap"
      style={{ color, fontSize, letterSpacing: '0.02em' }}
    >
      <span className="mr-[3px] opacity-85" style={{ fontSize: arrowSize }}>
        {arrow}
      </span>
      {sign}
      {s.pct.toFixed(1)}%
    </span>
  );
}
