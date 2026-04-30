# 009 — 모바일 반응형 fix 세션용 프롬프트

새 Claude Code 세션 첫 메시지에 아래 코드펜스 안의 블록을 복사해서 붙여넣으면 됨.

---

```
이 프로젝트는 Bio Catalyst Calendar — React + Vite로 만든 biotech 카탈리스트 추적 대시보드. 이미 Vercel에 공개 배포된 상태(<https://biotechcatalystcalendar.vercel.app/>)이고, 외부 공유 직전 점검 중. 이번 세션 목표는 **모바일 반응형 깨짐 해결**.

나는 git/터미널/배포 모두 익숙하지 않은 초보야. 모든 단계를 천천히 설명하면서 진행해줘. 명령어를 시키기 전에 "왜 이걸 하는지" 한 줄이라도 말해주고, 결과가 맞게 나왔는지 같이 확인해줘.

## 시작 전 필독

먼저 다음 파일들을 읽고 컨텍스트 잡아줘:

1. `CLAUDE.md` — 프로젝트 전반 정책 (공개 사이트 + /deploy 스킬 워크플로우 명시되어 있음)
2. `specs/008-deploy.md` — 직전 배포 결정사항
3. `.claude/skills/deploy/SKILL.md` — /deploy 스킬 동작 절차

직전 main 끝은 `9c5055f` "feat(ui): 면책 disclaimer footer 추가". `git log --oneline -5`로 다음이 보이면 OK:

  9c5055f  feat(ui): 면책 disclaimer footer 추가 (외부 공유 대비)
  c64bfd1  feat(skill): /deploy 스킬 추가 + CLAUDE.md 정책 갱신
  cb258c9  feat(deploy): block AI bots + add spec 008 deploy plan
  e3f47b4  feat(data): drop recommendation field across data, schema, skills, docs
  5c3ffdb  feat(ui): apply BCC redesign — sidebar layout, design tokens, all pages rebuilt

## 진단 결과 (직전 세션에서 확인)

모바일(약 360px viewport)에서 사이트 들어가면 **모든 콘텐츠가 1글자씩 세로로 깨짐**. 사용자가 보낸 캡처 2장 분석 결과:

- **근본 원인 1개**: 데스크탑용 사이드바(~280px 폭)가 모바일에서도 그대로 자리 차지 → 메인 영역이 ~80px만 남아 텍스트가 한 글자씩 줄바꿈됨.
- 종목 페이지: 사이드바 옆에 테이블이 끼어들어 컬럼 헤더("종목 라이브러리", "회사/핵심자산", "티커")가 세로로 깨짐.
- 대시보드: KPI 카드 ("PD 대기 9", "임상 readout 1", "학회발표 9") 텍스트가 한 글자씩 세로 줄바꿈. AXSM PDUFA 카드도 한 글자씩.

## 1차 fix 범위 (이번 세션 목표 — 가장 큰 효과)

**사이드바를 모바일 breakpoint에서 햄버거 메뉴로 토글**. 이거 하나만으로도 메인 콘텐츠가 풀폭 차지하면서 글자 깨짐 대부분 해결.

손댈 파일 후보:
- `src/components/Sidebar.jsx` — `isOpen` state 받아 transform 토글, 모바일에선 fixed positioning + slide-in
- `src/components/Topbar.jsx` — 햄버거 버튼 (Lucide `Menu` / `X` 아이콘), 모바일에서만 표시
- `src/App.jsx` — `sidebarOpen` state lift up, Sidebar/Topbar로 props 전달
- `src/index.css` — 필요한 경우 backdrop overlay (사이드바 열렸을 때 메인 영역 어둡게 + 클릭하면 닫기)
- `tailwind.config.js` — 기존 breakpoint 사용 (보통 `lg:` = ≥1024px, `md:` = ≥768px)

Tailwind 패턴 예시: 사이드바에 `fixed lg:static -translate-x-full lg:translate-x-0 transition-transform` + state로 `translate-x-0` 토글.

## 2차 fix 범위 (시간 여유 있으면)

1차 fix로 사이드바 처리되면, 그 다음 미세 조정:

- **테이블 (Companies.jsx, Catalysts.jsx, Conferences.jsx)**: 모바일에서 가로 스크롤 허용 또는 카드 레이아웃 (좁은 화면에선 행 → 카드)
- **CompanyDetail.jsx 모달**: 모바일에서 풀스크린 또는 bottom-sheet 패턴
- **Dashboard.jsx KPI 카드**: grid 1열 또는 자동 적응 (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
- **Footer.jsx**: 모바일에서 padding/정렬 점검

## 절대 규칙

- commit/push는 **`/deploy` 스킬 호출**로만. 절대 임의로 commit/push 자동 안 함. 다른 방식으로 commit/push가 필요하면 사용자 명시 동의 후만.
- 파괴적 작업 전 (git reset --hard, force push 등) 무조건 멈추고 확인.
- pre-commit hook 우회 (`--no-verify`) 절대 금지. 실패하면 원인 진단·수정 후 재커밋.
- worktree 안에서 작업하지 말 것. 메인 폴더(`Bio Catalyst Calendar`)에서 직접 진행. (Claude Code가 worktree 자동 생성하면 거기서 검증·작업 가능하지만 /deploy는 메인 폴더 + main 브랜치에서만.)

## 진행 순서

각 단계 끝나면 결과 보고하고 "다음 단계 갈까?" 물어보고 진행.

### Step 1 — 코드 구조 파악

`src/App.jsx`, `src/components/Sidebar.jsx`, `src/components/Topbar.jsx` Read해서 현재 사이드바·토픽바 구조 파악. Tailwind config의 breakpoint 확인. 코드 변경 전 모바일 fix 전략 한 줄로 요약 보고.

### Step 2 — 1차 fix 구현

위 파일들 수정. 한 사이클 끝나면:

1. (가능하면) preview_start로 dev server 띄우고 모바일 모드(viewport 360px)에서 검증. 시각적으로 깨짐 사라졌는지 preview_screenshot으로 캡처해 보여줄 것.
2. `npm run check` 통과 확인
3. 사용자에게 "1차 fix 결과 캡처 보내줄게. 모바일에서 다시 확인해보고 OK면 /deploy로 반영하자" 안내

### Step 3 — 사용자 모바일 검증

사용자가 폰으로 https://biotechcatalystcalendar.vercel.app/ 접속해서 (1차 fix가 Vercel 반영된 후) 깨짐 사라졌는지 확인. 추가 깨짐 있으면 캡처 받아 2차 fix.

### Step 4 — `/deploy`

사용자가 "/deploy" 또는 "사이트 반영해줘" 호출하면 commit + push + Vercel 자동 빌드.

### Step 5 — 2차 fix (시간/컨텍스트 여유 있으면)

테이블·모달·KPI 카드 등 미세 조정. 없으면 별도 세션으로 미룸.

## 막히면

- 사이드바 패턴 모르겠으면 Tailwind UI 또는 Headless UI 사이드바 패턴 참고.
- breakpoint가 헷갈리면 `tailwind.config.js` 또는 기본 breakpoint (`sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`).
- preview_start 결과 깨짐이 안 보이면 폰 실제 viewport 크기와 DevTools 시뮬레이터 결과가 다를 수 있음 → /deploy 후 폰에서 직접 검증.

## 참고

- 직전 세션 끝에 `.claude/worktrees/competent-neumann-090a01` 등 묵힌 worktree들 있음. 작업 시작 전에 메인 폴더에서 `git worktree list`로 확인. lock 풀려있으면 정리, 아니면 그대로 두고 진행.
- `/deploy` 스킬은 `c64bfd1` commit에서 도입됨. CLAUDE.md "절대 하지 말 것"의 "사용자 확인 없이 자동 commit/push" 규칙의 명시적 예외로 명시되어 있음.
- 사이트는 robots.txt + meta noindex로 검색엔진 인덱싱 차단 상태. AI 봇 차단은 정직한 봇만 (Cloudflare 엣지 차단은 Workers 환경 한계로 미적용).
```

---

## 톤 가이드

- 짧고 정확하게. 한 단계씩 설명 → 명령 → 사용자 결과 확인 → 다음 단계.
- 명령어 보여줄 때 한 줄 주석으로 "이건 X를 하는 거야" 추가.
- 사용자가 헷갈려하거나 "이거 맞아?" 물으면 결과를 같이 보고 분석.
- 절대 한 번에 모든 명령어 쏟아붓지 말 것.
- 모바일 깨짐 검증은 사용자 폰 실제 접속이 가장 정확. preview_screenshot이나 DevTools 시뮬은 보조.
