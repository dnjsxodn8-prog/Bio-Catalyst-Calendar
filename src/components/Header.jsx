import { TrendingUp, Dna } from 'lucide-react';

const TABS = [
  { id: 'dashboard', label: '대시보드' },
  { id: 'companies', label: '종목' },
  { id: 'catalysts', label: '카탈리스트' },
  { id: 'conferences', label: '학회' },
];

export default function Header({ active, onChange }) {
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-accent-green" />
          <Dna className="w-6 h-6 text-accent-violet" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-semibold bg-brand-gradient bg-clip-text text-transparent leading-tight">
            Biotech Catalyst Dashboard
          </h1>
          <p className="text-xs text-fg-muted mt-0.5">
            100+ 종목 · 2026 PDUFA · 학회 · 임상 readout
          </p>
        </div>
      </div>
      <nav className="max-w-7xl mx-auto px-6 flex gap-1">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={[
                'px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px',
                isActive
                  ? 'text-accent-green border-accent-green'
                  : 'text-fg-muted border-transparent hover:text-fg hover:border-border',
              ].join(' ')}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
