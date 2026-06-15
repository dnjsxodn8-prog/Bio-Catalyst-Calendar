# 010 — Great Biotech Screener 통합 (스크리너 페이지 + URL 라우팅)

> 상태: **초안 (승인 대기)** · 작성일 2026-06-15
> 선행 spec: 002(UI), 008(deploy), 009(auth-and-seo)
> 트리거: 사용자 요청 — "GBS의 G×E 차트를 Calendar에 네이티브 React로 통합"

---

## §0. 배경 · 사실확인 (구현 전 합의된 전제)

이 spec은 별도 프로젝트 **Great Biotech Screener**(`../great-biotech-screener`, 이하 GBS)의
G×E 스크리닝 결과를 Calendar 사이트 안에 **네이티브 React 차트**로 이식한다. iframe·외부 링크 아님.

구현 착수 전 코드베이스를 조사하며 확인한 사실(사용자 제공 수치와 차이가 있어 명시):

1. **라우팅 현황**: `main.jsx`는 이미 react-router(`BrowserRouter`)를 쓴다. 단,
   `/app/*`는 catch-all로 `ProtectedApp → App.jsx`에 위임되고, **`App.jsx` 내부는 라우트가 아니라
   `useState('dashboard')` 탭-state**다. 즉 `/app` 안에서는 URL이 바뀌지 않는다.
   (부수효과: `CompaniesPublic`의 `to="/app/companies"` 링크도 실제론 항상 dashboard 탭으로 진입 —
   기존 잠재 버그. 이 spec의 라우팅 이관으로 함께 해소된다.)

2. **커버리지 전제 갱신**: 사용자 메모는 "스크리너 575종 중 377 Calendar 등록 / 198 미등록"이었으나,
   **현재 데이터 기준 leaderboard 575종 전부가 Calendar에 md로 존재**(누락 0종).
   마이크로캡 160종(`mcap<100`)도 전부 Calendar에 들어와 있다.
   → "미등록 dot 버튼 비활성" 분기는 **미래 대비로 구현하되, 현시점 화면엔 사실상 0건**.
   커버리지는 **하드코딩 금지, 빌드시 동적 계산**.

3. **`npm run check` 현재 RED**: `verify-data`가 406 에러로 exit 1
   (마이크로캡 160종 `mcap≥100` 규칙 위반 + 다수 `sources` 누락). lint는 green.
   → **이 spec의 합격 게이트는 "기능 단위 green"**: lint green + `build-screener` 정상 동작 +
   스크리너가 *새* verify-data 에러를 추가하지 않음. 기존 데이터레이어 RED는 본 spec 범위 밖(별도 정리 과제).

4. **배포 제약 (중요)**: Vercel은 Calendar GitHub repo만 빌드한다.
   sibling `../great-biotech-screener`는 **Vercel에 존재하지 않는다**.
   따라서 `src/screener.generated.json`은 **반드시 git 추적(커밋)** 되어야 하고
   (`data.generated.json`은 gitignore이지만 이건 예외), 동기화 지점은 **로컬 빌드/배포**다(§3).

### 결정 사항 (사용자 승인 완료, 2026-06-15)

- **D1 — 라우팅 위치**: 스크리너·기업 딥링크 모두 **`/app` 보호 영역**.
  `/app/screener`, `/app/company/:ticker`. (CompanyDetail = 가입자 전용 풀콘텐츠이므로 인증 모델과 일관.)
- **D2 — 합격 게이트**: **기능 단위 green**(§0.3). 기존 데이터레이어 RED는 분리.

---

## §1. 목표 · 비목표

### 목표
- G1. 새 페이지 **스크리너**(`/app/screener`): ① G×E×T1 3D 산점도 ② G×E 2D 사분면
  ③ 시총 구간 필터 ④ Rerating 패널. 원본 `make_viz.py` 산출(`리더보드_3D시각화.html`)과 동등.
