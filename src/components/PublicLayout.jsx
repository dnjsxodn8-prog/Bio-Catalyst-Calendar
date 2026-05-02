import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/catalysts', label: 'Catalysts' },
  { to: '/companies', label: 'Companies' },
  { to: '/conferences', label: 'Conferences' },
];

export default function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('light');
    return () => {
      document.body.classList.remove('light');
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-bg/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-14 flex items-center gap-4">
          <Link to="/" className="font-semibold text-ink tracking-tight">
            Bio Catalyst Calendar
          </Link>
          <nav className="flex items-center gap-1 ml-2">
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
          <div className="ml-auto flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="h-8 px-3 rounded-md text-[13px] border border-line text-ink hover:bg-panel-2 transition-colors">
                  로그인
                </button>
              </SignInButton>
              <Link
                to="/sign-up"
                className="h-8 px-3 rounded-md text-[13px] bg-ink text-bg hover:opacity-90 transition-opacity flex items-center"
              >
                가입
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                to="/app"
                className="h-8 px-3 rounded-md text-[13px] bg-ink text-bg hover:opacity-90 transition-opacity flex items-center"
              >
                대시보드 →
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 lg:px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-line py-6 text-center text-[12px] text-ink-3">
        Bio Catalyst Calendar · 미국 biotech 임상 카탈리스트 추적 · 정보 제공 목적, 투자 권유 아님.
      </footer>
    </div>
  );
}
