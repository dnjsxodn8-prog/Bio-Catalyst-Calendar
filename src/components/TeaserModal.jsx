// spec 019 — 공개 검색 결과 클릭 시 즉시 sign-in redirect 대신 teaser/lock 모달.
// 공개 사실(ticker/회사/시총/D-day teaser)만 보여주고, 상세는 "가입 후 보기" CTA 로 연결.
import { useEffect } from 'react';
import { Lock, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton } from '../auth';
import { Link } from 'react-router-dom';
import { fmtMcap, fmtD, dClass } from '../utils/dDay';

export default function TeaserModal({ entry, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!entry) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.ticker} 미리보기`}
    >
      <div
        className="panel relative w-full max-w-[420px] m-4 p-6"
        style={{ maxHeight: '90vh', overflow: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md text-ink-3 hover:text-ink hover:bg-panel-2"
        >
          <X className="w-4 h-4" strokeWidth={1.8} />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <span className="mono text-[18px] font-extrabold text-ink">{entry.ticker}</span>
          {entry.dDay != null && (
            <span className={`mono text-[10px] dday ${dClass(entry.dDay)}`}>{fmtD(entry.dDay)}</span>
          )}
        </div>
        <div className="text-[14px] text-ink-2">{entry.company}</div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Stat label="시가총액" value={fmtMcap(entry.mcap)} />
          <Stat
            label="다음 카탈리스트"
            value={entry.dDay != null ? `D${entry.dDay <= 0 ? '' : '-'}${Math.abs(entry.dDay)}` : '—'}
          />
        </div>

        <div className="mt-5 rounded-lg border border-line bg-panel-2 p-4 flex items-start gap-3">
          <Lock className="w-4 h-4 text-ink-3 mt-0.5 flex-shrink-0" strokeWidth={1.8} />
          <div className="text-[12.5px] text-ink-3 leading-relaxed">
            약물 파이프라인, 임상 phase·적응증, 30일 주가, 스크리너 점수, 투자 노트는 가입 후 열람할 수 있습니다.
          </div>
        </div>

        <div className="mt-5">
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl={`/app/company/${entry.ticker}`}>
              <button className="w-full h-11 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity">
                무료 가입하고 {entry.ticker} 상세 보기
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              to={`/app/company/${entry.ticker}`}
              className="w-full h-11 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              {entry.ticker} 상세 열기 →
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-panel-2 px-3 py-2.5">
      <div className="text-[10.5px] text-ink-4 uppercase tracking-[0.08em] mono">{label}</div>
      <div className="num text-[15px] font-semibold text-ink mt-1">{value}</div>
    </div>
  );
}
