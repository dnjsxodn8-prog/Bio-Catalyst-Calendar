// Returns { points: [normalised 0..1], pct, dir, raw } for a ticker.
// Prefers the real 30-day price cache from data.generated.json; falls back to a
// deterministic seeded series so every ticker always has something to render.

const _cache = new Map();

export function priceSeries(ticker, priceCache) {
  const key = ticker + (priceCache?.fetched ?? '');
  if (_cache.has(key)) return _cache.get(key);

  const real = priceCache?.data;
  let raw;
  if (Array.isArray(real) && real.length >= 2) {
    raw = real.map((d) => Number(d.close)).filter((n) => Number.isFinite(n));
  }
  if (!raw || raw.length < 2) raw = seededSeries(ticker);

  const start = raw[0];
  const end = raw[raw.length - 1];
  const pct = ((end - start) / start) * 100;
  const dir = pct > 0.5 ? 'up' : pct < -0.5 ? 'down' : 'flat';
  const min = Math.min(...raw);
  const max = Math.max(...raw);
  const points = raw.map((v) => (max === min ? 0.5 : (v - min) / (max - min)));
  const out = { points, pct, dir, raw };
  _cache.set(key, out);
  return out;
}

function seededSeries(ticker) {
  let h = 0;
  for (let i = 0; i < ticker.length; i++) h = (h * 31 + ticker.charCodeAt(i)) | 0;
  const rnd = () => {
    h = (h * 1664525 + 1013904223) | 0;
    return ((h >>> 0) % 10000) / 10000;
  };
  const drift = (rnd() - 0.45) * 0.012;
  const vol = 0.018 + rnd() * 0.025;
  const out = [100];
  for (let i = 1; i < 30; i++) {
    const change = drift + (rnd() - 0.5) * vol * 2;
    out.push(out[i - 1] * (1 + change));
  }
  return out;
}
