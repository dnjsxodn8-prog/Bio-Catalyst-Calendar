// Date and formatting helpers
const TODAY = new Date('2026-04-29');

function parseDate(s) { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); }
function dDelta(s) {
  const t = parseDate(s);
  const ms = t - TODAY;
  return Math.round(ms / 86400000);
}
function fmtD(d) {
  if (d === 0) return 'D-DAY';
  if (d > 0) return 'D-' + d;
  return 'D+' + Math.abs(d);
}
function dClass(d) {
  if (d < 0) return 'past';
  if (d <= 2) return 'imminent';
  if (d <= 14) return 'urgent';
  return '';
}
function fmtDate(s) {
  const d = parseDate(s);
  const m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];
  return `${m} ${String(d.getDate()).padStart(2,'0')}`;
}
function fmtMcap(v) {
  // v is in millions USD
  if (v >= 100000) return '$' + (v/1000).toFixed(0) + 'B';
  if (v >= 10000) return '$' + (v/1000).toFixed(0) + 'B';
  if (v >= 1000) return '$' + (v/1000).toFixed(1) + 'B';
  return '$' + v + 'M';
}
function phaseClass(p) {
  if (!p) return '';
  if (p === 'Approved') return 'phase-app';
  if (p.includes('Phase 3')) return 'phase-3';
  if (p.includes('Phase 2')) return 'phase-2';
  return 'phase-1';
}
function typeClass(t) {
  return 't-' + (t || '').toLowerCase().replace(/\s+/g,'-').replace(/[^a-z-]/g,'');
}

// Deterministic 30-day price series per ticker.
// Returns { points: [30 values normalised 0..1], pct: number, dir: 'up'|'down'|'flat' }
const _priceCache = {};
function priceSeries(ticker) {
  if (_priceCache[ticker]) return _priceCache[ticker];
  // simple seeded PRNG
  let h = 0;
  for (let i = 0; i < ticker.length; i++) h = (h * 31 + ticker.charCodeAt(i)) | 0;
  const rnd = () => { h = (h * 1664525 + 1013904223) | 0; return ((h >>> 0) % 10000) / 10000; };
  // bias by ticker — give some clearly up, some down
  const upBias = (rnd() - 0.45) * 0.012; // mean drift per day
  const vol = 0.018 + rnd() * 0.025;
  const raw = [100];
  for (let i = 1; i < 30; i++) {
    const change = upBias + (rnd() - 0.5) * vol * 2;
    raw.push(raw[i-1] * (1 + change));
  }
  const start = raw[0], end = raw[raw.length - 1];
  const pct = ((end - start) / start) * 100;
  const dir = pct > 0.5 ? 'up' : pct < -0.5 ? 'down' : 'flat';
  const min = Math.min(...raw), max = Math.max(...raw);
  const points = raw.map(v => max === min ? 0.5 : (v - min) / (max - min));
  const result = { points, pct, dir, raw };
  _priceCache[ticker] = result;
  return result;
}

// Sparkline SVG component
function Sparkline({ ticker, width = 80, height = 22, showArea = true }) {
  const s = priceSeries(ticker);
  const color = s.dir === 'up' ? '#34D399' : s.dir === 'down' ? '#F87171' : '#94A3B8';
  const n = s.points.length;
  const pts = s.points.map((p, i) => {
    const x = (i / (n - 1)) * width;
    const y = height - p * (height - 4) - 2;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L${width} ${height} L0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{display:'block'}}>
      {showArea && <path d={area} fill={color} fillOpacity="0.12"/>}
      <path d={path} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={pts[n-1][0]} cy={pts[n-1][1]} r="2" fill={color}/>
    </svg>
  );
}

function PctChange({ ticker, size = 'sm' }) {
  const s = priceSeries(ticker);
  const color = s.dir === 'up' ? '#34D399' : s.dir === 'down' ? '#F87171' : '#94A3B8';
  const sign = s.pct > 0 ? '+' : '';
  const arrow = s.dir === 'up' ? '▲' : s.dir === 'down' ? '▼' : '–';
  return (
    <span className="num" style={{
      fontSize: size === 'lg' ? 13 : 11.5,
      fontWeight: 600,
      color,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}>
      <span style={{fontSize: size==='lg'?10:9, marginRight:3, opacity:0.85}}>{arrow}</span>
      {sign}{s.pct.toFixed(1)}%
    </span>
  );
}

window.priceSeries = priceSeries;
window.Sparkline = Sparkline;
window.PctChange = PctChange;

Object.assign(window, { TODAY, parseDate, dDelta, fmtD, dClass, fmtDate, fmtMcap, phaseClass, typeClass });
