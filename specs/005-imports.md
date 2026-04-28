# Spec 005: Imports (Telegram + Naver + 웹 Import UI)

**상태:** **Deferred (2026-04-28)** — 본 spec 전체 보류. 필요 시 재개.
**작성일:** 2026-04-28
**개정:** 2026-04-28 — rev 2 (네이버 cleanup-only로 단순화, 웹 Import UI §12 추가, 로컬 전용 전환 반영)
**개정:** 2026-04-28 — rev 3 (Deferred 상태로 전환. 사용자가 텔레그램·네이버·웹 Import 모두 보류 결정)
**관련 요구사항:** 10번 (Telegram·Naver 임포트), 11·12번 정정 (웹 Import 버튼 도입)
**선행:** spec 001 (data layer), spec 003 (verification)
**참조:** working-notes.md §"Phase 5 보류"

> **2026-04-28 보류 결정 배경**: 사용자가 (a) 텔레그램 자동화는 "필요해지면 나중에", (b) 네이버 import도 "나중에", (c) 웹 Import 버튼은 옵션 (B) "전체 보류, 데이터 추가는 Claude Code 스킬로만"을 선택. 본 spec 본문은 그대로 보존 — 미래 재개 시 출발점으로 활용. CLAUDE.md / HANDOFF.md / working-notes.md의 Phase 5 표기는 "보류"로 갱신.

---

## 0. 개정 배경 (rev 2)

2026-04-28 사용자 결정으로 두 가지가 바뀌었다:

1. **로컬 전용 운용.** Vercel Private 배포(Phase 7) 폐기. 노트북에서 `npm run dev`로만 사용. GitHub Private push는 백업·이력 용도로 유지.
2. **웹 UI에 Import 버튼 추가.** "데이터 추가는 Claude Code를 통해서만, 웹 UI에 추가 버튼 없음" 룰을 부분 해제 (§12).
3. **네이버 import는 cleanup-only로 단순화.** RSS fetch·후보 자동 추출·자동 적용 모두 폐기. 사용자가 본인이 paste → 가독성 좋게 정리만 → 본인이 판단해서 정본 데이터 반영.

따라서 spec 005는 대폭 단순해짐:
- 5-A (Telegram): hybrid 추출 + 후보 승인 + 적용 (rev 1 그대로)
- 5-B (Naver): **cleanup-only**. 일정 모드 / 기업 개요 모드 두 입구
- §12 (신규): 웹 Import 버튼 모달 (모드 5개)

---

## 목표

1. 외부 텍스트(Telegram 채널, 네이버 블로그)를 정리·인덱싱한다.
2. Telegram은 후보 추출 → 승인 → 정본 반영 파이프라인 (5-A).
3. Naver는 paste한 본문을 가독성 좋게 정리해서 주간 import md에 누적 (5-B). 적용은 사용자가 별도 스킬로.
4. 웹 UI에서도 데이터 입구 1개를 둠 (§12, dev-only, Vite middleware 기반).

## 비-목표

- 자동 fact-check (verify-data 영역).
- 자동 cron / 스케줄러 (Phase 8 예고, §11).
- 모바일·원격 접속 지원 (로컬 전용).
- raw export 자동 다운로드 (사용자가 수동으로 raw 폴더에 떨궈둠).
- 신규 ticker 자동 추가 (research-company 호출 제안만).

---

## 1. 전체 구조

