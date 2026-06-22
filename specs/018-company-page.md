# Spec 018 — Company Research Page (풀페이지 + 표준 탭)

> 상태: **DRAFT (승인 대기)**
> 작성: 2026-06-22
> 선행: spec 010(screener-integration·모달 라우팅), spec 012(검색), spec 014/015(research 내러티브·자산), spec 016(feed), spec 017(대시보드·CompanyLink)
> 근거: `biotech-catalyst-calendar-proposal.md` §2.1·§4.6 ("Company Page는 MVP의 핵심 destination, 모든 종목이 같은 섹션 순서")

---

## §0 동기 (왜)

spec 017로 대시보드의 모든 ticker/행이 `/app/company/:ticker`(CompanyLink)로 모인다. 그런데 현재 그 목적지는:

1. **모달 오버레이**다(`CompanyModalRoute` + backgroundLocation). 새 탭/직통(Ctrl+클릭)으로 열면 **빈 화면 위에 모달**이 뜬다 — 제안서가 말하는 "core destination 페이지"가 아니다.
2. **구조가 종목마다 다르다.** research 풀데이터(12 파일럿)는 TOC+자산 과학·시장+내러티브, 나머지 556종은 평평한 body 스크롤. 같은 위치에서 같은 정보를 비교하기 어렵다.
3. **탭이 없다.** 제안서는 "모든 종목이 동일한 섹션 순서의 표준 리포트"를 요구한다.

### 사용자 확정 결정 (2026-06-22)
- **풀페이지로 전환**(모달 오버레이 폐기). 앱 내 클릭·새 탭·직통 모두 동일한 풀페이지.
- **데이터 있는 탭만** 노출(없는 탭은 숨김, 단 노출되는 탭들의 **순서는 항상 고정**). 빈 탭 나열 X.
- 기존 dark 브랜딩 유지 · 한글 유지 · 가진 데이터만(신규 수집 0).

---

## §1 데이터 가용성 (568종 기준, 2026-06-22 측정)

| 데이터 | 보유 | 비고 |
|---|---|---|
| 회사개요 | 568 (100%) | 헤더·Overview 항상 가능 |
| 프로필 body (매출·플랫폼·상업화제품·파트너·적응증) | 379~474 | ~67~83% |
| 임상 body (임상디자인·타겟질환·기존치료제·사전공개임상) | 369~383 | |
| 약물 body (Modality·MOA·논문) | 364~382 | |
| 메모 | 384 | |
| 스크리너 점수(G/E/R·그룹·rerating) | screener.points | |
| 카탈리스트 타임라인 | **90종** | upcoming+resolved |
| 결과·뉴스 feed | **41종** | spec 016 |
| 30일 주가(스파크라인) | prices 캐시 | |
| **research 풀데이터**(자산 etiology/MOA/시장 P×Q·TAM/확장·피어·내러티브·점수) | **12 파일럿** | VRTX·ARGX·INSM·BBIO·HALO·CYTK·NTLA·ARVN·CRMD·ABEO·PYPD·VERU |
| 구조적 재무(매출·R&D·현금·런웨이·부채) | ❌ 없음 | 매출 text만 |
| NCT 임상시험 테이블(등록·1차완료일 등) | ❌ 없음 | |
| 지분·공매도 | ❌ 없음 | |

→ 제안서의 **Financials·Clinical Trials(NCT)·Ownership/Short** 탭은 데이터가 없어 **이번 범위 제외**. 가진 데이터로 채워지는 탭만 만든다.

---

## §2 목표 구조 — 풀페이지 + 탭

