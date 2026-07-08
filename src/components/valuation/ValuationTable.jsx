import { ExternalLink } from 'lucide-react';
import { fmtMoney, fmtRatio, fmtPct, pegColor, sourceUrl } from './valuationFormat';

// 정렬 가능한 밸류에이션 테이블. rows 는 부모가 이미 필터·정렬해서 전달.
// 헤더 클릭 → onSort(key). ScreenerTable 의 헤더클릭 정렬 패턴 복제 (spec 023 §4.1).
// kind: 'money'(시장별 $M/억원) · 'ratio'(2자리) · 'pct'(1자리%) · 'text'.
const COLS = [
  { key: 't', label: '종목', align: 'left', kind: 'ticker' },
  { key: 'ind', label: '세부업종', align: 'left', kind: 'text' },
  { key: 'peg', label: 'PEG', align: 'right', kind: 'peg' },
  { key: 'mc', label: '시총', align: 'right', kind: 'money' },
  { key: 'per', label: 'PER', align: 'right', kind: 'ratio' },
  { key: 'fpe', label: 'Fwd PE', align: 'right', kind: 'ratio' },
  { key: 'pbr', label: 'PBR', align: 'right', kind: 'ratio' },
  { key: 'roe', label: 'ROE', align: 'right', kind: 'pct' },
  { key: 'roa', label: 'ROA', align: 'right', kind: 'pct' },
  { key: 'roic', label: 'ROIC', align: 'right', kind: 'pct' },
  { key: 'dy', label: '배당', align: 'right', kind: 'pct' },
  { key: 'rev', label: '매출', align: 'right', kind: 'money' },
  { key: 'oi', label: '영업익', align: 'right', kind: 'money' },
  { key: 'ni', label: '순익', align: 'right', kind: 'money' },
  { key: 'om', label: '영업M', align: 'right', kind: 'pct' },
  { key: 'pm', label: '순M', align: 'right', kind: 'pct' },
  { key: 'rg', label: '매출성장', align: 'right', kind: 'pct' },
  { key: 'eg', label: 'EPS성장', align: 'right', kind: 'pct' },
];

function cellText(kind, v, market) {
  if (kind === 'money') return fmtMoney(v, market);
  if (kind === 'ratio' || kind === 'peg') return fmtRatio(v);
  if (kind === 'pct') return fmtPct(v);
  return v ?? '—';
}

export default function ValuationTable({ rows, sort, onSort, market }) {
  return (
    <div className="panel p-0 overflow-x-auto">
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr className="text-ink-3 text-left border-b border-line bg-panel-2/50">
            {COLS.map((c) => (
              <th
                key={c.key}
                onClick={() => onSort(c.key)}
                className={`py-2.5 px-3 font-semibold whitespace-nowrap cursor-pointer select-none hover:text-ink-2 ${
                  c.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {c.label}
                {sort.key === c.key && (
                  <span className="ml-0.5 text-acc">{sort.dir === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr
              key={d.t}
              className="border-b border-[var(--hairline)] hover:bg-white/[0.03] transition-colors"
            >
              <td className="py-2 px-3">
                <a
                  href={sourceUrl(d, market)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono font-bold text-ink hover:text-acc inline-flex items-center gap-1"
                  title={market === 'kr' ? '네이버 증권에서 보기' : 'Finviz 에서 보기'}
                >
                  {d.t}
                  <ExternalLink className="w-3 h-3 text-ink-4" strokeWidth={1.8} />
                </a>
                <div className="text-[11px] text-ink-4 truncate max-w-[200px]">{d.n}</div>
              </td>
              <td className="py-2 px-3 text-ink-3 text-[12px] whitespace-nowrap">{d.ind || '—'}</td>
              <td
                className="py-2 px-3 num text-right font-semibold text-ink"
                style={{ background: pegColor(d.peg) }}
                title={d.pmeth || undefined}
              >
                {fmtRatio(d.peg)}
              </td>
              {COLS.slice(3).map((c) => (
                <td key={c.key} className="py-2 px-3 num text-right text-ink-2 whitespace-nowrap">
                  {cellText(c.kind, d[c.key], market)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
