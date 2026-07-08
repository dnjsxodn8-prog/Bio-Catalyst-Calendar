# 023 — 밸류에이션(PEG) 스크리너 통합

> 상태: **초안 (사용자 승인 대기)** · 작성 2026-07-08 · 선행 spec 010(스크리너 통합)·019(공개/비공개 분리)·020(스크리너 개편)
>
> 목표: 형제 레포 `PEG_Screener`가 산출하는 바이오/헬스케어 PEG 밸류에이션 스크리너(해외 ~1,060종 + 국내 ~418종)를, 기존 GBS 스크리너와 **동일한 데이터 브리지 패턴**으로 이 사이트에 새 탭(`/app/valuation`)으로 통합한다. 통합 전 기간은 라이브를 점검모드로 내려둔다(PHASE 0, 완료).

---

## §0. 결정 요약 (사용자 확정 2026-07-08)

| 항목 | 결정 | 근거 |
|---|---|---|
| **데이터 티어** | **PRIVATE** | 기존 GBS 스크리너(`/app/screener`)와 동일. `/api/private-data`가 `valuation`을 확장 서빙. 인프라 그대로 재사용·일관성. |
| **통합 베이스** | **현재 worktree 브랜치** (`claude/peg-screener-integration-871d4f` = origin/main `e8497fd` + 점검 커밋 2개) | 메인 폴더 detached HEAD의 Sprint1/2 UX 커밋·538개 미커밋 파일은 **건드리지 않음**. Sprint UX는 라이브에 배포된 적 없으므로 regression 아님. |
| **점검모드** | 이번 통합 1회용. 주간 갱신은 토글 안 함 | §7 참조 |

> ⚠️ 메인 폴더는 detached HEAD(`6a1a759`)에 Sprint UX 2커밋 + 538 dirty 파일. 이 spec의 어떤 작업도 그 상태를 건드리지 않는다. Sprint UX 보존이 필요하면 사용자가 `git branch <name> 6a1a759`로 별도 브랜치화(이 spec 범위 밖).

---

## §1. 데이터 브리지 — `scripts/build-valuation.mjs`

`scripts/build-screener.mjs`를 **본떠** 신설한다. 원칙은 동일: **형제 레포 CSV → `src/valuation.generated.json`(git 커밋). CSV 없으면(Vercel 등) 커밋된 JSON 유지, 절대 `exit 1` 안 함(best-effort).**

### 1.1 소스 CSV 위치 탐색

`PEG_Screener`는 메인 레포의 **형제 폴더**(`…/Biotech 기업 분석/PEG_Screener`)에 있다. worktree/메인/CI에서 경로가 달라지므로 후보를 순서대로 시도해 첫 존재 디렉터리를 쓴다:

1. `process.env.PEG_SCREENER_DIR` (명시 override, 최우선)
2. `path.resolve(ROOT, '../PEG_Screener')` — 메인 레포에서 실행 시 (`predev`/`prebuild`)
3. `path.resolve(ROOT, '../../../../PEG_Screener')` — worktree(`.claude/worktrees/<name>`)에서 실행 시
4. 없으면 → 커밋된 `valuation.generated.json` 유지 + 경고(빌드 실패 X)

> GBS의 `build-screener.mjs`는 `../great-biotech-screener`가 worktree 안에 복제돼 있어 그대로 동작했지만, `PEG_Screener`는 형제 폴더 한 곳뿐이라 후보 탐색이 필요하다.

### 1.2 최신 날짜 CSV 글롭 선택

`<dir>/data/` 안에서 `us_raw_<YYYY-MM-DD>.csv` / `kr_raw_<YYYY-MM-DD>.csv`를 각각 찾아 **날짜 접미사가 가장 큰(최신)** 쌍을 고른다. (스크립트가 실행일마다 새 파일을 쌓으므로 단일 파일 가정 금지. 현재는 `2026-07-08` 하나뿐.) `~$…` Excel 잠금 파일 등은 정규식으로 배제.

- 해외/국내 각각 독립적으로 최신 날짜를 잡되, 둘 다 존재하면 `asOf`는 둘 중 최신 날짜.
- 한쪽만 있으면 있는 쪽만 반영 + 경고(best-effort).

