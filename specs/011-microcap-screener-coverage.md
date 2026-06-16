# 011 — 마이크로캡 스크리너 커버리지 (mcap 하한 완화)

> 상태: **초안 (승인 대기)** · 작성일 2026-06-16
> 선행 spec: 001(data-layer), 003(verification), 010(screener-integration)
> 트리거: 사용자 요청 — "스크리너 차트의 누락 마이크로캡(<$100M)을 규칙 완화해 채운다"

---

## §0. 배경 · 사실확인 (구현 전 합의된 전제)

spec 010으로 GBS의 G×E 차트를 `/app/screener`에 통합했다. 차트의 dot 하나 = leaderboard 한 종목이고,
Calendar에 `data/companies/{TICKER}.md`가 있는 종목만 '상세정보 보기'가 활성화된다(나머지는 비활성 dot).
지난 세션에 ≥$100M 누락분 36종을 채워 커버리지를 349→384로 올렸다.

이번 spec 착수 전 leaderboard·committed·quarantine를 교차한 **실측**(사용자 메모의 "160종"과 차이가 있어 명시):

1. **plotted 종목 = 532**. leaderboard 575행 중 `G_conf`·`E_conf`가 둘 다 정수인 행만 차트에 찍힌다(나머지 43은 N/E=툴·진단, make_viz와 동일 규칙).
2. **커밋된 calendar에서 누락된 plotted 종목 = 148종**. 그리고 **이 148종 전부가 `mcap<100`**(≥100 누락분은 지난 세션에 0으로 소진), **전부 `data/_screener_wip/companies/`에 stub 보존됨**(no-stub 0). → 이번 작업의 실제 타깃은 **148종**(메모의 160은 stub 총량 기준 추정치였음).
3. 채우면 **스크리너 커버리지 384→532 = plotted 100%** 도달.
4. **quarantine의 나머지 66 stub은 N/E**(plotted 아님) → 채워도 차트 dot이 생기지 않아 커버리지 기여 0. **이번 spec 범위 밖**(채우지 않고 quarantine 유지).
5. **차단 사유는 단 하나**: `verify-data.mjs`가 `mcap<100`을 ERROR로 처리(`CLAUDE.md` "mcap<$100M 추가 거부" 규칙의 코드화). modality·nextCatalyst·sources 등 다른 규칙은 그대로 지킬 수 있다.

### 결정 필요 (이 spec이 사용자에게 묻는 것)
- **D1** — `mcap<100` 하한을, 스크리너 유래 종목에 한해 완화하는 방식
- **D2** — 마이크로캡을 일반 종목과 구분할 frontmatter 플래그 도입 여부
- **D3** — 완화된 mcap을 verify-data에서 통과로 볼지 / WARNING으로 남길지

---

## §1. 목표 · 비목표

### 목표
- **G1.** `CLAUDE.md`의 "mcap < $100M 종목 추가 금지" 규칙을 **"스크리너 유래 종목은 예외"**로 완화. 일반(카탈리스트 추적용) 신규 종목엔 $100M 하한 **유지**.
- **G2.** `scripts/verify-data.mjs`의 `mcap<100` 처리를 플래그 기반으로 분기: 플래그 있으면 통과(WARNING), 없으면 기존대로 ERROR.
- **G3.** 마이크로캡을 데이터·UI에서 구분 가능하게 frontmatter 플래그 도입.
- **G4.** quarantine의 **148 plotted 마이크로캡 stub을 웹검증 후 정식 `data/companies/`로 승격** → 스크리너 커버리지 plotted 100%.

### 비목표
- N/E 66 stub 채우기(차트 기여 0 → quarantine 유지).
- 스크리너 차트/UI 로직 변경(spec 010 산출물 그대로). 플래그는 데이터·verify 레이어에만 영향, UI 뱃지는 §4 선택사항.
- `mcap≥100` 일반 종목 추가 정책 변경 없음.
- `data/catalysts.md`(별도 미커밋 작업)는 이 spec과 무관 — 섞지 않음.

---

## §2. 설계 결정 (제안)

### D1 — mcap 하한 완화 방식: **frontmatter 플래그 게이트** (권장)
`mcap<100`이라도 **`screener: true`** frontmatter가 있으면 추가 허용. 플래그 없는 종목은 기존대로 $100M 하한 적용.
- 장점: 완화 범위가 명시적·국소적. 일반 종목엔 하한이 그대로 살아 있어 실수로 잡주가 들어오는 걸 막음. leaderboard 파일을 verify가 읽을 필요 없음(Vercel sibling 부재 문제와 무관).
- 대안(비권장): ① 하한을 일괄 $0으로 낮춤 → 일반 종목 가드 소실 ② leaderboard 멤버십으로 게이트 → verify가 sibling CSV 의존(Vercel 빌드에서 깨짐).

### D2 — 구분 플래그: **`screener: true`** (boolean, 선택 필드)
- 의미: "이 종목은 Calendar 카탈리스트 추적이 아니라 **스크리너 차트 커버리지**를 위해 등재됨". (마이크로캡이 아니어도 스크리너 전용 등재면 붙일 수 있게 일반화 — 단 현 작업에선 148 마이크로캡에만 부여.)
- 기존 420종 일반 파일엔 **붙이지 않음**(필드 부재 = 일반 종목). 하위호환 100%.
- frontmatter 예:
  ```yaml
  ticker: ABVC
  company: ABVC BioPharma, Inc.
  mcap: 28
  modality: Small Molecule
  areas: [Neurology]
  screener: true        # ← 신규. mcap<100 허용 + UI 구분용
  nextCatalyst:
  verified: 2026-06-16
  sources: [https://...]
  ```

