# Spec 004: Price Charts (30-day sparkline)

**상태:** Approved (2026-04-28)
**작성일:** 2026-04-28
**관련 요구사항:** 9번 (30일 주가 그래프)
**선행:** spec 001 (data layer), spec 002 (ui), spec 003 (verification)
**참조:** HANDOFF.md §8, working-notes.md §"Phase 4 — 주가 그래프"

---

## 목표

종목 디테일 화면에서 30일 주가 추이를 sparkline으로 보여준다.

1. **Yahoo Finance 비공식 API** (`yahoo-finance2` npm 패키지)로 일봉 종가를 받아 `data/prices/{TICKER}.json`에 캐시한다.
2. 빌드 시점에 캐시를 `src/data.generated.json`에 합쳐 클라이언트에 함께 배포한다 (런타임 호출 X).
3. `update-prices` 스킬로 수동 갱신한다 (자동화는 Phase 7 이후).
4. 종목 디테일에 sparkline + 30일 등락률을 표시한다.

## 비-목표

- 실시간 호가·거래량·시가/고가/저가 (종가만 사용. 캐시에는 OHLCV 다 저장하되 v1 UI는 close만).
- 30일 초과 차트 (분기·연간).
- 클라이언트에서 직접 외부 API 호출 (CORS·차단·키 노출 모두 회피).
- 자동 스케줄러.

---

## 0. 데이터 소스 결정 배경

Alpha Vantage 무료 티어가 일 25콜로 좁혀져 398종목 갱신에 부적합. 사용자 결정으로 **Yahoo Finance (`yahoo-finance2`)** 채택.

| 항목 | 값 |
|---|---|
| 패키지 | `yahoo-finance2` (ESM, Node 18+) |
| 키 | 불필요 |
| rate limit | 사실상 없음 (점잖게 쓰는 한). 안전상 분당 60콜 이하로 self-throttle |
| 응답 | `{ date, open, high, low, close, adjClose, volume }[]` |
| 약관 | 비공식·회색지대. 1인 private 도구라 실질 영향 미미 |
| 차단 시 fallback | **Stooq CSV** (키 불필요, fetch 함수만 교체) |

`.env.local`의 `VITE_ALPHA_VANTAGE_KEY`는 **삭제 대상**. 다른 곳에서 안 쓰면 환경변수 자체 제거.

---

## 1. 전체 구조

```
update-prices 스킬 (수동 호출)            ← 4-C
   └─ scripts/fetch-prices.mjs            ← 4-A
       ├─ companies 목록 로드 (또는 --tickers)
       ├─ yahoo-finance2 chart() 호출 (12콜/분 수준 self-throttle)
       └─ data/prices/{TICKER}.json 저장 (30 거래일)  ← 4-B

npm run build-data
   └─ scripts/build-data.mjs (수정)
       └─ data/prices/*.json 병합  ← 4-D
       └─ src/data.generated.json에 prices 키 추가

CompanyDetail.jsx
   └─ 카탈리스트 박스 아래 Sparkline 컴포넌트  ← 4-E
```

---

## 2. 4-A: `scripts/fetch-prices.mjs`

### 2.1 인자

| 인자 | 동작 |
|---|---|
| (없음) | `data/companies/*.md`의 모든 ticker 갱신 |
| `--tickers LLY,VRTX` | 특정 종목만 |
| `--stale-days N` | `prices/*.json`이 N일 이상 오래된 종목만 (기본 갱신에서 N=1 권장) |
| `--limit N` | 안전상 상한 |
| `--dry-run` | API 호출만 하고 파일 저장 X |

### 2.2 동작

```
1. companies 목록 + 인자 → 대상 ticker 리스트
2. yahoo-finance2 모듈 import (dynamic import, ESM)
3. for each ticker:
   - chart(ticker, { period1: today-45d, period2: today+1d, interval: '1d' })
   - 응답에서 quotes 배열 추출 → 거래일 기준 최근 30개로 자름
   - 빈 응답 / unknown symbol → warning, skip
   - 파일 쓰기: data/prices/{TICKER}.json
   - 약 50~80ms 간격 (분당 60콜 이하)
4. 종료 요약: 성공 N, skip M, 실패 K
```

### 2.3 캐시 형식 (4-B)

`data/prices/{TICKER}.json`:

