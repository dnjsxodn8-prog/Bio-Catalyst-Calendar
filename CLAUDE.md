# Bio Catalyst Calendar

미국 biotech ($100M+) 및 Big Pharma의 임상 카탈리스트를 추적하는 개인용 대시보드.
React + Vite, **로컬 전용 (`npm run dev`)**. GitHub Private은 백업·이력 용도. 사용자는 1명(나).

> 2026-04-28 결정: Vercel Private 배포(이전 Phase 7) 폐기. 노트북에서만 사용. 자세한 배경은 spec 005 §0 참조.

---

## 첫 세션이라면

이 파일을 읽은 다음 `specs/` 폴더의 가장 최근 spec과 `data/` 폴더 구조를 한 번 훑어줘.
그 후에 무엇을 도와줄지 물어봐.

## 모든 작업 전 확인

1. 데이터 변경이 필요한가? → `data/` 안의 마크다운만 수정 (코드는 절대 데이터 보유 X)
2. 새 기능인가? → 먼저 `specs/`에 spec 초안 작성, 사용자 승인 후 구현
3. 반복되는 작업인가? (두 번째부터) → `.claude/skills/` 에 스킬화 제안

---

## 폴더 구조

```
data/                       ← 데이터의 단일 진실 공급원 (Single Source of Truth)
├── companies/{TICKER}.md   ← 1종목 = 1파일 (frontmatter 스키마 준수)
├── catalysts.md            ← 다가오는 카탈리스트 이벤트
├── conferences.md          ← 학회 일정
├── prices/{TICKER}.json    ← 30일 주가 캐시 (update-prices 스킬이 갱신)
└── imports/                ← 외부 임포트 원본·요약
    ├── telegram-{YYYY-WW}.md
    ├── naver-{YYYY-WW}.md
    └── raw/                ← 원본 export 보관 (커밋 X)

src/                        ← React 코드 (데이터 빠진 깡통)
├── App.jsx
├── components/
└── data.generated.json     ← build-data 스크립트가 생성. 직접 수정 금지.

scripts/                    ← 자동화 스크립트
├── build-data.mjs          ← data/*.md → src/data.generated.json
├── verify-data.mjs         ← 검증
├── fetch-prices.mjs        ← Alpha Vantage 호출
└── migrate-from-legacy.mjs ← 기존 data.js → md 마이그레이션 (1회용)

specs/                      ← 기능별 요구사항 문서 (번호 순)
├── 001-data-layer.md
├── 002-verification.md
└── ...

.claude/
├── skills/                 ← 재사용 가능한 작업 절차
│   ├── research-company/
│   ├── verify-data/
│   ├── update-prices/
│   ├── import-telegram/
│   └── import-naver/
└── settings.json
```

---

## 데이터 작업 규칙

**원칙: 코드는 깡통, 데이터는 마크다운.**

1. 종목 1개 = `data/companies/{TICKER}.md` 1파일. 절대 코드에 종목 정보 인라인 X.
2. 모든 종목 파일은 frontmatter(YAML)에 다음 필드 필수:
   - `ticker, company, mcap, modality, areas, recommendation, sources, verified`
3. `mcap`은 백만 단위 정수. **100 미만이면 추가 거부** (요구사항 4번).
4. `sources`는 URL 배열. 비어있으면 검증 실패. (요구사항 3번)
5. `verified`는 마지막 사실확인 날짜 YYYY-MM-DD. 90일 지나면 stale 경고.
6. 데이터 변경 후 항상 `npm run check` 통과해야 커밋. pre-commit hook이 강제함.

자세한 스키마는 `specs/001-data-layer.md` 참조.

---

## 검증 시스템 (요구사항 3번)

`npm run check` = lint + typecheck + verify-data + test

- **코드 검증**: ESLint, TypeScript(있다면), Vitest
- **데이터 검증** (`scripts/verify-data.mjs`):
  1. 모든 종목 파일이 스키마 통과
  2. mcap >= 100
  3. sources URL 최소 1개, 가능하면 200 OK
  4. catalysts.md의 모든 ticker가 companies/에 존재
  5. 같은 ticker 중복 없음
  6. verified 날짜 90일 이상 → ⚠️ (실패는 아님, 경고)

새 종목 추가 시 `verify-data` 스킬을 호출하여 사실관계도 교차검증할 것.