- G2. Plotly는 **스크리너 페이지에서만 lazy-load**(번들 비대화 방지).
- G3. 대시보드에 **'Great Biotech Screener' 배너/카드** → 스크리너 페이지 링크.
- G4. **URL 라우팅 도입**: `/app` 내부 탭-state → 중첩 react-router. `/app/screener` +
  기업 딥링크 `/app/company/:ticker`(기존 `CompanyDetail` 재사용). 차트 dot → '상세정보 보기' → 딥링크 이동.
- G5. **자동 동기화 빌드 스크립트** `scripts/build-screener.mjs`:
  GBS `data/leaderboard.csv` → `src/screener.generated.json`. 로컬 빌드/배포 시 최신 반영(§3).
- G6. **커버리지 게이팅**: Calendar에 있는 티커만 '상세정보 보기' 활성. 없는 dot은 버튼 비활성 +
  호버 시 스크리너 G/E/시총만 인라인.

### 비목표
- N1. GBS 점수 산정 로직 변경·재계산 (Calendar는 **읽기 전용 소비자**).
- N2. 마이크로캡/데이터레이어 RED 정리 (별도 과제, §0.3).
- N3. 공개(비로그인) 스크리너 노출 (D1: 보호 영역).
- N4. 스크리너 데이터의 Calendar md 편입 (스크리너 json은 독립 산출물).

---

## §2. URL 라우팅 이관 (탭-state → 중첩 라우트)

> 원칙: **기존 탭 동작·모달 동작을 시각적으로 깨지 않게**. 페이지 컴포넌트(Dashboard/Companies/
> Catalysts/Conferences)의 **props API는 유지**(최소 변경).

### 2.1 라우트 트리 (`/app` 하위)

`main.jsx`의 `<Route path="/app/*" element={<ProtectedApp/>} />`는 유지.
`App.jsx`를 **레이아웃 셸**로 바꾸고 내부에서 중첩 `<Routes>`를 선언한다:

```
/app                    → Dashboard      (index)
/app/companies          → Companies
/app/catalysts          → Catalysts
/app/conferences        → Conferences
/app/screener           → Screener       (신규, lazy)
/app/company/:ticker    → CompanyDetail  (모달 라우트, 배경 위 오버레이)
```

### 2.2 탭 ↔ 경로 매핑 (Sidebar/Topbar 최소 변경)

- `App.jsx`가 `useLocation`으로 현재 경로 → `tab` 파생(`pathToTab`), `useNavigate`로 이동.
- **Sidebar props 계약 유지**: `tab`(파생값), `onTab={(id)=>navigate(tabToPath(id))}` 그대로 전달.
  Sidebar 내부 코드는 **변경 없음**(여전히 `onTab(id)` 호출).
- **Topbar props 계약 유지**: `tab`(파생값) 그대로. 페이지 타이틀 로직 무변경.
- Sidebar NAV에 **스크리너 항목 추가**(`{ id:'screener', label:'스크리너', sub:'Screener', icon: <적절>}`)
  → `tabToPath('screener') = '/app/screener'`.

### 2.3 기업 모달 라우트 (`/app/company/:ticker`)

`CompanyDetail`은 `position:fixed` 풀스크린 모달(`modal-backdrop`)이라 **배경 페이지를 덮는다**.
딥링크와 인앱 클릭을 모두 지원하기 위해 **react-router "background location" 패턴** 사용:

- 페이지에서 종목 클릭 시: `onPick(item)` →
  `navigate('/app/company/'+item.ticker, { state: { backgroundLocation: location } })`.
- `App.jsx`는 `location.state?.backgroundLocation`이 있으면 **그 배경 location**으로 메인 `<Routes>`를
  렌더(밑 페이지 유지) + 별도 모달 `<Routes>`에서 `company/:ticker` 매칭 시 `CompanyDetail` 오버레이.
- **콜드 딥링크**(backgroundLocation 없음): 메인 `<Routes>`가 `company/:ticker`를 직접 매칭 →
  `CompanyDetail`을 단독 오버레이로 렌더(배경은 비어도 backdrop이 덮으므로 시각적 문제 없음).
