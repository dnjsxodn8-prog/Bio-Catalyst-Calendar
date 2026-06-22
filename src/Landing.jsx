import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from './auth';
import { ChevronRight } from 'lucide-react';
import publicData from './public-data.generated.json';
import { dDelta, fmtD, dClass, typeClass } from './utils/dDay';

// 공개 랜딩. **비공개 데이터(메모·본문·점수·screener) 일절 미사용** — public-data 만.
// 이전엔 인증 Dashboard/Sidebar/Topbar 를 blur 배경으로 렌더해 전체 데이터가 공개 번들에 유입됐음(spec 019 수정).
export default function Landing() {
  useEffect(() => {
    document.body.classList.remove('light');
  }, []);

  const counts = publicData.counts || { companies: 0, catalysts: 0, conferences: 0 };

  // 배경 teaser — 향후 7일 공개 카탈리스트(ticker/type/D-day 만).
  const preview = useMemo(() => {
    return (publicData.catalysts || [])
      .map((c) => ({ ...c, _d: dDelta(c.date) }))
      .filter((c) => c._d != null && c._d >= 0 && c._d <= 7)
      .sort((a, b) => a._d - b._d)
      .slice(0, 14);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* 헤더 */}
      <header className="relative z-20 h-16 flex items-center gap-3 px-4 sm:px-6 max-w-[1280px] w-full mx-auto">
        <Link to="/" className="font-semibold text-ink tracking-tight">
          Bio Catalyst Calendar
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/app">
              <button className="btn">로그인</button>
            </SignInButton>
            <SignInButton mode="modal" forceRedirectUrl="/app">
              <button className="btn btn-primary">무료 가입</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link to="/app" className="btn btn-primary">
              대시보드 <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.6} />
            </Link>
          </SignedIn>
        </div>
      </header>

      {/* 배경 데코 — 공개 teaser, blur 처리 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ filter: 'blur(6px)', opacity: 0.35 }}
      >
        <div className="max-w-[1280px] mx-auto px-6 pt-28 grid grid-cols-2 lg:grid-cols-3 gap-3">
          {preview.map((e, i) => (
            <div key={`${e.ticker}-${i}`} className="panel p-3 flex items-center gap-2.5">
              <span className={`d-counter ${dClass(e._d)}`}>{fmtD(e._d)}</span>
              <span className="mono text-[13px] font-bold text-ink">{e.ticker}</span>
              <span className={`chip ${typeClass(e.type)} ml-auto`}>{e.type}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(8,9,12,0.55) 0%, rgba(8,9,12,0.9) 70%)',
        }}
      />

      {/* CTA */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <CTACard counts={counts} />
      </main>
    </div>
  );
}

function CTACard({ counts }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg w-full max-w-[460px]"
      style={{
        padding: '24px 24px 20px',
        background:
          'linear-gradient(160deg, rgba(110,231,183,0.12) 0%, rgba(96,165,250,0.06) 50%, rgba(11,15,21,0.4) 100%), var(--panel)',
        border: '1px solid rgba(110,231,183,0.30)',
        boxShadow: '0 30px 60px -30px rgba(110,231,183,0.35)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: -80,
          right: -60,
          width: 240,
          height: 240,
          background: 'radial-gradient(closest-side, rgba(251,191,36,0.18), transparent 70%)',
        }}
      />

      <div className="mono text-[11px] text-ink-3 tracking-[0.12em] uppercase mb-2">
        BIOTECH CATALYST CALENDAR · 무료 회원
      </div>

      <h2 className="m-0 text-[20px] sm:text-[21px] font-bold leading-snug tracking-[-0.015em] text-ink">
        미국 biotech 임상 카탈리스트,
        <br />한 곳에서 추적하세요.
      </h2>

      <p className="text-[13.5px] text-ink-2 mt-2.5 leading-relaxed">
        PDUFA · 임상 readout · 학회 발표 · 규제 결정. 시총 $100M 이상 미국 biotech 와 빅파마의 주요
        일정을 한 화면에서.
      </p>

      <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1.5 text-[12px] text-ink-3">
        <span>
          <b className="num text-ink-2 font-semibold">{counts.companies}</b> 종목
        </span>
        <span className="opacity-50">·</span>
        <span>
          <b className="num text-ink-2 font-semibold">{counts.catalysts}</b> 카탈리스트
        </span>
        <span className="opacity-50">·</span>
        <span>
          <b className="num text-ink-2 font-semibold">{counts.conferences}</b> 학회
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 mt-4 pt-4 border-t border-[var(--hairline)]">
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/app">
            <button className="btn btn-primary w-full sm:w-auto justify-center">
              무료로 시작하기 <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.6} />
            </button>
          </SignInButton>
          <Link to="/catalysts" className="btn w-full sm:w-auto justify-center">
            먼저 둘러보기
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/app" className="btn btn-primary w-full sm:w-auto justify-center">
            대시보드 열기 <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.6} />
          </Link>
        </SignedIn>
      </div>
      <SignedOut>
        <p className="text-[11px] text-ink-3 mt-2.5">이메일 또는 Google · 30초 · 모든 기능 무료</p>
      </SignedOut>
    </div>
  );
}
