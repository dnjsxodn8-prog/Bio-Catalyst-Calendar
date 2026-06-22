// src/utils/screenerFilters.js
// spec 020 — Screener 멀티패싯 필터·정렬·URL 직렬화 순수함수.
// UI 의존성 없음 (node:test 로 단위테스트). 차트·테이블·카드 뷰가 공통으로 사용.

// ── 등급 ──────────────────────────────────────────────────────────────
export const GRADES = ['위대한 후보', '관찰 후보', '무등급', '부적격'];
const GRP_CODE = { '위대한 후보': 'great', '관찰 후보': 'watch', 무등급: 'none', 부적격: 'dq' };
const CODE_GRP = Object.fromEntries(Object.entries(GRP_CODE).map(([k, v]) => [v, k]));

// ── 시총 버킷 (make_viz / 기존 Screener 와 동일) ──────────────────────
export const MC_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'micro', label: '$100M 미만' },
  { value: 'small', label: '$100M ~ $1B' },
  { value: 'mid', label: '$1B ~ $10B' },
  { value: 'large', label: '$10B ~ $100B' },
  { value: 'mega', label: '$100B 이상' },
];
export function mcBucket(m) {
  if (m == null) return 'na';
  if (m < 100) return 'micro';
  if (m < 1000) return 'small';
  if (m < 10000) return 'mid';
  if (m < 100000) return 'large';
  return 'mega';
}

// ── rerating 카테고리 판정 ────────────────────────────────────────────
export const isWatchlist = (d) => d.wl === 'Primary' || d.wl === 'Aggressive';
export const isEarlyRerating = (d) =>
  d.rl === 'Early Rerating Candidate' || d.rl === 'Deep Value Watch';

export const NA_MODALITY = '미상';

// ── 정렬 키 ───────────────────────────────────────────────────────────
export const SORT_KEYS = [
  { key: 'g', label: 'G 과학' },
  { key: 'e', label: 'E 실행' },
  { key: 't1', label: 'T1 임박' },
  { key: 'm', label: '시총' },
  { key: 'runway', label: '런웨이' },
  { key: 'rt', label: 'R_total' },
  { key: 'kdate', label: '카탈리스트 일자' },
  { key: 't', label: '종목(가나다)' },
];

// ── 기본 필터 상태 ────────────────────────────────────────────────────
export function defaultFilters() {
  return {
    grp: [], // 비었으면 전체 (OR)
    gMin: 0,
    gMax: 100,
    eMin: 0,
    eMax: 100,
    t1Min: 0,
    t1Max: 4,
    mc: 'all',
    runwayMin: null, // 분기; null = 미적용
    runwayInclNA: true,
    rr: [], // 'wl' | 'early' (OR)
    inCalOnly: false,
    mod: [], // 모달리티 (NA_MODALITY 포함 가능, OR)
    area: [], // 적응증 (OR)
    q: '',
    sort: { key: 'g', dir: 'desc' },
    view: 'table', // 'table' | 'chart'
    chart: { type: '3d', z: 't1' }, // '3d'|'2d' / 't1'|'mlog'
  };
}

// ── 한 종목이 필터를 통과하는가 ───────────────────────────────────────
export function passFilters(d, f) {
  if (f.grp.length && !f.grp.includes(d.grp)) return false;

  if (d.g < f.gMin || d.g > f.gMax) return false;
  if (d.e < f.eMin || d.e > f.eMax) return false;
  if (d.t1 < f.t1Min || d.t1 > f.t1Max) return false;

  if (f.mc !== 'all' && mcBucket(d.m) !== f.mc) return false;

  if (f.runwayMin != null) {
    if (d.runway == null) {
      if (!f.runwayInclNA) return false;
    } else if (d.runway < f.runwayMin) return false;
  }

  if (f.rr.length) {
    const ok =
      (f.rr.includes('wl') && isWatchlist(d)) || (f.rr.includes('early') && isEarlyRerating(d));
    if (!ok) return false;
  }

  if (f.inCalOnly && !d.inCalendar) return false;

  if (f.mod.length) {
    const key = d.mod || NA_MODALITY;
    if (!f.mod.includes(key)) return false;
  }

  if (f.area.length) {
    // 값 없는 종목은 적응증 필터 적용 시 자동 제외 (spec 020 §2 empty state 원칙)
    if (!d.area || !d.area.some((a) => f.area.includes(a))) return false;
  }

  if (f.q) {
    const q = f.q.trim().toLowerCase();
    if (q && !d.t.toLowerCase().includes(q) && !(d.c || '').toLowerCase().includes(q)) return false;
  }

  return true;
}

export function applyFilters(points, f) {
  return points.filter((d) => passFilters(d, f));
}

