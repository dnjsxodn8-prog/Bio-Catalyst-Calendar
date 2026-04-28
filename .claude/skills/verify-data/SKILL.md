---
name: verify-data
description: Cross-verify recently added/edited tickers against external sources. Runs npm run verify-data first; if code-level checks pass, picks the last 7 days of additions/edits and re-checks mcap, sources alive, and key body facts via web search/fetch. Reports inconsistencies — does NOT auto-fix. Use when user says "/verify-data", "검증해줘", "사실 확인", "팩트체크", or just after research-company / update-company finished a new entry.
---

# verify-data

코드 검증(`npm run verify-data`)과 별개로 **사실관계** 교차검증을 한다. 데이터 진입 시 1차 필터로 활용. spec 003 §4.

## 절대 원칙

1. **자동 수정 금지.** 발견한 불일치는 사용자에게 보고만. 적용은 사용자 결정 후 별도 스킬(`/update-company` 등) 호출.
2. **출처 ≥1개 확인 후 보고.** "이 사실 틀린 듯" 같은 추정 금지. URL 1개 인용 가능해야 보고.
3. **396종목 전체 매주 X.** 호출량·시간 과대. 신규/최근 수정 종목만.

## 절차

### Step 1 — 코드 검증

```bash
npm run verify-data --json
```

JSON 결과 파싱.
- `errors > 0` → 그것부터 사용자에게 보고하고 **즉시 stop**. 사실관계 검증은 errors 0이 전제.
- `errors === 0` → Step 2.

### Step 2 — 대상 선정

다음 중 인자에서 명시되지 않으면 기본:

| 발화 | 대상 |
|---|---|
| `/verify-data` (인자 없음) | 최근 7일 내 `verified` 갱신된 종목 |
| `/verify-data LLY VRTX` | 명시 ticker |
| `/verify-data --since 2026-04-01` | since 이후 verified |
| `/verify-data --recent 14` | 14일 |

`git diff --name-only origin/main -- data/companies/` 도 보조 시그널 (커밋 안 한 상태에서도 식별 가능).

대상 종목이 0개면 종료. 5개 초과면 사용자에게 "5개 넘는데 다 갈까?" 물어보고 진행.

### Step 3 — 종목별 교차검증

각 종목에 대해:

#### 3-1. mcap 재확인
- 현재 frontmatter `mcap` 값을 web 검색 (회사 IR, Yahoo Finance, Bloomberg, MarketWatch 중 1개)으로 재확인
- 차이 ±20% 이상 → 보고 후보
- 정상이면 ✓

#### 3-2. sources URL alive
- frontmatter `sources` 각 URL을 `fetch`로 HEAD 요청 (또는 GET 짧게)
- 200/3xx → ✓
- 4xx/5xx/timeout → 죽은 링크로 보고
- HEAD를 막는 사이트(예: clinicaltrials.gov)는 GET fallback
- 호출 간 100ms 간격

#### 3-3. 본문 핵심 사실 sanity check
- body의 다음 섹션을 sources 1개와 대조:
  - `## 매출` (FY 매출 / Q 매출)
  - `## 상업화 제품` (제품명·승인 여부)
  - `## 카탈리스트` (날짜·이벤트명)
- web 검색으로 sources 안 사실이 현재까지 유효한지 1~2개 spot check
- 명백한 불일치(예: 매출 단위 오류, 제품 미승인인데 승인됨으로 적힘, PDUFA 날짜 틀림)만 보고

큰 노력으로 정밀 검증 X. **명백한 오류만 잡기**가 목표.

### Step 4 — 보고

종목별 정리:

```
🔍 verify-data 사실관계 교차검증 (대상 N종목)

✅ LLY — 모두 정상 (mcap $750B Yahoo 일치, sources 4/4 alive, 매출 Q1 $14.5B IR 일치)

⚠ VRTX — 2건 이슈
  - sources[2] 죽음: https://example.com/old-page (404)
  - 매출 섹션 "$2.5B" → IR Q1 발표는 "$2.7B" (참조: https://...)

❌ XYZ — 즉시 검토 필요
  - mcap 600 (기재) vs Yahoo 250 — 50% 이상 차이 (참조: https://finance.yahoo.com/quote/XYZ)

요약: ✅ 1종목 / ⚠ 1종목 / ❌ 1종목

다음:
  - VRTX 매출 섹션 갱신: /update-company VRTX
  - VRTX sources[2] 교체: 본인이 IR에서 새 URL 찾아 교체
  - XYZ mcap 재확인: 본인이 web 검색 후 결정 (변동성 큰 종목인지)
```

### Step 5 — 자동 수정 X

위 보고에서 사용자가 결정한 항목만 별도 스킬로 적용. verify-data는 진단까지가 책임.

## 비-목표

- 396종목 전체 매주 자동 검증 (호출량 폭발).
- 코드 검증을 verify-data가 대체 (그건 `npm run verify-data`. 이 스킬은 그 위에 사실 layer만).
- sources HEAD를 코드(`scripts/verify-data.mjs`)에 통합 (CI 부적합. 스킬에서만).
- 자동 PR/commit. 사용자 명시 후속 호출 후에만.

## 호출 패턴

| 사용자 발화 | 동작 |
|---|---|
| `/verify-data` | 최근 7일 verified 종목 |
| `/verify-data LLY` | LLY 1종목 |
| `/verify-data --recent 14` | 14일 윈도우 |
| `검증해줘` / `팩트체크` | description 매칭 → 동일 |
| `방금 추가한 거 사실 확인` | 최근 git diff에 등장한 companies 종목 |

## 위험 / 함정

- **rate limit**: web 검색·fetch 일정량 호출. 5종목 정도가 1세션 적정.
- **HEAD 차단 사이트**: clinicaltrials.gov, sec.gov 등 일부는 HEAD 401/403. GET 짧게 또는 그냥 ✓ 처리.
- **mcap 변동성**: 시총은 매일 변하므로 ±20% 임계로 잡되, 대형주는 ±10% 권장.
- **검증 시점 ≠ verified 시점**: 종목이 verified=2026-03-01 인데 오늘 mcap이 다르다고 즉시 error는 X. "verified 후 X일 경과로 mcap 변동 가능성"으로 reported.