- `onClose`: backgroundLocation 있으면 `navigate(-1)`(배경 페이지로 복귀), 없으면 `navigate('/app/screener')`.
- `pushRecent(ticker)`: 모달 라우트 마운트 시 호출(현 `App.jsx`의 `pick.ticker` effect 로직 이관).

> 이 패턴은 React Router 공식 모달 라우팅 방식. 페이지 언마운트/스크롤 손실 없이 딥링크 가능.

### 2.4 회귀 방지 체크리스트 (수동 검증, §8)
- [ ] `/app` 직접 진입 → 대시보드, Sidebar '대시보드' 활성.
- [ ] Sidebar 4개 탭 클릭 → URL 변경 + 해당 페이지 + 활성 표시 + 카운트 배지 정상.
- [ ] 대시보드/종목/카탈리스트에서 행 클릭 → `/app/company/:ticker`, 모달 표시, 닫기 시 원위치 복귀.
- [ ] `/app/company/VRTX` 새로고침(콜드) → 모달 단독 표시, 닫기 → 스크리너.
- [ ] 브라우저 뒤로/앞으로가 탭·모달과 일관.
- [ ] 기존 `/catalysts` 등 공개 라우트·랜딩·로그인 흐름 무변경.

---

## §3. 데이터 동기화 — `scripts/build-screener.mjs`

### 3.1 입력 · 출력
- 입력: `../great-biotech-screener/data/leaderboard.csv` (UTF-8 BOM, `csv` 헤더는 make_viz와 동일 컬럼).
- 입력: Calendar 티커 집합 = `data/companies/*.md` 파일명(빌드 의존 최소화 위해 md 파일명 사용).
- 출력: `src/screener.generated.json` (**git 추적/커밋**).

### 3.2 산출 스키마 (make_viz 데이터 모델 미러 + 커버리지 플래그)

```jsonc
{
  "generated": "2026-06-15T...Z",
  "source": "great-biotech-screener/data/leaderboard.csv",
  "counts": { "위대한 후보": N, "관찰 후보": N, "무등급": N, "부적격": N },
  "coverage": { "total": 575, "inCalendar": 575, "missing": 0 },
  "points": [
    {
      "t": "VRTX", "c": "Vertex Pharmaceuticals",
      "g": 100, "e": 100, "t1": 2, "m": 120000,
      "grp": "위대한 후보",          // disq→부적격, tier 위대/관찰, else 무등급 (make_viz §grp 규칙 동일)
      "cat": "2026-11-30 (...)",      // next_catalyst
      "lg": true,                     // large_cap_flag
      "rl": "Already Rerated",        // rerating_label
      "wl": "Avoid/Lower Priority",   // watchlist
      "rt": 42.5,                     // R_total (float|null)
      "inCalendar": true              // 커버리지 게이트 (§6)
    }
  ]
}
```

- 파싱 규칙은 `make_viz.py`와 **동일**하게: `G_conf`/`E_conf` 파싱 실패행(전부 N/E 툴·진단) skip,
  `mcap` 정수 변환 실패 → null, `T1` 숫자 아니면 0, `grp` 산정 동일,
  `R_total` 빈/None → null. (단일 진실: make_viz 로직을 JS로 1:1 포팅.)

### 3.3 best-effort 동작 (Vercel 안전)
- leaderboard.csv **발견** → 재생성, `screener.generated.json` 덮어쓰기. 콘솔에 counts·coverage 출력.
- leaderboard.csv **없음**(Vercel 등):
  - 기존 커밋된 `screener.generated.json` **있으면 그대로 두고 경고만**(`⚠ leaderboard 없음 — 커밋본 유지`).
  - 없으면 빈 골격(`points:[]`, `coverage.total:0`) 작성하되 **build 실패는 아님**(exit 0).
- **절대 exit 1 금지**(Calendar 빌드를 막지 않음).

### 3.4 빌드 연결
- `package.json` scripts:
  - `"build-screener": "node scripts/build-screener.mjs"`
  - `"prebuild"`·`"predev"`에 체이닝: `node scripts/build-data.mjs && node scripts/build-screener.mjs`
    (data 생성 후 screener 생성).