```
[Telegram Desktop]
   └─ Export chat history (JSON)
        └─ data/imports/raw/telegram-YYYYMMDD.json

  /import-telegram (스킬)
   ├─ scripts/import-telegram.mjs           ← 1차 필터 (ticker × 키워드)
   │   └─ 매칭 메시지 JSON 출력
   ├─ Claude (스킬 본문) → 후보 군집화·추출
   ├─ data/imports/telegram-YYYY-WW.md      ← 주간 요약 + 후보 리스트
   ├─ 사용자 승인 (다 적용 / 1,3,5만 / 취소)
   └─ 승인된 후보 → add-catalyst·update-company → npm run build-data

[Naver 블로그]
   └─ 사용자가 본문 복사 (또는 raw 폴더에 .txt 떨굼)

  /import-naver (스킬)        ← cleanup-only
   ├─ 두 모드 중 하나 지정:
   │   (1) 일정 cleanup
   │   (2) 기업 개요 cleanup
   ├─ Claude가 본문을 정리·섹션화·NCT 자동링크
   └─ data/imports/naver-YYYY-WW.md 에 append (1주차 = 1파일)
       └─ 후속 적용은 사용자가 본인 판단으로 /add-catalyst 또는 /update-company

[웹 UI Import 버튼]  ← §12 신규
   └─ 헤더 모달, 모드 5개
   └─ Vite dev middleware (/api/import) → fs.write → build-data 자동 재실행
   └─ dev 환경 전용 (production build에는 노출 X)
```

raw json/text는 `data/imports/raw/` (.gitignore). 주간 md는 커밋.

---

## 2. 5-A: import-telegram

### 2.1 입력

`data/imports/raw/telegram-*.json` (Telegram Desktop의 JSON export 형식).

JSON 구조:
```json
{
  "name": "...",
  "type": "...",
  "id": ...,
  "messages": [
    {
      "id": 12345,
      "type": "message",
      "date": "2026-04-21T09:30:15",
      "from": "...",
      "text": "..." | [...entities],
      "text_entities": [...]
    },
    ...
  ]
}
```

`text`가 entities 배열이면 평탄화 + URL은 entities[].href 보존.

### 2.2 1차 필터 (`scripts/import-telegram.mjs`)

```
인자:
  --since YYYY-MM-DD   기본: 7일 전
  --until YYYY-MM-DD   기본: 오늘
  --raw <path>         기본: data/imports/raw/ 의 가장 최근 telegram-*.json
  --out <path>         기본: stdout (스킬이 받음)
  --days N             --since 단축

동작:
  1. raw JSON 로드, messages 평탄화
  2. 필터:
     - date in [since, until]
     - 다음 중 하나 매칭:
       (a) ticker 매칭: \$?[A-Z]{2,5}\b 와 companies/ 의 실제 ticker 셋 교집합
       (b) 키워드: PDUFA, FDA, approval, approve, 승인, 허가,
                  readout, 결과, 발표, abstract, phase,
                  BLA, NDA, AdComm, 위원회, topline, Update
       (c) 학회 약자: ASCO, ESMO, AHA, AACR, ASH, JPM, ASGCT, AAN, EHA, RSNA, ARVO, EASL, ATS, ACR, ESC, EAU, AUA
  3. JSON 출력:
     [{date, from, text, ticker_candidates: [...], keywords_hit: [...], message_url}]
  4. stderr 통계: 전체 N → 필터 후 M

성능 가드:
  - 입력 메시지 10,000 초과 → 즉시 중단·경고
  - 출력 매칭 메시지 500 초과 → 사용자에게 윈도우 좁힐지 묻기
```

**메시지 URL**: 채널이 공개면 `t.me/<username>/<id>`. 비공개면 `t.me/c/<channel_id>/<id>`. raw export 루트의 `id`/`name`에서 추출. 만들 수 없으면 `null` 반환.

### 2.3 모듈 분리 원칙 (Phase 8 자동화 친화)

`scripts/import-telegram.mjs`는 **함수 단위 export 가능한 모듈**로 작성:
- `parseRawJson(path)` — raw → 메시지 배열
- `flattenText(message)` — entities 평탄화
- `extractMessageUrl(rawMeta, messageId)` — URL 생성
- `filterByWindowAndKeywords(messages, opts)` — 1차 필터
- `dedupeAgainstCatalysts(candidates, catalysts)` — 기존 catalysts.md와 중복 제거

이렇게 분리해두면 Phase 8(GitHub Actions 자동화)에서 같은 함수를 import해 재사용. CLI 진입점만 자동화 측에서 다른 형태로 감쌈.

### 2.4 스킬 본문 (`.claude/skills/import-telegram/SKILL.md`)

