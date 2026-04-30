---
name: update-company
description: Update body sections of an existing company markdown file. Use when the user asks to add or modify info on a tracked ticker (e.g. "LLY 매출 가이던스 업데이트", "JNJ 회사 개요 채워줘", "VRTX 메모 추가"). Do NOT use to create a new company file — use research-company instead.
---

# update-company

기존 종목의 `data/companies/{TICKER}.md` body 섹션을 업데이트한다.

## 입력

- `TICKER` (필수, 대문자)
- 변경할 섹션과 내용 (자연어 OK — 어느 섹션을 어떻게 바꿀지 판단)
- (선택) 출처 URL — frontmatter `sources`에 추가

## 절차

### 1. 파일 존재 확인

`data/companies/{TICKER}.md` 읽기.

없으면 즉시 종료:
> "이 종목은 아직 추적 대상이 아닙니다. `research-company {TICKER}` 스킬로 먼저 추가하세요."

### 2. 어떤 섹션을 어떻게 바꿀지 결정

사용자 요청에서 명확히 추출:
- 어느 헤딩? (아래 알려진 헤딩 참조)
- REPLACE인가 APPEND인가?
  - **REPLACE (기본):** "업데이트", "교체", "갱신", "X로 바꿔" 등
  - **APPEND:** "추가", "이어서", "메모로 남겨" 등 명시적 표현일 때만

모호하면 사용자에게 한 줄 질문. 임의로 여러 섹션 동시 변경 X.

### 3. 본문 수정

- 해당 `## 섹션` 헤딩 아래 본문만 수정
- 다른 섹션은 절대 건드리지 X
- "정보 미입력" 상태였다면 깨끗하게 새 내용으로 교체
- APPEND 모드면 기존 본문 끝에 빈 줄 + 새 줄 추가

### 4. frontmatter `verified` 갱신

`verified: YYYY-MM-DD`를 오늘 날짜로 변경.

다른 frontmatter 필드 (`mcap`, `modality`, `areas`, `nextCatalyst`)는 사용자가 명시적으로 요청한 경우만 수정.

> ⚠️ `nextCatalyst`는 카탈리스트 추가 시 자동 갱신되는 게 이상적임. 직접 수정 대신 `add-catalyst` 사용 권장.

### 5. sources 추가 (사용자가 출처 제공 시)

frontmatter `sources` 배열에 URL 추가. 중복 제거. 비어있던 배열을 채우는 건 환영.

**추가하기 전 liveness 검증 필수:**

```bash
node scripts/check-source-list.mjs <new-url1> <new-url2> ...
```

- 종료 코드 0 → 모두 alive. sources에 추가.
- 종료 코드 1 → 하나 이상 dead. **사용자에게 알리고 대체 URL 받거나 해당 source 제외.** 깨진 URL은 sources에 넣지 X.

(기존 sources는 다시 검증하지 않음 — 새로 추가되는 URL만 빠른 체크.)

### 6. 빌드 검증

```bash
npm run build-data
```

JSON 재생성 + yaml/markdown 파싱 오류 확인. 실패 시 원인 보고하고 사용자 결정 받기 (자동 롤백 X).

### 7. 요약 보고

한두 줄로 무엇을 바꿨는지 요약. 자동 git commit/push 금지.

## 알려진 본문 헤딩

빌드 스크립트 (`scripts/build-data.mjs`) + UI (`src/components/CompanyDetail.jsx`)가 파싱·표시하는 헤딩:

**기업 프로필 (PROFILE_FIELDS):**
- `## 카탈리스트`
- `## 회사 개요`
- `## 매출`
- `## 플랫폼`
- `## 적응증`
- `## 파트너`
- `## 매출 구조`
- `## 자체 판매`
- `## 상업화 제품`

**임상 정보 (CLINICAL_FIELDS, 있을 때만 표시):**
- `## 임상 디자인`
- `## 타겟 질환`
- `## 기존 치료제`
- `## 사전 공개 임상`

**약물 정보 (DRUG_FIELDS, 있을 때만 표시):**
- `## Modality`
- `## MOA`
- `## 논문`

**기타:**
- `## 메모`

위 목록 외 헤딩 추가는 빌드 통과하지만 UI에 표시 안 됨. 새 헤딩 추가가 의도라면 사용자 확인 후 진행.

## 주의

- 본문이 거의 모두 "정보 미입력"인 stub 종목을 처음 채울 때는, 한 세션에 핵심 섹션 4-5개 (회사 개요·매출·플랫폼·적응증 정도)를 한꺼번에 처리하는 게 효율적.
- `sources` 비어있는 채로 데이터만 채우는 건 CLAUDE.md "출처 없는 데이터 추가 X" 원칙에 어긋남. 출처 함께 받기 권장.
- 변경 후 `verified` 자동 갱신 잊지 말 것 — 90일 지나면 stale 경고가 뜸.

## 예시

**예시 1 — 단일 섹션 REPLACE**
> User: "LLY 매출 섹션을 'FY2025 $58B, 2026 가이던스 $84-87B'로 업데이트"

→ `data/companies/LLY.md` 의 `## 매출` 본문 교체, `verified` 갱신, build, "LLY 매출 갱신 완료" 보고.

**예시 2 — stub 채우기 (다중 섹션)**
> User: "JNJ 회사 개요·매출·플랫폼·적응증 채워줘. 출처는 https://www.jnj.com/2025-annual-report"

→ 4개 섹션 각각 적절히 채우기, sources에 URL 추가, verified 갱신, build, 요약 보고.

**예시 3 — 메모 APPEND**
> User: "VRTX 메모에 '4/30 ENVISION Phase 3 데이터 일정 확인' 추가"

→ `## 메모` 섹션 끝에 빈 줄 + 새 줄 추가, verified 갱신, build, 보고.
