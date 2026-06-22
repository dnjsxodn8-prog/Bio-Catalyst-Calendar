import { COLOR, fmtMcap, fmtRunway, fmtAreas, reratingTag } from './screenerFormat';

// 정렬 가능한 데이터 테이블 (데스크톱). 좁은 폭에서는 ScreenerCardList 로 전환(부모가 분기).
// rows 는 부모가 이미 정렬해서 전달. 헤더 클릭 → onSort(key) 로 정렬 상태 갱신.
const COLS = [
  { key: 't', label: '종목', sortable: true, align: 'left' },
  { key: 'grp', label: '등급', sortable: false, align: 'left' },
  { key: 'g', label: 'G', sortable: true, align: 'right' },
  { key: 'e', label: 'E', sortable: true, align: 'right' },
  { key: 't1', label: 'T1', sortable: true, align: 'right' },
  { key: 'm', label: '시총', sortable: true, align: 'right' },
  { key: 'runway', label: '런웨이', sortable: true, align: 'right' },
  { key: 'kdate', label: '카탈리스트 일자', sortable: true, align: 'left' },
  { key: 'mod', label: '모달리티', sortable: false, align: 'left' },
  { key: 'area', label: '적응증', sortable: false, align: 'left' },
  { key: 'rt', label: '💠', sortable: true, align: 'right' },
];

export default function ScreenerTable({ rows, sort, onSort, selected, onSelect, onOpenCompany }) {
  return (
    <div className="panel p-0 overflow-x-auto">
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr className="text-ink-3 text-left border-b border-line bg-panel-2/50">
            {COLS.map((c) => (
              <th
                key={c.key}
                onClick={c.sortable ? () => onSort(c.key) : undefined}
                className={`py-2.5 px-3 font-semibold whitespace-nowrap ${c.align === 'right' ? 'text-right' : 'text-left'} ${
                  c.sortable ? 'cursor-pointer select-none hover:text-ink-2' : ''
                }`}
              >
                {c.label}
                {c.sortable && sort.key === c.key && (
                  <span className="ml-0.5 text-acc">{sort.dir === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => {
            const tag = reratingTag(d);
            const isSel = selected && selected.t === d.t;
            return (
              <tr
                key={d.t}
                onClick={() => onSelect(d)}
                className={`border-b border-[var(--hairline)] cursor-pointer transition-colors ${
                  isSel ? 'bg-acc/10' : 'hover:bg-white/[0.03]'
                }`}
              >
                <td className="py-2 px-3">
                  {d.inCalendar ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenCompany(d.t); }}
                      className="mono font-bold text-ink hover:text-acc"
                    >
                      {d.t}
                    </button>
                  ) : (
                    <span className="mono font-bold text-ink">{d.t}</span>
                  )}
                  <div className="text-[11px] text-ink-4 truncate max-w-[180px]">{d.c}</div>
                </td>
                <td className="py-2 px-3">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLOR[d.grp] }} />
                    <span className="text-ink-2 text-[12px]">{d.grp}</span>
                  </span>
                </td>
                <td className="py-2 px-3 num text-right text-ink">{d.g}</td>
                <td className="py-2 px-3 num text-right text-ink">{d.e}</td>
                <td className="py-2 px-3 num text-right text-ink-2">{d.t1}</td>
                <td className="py-2 px-3 num text-right text-ink-2">{fmtMcap(d.m)}</td>
                <td className="py-2 px-3 num text-right text-ink-2">{fmtRunway(d.runway)}</td>
                <td className="py-2 px-3 text-ink-3 text-[12px] whitespace-nowrap">{d.kdate || '—'}</td>
                <td className="py-2 px-3 text-ink-2 text-[12px] whitespace-nowrap">{d.mod || '—'}</td>
                <td className="py-2 px-3 text-ink-3 text-[12px]">{fmtAreas(d.area)}</td>
                <td className="py-2 px-3 text-right whitespace-nowrap">
                  {tag ? (
                    <span className={`text-[11px] font-semibold ${
                      d.wl === 'Primary' || d.wl === 'Aggressive' ? 'text-[#22c55e]' : 'text-[#3b82f6]'
                    }`}>
                      {tag}{d.rt != null ? ` ${d.rt}` : ''}
                    </span>
                  ) : (
                    <span className="text-ink-4">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
