import { activeChips, removeChip, clearAllFacets } from '../../utils/screenerFilters';

// 활성 필터를 칩으로 표시 + 개별 × + 전체 해제 (spec 020 §3).
export default function ActiveFilterChips({ filters, setFilters }) {
  const chips = activeChips(filters);
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {chips.map((c) => (
        <button
          key={c.id}
          onClick={() => setFilters(removeChip(filters, c.id))}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[12px] bg-acc/15 border border-acc/40 text-ink hover:bg-acc/25 transition-colors"
          title="이 필터 제거"
        >
          {c.label}
          <span className="text-ink-3">✕</span>
        </button>
      ))}
      <button
        onClick={() => setFilters(clearAllFacets(filters))}
        className="text-[12px] text-ink-3 hover:text-ink-2 px-2 py-1"
      >
        전체 해제
      </button>
    </div>
  );
}