### 1.3 파싱

- CSV 파서는 `build-screener.mjs`의 인라인 파서를 **그대로 재사용**(따옴표/콤마/이스케이프/CRLF/BOM 처리). 국내 CSV는 `utf-8-sig`(BOM) → 파서가 헤더 첫 칸 BOM 제거함. **헤더 이름 기준**으로 파싱(컬럼 순서 비의존 — raw CSV는 `sector`가 끼어 순서가 schema와 다름).
- 빈 셀(`,,`)은 `null`. 숫자는 `parseFloat`, 실패 시 `null`.

### 1.4 컬럼 매핑 (raw CSV 헤더 → JSON 키)

raw CSV 23열 중 **schema.py 정본 21열(식별 5 + 지표 16)** + `peg_method`를 싣는다. `sector`는 산업 상위분류 참고용이나 UI는 세부업종(`industry`)만 쓰므로 **제외**.

| CSV 헤더 | JSON 키 | 종류 | 비고 |
|---|---|---|---|
| ticker | `t` | text | |
| name | `n` | text | |
| market | `mkt` | text | US / KOSPI / KOSDAQ / KONEX |
| industry | `ind` | text | 세부업종(필터 대상) |
| country | `ctry` | text | 해외는 ADR 국적 다양 |
| peg | `peg` | ratio | 기본 정렬키(오름차순) |
| market_cap | `mc` | money | 해외 $M · 국내 억원 |
| per | `per` | ratio | |
| forward_pe | `fpe` | ratio | 국내 사실상 공란 |
| pbr | `pbr` | ratio | |
| roe | `roe` | pct | |
| roa | `roa` | pct | 국내 ~353종만 |
| roic | `roic` | pct | 국내 ~352종만 |
| dividend_yield | `dy` | pct | |
| revenue | `rev` | money | 해외=Finviz 역산 |
| operating_income | `oi` | money | 해외=Finviz 역산 |
| net_income | `ni` | money | 해외=Finviz 역산 |
| operating_margin | `om` | pct | |
| profit_margin | `pm` | pct | |
| revenue_growth | `rg` | pct | |
| eps_growth | `eg` | pct | |
| peg_method | `pmeth` | text | PEG 산출근거(툴팁) |

### 1.5 출력 스키마 — `src/valuation.generated.json`

```jsonc
{
  "schema": 1,
  "generated": "2026-07-08T…Z",       // 빌드 시각(ISO)
  "asOf": "2026-07-08",                 // CSV 날짜 접미사(기준일)
  "source": "PEG_Screener/data/{us_raw,kr_raw}_<date>.csv",
  "markets": {
    "us": {
      "label": "해외", "unit": "$M",
      "count": 1060, "withPeg": 197,
      "industries": ["Biotechnology", "Diagnostics & Research", …],  // unique·정렬
      "rows": [ { "t":"A","n":"Agilent…","mkt":"US","ind":"Diagnostics & Research","ctry":"USA","peg":2.12,"mc":37040,"per":26.34,"fpe":19.86,"pbr":5.2,"roe":21.33,"roa":11.21,"roic":13.9,"dy":0.78,"rev":7234.4,"oi":1659.6,"ni":1414.3,"om":22.94,"pm":19.55,"rg":5.41,"eg":9.35,"pmeth":"Finviz PEG(P/E ÷ 장기EPS성장추정)" }, … ]
    },
    "kr": {
      "label": "국내", "unit": "억원",
      "count": 418, "withPeg": 79,
      "coverage": { "roa": 353, "roic": 352, "fpe": 0 },
      "industries": ["제약", "바이오", …],
      "rows": [ … ]
    }
  }
}
```

- `rows`는 빌드 시 **PEG 오름차순**으로 미리 정렬(유효 PEG 먼저, `null`은 맨 뒤) → UI 기본 뷰가 정렬 없이도 옳음. UI는 헤더 클릭으로 재정렬.
- 커버리지/카운트/세부업종 목록은 빌드에서 계산해 UI 헤더·필터에 사용.
- best-effort sanity 로그: `해외 N종(PEG M) · 국내 K종(PEG L) · roa/roic 커버리지`.

