# Spec 001: Data Layer

**상태:** Draft  
**작성일:** 2026-04-27  
**관련 요구사항:** 4, 5, 6번

## 목표

종목/카탈리스트/학회 데이터를 코드(`src/data.js`)에서 분리하여 마크다운 파일 모음으로 전환한다. 이로써:
1. 데이터 변경이 코드 변경과 분리됨 (git diff 깨끗함)
2. 컨텍스트 사용량 감소 (필요한 종목만 읽음)
3. Claude Code의 검증 대상이 명확해짐

## 비-목표 (Out of scope)

- 다중 사용자 동시 편집 (사용자 1명)
- 실시간 동기화 (git push로 충분)
- 데이터베이스 (마크다운 파일이 DB 역할)

## 데이터 모델

### 1. Company (`data/companies/{TICKER}.md`)

**Frontmatter (YAML, 필수):**
```yaml
---
ticker: LLY                              # 대문자, 유일
company: Eli Lilly                       # 정식 회사명
mcap: 800000                             # 백만 USD, 정수, >= 100
modality: Small Molecule                 # 아래 enum 중 하나
areas: [Obesity/Metabolic, Oncology]     # 배열, 1개 이상
nextCatalyst: 2026-04-10                 # YYYY-MM-DD | YYYY-H1/H2 | YYYY-Q1~Q4 | null
verified: 2026-04-25                     # YYYY-MM-DD, 마지막 사실확인일
sources:                                 # URL 배열, 1개 이상
  - https://www.lilly.com/news/...
  - https://clinicaltrials.gov/study/NCT...
---
```

**Modality enum (확정 목록, 2026-04-27 갱신):**
- `Small Molecule`
- `Antibody`
- `Peptide`
- `mRNA`
- `RNA/siRNA`
- `Gene Therapy`
- `Cell Therapy`
- `ADC`
- `Bispecific`
- `Biologic`
- `Protein/Enzyme`
- `Tool/Platform`
- `Diagnostic`
- `Other`

> 변경 이력: spec 003 §6 결정에 따라 14종으로 확장 (Diagnostic·Tool/Platform·Biologic·Protein/Enzyme 추가). `siRNA`(단독)는 `RNA/siRNA`로 정규화 권장 (별도 데이터 정리 작업).

**Recommendation 필드 제거 (2026-04-30):**
- 원안 3종(`Core Holding`/`Worth Monitoring`/`Speculative`)에 `Avoid` 추가했었음 → 공개 배포 결정에 따라 견해성 등급 필드 자체를 폐기. 데이터·검증·UI 모든 곳에서 제거됨.

**nextCatalyst 형식 (2026-04-28 완화):**
- 원안: `YYYY-MM-DD` 또는 `null`만.
- 갱신: 분기/반기 표기 허용 → `YYYY-H1`, `YYYY-H2`, `YYYY-Q1`, `YYYY-Q2`, `YYYY-Q3`, `YYYY-Q4`.
- 이유: 임상 일정은 회사 공시가 분기 단위로 가는 경우가 많음. UI(`src/utils/format.js` `parseDateUTC`)는 YMD prefix만 파싱 → 분기 표기는 자연스럽게 무시되므로 D-day 카운트나 정렬에 영향 없음. 정확한 날짜가 잡히면 `data/catalysts.md`로 이동 + frontmatter `nextCatalyst`를 YMD로 갱신.

**Body (마크다운, 자유):**
```markdown
# Eli Lilly (LLY)

## 카탈리스트
Orforglipron PDUFA (T2D) - oral GLP-1

## 회사 개요
글로벌 빅파마. 당뇨/비만(Mounjaro, Zepbound)...

## 매출
$45B (FY2024), 2026 guidance $80-83B

## 플랫폼
- Small Molecule
- Peptide/Incretin
- Antibody

## 적응증
Obesity/Metabolic, Oncology, Immunology, Neuroscience

## 파트너
Boehringer Ingelheim, Incyte, Chugai

## 매출 구조
자체 제품 ~98% (Mounjaro+Zepbound 50%+)

## 자체 판매
예 - 글로벌

## 상업화 제품
Mounjaro, Zepbound, Verzenio, Jaypirca, Kisunla...

## 메모
Oral GLP-1 게임체인저
```

본문 섹션은 자유롭게 추가 가능. 단 빌드 스크립트가 파싱하는 정해진 헤딩은 유지할 것.

