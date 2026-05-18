# Catalyst Events

다가오는 카탈리스트(PDUFA, Conference, Clinical Readout, Earnings).
이벤트 1개 = yaml 항목 1개. `type`은 `PDUFA | Conference | Clinical Readout | Earnings | Regulatory` 중 하나.

```yaml
events:
  - date: 2026-02-21
    ticker: VNDA
    event: Bysanti 승인됨 (2/20 조기 승인)
    type: PDUFA
    company: Vanda
    drug: Bysanti
    indication: Schizophrenia
    phase: NDA
    sources:
      - https://www.prnewswire.com/news-releases/vanda-pharmaceuticals-announces-fda-approval-of-bysanti-milsaperidone-for-the-treatment-of-bipolar-i-disorder-and-schizophrenia---a-new-chemical-entity-opening-new-horizons-in-psychiatric-innovation-302693941.html
  - date: 2026-02-24
    ticker: REGN
    event: Dupixent AFRS 승인됨
    type: PDUFA
    company: Regeneron
    drug: Dupixent
    indication: AFRS
    phase: sBLA
    sources:
      - https://investor.regeneron.com/news-releases/news-release-details/dupixentr-dupilumab-approved-us-first-and-only-medicine-allergic/
  - date: 2026-03-06
    ticker: LNTH
    event: PYLARIFY TruVu 승인됨
    type: PDUFA
    company: Lantheus
    drug: PYLARIFY
    indication: PSMA PET
    phase: sNDA
    sources:
      - https://investor.lantheus.com/news-releases/news-release-details/lantheus-announces-fda-approval-pylarify-truvutm-piflufolastat-f
  - date: 2026-03-06
    ticker: BMY
    event: Sotyktu PsA 승인됨
    type: PDUFA
    company: Bristol Myers Squibb
    drug: Sotyktu
    indication: Psoriatic Arthritis
    phase: sNDA
    sources:
      - https://news.bms.com/news/corporate-financial/2026/U-S--FDA-Approves-Bristol-Myers-Squibbs-Sotyktu-deucravacitinib-for-the-Treatment-of-Adults-with-Active-Psoriatic-Arthritis/default.aspx
  - date: 2026-03-20
    ticker: RYTM
    event: Setmelanotide 시상하부 비만 승인됨 (2026-03-19)
    type: PDUFA
    company: Rhythm
    drug: IMCIVREE
    indication: Hypothalamic Obesity
    phase: sNDA
    sources:
      - https://ir.rhythmtx.com/news-releases/news-release-details/rhythm-pharmaceuticals-announces-fda-approval-of-imcivree-0
  - date: 2026-03-27
    ticker: RCKT
    event: KRESLADI LAD-I 승인됨
    type: PDUFA
    company: Rocket
    drug: KRESLADI
    indication: LAD-I
    phase: BLA
    sources:
      - https://ir.rocketpharma.com/news-releases/news-release-details/rocket-pharmaceuticals-announces-fda-approval-kresladitm
  - date: 2026-04-03
    ticker: BIIB
    event: Nusinersen 고용량 SMA 승인됨 (2026-03-30)
    type: PDUFA
    company: Biogen
    drug: Nusinersen
    indication: SMA
    phase: sNDA
    sources:
      - https://investors.biogen.com/news-releases/news-release-details/fda-approves-new-high-dose-regimen-spinrazar-nusinersen-spinal
  - date: 2026-04-01
    ticker: LLY
    event: "Foundayo (orforglipron) 비만 NDA 승인됨 (2026-04-01, CNPV 가속). FDA 4/14 추가 liver/CV 안전성 평가 요구 (post-marketing 표준), 4/30 liver failure adverse event 1건 보고 — Lilly 5/4 공식 응답: Global Patient Safety가 약물 인과관계 없음 평가, 11,000명 Phase 3 program에서 hepatic signal 없음. 분석가들 'one liver case does not make a signal'"
    type: PDUFA
    company: Eli Lilly
    drug: Orforglipron (Foundayo)
    indication: Obesity
    phase: NDA
    sources:
      - https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill
      - https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program
      - https://endpoints.news/fda-asks-for-more-data-on-lillys-foundayo-to-assess-heart-liver-risks/
      - https://www.biopharmadive.com/news/fda-foundayo-liver-safety-eli-lilly/817556/
      - https://www.biospace.com/drug-development/foundayos-liver-failure-blip-weighs-down-lilly-shares-but-analysts-unconcerned
      - https://www.statnews.com/2026/05/05/biotech-news-analysts-glossing-over-eli-lilly-liver-case/
  - date: 2026-04-22
    ticker: XENE
    event: Azetukalner X-TOLE2 AAN 발표 (Positive — 53.2% seizure reduction vs 10.4% placebo)
    type: Conference
    company: Xenon
    drug: Azetukalner
    indication: Focal Seizures
    phase: Phase 3
    sources:
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
    event: Daraxonrasib RASolute 302 Phase 3 mPDAC ASCO plenary LBA
    type: Conference
    company: Revolution Medicines
    drug: Daraxonrasib (RMC-6236)
    indication: Metastatic Pancreatic Cancer
    phase: Phase 3
    conferenceId: asco
    sources:
      - https://ir.revmed.com/news-releases/news-release-details/revolution-medicines-present-pivotal-phase-3-rasolute-302
      - https://www.globenewswire.com/news-release/2026/04/21/3278211/0/en/Revolution-Medicines-to-Present-Pivotal-Phase-3-RASolute-302-Clinical-Trial-Results-for-Daraxonrasib-in-Previously-Treated-Metastatic-Pancreatic-Cancer-During-a-Plenary-Session-at-.html
  - date: 2026-05-31
    ticker: SMMT
    event: Ivonescimab HARMONi-6 Phase 3 1L sq-NSCLC ASCO plenary LBA
    type: Conference
    company: Summit Therapeutics
    drug: Ivonescimab (SMT112)
    indication: 1L Squamous NSCLC
    phase: Phase 3
    conferenceId: asco
    sources:
      - https://oncodaily.com/oncolibrary/asco-2026-plenary-session-key-trials
      - https://www.gurufocus.com/news/8806712/positive-outlook-for-summit-therapeutics-smmt-following-asco-plenary-selection
  - date: 2026-06-02
    ticker: COGT
    event: Bezuclastinib PEAK Phase 3 GIST ASCO oral
    type: Conference
    company: Cogent
    drug: Bezuclastinib
    indication: GIST
    phase: Phase 3
    sources:
      - https://www.globenewswire.com/news-release/2026/04/21/3277881/0/en/cogent-biosciences-announces-oral-presentation-of-positive-phase-3-peak-trial-in-gastrointestinal-stromal-tumors-gist-at-the-2026-american-society-of-clinical-oncology-asco-annual-.html
  - date: 2026-06-02
    ticker: INCY
    event: Tafasitamab Phase 3 ASCO 2026
    type: Conference
    company: Incyte
    drug: Tafasitamab
    indication: DLBCL
    phase: Phase 3
    sources:
      - https://www.businesswire.com/news/home/20260421480376/en/Incyte-Highlights-New-Phase-3-Tafasitamab-Data-at-the-2026-American-Society-of-Clinical-Oncology-ASCO-Annual-Meeting
  - date: 2026-06-02
    ticker: IRON
    event: DISC-0974 RALLY-MF Phase 2 ASCO oral
    type: Conference
    company: Disc Medicine
    drug: DISC-0974
    indication: Myelofibrosis Anemia
    phase: Phase 2
    sources:
      - https://www.globenewswire.com/news-release/2026/04/21/3278118/0/en/Disc-Medicine-Announces-Oral-Presentation-of-Data-from-RALLY-MF-Phase-2-Trial-of-DISC-0974-in-Patients-with-Myelofibrosis-and-Anemia-at-the-American-Society-of-Clinical-Oncology-AS.html
  - date: 2026-06-29
    ticker: LNTH
    event: LNTH-2501 Ga-68 NET PDUFA (연기됨 — 제조 정보 추가 검토)
    type: PDUFA
    company: Lantheus
    drug: Ga-68 edotreotide
    indication: NET PET
    phase: NDA
    sources:
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
    event: PROTEUS Apalutamide Phase 3 final analysis ASCO 2026 Plenary LBA1
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
    event: Rezdiffra (resmetirom) MAESTRO 데이터 EASL 2026 late-breaking + 10 abstracts (MetALD, AI 분석, NIT/QoL 3yr)
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
      - https://ir.madrigalpharma.com/news-releases/news-release-details/madrigal-present-late-breaking-resmetirom-data-patients
  - date: 2026-05-30
    ticker: REPL
    event: RP1 + nivolumab IGNYTE 3-year landmark OS ASCO 2026 melanoma rapid oral
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
      - https://www.globenewswire.com/news-release/2026/04/27/3281576/0/en/replimune-to-present-at-the-2026-american-society-of-clinical-oncology-asco-annual-meeting.html
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
    event: "ELVN-001 ENABLE Phase 1 CML EHA 2026 oral (Abstract S164) — 80mg QD 누적 MMR 47%, 24주 내 MMR 38%, asciminib 선행 환자 누적 MMR 52%"
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
```
