# Spec 008 — Public Deploy

## 0. 결정 (2026-04-30)

이전 spec 005 §0 의 *"로컬 전용"* 정책 폐기. 사이트를 외부에 공개해서 다른 사람도 볼 수 있게 함. 단, 데이터 수정은 owner(나)만 가능.

`recommendation` 필드는 견해성이 강해 공개에 부적절하다고 판단해 spec 008 작업 직전(2026-04-30)에 데이터·코드·검증·UI 모든 곳에서 제거 완료. 하지만 `body.메모`는 **그대로 노출**한다는 사용자 결정. 따라서 메모 안에 견해/판단/매수의견이 들어 있을 수 있다는 것을 *알고 있는 상태*로 공개함.

## 1. 권한 모델 요약

이 앱은 **백엔드 없는 정적 SPA**이고 frontend 측 쓰기 동작이 0개라서 권한 모델이 단순함:

| 항목 | 어떻게 보장되나 |
|---|---|
| 데이터 수정 (owner only) | git repo write 권한이 owner에게만 있음. owner가 로컬에서 `npm run build` → push → CI가 새 번들 배포. 방문자는 UI에 추가/수정 버튼 없음, 백엔드도 없음. |
| Watchlist 방문자별 동작 | localStorage는 origin+브라우저 단위 sandbox. owner의 워치리스트와 방문자 워치리스트는 자동 분리. 방문자도 자신의 브라우저에 본인 워치리스트 저장. |
| 앱 인증 | 불필요 (백엔드 없음). 사이트 자체에 비밀번호를 걸지 여부는 §3 결정. |
| 소스 repo 비공개 유지 | Cloudflare Pages / Vercel / Netlify 모두 private repo에서 public deploy 가능. |

## 2. 사전 점검 (이미 완료)

- 프론트 fetch/POST 등 쓰기 surface 0개 (`grep -rE "fetch\(|axios|\.post\(" src/` → 빈 결과 확인)
- secrets 누출 0개 (TELEGRAM_BOT_TOKEN/CHAT_ID는 `.env.local` → `scripts/export-telegram.mjs`에서만 사용, 프론트엔드에 import 없음, `.env.local`은 .gitignore)
- `npm run check` + `npm run build` 통과 (2026-04-30 기준)
- `recommendation` 흔적 0개

## 3. 결정 사항 (2026-04-30 사용자 확정)

| 항목 | 결정 |
|---|---|
| 호스트 | **Cloudflare Pages** (private repo 무료, 트래픽 무제한, AI 봇 차단 토글 보유) |
| 공개 범위 | URL만 알면 누구나 접근. 비밀번호/로그인 없음 |
| 도메인 | 기본 `*.pages.dev` 사용 (커스텀 도메인은 추후 결정) |
| AI 봇 / 검색엔진 | **Tier 1 + Tier 2 차단** — `robots.txt` + `<meta name="robots">`(코드에 이미 적용) + Cloudflare 대시보드의 *Block AI Scrapers and Crawlers* 토글 |
| 사용자 인증 | 없음 (백엔드 없음, edit UI 없음 → 어차피 누구도 데이터 수정 불가) |
| Watchlist | 방문자별 localStorage. owner와 visitor 자동 분리 |

## 4. 배포 절차 (호스트 별)

### Cloudflare Pages (확정 호스트)

1. Cloudflare 대시보드 → Workers & Pages → Create → Pages → Connect to Git
2. GitHub repo 선택 (private 가능)
3. 빌드 설정:
   - Framework preset: `None` (또는 Vite)
   - Build command: `npm run build`
   - Build output: `dist`
   - Node version: `20` (build env 변수 `NODE_VERSION=20`)
4. Deploy → 첫 빌드 후 `*.pages.dev` URL 발급
5. **AI 봇 차단 토글 활성화** (필수):
   - 프로젝트 → Settings → 또는 Cloudflare 대시보드 → 해당 사이트 → *Bots* (또는 Security → Bots)
   - "Block AI Scrapers and Crawlers" 토글 ON
   - CF가 유지하는 GPTBot/ClaudeBot/PerplexityBot/CCBot 등 알려진 AI 봇 user-agent + IP를 엣지에서 자동 차단
6. (선택) 향후 비밀번호 보호 원하면 Cloudflare Access (Zero Trust) 무료 tier 50명까지 — 지금은 안 함

### (백업) Vercel / Netlify

호스트는 Cloudflare Pages로 확정했지만, 만약 Cloudflare가 동작 안 하면 fallback:
- **Vercel**: Framework preset `Vite`, build/output 자동 감지. 단, 무료 tier에는 AI 봇 차단 토글 없음 → robots.txt만 의존.
- **Netlify**: `netlify.toml`에 `[build] command = "npm run build", publish = "dist"`. 동일 한계.

## 5. 배포 후 점검

- [ ] `/robots.txt` 응답 확인 (`curl https://your-site.pages.dev/robots.txt` → 22+개의 User-agent Disallow 룰 보여야 함)
- [ ] HTML `<head>`에 `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noai, noimageai">` 들어가 있는지 view-source로 확인
- [ ] Cloudflare 대시보드 → Bots → "Block AI Scrapers and Crawlers" 토글 ON 상태 확인
- [ ] 다크/라이트 토글 양쪽 다 정상 렌더
- [ ] 4개 탭 (대시보드 / 종목 / 카탈리스트 / 학회) 모두 데이터 로드
- [ ] 종목 모달 열림, 카탈리스트 타임라인 정상
- [ ] 워치리스트 그룹 생성 → localStorage 저장 → 새로고침 후 유지
- [ ] Naver Blog / Telegram 외부 링크 새 탭 오픈
- [ ] incognito/다른 브라우저에서 워치리스트가 비어있는지 (= 방문자별 격리 확인)
- [ ] 빌드 환경에 secrets (`.env`) 안 들어갔는지 확인 — Cloudflare Pages env 변수 비어 있어야 함 (있어도 노드 스크립트가 빌드 중 안 부르므로 무해하지만 mental model은 깔끔하게)