```
┌───────────────────────────────────────────────── (사이드바 + 상단바는 기존 레이아웃 유지) ┐
│  ← 뒤로                                                                                   │
│  ┌─ STICKY HEADER ───────────────────────────────────────────────────────────────────┐ │
│  │ [TICKER]  회사명 · Modality · Areas            현재가·30D 스파크·등락 · 시총         │ │
│  │ 스크리너 점수 strip: 그룹 · G · E · R · 신호    ★워치리스트                          │ │
│  │ ── 탭바: Overview · Catalysts · Pipeline · Clinical · 심층리서치 · News · Peers · Notes ─ │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│  ┌─ TAB CONTENT (스크롤) ─────────────────────────────────────────────────────────────┐ │
│  │ (선택된 탭의 섹션들)                                                                 │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 탭 정의 (고정 순서 · 데이터 있을 때만 노출)

| 탭 | 내용 (재사용 컴포넌트) | 노출 조건 |
|---|---|---|
| **Overview** | 회사개요 + 핵심 프로필(매출·상업화제품·플랫폼·파트너·적응증) + 다가오는 카탈리스트 미니 + (파일럿: atGlance·bottomLine·리서치 점수 요약) | **항상** |
| **Catalysts** | `CatalystTimeline`(upcoming+resolved outcome) | 카탈리스트 ≥1 (90종) |
| **Pipeline** | 파일럿: `AssetSection`(자산 etiology·MOA·시장 P×Q/TAM·확장·플랫폼). 그 외: 약물 body(Modality·MOA·논문)+상업화제품·적응증 | 자산 또는 약물 body 존재 |
| **Clinical** | 임상 body(임상디자인·타겟질환·기존치료제·사전공개임상) | 임상 body ≥1 |
| **심층 리서치** | 파일럿 내러티브(성장전망·수익성·경쟁우위·재무건전성·밸류에이션·주주환원·종합) + 점수바 | research 존재(12 파일럿) |
| **News** | `CompanyFeed`(결과·뉴스) + research.news | feed 또는 research.news 존재 |
| **Peers** | `PeerChart`(G·E) + research.peers 목록 | 스크리너 매칭 피어 ≥2 |
| **Notes** | 메모 + Sources | 메모 또는 sources 존재 |

- 거의 모든 종목이 Overview는 노출. 미니멀 종목(회사개요만)은 Overview(+ Catalysts/Notes 가능 시)만.
- 탭이 1개뿐이면 탭바 숨김(그냥 Overview 본문).
- 기본 선택 = Overview. URL에 `?tab=catalysts` 등으로 탭 딥링크(선택적, 새 탭에서 특정 탭 열기).

---

## §3 라우팅 변경 (모달 → 풀페이지)

현재(spec 010): `App.jsx`가 backgroundLocation 오버레이 + 별도 `<Routes>`로 `CompanyModalRoute`(CompanyDetail 모달) 렌더.

변경:
1. **메인 descendant Routes에 `company/:ticker` 추가** → `CompanyPage`를 본문 영역(사이드바·상단바 레이아웃 안)에서 풀페이지로 렌더.
2. **backgroundLocation 오버레이 로직·모달 Routes 제거**(company 한정). `openCompany`는 단순 `navigate('/app/company/'+ticker)`.
3. **`CompanyLink` 단순화** — `state={{backgroundLocation}}` 제거, 평범한 `<Link to="/app/company/:ticker">`. Ctrl/⌘/가운데 클릭 새 탭은 그대로(앵커라서).
4. **뒤로/닫기** — `← 뒤로` 버튼 = `navigate(-1)`, 히스토리 없으면(콜드/새 탭) `navigate('/app')`.
5. `pushRecent(ticker)`는 CompanyPage 마운트 시 호출(기존 유지).
6. `pathToTab('/app/company/...')` → 사이드바 활성 탭은 일단 'companies'로 매핑(또는 없음). 상단바 제목에 회사명 표시(선택).

> 영향: 모달 전용 CSS(.modal/.modal-wide/.modal-backdrop)는 company에서 미사용(결과 상세 모달 등 다른 용도는 유지). spec 010 모달 패턴 문서에 "company는 spec 018에서 풀페이지로 전환" 주석.

---

## §4 컴포넌트 계획

기존 `CompanyDetail.jsx`의 **하위 렌더 컴포넌트를 최대한 재사용**(Hero·ScreenerScore·CatalystTimeline·SidePanels·BodySection·AssetSection·NarrativeSection·PeerChart·NewsSection·CompanyFeed·WatchlistPanel). 모달 껍데기·TOC 스크롤만 탭 구조로 교체.

```
src/pages/CompanyPage.jsx          ← 신규. 풀페이지 셸: 뒤로버튼 + sticky 헤더(Hero+Score+탭바) + 탭 콘텐츠 라우팅.
src/components/company/             ← CompanyDetail.jsx에서 하위 컴포넌트 분리·이동(재사용 단위화)
  ├── CompanyHeader.jsx            ← Hero + ScreenerScore + watchlist + 뒤로
  ├── TabOverview.jsx
  ├── TabCatalysts.jsx             ← CatalystTimeline 래핑
  ├── TabPipeline.jsx              ← AssetSection / 약물 body 분기
  ├── TabClinical.jsx
  ├── TabResearch.jsx             ← 내러티브 + 점수
  ├── TabNews.jsx                  ← CompanyFeed + research.news
  ├── TabPeers.jsx                 ← PeerChart + peers
  └── TabNotes.jsx                 ← 메모 + sources
