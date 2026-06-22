// spec 019 — 인증 게이트 비공개 데이터 API (Vercel 서버리스).
// 로그인(Clerk 세션 토큰)한 사용자에게만 전체 데이터(메모·본문·점수 포함)를 반환한다.
// 정적 번들에는 이 데이터가 전혀 없으므로, 비로그인 스크래퍼는 dist/assets 를 긁어도
// 메모/분석을 얻을 수 없다.
//
// 의존: @clerk/backend, env CLERK_SECRET_KEY (Vercel Project Env). includeFiles 로 src/*.generated.json 포함.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { verifyToken } from '@clerk/backend';

let cache = null;

function loadPrivate() {
  if (cache) return cache;
  const root = process.cwd();
  const read = (rel, fallback) => {
    try {
      return JSON.parse(readFileSync(path.join(root, rel), 'utf8'));
    } catch {
      return fallback;
    }
  };
  cache = {
    data: read('src/data.generated.json', { companies: [], catalysts: [], conferences: [], feed: [], prices: {} }),
    screener: read('src/screener.generated.json', { points: [], counts: {}, coverage: {} }),
  };
  return cache;
}

export default async function handler(req, res) {
  const secretKey = process.env.CLERK_SECRET_KEY;
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  // CLERK_SECRET_KEY 미설정(미구성 환경)에서는 보호 불가 → 안전하게 거부.
  if (!secretKey) {
    res.status(503).json({ error: 'auth_not_configured' });
    return;
  }
  if (!token) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  try {
    await verifyToken(token, { secretKey });
  } catch {
    res.status(401).json({ error: 'invalid_token' });
    return;
  }

  // 인증 사용자 전용 응답. 검색엔진·CDN 캐시 금지.
  res.setHeader('Cache-Control', 'private, no-store');
  res.status(200).json(loadPrivate());
}
