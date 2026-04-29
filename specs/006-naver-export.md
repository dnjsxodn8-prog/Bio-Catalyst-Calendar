# Spec 006: Naver Export

**상태:** 초안 (2026-04-29)
**작성일:** 2026-04-29
**관련 요구사항:** (신규) 주간 카탈리스트 네이버 블로그 발행
**선행:** spec 001 (data layer), spec 002 (UI)
**참조:** spec 005 §3 (`/import-naver` 보류 — 본 spec과 방향 반대. 같은 `naver` 단어를 쓰지만 데이터 흐름은 정반대라 이름 분리)

---

## 0. 목적

오늘부터 7일 이내의 카탈리스트를 네이버 블로그에 발행할 수 있게,
**브라우저에서 열어 전체선택 → 복사 → SmartEditor에 paste** 하면 굵기·헤딩·불릿이 보존되는 HTML 파일을 생성.

웹 사이트(`npm run dev`)에서 카탈리스트를 클릭하면 펼쳐지는 내용(`CompanyDetail.jsx` 의 3개 SectionBox: 기업 프로필 / 임상 정보 / 약물 정보)을 그대로 옮겨담는 것이 목표.

## 비-목표

- 텍스트(.txt) 출력 — 사용자 결정 (HTML만)
- 네이버 OpenAPI 자동 게시 — 수동 paste만
- 카탈리스트 type 필터링 — 전부 포함 (PDUFA / Conference / Clinical Readout / Earnings / Regulatory)
- 인사말·면책문구 등 고정 템플릿 텍스트 — 사용자 직접 작성
- 차트·이미지·sparkline — text/표만
- 자동 적용 / git commit — 스킬은 파일 생성까지만

---

## 1. 호출 인터페이스

```
/export-naver
```

인자 없음. 기준일 = 오늘, 윈도우 = +7일 (today 포함, today+7까지의 8일 윈도우) 고정.

> 미래에 14일·다음 주 미리보기 등이 필요해지면 그때 옵션 인자 추가. v1 은 의도적으로 단순화.

---

## 2. 출력

`data/imports/naver-export-{YYYY-MM-DD}.html` (기준일).

같은 날 다시 호출하면 **덮어쓰기** (재생성 자유).

### gitignore

`.gitignore`에 `data/imports/naver-export-*.html` 추가. 이유:
- 데이터에서 결정적으로 재생성 가능
- 매주 갱신되는 render 산출물 (이력은 catalysts.md / companies/ 자체로 충분)

---

## 3. HTML 구조

### 3.1 전체 골격

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>2026-04-29 ~ 2026-05-06 biotech 카탈리스트</title>
  <style>/* §3.4 인라인 스타일 */</style>
</head>
<body>
  <!-- §3.2 요약 표 -->
  <!-- §3.3 카탈리스트별 상세 N개 -->
</body>
</html>
```

`<style>` 은 SmartEditor가 paste 시 인라인으로 변환하므로 **요소별 inline `style="..."` 도 함께 적용** (paste 호환성 보강).

### 3.2 요약 (글 맨 위)

표 형식 — 네이버에서 표가 그대로 보존됨:

| 날짜 | 종목 | 카탈리스트 | 종류 |
|---|---|---|---|
| 4/30 (목) | AXSM | AXS-05 알츠하이머 초조 PDUFA | PDUFA |
| 5/02 (토) | COGT | Bezuclastinib PEAK Phase 3 ASCO | Conference |

날짜 정렬, 같은 날은 ticker 알파벳순.

> 사용자 요청: "[상단 ~]" "[하단 ~]" 같은 라벨 텍스트 없음. 표가 곧 요약 영역, 이어지는 본문이 곧 상세.

### 3.3 카탈리스트별 상세 (요약 표 아래로 N개)

각 카탈리스트 1개 = 큰 헤딩 1개 + 내부 3개 섹션:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{TICKER} · {Company}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 카탈리스트
{drug} · {indication} · {phase}
{event}
일정: {date}

🏢 기업 프로필
시가총액: {mcap}
{회사 개요}
{매출}
{플랫폼}
{적응증}
{파트너}
{매출 구조}
{자체 판매}
{상업화 제품}

🧪 임상 정보
{임상 디자인}
{타겟 질환}
{기존 치료제}
{사전 공개 임상}

💊 약물 정보 — {Modality 헤더}
{Modality 본문}
{MOA}
{논문}

[Sources]
- {url1}
- {url2}
```

CompanyDetail.jsx 의 PROFILE_FIELDS / CLINICAL_FIELDS / DRUG_FIELDS 라벨·순서를 그대로 따름.

### 3.4 스타일 결정

- **서체**: SmartEditor의 본문 폰트(나눔고딕/맑은고딕)와 충돌하지 않도록 `font-family` 지정 X. 대신 size·weight·color만.
- **헤딩 색**:
  - 카탈리스트 묶음 헤딩: 굵은 회색 (`#1f2937`)
  - 섹션 헤딩 (기업 프로필 / 임상 정보 / 약물 정보): 사이트 토큰 차용
    - 기업 프로필: 그린 (`#10b981`)
    - 임상 정보: 블루 (`#3b82f6`)
    - 약물 정보: 바이올렛 (`#8b5cf6`)
- **요약 표**: 1px 테두리, 헤더 행은 옅은 배경 (`#f3f4f6`)
- **불릿**: `<ul><li>` (네이버에서 자동 처리됨)
- **링크**: 기본 a 스타일 (밑줄). target=_blank 불필요 — 네이버가 자체 처리

