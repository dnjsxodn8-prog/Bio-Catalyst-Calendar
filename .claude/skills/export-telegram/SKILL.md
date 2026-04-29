---
name: export-telegram
description: 직전 /update에서 추가된 카탈리스트를 Telegram 봇으로 발송. Summary 1통 + 이벤트당 detail 1통(4 섹션) + closing 1통(blog 링크). 사용자 호출 형태 "/export-telegram <blog_url>". 일요일 워크플로 /update → /export-naver → /export-telegram의 마지막 단계.
---

# export-telegram

`data/catalysts.md`에 직전 `/update`에서 새로 추가된 events를 Telegram 채널로 발송한다. 사양은 [specs/007-export-telegram.md](../../../specs/007-export-telegram.md).

## 호출

```
/export-telegram <blog_url>
/export-telegram <blog_url> --dry-run
/export-telegram <blog_url> --since=<git-ref>
/export-telegram <blog_url> --summary-only
```

`<blog_url>`은 사용자가 직전에 올린 네이버 블로그 글 URL. 필수.

## 절대 원칙

1. **사용자 승인 없이 실 발송 금지.** 항상 `--dry-run` 먼저 실행, 결과를 보여주고, 사용자가 "발송" 명시 후에만 실제 발송.
2. **자동 git commit/push 금지.** export-telegram은 발송만 함. 데이터 변경 X.
3. **`.env.local` 누락 시 발송 거부.** 코드가 자동 처리하지만 SKILL 레벨에서도 인지.

## 절차

### 1. 사전 체크

- `<blog_url>` 인자 없으면 사용자에게 1턴 안에 요청
- `.env.local` 존재 여부 확인 (`ls .env.local`). 없으면 다음 안내 후 종료:
  > `.env.local` 파일 생성 후 다음 두 변수 추가하세요:
  > ```
  > TELEGRAM_BOT_TOKEN=...
  > TELEGRAM_CHAT_ID=...
  > ```

### 2. dry-run 실행

```bash
npm run export-telegram -- "<blog_url>" --dry-run
```

(또는 인자 위치 그대로: `npm run export-telegram -- <blog_url> --dry-run`)

stdout으로 모든 메시지 (summary + details)가 하나씩 출력됨. stderr에는 누락 필드 경고.

### 3. 결과 보여주고 사용자 승인

dry-run 결과의 핵심을 요약:
- 발송 예정 통수 (summary N + detail M)
- 누락 필드가 있는 이벤트 목록 (있으면)
- 이벤트별 ticker / drug / date 한 줄 리스트

그리고 묻는다:
> "위 N+M통 발송할까요? (`발송` / `취소` / `필드 보충 후 재시도`)"

### 4. 발송

승인받으면:

```bash
npm run export-telegram -- "<blog_url>"
```

(--dry-run 빼고 실행. --summary-only 같은 다른 플래그는 사용자 의도에 따라 유지.)

### 5. 결과 보고

stdout의 `✓ [n/N]` 카운트를 그대로 보고:
> "✅ 9통 발송 완료 (summary 2 + detail 7)"

실패 시 stderr에서 어디까지 발송됐는지 추출해서 보고.

## 인풋 데이터의 출처

| 메시지 부분 | 출처 |
|---|---|
| 신규 events | `git diff <since> -- data/catalysts.md` (기본 `<since>=HEAD`) |
| `mcap`, `modality` | `data/companies/{TICKER}.md` frontmatter |
| 회사 개요 | `data/companies/{TICKER}.md`의 `## 회사 개요` 첫 단락 |
| `trialDesign`, `targetDisease`, `priorTrialUrl`, `moa` | `data/catalysts.md` 신규 4 필드 (spec 007) |
| 출처 link | `sources[]`에서 credibility ranking으로 1순위 자동 선택 |

## 흔한 케이스

### A. 누락 필드 경고가 떴을 때

dry-run에서 `⚠️ VRTX ...: 누락 [trialDesign, moa]` 같은 경고가 나오면, `/update`가 채워야 했던 필드가 비어있다는 뜻. 옵션:
1. 그대로 발송 (해당 줄/섹션이 자동 생략됨)
2. 발송 보류, `data/catalysts.md`를 수동 편집해서 필드 채우고 재시도
3. `--summary-only`로 detail 메시지 자체를 생략

사용자에게 옵션 제시.

### B. `<since>` 변경 필요할 때

직전 `/update` 결과를 이미 commit했으면 `--since=HEAD~1` 형태로 비교 기준 변경. 사용자가 어떤 commit이 /update commit인지 모르면 `git log --oneline -10 data/catalysts.md`로 확인.

### C. 발송 실패

Telegram API 에러(잘못된 token, chat_id 오타, 봇이 채널에 추가 안 됨 등) 시 첫 통부터 실패. stderr에 응답 body가 출력되니 이를 보고 사용자에게 원인 안내.

## 주의

- `<blog_url>`은 사용자가 직접 제공하는 값 — 검증 X (404든 비공개든 그대로 메시지에 박힘). 사용자 책임.
- 메시지에 `parse_mode` 설정 안 함 → plain text. 한국어/특수문자 그대로 안전.
- detail 메시지가 1통당 ~700자, summary가 ~300자. 5건 정도면 총 3,500자. 4096자 한도 여유 있음.
- summary는 6건부터 분할되지만 detail은 항상 이벤트당 1통.

## 예시

> User: `/export-telegram https://blog.naver.com/dnjsxodn8/223XXXXXX`

→ Claude:
1. `.env.local` 확인 → OK
2. dry-run 실행 → stdout/stderr 캡처
3. 결과 요약:
   > 발송 예정 9통 (summary 1 + detail 7 + closing 1).
   > 마지막 closing 메시지: "자세한 내용은 블로그 참고해 주세요!\n{blog_url}"
   > 추가된 events:
   > • VRTX 8/15 PDUFA — vanzacaftor (낭포성섬유증)
   > • LLY 5/15 ASCO — retatrutide (비만)
   > ...
   >
   > ⚠️ BIIB는 trialDesign 누락 → 임상 정보 섹션 생략됨.
   >
   > 발송할까요?
4. 사용자 "발송" → 실제 실행 → "✅ 9통 발송 완료" 보고
