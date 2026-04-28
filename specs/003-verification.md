# Spec 003: Verification System

**상태:** Approved (2026-04-27)
**작성일:** 2026-04-27
**관련 요구사항:** 3번 (검증 시스템), 4번 (mcap≥100), 5번 (코드/데이터 분리 강제)
**선행:** spec 001 (data layer), spec 002 (ui)
**참조:** HANDOFF.md §5, working-notes.md §"Phase 3 — 검증 시스템"

---

## 목표

데이터(`data/`)가 항상 일관·신뢰 가능한 상태로 유지되도록 강제한다.

1. 사람이 잘못된 frontmatter를 커밋하지 못하게 막는다 (스키마 위반·mcap<100·날짜 형식 등).
2. catalyst의 ticker가 companies에 존재하는지, conferenceId가 conferences에 존재하는지 등 **참조 무결성**을 강제한다.
3. CLAUDE.md의 "데이터 변경 후 항상 `npm run check` 통과" 룰이 빈말이 아니라 실제 차단으로 작동하게 한다.
4. 신규 종목 추가 시 Claude가 사실관계까지 교차검증할 수 있는 절차를 둔다 (선택).

## 비-목표

- 종목 사실 정확도 자동 보증 (사람·web 검색 필요 — 그래서 3-C는 선택).
- 외부 API alive check (URL 헤드 요청 등). 일단 없음. 나중에 옵션으로.
- 데이터 자동 수정 (verify는 진단만 하고, 수정은 사람/스킬이 한다).

---

## 0. 현재 데이터 상태 진단 (spec 작성 시점 2026-04-27)

검증 정책 설계 전 실제 데이터를 한 번 훑은 결과:

| 검사 | 결과 |
|---|---|
| companies 파일 수 | **396개** |
| catalysts 이벤트 수 | **44개** |
| conferences 수 | **24개** |
| sources URL 1개 이상 갖는 companies | 61 / 396 (= **335개가 비어있음**) |
| sources URL 1개 이상 갖는 catalysts | **0 / 44** (전부 비어있음) |
| 실제 사용된 modality 값 | 14종 (spec 001 enum 10종 + `Tool/Platform`, `Diagnostic`, `Biologic`, `Protein/Enzyme`, 그리고 `siRNA`/`RNA/siRNA` 중복) |
| 실제 사용된 recommendation 값 | 3종 — spec 001 enum과 일치 |

**함의:** spec 001의 검증 항목을 **있는 그대로 error로 강제하면 첫 실행에서 즉시 실패**. 검증 시스템이 켜지자마자 무력화될 위험. 따라서 검증 항목에 **error / warning / info의 3단계** 분류를 도입하고, 데이터 백필 진행에 따라 warning을 error로 승격하는 전략을 쓴다.

**spec 001과의 충돌 해소:**
- modality enum: 실제 14종을 enum으로 확정 (`siRNA`는 `RNA/siRNA`로 정규화 권장 — 데이터 측 수정으로). spec 001을 갱신할지는 결정 필요 (오픈 이슈 1).
- sources: company는 "sources 비어있음 = warning"으로 시작, 추후 error 승격. catalyst는 "sources 비어있음 = info"로 더 약하게. (오픈 이슈 2)

---

## 1. 전체 구조

```
npm run check
   ├─ npm run lint              (ESLint)
   ├─ npm run verify-data       (← 이 spec)  ← 3-A
   └─ (typecheck, test 추후)

git commit
   └─ pre-commit hook  ← 3-B
       └─ npm run check 호출
           └─ 실패 시 커밋 차단

Claude Code 신규 종목 추가
   └─ /verify-data 스킬  ← 3-C (선택)
       ├─ npm run verify-data 실행 (= 3-A 호출)
       └─ web 사실관계 교차검증
```

---

## 2. 3-A: `scripts/verify-data.mjs`

### 2.1 입력

`data/companies/*.md`, `data/catalysts.md`, `data/conferences.md`, `data/prices/*.json`.

### 2.2 검증 항목

**E = error (검증 실패, exit 1)**, **W = warning (출력만, exit 0)**, **I = info (count만)**.

#### Companies

