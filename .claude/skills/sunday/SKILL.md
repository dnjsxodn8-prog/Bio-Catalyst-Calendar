---
name: sunday
description: 매주 일요일 루틴 오케스트레이터. /update-prices → /update → bionews 텔레그램 카탈리스트·뉴스 최신화 → /deploy → /export-naver → /export-telegram을 한 번의 호출로 순서대로 진행한다. 자동화 가능한 단계(주가 갱신·빌드·배포·날짜계산·dry-run·텔레그램 증분수집·추출)는 알아서 처리하고, 사람 결정이 필요한 4곳(업데이트 승인·bionews 카탈리스트 적용 승인·네이버 발행 후 블로그 URL·텔레그램 발송 승인)에서만 멈춘다. 트리거 "/sunday", "일요일 루틴", "주간 루틴 돌려줘", "이번주 루틴 진행", "주간 업데이트부터 export까지", "bionews 텔레그램 최신화".
---

# /sunday — 주간 일요일 루틴 오케스트레이터

매주 일요일 반복하는 6단계(`/update-prices` → `/update` → bionews 텔레그램 최신화 → `/deploy` → `/export-naver` → `/export-telegram`)를 **한 번의 호출**로 순서대로 진행한다. 목표는 사용자의 손을 **딱 4번의 짧은 응답**으로 줄이는 것.

## 설계 원칙

이 루틴은 본질적으로 **사람 결정 4곳이 끼는 파이프라인**이라 완전 무인 실행은 불가능하고, 일부는 의도적으로 금지돼 있다. `/sunday`는 그 4곳에서만 멈추고 나머지는 전부 자동 처리한다.

| 단계 | 사람 결정 필요? | 이유 |
|---|---|---|
| 1. update-prices | ❌ 자동 | 주가 fetch + build는 결정 불필요 |
| 2. update | ✅ **GATE 1** | `update` 스킬 절대 원칙 — 승인 자동화 금지(위험). 후보 리스트 보여주고 멈춤 |
| 2B. bionews 텔레그램 | ✅ **GATE 1.5** | 증분수집·추출은 자동, 그러나 catalysts.md/프로필 적용은 승인 필수(add-catalyst 규칙). 후보 보여주고 멈춤 |
| 3. deploy | ❌ 자동 | `/deploy` 호출 자체가 push 동의 (worktree→main 자동 머지) |
| 4. export-naver | ✅ **GATE 2** | HTML 생성은 자동, 그러나 브라우저 복사→SmartEditor 붙여넣기→발행은 사람만. 발행 URL이 5단계 입력 |
| 5. export-telegram | ✅ **GATE 3** | 발송 전 dry-run + 사용자 "발송" 승인이 절대 원칙 |

**자동 처리(사용자가 신경 안 써도 되는 것):** 주가 인자(`--stale-days 1`) 결정, `build-data`, 후보 리서치 fan-out, bionews 텔레그램 증분수집(`--update`)·메시지 추출·출처 liveness·dedup, 텔레그램 날짜 범위 계산(naver와 동일하게 today~today+7), dry-run, deploy 머지·push·검증.

## 절대 원칙 (어기지 말 것)

1. **GATE 4곳에서 반드시 멈춘다.** 승인 없이 다음 단계로 넘어가지 않는다. 특히 update 적용·bionews 카탈리스트 적용·telegram 발송은 명시적 승인 필수.
2. **각 단계는 해당 서브스킬의 절차·절대원칙을 그대로 따른다.** `/sunday`는 순서 오케스트레이션만 담당하고, 단계별 규칙(source 없는 후보 금지, .env 제외, --no-verify 금지 등)을 우회하지 않는다.
3. **한 단계 실패 시 멈추고 보고.** 다음 단계로 자동 진행 금지. 사용자가 고치거나 "건너뛰어"라고 할 때까지 대기.
4. **사용자가 중간에 빠지고 싶어하면 존중.** "오늘 텔레그램은 생략", "deploy는 나중에" 등 부분 실행 허용.

## 절차

### Step 0 — 오늘 날짜 + 윈도우 확인

