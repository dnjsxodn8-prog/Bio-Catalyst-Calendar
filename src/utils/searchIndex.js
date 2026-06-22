// spec 012 — 통합 검색 인덱스
// data.companies + screener.generated.json(점수) + data.catalysts(D-day)를 ticker로 조인해
// 자동완성 드롭다운용 랭킹 검색을 제공한다. 데이터/빌드 변경 없는 순수 읽기 조인.
import { dDelta } from './dDay';

// 인증 측(소유자 전용)은 메모 포함 전 필드, 공개 측은 사실 필드만 인덱싱.
const PUBLIC_BODY_FIELDS = ['적응증', '타겟 질환', 'MOA', '플랫폼', '상업화 제품', '카탈리스트', '파트너'];
const PRIVATE_BODY_FIELDS = [...PUBLIC_BODY_FIELDS, '회사 개요', '메모'];

// screener 그룹 → 점 색상. (과거 SearchBox 의 GRP_DOT 을 인증 인덱스로 이동 → 공개 번들 격리)
const GRP_DOT = {
  '위대한 후보': '#f5c518',
  '관찰 후보': '#5b8def',
  무등급: '#6b7280',
  부적격: '#b91c1c',
};

function norm(s) {
  return (s == null ? '' : String(s)).toLowerCase();
}

function joinAreas(areas) {
  if (Array.isArray(areas)) return areas.join(' ');
  return areas == null ? '' : String(areas);
}

/**
 * 검색 인덱스 생성.
 * @param {{companies:Array, catalysts:Array}} data
 * @param {{points:Array}} screener
 * @param {{includePrivate?:boolean}} opts  includePrivate=false → 공개(메모 제외)
 * @returns {{entries:Array, search:(q:string, limit?:number)=>Array}}
 */
export function buildSearchIndex(data, screener, opts = {}) {
  const includePrivate = opts.includePrivate !== false; // 기본 true(인증)
  const bodyFields = includePrivate ? PRIVATE_BODY_FIELDS : PUBLIC_BODY_FIELDS;

  // 점수 맵 (ticker -> screener point)
  const scoreByTicker = new Map();
  for (const p of (screener?.points || [])) scoreByTicker.set(p.t, p);

  // 가장 가까운 미래 카탈리스트 (ticker -> {date, dDay, label})
  const nextCatByTicker = new Map();
  for (const c of (data?.catalysts || [])) {
    if (!c.ticker || !c.date) continue;
    const d = dDelta(c.date);
    if (d == null || d < 0) continue; // 미래만
    const prev = nextCatByTicker.get(c.ticker);
    if (!prev || d < prev.dDay) {
      nextCatByTicker.set(c.ticker, { date: c.date, dDay: d, label: c.event || c.type || '' });
    }
  }

  // 카탈리스트에서 약물/적응증도 검색 보강(인증 측만)
  const catTextByTicker = new Map();
  if (includePrivate) {
    for (const c of (data?.catalysts || [])) {
      if (!c.ticker) continue;
      const t = `${c.drug || ''} ${c.indication || ''} ${c.event || ''}`;
      catTextByTicker.set(c.ticker, (catTextByTicker.get(c.ticker) || '') + ' ' + t);
    }
  }

  const entries = (data?.companies || []).map((co) => {
    const sc = scoreByTicker.get(co.ticker);
    const body = co.body || {};
    const bodyText = bodyFields.map((f) => body[f]).filter(Boolean).join(' ');
    const haystack = norm(
      [co.ticker, co.company, co.modality, joinAreas(co.areas), bodyText, catTextByTicker.get(co.ticker)]
        .filter(Boolean)
        .join(' ')
    );
    const nc = nextCatByTicker.get(co.ticker);
    return {
      ticker: co.ticker,
      company: co.company || co.ticker,
      modality: co.modality || '',
      mcap: co.mcap ?? sc?.m ?? null,
      g: sc?.g ?? null,
      e: sc?.e ?? null,
      grp: sc?.grp ?? '',
      grpColor: sc ? GRP_DOT[sc.grp] || '#6b7280' : '#6b7280',
      rl: sc?.rl ?? '',
      wl: sc?.wl ?? '',
      rt: sc?.rt ?? null,
      hasScore: !!sc,
      nextCatalyst: nc?.label || '',
      dDay: nc ? nc.dDay : null,
      _hay: haystack,
      _tk: norm(co.ticker),
      _co: norm(co.company),
    };
  });

  function search(q, limit = 8) {
    const query = norm(q).trim();
    if (!query) return [];
    const scored = [];
    for (const e of entries) {
      let rank = -1;
      if (e._tk === query) rank = 0;                 // ticker 정확
      else if (e._tk.startsWith(query)) rank = 1;    // ticker prefix
      else if (e._co.startsWith(query)) rank = 2;    // 회사명 prefix
      else if (e._co.includes(query)) rank = 3;      // 회사명 부분
      else if (e._tk.includes(query)) rank = 4;      // ticker 부분
      else if (e._hay.includes(query)) rank = 5;     // modality/areas/body/카탈리스트
      if (rank < 0) continue;
      scored.push({ e, rank });
    }
    scored.sort((a, b) =>
      a.rank !== b.rank ? a.rank - b.rank : (b.e.mcap ?? 0) - (a.e.mcap ?? 0)
    );
    return scored.slice(0, limit).map((s) => s.e);
  }

  // spec 017 §3.6 — 홈 unified grouped search.
  // companies(기존 search) + catalysts + feed + screener signals 4그룹을 함께 반환.
  const catHay = (data?.catalysts || []).map((c) => ({
    item: c,
    _h: norm([c.ticker, c.event, c.drug, c.indication, c.type, c.company].filter(Boolean).join(' ')),
  }));
  const feedHayList = (data?.feed || []).map((f) => ({
    item: f,
    _h: norm([f.ticker, f.headline, f.summary, f.type, f.outcome].filter(Boolean).join(' ')),
  }));

  function searchGrouped(q, limitPer = 6) {
    const query = norm(q).trim();
    const empty = { companies: [], catalysts: [], feed: [], signals: [], counts: {} };
    if (!query) return empty;

    const companies = search(query, limitPer);

    const catAll = catHay.filter((c) => c._h.includes(query)).map((c) => c.item);
    const feedAll = feedHayList.filter((f) => f._h.includes(query)).map((f) => f.item);
    const sigAll = (screener?.points || []).filter(
      (p) => norm(p.t).includes(query) || norm(p.c).includes(query)
    );

    return {
      companies,
      catalysts: catAll.slice(0, limitPer),
      feed: feedAll.slice(0, limitPer),
      signals: sigAll.slice(0, limitPer),
      counts: {
        companies: companies.length, // entries 자체가 회사 단위라 표시용
        catalysts: catAll.length,
        feed: feedAll.length,
        signals: sigAll.length,
      },
    };
  }

  return { entries, search, searchGrouped };
}

// 공개 검색 인덱스는 별도 모듈(searchIndexPublic.js)로 분리 — 공개 번들 격리. spec 019.
