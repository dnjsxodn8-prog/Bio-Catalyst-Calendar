# spec 020 — Screener 페이지 고도화 (탐색 도구화)

> 상태: **초안 (승인 대기)** · 작성 2026-06-22
> 선행: spec 010(스크리너 통합) · spec 011(마이크로캡 커버리지) · spec 012(검색 UX) · spec 017 §8(여기서 defer된 "Screener 페이지 필터 고도화")
> 근거 문서: `biotech-catalyst-calendar-proposal.md` §1.2 #5 + 부록("Advanced Search · Save Search · saved search selector가 핵심 UX")

---

## §0 동기 (왜)

현재 `src/pages/Screener.jsx`(506줄, 단일 파일)는 **"보기만 하는 차트 장난감"**이다. 직접 확인한 한계:

1. **필터가 시총 구간 `<select>` 하나뿐.** 등급·G/E/T1 범위·rerating·Calendar 등록·모달리티/적응증으로 거를 수단이 전혀 없다.
2. **정렬 가능한 테이블/리스트 뷰 부재.** 531개 점을 3D/2D Plotly 점구름에서 작은 점을 클릭해야만 개별 종목 접근 → 조잡.
3. **컨트롤이 흩어짐.** 시총 필터 패널 / 3D Z축 셀렉트 / rerating 표가 따로 놀고, 통합 컨트롤 바 없이 세로로 길게 나열만.
4. **저장검색·프리셋·URL 동기화 없음** → 공유·복원 불가.
5. **비교·다중선택 동선 없음.**
6. **바이오 특화 컬럼**(모달리티·적응증·런웨이·하위점수·카탈리스트 일자)이 스캔 가능한 형태로 안 보임.

목표: 조잡한 조작 → **제대로 다룰 수 있는 탐색 도구.** 통합 컨트롤 바 + 정렬 가능한 데이터 테이블(기본) ↔ 기존 3D/2D 차트 토글, 멀티패싯 필터, 저장검색, URL 동기화.

---

## §1 범위 / 비범위

### 범위
1. **테이블 뷰 신설(기본 뷰)** — 정렬 가능한 데이터 테이블. 좁은 폭에서는 카드 리스트로 전환.
2. **차트 뷰 유지** — 기존 3D/2D Plotly + Rerating 레이어를 **버리지 않고** 토글로 통합. 필터는 차트·테이블 공통 적용.
3. **통합 컨트롤 바** — 뷰 토글 + 검색 + 정렬 + 필터 진입 + 저장검색 셀렉터를 한 줄(또는 sticky 바)로.
4. **멀티패싯 필터** — 등급 칩 · G/E/T1 범위 · 시총 · runway · rerating · Calendar 전용 · **모달리티 칩 · 적응증 칩**.
5. **저장검색(localStorage)** — 필터 + 정렬 + 뷰 모드 전체를 한 프리셋으로 저장/복원/삭제. (사용자 결정)
6. **URL 동기화** — 필터·정렬·뷰 상태를 query string에 실어 공유·복원 가능(`useSearchParams`).
7. **build-screener.mjs 확장** — 바이오 특화 컬럼 추가 projection(§4).

### 비범위 (defer)
- 종목 **비교(compare) 전용 뷰**(나란히 하위점수 대조) — 다중선택 기반 데이터는 이번에 깔되, 전용 비교 패널은 후속 라운드.
- catalyst_window(퍼지윈도우, 커버리지 2%)·외부 데이터 수집 파이프라인.
- 차트 자체의 새 축/시각화 추가(기존 3D/2D 유지만).
- 모바일 PWA(spec 005 §0 폐기 유지).

---

## §2 데이터 가용성 매핑 (Phase 0 감사 결과 — "가진 데이터만")

leaderboard.csv 574행 중 **G·E 둘 다 있는 plot 대상 = 531행**(나머지 43은 N/E 도구/진단주 → 점 없음, 현 동작 유지). 커버리지는 531 기준.

