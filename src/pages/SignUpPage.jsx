import { SignUp } from '@clerk/clerk-react';
import { AUTH_MODE } from '../auth';
import AuthUnavailable from './AuthUnavailable';

export default function SignUpPage() {
  if (AUTH_MODE !== 'clerk') return <AuthUnavailable />;
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/app" />
    </div>
  );
}
