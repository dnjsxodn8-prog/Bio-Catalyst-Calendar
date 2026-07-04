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

---

## 2026-06-20 자동 스윕 — 사용자 검토 필요

**실행 시간:** 2026-06-20 일요일 자동 루틴
**적용 항목:** 9건 (자동승인 기준 통과)
**스킵 항목:** 3건 (아래 상세)

### 자동 적용 완료

| Tier | Ticker | 항목 | 결과 |
|---|---|---|---|
| A | SYRE | SPY002 SKYLINE Ph2 UC 유도(12주) 1차 충족 | outcome: met (8-K) |
| A | MBX | Canvuparatide AVAIL Ph2 1년 OLE 전체 결과 | outcome: met (BioSpace IR) |
| B | KYTX | Miv-cel EULAR 2026 ACPA+ 불응성 RA Ph1 | 신규 추가 (GlobeNewswire) |
| B | RYTM | Setmelanotide PWS ENDO 2026 Ph2 인터림 | 신규 추가 (GlobeNewswire) |
| B | JAZZ | Zepzelca LAGOON Ph3 2L SCLC OS 미충족 | 신규 추가 (PRNewswire) |
| B/C | GILD | Yeztugo 경구 lenacapavir HIV PrEP PDUFA 2027-02-02 | 신규 추가 (gilead.com IR) |
| A | ELVN | ELVN-001 ENABLE Ph1 CML EHA 2026 — outcome 갱신 | outcome: met |
| A | AGIO | Mitapivat RISE UP Ph3 SCD EHA 2026 Plenary — outcome 갱신 | outcome: met |
| A | COGT | Bezuclastinib APEX Ph2 AdvSM EHA 2026 — outcome 갱신 | outcome: met |

### 스킵 항목 (사용자 검토)

**1. KURA — KOMET-007 EHA 2026 결과**
- 내용: Tipifarnib R/R EBV+ PTLD Phase 2 — ORR ~60% 발표 (EHA 2026)
- 스킵 이유: 출처가 Quiver Quantitative(2차 매체)만 확인됨. 회사 IR(kura-oncology.com) 또는 GlobeNewswire/BusinessWire 공식 보도자료 미확인.
- 권장 조치: KURA IR 페이지에서 EHA 2026 보도자료 직접 확인 후 추가 여부 결정.

**2. MRK — WELIREG + KEYTRUDA RCC 가속승인 전환 FDA 승인**
- 내용: Belzutifan + Pembrolizumab RCC 1L 가속승인→정규승인 (또는 새 조합 승인)
- 스킵 이유: 제공된 URL(merck.com)이 RCC가 아닌 두경부편평세포암(HNSCC) + PADCEV 병용 관련 페이지였음. URL-내용 불일치 → 추측 추가 금지 원칙 적용.
- 권장 조치: merck.com IR에서 RCC 관련 2026년 6월 FDA 승인 보도자료 URL 확인 후 재시도.

**3. AAIC 2026 날짜/장소 불일치 가능성**
- 현재 conferences.md: AAIC 2026 = 2026-07-26 to 2026-07-30, Toronto, Canada
- 리서치 중 찾은 정보: 일부 소스에서 AAIC 2026 = 2026-07-12 to 2026-07-15, London, UK 언급
- 스킵 이유: 공식 AAIC 사이트 URL 없이 날짜/장소 변경 불가 (conferences.md 변경은 데이터 신뢰도에 영향).
- 권장 조치: alz.org/aaic 공식 사이트에서 날짜·장소 확인 후 conferences.md 수정 여부 결정.

---

## 2026-06-23 전체 데이터 백필 (무인 야간 Workflow) — 검토 대기 (미커밋)

**작업:** 표준 헤딩 누락 종목 184개를 웹 리서치로 프로필 채우기 + 6/20 스윕 스킵 3건 검증.
**방식:** `scripts/overnight_fill.workflow.js` (Workflow 오케스트레이터, 에이전트 1명=종목 1파일, no-fabrication·실제 fetch한 출처만 추가·세션 Opus 상속). 한도 리셋·토큰 분산 위해 3개 런으로 분할 실행(117 → +34 → +33).

**결과:**
- **종목 프로필 184/184 채움** (전부 `verified: 2026-06-23`). `npm run build-data` OK, `verify-data` ERRORS 0 (warnings 158·info 185는 기존과 동일 — info=비해당 표준헤딩 의도적 생략이라 정상).
- **스킵 3건 판정:**
  - **MRK** ✅ 반영 — WELIREG(belzutifan)+KEYTRUDA 보조요법 ccRCC FDA 정규승인 2026-06-12 (fda.gov+merck.com 공식 2개). 근거 LITESPARK-022(NCT05239728, n=1,841, DFS HR 0.72). 6/20 당시 URL은 HNSCC+PADCEV 오링크였고 실제는 신규 보조 ccRCC 승인. catalysts.md에 추가(type: Regulatory).
  - **AAIC 2026** ✅ 정정 — 공식 aaic.alz.org 기준 **2026-07-12~15, London, UK** (기존 7-26~30 Toronto는 오류). conferences.md 수정.
  - **KURA** ❌ 기각 — KOMET-007은 ziftomenib(menin 억제제) AML 시험이지 tipifarnib EBV+ PTLD 아님. 원 의심대로 2차매체 혼동 정보 → 추가 안 함(no-fabrication).

