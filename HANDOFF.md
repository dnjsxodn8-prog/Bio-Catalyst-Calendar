# Bio Catalyst Calendar — Claude Code 핸드오프 문서

> 이 문서는 Claude.ai에서 사용자와 진행한 설계 대화의 전체 요약본입니다.
> Claude Code는 이 문서 + `CLAUDE.md` + `specs/001-data-layer.md` + 기존 `legacy/App.jsx`, `legacy/data.js`를
> 모두 읽은 뒤 사용자에게 어디서부터 시작할지 확인하고 작업을 시작하세요.

---

## ⚠ 정정 노트 (2026-04-28 rev 3)

본 문서 작성 후 다음 결정으로 일부 §가 무효:

| § | 원안 | 정정 (2026-04-28) |
|---|---|---|
| §0 | "노트북·모바일 둘 다에서 접속" | **노트북만**. 모바일·외부 접속 폐기 |
| §1 #2 | "GitHub Private + Vercel Private" | **GitHub Private (백업) + 로컬 dev 서버만**. Vercel 폐기 |
| §1 #7 | "Obsidian 활용" | **폐기**. 사용 안 함 |
| §1 #10 | "Telegram/Naver 임포트 스킬" | **보류**. 필요 시 spec 005 본문 재개 |
| §1 #11 | "페이지 4개" | 유지 |
| §1 #12 | "헤더 4개 버튼 모두 삭제" | 유지. 웹 Import 버튼도 보류로 가서 헤더 변경 X |
| §2 | 아키텍처 다이어그램(Vercel·휴대폰 박스) | **로컬 노트북 + GitHub Private (push는 백업)** 으로 단순화 |
| §6 | "import-telegram / import-naver" | **둘 다 보류**. spec 005 §2~§3 본문 보존, 재개 시 출발점 |
| §8 | "Alpha Vantage" | Yahoo Finance (spec 004에서 정정 완료) |
| §9 | "Obsidian 활용" 단락 전체 | **삭제**. 사용 안 함 |
| §10 | Phase 표 | 아래 §10 정정안 참조 |

자세한 배경: spec 005 §0 + 상단 보류 메모. 신규 채팅 / 새 세션은 본 문서가 아니라 **CLAUDE.md + working-notes.md + 가장 최근 spec**을 정본으로 봐야 함.

---

## 0. 사용자에 대해

- 사용자 1명 (개인용 도구). 한국어 사용.
- 기존에 React 기반 Bio Catalyst Calendar를 만들어 사용 중.
- 기존 구조: `App.jsx` (993줄) + `data.js` (590줄). 데이터가 코드에 인라인되어 있어 파일이 비대해지고 수정 시간이 오래 걸리는 문제 발생.
- 노트북과 모바일 둘 다에서 접속하고 싶어함 (어디서든).
- Claude Code, skill, spec.md, Obsidian 등 처음 사용. **초보자 친화적 설명 필요**.

## 1. 사용자가 제시한 요구사항 12개 (원문 의도 보존)

| # | 요구사항 | 결정된 해법 |
|---|---|---|
| 1 | Claude Code로 작업 이어서 하기 | `claude --resume` + 프로젝트 루트의 `CLAUDE.md` (헌법) |
| 2 | 나만 보는 사이트/앱 | GitHub Private Repo + Vercel Private (Password Protection). 무료. |
| 3 | 검증 시스템 (코드 + 데이터) | `verify-data.mjs` + `verify-data` 스킬 + git pre-commit hook |
| 4 | 미국 biotech ($100M+) + Big Pharma | `mcap >= 100` (백만 단위) 검증으로 강제 |
| 5 | 데이터 코드 분리 (md/excel) | `data/companies/{TICKER}.md` 1종목 1파일. 빌드 시 JSON 합성. |
| 6 | Context 관리 + 50% 알림 | CLAUDE.md에 50% 알림 규칙 명시. 분산 폴더로 절약. |
| 7 | Obsidian 활용 | data/ 폴더를 Obsidian vault로 그대로 열기 → 그래프뷰·백링크 |
| 8 | Skill + spec.md 적극 활용 | 5개 스킬 + 번호별 spec 문서 |
| 9 | 30일 주가 그래프 | Alpha Vantage API → `data/prices/*.json` 캐시 → sparkline |
| 10 | Telegram/Naver 임포트 | `import-telegram` / `import-naver` 스킬, 주차별 요약 md |
| 11 | Live API 탭 제거 | 페이지 4개로: 대시보드 / 종목 / 카탈리스트 / 학회 |
| 12 | 헤더 4개 버튼 제거 | 종목 추가, 이벤트 추가, CSV 다운로드, 초기화 모두 삭제. 검색창만 잔존. |

