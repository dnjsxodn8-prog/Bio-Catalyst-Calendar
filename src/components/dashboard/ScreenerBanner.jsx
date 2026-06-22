// spec 017 §3.7 — 홈 상단 스크리너 배너. CTA 문구를 행동 명시("위대한 후보 N 보기")로,
// G×E×T1 의미를 info tooltip 으로 노출.
import { Link } from 'react-router-dom';
import { ScatterChart, ArrowRight, Info } from 'lucide-react';
import { usePrivateData } from '../../store/privateData';

export default function ScreenerBanner() {
  const { screener } = usePrivateData();
  const c = screener.counts || {};
  const great = c['위대한 후보'] || 0;
  const watch = c['관찰 후보'] || 0;
  const total = screener.coverage?.total || 0;

  return (
    <Link
      to="/app/screener"
      className="group relative overflow-hidden rounded-lg flex items-center gap-4 px-5 py-4 border transition-colors"
      style={{
        background:
          'linear-gradient(120deg, rgba(34,197,94,0.10), rgba(59,130,246,0.06) 55%, var(--panel))',
        borderColor: 'rgba(34,197,94,0.30)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{ top: -70, right: -40, width: 220, height: 220, background: 'radial-gradient(closest-side, rgba(34,197,94,0.18), transparent 70%)' }}
      />
      <div
        className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 border"
        style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)' }}
      >
        <ScatterChart className="w-5 h-5" style={{ color: '#22c55e' }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[15px] font-bold text-ink">Great Biotech Screener</span>
          {/* G×E×T1 info tooltip */}
          <span className="relative group/info inline-flex items-center gap-1 cursor-help">
            <span className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase">G × E × T1</span>
            <Info className="w-3 h-3 text-ink-4" strokeWidth={1.8} />
            <span
              className="pointer-events-none absolute left-0 top-full mt-1.5 z-20 w-[260px] rounded-md border border-line-2 bg-panel-2 px-3 py-2 text-[11.5px] leading-relaxed text-ink-2 opacity-0 group-hover/info:opacity-100 transition-opacity shadow-lg"
            >
              <b className="text-ink">G</b> 성장성(파이프라인·시장) · <b className="text-ink">E</b> 실적/밸류 ·{' '}
              <b className="text-ink">T1</b> 임상 진척. 세 축으로 미국 바이오텍을 전수 채점해
              <b className="text-[#22c55e]"> 위대한 바이오텍</b>/<b className="text-[#3b82f6]">관찰 후보</b>를 가린다.
            </span>
          </span>
        </div>
        <div className="text-[12.5px] text-ink-3 mt-1">
          미국 바이오텍 {total}종 전수 스크리닝 ·{' '}
          <span className="text-[#22c55e] font-semibold">위대한 바이오텍 {great}</span> ·{' '}
          <span className="text-[#3b82f6] font-semibold">관찰 후보 {watch}</span>
        </div>
      </div>
      <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-2 group-hover:text-ink whitespace-nowrap">
        위대한 바이오텍 {great} 보기
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.8} />
      </span>
    </Link>
  );
}
