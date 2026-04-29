---
spec: 007
title: Export to Telegram
status: Draft
author: dnjsxodn8
created: 2026-04-29
revised: 2026-04-29 — rev 2 (detail 메시지 추가, catalysts.md schema 4필드 확장)
related:
  - specs/001-data-layer.md
  - .claude/skills/update/SKILL.md
  - .claude/skills/add-catalyst/SKILL.md
---

# Spec 007: Export to Telegram

## 0. 배경

`/update`로 일요일에 카탈리스트를 갱신하고, `/export-naver`(미래 spec)로 네이버 블로그에 자세한 분석을 올린다. 그 직후 텔레그램 채널/그룹에 봇이 자동 발송한다.

Telegram은 두 층으로 보낸다:
- **Summary 1통** — 전체 카탈리스트 한 줄 리스트 + blog URL
- **Detail N통** — 이벤트당 1통, 4개 섹션(카탈리스트·기업·임상·약물)

데이터는 `catalysts.md` + `companies/*.md`에서 끌어온다. 코드는 깡통.

## 1. 목표

1. 직전 `/update` 변경분(`git diff HEAD -- data/catalysts.md`)에서 추가된 events를 추출.
2. Summary 1통(blog link 포함) + 이벤트당 detail 1통 = 총 N+1통 발송.
3. detail 메시지는 catalysts.md + companies md 데이터의 단순 조합 (export 시점 LLM 가공 X).
4. 사용자 1명·노트북. 자동 cron X. `/export-telegram <blog_url>` 명시적 호출.

## 2. 비-목표

- 자동 스케줄러
- 수정·삭제 이벤트 처리 (v2)
- export 시점 LLM 생성 (모든 prose는 catalysts.md/companies md에 사전 저장)
- 다중 채널 발송
- raw `/update` 결과 in-memory 사용 (재현가능성 위해 git working tree에서 읽음)

## 3. 호출 인터페이스

```
/export-telegram <blog_url>
/export-telegram <blog_url> --dry-run
/export-telegram <blog_url> --since=<git-ref>      # 기본: HEAD
/export-telegram <blog_url> --summary-only         # detail 메시지 생략
```

- `<blog_url>`: 사용자가 올린 네이버 블로그 글 URL. 필수.
- `--dry-run`: 모든 메시지를 stdout에 출력, Telegram 발송 X.
- `--since`: 비교 기준 commit. 기본 `HEAD`.
- `--summary-only`: detail 데이터가 미입력 상태일 때 일단 summary만 발송하고 싶을 때.

내부적으론 `node scripts/export-telegram.mjs <blog_url> [flags]`.

## 4. 입력 데이터

### 4.1 변경분 추출

`git diff HEAD -- data/catalysts.md`. diff에서 추가 라인(`+`) 파싱 → 새 events. v1: 추가만 처리.

### 4.2 이벤트별 필드 (`catalysts.md`)

**기존 필드** (spec 001):
| 필드 | 필수 |
|---|---|
| `date, ticker, event, type, drug, indication, phase` | Y |
| `sources[]` | Y (>=1) |

**신규 필드** (spec 007에서 도입, schema에 optional 추가):
| 필드 | 형식 | 용도 |
|---|---|---|
| `trialDesign` | multiline string | 임상 디자인 1-2문장 |
| `targetDisease` | multiline string | 타겟 질환 설명 1-2문장 |
| `priorTrialUrl` | URL string | 사전 공개 임상 (NCT URL 우선) |
| `moa` | multiline string | 작용 기전 1-2문장 |

→ `specs/001-data-layer.md` schema에 4필드 optional로 추가 (구현 단계에서 같이 반영).

### 4.3 회사 데이터 (`companies/{TICKER}.md`)

- frontmatter: `mcap`, `modality` 사용
- body: `## 회사 개요` 섹션의 **첫 단락**(첫 빈 줄까지)을 그대로 사용. LLM 가공 X.

## 5. 메시지 포맷

### 5.1 Summary 메시지

```
🧬 이번 주 Bio Catalyst (M/D - M/D)

• VRTX ($120B) — 8/15 PDUFA: vanzacaftor (낭포성섬유증)
• LLY ($720B) — 5/15 ASCO Ph2: retatrutide (비만)
• BIIB ($28B) — 6/30 Ph3 readout: BIIB080 (알츠하이머)

📝 자세한 분석 → {blog_url}
```

