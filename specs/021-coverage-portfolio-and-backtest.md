# spec 021 — Coverage-Portfolio 보드 + 백테스팅 하니스 (리뉴얼 완결)

> 상태: **DRAFT (승인 대기)** · 작성 2026-06-24
> 선행: spec 013(coverage-portfolio, **유실** — 본 spec이 대체·재구성) · spec 014/015(everyticker式 리서치 상세) · spec 018(기업 상세 풀페이지) · spec 016(결과·뉴스)
> 근거: 메모리 `project_calendar_renewal` (2026-06-18 확정 결정 + 2026-06-19 Part A 진행기록) · newmoneymoves.io/coverage-portfolio 레퍼런스
> 진행 범위: **본 spec 초안까지. 구현은 승인 후 별도 세션** (모든 Calendar spec의 라이프사이클 동일)

---

## §0 동기 (왜 이 spec인가)

Calendar 리뉴얼(`project_calendar_renewal`)은 두 신규 축을 목표로 했다: **(A) everyticker式 기업 상세 + (B) newmoneymoves式 coverage-portfolio 알파 대시보드 + 백테스팅.** 

2026-06-24 main 감사 결과 **(A)는 사실상 완결**, **(B)는 미완**이다:

| 영역 | spec | main 상태 |
|---|---|---|
| 기업 리서치 상세(내러티브·동료비교·뉴스) | 014 | ✅ 머지 (`CompanyDetail.jsx`, `data/research/*.md` 12 파일럿, build-data 인입) |
| 자산 과학·시장(etiology·MOA·P×Q·TAM·tier) | 015 | ✅ 머지 (`407a128`·`d431677`) |
| 기업 상세 **풀페이지** 전환 + 표준 탭 | 018 | ✅ 머지 (`c892258`, `CompanyPage.jsx`) |
| 카탈리스트 결과·뉴스 피드 | 016 | ✅ 머지 (`feat/news-feed`) |
| **coverage-portfolio 보드** | 013 | ❌ **미머지·유실** |
| **백테스팅 하니스** | — | ❌ 미착수 |

**유실 사실(중요):** Part A에서 `data/portfolio.md` + `scripts/build-portfolio.mjs` + `src/portfolio.generated.json` + `PortfolioBoard.jsx` + Dashboard 삽입이 **빌드·검증까지 끝났으나(lint 0·prod build 성공) "미커밋(검토 후)"로 남았고**, 이후 세션 전환 과정에서 **커밋되지 못한 채 유실**됐다 — 현재 어떤 브랜치·stash·dangling commit에도 없다(2026-06-24 `git fsck` 전수 확인). 따라서 본 spec은 유실된 spec 013을 **현재 main 기준으로 재구성**하고, 거기에 **백테스팅(Phase 4)**을 더해 리뉴얼을 완결한다.

목표: 홈(`/app` Dashboard)에 **"이 스크리너가 고른 종목들이 벤치마크 대비 실제로 알파를 냈는가"**를 보여주는 coverage-portfolio 보드를 얹고, **G/E/R 점수축이 과거에 실제로 예측력이 있었는지**를 catalyst_db로 검증하는 백테스팅 하니스를 만든다.

---

## §1 범위 / 비범위

### 범위
1. **coverage-portfolio 보드** — Dashboard(`/app`, Clerk 보호) 최상단 풀폭. 동일가중 커버리지 포트폴리오의 집계·알파·정규화 라인차트·보유 테이블.
2. **portfolio 데이터 단일원** — `data/portfolio.md`(frontmatter `holdings[]` + `benchmarks[]`), 종목별 **수동 진입일**(스크리너 첫 채점일로 시드).
3. **build-portfolio.mjs** — yahoo-finance2 장기 가격 fetch → matched-entry 정규화 → 알파 → `src/portfolio.generated.json`(추적 커밋). predev/prebuild 체인 연결.
4. **벤치마크 4종** — S&P500 `^GSPC` · Nasdaq `^IXIC` · NBI `^NBI`(폴백 `IBB`) · XBI `XBI`.
5. **verify-data `verifyPortfolio()`** — 항등식·진입일·벤치 무결성 검증.
6. **백테스팅 하니스(Phase 4)** — `catalyst_history_db/catalyst_db_v6.csv`(5,151 이벤트) + GBS 코호트로 G/E/R 점수의 과거 예측력(PoS·수익분포·등급별 hit-rate) 검증·리포트.

### 비범위
- 목표가(price target)·매수신호: **없음**(everyticker 원칙 = 사실확인 기반, no recommendation).
- 배당·세금·수수료·슬리피지 반영: **제외**(면책 명시). 동일가중·정규화만.
- 실시간/인트라데이 가격: 일봉 종가만.
- 포트폴리오 리밸런싱·매도 로직: 비범위(매수 후 보유 = buy-and-hold 커버리지).
- 백테스팅의 자동 파라미터 튜닝(가중치 최적화): 본 spec은 **측정·리포트까지**. 튜닝 반영은 GBS SPEC 변경이므로 별도 승인.

