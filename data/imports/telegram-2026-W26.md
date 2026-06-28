# Telegram Import — BioSpectator + BBA Insights (bionews)

- **수집 채널**: BioSpectator (`t.me/biospectatorT`) + BBA Insights (`t.me/BBAinsights`) — telegram-analyzer `group: bionews`
- **메시지 범위**: 2026-02-06 ~ 2026-06-26 (총 1,000건)
- **추출 생성일**: 2026-06-28 (오늘 기준 forward = on/after 2026-06-28)
- **방법**: 5청크 병렬 추출(각 200건) → 유니버스(568티커)·기존 카탈리스트(101) 대조. 출처 = 메시지 내 링크. 날조 없음, 퍼지 윈도우는 원문 표현 보존.
- **퍼지 윈도우 → 날짜 컨벤션**(캘린더 기존 관행): Q3/3분기 → `2026-09-30`, 하반기/4Q/연말 → `2026-12-31`. 실제 표현은 event 텍스트에 보존.

---

## A. NEW forward 카탈리스트 후보 (in-universe, catalysts.md 미등록)

| ticker | company | drug | indication | event(원문 윈도우) | type | 매핑날짜 | source |
|---|---|---|---|---|---|---|---|
| AMGN | Amgen | Tavneos (avacopan) | ANCA vasculitis | FDA 청문회 — 승인취소 여부 심리 (간독성/withdrawal) | Regulatory | 2026-06-29 | https://thepharmanews.net/article/amgen-tavneos-fda-hearing-mqb2u9e5 |
| QURE | uniQure | AMT-130 | Huntington's | 가속승인 BLA 제출 (3분기 예정, FDA 신청 수용) | Regulatory | 2026-09-30 | https://www.biospectator.com/news/view/29073 |
| RGNX | REGENXBIO | clemidsogene | MPS II (Hunter) | CAMPSIITE 데이터로 BLA 재제출 (3분기 예정) | Regulatory | 2026-09-30 | https://thepharmanews.net/article/regenxbio-navsunli-mpsii-mqp8xhep |
| BMRN | BioMarin | Voxzogo (vosoritide) | Hypochondroplasia | Canopy-HCH-3 Ph3 positive → 적응증확대 FDA 신청 (3분기) | Regulatory | 2026-09-30 | https://www.biospectator.com/news/view/28839 |
| SMMT | Summit | ivonescimab | NSCLC (squamous) | HARMONi-3 최종 PFS + OS 중간분석 (하반기) | Clinical Readout | 2026-12-31 | https://www.biospectator.com/news/view/28601 |
| IMVT | Immunovant | imeroprubart (IMVT-1402) | D2T 류마티스관절염 | Ph2b 28주 위약대조 topline (하반기) | Clinical Readout | 2026-12-31 | https://thepharmanews.net/article/hanall-imvt-imvt1402-mpeqbwuw |
| NVO | Novo Nordisk | etavopivat | Sickle cell disease | Ph3 positive(VOC -27%) → FDA 신청 (하반기) | Regulatory | 2026-12-31 | https://thepharmanews.net/2026/04/20/novo-nordisk-etavopivat-scd/ |
| MIRM | Mirum | volixibat | PSC 소양증 | Ph2 positive → NDA 제출 (하반기) | Regulatory | 2026-12-31 | https://thepharmanews.net/2026/05/05/mirum-volixibat-psc/ |
| CMPX | Compass Therapeutics | tovecimig (DLL4xVEGF) | 담도암 2L | Ph2/3 PFS positive(OS 미충족) → BLA (연내) | Regulatory | 2026-12-31 | https://www.biospectator.com/news/view/28550 |
| KYTX | Kyverna | miv-cel (CD19 CAR-T) | Stiff-person syndrome | 자가면역 첫 CAR-T BLA 롤링 완료 (4분기) | Regulatory | 2026-12-31 | https://www.biospectator.com/news/view/28715 |
| EWTX | Edgewise | EDG-7500 / sevasemten | HCM / 근이영양증 | 주요 임상결과 (4분기) — Servier가 근이영양 사업부 인수 | Clinical Readout | 2026-12-31 | https://www.biospectator.com/news/view/28928 |
| TRDA | Entrada | ENTR-601-44 | DMD (exon 44) | 고용량 코호트 디스트로핀 데이터 (4분기) | Clinical Readout | 2026-12-31 | https://thepharmanews.net/2026/05/07/entrada-entr-601-44-dystrophin/ |
| BDTX | Black Diamond | silevertinib | non-classical EGFR NSCLC | 연말 FDA pivotal 미팅 (regulatory path) | Regulatory | 2026-12-31 | https://www.biospectator.com/news/view/28874 |
| ABBV | AbbVie | zumilokibart (APG777) | Atopic dermatitis | Apogee($10.9B) 인수자산 APG777 Ph3 착수 (하반기) | Clinical Readout | 2026-12-31 | https://www.biospectator.com/news/view/29104 |

