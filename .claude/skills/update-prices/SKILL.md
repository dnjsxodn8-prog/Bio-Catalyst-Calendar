---
name: update-prices
description: Refresh 30-day daily-close price cache via Yahoo Finance for tracked tickers, then rebuild the generated JSON. Use when the user wants to update price sparklines (e.g. "주가 업데이트", "오늘 주가 받아와", "LLY VRTX 주가만 갱신", "오래된 가격만").
---

# update-prices

`scripts/fetch-prices.mjs`를 호출해 `data/prices/{TICKER}.json` 캐시를 갱신하고, `npm run build-data`로 `src/data.generated.json`에 반영한다. 데이터 소스는 **Yahoo Finance** (`yahoo-finance2`, 키 불필요).

## 입력 패턴

| 사용자 발화 | 실행 인자 |
|---|---|
| "주가 업데이트" / "오늘 주가" / 인자 없음 | `--stale-days 1` (오늘 받지 않은 종목만) |
| "전체 갱신" / "다 받아와" | (인자 없음 — 전체) |
| "LLY VRTX 갱신" | `--tickers LLY,VRTX` |
| "오래된 것만" / "일주일 안 받은 것만" | `--stale-days 7` |
| "10개만 테스트로" | `--limit 10` |

## 절차

### 1. 인자 결정

위 표대로. 모호하면 **기본값 `--stale-days 1`** 채택 (오늘 이미 받은 건 다시 안 받음).

### 2. fetch-prices 실행

```bash
node scripts/fetch-prices.mjs <args>
```

진행 라인을 그대로 사용자에게 흘려보냄(stdout). throttle 80ms이라 N종목 ≈ N×0.5~1.5초.

### 3. 결과 분류

`fetch-prices` 출력의 마지막 요약 블록에서:

- ✅ **success** — 갱신 완료
- ⊘ **skipped** — unknown symbol / no data (Yahoo가 인지 못 한 ticker)
- ❌ **failed** — 네트워크·schema 오류 (재시도 후보)

skipped/failed 종목 리스트는 사용자에게 명시적으로 보고.

### 4. build-data

```bash
npm run build-data
```

성공해야 `src/data.generated.json`의 `prices` 키에 새 항목이 반영됨.

### 5. 요약 보고

한 줄 요약 + skipped/failed 종목 (있을 때만). 자동 commit/push **금지**.

> 예: "✅ 18종목 갱신 (skip 1: ZZZZ — delisted 가능성). build-data 완료."

## 비-목표

- 가격 sanity check (±10% 점프 등): v1 X.
- 자동 commit/push.
- 일 1회 자동 스케줄: Phase 7 이후.
- Stooq fallback: 야후가 차단되면 별도 spec 작업 (지금은 코드에 미반영).

## 주의

- `yahoo-finance2`는 비공식이라 응답 schema가 변동될 수 있음. `failed`가 다수면 패키지 업그레이드 또는 fallback 검토.
- ticker가 `data/companies/{TICKER}.md`에 없으면 `--tickers` 모드에서도 처리됨 (단, 그 캐시는 build-data가 무시 — verify-data가 W로 알려줌).
- 신규 상장·휴장으로 데이터가 30일 미만이면 sparkline은 받은 만큼만 그림 (정상).

## 예시

**예시 1 — 일상 갱신**
> User: "주가 업데이트해줘"

→ `node scripts/fetch-prices.mjs --stale-days 1` → 오늘 안 받은 종목만 fetch → build-data → "✅ 372종목 갱신 (skip 0, fail 0)"

**예시 2 — 특정 종목**
> User: "LLY VRTX BMY 주가만 받아와"

→ `node scripts/fetch-prices.mjs --tickers LLY,VRTX,BMY` → "✅ 3종목 갱신"

**예시 3 — 첫 일괄 fetch**
> User: "전체 다 받아와"

→ `node scripts/fetch-prices.mjs` (398종목, 약 5~8분) → 진행상황 표시 → 요약
