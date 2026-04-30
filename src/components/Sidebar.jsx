import { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Activity,
  Mic,
  Clock,
  Star,
  Plus,
  X,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import avatarUrl from '../assets/avatar.jpg';

const NAV = [
  { id: 'dashboard', label: '대시보드', sub: 'Dashboard', icon: LayoutDashboard },
  { id: 'companies', label: '종목', sub: 'Companies', icon: Building2 },
  { id: 'catalysts', label: '카탈리스트', sub: 'Catalysts', icon: Activity },
  { id: 'conferences', label: '학회', sub: 'Conferences', icon: Mic },
];

const SECTION_LABEL = 'text-[10.5px] font-semibold text-ink-2 tracking-[0.1em] uppercase';

export default function Sidebar({ tab, onTab, counts, recent, watchlist, onPickTicker, isOpen, onClose }) {
  const handleTab = (id) => {
    onTab(id);
    onClose?.();
  };
  const handlePickTicker = (t) => {
    onPickTicker?.(t);
    onClose?.();
  };
  return (
    <aside
      className={[
        'w-[248px] flex-shrink-0 flex flex-col h-screen overflow-y-auto overflow-x-hidden bg-panel border-r border-line',
        'fixed lg:sticky inset-y-0 left-0 top-0 z-30 transition-transform duration-200 ease-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ].join(' ')}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-[18px] pt-[14px] pb-3 border-b border-line">
        <div
          className="w-[42px] h-[42px] rounded-[10px] overflow-hidden flex-shrink-0 border"
          style={{
            borderColor: 'rgba(251,191,36,0.45)',
            boxShadow:
              '0 0 18px -4px rgba(251,191,36,0.35), inset 0 0 0 1px rgba(0,0,0,0.4)',
          }}
        >
          <img src={avatarUrl} alt="원탱" className="w-full h-full object-cover block" />
        </div>
        <div className="leading-tight min-w-0">
          <div className="text-[13px] font-bold tracking-tight text-ink">원탱’s</div>
          <div className="text-[12px] font-semibold text-ink mt-0.5">Biotech Catalyst</div>
          <div className="mono text-[10.5px] font-semibold text-ink-2 tracking-[0.1em] uppercase mt-[3px]">
            Calendar · v3.0
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3 pt-2.5">
        <div className={`${SECTION_LABEL} px-2.5 pt-1 pb-1.5`}>Navigate</div>
        {NAV.map((it) => {
          const Icon = it.icon;
          const active = tab === it.id;
          const count = counts?.[it.id];
          return (
            <button
              key={it.id}
              onClick={() => handleTab(it.id)}
              className={[
                'relative flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-colors',
                active
                  ? 'bg-panel-2 border-line-2 text-ink'
                  : 'border-transparent text-ink hover:bg-white/[0.03]',
              ].join(' ')}
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <span className={['text-[13.5px]', active ? 'font-bold' : 'font-semibold'].join(' ')}>
                  {it.label}
                </span>
                <span
                  className={[
                    'text-[10px] font-semibold tracking-[0.08em] uppercase',
                    active ? 'text-ink-2' : 'text-ink-3',
                  ].join(' ')}
                >
                  {it.sub}
                </span>
              </div>
              {count != null && (
                <span className="num text-[11px] font-semibold text-ink-2 bg-white/[0.05] border border-line rounded px-1.5 py-0.5 tracking-[0.04em]">
                  {count}
                </span>
              )}
              {active && (
                <span
                  className="absolute -left-px top-1.5 bottom-1.5 w-[3px] rounded-sm"
                  style={{
                    background: 'linear-gradient(180deg, var(--acc), #10B981)',
                    boxShadow: '0 0 12px var(--acc)',
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Recent */}
      <RecentSection recent={recent} onPickTicker={handlePickTicker} />

      {/* Watchlist by group */}
      <WatchlistSection watchlist={watchlist} onPickTicker={handlePickTicker} />

      {/* Social links */}
      <div className="mx-3 mt-auto pt-2.5 pb-1.5 border-t border-[var(--hairline)] flex flex-col gap-1">
        <SocialLink
          href="https://blog.naver.com/kor_breaking_bad"
          title="Naver Blog"
          handle="kor_breaking_bad"
          badge={<span className="text-[13px] font-extrabold">N</span>}
          badgeBg="#03C75A"
          badgeColor="#062018"
        />
        <SocialLink
          href="https://t.me/biotech_catalyst_calendar"
          title="Telegram 채널"
          handle="@biotech_catalyst_calendar"
          badge={
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19l-9.5 6L3.7 11.97c-.88-.25-.89-.86.2-1.3l16.5-6.4c.74-.27 1.43.18 1.15 1.3l-2.83 13.32c-.19.91-.74 1.13-1.5.7l-4.1-3.03-1.97 1.92c-.23.23-.42.42-.83.42z" />
            </svg>
          }
          badgeBg="#229ED9"
          badgeColor="#fff"
        />
        <SocialLink
          href="https://open.kakao.com/o/slxGeLsi"
          title="오류·제보"
          handle="카카오톡 오픈채팅"
          badge={<span className="text-[13px] font-extrabold">K</span>}
          badgeBg="#FEE500"
          badgeColor="#191600"
        />
      </div>

      {/* Footer */}
      <div className="px-[18px] pt-2 pb-2.5 border-t border-line">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: '#34D399', boxShadow: '0 0 10px #34D399' }}
          />
          <span className="mono text-[11px] font-semibold text-ink-2 tracking-[0.06em]">
            LIVE · {liveTimestamp()}
          </span>
        </div>
        <div className="text-[11px] font-medium text-ink-3 mt-1.5">
          {counts?.companies ?? 0} 종목 · {counts?.catalysts ?? 0} 이벤트 · {counts?.conferences ?? 0} 학회
        </div>
      </div>
    </aside>
  );
}

function RecentSection({ recent, onPickTicker }) {
  return (
    <div className="px-4 pt-3 pb-1">
      <div className={`${SECTION_LABEL} px-2.5 pb-1.5 flex items-center gap-1.5`}>
        <Clock className="w-[12px] h-[12px]" strokeWidth={1.8} />
        Recent
      </div>
      {recent.length === 0 ? (
        <div className="px-2.5 py-1.5 text-[11.5px] text-ink-3">최근 본 종목 없음</div>
      ) : (
        <div className="flex flex-col gap-0.5">
          {recent.map((t) => (
            <button
              key={t}
              onClick={() => onPickTicker(t)}
              className="flex justify-between items-center px-2.5 py-1.5 rounded-md text-left hover:bg-white/[0.04]"
            >
              <span className="mono text-[12.5px] font-bold text-ink">{t}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function WatchlistSection({ watchlist, onPickTicker }) {
  const { groups, addGroup, removeGroup, watchlist: data } = watchlist;
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  const submit = (e) => {
    e?.preventDefault();
    addGroup(name);
    setName('');
    setCreating(false);
  };

  return (
    <div className="px-4 pt-2 pb-1">
      <div className="flex items-center justify-between px-2.5 pb-1.5">
        <div className={`${SECTION_LABEL} flex items-center gap-1.5`}>
          <Star className="w-[12px] h-[12px]" strokeWidth={1.8} />
          Watchlist
        </div>
        <button
          onClick={() => setCreating((v) => !v)}
          className="text-ink-2 hover:text-ink p-0.5"
          title="새 그룹"
        >
          <Plus className="w-[13px] h-[13px]" strokeWidth={2} />
        </button>
      </div>

      {creating && (
        <form onSubmit={submit} className="px-1 pb-1.5">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={submit}
            onKeyDown={(e) => e.key === 'Escape' && (setCreating(false), setName(''))}
            placeholder="그룹 이름…"
            className="w-full bg-panel-2 border border-line rounded-md px-2 py-1 text-[12px] text-ink outline-none focus:border-line-2"
          />
        </form>
      )}

      {groups.length === 0 ? (
        <div className="px-2.5 py-1.5 text-[11.5px] text-ink-3 leading-snug">
          아직 그룹 없음. 우측 + 로 그룹 만들고, 종목 상세에서 추가.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {groups.map((g) => (
            <WatchlistGroup
              key={g}
              name={g}
              tickers={data[g]}
              onPickTicker={onPickTicker}
              onRemoveGroup={() => removeGroup(g)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WatchlistGroup({ name, tickers, onPickTicker, onRemoveGroup }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="flex items-center justify-between px-2.5 py-1 rounded-md hover:bg-white/[0.02] group">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 flex-1 min-w-0 text-left"
        >
          <ChevronDown
            className={['w-[12px] h-[12px] text-ink-2 transition-transform', open ? '' : '-rotate-90'].join(' ')}
            strokeWidth={2}
          />
          <span className="text-[12.5px] font-bold text-ink truncate">{name}</span>
          <span className="num text-[10.5px] font-semibold text-ink-3">{tickers.length}</span>
        </button>
        <button
          onClick={onRemoveGroup}
          className="opacity-0 group-hover:opacity-100 text-ink-3 hover:text-danger p-0.5"
          title="그룹 삭제"
        >
          <X className="w-[11px] h-[11px]" strokeWidth={2} />
        </button>
      </div>
      {open && tickers.length > 0 && (
        <div className="flex flex-col gap-0.5 pl-4">
          {tickers.map((t) => (
            <button
              key={t}
              onClick={() => onPickTicker(t)}
              className="text-left px-2 py-1 rounded text-[12px] mono font-semibold text-ink hover:bg-white/[0.04]"
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialLink({ href, title, handle, badge, badgeBg, badgeColor }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg border border-transparent hover:bg-white/[0.04] hover:border-line transition-colors"
    >
      <span
        className="w-6 h-6 rounded-md flex items-center justify-center mono font-extrabold flex-shrink-0"
        style={{ background: badgeBg, color: badgeColor }}
      >
        {badge}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-ink">{title}</div>
        <div className="mono text-[10.5px] font-medium text-ink-3 tracking-[0.04em] truncate">
          {handle}
        </div>
      </div>
      <ExternalLink className="w-3 h-3 text-ink-3" strokeWidth={1.8} />
    </a>
  );
}

function liveTimestamp() {
  const d = new Date();
  const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
  const day = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${m} ${day} ${hh}:${mm}`;
}