## 2. 확정된 아키텍처

```
[ 노트북 ]
   Claude Code → data/ 수정 → git push
                                  ↓
[ GitHub Private Repo ]  ← 데이터의 정본 + 백업
                                  ↓ (자동 빌드)
[ Vercel Private ]  ← 호스팅 (Password Protected)
                                  ↓
[ 노트북 브라우저 ] + [ 휴대폰 브라우저 ]  ← 같은 URL
```

**핵심 원칙:** `data/` 폴더 하나가 ①Claude Code가 읽고 쓰고 ②React 앱이 빌드 시 import하고 ③Obsidian이 vault로 여는 **단일 진실 공급원(Single Source of Truth)**.

## 3. 폴더 구조 (확정)

```
biotech-catalyst/
├── CLAUDE.md                    # 프로젝트 헌법. 매 세션 자동 로드.
├── HANDOFF.md                   # 이 문서.
├── specs/                       # 기능별 요구사항 문서 (번호별)
│   └── 001-data-layer.md        # ✅ 작성 완료
├── data/                        # 데이터의 정본
│   ├── companies/{TICKER}.md    # 1종목 = 1파일 (frontmatter + 본문)
│   ├── catalysts.md             # 모든 카탈리스트 이벤트 (yaml 블록)
│   ├── conferences.md           # 모든 학회 (yaml 블록)
│   ├── prices/{TICKER}.json     # 30일 주가 캐시
│   └── imports/                 # Telegram·Naver 임포트
│       ├── telegram-{YYYY-WW}.md
│       ├── naver-{YYYY-WW}.md
│       └── raw/                 # 원본 (gitignore)
├── src/                         # React 코드 (데이터 빠진 깡통)
│   ├── App.jsx
│   ├── components/
│   └── data.generated.json      # 빌드 산출물. 직접 수정 금지.
├── scripts/                     # 자동화
│   ├── build-data.mjs           # data/*.md → data.generated.json
│   ├── verify-data.mjs          # 검증
│   ├── fetch-prices.mjs         # Alpha Vantage 호출
│   └── migrate-from-legacy.mjs  # 1회용: 기존 data.js → md
├── legacy/                      # 기존 파일 보관 (마이그레이션 후 삭제)
│   ├── App.jsx
│   └── data.js
└── .claude/
    ├── skills/                  # 5개 스킬
    │   ├── research-company/SKILL.md
    │   ├── verify-data/SKILL.md
    │   ├── update-prices/SKILL.md
    │   ├── import-telegram/SKILL.md
    │   └── import-naver/SKILL.md
    └── settings.json
```

## 4. 데이터 스키마 (Spec 001 핵심 발췌)

### Company (`data/companies/{TICKER}.md`)

**Frontmatter 필수 필드:**
- `ticker` (대문자, 유일)
- `company` (정식 회사명)
- `mcap` (백만 USD, 정수, **>= 100**)
- `modality` (enum 아래 참조)
- `areas` (배열, 1개 이상)
- `nextCatalyst` (YYYY-MM-DD or null)
- `recommendation` (enum: `Core Holding` | `Worth Monitoring` | `Speculative`)
- `verified` (YYYY-MM-DD, 마지막 사실확인일)
- `sources` (URL 배열, **1개 이상**)

