---
name: export-telegram
description: 사용자가 지정한 날짜 범위 + 블로그 URL을 받아 그 기간의 카탈리스트 events를 Telegram 봇으로 발송. Summary + 이벤트당 detail 1통(4 섹션) + closing(blog 링크)으로 구성. 사용자 호출 형태 "/export-telegram 0511~0517 https://blog.naver.com/...". /update → /export-naver → /export-telegram의 마지막 단계.
---

# export-telegram

`data/catalysts.md`에서 사용자가 지정한 **날짜 범위**의 events를 Telegram 채널로 발송한다. 사양은 [specs/007-export-telegram.md](../../../specs/007-export-telegram.md).

## 호출 (기본 = 날짜 범위 모드)

```
/export-telegram <YYYY-MM-DD>~<YYYY-MM-DD> <blog_url>
/export-telegram <YYYY-MM-DD> <YYYY-MM-DD> <blog_url>
/export-telegram <MMDD>~<MMDD> <blog_url>          # 올해 자동 보완
/export-telegram <M/D>~<M/D> <blog_url>            # 올해 자동 보완
```

사용자가 두 날짜와 블로그 URL을 함께 보내면, **그 기간 [from, to]의 모든 events**(이미 등록된 + 신규 추가 모두)를 추출해 메시지로 작성한다. git diff 사용 X.

마지막은 항상 closing 메시지: `자세한 내용은 블로그 참고해 주세요!\n{blog_url}`

### 입력 파싱 (Claude가 사용자 발화에서 추출)

| 사용자 발화 예 | 파싱 결과 |
|---|---|
| `0511~0517 https://blog.naver.com/x/123` | from=2026-05-11, to=2026-05-17 (올해 = `/currentDate`로 보완) |
| `5/11 ~ 5/17 https://...` | 동일 |
| `2026-05-11 to 2026-05-17 https://...` | 그대로 |
| `이번주 https://...` | from=오늘, to=오늘+6 (사용자 명시 안 했을 때만 fallback) |

날짜 모호 또는 URL 누락이면 한 턴 안에 확인 묻기.

### 보조 모드 (역호환, 거의 안 씀)

```
/export-telegram <blog_url> --since=<git-ref>     # 기존 git diff 모드 (직전 /update 직후에만 의미)
```

옵션:
- `--dry-run` — 실제 발송 안 함, stdout만
- `--summary-only` — detail 생략, summary + closing만

## 절대 원칙

1. **사용자 승인 없이 실 발송 금지.** 항상 `--dry-run` 먼저 실행, 결과를 보여주고, 사용자가 "발송" 명시 후에만 실제 발송.
2. **자동 git commit/push 금지.** export-telegram은 발송만 함. 데이터 변경 X.
3. **`.env.local` 누락 시 발송 거부.** 코드가 자동 처리하지만 SKILL 레벨에서도 인지.
4. **closing 메시지 누락 금지.** 마지막 메시지는 항상 "자세한 내용은 블로그 참고해 주세요!\n{blog_url}" — 스크립트가 자동 추가하므로 별도 작업 불필요, 단 dry-run 결과에 포함됐는지 검토.

## 절차

### 1. 사전 체크

- 날짜 범위 + URL 인자 누락이면 한 턴에 요청
- worktree에서 호출됐는데 `.env.local` 없으면 메인 폴더에서 임시 복사 (`cp "C:/Users/.../Bio Catalyst Calendar/.env.local" .env.local`) 후 진행
- `.env.local`이 메인 폴더에도 없으면 다음 안내 후 종료:
  > `.env.local` 파일 생성 후 다음 두 변수 추가하세요:
  > ```
  > TELEGRAM_BOT_TOKEN=...
  > TELEGRAM_CHAT_ID=...
  > ```

### 2. dry-run 실행

```bash
node scripts/export-telegram.mjs "<blog_url>" --dry-run --from=<YYYY-MM-DD> --to=<YYYY-MM-DD>
```

또는 npm 래퍼:

```bash
npm run export-telegram -- "<blog_url>" --dry-run --from=<YYYY-MM-DD> --to=<YYYY-MM-DD>
```

stdout으로 모든 메시지 (summary + details + closing)가 하나씩 출력됨. stderr에는 누락 필드 경고.

### 3. 결과 보여주고 사용자 승인