`/currentDate`(오늘, KST) 기준으로 export 윈도우 = **today ~ today+7** 고정. 이 날짜 범위를 4·5단계에서 재사용한다 (사용자가 날짜를 따로 입력할 필요 없음). 시작 시 한 줄로 안내:

> 🗓️ 일요일 루틴 시작 (오늘 {today}, export 윈도우 {today}~{today+7})

### Step 1 — 주가 갱신 (자동, GATE 없음)

`update-prices` 스킬 절차를 기본 인자로 실행:

```bash
node scripts/fetch-prices.mjs --stale-days 1
npm run build-data
```

요약(✅ N종목, skip/fail)만 한 줄 보고하고 **멈추지 않고** 2단계로 진행. skip/fail이 많으면(예: 10건 이상) 한 번 짚어주되 루틴은 계속.

### Step 2 — 주간 스윕 (GATE 1: 승인)

`update` 스킬 전체 절차(4개 Tier 병렬 리서치)를 실행한다. **Step 3(후보 리스트)까지 가서 멈춘다.**

- 후보 리스트를 그대로 보여주고 `update` 스킬의 승인 옵션(`다 적용` / `1,3,5만` / `취소`)을 제시.
- 사용자 승인 전까지 **어떤 파일도 수정 금지.**
- 승인되면 `update` 스킬 Step 5~6(적용 + 단일 build-data)까지 수행.
- 후보 0건이면 "이번주 신규/변경 후보 없음" 보고 후 3단계로.

> GATE 1 통과 = 사용자가 승인 응답을 줬을 때만.

### Step 2B — bionews 텔레그램 카탈리스트·뉴스 최신화 (GATE 1.5: 적용 승인)

BioSpectator + BBA Insights 텔레그램(`group: bionews`)의 **새 메시지**에서 다가오는 카탈리스트·결과·종목 뉴스를 뽑아 캘린더에 반영한다. `/update`(Tier 리서치)와 **상호보완** — 같은 catalysts.md를 채우는 별개 소스이므로 dedup이 핵심. 수집·추출은 자동, **catalysts.md/프로필 적용만 승인 게이트**.

> 위치 근거: `/update` 다음, deploy 직전. 두 소스(/update·bionews)의 카탈리스트 변경을 모두 모은 뒤 Step 3에서 한 번에 배포.

**경로 상수** (telegram-analyzer는 별도 폴더·venv):
- 수집기 루트: `C:/Users/dnjsx/Desktop/Biotech 기업 분석/텔레그램 채널 분석/telegram-analyzer`
- venv python: `…/telegram-analyzer/.venv/Scripts/python.exe`
- 국내주 트래커: `…/텔레그램 채널 분석/bionews/kr_catalysts_{YYYY-Www}.md`
- import 기록: `data/imports/telegram-{YYYY-WW}.md` (캘린더 repo 내)

#### 1. 증분 수집 (자동)

```powershell
$env:PYTHONIOENCODING="utf-8"; chcp 65001 | Out-Null
cd "C:/Users/dnjsx/Desktop/Biotech 기업 분석/텔레그램 채널 분석/telegram-analyzer"
.\.venv\Scripts\python.exe collectors\telethon_collector.py biospectator --update
.\.venv\Scripts\python.exe collectors\telethon_collector.py bbainsights --update
```

- `.session` 이 있으면 **비대화형 자동 수집**. 신규 N건만 보고.
- **인증 만료/실패 시**(전화코드 요구 등): 자동 진행 불가 → 사용자에게 "터미널에서 직접 `--update` 1회 실행 후 알려달라"고 안내하고 이 단계 **보류**(나머지 루틴은 사용자 선택으로 계속 가능). 위조·추측 금지.
- 신규 0건이면 "이번주 bionews 신규 없음" 보고 후 Step 3으로.

#### 2. 신규 메시지 추출 (자동)