- **동기화 계약**: `screener.generated.json`은 커밋된다. "Calendar 배포할 때마다 최신"을 보장하려면
  **로컬에서** `npm run build-screener`(또는 `npm run build`)를 돌려 json을 갱신·커밋 후 push해야 한다.
  → `/deploy` 스킬에 `build-screener` 선행 단계 추가를 **후속 권고**(이 spec에서는 스크립트·체이닝까지,
  deploy 스킬 수정은 별도 승인). Vercel은 커밋된 json을 그대로 사용.
- `.gitignore`: `src/screener.generated.json`은 **추가하지 않음**(추적 유지). `data.generated.json`과 대비.

---

## §4. 스크리너 페이지 (`src/pages/Screener.jsx`)

### 4.1 차트 구성 (make_viz 4블록 이식)
1. **시총 구간 필터** — select(전체/＜$100M/$100M–1B/1B–10B/10B–100B/≥$100B). 3D·2D 동시 redraw.
   표시 카운트 라벨. (make_viz `mcsel`/`mcBucket` 동일 경계.)
2. **① 3D 산점도** — `scatter3d`, x=G y=E z=T1(또는 시총 로그 토글), 버블=시총, 색=등급,
   결정적 jitter(make_viz `rnd`), WL은 마커 +크기. 카메라 초기화 버튼.
3. **② 2D 사분면** — `scatter`, 70/70 초록 zone + 70/60 컷 + 60/60 dot, 코너 주석, WL=노란 테두리.
4. **③ Rerating 패널** — Primary/Aggressive 또는 Early Rerating/Deep Value Watch 활성 종목 표
   (종목·회사·G/E·라벨·watchlist·R_total). make_viz `_RR_ACTIVE` 규칙 동일.

색/순서/임계/hover 포맷은 make_viz 상수(`COLOR`,`ORDER`,`size`,`hover`) 그대로 이식.
**다크 테마**(스크리너는 `/app` = 다크 셸)로 Calendar 토큰에 맞춤.

### 4.2 Plotly lazy-load
- 의존성 추가: `plotly.js-dist-min`(현재 미설치).
- `Screener.jsx`는 `React.lazy`로 라우트 분할. Plotly는 컴포넌트 내 `useEffect`에서
  `const Plotly = (await import('plotly.js-dist-min')).default` 동적 import → ref div에 렌더.
  → Plotly(~3MB+)는 **스크리너 진입 시에만** 별도 chunk 로드. 다른 페이지 번들 불변.
- 로딩 중 스켈레톤/스피너. import 실패 시 폴백 메시지.

### 4.3 dot → 상세정보 (§6 커버리지 게이트)
- hover 시 종목 정보 + (inCalendar) **'상세정보 보기'** 버튼.
- 클릭 → `navigate('/app/company/'+ticker, { state:{ backgroundLocation } })` (§2.3).
- Plotly 네이티브 호버는 버튼을 못 넣으므로, **클릭(`plotly_click`) 시** 선택 종목 패널/툴팁을
  React로 띄우고 거기에 버튼 배치(또는 클릭 즉시 inCalendar면 이동, 아니면 인라인 G/E/시총 표시).
  구체 UX는 구현 중 확정(클릭-패널 방식 권장).

---

## §5. 대시보드 배너/카드 (`src/pages/Dashboard.jsx`)

- 대시보드 상단(KpiStrip 위 또는 HeroWeek 옆)에 **'Great Biotech Screener' 카드**:
  G×E 한 줄 설명 + 위대/관찰 카운트(스크리너 json `counts`) + `→ /app/screener` 링크/버튼.
- 클릭 시 `navigate('/app/screener')`. 시각 톤은 기존 Dashboard 카드 스타일 따름.
- 스크리너 json은 Dashboard에서 `counts`만 가볍게 import(Plotly 미로딩).

---

## §6. 커버리지 게이팅