---

## §2 데이터 가용성 (Phase 0 감사 — "가진 데이터만")

| 필요 | 출처 | 상태 |
|---|---|---|
| 커버리지 종목 G/E/R/등급 | `src/screener.generated.json` `points[]` (531종: `t,g,e,g1..e5,rl,wl,grp,listing,kdate`) | ✅ 있음 |
| 종목 첫 채점일(진입일 시드) | GBS scorecards `scored_date` / 또는 수동 명시 | ⚠️ 수동 시드 필요 |
| 장기 일봉 가격 | yahoo-finance2 (`scripts/`에 yahoo 인프라 기존) | ✅ fetch 가능 |
| 벤치마크 일봉 | `^GSPC`/`^IXIC`/`^NBI`(폴백 `IBB`)/`XBI` | ✅ 직접 수신 검증됨(Part A) |
| 과거 카탈리스트 결과·수익 | `catalyst_history_db/catalyst_db_v6.csv` (5,151) | ✅ 있음 |
| 등급별 base-rate | GBS `data/base_rates.json` (94 groups) | ✅ 있음 |

**가정/제약:** screener.generated.json `points`에는 `conf:null`인 행이 있다(라이브 채점 누락) — 포트폴리오 픽은 **등급(`grp`)이 위대/관찰인 라이브(`listing:"live"`) 종목**으로 한정해 무결성을 보장한다.

---

## §3 portfolio.md 스키마 (단일 진실원천)

```markdown
---
# data/portfolio.md
entryDefault: "2026-01-02"          # 진입일 미명시 종목 폴백(스크리너 첫 운영일)
benchmarks:
  - { ticker: "^GSPC", label: "S&P 500" }
  - { ticker: "^IXIC", label: "Nasdaq" }
  - { ticker: "^NBI",  label: "NBI", fallback: "IBB" }
  - { ticker: "XBI",   label: "XBI" }
holdings:
  - { ticker: "VRTX", entry: "2026-01-02", entryPrice: null }   # entryPrice:null → fetch가 진입일 종가 자동 채움
  - { ticker: "HALO", entry: "2026-01-02" }
  # ... 동일가중. entry는 종목별 수동(첫 채점일 시드), 이후 사용자가 실제 진입일로 교체 가능.
---
# Coverage Portfolio
이 포트폴리오는 스크리너 커버리지(위대/관찰 후보)를 **동일가중·매수후보유**로 추적한다.
배당·세금·수수료·슬리피지 제외. 과거 분석이며 매수 추천이 아니다.
```

**픽 선정 정책(§9 상술):** 1차 풀 = GBS 위대 63 + 관찰 91 중 라이브. 동일가중. 진입일 = 종목별 `scored_date` 시드 → 사용자가 실제 진입일로 override.

---

## §4 build-portfolio.mjs (결정론 파이프라인)

입력 `data/portfolio.md` → 출력 `src/portfolio.generated.json`(커밋·추적). predev/prebuild에 연결.

**로직:**
1. frontmatter 파싱. ⚠️ **교훈(Part A 실증): gray-matter/js-yaml이 unquoted `2026-01-02`를 Date 객체로 파싱 → 문자열 비교 깨짐. `toISO()`로 모든 날짜 정규화 필수.**
2. holdings ∪ benchmarks 티커의 일봉 종가를 yahoo-finance2로 fetch. **장기 캐시 `data/portfolio_prices/{ticker}.json`**(best-effort, fetch 실패 시 캐시 폴백·`exit 0`). `^NBI` 무응답 시 `IBB`로 폴백.
3. **matched-entry 정규화:** 각 종목을 자신의 진입일 종가=100으로 정규화. 포트폴리오 = 동일가중 평균(진입일 정렬). 벤치도 동일 진입일 기준 정규화.
4. 산출: 집계(평균·중앙값·승률·최고/최저 수익), 종목별 수익률, 벤치 대비 **alpha**(포트 수익 − 벤치 수익), 정규화 시계열(포트 + 4벤치).
5. **항등식 검증:** `port.last/100 - 1 == avgReturn`(부동소수 tol). 깨지면 `throw`(빌드 실패).

