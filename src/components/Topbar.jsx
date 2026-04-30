import { Search, Sun, Moon } from 'lucide-react';

const TITLES = {
  dashboard: ['대시보드', 'Mission Control'],
  companies: ['종목 라이브러리', 'Companies'],
  catalysts: ['카탈리스트 캘린더', 'Catalysts'],
  conferences: ['학회 트래커', 'Conferences'],
};

export default function Topbar({ tab, query, onQuery, theme, onTheme }) {
  const [k, sub] = TITLES[tab] || TITLES.dashboard;
  return (
    <header
      className="h-[72px] px-7 flex items-center gap-[18px] border-b border-line sticky top-0 z-20"
      style={{
        background: 'rgba(8,9,12,0.65)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex flex-col gap-[3px]">
        <div className="mono text-[10.5px] text-ink-3 tracking-[0.12em] uppercase">
          BCC / {sub}
        </div>
        <h1 className="m-0 text-[22px] font-bold tracking-[-0.02em]">{k}</h1>
      </div>

      <div className="flex items-center gap-2.5 ml-auto">
        <div className="flex items-center gap-2.5 h-[38px] px-3 w-[380px] bg-panel-2 border border-line rounded-[10px]">
          <Search className="w-[15px] h-[15px] text-ink-3" strokeWidth={1.6} />
          <input
            placeholder="ticker · drug · indication 검색…"
            value={query ?? ''}
            onChange={(e) => onQuery && onQuery(e.target.value)}
            className="flex-1 bg-transparent border-0 outline-none text-ink text-[13px]"
          />
          <kbd className="mono text-[10px] px-1.5 py-0.5 bg-bg-2 border border-line rounded text-ink-3 tracking-[0.04em]">
            ⌘K
          </kbd>
        </div>

        <button
          className="btn btn-icon"
          onClick={() => onTheme && onTheme(theme === 'dark' ? 'light' : 'dark')}
          title="theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" strokeWidth={1.6} />
          ) : (
            <Moon className="w-4 h-4" strokeWidth={1.6} />
          )}
        </button>
      </div>
    </header>
  );
}