| 필드 | 출처 | 커버리지 | 용도 | 현 projection |
|---|---|---|---|---|
| `grp` 등급 | leaderboard | 100% | 칩 필터·색 | ✅ |
| `g`(G_conf)·`e`(E_conf) | leaderboard | 100% | 범위 필터·정렬·축 | ✅ |
| `t1` 임박도 0~4 | leaderboard | 100% | 범위 필터·정렬 | ✅ |
| `m` 시총 | leaderboard | ~94% | 구간 필터·정렬·점크기 | ✅ |
| `rl`·`wl`·`rt` rerating | leaderboard | 100% | 칩/토글·정렬 | ✅ |
| `inCalendar` | join | 100% | 토글 필터·CTA | ✅ |
| **`runway` 런웨이(분기)** `runway_q` | leaderboard | **94%** (501) | 슬라이더·정렬·배지 ⭐ | ❌ 신규 |
| **`mod` 모달리티** | **universe.csv join** | **89%** (471) | 칩 필터·컬럼 | ❌ 신규 |
| **`area` 적응증**(배열) | **universe.csv join** | **66%** (349) | 칩 필터·컬럼 | ❌ 신규 |
| `gt`(G_total)·`et`(E_total) | leaderboard | 100% | 정렬·컬럼 | ❌ 신규 |
| `g1·g2·g3`/`e1~e5` 하위점수 | leaderboard | 100% | (비교 데이터·tooltip) | ❌ 신규 |
| `tt`(T_total)·`t2`·`t3` | leaderboard | 100% | 정렬·컬럼 | ❌ 신규 |
| `conf`(confidence)·`cov`(coverage_ratio) | leaderboard | 100% | 신뢰도 배지 | ❌ 신규 |
| `kdate` key_catalyst_date | leaderboard | **26%** (137) | 컬럼·정렬, **나머지 empty** | ❌ 신규 |
| `cstale`·`stale`·`listing` 플래그 | leaderboard | 100% | 배지/필터 | ❌ 신규 |

**모달리티 16종**(Small Molecule 154·TBD-review 121·Antibody 56·Gene Therapy 26·Cell Therapy 26·RNA/siRNA 14…), **적응증 41종**(Oncology 136·Rare Disease 119·Immunology 81·Neurology 68·Hematology 35…).

**empty state 원칙(가진 데이터만):**
- modality 미상 11% → 칩 `미상(N/A)` 버킷으로 분리, 필터 가능하되 라벨에 표기.
- areas 66% → 칩 필터는 "값 있는 종목만 매칭", 미상 종목은 area 필터 적용 시 자동 제외(빈 표기 `—`).
- key_catalyst_date 26% → 테이블 셀 `—`, 일자 정렬 시 미상은 맨 뒤.
- runway 미상 6% → 셀 `—`, runway 슬라이더 적용 시 미상 제외(토글로 포함 가능).

### build-screener.mjs 확장 (신규 로직)
- universe.csv 로드 → ticker→{modality, areas} 맵. `areas`는 `|` 구분 → 배열.
- 각 point에 위 신규 필드 추가. 숫자는 기존 `toInt`/`round1` 재사용, 빈/`None`은 `null`.
- universe.csv 없으면(Vercel 빌드 등) modality/areas만 빠진 채 정상 동작(기존 best-effort 패턴 유지, exit 0).
- 출력 JSON 스키마 버전 표기(`schema: 2`)로 구뷰 호환.

---

## §3 화면 배치 (와이어프레임)

