# Spec 016 — Catalyst Outcomes + News Feed (결과 누적 + 뉴스 피드)

> 상태: **DRAFT (승인 대기)**
> 작성: 2026-06-19
> 선행: spec 001(데이터 레이어), spec 002(UI), spec 012(검색 UX), spec 014(research news), spec 015(assets)
> 비고: spec 번호 013은 다른 세션의 coverage-portfolio 작업이 예약 → 본 spec은 016으로 채번. 공유 폴더 규칙(별도 세션이 014/015 소유) 준수.

## §0 동기 (왜)

카탈리스트 페이지는 "임박했다"는 사실만 보여주고, 7일(확장 30일) 지나면 사라진다(`src/pages/Catalysts.jsx` cutoff). 사용자는:

1. 카탈리스트의 **결말**(임상 통과·EP 달성·OS / FDA 승인·CRL·지연)을 보고 싶다.
2. 그게 **쌓여서** 보였으면 한다.
3. 더 나아가 카탈리스트뿐 아니라 **기업 중대 뉴스 전체**(유상증자, L/O, 파트너십, M&A 등)를 모은 **뉴스 피드**를 원한다.
4. 그 피드는 **글로벌(전체)** + **기업별** 둘 다.
5. Dashboard에 **최근 결과/뉴스 위젯**.

### 결정 (사용자 확정, 2026-06-19)

- **카탈리스트 결과 = 이벤트에 결과 필드 추가**(별도 재입력 X). "기대 → 결과" 한 레코드.
- **뉴스 피드 = 자동 파생 + 수동 기록 병합.**
  - 카탈리스트 결과는 이벤트의 `outcome`에서 **자동 파생**해 피드에 노출(중복 0, SSOT 유지).
  - 예정 이벤트와 무관한 뉴스(유상증자·L/O·파트너십 등)는 신규 `data/news.md`에 기록.
- **뷰: 글로벌 News 페이지(신규) + 기업별 뉴스(종목 상세).**

---

## §1 데이터 모델 A — 카탈리스트 결과 필드

`data/catalysts.md`의 각 이벤트(YAML)에 **선택적** 결과 필드 추가. 기존 필드 불변.

```yaml
  - date: 2026-03-27           # 원래 예정일(PDUFA/readout) — 불변
    ticker: RCKT
    event: KRESLADI LAD-I PDUFA
    type: PDUFA
    company: Rocket
    drug: KRESLADI
    indication: LAD-I
    phase: BLA
    sources: [https://...]     # 예정 이벤트 출처
    # ↓ 결과가 나오면 채움 (해소된 이벤트만)
    outcome: crl               # enum §1.1
    outcome_date: 2026-03-28   # 결과 공시일
    result: "CMC 추가 데이터 요구로 CRL. 임상 효능 이슈 아님."  # 1~2줄
    outcome_sources: [https://...]   # outcome 있으면 필수
```

### §1.1 `outcome` enum

| 값          | 색    | PDUFA/Regulatory      | Clinical Readout                  |
|-------------|-------|-----------------------|-----------------------------------|
| `approved`  | green | FDA 승인              | —                                 |
| `crl`       | red   | CRL                   | —                                 |
| `met`       | green | —                     | 1차 EP 달성(항암제 OS 우선)       |
| `missed`    | red   | —                     | 1차 EP 미달                       |
| `mixed`     | amber | 부분 승인·라벨 제한   | 1차 달성·2차 혼조 / 해석 분분      |
| `delayed`   | amber | PDUFA 연기·심사 연장  | readout 연기                      |
| `withdrawn` | gray  | 신청 철회             | 시험 중단                         |
| `pending`   | 기본  | 미해소(생략과 동일)   | 미해소                            |

