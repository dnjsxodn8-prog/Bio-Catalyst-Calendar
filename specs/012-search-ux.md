# spec 012 — 검색 UX 개선 (자동완성 · 어디서든 종목상세 · 점수 표시)

> 상태: **승인됨 (2026-06-17)** · 선행 spec: 010(스크리너 통합)·011(마이크로캡 커버리지)
>
> **승인 시 확정 사항:**
> - 적용 범위 = **인증 앱(/app) + 공개 페이지 둘 다.**
> - 검색 대상 = ticker·회사명·modality·areas **+ body(약물명·적응증)**.
> - 공개 측 = **자동완성만, 종목 상세는 로그인 유도**(공개 상세 신규 안 만듦). 공개 인덱스는 **개인 `메모`·`회사 개요` 제외**(사실 필드만: 적응증·타겟 질환·MOA·플랫폼·상업화 제품·카탈리스트·파트너). 인증 측은 전 필드(메모 포함) 인덱싱.
> - 공개 드롭다운도 G/E 점수 노출(이미 공개 스크리너 사이트로 공개된 값이라 일관).

## 0. 배경 / 문제

현재 `/app` 검색(Topbar 입력 → 전역 `query`)의 한계:

1. **자동완성 없음** — 타이핑해도 후보 종목이 안 뜸. 정확한 ticker를 알아야 함.
2. **대시보드 검색이 카탈리스트만 매칭** — `Dashboard.jsx`는 `query`로 `data.catalysts`만 필터(`src/pages/Dashboard.jsx:27`). 카탈리스트 없는 종목은 검색해도 안 나오고, 종목 상세로 갈 길이 없음.
3. **점수가 안 보임** — `screener.generated.json`에 종목별 G/E/tier/rerating(532 points)이 있는데, 검색·종목상세 어디서도 노출 안 됨. `Screener.jsx`는 전역 `query`를 **소비조차 안 함**.

## 1. 목표

- **(A) 자동완성 드롭다운**: Topbar 검색에 타이핑하면 관련 종목이 드롭다운으로 뜬다. 각 항목에 ticker·회사명·**G/E 점수 배지·tier**·임박 카탈리스트 D-day 표시.
- **(B) 어디서든 종목 상세로**: 드롭다운에서 아무 종목이나 클릭 → `/app/company/:ticker` 모달. **카탈리스트 유무·현재 탭과 무관.** (기존 페이지별 필터는 그대로 유지 — 가산적 변경)
- **(C) 점수 확인**: 검색 결과(드롭다운) + 종목 상세 + 스크리너 페이지에서 G/E/tier/rerating 확인 가능.

비목표: 공개 페이지(`PublicLayout`/`*Public.jsx`) 검색은 이번 범위 밖(후속). 데이터 스키마 변경 없음(읽기 전용 조인).

## 2. 설계

### 2.1 통합 검색 인덱스 — `src/utils/searchIndex.js` (신규)
- 입력: `data.companies`(전 종목) + `screener.generated.json.points`(ticker 조인).
- 각 엔트리: `{ ticker, company, modality, areas, mcap, g, e, grp, rl, wl, hasScore, nextCatalyst, dDay }`.
  - 점수(g/e/grp/rl/wl)는 screener point에서, 없으면 `hasScore=false`.
  - `nextCatalyst`/`dDay`는 `data.catalysts`에서 해당 ticker의 가장 가까운 미래 이벤트(있으면).
- `search(q, limit=8)`: 랭킹 = ① ticker 정확일치 → ② ticker prefix → ③ 회사명 부분일치 → ④ modality/areas 부분일치. 동순위는 mcap 내림차순. 빈 쿼리는 빈 배열.

### 2.2 자동완성 드롭다운 — `src/components/SearchBox.jsx` (신규, Topbar 인라인 입력 대체)
- props: `value, onChange, onPick(ticker), index`.
- 동작: 포커스+입력 있으면 드롭다운 표시. 항목 행 = **TICKER**(굵게) · 회사명(말줄임) · 우측에 점수 배지(`G84·E90` + tier 점) 또는 카탈리스트 D-day.
- 키보드: ↑/↓ 이동, Enter 선택(→`onPick`), Esc 닫기. `⌘K`/`Ctrl+K`로 포커스(기존 kbd 힌트 실작동화). 바깥 클릭/blur 시 닫기.
- 접근성: `role=listbox`/`option`, `aria-activedescendant`.
- 스타일: 기존 토큰(`bg-panel-2`,`border-line`,`text-ink`) 재사용. Topbar의 현 입력 박스 폭 계승.

### 2.3 배선
- `Topbar.jsx`: 입력부를 `<SearchBox>`로 교체. 새 prop `onPickCompany`, `index` 받음.
- `App.jsx`: `Topbar`에 `onPickCompany={openCompany}` + `index`(아래 useMemo) 전달. `query`/페이지 필터는 그대로(드롭다운은 가산).
  - `index = useMemo(() => buildIndex(data, screener), [])`.

### 2.4 종목 상세 점수 패널 — `CompanyDetail.jsx`
- ticker가 screener에 있으면 상단에 작은 패널: **G {g} · E {e} · {tier}** + rerating 라벨/watchlist + R_total. 없으면 "스크리너 미채점" 또는 패널 생략.
- 읽기 전용 조인(screener.generated.json lookup). 점수 해석 한 줄(예: "G=과학적 위대함, E=실행력, 0–100").

### 2.5 스크리너 페이지 쿼리 반응 (C 보강) — `Screener.jsx`
- 전역 `query`가 종목과 매칭되면: 해당 point를 차트에서 강조(테두리/확대) + 상단에 "검색 결과" 카드(ticker·회사·G/E·tier·rerating, 클릭 시 `onOpenCompany`).
- 매칭 없으면 카드 숨김. 차트 자체 필터링은 안 함(시총 버킷 필터와 충돌 방지).

## 3. 변경 파일
- 신규: `src/utils/searchIndex.js`, `src/components/SearchBox.jsx`, `specs/012-search-ux.md`
- 수정: `src/components/Topbar.jsx`, `src/App.jsx`, `src/components/CompanyDetail.jsx`, `src/pages/Screener.jsx`
- 데이터/빌드 스크립트 변경 없음. `npm run check`(lint+verify-data) 통과 필요.

## 4. 검증
- 타이핑 시 드롭다운, ↑/↓/Enter/Esc 동작.
- 카탈리스트 없는 종목(예: 무등급 종목) 검색 → 드롭다운에 뜨고 클릭 시 상세 모달 열림.
- 드롭다운·상세·스크리너에서 G/E/tier 표시.
- 대시보드/종목/카탈리스트 페이지의 기존 필터 동작 회귀 없음.
- preview로 실제 렌더 확인(필수).

## 5. 미해결/선택
- 공개 페이지 검색 동일 적용 여부(후속 spec).
- 드롭다운에 약물/적응증(body) 인덱싱까지 확대할지(현재 modality/areas까지만 — body는 무거움).
