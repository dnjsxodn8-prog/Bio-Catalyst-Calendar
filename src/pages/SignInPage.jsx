import { SignIn } from '@clerk/clerk-react';
import { AUTH_MODE } from '../auth';
import AuthUnavailable from './AuthUnavailable';

export default function SignInPage() {
  if (AUTH_MODE !== 'clerk') return <AuthUnavailable />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/app" />
    </div>
  );
}
