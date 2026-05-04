import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import Landing from './Landing.jsx'
import PublicLayout from './components/PublicLayout.jsx'
import CatalystsPublic from './pages/CatalystsPublic.jsx'
import CompaniesPublic from './pages/CompaniesPublic.jsx'
import ConferencesPublic from './pages/ConferencesPublic.jsx'
import ProtectedApp from './ProtectedApp.jsx'
import SignInPage from './pages/SignInPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('VITE_CLERK_PUBLISHABLE_KEY 가 .env.local 에 없음. spec 009 §4.1 참조.')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/app"
      signUpFallbackRedirectUrl="/app"
      afterSignOutUrl="/"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route element={<PublicLayout />}>
            <Route path="/catalysts" element={<CatalystsPublic />} />
            <Route path="/companies" element={<CompaniesPublic />} />
            <Route path="/conferences" element={<ConferencesPublic />} />
          </Route>

          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />

          <Route path="/app/*" element={<ProtectedApp />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ClerkProvider>
  </StrictMode>,
)
