// spec 019 — 로컬 인증 우회 하니스 (/dev/app). DEV 빌드에서만 라우트가 마운트된다(main.jsx).
// 로그인 게이트 없이 전체 앱 UI 를 점검하기 위한 용도. dev 미들웨어가 무인증으로 데이터를 공급.
import { PrivateDataProvider } from './store/privateData';
import App from './App.jsx';

export default function DevApp() {
  return (
    <PrivateDataProvider>
      <App />
    </PrivateDataProvider>
  );
}
