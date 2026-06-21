// 기업 상세로 가는 공용 링크. 실제 <a href="/app/company/TICKER"> 라서
// 일반 클릭 = SPA 모달 오버레이, Ctrl/⌘/가운데 클릭 = 브라우저 새 탭(여러 기업 동시 열기).
import { Link, useLocation } from 'react-router-dom';

export default function CompanyLink({ ticker, className, style, title, stop, children }) {
  const location = useLocation();
  if (!ticker) {
    return (
      <span className={className} style={style} title={title}>
        {children}
      </span>
    );
  }
  // 이미 기업 모달 위가 아니면 현재 위치를 배경으로 보존(닫으면 돌아옴).
  const isCompany = location.pathname.startsWith('/app/company/');
  const bg = isCompany ? location.state?.backgroundLocation : location;
  return (
    <Link
      to={`/app/company/${ticker}`}
      state={bg ? { backgroundLocation: bg } : undefined}
      className={className}
      style={style}
      title={title}
      onClick={stop ? (e) => e.stopPropagation() : undefined}
    >
      {children}
    </Link>
  );
}
