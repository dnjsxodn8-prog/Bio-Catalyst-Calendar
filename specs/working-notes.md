# Working Notes

**최근 갱신:** 2026-04-28 (Phase 5 진행 중, rev 2 결정 반영)
**용도:** 세션 간 인계용 진행상황 기록. 새 세션 시작 시 이 파일 + CLAUDE.md + 가장 최근 spec 순으로 읽고 진행. (HANDOFF.md는 정정 노트 §있음, 정본 아님.)

---

## 현재 상태 (2026-04-27 기준)

### 완료된 Phase

**Phase 1 — 데이터 레이어** ✅
- `data/companies/*.md` × 396 (대부분 stub)
- `data/catalysts.md` (44 events)
- `data/conferences.md` (24 conferences)
- `scripts/build-data.mjs`, `scripts/migrate-from-legacy.mjs`, `scripts/apply-changes.mjs`
- `src/data.generated.json` 자동 생성

**Phase 2 — UI** ✅ (HANDOFF.md 원안보다 확장됨)
- 4페이지 (대시보드 / 종목 / 카탈리스트 / 학회)
- Tailwind v3 다크모드, lucide-react 아이콘
- 컴포넌트: `Header`, `StatCard`, `DBadge`, `TypeBadge`, `SearchBar`, `FilterSelect`, `CatalystRow`, `CompanyRow`, `ConferenceCard`, `CompanyDetail`, `HBarChart`
- 자세한 사양: `specs/002-ui.md`
- **추가 변경:** Top Pick 시스템 완전 제거 (frontmatter, 스크립트, UI, spec 모두), 과거 보기 30일 제한, 학회 카드에 발표 기업 매칭

### 일정 외 추가 구현된 것 (Phase 3 일부 선행)

원래 Phase 3 ~ 5에 있던 스킬 중 **3개 구현됨**:
- `.claude/skills/update/` — 주간 자동 스윕 (autonomous, source URL 필수, 사용자 승인 필요)
- `.claude/skills/update-company/` — 기존 종목 body 섹션 업데이트
- `.claude/skills/add-catalyst/` — 새 카탈리스트 추가

### Phase 표 (rev 3, 2026-04-28)

| Phase | 내용 | 상태 |
|---|---|---|
| **3** | 검증 시스템 (verify-data.mjs + pre-commit + verify 스킬) | ✅ 2026-04-27 |
| **4** | 주가 그래프 (Yahoo Finance + update-prices 스킬 + sparkline) | ✅ 2026-04-28 |
| ~~5~~ | ~~Telegram + Naver + 웹 Import UI~~ | **보류 (2026-04-28)**. spec 005 본문 보존, 필요 시 재개 |
| ~~6~~ | ~~Obsidian 연동~~ | **삭제 (2026-04-28)**. 사용 안 함 |
| ~~7 (원안)~~ | ~~Vercel Private 배포 + 모바일 PWA~~ | **폐기 (2026-04-28)** — 로컬 전용 결정 |

**현 시점 진행 가능한 작업 (Phase 미정):**
- 데이터 백필 — `/update`, `/update-company`, `/add-catalyst`, `/update-prices` 스킬 활용
- spec 003 §3-C `verify-data` 스킬 (선택, 1주일 사용 후 결정)
- 새 요구사항 등장 시 spec 006 작성

---

## Phase 3 — 검증 시스템 (다음 세션 후보)

**HANDOFF.md 정본 정의:** `verify-data.mjs + 스킬 + pre-commit`

**구체화 (spec 003-verification.md 작성 권장):**

### 3-A. `scripts/verify-data.mjs` 구현
- 모든 `data/companies/*.md` 파일 스키마 검증 (frontmatter 필수 필드, mcap≥100, modality enum, 날짜 형식)
- `catalysts.md` ticker 존재 검증, 중복 체크
- `conferences.md` id 유일성 + 날짜 형식
- 90일 지난 `verified` 경고 (실패 X)
- `npm run verify-data` 단독 실행 + `npm run check`에 통합

### 3-B. pre-commit hook
- `husky` + `lint-staged` 또는 단순 `.git/hooks/pre-commit` 스크립트
- 커밋 전 `npm run check` 자동 실행 → 실패 시 커밋 차단
- 검증 항목: lint + verify-data (typecheck/test는 추후)

