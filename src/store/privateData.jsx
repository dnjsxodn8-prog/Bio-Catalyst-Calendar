// spec 019 — 비공개 데이터 런타임 로더.
// 인증 앱(/app)은 더 이상 data.generated.json / screener.generated.json 을 import 하지 않는다.
// (import 하면 공개 정적 번들에 메모·본문·점수가 섞여 들어감.) 대신 로그인 후 `/api/private-data`
// 를 Clerk 토큰으로 호출해 런타임에 받아온다.
//   - production : Vercel 서버리스 함수가 Clerk 토큰 검증 후 JSON 반환.
//   - dev        : vite.config.js 의 dev 미들웨어가 디스크에서 읽어 그대로 반환(로컬이라 무인증).
// 두 환경 모두 클라이언트 코드 경로는 동일(항상 fetch) → 정적 번들엔 비공개 JSON 0.
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuthState } from '../auth';

const PrivateDataContext = createContext(null);

export function usePrivateData() {
  const ctx = useContext(PrivateDataContext);
  if (!ctx) throw new Error('usePrivateData must be used inside <PrivateDataProvider>');
  return ctx;
}

export function PrivateDataProvider({ children }) {
  const { getToken } = useAuthState();
  const [state, setState] = useState({ status: 'loading', data: null, screener: null, error: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let token = null;
        try {
          token = await getToken?.();
        } catch {
          /* dev/bypass — 토큰 없음 */
        }
        const res = await fetch('/api/private-data', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;
        setState({
          status: 'ready',
          data: json.data ?? json,
          screener: json.screener ?? { points: [], counts: {}, coverage: {} },
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState({ status: 'error', data: null, screener: null, error: err });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [getToken]);

  // ticker → screener point 맵(과거 CompanyDetail 모듈 상수 대체). status 변화 시에만 재계산.
  const screenerByTicker = useMemo(() => {
    const m = new Map();
    for (const p of state.screener?.points || []) m.set(p.t, p);
    return m;
  }, [state.screener]);

  if (state.status === 'loading') {
    return <FullScreenStatus label="데이터 불러오는 중…" spinner />;
  }
  if (state.status === 'error') {
    return (
      <FullScreenStatus
        label="데이터를 불러오지 못했습니다."
        sub="네트워크를 확인하거나 다시 로그인해 주세요."
      />
    );
  }

  return (
    <PrivateDataContext.Provider
      value={{ data: state.data, screener: state.screener, screenerByTicker }}
    >
      {children}
    </PrivateDataContext.Provider>
  );
}

function FullScreenStatus({ label, sub, spinner }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-ink-3 text-sm px-6 text-center">
      {spinner && (
        <span className="inline-block w-5 h-5 rounded-full border-2 border-ink-4 border-t-transparent animate-spin" />
      )}
      <div>{label}</div>
      {sub && <div className="text-[12px] text-ink-4">{sub}</div>}
    </div>
  );
}
