import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { daysUntil, formatDate } from '../utils/format';
import DBadge from './DBadge';
import { TypeBadge } from './TypeBadge';
import CompanyDetail from './CompanyDetail';

export default function CatalystRow({ catalyst, company, priceCache }) {
  const [open, setOpen] = useState(false);
  const days = daysUntil(catalyst.date);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-bg-card2/40 transition-colors"
      >
        <DBadge days={days} />
        <span className="text-xs text-fg-muted font-mono tabular-nums w-[5.5rem] shrink-0">
          {formatDate(catalyst.date)}
        </span>
        <span className="text-sm font-semibold text-accent-green font-mono w-[4.5rem] shrink-0">
          {catalyst.ticker}
        </span>
        <span className="text-sm text-fg flex-1 min-w-0 truncate">{catalyst.event}</span>
        <TypeBadge type={catalyst.type} />
        <ChevronDown
          className={[
            'w-4 h-4 text-fg-muted shrink-0 transition-transform',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>
      {open ? (
        <div className="bg-bg/40 px-4 py-5 sm:px-6">
          <CompanyDetail
            company={company}
            catalystMeta={{
              drug: catalyst.drug,
              indication: catalyst.indication,
              phase: catalyst.phase,
              event: catalyst.event,
            }}
            priceCache={priceCache}
          />
        </div>
      ) : null}
    </div>
  );
}