### 1.6 package.json

```jsonc
"build-valuation": "node scripts/build-valuation.mjs",
"predev":  "node scripts/build-data.mjs && node scripts/build-screener.mjs && node scripts/build-valuation.mjs",
"prebuild":"node scripts/build-data.mjs && node scripts/build-screener.mjs && node scripts/build-valuation.mjs",
```

---

## §2. 티어 배선 — PRIVATE (`/api/private-data` 확장)

기존 GBS 스크리너와 **동일 경로**. 3곳만 `valuation` 추가:

1. **`api/private-data.js`** (프로덕션 서버리스) — `loadPrivate()` 캐시에 한 줄:
   ```js
   valuation: read('src/valuation.generated.json', { markets: { us: { rows: [] }, kr: { rows: [] } } }),
   ```
   `handler`의 반환은 `loadPrivate()` 전체이므로 자동 포함.
2. **`vite.config.js`** dev 미들웨어(`devPrivateDataApi`) — 응답 body에 동일하게 `valuation: read('src/valuation.generated.json', {…})` 추가. (로컬 dev는 무인증 디스크 read.)
3. **`src/store/privateData.jsx`** — `useState` 초기값·fetch 파싱·Provider value 세 지점에 `valuation` 추가:
   ```js
   // 초기: { status:'loading', data:null, screener:null, valuation:null, error:null }
   // 파싱: valuation: json.valuation ?? { markets: { us:{rows:[]}, kr:{rows:[]} } }
   // Provider value: { data, screener, valuation, screenerByTicker }
   ```

- **`vercel.json` `includeFiles`는 이미 `src/*.generated.json` 글롭** → `valuation.generated.json` 자동 포함. **수정 불필요.**
- **CSP 불변**: 데이터는 `/api/private-data`(self) JSON fetch만. 티커 링크(Finviz/네이버)는 `<a target="_blank">` **탑레벨 내비게이션**이라 `connect-src`와 무관 → 외부 오리진 추가 없음. `vercel.json` headers 손대지 않음.

---

## §3. 라우팅·내비 배선

`spec 010`의 스크리너 배선과 **동형**. `src/App.jsx` 4곳 + `Sidebar.jsx` 1곳.

**`src/App.jsx`**
- lazy import(17행 근처): `const Valuation = lazy(() => import('./pages/Valuation'));`
- `TAB_PATH`: `valuation: '/app/valuation',`
- `pathToTab`: `if (pathname.startsWith('/app/valuation')) return 'valuation';`
- `<Routes>`(122행 screener 아래): `<Route path="valuation" element={<Valuation query={query} onOpenCompany={openCompany} />} />`
- (페이지가 `usePrivateData().valuation`을 직접 소비하므로 App의 구조분해는 안 바꿔도 됨.)

**`src/components/Sidebar.jsx`** — `NAV` 배열 screener 다음에(IA: Dashboard → Screener → **Valuation** → Companies …):
```js
{ id: 'valuation', label: '밸류에이션', sub: 'Valuation', icon: Scale },  // lucide-react Scale
```

---

## §4. UI — `src/pages/Valuation.jsx` + `src/components/valuation/*`

**기능(요구사항):** 해외/국내 탭 · 세부업종 필터 · 검색 · 헤더 클릭 전체 컬럼 정렬 · PEG 색상 스케일 · 티커 클릭→원본. 기존 GBS 스크리너(`/app/screener`)와 **별개 탭으로 공존**.

### 4.1 재사용 vs 신설

GBS 필터/정렬 순수함수(`utils/screenerFilters.js`)·`ScreenerTable`은 **GBS 컬럼 스키마(등급·G/E/T1·rerating) 전용**이라 그대로는 못 쓴다. 따라서:

