import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '../auth';
import publicData from '../public-data.generated.json';
import { dDelta, fmtD, dClass, fmtDate, typeClass } from '../utils/dDay';

const PUBLIC_WINDOW_DAYS = 7;

export default function CatalystsPublic() {
  // public-data.catalysts 는 이미 향후 14일 teaser(사실 필드만). 런타임에 7일로 다시 필터.
  const events = useMemo(() => {
    return (publicData.catalysts || [])
      .map((c) => ({ ...c, _d: dDelta(c.date) }))
      .filter((c) => c._d != null && c._d >= 0 && c._d <= PUBLIC_WINDOW_DAYS)
      .sort((a, b) => a._d - b._d);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">다음 7일 카탈리스트</h1>
        <p className="mt-2 text-sm text-ink-3 max-w-2xl">
          오늘부터 7일 안에 예정된 PDUFA·임상 readout·학회 발표만 보여줍니다. 전체 카탈리스트, 적응증,
          phase, 임상 디자인, 출처 링크는 가입 후 열람할 수 있습니다.
        </p>
      </header>

      {events.length === 0 ? (
        <div className="panel p-8 text-center text-ink-3 text-sm">
          7일 안에 예정된 카탈리스트가 없습니다. <Link to="/" className="underline">홈</Link> 또는 가입 후 전체 일정 보기.
        </div>
      ) : (
        <>
          {/* 데스크톱 표 */}
          <div className="panel overflow-hidden hidden md:block">
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
                  <span className="text-[13px] text-ink truncate">{e.company || e.ticker}</span>
                  {e.drug && <span className="text-[11.5px] text-ink-3 truncate">{e.drug}</span>}
                </span>
                <span>
                  <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
                </span>
              </div>
            ))}
          </div>

          {/* 모바일 카드 리스트 */}
          <div className="flex flex-col gap-2.5 md:hidden">
            {events.map((e, i) => (
              <div key={`${e.ticker}-${e.date}-${i}`} className="panel p-3.5">
                <div className="flex items-center gap-2.5">
                  <span className={`d-counter ${dClass(e._d)}`}>{fmtD(e._d)}</span>
                  <span className="ev-ticker">{e.ticker}</span>
                  <span className="ev-date ml-auto">{fmtDate(e.date)}</span>
                </div>
                <div className="mt-2.5 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[13.5px] text-ink truncate">{e.company || e.ticker}</div>
                    {e.drug && <div className="text-[12px] text-ink-3 truncate">{e.drug}</div>}
                  </div>
                  <span className={`chip ${typeClass(e.type)} shrink-0`}>{e.type}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <CtaPanel />
    </div>
  );
}

function CtaPanel() {
  return (
    <div className="panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
      <div className="flex-1">
        <div className="text-sm font-semibold text-ink">더 많은 카탈리스트가 궁금하다면?</div>
        <div className="mt-1 text-[13px] text-ink-3">
          가입 후 전체 카탈리스트(과거 30일 + 미래 전체), 적응증·phase·임상 디자인·소스 URL 까지 모두 열람.
        </div>
      </div>
      <SignedOut>
        <SignInButton mode="modal" forceRedirectUrl="/app/catalysts">
          <button className="w-full sm:w-auto h-10 px-4 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
            무료로 시작하기
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link
          to="/app/catalysts"
          className="w-full sm:w-auto h-10 px-4 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center whitespace-nowrap"
        >
          전체 카탈리스트 →
        </Link>
      </SignedIn>
    </div>
  );
}
