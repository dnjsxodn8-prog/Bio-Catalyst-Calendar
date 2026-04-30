import { useEffect, useMemo, useState } from 'react';
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

const PAGES = {
  dashboard: Dashboard,
  companies: Companies,
  catalysts: Catalysts,
  conferences: Conferences,
};

function App() {
  const [tab, setTab] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [pick, setPick] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [recent, pushRecent] = useRecent();
  const watchlist = useWatchlist();

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    if (pick?.ticker) pushRecent(pick.ticker);
  }, [pick?.ticker, pushRecent]);

  const companyByTicker = useMemo(() => {
    const m = new Map();
    for (const c of data.companies) m.set(c.ticker, c);
    return m;
  }, []);

  const Page = PAGES[tab];

  const counts = {
    companies: data.companies.length,
    catalysts: data.catalysts.length,
    conferences: data.conferences.length,
  };

  const openTicker = (ticker) => {
    const company = companyByTicker.get(ticker);
    if (company) setPick(company);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        tab={tab}
        onTab={setTab}
        counts={counts}
        recent={recent}
        watchlist={watchlist}
        onPickTicker={openTicker}
      />

      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar
          tab={tab}
          query={query}
          onQuery={setQuery}
          theme={theme}
          onTheme={setTheme}
        />

        <div className="px-7 pt-6 pb-20 max-w-[1600px] w-full mx-auto flex-1">
          <div className="animate-fade-up">
            <Page data={data} query={query} onPick={setPick} />
          </div>
        </div>

        <Footer />
      </main>

      {pick && (
        <CompanyDetail
          item={pick}
          data={data}
          watchlist={watchlist}
          onClose={() => setPick(null)}
        />
      )}
    </div>
  );
}

export default App;
