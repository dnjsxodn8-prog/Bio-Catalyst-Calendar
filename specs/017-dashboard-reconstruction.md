# Spec 017 — Home Dashboard 전면 재구성 (3-lane Research Board)

> 상태: **DRAFT (승인 대기)**
> 작성: 2026-06-21
> 선행: spec 002(UI), spec 010(screener-integration), spec 012(검색 UX), spec 016(catalyst outcomes + news feed)
> 근거 문서: `../biotech-catalyst-calendar-proposal.md` (Codex 자문 제안서) §1.2, §4.1, §9
> 비고: 본 spec은 제안서의 "바이오 특화 EveryTicker" 방향 중 **1순위 = Home Dashboard**만 다룬다. Company Page·Screener 고도화·Timeline·데이터 수집 파이프라인은 후속 spec.

---

## §0 동기 (왜)

현재 홈(`src/pages/Dashboard.jsx`)은 `ScreenerBanner → KPI 5종 → KpiList → HeroWeek(featured + 이번주) → RecentResults(피드 5개)` 단방향 나열이다. 제안서 §1.2는 8개 불편 지점을 지적한다. 핵심은 **세 흐름(스크리너 / 카탈리스트 / 결과·뉴스)이 한 리서치 동선으로 묶이지 않고 따로 논다**는 것.

제안서 §4.1의 목표: 홈을 "Calendar 단일 뷰"가 아니라 **Biotech Research Dashboard**로 — KPI strip + **3-lane 보드**(Screener Signals / Catalyst Watch / Results & News)로 재구성하고, 모든 카드에 "다음 행동" CTA를 단다.

### 사용자 확정 결정 (2026-06-21, 4라운드 Q&A)

