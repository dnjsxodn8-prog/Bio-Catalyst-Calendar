import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import App from './App.jsx';

export default function ProtectedApp() {
  return (
    <>
      <SignedIn>
        <App />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