- `screener.generated.json` 각 point `inCalendar`로 결정(빌드시 계산).
- `inCalendar:true` → '상세정보 보기' 활성 → `/app/company/:ticker`.
- `inCalendar:false` → 버튼 비활성 + 클릭/호버 시 **스크리너 G/E/시총만 인라인**(딥링크 없음).
- 현시점 missing=0이라 비활성 케이스는 거의 없음(§0.2). 분기는 구현·테스트하되 화면상 희소.

---

## §7. 파일 변경 요약

**신규**
- `specs/010-screener-integration.md` (본 문서)
- `scripts/build-screener.mjs`
- `src/pages/Screener.jsx` (lazy)
- `src/screener.generated.json` (build-screener 산출, **커밋**)
- (선택) `src/components/ScreenerCard.jsx` (대시보드 카드)

**수정**
- `package.json` — `build-screener` 스크립트 + prebuild/predev 체이닝, `plotly.js-dist-min` 의존성.
- `src/App.jsx` — 탭-state → 중첩 라우트 셸(§2). Sidebar/Topbar props 계약 유지.
- `src/components/Sidebar.jsx` — NAV에 스크리너 항목 1줄 추가.
- `src/pages/Dashboard.jsx` — GBS 카드 추가(§5).
- `main.jsx` — `/app/*` 유지(필요 시 background-location 처리 위치만 조정).

**불변(절대 미수정)**: GBS repo 전체, `make_viz.py`, 다른 페이지 컴포넌트 로직, 공개 라우트.

---

## §8. 합격 기준 (게이트 = 기능 단위 green, D2)

1. `npm run lint` → exit 0 (현재도 green 유지).
2. `npm run build-screener` → exit 0, `src/screener.generated.json` 생성/갱신,
   콘솔 counts·coverage 출력. leaderboard 없을 때도 exit 0(§3.3).
3. `npm run build` → 성공(Plotly 별도 chunk 확인, 메인 번들에 plotly 미포함).
4. `npm run verify-data` → **새 에러 0 추가**(스크리너 작업이 기존 406을 늘리지 않음).
   (기존 RED 자체 해소는 비목표.)
5. §2.4 라우팅 회귀 체크리스트 수동 통과(`npm run dev`, port 5179).
6. 스크리너 4블록이 make_viz 산출과 시각·수치 동등(분포 counts·Rerating 행 일치 spot-check).

> 합격 후 사용자에게 결과 시연(스크린샷/카운트). **배포(`/deploy`)는 사용자 검토 후 결정**(자동 커밋·push 금지).

---

## §9. 리스크 · 롤백

- **R1 라우팅 이관 회귀**: 탭/모달 동작 미묘하게 깨질 수 있음 → §2 props 계약 유지 + §2.4 체크리스트로 방지.
  롤백: App.jsx만 git revert(다른 파일 독립).
- **R2 Vercel 데이터 공백**: sibling 부재로 빈 차트 → §3.3 best-effort + 커밋된 json으로 방지.
  배포 전 로컬 `build-screener` 갱신 필수(§3.4 동기화 계약).
- **R3 번들 비대화**: Plotly lazy 분할로 방지(§4.2). build 후 chunk 크기 확인.
- **R4 데이터레이어 RED 혼동**: 기존 verify-data 406과 본 기능 게이트 분리(§0.3, §8.4).
- **R5 스키마 드리프트**: leaderboard 컬럼 변경 시 build-screener 파싱 깨짐 →
  파싱은 make_viz와 1:1, 컬럼 누락시 graceful(빈값) 처리.

---

## §10. 미해결 / 후속

- Q. `/deploy` 스킬에 `build-screener` 선행 단계 자동화? (이 spec은 스크립트·체이닝까지. 스킬 수정은 별도 승인.)
- Q. 스크리너 공개 노출(마케팅) 여부 — 현재 보호(D1). 추후 공개 원하면 별도 spec(공개용은 G/E/시총만).
- Q. 데이터레이어 RED(마이크로캡 160 + sources 누락) 정리 — 별도 과제.
