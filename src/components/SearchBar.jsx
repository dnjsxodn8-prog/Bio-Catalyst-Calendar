import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = '검색…' }) {
  return (
    <div className="relative flex-1 min-w-[12rem]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          'w-full h-9 pl-9 pr-9 rounded-lg bg-bg-card2 border border-border',
          'text-sm text-fg placeholder:text-fg-dim',
          'focus:outline-none focus:border-accent-green/60 focus:bg-bg-card',
        ].join(' ')}
      />
      {value ? (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-fg-dim hover:text-fg hover:bg-bg-card"
          aria-label="검색 지우기"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : null}
    </div>
  );
}
