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
  - date: 2026-04-10
    ticker: LLY
    event: Foundayo (orforglipron) 비만 NDA 승인됨 (CNPV 가속, 원 PDUFA)
    type: PDUFA
    company: Eli Lilly
    drug: Orforglipron (Foundayo)
    indication: Obesity
    phase: NDA
    sources:
      - https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill
      - https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program
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
    event: Obefazimod ABTECT Phase 3 UC DDW 2026 oral + 8 posters
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
    event: OTX-TKI SOL-1 Phase 3 nAMD ARVO 2026 oral
    type: Conference
    company: Ocular Therapeutix
    drug: OTX-TKI (axitinib intravitreal hydrogel)
    indication: Neovascular AMD
    phase: Phase 3
    conferenceId: arvo
    sources:
      - https://www.globenewswire.com/news-release/2026/04/27/3281480/0/en/ocular-therapeutix-to-participate-in-may-scientific-and-investor-conferences.html
      - https://www.biospace.com/press-releases/ocular-therapeutix-to-participate-in-may-scientific-and-investor-conferences
  - date: 2026-05-10
    ticker: ARGX
    event: VYVGART seronegative gMG sBLA PDUFA
    type: PDUFA
    company: argenx
    drug: Efgartigimod (VYVGART)
    indication: AChR-Ab seronegative gMG
    phase: sBLA
    sources:
      - https://argenx.com/news/2026/press-release-3217457
      - https://argenx.com/news/2026/press-release-3276554.html
  - date: 2026-05-12
    ticker: SANA
    event: SG293 in vivo CAR-T NHP ASGCT 2026 oral (preclinical)
    type: Conference
    company: Sana Biotechnology
    drug: SG293 (CD19 in vivo CAR-T)
    indication: B-cell malignancy / autoimmune
    phase: Preclinical
    conferenceId: asgct
    sources:
      - https://www.globenewswire.com/news-release/2026/04/27/3282052/0/en/Sana-Biotechnology-Announces-Oral-Presentation-Highlighting-Preclinical-Data-from-in-vivo-CAR-T-SG293-at-the-American-Society-of-Gene-Cell-Therapy-ASGCT-2026-Annual-Meeting.html
  - date: 2026-05-15
    ticker: CADL
    event: CAN-2409 PrTK03 Phase 3 prostate AUA 2026 plenary oral
    type: Conference
    company: Candel Therapeutics
    drug: CAN-2409 (aglatimagene besadenovec)
    indication: Localized Prostate Cancer
    phase: Phase 3
    conferenceId: aua
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
```
