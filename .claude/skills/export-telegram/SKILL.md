---
name: export-telegram
description: 사용자가 지정한 날짜 범위 + 블로그 URL을 받아 그 기간의 카탈리스트 events를 Telegram 봇으로 발송. 네이버 카드뉴스와 같은 수준(이벤트마다 날짜·종류·종목·약물·적응증·phase + 관전 포인트)을 단일 메시지 하나로 정리해서 보냄. 마지막에 블로그 링크. 사용자 호출 형태 "/export-telegram 0511~0517 https://blog.naver.com/...". /update → /export-naver → /export-telegram의 마지막 단계.
---

# export-telegram

`data/catalysts.md`에서 사용자가 지정한 **날짜 범위**의 events를 Telegram 채널로 **단일 메시지 하나**에 정리해 발송한다. 사양은 [specs/007-export-telegram.md](../../../specs/007-export-telegram.md).

> 2026-06-28 개편: 기존 "intro + summary + 이벤트당 detail 1통(4섹션) + closing" 다통 형식을 폐기하고, **네이버 카드뉴스와 같은 수준의 단일 digest 메시지**로 통일. 이벤트마다 날짜·종류·종목·약물·적응증·phase + 관전 포인트(`blogNote`) 3줄. 길이가 4096자를 넘을 때만 이벤트 경계에서 자동 분할(보통 1통). 텔레그램과 블로그는 같은 내용을 공유하는 미러 채널 — closing은 "블로그에도 정리해뒀음".

## 메시지 형식 (단일 digest)

```
🧬 이번 주 Bio Catalyst (6/29~7/1), 13건
https://biotechcatalystcalendar.vercel.app/?v=1

🔴 PDUFA  6/29(월)  ARQT (Arcutis Biotherapeutics)
💊 ZORYVE (roflumilast) cream 0.3% / Plaque psoriasis (sNDA)
▶ <blogNote 관전 포인트>

… (이벤트마다 위 3줄 반복) …

📝 블로그에도 정리해뒀음
https://blog.naver.com/...
```

- 종류 라벨: 🔴 PDUFA · 🟠 임상 결과 · 🔵 학회 발표 · ⚪ 실적 · 🟢 규제 (네이버 카드 색상 띠와 대응).
- `▶ 관전 포인트` 줄은 `data/catalysts.md`의 `blogNote` 필드에서 옴. 없으면 그 줄만 생략(facts 2줄은 유지).
- plain text (parse_mode 없음). 한국어/특수문자 안전.

## 호출 (기본 = 날짜 범위 모드)

```
/export-telegram <YYYY-MM-DD>~<YYYY-MM-DD> <blog_url>
/export-telegram <MMDD>~<MMDD> <blog_url>          # 올해 자동 보완
/export-telegram <M/D>~<M/D> <blog_url>            # 올해 자동 보완
```

사용자가 두 날짜와 블로그 URL을 함께 보내면 **그 기간 [from, to]의 모든 events**를 추출해 단일 메시지로 작성한다.

### 입력 파싱 (Claude가 사용자 발화에서 추출)

| 사용자 발화 예 | 파싱 결과 |
|---|---|
| `0511~0517 https://blog.naver.com/x/123` | from=2026-05-11, to=2026-05-17 (올해 = `/currentDate`로 보완) |
| `5/11 ~ 5/17 https://...` | 동일 |
| `2026-05-11 to 2026-05-17 https://...` | 그대로 |
| `이번주 https://...` | from=오늘, to=오늘+7 (명시 안 했을 때 fallback) |

날짜 모호 또는 URL 누락이면 한 턴 안에 확인 묻기.

### 보조 모드 (역호환, 거의 안 씀)

```
/export-telegram <blog_url> --since=<git-ref>     # git diff 모드 (직전 /update 직후에만 의미)
```

옵션: `--dry-run`(실제 발송 안 함) · `--days=N`(오늘+N일 윈도우) · `--tickers=A,B,C`(whitelist) · `--closing-note="..."`(closing 앞 문구 교체).

## 절대 원칙

1. **사용자 승인 없이 실 발송 금지.** 항상 `--dry-run` 먼저, 결과를 보여주고, 사용자가 "발송" 명시 후에만 실제 발송.
2. **자동 git commit/push 금지.** export-telegram은 발송만 함. 데이터 변경 X.
3. **`.env.local` 누락 시 발송 거부.** worktree면 메인 폴더에서 임시 복사 후 진행.

## 절차

### 1. 사전 체크
- 날짜 범위 + URL 인자 누락이면 한 턴에 요청.
- worktree에서 호출됐는데 `.env.local` 없으면 메인 폴더에서 복사: `cp "C:/Users/dnjsx/Desktop/Biotech 기업 분석/Bio Catalyst Calendar/.env.local" .env.local`
- 메인에도 없으면 `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` 생성 안내 후 종료.

### 2. dry-run
```bash
node scripts/export-telegram.mjs "<blog_url>" --dry-run --from=<YYYY-MM-DD> --to=<YYYY-MM-DD>
```
stdout으로 메시지(보통 1통)가 출력됨. stderr에 blogNote 누락 경고.

### 3. 결과 보여주고 승인
dry-run 메시지 본문을 보여주고:
> "이 N통(보통 1통, M건) 발송할까요? (`발송` / `취소` / `수정`)"

### 4. 발송
```bash
node scripts/export-telegram.mjs "<blog_url>" --from=<YYYY-MM-DD> --to=<YYYY-MM-DD>
```

### 5. 결과 보고
stdout의 `✓ [n/N]` 카운트를 보고. 실패 시 stderr에서 어디까지 발송됐는지 추출.

## 인풋 데이터의 출처

| 메시지 부분 | 출처 |
|---|---|
| events (날짜 범위 모드) | `data/catalysts.md` 중 `from <= date <= to` |
| events (보조 git diff 모드) | `git diff <since> -- data/catalysts.md` |
| 종류·약물·적응증·phase | `data/catalysts.md` 각 event 필드 |
| 회사명 | `data/companies/{TICKER}.md` frontmatter `company` |
| 관전 포인트(`▶`) | `data/catalysts.md` 각 event의 `blogNote` 필드 (네이버 export와 공유) |

## 주의

- `<blog_url>`은 사용자가 직접 제공 — 검증 X. 사용자 책임.
- `blogNote`는 네이버 export(`build-naver-export.mjs`)와 **같은 필드를 공유**한다. 텔레그램·블로그가 미러 채널이므로 한쪽만 손보면 안 됨.
- 한 통이 4096자를 넘으면 이벤트 경계에서만 자동 분할(SAFE_LIMIT 3900). 13건 + 관전 포인트가 ~2,900자라 통상 1통.
- 날짜 범위 안에 events 0건이면 "해당 기간 events 없음" 후 종료.

## 예시

> User: `/export-telegram 0628~0705 https://blog.naver.com/kor_breaking_bad/224329491495`

→ Claude:
1. 파싱: from=2026-06-28, to=2026-07-05, url=…
2. `.env.local` 확인 (worktree면 메인에서 복사)
3. dry-run → 단일 메시지 1통(2,860자, 13건) 출력
4. 본문 보여주고 "이 1통 발송할까요?"
5. 사용자 "발송" → 실제 발송 → "✅ 전체 발송 완료" 보고
