import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '../auth';
import publicData from '../public-data.generated.json';
import { fmtMcap } from '../utils/dDay';

export default function CompaniesPublic() {
  const [sortBy, setSortBy] = useState('mcap');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (publicData.companies || [])
      .filter((c) => {
        if (!q) return true;
        return (
          c.ticker.toLowerCase().includes(q) || (c.company || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'mcap') return (b.mcap ?? 0) - (a.mcap ?? 0);
        return a.ticker.localeCompare(b.ticker);
      });
  }, [query, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">추적 종목</h1>
        <p className="mt-2 text-sm text-ink-3 max-w-2xl">
          시총 $100M 이상 미국 biotech 와 빅파마. 티커, 회사명, 시가총액만 공개합니다. modality 분류,
          약물 파이프라인, 임상 정보, 투자 노트는 가입 후 열람할 수 있습니다.
        </p>
      </header>

      <div className="panel overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-b border-line">
          <input
            type="search"
            placeholder="티커 또는 회사명 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-0 sm:max-w-xs h-9 px-3 rounded-md bg-panel-2 border border-line text-sm text-ink placeholder:text-ink-4 focus:outline-none focus:border-line-2"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-panel-2 text-ink border border-line rounded-md px-2 py-1 text-xs h-9 shrink-0"
          >
            <option value="mcap">시총 순</option>
            <option value="ticker">티커 순</option>
          </select>
          <span className="hidden sm:inline ml-auto num text-[11px] font-semibold text-ink-2 tracking-[0.04em] shrink-0">
            {filtered.length} / {(publicData.companies || []).length}
          </span>
        </div>

        {/* 데스크톱 표 헤더 */}
        <div className="hidden sm:grid grid-cols-[100px_1fr_140px] items-center gap-3 px-4 py-2.5 border-b border-line bg-bg-2 text-[10.5px] font-semibold text-ink-2 tracking-[0.1em] uppercase">
          <span>티커</span>
          <span>회사명</span>
          <span className="text-right">시총</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center text-ink-3 text-sm">조건에 맞는 종목 없음.</div>
        ) : (
          filtered.map((c) => (
            <div
              key={c.ticker}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[100px_1fr_140px] items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-0 sm:h-12 border-b border-[var(--hairline)]"
            >
              {/* 모바일: 티커+회사명 2-line, 데스크톱: 티커 셀 */}
              <span className="min-w-0 sm:contents">
                <span className="mono text-[13px] font-bold text-ink block sm:inline truncate">
                  {c.ticker}
                </span>
                <span className="text-[12.5px] sm:text-[13px] text-ink-3 sm:text-ink block sm:inline truncate">
                  {c.company}
                </span>
              </span>
              <span className="text-right num text-[13px] text-ink font-semibold whitespace-nowrap">
                {fmtMcap(c.mcap)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        <div className="flex-1">
          <div className="text-sm font-semibold text-ink">종목 디테일이 궁금하다면?</div>
          <div className="mt-1 text-[13px] text-ink-3">
            가입 후 modality·약물·임상 phase·적응증·30일 주가·다음 카탈리스트·투자 노트까지 모두 열람.
          </div>
        </div>
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/app/companies">
            <button className="w-full sm:w-auto h-10 px-4 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
              무료로 시작하기
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link
            to="/app/companies"
            className="w-full sm:w-auto h-10 px-4 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center whitespace-nowrap"
          >
            전체 종목 →
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}
