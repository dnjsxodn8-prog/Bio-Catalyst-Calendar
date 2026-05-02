import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import data from './data.generated.json';
import { dDelta } from './utils/dDay';

export default function Landing() {
  const companyCount = data.companies.length;
  const catalystCount = data.catalysts.length;
  const within30 = data.catalysts.filter((c) => {
    const d = dDelta(c.date);
    return d != null && d >= 0 && d <= 30;
  }).length;

  return (
    <div className="flex flex-col gap-12">
      <section className="pt-8 pb-4">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-ink leading-tight">
          미국 biotech 임상 카탈리스트,
          <br />
          한 곳에서 추적하세요.
        </h1>
        <p className="mt-5 text-base md:text-lg text-ink-2 max-w-2xl leading-relaxed">
          PDUFA, 임상 readout, 학회 발표, 규제 결정 — 시총 $100M 이상 미국 biotech 와 빅파마의
          주요 카탈리스트 일정을 한 화면에서 관찰합니다. 회사별 메모, 약물 파이프라인, 임상
          진행 상황은 가입 후 <span className="text-ink">무료로</span> 열람할 수 있습니다.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/app">
              <button className="h-11 px-5 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity">
                무료로 시작하기
              </button>
            </SignInButton>
            <Link
              to="/catalysts"
              className="h-11 px-5 rounded-md border border-line text-ink text-sm hover:bg-panel-2 transition-colors flex items-center"
            >
              7일 카탈리스트 미리보기 →
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              to="/app"
              className="h-11 px-5 rounded-md bg-ink text-bg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center"
            >
              대시보드 열기 →
            </Link>
          </SignedIn>
        </div>
        <SignedOut>
          <p className="mt-3 text-[12px] text-ink-3">이메일 또는 Google · 30초 · 모든 기능 무료</p>
        </SignedOut>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="추적 종목" value={companyCount} suffix="개" />
        <StatCard label="등록 카탈리스트" value={catalystCount} suffix="건" />
        <StatCard label="다음 30일 임박" value={within30} suffix="건" hint="PDUFA · readout · 발표 등" />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard
          title="카탈리스트 캘린더"
          body="다가오는 PDUFA 결정, 임상 readout, 학회 발표를 D-day 와 함께 정렬해서 봅니다."
        />
        <FeatureCard
          title="종목 상세 (가입자)"
          body="modality 분류, 약물 파이프라인, 임상 phase, 적응증, 메모를 종목별로 정리합니다."
        />
        <FeatureCard
          title="학회 일정"
          body="ASCO · ASH · AHA · JPM 등 주요 학회 일정과 발표 기업 매핑을 한눈에."
        />
      </section>

      <section className="border-t border-line pt-8 pb-4 text-[13px] text-ink-3 leading-relaxed max-w-3xl">
        <p>
          이 사이트는 개인이 운영하는 biotech 카탈리스트 트래커입니다. 정보 제공 목적이며 투자 권유가 아닙니다.
          데이터는 회사 IR, FDA, ClinicalTrials.gov 등 공개 출처에서 수집·검증합니다. 메모와 분석은
          가입자에게만 노출됩니다.
        </p>
      </section>
    </div>
  );
}

function StatCard({ label, value, suffix, hint }) {
  return (
    <div className="panel p-5">
      <div className="text-[11px] font-semibold text-ink-3 tracking-[0.1em] uppercase">{label}</div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="num text-3xl font-bold text-ink tracking-tight">{value.toLocaleString('en-US')}</span>
        <span className="text-sm text-ink-2">{suffix}</span>
      </div>
      {hint && <div className="mt-1 text-[11.5px] text-ink-3">{hint}</div>}
    </div>
  );
}

function FeatureCard({ title, body }) {
  return (
    <div className="panel p-5">
      <div className="text-[14px] font-semibold text-ink">{title}</div>
      <p className="mt-2 text-[13px] text-ink-2 leading-relaxed">{body}</p>
    </div>
  );
}
