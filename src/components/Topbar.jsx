import { Search, Sun, Moon, Menu } from 'lucide-react';

const TITLES = {
  dashboard: ['대시보드', 'Mission Control'],
  companies: ['종목 라이브러리', 'Companies'],
  catalysts: ['카탈리스트 캘린더', 'Catalysts'],
  conferences: ['학회 트래커', 'Conferences'],
};

export default function Topbar({ tab, query, onQuery, theme, onTheme, onOpenSidebar }) {
  const [k, sub] = TITLES[tab] || TITLES.dashboard;
  return (
    <header
      className="h-[72px] px-4 lg:px-7 flex items-center gap-3 lg:gap-[18px] border-b border-line sticky top-0 z-20"
      style={{
        background: 'rgba(8,9,12,0.65)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <button
        type="button"
        onClick={onOpenSidebar}
        className="btn btn-icon lg:hidden"
        title="메뉴 열기"
        aria-label="메뉴 열기"
      >
        <Menu className="w-5 h-5" strokeWidth={1.8} />
      </button>

      <div className="flex flex-col gap-[3px] min-w-0">
        <div className="mono text-[10.5px] text-ink-3 tracking-[0.12em] uppercase truncate">
          BCC / {sub}
        </div>
        <h1 className="m-0 text-[18px] lg:text-[22px] font-bold tracking-[-0.02em] truncate">{k}</h1>
      </div>

      <div className="flex items-center gap-2.5 ml-auto min-w-0">
        <div className="hidden sm:flex items-center gap-2.5 h-[38px] px-3 w-[200px] md:w-[300px] lg:w-[380px] bg-panel-2 border border-line rounded-[10px]">
          <Search className="w-[15px] h-[15px] text-ink-3 flex-shrink-0" strokeWidth={1.6} />
          <input
            placeholder="ticker · drug · indication 검색…"
            value={query ?? ''}
            onChange={(e) => onQuery && onQuery(e.target.value)}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none text-ink text-[13px]"
          />
          <kbd className="mono text-[10px] px-1.5 py-0.5 bg-bg-2 border border-line rounded text-ink-3 tracking-[0.04em] hidden lg:inline-block">
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