지난 수집 이후 새로 들어온 bionews 메시지(대략 최근 8일치)만 대상으로:
- **forward 카탈리스트**: US 유니버스(`data/companies/*.md`) 매핑 + 기존 `catalysts.md` dedup + 출처 URL. 퍼지 윈도우는 **분기/반기말 placeholder**(Q3→09-30, 하반기·4Q·연내→12-31), 원문 윈도우는 event 텍스트에 보존.
- **outcome 갱신**: 기존 catalysts.md 중 과거 날짜·`outcome` 없는 entry가 이번 메시지로 해소됐으면 outcome 블록(enum `met|approved|failed|mixed|delayed`).
- **국내주(KOSPI/KOSDAQ)**: US 캘린더 스코프 외 → 별도 분리.

메시지가 많으면(>200) 청크 병렬 서브에이전트로, 적으면 직접 정독. (상세 절차는 telegram-analyzer SKILL + 과거 패턴 참조.)

#### 3. 후보 제시 (GATE 1.5)

추출 결과를 3묶음으로 보여주고 승인 옵션 제시:
- **A. catalysts.md forward 추가** N건 (티커·이벤트·날짜·출처)
- **B. outcome 갱신** M건 (티커·결과·출처)
- **C. 프로필 보강** K건 (`## 카탈리스트`+`verified`+출처)

> "A N건 / B M건 / C K건 반영할까요? (`다 적용` / `A만` / `1,3번만` / `취소`)"

승인 전까지 **어떤 파일도 수정 금지.** 후보 0건이면 "이번주 bionews 신규 카탈리스트 없음" 보고.

#### 4. 승인분 적용 (자동)

승인된 것만:
- A: `add-catalyst` 규칙 그대로 — **출처 liveness 검증**(`node scripts/check-source-list.mjs <urls>`)·필수필드(date·ticker·event·type·company·drug·indication·phase)·dedup·시간순 삽입.
- B: 해당 entry에 `outcome`/`outcome_date`/`result`/`outcome_sources` 추가.
- C: 해당 `data/companies/{TICKER}.md` `## 카탈리스트` 갱신 + `verified: {today}` + 출처 append.
- 끝나면 `npm run build-data` + (선택) `npm run check`로 검증. ERROR 나면 멈추고 보고.
- import 기록을 `data/imports/telegram-{YYYY-WW}.md`에 남기고, **국내주 forward는** `…/bionews/kr_catalysts_{YYYY-Www}.md`에 추가(사이트 외 로컬).

> GATE 1.5 통과 = 사용자가 적용 승인을 줬을 때만. 적용 결과(추가 N·갱신 M·프로필 K)는 Step 3 deploy에 함께 실린다.

### Step 3 — 배포 (자동, GATE 없음)

2단계에서 데이터가 변경됐으면(또는 1단계 주가만 변경됐어도) `deploy` 스킬 전체 절차를 실행한다. `/deploy` 호출 자체가 push 동의 — 별도 질문 없이 worktree→main 자동 머지 → push → Vercel ETag 검증까지.

- 변경사항이 전혀 없으면(working tree clean + ahead 0) deploy 스킬이 "변경 없음" 출력 → 그대로 4단계로.
- `npm run check` 실패·push reject 등 deploy 거부 조건 발생 시 멈추고 보고 (4·5단계로 자동 진행 금지).

> 순서 근거: 데이터가 사이트에 반영된 뒤 블로그·텔레그램으로 공유. 단, 네이버/텔레그램은 vercel 사이트가 아니라 별도 채널이므로 deploy 실패가 치명적이지 않다 — 사용자가 "deploy는 건너뛰고 export만"이라고 하면 4단계로 진행 가능.

### Step 4 — 네이버 export (GATE 2: 발행 후 URL)

`export-naver` 스킬 절차 실행:

```bash
npm run build-data            # (3단계 직후면 이미 최신이나 멱등)
node scripts/build-naver-export.mjs
```

스크립트 stdout(경로 2종 + 카탈리스트 목록)을 그대로 보여주고, 안내:

> 브라우저에서 열어 전체선택 → 복사 → 네이버 SmartEditor에 paste → **발행한 뒤, 발행된 블로그 글 URL을 답장으로 주세요.**

그리고 **사용자의 블로그 URL 응답을 기다린다.** 이 URL이 5단계 입력이다.

