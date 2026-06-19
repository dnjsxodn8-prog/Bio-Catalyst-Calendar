# Catalyst Events

다가오는 카탈리스트(PDUFA, Conference, Clinical Readout, Earnings).
이벤트 1개 = yaml 항목 1개. `type`은 `PDUFA | Conference | Clinical Readout | Earnings | Regulatory` 중 하나.

```yaml
events:
  - date: 2026-02-21
    ticker: VNDA
    event: Bysanti 조현병 PDUFA
    type: PDUFA
    company: Vanda
    drug: Bysanti
    indication: Schizophrenia
    phase: NDA
    sources:
      - https://www.prnewswire.com/news-releases/vanda-pharmaceuticals-announces-fda-approval-of-bysanti-milsaperidone-for-the-treatment-of-bipolar-i-disorder-and-schizophrenia---a-new-chemical-entity-opening-new-horizons-in-psychiatric-innovation-302693941.html
    outcome: approved
    outcome_date: 2026-02-20
    result: "FDA 승인 (PDUFA 2/21보다 1일 조기). 양극성I·조현병 적응증 신규 화학물질(NCE)."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/vanda-pharmaceuticals-announces-fda-approval-of-bysanti-milsaperidone-for-the-treatment-of-bipolar-i-disorder-and-schizophrenia---a-new-chemical-entity-opening-new-horizons-in-psychiatric-innovation-302693941.html
  - date: 2026-02-24
    ticker: REGN
    event: Dupixent AFRS PDUFA
    type: PDUFA
    company: Regeneron
    drug: Dupixent
    indication: AFRS
    phase: sBLA
    sources:
      - https://investor.regeneron.com/news-releases/news-release-details/dupixentr-dupilumab-approved-us-first-and-only-medicine-allergic/
    outcome: approved
    outcome_date: 2026-02-24
    result: "FDA 승인. 알레르기성 진균성 부비동염(AFRS) 첫 표적 치료제."
    outcome_sources:
      - https://investor.regeneron.com/news-releases/news-release-details/dupixentr-dupilumab-approved-us-first-and-only-medicine-allergic/
  - date: 2026-03-06
    ticker: LNTH
    event: PYLARIFY TruVu PDUFA
    type: PDUFA
    company: Lantheus
    drug: PYLARIFY
    indication: PSMA PET
    phase: sNDA
    sources:
      - https://investor.lantheus.com/news-releases/news-release-details/lantheus-announces-fda-approval-pylarify-truvutm-piflufolastat-f
    outcome: approved
    outcome_date: 2026-03-06
    result: "FDA 승인. PSMA PET 영상 진단 PYLARIFY TruVu 제형."
    outcome_sources:
      - https://investor.lantheus.com/news-releases/news-release-details/lantheus-announces-fda-approval-pylarify-truvutm-piflufolastat-f
  - date: 2026-03-06
    ticker: BMY
    event: Sotyktu PsA PDUFA
    type: PDUFA
    company: Bristol Myers Squibb
    drug: Sotyktu
    indication: Psoriatic Arthritis
    phase: sNDA
    sources:
      - https://news.bms.com/news/corporate-financial/2026/U-S--FDA-Approves-Bristol-Myers-Squibbs-Sotyktu-deucravacitinib-for-the-Treatment-of-Adults-with-Active-Psoriatic-Arthritis/default.aspx
    outcome: approved
    outcome_date: 2026-03-06
    result: "FDA 승인. 활동성 건선성 관절염(PsA) 적응증 확대 (TYK2 억제제)."
    outcome_sources:
      - https://news.bms.com/news/corporate-financial/2026/U-S--FDA-Approves-Bristol-Myers-Squibbs-Sotyktu-deucravacitinib-for-the-Treatment-of-Adults-with-Active-Psoriatic-Arthritis/default.aspx
  - date: 2026-03-20
    ticker: RYTM
    event: Setmelanotide 시상하부 비만 PDUFA
    type: PDUFA
    company: Rhythm
    drug: IMCIVREE
    indication: Hypothalamic Obesity
    phase: sNDA
    sources:
      - https://ir.rhythmtx.com/news-releases/news-release-details/rhythm-pharmaceuticals-announces-fda-approval-of-imcivree-0
    outcome: approved
    outcome_date: 2026-03-19
    result: "FDA 승인 (PDUFA 3/20보다 조기). 시상하부 비만 적응증 확대."
    outcome_sources:
      - https://ir.rhythmtx.com/news-releases/news-release-details/rhythm-pharmaceuticals-announces-fda-approval-of-imcivree-0
  - date: 2026-03-27
    ticker: RCKT
    event: KRESLADI LAD-I PDUFA
    type: PDUFA
    company: Rocket
    drug: KRESLADI
    indication: LAD-I
    phase: BLA
    sources:
      - https://ir.rocketpharma.com/news-releases/news-release-details/rocket-pharmaceuticals-announces-fda-approval-kresladitm
    outcome: approved
    outcome_date: 2026-03-27
    result: "FDA 승인. 중증 백혈구 부착 결핍증 I형(LAD-I) 유전자 치료제."
    outcome_sources:
      - https://ir.rocketpharma.com/news-releases/news-release-details/rocket-pharmaceuticals-announces-fda-approval-kresladitm
  - date: 2026-04-03
    ticker: BIIB
    event: Nusinersen 고용량 SMA PDUFA
    type: PDUFA
    company: Biogen
    drug: Nusinersen
    indication: SMA
    phase: sNDA
    sources:
      - https://investors.biogen.com/news-releases/news-release-details/fda-approves-new-high-dose-regimen-spinrazar-nusinersen-spinal
    outcome: approved
    outcome_date: 2026-03-30
    result: "FDA 승인. SPINRAZA 고용량 요법 — 척수성 근위축증(SMA)."
    outcome_sources:
      - https://investors.biogen.com/news-releases/news-release-details/fda-approves-new-high-dose-regimen-spinrazar-nusinersen-spinal
  - date: 2026-04-01
    ticker: LLY
    event: Foundayo (orforglipron) 비만 NDA PDUFA
    type: PDUFA
    company: Eli Lilly
    drug: Orforglipron (Foundayo)
    indication: Obesity
    phase: NDA
    outcome: approved
    outcome_date: 2026-04-01
    result: "FDA 승인 (CNPV 가속, 유일한 GLP-1 경구제). 4/14 추가 liver/CV 안전성 평가 요구(post-marketing 표준), 4/30 liver failure 1건 보고 — Lilly 5/4 약물 인과관계 없음 평가(11,000명 Ph3서 hepatic signal 없음). 분석가 'one liver case does not make a signal'."
    outcome_sources:
      - https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill
    sources:
      - https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill
      - https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program
      - https://endpoints.news/fda-asks-for-more-data-on-lillys-foundayo-to-assess-heart-liver-risks/
      - https://www.biopharmadive.com/news/fda-foundayo-liver-safety-eli-lilly/817556/
      - https://www.biospace.com/drug-development/foundayos-liver-failure-blip-weighs-down-lilly-shares-but-analysts-unconcerned
      - https://www.statnews.com/2026/05/05/biotech-news-analysts-glossing-over-eli-lilly-liver-case/
  - date: 2026-04-22
    ticker: XENE
    event: Azetukalner X-TOLE2 Phase 3 발표 (AAN)
    type: Conference
    company: Xenon
    drug: Azetukalner
    indication: Focal Seizures
    phase: Phase 3
    sources:
      - https://investor.xenon-pharma.com/news-releases/news-release-details/xenon-presents-azetukalner-phase-3-x-tole2-study-results-and-48
    outcome: met
    outcome_date: 2026-04-22
    result: "1차 EP 충족 (Positive). 발작 53.2% 감소 vs 위약 10.4%."
    outcome_sources:
      - https://investor.xenon-pharma.com/news-releases/news-release-details/xenon-presents-azetukalner-phase-3-x-tole2-study-results-and-48
  - date: 2026-04-22
    ticker: RAPP
    event: RAP-219 AAN 2026 발표 (Positive — 90% median seizure reduction at follow-up weeks 9-12)
    type: Conference
    company: Rapport
    drug: RAP-219
    indication: Epilepsy
    phase: Phase 2
    sources:
      - https://investors.rapportrx.com/news-releases/news-release-details/rapport-therapeutics-present-new-phase-2-treatment-follow-data
  - date: 2026-04-22
    ticker: KYTX
    event: "KYV-101 MG/SPS/MS AAN 발표 (Positive — KYSA-8 SPS: 모든 1차·2차 endpoint 충족, 81% 유지 off immunotherapy)"
    type: Conference
    company: Kyverna
    drug: KYV-101
    indication: Autoimmune Neurology
    phase: Phase 2
    sources:
      - https://ir.kyvernatx.com/news-releases/news-release-details/kyverna-presents-registrational-trial-primary-analysis-miv-cel
  - date: 2026-04-22
    ticker: CAPR
    event: HOPE-3 Phase 3 AAN 발표 (Positive — PUL 1차 endpoint 충족, 심장 섬유화 개선 p=0.022)
    type: Conference
    company: Capricor
    drug: CAP-1002
    indication: DMD
    phase: Phase 3
    sources:
      - https://www.capricor.com/investors/news-events/press-releases/detail/341/capricor-therapeutics-announces-late-breaking-presentation
  - date: 2026-04-30
    ticker: AXSM
    event: AXS-05 알츠하이머 초조 승인됨 (2026-04-30)
    type: PDUFA
    company: Axsome
    drug: AXS-05 (Auvelity)
    indication: AD Agitation
    phase: sNDA
    sources:
      - https://www.globenewswire.com/news-release/2026/04/30/3285345/33090/en/axsome-therapeutics-announces-fda-approval-of-auvelity-dextromethorphan-hbr-and-bupropion-hcl-for-the-treatment-of-agitation-associated-with-dementia-due-to-alzheimer-s-disease.html
  - date: 2026-05-04
    ticker: ABVX
    event: "Obefazimod ABTECT Phase 3 UC DDW 2026 oral 발표 (Positive — HEMI 50mg arm 23~24%, p<0.0001 ABTECT-1·2 모두; 9 abstracts)"
    type: Conference
    company: Abivax
    drug: Obefazimod
    indication: Ulcerative Colitis
    phase: Phase 3
    conferenceId: ddw
    sources:
      - https://ir.abivax.com/news-releases/news-release-details/abivax-present-data-obefazimod-digestive-disease-weekr
      - https://www.globenewswire.com/news-release/2026/04/22/3279387/0/en/Abivax-to-Present-Data-on-Obefazimod-at-Digestive-Disease-Week.html
  - date: 2026-05-05
    ticker: OCUL
    event: "OTX-TKI SOL-1 Phase 3 nAMD ARVO 2026 oral 발표 (Positive — Wk36 vision maintenance 74.1% vs aflibercept 55.8%, P=0.0006; Wk52 65.9% vs 44.2%, P<0.0001; SAE 0건)"
    type: Conference
    company: Ocular Therapeutix
    drug: OTX-TKI (axitinib intravitreal hydrogel)
    indication: Neovascular AMD
    phase: Phase 3
    conferenceId: arvo
    sources:
      - https://www.globenewswire.com/news-release/2026/02/17/3239086/0/en/Ocular-Therapeutix-Reports-Positive-Results-from-Landmark-SOL-1-Phase-3-Superiority-Trial-in-Wet-AMD.html
      - https://www.biospace.com/press-releases/ocular-therapeutix-reports-first-quarter-2026-financial-results-and-business-highlights
      - https://www.globenewswire.com/news-release/2026/04/27/3281480/0/en/ocular-therapeutix-to-participate-in-may-scientific-and-investor-conferences.html
  - date: 2026-05-08
    ticker: ARGX
    event: "VYVGART/Hytrulo 승인됨 (2026-05-08, 2일 조기) — 라벨 확장 모든 serotype gMG (anti-MuSK+, anti-LRP4+, triple seronegative 포함). Phase 3 ADAPT SERON: MG-ADL -3.35 (p=0.0068)"
    type: PDUFA
    company: argenx
    drug: Efgartigimod (VYVGART / VYVGART Hytrulo)
    indication: All-serotype gMG (label expansion)
    phase: sBLA
    sources:
      - https://www.globenewswire.com/news-release/2026/05/08/3291372/0/en/argenx-Announces-U-S-FDA-Approval-Expanding-VYVGART-and-VYVGART-Hytrulo-for-Use-in-All-Adult-Patients-Living-with-gMG.html
      - https://argenx.com/news/2026/press-release-3217457
      - https://argenx.com/news/2026/press-release-3276554.html
  - date: 2026-05-11
    ticker: ABCL
    event: "ABCL635 Phase 1 인터림 (Positive — testosterone 50~75% 감소, 반감기 24일 월 1회 지지; Phase 2 진입 확정)"
    type: Clinical Readout
    company: AbCellera Biologics
    drug: ABCL635
    indication: 폐경기 혈관운동증상 (VMS)
    phase: Phase 1
    trialDesign: "무작위배정·이중맹검·위약대조 SAD/MAD Phase 1. 건강 남성 + 폐경 후 여성, SC 다양한 용량 코호트. Primary: 안전성·내약성 (AE/SAE). Secondary: PK·PD·VMS 빈도·중증도 변화. 결과(Q1 2026 실적콜): 300/600/900 mg SAD 단회 투여 시 testosterone 50~75% 감소(sustained NK3R 길항), 선형 dose-proportional PK, 반감기 24일로 월 1회 투약 지지, SAE·간독성·중증 AE 없음. Phase 2 무작위 이중맹검 위약대조(n=80 폐경 후 여성) 진입 확정"
    targetDisease: "폐경 전후 여성의 열조홍·야간발한. 에스트로겐 결핍 → 시상하부 KNDy 뉴런의 NKB-NK3R 신호 과항진. 미국 중등도-중증 VMS ~600만 명, 비호르몬 first-in-class 항체 기회"
    moa: "Anti-NK3R 완전인간항체. NKB-NK3R 차단 → KNDy 뉴런 정상화 → 열조홍 빈도·중증도 감소. SC 투여, 8-12주 지속 목표"
    sources:
      - https://www.businesswire.com/news/home/20260420968823/en/AbCellera-to-Highlight-Phase-1-Clinical-Data-for-ABCL635-During-Upcoming-First-Quarter-2026-Earnings-Call
      - https://www.businesswire.com/news/home/20260511135503/en/AbCellera-Reports-Q1-2026-Business-Results-Announces-Positive-Interim-Phase-1-Clinical-Data-for-ABCL635
  - date: 2026-05-12
    ticker: SANA
    event: "SG293 in vivo CAR-T NHP ASGCT 2026 oral (Positive — NHP IV 단회 투여 후 말초 B세포 완전 고갈, off-target 없음; FIH 2026년 내)"
    type: Conference
    company: Sana Biotechnology
    drug: SG293 (CD19 in vivo CAR-T)
    indication: B-cell malignancy / autoimmune
    phase: Preclinical
    conferenceId: asgct
    trialDesign: "ASGCT 2026 oral 'Preclinical Data from in vivo CAR-T SG293 Targeting CD19'. Fusogen 탑재 lentiviral vector NHP 단회 IV 투여 → 체내 T cell 직접 transduction → CD19+ B cell 표적·고갈. 결과: 말초 B세포 완전 고갈, 3주 내 림프절 B세포 검출불가·naive 표현형 재출현('B세포 리셋'). off-target 조직(간·심장·생식선) 전달 없음. 경미한 주입 후 증상은 acetaminophen으로 관리. FIH (NHL) 2026년 내 예정"
    targetDisease: "B-cell 악성종양 (DLBCL/CLL/FL) + B-cell 매개 자가면역질환 (SLE 등). 기존 ex vivo CAR-T는 환자별 제조 4-6주 + 비용 $400K+ — in vivo 단회 IV로 접근성 대폭 확대 목표"
    moa: "Hypoimmune fusogen 탑재 lentiviral vector. 체내 T cell에 CD19 CAR 직접 전달 → ex vivo manufacturing 우회, off-the-shelf"
    sources:
      - https://www.globenewswire.com/news-release/2026/04/27/3282052/0/en/Sana-Biotechnology-Announces-Oral-Presentation-Highlighting-Preclinical-Data-from-in-vivo-CAR-T-SG293-at-the-American-Society-of-Gene-Cell-Therapy-ASGCT-2026-Annual-Meeting.html
      - https://www.globenewswire.com/news-release/2026/05/12/3293377/0/en/Sana-Biotechnology-Presents-Preclinical-Data-for-In-Vivo-CAR-T-Cell-Therapy-SG293-Surrogate-Demonstrating-Cell-Specific-Delivery-Potent-CAR-T-Cell-Generation-and-Deep-B-Cell-Deplet.html
  - date: 2026-05-15
    ticker: CADL
    event: "CAN-2409 PrTK03 Phase 3 prostate AUA 2026 plenary (Positive — 58개월 추적 prostate-specific DFS HR 0.61, p=0.0031; BLA Q4 2026 예정)"
    type: Conference
    company: Candel Therapeutics
    drug: CAN-2409 (aglatimagene besadenovec)
    indication: Localized Prostate Cancer
    phase: Phase 3
    conferenceId: aua
    trialDesign: "PrTK03 Phase 3 무작위배정 + EBRT 표준치료 병용 (n=745). 중·고위험 localized prostate cancer. AUA 2026 Plenary oral 5/15 extended follow-up. 58개월 중앙 추적: prostate-specific DFS HR 0.61 (p=0.0031, 39% 개선). 전이까지 시간 HR 0.58 (전체), 중간위험군 HR 0.10 (90% 개선). 전이율 1.6% vs 2.8% (전체), 0.24% vs 2.35% (중간위험). 초기 1차 DFS HR 0.70 (p=0.016)"
    targetDisease: "중·고위험 국소 전립선암 (방사선 병용). 표준 EBRT + ADT 후 5년 생화학적 재발 30~50% — 면역 기전 추가로 미세잔존종양 제거 목표"
    moa: "복제 불가 아데노바이러스 벡터로 HSV-TK 유전자 종양 내 전달 → 발라사이클로비르 prodrug 활성화 → 종양 직접 사멸 + 면역원성 세포 사멸 (in situ tumor vaccine)"
    sources:
      - https://ir.candeltx.com/news-releases/news-release-details/candel-therapeutics-present-new-data-after-extended-follow/
      - https://www.globenewswire.com/news-release/2026/03/09/3251795/0/en/Candel-Therapeutics-To-Present-New-Data-after-Extended-Follow-Up-from-Randomized-Phase-3-Trial-of-Aglatimagene-Besadenovec-in-Localized-Prostate-Cancer-at-the-American-Urological-A.html
  - date: 2026-05-31
    ticker: RVMD
    event: "Daraxonrasib RASolute 302 Phase 3 mPDAC ASCO plenary LBA 발표 (Positive — mOS 13.2 vs 6.7개월 HR 0.40, mPFS 7.2 vs 3.6개월 HR 0.49 p<0.0001; NEJM 동시 게재)"
    type: Conference
    company: Revolution Medicines
    drug: Daraxonrasib (RMC-6236)
    indication: Metastatic Pancreatic Cancer
    phase: Phase 3
    conferenceId: asco
    trialDesign: "RASolute 302 (NCT06625320) 글로벌 무작위배정 open-label Phase 3 (n=460). previously treated KRAS G12 변이 mPDAC 환자 — daraxonrasib 300mg QD 단독 vs 항암화학 표준치료 (irinotecan- 또는 oxaliplatin-based). Primary OS. 사전 topline (NDA 사전 분석): mOS 13.2 vs 6.7개월 (HR 0.40, p<0.0001). ASCO 2026 Plenary LBA confirmatory presentation"
    targetDisease: "전이성 췌장선암 (mPDAC) 2L+. KRAS G12 변이가 약 90% — 1L gemcitabine/FOLFIRINOX 진행 후 표준 2L 옵션 부재. mOS 6개월 미만의 최악 예후 — RAS 직접 표적은 다중 G12 변이 커버하는 첫 옵션"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT06625320
    moa: "RAS(ON) multi-selective 억제제. KRAS G12 활성형(GTP-bound) + cyclophilin A 복합체 직접 결합 → RAS-effector 결합 차단 → MAPK/PI3K 신호 억제 (first-in-class)"
    sources:
      - https://ir.revmed.com/news-releases/news-release-details/revolution-medicines-present-pivotal-phase-3-rasolute-302
      - https://www.globenewswire.com/news-release/2026/04/21/3278211/0/en/Revolution-Medicines-to-Present-Pivotal-Phase-3-RASolute-302-Clinical-Trial-Results-for-Daraxonrasib-in-Previously-Treated-Metastatic-Pancreatic-Cancer-During-a-Plenary-Session-at-.html
      - https://www.globenewswire.com/news-release/2026/05/31/3303919/0/en/revolution-medicines-announces-asco-plenary-presentation-highlighting-unprecedented-results-from-pivotal-phase-3-rasolute-302-clinical-trial-of-daraxonrasib-in-previously-treated-m.html
  - date: 2026-05-31
    ticker: SMMT
    event: "Ivonescimab HARMONi-6 Phase 3 1L sq-NSCLC ASCO plenary LBA 발표 (Positive — mOS 27.9 vs 23.7개월 HR 0.66 p=0.0017, mPFS 11.1 vs 6.9개월 HR 0.60)"
    type: Conference
    company: Summit Therapeutics
    drug: Ivonescimab (SMT112)
    indication: 1L Squamous NSCLC
    phase: Phase 3
    conferenceId: asco
    trialDesign: "HARMONi-6 (NCT05840016) 중국 다기관 무작위 이중맹검 Phase 3 (n=~530, Akeso 후원). 1L 진행성 squamous NSCLC — ivonescimab + carboplatin/paclitaxel vs tislelizumab(PD-1) + carboplatin/paclitaxel. Primary PFS (BICR). 2025-09 topline PFS 우월성 충족. ASCO 2026 Plenary LBA에서 OS 데이터 + 상세 발표"
    targetDisease: "1L 진행성/전이성 편평 비소세포폐암(sq-NSCLC). 미국 신규 NSCLC ~22만명/년 중 squamous 약 25~30%. pembrolizumab + chemo 표준에도 mPFS 6~8개월 한계 — PD-1 단독 대비 PD-1 × VEGF 이중차단 우월성 입증 첫 head-to-head"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05840016
    moa: "PD-1 × VEGF 이중특이항체. PD-1 차단으로 T세포 면역 활성화 + VEGF 차단으로 종양 혈관신생 억제·면역억제 TME 정상화 — 단일 분자로 두 경로 동시 차단"
    sources:
      - https://oncodaily.com/oncolibrary/asco-2026-plenary-session-key-trials
      - https://www.gurufocus.com/news/8806712/positive-outlook-for-summit-therapeutics-smmt-following-asco-plenary-selection
      - https://www.prnewswire.com/news-releases/harmoni-6-demonstrates-significant-overall-survival-benefit-hr0-66-ivonescimab-plus-chemotherapy-superior-to-pd-1-plus-chemotherapy-in-first-line-sq-nsclc-landmark-results-to-be-presented-at-asco-2026-plenary-session-302786433.html
  - date: 2026-06-02
    ticker: COGT
    event: "Bezuclastinib PEAK Phase 3 GIST ASCO oral 발표 (Positive — mPFS 16.5 vs 9.2개월 HR 0.50, ORR 46% vs 26%; sunitinib 병용)"
    type: Conference
    company: Cogent
    drug: Bezuclastinib
    indication: GIST
    phase: Phase 3
    sources:
      - https://www.globenewswire.com/news-release/2026/04/21/3277881/0/en/cogent-biosciences-announces-oral-presentation-of-positive-phase-3-peak-trial-in-gastrointestinal-stromal-tumors-gist-at-the-2026-american-society-of-clinical-oncology-asco-annual-.html
      - https://investors.cogentbio.com/news-releases/news-release-details/cogent-biosciences-reports-positive-results-bezuclastinib-peak
  - date: 2026-06-02
    ticker: INCY
    event: "Tafasitamab frontMIND Phase 3 1L 고위험 DLBCL ASCO oral 발표 (Positive — PFS HR 0.75 p=0.019, 2yr PFS 71.1% vs 62.9%, EFS HR 0.79)"
    type: Conference
    company: Incyte
    drug: Tafasitamab
    indication: DLBCL
    phase: Phase 3
    sources:
      - https://www.businesswire.com/news/home/20260421480376/en/Incyte-Highlights-New-Phase-3-Tafasitamab-Data-at-the-2026-American-Society-of-Clinical-Oncology-ASCO-Annual-Meeting
      - https://investor.incyte.com/news-releases/news-release-details/incyte-highlights-new-phase-3-tafasitamab-data-2026-american
  - date: 2026-06-02
    ticker: IRON
    event: "DISC-0974 RALLY-MF Phase 2 MF 빈혈 ASCO oral 발표 (Positive — nTD Hgb 반응 55%, TD 수혈비의존 64%/50%)"
    type: Conference
    company: Disc Medicine
    drug: DISC-0974
    indication: Myelofibrosis Anemia
    phase: Phase 2
    sources:
      - https://www.globenewswire.com/news-release/2026/04/21/3278118/0/en/Disc-Medicine-Announces-Oral-Presentation-of-Data-from-RALLY-MF-Phase-2-Trial-of-DISC-0974-in-Patients-with-Myelofibrosis-and-Anemia-at-the-American-Society-of-Clinical-Oncology-AS.html
      - https://www.biospace.com/press-releases/disc-medicine-presents-updated-positive-data-from-rally-mf-phase-2-trial-in-patients-with-myelofibrosis-mf-and-anemia-at-the-2026-american-society-of-clinical-oncology-asco-annual-meeting
  - date: 2026-06-29
    ticker: LNTH
    event: LNTH-2501 Ga-68 NET PDUFA
    type: PDUFA
    company: Lantheus
    drug: Ga-68 edotreotide
    indication: NET PET
    phase: NDA
    sources:
      - https://lantheusholdings.gcs-web.com/news-releases/news-release-details/lantheus-announces-three-month-extension-pdufa-date-lnth-2501-ga
    outcome: delayed
    outcome_date: 2026-06-29
    result: "PDUFA 3개월 연장. 제조(CMC) 정보 추가 검토. 효능 이슈 아님."
    outcome_sources:
      - https://lantheusholdings.gcs-web.com/news-releases/news-release-details/lantheus-announces-three-month-extension-pdufa-date-lnth-2501-ga
  - date: 2026-06-30
    ticker: SYRE
    event: SPY002 Part A SKYLINE Phase 2 UC readout (mid-2026, SPY001 Part A 2026-04-13 positive 완료)
    type: Clinical Readout
    company: Spyre
    drug: SPY002
    indication: Ulcerative Colitis
    phase: Phase 2
    sources:
      - https://ir.spyre.com/news-releases/news-release-details/spyre-announces-potential-best-class-spy001-part-induction
  - date: 2026-06-30
    ticker: VRDN
    event: VRDN-003 (elegrobart) REVEAL-2 Phase 3 chronic TED readout (Q2 2026, REVEAL-1 active TED 2026-03 positive 완료)
    type: Clinical Readout
    company: Viridian
    drug: VRDN-003 (elegrobart)
    indication: Chronic TED
    phase: Phase 3
    sources:
      - https://investors.viridiantherapeutics.com/news/news-details/2026/Viridian-Therapeutics-Prepares-for-Transformational-2026/default.aspx
  - date: 2026-06-30
    ticker: WVE
    event: WVE-007 Phase 1 비만 (400mg 코호트 6개월 + 600mg 코호트 3개월 데이터)
    type: Clinical Readout
    company: Wave Life
    drug: WVE-007
    indication: Obesity
    phase: Phase 1
    sources:
      - https://ir.wavelifesciences.com/news-releases/news-release-details/wave-life-sciences-announces-positive-interim-phase-1-data
  - date: 2026-06-30
    ticker: MBX
    event: Canvuparatide Phase 2 1-yr (Q2 2026 학회 발표 예정)
    type: Clinical Readout
    company: MBX
    drug: Canvuparatide
    indication: Hypoparathyroidism
    phase: Phase 2
    sources:
      - https://www.globenewswire.com/news-release/2026/03/09/3251975/0/en/CORRECTING-REPLACING-MBX-Biosciences-Announces-Successful-End-of-Phase-2-FDA-Meeting-and-Provides-Phase-3-Development-Plan-for-Once-Weekly-Canvuparatide-for-Hypoparathyroidism.html
  - date: 2026-06-30
    ticker: EVMN
    event: EVO756 CSU Phase 2 data (Phase 2b topline 상반기 예정)
    type: Clinical Readout
    company: Evommune
    drug: EVO756
    indication: CSU
    phase: Phase 2
    sources:
      - https://ir.evommune.com/news-events/press-releases/detail/118/evommune-reports-third-quarter-2025-financial-results-and-provides-business-update
  - date: 2026-12-31
    ticker: VKTX
    event: VK2735 VANQUISH-1 Phase 3 비만 topline readout (2026H2 예상, 78주 투여)
    type: Clinical Readout
    company: Viking
    drug: VK2735
    indication: Obesity
    phase: Phase 3
    sources:
      - https://ir.vikingtherapeutics.com/2025-11-19-Viking-Therapeutics-Announces-Completion-of-Enrollment-in-Phase-3-VANQUISH-1-Trial-of-VK2735
  - date: 2026-03-25
    ticker: DNLI
    event: AVLAYAH (Tividenofusp) Hunter syndrome 승인됨 (2026-03-25, PDUFA 조기)
    type: PDUFA
    company: Denali
    drug: Tividenofusp
    indication: Hunter Syndrome
    phase: BLA
    sources:
      - https://investors.denalitherapeutics.com/news-releases/news-release-details/denali-therapeutics-announces-us-fda-approval-avlayahtm
  - date: 2026-09-18
    ticker: NUVL
    event: Zidesamtinib ROS1 NSCLC PDUFA (NDA 2025-11 FDA accepted, PDUFA 2026-09-18)
    type: PDUFA
    company: Nuvalent
    drug: Zidesamtinib
    indication: ROS1 NSCLC
    phase: NDA
    sources:
      - https://investors.nuvalent.com/2025-11-19-Nuvalent-Announces-FDA-Acceptance-of-New-Drug-Application-for-Zidesamtinib-for-the-Treatment-of-TKI-Pre-treated-Patients-with-Advanced-ROS1-positive-NSCLC
  - date: 2026-06-30
    ticker: SION
    event: CFTR stabilizer Phase 2 (+ Trikafta) (PreciSION CF 등록 완료 2026-04-27, 여름 데이터 예정)
    type: Clinical Readout
    company: Sionna
    drug: SION-719
    indication: CF
    phase: Phase 2
    sources:
      - https://www.globenewswire.com/news-release/2026/04/27/3281460/0/en/Sionna-Therapeutics-Completes-Enrollment-in-PreciSION-CF-Phase-2a-Trial-Evaluating-NBD1-Stabilizer-SION-719-Added-to-Standard-of-Care-in-Participants-with-Cystic-Fibrosis.html
  - date: 2026-06-30
    ticker: IDYA
    event: Darovasertib Phase 3 data (OptimUM-02 완전 데이터 ASCO 2026 LBA 발표 예정 — 2026-05-30)
    type: Clinical Readout
    company: IDEAYA
    drug: Darovasertib
    indication: MUM
    phase: Phase 3
    sources:
      - https://media.ideayabio.com/2026-04-21-IDEAYA-Biosciences-Announces-Late-Breaking-Abstract-Oral-Presentation-at-ASCO-2026-to-Provide-Complete-Data-from-Phase-2-3-Registrational-Trial-OptimUM-02-of-Darovasertib-in-Combination-with-Crizotinib-in-1L-HLA-A2-Negative-Metastatic-Uveal-Mel
  - date: 2026-06-30
    ticker: IONS
    event: Olezarsen 중증 HTG sNDA PDUFA
    type: PDUFA
    company: Ionis
    drug: Olezarsen
    indication: Severe Hypertriglyceridemia
    phase: sNDA
    sources:
      - https://ir.ionis.com/news-releases/news-release-details/olezarsen-snda-accepted-fda-priority-review-treatment-severe
      - https://www.businesswire.com/news/home/20260226109569/en/Olezarsen-sNDA-accepted-by-the-FDA-for-Priority-Review-for-the-treatment-of-severe-hypertriglyceridemia-sHTG
  - date: 2026-07-07
    ticker: VERA
    event: Atacicept IgAN BLA PDUFA (가속승인)
    type: PDUFA
    company: Vera Therapeutics
    drug: Atacicept
    indication: IgA Nephropathy
    phase: BLA
    sources:
      - https://ir.veratx.com/news-releases/news-release-details/vera-therapeutics-announces-us-fda-granted-priority-review
      - https://www.globenewswire.com/news-release/2026/02/26/3245477/0/en/Vera-Therapeutics-Provides-Business-Update-and-Reports-Full-Year-2025-Financial-Results.html
  - date: 2026-08-22
    ticker: CAPR
    event: Deramiocel HOPE-3 DMD BLA PDUFA
    type: PDUFA
    company: Capricor
    drug: Deramiocel (CAP-1002)
    indication: DMD
    phase: BLA
    sources:
      - https://www.capricor.com/investors/news-events/press-releases/detail/341/capricor-therapeutics-announces-late-breaking-presentation
      - https://www.biospace.com/press-releases/capricor-therapeutics-announces-late-breaking-presentation-of-hope-3-phase-3-results-at-the-american-academy-of-neurology-2026-annual-meeting
  - date: 2026-08-25
    ticker: JAZZ
    event: Ziihera HER2+ 1L GEA sBLA PDUFA
    type: PDUFA
    company: Jazz Pharmaceuticals
    drug: Zanidatamab (Ziihera)
    indication: HER2+ 1L Gastroesophageal Adenocarcinoma
    phase: sBLA
    sources:
      - https://www.prnewswire.com/news-releases/jazz-pharmaceuticals-announces-fda-acceptance-and-priority-review-of-supplemental-biologics-license-application-for-ziihera-zanidatamab-hrii-combinations-in-first-line-her2-locally-advanced-or-metastatic-gea-302753741.html
  - date: 2026-09-30
    ticker: ARWR
    event: Plozasiran Phase 3 severe HTG (SHASTA-3/4, MUIR-3 완료 mid-2026, sNDA 연말 예정)
    type: Clinical Readout
    company: Arrowhead
    drug: Plozasiran
    indication: Severe HTG
    phase: Phase 3
    sources:
      - https://ir.arrowheadpharma.com/news-releases/news-release-details/arrowhead-pharmaceuticals-receives-fda-breakthrough-therapy-0
  - date: 2026-09-30
    ticker: AMLX
    event: Avexitide Phase 3 (PBH) (LUCIDITY 등록 완료 2026-03, topline Q3 2026 예정)
    type: Clinical Readout
    company: Amylyx
    drug: Avexitide
    indication: PBH
    phase: Phase 3
    sources:
      - https://www.amylyx.com/news/amylyx-pharmaceuticals-announces-completion-of-enrollment-in-pivotal-phase-3-lucidity-clinical-trial-of-avexitide-in-post-bariatric-hypoglycemia
  - date: 2026-09-30
    ticker: AMGN
    event: MariTide Phase 3 비만 readout (MARITIME-1/2 실제 readout 2027 예상 — interim 진행상황 업데이트)
    type: Clinical Readout
    company: Amgen
    drug: MariTide
    indication: Obesity
    phase: Phase 3
    sources:
      - https://www.amgen.com/stories/2025/06/inside-amgens-phase-3-maritime-program---advancing-the-future-of-obesity-care
  - date: 2026-12-31
    ticker: SYRE
    event: SKYWAY basket (RA/PsA/axSpA) (RA Q3 2026 가속, PsA/axSpA Q4 2026 예정)
    type: Clinical Readout
    company: Spyre
    drug: SPY002/003
    indication: Autoimmune
    phase: Phase 2
    sources:
      - https://www.globenewswire.com/news-release/2026/03/16/3256214/0/en/Spyre-Announces-Acceleration-of-Expected-Topline-Readout-of-SKYWAY-Rheumatoid-Arthritis-Sub-study-to-Q3-2026.html
  - date: 2026-12-31
    ticker: ANAB
    event: ANB033 celiac Phase 2 (Q4 2026 topline 예정)
    type: Clinical Readout
    company: AnaptysBio
    drug: ANB033
    indication: Celiac
    phase: Phase 2
    sources:
      - https://ir.anaptysbio.com/news-releases/news-release-details/anaptys-provides-update-business-separation-and-announces-fourth/
  - date: 2026-12-31
    ticker: MBX
    event: MBX 4291 Phase 1 12-wk (MAD 12주 데이터 Q4 2026 예정)
    type: Clinical Readout
    company: MBX
    drug: MBX 4291
    indication: Obesity
    phase: Phase 1
    sources:
      - https://www.globenewswire.com/news-release/2026/03/12/3254562/0/en/MBX-Biosciences-Reports-Fourth-Quarter-and-Full-Year-2025-Financial-Results-and-Recent-Corporate-Highlights.html
  - date: 2026-12-31
    ticker: ALMS
    event: ESK-001 Phase 3 psoriasis (ONWARD topline 2026-01 Positive — PASI75 74%, sPGA0/1 59%; NDA 하반기 제출 예정)
    type: Clinical Readout
    company: Alumis
    drug: ESK-001
    indication: Psoriasis
    phase: Phase 3
    sources:
      - https://investors.alumis.com/news-releases/news-release-details/alumis-envudeucitinib-delivers-leading-skin-clearance-among-next
  - date: 2026-12-31
    ticker: STOK
    event: Zorevunersen Dravet Phase 3 (EMPEROR 등록 Q2 2026 완료 예정, readout mid-2027 예상)
    type: Clinical Readout
    company: Stoke
    drug: Zorevunersen
    indication: Dravet
    phase: Phase 3
    sources:
      - https://investor.stoketherapeutics.com/news-releases/news-release-details/stoke-therapeutics-announces-updates-timelines-completion/
  - date: 2026-04-01
    ticker: COGT
    event: Bezuclastinib GIST NDA 제출 (RTOR, PEAK Phase 3 데이터)
    type: Regulatory
    company: Cogent
    drug: Bezuclastinib
    indication: Imatinib-Resistant GIST
    phase: NDA
    trialDesign: "PEAK Phase 3 (bezuclastinib + sunitinib vs sunitinib): mPFS 16.5 vs 9.2개월, ORR 46% vs 26% — KIT exon 9/11 변이 GIST 2L+"
    targetDisease: "Imatinib 내성 진행성/전이성 GIST. KIT/PDGFRA 활성형 변이가 종양 성장 유발 — 기존 sunitinib·regorafenib 반응 짧음."
    moa: "KIT/PDGFRA 선택적 억제, exon 9·11 변이 및 이마티닙 내성 변이까지 커버"
    sources:
      - https://investors.cogentbio.com/news-releases/news-release-details/cogent-biosciences-announces-submission-new-drug-application-0
  - date: 2026-04-07
    ticker: NUVL
    event: Neladalkib ALK+ NSCLC NDA 제출 (ALKOVE-1 데이터)
    type: Regulatory
    company: Nuvalent
    drug: Neladalkib
    indication: TKI Pre-treated ALK+ NSCLC
    phase: NDA
    trialDesign: "ALKOVE-1 Phase 1/2 global (n=253): TKI pre-treated ALK+ NSCLC ORR 31% (lorlatinib 경험군), 46% (lorlatinib naive)"
    targetDisease: "Advanced ALK-positive NSCLC. 1·2세대 TKI 후 lorlatinib 내성 변이(G1202R 등) 출현 시 표준치료 한계."
    moa: "ALK 선택적, TRK-sparing 3세대 TKI. 뇌전이 침투 + 내성 변이 커버"
    sources:
      - https://investors.nuvalent.com/2026-04-07-Nuvalent-Announces-Submission-of-New-Drug-Application-to-FDA-for-Neladalkib-in-TKI-Pre-treated-Advanced-ALK-positive-NSCLC
      - https://www.prnewswire.com/news-releases/nuvalent-announces-submission-of-new-drug-application-to-fda-for-neladalkib-in-tki-pre-treated-advanced-alk-positive-nsclc-302735124.html
  - date: 2026-04-30
    ticker: RVMD
    event: Daraxonrasib FDA Expanded Access 승인 (NDA 제출 ASCO 후 NPV 통해 진행 예정)
    type: Regulatory
    company: Revolution Medicines
    drug: Daraxonrasib (RMC-6236)
    indication: Previously Treated Metastatic PDAC
    phase: Pre-NDA
    trialDesign: "RASolute 302 Phase 3: mOS 13.2 vs 6.7개월 (HR 0.40, p<0.0001) vs 화학요법 대조 — KRAS G12 변이 mPDAC 2L+"
    targetDisease: "전이성 췌장선암 (KRAS G12 변이). 1L gemcitabine/FOLFIRINOX 후 표준 2L 치료 부재."
    moa: "RAS(ON) multi-selective inhibitor. KRAS G12 활성형(GTP-bound) 직접 결합 차단"
    sources:
      - https://ir.revmed.com/news-releases/news-release-details/revolution-medicines-statement-fda-expanded-access-authorization
  - date: 2026-05-01
    ticker: ARVN
    event: VEPPANU (vepdegestrant) FDA 승인됨 (PDUFA 6/5보다 35일 조기, 세계 첫 PROTAC 신약)
    type: PDUFA
    company: Arvinas
    drug: Vepdegestrant (VEPPANU)
    indication: ESR1m ER+/HER2- Advanced Breast Cancer
    phase: NDA
    trialDesign: "VERITAC-2 Phase 3 (vepdegestrant vs fulvestrant). ESR1m 서브그룹: PFS HR 0.57, mPFS 5.0 vs 2.1개월"
    targetDisease: "ER+/HER2- 전이성 유방암. CDK4/6i + AI 후 ESR1 변이로 fulvestrant 내성 출현 — 기존 SERD 효과 제한적."
    moa: "PROTAC ER 분해제. ERα 단백질을 ubiquitin-proteasome 경로로 직접 분해 (first-in-class)"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/01/3286140/0/en/Arvinas-Announces-FDA-Approval-of-VEPPANU-vepdegestrant-for-the-Treatment-of-ESR1m-ER-HER2-Advanced-Breast-Cancer.html
  - date: 2026-05-13
    ticker: DYN
    event: FORCE™ 플랫폼 MAPT CNS NHP 데이터 ASGCT 2026 oral (preclinical)
    type: Conference
    company: Dyne Therapeutics
    drug: FORCE™ MAPT Conjugate
    indication: Tauopathy (AD / PSP)
    phase: Preclinical
    conferenceId: asgct
    trialDesign: "NHP + 마우스 preclinical. TfR1 표적 Fab-올리고뉴클레오타이드 SC 투여 → CNS MAPT mRNA ~75% knockdown"
    targetDisease: "타우병증 (알츠하이머·진행성 핵상마비). 신경세포내 비정상 타우 응집이 시냅스 손실·인지저하 유발."
    moa: "TfR1-매개 BBB 통과, CNS MAPT(타우) mRNA silencing"
    sources:
      - https://www.globenewswire.com/news-release/2026/04/27/3282066/0/en/Dyne-Therapeutics-Announces-Upcoming-Presentation-Highlighting-Robust-CNS-Activity-in-Nonhuman-Primates-with-its-FORCE-Platform-at-2026-ASGCT-Annual-Meeting.html
  - date: 2026-05-29
    ticker: NUVL
    event: Neladalkib ALKOVE-1 Phase 2 ASCO 2026 oral (#8503, pivotal data)
    type: Conference
    company: Nuvalent
    drug: Neladalkib
    indication: TKI Pre-treated ALK+ NSCLC
    phase: Phase 1/2
    conferenceId: asco
    trialDesign: "ALKOVE-1 global Phase 1/2 (n=253): primary ORR by BICR. TKI-naive 코호트 preliminary 데이터 동시 발표"
    targetDisease: "Advanced ALK+ NSCLC. 1·2세대 TKI 후 lorlatinib 내성 변이(G1202R) 출현 시 표준치료 한계."
    moa: "ALK 선택적, TRK-sparing 3세대 TKI. 뇌전이 침투 + 내성 변이 커버"
    sources:
      - https://www.prnewswire.com/news-releases/nuvalent-to-present-pivotal-data-from-alkove-1-trial-of-neladalkib-in-tki-pre-treated-advanced-alk-positive-nsclc-at-the-2026-american-society-of-clinical-oncology-annual-meeting-302748865.html
  - date: 2026-05-31
    ticker: JNJ
    event: "PROTEUS Apalutamide Phase 3 final analysis ASCO 2026 Plenary LBA1 (Positive — pCR/MRD 8.9% vs 1.0%, MFS HR 0.80, EFS HR 0.71)"
    type: Conference
    company: Johnson & Johnson
    drug: Apalutamide (ERLEADA)
    indication: High-Risk Localized / Locally Advanced Prostate Cancer (perioperative)
    phase: Phase 3
    conferenceId: asco
    trialDesign: "PROTEUS Phase 3 무작위 위약대조: 수술 전후 apalutamide + ADT vs 위약 + ADT. 1차 endpoint rPFS/EFS, final analysis"
    targetDisease: "고위험 국소·국소진행 전립선암. 근치적 전립선절제술 후 5년 내 생화학적 재발 30~50% — 표준요법 한계."
    moa: "AR antagonist (2세대). 근치 수술 전후(neoadjuvant + adjuvant) ADT 병용으로 미세잔존 종양 제거 → 재발 위험 감소"
    sources:
      - https://www.jnj.com/media-center/press-releases/johnson-johnson-ushers-in-the-next-wave-of-innovation-in-cancer-care-with-more-than-20-clinical-and-real-world-studies-at-asco-2026
      - https://www.globenewswire.com/news-release/2026/05/31/3303921/0/en/Johnson-Johnson-s-Phase-3-prostate-cancer-study-shows-ERLEADA-apalutamide-before-and-after-surgery-significantly-reduces-risk-of-metastasis-or-death-versus-hormone-therapy-alone-po.html
      - https://oncodaily.com/oncolibrary/asco-2026-plenary-session-key-trials
  - date: 2026-06-02
    ticker: CELC
    event: Gedatolisib VIKTORIA-1 PIK3CA mutant Phase 3 ASCO 2026 LBA oral (LBA1008)
    type: Conference
    company: Celcuity
    drug: Gedatolisib
    indication: PIK3CA Mutant HR+/HER2- Advanced Breast Cancer
    phase: Phase 3
    conferenceId: asco
    trialDesign: "VIKTORIA-1 PIK3CA 변이 코호트: gedatolisib + fulvestrant ± palbociclib vs alpelisib + fulvestrant. 2026-05-01 positive topline 발표 → ASCO LBA1008 상세"
    targetDisease: "PIK3CA 변이 HR+/HER2- 전이성 유방암. CDK4/6i + AI 후 표준 alpelisib + fulvestrant 효과 제한적."
    moa: "Pan-Class I PI3K + mTOR 이중 억제제. PI3K/AKT/mTOR 과활성 종양에서 세포증식 차단"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/01/3286249/0/en/Celcuity-s-Phase-3-VIKTORIA-1-Trial-Achieves-Primary-Endpoint-With-Clinically-Meaningful-Improvement-in-Progression-Free-Survival-in-PIK3CA-Mutant-Cohort.html
  - date: 2026-06-30
    ticker: ABVX
    event: Obefazimod ABTECT Maintenance Phase 3 (44주) topline readout (Q2 2026 말 예정)
    type: Clinical Readout
    company: Abivax
    drug: Obefazimod
    indication: Ulcerative Colitis
    phase: Phase 3
    trialDesign: "ABTECT-UC Maintenance (ABX464-107): 유도 반응자 678명 무작위배정, obefazimod 50mg QD vs 위약 44주 이중맹검 유지"
    targetDisease: "중등도-중증 활동성 궤양성 대장염. ABTECT-1/2 유도 임상반응 달성자 대상 유지 관해율 (modified Mayo Score)."
    priorTrialUrl: https://ir.abivax.com/news-releases/news-release-details/abivax-announces-positive-phase-3-results-both-abtect-8-week/
    moa: "miR-124 발현 증강 → M2 대식세포 분극화 + Th17/Th1 억제 → 장점막 염증 완화 (first-in-class 경구)"
    sources:
      - https://ir.abivax.com/news-releases/news-release-details/abivax-provides-2026-corporate-outlook/
  - date: 2026-06-30
    ticker: VRDN
    event: Veligrotug (VRDN-001) TED BLA PDUFA (active + chronic, IV IGF-1R 항체)
    type: PDUFA
    company: Viridian
    drug: Veligrotug (VRDN-001)
    indication: Thyroid Eye Disease (active + chronic)
    phase: BLA
    trialDesign: "THRIVE (active TED) + THRIVE-2 (chronic TED) Phase 3 모두 primary/secondary endpoint 충족. Priority Review + BTD 지정"
    targetDisease: "갑상선안병증(TED). 자가면역 IGF-1R 활성화로 안와 섬유모세포 증식 → 안구돌출·복시·시신경 압박."
    moa: "IV 항-IGF-1R 단클론항체. 안와 섬유모세포 IGF-1R 신호 차단 → 염증·돌출·복시 감소"
    sources:
      - https://investors.viridiantherapeutics.com/news/news-details/2025/Viridian-Therapeutics-Announces-BLA-Acceptance-and-Priority-Review-for-Veligrotug-for-the-Treatment-of-Thyroid-Eye-Disease/default.aspx
  - date: 2026-07-17
    ticker: CELC
    event: Gedatolisib NDA PDUFA (PIK3CA wild-type HR+/HER2- 유방암, RTOR + Priority Review)
    type: PDUFA
    company: Celcuity
    drug: Gedatolisib
    indication: PIK3CA Wild-Type HR+/HER2- Advanced Breast Cancer
    phase: NDA
    trialDesign: "VIKTORIA-1 PIK3CA WT 코호트: gedatolisib + palbociclib + fulvestrant vs 대조. mPFS 16.6 vs 1.9개월 (HR 0.14)"
    targetDisease: "PIK3CA WT HR+/HER2- 전이성 유방암 (전체 HR+ 유방암 ~60%). CDK4/6i + AI 후 표준 fulvestrant 단독 효과 제한적."
    moa: "Pan-Class I PI3K + mTOR 이중 억제제. PI3K WT에서도 PI3K/AKT/mTOR 신호 차단 → CDK4/6i 내성 극복"
    sources:
      - https://www.globenewswire.com/news-release/2026/01/20/3221601/0/en/Celcuity-Announces-FDA-Acceptance-of-New-Drug-Application-for-Gedatolisib-in-HR-HER2-PIK3CA-Wild-Type-Advanced-Breast-Cancer.html
  - date: 2026-09-30
    ticker: ARGX
    event: VYVGART 안면 MG (oMG) sBLA 제출 예정 (Q3 2026, ADAPT OCULUS Phase 3 positive)
    type: Regulatory
    company: argenx
    drug: Efgartigimod (VYVGART)
    indication: Ocular Myasthenia Gravis
    phase: sBLA
    trialDesign: "ADAPT OCULUS Phase 3: primary endpoint met (p=0.012). Mean MGII PRO ocular score 4.04 vs 1.99 placebo at Wk4"
    targetDisease: "안면 중증근무력증 (oMG). 자가항체(anti-AChR)가 신경근접합부 차단 → 안구운동 마비·복시·안검하수."
    priorTrialUrl: https://www.globenewswire.com/news-release/2026/02/26/3245183/0/en/argenx-Announces-Positive-Topline-Results-from-Phase-3-ADAPT-OCULUS-Trial-of-VYVGART-in-Ocular-Myasthenia-Gravis.html
    moa: "FcRn 길항제. IgG(anti-AChR) 재순환 차단 → 자가항체 감소 → 신경근접합부 기능 회복"
    sources:
      - https://www.globenewswire.com/news-release/2026/02/26/3245183/0/en/argenx-Announces-Positive-Topline-Results-from-Phase-3-ADAPT-OCULUS-Trial-of-VYVGART-in-Ocular-Myasthenia-Gravis.html
  - date: 2026-11-14
    ticker: SMMT
    event: Ivonescimab HARMONi BLA PDUFA (2L+ EGFRm NSCLC post-TKI, 화학요법 병용)
    type: PDUFA
    company: Summit Therapeutics
    drug: Ivonescimab (SMT112)
    indication: 2L+ EGFRm Non-Squamous NSCLC post-EGFR TKI
    phase: BLA
    trialDesign: "HARMONi Phase 3: ivonescimab + chemo vs placebo + chemo. EGFR 변이 진행성 비편평 NSCLC 3세대 TKI 진행 후"
    targetDisease: "EGFR 변이 NSCLC 2L+. 3세대 TKI(osimertinib) 진행 후 표준 platinum-pemetrexed 효과 제한적."
    moa: "PD-1 × VEGF 이중특이항체. EGFR TKI 내성 후 종양미세환경 면역활성화 + 혈관신생 억제 동시"
    sources:
      - https://smmttx.com/news/press-releases/news-details/2026/Summit-Therapeutics-Announces-U-S--FDA-Acceptance-of-Biologics-License-Application-BLA-Seeking-Approval-for-Ivonescimab-in-Combination-with-Chemotherapy-in-Treatment-of-Patients-with-EGFRm-NSCLC-Post-TKI-Therapy/default.aspx
  - date: 2026-05-18
    ticker: INSM
    event: "ARIKAYCE ENCORE Phase 3b ATS 2026 late-breaker poster (Positive — 6개월 배양음전 87.8% vs 57.0%, p<0.0001; sNDA 2H 2026 제출 예정)"
    type: Conference
    company: Insmed
    drug: ARIKAYCE (amikacin liposome inhalation suspension)
    indication: Newly Diagnosed MAC Lung Disease
    phase: Phase 3
    conferenceId: ats
    trialDesign: "ENCORE Phase 3b 무작위 위약대조: ARIKAYCE + 다제요법(azithromycin + ethambutol) QD vs 위약 + 다제요법 — 신규 진단 항생제 무경험 MAC 폐감염 성인. 6개월 음전 87.8% vs 57.0% (p<0.0001), 13개월 82.4% vs 55.6%, 15개월 durable 76.2% vs 47.6% (모두 p<0.0001). 음전 중앙 2개월 vs 3개월 (HR 2.03). 호흡기증상점수 Month 13 +3.11점 (p=0.0299). ATS 2026 Poster B45 (5/18). sNDA 미국+일본 PMDA 2H 2026 제출 계획"
    targetDisease: "Mycobacterium avium complex(MAC) 폐감염. 표준 다제요법(macrolide+ethambutol±rifamycin)으로 음전 달성률 제한적 — ARIKAYCE 1차치료 효능 입증 목적"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04677543
    moa: "Liposomal amikacin 흡입제. 폐 대식세포 내 MAC에 직접 약물 전달 → 음전율 향상"
    sources:
      - https://www.prnewswire.com/news-releases/insmed-to-present-data-across-its-respiratory-portfolio-including-late-breaking-arikayce-results-from-phase-3b-encore-study-at-the-american-thoracic-society-international-conference-2026-302760845.html
  - date: 2026-05-18
    ticker: TRVI
    event: Haduvio (nalbuphine ER) CORAL Phase 2b IPF chronic cough ATS 2026 oral (subgroup analyses)
    type: Conference
    company: Trevi Therapeutics
    drug: Haduvio (nalbuphine ER)
    indication: Idiopathic Pulmonary Fibrosis Chronic Cough
    phase: Phase 2
    conferenceId: ats
    trialDesign: "CORAL Phase 2b 무작위 이중맹검 위약대조 (n=165, 1:1:1:1): nalbuphine ER 27/54/108 mg BID vs 위약 6주. 2025-06 topline 24h 기침빈도 60.2%/53.4%/47.9% 감소 (vs 위약 16.9%, p<0.0001). ATS는 1차/서브그룹 분석"
    targetDisease: "특발성 폐섬유증(IPF) 만성 기침. 환자 80% 이상 발생, 삶의 질 저하 — 기존 nintedanib/pirfenidone로 미해결"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT06058923
    moa: "Mu-opioid 길항/kappa-opioid 작용 이중작용. 중추·말초 기침 반사 억제"
    sources:
      - https://www.globenewswire.com/news-release/2026/04/30/3285477/0/en/Trevi-Therapeutics-Announces-Oral-Presentation-and-Multiple-Posters-Accepted-at-the-American-Thoracic-Society-ATS-2026-International-Conference.html
  - date: 2026-08-24
    ticker: BIIB
    event: "LEQEMBI IQLIK SC starting dose sBLA PDUFA (주 1회 자가주사 starting dose 500mg, Priority Review) — 2026-05-08 FDA가 3개월 연장 (major amendment 처리, 5/24 → 8/24). FDA가 승인 가능성 우려는 없다고 명시"
    type: PDUFA
    company: Biogen
    drug: Lecanemab-irmb (LEQEMBI IQLIK)
    indication: Early Alzheimer's Disease
    phase: sBLA
    trialDesign: "Clarity AD Phase 3 IV → SC bridge: PK·PD biocomparability 데이터 기반 sBLA. 500mg(2x250mg) 주 1회 SC autoinjector starting dose 18개월 후 360mg 유지로 전환"
    targetDisease: "조기 알츠하이머병(MCI ~ mild dementia, 아밀로이드 양성). 현재 IV 격주 투여 부담 → SC 주 1회 자가주사 전환 시 처치 접근성 대폭 향상"
    moa: "항-아밀로이드β protofibril 모노클로널 항체. 뇌 아밀로이드 플라크 제거로 인지저하 진행 둔화"
    sources:
      - https://investors.biogen.com/news-releases/news-release-details/fda-accepts-leqembir-iqliktm-lecanemab-irmb-supplemental
      - https://www.eisai.com/news/2026/news202605.html
  - date: 2026-05-27
    ticker: MDGL
    event: "Rezdiffra (resmetirom) EASL 2026 발표 (MetALD MASH resolution 29%/35% ≈ NASH; 보상성 간경변 2yr 섬유화·문맥압 개선)"
    type: Conference
    company: Madrigal Pharmaceuticals
    drug: Rezdiffra (resmetirom)
    indication: MASH / MetALD
    phase: Phase 3
    conferenceId: easl
    trialDesign: "EASL Congress 2026 Barcelona (5/27-30): late-breaking AI 기반 항섬유화 effect 분석 + MAESTRO-NASH 3yr NIT·삶의질·MetALD 신규 분석 등 10개 abstract"
    targetDisease: "MASH(metabolic dysfunction-associated steatohepatitis). 미국 ~660만명 중 15% 진행성 섬유화 — 첫 FDA 승인약물(2024) Rezdiffra의 장기 효능·신적응증(MetALD) 확장 증거"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT03900429
    moa: "THR-β 선택적 작용제. 간 갑상선호르몬 신호 활성화 → 지방산화·콜레스테롤 대사 개선 → MASH 섬유화 역전"
    sources:
      - https://ir.madrigalpharma.com/news-releases/news-release-details/madrigal-pharmaceuticals-announces-new-data-phase-3-maestro-nash
  - date: 2026-05-30
    ticker: REPL
    event: "RP1 + nivolumab IGNYTE 3yr landmark OS ASCO 2026 oral (Positive — mOS 32.9mo, 3yr OS 47.8%/반응자 83.5%, ORR 33.6%, mDOR 24.8mo)"
    type: Conference
    company: Replimune
    drug: RP1 (vusolimogene oderparepvec) + nivolumab
    indication: Anti-PD1 Failed Advanced Melanoma
    phase: Phase 1/2
    conferenceId: asco
    trialDesign: "IGNYTE Phase 1/2: PD-1 실패 melanoma 코호트 RP1 IT + nivolumab IV. 3-year landmark OS analysis — Rapid Oral Abstract Session for Melanoma (5/30). 5/31 RP2 first-in-human oral 동시 진행"
    targetDisease: "anti-PD-1 실패 진행성 melanoma. 표준치료 부재 — 2L 옵션 제한적. 2025-07 BLA CRL 후 IGNYTE-3 confirmatory Phase 3 진행 중"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT03767348
    moa: "HSV-1 기반 oncolytic virus (GM-CSF + GALV-GP R- 발현). 종양 직접 용해 + tumor antigen presentation → 면역체크포인트 시너지"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/30/3303875/0/en/Replimune-Presents-3-Year-Landmark-Overall-Survival-Analysis-from-IGNYTE-Clinical-Trial-During-Oral-Presentation-at-the-2026-American-Society-of-Clinical-Oncology-Annual-Meeting.html
  - date: 2026-05-31
    ticker: LLY
    event: Selpercatinib LIBRETTO-432 Phase 3 ASCO 2026 Plenary LBA3 (RET+ NSCLC adjuvant, EFS primary endpoint met)
    type: Conference
    company: Eli Lilly
    drug: Selpercatinib (Retevmo)
    indication: Stage IB-IIIA RET fusion-positive NSCLC (adjuvant)
    phase: Phase 3
    conferenceId: asco
    trialDesign: "LIBRETTO-432 글로벌 다기관 무작위배정 이중맹검 placebo 대조 (n=151): RET+ NSCLC 절제 후 selpercatinib vs 위약. Primary EFS (stage II-IIIA), 2026-02 topline highly significant EFS, OS trend favorable but immature"
    targetDisease: "절제 가능한 RET fusion-positive 비소세포폐암 (stage IB-IIIA). adjuvant osimertinib(EGFR), alectinib(ALK)에 이어 RET subtype 첫 adjuvant TKI 가능성"
    moa: "RET 선택적 TKI. RET fusion 종양세포 활성형 RET 키나아제 차단으로 미세잔존 종양 제거"
    sources:
      - https://investor.lilly.com/news-releases/news-release-details/lillys-retevmo-selpercatinib-delivers-substantial-event-free
      - https://oncodaily.com/oncolibrary/asco-2026-plenary-session-key-trials
  - date: 2026-06-01
    ticker: IMNM
    event: Varegacestat RINGSIDE Phase 3 desmoid ASCO 2026 oral (PFS HR 0.16, NDA 2026-04-29 제출됨)
    type: Conference
    company: Immunome
    drug: Varegacestat
    indication: Progressing Desmoid Tumors (adults)
    phase: Phase 3
    conferenceId: asco
    trialDesign: "RINGSIDE 글로벌 무작위배정 이중맹검 placebo 대조 (n=156): varegacestat 1.2mg QD vs 위약. Primary PFS HR 0.16 (95% CI 0.071-0.375, p<0.0001), ORR 56% vs 9%. NDA 2026-04-29 FDA 제출"
    targetDisease: "진행성 desmoid tumor (성인). 양성이지만 국소침습성, 절제 불가/재발 환자 표준치료 부재 — sorafenib·nirogacestat 외 옵션 제한적"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04871282
    moa: "경구 γ-secretase 저해제. Notch 신호 차단으로 desmoid 종양세포 증식·생존 억제"
    sources:
      - https://investors.immunome.com/immunome-announces-oral-presentation-of-phase-3-ringside-data-at-2026-asco-annual-meeting/
      - https://www.businesswire.com/news/home/20260429083050/en/Immunome-Announces-Submission-of-New-Drug-Application-to-U.S.-FDA-for-Varegacestat-for-the-Treatment-of-Adults-with-Desmoid-Tumors
  - date: 2026-06-02
    ticker: KPTI
    event: Selinexor + ruxolitinib SENTRY Phase 3 frontline JAKi-naive MF ASCO 2026 LBA oral (SVR35 50% vs 28%)
    type: Conference
    company: Karyopharm Therapeutics
    drug: Selinexor (XPOVIO)
    indication: Frontline JAKi-naive Myelofibrosis
    phase: Phase 3
    conferenceId: asco
    trialDesign: "SENTRY Phase 3 무작위 이중맹검 위약대조 (n=353, 1:1): selinexor 60mg QW + ruxolitinib vs placebo + ruxolitinib — frontline JAKi-naive MF. 2026-03 topline SVR35 50% vs 28% (p<0.0001) 충족, TSS50 미충족. OS HR 0.43 (nominal p=0.0222) early signal"
    targetDisease: "골수섬유증(MF) 1차치료 JAKi-naive. ruxolitinib 단독 SVR35 ~30% — selinexor 병용으로 spleen 반응 향상 입증 목적"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04562389
    moa: "First-in-class XPO1(exportin-1) 가역적 억제제. 종양억제단백 핵 보유 → MF 비정상 megakaryocyte 증식 감소"
    sources:
      - https://investors.karyopharm.com/2026-04-21-Karyopharms-Phase-3-SENTRY-Trial-in-Myelofibrosis-Selected-for-Late-Breaking-Oral-Presentation-at-ASCO-2026-Annual-Meeting
      - https://www.prnewswire.com/news-releases/karyopharms-phase-3-sentry-trial-in-myelofibrosis-selected-for-late-breaking-oral-presentation-at-asco-2026-annual-meeting-302748864.html
  - date: 2026-04-20
    ticker: NVO
    event: "Etavopivat HIBISCUS Phase 3 SCD topline 발표 (Positive — VOC 27% 감소 vs placebo, hemoglobin response 48.7% vs 7.2% at Wk24, first-time-to-VOC 4개월 지연; first-in-class oral PKR activator). 첫 regulatory filing 2H 2026 예정"
    type: Clinical Readout
    company: Novo Nordisk
    drug: Etavopivat
    indication: Sickle Cell Disease (VOC reduction + hemoglobin response)
    phase: Phase 3
    trialDesign: "HIBISCUS Phase 3 (NCT04624659) global randomized double-blind placebo-controlled. 양 공동 1차 평가지표: 연간 VOC 빈도 감소 + Wk24 hemoglobin response (>1g/dL 증가). 둘 다 충족"
    targetDisease: "겸상적혈구병 (SCD). HbS 중합으로 만성 용혈성 빈혈 + 통증성 vaso-occlusive crisis 반복. 미국 ~10만명 — 기존 hydroxyurea·voxelotor 외 oral 옵션 부재"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04624659
    moa: "First-in-class oral pyruvate kinase R(PKR) activator. 적혈구 ATP·2,3-DPG 균형 조절 → HbS 중합 감소 + 적혈구 변형능 회복"
    sources:
      - https://www.globenewswire.com/news-release/2026/04/20/3276770/0/en/novo-nordisk-etavopivat-is-the-first-in-a-new-class-of-drugs-to-meet-both-co-primary-endpoints-in-the-phase-3-hibiscus-trial-substantially-reducing-vaso-occlusive-crisis-events-and.html
      - https://www.biospace.com/press-releases/novo-nordisk-etavopivat-is-the-first-in-a-new-class-of-drugs-to-meet-both-co-primary-endpoints-in-the-phase-3-hibiscus-trial-substantially-reducing-vaso-occlusive-crisis-events-and-improving-haemoglobin-response-in-sickle-cell-disease
  - date: 2026-05-14
    ticker: EDIT
    event: "EDIT-401 in vivo CRISPR LDLR ASGCT 2026 oral (Positive — NHP LDL-C ≥90% 감소 6개월 유지, LDLR ≥6배 단백 증가; IND/CTA 2026 mid-year, FIH 2H 2026)"
    type: Conference
    company: Editas Medicine
    drug: EDIT-401
    indication: Hyperlipidemia (LDLR upregulation)
    phase: Preclinical
    conferenceId: asgct
    trialDesign: "ASGCT 2026 oral 'Preclinical Development of EDIT-401, a Durable In Vivo CRISPR Gene Editing Therapy That Upregulates LDLR Protein to Lower LDL-C' (5/14 15:30 EDT). NHP 단회 투여(1.5–3.0 mg/kg) mean LDL-C ≥90% 감소 rapid·durable(~6개월 유지). 10~40% 기능적 LDLR 대립유전자 편집으로 ≥6배 LDLR 단백 증가. HeFH 환자 대상 용량조정 불요 가능성"
    targetDisease: "고지혈증. 심혈관 질환 주요 위험인자 — statin/PCSK9i 만성 투여 부담 → 1회 투여 durable LDL-C lowering 가능성"
    moa: "in vivo CRISPR base editing. LDLR 유전자 발현 조절 영역 변이 도입 → LDLR 단백질 발현 증가 → LDL-C 청소율 항진"
    sources:
      - https://ir.editasmedicine.com/news-releases/news-release-details/editas-medicine-present-new-preclinical-data-demonstrating
      - https://www.globenewswire.com/news-release/2026/04/27/3282063/0/en/Editas-Medicine-to-Present-New-Preclinical-Data-Demonstrating-Progress-of-EDIT-401-as-Potential-Treatment-for-Hyperlipidemia-at-Upcoming-Scientific-Conferences.html
      - https://ir.editasmedicine.com/news-releases/news-release-details/editas-medicine-reports-new-preclinical-data-demonstrating
      - https://www.globenewswire.com/news-release/2026/05/14/3294685/0/en/Editas-Medicine-Reports-New-Preclinical-Data-Demonstrating-Progress-of-EDIT-401-as-Potential-Treatment-for-Hyperlipidemia-at-the-American-Society-of-Gene-and-Cell-Therapy-2026-Annu.html
  - date: 2026-05-18
    ticker: SVRA
    event: "Molgramostim IMPALA-2 Phase 3 aPAP ATS 2026 oral — 운동 distance/duration 새 분석 데이터 (Mini Symposium B95, 5/18 14:51-15:03 EDT)"
    type: Conference
    company: Savara
    drug: Molgramostim Inhalation Solution
    indication: Autoimmune Pulmonary Alveolar Proteinosis (aPAP)
    phase: Phase 3
    conferenceId: ats
    trialDesign: "IMPALA-2 Phase 3 randomized double-blind placebo-controlled. 1차 alveolar arterial oxygen gradient 충족 후 운동 distance/duration 분석을 ATS Mini Symposium B95 'Fibrosis, Cough, and Inflammation: Treatment Strategies in ILD' 발표"
    targetDisease: "자가면역성 폐포단백증 (aPAP). 폐포 내 surfactant 축적으로 가스교환 장애 — 표준치료 whole lung lavage, 미국 승인 약물 부재"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04544293
    moa: "재조합 인간 GM-CSF 흡입제. 폐포 macrophage 활성화 → surfactant clearance 회복"
    sources:
      - https://www.biospace.com/press-releases/savara-to-present-new-data-at-the-american-thoracic-society-ats-2026-international-conference
  - date: 2026-05-31
    ticker: REPL
    event: "RP2 ± nivolumab Phase 1 FIH final ASCO 2026 oral — Developmental Therapeutics-Immunotherapy 세션 (5/31 09:12 CDT). HCC/BTC 병용 데이터 별개 poster 동시"
    type: Conference
    company: Replimune
    drug: RP2 (oncolytic HSV expressing anti-CTLA-4)
    indication: Advanced Solid Tumors (CPI-refractory)
    phase: Phase 1
    conferenceId: asco
    trialDesign: "RP2 Phase 1 first-in-human (단독 + nivolumab 병용) 진행성 고형암 — final safety/efficacy/biomarker. 종양 내 직접 투여, checkpoint inhibitor refractory 환자 포함"
    targetDisease: "표준치료 실패 진행성 고형암. CPI 내성 환자 옵션 제한적 — 직접 종양 내 투여 가능한 표재 병변 보유"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04336241
    moa: "HSV-1 기반 oncolytic virus + anti-CTLA-4 transgene 종양 내 국소 발현. systemic 면역관문 차단 부작용 최소화 + tumor-specific T cell priming"
    sources:
      - https://www.globenewswire.com/news-release/2026/04/27/3281576/0/en/replimune-to-present-at-the-2026-american-society-of-clinical-oncology-asco-annual-meeting.html
  - date: 2026-07-11
    ticker: CORT
    event: "Relacorilant + nab-paclitaxel PROC NDA PDUFA — Phase 3 ROSELLA OS HR 0.65 (35% 사망 위험 감소), PFS HR 0.70"
    type: PDUFA
    company: Corcept Therapeutics
    drug: Relacorilant
    indication: Platinum-Resistant Ovarian Cancer (PROC, 2L+)
    phase: NDA
    trialDesign: "ROSELLA Phase 3 (NCT05257408, GOG-3073/ENGOT-ov72) 14국 117 기관 n=381 1:1 무작위. 시험군 nab-paclitaxel 80mg/m² + relacorilant 150mg 경구 3일/주, 대조군 nab-paclitaxel 100mg/m² 단독. Primary PFS, Key secondary OS"
    targetDisease: "백금 저항성 난소암 (PROC). 1차 백금 요법 후 6개월 이내 재발 — mOS <12개월. 미국 신규 난소암 ~2만명/년 중 가장 큰 미충족 수요"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05257408
    moa: "선택적 GR(glucocorticoid receptor) 길항제. 코르티솔의 GR 결합 차단 → 화학요법 내성 기전 약화 → nab-paclitaxel 감수성 회복"
    sources:
      - https://ir.corcept.com/news-releases/news-release-details/fda-files-corcepts-new-drug-application-relacorilant-treatment-0/
      - https://www.cancernetwork.com/view/fda-accepts-relacorilant-nda-for-platinum-resistant-ovarian-cancer
  - date: 2026-08-01
    ticker: REGN
    event: "Garetosmab BLA PDUFA (FOP, Priority Review) — Phase 3 OPTIMA 1차 endpoint 충족 (56주차 새 HO 병변 수)"
    type: PDUFA
    company: Regeneron
    drug: Garetosmab
    indication: Fibrodysplasia Ossificans Progressiva (FOP, adults)
    phase: BLA
    trialDesign: "OPTIMA Phase 3 (NCT05394116) 56주 글로벌 무작위 이중맹검 위약대조. 18세+ FOP 성인 n=63, 위약/3mg/kg/10mg/kg garetosmab Q4W IV. Primary 56주차 새 HO 병변 수"
    targetDisease: "FOP은 ACVR1 변이 초희귀 유전질환. 근육·인대·건이 점진적 이소성 골화로 운동 기능 상실 — 미국 ~400명, 전 세계 ~900명 추정"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05394116
    moa: "Activin A 차단 단클론항체. ACVR1 활성화 핵심 ligand 차단 → 이소성 골화 신호 경로 억제"
    sources:
      - https://newsroom.regeneron.com/news-releases/news-release-details/garetosmab-biologics-license-application-accepted-fda-priority
  - date: 2026-06-11
    ticker: ELVN
    event: "ELVN-001 ENABLE Phase 1 CML EHA 2026 oral (Abstract S164) — 80mg QD 누적 MMR 47%, 24주 내 MMR 38%, asciminib 선행 환자 누적 MMR 52%. 발표 당일 FDA와 ENABLE-2 Phase 3 설계 합의 공시 (2H 2026 개시 예정)"
    type: Conference
    company: Enliven Therapeutics
    drug: ELVN-001
    indication: Relapsed/Refractory Chronic Myeloid Leukemia
    phase: Phase 1
    conferenceId: eha
    trialDesign: "ENABLE Phase 1 오픈라벨 dose escalation + expansion (NCT05304377). R/R 또는 TKI 불내성 CML 환자 n=141, 중앙 치료기간 ~32주. EHA 2026 Oral Session 6/11 17:45-18:00 CEST (Abstract S164). pivotal Phase 3 ENABLE-2 전환 직전 데이터"
    targetDisease: "재발/불응성 만성 골수성 백혈병. BCR::ABL1 융합 유전자 구동. 기존 TKI 내성(T315I 포함) 또는 불내성 환자 대상 — 2·3세대 TKI 이후 옵션 제한적"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05304377
    moa: "BCR::ABL1 ATP 경쟁적 kinase inhibitor. T315I 포함 표준 내성 변이에 활성, asciminib과 보완적 기전"
    sources:
      - https://www.prnewswire.com/news-releases/enliven-therapeutics-announces-oral-presentation-at-the-eha-2026-congress-featuring-additional-positive-phase-1-clinical-trial-data-for-elvn-001-in-cml-302769668.html
      - https://www.prnewswire.com/news-releases/enliven-therapeutics-announces-updated-positive-phase-1-clinical-data-and-alignment-with-fda-on-key-phase-3-trial-design-components-302797424.html
  - date: 2026-06-13
    ticker: AGIO
    event: "Mitapivat RISE UP Phase 3 SCD EHA 2026 Plenary (Abstract S102) — 혈색소 반응 1차 endpoint 충족, sNDA 동시 제출"
    type: Conference
    company: Agios Pharmaceuticals
    drug: Mitapivat (AG-348)
    indication: Sickle Cell Disease
    phase: Phase 3
    conferenceId: eha
    trialDesign: "RISE UP 무작위 이중맹검 위약대조 Phase 3 (n=207, 2:1). 52주 치료. 1차 endpoint: Wk24-52 혈색소 반응(≥1.0 g/dL↑) + 연간 sickle cell pain crisis율. 혈색소 반응 1차 충족(통계적 유의). EHA 2026 Plenary 6개 중 1개 선정 (S102, 6/13 12:00-13:30 CEST)"
    targetDisease: "겸상적혈구병(SCD). HbS 중합 → 적혈구 변형 + 혈관폐색 + 만성 용혈성 빈혈. 표준치료 hydroxyurea·voxelotor — 미충족 수요 큰 희귀 혈액질환"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05031780
    moa: "First-in-class 적혈구 PK 활성화제. ATP·2,3-DPG 균형 조절 → HbS 중합 억제, 산소친화도 정상화, 용혈 감소"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/12/3292999/31990/en/Agios-to-Present-New-Data-at-EHA-2026-Reinforcing-the-Significant-Therapeutic-Impact-of-Mitapivat-Across-Multiple-Rare-Hemolytic-Anemias.html
      - https://investor.agios.com/news-releases/news-release-details/agios-present-new-data-eha-2026-reinforcing-significant
  - date: 2026-06-13
    ticker: COGT
    event: "Bezuclastinib APEX Phase 2 AdvSM EHA 2026 oral (S438) — ORR 57% mIWG, PPR 80%, 89%에서 ≥50% 비만세포 부담 감소"
    type: Conference
    company: Cogent Biosciences
    drug: Bezuclastinib
    indication: Advanced Systemic Mastocytosis
    phase: Phase 2
    conferenceId: eha
    trialDesign: "APEX 등록지향 Phase 2 단일군 (NCT04996875). KIT D816V 변이 AdvSM 환자. Primary mIWG 기준 ORR. Topline ORR 57% (mIWG), 80% (PPR), 89%에서 ≥50% 비만세포 부담 감소. EHA 2026 Oral S438 (6/13 17:15-18:30 CEST, A2-3 Hall)"
    targetDisease: "진행성 전신 비만세포증(AdvSM). KIT D816V 변이 비만세포 과증식 — 기존 avapritinib 대비 선택성·내약성 프로파일 차별화"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04996875
    moa: "KIT D816V 및 exon 17 변이 선택적 tyrosine kinase inhibitor. 야생형 KIT 회피로 안전성 개선 + 비만세포 증식 차단"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/12/3292993/0/en/Cogent-Biosciences-Announces-Multiple-Presentations-at-the-European-Hematology-Association-EHA-2026-Congress.html
      - https://www.globenewswire.com/news-release/2025/12/08/3201431/0/en/Cogent-Biosciences-Announces-Positive-Top-line-Results-of-APEX-Trial-of-Bezuclastinib-in-Patients-with-Advanced-Systemic-Mastocytosis-AdvSM.html
  - date: 2026-08-13
    ticker: LNTH
    event: "MK-6240 (florquinitau F-18) Tau PET 알츠하이머 진단제 NDA PDUFA — Fast Track, Phase 3 sensitivity/specificity 1차 충족"
    type: PDUFA
    company: Lantheus
    drug: Florquinitau F-18 (MK-6240)
    indication: Tau PET Imaging in Suspected Alzheimer's Disease
    phase: NDA
    trialDesign: "두 개의 피벗 Phase 3에서 tau NFT 검출 민감도·특이도 co-primary 모두 충족 (2025-04 발표). Fast Track 지정. 현재 100+ 임상시험에서 연구용 사용 중"
    targetDisease: "알츠하이머병 신경섬유 엉킴(NFT) 검출 PET 진단제. 아밀로이드 다음으로 중요한 AD 병리 바이오마커인 tau를 고선택적 결합 → 인지장애 평가에서 AD 확진 보조"
    priorTrialUrl: null
    moa: "18F 표지 방사성 리간드. tau NFT에 고친화도 결합 → PET 스캔으로 뇌 tau 분포 정량 시각화, 오프타깃 결합 최소"
    sources:
      - https://www.globenewswire.com/news-release/2025/10/28/3175415/0/en/Lantheus-Announces-FDA-Acceptance-of-New-Drug-Application-for-MK-6240-a-PET-Imaging-Agent-Targeting-Tau-in-Alzheimer-s-Disease.html
      - https://www.stocktitan.net/news/LNTH/lantheus-announces-fda-acceptance-of-new-drug-application-for-mk-joz1555jdyb9.html
  - date: 2026-08-17
    ticker: MRK
    event: "KEYTRUDA QLEX + Padcev MIBC (cisplatin-eligible) perioperative sBLA PDUFA — EV-304/KEYNOTE-B15 EFS HR -47%, OS HR -35%"
    type: PDUFA
    company: Merck
    drug: Pembrolizumab SC (KEYTRUDA QLEX) + Enfortumab vedotin (Padcev)
    indication: Muscle-Invasive Bladder Cancer (cisplatin-eligible, perioperative)
    phase: NDA
    trialDesign: "EV-304/KEYNOTE-B15 (NCT04700124) 글로벌 랜덤 오픈라벨 Phase 3. Perioperative pembrolizumab + enfortumab vedotin + 수술 vs 신보조 gemcitabine/cisplatin + 수술. Primary EFS — 사건무발생 위험 47% 감소, OS 위험 35% 감소"
    targetDisease: "근침습성 방광암(MIBC). 방광 전적출술이 표준치료이나 5년 생존 ~50%. Cisplatin 적합군에서 면역-ADC 병용 perioperative 첫 OS 개선 달성"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04700124
    moa: "Pembrolizumab(PD-1 차단 면역관문억제제) + Enfortumab vedotin(Nectin-4 표적 ADC) 병용 — 면역활성화 + 직접 종양세포 사멸 이중 기전"
    sources:
      - https://www.merck.com/news/fda-grants-priority-review-for-keytruda-pembrolizumab-and-keytruda-qlex-pembrolizumab-and-berahyaluronidase-alfa-pmph-each-with-padcev-enfortumab-vedotin-ejfv-for-cisplati/
      - https://www.businesswire.com/news/home/20260420766130/en/FDA-Grants-Priority-Review-for-KEYTRUDA-pembrolizumab-and-KEYTRUDA-QLEX-pembrolizumab-and-berahyaluronidase-alfa-pmph-Each-with-Padcev-enfortumab-vedotin-ejfv-for-Cisplatin-Eligible-Patients-with-Muscle-Invasive-Bladder-Cancer
  - date: 2026-08-27
    ticker: GILD
    event: "BIC/LEN (bictegravir + lenacapavir) HIV 1일1회 단일정제 NDA PDUFA — ARTISTRY-1/2 Wk48 비열등성 1차 충족"
    type: PDUFA
    company: Gilead Sciences
    drug: Bictegravir/Lenacapavir (BIC/LEN)
    indication: HIV-1 (Virologically Suppressed Adults)
    phase: NDA
    trialDesign: "ARTISTRY-1 (NCT05502341) 랜덤 오픈라벨 Phase 3 — 복잡 다제 요법 → BIC/LEN 전환 vs 유지. Wk48 HIV RNA ≥50 copies/mL 0.8% vs 1.1% 비열등성 충족. ARTISTRY-2 (NCT06333808) Wk48 BIC/LEN vs BIKTARVY 1.3% vs 1.0% 비열등성 충족"
    targetDisease: "바이러스 억제 중인 HIV-1 성인. 복잡 다제 요법을 1일1회 단일정제로 간소화 — 기존 INSTI 및 캡시드 억제제 어느 계열과도 교차내성 없는 최초 조합"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05502341
    moa: "Bictegravir (INSTI, 내성장벽 높음) + Lenacapavir (첫 캡시드 억제제, HIV 복제 다단계 차단) 조합. 기존 항바이러스제 전 계열 교차내성 없음"
    sources:
      - https://investors.gilead.com/news/news-details/2026/U-S--FDA-Grants-Priority-Review-of-New-Drug-Application-for-Gileads-Once-Daily-HIV-Treatment-of-Bictegravir-Plus-Lenacapavir/default.aspx
      - https://www.biospace.com/press-releases/u-s-fda-grants-priority-review-of-new-drug-application-for-gileads-once-daily-hiv-treatment-of-bictegravir-plus-lenacapavir
  - date: 2026-05-20
    ticker: BMRN
    event: "VOXZOGO (vosoritide) CANOPY-HCH-3 Phase 3 hypochondroplasia 1차 충족 (Positive — annualized growth velocity +2.33 cm/yr vs placebo, p<0.0001). sNDA 라벨 확장 제출 예정"
    type: Clinical Readout
    company: BioMarin
    drug: Vosoritide (VOXZOGO)
    indication: Hypochondroplasia (children)
    phase: Phase 3
    trialDesign: "CANOPY-HCH-3 (NCT05598320) 글로벌 다기관 무작위배정 이중맹검 위약대조 Phase 3. 3~18세 hypochondroplasia 환아 대상 vosoritide 일일 SC 52주 vs 위약. 1차 평가지표: 52주차 annualized growth velocity (cm/yr). 1차 충족 +2.33 cm/yr vs 위약 (p<0.0001)"
    targetDisease: "Hypochondroplasia — FGFR3 활성화 변이로 인한 단신 유전질환 (achondroplasia 자매질환). 미국 ~25,000~40,000명. 기존 승인 치료 부재 — VOXZOGO는 achondroplasia 적응증으로 이미 승인된 첫 약물"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05598320
    moa: "C-type natriuretic peptide(CNP) analog. FGFR3 하류 MAPK 경로 억제 → 연골 성장판 endochondral ossification 회복"
    sources:
      - https://www.prnewswire.com/news-releases/biomarin-announces-positive-phase-3-pivotal-study-results-for-voxzogo-vosoritide-in-children-with-hypochondroplasia-302778176.html
      - https://www.stocktitan.net/news/BMRN/bio-marin-announces-positive-phase-3-pivotal-study-results-for-fw8a1yyi42bo.html
  - date: 2026-05-29
    ticker: ALT
    event: "Pemvidutide IMPACT Phase 2b 48주 MASH EASL 2026 Best of EASL oral (fibrosis composite 27.8%/32.4% vs 위약 3.2%; 72주 biopsy primary 별도)"
    type: Conference
    company: Altimmune
    drug: Pemvidutide
    indication: MASH
    phase: Phase 2b
    conferenceId: easl
    trialDesign: "IMPACT Phase 2b 무작위 이중맹검 위약대조 — pemvidutide 1.2/1.8/2.4mg 주1회 SC vs 위약, biopsy-confirmed F2/F3 MASH 환자. 24주 1차 후 48주 연장 데이터 EASL Best of EASL 발표"
    targetDisease: "대사이상 관련 지방간염(MASH). 비만 동반 진행성 간섬유화 (F2/F3) — 기존 단일 GLP-1 효과 한계"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05989711
    moa: "GLP-1/glucagon dual agonist. 체중감량 + 직접 간내 지질대사·섬유화 개선 이중 기전"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/28/3303064/0/en/Pemvidutide-Demonstrates-Significant-Metabolic-Improvements-in-Patients-with-MASH-in-New-48-Week-IMPACT-Phase-2b-Data-Presented-at-EASL-2026.html
  - date: 2026-05-29
    ticker: ARWR
    event: "ARO-INHBE Phase 1 비만 간지방 (단독 + low-dose tirzepatide 병용) EASL 2026 late-breaker poster"
    type: Conference
    company: Arrowhead Pharmaceuticals
    drug: ARO-INHBE
    indication: Obesity / Liver Fat
    phase: Phase 1
    conferenceId: easl
    trialDesign: "Phase 1 비만 성인 대상 ARO-INHBE RNAi 단독 vs low-dose tirzepatide 병용 — MRI-PDFF 간지방·체구성 변화 평가. EASL 2026 late-breaker poster"
    targetDisease: "비만 동반 간지방 축적·MASH 위험 인구. 인크레틴 단독으로 미해결인 hepatic steatosis 영역 — INHBE knockdown은 지방세포 축적 감소·인슐린 민감도 개선"
    moa: "INHBE(activin E) 간특이 RNAi 침묵. 지방세포 비대 억제, 인슐린 민감도 향상, GLP-1과 병용 시 시너지"
    sources:
      - https://www.businesswire.com/news/home/20260504575415/en/Arrowhead-Pharmaceuticals-to-Participate-in-Upcoming-May-2026-Events
  - date: 2026-05-29
    ticker: REGN
    event: "Lynozyfic (linvoseltamab) LINKER-AL2 Phase 1/2 ASCO 2026 oral — 2L+ AL amyloidosis, 100% hematologic CR at top dose, free light chain normalization by day 15"
    type: Conference
    company: Regeneron
    drug: Linvoseltamab (Lynozyfic)
    indication: 2L+ Systemic AL Amyloidosis
    phase: Phase 1/2
    conferenceId: asco
    trialDesign: "LINKER-AL2 Phase 1/2: 2L+ systemic AL amyloidosis 환자. BCMA × CD3 이중특이항체 단독요법, 다회 IV. ASCO 2026 oral — top dose에서 free light chain Day 15 정상화 + 100% hematologic CR"
    targetDisease: "전신 AL amyloidosis (light chain amyloid). 형질세포 monoclonal light chain이 장기(심장·신장)에 축적 → 진행성 장기부전. 기존 daratumumab + CyBorD 표준에도 재발 환자 옵션 부재"
    moa: "BCMA × CD3 이중특이항체. T세포 매개 BCMA+ 형질세포 직접 사멸 → light chain 생산 차단"
    sources:
      - https://investor.regeneron.com/news-releases/news-release-details/regeneron-showcase-progress-advancing-novel-investigational/
      - https://newsroom.regeneron.com/news-releases/news-release-details/regeneron-highlight-advances-asco-phase-3-adjuvant-libtayor
  - date: 2026-05-30
    ticker: ABBV
    event: "ABBV-969 mCRPC (45% ORR, 67% PSA50) + ABBV-706 SCLC 2L (82% ORR) Phase 1 ASCO 2026 oral — next-gen oncology pipeline 핵심"
    type: Conference
    company: AbbVie
    drug: ABBV-969 (mCRPC) + ABBV-706 (SCLC)
    indication: Metastatic Castration-Resistant Prostate Cancer + Small Cell Lung Cancer
    phase: Phase 1
    conferenceId: asco
    trialDesign: "ABBV-969 (STEAP1/PSMA dual ADC) Phase 1 mCRPC — ORR 45%, PSA50 67%. ABBV-706 (SEZ6-targeting topo I ADC) Phase 1 2L SCLC — ORR 82%. ASCO 2026 두 개 oral"
    targetDisease: "mCRPC: ARSI 후 표준치료 한계 — STEAP1/PSMA 동시 표적으로 antigen escape 극복. SCLC 2L: lurbinectedin 후 옵션 제한적 — SEZ6 신규 표적"
    moa: "ABBV-969: STEAP1/PSMA 이중표적 ADC. ABBV-706: SEZ6 표적 topo I 페이로드 ADC (Synaptic Vesicle Glycoprotein 발현 SCLC 직접 사멸)"
    sources:
      - https://news.abbvie.com/2026-05-21-AbbVie-Announces-New-Data-at-ASCO-2026-Demonstrating-Breadth-and-Momentum-Across-its-Next-Generation-Oncology-Pipeline
      - https://www.prnewswire.com/news-releases/abbvie-announces-new-data-at-asco-2026-demonstrating-breadth-and-momentum-across-its-next-generation-oncology-pipeline-302779632.html
  - date: 2026-05-30
    ticker: BNTX
    event: "Pumitamig ROSETTA Lung-02 Phase 2/3 1L NSCLC + gotistobart Phase 2 PROC OS ASCO 2026 두 개 oral"
    type: Conference
    company: BioNTech
    drug: Pumitamig + Gotistobart
    indication: 1L NSCLC (squamous + non-squamous) + Platinum-Resistant Ovarian Cancer
    phase: Phase 2/3
    conferenceId: asco
    trialDesign: "Pumitamig (PD-L1 × VEGF 이중특이) ROSETTA Lung-02 Phase 2/3 1L NSCLC + chemo — anti-tumor activity oral. Gotistobart (CTLA-4 conditional active) Phase 2 PROC — OS data oral. ASCO 2026 두 개 oral"
    targetDisease: "1L NSCLC: PD-1/L1 + chemo 표준 후 EGFR/ALK wild-type CR 한정 — PD-L1 × VEGF 이중표적으로 면역활성화 + 혈관신생 동시 차단. PROC: 백금 저항성 난소암 mOS <12개월 — CTLA-4 종양국소 활성으로 systemic AE 감소"
    moa: "Pumitamig: PD-L1 × VEGF 이중특이항체. Gotistobart: conditional-active anti-CTLA-4 (종양 미세환경에서만 활성화)"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/22/3299948/0/en/biontech-to-showcase-progress-across-late-stage-oncology-pipeline-at-the-2026-asco-annual-meeting.html
      - https://www.biospace.com/press-releases/biontech-to-showcase-progress-across-late-stage-oncology-pipeline-at-the-2026-asco-annual-meeting
  - date: 2026-05-31
    ticker: MRK
    event: "KEYTRUDA + Trodelvy (sacituzumab govitecan) ASCENT-04/KEYNOTE-D19 Phase 3 1L PD-L1+ mTNBC ASCO 2026 LBA1000 (Gilead 공동 후원)"
    type: Conference
    company: Merck
    drug: Pembrolizumab + Sacituzumab Govitecan
    indication: 1L PD-L1+ Metastatic TNBC
    phase: Phase 3
    conferenceId: asco
    trialDesign: "ASCENT-04/KEYNOTE-D19 Phase 3 — pembrolizumab + sacituzumab govitecan vs pembrolizumab + chemo. CPS ≥10 PD-L1+ 1L mTNBC. Primary PFS — LBA1000 ASCO 2026"
    targetDisease: "1L PD-L1+ 전이성 삼중음성 유방암. KEYNOTE-355 표준 pembrolizumab + chemo 한계 — ADC 병용으로 PFS 추가 개선 입증 목적"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05382299
    moa: "Pembrolizumab (PD-1 차단 면역관문) + Sacituzumab govitecan (Trop-2 표적 ADC, SN-38 페이로드). 면역활성화 + 직접 종양 사멸 이중 기전"
    sources:
      - https://www.merck.com/news/merck-highlights-new-long-term-data-and-advancements-across-broad-oncology-portfolio-and-pipeline-research-at-asco-2026/
      - https://www.businesswire.com/news/home/20260520344508/en/New-ASCO-and-EHA-2026-Data-Demonstrate-Gilead-and-Kites-Momentum-Across-Antibody-Drug-Conjugates-and-Cell-Therapy-in-Oncology
  - date: 2026-05-31
    ticker: BMY
    event: "Mezigdomide SUCCESSOR-2 Phase 3 R/R MM ASCO 2026 LBA7506 (Positive — MeziKd vs Kd mPFS 18 vs 8.3mo HR 0.48 p<0.0001, ORR 80.2% vs 53.4%)"
    type: Conference
    company: Bristol Myers Squibb
    drug: Mezigdomide
    indication: Relapsed/Refractory Multiple Myeloma
    phase: Phase 3
    conferenceId: asco
    trialDesign: "SUCCESSOR-2 Phase 3 (n=479): mezigdomide+carfilzomib+dex(MeziKd, n=288) vs carfilzomib+dex(Kd, n=191). R/R MM. mPFS 18 vs 8.3개월 HR 0.48 p<0.0001(52% 위험감소), ORR 80.2% vs 53.4%, ≥CR 26.7% vs 8.9%. OS immature. ASCO 2026 LBA7506"
    targetDisease: "재발/불응성 다발골수종. lenalidomide refractory 후 pomalidomide 표준 — 효과 제한적 (mPFS ~4개월). CELMoD는 차세대 분해제로 더 깊은 cereblon 결합 → 항종양 활성 ↑"
    moa: "차세대 CELMoD (cereblon E3 ligase modulator). Aiolos/Ikaros 분해 효율 ↑ → 골수종세포 사멸 + 면역활성화 (Pomalyst·Revlimid 후속)"
    sources:
      - https://news.bms.com/news/corporate-financial/2026/Bristol-Myers-Squibb-Announces-CELMoD-Mezigdomide-Reduces-Risk-of-Disease-Progression-or-Death-by-More-than-50-vs--Standard-of-Care-in-Relapsed-or-Refractory-Multiple-Myeloma/default.aspx
  - date: 2026-06-01
    ticker: MRNA
    event: "Intismeran autogene (mRNA-4157) + KEYTRUDA KEYNOTE-942 adjuvant high-risk melanoma 5-year update ASCO 2026 oral (#9500)"
    type: Conference
    company: Moderna
    drug: Intismeran Autogene (mRNA-4157)
    indication: Adjuvant Resected High-Risk Melanoma
    phase: Phase 2
    conferenceId: asco
    trialDesign: "KEYNOTE-942 Phase 2b randomized: 절제 후 III/IV melanoma 환자 intismeran autogene (개인화 neoantigen mRNA) + pembrolizumab vs pembrolizumab 단독. Primary RFS, 5-year landmark RFS·OS oral #9500. Phase 3 INTerpath-001 confirmatory 진행 중"
    targetDisease: "고위험 절제 후 melanoma (Stage IIIB-IV). pembrolizumab adjuvant 표준 — 5년 재발률 여전히 ~30%. 개인화 neoantigen 백신으로 추가 재발 감소 입증"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT03897881
    moa: "환자별 종양 변이 기반 개인화 mRNA neoantigen 백신 (최대 34개 neoantigen 인코딩). KEYTRUDA와 시너지 — tumor-specific T cell priming + checkpoint 차단"
    sources:
      - https://www.biospace.com/press-releases/moderna-announces-data-to-be-presented-at-2026-asco-annual-meeting
      - https://www.merck.com/news/merck-highlights-new-long-term-data-and-advancements-across-broad-oncology-portfolio-and-pipeline-research-at-asco-2026/
  - date: 2026-06-01
    ticker: BCYC
    event: "Zelenectide pevedotin (BT8009) + pembrolizumab Duravelo-2 Phase 2/3 1L la/mUC interim ASCO 2026 rapid oral (#4516)"
    type: Conference
    company: Bicycle Therapeutics
    drug: Zelenectide Pevedotin (BT8009)
    indication: 1L Locally Advanced / Metastatic Urothelial Cancer
    phase: Phase 2/3
    conferenceId: asco
    trialDesign: "Duravelo-2 (BT8009-230) Phase 2/3 open-label, 1L la/mUC. BT8009 + pembrolizumab 병용. 단독요법 65% ORR 기준 병용 ORR·DOR 평가. ASCO 2026 rapid oral #4516"
    targetDisease: "1L 진행성/전이성 요로상피암. cisplatin-ineligible 환자 대상 EV+pembrolizumab 표준 — 신규 Nectin-4 표적 옵션 확대 목적"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT06225596
    moa: "Nectin-4 표적 bicyclic peptide–MMAE conjugate(BTC). 작은 분자량(~5kDa)으로 ADC(150kDa) 대비 빠른 종양 침투·낮은 독성"
    sources:
      - https://investors.bicycletherapeutics.com/news-releases/news-release-details/bicycle-therapeutics-announces-oral-and-poster-presentations-0
  - date: 2026-06-14
    ticker: KURA
    event: "KOMET-007 ziftomenib + 7+3 frontline AML EHA 2026 oral — 99 환자 업데이트, 90~96% CRc (NPM1m/KMT2A-r)"
    type: Conference
    company: Kura Oncology
    drug: Ziftomenib
    indication: 1L NPM1-mutant or KMT2A-rearranged AML (combo with 7+3)
    phase: Phase 1
    conferenceId: eha
    trialDesign: "KOMET-007 Phase 1 dose-escalation/expansion: ziftomenib + 7+3 (cytarabine + daunorubicin) frontline fit AML. 99 환자 update — NPM1m/KMT2A-r 코호트 CRc 90~96% (deep MRD-negativity). Kyowa Kirin 공동개발"
    targetDisease: "1L fit AML (NPM1m 약 30%, KMT2A-r 약 5%). 7+3 단독 CR 약 65% — menin 억제로 차별화된 분화·증식 차단 → 더 깊은 분자생물학적 반응"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04067336
    moa: "Menin-KMT2A 상호작용 선택적 억제. NPM1m·KMT2A-r AML의 HOX/MEIS1 oncogenic 전사 차단 → 분화 회복"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/12/3293020/35186/en/Kura-Oncology-and-Kyowa-Kirin-to-Present-Updated-Frontline-Ziftomenib-7-3-Combination-Data-at-EHA-2026-Congress.html
  - date: 2026-06-18
    ticker: MRNA
    event: "MFLUSIVA (mRNA-1010) 독감백신 VRBPAC 자문위 — 50세+ 적응증, FDA 결정 8/5 예정"
    type: Regulatory
    company: Moderna
    drug: MFLUSIVA (mRNA-1010)
    indication: Seasonal Influenza A/B Prevention (Adults ≥50)
    phase: BLA
    trialDesign: "Phase 3 P304 — mRNA-1010 vs licensed standard-dose IIV4 in 50+ adults. HAI seroresponse 4 strain 모두 비열등성 충족, 65+ 서브그룹 A 균주 면역원성 우월. BLA STN 125869/0 VRBPAC 6/18, FDA 결정 8/5 예정"
    targetDisease: "50세+ 성인 계절 독감. 미국 12,000~52,000명/년 사망 — 기존 egg-based 백신 효능 제한, 균주 매치 6개월 소요. mRNA 플랫폼은 신속 균주 업데이트 가능"
    priorTrialUrl: https://www.federalregister.gov/documents/2026/05/22/2026-10321/vaccines-and-related-biological-products-advisory-committee-notice-of-meeting-establishment-of-a
    moa: "지질나노입자(LNP) 캡슐화 mRNA 백신 — 4개 인플루엔자 균주(A H1N1·H3N2 + B Victoria·Yamagata) hemagglutinin 인코딩"
    sources:
      - https://www.fda.gov/advisory-committees/advisory-committee-calendar/vaccines-and-related-biological-products-advisory-committee-june-18-2026-meeting-announcement
      - https://www.biospace.com/fda/modernas-once-rebuffed-mrna-flu-shot-to-face-scrutiny-from-fda-adcomm
  - date: 2026-07-26
    ticker: MNKD
    event: "FUROSCIX ReadyFlow 자가주사기 sNDA PDUFA — 만성 HF/CKD 부종 자가 SC 투여"
    type: PDUFA
    company: MannKind
    drug: FUROSCIX ReadyFlow (SC furosemide autoinjector, SCP-111)
    indication: Edema in Chronic Heart Failure (NYHA II-IV) or CKD
    phase: sNDA
    trialDesign: "Bioequivalence/PK study vs 기존 승인 FUROSCIX On-body Infusor. SCP-111 — bioavailability 107.3%, SC delivery <10초, AE 주사부위에 한정. Q2 2026 sNDA 제출 → PDUFA 2026-07-26"
    targetDisease: "만성 HF / CKD 부종. 기존 IV furosemide는 ER/입원 의존 — 자가주사기로 외래·재택 decongestion 가능 → 입원 부담 감소"
    priorTrialUrl: https://investors.mannkindcorp.com/news-releases/news-release-details/mannkind-announces-us-fda-accepts-review-its-supplemental-new
    moa: "Loop diuretic (Na-K-2Cl symporter 억제, Henle 두꺼운 상행각). 자가주사기 SC 투여로 IV 동등 약동학"
    sources:
      - https://investors.mannkindcorp.com/news-releases/news-release-details/mannkind-announces-us-fda-accepts-review-its-supplemental-new
  - date: 2026-06-04
    ticker: CABA
    event: "Rese-cel RESET-Myositis Ph1/2 장기추적 EULAR 2026 oral (OP0170) + SLE/SSc 코호트"
    type: Conference
    company: Cabaletta Bio
    drug: Rese-cel (resecabtagene autoleucel, CABA-201)
    indication: Idiopathic Inflammatory Myopathy (Myositis)
    phase: Phase 1/2
    conferenceId: eular
    trialDesign: "RESET-Myositis Phase 1/2 (NCT06154252) open-label — 성인 피부근염(DM)·항합성효소증후군(ASyS) 코호트. 자가 CD19 CAR-T 단회 투여. RESET-SLE(NCT05765006)·RESET-SSc 전체 코호트 동시 공개. EULAR 2026 OP0170 (6/4 09:15 BST). 2nd pivotal indication(outpatient dosing) 결정 예정"
    targetDisease: "특발성 염증성 근병증(IIM/Myositis). 항합성효소항체 또는 항MDA5 항체 양성 DM/ASyS — 만성 면역억제 불응 중증 자가면역 근육질환"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT06154252
    moa: "완전인간 자가 4-1BB CD19 CAR-T. CD19+ B세포 심부 일시 고갈 → 면역계 리셋, 만성 면역억제 없이 지속 관해 목표"
    sources:
      - https://www.cabalettabio.com/investors/news-events/press-releases/detail/148/cabaletta-bio-reports-first-quarter-2026-financial-results
  - date: 2026-06-05
    ticker: GPCR
    event: "Aleniglipron ACCESS Phase 2b 비만 ADA 2026 oral (36주 위약보정 -11.3% 체중)"
    type: Conference
    company: Structure Therapeutics
    drug: Aleniglipron (GSBR-1290)
    indication: Obesity
    phase: Phase 2b
    conferenceId: ada
    trialDesign: "ACCESS Phase 2b 무작위 이중맹검 위약대조 용량탐색 36주 (NCT05811325). Primary 위약보정 체중변화. 120mg QD -11.3%. ACCESS II(44주) 180/240mg -16.3/-16.0%. ADA 2026 oral (6/5 12:45 CT), 총 5개 발표. EoP2 FDA 미팅 Q2 2026, Phase 3 H2 2026 예정"
    targetDisease: "비만(BMI ≥30 또는 ≥27+동반질환). 경구 GLP-1RA — 주사제 대비 편의성·접근성 개선 목표"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05811325
    moa: "경구 소분자 비펩타이드 GLP-1 수용체 작용제. 식욕 억제·위배출 지연·인슐린 분비 촉진, 1일 1회 복용"
    sources:
      - https://www.globenewswire.com/news-release/2026/04/27/3282005/0/en/Structure-Therapeutics-to-Present-Aleniglipron-Amylin-and-Combination-Data-at-the-American-Diabetes-Association-86th-Scientific-Sessions.html
  - date: 2026-06-06
    ticker: ARTV
    event: "AlloNK + rituximab 불응성 RA EULAR 2026 Late-Breaking oral (LB0003, 71% ACR50 @6mo)"
    type: Conference
    company: Artiva Biotherapeutics
    drug: AB-101 (AlloNK)
    indication: Refractory Rheumatoid Arthritis
    phase: Phase 2a
    conferenceId: eular
    trialDesign: "오픈라벨 Phase 2a 바스켓 (NCT06991114) — refractory RA/SjD/IIM/SSc. RA 21명(13명 ≥6개월, 컷오프 2026-04-03). rituximab + AlloNK 단회 IV. Primary ACR50 @6mo 71%, relapse·추가 면역조절제 없음. Phase 3 RCT(vs rituximab, n≈150) H2 2026 개시 예정"
    targetDisease: "다약제 불응성 류마티스 관절염. 2개 이상 bDMARD·JAKi 실패 환자군 — 심각한 미충족 수요"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT06991114
    moa: "동종 NK세포(AlloNK) + rituximab. ADCC 증폭으로 CD20+ B세포 심부 고갈 → B세포 주도 자가면역 차단"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/19/3297953/0/en/artiva-biotherapeutics-announces-multiple-allo-nk-data-presentations-at-eular-2026-congress-including-late-breaking-oral-presentation-highlighting-clinical-efficacy-comparable-to-autologous-car-t-cell-therapy-in-rheumatologic-diseases.html
  - date: 2026-08-23
    ticker: RARE
    event: "DTX401 (pariglasgene) GSDIa 유전자치료 BLA PDUFA (Priority Review)"
    type: PDUFA
    company: Ultragenyx Pharmaceutical
    drug: DTX401 (pariglasgene brecaparvovec)
    indication: Glycogen Storage Disease Type Ia (GSDIa)
    phase: BLA
    trialDesign: "Phase 3 GlucoGene (NCT05139316) 위약대조 이중맹검 — 8세+ GSDIa. 1회 IV 후 48주 일일 옥수수전분 섭취량 감소 1차 (DTX401 -41.3% vs 위약 -10.3%). Priority Review BLA 2026-02-23 수락"
    targetDisease: "GSDIa — G6PC 변이 간형 당원병. 중증 저혈당·간비대·신질환 유발 희귀 유전질환, 현재 승인 치료제 없음"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05139316
    moa: "AAV8 벡터 1회 IV로 G6PC(포도당-6-인산분해효소) 유전자를 간세포에 전달 → 효소 활성 회복"
    sources:
      - https://www.globenewswire.com/news-release/2026/02/23/3242633/20739/en/Ultragenyx-Announces-U-S-FDA-Acceptance-and-Priority-Review-of-the-Biologics-License-Application-BLA-for-DTX401-AAV-Gene-Therapy-for-Glycogen-Storage-Disease-Type-Ia-GSDIa.html
  - date: 2026-11-27
    ticker: NUVL
    event: "Neladalkib ALK+ NSCLC NDA PDUFA (Priority Review, ALKOVE-1 pivotal)"
    type: PDUFA
    company: Nuvalent
    drug: Neladalkib (NVL-655)
    indication: TKI Pre-treated Advanced ALK-positive NSCLC
    phase: NDA
    trialDesign: "ALKOVE-1 global Phase 1/2 (n=253) 기반 NDA — TKI pre-treated ALK+ NSCLC ORR 31%(lorlatinib 경험)/46%(lorlatinib naive). NDA 2026-04-07 제출, 2026-05-27 FDA 수락 + Priority Review → PDUFA 2026-11-27"
    targetDisease: "진행성 ALK+ NSCLC. 1·2세대 TKI 후 lorlatinib 내성 변이(G1202R) 출현 시 표준치료 한계 — 뇌전이 동반 흔함"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05384626
    moa: "ALK 선택적·TRK-sparing 3세대 brain-penetrant TKI. 내성 변이 커버 + CNS 침투 + off-target 신경독성 최소"
    sources:
      - https://investors.nuvalent.com/2026-05-27-Nuvalent-Announces-Key-Program-and-Business-Updates,-Strengthening-Foundation-for-Global-Leadership-in-ROS1-and-ALK-positive-NSCLC
  - date: 2026-06-06
    ticker: LLY
    event: "Retatrutide TRIUMPH-1 Phase 3 비만 ADA 2026 발표 (Positive — 12mg 80주 위약보정 -28.3% 체중; GIP/GLP-1/Glucagon 삼중작용)"
    type: Conference
    company: Eli Lilly
    drug: Retatrutide
    indication: Obesity (without T2D)
    phase: Phase 3
    conferenceId: ada
    trialDesign: "TRIUMPH-1 무작위 이중맹검 위약대조 Phase 3 (80주). 비만(T2D 없음) 성인 대상 retatrutide vs 위약. 12mg 위약보정 체중 -28.3%. ADA 2026 심포지엄 6/6 발표, TRANSCEND-T2D-1(T2D) 데이터 동반"
    targetDisease: "비만(BMI ≥30 또는 ≥27+동반질환). 세 인크레틴/글루카곤 경로 동시 자극으로 단일·이중 작용제 대비 더 큰 체중감량 목표"
    priorTrialUrl: https://www.prnewswire.com/news-releases/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss-in-pivotal-phase-3-obesity-trial-302778859.html
    moa: "GIP/GLP-1/Glucagon 삼중 수용체 작용제. 식욕억제·인슐린분비·에너지소비 동시 증가로 최대급 체중감량"
    sources:
      - https://www.prnewswire.com/news-releases/lillys-triple-agonist-retatrutide-delivered-powerful-weight-loss-in-pivotal-phase-3-obesity-trial-302778859.html
      - https://www.prnewswire.com/news-releases/lilly-to-present-new-data-on-foundayo-mounjaro-and-retatrutide-at-the-american-diabetes-associations-86th-scientific-sessions-building-toward-a-new-era-of-choice-in-diabetes-and-obesity-care-302783855.html
  - date: 2026-06-07
    ticker: NVO
    event: "CagriSema REIMAGINE 1/2/3 Phase 3 T2D ADA 2026 발표 (Positive — REIMAGINE 2 vs semaglutide 2.4mg: HbA1c -1.91% vs -1.75% p=0.0035, 체중 -14.2% vs -10.2% p<0.0001; REIMAGINE 3 +인슐린: HbA1c -2.33%, 체중 -12.0% vs +1.1%; 3개 시험 모두 1차 충족, Lancet 동시 게재)"
    type: Conference
    company: Novo Nordisk
    drug: CagriSema (cagrilintide + semaglutide)
    indication: Type 2 Diabetes
    phase: Phase 3
    conferenceId: ada
    trialDesign: "REIMAGINE 1/2/3 무작위 위약·활성 대조 Phase 3. 아밀린 작용제(cagrilintide) + GLP-1(semaglutide) 고정용량 복합. T2D 환자 HbA1c·체중 평가. ADA 2026 심포지엄 6/7 발표 + Novo R&D Investor Event 동시. 수치는 발표 후 확정"
    targetDisease: "제2형 당뇨 — 아밀린 + GLP-1 이중 기전으로 단일 성분 대비 혈당·체중 추가 개선 목표"
    priorTrialUrl: null
    moa: "아밀린 수용체 작용제 + GLP-1 수용체 작용제 고정용량 복합. 식욕·혈당·체중 다경로 조절"
    sources:
      - https://www.prnewswire.com/news-releases/novo-nordisk-advances-cardiometabolic-pipeline-with-new-data-featuring-cagrisema-and-zenagamtide-at-the-american-diabetes-associations-2026-scientific-sessions-302783110.html
      - https://www.prnewswire.com/news-releases/novo-nordisks-cagrisema-2-4-mg--2-4-mg-demonstrated-significant-reduction-in-hba1c-and-weight-across-multiple-studies-in-the-reimagine-program-presented-at-ada-2026--302793443.html
  - date: 2026-06-08
    ticker: LLY
    event: "Orforglipron ACHIEVE-2/3/5 Phase 3 T2D ADA 2026 발표 (경구 GLP-1 — ACHIEVE-3 oral sema 대비 HbA1c 우월·체중 추가감소)"
    type: Conference
    company: Eli Lilly
    drug: Orforglipron (Foundayo)
    indication: Type 2 Diabetes
    phase: Phase 3
    conferenceId: ada
    trialDesign: "ACHIEVE-2(vs dapagliflozin, HbA1c -1.7%/40주), ACHIEVE-3(vs 경구 semaglutide, HbA1c 우월+체중 더 감소/52주), ACHIEVE-5(+인슐린글라진, HbA1c -2.1%/40주). 비펩타이드 경구 GLP-1. ADA 2026 6/8 발표"
    targetDisease: "제2형 당뇨. 비만 적응증으로 이미 승인된 경구 GLP-1의 T2D 라벨 확장 — 주사제 대비 편의성"
    priorTrialUrl: https://investor.lilly.com/news-releases/news-release-details/lillys-oral-glp-1-orforglipron-demonstrated-statistically
    moa: "소분자 비펩타이드 경구 GLP-1 수용체 작용제(1일 1회). 인슐린분비↑·글루카곤↓·위배출 지연"
    sources:
      - https://www.prnewswire.com/news-releases/lilly-to-present-new-data-on-foundayo-mounjaro-and-retatrutide-at-the-american-diabetes-associations-86th-scientific-sessions-building-toward-a-new-era-of-choice-in-diabetes-and-obesity-care-302783855.html
      - https://investor.lilly.com/news-releases/news-release-details/lillys-oral-glp-1-orforglipron-demonstrated-statistically
  - date: 2026-06-12
    ticker: GMAB
    event: "Epcoritamab EPCORE DLBCL-1 Phase 3 R/R LBCL EHA 2026 oral (S235 — Positive PFS HR 0.74 [95% CI 0.60-0.92] 유의, OS HR 0.96 [0.77-1.20] 비유의; 단독 SC 이중특이항체 Ph3 PFS 첫 입증, vs 연구자선택 화학면역요법)"
    type: Conference
    company: Genmab
    drug: Epcoritamab (EPKINLY)
    indication: Relapsed/Refractory Large B-Cell Lymphoma
    phase: Phase 3
    conferenceId: eha
    trialDesign: "EPCORE DLBCL-1 무작위 Phase 3. 2L+ 재발/불응 DLBCL. epcoritamab 단독 SC vs 연구자 선택 화학면역요법. EHA 2026 Abstract S235 oral 6/12. 2026-01 topline 발표분의 상세 데이터"
    targetDisease: "재발/불응성 거대 B세포 림프종(DLBCL). CAR-T·이식 부적격 환자에서 off-the-shelf 이중특이항체 옵션"
    priorTrialUrl: https://www.businesswire.com/news/home/20260116529103/en/Genmab-Announces-Topline-Results-for-Epcoritamab-DuoBody-CD3xCD20-from-Phase-3-EPCORE-DLBCL-1-Trial-in-Patients-with-Relapsed-Refractory-Diffuse-Large-B-cell-Lymphoma-DLBCL
    moa: "CD3 × CD20 이중특이항체(DuoBody). T세포를 악성 B세포로 유도해 직접 사멸"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/21/3299787/0/en/genmab-to-highlight-advances-across-its-oncology-portfolio-at-the-2026-american-society-of-clinical-oncology-asco-annual-meeting-and-the-european-hematology-association-eha-2026-co.html
      - https://www.businesswire.com/news/home/20260116529103/en/Genmab-Announces-Topline-Results-for-Epcoritamab-DuoBody-CD3xCD20-from-Phase-3-EPCORE-DLBCL-1-Trial-in-Patients-with-Relapsed-Refractory-Diffuse-Large-B-cell-Lymphoma-DLBCL
  - date: 2026-06-14
    ticker: LLY
    event: "Pirtobrutinib BRUIN CLL-322 Phase 3 R/R CLL EHA 2026 Late-Breaking oral (LB5001 — PVR vs VR PFS 우월)"
    type: Conference
    company: Eli Lilly
    drug: Pirtobrutinib (Jaypirca)
    indication: Relapsed/Refractory CLL/SLL
    phase: Phase 3
    conferenceId: eha
    trialDesign: "BRUIN CLL-322 무작위 Phase 3. R/R CLL/SLL. pirtobrutinib+venetoclax+rituximab(PVR) vs venetoclax+rituximab(VR). Primary PFS 통계적 유의 우월. EHA 2026 Late-Breaking Oral LB5001 6/14"
    targetDisease: "재발/불응성 만성림프구성백혈병. 공유결합 BTK 억제제 실패·BTK 변이 환자에서 가역적 BTK 억제 옵션"
    priorTrialUrl: https://www.prnewswire.com/news-releases/lillys-jaypirca-pirtobrutinib-significantly-extended-progression-free-survival-when-added-to-a-venetoclax-time-limited-regimen-in-patients-with-previously-treated-cllsll-302739912.html
    moa: "비공유결합 가역적 BTK 억제제. BTK C481·일부 비C481 변이에서도 활성 유지"
    sources:
      - https://www.prnewswire.com/news-releases/lilly-to-spotlight-growing-hematology-portfolio-at-2026-european-hematology-association-eha-annual-meeting-302787526.html
      - https://www.prnewswire.com/news-releases/lillys-jaypirca-pirtobrutinib-significantly-extended-progression-free-survival-when-added-to-a-venetoclax-time-limited-regimen-in-patients-with-previously-treated-cllsll-302739912.html
  - date: 2026-11-30
    ticker: VRTX
    event: "Povetacicept IgAN BLA PDUFA (가속승인; 2026-06-01 FDA 수리, RAINIER Ph3 UPCR -52%)"
    type: PDUFA
    company: Vertex Pharmaceuticals
    drug: Povetacicept
    indication: IgA Nephropathy
    phase: BLA (Accelerated Approval)
    conferenceId: null
    trialDesign: "RAINIER Phase 3 무작위 위약대조 — 성인 IgAN. UPCR(단백뇨) 위약대비 -52% (대리지표 기반 가속승인). BLA 2026-06-01 FDA 수리, PDUFA 2026-11-30"
    targetDisease: "IgA 신병증 — 이상 IgA1 면역복합체가 사구체 메산지움에 침착해 단백뇨·신기능 저하. 기존 RAS/SGLT2 보완 면역조절 옵션"
    priorTrialUrl: null
    moa: "BAFF + APRIL 이중 차단 융합단백질(TACI-Fc). 병원성 IgA 생산 B세포 신호 동시 억제"
    sources:
      - https://www.businesswire.com/news/home/20260601424914/en/Vertex-Announces-US-FDA-Acceptance-of-Biologics-License-Application-for-Accelerated-Approval-of-Povetacicept-in-IgA-Nephropathy
      - https://investors.vrtx.com/news-releases/news-release-details/vertex-announces-us-fda-acceptance-biologics-license-application
  - date: 2026-12-23
    ticker: GILD
    event: "Anito-cel (anitocabtagene autoleucel) r/r 다발골수종 BLA PDUFA (Arcellx 인수 완료, iMMagine-1 Ph2)"
    type: PDUFA
    company: Gilead Sciences
    drug: Anitocabtagene autoleucel (anito-cel)
    indication: Relapsed/Refractory Multiple Myeloma
    phase: BLA
    conferenceId: null
    trialDesign: "iMMagine-1 Phase 2 단일군 피벗 + Phase 1 지원. r/r 다발골수종. D-Domain BCMA 결합체로 낮은 tonic signaling·고발현 CAR 설계. BLA 2026-02-23 FDA 수리, PDUFA 2026-12-23. Gilead가 Arcellx 인수 완료"
    targetDisease: "재발/불응성 다발골수종(4L+). 기존 BCMA CAR-T(ide-cel/cilta-cel) 이후 차별화 D-Domain 설계로 내구성 반응 목표"
    priorTrialUrl: null
    moa: "BCMA 표적 자가 CAR-T. D-Domain 결합체가 BCMA에 빠르게 결합·분리해 tonic signaling 최소화→CAR-T 지속성 향상"
    sources:
      - https://www.gilead.com/news/news-details/2026/gilead-sciences-completes-acquisition-of-arcellx-ahead-of-potential-commercial-launch-of-anito-cel
      - https://www.businesswire.com/news/home/20260223744889/en/Gilead-Sciences-to-Acquire-Arcellx-to-Maximize-Long-term-Potential-of-Anito-cel
  - date: 2026-09-30
    ticker: SRRK
    event: "Apitegromab SMA BLA 재심사 PDUFA (CMC/제조 CRL 해결 후 재제출; SAPPHIRE Ph3 HFMSE 충족)"
    type: PDUFA
    company: Scholar Rock
    drug: Apitegromab
    indication: Spinal Muscular Atrophy (Types 2 & 3)
    phase: BLA (Resubmission)
    conferenceId: null
    trialDesign: "SAPPHIRE Phase 3 무작위 위약대조 — 2~21세 비보행 SMA 2/3형, SMN 치료 병용. Primary 운동기능(HFMSE) 개선 충족(2024-10). CMC/제조시설 CRL 해결 후 2026-03-31 재제출, PDUFA 2026-09-30"
    targetDisease: "SMA 2·3형 — SMN 결손에 의한 진행성 근위축. 기존 SMN 치료(생존신경 보충)에 근육 기능 직접 강화를 더하는 보완 기전"
    priorTrialUrl: https://investors.scholarrock.com/news-releases/news-release-details/scholar-rock-resubmits-biologics-license-application-bla-fda
    moa: "선택적 myostatin(GDF-8) 전구체 억제 항체. 근육 성장 억제 신호 차단→근력·운동기능 개선"
    sources:
      - https://investors.scholarrock.com/news-releases/news-release-details/scholar-rock-resubmits-biologics-license-application-bla-fda
      - https://www.curesma.org/fda-accepts-scholar-rocks-biologics-license-application-bla-to-review-apitegromab-for-sma/
  - date: 2026-07-23
    ticker: SNY
    event: "Sarclisa SC (isatuximab, on-body injector) 다발골수종 BLA PDUFA (최초 OBI 항암제 후보; IRAKLIA Ph3 ORR 비열등 71.1% vs 70.5%)"
    type: PDUFA
    company: Sanofi
    drug: Sarclisa SC (isatuximab-irfc, on-body injector)
    indication: Relapsed/Refractory Multiple Myeloma
    phase: BLA (sBLA)
    conferenceId: null
    trialDesign: "IRAKLIA Phase 3 (n=531) 무작위 오픈라벨 — isatuximab SC 1400mg(OBI) + Pd vs IV 10mg/kg + Pd. RRMM(1L+). co-primary ORR·Ctrough 비열등성 충족(ORR 71.1% vs 70.5%). FDA 3개월 연장 후 PDUFA 2026-07-23"
    targetDisease: "재발/불응성 다발성골수종. 기존 Sarclisa IV(수 시간 주입)를 OBI 피하주사(~5분, 자가투여)로 전환 — 환자·병원 부담 감소"
    priorTrialUrl: null
    moa: "CD38 표적 단클론항체(ADCC·CDC·ADCP·직접 아포토시스). SC OBI 제형으로 IV 동등 효능+편의성"
    sources:
      - https://www.sanofi.com/en/media-room/press-releases/2026/2026-04-22-05-00-00-3278646
      - https://www.onclive.com/view/fda-extends-review-period-for-subcutaneous-isatuximab-bla-in-multiple-myeloma
  - date: 2026-05-12
    ticker: AGIO
    event: "Mitapivat SCD 가속승인 sNDA FDA 제출 — RISE UP Phase 3 혈색소 반응(Hb ≥1.0 g/dL↑) surrogate endpoint 기반. 확인적 RCT 동시 합의, 60일 filing review 후 수리 통보 3Q 2026 예상"
    type: Regulatory
    company: Agios Pharmaceuticals
    drug: Mitapivat (Pyrukynd)
    indication: Sickle Cell Disease
    phase: sNDA (Accelerated Approval)
    sources:
      - https://www.globenewswire.com/news-release/2026/05/12/3293011/31990/en/Agios-Submits-sNDA-to-FDA-for-U-S-Accelerated-Approval-of-Mitapivat-in-Sickle-Cell-Disease.html
      - https://investor.agios.com/news-releases/news-release-details/agios-submits-snda-fda-us-accelerated-approval-mitapivat-sickle
  - date: 2026-05-22
    ticker: GILD
    event: "Hepcludex(bulevirtide) 만성 D형간염(HDV) 미국 첫 가속승인 — MYR301 Phase 3 기반, 임상적 이득 확인 후속시험 조건부"
    type: PDUFA
    company: Gilead Sciences
    drug: Bulevirtide (Hepcludex)
    indication: Chronic Hepatitis Delta (HDV)
    phase: BLA (Accelerated Approval)
    sources:
      - https://www.gilead.com/news/news-details/2026/fda-grants-accelerated-approval-to-gileads-hepcludex-bulevirtide-gmod-the-first-and-only-approved-treatment-for-chronic-hepatitis-delta-virus-hdv
      - https://www.businesswire.com/news/home/20260522569258/en/FDA-Grants-Accelerated-Approval-to-Gileads-Hepcludex-bulevirtide-gmod-the-First-and-Only-Approved-Treatment-for-Chronic-Hepatitis-Delta-Virus-HDV
  - date: 2026-06-09
    ticker: LLY
    event: "EBGLYSS(lebrikizumab) 8주 1회 유지용량 적응증 FDA 승인 — 중등도~중증 아토피피부염(12세+), 기존 4주 용법 확장 (ADjoin 장기연장 + PK 모델 기반)"
    type: PDUFA
    company: Eli Lilly
    drug: Lebrikizumab (EBGLYSS)
    indication: Moderate-to-Severe Atopic Dermatitis (maintenance Q8W)
    phase: sBLA
    sources:
      - https://www.prnewswire.com/news-releases/fda-approves-lillys-ebglyss-lebrikizumab-lbkz-for-one-maintenance-dose-every-eight-weeks-in-patients-with-moderate-to-severe-atopic-dermatitis-302795876.html
      - https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-ebglyssr-lebrikizumab-lbkz-one-maintenance
  - date: 2026-06-11
    ticker: JNJ
    event: "Nipocalimab(IMAAVY) ENERGY Phase 2/3 wAIHA EHA 2026 oral (S300) — 첫 양성 피벗 데이터: 지속적 혈색소 반응 + 빠른 효과 발현. FDA 우선심사 진행 중"
    type: Conference
    company: Johnson & Johnson
    drug: Nipocalimab (IMAAVY)
    indication: Warm Autoimmune Hemolytic Anemia (wAIHA)
    phase: Phase 2/3
    conferenceId: eha
    trialDesign: "ENERGY 무작위 이중맹검 위약대조 Phase 2/3 (n=115). wAIHA 성인 nipocalimab 15/30 mg/kg vs 위약 24주. Primary 지속적 혈색소 반응(durable Hgb response). FDA Priority Review 중"
    targetDisease: "온난항체 자가면역용혈빈혈(wAIHA). IgG 자가항체가 적혈구 파괴 → 희귀 자가면역 혈액질환, FDA 승인 치료제 부재"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04119050
    moa: "FcRn 차단으로 병원성 IgG 자가항체 선택적 감소 (B세포 직접 파괴 없음)"
    sources:
      - https://www.jnj.com/media-center/press-releases/imaavy-nipocalimab-aahu-demonstrates-durable-hemoglobin-response-and-rapid-onset-of-effect-in-pivotal-phase-2-3-study-in-warm-autoimmune-hemolytic-anemia-waiha-an-autoantibody-driven-disease-with-no-fda-approved-therapies
  - date: 2026-06-13
    ticker: ABBV
    event: "Epcoritamab + R2 EPCORE FL-1 Phase 3 R/R 여포림프종 EHA 2026 oral — ORR 95% vs 79%, CR 83% vs 50%, PFS HR 0.21 (vs R2 단독)"
    type: Conference
    company: AbbVie
    drug: Epcoritamab (EPKINLY) + rituximab + lenalidomide (R2)
    indication: Relapsed/Refractory Follicular Lymphoma
    phase: Phase 3
    conferenceId: eha
    trialDesign: "EPCORE FL-1 무작위 Phase 3 — SC epcoritamab + R2 vs R2 단독, R/R FL ≥1 prior line. ORR 95% vs 79%, CR 83% vs 50%, PFS HR 0.21. 서브그룹 분석 포함 구두 발표"
    targetDisease: "재발/불응성 여포림프종(FL). 1차 이상 치료 경험 환자 — 고정기간 이중특이항체 병용으로 깊은 반응 목표"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05409066
    moa: "CD3×CD20 이중특이항체(T세포 인게이저) + 항CD20(rituximab) + IMiD(lenalidomide) 삼중 병용"
    sources:
      - https://news.abbvie.com/2026-06-08-AbbVie-Presents-New-Data-Across-Its-Blood-Cancer-Portfolio-at-EHA-2026
  - date: 2026-06-14
    ticker: JNJ
    event: "Talquetamab(TALVEY) MonumenTAL-3 Phase 3 R/R 다발골수종 EHA 2026 Plenary — talquetamab+daratumumab ± pomalidomide vs DPd (EHA 6대 최우수 추상)"
    type: Conference
    company: Johnson & Johnson
    drug: Talquetamab (TALVEY) + daratumumab (DARZALEX FASPRO)
    indication: Relapsed/Refractory Multiple Myeloma (≥1 prior line)
    phase: Phase 3
    conferenceId: eha
    trialDesign: "MonumenTAL-3 무작위 Phase 3 — talquetamab + daratumumab ± pomalidomide vs daratumumab+pomalidomide+dex(DPd), RRMM ≥1 prior line. EHA 2026 Plenary 선정"
    targetDisease: "재발/불응성 다발골수종. 2차 이상 치료 경험 — GPRC5D 표적 이중특이항체를 조기 라인으로 확장"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05455320
    moa: "Talquetamab: GPRC5D×CD3 이중특이항체로 T세포 매개 골수종세포 사멸. Daratumumab: CD38 표적 항체(ADCC·CDC·식세포작용)"
    sources:
      - https://www.jnj.com/media-center/press-releases/johnson-johnson-showcases-hematology-leadership-with-30-presentations-at-the-2026-european-hematology-association-eha-congress
  - date: 2026-08-17
    ticker: BMY
    event: "Iberdomide + dara/dex (IberDd) R/R 다발골수종 NDA PDUFA — 첫 CELMoD 계열 승인 도전, EXCALIBER-RRMM Phase 3"
    type: PDUFA
    company: Bristol Myers Squibb
    drug: Iberdomide (CC-220)
    indication: Relapsed/Refractory Multiple Myeloma (1-2 prior lines)
    phase: NDA
    trialDesign: "EXCALIBER-RRMM (NCT04975997) 무작위 오픈라벨 Phase 3 — iberdomide+daratumumab+dex(IberDd) vs daratumumab+bortezomib+dex(DVd), 1~2차 경험 R/R MM. 이중 1차 MRD 음성률·PFS"
    targetDisease: "재발/불응성 다발골수종. 1~2회 선행요법 후 진행 — lenalidomide/pomalidomide 후속 CELMoD로 더 깊은 cereblon 결합"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04975997
    moa: "차세대 CELMoD(cereblon E3 ligase modulator). IKZF1/IKZF3(Ikaros/Aiolos) 선택적 분해 → 골수종세포 사멸 + 면역 활성화"
    sources:
      - https://news.bms.com/news/corporate-financial/2026/U-S--Food-and-Drug-Administration-Accepts-Bristol-Myers-Squibbs-New-Drug-Application-for-Iberdomide-in-Patients-with-Relapsed-or-Refractory-Multiple-Myeloma/default.aspx
  - date: 2026-09-19
    ticker: RARE
    event: "UX111(rebisufligene etisparvovec) Sanfilippo A형(MPS IIIA) BLA 재제출 PDUFA — AAV9 유전자치료, 가속승인 신청"
    type: PDUFA
    company: Ultragenyx Pharmaceutical
    drug: UX111 (rebisufligene etisparvovec)
    indication: Sanfilippo Syndrome Type A (MPS IIIA)
    phase: BLA (Resubmission, Accelerated Approval)
    trialDesign: "AAV9 벡터 단회 IV 유전자치료. CSF 헤파란황산(HS) 감소 + 신경발달 임상기능 개선 — 자연경과 대비 유의한 안정화. 최대 8년 추적. BLA 재제출 2026-04-02 FDA 수락"
    targetDisease: "Sanfilippo 증후군 A형(MPS IIIA) — SGSH 효소 결핍으로 헤파란황산 뇌 축적 → 진행성 신경퇴행·조기사망(20대 초). 승인 치료제 부재"
    priorTrialUrl: https://www.globenewswire.com/news-release/2026/04/02/3267337/20739/en/Ultragenyx-Announces-U-S-FDA-Acceptance-of-BLA-Resubmission-for-UX111-AAV-Gene-Therapy-to-Treat-Sanfilippo-Syndrome-Type-A-MPS-IIIA.html
    moa: "AAV9 벡터로 기능성 SGSH 유전자를 CNS 세포에 단회 전달 → 결핍 효소 보충, 헤파란황산 기질 축적 교정"
    sources:
      - https://www.globenewswire.com/news-release/2026/04/02/3267337/20739/en/Ultragenyx-Announces-U-S-FDA-Acceptance-of-BLA-Resubmission-for-UX111-AAV-Gene-Therapy-to-Treat-Sanfilippo-Syndrome-Type-A-MPS-IIIA.html
  - date: 2026-09-22
    ticker: IONS
    event: "Zilganersen(ION373) Alexander병(AxD) NDA PDUFA — 첫 ASO 치료제, 우선심사. Phase 1-3 10MWT 보행속도 +33.3% (p=0.0412)"
    type: PDUFA
    company: Ionis
    drug: Zilganersen (ION373)
    indication: Alexander Disease (AxD)
    phase: NDA (Priority Review)
    trialDesign: "Phase 1-3 무작위 이중맹검 다중상승용량 (NCT04849741), AxD 54명(1.5~53세) 13개국. 61주 10미터 보행속도(10MWT) 1차 — zilganersen 50mg vs 위약 LSM 차이 33.3% (p=0.0412)"
    targetDisease: "Alexander병(AxD) — GFAP 변이 희귀 진행성 신경퇴행. 영유아기 발병, 보행장애·경련·연하곤란·호흡부전, 조기사망. 승인 치료제 부재"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04849741
    moa: "GFAP mRNA 표적 2세대 ASO. GFAP 단백 과발현 억제 → Rosenthal fiber 축적·성상세포 기능이상 교정"
    sources:
      - https://ir.ionis.com/news-releases/news-release-details/ionis-announces-zilganersen-new-drug-application-alexander
  - date: 2026-09-27
    ticker: PRAX
    event: "Relutrigine(PRAX-562) SCN2A/SCN8A DEE NDA PDUFA — 첫 표적 치료제, 우선심사·희귀소아질환 지정. EMBOLD 운동발작 -46% 조기종료"
    type: PDUFA
    company: Praxis Precision Medicines
    drug: Relutrigine (PRAX-562)
    indication: SCN2A/SCN8A Developmental and Epileptic Encephalopathies (DEEs)
    phase: NDA (Priority Review)
    trialDesign: "EMBOLD Phase 2 (NCT05818553) 무작위 위약대조 — SCN2A/SCN8A-DEE 16명, 4개월. 1차 운동발작 빈도 위약대비 -46% — DMC 권고로 조기 효능 종료 후 NDA"
    targetDisease: "SCN2A/SCN8A 변이 발달뇌전증(DEE). 영유아기 난치성 발작·발달퇴행·조기사망 희귀 유전 뇌질환, 표적 승인 치료제 부재"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT05818553
    moa: "지속성 나트륨 전류(persistent sodium current) 선택적 억제 — 기능획득 변이로 인한 과흥분성 정상화"
    sources:
      - https://www.globenewswire.com/news-release/2026/03/30/3264996/0/en/Praxis-Precision-Medicines-Announces-FDA-Acceptance-and-Priority-Review-of-New-Drug-Application-for-Relutrigine-in-Patients-with-SCN2A-and-SCN8A-DEEs.html
  - date: 2026-11-27
    ticker: BBIO
    event: "BBP-418(riboflavin analog) LGMD2I/R9 NDA PDUFA — LGMD 첫 치료제 도전, 우선심사(자문위 미개최). FORTIFY Phase 3 전 평가변수 충족"
    type: PDUFA
    company: BridgeBio
    drug: BBP-418
    indication: Limb-Girdle Muscular Dystrophy Type 2I/R9 (LGMD2I/R9)
    phase: NDA (Priority Review)
    trialDesign: "FORTIFY Phase 3 — LGMD2I/R9 환자. 모든 1·2차 평가변수 충족(2026 발표). FDA NDA 2026-05-27 수락 + Priority Review, 자문위 미개최 예정"
    targetDisease: "지대형 근이영양증 2I/R9형(LGMD2I/R9) — FKRP 변이로 α-dystroglycan 글리코실화 결손 → 진행성 근위약. 어떤 형태의 LGMD에도 승인 치료제 부재"
    priorTrialUrl: null
    moa: "경구 ribitol(리보플라빈 유사체) 전구체. α-dystroglycan 글리코실화 기질 보충 → 근섬유막 안정화"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/27/3301817/0/en/bridgebio-announces-fda-acceptance-and-priority-review-of-nda-for-bbp-418-for-lgmd2i-r9.html
  - date: 2026-06-29
    ticker: ARQT
    event: ZORYVE(roflumilast) 크림 0.3% 소아 판상건선(2~5세) 적응증 확대 sNDA PDUFA
    type: PDUFA
    company: Arcutis Biotherapeutics
    drug: ZORYVE (roflumilast) cream 0.3%
    indication: Plaque psoriasis in children ages 2 to 5
    phase: sNDA
    sources:
      - https://www.arcutis.com/fda-accepts-supplemental-new-drug-application-for-arcutis-zoryve-roflumilast-cream-0-3-for-the-treatment-of-plaque-psoriasis-in-children-ages-2-to-5/
      - https://www.globenewswire.com/news-release/2025/11/17/3189050/0/en/FDA-Accepts-Supplemental-New-Drug-Application-for-Arcutis-ZORYVE-roflumilast-Cream-0-3-for-the-Treatment-of-Plaque-Psoriasis-in-Children-Ages-2-to-5.html
  - date: 2026-08-25
    ticker: ONC
    event: TEVIMBRA(tislelizumab) + ZIIHERA(zanidatamab) + 화학요법 1L HER2+ 위/위식도접합부 선암 sBLA PDUFA (RTOR, HERIZON-GEA-01 Ph3 OS 우월). Jazz와 공동개발
    type: PDUFA
    company: BeOne Medicines
    drug: TEVIMBRA (tislelizumab) + ZIIHERA (zanidatamab) + chemo
    indication: First-line HER2-positive gastric / GEJ / esophageal adenocarcinoma
    phase: sBLA
    sources:
      - https://www.prnewswire.com/news-releases/jazz-pharmaceuticals-announces-fda-acceptance-and-priority-review-of-supplemental-biologics-license-application-for-ziihera-zanidatamab-hrii-combinations-in-first-line-her2-locally-advanced-or-metastatic-gea-302753741.html
      - https://www.businesswire.com/news/home/20260429582815/en/U.S.-FDA-Grants-Priority-Review-to-BeOne-Medicines-TEVIMBRA-in-First-Line-HER2-GEA
  - date: 2026-09-26
    ticker: MIRM
    event: Zilurgisertib(경구 ALK2 억제제) FOP NDA PDUFA (우선심사, PROGRESS Ph2 pivotal). Incyte로부터 라이선스
    type: PDUFA
    company: Mirum Pharmaceuticals
    drug: zilurgisertib
    indication: Fibrodysplasia Ossificans Progressiva (FOP), 12세 이상
    phase: NDA (Priority Review)
    sources:
      - https://ir.mirumpharma.com/news/news-details/2026/Mirum-Pharmaceuticals-Reports-First-Quarter-2026-Financial-Results-and-Provides-Business-Update/default.aspx
  - date: 2026-11-14
    ticker: CYTK
    event: Aficamten(MYQORZO) 폐쇄성 비대성 심근증 sNDA PDUFA — MAPLE-HCM Ph3(아피캄텐 vs 메토프롤롤 우월) 기반 라벨 확대
    type: PDUFA
    company: Cytokinetics
    drug: aficamten (MYQORZO)
    indication: Symptomatic obstructive hypertrophic cardiomyopathy (oHCM)
    phase: sNDA
    sources:
      - https://ir.cytokinetics.com/press-releases/press-release-details/2026/Cytokinetics-Reports-First-Quarter-2026-Financial-Results-and-Provides-Business-Update/default.aspx
  - date: 2026-11-22
    ticker: SVRA
    event: MOLBREEVI(molgramostim) 자가면역 폐포단백증(aPAP) BLA PDUFA — 3개월 연장(기존 8/22 → 11/22)
    type: PDUFA
    company: Savara
    drug: MOLBREEVI (molgramostim inhalation solution)
    indication: Autoimmune Pulmonary Alveolar Proteinosis (autoimmune PAP)
    phase: BLA (Priority Review)
    sources:
      - https://investors.savarapharma.com/news/news-details/2026/Savara-Announces-the-U-S--Food--Drug-Administration-FDA-Has-Extended-the-Review-Period-for-the-Molgramostim-Inhalation-Solution-Molgramostim-Biologics-License-Application-BLA-in-Autoimmune-Pulmonary-Alveolar-Proteinosis-Autoimmune-PAP/default.aspx
      - https://investors.savarapharma.com/news/news-details/2026/Savara-Announces-the-U-S--Food-and-Drug-Administration-FDA-Filed-the-MOLBREEVI-Biologics-License-Application-BLA-in-Autoimmune-Pulmonary-Alveolar-Proteinosis-Autoimmune-PAP/default.aspx
  - date: 2026-07-30
    ticker: VTRS
    event: 저용량 에스트로겐 주간 피임패치(norelgestromin/EE) NDA PDUFA (505(b)(2))
    type: PDUFA
    company: Viatris
    drug: Low-dose estrogen weekly contraceptive patch (norelgestromin / ethinyl estradiol)
    indication: Combined hormonal contraception
    phase: NDA (505(b)(2))
    sources:
      - https://www.prnewswire.com/news-releases/viatris-provides-pipeline-update-on-four-regulatory-milestones-302645311.html
  - date: 2026-08-17
    ticker: PFE
    event: PADCEV(enfortumab vedotin) + Keytruda 근육침윤성 방광암(MIBC) 주변요법 sBLA PDUFA — 시스플라틴 적격 무관 적응증 확대 (EV-304/KEYNOTE-B15 Ph3)
    type: PDUFA
    company: Pfizer
    drug: PADCEV (enfortumab vedotin-ejfv) + Keytruda (pembrolizumab)
    indication: Perioperative muscle-invasive bladder cancer (regardless of cisplatin eligibility)
    phase: sBLA (Priority Review)
    sources:
      - https://www.pfizer.com/news/press-release/press-release-detail/us-fda-grants-priority-review-sbla-padcevtm-keytrudar
      - https://www.prnewswire.com/news-releases/us-fda-grants-priority-review-to-sbla-for-padcev--keytruda-as-perioperative-treatment-for-muscle-invasive-bladder-cancer-regardless-of-cisplatin-eligibility-302746360.html
  - date: 2026-09-11
    ticker: TLX
    event: Pixclara(TLX101-Px, 18F-FET) 신경교종 영상진단 NDA PDUFA (재제출 수락)
    type: PDUFA
    company: Telix Pharmaceuticals
    drug: Pixclara (TLX101-Px, Floretyrosine F-18 / 18F-FET)
    indication: Glioma imaging (PET)
    phase: NDA
    sources:
      - https://telixpharma.com/news-views/fda-accepts-nda-for-tlx101-px-pixclara/
  - date: 2026-10-24
    ticker: PHAR
    event: Joenja(leniolisib) 소아 APDS(4~11세) sNDA 재제출 PDUFA (1/30 CRL 후 재제출)
    type: PDUFA
    company: Pharming Group
    drug: Joenja (leniolisib)
    indication: Activated PI3K-delta syndrome (APDS), children 4-11y
    phase: sNDA (resubmission)
    sources:
      - https://www.globenewswire.com/news-release/2026/06/04/3306506/0/en/pharming-announces-u-s-fda-acceptance-of-snda-resubmission-for-joenja-leniolisib-to-treat-children-aged-4-to-11-years-with-apds.html
      - https://www.sec.gov/Archives/edgar/data/0001828316/000182831626000031/pharmingannouncesusfdaacce.htm
  - date: 2026-12-12
    ticker: VNDA
    event: Imsidolimab 전신농포건선(GPP) BLA PDUFA
    type: PDUFA
    company: Vanda Pharmaceuticals
    drug: imsidolimab
    indication: Generalized Pustular Psoriasis (GPP)
    phase: BLA
    sources:
      - https://www.prnewswire.com/news-releases/vanda-pharmaceuticals-announces-fda-acceptance-of-biologics-license-application-filing-for-imsidolimab-for-the-treatment-of-generalized-pustular-psoriasis-302696991.html
  - date: 2026-12-22
    ticker: MLYS
    event: Lorundrostat(알도스테론 합성효소 억제제) 고혈압 NDA PDUFA (Launch-HTN/Advance-HTN Ph3)
    type: PDUFA
    company: Mineralys Therapeutics
    drug: lorundrostat
    indication: Hypertension (adjunct)
    phase: NDA
    sources:
      - https://ir.mineralystx.com/news-events/press-releases/detail/93/mineralys-therapeutics-announces-fda-acceptance-of-nda-for
  - date: 2027-01-04
    ticker: NUVB
    event: IBTROZI(taletrectinib) 진행성 ROS1+ NSCLC sNDA PDUFA — DoR 갱신 데이터(TRUST-I/II)
    type: PDUFA
    company: Nuvation Bio
    drug: IBTROZI (taletrectinib)
    indication: Advanced ROS1-positive NSCLC
    phase: sNDA
    sources:
      - https://www.prnewswire.com/news-releases/nuvation-bio-announces-fda-acceptance-of-supplemental-new-drug-application-for-ibtrozi-taletrectinib-with-updated-duration-of-response-in-advanced-ros1-positive-non-small-cell-lung-cancer-302763329.html
  - date: 2027-01-06
    ticker: IBRX
    event: ANKTIVA + BCG BCG-불응성 유두형(papillary-only) NMIBC sBLA PDUFA — 적응증 확대(CIS→유두형)
    type: PDUFA
    company: ImmunityBio
    drug: ANKTIVA (nogapendekin alfa inbakicept-pmln) + BCG
    indication: BCG-unresponsive papillary NMIBC (without CIS)
    phase: sBLA
    sources:
      - https://immunitybio.com/immunitybio-announces-fda-acceptance-of-supplemental-bla-for-anktiva-plus-bcg-in-bcg-unresponsive-non-muscle-invasive-bladder-cancer-with-papillary-disease-pdufa-date-set-for-january-6-2027/
      - https://www.businesswire.com/news/home/20260519760562/en/ImmunityBio-Announces-FDA-Acceptance-of-Supplemental-BLA-for-ANKTIVA-Plus-BCG-in-BCG-Unresponsive-Non-Muscle-Invasive-Bladder-Cancer-with-Papillary-Disease-PDUFA-Date-Set-for-January-6-2027
```
