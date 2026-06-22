import { GitCompareArrows } from 'lucide-react';

// 선택 종목 비교 트레이 — 화면 하단 sticky (spec 020 §11). 선택 ≥1 일 때만 렌더.
export default function ScreenerCompareTray({ items, max, onRemove, onClear, onOpen }) {
  if (!items.length) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 px-4 lg:px-7 pb-3 pointer-events-none">
      <div className="max-w-[1600px] mx-auto pointer-events-auto">
        <div className="panel p-3 shadow-2xl flex items-center gap-3 flex-wrap border-acc/40">
          <span className="text-[12px] text-ink-3 font-semibold flex-shrink-0">
            비교 <span className="text-ink">{items.length}</span>/{max}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap flex-1 min-w-0">
            {items.map((d) => (
              <span
                key={d.t}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[12px] bg-panel-2 border border-line text-ink"
              >
                <span className="mono font-bold">{d.t}</span>
                <button
                  onClick={() => onRemove(d.t)}
                  className="text-ink-4 hover:text-danger"
                  title="비교에서 제거"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <button onClick={onClear} className="text-[12px] text-ink-3 hover:text-ink-2 px-2 py-1 flex-shrink-0">
            전체 해제
          </button>
          <button
            onClick={onOpen}
            disabled={items.length < 2}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-ink text-bg text-[13px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            title={items.length < 2 ? '2종목 이상 선택하세요' : '비교 보기'}
          >
            <GitCompareArrows className="w-4 h-4" strokeWidth={1.6} />
            비교 보기
          </button>
        </div>
      </div>
    </div>
  );
}