- 윈도우 내 카탈리스트 0건이면 "이번주 임박 카탈리스트 없음" 보고 → 5단계는 발송할 게 없으므로 루틴 종료.
- 사용자가 "네이버는 생략"이라고 하면 5단계 텔레그램도 블로그 URL이 없어 불가 → 둘 다 생략하고 종료(또는 사용자가 기존 URL을 직접 주면 5단계 진행).

> GATE 2 통과 = 사용자가 블로그 URL을 줬을 때.

### Step 5 — 텔레그램 발송 (GATE 3: 발송 승인)

`export-telegram` 스킬 절차 실행. 날짜 범위는 **Step 0에서 계산한 today~today+7**을 자동 사용(사용자가 날짜를 따로 줄 필요 없음), 블로그 URL은 4단계에서 받은 것.

```bash
# worktree면 .env.local 없을 수 있음 — export-telegram 스킬 절차대로 메인에서 복사
node scripts/export-telegram.mjs "<blog_url>" --dry-run --from=<today> --to=<today+7>
```

dry-run 결과 요약(발송 통수, 누락 필드, 이벤트 한 줄 리스트)을 보여주고:

> "위 N+M+1통 발송할까요? (`발송` / `취소` / `필드 보충 후 재시도`)"

승인받으면 `--dry-run` 빼고 실제 발송 → `✓ [n/N]` 결과 보고.

> GATE 3 통과 = 사용자가 "발송" 명시했을 때만.

### Step 6 — 루틴 완료 보고

```
✅ 일요일 루틴 완료 ({YYYY-W##})
- 주가: N종목 갱신
- 주간 업데이트: 신규 X · 변경 Y · 프로필 Z (또는 "후보 없음")
- bionews: 수집 N건 → 카탈리스트 추가 A · outcome B · 프로필 C · 국내주 D (또는 "신규 없음"/"수집 보류")
- 배포: ✅ {commit hash} (또는 "변경 없음")
- 네이버: HTML 생성 → 발행 완료 ({blog_url})
- 텔레그램: N통 발송 완료
```

사용자가 일부 단계를 생략했으면 해당 줄에 "생략"으로 표시.

## 호출 패턴

| 사용자 발화 | 동작 |
|---|---|
| `/sunday` | Step 0~6 전체 |
| `일요일 루틴` / `주간 루틴 돌려줘` | 전체 (description 매칭) |
| `/sunday 텔레그램 빼고` | Step 5 생략 (네이버까지만) |
| `/sunday 주가는 이미 했어` | Step 1 생략하고 2단계부터 |
| `/sunday bionews만` / `bionews 텔레그램 최신화` | Step 2B만 실행(수집→추출→승인→적용), 이어서 deploy 여부 확인 |
| `/sunday bionews 빼고` | Step 2B 생략 |
| `이번주 루틴 진행하자` | 전체 |

## 진행 추적

6단계 파이프라인이므로 `TaskCreate`로 의미있는 단위(Step 0~6, 특히 GATE 4곳) 태스크를 만들어 진행 상황을 사용자에게 시각화하면 좋다. GATE에서 멈출 때 어느 단계인지 명확해진다. (선택 — 사용자가 원치 않으면 생략.)

## 만들면 안 되는 것

- ❌ GATE 자동 통과 (특히 update 적용·bionews 카탈리스트 적용·telegram 발송을 승인 없이).
- ❌ 한 단계 실패를 무시하고 다음으로 진행.
- ❌ 서브스킬의 절대원칙 우회 (source 없는 후보, .env 커밋, --no-verify, --force 등).
- ❌ 블로그 URL 없이 텔레그램 발송 시도.
- ❌ bionews 텔레그램 인증 만료를 추측·위조로 우회 (전화코드는 사용자만 입력 가능 → 보류 후 안내).
- ❌ bionews에서 뽑은 카탈리스트를 출처 liveness·dedup·필수필드 검증 없이 catalysts.md에 추가. 국내주(KOSPI/KOSDAQ)를 US 캘린더(catalysts.md/companies)에 추가 (별도 로컬 트래커로).
- ❌ 클라우드/무인 실행 가정 — 이 스킬은 사용자가 옆에 있는 대화형 세션 전용. 로컬 스크레이퍼·브라우저 의존 때문.
