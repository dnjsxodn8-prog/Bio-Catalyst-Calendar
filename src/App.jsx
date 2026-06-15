import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import data from './data.generated.json';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import CompanyDetail from './components/CompanyDetail';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Catalysts from './pages/Catalysts';
import Conferences from './pages/Conferences';
import { useRecent, useWatchlist } from './utils/userPrefs';

// Plotly 번들 비대화 방지: 스크리너 라우트 진입 시에만 chunk 로드 (spec 010 §4.2)
const Screener = lazy(() => import('./pages/Screener'));

// 탭 ↔ 경로 매핑 (spec 010 §2.2) — Sidebar/Topbar 의 기존 props 계약(tab/onTab) 유지용
const TAB_PATH = {
  dashboard: '/app',
  companies: '/app/companies',
  catalysts: '/app/catalysts',
  conferences: '/app/conferences',
  screener: '/app/screener',
};

function pathToTab(pathname) {
  if (pathname.startsWith('/app/companies')) return 'companies';
  if (pathname.startsWith('/app/catalysts')) return 'catalysts';
  if (pathname.startsWith('/app/conferences')) return 'conferences';
  if (pathname.startsWith('/app/screener')) return 'screener';
  return 'dashboard';
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recent, pushRecent] = useRecent();
  const watchlist = useWatchlist();

  // 기업 모달은 배경 location 위에 오버레이 (React Router modal 패턴, spec 010 §2.3)
  const backgroundLocation = location.state?.backgroundLocation;
  const tab = pathToTab((backgroundLocation || location).pathname);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  const counts = {
    companies: data.companies.length,
    catalysts: data.catalysts.length,
    conferences: data.conferences.length,
  };

  const onTab = (id) => navigate(TAB_PATH[id] ?? '/app');

  // 종목 클릭(페이지 onPick=item / Sidebar onPickTicker=ticker) → 딥링크 + 배경 보존
  const openCompany = (tickerOrItem) => {
    const ticker = typeof tickerOrItem === 'string' ? tickerOrItem : tickerOrItem?.ticker;
    if (!ticker) return;
    setSidebarOpen(false);
    navigate(`/app/company/${ticker}`, {
      state: { backgroundLocation: backgroundLocation || location },
    });
  };

  const closeCompany = () => {
    if (backgroundLocation) navigate(-1);
    else navigate('/app/screener');
  };

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        tab={tab}
        onTab={onTab}
        counts={counts}
        recent={recent}
        watchlist={watchlist}
        onPickTicker={openCompany}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar
          tab={tab}
          query={query}
          onQuery={setQuery}
          theme={theme}
          onTheme={setTheme}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div className="px-4 lg:px-7 pt-6 pb-20 max-w-[1600px] w-full mx-auto flex-1">
          <div className="animate-fade-up">
            <Suspense fallback={<RouteLoading />}>
              {/* descendant Routes — 부모 /app/* 가 소비한 뒤 남은 경로에 매칭되므로 상대 경로 사용 */}
              <Routes location={backgroundLocation || location}>
                <Route index element={<Dashboard data={data} query={query} onPick={openCompany} />} />
                <Route path="companies" element={<Companies data={data} query={query} onPick={openCompany} />} />
                <Route path="catalysts" element={<Catalysts data={data} query={query} onPick={openCompany} />} />
                <Route path="conferences" element={<Conferences data={data} query={query} onPick={openCompany} />} />
                <Route path="screener" element={<Screener query={query} onOpenCompany={openCompany} />} />
                <Route path="*" element={null} />
              </Routes>
            </Suspense>
          </div>
        </div>

        <Footer />
      </main>

      {/* 기업 모달 라우트 — 실제 location 으로 매칭 (배경 위 오버레이 / 콜드 딥링크 모두 지원). 상대 경로. */}
      <Routes>
        <Route
          path="company/:ticker"
          element={
            <CompanyModalRoute
              data={data}
              watchlist={watchlist}
              pushRecent={pushRecent}
              onClose={closeCompany}
            />
          }
        />
        <Route path="*" element={null} />
      </Routes>
    </div>
  );
}

function CompanyModalRoute({ data, watchlist, pushRecent, onClose }) {
  const { ticker } = useParams();
  const company = useMemo(
    () => data.companies.find((c) => c.ticker === ticker),
    [data, ticker]
  );

  useEffect(() => {
    if (company?.ticker) pushRecent(company.ticker);
  }, [company?.ticker, pushRecent]);

  if (!company) return <Navigate to="/app/screener" replace />;

  return <CompanyDetail item={company} data={data} watchlist={watchlist} onClose={onClose} />;
}

function RouteLoading() {
  return (
    <div className="flex items-center justify-center py-32 text-ink-3 text-sm">
      <span className="inline-block w-4 h-4 mr-2.5 rounded-full border-2 border-ink-4 border-t-transparent animate-spin" />
      불러오는 중…
    </div>
  );
}

export default App;