```json
{
  "ticker": "LLY",
  "fetched": "2026-04-28T08:00:00Z",
  "source": "yahoo",
  "currency": "USD",
  "data": [
    { "date": "2026-03-17", "close": 745.20 },
    { "date": "2026-03-18", "close": 742.85 },
    ...
    { "date": "2026-04-28", "close": 768.10 }
  ]
}
```

- 거래일 기준 최근 30개. 휴장일은 자연 누락.
- v1 UI는 `close`만 사용. OHLCV 전체 저장은 v1에서 보류 (필요해지면 늘림).
- fetch 실패 시 **기존 캐시 보존** (덮어쓰기 X).

### 2.4 비-목표

- 우선순위 알고리즘 (yahoo는 한 번에 다 받음).
- 자동 retry.
- delta merge (단순 전체 교체).

---

## 3. 4-C: `update-prices` 스킬

`.claude/skills/update-prices/SKILL.md`. 사용자가 `/update-prices` 호출.

### 3.1 절차

```
1. 인자 파싱:
   - 없으면: 전체 갱신
   - "LLY VRTX" : --tickers LLY,VRTX
   - "오래된 것만" : --stale-days 7
2. node scripts/fetch-prices.mjs <args>
3. npm run build-data 실행 (data.generated.json 갱신)
4. 결과 요약 사용자 보고. 자동 commit X.
```

### 3.2 비-목표

- 가격 sanity check (±10% 점프 등).
- 자동 commit.

---

## 4. 4-D: `scripts/build-data.mjs` 통합

### 4.1 변경 사항

```js
// 출력 JSON 구조
{
  "companies": { ... },
  "catalysts": [ ... ],
  "conferences": [ ... ],
  "prices": {
    "LLY": { "fetched": "...", "data": [{ "date": "...", "close": ... }, ...] },
    "VRTX": { ... }
  }
}
```

캐시 없는 종목은 `prices` 키에 항목 없음 (UI는 자리만 비움).

### 4.2 spec 003 영향

spec 003 §2.2의 prices 검증 항목 그대로 유지 (JSON 형식·티커 일치·30일 초과 W·`source` 필드 enum 추가 권장).

---

## 5. 4-E: UI sparkline

### 5.1 컴포넌트: `src/components/Sparkline.jsx` (신규)

- 입력: `data` (`{date, close}[]`), `width`, `height`
- 구현: **순수 SVG polyline** (HBarChart 패턴). recharts는 sparkline에 과함.
- 색상: 30일 시작 종가 대비 마지막 종가가 ▲ → `accent-green`, ▼ → `accent-red`, 평탄 → `fg-muted`.
- v1: hover 툴팁 X, range 토글 X.

### 5.2 위치 (CompanyDetail.jsx)

```
┌────────────────────────────┐
│ 카탈리스트 (기존)             │
└────────────────────────────┘
┌────────────────────────────┐
│ 30일 주가  $768.10  ▲ 3.1%  │
│  ╱╲    ╱─                  │  ← sparkline (h-12)
│ ╱  ╲__╱                    │
│  fetched 2026-04-28        │
└────────────────────────────┘
┌────────────────────────────┐
│ 기업 프로필 (기존)            │
└────────────────────────────┘
```

캐시 없으면 박스 자체 생략.

### 5.3 CompanyRow에는 추가 안 함 (v1)

398행 시각 노이즈. 펼쳐야 보이면 충분. v2 후보.

### 5.4 모바일

`width: 100%`, `height: 48px`, viewBox 비율 scaling.

### 5.5 recharts 정리

이번 spec에서 `Sparkline.jsx`는 SVG로 직접 구현. recharts는 여전히 미사용 → **package.json에서 제거 권장** (별도 작업, spec 외).

---

## 6. 결정 사항

| # | 이슈 | 결정 |
|---|---|---|
| 6.1 | 데이터 소스 | **Yahoo Finance (`yahoo-finance2`)**. 차단 시 Stooq fallback |
| 6.2 | API 키 | **불필요**. `.env.local`의 `VITE_ALPHA_VANTAGE_KEY`는 삭제 |
| 6.3 | 갱신 범위 / 빈도 | 기본 전체. 사용자가 수동 호출 (`/update-prices`). 빈도 제약 사실상 없음 |
| 6.4 | 차트 라이브러리 | **순수 SVG**. recharts 의존성 제거 후보 (별도 작업) |
| 6.5 | CompanyRow mini sparkline | v1 X. v2 후보 |
| 6.6 | hover 툴팁 / 다른 기간 | v1 X |
| 6.7 | `prices/*.json` 커밋 여부 | **커밋함**. 30일 종가는 작고(<5KB/종목) 빌드 단순화 |
| 6.8 | 갱신 자동화 | Phase 7 이후. v1은 수동 |
| 6.9 | 캐시에 OHLCV 전체 저장 vs close만 | v1은 **close만**. 추후 확장 시 필드 추가 (역호환) |