| 항목 | 단계 | 비고 |
|---|---|---|
| frontmatter 파싱 실패 | E | gray-matter 예외 |
| 필수 필드 누락 (`ticker`/`company`/`mcap`/`modality`/`areas`/`recommendation`/`verified`) | E | `nextCatalyst`/`sources`는 비필수 필드 (값 비어도 OK, 단 별도 W) |
| `ticker` 파일명과 불일치 (`LLY.md` ≠ `ticker: LLLY`) | E | |
| `ticker` 중복 (두 파일에 같은 ticker) | E | |
| `mcap < 100` | E | 요구사항 4번 |
| `mcap` 정수 아님 / 음수 / NaN | E | |
| `modality` enum 위반 | E | enum = 아래 §2.3 |
| `recommendation` enum 위반 (`Core Holding`/`Worth Monitoring`/`Speculative`) | E | |
| `areas` 비어있음 / 배열 아님 | E | |
| `verified` 날짜 형식 (YYYY-MM-DD) 위반 | E | |
| `nextCatalyst` 날짜 형식 위반 (null·생략은 OK) | E | |
| `verified` > 90일 전 | W | 요구사항대로 fail은 아님 |
| `sources` 비어있음 또는 누락 | W | (현재 데이터 335개 fail 회피) |
| `sources` 항목이 URL 형식 위반 (`http(s)://...` 아님) | E | 비어있는 건 위 W로 처리, **있는데 형식 틀린 것**만 E |
| body의 정해진 헤딩 누락 (`## 카탈리스트` 등) | I | build-data.mjs는 전부 optional이라 깨지지 않음 |

#### Catalysts (`data/catalysts.md`)

| 항목 | 단계 | 비고 |
|---|---|---|
| yaml 블록 파싱 실패 | E | |
| 이벤트 필수 필드 누락 (`date`/`ticker`/`event`/`type`/`company`) | E | |
| `date` 형식 위반 | E | |
| `type` enum 위반 (`PDUFA`/`Conference`/`Clinical Readout`/`Earnings`/`Regulatory`) | E | |
| `ticker`가 `data/companies/{TICKER}.md`에 없음 | E | 참조 무결성 |
| `conferenceId` 있는데 conferences.md에 그 id 없음 | E | 참조 무결성 |
| 같은 (date, ticker, event) 3-tuple 중복 | E | |
| `sources` 비어있음 | I | 현재 44/44 비어있음. 일단 정보성. |
| `sources` 형식 위반 (URL이 아님) | E | |

#### Conferences (`data/conferences.md`)

| 항목 | 단계 | 비고 |
|---|---|---|
| yaml 블록 파싱 실패 | E | |
| 필수 필드 누락 (`id`/`name`/`dates`/`tier`/`areas`) | E | |
| `id` 중복 | E | |
| `tier` enum 위반 (`Tier 1`/`Tier 2`/`Tier 3`) | E | |
| `dates` 형식 위반 (`YYYY-MM-DD to YYYY-MM-DD` 또는 `YYYY-MM-DD` 단일) | E | |
| `areas` 비어있음 | E | |

#### Prices (`data/prices/*.json`)

| 항목 | 단계 | 비고 |
|---|---|---|
| JSON 파싱 실패 | E | |
| `ticker` 필드 누락 | E | |
| `ticker`가 companies에 없음 | W | 이전 종목의 캐시일 수 있음 |
| `data` 배열 30일 초과 | W | 자동 자르기 대상 |
| `data` 항목의 `date`/`close` 형식 위반 | E | |

### 2.3 modality enum (확정안)

현재 데이터에 실제 등장하는 값 기반으로:

```
Small Molecule, Antibody, Peptide, mRNA, RNA/siRNA, Gene Therapy,
Cell Therapy, ADC, Bispecific, Biologic, Protein/Enzyme,
Tool/Platform, Diagnostic, Other
```

`siRNA` (단독)는 `RNA/siRNA`로 정규화 (데이터 측 수정. 별도 작업으로 분리, 이 spec에 포함 X).

spec 001의 enum 목록도 함께 갱신 필요 (오픈 이슈 1).

### 2.4 출력 포맷