dry-run 결과의 핵심을 요약:
- 발송 예정 통수 (summary N + detail M + closing 1)
- 누락 필드가 있는 이벤트 목록 (있으면)
- 이벤트별 ticker / drug / date 한 줄 리스트

그리고 묻는다:
> "위 N+M+1통 발송할까요? (`발송` / `취소` / `필드 보충 후 재시도`)"

### 4. 발송

승인받으면:

```bash
node scripts/export-telegram.mjs "<blog_url>" --from=<YYYY-MM-DD> --to=<YYYY-MM-DD>
```

(--dry-run 빼고 실행. --summary-only 같은 다른 플래그는 사용자 의도에 따라 유지.)

### 5. 결과 보고

stdout의 `✓ [n/N]` 카운트를 그대로 보고:
> "✅ 6통 발송 완료 (summary 1 + detail 4 + closing 1)"

실패 시 stderr에서 어디까지 발송됐는지 추출해서 보고.

## 인풋 데이터의 출처

| 메시지 부분 | 출처 |
|---|---|
| events (날짜 범위 모드) | `data/catalysts.md` 중 `from <= date <= to` 필터 |
| events (보조 git diff 모드) | `git diff <since> -- data/catalysts.md` |
| `mcap`, `modality` | `data/companies/{TICKER}.md` frontmatter |
| 회사 개요 | `data/companies/{TICKER}.md`의 `## 회사 개요` 첫 단락 |
| `trialDesign`, `targetDisease`, `priorTrialUrl`, `moa` | `data/catalysts.md` 4 필드 (spec 007) |
| 출처 link | `sources[]`에서 credibility ranking으로 1순위 자동 선택 |

## 흔한 케이스

### A. 누락 필드 경고가 떴을 때

dry-run에서 `⚠️ VRTX ...: 누락 [trialDesign, moa]` 같은 경고가 나오면 catalysts.md에 비어있다는 뜻. 옵션:
1. 그대로 발송 (해당 줄/섹션이 자동 생략됨)
2. 발송 보류, `data/catalysts.md`를 수동 편집해서 필드 채우고 재시도 (특히 trialDesign + moa는 보강 가치 큼)
3. `--summary-only`로 detail 메시지 자체를 생략

사용자에게 옵션 제시. preclinical event라 `priorTrialUrl`만 누락이면 그대로 발송 OK (NCT 없음 정상).

### B. 발송 실패

Telegram API 에러(잘못된 token, chat_id 오타, 봇이 채널에 추가 안 됨 등) 시 첫 통부터 실패. stderr에 응답 body가 출력되니 이를 보고 사용자에게 원인 안내.

## 주의

- `<blog_url>`은 사용자가 직접 제공 — 검증 X (404든 비공개든 메시지에 그대로 박힘). 사용자 책임.
- 메시지에 `parse_mode` 설정 안 함 → plain text. 한국어/특수문자 안전.
- detail 메시지 ~700-1000자, summary ~300-500자. 5건 정도면 총 3,500자. 4096자 한도 여유.
- summary는 5건마다 분할되지만 detail은 항상 이벤트당 1통.
- 날짜 범위 안에 events 0건이면 "해당 기간 events 없음" 후 종료 (closing도 안 보냄).

## 예시

> User: `/export-telegram 0511~0517 https://blog.naver.com/kor_breaking_bad/224281035322`

→ Claude:
1. 파싱: from=2026-05-11, to=2026-05-17, url=https://blog.naver.com/kor_breaking_bad/224281035322
2. `.env.local` 확인 (worktree면 메인에서 복사) → OK
3. dry-run 실행 → stdout/stderr 캡처
4. 결과 요약:
   > 발송 예정 6통 (summary 1 + detail 4 + closing 1).
   > Events:
   > • SANA 5/12 ASGCT — SG293 (in vivo CAR-T)
   > • DYN 5/13 ASGCT — FORCE™ MAPT
   > • EDIT 5/14 ASGCT — EDIT-401
   > • CADL 5/15 AUA Plenary — CAN-2409
   >
   > ⚠️ 4건 모두 priorTrialUrl 누락 (preclinical/AUA에 NCT 매핑 안 함, 정상)
   >
   > 발송할까요?
5. 사용자 "발송" → 실제 실행 → "✅ 6통 발송 완료" 보고