- **재사용**: `screenerFormat.js`의 `fmtMcap`(해외 $M), `panel`/컨트롤바/테이블 Tailwind 스타일·마크업 패턴, `ScreenerTable`의 **헤더클릭 정렬 구조**(`COLS` 배열 `{key,label,sortable,align}` + `onSort` + `▲/▼`), 좁은폭 카드 전환 아이디어.
- **신설(밸류에이션 전용, `src/components/valuation/`)**:
  - `valuationFormat.js` — `fmtMoney(v, market)`(해외 $M→$B, 국내 억원→조/억), `fmtRatio`(peg/per/fpe/pbr, 2자리), `fmtPct`(roe/roa/roic/dy/margin/growth, 1자리+%), `pegColor(peg)` 색상 스케일, `sourceUrl(row)`.
  - `ValuationTable.jsx` — 밸류에이션 `COLS`(아래), 시장별 포맷, PEG 셀 배경 색상, 티커→원본 링크. 헤더클릭 정렬은 ScreenerTable 패턴 복제.
  - `ValuationControlBar.jsx` — 시장 탭(해외/국내), 세부업종 `<select>`, 검색 input, 결과 카운트. 스타일은 `ScreenerControlBar` 참고.
  - (좁은폭 카드 리스트는 초기엔 테이블 가로 스크롤로 갈음, 필요 시 후속.)
- **Valuation.jsx** — 상태: `market('us'|'kr')`, `industry`, `q`(검색), `sort{key,dir}`. `usePrivateData().valuation`에서 해당 market rows → 세부업종·검색 필터 → 정렬 → 테이블. 빈 상태 안내(스크리너와 동일 톤: "`npm run build-valuation` 후 재빌드").

### 4.2 컬럼(`COLS`) 및 정렬

기본 정렬 = `peg` 오름차순. 모든 지표 컬럼 sortable(숫자 정렬, `null`은 항상 맨 뒤). 텍스트 컬럼은 사전순.

`종목(t+n) · 세부업종(ind) · PEG · 시총(mc) · PER · FwdPE · PBR · ROE · ROA · ROIC · 배당(dy) · 매출(rev) · 영업익(oi) · 순익(ni) · 영업M(om) · 순M(pm) · 매출성장(rg) · EPS성장(eg)`

