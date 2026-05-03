---
name: deploy
description: 로컬 변경사항(데이터·코드·문서)을 GitHub `main`에 commit + push해서 Vercel 자동 빌드를 트리거하고 https://biotechcatalystcalendar.vercel.app/ 사이트를 갱신. /update, /add-catalyst, /update-company 등 데이터 스킬 호출 후 또는 직접 md 편집 후 사이트에 반영이 필요할 때 사용. 호출 형태 "/deploy" 또는 "사이트 반영해줘" / "사이트 갱신해줘" / "푸시해서 사이트 올려줘".
---

# /deploy

로컬 변경을 GitHub `main`에 commit + push해서 Vercel 자동 빌드를 트리거하고, 사이트 갱신을 검증한다.

## 호출 = 동의

이 스킬을 호출했다는 것 자체가 commit/push에 대한 사용자 명시 동의로 간주한다. 별도 "푸시할까요?" 질문 없이 절차 7번까지 자동 진행한다. (CLAUDE.md "사용자 확인 없이 자동 commit/push 금지" 규칙의 명시적 예외.)

단, **거부 조건**(아래 §거부 조건)에 해당하면 즉시 멈추고 사용자에게 알린다.

## 거부 조건 (즉시 중단)

| 조건 | 대처 |
|---|---|
| worktree 안에서 호출 | "메인 폴더(`Bio Catalyst Calendar`)로 이동 후 다시 호출하세요"라고 안내. 자동으로 worktree 머지하지 않음 (의도치 않은 머지 위험). |
| 현재 브랜치가 `main` 아님 | "main 브랜치에서만 동작합니다" 알리고 종료. |
| `origin/main`보다 뒤처짐 (behind) | `git pull --rebase origin main` 먼저 하라고 안내. 자동 pull 금지 (conflict 가능). |
| `.env*` 파일이 변경 후보에 있음 | secrets 누출 위험. 거부 + `.gitignore` 점검 안내. |

## 절차

### 1. 환경 점검

```bash
pwd                                  # 메인 폴더 위인지 (worktree 아닌지)
git rev-parse --abbrev-ref HEAD      # 'main' 인지
git fetch origin main                # 원격 최신 ref 가져옴 (안전)
git status -sb                       # ahead/behind 표시
```

거부 조건 해당하면 즉시 종료.

### 2. 변경사항 요약

```bash
git status -s                                   # working tree 변경
git rev-list --count origin/main..main          # unpushed commits 수 (ahead)
```

두 신호를 **모두** 봐야 한다. working tree만 보면 머지/리베이스 결과로 만들어진 unpushed commits를 놓친다.

| working tree | ahead | 처리 |
|---|---|---|
| clean | 0 | "✅ 변경사항 없음. 사이트는 이미 최신." 출력 후 종료. |
| clean | >0 | "🔁 working tree clean, $N commits ahead of origin (머지/리베이스 결과로 추정). 절차 3~5 건너뛰고 push만 진행." → **절차 6으로 직행.** |
| dirty | 0 또는 >0 | 파일 목록을 카테고리별 한 줄로 사용자에게 보여주고 절차 3 진행. |

dirty 케이스 표시 예:
> 변경: data/ 5건 (companies/VRTX.md, catalysts.md, ...) · src/ 2건 · docs 1건

### 3. 검증

```bash
npm run check
```

실패 시 즉시 멈추고 stderr 끝 30줄 보여줌. 사용자가 수정 후 `/deploy` 재호출.

### 4. 커밋 메시지 자동 생성

변경 종류 자동 감지:

| 변경 영역 | 메시지 형식 |
|---|---|
| `data/companies/*.md`만 | `data: <ticker(s)> 업데이트` |
| `data/catalysts.md` | `data: 카탈리스트 <간단 요약>` |
| `data/conferences.md` | `data: 학회 일정 업데이트` |
| `data/prices/*.json` | `data: 주가 캐시 갱신` |
| `src/**` (코드만) | 변경 성격에 따라 `feat:` / `fix:` / `refactor:` |
| `docs/`, `*.md` (root) | `docs: ...` |
| `.claude/skills/`, `specs/` | `chore: ...` 또는 `docs: ...` |
| 둘 이상 | 두 줄 요약 (첫 줄 = 가장 큰 변경) |