### 3-C. `verify-data` 스킬 (선택, 사실관계 교차검증)
- 코드 검증과 별개로 Claude가 종목별 사실 확인 (mcap·sources URL alive·핵심 사실 일치)
- 정기 호출보다는 신규 종목 추가 시 1회 호출 패턴

### Phase 3 완료 조건
- [ ] `npm run verify-data` 통과 (현 396개 종목 + 44 catalysts + 24 conferences)
- [ ] `npm run check` 통합
- [ ] pre-commit hook 작동 확인 (잘못된 데이터 push 차단)
- [ ] CLAUDE.md "데이터 변경 후 항상 npm run check 통과" 룰이 강제됨

---

## Phase 4 — 주가 그래프 ✅ (2026-04-28)

**spec:** `specs/004-prices.md` (Approved 2026-04-28)

### 완료
- [x] **데이터 소스**: Alpha Vantage(일 25콜)로는 부족 → **Yahoo Finance (`yahoo-finance2` v3.14.0)**로 변경 (키 불필요)
- [x] `scripts/fetch-prices.mjs` 작성 (인자: `--tickers` / `--stale-days` / `--limit` / `--dry-run`)
- [x] `data/prices/{TICKER}.json` 캐시 형식 (`{ticker, fetched, source, currency, data:[{date, close}]}`)
- [x] `scripts/build-data.mjs` prices 병합 (이미 forward-compatible 코드 있어 추가 작업 0)
- [x] `src/components/Sparkline.jsx` (순수 SVG polyline, trend별 색상)
- [x] `CompanyDetail.jsx`에 PriceBox 통합 — 카탈리스트 박스 아래, "30일 주가 $현재가 ▲/▼ 등락률" + sparkline + fetched 날짜
- [x] CompanyRow / CatalystRow → CompanyDetail로 `priceCache` prop 흐름 연결
- [x] dev 서버 시각 확인 (LLY: $882.43 ▼ -10.8%, sparkline 정상)
- [x] `.claude/skills/update-prices/SKILL.md` 작성 (`/update-prices` 호출 가능)
- [x] **전체 398종목 1차 fetch 완료** — 396 success, 2 skip(ORCA·RNAM, 이후 종목 자체 삭제)
- [x] `npm run check` 통과 (errors 0, warnings 327, info 11)
- [x] HANDOFF.md §8 정정 (Alpha Vantage → Yahoo)
- [x] CLAUDE.md `update-prices` (미구현) 표시 제거
- [x] `.env.local`의 `VITE_ALPHA_VANTAGE_KEY` 삭제