**Modality enum:**
`Small Molecule`, `Antibody`, `Peptide`, `mRNA`, `RNA/siRNA`, `Gene Therapy`, `Cell Therapy`, `ADC`, `Bispecific`, `Other`

**본문 정해진 헤딩 (빌드 스크립트가 파싱):**
`## 카탈리스트`, `## 회사 개요`, `## 매출`, `## 플랫폼`, `## 적응증`, `## 파트너`, `## 매출 구조`, `## 자체 판매`, `## 상업화 제품`, `## 메모`

샘플은 `data/companies/LLY.md` 참조.

### Catalyst (`data/catalysts.md`)

단일 파일 안의 yaml 블록. 이벤트 1개 = 항목 1개.

```yaml
events:
  - date: 2026-04-10
    ticker: LLY
    event: Orforglipron T2D PDUFA
    type: PDUFA            # PDUFA | Conference | Clinical Readout | Earnings
    company: Eli Lilly
    drug: Orforglipron
    indication: T2D
    phase: NDA
    sources: [...]
```

### Conference (`data/conferences.md`)

학회는 연 10여 개 정도라 동일 형식의 단일 파일.

### Price Cache (`data/prices/{TICKER}.json`)

30일치만 보관. `update-prices` 스킬이 갱신.

```json
{
  "ticker": "LLY",
  "fetched": "2026-04-27T08:00:00Z",
  "source": "alphavantage",
  "data": [{"date": "2026-03-28", "close": 745.20}, ...]
}
```

## 5. 검증 시스템 (요구사항 3번)

**`npm run check` = lint + typecheck + verify-data + test**

`scripts/verify-data.mjs` 검증 항목:

| 체크 | 실패 시 |
|---|---|
| frontmatter 필수 필드 누락 | error |
| modality enum 위반 | error |
| **mcap < 100** | error |
| sources 비어있음 | error |
| ticker 중복 (두 파일에 같은 티커) | error |
| catalysts의 ticker가 companies에 없음 | error |
| 날짜 형식 위반 (YYYY-MM-DD 아님) | error |
| **verified > 90일 전** | warning (실패는 아님) |

git pre-commit hook이 강제. 검증 실패 시 커밋 자체가 막힘.

추가로 `verify-data` 스킬은 Claude가 직접 사실관계 교차검증 (clinicaltrials.gov NCT 번호, FDA PDUFA 날짜 등). 1차 필터로 활용.

## 6. 5개 스킬 (요구사항 8, 10번)

각 스킬은 `.claude/skills/{이름}/SKILL.md`에 frontmatter(name, description) + 절차로 구성.

### research-company
- 입력: TICKER
- 절차:
  1. mcap을 web 검색으로 확인. 100 미만이면 중단.
  2. 회사 IR, SEC 10-K, clinicaltrials.gov, FDA 캘린더에서 정보 수집
  3. `data/companies/{TICKER}.md` 생성 (template 사용)
  4. sources 필드에 사용한 URL 모두 기록
  5. verify-data 스킬 호출하여 통과 확인
  6. catalysts.md에 새 카탈리스트 추가
  7. `npm run build-data` 실행
- 주의: 출처 없는 정보는 적지 않음 ("정보 미입력"으로). 시총은 백만 단위 정수.

### verify-data
- 전체 데이터 검증 (스키마 + 사실관계 교차검증)
- `npm run verify-data` 실행 → 결과 사용자에게 요약

### update-prices
- 모든 ticker에 대해 Alpha Vantage 호출 → `data/prices/*.json` 갱신
- 30일치 유지, 오래된 데이터는 자름
- API 키는 `.env.local`의 `VITE_ALPHA_VANTAGE_KEY`

### import-telegram
- `data/imports/raw/`의 새 export 감지
- 최근 7일 메시지에서 이벤트성 정보 추출 (PDUFA, readout, 승인, 학회)
- `data/imports/telegram-{YYYY-WW}.md`로 주간 요약 저장
- 새 티커 등장 → research-company 자동 호출 제안