### D3 — verify-data 동작: `mcap<100` + `screener:true` → **WARNING**(비차단), 그 외 `mcap<100` → **ERROR**(유지)
- WARNING으로 남기는 이유: "정상 하한 미만"이라는 사실을 가시화하되 커밋은 막지 않음. 통계에도 잡힘.
- 추가 가드(권장): `screener:true`인데 `mcap≥100`이면 → **INFO**(불필요한 플래그 알림, 비차단). 데이터 위생용, 선택.

#### verify-data.mjs 변경 (현재 117–122행)
```js
// 현재
if (fm.mcap !== undefined && fm.mcap !== null) {
  if (!Number.isInteger(fm.mcap)) issues.err(loc, `mcap이 정수가 아님: ${fm.mcap}`);
  else if (fm.mcap < 100) issues.err(loc, `mcap < 100: ${fm.mcap} (요구사항 4번)`);
  else if (fm.mcap < 0) issues.err(loc, `mcap이 음수: ${fm.mcap}`);
}

// 제안
if (fm.mcap !== undefined && fm.mcap !== null) {
  if (!Number.isInteger(fm.mcap)) issues.err(loc, `mcap이 정수가 아님: ${fm.mcap}`);
  else if (fm.mcap < 0) issues.err(loc, `mcap이 음수: ${fm.mcap}`);
  else if (fm.mcap < 100) {
    if (fm.screener === true) issues.warn(loc, `mcap < 100: ${fm.mcap} (스크리너 종목, 하한 완화)`);
    else issues.err(loc, `mcap < 100: ${fm.mcap} (요구사항 4번; 스크리너 종목이면 screener:true 필요)`);
  }
}
```
- `screener` 필드 자체의 타입 체크(있으면 boolean) 1줄 추가 권장.
- `COMPANY_REQUIRED_FM`은 **변경 없음**(`screener`는 선택 필드).

#### CLAUDE.md 변경
- §데이터 작업 규칙 3번: "100 미만이면 추가 거부" → "100 미만이면 추가 거부. **단 스크리너 유래 종목(`screener: true`)은 예외 — verify는 WARNING으로 통과**(spec 011)".
- §검증 시스템 2번, §절대 하지 말 것의 "mcap < $100M 종목 추가" 항목에도 동일 예외 주석.

---

## §3. 채우기 실행 계획 (승인 후)

대상 = **148 plotted 마이크로캡**(`data/_screener_wip/companies/` 중 leaderboard plotted ∩ committed 미존재). 작업 패턴은 지난 세션 검증분([[project_calendar_screener]] §작업 패턴) 답습.

1. **시드**: quarantine stub을 출발점으로. 단 stub은 batch-assembled라 **wrong-asset 위험 만연**(BRNS·CUE·GOSS·SPTX 등 적발 전력) → 종목당 **웹검증 필수**.
2. **에이전트 분배**: `general-purpose` 종목당 2~3개, **동시 ≤12**(레이트리밋 안전선). 각 에이전트에 스키마 + modality enum + **leaderboard mcap(정수, 진실값)** + stub 힌트 주고, 웹검증·정정 후 완성 .md 반환.
3. **필드 규칙**(채울 때 강제):
   - `mcap` = **leaderboard 값**(정수). stub의 `/10` 오타 무시.
   - `screener: true` **필수**(하한 완화 게이트).
   - `modality` = enum 매핑(`Monoclonal Antibody`→`Antibody`, `Small molecule`→`Small Molecule` 등).
   - `nextCatalyst` = `YYYY-MM-DD | YYYY-H1/H2 | YYYY-Q1~Q4` 또는 빈값.
   - `sources` 최소 1개(웹검증 출처). `verified` = 작업일.
   - wrong-asset 발견 시 본문·areas·modality 정정.
4. **배치 루프**(≈12종/배치, ~12배치): 파일 작성 → 해당 stub 삭제(quarantine에서 제거) → `node scripts/build-data.mjs && node scripts/build-screener.mjs` → `node scripts/verify-data.mjs` green(ERROR 0) → 커밋(pre-commit 훅 통과). **커밋은 스크리너 파일/채운 종목만 명시 스테이징** — `data/catalysts.md`·`sitemap.xml`·`.agents/`·`AGENTS.md`·`design/` 제외.
5. **완료 후**: 한 번에 push 재배포(`/deploy` 또는 수동). 커버리지 384→532 검증. quarantine에 N/E 66 stub만 남는지 확인.

### 합격 게이트
- 매 배치 `verify-data` **ERROR 0**(WARNING은 마이크로캡 mcap·stale·sources로 다수 발생 — 정상).
- `build-screener` 로그의 `coverage: N/532`가 배치마다 증가, 최종 532/532.
- 기존 420 일반 종목 frontmatter **무변경**(플래그 미부여, diff 0).

---

## §4. 선택 / 후속 (이 spec 범위 표시만)
- **UI 마이크로캡 뱃지**: `screener:true`(또는 `mcap<100`) dot에 작은 표식. spec 010 차트 로직 변경 동반 → **별도 결정**, 기본은 미구현.
- N/E 66 stub: 스크리너 점수(T3/R 등) 생기거나 카탈리스트 발생 시 별도 채우기.

---

## 변경 파일 요약
- `specs/011-microcap-screener-coverage.md` (이 문서)
- `scripts/verify-data.mjs` (mcap<100 분기 — §2 D3)
- `CLAUDE.md` (규칙 3곳 예외 주석 — §2)
- `data/companies/{TICKER}.md` ×148 신규(quarantine 승격)
- `data/_screener_wip/companies/` 148 stub 삭제(N/E 66 잔류)
- `src/screener.generated.json` 재생성(커버리지 갱신) — 커밋
