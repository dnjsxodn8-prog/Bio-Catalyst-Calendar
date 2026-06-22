# spec 019 — 공개/비공개 데이터 분리 · 보안 · 모바일 UX

## 배경 / 문제

기존 구조는 `src/data.generated.json`(메모·본문·sources·임상 상세) 와 `src/screener.generated.json`
(독점 점수)를 클라이언트가 **정적 import** 했다. 코드 스플리팅이 없어 비로그인 방문자가 받는 JS 번들에
비공개 메모·분석·점수가 그대로 포함됐고, DevTools/스크래퍼/AI 브라우저로 번들만 읽으면 추출 가능했다.
추가로 공개 헤더/표가 모바일(390px)에서 가로 overflow, Clerk 키 누락 시 공개 페이지까지 blank screen,
dev optimizer cold-start hang, plotly 포함 과대 번들 문제가 있었다.

## 1. 데이터 레이어 분리 (`scripts/build-data.mjs`)

- `src/public-data.generated.json` 신규 생성 — 공개 라우트가 받는 **유일한** 데이터.
  - `companies`: `{ticker, company, mcap}` 만 (568종 전부).
  - `catalysts`: 빌드 시점 기준 향후 **14일** teaser, `{date, ticker, company, drug, type}` 만
    (적응증·phase·sources·outcome 제외). 런타임은 7일로 다시 필터.
  - `conferences`: 일정·도시·tier·메모 + `relatedTickers`(ticker 만, 약물·적응증 없음).
  - `counts`: 마케팅용 총계.
- `src/data.generated.json` (PRIVATE, 전체) 는 유지하되 **클라이언트 코드에서 import 금지**.
- 빌드 시 방어선: public-data 에 `메모/회사 개요/임상 디자인/research/sources/body` 토큰이 있으면 throw.
- 두 generated 파일 모두 gitignore (빌드 산출물).

## 2. 비공개 데이터는 인증 API 뒤로 (`api/private-data.js` + `src/store/privateData.jsx`)

정적 호스팅에서 lazy chunk 도 결국 공개 URL 이므로, 비공개 데이터를 **클라이언트 번들에서 완전히 제거**하고
런타임 fetch 로 전환:

- `api/private-data.js` (Vercel 서버리스): `@clerk/backend` `verifyToken` 으로 Clerk 세션 토큰 검증 →
  통과 시에만 `{data, screener}` 반환. `Cache-Control: private, no-store`.
- `src/store/privateData.jsx`: 인증 앱 진입 시 Clerk 토큰으로 `/api/private-data` fetch →
  `usePrivateData()` 컨텍스트로 `{data, screener, screenerByTicker}` 공급. 로딩/에러 상태 처리.
- dev: `vite.config.js` 의 미들웨어가 디스크에서 읽어 무인증 반환 → 클라이언트는 dev/prod 동일 경로(fetch).
- 인증 컴포넌트(App, CompanyDetail, Screener, ScreenerBanner, LaneScreenerSignals)는 JSON import →
  `usePrivateData()` 훅으로 전환.

> ⚠️ **배포 필수**: Vercel Project Env 에 `CLERK_SECRET_KEY` 추가. 없으면 API 가 503 → 인증 앱 에러 상태.
> publishable key(`VITE_CLERK_PUBLISHABLE_KEY`)는 기존대로 클라이언트 노출(정상).

## 3. 공개 라우트 (격리 + UX)

- `Landing/PublicLayout/CatalystsPublic/CompaniesPublic/ConferencesPublic` 는 public-data 만 import.
  Landing 의 blur 배경(과거 인증 Dashboard 통째 렌더 = 전체 데이터 유입)을 public teaser 로 교체.
- 공개 검색: `src/utils/searchIndexPublic.js`(별도 모듈, screener·메모 없음). 점수 미표시 + lock 아이콘.
- 검색 결과 클릭 → 즉시 sign-in redirect 대신 **teaser 모달**(`TeaserModal.jsx`): ticker/회사/시총/D-day +
  "가입 후 상세 보기" CTA.

## 4. 인증 추상화 / 로컬 개발 (`src/auth.jsx`)

3모드: `clerk`(키 있음) / `bypass`(DEV + `VITE_AUTH_BYPASS=true`) / `public`(키 없음 → graceful, throw 제거).
`SignedIn/SignedOut/SignInButton/UserButton/RedirectToSignIn/useAuthState` 를 모드별로 분기 제공.
- 키 누락 → 공개 페이지 정상 렌더(이전 blank screen 수정). `/sign-in·/sign-up` 은 `AuthUnavailable` 안내.
- `/dev/app` (DEV 전용 라우트, `DevApp.jsx`) + `VITE_AUTH_BYPASS` 로 로그인 없이 전체 앱 점검.
- production 빌드는 `import.meta.env.DEV=false` 로 bypass·/dev/app 가 dead-code 제거 → 비활성 보장.

## 5. 성능 (`vite.config.js`)

- `manualChunks`: plotly / clerk / router / react-vendor / vendor 분리. plotly 는 스크리너에서만 lazy.
- `ProtectedApp` lazy import → 인증 번들이 공개 진입과 분리.
- `optimizeDeps.include`(공통 의존성 사전 번들) + `exclude: plotly` → dev cold-start hang 완화.
- 결과: 공개 entry chunk ~74KB(gzip ~20KB), plotly 4.6MB 는 스크리너 진입 시에만.

## 6. 보안 헤더 / 프라이버시 (`vercel.json`, `index.html`)

- CSP + `X-Content-Type-Options` + `X-Frame-Options` + `Referrer-Policy` + `Permissions-Policy`.
  CSP 는 Clerk/Google fonts/jsdelivr/Vercel analytics origin 허용. **Vercel preview 에서 Clerk 핸드셰이크
  검증 후 필요 시 튜닝**(라이브 Clerk FAPI 도메인 차이 가능 → 깨지면 Report-Only 로 임시 완화).
- Clerk telemetry off(`telemetry={false}`). index.html 중복 Pretendard 로드 제거.
- `localStorage` watchlist/recent → PublicLayout 메뉴/푸터에 "로컬 데이터 삭제" 버튼(`clearLocalData`).
- `npm audit fix`: react-router-dom 7.14.2 → 7.18.0 (high 2건 해소). prod 취약점 0
  (잔여 moderate 2 = gray-matter/js-yaml = dev 빌드 스크립트 전용, 번들 미포함).

## 검증 결과

- `npm run build` / `npm run lint` / `npm run check` 통과.
- `dist/assets` 전체에 비공개 데이터 JSON 없음. 공개 entry chunk 에 `메모/회사 개요/위대한 후보` = 0.
- 가로 overflow(scrollWidth===clientWidth): 320·375·390·430·768·1024·1440·1920 × `/`·`/catalysts`·
  `/companies`·`/conferences`·`/dev/app` 전부 0.
- IMVT 공개 검색 = 점수 미노출 + lock, 클릭 → teaser 모달(sign-in redirect 아님).
- `/dev/app` 로그인 없이 전체 앱(대시보드·스크리너·기업상세) 렌더 = 인증 fetch 경로 동작 확인.

## 잔여 / 후속

- `api/private-data.js` 의 Clerk 검증 경로는 **Vercel 배포에서 end-to-end 검증 필요**(이 환경은 서버리스·
  실 Clerk 세션 미실행). `CLERK_SECRET_KEY` env 설정 필수.
- CSP 라이브 검증·튜닝. 폰트 self-host 는 선택 후속(현재 CDN + CSP 허용).