**필수 헤딩 (마이그레이션 시 자동 생성, 데이터 없으면 "정보 미입력"):**
- `## 카탈리스트`
- `## 회사 개요`
- `## 매출`
- `## 플랫폼`
- `## 적응증`
- `## 파트너`
- `## 매출 구조`
- `## 자체 판매`
- `## 상업화 제품`
- `## 메모`

**선택 헤딩 (`legacy/data.js`의 `trialProfiles`/`drugProfiles` 기반, UI에서 있으면 표시):**
- `## 임상 디자인`
- `## 타겟 질환`
- `## 기존 치료제`
- `## 사전 공개 임상`
- `## Modality` (frontmatter `modality`와 별개. 본문은 더 상세한 약물 modality 설명)
- `## MOA`
- `## 논문`

선택 헤딩은 데이터가 있는 종목(현 시점 20종목)에만 추가됨. UI(`CompanyDetail.jsx`)가 키 이름으로 찾아서 있으면 "임상 정보"·"약물 정보" 박스로 렌더링.

### 2. Catalyst Event (`data/catalysts.md`)

단일 파일. 마크다운 표 또는 yaml 블록 형태로 다수 이벤트.

**선택지 A — YAML 단일 블록:**
```markdown
# Catalyst Events

\`\`\`yaml
events:
  - date: 2026-04-10
    ticker: LLY
    event: Orforglipron T2D PDUFA
    type: PDUFA              # PDUFA | Conference | Clinical Readout | Earnings | Regulatory
    company: Eli Lilly
    drug: Orforglipron
    indication: T2D
    phase: NDA
    conferenceId: null       # 학회 발표인 경우 conferences[].id 와 매칭. 그 외 null/생략
    sources:
      - https://...

    # spec 007부터 도입 (모두 optional, export-telegram·export-naver에서 사용)
    trialDesign: |           # 1-2 sentence 임상 디자인 설명
      SKYLINE은 ETI 대조 randomized double-blind 52주 Ph3 (n=400).
    targetDisease: |         # 1-2 sentence 타겟 질환 설명
      CFTR 변이로 인한 점액 분비 이상으로 폐 감염 반복·호흡 부전을 일으키는 유전 질환.
    priorTrialUrl: https://clinicaltrials.gov/ct2/show/NCT05033080
    moa: |                   # 1-2 sentence 작용 기전
      CFTR 단백질의 게이팅과 폴딩을 동시 보정. ETI 대비 단일분자로 두 corrector를 대체.
\`\`\`

`conferenceId` 추가 동작 (선택적):
- `type: Conference` 또는 학회 중 발표되는 `Clinical Readout`에 사용. 예: `conferenceId: asco`.
- 학회 페이지에서 카탈리스트 매칭 시 `conferenceId` 우선, 없으면 event 텍스트의 학회 약어 fallback.

**spec 007 신규 4 필드** (모두 optional, verify-data 검증 영향 X):
| 필드 | 형식 | 용도 |
|---|---|---|
| `trialDesign` | multiline string | 임상 디자인. export-telegram detail §임상 정보 |
| `targetDisease` | multiline string | 타겟 질환. detail §임상 정보의 적응증 줄 |
| `priorTrialUrl` | URL string | 사전 공개 임상 (NCT URL 우선) |
| `moa` | multiline string | 작용 기전. detail §약물 정보 |

→ `/update`와 `/add-catalyst`가 신규 catalyst 추가 시 채움. 비어있으면 export 시 해당 줄/섹션이 자동 생략.
```

**선택지 B — 카탈리스트당 별도 파일** `data/catalysts/2026-04-10-LLY-orforglipron.md`

→ 추천: **선택지 A**. 카탈리스트는 종목보다 짧고 자주 추가/삭제되므로 단일 파일이 관리 쉬움. 이벤트 1개 = yaml 한 항목 = 5~10줄.

### 3. Conference (`data/conferences.md`)

학회는 카탈리스트보다 훨씬 적음(연 10여 개). 카탈리스트와 동일 형식의 단일 파일.

```markdown
# Conferences

\`\`\`yaml
conferences:
  - id: jpm
    name: J.P. Morgan Healthcare Conference 2026
    dates: 2026-01-12 to 2026-01-15
    location: San Francisco, CA
    areas: [All]
    tier: Tier 1            # Tier 1 | Tier 2 | Tier 3
    importance: Major Catalyst
    notes: 업계 최대 투자 컨퍼런스
\`\`\`
```