- 헤더 날짜 범위: events의 min/max date.
- 이벤트당 1줄, 5건 초과 시 6건씩 분할. blog link는 마지막 summary 통에만.
- mcap 포맷: ≥1000 → `$XXB`, <1000 → `$XXXM`.

### 5.2 Detail 메시지 (이벤트당 1통)

```
🧬 {TICKER} — {drug} {type_short} ({M/D})

📌 카탈리스트
{drug} / {phase} / {M/D} {type_short}
출처 → {primary_source_url}

🏢 기업 개요 (${mcap_formatted})
{회사_개요_첫_단락}

🧪 임상 정보
{trialDesign}
적응증: {targetDisease}
사전 공개: {priorTrialUrl}

💊 약물 정보
Modality: {modality}
MoA: {moa}
```

#### Section 1 (카탈리스트)
- 한 줄: `{drug} / {phase} / {date_short} {type_short}`
- `primary_source_url` = `sources[]`을 credibility로 ranking 후 1순위
- ranking heuristic (export 시점, hostname 기반):
  ```
  fda.gov, ema.europa.eu                 → 1 (규제기관)
  sec.gov                                → 2 (공시)
  investor.*, *.com/(news|press|ir)      → 3 (회사 IR)
  reuters, fiercebiotech, endpts,
  biopharmadive, statnews, nature.com    → 4 (Tier 1 매체/저널)
  나머지                                  → 5
  ```
- `sources` 비어있으면 detail 메시지 거부 (CLAUDE.md: source 없는 catalyst 자체가 룰 위반)

#### Section 2 (기업 개요)
- 헤더에 mcap 표기 (`$XXB` / `$XXXM`)
- `companies/{TICKER}.md`의 `## 회사 개요` 첫 단락 verbatim
- 첫 단락 = 섹션 헤더 다음부터 첫 빈 줄까지

#### Section 3 (임상 정보)
- `trialDesign` 그대로
- `적응증:` + `targetDisease`
- `사전 공개:` + `priorTrialUrl`
  - URL이 `clinicaltrials.gov/ct2/show/NCT*` 패턴이면 NCT id만 추출 표기, 아니면 URL 그대로

#### Section 4 (약물 정보)
- `Modality: {modality}` (companies frontmatter)
- `MoA: {moa}` (catalysts.md)

#### Fallback (필드 missing)

| 결손 | 동작 |
|---|---|
| `trialDesign` 없음 | 🧪 섹션 통째로 생략 + dry-run에서 stderr 경고 |
| `targetDisease` 없음 | 적응증 줄만 생략 |
| `priorTrialUrl` 없음 | 사전 공개 줄만 생략 |
| `moa` 없음 | MoA 줄만 생략 (Modality 줄만 표시) |
| `## 회사 개요` 섹션 없음/빈 | 🏢 섹션 생략 (mcap은 detail 헤더에 표시) |
| `sources` 없음 | detail 메시지 자체 거부 (summary는 발송) |

#### blog link
- summary 메시지에만 1번. detail에는 X.

### 5.3 발송 한도

- summary: 5건/통, 초과 시 분할
- detail: 이벤트당 1통
- 통 사이 200ms sleep (Telegram rate limit 안전 마진)

## 6. catalysts.md schema 확장

`specs/001-data-layer.md`의 events schema에 다음 4 필드를 optional로 추가 (구현 시 spec 001도 같이 갱신):

```yaml
events:
  - date: 2026-08-15
    ticker: VRTX
    event: vanzacaftor 3제 PDUFA
    type: PDUFA
    drug: vanzacaftor
    indication: 낭포성섬유증
    phase: NDA
    sources:
      - https://www.fda.gov/...

    # spec 007부터 추가 (모두 optional)
    trialDesign: |
      SKYLINE은 ETI 대조 randomized double-blind 52주 Ph3 (n=400).
    targetDisease: |
      CFTR 변이로 인한 점액 분비 이상으로 폐 감염 반복·호흡 부전을 일으키는 유전 질환.
    priorTrialUrl: https://clinicaltrials.gov/ct2/show/NCT05033080
    moa: |
      CFTR 단백질의 게이팅과 폴딩을 동시 보정. ETI 대비 단일분자로 두 corrector를 대체.
```