### import-naver
- `data/imports/naver-blogs.txt`의 구독 블로그 RSS 가져오기
- 최근 7일 글 본문 fetch
- 이벤트 + 약물/기업 개요 추출
- `data/imports/naver-{YYYY-WW}.md`로 저장

## 7. UI 변경 (요구사항 11, 12번)

### 페이지: 4개로 축소
- ✅ 대시보드
- ✅ 종목
- ✅ 카탈리스트
- ✅ 학회
- ❌ Live API — **제거**

### 헤더: 검색창만 남김
- ❌ 종목 추가 버튼 — 제거
- ❌ 이벤트 추가 버튼 — 제거
- ❌ CSV 다운로드 버튼 — 제거
- ❌ 초기화 버튼 — 제거
- ❌ 관련 함수 (addWatchlist, deleteCatalyst, exportCSV, resetToDefaults 등) — 모두 정리

데이터 추가는 **오직 Claude Code를 통해서만**.

## 8. 30일 주가 그래프 (요구사항 9번)

> **2026-04-28 갱신:** Alpha Vantage 무료가 일 25콜로 좁혀지면서 Yahoo Finance로 이전. 자세한 결정 내역은 spec 004-prices.md 참조.

- 데이터 소스: **Yahoo Finance** (`yahoo-finance2` npm, 키 불필요). 차단 시 Stooq fallback.
- 캐시: `data/prices/{TICKER}.json` (30 거래일 종가)
- 갱신: `/update-prices` 스킬 수동 실행 (자동화는 Phase 7 이후)
- UI: 종목 디테일 패널에 SVG sparkline (`src/components/Sparkline.jsx`), 모바일 height 48px

## 9. ~~Obsidian 활용~~ (요구사항 7번 — 폐기 2026-04-28)

요구사항 7번은 **삭제**됨. Obsidian 사용 안 함. data/ 폴더 구조는 build-data 스크립트와 Claude Code 작업 용도로만 유지. 미래에 다시 시각화 도구가 필요해지면 별도 spec.

## 10. Phase별 추천 진행 순서

**한 번에 다 하지 말 것. 단계별로:**

### 10.1 원안 (참고용 — 무효)

| Phase | 내용 | 상태 |
|---|---|---|
| 1 | 데이터 레이어 | ✅ 완료 |
| 2 | UI 정리 | ✅ 완료 |
| 3 | 검증 시스템 | ✅ 완료 |
| 4 | 주가 그래프 | ✅ 완료 (Alpha Vantage → Yahoo) |
| 5 | Telegram + Naver 스킬 | 진행 중 |
| 6 | Obsidian 연동 | 30분 |
| ~~7~~ | ~~Vercel Private 배포 + 모바일 PWA~~ | **폐기 (2026-04-28)** |

### 10.2 정정안 (2026-04-28 rev 3 정본)

| Phase | 내용 | 상태 |
|---|---|---|
| 1 | 데이터 레이어 | ✅ |
| 2 | UI | ✅ |
| 3 | 검증 시스템 | ✅ |
| 4 | 주가 (Yahoo Finance) | ✅ |
| ~~5~~ | ~~Telegram + Naver + 웹 Import UI~~ | **보류 (2026-04-28)**. spec 005 본문 보존, 필요 시 재개 |
| ~~6~~ | ~~Obsidian 연동~~ | **삭제 (2026-04-28)**. 사용 안 함 |
| ~~7 (rev 2)~~ | ~~로컬 사용 편의~~ | 유지 가능, 후순위 (필요해지면) |
| ~~8 (rev 2)~~ | ~~Telegram 봇 자동화~~ | spec 005 보류와 함께 자동 보류 |

**현 시점 진행 가능한 작업:**
- 데이터 백필 (스킬 `/update`, `/update-company`, `/add-catalyst`, `/update-prices` 활용)
- spec 003 §3-C `verify-data` 스킬 (선택, 1주일 사용 후 결정)
- 새 요구사항·새 spec (필요 시 spec 006 신설)

