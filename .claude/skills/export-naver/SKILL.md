---
name: export-naver
description: 오늘부터 +7일 이내 임박한 카탈리스트를 네이버 블로그용 HTML로 export. 상단 요약 표 + 카탈리스트별 기업 프로필·임상 정보·약물 정보 상세를 포함한 단일 HTML을 생성한다. 사용자가 브라우저에서 열어 전체선택→복사→네이버 SmartEditor에 paste하는 워크플로 전용. 인자 없음. 트리거 예: "/export-naver", "네이버 블로그용으로 export", "이번주 카탈리스트 블로그 글 만들어줘".
---

# export-naver

7일 임박 카탈리스트(today ~ today+7) + 각 카탈리스트의 기업·임상·약물 상세를 하나의 HTML 파일로 묶어 출력한다. 사용자가 그 HTML을 브라우저에서 열어 전체 복사 후 네이버 SmartEditor에 paste하면 굵기·헤딩·색·표가 보존된다.

## 인자

없음. 기준일 = today (KST), 윈도우 = +7일 고정.

## 절차

### 1. 데이터 빌드

```bash
npm run build-data
```

`src/data.generated.json` 갱신 보장. 실패하면 즉시 종료하고 원인 보고.

### 2. export 스크립트 실행

```bash
node scripts/build-naver-export.mjs
```

스크립트 동작 (자세한 사양은 `specs/006-naver-export.md`):
- catalyst 중 date in [today, today+7] 추출, (date asc, ticker asc) 정렬
- 각 ticker → companies/{TICKER}.md 매칭
- HTML 단일 파일 렌더링 (요약 표 + 카탈리스트별 상세)
- `data/imports/naver-export-{YYYY-MM-DD}.html` 출력

### 3. 결과 보고

스크립트 stdout 을 그대로 사용자에게 보여줄 것. **반드시 다음 두 가지 주소가 출력에 포함되어 있어야 함** (스크립트가 자동 출력):
- `경로 (탐색기·cmd):` Windows 백슬래시 절대 경로 — 탐색기 주소창 paste 또는 cmd 사용
- `브라우저 URL:` `file:///...` 인코딩된 URL — 브라우저 주소창 paste

마지막에 한 줄 안내 추가:

```
브라우저에서 열어 전체선택 → 복사 → 네이버 SmartEditor에 paste 하세요.
```

윈도우 내 카탈리스트가 0건이면 "이 기간에 임박한 카탈리스트가 없습니다" HTML을 그대로 출력하고 사용자에게 알림.

> 주소 두 종류를 항상 함께 보내는 이유: `start` 명령이 한글 경로 + 이미 열린 탭과 충돌해 사용자에게 안 보이는 경우가 있어 사용자가 직접 paste 해서 열 수 있는 옵션을 항상 제공.

## 비-동작

- catalysts.md / companies/*.md 자동 수정 X
- git commit / push X
- 브라우저 자동 열기 X
- 외부 API 호출 X

## 함정

- `npm run build-data` 가 verify-data 실패로 막히는 경우 — 본 스킬은 build-data만 호출하고 verify는 호출 안 함. 그래도 실패 시 사용자에게 원인 보고.
- catalysts.md 의 ticker가 companies/ 에 없는 경우 — 스크립트가 fallback("기업 정보 미등록")으로 처리.
- 네이버 SmartEditor paste 시 표 테두리·일부 inline 스타일 손실 가능. 첫 사용 시 사용자가 미리보기로 확인.

## 출력 예

```
✅ catalysts in window: 2
→ data/imports/naver-export-2026-04-29.html

   2026-04-30 (목) · AXSM · AXS-05 알츠하이머 초조 PDUFA
   2026-05-02 (토) · ...

브라우저에서 열어 전체선택 → 복사 → 네이버 SmartEditor에 paste 하세요.
```
