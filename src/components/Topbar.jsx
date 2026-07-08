import { Sun, Moon, Menu } from 'lucide-react';
import { UserButton } from '../auth';
import SearchBox from './SearchBox';

const TITLES = {
  dashboard: ['대시보드', 'Mission Control'],
  companies: ['종목 라이브러리', 'Companies'],
  catalysts: ['카탈리스트 캘린더', 'Catalysts'],
  conferences: ['학회 트래커', 'Conferences'],
  news: ['뉴스 피드', 'News'],
  screener: ['Great Biotech Screener', 'Screener'],
  valuation: ['밸류에이션 스크리너', 'Valuation'],
};

export default function Topbar({ tab, query, onQuery, theme, onTheme, onOpenSidebar, onPickCompany, searchIndex }) {
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
        <div className="hidden sm:block">
          <SearchBox
            value={query}
            onChange={onQuery}
            onPick={onPickCompany}
            index={searchIndex}
          />
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

        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: 'w-8 h-8' } }}
        />
      </div>
    </header>
  );
}