**품질 메모:** 에이전트들이 잘못된 기존 데이터도 다수 교정(RNA=BMS 심혈관 딜 누락 보강, ACET=미확인 Regeneron/CRISPR 파트너 제거, SHPH=Dogecoin 채굴사 전환 반영 등). 출처 불명 수치는 의식적으로 제외.

**커밋 정책:** 전부 미커밋 — 사용자 검토 대기. 검토 후 `/deploy`. 변경=종목 184 + catalysts.md + conferences.md + 재생성된 data.generated.json.

**남은 과제:** ① 학회 발표기업 정보 비어있음(데이터 모델이 catalyst의 conferenceId 매칭이라 별도 작업) ② bcc-news-feed/data/conferences.md에도 동일 AAIC 오류 잔존(별도 레포라 미수정).

---

## 2026-06-27 자동 스윕 — 사용자 검토 필요

**실행 시간:** 2026-06-27 일요일 자동 루틴 (무인 모드)
**자동 적용:** 4건 (strict 자동승인 기준 통과)
**스킵:** 6건 (아래 상세)

### 자동 적용 완료

| Tier | Ticker | 항목 | 출처 |
|---|---|---|---|
| A | IONS | Olezarsen TRYNGOLZA® FDA 승인 2026-06-24 (PDUFA 6일 조기) — sHTG 급성 췌장염 위험 감소 최초 치료제 | businesswire.com 공식 IR + ir.ionis.com |
| A | VRDN | Veligrotug Lumvoa™ FDA 승인 2026-06-25 (PDUFA 5일 조기) — TED(갑상선안병증) | businesswire.com 공식 IR |
| A | WVE | WVE-007 Phase 1 INLIGHT 완료 확인 (2026-06-24 Phase 2a 개시) | globenewswire.com 공식 IR |
| C | NUVL | Neladalkib ALK+ NSCLC NDA PDUFA 2026-11-27 신규 등록 (Priority Review + BTD) | investors.nuvalent.com 공식 IR |

### 스킵 항목 (사용자 검토 권장)

**1. EVMN — EVO756 CSU Phase 2b topline 데이터**
- 내용: Evommune EVO756 CSU(만성 자발두드러기) Phase 2b 결과 Q2 2026 예정
- 스킵 이유: 공식 IR 보도자료 미확인 (검색으로 발견되지 않음). 데이터가 아직 발표되지 않았거나 아직 검색 인덱싱이 안 된 상태 가능성.
- 권장 조치: ir.evommune.com에서 Phase 2b CSU 결과 직접 확인.

**2. SION — SION-719 PreciSION CF Phase 2a 데이터**
- 내용: CF Phase 2a 결과 여름 2026 예정 (등록 완료 2026-04-27)
- 스킵 이유: 데이터 미발표. 검색 결과에서 결과 보도자료 없음.
- 권장 조치: 여름(7~8월) 확인 예정.

**3. NUVL — GSK의 Nuvalent 인수 ($10.6B, 2026-06-09)**
- 내용: GSK가 Nuvalent 전체 인수 합의 발표 (neladalkib + zidesamtinib 둘 다 획득)
- 스킵 이유: 기업 이벤트(M&A)로 카탈리스트(임상/규제)가 아님. NUVL 회사 파일 업데이트 필요할 수 있음.
- 권장 조치: data/companies/NUVL.md에 GSK 인수 딜 메모 추가 고려. 승인 완료 시 ticker가 NUVL→GSK로 통합될 수 있어 주의.
- 출처: endpoints.news/gsk-to-acquire-nuvalent-and-its-two-cancer-drugs-under-fda-review-for-10-6b/

**4. LLY — ACHIEVE Phase 3 T2D (Foundayo 오르포글리프론 당뇨) ADA 2026 발표 (2026-06-08)**
- 내용: ACHIEVE 3개 Phase 3 시험에서 Foundayo가 T2D에서 oral semaglutide 대비 우월성 확인 (ADA 86차 Scientific Sessions). ACHIEVE-3: Foundayo > oral semaglutide.
- 스킵 이유: NCT 번호 미검증. 비만 NDA는 이미 승인됐으나 T2D는 별도 NDA 예정. 신규 catalysts.md 항목 추가에는 NCT 4가지 기준 확인 필요.
- 권장 조치: investor.lilly.com에서 ACHIEVE 시험 NCT 번호 확인 후 카탈리스트 추가 여부 결정.
- 출처: investor.lilly.com (IR)

