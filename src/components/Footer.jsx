export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line px-7 py-7 max-w-[1600px] w-full mx-auto">
      <div className="space-y-2">
        <p className="text-[12px] leading-[1.7] text-ink-3">
          본 사이트는 미국 biotech 종목의 임상 카탈리스트를 개인이 정리·기록한 자료입니다.
          특정 종목의 매수·매도 권유나 투자자문이 아니며, 정보의 정확성·완전성·시의성을 보장하지 않습니다.
          투자 결정과 그 결과는 전적으로 투자자 본인의 책임이며, 본 사이트 운영자는 일체 책임을 지지 않습니다.
        </p>
        <p className="mono text-[10.5px] tracking-[0.04em] text-ink-3">
          © 2026 Biotech Catalyst Calendar · 비상업 개인 프로젝트 · Data: company IR / FDA / ClinicalTrials.gov
        </p>
      </div>
    </footer>
  );
}
