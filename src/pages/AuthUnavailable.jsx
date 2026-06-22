import { Link } from 'react-router-dom';

// Clerk 미구성(public 모드)에서 /sign-in · /sign-up 진입 시 crash 대신 안내.
export default function AuthUnavailable() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-bold text-ink">로그인을 사용할 수 없습니다</h1>
      <p className="text-sm text-ink-3 max-w-sm">
        이 환경에는 인증(Clerk)이 구성되어 있지 않습니다. 공개 페이지는 그대로 이용할 수 있습니다.
      </p>
      <Link to="/" className="h-10 px-4 rounded-md bg-ink text-bg text-sm font-semibold flex items-center">
        홈으로
      </Link>
    </div>
  );
}