### 5. 커밋

```bash
# .env* 자동 제외 — 변경된 파일만 명시적으로 add
# git add -A 사용 금지 (실수로 secrets 추가 위험)
git add <변경된 파일들>
git commit -m "<생성한 메시지>" \
  -m "Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

pre-commit hook이 막으면 멈추고 사용자에게 알림. **`--no-verify` 절대 금지.**

### 6. 푸시

```bash
git push origin main
```

`--force` / `--force-with-lease` **절대 금지.** 거부되면 (rejected, non-fast-forward) 사용자에게 원인 보여주고 종료.

### 7. Vercel 빌드 검증

Vercel 빌드 통상 1~2분. **고정 sleep은 Claude harness가 차단한다 (long leading sleep block).** 대신 push **직전** ETag를 baseline으로 잡고, 변경될 때까지 폴링한다.

```bash
# push 직전에 baseline ETag 캡처 (절차 6 직전)
BASELINE_ETAG=$(curl -sI https://biotechcatalystcalendar.vercel.app/ | grep -i '^etag:' | tr -d '\r\n')

# push 후 ETag 변경까지 폴링 (run_in_background로 띄우면 완료 알림 받음)
until [ "$(curl -sI https://biotechcatalystcalendar.vercel.app/ | grep -i '^etag:' | tr -d '\r\n')" != "$BASELINE_ETAG" ]; do
  sleep 10
done
echo "NEW BUILD DEPLOYED at $(date '+%H:%M:%S')"
```

- ETag 변경 감지 → 새 빌드 배포 완료. 성공.
- 5분(default timeout) 안에 변경 없음 → "Vercel 빌드 진행 중일 수 있습니다. https://vercel.com/dashboard 에서 빌드 로그 확인하세요." 안내.

> 참고: curl로 사이트 본문을 받으면 "Vercel Security Checkpoint" 봇 챌린지가 뜰 수 있다 (HTML body 검증 불가). HEAD 요청의 ETag는 정상 반환되므로 ETag 폴링이 가장 신뢰성 있다.

### 8. 결과 보고

```
✅ /deploy 완료
- commit: <hash> "<message>"
- pushed: origin/main
- site: https://biotechcatalystcalendar.vercel.app/ (HTTP 200)
```

## 트러블슈팅

| 증상 | 원인 | 대처 |
|---|---|---|
| `npm run check` 실패 | 데이터 스키마 위반 / lint 에러 | 에러 보고 → 사용자가 수정 후 재호출 |
| pre-commit hook 거부 | hook이 같은 check 실행 | 동일 |
| push rejected (non-fast-forward) | origin에 다른 commit 있음 | 사용자에게 알림 → `git pull --rebase origin main` 후 재호출 |
| Vercel 응답 5xx | 빌드 진행 중 또는 빌드 실패 | Vercel 대시보드에서 빌드 로그 확인 |

## 절대 규칙

- 호출은 **메인 폴더 + main 브랜치**에서만.
- secrets 자동 제외 (`.env`, `.env.local`, `.env.*` 패턴).
- `--no-verify` / `--force` / `--force-with-lease` 금지.
- 절차 중 사용자가 중단 의사 표시하면 즉시 멈춤.
- 이 스킬은 **데이터 수정 안 함**. 오직 commit + push + 검증. 데이터 수정은 `/update`, `/add-catalyst`, `/update-company` 등에서.

## 사용 시나리오

```
사용자: /update
Claude: [/update 결과 요약 — N건 변경]

사용자: /deploy
Claude: [절차 1~8 자동 진행]
        ✅ /deploy 완료
        - commit: abc1234 "data: 카탈리스트 3건 추가, 종목 2건 업데이트"
        - pushed: origin/main
        - site: https://biotechcatalystcalendar.vercel.app/ (HTTP 200)
```

`/update`와 `/deploy`를 분리한 이유: 데이터 변경 후 한 번 검토하고, 여러 수정 누적 후 한 번에 push 가능하도록. 매번 자동 push가 필요하면 사용자가 단일 한국어 명령으로 호출 가능 ("업데이트하고 사이트도 올려줘" → 두 스킬 순차 호출).
