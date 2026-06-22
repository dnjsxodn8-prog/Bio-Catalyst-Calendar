import { isWatchlist as isWL } from '../../utils/screenerFilters';
import { COLOR } from './screenerFormat';

// 차트 점 클릭 / 테이블·카드 행 클릭 시 표시되는 상세 패널 (기존 Screener.jsx 에서 이관).
export default function SelectionPanel({ selected, onOpenCompany, onClear }) {
  if (!selected) {
    return (
      <div className="panel px-3.5 py-2 text-[12px] text-ink-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ink-4" />
        차트의 점이나 테이블의 행을 선택하면 여기에 종목 상세가 표시됩니다.
      </div>
    );
  }
  const d = selected;
  return (
    <div className="panel p-4 ring-1 ring-acc/40 shadow-lg">
      <div className="flex items-start gap-3 flex-wrap">
        <span className="w-2.5 h-2.5 rounded-full mt-2" style={{ background: COLOR[d.grp] }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="mono text-[17px] font-extrabold text-ink">{d.t}</span>
            <span className="text-[14px] text-ink-2 truncate">{d.c}</span>
            <span className="text-[11px] text-ink-4">{d.grp}</span>
          </div>
          <div className="text-[12.5px] text-ink-3 mt-1">
            G <b className="text-ink">{d.g}</b> · E <b className="text-ink">{d.e}</b> · T1 {d.t1} · 시총{' '}
            {d.m ? '$' + (d.m / 1000).toFixed(1) + 'B' : '—'}
            {d.runway != null ? ` · 런웨이 ${d.runway}Q` : ''}
          </div>
          {(d.mod || (d.area && d.area.length)) && (
            <div className="text-[12px] text-ink-4 mt-1">
              {d.mod || '모달리티 미상'}
              {d.area && d.area.length ? ` · ${d.area.join(' / ')}` : ''}
            </div>
          )}
          {(isWL(d) || (d.rl && d.rl !== 'No Rerating Signal')) && (
            <div className="text-[12px] text-ink-3 mt-1">
              💠 {d.rl || '—'}
              {isWL(d) ? ` · ${d.wl}` : ''}
              {d.rt != null ? ` · R ${d.rt}` : ''}
            </div>
          )}
          <div className="text-[12px] text-ink-4 mt-1">다음: {d.cat}</div>
        </div>
        <div className="flex items-center gap-2">
          {d.inCalendar ? (
            <button
              onClick={() => onOpenCompany(d.t)}
              className="h-9 px-3.5 rounded-md bg-ink text-bg text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              상세정보 보기 →
            </button>
          ) : (
            <span
              className="h-9 px-3 rounded-md border border-line text-ink-4 text-[12px] flex items-center cursor-not-allowed"
              title="Calendar 미등록 종목 — 스크리너 지표만 제공"
            >
              Calendar 미등록
            </span>
          )}
          <button onClick={onClear} className="btn btn-icon" title="선택 해제">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