### 3.5 빈 필드 처리

- companies/{TICKER}.md 의 본문 섹션이 비어있거나 `정보 미입력` 이면 → **그 줄 자체를 생략** (CompanyDetail.jsx 의 `isFilled` 와 동일)
- companies 파일이 아예 없는 ticker → 카탈리스트 메타(drug/indication/phase/event)만 보여주고 회사 정보 영역은 "기업 정보 미등록" 한 줄
- sources 비어있으면 "[Sources]" 자체 생략

### 3.6 Modality 헤더 추출

CompanyDetail.jsx 와 동일: Modality 본문의 첫 줄이 `**...**` 굵은 글이면 그것을 약물 정보 섹션 부제로 사용.

`utils/inlineMarkdown.js` 의 `extractBoldHeader` / `stripBoldHeader` 로직을 스크립트 쪽에 복제. (의존성 추가 안 함; 짧은 정규식.)

---

## 4. 본문 마크다운 → HTML 변환

companies/{TICKER}.md 본문 섹션은 마크다운 일부 문법 사용. 보존해야 할 것:

- `**굵게**` → `<strong>`
- `[text](url)` → `<a href="url">text</a>`
- 줄 시작 `- ` → `<ul><li>...</li></ul>`
- 빈 줄 → `<br>` 또는 단락 분리
- NCT 번호 (예: `NCT03226522`) → `https://clinicaltrials.gov/study/{NCT}` 자동 링크
  (UI 의 inlineMarkdown 유틸이 이미 하는 동작)

복잡한 마크다운(코드블록, 헤딩, 이미지)은 본문에 거의 안 나오니 v1 에서 미지원.

---

## 5. 스크립트

`scripts/build-naver-export.mjs`

```
인자: 없음

동작:
  1. src/data.generated.json 읽음 (없으면 build-data 먼저 실행)
  2. base = today (KST), catalysts 중 date in [base, base+7일] 추출, 정렬
  3. 각 catalyst 의 ticker → companies map 으로 회사 데이터 조회
  4. HTML 템플릿 렌더링
  5. data/imports/naver-export-{base}.html 출력
  6. stdout 에 경로 + 카탈리스트 카운트 출력
```

### 5.1 함수 분리 (테스트 용이)

- `pickWindow(catalysts, base)` — 7일 고정
- `mdToHtml(text)` — 굵게·링크·불릿·NCT
- `renderCatalyst(catalyst, company)`
- `renderSummaryTable(catalysts)`
- `renderDocument(summary, sections)`

### 5.2 외부 의존성

추가 X. native fs/path/url + 기존 `gray-matter`/`yaml` 만. `data.generated.json` 파싱은 `JSON.parse`.

---

## 6. 스킬

`.claude/skills/export-naver/SKILL.md`

### 동작
1. `npm run build-data` 실행 — 최신 데이터 보장
2. `node scripts/build-naver-export.mjs` 실행
3. 출력 HTML 파일 경로를 사용자에게 보고
4. 한 줄 안내: "브라우저에서 열어 전체선택 → 복사 → 네이버 SmartEditor 에 paste"

### Frontmatter
```yaml
name: export-naver
description: 7일 내 임박 카탈리스트를 네이버 블로그용 HTML 로 export. ...
```

### 비-동작
- catalysts.md / companies 자동 수정 X
- 자동 commit X
- 브라우저 자동 열기 X (사용자가 직접)

---

## 7. 검증

신규 검증 룰 추가 X. `npm run check` 영향 없음.
출력 HTML 의 정합성은 사용자 paste 후 미리보기로 확인.

---

## 8. 완료 조건

- [ ] `scripts/build-naver-export.mjs` (§5)
- [ ] `.claude/skills/export-naver/SKILL.md` (§6)
- [ ] `.gitignore` 에 `data/imports/naver-export-*.html` 추가
- [ ] 현재 시점(2026-04-29) 기준 dry-run → AXSM (4/30 PDUFA) 1건 이상 포함된 HTML 생성
- [ ] 사용자가 브라우저에서 열어 시각 확인 OK
- [ ] CLAUDE.md 스킬 목록에 `export-naver` 추가

---

## 9. 위험 / 함정

- **SmartEditor paste 시 인라인 스타일 일부 손실** — 굵기·색은 유지, 표 테두리는 사라질 수 있음. v1 에서 확인 후 필요 시 보강.
- **빈 windows** — 7일 내 catalyst 0건이면 HTML은 "이 기간에 임박한 카탈리스트 없음" 1줄로. (오류 X)
- **윈도우 경계** — `daysUntil` 의 timezone 일관성. KST 기준이지만 catalysts.md 날짜가 PDUFA = ET 기준일 가능성. v1 은 단순 문자열 비교.
- **회사 md 누락** — catalysts.md 에 ticker 있는데 companies/ 에 없으면. verify-data 가 막지만 안전망으로 §3.5 fallback 처리.
- **이름 충돌**: spec 005 §3 의 `/import-naver` 와 다른 이름 (`/export-naver`) 사용으로 회피.

---

## 10. 작업 순서

1. 본 spec 사용자 승인
2. `scripts/build-naver-export.mjs` 구현 + 단위 함수 sanity check
3. 스킬 SKILL.md 작성
4. `.gitignore` 갱신
5. 현재 데이터로 dry-run → 사용자가 브라우저에서 열어 확인
6. 피드백 반영 후 CLAUDE.md 갱신