**5. LLY — 레타트루타이드 Phase 3 (TRIUMPH-1, TRANSCEND-T2D-1) ADA 2026 발표 (2026-06-08)**
- 내용: 리타트루타이드(GLP-1/GIP/글루카곤 삼중작용제) Phase 3 데이터 발표. 체중감소 + A1C + 무릎 골관절염 통증 + 폐쇄성 수면무호흡 개선.
- 스킵 이유: 현재 추적 중인 LLY catalysts에 없는 신규 약물. NCT 검증 필요.
- 권장 조치: investor.lilly.com IR에서 NCT 번호 확인 후 추가 여부 결정. Phase 3이므로 등록 가치 높음.
- 출처: investor.lilly.com (IR) + biospace.com

**6. IMNM — Varegacestat NDA PDUFA 날짜**
- 내용: NDA 2026-04-29 제출됨. FDA 접수·PDUFA 날짜 아직 미확인.
- 스킵 이유: 공식 IR에서 PDUFA 날짜 확인 불가. FDA acceptance letter 미확인.
- 권장 조치: investors.immunome.com에서 NDA acceptance 보도자료 확인 후 PDUFA 날짜 등록.

---

## 2026-07-04 자동 스윕 - 사용자 검토 필요

자동 스윕 실행 결과. 아래 항목은 자동 승인 룰 미달 또는 판단 필요로 스킵됨.

**적용된 항목 (5건):**
- ARQT 2026-06-29 ZORYVE sNDA → outcome: approved (FDA 6/29 승인)
- EVMN 2026-06-30 EVO756 Phase 2b CSU → outcome: failed (1차 endpoint 미충족)
- VRTX 2026-07-01 CASGEVY sBLA 소아 2세+ → 신규 항목 추가 (outcome: approved)
- CAPR 2026-07-29 Deramiocel AdCom CTGTAC → 신규 항목 추가
- OTLK 2026-07-29 LYTENAVA BLA PDUFA → 신규 항목 추가

---

**스킵 항목 1: BIIB diranersen CELIA Phase 2 AAIC 2026 발표 (2026-07-14)**
- 내용: diranersen(BIIB080) tau-ASO Phase 2 CELIA 연구 최종 결과. 1차 endpoint(CDR-SB dose-response) 미충족. 그러나 tau biomarker 감소 + 일부 인지 benefit 관찰. Biogen Phase 3 진행 결정.
- AAIC 2026 oral session 예정: July 14, 2:00–3:30 PM BST, London
- 스킵 이유: (1) 1차 endpoint 미충족 — mixed result로 단순 "Conference" 카탈리스트 추가 시 오해 소지. (2) CELIA 결과 발표는 이미 2026-05-14에 topline IR이 있었으나 catalysts.md에 없음. 두 이벤트(topline + AAIC 발표) 모두 미등록 상태. 사용자 판단 필요.
- 권장 조치: (A) AAIC 2026 conference 카탈리스트 추가 (conferenceId: aaic, date: 2026-07-14), 또는 (B) topline 발표일(2026-05-14) 소급 추가. 1차 endpoint 미충족 표기 필요.
- 출처: https://investors.biogen.com/news-releases/news-release-details/biogen-highlight-breadth-alzheimers-disease-portfolio-aaic-2026 (company IR ✅)

**스킵 항목 2: MRNA MFLUSIVA 별도 PDUFA 항목 (2026-08-05)**
- 내용: MFLUSIVA(mRNA-1010) 독감백신 FDA 최종 결정 PDUFA 날짜 2026-08-05. 현재 catalysts.md에는 VRBPAC 자문위(2026-06-18, outcome: met 9-0) 항목만 존재. 별도 PDUFA 결정 날짜 항목이 없음.
- 스킵 이유: Moderna IR에서 "PDUFA date August 5" 독립 보도자료 확인 불가. 전문 미디어(BiopharmaInternational) 인용만 확인. 자동 승인 규칙 "회사 IR 또는 FDA 공식 페이지" 미충족.
- 권장 조치: investors.modernatx.com에서 Q1 2026 실적 발표 또는 FDA acceptance 보도자료 중 "August 5" PDUFA 날짜 언급 확인. 또는 FDA 캘린더 직접 확인.
- 출처: 전문 미디어 기사만 (자동 승인 불가 기준)

**스킵 항목 3: LLY Foundayo(orforglipron) T2D Phase 3 ACHIEVE (ADA 2026)**
- 내용: 이전 스윕에서 이미 스킵됨 (NCT 검증 필요). 지속 스킵.
- 권장 조치: investor.lilly.com에서 ACHIEVE NCT 번호 확인.

**스킵 항목 4: LLY 레타트루타이드(retatrutide) Phase 3 TRIUMPH-1/TRANSCEND (ADA 2026)**
- 내용: 이전 스윕에서 이미 스킵됨 (NCT 검증 필요). 지속 스킵.
- 권장 조치: investor.lilly.com에서 NCT 번호 확인 후 추가 여부 결정.
