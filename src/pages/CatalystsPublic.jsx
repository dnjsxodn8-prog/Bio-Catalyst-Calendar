import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import data from '../data.generated.json';
import { dDelta, fmtD, dClass, fmtDate, typeClass } from '../utils/dDay';

const PUBLIC_WINDOW_DAYS = 7;

export default function CatalystsPublic() {
  const events = useMemo(() => {
    const companyByTicker = new Map(data.companies.map((c) => [c.ticker, c]));
    return data.catalysts
      .map((c) => ({ ...c, _d: dDelta(c.date), _company: companyByTicker.get(c.ticker)?.company }))
      .filter((c) => c._d != null && c._d >= 0 && c._d <= PUBLIC_WINDOW_DAYS)
      .sort((a, b) => a._d - b._d);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
          다음 7일 카탈리스트
        </h1>
        <p className="mt-2 text-sm text-ink-3 max-w-2xl">
          오늘부터 7일 안에 예정된 PDUFA·임상 readout·학회 발표만 보여줍니다.
          전체 카탈리스트, 적응증, phase, 임상 디자인, 출처 링크는 가입 후 열람할 수 있습니다.
        </p>
      </header>

      {events.length === 0 ? (
        <div className="panel p-8 text-center text-ink-3 text-sm">
          7일 안에 예정된 카탈리스트가 없습니다. <Link to="/" className="underline">홈</Link> 또는 가입 후 전체 일정 보기.
        </div>
      ) : (
        <div className="panel overflow-hidden">
          <div className="grid grid-cols-[80px_90px_80px_1fr_120px] items-center gap-3 px-4 py-2.5 border-b border-line bg-bg-2 text-[10.5px] font-semibold text-ink-2 tracking-[0.1em] uppercase">
            <span>D-day</span>
            <span>날짜</span>
            <span>티커</span>
            <span>회사 / 약물</span>
            <span>이벤트</span>
          </div>
          {events.map((e, i) => (
            <div
              key={`${e.ticker}-${e.date}-${i}`}
              className="grid grid-cols-[80px_90px_80px_1fr_120px] items-center gap-3 px-4 h-14 border-b border-[var(--hairline)]"
            >
              <span className={`d-counter ${dClass(e._d)}`}>{fmtD(e._d)}</span>
              <span className="ev-date">{fmtDate(e.date)}</span>
              <span className="ev-ticker">{e.ticker}</span>
              <span className="flex flex-col min-w-0">
                <span className="text-[13px] text-ink truncate">
                  {e._company || e.ticker}
                </span>
                {e.drug && <span className="text-[11.5px] text-ink-3 truncate">{e.drug}</span>}
              </span>
              <span>
                <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        <div className="flex-1">
          <div className="text-sm font-semibold text-ink">더 많은 카탈리스트가 궁금하다면?</div>
          <div className="mt-1 text-[13px] text-ink-3">
            가입 후 전체 카탈리스트(과거 30일 + 미래 전체), 적응증·phase·임상 디자인·소스 URL 까지 모두 열람.
          </div>
        </div>
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/app/catalysts">
            <button className="h-10 px-4 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
              무료로 시작하기
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link
            to="/app/catalysts"
            className="h-10 px-4 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center whitespace-nowrap"
          >
            전체 카탈리스트 →
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}
