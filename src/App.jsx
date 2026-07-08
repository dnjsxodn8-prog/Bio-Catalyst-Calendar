import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { usePrivateData } from './store/privateData';
import { buildSearchIndex } from './utils/searchIndex';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Catalysts from './pages/Catalysts';
import Conferences from './pages/Conferences';
import News from './pages/News';
import CompanyPage from './pages/CompanyPage';
import { useRecent, useWatchlist } from './utils/userPrefs';

// Plotly 번들 비대화 방지: 스크리너 라우트 진입 시에만 chunk 로드 (spec 010 §4.2)
const Screener = lazy(() => import('./pages/Screener'));
// 밸류에이션 스크리너 — 진입 시에만 로드 (spec 023 §3)
const Valuation = lazy(() => import('./pages/Valuation'));

// 탭 ↔ 경로 매핑 (spec 010 §2.2) — Sidebar/Topbar 의 기존 props 계약(tab/onTab) 유지용
const TAB_PATH = {
  dashboard: '/app',
  companies: '/app/companies',
  catalysts: '/app/catalysts',
  conferences: '/app/conferences',
  news: '/app/news',
  screener: '/app/screener',
  valuation: '/app/valuation',
};

function pathToTab(pathname) {
  if (pathname.startsWith('/app/companies') || pathname.startsWith('/app/company/')) return 'companies';
  if (pathname.startsWith('/app/catalysts')) return 'catalysts';
  if (pathname.startsWith('/app/conferences')) return 'conferences';
  if (pathname.startsWith('/app/news')) return 'news';
  if (pathname.startsWith('/app/screener')) return 'screener';
  if (pathname.startsWith('/app/valuation')) return 'valuation';
  return 'dashboard';
}

function App() {
  const { data, screener } = usePrivateData();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recent, pushRecent] = useRecent();
  const watchlist = useWatchlist();

  // 통합 검색 인덱스(인증: 메모 포함 전 필드 + 점수 조인) — spec 012
  const searchIndex = useMemo(
    () => buildSearchIndex(data, screener, { includePrivate: true }),
    [data, screener]
  );

  // spec 018 — 기업 상세는 풀페이지(모달 오버레이 폐기).
  const tab = pathToTab(location.pathname);

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  const counts = {
    companies: data.companies.length,
    catalysts: data.catalysts.length,
    conferences: data.conferences.length,
    news: Array.isArray(data.feed) ? data.feed.length : 0,
  };

  const onTab = (id) => navigate(TAB_PATH[id] ?? '/app');

  // 종목 클릭(페이지 onPick=item / Sidebar onPickTicker=ticker) → 풀페이지 이동
  const openCompany = (tickerOrItem) => {
    const ticker = typeof tickerOrItem === 'string' ? tickerOrItem : tickerOrItem?.ticker;
    if (!ticker) return;
    setSidebarOpen(false);
    navigate(`/app/company/${ticker}`);
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
          onPickCompany={openCompany}
          searchIndex={searchIndex}
        />

        <div className="px-4 lg:px-7 pt-6 pb-20 max-w-[1600px] w-full mx-auto flex-1">
          <div className="animate-fade-up">
            <Suspense fallback={<RouteLoading />}>
              {/* descendant Routes — 부모 /app/* 가 소비한 뒤 남은 경로에 매칭되므로 상대 경로 사용 */}
              <Routes>
                <Route index element={<Dashboard data={data} query={query} onPick={openCompany} watchlist={watchlist} searchIndex={searchIndex} />} />
                <Route path="companies" element={<Companies data={data} query={query} onPick={openCompany} />} />
                <Route path="catalysts" element={<Catalysts data={data} query={query} onPick={openCompany} />} />
                <Route path="conferences" element={<Conferences data={data} query={query} onPick={openCompany} />} />
                <Route path="news" element={<News data={data} query={query} onPick={openCompany} />} />
                <Route path="screener" element={<Screener query={query} onOpenCompany={openCompany} />} />
                <Route path="valuation" element={<Valuation query={query} onOpenCompany={openCompany} />} />
                <Route path="company/:ticker" element={<CompanyPage data={data} watchlist={watchlist} pushRecent={pushRecent} />} />
                <Route path="*" element={null} />
              </Routes>
            </Suspense>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
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