```
┌─────────────────────────────────────────────────────────────┐
│ 🧬 Great Biotech Screener   위대 63 · 관찰 91 · 무등급 N …    │  헤더(기존 유지)
│ G 과학 · E 실행 · T1 임박 · 점크기=시총 · 색=등급             │
├─────────────────────────────────────────────────────────────┤  ← sticky 컨트롤 바
│ [▦ 테이블][◇ 차트]  🔎[검색…]  정렬[G_conf ▼]  ⚙필터(3)  ★저장검색▼ │
├─────────────────────────────────────────────────────────────┤
│ 활성 필터 칩:  [위대 ×][관찰 ×]  [Oncology ×]  [G≥70 ×]  전체해제 │  ← 필터 적용 시만
├─────────────────────────────────────────────────────────────┤
│  531개 중 84개 표시                                            │
│                                                               │
│  ▦ 테이블 뷰 (기본)                                           │
│  ┌──┬────────┬──────┬───┬───┬───┬──────┬──────┬────────┬───┐ │
│  │★ │종목     │등급   │ G │ E │T1 │시총   │런웨이 │모달리티 │💠 │ │
│  ├──┼────────┼──────┼───┼───┼───┼──────┼──────┼────────┼───┤ │
│  │☆ │VRTX    │위대   │92 │88 │ 3 │$120B │  —   │SmallMol│   │ │
│  │☆ │BHVN    │위대   │78 │72 │ 2 │$4.2B │ 6Q   │SmallMol│Pri│ │
│  └──┴────────┴──────┴───┴───┴───┴──────┴──────┴────────┴───┘ │
│  (헤더 클릭 = 정렬 / 행 클릭 = 상세 패널 or Calendar 이동)     │
│  좁은 폭 → 카드 리스트로 자동 전환                             │
│                                                               │
│  ◇ 차트 뷰 (토글 시)                                          │
│   [3D][2D] Z축[T1▼] ↺   ← 기존 3D/2D Plotly, 동일 필터 반영   │
│   3D/2D 산점도 + 클릭→sticky 선택패널 (기존 로직 재사용)       │
└─────────────────────────────────────────────────────────────┘

  ⚙ 필터 패널 (드로어/팝오버) — 멀티패싯
  ─────────────────────────────
   등급      [위대][관찰][무등급][부적격]   ← 칩 토글
   G 과학    [────●──────●──] 60–100
   E 실행    [──●────────●──] 50–100
   T1 임박   [●──────●] 0–4
   시총      [전체 ▼] (기존 6구간)
   런웨이    [──●──────] ≥ 4분기  [□ 미상 포함]
   Rerating  [□ Primary/Aggressive만][□ Early/Deep Value]
   Calendar  [□ 등록 종목만]
   모달리티  [SmallMol][Antibody][Gene Tx]… [미상]  ← 칩
   적응증    [Oncology][Rare][Immuno][Neuro]…       ← 칩
   ───────────────────────  [전체 해제]  [이 검색 저장 ★]
```

Rerating 표(현 ③)는 **테이블 뷰의 `💠` 컬럼 + rerating 필터 칩으로 흡수**하되, 기존 전용 Rerating 표는 차트 뷰 하단에 "Rerating 관심종목" 섹션으로 유지(레이어 버리지 않음 — §1.2).

---

## §4 멀티패싯 필터 명세

상태 모델 (단일 `filters` 객체):
```
{
  grp:   Set<등급>,            // 비었으면 전체
  gMin, gMax, eMin, eMax,      // 0–100
  t1Min, t1Max,                // 0–4
  mc:    'all'|'micro'|…,       // 기존 버킷
  runwayMin, runwayInclNA,     // 분기 / 미상 포함 여부
  rr:    Set<'wl'|'early'>,     // rerating 카테고리
  inCalOnly: bool,
  mod:   Set<모달리티>,         // '미상' 포함 가능
  area:  Set<적응증>,
  q:     string,               // 인라인 검색(ticker/회사)
  sort:  { key, dir },         // 정렬
  view:  'table'|'chart',      // 뷰 모드
  chart: { type:'3d'|'2d', z:'t1'|'mlog' }  // 차트 하위 상태
}
```

- **AND 결합**(서로 다른 패싯) / **OR 결합**(같은 패싯 내 칩 다중선택). 예: (위대 OR 관찰) AND (Oncology) AND G≥70.
- 필터 결과는 차트·테이블에 **동일 적용**(기존 `mcapPass` 일반화 → `pass(d)`).
- 활성 필터는 컨트롤 바 아래 **칩으로 표시 + 개별 ×** + "전체 해제".

---

## §5 저장검색 + URL 동기화