- 국내 탭에서 `FwdPE`는 사실상 공란 → 컬럼은 두되 값 `—`. (또는 국내 탭에서 숨김 — 구현 시 택1, 기본은 표시+`—`.)
- **PEG 색상 스케일**(낮을수록 저평가·good): `≤0.5` 진초록 · `0.5–1.0` 초록 · `1.0–1.5` 연두 · `1.5–2.0` 노랑 · `2.0–3.0` 주황 · `>3.0` 빨강 · `null`(무효) 회색. `--acc`(#6EE7B7) 계열과 조화되는 톤.

### 4.3 티커 → 원본 링크

- 해외: `https://finviz.com/quote.ashx?t=<t>`
- 국내: `https://m.stock.naver.com/domestic/stock/<t>/total` (t = 6자리 코드)
- `<a target="_blank" rel="noopener noreferrer">`. 캘린더에 있는 종목(companies/에 존재)이면 내부 상세로도 갈 수 있으나, 밸류에이션 유니버스는 대부분 캘린더 밖이므로 기본은 원본 링크.

### 4.4 한계 표기 (페이지에 명시 — 요구사항)

페이지 헤더/정보 영역에 그대로 노출:
- 국내 ROA·ROIC는 약 350여 종만(KONEX·SPAC 등 무XBRL 공란), 국내 FwdPE 미수집.
- 해외 매출/영업익/순익은 Finviz 마진·P/S **역산값**(참고용).
- **PEG는 EPS가 0 근처면 왜곡** → PER·EPS성장 병행 확인.
- "해외" = **미국 상장(ADR 포함) 한정** — LSE/HKEX/TSE 등 순수 현지상장 제외.
- 기준일(`asOf`) 표기.

---

## §5. 데이터 흐름 요약

```
PEG_Screener(Python, 오프라인)                     이 레포(build 시)                      런타임
  fetch_us_finviz.py → data/us_raw_<date>.csv  ┐
  fetch_kr_naver.py  → data/kr_raw_<date>.csv  ├─▶ scripts/build-valuation.mjs
  fetch_kr_dart.py   → (kr_raw in-place: roa/roic)│     ↳ src/valuation.generated.json (git 커밋)
                                                 ┘                    │
                                       predev/prebuild 체인 ─────────┤
                                                                     ├─▶ /api/private-data (Clerk) ─▶ usePrivateData().valuation ─▶ Valuation.jsx
                                                                     └─▶ (dev) vite 미들웨어 ────────┘
```

DART API 키(`PEG_Screener/.env` `DART_API_KEY`)는 **Python `fetch_kr_dart.py`만** 읽고 URL 파라미터로만 사용, CSV/JSON/출력물에 **절대 안 실림**, `.gitignore` 처리. 클라이언트로 나갈 경로 없음.

---

## §6. `/sunday` 루틴 통합 — 밸류에이션 주간 갱신

### 6.1 PEG_Screener 날짜 파라미터화 (선행 작업, PEG_Screener 레포 수정)

4개 스크립트가 각각 상단 `DATE = "2026-07-08"` 하드코딩(argparse 없음). **오늘 날짜 기본값 + `--date` override**로 통일:

| 파일 | 현재 | 변경 |
|---|---|---|
| `src/fetch_us_finviz.py` (18행) | `DATE = "2026-07-08"` | `--date`(기본 `date.today().isoformat()`) |
| `src/fetch_kr_naver.py` (19행) | 〃 | 〃 |
| `src/fetch_kr_dart.py` (19행) | 〃 (kr_raw를 in-place 갱신 → naver와 **날짜 동기 필수**) | 〃 |
| `src/build_excel.py` (12행) | 〃 (xlsx 산출용) | 〃 |

- 각 파일에 `argparse`+`datetime` 신규 추가(현재 미import). 4개가 같은 날짜를 봐야 하므로 동일 패턴.
- **corpcode 캐시**(`data/corpcode.csv`, 날짜 무관) 존재 시 재사용(DART corpCode.xml 다운로드 skip) — 그대로 유지.
- 사이트 갱신엔 `build_excel.py`(xlsx)는 **불필요**(사이트는 CSV를 `build-valuation.mjs`로 소비). 단 사용자 개인 xlsx가 필요하면 선택 실행.

### 6.2 `/sunday`에 스텝 추가 — "Step 1B: 밸류에이션 갱신"

`update-prices`(Step 1) 직후, `deploy`(Step 3) 이전에 삽입. **자동·best-effort·GATE 없음.**

```
① PEG_Screener 3개 fetcher(오늘 날짜 기본) 실행:
     python src/fetch_us_finviz.py
     python src/fetch_kr_naver.py
     python src/fetch_kr_dart.py           # kr_raw in-place: roa/roic
② npm run build-valuation                   # 최신 날짜 CSV → valuation.generated.json 재생성
③ 그 JSON을 주간 배포 커밋(Step 3 deploy)에 함께 포함
```

- **best-effort 절대원칙:** 크롤링 일부 실패(Finviz 차단·네이버 타임아웃·DART 오류)해도 **지난주 커밋된 `valuation.generated.json` 유지**하고 루틴을 **막지 않는다**. 커버리지 sanity(예: 해외 rows < 900 또는 국내 < 350이면 "이번주 밸류에이션 부분 실패, 지난주 데이터 유지"로 로그)만 남기고 계속.
- **점검모드 토글 안 함** — 점검은 이번 통합 1회용. 주간 갱신은 정상 서비스 중에 데이터만 교체.
- Step 6 완료 보고에 "밸류에이션: 해외 N종·국내 K종 (또는 '갱신 실패, 지난주 유지')" 한 줄 추가.

---

## §7. 점검모드 온/오프 절차

**ON (PHASE 0, 완료):** `public/maintenance.html`(자체완결) + `vercel.json`에 `redirects` 블록 1개:
```jsonc
"redirects": [
  { "source": "/((?!maintenance\\.html$).*)", "destination": "/maintenance.html", "permanent": false }
]
```
- `redirects`는 Vercel에서 파일시스템보다 **먼저** 평가 → 홈(`/`)·정적파일·API·`/app/*` 전부 307→`/maintenance.html`(자기 자신만 제외, 루프 없음). `rewrites`(파일시스템 fallback)로는 홈을 못 덮어 **redirect로 확정**(검증 완료).
- `functions`·`headers`(CSP)·`rewrites`(SPA fallback)·`includeFiles` **불변**.

**OFF (PHASE 4, 재개):** `vercel.json`에서 위 **`redirects` 블록만 삭제** → 한 커밋 → `/deploy` → 라이브가 앱으로 복귀하는지 검증(`/`·`/app/valuation`·`/app/screener`).

---

## §8. 롤아웃 단계

| 단계 | 내용 | 게이트 |
|---|---|---|
| **PHASE 0** | 점검모드 ON + 배포 + 라이브 검증 | ✅ **완료** |
| **PHASE 1** | `build-valuation.mjs` + `valuation.generated.json`(커밋) + package.json 체인 | — |
| **PHASE 2** | API·dev미들웨어·privateData·라우팅·Sidebar·`Valuation.jsx`+`components/valuation/*` | — |
| **PHASE 3** | PEG_Screener 날짜 파라미터화 + `/sunday` Step 1B 추가 | — |
| **PHASE 3.5** | 로컬 검증: `npm run check` 통과 + `npm run dev` 및 `npm run build`+`preview`에서 밸류에이션(해외/국내 탭·정렬·필터) + 기존(캘린더·스크리너·인증) 정상 | ✅ 이 검증 통과 전까지 라이브 점검모드 유지 |
| **PHASE 4** | `redirects` 제거 커밋 → `/deploy` → 라이브 전체(밸류에이션 포함) 정상 재확인 → 완료 보고 | 재개 |

---

## §9. 검증 계획 (PHASE 3.5)

- `npm run check`(lint + verify-data) 통과. (verify-data는 기존 companies/catalysts 대상 — 밸류에이션은 별도 generated JSON이라 verify-data 스키마와 무관.)
- `npm run dev`(port 5179): `/app/valuation` — 해외/국내 탭 전환, 세부업종 필터, 검색, 각 컬럼 헤더 클릭 정렬(오름/내림), PEG 색상, 티커 링크(Finviz/네이버) 확인. 기존 `/app/screener`·대시보드·캘린더·인증 회귀 없음.
- `npm run build` + `npm run preview`: 프로덕션 번들에서 동일 확인. **정적 번들에 `valuation.generated.json` 내용이 안 섞였는지**(private 유지) 확인 — dist/assets grep.
- best-effort 확인: `PEG_SCREENER_DIR` 안 잡히거나 CSV 없을 때 `build-valuation`이 커밋 JSON 유지하고 exit 0.

---

## §10. 변경 파일 목록 (예정)

**신규**
- `scripts/build-valuation.mjs`
- `src/valuation.generated.json` (빌드 산출·커밋)
- `src/pages/Valuation.jsx`
- `src/components/valuation/ValuationTable.jsx`
- `src/components/valuation/ValuationControlBar.jsx`
- `src/components/valuation/valuationFormat.js`

**수정 (이 레포)**
- `package.json` (build-valuation + predev/prebuild)
- `api/private-data.js` (valuation 한 줄)
- `vite.config.js` (dev 미들웨어 valuation 한 줄)
- `src/store/privateData.jsx` (valuation 3지점)
- `src/App.jsx` (lazy·TAB_PATH·pathToTab·Route)
- `src/components/Sidebar.jsx` (NAV 1항목)
- `.claude/skills/sunday/SKILL.md` (Step 1B)
- `vercel.json` (PHASE 4에서 redirects 제거 — 온오프용)

**수정 (형제 레포 `PEG_Screener`)**
- `src/fetch_us_finviz.py`, `src/fetch_kr_naver.py`, `src/fetch_kr_dart.py`, `src/build_excel.py` (DATE 파라미터화)

**불변 (건드리지 않음)**
- `vercel.json`의 `functions`·`headers`(CSP)·`includeFiles`·SPA `rewrites`
- 메인 폴더 detached HEAD Sprint 커밋·538 dirty 파일