```
🔍 verify-data
  companies:    396 files
  catalysts:    44 events
  conferences:  24 entries
  prices:       12 caches

❌ ERRORS (3)
  data/companies/XYZ.md: mcap=80, must be ≥ 100
  data/companies/ABC.md: modality "Bio" not in enum
  data/catalysts.md[12]: ticker "ZZZZ" not found in companies/

⚠ WARNINGS (337)
  data/companies/A.md: sources empty
  data/companies/AAPG.md: verified 2025-12-01 is 147 days old
  ... (335 more, --verbose to see all)

ℹ INFO (44)
  data/catalysts.md[*]: 44 events have empty sources

✗ FAILED (3 errors)
```

- 정상 종료(0 errors)면 exit 0, 그 외 exit 1.
- `--verbose` 플래그: warning 전체 출력.
- `--json` 플래그: JSON으로 출력 (CI/스킬용).

### 2.5 npm scripts 통합

```json
{
  "scripts": {
    "verify-data": "node scripts/verify-data.mjs",
    "check": "npm run lint && npm run verify-data",
    ...
  }
}
```

`predev`/`prebuild`에는 추가 X (build-data만 돌리면 됨, verify는 명시적 호출).

---

## 3. 3-B: pre-commit hook

### 3.1 선택지

**(A) `husky` + `lint-staged`** — npm 의존성 추가, `.husky/pre-commit`에 스크립트.
**(B) 단순 `.git/hooks/pre-commit` 셸 스크립트** — 의존성 무료, 단 git clone 시 자동 설치 X.

**추천: (A) husky.** 이유:
- 사용자가 Claude Code를 새 환경(노트북/desktop)에서 돌리게 될 가능성 있음 — `.git/hooks/`는 자동 동기화 X.
- husky는 `npm install` 시 `.husky/`를 자동 활성화 (1인용이라 어차피 본인만 쓰지만 환경 전환 시 안전).
- `lint-staged`는 굳이 필요 없음 (전체 검증이 빠르므로). husky만 채택.

### 3.2 동작

```bash
# .husky/pre-commit
npm run check
```

검증 실패 시 커밋 차단. 사용자가 의식적으로 우회하려면 `git commit --no-verify` (CLAUDE.md에 "skip 금지" 룰이 이미 있음).

### 3.3 처음 켜는 시점

검증 시스템이 처음 활성화될 때 현재 데이터에 errors가 0이어야 한다. spec §0 진단상 errors는 거의 없음 (대부분이 W). 첫 실행 후 발견되는 진짜 error 들은 spec §완료조건의 "1차 정리" 단계에서 다룬다.

### 3.4 비-목표

- pre-push hook (필요 없음, 1인용)
- CI 워크플로 (Vercel 빌드가 verify-data를 자동 실행하지는 않음 — 빌드 시 build-data만 돌리고, 검증은 commit 시점에서 끝남)

---

## 4. 3-C: `verify-data` 스킬 (선택)

### 4.1 위치 / 트리거

`.claude/skills/verify-data/SKILL.md`. 사용자가 `/verify-data` 호출 또는 신규 종목 추가 직후 자동.

### 4.2 절차

1. `npm run verify-data --json` 실행 → 결과 파싱
2. 코드 검증 errors 0이 아니면 그것부터 사용자에게 보고하고 stop
3. 코드 검증 통과 시: 최근 7일 내 추가/수정된 종목 (git diff 또는 verified 필드로 식별)을 대상으로:
   - mcap을 web 검색으로 최소 1개 출처 재확인
   - sources URL이 alive 한지 (단순 fetch HEAD)
   - 종목 본문의 핵심 사실 (매출·상업화 제품 등)이 sources와 일관되는지 sanity check
4. 사실 불일치 발견 시 **자동 수정 X**, 사용자에게 보고만

### 4.3 비-목표

- 396종목 전체 매주 교차검증 (LLM 호출량·시간 과대)
- sources alive check를 코드(3-A)에 넣기 (네트워크 의존성, CI에 부적합)

### 4.4 우선순위

3-A, 3-B 끝나고 1주일 써본 뒤 결정. spec 003에서는 **인터페이스만 정의하고 구현은 별도 세션**.

---

## 5. 의존성