// ── 정렬 (null/빈값은 방향과 무관하게 항상 맨 뒤) ─────────────────────
export function sortPoints(points, key, dir) {
  const mul = dir === 'asc' ? 1 : -1;
  const arr = [...points];
  arr.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const an = av == null || av === '';
    const bn = bv == null || bv === '';
    if (an && bn) return 0;
    if (an) return 1;
    if (bn) return -1;
    if (typeof av === 'string' || typeof bv === 'string') {
      return String(av).localeCompare(String(bv)) * mul;
    }
    return (av - bv) * mul;
  });
  return arr;
}

// ── 활성 패싯 개수 (필터 버튼 배지) ───────────────────────────────────
export function countActiveFacets(f) {
  const d = defaultFilters();
  let n = 0;
  if (f.grp.length) n++;
  if (f.gMin !== d.gMin || f.gMax !== d.gMax) n++;
  if (f.eMin !== d.eMin || f.eMax !== d.eMax) n++;
  if (f.t1Min !== d.t1Min || f.t1Max !== d.t1Max) n++;
  if (f.mc !== 'all') n++;
  if (f.runwayMin != null) n++;
  if (f.rr.length) n++;
  if (f.inCalOnly) n++;
  if (f.mod.length) n++;
  if (f.area.length) n++;
  return n;
}

// ── 활성 필터 칩 enumerate (개별 ×) ──────────────────────────────────
// 반환: [{ id, label }] — id 로 removeChip(f, id) 호출
export function activeChips(f) {
  const d = defaultFilters();
  const chips = [];
  for (const g of f.grp) chips.push({ id: `grp:${g}`, label: g });
  if (f.gMin !== d.gMin || f.gMax !== d.gMax) chips.push({ id: 'g', label: `G ${f.gMin}–${f.gMax}` });
  if (f.eMin !== d.eMin || f.eMax !== d.eMax) chips.push({ id: 'e', label: `E ${f.eMin}–${f.eMax}` });
  if (f.t1Min !== d.t1Min || f.t1Max !== d.t1Max)
    chips.push({ id: 't1', label: `T1 ${f.t1Min}–${f.t1Max}` });
  if (f.mc !== 'all') {
    const o = MC_OPTIONS.find((x) => x.value === f.mc);
    chips.push({ id: 'mc', label: `시총 ${o ? o.label : f.mc}` });
  }
  if (f.runwayMin != null) chips.push({ id: 'runway', label: `런웨이 ≥${f.runwayMin}Q` });
  for (const r of f.rr)
    chips.push({ id: `rr:${r}`, label: r === 'wl' ? 'Primary/Aggressive' : 'Early/Deep Value' });
  if (f.inCalOnly) chips.push({ id: 'cal', label: 'Calendar 등록' });
  for (const m of f.mod) chips.push({ id: `mod:${m}`, label: m });
  for (const a of f.area) chips.push({ id: `area:${a}`, label: a });
  return chips;
}

// 칩 1개 제거 → 새 필터 (불변)
export function removeChip(f, id) {
  const d = defaultFilters();
  const next = { ...f };
  if (id.startsWith('grp:')) next.grp = f.grp.filter((x) => x !== id.slice(4));
  else if (id.startsWith('rr:')) next.rr = f.rr.filter((x) => x !== id.slice(3));
  else if (id.startsWith('mod:')) next.mod = f.mod.filter((x) => x !== id.slice(4));
  else if (id.startsWith('area:')) next.area = f.area.filter((x) => x !== id.slice(5));
  else if (id === 'g') {
    next.gMin = d.gMin;
    next.gMax = d.gMax;
  } else if (id === 'e') {
    next.eMin = d.eMin;
    next.eMax = d.eMax;
  } else if (id === 't1') {
    next.t1Min = d.t1Min;
    next.t1Max = d.t1Max;
  } else if (id === 'mc') next.mc = 'all';
  else if (id === 'runway') next.runwayMin = null;
  else if (id === 'cal') next.inCalOnly = false;
  return next;
}

// 필터만 초기화 (검색어·뷰·정렬·차트 상태는 유지)
export function clearAllFacets(f) {
  const d = defaultFilters();
  return { ...f, ...{ grp: d.grp, gMin: d.gMin, gMax: d.gMax, eMin: d.eMin, eMax: d.eMax, t1Min: d.t1Min, t1Max: d.t1Max, mc: d.mc, runwayMin: d.runwayMin, runwayInclNA: d.runwayInclNA, rr: d.rr, inCalOnly: d.inCalOnly, mod: d.mod, area: d.area } };
}

