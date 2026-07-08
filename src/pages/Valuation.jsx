import { useMemo, useState } from 'react';
import { usePrivateData } from '../store/privateData';
import ValuationControlBar from '../components/valuation/ValuationControlBar';
import ValuationTable from '../components/valuation/ValuationTable';

const DEFAULT_SORT = { key: 'peg', dir: 'asc' };
// 첫 클릭 시 오름차순이 자연스러운 컬럼(저평가·사전순). 나머지 숫자 컬럼은 내림차순 기본.
const ASC_FIRST = new Set(['t', 'ind', 'peg', 'per', 'fpe', 'pbr']);
// 안정적 참조 fallback (useMemo 의존성이 매 렌더 바뀌지 않도록)
const EMPTY_ROWS = [];
const EMPTY_MKT = { rows: EMPTY_ROWS, industries: [], count: 0 };

export default function Valuation({ query }) {
  const { valuation } = usePrivateData();
  const [market, setMarket] = useState('us');
  const [industry, setIndustry] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState(DEFAULT_SORT);

  const markets = valuation?.markets ?? {};
  const mkt = markets[market] ?? EMPTY_MKT;
  const rows = mkt.rows ?? EMPTY_ROWS;

  // 시장 전환 시 세부업종 필터 초기화(시장마다 업종 목록이 다름)
  const onMarket = (m) => {
    setMarket(m);
    setIndustry('all');
  };

  // 로컬 검색 우선, 없으면 전역(Topbar) 검색어 반영
  const search = (q || query || '').trim().toLowerCase();

  const filtered = useMemo(() => {
    let out = rows;
    if (industry !== 'all') out = out.filter((r) => r.ind === industry);
    if (search) {
      out = out.filter(
        (r) => r.t.toLowerCase().includes(search) || (r.n || '').toLowerCase().includes(search)
      );
    }
    return out;
  }, [rows, industry, search]);

  const sorted = useMemo(() => sortRows(filtered, sort), [filtered, sort]);

  const onSort = (key) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: ASC_FIRST.has(key) ? 'asc' : 'desc' }
    );

  const totalRows = (markets.us?.rows?.length ?? 0) + (markets.kr?.rows?.length ?? 0);
  if (!totalRows) {
    return (
      <div className="panel p-8 text-center text-ink-3 text-sm">
        밸류에이션 데이터가 비어 있습니다. 로컬에서{' '}
        <code className="mono">npm run build-valuation</code> 실행 후 다시 빌드하세요.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Header valuation={valuation} market={market} mkt={mkt} />

      <ValuationControlBar
        market={market}
        onMarket={onMarket}
        markets={markets}
        industry={industry}
        onIndustry={setIndustry}
        industries={mkt.industries ?? []}
        q={q}
        onQuery={setQ}
        resultCount={sorted.length}
        totalCount={rows.length}
      />

      {sorted.length === 0 ? (
        <div className="panel p-8 text-center text-ink-3 text-sm">
          <p>조건에 맞는 종목이 없습니다. 세부업종·검색을 완화하세요.</p>
        </div>
      ) : (
        <ValuationTable rows={sorted} sort={sort} onSort={onSort} market={market} />
      )}
    </div>
  );
}

// null 은 방향과 무관하게 항상 맨 뒤.
function sortRows(rows, { key, dir }) {
  const mul = dir === 'asc' ? 1 : -1;
  const isText = key === 't' || key === 'ind';
  return [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    const an = av == null;
    const bn = bv == null;
    if (an && bn) return 0;
    if (an) return 1;
    if (bn) return -1;
    if (isText) return mul * String(av).localeCompare(String(bv), 'en');
    return mul * (av - bv);
  });
}

function Header({ valuation, market, mkt }) {
  const asOf = valuation?.asOf ?? '—';
  const cov = mkt.coverage ?? {};
  return (
    <div>
      <h1 className="text-[22px] font-bold tracking-[-0.02em] text-ink">💰 밸류에이션 스크리너</h1>
      <p className="text-[13px] text-ink-3 mt-1.5 leading-relaxed max-w-3xl">
        바이오·헬스케어(제약·바이오·CDMO·의료기기·진단)의 <b className="text-ink-2">PEG</b> 밸류에이션.
        PEG 낮을수록 성장 대비 저평가. 기본 정렬 = PEG 오름차순, 유효 PEG(PER·성장 모두 양수)만 앞에 온다.
        헤더를 클릭하면 전체 컬럼 정렬, 티커를 누르면 원본({market === 'kr' ? '네이버 증권' : 'Finviz'})으로 이동.
      </p>

      <div className="flex items-center gap-2 flex-wrap mt-3 text-[12px]">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-panel-2 border border-line">
          <span className="text-ink-3">기준일</span>
          <span className="num font-semibold text-ink">{asOf}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-panel-2 border border-line">
          <span className="text-ink-3">{mkt.label ?? ''}</span>
          <span className="num font-semibold text-ink">{mkt.count ?? 0}종</span>
          <span className="text-ink-4">· PEG {mkt.withPeg ?? 0}</span>
        </span>
        {market === 'kr' && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-panel-2 border border-line text-ink-4">
            ROA {cov.roa ?? 0} · ROIC {cov.roic ?? 0} 커버
          </span>
        )}
      </div>

      {/* 한계 표기 (요구사항) */}
      <div className="mt-3 text-[11.5px] text-ink-4 leading-relaxed max-w-3xl border-l-2 border-line pl-3">
        한계: PEG는 EPS가 0 근처면 왜곡되므로 PER·EPS성장을 병행 확인. “해외”는 미국 상장(ADR 포함) 한정.
        해외 매출·영업익·순익은 Finviz 마진·P/S 역산값(참고). 국내는 ROA·ROIC가 일부 종목(KONEX·SPAC 등 무XBRL)에서 공란,
        국내 Fwd PE는 사실상 미수집.
      </div>
    </div>
  );
}
