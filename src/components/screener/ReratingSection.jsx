import { useMemo } from 'react';
import { isWatchlist, isEarlyRerating } from '../../utils/screenerFilters';

// 저점권 고품질주 조기 편입 보조 레이어 (기존 Screener.jsx ③ 에서 이관).
// 차트 뷰 하단에 유지 — rerating 레이어를 버리지 않는다 (spec 020 §1.2).
export default function ReratingSection({ points, onOpenCompany }) {
  const rows = useMemo(() => {
    const a = points.filter((d) => isWatchlist(d) || isEarlyRerating(d));
    a.sort((x, y) => (y.rt ?? -1) - (x.rt ?? -1));
    return a;
  }, [points]);

  return (
    <div className="panel p-4">
      <h2 className="text-[15px] font-bold text-ink mb-1">
        💠 Rerating 관심종목 <span className="text-ink-3 font-normal text-[13px]">— {rows.length}종</span>
      </h2>
      <div className="text-[12px] text-ink-4 mb-3">
        저점권 고품질주 조기 편입 보조 레이어. <b>Primary</b> = 위대한 후보 + Early/Deep Value · <b>Aggressive</b> = min(G,E)≥65 + 강촉매. <b>자동 매수신호 아님 — 검토 우선순위.</b>
      </div>
      {!rows.length ? (
        <div className="text-[13px] text-ink-3">현재 필터에 활성 Rerating 관심종목 없음.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-ink-3 text-left border-b border-line">
                <th className="py-2 pr-3 font-semibold">종목</th>
                <th className="py-2 pr-3 font-semibold">회사</th>
                <th className="py-2 pr-3 font-semibold">G/E</th>
                <th className="py-2 pr-3 font-semibold">Rerating 라벨</th>
                <th className="py-2 pr-3 font-semibold">watchlist</th>
                <th className="py-2 pr-1 font-semibold text-right">R_total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.t} className="border-b border-[var(--hairline)] hover:bg-white/[0.03]">
                  <td className="py-2 pr-3">
                    {d.inCalendar ? (
                      <button onClick={() => onOpenCompany(d.t)} className="mono font-bold text-ink hover:text-acc">
                        {d.t}
                      </button>
                    ) : (
                      <span className="mono font-bold text-ink">{d.t}</span>
                    )}
                  </td>
                  <td className="py-2 pr-3 text-ink-2 truncate max-w-[220px]">{d.c}</td>
                  <td className="py-2 pr-3 num text-ink">{d.g}/{d.e}</td>
                  <td className="py-2 pr-3 text-ink-2">{d.rl || '—'}</td>
                  <td className="py-2 pr-3">
                    {isWatchlist(d) ? (
                      <span className="text-[#22c55e] font-semibold">{d.wl}</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-2 pr-1 num text-right text-ink">{d.rt != null ? d.rt : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