// ── URL 직렬화: 기본값과 다른 키만 → 짧은 query 객체 ─────────────────
export function serializeFilters(f) {
  const d = defaultFilters();
  const p = {};
  if (f.grp.length) p.grp = f.grp.map((g) => GRP_CODE[g] || g).join(',');
  if (f.gMin !== d.gMin) p.gmin = String(f.gMin);
  if (f.gMax !== d.gMax) p.gmax = String(f.gMax);
  if (f.eMin !== d.eMin) p.emin = String(f.eMin);
  if (f.eMax !== d.eMax) p.emax = String(f.eMax);
  if (f.t1Min !== d.t1Min) p.t1min = String(f.t1Min);
  if (f.t1Max !== d.t1Max) p.t1max = String(f.t1Max);
  if (f.mc !== d.mc) p.mc = f.mc;
  if (f.runwayMin != null) {
    p.rwmin = String(f.runwayMin);
    if (!f.runwayInclNA) p.rwna = '0';
  }
  if (f.rr.length) p.rr = f.rr.join(',');
  if (f.inCalOnly) p.cal = '1';
  if (f.mod.length) p.mod = f.mod.join(',');
  if (f.area.length) p.area = f.area.join(',');
  if (f.q) p.q = f.q;
  if (f.sort.key !== d.sort.key || f.sort.dir !== d.sort.dir)
    p.sort = `${f.sort.key}:${f.sort.dir}`;
  if (f.view !== d.view) p.view = f.view;
  if (f.chart.type !== d.chart.type) p.ct = f.chart.type;
  if (f.chart.z !== d.chart.z) p.cz = f.chart.z;
  return p;
}

// ── URL 역직렬화: query 객체(또는 URLSearchParams) → 완전한 필터 ────
export function parseFilters(params) {
  const get = (k) => (params && typeof params.get === 'function' ? params.get(k) : params?.[k]);
  const f = defaultFilters();
  const intIn = (v, lo, hi, fb) => {
    const n = parseInt(v, 10);
    return Number.isNaN(n) ? fb : Math.max(lo, Math.min(hi, n));
  };

  const grp = get('grp');
  if (grp) f.grp = grp.split(',').map((c) => CODE_GRP[c] || c).filter((g) => GRADES.includes(g));

  if (get('gmin') != null) f.gMin = intIn(get('gmin'), 0, 100, f.gMin);
  if (get('gmax') != null) f.gMax = intIn(get('gmax'), 0, 100, f.gMax);
  if (get('emin') != null) f.eMin = intIn(get('emin'), 0, 100, f.eMin);
  if (get('emax') != null) f.eMax = intIn(get('emax'), 0, 100, f.eMax);
  if (get('t1min') != null) f.t1Min = intIn(get('t1min'), 0, 4, f.t1Min);
  if (get('t1max') != null) f.t1Max = intIn(get('t1max'), 0, 4, f.t1Max);

  const mc = get('mc');
  if (mc && MC_OPTIONS.some((o) => o.value === mc)) f.mc = mc;

  const rwmin = get('rwmin');
  if (rwmin != null && rwmin !== '') {
    const n = parseFloat(rwmin);
    if (!Number.isNaN(n)) f.runwayMin = n;
    if (get('rwna') === '0') f.runwayInclNA = false;
  }

  const rr = get('rr');
  if (rr) f.rr = rr.split(',').filter((x) => x === 'wl' || x === 'early');

  if (get('cal') === '1') f.inCalOnly = true;

  const mod = get('mod');
  if (mod) f.mod = mod.split(',').filter(Boolean);
  const area = get('area');
  if (area) f.area = area.split(',').filter(Boolean);

  const q = get('q');
  if (q) f.q = q;

  const sort = get('sort');
  if (sort && sort.includes(':')) {
    const [key, dir] = sort.split(':');
    if (SORT_KEYS.some((s) => s.key === key)) f.sort = { key, dir: dir === 'asc' ? 'asc' : 'desc' };
  }

  const view = get('view');
  if (view === 'table' || view === 'chart') f.view = view;
  const ct = get('ct');
  if (ct === '3d' || ct === '2d') f.chart.type = ct;
  const cz = get('cz');
  if (cz === 't1' || cz === 'mlog') f.chart.z = cz;

  return f;
}

// 모달리티/적응증 옵션을 points 에서 추출 (빈도순). 미상은 별도.
export function facetOptions(points) {
  const modCount = {};
  const areaCount = {};
  let modNA = 0;
  for (const d of points) {
    if (d.mod) modCount[d.mod] = (modCount[d.mod] || 0) + 1;
    else modNA++;
    for (const a of d.area || []) areaCount[a] = (areaCount[a] || 0) + 1;
  }
  const mod = Object.entries(modCount).sort((a, b) => b[1] - a[1]).map(([v, n]) => ({ value: v, count: n }));
  if (modNA) mod.push({ value: NA_MODALITY, count: modNA });
  const area = Object.entries(areaCount).sort((a, b) => b[1] - a[1]).map(([v, n]) => ({ value: v, count: n }));
  return { mod, area };
}
