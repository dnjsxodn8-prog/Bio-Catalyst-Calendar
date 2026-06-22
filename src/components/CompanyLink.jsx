// 기업 상세(풀페이지)로 가는 공용 링크. 실제 <a href="/app/company/TICKER"> 라서
// 일반 클릭 = SPA 페이지 이동, Ctrl/⌘/가운데 클릭 = 브라우저 새 탭(여러 기업 동시 열기). (spec 018)
import { Link } from 'react-router-dom';

export default function CompanyLink({ ticker, className, style, title, stop, children }) {
  if (!ticker) {
    return (
      <span className={className} style={style} title={title}>
        {children}
      </span>
    );
  }
  return (
    <Link
      to={`/app/company/${ticker}`}
      className={className}
      style={style}
      title={title}
      onClick={stop ? (e) => e.stopPropagation() : undefined}
    >
      {children}
    </Link>
  );
}