**핵심 권고:** 미리 만든 스킬·spec은 70% 폐기 가능성. 지금은 Phase 1~4의 결과물(추적 시스템 + 검증 + 주가)을 한동안 사용해보고, 자동화 가치가 명확해지면 spec 005 또는 새 spec 작성.

## 11. Context 관리 규칙 (사용자가 처음 접하는 개념)

CLAUDE.md에 다음 규칙 명시됨:

**`/context` 사용량 50% 넘으면** Claude Code가 즉시 사용자에게 알리고 다음 중 하나를 제안:
- (A) 작업이 한 단위 끝났음 → `/compact`로 압축
- (B) 작업 중이고 더 길어질 듯 → `specs/working-notes.md`에 진행상황 기록 후 새 세션
- (C) 디버깅 중이라 모든 맥락 필요 → 80% 까지는 그대로 진행

**컨텍스트 절약 3원칙:**
1. 종목 작업 시 그 ticker 파일 + 관련 카탈리스트만 읽기. 전체 디렉토리 스캔 금지.
2. 큰 파일은 view_range로 부분 읽기.
3. 한 세션 = 한 가지 큰 작업.

## 12. 절대 하지 말 것 (CLAUDE.md에서 옮김)

- ❌ src/ 안에 데이터 인라인
- ❌ Public Repo로 push
- ❌ 출처 없는 데이터 추가
- ❌ mcap < $100M 종목 추가
- ❌ 사용자 확인 없이 자동 commit/push
- ❌ 한 세션에서 너무 많은 일

## 13. ~~기존 파일 (legacy/) 활용 가이드~~ (2026-04-28 폐기)

`legacy/` 폴더는 Phase 1 마이그레이션 완료 후 **2026-04-28 삭제**됨. 현 데이터는 `data/companies/*.md`, `data/catalysts.md`, `data/conferences.md`가 정본. legacy 변환 이력은 `scripts/migrate-from-legacy.mjs`, `scripts/apply-changes.mjs`에 남아있음(보존).

## 14. 첫 세션 권장 워크플로

Claude Code가 사용자와 처음 만나는 시점에 할 일:

1. **이 HANDOFF.md, CLAUDE.md, specs/001-data-layer.md를 모두 읽기**
2. `legacy/App.jsx`, `legacy/data.js`의 구조를 빠르게 훑기 (전체 파일 통째 읽지 말고 head/tail로)
3. 사용자에게 다음을 확인:
   - "Phase 1부터 시작하시나요? 아니면 spec 001에 먼저 손볼 부분 있나요?"
   - "modality enum, 적응증 카테고리, 카탈리스트 type 분류 — spec 001 정의가 OK인지?"
   - "마이그레이션 스크립트 만들기 전, 시총 100 미만 종목 발견하면 어떻게 처리할지? (자동 제외 / 사용자에게 물어봄 / 일단 기록만)"
4. 결정사항 받으면 spec 001을 업데이트 후 작업 시작

**먼저 묻지 말고 추측해서 진행하지 말 것.** 사용자는 Claude Code 처음이므로 한 단계씩 확인하며 진행.

## 15. 사용자가 들고있는 출력물 (참고)

이미 사용자에게 전달된 파일:
- `CLAUDE.md` — 프로젝트 헌법
- `specs/001-data-layer.md` — 데이터 모델 spec
- `data/companies/LLY.md` — 샘플 종목 파일
- `README.md` — starter 사용법

사용자는 이것을 새 Vite 프로젝트 루트에 복사하고 `claude` 실행하여 이 세션을 시작합니다.

## 16. 톤 가이드

- 사용자는 한국어. **답변은 한국어로.**
- 사용자는 Claude Code, skill, spec, Obsidian 모두 처음. **개념 설명할 때 초보자 친화적으로.**
- 과한 격려·아부 금지. 솔직한 권고 (예: "이건 오버엔지니어링입니다", "이 spec은 70% 버려질 가능성") 환영.
- 한 번에 너무 많이 하지 말 것. Phase 단위로 진행.

---

**끝.** 이 문서를 다 읽었으면, 사용자에게 14번의 질문 3개를 던지면서 시작하세요.