#### Step 1 — 1차 필터 호출
```bash
node scripts/import-telegram.mjs --days 7
```
출력 받음.

#### Step 2 — 군집화 + 후보 추출
같은 ticker × 같은 카탈리스트(예: VRTX inaxaplin PDUFA)를 언급한 메시지 묶음. 각 군집에서 사실 1개 추출:
- **add-catalyst**: 새 PDUFA/Conference/Clinical Readout/Earnings/Regulatory
- **update-company**: 기존 카탈리스트 후속 (승인·연기·결과) 또는 매출·파이프라인 변경
- **신규 ticker**: companies/에 없음 → research-company 호출 제안만

각 후보에 **외부 검증 가능 source URL ≥1개** 필수. 텔레그램 자체 URL(`t.me/...`)은 sources에 넣지 않음 (§4.2 i). 메시지 본문 안의 IR/FDA/미디어 URL만 사용. 외부 URL 없으면 후보 리스트에 표시하되 "출처 부족"으로 적용 차단.

#### Step 3 — 주간 md 작성 (`data/imports/telegram-{YYYY-WW}.md`)

```markdown
---
type: telegram-import
week: 2026-W17
generated: 2026-04-28
source_file: telegram-20260428.json
window: 2026-04-21 ~ 2026-04-28
messages_total: 1840
messages_matched: 137
candidates: 11
---

# Telegram Weekly Import — 2026-W17

## 후보 (11건)

### 1. add-catalyst — VRTX inaxaplin PDUFA 2026-08-15
- 외부 출처: https://news.vrtx.com/...
- 인용: "VRTX inaxaplin APOL1 FSGS PDUFA 8/15 확정"
- 제안 entry:
  ```yaml
  date: 2026-08-15
  ticker: VRTX
  event: inaxaplin APOL1-mediated FSGS PDUFA
  type: PDUFA
  ...
  ```

### 2. update-company — LLY Q1 매출 14.5B
...

## 인덱스: 등장 ticker
LLY (8), VRTX (5), MRK (3), $NEW1 (2 — companies/에 없음, research 후보)

## 미분류 / 잡음
137 - 11 = 126개. raw json 보존.
```

#### Step 4 — 사용자 승인
응답 받기 전 정본 데이터 수정 X. (`update` 스킬과 동일 패턴.)

#### Step 5 — 적용
승인된 후보 각각 `add-catalyst` / `update-company` 절차 호출.

#### Step 6 — 빌드
`npm run build-data` → 결과 요약 보고. 자동 commit X.

### 2.5 데이터 위생
- raw json: 커밋 X
- 주간 md: 커밋 O
- 인용 시 작성자 이름은 `from` 그대로 (1인용 private repo). 단 채널 작성자 PII 전체 dump는 X — 사실 발췌만.

---

## 3. 5-B: import-naver (cleanup-only)

### 3.1 모드

**(1) 일정 cleanup** — 블로그 글이 향후 카탈리스트 일정(주간/월간 PDUFA·학회·readout 표 등)을 정리한 경우.
**(2) 기업 개요 cleanup** — 특정 ticker의 회사·약물·임상·MOA 정보를 자세히 다룬 글.

스킬 호출 시 모드 명시:
```
/import-naver mode:일정 url:<URL> date:2026-04-22
/import-naver mode:기업개요 ticker:LLY url:<URL> date:2026-04-22
```

본문은 호출 후 paste, 또는 `path:data/imports/raw/naver-XXX.txt`로 파일 경로 지정.

### 3.2 자동 후보 추출·적용 — **하지 않음**