---

## 7. 의존성

- **신규**: `yahoo-finance2` (devDependencies)
- **제거 후보 (별도 작업)**: `recharts`
- Node 18+ (이미 사용 중)

---

## 8. 완료 조건

### 4-A
- [ ] `scripts/fetch-prices.mjs` 작성
- [ ] 인자 파싱 (`--tickers`, `--stale-days`, `--limit`, `--dry-run`)
- [ ] LLY 1종목 dry-run → 응답 schema 확인
- [ ] LLY 실제 저장 → `data/prices/LLY.json` 30일치
- [ ] unknown symbol (`ZZZZ`) 입력 시 graceful skip
- [ ] 전체 398종목 1회 실행 성공 (실패 종목 리스트 출력)

### 4-B / 4-D
- [ ] `scripts/build-data.mjs`에 prices 병합 로직
- [ ] `data.generated.json`에 `prices` 키 출력
- [ ] 캐시 없는 종목은 키 누락이 정상

### 4-C
- [ ] `.claude/skills/update-prices/SKILL.md` 작성
- [ ] `/update-prices` 호출로 fetch + build-data 자동 실행 + 요약 보고

### 4-E
- [ ] `src/components/Sparkline.jsx` 작성
- [ ] `CompanyDetail.jsx` 통합
- [ ] dev 서버에서 LLY 등 1~3 종목 시각 확인
- [ ] 모바일 폭(360px)에서 깨짐 없음

### Phase 4 종료
- [ ] `npm run check` 통과 (verify-data prices 항목 정상)
- [ ] working-notes.md "현재 상태" Phase 4 ✅
- [ ] HANDOFF.md §8 "Alpha Vantage" 단락 → "Yahoo Finance"로 정정
- [ ] CLAUDE.md "스킬 사용 규칙"의 `update-prices` (미구현) 표시 제거
- [ ] `.env.local`의 `VITE_ALPHA_VANTAGE_KEY` 삭제

---

## 9. 작업 순서

1. 사용자 spec 승인
2. **4-A** `npm i -D yahoo-finance2` + `fetch-prices.mjs` + LLY dry-run·실제 저장
3. **4-D** build-data 통합 + verify-data 영향 확인
4. **4-E** Sparkline 컴포넌트 + CompanyDetail 통합 + dev 서버 시각 확인
5. **4-C** update-prices 스킬 작성
6. 전체 398종목 일괄 fetch (실패 리스트 점검)
7. working-notes.md / HANDOFF.md / CLAUDE.md 갱신
8. (선택) recharts 제거 + `.env.local` 정리

한 세션에서 가능. 야후가 응답 schema를 바꿨거나 차단당해 막히면 **Stooq fallback으로 즉시 분기** (별도 spec 없이 4-A의 fetch 함수만 교체).

---

## 10. 위험 / 알려진 함정

- **야후 비공식 API 차단 위험**: `yahoo-finance2`는 비공식. 야후가 막으면 Stooq fallback. fetch 함수 1개만 교체하면 됨 (캐시 형식·UI·build 통합은 그대로).
- **응답 schema 변동**: `yahoo-finance2`가 자체적으로 흡수해주는 편이지만 메이저 업그레이드 시 깨질 수 있음. lockfile 고정.
- **휴장·신규 상장**: 30일 미만 데이터 → UI는 받은 만큼만 그림.
- **티커 변경/상장폐지**: `prices/{OLD}.json` 잔류. spec 003 verify-data가 W로 알려줌. 정리는 수동.
- **빌드 산출물 크기**: 398 × 30일 × ~50B(close + date만) ≈ 600KB. Vercel 빌드·전송 허용 범위.
- **Vercel 빌드 머신에서 yahoo-finance2 호출 X**: build-data는 캐시 파일만 읽음. fetch는 로컬에서만.
