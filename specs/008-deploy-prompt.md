# 008 — 배포 세션용 프롬프트

새 세션 첫 메시지에 아래 블록 전체를 복사해서 붙여넣으면 됨. 코드펜스(```) 안의 내용만 복사해도 되고, 전체 파일을 붙여넣어도 됨.

---

```
이 프로젝트는 Bio Catalyst Calendar — React + Vite로 만든 개인 biotech 카탈리스트 추적 대시보드야. 지금부터 하려는 건 이걸 처음으로 외부 공개 배포하는 작업.

나는 git/터미널/배포 모두 익숙하지 않은 초보야. 모든 단계를 천천히 설명하면서 진행해줘. 명령어를 시키기 전에 "왜 이걸 하는지" 한 줄이라도 말해주고, 결과가 맞게 나왔는지 같이 확인해줘.

## 시작 전 필독

먼저 다음 두 파일을 읽고 컨텍스트 잡아줘:

1. `CLAUDE.md` — 프로젝트 전반 정책 (1인 도구였다가 공개 배포로 전환 중)
2. `specs/008-deploy.md` — 이번 배포 결정사항 + Cloudflare Pages 절차 + 배포 후 점검 체크리스트

직전 세션 끝에 `claude/competent-neumann-090a01` worktree 브랜치에 4개 commit이 만들어진 상태여야 정상이야. `git log --oneline -6` 으로 다음이 보이면 OK:

  cb258c9  feat(deploy): block AI bots + add spec 008 deploy plan
  e3f47b4  feat(data): drop recommendation field across data, schema, skills, docs
  5c3ffdb  feat(ui): apply BCC redesign — sidebar layout, design tokens, all pages rebuilt
  e82dba4  chore(dev): pin vite dev port to 5179 to avoid worktree conflict
  fb29912  feat(export-telegram): MoA fallback + --days=N 기간 필터  ← 직전 main 끝

만약 안 보이면 어디 있는지 `git worktree list` 로 확인하고 알려줘. 메인 폴더(`Bio Catalyst Calendar`)에서 시작하는 걸 권장.

## 절대 규칙

- commit / push / merge 같은 git 변경 작업은 매번 사용자 명시 동의 후 실행. CLAUDE.md에 "사용자 확인 없이 자동 commit/push 금지" 규칙 명시되어 있음.
- 파괴적 작업 전엔 무조건 멈추고 확인. 특히 `git push --force`, `git reset --hard`, worktree remove 등.
- 외부 사이트(Cloudflare 등)에 가입·결제 같은 사용자가 직접 해야 하는 작업이 나오면 멈추고 안내문을 줄 것. AI가 대신 가입할 순 없음.

## 진행 순서

각 단계 끝나면 사용자에게 결과 보고하고 "다음 단계 갈까?" 물어보고 진행.

### 1단계 — 코드를 main 브랜치로 합치기 + GitHub에 올리기

지금 변경사항이 worktree 브랜치에 있는데, GitHub에 올라가 있는 main 브랜치에는 아직 없음. Cloudflare는 GitHub의 main을 가져다 빌드하니까 main에 합치고 push해야 함.

순서:

1. 메인 폴더로 이동 (`cd "/c/Users/dnjsx/Desktop/Biotech 기업 분석/Bio Catalyst Calendar"`)
2. `git status` — 다른 commit 안 한 변경사항이 있는지 확인. 있으면 사용자에게 묻기.
3. `git checkout main` — main 브랜치로 전환
4. `git merge claude/competent-neumann-090a01` — fast-forward로 합쳐질 것 (4개 commit 일직선이라 conflict 없음)
5. 여기서 멈추고 `git log --oneline -5` 로 main이 4개 commit 받았는지 보여주고 사용자에게 push 의향 확인
6. 동의 받으면 `git push origin main`

### 2단계 — Cloudflare Pages 가입 + 프로젝트 만들기

사용자가 Cloudflare 계정 없으면 먼저 가입해야 함. 무료. https://dash.cloudflare.com/sign-up

가입 후:

1. 좌측 메뉴 → "Workers & Pages" (또는 "Compute (Workers)") → "Pages" 탭
2. "Create application" → "Pages" → "Connect to Git"
3. GitHub 계정 연결 (OAuth 인증). private repo 접근 권한 줘야 함.
4. 이 프로젝트 repo 선택
5. Build configuration 입력:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables:
     - `NODE_VERSION` = `20`
6. "Save and Deploy" 클릭
7. 빌드 시작 — 2~3분 걸림. 사용자에게 빌드 진행 화면 보여달라고 하고 결과 확인.

빌드 실패하면 로그 같이 보면서 디버그.

### 3단계 — 첫 배포 URL 확인 + 기능 검증

빌드 성공하면 `xxx.pages.dev` 같은 URL 발급됨. spec 008 §5 체크리스트로 검증:

- 사이트가 뜨는지 (404/500 아닌지)
- 다크/라이트 토글 동작
- 4개 탭 (대시보드/종목/카탈리스트/학회) 데이터 로드
- 종목 행 클릭 → 모달 열림 → 카탈리스트 타임라인 보임
- 워치리스트 그룹 만들기 + 등록 → 새로고침 후 유지
- 외부 링크 (Naver/Telegram) 새 탭으로 열림

### 4단계 — AI 봇 차단 토글 (필수)

spec 008 §4의 5번 항목.

1. Cloudflare 대시보드 → 해당 Pages 프로젝트 클릭
2. "Settings" 또는 메인 사이트 도메인의 "Security" / "Bots" 메뉴 (UI가 약간씩 바뀌니 못 찾으면 사용자한테 화면 캡처 부탁)
3. "Block AI Scrapers and Crawlers" 토글 ON
4. 저장

확인 방법: 사용자한테 다음을 시키고 결과 보기

  curl https://your-site.pages.dev/robots.txt

응답에 22개 정도 User-agent Disallow 룰이 보이면 OK.

### 5단계 — 사이트 view-source로 meta robots 확인

브라우저에서 사이트 열고 우클릭 → "페이지 소스 보기" → `<head>` 안에 다음 라인 있어야 함:

  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noai, noimageai">

### 6단계 — incognito 창에서 워치리스트 격리 확인

다른 사람한테 사이트 보여줘도 내 워치리스트가 안 보여야 함. 검증:

1. incognito (시크릿) 창 열기
2. 사이트 URL 접속
3. 워치리스트 비어있는지 확인 (= 방문자별로 별개로 동작 = 정상)

### 7단계 (선택) — worktree 정리

배포 다 되고 나면 직전 세션에서 만든 worktree들이 disk에 남아 있음:

  git worktree list

사용자가 더 이상 안 쓸 worktree들 (특히 머지 끝난 `competent-neumann-090a01`) 삭제 의향 물어보고 동의하면:

  git worktree remove .claude/worktrees/<name>

remove가 거부되면 (working tree dirty 등) 사용자한테 그대로 보여주고 어떻게 할지 묻기.

## 톤 가이드

- 짧고 정확하게. 한 단계씩 설명 → 명령 → 사용자 결과 확인 → 다음 단계.
- 명령어 보여줄 때 한 줄 주석으로 "이건 X를 하는 거야" 추가.
- 사용자가 헷갈려하거나 "이거 맞아?" 물으면 결과를 같이 보고 분석.
- 절대 한 번에 모든 명령어 쏟아붓지 말 것.
- Cloudflare UI가 자주 바뀌니 화면 안 보이면 사용자한테 캡처 부탁.

## 막히면

- spec 008 §4 → 호스트별 절차 (Cloudflare가 망가지면 Vercel/Netlify fallback)
- spec 008 §5 → 배포 후 체크리스트 전체
- spec 005 §0 → 이전 "로컬 전용" 정책이 폐기된 이유 (참고용)
```

---

## 사용 방법

1. 위 코드펜스(```) 안의 내용을 통째로 복사
2. 새 Claude Code 세션 시작 — 메인 폴더(`Bio Catalyst Calendar`)에서 권장
3. 첫 메시지로 붙여넣고 보내기
4. Claude가 CLAUDE.md + spec 008 읽고 1단계부터 안내함

배포 끝나면 이 파일 자체는 삭제해도 됨.
