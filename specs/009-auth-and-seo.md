# Spec 009 — Auth + SEO (β 모델)

## 0. 결정 (2026-05-02)

이전 spec 008 §3 의 **"검색엔진/AI 봇 전체 차단 + 인증 없음"** 정책을 반대 방향으로 전환:

- **검색엔진 차단 해제** — Google·Naver 색인을 적극 허용해서 검색 유입을 받음.
- **회원가입 도입** — 익명 방문자에게는 *요약*만 공개, 메모·전체 데이터·상세 페이지는 *가입자*만 열람.
- 가입자 수·MAU 트래킹은 Clerk Dashboard 가 자동 제공. 익명 방문자 트래픽은 기존 Vercel Web Analytics 유지.

> spec 008 §3 의 robots.txt 22+봇 차단 / `<meta name="robots" content="noindex">` / Cloudflare AI 봇 토글은 **모두 해제**. spec 008 §3 의 결정 표는 spec 009 §3 에 의해 무효.
> spec 008 §4 호스트는 *Cloudflare Pages* 였으나 운영 중 Vercel 로 이전됨. 본 spec 은 **Vercel Hobby** 기준으로 작성.

## 1. 모델 (β = 부분 공개)

| 영역 | 공개 (인덱싱 OK) | 가입자 전용 |
|---|---|---|
| 랜딩 `/` | ✅ 사이트 설명, 통계, 로그인 유도 | — |
| 카탈리스트 요약 `/catalysts` | ✅ **다음 7일 임박만**. ticker/회사명/날짜/이벤트 타입/약물명까지 | 적응증, phase, 임상 결과, 소스 URL, NCT, 견해 |
| 종목 리스트 `/companies` | ✅ ticker / 회사명 / mcap **만** | modality, areas, sources, 기업프로필, 약물 정보, 임상 정보, 메모 전체 |
| 종목 상세 페이지 | ❌ (가입 안 하면 접근 불가) | ✅ 전체 |
| 학회 `/conferences` | ✅ **전체 공개** (일정 + 발표 종목 + 약물 매핑) | — |
| 대시보드 (전체 카탈리스트 + 워치리스트) | ❌ | ✅ |

**원칙**:
- 공개 = "어떤 종목·이벤트가 임박했는지 광고" 수준의 *최소 사실*. ticker + 회사명 + 날짜 + 이벤트 타입 + 약물명까지.
- 가입 후 = 적응증, phase, 임상 결과, 소스, 메모, modality/areas, 기업프로필 등 *분석에 필요한 모든 디테일*.
- 학회는 예외 — 학회 자체가 공식 공개 정보라 전체 공개.

> CLAUDE.md "메모는 그대로 노출" + 공개/비공개 분리 = "가입한 사람에게는 메모 그대로. 가입 안 한 사람에게는 메모 자체가 안 보임" 으로 해석.

## 2. 결정 사항 (2026-05-02 사용자 확정)

| 항목 | 결정 |
|---|---|
| 모델 | β (부분 공개) |
| 인증 제공자 | **Clerk** (무료 tier, 10K MAU) |
| 로그인 옵션 | Google OAuth + 이메일 매직링크 (Clerk 기본) |
| 가입 정책 | **누구나 가입 가능** (승인 절차 없음) |
| 호스트 | **Vercel Hobby** (현행 유지) |
| 도메인 | `biotechcatalystcalendar.vercel.app` (현행 유지). 도메인 구매는 추후 결정 |
| SEO 대상 | Google + **Naver** (한국 사용자 비중 고려) |
| 트래킹 | Clerk Dashboard (가입자/MAU) + Vercel Web Analytics (익명 방문자) |
| 워치리스트 | 가입자별 localStorage 그대로. Clerk userId 와 묶지 않음 (백엔드 없음 유지) |

## 3. 페이지 라우팅 (확정)

```
공개:
  /                  랜딩
  /catalysts         공개 요약 — 다음 7일 임박, ticker/회사명/날짜/이벤트/약물명까지
  /companies         공개 리스트 — ticker/회사명/mcap 만
  /conferences       전체 (그대로 노출)

보호 (Clerk SignedIn):
  /app                       대시보드 전체
  /app/catalysts             전체 카탈리스트 (7일 외 + 적응증/phase/소스/NCT)
  /app/companies             전체 종목 리스트 (modality/areas 포함)
  /app/companies/:ticker     종목 상세 (기업프로필 + 약물 + 임상 + 메모 전체)
  /app/watchlist             워치리스트
```

리액트 라우터 도입 필요. 현재 단일 `App.jsx` → `react-router-dom` 분기로 리팩토링.

## 4. 구현 단계

### 4.1 Clerk 셋업
1. clerk.com 가입 → 새 application 생성 (Production + Development 키 발급)
2. `npm install @clerk/clerk-react react-router-dom`
3. Clerk Dashboard → "User & Authentication" → Google OAuth + Email 활성, 나머지 비활성
4. `.env.local`, Vercel Project Env 양쪽에 `VITE_CLERK_PUBLISHABLE_KEY` 추가
5. `src/main.jsx` 를 `<ClerkProvider>` 로 감싸기
6. 보호 라우트는 `<SignedIn>` + `<RedirectToSignIn>` 패턴

