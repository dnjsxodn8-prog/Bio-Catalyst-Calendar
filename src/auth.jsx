// spec 019 — 인증 추상화 레이어.
// Clerk 의존 컴포넌트를 한 곳에서 감싸 3가지 모드를 지원한다:
//   - 'clerk'  : VITE_CLERK_PUBLISHABLE_KEY 존재 → 실제 Clerk.
//   - 'bypass' : DEV + VITE_AUTH_BYPASS=true → 로그인 없이 전체 앱 점검(항상 signed-in).
//   - 'public' : 키 없음(=Clerk 미구성) → 항상 signed-out. 공개 라우트는 graceful 렌더,
//                /app 은 안내 메시지(이전엔 main.jsx 가 throw → blank screen 이었음).
//
// 핵심: Clerk 훅(useAuth 등)은 ClerkProvider 안에서만 호출 가능하므로, non-clerk 모드에서는
// 절대 Clerk 훅을 호출하지 않도록 모듈 로드 시점에 구현을 분기한다. AUTH_MODE 는 빌드 상수라
// 렌더마다 동일 → Rules of Hooks 안전.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SignedIn as ClerkSignedIn,
  SignedOut as ClerkSignedOut,
  SignInButton as ClerkSignInButton,
  UserButton as ClerkUserButton,
  RedirectToSignIn as ClerkRedirectToSignIn,
  useAuth as useClerkAuth,
} from '@clerk/clerk-react';

export const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';
// production 빌드에서는 import.meta.env.DEV 가 false 로 상수화 → bypass 분기 자체가 dead code 제거됨.
export const AUTH_BYPASS =
  import.meta.env.DEV && import.meta.env.VITE_AUTH_BYPASS === 'true';
export const AUTH_MODE = AUTH_BYPASS ? 'bypass' : CLERK_KEY ? 'clerk' : 'public';

function PassChildren({ children }) {
  return <>{children}</>;
}
function RenderNull() {
  return null;
}

let SignedIn;
let SignedOut;
let SignInButton;
let UserButton;
let RedirectToSignIn;
let useAuthState;

if (AUTH_MODE === 'clerk') {
  SignedIn = ClerkSignedIn;
  SignedOut = ClerkSignedOut;
  SignInButton = ClerkSignInButton;
  UserButton = ClerkUserButton;
  RedirectToSignIn = ClerkRedirectToSignIn;
  useAuthState = function useAuthState() {
    const { isSignedIn, getToken } = useClerkAuth();
    return { isSignedIn: !!isSignedIn, getToken };
  };
} else if (AUTH_MODE === 'bypass') {
  // 로컬 점검: 항상 로그인 상태. SignedOut 블록(로그인/가입 버튼)은 렌더 안 됨.
  SignedIn = PassChildren;
  SignedOut = RenderNull;
  SignInButton = PassChildren;
  UserButton = function UserButton() {
    return (
      <span
        title="DEV auth bypass (VITE_AUTH_BYPASS)"
        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-acc/20 text-acc text-[10px] font-bold mono select-none"
      >
        DEV
      </span>
    );
  };
  RedirectToSignIn = RenderNull;
  useAuthState = function useAuthState() {
    return { isSignedIn: true, getToken: async () => null };
  };
} else {
  // Clerk 미구성: 항상 비로그인. 공개 라우트는 정상 렌더, 인증 액션은 안내만.
  SignedIn = RenderNull;
  SignedOut = PassChildren;
  SignInButton = function SignInButton({ children }) {
    return (
      <span
        style={{ display: 'contents' }}
        onClick={(e) => {
          e.preventDefault();
          alert('로그인 기능이 아직 구성되지 않았습니다. (VITE_CLERK_PUBLISHABLE_KEY 미설정)');
        }}
      >
        {children}
      </span>
    );
  };
  UserButton = RenderNull;
  RedirectToSignIn = function RedirectToSignIn() {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/', { replace: true });
    }, [navigate]);
    return null;
  };
  useAuthState = function useAuthState() {
    return { isSignedIn: false, getToken: async () => null };
  };
}

export { SignedIn, SignedOut, SignInButton, UserButton, RedirectToSignIn, useAuthState };