출력 형태(예):
```json
{ "generated":"...", "asOf":"2026-06-24", "entryRange":["2026-01-02","..."],
  "agg":{ "mean":0.xx, "median":0.xx, "winRate":0.xx, "best":{"t":"..","r":..}, "worst":{..} },
  "alpha":[ {"bench":"^GSPC","label":"S&P 500","portRet":..,"benchRet":..,"alpha":..}, ... ],
  "series":{ "dates":[...], "port":[100,..], "^GSPC":[100,..], ... },
  "holdings":[ {"t":"VRTX","entry":"..","entryPrice":..,"last":..,"ret":..}, ... ] }
```

---

## §5 PortfolioBoard.jsx (UI)

위치: **Dashboard 최상단**(KpiStrip **위** 또는 바로 아래 풀폭 — §6 레이아웃). `/app` Clerk 보호 뒤. dark·기존 `.panel`/`.section-h`/`.chip` 토큰 재사용.

4블록:
1. **집계 카드** — 평균/중앙값 수익·승률·최고/최저(종목 링크). KPI 칩 스타일.
2. **alpha 표** — 4벤치 행: 포트 수익 · 벤치 수익 · **alpha**(양수 녹색/음수 적색). "벤치 대비 초과수익"이 핵심 메시지.
3. **정규화 라인차트** — 포트 + 4벤치(기준 100). **Plotly lazy-load**(Screener와 동일 패턴: 별도 chunk, 첫 페인트 미포함). 좁은 폭 대응.
4. **보유 테이블** — 티커(→상세 링크)·진입일·진입가·현재가·수익률, 정렬 가능. 행 클릭 → `onPick`/상세.
5. **면책 푸터** — "동일가중·매수후보유. 배당·세금·수수료 제외. 과거 분석이며 매수 추천 아님."

`Dashboard.jsx` 삽입: `import PortfolioBoard` 후 `<KpiStrip>` 위에 `<PortfolioBoard data={...} onPick={onPick} />`. portfolio.generated.json은 빌드 산출이므로 `data`에 합류시키거나 직접 import.

---

## §6 레이아웃 (Dashboard 통합)

```
/app  Dashboard
┌─ PortfolioBoard (풀폭) ─────────────────────────────┐
│ [집계카드들]   [alpha표]                              │
│ [정규화 라인차트 ──── 포트 vs ^GSPC/^IXIC/^NBI/XBI]   │
│ [보유 테이블 (정렬)]                       [면책]      │
└──────────────────────────────────────────────────┘
┌─ KpiStrip (기존) ─────────────────────────────────┐
┌─ LaneWatchlist (기존) ────────────────────────────┐
┌─ 3-lane: Screener / Catalyst / Results&News (기존) ┐
```
반응형: 차트 `lg` 2/3폭 + alpha표 1/3, `md` 세로 스택, `sm` 카드 리스트.

---

## §7 verify-data verifyPortfolio()

`scripts/verify-data.mjs`에 추가(기존은 `companies/`만 스캔 → portfolio 무영향 확인됨, Part A):
- ERROR: holdings 티커가 screener points/companies에 부재 · entry 날짜 파싱 불가 · benchmark 누락 · 항등식(`port.last/100-1==avgReturn`) 깨짐 · series 길이 불일치.
- WARN: 진입일이 미래 · entryPrice override가 fetch 종가와 >5% 괴리 · `^NBI` 폴백 발동.
- INFO: 캐시 사용(네트워크 0) · holdings 수.

`npm run check`(lint + verify-data)에 자동 포함.

---

## §8 백테스팅 하니스 (Phase 4)

**질문:** 스크리너의 G/E/R 축이 **과거에 실제로 예측력이 있었는가?** (튜닝 아님, 측정.)

입력: `catalyst_history_db/catalyst_db_v6.csv`(5,151 이벤트, clinical_outcome × market_judgment 이중축 — 메모리 `feedback_dual_outcome`) + GBS `data/base_rates.json` + GBS 코호트(위대/관찰/무등급 등급 라벨).

`scripts/backtest.mjs`(또는 GBS 측 python — §11에서 결정) 산출:
1. **등급별 hit-rate** — 위대/관찰/무등급/부적격 코호트별 카탈리스트 통과율·시장 긍정반응율. 위대 > 관찰 > 무등급 단조성이 성립하는가?
2. **R(rerating) 라벨별 forward-return** — Early Rerating/Primary/Financing Trap/Already Rerated 라벨이 이후 가격 경로와 상관 있는가?
3. **E축 검증** — 고-E 종목이 실제로 임상→허가 번역을 더 자주 성공했는가(catalyst_db outcome 매칭).
4. **base-rate 대비 lift** — 각 등급이 그룹 base-rate 대비 얼마나 lift를 주는가.
5. 리포트 `data/backtest_report.md`(+ Dashboard에 요약 KPI 1줄 선택적 노출).