### URL 동기화 (`useSearchParams`)
- `filters` → 압축 query string으로 직렬화/역직렬화. 빈/기본값은 생략(짧게).
- 예: `/app/screener?grp=위대,관찰&gmin=70&area=Oncology&view=table&sort=e:desc`
- 진입 시 URL → 초기 상태 복원. 필터 변경 시 `replace`로 URL 갱신(히스토리 오염 방지).
- 공유: 현 URL 복사로 동일 필터 화면 재현.

### 저장검색 (localStorage, `src/utils/userPrefs.js` 확장)
- 신규 훅 `useSavedSearches()` — `bcc:savedSearch` 키. 기존 `useRecent`/`useWatchlist` 패턴 1:1.
- 저장 단위 = **필터 + 정렬 + 뷰 전체**(사용자 결정). `{ id, name, params }` 배열.
- 동작: 저장(이름 입력) / 불러오기(셀렉터) / 삭제 / 덮어쓰기.
- `clearLocalData()`(spec 019 보안)에 `bcc:savedSearch` 제거 추가.
- 셀렉터 = 컨트롤 바의 `★저장검색▼` 드롭다운(현 필터 저장 + 저장된 목록 적용).

---

## §6 컴포넌트 / 파일 계획

```
src/
├── pages/
│   └── Screener.jsx              ← 오케스트레이터로 축소: 상태(필터/URL/저장검색) + 레이아웃
├── components/screener/          ← 신규 디렉토리
│   ├── ScreenerControlBar.jsx    ← 뷰 토글·검색·정렬·필터버튼·저장검색 셀렉터
│   ├── ScreenerFilterPanel.jsx   ← 멀티패싯 필터(드로어/팝오버)
│   ├── ActiveFilterChips.jsx     ← 활성 필터 칩 + 개별 해제
│   ├── ScreenerTable.jsx         ← 정렬 가능한 데이터 테이블 (데스크톱)
│   ├── ScreenerCardList.jsx      ← 좁은 폭 카드 리스트 (모바일)
│   ├── ScreenerChart.jsx         ← 기존 3D/2D Plotly 로직 이관(필터 prop 수용)
│   ├── ReratingSection.jsx       ← 기존 Rerating 표 이관
│   └── SelectionPanel.jsx        ← 기존 선택 패널 이관
├── utils/
│   ├── userPrefs.js              ← useSavedSearches() 추가, clearLocalData 갱신
│   └── screenerFilters.js        ← 신규: 필터 pass()·정렬·URL 직렬화 순수함수 (테스트 대상)
scripts/
└── build-screener.mjs            ← universe.csv 조인 + 신규 컬럼 projection (§2)
```

- 기존 `COLOR`/`ORDER`/`size`/`rnd`/`hoverText`/`isWL` 등 상수·헬퍼는 `ScreenerChart.jsx`로 이동(차트 전용) + 공용은 `screenerFilters.js`.
- 차트 로직(3D/2D/클릭/purge)은 **현 코드 1:1 이관**, prop으로 `points`(필터 적용본)·`onSelect`만 받게. 시각 동작 무변경.

---

## §7 인터랙션 / 카피 규칙

- 한글 중심 + 영문 sub label(기존 톤). dark 브랜딩 유지(`panel`/`ink`/`acc` 토큰).
- 테이블: 헤더 클릭 정렬(▲▼ 표시), 행 hover 하이라이트, `inCalendar` 종목만 행 클릭 시 상세 이동·미등록은 선택 패널만.
- 빈 상태: 필터 결과 0개 → "조건에 맞는 종목 없음 · 필터 완화" + 전체 해제 버튼.
- 데이터 미상 셀 `—`, 모달리티/런웨이 미상은 §2 원칙대로.
- 저장검색 저장 시 이름 prompt(인라인 입력), 중복 이름 경고.
- 신뢰도 낮음(`stale`/`catalyst_stale`/낮은 confidence)은 작은 배지로 정직하게 노출.

---

## §8 검증 / 완료 기준