### 4.2 페이지 분할 리팩토링
- `src/Landing.jsx` 신규 — 사이트 설명, 통계 카드 3개, "둘러보기" + "로그인" 버튼
- 기존 데이터 컴포넌트를 공개판/전체판으로 분리:
  - `<CatalystsPublic />` — `dueDate <= today + 7d` 만 필터, 카드에 ticker/회사명/날짜/이벤트/약물명까지만 렌더
  - `<CatalystsFull />` — 전체, 적응증/phase/소스/NCT/견해 포함
  - `<CompaniesPublic />` — ticker/회사명/mcap 3개 컬럼만
  - `<CompaniesFull />` — modality/areas + 행 클릭 시 상세 모달 (메모 포함)
- 종목 상세 모달은 보호 라우트 안에서만 동작. 공개 라우트의 종목 행 클릭 시 → 로그인 유도

### 4.3 SEO 작업
- `index.html`:
  - `<meta name="robots" content="noindex, nofollow, ...">` **제거**
  - `<title>` "Bio Catalyst Calendar — 미국 biotech 임상 카탈리스트 추적"
  - `<meta name="description">` 한국어 150자
  - Open Graph: `og:title`, `og:description`, `og:image` (랜딩 스크린샷 1024×512)
  - `<link rel="canonical">` 자기 자신
- `public/robots.txt` 재작성:
  ```
  User-agent: *
  Allow: /
  Disallow: /app/
  Sitemap: https://biotechcatalystcalendar.vercel.app/sitemap.xml
  ```
- `scripts/build-data.mjs` 에 `sitemap.xml` 생성 로직 추가 — 공개 라우트만 포함
- 랜딩에 한국어 본문 200~500자 (왜 만들었나 / 무엇을 추적 / 어떤 사용자에게)

### 4.4 검색엔진 등록
- Google Search Console: 사이트 등록 → HTML 메타 인증 → sitemap 제출
- 네이버 서치어드바이저: 사이트 등록 → HTML 메타 인증 → sitemap 제출
- 인덱싱 첫 노출까지 1~2주 예상

## 5. 배포 후 점검

- [ ] `/robots.txt` 가 새 버전으로 응답 (`Allow: /`, `Disallow: /app/`)
- [ ] HTML `<head>`에 `noindex` 메타 **없음**, OG 태그·canonical 들어감
- [ ] `/` 랜딩 시크릿 창에서 보임, 로그인 없이도 OK
- [ ] `/catalysts` 공개판: **다음 7일치만** 보임. 적응증/phase/소스/NCT 칸 안 보임
- [ ] `/companies` 공개판: ticker/회사명/mcap 3개 컬럼만. modality/areas 안 보임
- [ ] 공개 라우트의 종목 행 클릭 → 모달 안 뜨고 로그인 유도
- [ ] `/conferences` 공개판: 그대로 전체 (발표 종목·약물 매핑 포함)
- [ ] `/app` 접근 시 Clerk 로그인 화면으로 redirect
- [ ] Google 가입 → `/app` 진입 → 종목 메모/약물/임상 정보 보임 → 로그아웃 → 사라짐
- [ ] Clerk Dashboard 에 신규 가입자 1명 잡힘
- [ ] `site:biotechcatalystcalendar.vercel.app` Google 검색 (1~2주 후) 결과 1건 이상
- [ ] 네이버 서치어드바이저 색인 상태 OK
- [ ] Vercel Web Analytics 에 랜딩 방문 기록됨
- [ ] `npm run check` 전체 통과
- [ ] secrets 누출 0개 (Publishable Key 만 클라이언트 노출, Secret Key 는 사용 안 함 — 백엔드 없으므로)

## 6. 알려진 트레이드오프

- **검색 콘텐츠 양 적음 (좁고 깊게)**: 공개 영역이 매우 minimal 해서 검색봇이 인덱싱할 한국어 본문이 적음. "biotech 카탈리스트", "PDUFA 2026" 같은 일반 키워드는 잡히기 어렵고, "$LLY 카탈리스트", "ASCO 2026 발표 종목" 처럼 ticker/학회명을 이미 아는 검색만 잡힘. 즉 *biotech 입문자의 우연한 발견* 은 어려움. 몇 달 운영 후 트래픽 안 나오면 공개 범위 푸는 방향으로 재조정 가능.
- **익명 가입 정책 (i)**: 모르는 사람도 가입 후 메모 열람 가능. 부담스러우면 추후 (ii) 승인제로 전환 (Clerk Dashboard 토글).
- **vercel.app 도메인**: 검색 신뢰도 약간 불리. 트래픽 패턴 보고 도메인 구매 재검토.
- **백엔드 없음 유지**: Clerk userId 와 워치리스트 연동 안 함 → 같은 가입자라도 다른 브라우저에서 워치리스트 안 따라감. 추후 필요해지면 별도 spec.
- **메모 노출**: β 라도 "가입만 하면 누구나 봄" 이라 사실상 *공개* 에 가까움. 검색 봇은 못 보지만 사람은 봄.
