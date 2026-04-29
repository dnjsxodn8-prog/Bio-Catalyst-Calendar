---
name: update
description: Autonomous weekly biotech sweep. Use when user says "/update", "주간 업데이트", "이번주 업데이트해줘", "카탈리스트 업데이트해줘". Researches recent biotech news/catalyst changes, proposes updates, applies after user approval. Calls update-company and add-catalyst as sub-skills.
---

# update — 주간 자동 스윕

`/update` 한 마디로 발동하는 상위 스킬. 사용자가 사건 리스트를 던지지 않아도 Claude가 자동으로 리서치 → 후보 제안 → 승인 후 적용.

## 절대 원칙 (어기지 말 것)

1. **Source URL 없는 후보 제안 금지.** 출처 ≥1개 없는 항목은 후보 리스트에서 제외.
2. **사용자 승인 없이 데이터 변경 금지.** 후보 리스트 보여주고 명시적 승인(`다 적용` / `1,3,5` / `취소`) 후에만 적용.
3. **자동 git commit/push 금지.**
4. **한 번에 최대 15개 후보.** 컨텍스트·검토 부담 관리.

## 절차

### Step 1 — 스코프 결정 (자동)

오늘 날짜 기준으로 4개 Tier 동시 리서치:

| Tier | 무엇을 찾나 | 데이터 소스 |
|---|---|---|
| **A: 카탈리스트 후속** | `data/catalysts.md`에서 date가 [오늘-30, 오늘+0] 범위인 항목들 — FDA 결정·readout 결과·연기 여부 확인 | 회사 IR, FDA.gov |
| **B: 추적 종목 뉴스** | mcap ≥ $1B 이고 recommendation이 `Core Holding` 또는 `Worth Monitoring`인 종목 (보통 30-50개)의 지난 7일 뉴스 | Web search 회사명 + ticker |
| **C: 신규 PDUFA/임상 이벤트** | 향후 90일 안에 발생할 PDUFA·BLA·NDA·Phase 3 readout 중 우리 catalysts.md에 없는 것 | FDA AdComm calendar, BioPharma Catalyst, 회사 IR |
| **D: 학회 발표 신규** | 종료/시작이 [오늘-7, 오늘+30]인 학회의 발표 abstract 중 우리 catalysts.md에 없는 것 | 학회 공식 program, 회사 IR |

### Step 2 — 병렬 리서치

위 4개 Tier를 **병렬 agent**로 동시 진행 (각 Tier당 1개 agent). 각 agent는 출력으로 후보 항목들을 YAML로 회신:

```yaml
- tier: A | B | C | D
  action: add-catalyst | update-company
  ticker: XXX
  summary: <한 줄 요약>
  fields:        # update-company면 어느 섹션 무엇으로
    section: <e.g. "## 카탈리스트">
    content: <new content>
    mode: replace | append
  catalyst:      # add-catalyst면 entry 전체
    date: 2026-MM-DD
    event: ...
    type: ...
    drug: ...
    indication: ...
    phase: ...
    conferenceId: <id or null>
    # spec 007부터: 가능하면 채울 것 (export-telegram·export-naver에서 사용)
    trialDesign: |
      <1-2 문장 임상 디자인. 예: "SKYLINE은 ETI 대조 randomized double-blind 52주 Ph3 (n=400)">
    targetDisease: |
      <1-2 문장 타겟 질환. 예: "CFTR 변이로 인한 점액 분비 이상으로 폐 감염 반복·호흡 부전을 일으키는 유전 질환">
    priorTrialUrl: <NCT URL 또는 publication 링크>
    moa: |
      <1-2 문장 작용 기전. 예: "CFTR 게이팅과 폴딩을 동시 보정. 단일분자로 두 corrector를 대체">
  sources:
    - <URL>     # 1개 이상 필수
```

**Source 없는 후보는 agent가 제외해야 함.** 이건 agent 프롬프트에 강하게 지시.

**spec 007 신규 4 필드** (`trialDesign`, `targetDisease`, `priorTrialUrl`, `moa`)는 optional이지만 가능하면 채울 것. 채울 수 없는 필드는 비우고 후보는 그대로 제안 (drop X) — 사용자가 승인 단계에서 보충할 수 있음.

### Step 3 — 후보 리스트 통합 출력

4개 Tier 결과를 한 화면에 정리:

```
이번주 업데이트 후보 (총 N건, 최대 15건)

📌 신규 카탈리스트 (N건)
1. [Tier C] VRTX 2026-08-15 inaxaplin APOL1 FSGS PDUFA — 출처: news.vrtx.com
2. [Tier D] RVMD ASCO 2026 daraxonrasib oral 6/1 — 출처: ir.revmed.com
...

🔄 카탈리스트 상태 변경 (N건)
3. [Tier A] LLY 2026-04-10 Orforglipron T2D — 결과: 승인됨 — 출처: fda.gov/...
...

✏️ 종목 프로필 업데이트 (N건)
4. [Tier B] LLY 매출 섹션 → "Q1 2026 $14.5B" — 출처: investor.lilly.com/q1-2026
...

승인 옵션:
- "다 적용" — 전부 적용
- "1,3,4만 적용" — 번호 선택
- "취소" — 취소

(결정 후 진행)
```

### Step 4 — 승인 대기

사용자 응답을 받기 전까지 **어떤 파일도 수정하지 X**.

응답이 모호하거나 일부만 명시되면 한 번 더 확인.

### Step 5 — 승인된 항목 적용

승인된 후보 각각을:
- `add-catalyst` 항목이면 → `add-catalyst` 스킬 절차대로 (catalysts.md에 시간순 삽입)
- `update-company` 항목이면 → `update-company` 스킬 절차대로 (해당 md body 수정 + verified 갱신 + sources 추가)

**중요: 한 번의 build-data 실행으로 마무리.** 항목당 build 호출 X (느림).

### Step 6 — 빌드 검증

```bash
npm run build-data
```

성공 시 적용된 항목 수 + 새 JSON 통계 보고.
실패 시 원인 보고 + 사용자 결정 받기.

### Step 7 — 요약 보고

```
✅ 주간 업데이트 완료 (2026-W18)
- 신규 카탈리스트: N건 추가
- 상태 변경: N건 갱신
- 종목 프로필: N건 업데이트
- 빌드: ✅
- 다음: git diff로 확인 후 push (수동)
```

자동 git commit/push 금지. 사용자가 별도로 `git push`해야 사이트 반영.

## 리서치 agent 프롬프트 핵심 지시

각 Tier별 agent에게 반드시 포함할 지시:

```
**Source URL이 없는 후보는 절대 제안하지 마.** 
verifiable한 회사 IR 페이지, FDA.gov, 학회 공식 프로그램, 또는 신뢰 미디어(BioPharma Dive, Fierce Biotech, Endpoints News, biospace.com) 중 하나의 URL이 있어야만 후보로 올린다. URL이 모호하거나 일반 홈페이지면 후보에서 빼.

신규 카탈리스트 (Tier C·D·일부 A) 제안 시 다음 4 필드를 가능하면 함께 채워라 (export-telegram·export-naver에서 재사용):
- `trialDesign`: 1-2 문장 임상 디자인 (clinicaltrials.gov 또는 회사 IR에서)
- `targetDisease`: 1-2 문장 적응증/질환 설명
- `priorTrialUrl`: 사전 공개된 임상 NCT URL 또는 publication 링크
- `moa`: 1-2 문장 작용 기전 (FDA 라벨, drugbank, 회사 자료)

채우기 어려운 필드는 비워둬. 후보 자체를 drop하지는 마. 사용자가 승인 단계에서 보충하거나 그대로 둘지 결정.

후보 수는 quality > quantity. 강력한 근거 5건이 약한 근거 12건보다 낫다.

오늘 날짜는 {TODAY}. 우리 ticker pool과 추적 카탈리스트 목록은 아래 첨부.
```

ticker pool과 catalysts.md 내용은 호출 시점에 동적으로 첨부.

## 호출 패턴

| 사용자 발화 | 동작 |
|---|---|
| `/update` | 전체 4개 Tier 진행 |
| `/update tier:A,C` | A·C만 |
| `주간 업데이트해줘` | 전체 4개 Tier (description 매칭) |
| `이번주 카탈리스트만 업데이트` | Tier C+D만 (자동 추론) |
| `LLY 업데이트 확인해줘` | Tier B 1종목 한정 |

## 첫 실행 시 주의

- 첫 실행은 후보가 많이 나올 수 있음 (그동안 누락된 정보 일괄 캐치업). 15건 cap으로 제한되지만 그래도 검토 부담. 검토 천천히.
- 사용자가 "패턴 익숙해질 때까지는 매번 후보 다 보여줘" 하면 그게 디폴트. autonomous mode (승인 자동화)는 만들지 X — 위험.

## 만들면 안 되는 것

- ❌ 자동 git commit (수동 push 정책)
- ❌ source 없이 추정 데이터 추가 (CLAUDE.md 절대 원칙)
- ❌ 한 번에 16개 이상 후보 (검토 부담 폭증)
- ❌ 추적 안 하는 종목 임의 추가 (companies/에 없으면 add-catalyst가 거부)