1. `npm run check` 통과(lint + verify-data + test). `screenerFilters.js` 순수함수 단위테스트 추가(필터 AND/OR·정렬·URL 왕복).
2. `npm run build-screener` → universe.csv 조인 확인: modality/areas 커버리지 로그 출력, universe.csv 없을 때도 exit 0.
3. `/dev/app/screener`(DEV 인증 우회) 프리뷰 검증:
   - 테이블 기본 표시·헤더 정렬·행 클릭 동선
   - 멀티패싯 필터 각 패싯 + 칩 다중선택(OR) + 패싯간 AND
   - 차트 토글 시 동일 필터 반영(3D/2D/Z축/Rerating 유지)
   - 저장검색 저장/적용/삭제 + URL 동기화(새로고침 복원·URL 공유)
   - 빈 상태·미상 셀 empty state
   - 좁은 폭(모바일) → 카드 리스트 전환
4. 기존 동작 무회귀: 차트 시각·클릭 패널·검색결과 카드·헤더 카운트 동일.
5. `/deploy`로 배포(호출이 commit/push 동의).

---

## §9 구현 순서 (승인 후 제안)

1. **build-screener.mjs 확장** + 재생성 → 신규 필드 데이터 확보(JSON schema 2).
2. `screenerFilters.js` 순수함수(pass·sort·URL 직렬화) + 단위테스트.
3. `Screener.jsx` 상태/URL/레이아웃 골격 + 기존 차트/패널/Rerating 컴포넌트 분리 이관(시각 무변경).
4. `ScreenerControlBar` + `ScreenerFilterPanel` + `ActiveFilterChips`.
5. `ScreenerTable`(정렬) + `ScreenerCardList`(모바일).
6. `useSavedSearches` + 저장검색 셀렉터 + `clearLocalData` 갱신.
7. 빈 상태·empty state·신뢰도 배지 마감.
8. `/dev/app/screener` 검증 → `npm run check` → `/deploy`.

---

## §9.5 구현 중 결정 (기록)

- **plotly dev 사전번들**: 차트가 lazy 컴포넌트(`ScreenerChart`) 내 동적 import 라 Vite optimizer 스캐너가 `plotly.js-dist-min` 을 못 잡고 사전번들에서 누락(기존 `optimizeDeps.exclude`). dev 첫 진입 시 on-demand 최적화 중 **빈 모듈**이 반환되어 차트가 로드되지 않고 페이지가 크래시. 해결: `vite.config.js` optimizeDeps 에서 plotly 를 `exclude` → `include` 로 이동(서버 시작 시 1회 사전번들, **dev 전용 — prod 빌드 무관**) + `ScreenerChart` 에 빈 모듈 방어 가드(`typeof P.react === 'function'` 일 때만 setPlotly). prod 빌드는 manualChunks 로 plotly chunk 격리 유지(4.6MB, 스크리너 진입 시에만 lazy 로드).
- **테스트 러너**: 프로젝트에 vitest 부재(`npm run check` = lint + verify-data). 작동 중 파이프라인 무변경 원칙(보수적 변경)에 따라 새 의존성 없이 Node 내장 `node:test` 로 `screenerFilters` 단위테스트 작성(`npm run test:filters`, 21 케이스). check 파이프라인엔 미편입(검증 단계 수동 실행).

## §10 오픈 이슈

- **종목 비교 전용 뷰**: 다중선택 데이터는 이번에 깔되, 하위점수 나란히 대조 패널은 후속(§1 비범위). 이번 라운드에 다중선택 체크박스까지 넣을지 여부 → 구현 중 부담되면 후속.
- **하위점수(g1~3/e1~5) 의미 라벨**: GBS SPEC의 축 정의를 tooltip에 노출하려면 라벨 매핑 필요. 없으면 숫자만(empty 라벨). 1차는 숫자/tooltip 생략, 후속에서 라벨.
- universe.csv 미존재 환경(Vercel) 빌드 시 modality/areas 누락 → 커밋된 generated.json에 이미 포함되어 있으므로 영향 없음(로컬 재생성 시에만 갱신).
