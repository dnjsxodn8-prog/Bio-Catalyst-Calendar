import { useState } from 'react';
import data from './data.generated.json';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import Catalysts from './pages/Catalysts';
import Conferences from './pages/Conferences';

const PAGES = {
  dashboard: Dashboard,
  companies: Companies,
  catalysts: Catalysts,
  conferences: Conferences,
};

function App() {
  const [tab, setTab] = useState('dashboard');
  const { companies, catalysts, conferences, generated } = data;

  const Page = PAGES[tab];
  const buildTime = new Date(generated).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg">
      <Header active={tab} onChange={setTab} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        <Page data={data} />
      </main>
      <footer className="border-t border-border text-xs text-fg-dim">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-x-3 gap-y-1">
          <span>Biotech Catalyst Tracker v2</span>
          <span>·</span>
          <span>{companies.length}개 종목</span>
          <span>·</span>
          <span>{catalysts.length}개 이벤트</span>
          <span>·</span>
          <span>{conferences.length}개 학회</span>
          <span>·</span>
          <span>빌드 {buildTime}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
