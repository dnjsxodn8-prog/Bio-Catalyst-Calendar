// spec 019 — 공개(비로그인) 검색 인덱스. **별도 모듈**로 분리해 공개 라우트 번들이
// 인증용 searchIndex.js(메모·회사 개요 등 비공개 필드명·screener 라벨 포함)를 끌어오지 않게 한다.
// public-data.generated.json(ticker/company/mcap + teaser)만 사용. 점수·본문 일절 없음.
import { dDelta } from './dDay';

function norm(s) {
  return (s == null ? '' : String(s)).toLowerCase();
}

/**
 * @param {{companies:Array, catalysts:Array}} publicData
 * @returns {{entries:Array, search:(q:string, limit?:number)=>Array}}
 */
export function buildPublicSearchIndex(publicData) {
  const companies = publicData?.companies || [];
  const cats = publicData?.catalysts || [];

  // teaser(향후 14일) 카탈리스트로 D-day 만 보강. 약물·적응증은 미노출.
  const nextByTicker = new Map();
  for (const c of cats) {
    if (!c.ticker || !c.date) continue;
    const d = dDelta(c.date);
    if (d == null || d < 0) continue;
    const prev = nextByTicker.get(c.ticker);
    if (!prev || d < prev.dDay) nextByTicker.set(c.ticker, { dDay: d, label: c.type || '' });
  }

  const entries = companies.map((co) => {
    const nc = nextByTicker.get(co.ticker);
    return {
      ticker: co.ticker,
      company: co.company || co.ticker,
      mcap: co.mcap ?? null,
      hasScore: false,
      nextCatalyst: nc?.label || '',
      dDay: nc ? nc.dDay : null,
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
      if (e._tk === query) rank = 0;
      else if (e._tk.startsWith(query)) rank = 1;
      else if (e._co.startsWith(query)) rank = 2;
      else if (e._co.includes(query)) rank = 3;
      else if (e._tk.includes(query)) rank = 4;
      if (rank < 0) continue;
      scored.push({ e, rank });
    }
    scored.sort((a, b) =>
      a.rank !== b.rank ? a.rank - b.rank : (b.e.mcap ?? 0) - (a.e.mcap ?? 0)
    );
    return scored.slice(0, limit).map((s) => s.e);
  }

  return { entries, search };
}