- 항암제 OS 우선([[feedback_oncology_os_priority]]): 1차 미달이어도 OS 양성이면 `mixed`/`met`, `result`에 근거.
- 임상 outcome ≠ 시장 반응([[feedback_dual_outcome]]): `outcome`은 임상/규제 **사실**만. 주가 반응은 `result` 본문에서 별도 서술, enum에 섞지 않음.

---

## §2 데이터 모델 B — 신규 `data/news.md`

예정 카탈리스트와 **무관한** 기업 중대 뉴스의 SSOT. (카탈리스트 결과는 여기 적지 않음 — §3 자동 파생.)

```yaml
news:
  - date: 2026-06-15
    ticker: XYZ
    type: Financing       # enum §2.1
    headline: "$200M 공모 증자 발표"
    summary: "주당 $X, 총 NNN만주. 런웨이 2028까지 연장."   # 1~2줄
    sources: [https://...]   # 최소 1개 필수
```

### §2.1 `type` enum (뉴스)

`Financing`(유상증자·전환사채·PIPE) · `Licensing`(L/O 라이선스 거래) · `Partnership`(협업·공동개발) · `MnA`(인수·합병) · `Pipeline`(IND·파이프라인 업데이트·홀드) · `Regulatory`(지정·라벨, 카탈리스트 아닌 것) · `Personnel`(경영진) · `Other`.

### §2.2 카탈리스트 결과 색과 별개

뉴스 type은 카테고리 색(중립 계열). 카탈리스트 결과 색(§1.1 green/red/amber)과 시각적으로 구분한다.

---

## §3 파생·병합 모델 (핵심)

**뉴스 피드 = 자동 파생 결과 + 수동 뉴스 의 시간순 병합.** 빌드 단계에서 통합 배열을 만든다.

빌드(`scripts/build-data.mjs`)가 생성하는 `feed` 배열:

1. **카탈리스트 결과 파생**: `catalysts` 중 `outcome`이 `pending`/생략이 아닌 항목 → feed 항목으로 변환
   `{ date: outcome_date, ticker, kind: 'catalyst', outcome, headline: event, summary: result, type: 이벤트 type, sources: outcome_sources }`
2. **수동 뉴스**: `data/news.md`의 각 항목 → `{ ..., kind: 'news' }`
3. (선택, §8 마이그레이션 전까지) **레거시 research.news**: `data/research/*.md`의 `news[]` → `{ ..., kind: 'news', type: 'Other' }`. 중복 방지 위해 동일 ticker+date+headline은 news.md 우선.

`feed`는 `date` 내림차순 정렬해 `data.generated.json`에 포함. 프론트는 파싱만.

> 중복 0 원칙: 카탈리스트 결과는 **절대 news.md에 다시 적지 않는다.** 항상 outcome에서 파생.

---

## §4 UI

### §4.1 Catalysts 페이지 — Upcoming ↔ Results 토글

- **Upcoming**(기본): 현재 동작 유지. 이벤트에 `outcome`이 채워졌으면 작은 결과 배지 덧붙임.
- **Results**(신규): `outcome` 채워진 이벤트만, **cutoff 미적용**(무제한 누적), `outcome_date` 내림차순. 결과 배지(§1.1) + `result` + 원 예정일 대비. outcome별/type별 필터.

### §4.2 글로벌 News 페이지 (신규, 5번째 페이지)

- `feed` 전체를 카드 리스트로. 날짜 내림차순.
- 필터: kind(결과/뉴스), type(§2.1 + 카탈리스트 type), ticker 검색.
- 각 카드: 날짜 · ticker(클릭 → 종목 상세) · 배지(결과면 outcome 색, 뉴스면 type) · headline · summary · 출처 링크.
- 무한/페이지네이션: 1차엔 단순 cutoff 없이 전체(데이터량 적음). 많아지면 "더 보기".

