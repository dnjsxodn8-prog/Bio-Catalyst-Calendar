---
name: add-catalyst
description: Append a new catalyst event to data/catalysts.md. Use when the user wants to register a new PDUFA, conference presentation, clinical readout, or regulatory milestone (e.g. "VRTX 2026-08-15 PDUFA 추가", "ASCO LLY 발표 추가", "BIIB Phase 3 readout 일정 등록").
---

# add-catalyst

`data/catalysts.md`의 yaml `events:` 리스트에 새 카탈리스트 1건을 추가한다.

## 입력 (필수/선택)

| 필드 | 필수 | 설명 |
|---|---|---|
| `date` | ✓ | YYYY-MM-DD |
| `ticker` | ✓ | 대문자. **`data/companies/{TICKER}.md` 존재 필수** |
| `event` | ✓ | 80자 이내. 학회 발표라면 학회 약어(ASCO/AAN 등) 포함 권장 |
| `type` | ✓ | `PDUFA` \| `Conference` \| `Clinical Readout` \| `Regulatory` \| `Earnings` |
| `company` | ✓ | 정식 회사명 (companies md의 frontmatter `company`와 동일하게) |
| `drug` | ✓ | 약물명. 다수면 `Multiple` 또는 대표 약물 |
| `indication` | ✓ | 적응증. 학회 종합 발표면 `Various` 가능 |
| `phase` | ✓ | `Phase 1` \| `Phase 2` \| `Phase 3` \| `NDA` \| `BLA` \| `sNDA` \| `sBLA` \| `Various` \| `Corporate` |
| `conferenceId` | 선택 | `data/conferences.md`의 `id` (예: `asco`, `aacr`). 학회 발표/연관 카탈리스트만 |
| `sources` | 권장 | URL 배열. **1개 이상 강력 권장** |
| `trialDesign` | 선택 | 1-2 문장 임상 디자인 (export-telegram·export-naver용, spec 007) |
| `targetDisease` | 선택 | 1-2 문장 타겟 질환 |
| `priorTrialUrl` | 선택 | 사전 공개 임상 NCT URL 또는 publication |
| `moa` | 선택 | **1문장 ≤120자.** Telegram 알림용. 풀 버전은 companies/{TICKER}.md `## MOA` 섹션에서 따로 관리 |

## 절차

### 1. ticker 존재 확인

`data/companies/{TICKER}.md` 없으면 즉시 종료:
> "이 종목은 아직 추적 대상이 아닙니다. `research-company {TICKER}` 먼저 실행하세요."

### 2. 누락 필드 확인 + 한 번에 질문

위 표의 필수 필드 중 빠진 것 있으면 사용자에게 한 번에 모두 질문. 1-2턴 안에 마무리. 출처(`sources`)도 함께 요청.

### 3. conferenceId 검증 (있는 경우)

`data/conferences.md` 의 yaml에서 해당 id 존재 확인. 없으면 경고하고 진행 여부 확인.

### 4. 중복 체크

`data/catalysts.md` 안에 같은 (date, ticker, event) 조합이 이미 있으면 경고. 사용자 결정 받기.

### 5. catalysts.md에 삽입

yaml 블록 안 `events:` 리스트의 **시간순(date 오름차순) 위치**에 삽입.
- 같은 날짜 안에서는 ticker 알파벳순으로 정렬 권장
- 들여쓰기는 기존 항목과 동일: `  - date:` (2 space), 하위 필드는 `    field:` (4 space), `sources:` 하위 URL은 `      - url` (6 space)
- 끝에 append만 해도 빌드는 통과 (앱이 정렬), 하지만 사람이 읽기 좋게 시간순 권장

### 6. 빌드 검증

```bash
npm run build-data
```

성공 시 generated JSON에 entry 포함 확인. 실패 시 원인 보고 후 사용자 결정.

### 7. 요약 보고

한 줄로 추가 내용 + D-day 보고. 자동 git commit/push 금지.

> 예: "✅ VRTX · 2026-08-15 (D-110) · ENVISION Phase 3 readout 추가됨"

## YAML 항목 형식

```yaml
  - date: 2026-08-15
    ticker: VRTX
    event: <80자 이내, 학회 발표면 학회 약어 포함>
    type: <enum>
    company: <정식 회사명>
    drug: <약물명>
    indication: <적응증>
    phase: <phase>
    conferenceId: <conf-id>   # 학회 연관일 때만, 그 외는 줄 자체 생략
    sources:
      - <URL>
    # spec 007부터 — 채울 수 있으면 함께 (export-telegram·export-naver에서 사용)
    trialDesign: |
      <1-2 문장>
    targetDisease: |
      <1-2 문장>
    priorTrialUrl: <NCT URL 또는 publication>
    moa: |
      <1-2 문장>
```

## 주의

- **fabrication 금지.** 사용자가 출처 없이 부정확한 정보를 주면 sources 비워두지 말고 출처 요청. CLAUDE.md "출처 없는 데이터 추가 X" 원칙.
- 학회 발표인데 `conferenceId` 누락하면 학회 페이지에서 발표 매칭이 event 텍스트 약어 fallback에만 의존함 — 명시 권장.
- 한 번에 여러 catalyst 추가 요청이면 순차로 처리. 5건 넘게 한 번에 들어오면 사용자에게 "별도 batch로 진행할지" 한 번 확인.

## 예시

**예시 1 — PDUFA 추가**
> User: "VRTX 2026-08-15 inaxaplin APOL1 신증 PDUFA. sources: https://news.vrtx.com/..."

```yaml
  - date: 2026-08-15
    ticker: VRTX
    event: Inaxaplin APOL1-mediated FSGS PDUFA
    type: PDUFA
    company: Vertex Pharmaceuticals
    drug: Inaxaplin
    indication: APOL1-mediated FSGS
    phase: NDA
    sources:
      - https://news.vrtx.com/...
```

**예시 2 — 학회 발표 추가**
> User: "RVMD ASCO 2026 daraxonrasib 췌장암 oral 발표 추가. 6/1, sources: https://ir.revmed.com/..."

```yaml
  - date: 2026-06-01
    ticker: RVMD
    event: ASCO 2026 daraxonrasib Phase 1/2 1L pancreatic oral
    type: Conference
    company: Revolution Medicines
    drug: Daraxonrasib (RMC-6236)
    indication: 1L metastatic pancreatic adenocarcinoma
    phase: Phase 1/2
    conferenceId: asco
    sources:
      - https://ir.revmed.com/...
```

**예시 3 — 누락 필드 한 번에 질문**
> User: "BIIB 6월에 readout 추가해줘"

→ Claude:
> 다음 정보가 더 필요합니다 (한 번에 답변):
> 1. 정확한 날짜? (YYYY-MM-DD)
> 2. 약물? (예: Tofersen, Leqembi)
> 3. 적응증? (예: ALS, AD)
> 4. Phase? (Phase 2/3 등)
> 5. 출처 URL? (1개 이상 권장)
