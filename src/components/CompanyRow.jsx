import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { formatMcap, formatDate, isStub as isStubCompany } from '../utils/format';
import DBadge from './DBadge';
import { RecommendBadge } from './TypeBadge';
import CompanyDetail from './CompanyDetail';

export default function CompanyRow({ company, nextCatalyst, priceCache }) {
  const [open, setOpen] = useState(false);
  const stub = isStubCompany(company);

  return (
    <div
      className={[
        'border-b border-border last:border-b-0',
        stub ? 'opacity-60' : '',
      ].join(' ')}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex flex-col gap-1 px-4 py-3 text-left hover:bg-bg-card2/40 transition-colors"
      >
        {/* Top line: ticker · company · mcap · recommend · chevron */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-accent-green font-mono w-[4.5rem] shrink-0">
            {company.ticker}
          </span>
          <span className="text-sm font-medium text-fg flex-1 min-w-0 truncate">
            {company.company}
          </span>
          <span className="text-sm text-fg-muted font-mono tabular-nums shrink-0 w-[4.5rem] text-right">
            {formatMcap(company.mcap)}
          </span>
          <RecommendBadge recommendation={company.recommendation} />
          <ChevronDown
            className={[
              'w-4 h-4 text-fg-muted shrink-0 transition-transform',
              open ? 'rotate-180' : '',
            ].join(' ')}
          />
        </div>

        {/* Sub line: areas */}
        {company.areas?.length ? (
          <div className="flex flex-wrap items-center gap-1.5 pl-[5.5rem] text-xs text-fg-muted">
            {company.areas.map((a) => (
              <span
                key={a}
                className="px-1.5 py-0.5 rounded bg-bg-card2/60 text-fg-muted"
              >
                {a}
              </span>
            ))}
          </div>
        ) : null}

        {/* Sub line: 임박 카탈리스트 한 줄 요약 */}
        {nextCatalyst ? (
          <div className="flex items-center gap-2 pl-[5.5rem] text-xs">
            <DBadge days={nextCatalyst._days} />
            <span className="text-fg-muted font-mono tabular-nums">
              {formatDate(nextCatalyst.date)}
            </span>
            <span className="text-fg-muted truncate min-w-0">{nextCatalyst.event}</span>
          </div>
        ) : null}
      </button>

      {open ? (
        <div className="bg-bg/40 px-4 py-5 sm:px-6">
          <CompanyDetail
            company={company}
            catalystMeta={
              nextCatalyst
                ? {
                    drug: nextCatalyst.drug,
                    indication: nextCatalyst.indication,
                    phase: nextCatalyst.phase,
                    event: nextCatalyst.event,
                  }
                : null
            }
            priceCache={priceCache}
          />
        </div>
      ) : null}
    </div>
  );
}
