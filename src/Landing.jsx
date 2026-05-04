import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { ChevronRight } from 'lucide-react';
import data from './data.generated.json';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';

const NOOP = () => {};
const EMPTY_WATCHLIST = {
  watchlist: {},
  groups: [],
  isMember: () => false,
  toggle: NOOP,
  addGroup: NOOP,
  removeGroup: NOOP,
};

export default function Landing() {
  useEffect(() => {
    document.body.classList.remove('light');
  }, []);

  const counts = {
    companies: data.companies.length,
    catalysts: data.catalysts.length,
    conferences: data.conferences.length,
  };

  return (
    <div className="flex min-h-screen relative overflow-hidden">
      <div
        aria-hidden="true"
        className="hidden lg:block pointer-events-none select-none"
      >
        <Sidebar
          tab="dashboard"
          onTab={NOOP}
          counts={counts}
          recent={[]}
          watchlist={EMPTY_WATCHLIST}
          onPickTicker={NOOP}
          isOpen={false}
          onClose={NOOP}
        />
      </div>

      <main className="flex-1 min-w-0 flex flex-col relative">
        <div aria-hidden="true" className="pointer-events-none select-none">
          <Topbar
            tab="dashboard"
            query=""
            onQuery={NOOP}
            theme="dark"
            onTheme={NOOP}
            onOpenSidebar={NOOP}
          />
        </div>

        <div className="absolute top-0 right-0 h-[72px] flex items-center gap-2 pr-4 lg:pr-7 z-10">
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

        <div
          className="flex-1 relative"
          style={{ height: 'calc(100vh - 72px)', maxHeight: 'calc(100vh - 72px)' }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none select-none px-4 lg:px-7 pt-6 pb-20 max-w-[1600px] w-full mx-auto"
            style={{ filter: 'blur(7px)', opacity: 0.6 }}
          >
            <Dashboard data={data} onPick={NOOP} />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(8,9,12,0.55) 0%, rgba(8,9,12,0.85) 70%)',
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center px-4">
            <CTACard counts={counts} />
          </div>
        </div>
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
          background:
            'radial-gradient(closest-side, rgba(251,191,36,0.18), transparent 70%)',
        }}
      />

      <div className="mono text-[11px] text-ink-3 tracking-[0.12em] uppercase mb-2">
        BIOTECH CATALYST CALENDAR · 무료 회원
      </div>

      <h2 className="m-0 text-[21px] font-bold leading-snug tracking-[-0.015em] text-ink">
        미국 biotech 임상 카탈리스트,
        <br />한 곳에서 추적하세요.
      </h2>

      <p className="text-[13.5px] text-ink-2 mt-2.5 leading-relaxed">
        PDUFA · 임상 readout · 학회 발표 · 규제 결정. 시총 $100M 이상 미국 biotech 와
        빅파마의 주요 일정을 한 화면에서.
      </p>

      <div className="mt-3 flex items-center gap-3 text-[12px] text-ink-3">
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

      <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-[var(--hairline)]">
        <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl="/app">
            <button className="btn btn-primary">
              무료로 시작하기 <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.6} />
            </button>
          </SignInButton>
          <Link to="/catalysts" className="btn">
            7일 미리보기
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/app" className="btn btn-primary">
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
