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
    event: Orforglipron T2D PDUFA
    type: PDUFA
    company: Eli Lilly
    drug: Orforglipron
    indication: T2D
    phase: NDA
    sources: []
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
    ticker: RVMD
    event: Daraxonrasib Phase 3 췌장암
    type: Clinical Readout
    company: Revolution
    drug: RMC-6236
    indication: Pancreatic
    phase: Phase 3
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