### 결정사항 (spec 004 §6 그대로 채택)
- 차트: 순수 SVG (recharts 미사용 — package.json에서 제거 후보)
- CompanyRow에 mini sparkline: v1 X
- prices/*.json: git 커밋 (~600KB 빌드 산출물)
- 캐시: close만 저장 (OHLCV 전체 X)
- 자동화: Phase 7 이후

### 미해결 / 다음
- ~~ORCA·RNAM 종목~~ 데이터 완전 삭제 완료 (2026-04-28).
- ~~recharts 의존성~~ 제거 완료 (2026-04-28, `npm uninstall recharts`).
- ~~legacy/ 폴더~~ 삭제 완료 (2026-04-28). eslint.config.js의 `globalIgnores`에서도 제거.
- ~~spec 003 §3-C verify-data 스킬~~ 작성 완료 (2026-04-28).
- ~~Phase 5 / Phase 7~~ 둘 다 보류·폐기. 자세한 내용은 위 Phase 표 참조.

---

## UI 개편 (2026-04-28, Phase 4 직후 ad-hoc)

사용자가 종목 디테일 가독성에 불만 → reference 스크린샷 기반으로 `CompanyDetail.jsx` 재구조화.

### 적용
- **폰트:** Pretendard CDN (`index.html`) + tailwind `sans` family에 `Pretendard Variable`/`Pretendard` 우선
- **마크다운 인라인 렌더** (`src/utils/inlineMarkdown.jsx`):
  - `**bold**`, `[text](url)`, naked URL → JSX
  - **NCT 번호 자동 링크** (`NCT\d{6,9}` → `clinicaltrials.gov/study/...`, font-mono + accent-blue underline) — bold 안에서도 매칭
- **블록 렌더** (`renderBody`):
  - `- 라벨: 값` 마크다운 list → 라벨/값 row (하이픈 제거)
  - 들여쓰기 sub-line은 직전 list item에 흡수
  - sub-line 가진 list (예: 사전 공개 임상) → **각 item이 sub-card**로 분리
  - 짧은 라벨:값(라벨≤12자, 값≤32자)은 데스크톱에서 **3-col grid**, 긴 row는 풀 width
  - 한 줄 + 전체 bold 단락 → sub-헤더 (text-accent-blue)
- **CompanyDetail 박스 구조** (`src/components/CompanyDetail.jsx`):
  - SectionBox: 컬러바 + 아이콘 + 타이틀, sub-grid로 FieldCard 배치
  - 섹션별 컬러: 기업 프로필=녹 / 임상 정보=청 / 약물 정보=보라 / 메모=녹
  - 약물 정보 SectionBox에 `subtitle` prop — Modality 첫 줄(`**약물명**`) 추출해서 헤더 옆 인라인 (`extractBoldHeader` / `stripBoldHeader`)
  - FieldCard: 일부 필드(`회사 개요`, `상업화 제품`, 모든 임상/약물 필드)는 `wide` → 풀 width

### 결과
- `-` 하이픈 노출 사라짐, NCT 외부 링크 활성, 섹션 시각 구분 명확
- 데스크톱 폭에서 임상 디자인의 짧은 필드(Phase / N / Arm)는 3-col, 긴 필드(Study 유형, Primary/Secondary endpoint)는 풀 row
- 사전 공개 임상 list가 임상명별 sub-card로 분리되며 NCT 클릭 가능

### 미적용 (의식적 제외, 사용자 결정)
- chip 변환 (Modality·Phase·area 칩화) — v2 후보
- Endpoint 컬러 점/이모지 (🎯/📌) — v2 후보

### 영향 파일
- `index.html`, `tailwind.config.js`, `src/utils/inlineMarkdown.jsx` (신규 + renderBody/extractBoldHeader/stripBoldHeader 추가), `src/components/CompanyDetail.jsx` (전면 재작성), `src/components/Sparkline.jsx` (이전 Phase 4)

---

## 미해결 메모

- `recharts` 의존성 깔렸으나 미사용 (직접 SVG로 막대 그렸음). Phase 4 sparkline에 쓸지 결정 필요.
- 학회 발표 매칭은 현재 catalyst의 `event` 텍스트 + `conferenceId` 필드 우선. spec 001에 conferenceId 추가됨, 신규 catalyst는 채워 넣을 것.
- 학회 21개에 발표 기업 정보 비어있음 — 데이터 채우기는 별도 작업 (Phase 3-7과 직교).
- `/update`, `/update-company`, `/add-catalyst` 스킬은 다음 세션부터 인식됨 (스킬은 세션 시작 시 한 번 스캔).
- ESLint legacy 폴더 ignore 처리됨.
- ~~**ORCA**~~: 2026-04-28 종목 자체 데이터에서 완전 삭제. legacy/data.js에는 흔적 남아있으나 무관(legacy는 마이그레이션 1회용).

## 진행 중 — Phase 3 (검증 시스템)

**spec:** `specs/003-verification.md` (Approved 2026-04-27)

### 완료
- [x] **mini-task (§6-α)** — 임상/약물 섹션 마이그레이션 보강
  - spec 001 modality enum 14종으로 갱신, 선택 헤딩 7종 정의
  - `scripts/patch-add-trial-drug-sections.mjs` 작성·실행
  - 20/20 종목 패치 (ORCA 포함했으나 ORCA는 이후 삭제됨)
  - `npm run build-data` 통과, `data.generated.json`에 새 키 17개 정상 반영
  - idempotent 동작 확인 (재실행 시 모두 skip)

### 완료 (cont.)
- [x] **3-A** `scripts/verify-data.mjs` 작성 (3단계: error/warning/info, `--verbose`/`--json` 플래그)
- [x] `npm run verify-data`, `npm run check` 통합 (package.json)
- [x] 첫 실행 결과: errors 7, warnings 326, info 11
- [x] 7개 진짜 error 1차 정리:
  - ABUS.md modality `siRNA` → `RNA/siRNA`
  - CAMP.md modality `RNA` → `RNA/siRNA`
  - CGON.md recommendation `Watching` → `Worth Monitoring`
  - LNTH.md 신규 생성 (legacy/data.js initialCatalystEvents에만 있고 watchlist 누락 종목, mcap 임시 10000, sources 비어있음)
  - catalysts.md에서 AACR·ASCO 학회-단위 행 2건 삭제 (학회는 conferences.md가 담당, catalyst 모델은 종목 단위)
- [x] 정리 후 검증 통과: errors 0, warnings 327, info 11, exit 0
- [x] 데이터 변동 빌드 반영: companies 397→398, catalysts 44→42

### 완료 (cont.)
- [x] **3-B** git init (main branch) + husky 9.1.7 설치 + `.husky/pre-commit` = `npm run check`
- [x] husky `prepare` 스크립트 자동 추가, `core.hooksPath = .husky/_` 설정 확인
- [x] 음의 테스트: ZZZZ.md(mcap=50) 만들어 commit 시도 → hook 차단(`pre-commit script failed (code 1)`) → ZZZZ.md 삭제 → `git log` empty 확인 → verify-data 재통과
- [x] CLAUDE.md "절대 하지 말 것"에 `--no-verify` 우회 금지 룰 추가
- [x] **첫 commit은 만들지 않음** (사용자 확인 룰)

### Phase 3 종료 ✅ (mini-task + 3-A + 3-B 완료)
- 검증 시스템 전 부품 작동: `npm run verify-data` / `npm run check` / pre-commit hook
- 현 데이터 상태: companies 398, catalysts 42, conferences 24, errors 0
- working tree에 다수 untracked 파일 존재 — 사용자가 적절한 시점에 첫 commit

### 다음
- [x] **3-C** `verify-data` 스킬 — 작성 완료 2026-04-28 (`.claude/skills/verify-data/SKILL.md`). spec 003 §4 준수. mcap 재확인 + sources alive + 본문 sanity check 3단계, 자동 수정 X.
- ~~Phase 7 Vercel 연결~~ → **폐기 (2026-04-28)**. 로컬 전용 결정.

---

## Phase 5 (임포트) — 보류 (2026-04-28)

**spec:** `specs/005-imports.md` (Deferred, rev 3)

사용자 결정으로 **텔레그램·네이버·웹 Import 모두 보류**. 본문은 보존 — 미래 재개 시 출발점.

보류 결정 배경:
- 텔레그램: "필요해지면 나중에"
- 네이버: "나중에"
- 웹 Import 버튼: 옵션 (B) "전체 보류, 데이터 추가는 Claude Code 스킬로만"

따라서 다음 룰은 원안 유지:
- 페이지 4개, 헤더에 검색·필터만
- "데이터 추가는 Claude Code를 통해서만, 웹 UI에 추가 버튼 없음"
- import-telegram / import-naver 스킬은 (보류) 표기

재개 시 참조: spec 005 §2 (Telegram 하이브리드), §3 (Naver cleanup-only), §11 (자동화 예고), §12 (웹 Import UI 모드 5개).

---

## 보조 문서 갱신 (2026-04-28 rev 3)
- [x] `specs/005-imports.md` — Deferred 표기, rev 3 메모
- [x] `CLAUDE.md` — Import 버튼 룰 되돌림, 원안 ("데이터 추가는 Claude Code로만") 복원, import-* 스킬 (보류) 표기
- [x] `HANDOFF.md` — 정정 노트 갱신 (§1 #7/#10/#12, §6, §9), §9 Obsidian 단락 폐기 표기, §10 Phase 표 정리
- [x] `working-notes.md` (이 파일) — Phase 표 rev 3, Phase 5 보류, Phase 6 삭제
- [ ] `specs/001-data-layer.md` — Obsidian 언급 정리

---

## 새 세션 시작 메시지 템플릿

```
Bio Catalyst Calendar 작업 이어서.
specs/working-notes.md 먼저 읽고, 거기 기록된 다음 권장 Phase 진행해줘.
HANDOFF.md의 Phase 표가 정본.
```

또는 특정 Phase 지정:
```
Phase 3 (검증 시스템) 진행. specs/working-notes.md 참고.
먼저 specs/003-verification.md 초안 작성하고 사용자 승인 받은 뒤 구현.
```