> CLAUDE.md "4페이지" 정책을 **5페이지로 완화**(대시보드/종목/카탈리스트/학회/**뉴스**). 본 spec이 정책 변경 근거. 공개/인증 양쪽 레이아웃(`Topbar`/`Sidebar`/`PublicLayout`)에 News 링크 추가.

### §4.3 기업별 뉴스 (종목 상세)

- `CompanyDetail`의 기존 `NewsSection`을 **확장**: 해당 ticker의 `feed` 항목(카탈리스트 결과 + news.md + 레거시 research.news)을 병합 표시.
- 딥리서치 안 된 종목도 news.md/카탈리스트 결과만 있으면 뉴스 섹션 노출.
- 기존 research 종목은 회귀 없이 그대로(레거시 news 병합).

### §4.4 Dashboard 최근 결과/뉴스 위젯

- `feed` 상위 N건(기본 5~8) 요약 카드. "최근 결과·뉴스". 클릭 → News 페이지/종목 상세.

---

## §5 빌드 (`scripts/build-data.mjs`)

- `data/news.md`의 `news` 블록 로드(loadYamlBlock 재사용).
- §3 파생·병합으로 `feed` 생성 → output에 추가.
- catalysts는 기존대로 그대로 통과(결과 필드 자동 포함).

---

## §6 검증 (`scripts/verify-data.mjs`)

카탈리스트 결과:
1. `outcome` 있으면 enum(§1.1) 중 하나 — 아니면 ERROR.
2. `outcome` 있으면 `outcome_sources` ≥1 — 없으면 ERROR.
3. `outcome_date` 있으면 유효 날짜 + `date` 이후(같은 날 OK) — 아니면 WARNING.

news.md:
4. 각 항목 `date`(유효)·`ticker`·`type`(enum §2.1)·`headline`·`sources`(≥1) 필수 — 없으면 ERROR.
5. `ticker`가 `companies/`에 존재 — 없으면 WARNING(미커버 종목 뉴스 허용 여부는 운영 결정).
6. 중복 검사: 동일 ticker+date+headline 가 catalyst 결과와 news.md 양쪽에 있으면 WARNING(중복 입력 의심).

---

## §7 스킬 wiring

- `/update`(주간 스윕): ① 지난 예정 이벤트 중 `outcome` 미기재 → 결과 리서치·채우기 후보. ② 보유/주요 종목의 유상증자·L/O·파트너십 등 중대 뉴스 → `news.md` 후보. 자동 적용 금지(승인 후).
- **`/add-news`(신규 스킬)**: 뉴스 1건을 `news.md`에 추가(출처 필수, verify 통과). `/add-catalyst`와 짝.
- `/add-catalyst`: 변경 없음.

---

## §8 마이그레이션

- catalysts.md의 `event` 문자열에 섞인 결과(`승인됨`, `(조기 승인)`)를 점진적으로 결과 필드로. 자동 파싱 금지(자유 텍스트 위험), `/update`/수동으로 건건.
- 레거시 `research[].news`(딥리서치 ~10종목)는 당분간 §3-3으로 병합 노출. 여유 시 `news.md`로 통합(type 부여). 강제 아님 — 둘 다 작동.

---

## §9 Phase

- **Phase 1:** §1 결과 필드 + §6 검증(1~3) + §4.1 Results 토글.
- **Phase 2:** §2 news.md + §3 파생·병합 + §5 빌드 + §4.2 News 페이지 + §6 검증(4~6) + §7 `/add-news`.
- **Phase 3:** §4.3 기업별 뉴스 확장 + §4.4 Dashboard 위젯.

(한 세션 = 한 phase 권장 — CLAUDE.md 컨텍스트 규칙.)

---

## §10 비목표

- ❌ 자동 결과 판정(임상 통과 여부를 LLM이 단정) — 항상 출처 기반 수동/승인.
- ❌ 주가 반응을 outcome enum에 인코딩(임상≠시장, [[feedback_dual_outcome]]).
- ❌ 실시간 뉴스 크롤링/자동 수집 — 수동·승인 기반(SSOT·출처 원칙).