**저우선/보류 (Ph3 착수·milestone성, 또는 불확실):**
- INBX INBRX-106 HNSCC Ph3 착수 3Q (start≠readout) · AARD PWS Ph3 3Q (FDA 임상보류 중, 지연) · WVE WVE-006 AATD 가속승인 피드백 "중순"(시점 모호) · BIIB RayThera Ph1 3Q(M&A) · BOLD Serapha 역합병(corporate)
- 유니버스 외(티커파일 없음→추가 불가): OTSUKA centanafadine PDUFA 2026-07-24, TAK zasocitinib NDA ~2027-03, AZN/GSK/Roche/Bayer 다수

---

## B. Outcome 갱신 후보 (기존/추적 종목의 최근 결과 — 결과 기록용)

> 캘린더 주간 스윕(W26)이 일부 이미 반영했을 수 있음 → 추가 전 기존 entry 확인 필요.

**승인/positive:**
- IONS Tryngolza(olezarsen) sHTG **FDA 승인** 6/26 (기존 6/30 PDUFA 적중) · GILD Trodelvy 1L mTNBC **승인** 6/26 · MRK Welireg adjuvant ccRCC **승인** 6/16(기존 6/12) · SNY Tzield T1D(8–17세) 승인 6/16 · GSK Utebzi cUTI 승인 6/18(+SPRO 마일스톤)
- RVMD daraxonrasib RASolute302 Ph3 OS positive(mOS 13.2 vs 6.6, ASCO plenary) 5/31 · MRK tulisokibart UC ATLAS Ph3 positive 6/23 · TNGX bopimetostat+daraxon PDAC Ph1/2 ORR92% 6/10 · LLY pirtobrutinib BRUIN CLL-322 Ph3 positive(EHA) 6/14 · CYTK aficamten nHCM Ph3 hit 5/7 · ORKA-001 건선 Ph2 PASI100 63.5% 4/28 · VRDN elegrobart REVEAL-2 TED Ph3 positive 5/6 · IMVT-1402 RA Ph2b interim ACR20 72.7% 5/20

**부정/실패/중단:**
- NMRA navacaprant MDD Ph3 fail(개발중단) 6/16 · PFE sigvotatug NSCLC Ph3 OS fail 6/24 · GILD Trodelvy 1L NSCLC OS fail 6/15 · SNY riliprubart CIDP Ph3 fail 6/11 · ADCT Zynlonta 확증 Ph3 fail(사망률 3배) 6/8 · ABVX obefazimod UC 유지 Ph3 효능 positive·악성종양 안전성(-43%) 6/5 · BIIB diranersen AD Ph2 1차 미달 5/15 · RGNX RGX-202 DMD 간독성(-40%) 5/15 · BMY Krazati 대장암 확증 Ph3 fail 5/6 · REGN fianlimab(LAG-3) 흑색종 Ph3 fail 5/18 · INSM brensocatib HS Ph2b fail 4/8 · REPL RP1 2차 CRL 4/11 · GILD/RCUS domvanalimab NSCLC Ph3 fail 4/22 · MRK Welireg RCC 1L Ph3 fail 4/23 · FULC pociredir SCD 중단(-54%) 6/10
- 개발중단: PFE CD47 · JNJ CD19xCD20 CAR-T 2종 · VRTX/MRNA VX-522 CF · ASND IL-2 · GMAB GEN1286 · BIIB/DNLI LRRK2(BIIB122) PD Ph2b fail

**M&A/딜(유니버스 종목):**
- CPRX←Angelini $4.1B · SLNO←Neurocrine $2.9B · APLS←Biogen $5.6B · DAWN←Servier $2.5B · NUVL←GSK $10.6B(연내 PDUFA 2건 보유) · MDGL↔ARWR ARO-PNPLA3 $1B · ARVN/PFE→RIGL vepdegestrant · JAZZ+ABCL TCE 옵션딜 $2.46B · BIIB←RayThera $1B · MTVA(동아 메타비아) DA-1726 ADA 발표

---

## C. 한국 국내주 (US 캘린더 스코프 외 — 참고)

알테오젠·한미약품·셀트리온·유한양행·오스코텍(AGIO L/O)·에이비엘바이오(givastomig FDA 패스트트랙)·디앤디파마텍(DD01 MASH EASL)·큐로셀·리가켐바이오·알지노믹스(RZ-001 RMAT)·SK바이오팜·온코닉·올릭스(ALK7 RNAi)·펩트론·에스바이오메딕스(파킨슨) 등 다수. 국내 상장이라 US 캘린더 미반영. 별도 트래킹 원하면 요청.

---

*출처: telegram-analyzer messages.db (bionews group). 각 행은 메시지 원문+링크 기반, 추론 날짜는 분기말 컨벤션 적용.*