---

## Context 관리 규칙 (요구사항 6번)

**`/context` 사용량이 50%를 넘으면 즉시 사용자에게 알리고**, 다음 중 하나를 제안:

- **(A) 작업이 한 단위로 끝났음** → `/compact`로 요약 압축 후 계속
- **(B) 작업 중이고 더 길어질 듯** → 현재 진행상황을 `specs/working-notes.md`에 기록 후 새 세션 시작
- **(C) 디버깅 중이라 모든 맥락 필요** → 그대로 진행, 80% 넘으면 강제 정지

**컨텍스트 절약 원칙:**
- 종목 작업 시 그 ticker의 파일 + 관련 카탈리스트만 읽기. 전체 디렉토리 스캔 금지.
- 590줄짜리 파일을 통째 읽지 않기. 필요한 부분만 view_range로.
- 한 세션 = 한 가지 큰 작업. "오늘은 가격 갱신만", "오늘은 신규 3종목만".

---

## 페이지 구조 (요구사항 11번)

**4개 페이지만**: 대시보드 / 종목 / 카탈리스트 / 학회.
- ❌ Live API 탭 — 제거됨
- ❌ 종목 추가, 이벤트 추가, CSV 다운로드, 초기화 버튼 — 모두 제거 (요구사항 12번)
- 데이터 추가는 Claude Code 스킬(`/add-catalyst` 등)을 통해서만. 웹 UI에는 추가 버튼 없음.

검색창과 필터만 헤더에 남김.

> 2026-04-28 spec 005 §12 (웹 Import 버튼)는 사용자 결정으로 보류. 필요해지면 spec 005 §12 본문을 참조해 재개.

---

## 스킬 사용 규칙

스킬은 반복 작업의 절차서. 이름과 한 줄 설명:

- `update` — **주간 자동 스윕**. 카탈리스트 후속·뉴스·신규 catalyst·학회 발표를 자동 리서치 → 후보 제안 → 승인 후 적용 (`/update`)
- `research-company TICKER` — 새 종목 조사 후 md 생성 + verify (미구현)
- `update-company TICKER` — 기존 종목의 body 섹션 업데이트 (`/update-company`)
- `add-catalyst` — 새 카탈리스트 1건을 `data/catalysts.md`에 추가 (`/add-catalyst`)
- `verify-data` — 최근 추가/수정 종목의 사실관계 교차검증 (mcap 재확인, sources alive, 본문 sanity check). 코드 검증(`npm run verify-data`) 통과 후 사실 layer만. 자동 수정 X (`/verify-data`)
- `update-prices` — 30일 주가 갱신 (Yahoo Finance) (`/update-prices`)
- `export-naver` — 7일 임박 카탈리스트를 네이버 블로그용 단일 HTML로 export. 브라우저에서 열어 전체선택→복사→SmartEditor paste (`/export-naver`, spec 006)
- `import-telegram` — (보류, spec 005 §2 — 필요 시 재개)
- `import-naver` — (보류, spec 005 §3 — 필요 시 재개. spec 006 `/export-naver` 와는 방향 반대 — 헷갈리지 말 것)

스킬 호출 후 결과는 항상 사용자에게 요약해서 보여줄 것. 자동 커밋 금지.

---

## 운용

- **로컬 전용** (2026-04-28 결정). 노트북에서 `npm run dev` → `http://localhost:5173/`.
- GitHub Private push는 백업·이력 용도. 자동 배포 X.
- Vercel·모바일 접속·PWA 모두 폐기. 필요해지면 별도 spec.

---

## 절대 하지 말 것

- ❌ src/ 폴더 안에 데이터 인라인 (companies, catalysts 등)
- ❌ Public Repo로 push (개인 메모·견해 노출)
- ❌ 출처 없는 데이터 추가 ("정보 미입력"으로 둘 것)
- ❌ mcap < $100M 종목 추가
- ❌ 사용자 확인 없이 자동 commit/push
- ❌ 한 세션에서 너무 많은 일 하기 (컨텍스트 폭발)
- ❌ pre-commit hook 우회 (`git commit --no-verify`, `-n`). 훅이 실패하면 원인 진단·수정 후 재커밋. 우회는 `npm run check` 전체를 무력화함.
