# Catalyst Events

다가오는 카탈리스트(PDUFA, Conference, Clinical Readout, Earnings).
이벤트 1개 = yaml 항목 1개. `type`은 `PDUFA | Conference | Clinical Readout | Earnings | Regulatory` 중 하나.

```yaml
events:
  - date: 2026-01-10
    ticker: ATRA
    event: Tab-cel (Ebvallo) EBV+ PTLD PDUFA
    type: PDUFA
    company: Atara
    drug: Tabelecleucel
    indication: EBV+ PTLD
    phase: BLA
    sources: []
  - date: 2026-02-21
    ticker: VNDA
    event: Bysanti 승인됨 (2/20 조기 승인)
    type: PDUFA
    company: Vanda
    drug: Bysanti
    indication: Schizophrenia
    phase: NDA
    sources: []
  - date: 2026-02-24
    ticker: REGN
    event: Dupixent AFRS 승인됨
    type: PDUFA
    company: Regeneron
    drug: Dupixent
    indication: AFRS
    phase: sBLA
    sources: []
  - date: 2026-03-06
    ticker: LNTH
    event: PYLARIFY TruVu 승인됨
    type: PDUFA
    company: Lantheus
    drug: PYLARIFY
    indication: PSMA PET
    phase: sNDA
    sources: []
  - date: 2026-03-06
    ticker: BMY
    event: Sotyktu PsA 승인됨
    type: PDUFA
    company: Bristol Myers Squibb
    drug: Sotyktu
    indication: Psoriatic Arthritis
    phase: sNDA
    sources: []
  - date: 2026-03-16
    ticker: ALDX
    event: Reproxalap PDUFA
    type: PDUFA
    company: Aldeyra
    drug: Reproxalap
    indication: Dry eye
    phase: NDA
    sources: []
  - date: 2026-03-20
    ticker: RYTM
    event: Setmelanotide 시상하부 비만 PDUFA
    type: PDUFA
    company: Rhythm
    drug: IMCIVREE
    indication: Hypothalamic Obesity
    phase: sNDA
    sources: []
  - date: 2026-03-27
    ticker: RCKT
    event: KRESLADI LAD-I 승인됨
    type: PDUFA
    company: Rocket
    drug: KRESLADI
    indication: LAD-I
    phase: BLA
    sources: []
  - date: 2026-04-03
    ticker: BIIB
    event: Nusinersen 고용량 SMA FDA 결정
    type: PDUFA
    company: Biogen
    drug: Nusinersen
    indication: SMA
    phase: sNDA
    sources: []
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
    event: Azetukalner X-TOLE2 AAN 발표
    type: Conference
    company: Xenon
    drug: Azetukalner
    indication: Focal Seizures
    phase: Phase 3
    sources: []
  - date: 2026-04-22
    ticker: RAPP
    event: RAP-219 AAN 2026 발표
    type: Conference
    company: Rapport
    drug: RAP-219
    indication: Epilepsy
    phase: Phase 2
    sources: []
  - date: 2026-04-22
    ticker: KYTX
    event: KYV-101 MG/SPS/MS AAN 발표
    type: Conference
    company: Kyverna
    drug: KYV-101
    indication: Autoimmune Neurology
    phase: Phase 2
    sources: []
  - date: 2026-04-22
    ticker: CAPR
    event: HOPE-3 Phase 3 AAN 발표
    type: Conference
    company: Capricor
    drug: CAP-1002
    indication: DMD
    phase: Phase 3
    sources: []
  - date: 2026-04-30
    ticker: AXSM
    event: AXS-05 알츠하이머 초조 PDUFA
    type: PDUFA
    company: Axsome
    drug: AXS-05 (Auvelity)
    indication: AD Agitation
    phase: sNDA
    sources: []
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
    sources: []
  - date: 2026-06-02
    ticker: INCY
    event: Tafasitamab Phase 3 ASCO 2026
    type: Conference
    company: Incyte
    drug: Tafasitamab
    indication: DLBCL
    phase: Phase 3
    sources: []
  - date: 2026-06-02
    ticker: IRON
    event: DISC-0974 RALLY-MF Phase 2 ASCO oral
    type: Conference
    company: Disc Medicine
    drug: DISC-0974
    indication: Myelofibrosis Anemia
    phase: Phase 2
    sources: []
  - date: 2026-06-29
    ticker: LNTH
    event: LNTH-2501 Ga-68 NET PDUFA (연기됨)
    type: PDUFA
    company: Lantheus
    drug: Ga-68 edotreotide
    indication: NET PET
    phase: NDA
    sources: []
  - date: 2026-06-30
    ticker: SYRE
    event: SPY001 Part A (SKYLINE Phase 2)
    type: Clinical Readout
    company: Spyre
    drug: SPY001
    indication: Ulcerative Colitis
    phase: Phase 2
    sources: []
  - date: 2026-06-30
    ticker: VRDN
    event: VRDN-003 pivotal (TED Phase 3)
    type: Clinical Readout
    company: Viridian
    drug: VRDN-003
    indication: TED
    phase: Phase 3
    sources: []
  - date: 2026-06-30
    ticker: NTLA
    event: Lonvo-Z Phase 3 HAE
    type: Clinical Readout
    company: Intellia
    drug: Lonvo-Z
    indication: HAE
    phase: Phase 3
    sources: []
  - date: 2026-06-30
    ticker: WVE
    event: WVE-007 Phase 1 비만
    type: Clinical Readout
    company: Wave Life
    drug: WVE-007
    indication: Obesity
    phase: Phase 1
    sources: []
  - date: 2026-06-30
    ticker: MBX
    event: Canvuparatide Phase 2 1-yr
    type: Clinical Readout
    company: MBX
    drug: Canvuparatide
    indication: Hypoparathyroidism
    phase: Phase 2
    sources: []
  - date: 2026-06-30
    ticker: EVMN
    event: EVO756 CSU Phase 2 data
    type: Clinical Readout
    company: Evommune
    drug: EVO756
    indication: CSU
    phase: Phase 2
    sources: []
  - date: 2026-06-30
    ticker: VKTX
    event: VK2735 Phase 3 비만 시작
    type: Clinical Readout
    company: Viking
    drug: VK2735
    indication: Obesity
    phase: Phase 3
    sources: []
  - date: 2026-06-30
    ticker: DNLI
    event: Tividenofusp Hunter syndrome FDA
    type: PDUFA
    company: Denali
    drug: Tividenofusp
    indication: Hunter Syndrome
    phase: BLA
    sources: []
  - date: 2026-06-30
    ticker: NUVL
    event: Zidesamtinib NDA 제출
    type: Regulatory
    company: Nuvalent
    drug: Zidesamtinib
    indication: ROS1 NSCLC
    phase: NDA
    sources: []
  - date: 2026-06-30
    ticker: SION
    event: CFTR stabilizer Phase 2 (+ Trikafta)
    type: Clinical Readout
    company: Sionna
    drug: SION-719
    indication: CF
    phase: Phase 2
    sources: []
  - date: 2026-06-30
    ticker: INSM
    event: Brensocatib bronchiectasis PDUFA
    type: PDUFA
    company: Insmed
    drug: Brensocatib
    indication: Bronchiectasis
    phase: NDA
    sources: []
  - date: 2026-06-30
    ticker: KURA
    event: Ziftomenib AML NDA 가속승인
    type: Regulatory
    company: Kura
    drug: Ziftomenib
    indication: AML
    phase: NDA
    sources: []
  - date: 2026-06-30
    ticker: IDYA
    event: Darovasertib Phase 3 data
    type: Clinical Readout
    company: IDEAYA
    drug: Darovasertib
    indication: MUM
    phase: Phase 3
    sources: []
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
    event: Plozasiran Phase 3 severe HTG
    type: Clinical Readout
    company: Arrowhead
    drug: Plozasiran
    indication: Severe HTG
    phase: Phase 3
    sources: []
  - date: 2026-09-30
    ticker: AMLX
    event: Avexitide Phase 3 (PBH)
    type: Clinical Readout
    company: Amylyx
    drug: Avexitide
    indication: PBH
    phase: Phase 3
    sources: []
  - date: 2026-09-30
    ticker: AMGN
    event: MariTide Phase 3 비만 readout
    type: Clinical Readout
    company: Amgen
    drug: MariTide
    indication: Obesity
    phase: Phase 3
    sources: []
  - date: 2026-12-31
    ticker: SYRE
    event: SKYWAY basket (RA/PsA/axSpA)
    type: Clinical Readout
    company: Spyre
    drug: SPY002/003
    indication: Autoimmune
    phase: Phase 2
    sources: []
  - date: 2026-12-31
    ticker: ANAB
    event: ANB033 celiac Phase 2
    type: Clinical Readout
    company: AnaptysBio
    drug: ANB033
    indication: Celiac
    phase: Phase 2
    sources: []
  - date: 2026-12-31
    ticker: MBX
    event: MBX 4291 Phase 1 12-wk
    type: Clinical Readout
    company: MBX
    drug: MBX 4291
    indication: Obesity
    phase: Phase 1
    sources: []
  - date: 2026-12-31
    ticker: ALMS
    event: ESK-001 Phase 3 psoriasis
    type: Clinical Readout
    company: Alumis
    drug: ESK-001
    indication: Psoriasis
    phase: Phase 3
    sources: []
  - date: 2026-12-31
    ticker: STOK
    event: Zorevunersen Dravet Phase 3
    type: Clinical Readout
    company: Stoke
    drug: Zorevunersen
    indication: Dravet
    phase: Phase 3
    sources: []
```
