import { SignedIn, SignedOut, RedirectToSignIn } from './auth';
import { PrivateDataProvider } from './store/privateData';
import App from './App.jsx';

// 인증 게이트 + 비공개 데이터 로더. 로그인 사용자만 App 을 받고, 그 안에서 /api/private-data 를
// 토큰으로 fetch 한다. 비로그인은 RedirectToSignIn(clerk) 또는 홈 리다이렉트(public 모드).
export default function ProtectedApp() {
  return (
    <>
      <SignedIn>
        <PrivateDataProvider>
          <App />
        </PrivateDataProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
