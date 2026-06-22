import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import { AUTH_MODE, CLERK_KEY } from './auth'
import Landing from './Landing.jsx'
import PublicLayout from './components/PublicLayout.jsx'
import CatalystsPublic from './pages/CatalystsPublic.jsx'
import CompaniesPublic from './pages/CompaniesPublic.jsx'
import ConferencesPublic from './pages/ConferencesPublic.jsx'

// 인증 앱(메모·본문·점수·screener·plotly 포함)은 별도 lazy chunk 로 분리한다.
// 공개 라우트(Landing/Public*)는 이 chunk 를 절대 로드하지 않음 → 공개 초기 JS 최소화 + 데이터 격리.
const ProtectedApp = lazy(() => import('./ProtectedApp.jsx'))
const SignInPage = lazy(() => import('./pages/SignInPage.jsx'))
const SignUpPage = lazy(() => import('./pages/SignUpPage.jsx'))
// 로컬 인증 우회 하니스 (DEV 전용). production 빌드에선 import.meta.env.DEV=false → dead-code 제거.
const DevApp = import.meta.env.DEV ? lazy(() => import('./DevApp.jsx')) : null

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-ink-3 text-sm">
      <span className="inline-block w-4 h-4 mr-2.5 rounded-full border-2 border-ink-4 border-t-transparent animate-spin" />
      불러오는 중…
    </div>
  )
}

const router = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<PublicLayout />}>
        <Route path="/catalysts" element={<CatalystsPublic />} />
        <Route path="/companies" element={<CompaniesPublic />} />
        <Route path="/conferences" element={<ConferencesPublic />} />
      </Route>

      <Route
        path="/sign-in/*"
        element={
          <Suspense fallback={<Loading />}>
            <SignInPage />
          </Suspense>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <Suspense fallback={<Loading />}>
            <SignUpPage />
          </Suspense>
        }
      />

      <Route
        path="/app/*"
        element={
          <Suspense fallback={<Loading />}>
            <ProtectedApp />
          </Suspense>
        }
      />

      {DevApp && (
        <Route
          path="/dev/app/*"
          element={
            <Suspense fallback={<Loading />}>
              <DevApp />
            </Suspense>
          }
        />
      )}
    </Routes>
  </BrowserRouter>
)

// Clerk 키가 있으면 ClerkProvider 로 감싸고, 없으면(=public 모드) 그대로 렌더한다.
// 이전엔 키 없으면 throw → 공개 페이지까지 blank screen 이었음(spec 019 수정).
const tree =
  AUTH_MODE === 'clerk' ? (
    <ClerkProvider
      publishableKey={CLERK_KEY}
      telemetry={false}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/app"
      signUpFallbackRedirectUrl="/app"
      afterSignOutUrl="/"
    >
      {router}
    </ClerkProvider>
  ) : (
    router
  )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {tree}
    <Analytics />
  </StrictMode>,
)