src/App.jsx                        ← 라우팅 변경(§3)
src/components/CompanyLink.jsx     ← state 제거 단순화
src/components/CompanyDetail.jsx   ← 폐기 또는 유지(미사용). 재사용 컴포넌트 추출 후 제거 권장.
```

- 탭 가용성 판정 함수 `availableTabs(company, screener, data)` → 노출 탭 배열(고정 순서) 반환. 1개면 탭바 숨김.
- 점수/스파크라인/피어차트 등 기존 로직 그대로 이식. Plotly lazy import 유지.

---

## §5 비범위 (이번 spec 제외)
- 신규 데이터 수집(재무·NCT·지분). Financials/Clinical Trials(NCT)/Ownership 탭 없음.
- 모달 패턴 전면 폐기(결과 상세 모달 등 다른 모달은 유지).
- 사이드바 IA 재정렬(별도), 대시보드 추가 변경.
- AI 요약 생성.

## §6 검증 / 완료 기준
- `npm run check` 통과(데이터 변경 없음, 코드만).
- 앱 내 ticker 클릭 → 풀페이지 이동, `← 뒤로`로 복귀. Ctrl/가운데 클릭 → 새 탭에 동일 풀페이지. 여러 종목 동시 탭 가능.
- 탭은 데이터 있는 것만, 순서 고정. Overview 항상. 미니멀 종목도 깨지지 않음.
- 12 파일럿: 자산 과학·시장·내러티브·피어 모두 정상(회귀 없음).
- 콜드 로드(새 탭)에서 헤더·탭·콘텐츠 정상, 빈 화면 위 모달 현상 사라짐.
- dark 브랜딩·기존 섹션 시각 회귀 없음.

## §7 오픈 이슈
- 탭 딥링크(`?tab=`) 구현 범위 — 기본은 Overview, 딥링크는 선택.
- 사이드바 활성표시(company 진입 시) — 'companies' 매핑 or 무표시. 구현 중 결정.
- `심층 리서치` 탭 vs Overview에 흡수 — 파일럿만 있으므로 별도 탭 권장(비파일럿은 미노출).

## §8 구현 순서(승인 후)
1. CompanyDetail 하위 컴포넌트 `components/company/`로 추출.
2. `availableTabs` + CompanyPage 셸(헤더+탭바+콘텐츠).
3. 탭 컴포넌트 8종 배선(기존 렌더 재사용).
4. App 라우팅 변경 + CompanyLink 단순화 + 뒤로 동작.
5. 반응형·empty state·콜드로드 검증 → `npm run check` → `/deploy`.