| 항목 | 결정 |
|---|---|
| 빌드 전략 | **기존 앱 점진 확장** (markdown SSOT·Clerk·Vercel·스크리너 자산 재사용) |
| 이번 사이클 1순위 | **Home Dashboard 재구성** |
| 신규 데이터 | **가진 데이터만으로 시작** (없는 필드는 empty state) |
| 사용 맥락 | **외부 공유/제품화 지향** |
| 재구성 깊이 | **제안서 §4.1 전면 재구성** |
| 시각 정체성 | **현재 dark 브랜딩 유지** (원탱's·gradient — light 터미널 전환 반려) |
| 포함 lane | **Screener Signals · Catalyst Watch 고도화 · Results & News facet** |
| 언어 | **한글 중심 유지** (영문 sub label) |
| 진행 범위 | **본 spec 초안까지. 구현은 승인 후 별도 세션** |
| Screener Signals 내용 | **위대 + 관찰 + rerating 신호** (cash runway 수치 부재 → rerating 라벨로 대체) |
| Featured 카드 | **Catalyst Watch lane 안으로 compact 흡수** |

---

## §1 범위

### 포함 (이번 spec)
1. **KPI strip 확장**: 현재 5종 → 7~8종 (+ Results, News, Watchlist Updates 카운트). 각 KPI 클릭 결과에 **full-page CTA**(이 필터로 전체 페이지 열기).
2. **3-lane 보드** 신설: Screener Signals / Catalyst Watch / Results & News.
3. **Featured 카드**를 Catalyst Watch lane 상단 compact로 흡수 (별도 큰 hero 제거).
4. **Results & News facet 분리** (Positive/Negative/Mixed/Financing/Regulatory/Pipeline + "결과만 보기").
5. **Unified grouped search**: 홈에서 검색어 입력 시 Companies / Catalysts / Results·News / Screener 그룹별 결과 모드로 전환.
6. **인터랙션 규칙 정리**: ticker 클릭 = 기업 상세, headline/source 클릭 = 뉴스/원문 (§1.2 #5).
7. **ScreenerBanner CTA 문구** 개선 (§1.2 #2): "차트 열기" → "위대한 후보 63 보기" 등 행동 명시 + G×E×T1 tooltip.

### 비범위 (defer — 후속 spec/라운드)
- **Watchlist Updates lane** (Q&A에서 이번 라운드 제외 선택). 단 KPI strip의 Watchlist 카운트는 포함.
- **Therapeutic area movers** lane, "Recently updated source" feed (제안서 §4.1 후순위).
- **Timeline View / Calendar View 개편** (별도 spec).
- **사이드바 순서 변경**(§1.2 #6) — 제품화 IA 재정렬은 별도 논의(현 순서 유지).
- **light 테마 전환** (반려).
- **신규 데이터 수집**(pipeline·runway·financials) — 가진 데이터만.

---

## §2 목표 홈 배치 (와이어프레임)

```
┌─────────────────────────────────────────────────────────────┐
│ [검색어 없음 = 기본 모드]                                      │
│                                                              │
│  ① ScreenerBanner  (CTA "위대한 후보 63 보기" + G×E×T1 info)   │
│                                                              │
│  ② KPI STRIP  (7~8 cards, 클릭 시 ③에 결과+full-page CTA)      │
│  ┌─7D─┬─30D─┬─PDUFA─┬─Readout─┬─Conf─┬─Results─┬─News─┬─WL─┐  │
│                                                              │
│  ③ KpiList (선택 시) — full-page CTA 포함                      │
│                                                              │
│  ④ 3-LANE BOARD                                              │
│  ┌── Screener Signals ──┬── Catalyst Watch ──┬─ Results&News ┐│
│  │ 위대 후보 top         │ [compact featured] │ facet chips   ││
│  │ 관찰 후보 top         │ 이번 주 이벤트 list │ 결과/뉴스 feed ││
│  │ rerating 신호         │ "이 필터로 전체     │ "결과만 보기"  ││
│  │ → 스크리너 열기        │  Catalyst Table"   │ → 전체 뉴스    ││
│  └──────────────────────┴────────────────────┴──────────────┘│
│  (lg: 3-col / md: 2-col 후 stack / sm: 1-col stack)           │
│                                                              │
│  ⑤ 이번 주 카탈리스트 table (전체폭, 기존 유지)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ [검색어 있음 = UNIFIED SEARCH 모드]                            │
│  "{query}" 검색 결과                                          │
│  ▸ Companies (n)   — 기업 카드, ticker→상세                    │
│  ▸ Catalysts (n)   — 이벤트 row, →drawer                      │
│  ▸ Results & News (n) — feed card                            │
│  ▸ Screener Signals (n) — 점수 매칭 종목                       │
└─────────────────────────────────────────────────────────────┘
```

반응형: 3-lane은 `lg:grid-cols-3 / md:grid-cols-2 / grid-cols-1`. dark 테마·기존 `.panel`·`.section-h`·`.chip` 스타일 토큰 재사용.

---

## §3 Lane별 명세

### ③-a KPI strip 확장
- 기존: 7D / 30D / PDUFA / Clinical Readout / Conference.
- 추가: **Results**(최근 N일 결과 수, `feed.kind==='catalyst'`), **News**(최근 N일 뉴스 수, `feed.kind==='news'`), **Watchlist**(watchlist 종목 중 미래 이벤트 보유 수).
- KpiList(선택 결과 패널) 하단에 **full-page CTA**: 예) PDUFA 선택 → `[PDUFA 필터로 Catalyst 전체 보기 →]` → `/app/catalysts?type=PDUFA`. Results/News 선택 → `/app/news?...`.
- → **선행 작업**: `src/pages/Catalysts.jsx`가 URL 쿼리(`type`, `within`, `q`)를 읽어 초기 필터로 적용하도록 확장 필요(§5 참조).

### ④-A Screener Signals lane
출처: `src/screener.generated.json` `points[]` (필드 `t,c,g,e,t1,m,grp,rl,wl,rt,cat,inCalendar`).
- **위대한 후보** top (grp==='위대한 후보', G·E 또는 mcap 정렬, 상위 N).
- **관찰 후보** top (grp==='관찰 후보').
- **Rerating 신호**: `rl` 라벨 그룹핑 — Early Rerating / Financing Trap 등 의미 있는 라벨만 노출(rt 표시). cash runway 수치 대체.
- 각 항목 ticker 클릭 → 기업 상세. lane 푸터 CTA → `/app/screener`.
- catalyst density(선택): `data.catalysts`를 ticker로 조인해 90일 내 이벤트 개수 badge(가능하면, 없으면 생략).

### ④-B Catalyst Watch lane
출처: `data.catalysts` + `utils/dDay.dDelta`.
- 상단 **compact featured**: 가장 임박한 1건(현재 HeroWeek featured의 축소판 — 큰 gradient hero 대신 lane 폭에 맞는 카드). 클릭 → drawer.
- 그 아래 **이번 주(D-1~D+7) 이벤트 list** (기존 HeroWeek 리스트 로직 재사용).
- lane 푸터/각 KPI 연동 CTA: `[이 필터로 Catalyst Table 열기 →]` (filter-preserving).

### ④-C Results & News lane
출처: `data.feed` + `utils/feed.js`(`feedBadge`, `NEWS_TYPE_META`, `outcomeMeta`).
- 상단 **facet chips**: 전체 / 결과(catalyst) / Financing / Regulatory / Pipeline / Licensing… (toggle 필터).
- "**결과만 보기**" 토글 (`kind==='catalyst'`).
- feed card: date · badge(outcome/type) · ticker · headline · source host.
  - ticker 클릭 → 기업 상세 / headline 클릭 → `/app/news`(또는 원문) / source chip → 원문. (§1.2 #5 분리)
- lane 푸터 CTA → `/app/news`.

### ⑥ Unified grouped search (검색어 있을 때)
- `utils/searchIndex.js` `buildSearchIndex`를 확장하거나 래퍼 추가:
  - 현재 `search(q)`는 **기업 entries**만 반환. 그룹 검색을 위해 **catalysts**·**feed** 매칭도 함께 산출하는 `searchGrouped(q)` 추가.
- 홈 컴포넌트: `query` 비어있지 않으면 기본 보드 대신 `UnifiedSearchResults` 렌더(4그룹, 각 그룹 "더보기" → 해당 페이지로 query 전달).
- 빈 결과 그룹은 숨김. 전체 0건이면 명확한 empty state.

---

## §4 데이터 가용성 매핑 (가진 데이터만)

| Lane / 요소 | 필요 데이터 | 출처 | 상태 |
|---|---|---|---|
| Screener Signals 위대/관찰 | grp, g, e, m | `screener.generated.json.points` | ✅ 있음 |
| Rerating 신호 | rl, rt | 동상 | ✅ 있음 |
| Cash runway risk | per-company runway 개월 | — | ❌ 없음 → rerating(rl)로 대체 |
| Catalyst density badge | ticker별 미래 이벤트 수 | `data.catalysts` 조인 | ✅ 산출 가능 |
| Catalyst Watch | date, type, drug, indication, phase | `data.catalysts` | ✅ 있음 |
| Results & News facet | kind, outcome, type, sources | `data.feed` (spec 016) | ✅ 있음 |
| Unified search | companies+screener+catalysts | `searchIndex.js` | ✅ 있음(feed 그룹만 추가) |
| Watchlist 카운트 | watchlist 종목 | `userPrefs.useWatchlist` | ✅ 있음 |

→ **추가 데이터 수집 0**. 모든 lane이 기존 generated/localStorage 데이터로 구현 가능. 없는 항목(runway)은 대체하거나 생략.

---

## §5 컴포넌트 / 파일 계획

신규·수정 파일 (구현 시):

```
src/pages/Dashboard.jsx          ← 재구성 (보드 컨테이너 + 검색 모드 분기)
src/components/dashboard/
  ├── ScreenerBanner.jsx         ← 분리 + CTA 문구/ info tooltip
  ├── KpiStrip.jsx               ← 7~8종 확장 + full-page CTA
  ├── LaneScreenerSignals.jsx    ← 신규
  ├── LaneCatalystWatch.jsx      ← 신규 (compact featured + 이번주)
  ├── LaneResultsNews.jsx        ← 신규 (facet)
  └── UnifiedSearchResults.jsx   ← 신규 (검색어 모드)
src/utils/searchIndex.js         ← searchGrouped(q) 추가 (catalysts+feed)
src/pages/Catalysts.jsx          ← URL 쿼리(type/within/q) 초기 필터 수용
```

- 기존 `FeedList`, `dDay`, `feed.js`, `outcome.js` 재사용. CSS는 기존 토큰(`.panel/.kpi/.chip/.ev-row/.section-h`) 재사용 — 신규 색·gradient 최소화.
- App.jsx의 props 계약(`data`, `query`, `onPick`, watchlist) 유지. Dashboard에 watchlist·screener·feed 전달은 이미 가능(import 또는 props).

---

## §6 인터랙션 / 카피 규칙 (제안서 §1.2·§9 반영)

1. **ticker 클릭 → 항상 기업 상세**. headline/source → 뉴스/원문. (현 RecentResults는 ticker도 `/app/news`로 보냄 → 수정)
2. **KPI·lane CTA는 filter-preserving**: 쿼리스트링으로 대상 페이지 필터 상태 전달.
3. **ScreenerBanner CTA**: "차트 열기" → "위대한 후보 {n} 보기"(또는 "스크리너 열기") + G×E×T1 의미 tooltip.
4. **Results vs News 용어 일관화**: `결과` = catalyst outcome 전용, `뉴스` = 일반 회사 소식. facet으로 구분.
5. 모든 lane·카드에 명시적 "다음 행동" 존재(빈 lane은 empty state + 진입 CTA).
6. 제품화 톤: "buy/sell·오를 것" 금지, "research priority·event attention" 류 표현 유지(기존 정책).

---

## §7 검증 / 완료 기준

- `npm run check`(lint + verify-data) 통과. 데이터 스키마 변경 없음(읽기 조인만) → verify-data 영향 없음.
- 1440px 데스크탑에서 3-lane 가독, 텍스트/버튼 overflow 없음. 태블릿 폭에서 stack.
- 검색어 입력 시 보드 → unified grouped 모드 전환, ESC/clear 시 복귀.
- 각 KPI·lane CTA가 올바른 필터 상태로 대상 페이지 진입.
- ticker→기업 / headline→뉴스 동선 일관.
- dark 테마·기존 브랜딩 유지(시각 회귀 없음).
- 빈 데이터 lane들의 empty state 표시.

## §8 오픈 이슈 / 후속

- **Watchlist Updates lane**: 다음 라운드(데이터·동선 확정 후).
- **Catalyst density·source freshness badge**: 데이터 충분하면 추가, 아니면 생략.
- **사이드바 IA 재정렬**(§1.2 #6, Screener 상단 이동)·Company Page 재구성·Screener 페이지 필터 고도화: 후속 spec(018+).
- 후속 데이터 수집 파이프라인(ClinicalTrials.gov·SEC·FDA)은 제품 로드맵 별도 트랙.

---

## §9 구현 순서(승인 후 제안)

1. `searchIndex.searchGrouped` + `Catalysts.jsx` URL 필터 (배관).
2. KpiStrip 확장 + full-page CTA.
3. 3-lane 컴포넌트 3종 + Dashboard 컨테이너 재배선.
4. ScreenerBanner CTA·인터랙션 규칙 정리.
5. UnifiedSearchResults(검색 모드).
6. 반응형·empty state·`npm run check`·로컬 검증 → `/deploy`.
