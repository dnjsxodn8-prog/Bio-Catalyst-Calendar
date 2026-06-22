import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Trash2 } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '../auth';
import publicData from '../public-data.generated.json';
import { buildPublicSearchIndex } from '../utils/searchIndexPublic';
import { clearLocalData } from '../utils/userPrefs';
import SearchBox from './SearchBox';
import TeaserModal from './TeaserModal';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/catalysts', label: 'Catalysts' },
  { to: '/companies', label: 'Companies' },
  { to: '/conferences', label: 'Conferences' },
];

export default function PublicLayout() {
  const location = useLocation();
  const [q, setQ] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [teaser, setTeaser] = useState(null); // 공개 검색 클릭 시 띄울 entry

  // 공개 검색 인덱스 — public-data 만(메모·점수 없음). 클릭은 teaser 모달. spec 019
  const index = useMemo(() => buildPublicSearchIndex(publicData), []);

  const pickTeaser = (ticker) => {
    const entry = index.entries.find((e) => e.ticker === ticker);
    if (entry) setTeaser(entry);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.classList.add('light');
    return () => document.body.classList.remove('light');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // 라우트 변경 시 모바일 메뉴 닫기 (effect 내 setState 는 의도적 — 외부 네비게이션 동기화).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  const clearData = () => {
    clearLocalData();
    setMenuOpen(false);
    alert('이 브라우저에 저장된 관심/최근 기록을 삭제했습니다.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-bg/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 h-14 flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className="font-semibold text-ink tracking-tight text-[15px] sm:text-base whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Bio Catalyst Calendar</span>
            <span className="sm:hidden">BCC</span>
          </Link>

          {/* 데스크톱 nav (lg+ — md 구간은 너비 부족으로 햄버거 사용) */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  [
                    'px-3 h-8 rounded-md text-[13px] flex items-center transition-colors',
                    isActive ? 'bg-panel-2 text-ink' : 'text-ink-3 hover:text-ink',
                  ].join(' ')
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* 데스크톱 검색 */}
          <div className="ml-auto hidden lg:block">
            <SearchBox
              value={q}
              onChange={setQ}
              onPick={pickTeaser}
              index={index}
              hideScore
              widthClass="w-[200px] lg:w-[280px]"
            />
          </div>

          {/* 데스크톱 인증 */}
          <div className="hidden lg:flex items-center gap-2">
            <AuthButtons />
          </div>

          {/* 모바일/태블릿 햄버거 (<lg) */}
          <button
            type="button"
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-md border border-line text-ink hover:bg-panel-2 shrink-0"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 — 검색 + nav + 인증 + 로컬 데이터 삭제 */}
        {menuOpen && (
          <div className="lg:hidden border-t border-line bg-bg px-3 sm:px-4 py-3 flex flex-col gap-3">
            <SearchBox
              value={q}
              onChange={setQ}
              onPick={pickTeaser}
              index={index}
              hideScore
              widthClass="w-full"
              placeholder="ticker · 회사 검색…"
            />
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    [
                      'px-3 h-11 rounded-md text-[14px] flex items-center transition-colors',
                      isActive ? 'bg-panel-2 text-ink' : 'text-ink-2 hover:text-ink',
                    ].join(' ')
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2 pt-1 border-t border-line">
              <AuthButtons />
            </div>
            <button
              onClick={clearData}
              className="flex items-center gap-2 h-9 px-3 rounded-md text-[12.5px] text-ink-3 hover:text-ink hover:bg-panel-2 self-start"
            >
              <Trash2 className="w-3.5 h-3.5" /> 로컬 데이터 삭제
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-line py-6 px-4 text-center text-[12px] text-ink-3">
        <div>Bio Catalyst Calendar · 미국 biotech 임상 카탈리스트 추적 · 정보 제공 목적, 투자 권유 아님.</div>
        <button onClick={clearData} className="mt-2 inline-flex items-center gap-1.5 text-ink-4 hover:text-ink-2">
          <Trash2 className="w-3 h-3" /> 이 브라우저의 로컬 데이터 삭제
        </button>
      </footer>

      {teaser && <TeaserModal entry={teaser} onClose={() => setTeaser(null)} />}
    </div>
  );
}

function AuthButtons() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="h-8 px-3 rounded-md text-[13px] border border-line text-ink hover:bg-panel-2 transition-colors whitespace-nowrap">
            로그인
          </button>
        </SignInButton>
        <Link
          to="/sign-up"
          title="이메일 또는 Google · 30초 · 모든 기능 무료"
          className="h-8 px-3 rounded-md text-[13px] bg-ink text-bg hover:opacity-90 transition-opacity flex items-center whitespace-nowrap"
        >
          무료 가입
        </Link>
      </SignedOut>
      <SignedIn>
        <Link
          to="/app"
          className="h-8 px-3 rounded-md text-[13px] bg-ink text-bg hover:opacity-90 transition-opacity flex items-center whitespace-nowrap"
        >
          대시보드 →
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
