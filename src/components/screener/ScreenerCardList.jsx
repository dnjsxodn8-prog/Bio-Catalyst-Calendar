import { COLOR, fmtMcap, fmtRunway, fmtAreas, reratingTag } from './screenerFormat';

// 좁은 폭(모바일) 카드 리스트 — 테이블 대체 (spec 020: 모바일 카드 전환).
export default function ScreenerCardList({ rows, selected, onSelect, onOpenCompany }) {
  return (
    <div className="space-y-2">
      {rows.map((d) => {
        const tag = reratingTag(d);
        const isSel = selected && selected.t === d.t;
        return (
          <div
            key={d.t}
            onClick={() => onSelect(d)}
            className={`panel p-3 cursor-pointer transition-colors ${isSel ? 'ring-1 ring-acc/50' : 'hover:border-line-2'}`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLOR[d.grp] }} />
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
              <span className="text-[12px] text-ink-3 truncate flex-1 min-w-0">{d.c}</span>
              {tag && (
                <span className={`text-[11px] font-semibold flex-shrink-0 ${
                  d.wl === 'Primary' || d.wl === 'Aggressive' ? 'text-[#22c55e]' : 'text-[#3b82f6]'
                }`}>
                  💠 {tag}
                </span>
              )}
            </div>
            <div className="flex items-center gap-x-3 gap-y-0.5 flex-wrap mt-1.5 text-[12px] text-ink-2">
              <span className="num">G <b className="text-ink">{d.g}</b></span>
              <span className="num">E <b className="text-ink">{d.e}</b></span>
              <span className="num">T1 {d.t1}</span>
              <span className="num">{fmtMcap(d.m)}</span>
              <span className="num text-ink-3">런웨이 {fmtRunway(d.runway)}</span>
            </div>
            <div className="text-[11px] text-ink-4 mt-1 truncate">
              {d.mod || '모달리티 미상'} · {fmtAreas(d.area)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