`scripts/verify-data.mjs` 영향: 4 필드 모두 optional → 검증 룰 추가 X (통과 여부에 영향 X). 단 export-telegram dry-run 단계에서 누락 시 경고.

## 7. Skill 변경사항

### 7.1 `.claude/skills/update/SKILL.md`

Step 2 agent 프롬프트에 추가:
- 신규 catalyst 후보 제안 시 다음 4 필드 채울 것: `trialDesign`, `targetDisease`, `priorTrialUrl`, `moa`
- 데이터 출처: clinicaltrials.gov(NCT 검색), FDA 라벨, 회사 IR, drug bank
- 채울 수 없으면 해당 필드 생략하고 후보는 그대로 제안 (drop X). 사용자가 승인 단계에서 보충/생략 결정.

### 7.2 `.claude/skills/add-catalyst/SKILL.md`

사용자가 직접 추가 시 4 필드 입력 받음. 비워두는 것도 허용.

## 8. Bot API 호출

### 8.1 환경변수 (`.env.local`)

```
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

`.env.example` 템플릿 추가. `.env.local`은 이미 `.gitignore`됨.

### 8.2 호출

```
POST https://api.telegram.org/bot<TOKEN>/sendMessage
{
  "chat_id": "<CHAT_ID>",
  "text": "<message>",
  "parse_mode": "HTML",
  "disable_web_page_preview": true
}
```

- `parse_mode: HTML` — 미래 강조·링크 확장 대비. v1 메시지엔 사실 plain text.
- `disable_web_page_preview: true` — preview 카드 노출 없음 (메시지 깔끔).

### 8.3 에러 처리

- HTTP non-2xx → stderr에 응답 body, exit 1
- 환경변수 누락 → 시작 시점에 즉시 exit 1
- 부분 발송 실패 시 (예: 5번째 detail에서 실패) → 어디까지 발송됐는지 stdout에 명시

## 9. 파일 구조

```
specs/007-export-telegram.md            ← 본 문서
specs/001-data-layer.md                  ← schema 확장 (4필드 추가)
scripts/export-telegram.mjs              ← 메인 스크립트
.claude/skills/export-telegram/SKILL.md
.claude/skills/update/SKILL.md           ← 4필드 채우기 추가
.claude/skills/add-catalyst/SKILL.md     ← 4필드 입력
.env.example                             ← 템플릿
package.json                             ← npm script 추가
```

`package.json`:
```json
"scripts": {
  "export-telegram": "node scripts/export-telegram.mjs"
}
```

## 10. 검증 / 테스트

### 10.1 단위
- `mcap` 포맷 변환 (33000 → $33B, 850 → $850M)
- `date_short`, `type_short` 매핑
- credibility ranking heuristic (FDA > SEC > IR > Tier1 > 나머지)
- NCT id 추출 (`https://clinicaltrials.gov/ct2/show/NCT05033080` → `NCT05033080`)
- companies md `## 회사 개요` 첫 단락 추출
- 각 결손 필드 fallback

### 10.2 통합 (수동, 첫 발송 전)
1. fake event 1건을 catalysts.md에 임시 추가 (4 신규 필드 포함)
2. `npm run export-telegram -- "https://test.example.com" --dry-run`
3. summary + detail 메시지 stdout 출력 확인
4. 임시 event 제거
5. 실제 작은 메시지로 dry-run 빼고 발송 → telegram 수신 확인

### 10.3 정기
- 일요일 `/update` → `/export-naver` → `/export-telegram <blog_url>` 흐름에서 매주 검증

## 11. 보안

- bot token은 `.env.local`에만, gitignore 보호
- `.env.example`엔 placeholder만
- 메시지 본문은 catalysts.md 공개 데이터 → 추가 sanitize 불필요

## 12. 후속 (out of scope)

- **spec 007**: `/export-naver` — 본 spec의 4 신규 필드를 그대로 재사용해 긴 분석 + sources 표기
- v2: 수정·연기·취소 이벤트 처리
- v2: events 0건 처리 ("이번 주 신규 카탈리스트 없음" 발송 vs. 침묵)
- v2: 신규 필드 missing 시 export-telegram이 자동 채우기 (LLM agent 호출)