- `gray-matter` — 이미 있음
- `yaml` — 이미 있음
- `husky@^9` — 추가
- (3-C 한정) Claude의 web search

---

## 6. 결정 사항 (2026-04-27 사용자 승인)

1. **modality enum: (가) 14종 인정.** §2.3의 enum을 spec 001에도 반영. `siRNA`(단독)는 별도 데이터 정리 작업으로 `RNA/siRNA`에 통합.
2. **catalyst sources: (가) info 유지.** 0/44 상태에서 강제 X. 추후 hybrid (Conference/Clinical Readout만 W) 검토.
3. **company sources 승격 일정: 일단 W 유지, 시점 미정.** mcap 상위 백필 진행에 따라 후속 spec에서 결정.
4. **pre-commit: husky 채택.**
5. **verified > 90일: W 유지.** 90일 시점 재검토.
6. **3-C 스킬: 인터페이스만 spec 003에 정의, 구현은 1주일 후 별도 세션.**

## 6-α. spec 외 발견 이슈 (사용자 보고로 추가)

마이그레이션 스크립트(`scripts/migrate-from-legacy.mjs`)가 `legacy/data.js`의 `trialProfiles`(22종목)와 `drugProfiles`를 import하지 않아, 22개 종목의 임상·약물 정보가 통째로 누락됨. UI(`CompanyDetail.jsx`)는 7개 섹션(`임상 디자인`/`타겟 질환`/`기존 치료제`/`사전 공개 임상`/`Modality`/`MOA`/`논문`)을 표시하려 하지만 데이터가 비어 항상 빈 상태.

**처리: Phase 3 시작 전 mini-task로 끼워넣음.** §8 작업 순서 0번 항목으로 추가.

- spec 001의 본문 헤딩 목록에 7개 섹션 추가
- `scripts/patch-add-trial-drug-sections.mjs` 작성 (1회용 패치, 기존 본문 보존)
- 검증 측면: 7개 헤딩 누락은 **info 단계**로만 처리 (22종목만 의미 있고 나머지는 normal)

---

## 7. 완료 조건

### 3-A
- [ ] `scripts/verify-data.mjs` 작성
- [ ] §2.2 모든 검증 항목 구현
- [ ] `--verbose`, `--json` 플래그
- [ ] `npm run verify-data` 실행 시 현 데이터에 대해 errors=0 (warnings·info는 허용)
- [ ] errors > 0 케이스 1개 만들어서 exit 1 확인
- [ ] `npm run check`에 통합

### 3-B
- [ ] `husky` 추가
- [ ] `.husky/pre-commit`에 `npm run check`
- [ ] 의도적 잘못된 frontmatter 1개로 커밋 시도 → 차단 확인
- [ ] CLAUDE.md에 "검증 우회 금지(`--no-verify`)" 룰 강화 (이미 비슷한 문구 있음)

### 3-C (선택, 별도 세션)
- [ ] `.claude/skills/verify-data/SKILL.md`
- [ ] 신규 종목 1개 가지고 dry-run

### Phase 3 종료 (사용자 확인)
- [ ] 1차 정리: 검증 첫 실행에서 발견된 진짜 error들(데이터 자체 오류) 모두 수정
- [ ] working-notes.md "현재 상태" 업데이트, Phase 3 ✅ 표기
- [ ] spec 001 modality enum 업데이트 (오픈 이슈 1 결정 반영)

---

## 8. 작업 순서

0. **(mini-task) 임상·약물 섹션 마이그레이션 보강** — §6-α
   - spec 001 본문 헤딩 7종 추가
   - `scripts/patch-add-trial-drug-sections.mjs` 작성 + 실행
   - `npm run build-data` 후 UI 확인
1. 3-A 구현 (`scripts/verify-data.mjs` + `npm run verify-data` + `npm run check`) — 한 세션
2. 3-A 첫 실행 → 진짜 error 1차 정리 (있을 경우)
3. 3-B 구현 (husky + `.husky/pre-commit`) — 30분
4. working-notes.md 갱신 (Phase 3 ✅)
5. 3-C는 1주일 후 별도 세션

mini-task와 3-A를 한 세션에서 끝내는 것 권장. 3-C는 별도.