- 키워드 1차 필터 X
- 후보 군집화 X
- 승인 단계 X
- catalysts.md / companies/*.md 자동 수정 X

스킬은 **본문 cleanup + 주간 md append**만 수행. 사용자가 결과 md를 보고 본인 판단으로 별도 스킬(`/add-catalyst`, `/update-company`)을 호출.

### 3.3 cleanup 동작 (스킬 본문)

#### 공통
1. 본문에서 광고·SNS 위젯·"공감 부탁드려요"·"이웃 추가" 등 잡음 제거
2. 단락 정돈, 줄바꿈 정리
3. URL 자동 인식, NCT 번호는 그대로 (UI의 inlineMarkdown 유틸이 자동 링크)
4. 메타: URL / 제목 / 작성일 / paste 시각

#### 모드 (1) 일정
- 본문 안의 일정성 진술을 **bullet 또는 표**로 재구성
- "X월 Y일 — TICKER drug indication EVENT" 패턴이 보이면 그 줄로 정렬
- 사용자가 보고 좋은 항목을 별도로 `/add-catalyst` 호출하기 좋게

#### 모드 (2) 기업 개요
- 글 안의 약물·임상·MOA 정보를 **CLAUDE.md 본문 헤딩 enum**으로 섹션화
  - `## 약물 정보` / `## Modality` / `## MOA` / `## 임상 디자인` / `## 타겟 질환` / `## 기존 치료제` / `## 사전 공개 임상` / `## 논문`
- 헤딩 매칭이 애매한 단락은 `## 메모`로
- 결과 섹션을 그대로 복사해 `companies/{TICKER}.md`에 붙일 수 있는 형태로 출력

### 3.4 출력 — 주간 md append

`data/imports/naver-{YYYY-WW}.md`에 새 글 1개씩 append:

```markdown
---
type: naver-import
week: 2026-W17
generated: 2026-04-28
entries: 3
---

# Naver Weekly Import — 2026-W17

---

## entry 1 — 2026-04-22 [일정]
- 출처: https://blog.naver.com/.../1234
- 제목: 2026년 5월 biotech 카탈리스트 정리
- paste: 2026-04-28T10:00

본문 정리:
- 2026-05-01 — VRTX inaxaplin APOL1 FSGS PDUFA
- 2026-05-15 — LLY Q1 earnings
- ...

---

## entry 2 — 2026-04-23 [기업개요: LLY]
- 출처: https://blog.naver.com/.../1235
- 제목: 일라이릴리 GLP-1 파이프라인 분석
- paste: 2026-04-28T10:05

### ## 약물 정보
**Tirzepatide / Mounjaro**
GIP/GLP-1 dual agonist...

### ## 임상 디자인
- SURMOUNT-3: Phase 3, N=...
...

---

## entry 3 — ...
```

`entries` frontmatter 카운트는 자동 증가. 주차가 바뀌면 새 파일 시작.

### 3.5 사용자 후속 워크플로

cleanup 결과 md를 본 다음:
- **모드 1 결과**: 마음에 드는 일정을 `/add-catalyst` 호출로 catalysts.md에 추가 (출처 URL 1개 이상 필수)
- **모드 2 결과**: 섹션을 통째로 복사해 `/update-company TICKER` 호출 (또는 직접 md 수정)

cleanup md는 자료성 메모로도 가치 있음. 적용 안 하고 남겨둬도 OK.

### 3.6 1차 필터 / 키워드 매칭 — **없음**

5-B는 스크립트 X (RSS도 폐기). 스킬 본문에서 Claude가 paste된 텍스트를 직접 읽고 cleanup. 글 1개 본문은 보통 < 10KB라 context 안전.

---

## 4. 검증 시스템(spec 003)과의 상호작용

### 4.1 사후 검증
import 스킬이 정본 데이터(catalysts.md / companies/) 수정 후 `npm run check` 통과 필수. errors → 적용 롤백.

### 4.2 의사-URL 정책
`telegram-export:{file}#{id}` 같은 비-표준 URL은 sources에 **절대 넣지 않음**. catalyst sources에는 회사 IR / FDA / 학회 / 미디어 URL만. 메시지에 외부 URL 없으면 후보 표시는 하되 적용 차단.

### 4.3 import md 자체 검증
`data/imports/*.md`는 frontmatter `type: telegram-import` 또는 `naver-import`. verify-data는 이 파일 검증 X.

---

## 5. 결정 사항 (2026-04-28 rev 2)

| # | 이슈 | 결정 |
|---|---|---|
| 5.1 | 텔레그램 export 포맷 | **JSON 전용**. HTML은 v2 fallback |
| 5.2 | 네이버 입력 모드 | **사용자 paste only**. RSS·자동 fetch 폐기 |
| 5.3 | 네이버 처리 방식 | **cleanup-only**. 자동 후보 추출·승인·적용 모두 X |
| 5.4 | 텔레그램 추출 방식 | **하이브리드** — 스크립트 1차 필터 + Claude 후보 추출 |
| 5.5 | 시간 윈도우 기본값 | 텔레그램 7일 (`--days N`). 네이버는 paste 단위 |
| 5.6 | 후보 적용 자동화 | 텔레그램만 `update` 패턴 (β). 네이버는 사용자 별도 호출 |
| 5.7 | 의사-URL 정책 | 외부 검증 가능 URL 필수. 외부 URL 없으면 적용 차단 |
| 5.8 | raw 파일 커밋 | X (`data/imports/raw/` .gitignore 적용 확인됨) |
| 5.9 | 주간 md 커밋 | O (이력 가치) |
| 5.10 | 신규 ticker 처리 | 자동 추가 X. research-company 호출 제안만 |
| 5.11 | 웹 Import UI | **추가**. 모달 1개, 모드 5개. dev-only (§12) |
| 5.12 | 배포 | **로컬 전용**. Vercel 폐기. GitHub private push는 백업 |
| 5.13 | 자동화 | Phase 8로 분리 (§11). v1은 수동 |

---

## 6. 의존성

신규:
- (5-A 필요 시) JSON 파싱은 native — npm 추가 X
- (§12) Vite middleware는 vite plugin API — npm 추가 X

기존: `gray-matter`, `yaml`, `js-yaml` (이미 있음)

폐기: `rss-parser` (rev 1에서 검토했으나 5-B cleanup-only 결정으로 불필요)

---

## 7. 완료 조건

### 5-A (Telegram)
- [ ] `scripts/import-telegram.mjs` (§2.2) — 함수 단위 export (§2.3)
- [ ] `.claude/skills/import-telegram/SKILL.md`
- [ ] sample raw 1개로 dry-run → 매칭 메시지 수 출력
- [ ] 후보 1건 수동 승인 → catalysts.md 반영 → `npm run check` 통과
- [ ] 주간 md `data/imports/telegram-{YYYY-WW}.md` 생성

### 5-B (Naver, cleanup-only)
- [ ] `.claude/skills/import-naver/SKILL.md` — 모드 (1)/(2) 분기
- [ ] sample 본문 1개로 모드 1 dry-run → 일정 bullet/표 출력
- [ ] sample 본문 1개로 모드 2 dry-run → 섹션화된 출력
- [ ] `data/imports/naver-{YYYY-WW}.md` append 동작 (frontmatter entries 카운트)

### §12 (웹 Import UI)
- [ ] Vite plugin (`/api/import` 엔드포인트, dev-only)
- [ ] 헤더 Import 버튼 + 모달 컴포넌트
- [ ] 모드 1 (카탈리스트 폼) 동작 → catalysts.md append → build-data → UI refresh
- [ ] 모드 3 (네이버 일정 cleanup) 동작 → imports/*.md append
- [ ] 모드 4 (네이버 기업 개요) 동작 → imports/*.md append
- [ ] 모드 5 (Telegram raw 업로드) 동작 → raw 폴더 저장
- [ ] (선택) 모드 2 (학회 폼) — 후순위
- [ ] production build (`npm run build`)에서 Import 버튼 노출 X 확인
- [ ] 적용 후 verify-data 실패 시 모달 에러 표시 + 롤백

### Phase 5 종료
- [ ] working-notes.md "현재 상태" Phase 5 ✅
- [ ] CLAUDE.md 갱신 (Vercel 폐기, Import 버튼 룰, 스킬 (미구현) 표시 제거)
- [ ] HANDOFF.md 정정 (§0 노트북만, §1·§2·§10 갱신)

---

## 8. 작업 순서

0. ✅ rev 2 spec 승인 + Q 결정
1. 사용자가 sample 떨궈줌:
   - `data/imports/raw/telegram-*.json` 1개
   - 네이버 본문 텍스트 1개 (모드 1) + 1개 (모드 2). raw에 떨굼 또는 paste
2. **5-A 구현** (한 세션)
   - `scripts/import-telegram.mjs` 모듈화 작성
   - SKILL.md
   - sample dry-run → 후보 1건 승인 적용
3. **5-B 구현** (같은 세션 또는 다음)
   - SKILL.md (모드 분기, cleanup 로직, append 형식)
   - sample 1·2 dry-run
4. **§12 웹 Import UI** (별도 세션 권장 — 분량 큼)
   - Vite plugin (`/api/import`)
   - 헤더 버튼 + 모달
   - 모드별 핸들러
5. CLAUDE.md / HANDOFF.md / working-notes.md 정정 (Phase 5 ✅, Phase 7 폐기 표기)

---

## 9. 위험 / 알려진 함정

- **Telegram export 채널 별 포맷 미세 차이** — `messages[].text`가 string vs entities 배열. 한 채널만 테스트 시 다른 채널 깨짐. 2~3 채널 sample 권장.
- **한국어 ticker false positive** — "BLA"·"NDA"·"FDA" 약자 일반 텍스트 등장. 반드시 companies/ ticker 셋과 교집합.
- **신규 ticker mcap 미확인** — 자동 추가 정책상 X로 회피.
- **승인 누락 후보 반복 등장** — 다음 주 같은 카탈리스트 다시 후보로 잡힘. dedup은 (date, ticker, event) 3-tuple 비교 (verify-data가 막음).
- **§12 dev-only API 누락 노출** — `/api/import` 엔드포인트가 production build에 살아있으면 보안 0이지만 어차피 로컬뿐. 그래도 build artifact에서 Import 버튼이 안 보이는 것까지 확실히.
- **§12 fs 동시 쓰기 경쟁** — 사용자 1명, 단발 import이라 race 거의 없음. 그래도 append는 `fs.promises.appendFile`로 atomic.
- **§12에서 catalysts.md 자동 수정 후 verify-data 실패** — 모달이 에러 메시지 받아 표시 + 추가된 라인 롤백. 트랜잭션 단순화: 추가 전 파일 백업 → 실패 시 백업 복원.

---

## 10. 마이그레이션 / 정리

rev 1에서 spec에 있던 항목 중 rev 2에서 폐기:
- ❌ `scripts/fetch-naver-rss.mjs`
- ❌ `scripts/import-naver.mjs` (1차 필터)
- ❌ 네이버 후보 군집화·승인·적용 단계
- ❌ rss-parser 의존성

rev 1에서 유지:
- ✅ Telegram 5-A 전체
- ✅ §4 검증 통합 (sources 외부 URL 필수)
- ✅ raw .gitignore / 주간 md commit
- ✅ 신규 ticker 자동 추가 X

---

## 11. 자동화 예고 (Phase 8 — 보류)

본 spec은 모두 사용자 수동 호출. 자동화는 별도 Phase로 분리.

### 11.1 미래 모양 (가설)

```
[ Telegram 채널 ]
   └─ 봇이 admin (또는 사용자가 봇 chat에 forward)
        ↓ 메시지 누적

[ GitHub Actions cron, 매주 일요일 03:00 KST ]
   ├─ Telegram Bot API (getUpdates) → raw json 빌드
   ├─ scripts/import-telegram.mjs (5-A 1차 필터, §2.3 모듈 재사용)
   ├─ Anthropic API 호출 (스킬 본문 prompt를 코드화)
   ├─ data/imports/telegram-YYYY-WW.md 새 브랜치에 commit
   └─ PR 자동 생성 (제목: "Weekly import 2026-W18", 본문에 후보 N건 체크박스)

[ 사용자 ]
   └─ 모바일 GitHub 앱에서 PR 본문 보고 체크 → 머지
   └─ 다음에 노트북 켤 때 git pull → import md 적용

비밀: GitHub Actions secrets — TELEGRAM_BOT_TOKEN, ANTHROPIC_API_KEY
```

### 11.2 5-A 구현 시 자동화 대비 의무사항
- §2.3 모듈 분리 원칙 준수 (Phase 8에서 동일 함수 import)
- SKILL.md의 후보 추출 prompt를 명시적 텍스트 블록으로 작성 → Phase 8에서 그대로 Anthropic API messages.create의 system/user prompt로 사용 가능
- catalyst dedup 로직(`dedupeAgainstCatalysts`)을 함수로 노출

### 11.3 진입 시점
- 수동 패턴 1~2달 운용 후 결정
- "주간 import을 매번 까먹는다" 또는 "매번 같은 동작이라 자동화 가치 명확" 판단 시 spec 008(가칭) 작성

---

## 12. 웹 Import UI (신규)

### 12.1 목표

웹 dev 화면에서 데이터 입구 1개를 둠. Claude Code를 안 거쳐도 카탈리스트 1건이나 텍스트 cleanup을 즉시 처리.

### 12.2 설계 원칙

- **dev 환경 전용.** `import.meta.env.DEV` true일 때만 헤더에 버튼 노출. `npm run build` 산출물에서는 사라짐.
- **Vite middleware (`/api/import`)** 가 fs 작업 담당. 클라이언트는 fetch만.
- **모드 1·2(폼)는 자동 적용** (사용자가 직접 입력 = 검증 완료). **모드 3·4·5(텍스트/파일)는 imports/*.md 또는 raw/ 만 건드림** — 정본 데이터 X.
- 적용 직후 verify-data 호출. 실패 시 롤백 + 모달에 에러 표시.

### 12.3 모드

| # | 모드 | 입력 | 동작 |
|---|---|---|---|
| 1 | 카탈리스트 1건 추가 | 폼: date / ticker(드롭다운) / event / type(enum) / drug / indication / phase / sources(URL ≥1) | `data/catalysts.md` append → build-data → verify → UI refresh. 실패 시 롤백 |
| 2 | 학회 1건 추가 | 폼: id / name / dates / tier / areas / location | `data/conferences.md` append → 동일 흐름. **후순위** (분기 1회 추가, ROI 낮음) |
| 3 | 네이버 일정 cleanup | textarea + 출처 URL + 작성일 | `data/imports/naver-{YYYY-WW}.md` 에 모드 (1) 형식으로 append. 정본 데이터 X |
| 4 | 네이버 기업 개요 cleanup | ticker(드롭다운) + textarea + URL + 작성일 | 동일 파일에 모드 (2) 형식으로 append |
| 5 | Telegram raw 업로드 | json 파일 input | `data/imports/raw/telegram-YYYYMMDD.json` 으로 저장. 모달에 "Claude Code에서 `/import-telegram` 호출" 안내 |

### 12.4 기술 구조

#### Vite plugin
```js
// vite.config.js
import { writeFile, appendFile, copyFile, readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

plugins: [
  react(),
  {
    name: 'import-api',
    apply: 'serve',  // dev-only
    configureServer(server) {
      server.middlewares.use('/api/import', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405; res.end(); return;
        }
        const body = await readBody(req);
        const { mode, payload } = JSON.parse(body);
        try {
          const result = await handleImport(mode, payload);
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ ok: true, result }));
        } catch (e) {
          res.statusCode = 400;
          res.end(JSON.stringify({ ok: false, error: String(e?.message ?? e) }));
        }
      });
    }
  }
]
```

`handleImport(mode, payload)` 가 fs 분기:
- mode 1: catalysts.md append + `node scripts/build-data.mjs` + `node scripts/verify-data.mjs` (실패 시 백업 복원)
- mode 2: conferences.md append + 동일
- mode 3: imports/naver-YYYY-WW.md append (cleanup은 클라이언트에서 paste한 결과 그대로 받거나 서버측 정규식으로 처리)
- mode 4: 동일, 모드 (2) 형식
- mode 5: raw 폴더에 파일 저장

#### 컴포넌트
- `src/components/ImportButton.jsx` — 헤더 우측, dev-only 렌더
- `src/components/ImportModal.jsx` — 5개 모드 탭, 폼/textarea/파일input
- 클라이언트는 `fetch('/api/import', {method:'POST', body: JSON.stringify({mode, payload})})`

#### UI refresh
- 모드 1·2: `data.generated.json`이 dev 서버 watch 대상이면 HMR로 자동 갱신. 아니면 모달이 응답 받은 뒤 `window.location.reload()`로 단순 처리.
- 모드 3·4·5: 정본 데이터 변경 X → reload 불필요.

### 12.5 검증 / 트랜잭션

mode 1·2 적용 시:
1. 대상 파일 백업 (`{path}.bak`)
2. append
3. `node scripts/verify-data.mjs --json` 실행
4. errors === 0 → 백업 삭제, build-data 실행
5. errors > 0 → 백업 복원, 응답 ok:false + error 목록

mode 3·4·5는 imports/*.md / raw/만 건드리니 verify-data 영향 없음. append만.

### 12.6 보안 / 제약

- 로컬 dev 서버는 기본 `localhost:5173` — 외부 접속 차단됨 (vite host 옵션 안 건드리는 한)
- Vite plugin `apply: 'serve'` 로 production build 빌드 산출물에 미들웨어 X
- 클라이언트 fetch가 Same-Origin이라 CSRF 거의 무관 (1인용 + 로컬)
- 단 `vite preview`로 production build 미리보기 시에도 미들웨어 안 들어감 → Import 버튼은 dev에서만

### 12.7 비-목표

- 모드 1·2의 폼 자동완성 (회사명·drug suggest). v1은 단순 input.
- 사용자 정의 모드 추가 UI. mode 5개 hard-coded.
- 모바일 friendly 모달. 데스크톱 dev에서만 사용 가정.

### 12.8 작업 순서 (§12 한정)

별도 세션 권장. 5-A·5-B 끝난 뒤.

1. Vite plugin 골격 + `/api/import` echo 라우트 (mode='ping' 통과 확인)
2. mode 5 (raw 업로드) — 가장 단순. fs.writeFile만
3. mode 3·4 (cleanup append) — paste 텍스트 그대로 받아 imports/*.md에 append
4. mode 1 (카탈리스트 폼) — verify-data 트랜잭션 포함, 가장 복잡
5. mode 2 (학회) — 후순위 / 생략 가능
6. ImportButton·ImportModal UI 작성
7. dev에서 5개 모드 손으로 한 번씩 확인 + production build에서 버튼 안 나오는 것 확인

---

## 13. 정정 영향 (다른 문서)

### CLAUDE.md
- "데이터 추가는 Claude Code를 통해서만, 웹 UI에는 추가 버튼 없음" → 부분 해제. 웹 모드 1·2(폼)·3·4·5(cleanup/raw) 허용. 정본 데이터 직접 수정은 폼만.
- 페이지 구조 §의 헤더에 "Import 버튼 (dev-only)" 추가
- 배포 § Vercel 부분 → 로컬 전용으로 정정
- 절대 하지 말 것: "Public Repo로 push" 유지. "사용자 확인 없이 자동 commit/push" 유지.

### HANDOFF.md
- §0 "노트북·모바일 둘 다" → "노트북만". Vercel·모바일 PWA·휴대폰 박스 §1·§2 정정 노트
- §10 Phase 표: 7번을 "로컬 사용 편의"로 대체, 8번 "Telegram 봇 자동화 (보류)" 추가
- §1 표의 #2(Vercel), #11(4페이지는 유지), #12(헤더 4개 버튼 제거 → Import 1개 예외)

### working-notes.md
- "Phase 5 (다음 권장)" → "진행 중" + 5-A/5-B/§12 분리
- Phase 7 "Vercel Private 배포" 폐기 표기
- Phase 8 (자동화) 신설 표기

이상의 정정은 5-A 구현 시작 전 mini-edit로 처리.