### 4. Price Cache (`data/prices/{TICKER}.json`)

```json
{
  "ticker": "LLY",
  "fetched": "2026-04-27T08:00:00Z",
  "source": "alphavantage",
  "data": [
    { "date": "2026-03-28", "close": 745.20 },
    { "date": "2026-03-29", "close": 748.10 }
  ]
}
```

30일치만 보관. `update-prices` 스킬이 갱신하며 오래된 데이터는 자르고 새 데이터를 붙임.

### 5. Imports (`data/imports/`)

- `telegram-{YYYY-WW}.md` — 주차별 텔레그램 요약
- `naver-{YYYY-WW}.md` — 주차별 네이버 요약
- `raw/` — 원본 export. **gitignore 처리** (큰 파일·민감 정보 가능성)

요약 파일 구조:
```markdown
---
period: 2026-W17
source: telegram
imported: 2026-04-27
---

# Telegram 주간 요약 (2026-W17)

## 주요 이벤트
- LLY Orforglipron PDUFA 4/10 통과 (sBLA)
- ...

## 신규 언급 종목
- VKTX (research-company 미실행)
```

## 빌드 파이프라인

```
data/*.md ──┐
            ├──► scripts/build-data.mjs ──► src/data.generated.json ──► React import
data/*.json ┘
```

`build-data.mjs`가 하는 일:
1. `data/companies/*.md` 모두 읽어서 frontmatter 추출 + body 파싱
2. `data/catalysts.md`, `data/conferences.md` yaml 블록 파싱
3. `data/prices/*.json` 합치기
4. 모두 합쳐서 `src/data.generated.json` 출력
5. 검증 통과 못하면 빌드 실패

`npm run dev` 시작 전, `npm run build` 시 모두 자동 실행되도록 `package.json` scripts 연결.

## 마이그레이션 (1회용)

기존 `data.js` 590줄 → `data/` 폴더의 마크다운 파일들로 변환.

`scripts/migrate-from-legacy.mjs`:
1. 기존 `data.js` 동적 import
2. `initialWatchlist` 순회 → 각 종목당 `companies/{TICKER}.md` 생성
3. `companyProfiles[ticker]` 있으면 frontmatter + 본문에 합침, 없으면 기본값
4. `initialCatalystEvents` → `catalysts.md`의 yaml 블록
5. `initialConferences` → `conferences.md`의 yaml 블록
6. 각 파일에 `verified: <오늘 날짜>` 자동 부여
7. `sources: []` 빈 배열로 시작 (사용자가 점진 채워나감)

마이그레이션 후 검증 실행. 시총 100 미만 종목은 별도 리스트로 출력해서 사용자가 결정하게.

## 검증 (`scripts/verify-data.mjs`)

| 체크 | 실패 시 |
|---|---|
| frontmatter 필수 필드 누락 | error |
| modality enum 위반 | error |
| mcap < 100 | error |
| sources 비어있음 | error |
| ticker 중복 | error |
| catalysts의 ticker가 companies에 없음 | error |
| verified > 90일 전 | warning |
| 날짜 형식 위반 | error |

`npm run verify-data`로 단독 실행 가능. CI 및 git pre-commit hook이 호출.

## 의존성

- `gray-matter` — frontmatter 파싱
- `yaml` — yaml 블록 파싱
- `husky` + `lint-staged` — pre-commit hook (선택)

## 오픈 이슈 / 결정 필요

1. ⚠️ 카탈리스트 파일 분할 시점: 이벤트가 200개 넘어가면 yaml 블록 하나가 너무 길어짐. 일단 단일 파일로 시작, 한계 도달 시 월별 분할.
2. ⚠️ frontmatter의 `nextCatalyst`는 catalysts.md와 중복 정보 — companies가 캐시고 catalysts가 정본. 빌드 시 자동 동기화 (companies의 nextCatalyst를 catalysts에서 계산).
3. ~~Obsidian이 yaml 코드블록을 메타데이터로 인식 못함~~ — 폐기 (2026-04-28 Obsidian 사용 안 함)

## 완료 조건

- [ ] `data/` 폴더 구조 생성
- [ ] 마이그레이션 스크립트로 기존 데이터 모두 변환
- [ ] `verify-data.mjs` 통과
- [ ] `build-data.mjs`로 JSON 생성, App.jsx가 그것을 import
- [ ] 사이트가 마이그레이션 전과 동일하게 렌더링
- [ ] git pre-commit hook 작동 확인