⚠️ **이중축 분리 필수(메모리 `feedback_dual_outcome`):** 임상 outcome ≠ 시장 반응. hit-rate를 한 축으로 뭉개지 말 것. **항암제 OS 우선(`feedback_oncology_os_priority`)**: 1차 EP 미달=실패 단순매핑 금지.

**no-fabrication:** 가격·결과는 실데이터만. 매칭 불가 이벤트는 제외하고 카운트 명시(silent drop 금지).

---

## §9 진입일 / 픽 선정 정책

- **1차 풀:** GBS 위대 63 + 관찰 91 중 라이브(`listing:"live"`). (라이브 무등급은 제외 — 커버리지의 "신념" 종목만.)
- **진입일:** 종목별 `scored_date`(스크리너가 그 종목을 처음 위대/관찰로 채점한 날)로 시드. 사용자가 실제 진입일을 알면 `entry`로 override.
- **동일가중·매수후보유.** 진입 후 등급 하락해도 보유 유지(커버리지 추적이 목적). 등급 변동에 따른 편입/편출 정책은 v2(비범위).
- **진입가:** `entryPrice:null` → fetch가 진입일 종가 자동 채움. 사용자 override 가능(실제 체결가).

---

## §10 검증 / 완료 기준

1. `npm run build` 성공 · `npm run lint` 0 · `npm run verify-data` 신규 ERROR 0.
2. `build-portfolio.mjs` 항등식 통과 · 4벤치 전부 수신(or IBB 폴백 로그) · 캐시 동작(2회차 네트워크 0).
3. PortfolioBoard `/app`에서 4블록 렌더 · Plotly 별도 chunk(대시보드 첫 페인트 미포함) · 반응형 3단.
4. **회귀 0:** portfolio 미보유 데이터 경로·기존 3-lane/스크리너/상세 페이지 무영향.
5. 백테스팅: `backtest_report.md` 생성 · 등급 단조성/lift 수치 명시 · 매칭불가 카운트 명시 · 이중축 분리 준수.
6. ⚠️ **시각검증 제약(메모리 실증):** 보드가 `/app`(Clerk) 뒤 + preview MCP가 타 프로젝트 점유 → 자동 스샷 난항. `npm run dev`→`localhost:5173/app` 상단 수동확인 경로를 완료기준에 포함(또는 dev 임시 공개라우트 후 원복).

---

## §11 구현 순서 (승인 후 · 별도 세션)

1. **P0 스캐폴드:** `data/portfolio.md`(SEED = 위대/관찰 라이브, `scored_date` 진입일) + 벤치 티커 수신 검증.
2. **P1 build-portfolio.mjs** + `portfolio_prices/` 캐시 + 항등식 + predev/prebuild 연결 + `portfolio.generated.json` 커밋.
3. **P2 PortfolioBoard.jsx** + Dashboard 삽입 + Plotly lazy + 반응형.
4. **P3 verify-data verifyPortfolio()** + `check` 연결.
5. **P4 백테스팅** — `catalyst_db_v6` 매칭 엔진 + 등급/R 검증 + `backtest_report.md`. (GBS python vs Calendar node 위치는 P4 착수 시 결정 — base_rates 엔진이 GBS python에 있으므로 **GBS 측 `scripts/backtest.py`로 두고 리포트만 Calendar로 인입**하는 안이 유력.)
6. **P5 배포** — `/deploy`(공개 site). ⚠️ portfolio.md 진입가/픽은 사용자 검토 후 배포(개인 포트폴리오 노출 정책 확인).

⚠️ **공유 워크트리 함정(메모리 반복 실증):** 단일 워크트리에서 브랜치 토글 시 커밋이 엉뚱한 브랜치로 떨어짐. **본 작업은 전용 브랜치 `feat/coverage-portfolio`에서, 커밋은 명시 stage만.** Part A 유실의 직접 원인이 "미커밋 방치"였으므로 **각 P 단계 종료 시 즉시 커밋**(검토는 머지 전에).

---

## §12 부록 — 유실된 Part A 복구 노트

메모리 `project_calendar_renewal`(2026-06-19 Part A)에 빌드·검증까지 끝난 설계가 보존돼 있어 **재구현은 신규 설계가 아니라 복원**이다. 핵심 재사용:
- 벤치 `^GSPC/^IXIC/^NBI(IBB폴백)/XBI` 전부 직접수신 검증됨.
- `toISO()` 날짜 정규화 필수(gray-matter Date 파싱 버그).
- Plotly lazy-load = Screener와 동일 패턴(별도 4.6MB chunk, 첫 페인트 미포함).
- 항등식 `port.last/100-1==avgReturn`.
- SEED 6종(VRTX·HALO·BBIO·RVMD·CYTK·INSM, 균일 진입일 placeholder)은 **실픽으로 교체**(위대/관찰 라이브 전체 + `scored_date` 진입일).
