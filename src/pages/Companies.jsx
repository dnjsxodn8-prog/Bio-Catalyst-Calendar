import { useMemo, useState } from 'react';
import Sparkline from '../components/Sparkline';
import PctChange from '../components/PctChange';
import { dDelta, fmtD, dClass, fmtDate, fmtMcap } from '../utils/dDay';

export default function Companies({ data, query, onPick }) {
  const { companies, catalysts, prices = {} } = data;
  const [sortBy, setSortBy] = useState('mcap');

  // Map next catalyst per ticker
  const nextByTicker = useMemo(() => {
    const m = {};
    for (const c of catalysts) {
      const d = dDelta(c.date);
      if (d == null || d < -2) continue;
      if (!m[c.ticker] || dDelta(m[c.ticker].date) > d) m[c.ticker] = c;
    }
    return m;
  }, [catalysts]);

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    return companies
      .filter((c) => {
        if (!q) return true;
        const blob = [
          c.ticker,
          c.company,
          c.body?.타겟,
          c.body?.MOA,
          ...(c.areas || []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return blob.includes(q);
      })
      .sort((a, b) => {
        if (sortBy === 'mcap') return (b.mcap ?? 0) - (a.mcap ?? 0);
        if (sortBy === 'next') {
          const da = nextByTicker[a.ticker] ? dDelta(nextByTicker[a.ticker].date) : 999;
          const db = nextByTicker[b.ticker] ? dDelta(nextByTicker[b.ticker].date) : 999;
          return da - db;
        }
        return a.ticker.localeCompare(b.ticker);
      });
  }, [companies, query, sortBy, nextByTicker]);

  return (
    <div className="panel overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3.5 border-b border-line">
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10.5px] font-semibold text-ink-2 tracking-[0.1em] uppercase">
            Sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-panel-2 text-ink border border-line rounded-md px-2 py-1 text-xs"
          >
            <option value="mcap">시총</option>
            <option value="next">다음 카탈리스트</option>
            <option value="ticker">티커</option>
          </select>
          <span className="num text-[11px] font-semibold text-ink-2 tracking-[0.04em] ml-2">
            {filtered.length} / {companies.length}
          </span>
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center gap-3.5 px-4 py-2.5 border-b border-line bg-bg-2 text-[10.5px] font-semibold text-ink-2 tracking-[0.1em] uppercase">
        <span className="w-20">티커</span>
        <span className="flex-[1.4] min-w-0">회사 / 핵심 자산</span>
        <span className="w-[110px]">Modality</span>
        <span className="w-[130px]">적응증</span>
        <span className="w-20">Phase</span>
        <span className="w-[90px] text-right">시총</span>
        <span className="w-[140px] text-right">30D Price</span>
        <span className="w-[160px]">다음 카탈리스트</span>
      </div>

      {/* Rows */}
      <div>
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-ink-3 text-sm">조건에 맞는 종목 없음.</div>
        ) : (
          filtered.map((c) => {
            const next = nextByTicker[c.ticker];
            const drug = c.body?.['타겟'] || c.body?.['카탈리스트'] || '';
            const indication = (c.areas && c.areas[0]) || '';
            return (
              <div
                key={c.ticker}
                onClick={() => onPick && onPick(c)}
                className="flex items-center gap-3.5 px-4 h-14 border-b border-[var(--hairline)] cursor-pointer hover:bg-white/[0.025] transition-colors"
              >
                <span className="w-20 mono text-[13px] font-bold text-ink">{c.ticker}</span>
                <span className="flex-[1.4] flex flex-col gap-0.5 min-w-0">
                  <span className="text-[13px] text-ink font-medium truncate">{c.company}</span>
                  <span className="text-[11.5px] text-ink-3 truncate">{drug}</span>
                </span>
                <span className="w-[110px] text-xs text-ink-2 truncate">{c.modality}</span>
                <span className="w-[130px] text-xs text-ink-2 truncate">{indication}</span>
                <span className="w-20">
                  {c.body?.['임상 디자인']?.includes('Phase 3') ? (
                    <span className="chip phase-3">Phase 3</span>
                  ) : c.body?.['임상 디자인']?.includes('Phase 2') ? (
                    <span className="chip phase-2">Phase 2</span>
                  ) : (
                    <span className="text-ink-4 text-[11px]">—</span>
                  )}
                </span>
                <span className="w-[90px] text-right num">
                  <span className="text-[13px] text-ink font-semibold">{fmtMcap(c.mcap)}</span>
                </span>
                <span className="w-[140px] flex items-center justify-end gap-2.5">
                  <Sparkline ticker={c.ticker} priceCache={prices[c.ticker]} width={70} height={22} />
                  <span className="min-w-[54px] text-right">
                    <PctChange ticker={c.ticker} priceCache={prices[c.ticker]} />
                  </span>
                </span>
                <span className="w-[160px] flex items-center gap-2">
                  {next ? (
                    <>
                      <span
                        className={`d-counter ${dClass(dDelta(next.date))}`}
                        style={{ minWidth: 48, fontSize: 10.5, height: 22 }}
                      >
                        {fmtD(dDelta(next.date))}
                      </span>
                      <span className="ev-date" style={{ fontSize: 10.5 }}>
                        {fmtDate(next.date)}
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] text-ink-4">—</span>
                  )}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
