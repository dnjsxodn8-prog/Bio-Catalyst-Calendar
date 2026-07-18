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
    result: "FDA 승인 (PDUFA 2/21보다 1일 조기, NCE). de novo 효능시험 없이 iloperidone(Fanapt) 생체동등성 기반 — milsaperidone은 체내서 iloperidone로 전환. 근거 iloperidone 3상: 양극성I 조증 YMRS 위약대비 -4.0점(95% CI -5.70~-2.25, p<0.00001, n=414), 조현병 PANSS -12.0 vs 위약 -7.1(p<0.01). 계열 QT 연장 경고(+8.3ms)."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/vanda-pharmaceuticals-announces-fda-approval-of-bysanti-milsaperidone-for-the-treatment-of-bipolar-i-disorder-and-schizophrenia---a-new-chemical-entity-opening-new-horizons-in-psychiatric-innovation-302693941.html
      - https://www.psychiatrist.com/jcp/efficacy-safety-iloperidone-in-bipolar-mania/
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
    result: "FDA 승인 — AFRS(알레르기성 진균성 부비동염) 첫 표적 치료제. 3상 LIBERTY-AFRS-AIMS(n=62): 1차 부비동 혼탁(Lund-Mackay) 위약보정 -7.36점(p<0.0001), 비용종점수 52주 -2.77(p<0.0001), 코막힘 -1.40(p<0.0001), 전신 스테로이드/수술 92% 위험감소(p=0.0010)."
    outcome_sources:
      - https://investor.regeneron.com/news-releases/news-release-details/dupixentr-dupilumab-approved-us-first-and-only-medicine-allergic/
      - https://www.globenewswire.com/news-release/2026/02/24/3243729/0/en/Dupixent-dupilumab-Approved-in-the-U-S-as-the-First-and-Only-Medicine-for-Allergic-Fungal-Rhinosinusitis-AFRS.html
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
    result: "FDA 승인(505(b)(2)). 효능 EP 없는 진단 영상제 — 고농도 안정성 개선 신제형으로 대량 배치 생산·광역 배송 가능(F-18 110분 반감기 물류 개선). 진단 성능은 기존 PYLARIFY(OSPREY 특이도 96%·CONDOR 정확국소화 85~87%) 동등. Q4 2026 단계 출시."
    outcome_sources:
      - https://investor.lantheus.com/news-releases/news-release-details/lantheus-announces-fda-approval-pylarify-truvutm-piflufolastat-f
      - https://www.globenewswire.com/news-release/2026/03/06/3251298/0/en/Lantheus-Announces-FDA-Approval-of-PYLARIFY-TruVu-piflufolastat-F-18-Injection.html
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
    result: "FDA 승인 — 첫 TYK2 억제제 PsA(활동성 건선성 관절염) 적응증. 3상 POETYK PsA-1/2 ACR20(16주): -1 54.2% vs 위약 34.1%(p<0.0001), -2 54.2% vs 39.4%(p=0.0002). ACR50 24.7% vs 13.5%, PASI75 51.9% vs 7.1%(PsA-1). 16주 ACR20 54.2%→52주 63.1% 유지."
    outcome_sources:
      - https://news.bms.com/news/corporate-financial/2026/U-S--FDA-Approves-Bristol-Myers-Squibbs-Sotyktu-deucravacitinib-for-the-Treatment-of-Adults-with-Active-Psoriatic-Arthritis/default.aspx
      - https://news.bms.com/news/details/2025/Bristol-Myers-Squibb-Presents-Late-Breaking-Data-from-Pivotal-Phase-3-POETYK-PsA-1-Trial-Demonstrating-Superiority-of-Sotyktu-deucravacitinib-Compared-with-Placebo-in-Adults-with-Psoriatic-Arthritis/default.aspx
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
    result: "FDA 승인 (PDUFA 3/20보다 조기). 후천성 시상하부 비만 적응증 확대. 3상 TRANSCEND 승인 데이터셋(n=142): 52주 BMI 위약보정 -18.4%(p<0.0001). 토플라인(n=120): -19.8%, ≥5% BMI 감소 환자 80%, 공복감 점수 p=0.0015. 주요 AE 피부 과색소·오심·구토."
    outcome_sources:
      - https://ir.rhythmtx.com/news-releases/news-release-details/rhythm-pharmaceuticals-announces-fda-approval-of-imcivree-0
      - https://www.globenewswire.com/news-release/2026/03/19/3259502/0/en/Rhythm-Pharmaceuticals-Announces-FDA-Approval-of-IMCIVREE-setmelanotide-for-Patients-with-Acquired-Hypothalamic-Obesity.html
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
    result: "FDA 승인 — 중증 LAD-I(백혈구 부착 결핍증 I형) 렌티바이러스 유전자 치료제. 3상격 Ph1/2(n=9): 12개월 OS 100%(동종조혈모이식 불요, 자연사 고치사 대비), 호중구 CD18 발현 중앙값 51.2%(15.4~88.6%, 생존역치 ≥10%), 36개월까지 지속. 약물 관련 SAE 없음. (앞선 CRL은 CMC 사유, 효능·안전성 아님)."
    outcome_sources:
      - https://ir.rocketpharma.com/news-releases/news-release-details/rocket-pharmaceuticals-announces-fda-approval-kresladitm
      - https://www.cgtlive.com/view/gene-therapy-yields-100-1-year-survival-in-lad-1
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
    result: "FDA 승인 — SPINRAZA 고용량 요법(50mg 2회 로딩→28mg 4개월마다, 기존 12mg 대비). 3상 DEVOTE Part B(영아기 발병 치료경험無 n=75): 6개월 CHOP-INTEND 위약대비 LS평균차 +26.19점(p<0.0001). 전환군(12mg→고용량) HFMSE +1.8·RULM +1.2. 안전성 12mg과 일관(신규 신호 없음)."
    outcome_sources:
      - https://investors.biogen.com/news-releases/news-release-details/fda-approves-new-high-dose-regimen-spinrazar-nusinersen-spinal
      - https://investors.biogen.com/news-releases/news-release-details/nature-medicine-publishes-results-pivotal-devote-study-high-dose
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
    result: "FDA 승인 (CNPV 가속, 유일한 GLP-1 경구제). 3상 ATTAIN-1(비당뇨 n=3,127) 72주 36mg 체중 -11.2~-12.4% vs 위약 -2.1%(p<0.001), ≥10% 감량 55%·≥15% 36%; ATTAIN-2(당뇨 n=1,613) 36mg -9.6%. AE 중단 36mg 10.3%. 4/14 추가 liver/CV 안전성 평가 요구(post-marketing 표준), 4/30 liver failure 1건 보고 — Lilly 5/4 약물 인과관계 없음 평가(11,000명 Ph3서 hepatic signal 없음). 분석가 'one liver case does not make a signal'."
    outcome_sources:
      - https://investor.lilly.com/news-releases/news-release-details/fda-approves-lillys-foundayotm-orforglipron-only-glp-1-pill
      - https://www.nejm.org/doi/full/10.1056/NEJMoa2511774
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
    outcome: met
    outcome_date: 2026-04-22
    result: "Ph2 Positive — 추적 9~12주 발작 중앙값 90% 감소(median seizure reduction)."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-04-22
    result: "KYSA-8 SPS 1차·2차 EP 모두 충족, 81% 면역억제제 중단 유지(off immunotherapy). 자가면역 신경질환 CAR-T."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-04-22
    result: "HOPE-3 3상 PUL 1차 EP 충족, 심장 섬유화 개선 p=0.022 (DMD, CAP-1002)."
    outcome_sources:
      - https://www.capricor.com/investors/news-events/press-releases/detail/341/capricor-therapeutics-announces-late-breaking-presentation
  - date: 2026-04-30
    ticker: AXSM
    event: AXS-05 알츠하이머 초조 PDUFA
    type: PDUFA
    company: Axsome
    drug: AXS-05 (Auvelity)
    indication: AD Agitation
    phase: sNDA
    sources:
      - https://www.globenewswire.com/news-release/2026/04/30/3285345/33090/en/axsome-therapeutics-announces-fda-approval-of-auvelity-dextromethorphan-hbr-and-bupropion-hcl-for-the-treatment-of-agitation-associated-with-dementia-due-to-alzheimer-s-disease.html
    outcome: approved
    outcome_date: 2026-04-30
    result: "FDA 승인 — 알츠하이머 치매 초조 적응증(Auvelity). 3상 ACCORD-2(재발예방, n=167): 재발까지 HR 0.276(p=0.001), 재발 8.4% vs 위약 28.6%. 단 ADVANCE-2(n=408)는 CMAI -13.8 vs -12.6로 1차 미달 — 혼조 프로그램(ADVANCE-1·ACCORD-1·ACCORD-2 충족)."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/04/30/3285345/33090/en/axsome-therapeutics-announces-fda-approval-of-auvelity-dextromethorphan-hbr-and-bupropion-hcl-for-the-treatment-of-agitation-associated-with-dementia-due-to-alzheimer-s-disease.html
      - https://www.globenewswire.com/news-release/2024/12/30/3002588/33090/en/Axsome-Therapeutics-Announces-Successful-Completion-and-Results-of-Phase-3-Clinical-Program-of-AXS-05-in-Alzheimer-s-Disease-Agitation.html
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
    outcome: met
    outcome_date: 2026-05-04
    result: "ABTECT-1·2 3상 UC 유도 1차 EP 충족 — 50mg arm 임상관해 23~24% (p<0.0001 양 시험)."
    outcome_sources:
      - https://ir.abivax.com/news-releases/news-release-details/abivax-present-data-obefazimod-digestive-disease-weekr
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
    outcome: met
    outcome_date: 2026-05-05
    result: "SOL-1 3상 nAMD — Wk36 시력유지 74.1% vs aflibercept 55.8%(P=0.0006), Wk52 65.9% vs 44.2%(P<0.0001), 안구 SAE 0건."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/02/17/3239086/0/en/Ocular-Therapeutix-Reports-Positive-Results-from-Landmark-SOL-1-Phase-3-Superiority-Trial-in-Wet-AMD.html
  - date: 2026-05-08
    ticker: ARGX
    event: VYVGART/Hytrulo 전 serotype gMG 라벨 확장 PDUFA
    type: PDUFA
    company: argenx
    drug: Efgartigimod (VYVGART / VYVGART Hytrulo)
    indication: All-serotype gMG (label expansion)
    phase: sBLA
    sources:
      - https://www.globenewswire.com/news-release/2026/05/08/3291372/0/en/argenx-Announces-U-S-FDA-Approval-Expanding-VYVGART-and-VYVGART-Hytrulo-for-Use-in-All-Adult-Patients-Living-with-gMG.html
    outcome: approved
    outcome_date: 2026-05-08
    result: "FDA 승인(2일 조기) — 모든 serotype gMG 라벨 확장(anti-MuSK+·anti-LRP4+·triple seronegative 포함). 3상 ADAPT SERON MG-ADL -3.35 (p=0.0068)."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-11
    result: "Ph1 인터림 Positive — testosterone 50~75% 감소(NK3R 길항), 선형 PK·반감기 24일로 월1회 투약 지지, SAE·간독성 없음. Ph2(n=80) 진입 확정."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-12
    result: "ASGCT preclinical(NHP) Positive — IV 단회 후 말초 B세포 완전 고갈·림프절 B세포 검출불가('B세포 리셋'), off-target 전달 없음. FIH 2026년 내."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-15
    result: "PrTK03 3상 국소 전립선암 58개월 추적 — prostate-specific DFS HR 0.61(p=0.0031, 39%↓), 중간위험군 HR 0.10. BLA Q4 2026 예정."
    outcome_sources:
      - https://ir.candeltx.com/news-releases/news-release-details/candel-therapeutics-present-new-data-after-extended-follow/
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
    outcome: met
    outcome_date: 2026-05-31
    result: "RASolute 302 3상 mPDAC(2L+) — mOS 13.2 vs 6.7개월(HR 0.40), mPFS 7.2 vs 3.6개월(HR 0.49, p<0.0001). RAS(ON) multi-selective, NEJM 동시 게재."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-31
    result: "HARMONi-6 3상 1L sq-NSCLC — mOS 27.9 vs 23.7개월(HR 0.66, p=0.0017), mPFS 11.1 vs 6.9개월(HR 0.60). PD-1×VEGF 이중항체가 PD-1+chemo 대비 우월."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-02
    result: "PEAK 3상 GIST(sunitinib 병용) — mPFS 16.5 vs 9.2개월(HR 0.50), ORR 46% vs 26%."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-02
    result: "frontMIND 3상 1L 고위험 DLBCL — PFS HR 0.75(p=0.019), 2yr PFS 71.1% vs 62.9%, EFS HR 0.79."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-02
    result: "RALLY-MF 2상 골수섬유증 빈혈 — nTD 환자 Hgb 반응 55%, TD 환자 수혈비의존 64%/50%."
    outcome_sources:
      - https://www.biospace.com/press-releases/disc-medicine-presents-updated-positive-data-from-rally-mf-phase-2-trial-in-patients-with-myelofibrosis-mf-and-anemia-at-the-2026-american-society-of-clinical-oncology-asco-annual-meeting
  - date: 2026-06-29
    ticker: LNTH
    event: LNTH-2501 Ga-68 NET PDUFA
    type: PDUFA
    blogNote: "6월 26일에 FDA가 보완요구서한을 보냈음. 효능이나 안전성 문제가 아니라 외부 위탁 제조시설이 걸렸음. 앞서 3개월 미뤘다가 또 막힌 거라 출시가 더 늦어지는데 제조 문제를 얼마나 빨리 푸느냐가 관건임."
    company: Lantheus
    drug: Ga-68 edotreotide
    indication: NET PET
    phase: NDA
    sources:
      - https://lantheusholdings.gcs-web.com/news-releases/news-release-details/lantheus-announces-three-month-extension-pdufa-date-lnth-2501-ga
    outcome: delayed
    outcome_date: 2026-06-26
    result: "CRL 수령(6/26). 앞선 3개월 PDUFA 연장(3/29→6/29) 이후 FDA가 Complete Response Letter 발부 — 제3자 제조시설 미해결 조건이 사유이며 효능·안전성 이슈 아님. Lantheus는 파트너·FDA와 시설 이슈 해결 추진."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/26/3318445/0/en/Lantheus-Receives-Complete-Response-Letter-from-FDA-for-LNTH-2501-Ga-68-edotreotide.html
      - https://lantheusholdings.gcs-web.com/news-releases/news-release-details/lantheus-announces-three-month-extension-pdufa-date-lnth-2501-ga
  - date: 2026-06-30
    ticker: SYRE
    event: SPY002 Part A SKYLINE Phase 2 UC readout (mid-2026, SPY001 Part A 2026-04-13 positive 완료)
    type: Clinical Readout
    blogNote: "궤양성 대장염 2상 SPY002가 1차 목표를 달성했음. 반감기를 늘려서 분기에 한 번 맞는 걸 노림. 앞선 SPY001에 이은 두 번째 성공이라 파이프라인 신뢰가 쌓이고 있음."
    company: Spyre
    drug: SPY002
    indication: Ulcerative Colitis
    phase: Phase 2
    sources:
      - https://ir.spyre.com/news-releases/news-release-details/spyre-announces-potential-best-class-spy001-part-induction
    outcome: met
    outcome_date: 2026-06-15
    result: "SKYLINE Phase 2 SPY002 UC 유도 Part A (12주) — 1차 RHI 점수 -10.7점(p<0.0001) 충족. 강력한 임상관해·내시경 개선."
    outcome_sources:
      - https://www.stocktitan.net/sec-filings/SYRE/8-k-spyre-therapeutics-inc-reports-material-event-961d94cced5d.html
  - date: 2026-06-30
    ticker: VRDN
    event: VRDN-003 (elegrobart) REVEAL-2 Phase 3 chronic TED readout (Q2 2026, REVEAL-1 active TED 2026-03 positive 완료)
    type: Clinical Readout
    blogNote: "만성 갑상선안병증 3상에서 1차와 주요 2차 목표를 모두 달성했음. 피하주사라 정맥주사인 기존 약보다 편함. 활동성 임상과 합쳐서 2027년 1분기에 허가 신청을 낼 계획임."
    company: Viridian
    drug: VRDN-003 (elegrobart)
    indication: Chronic TED
    phase: Phase 3
    sources:
      - https://investors.viridiantherapeutics.com/news/news-details/2026/Viridian-Therapeutics-Prepares-for-Transformational-2026/default.aspx
    outcome: met
    outcome_date: 2026-05-05
    result: "REVEAL-2 3상 만성 TED(elegrobart VRDN-003) — 1차 endpoint 충족, 주요 2차 endpoint 모두 충족. Q4W·Q8W 양 용법 vs 위약 모두 양성. BLA Q1 2027 제출 예정 (REVEAL-1 active TED와 합산)."
    outcome_sources:
      - https://investors.viridiantherapeutics.com/news/news-details/2026/Viridian-Therapeutics-Announces-Positive-Topline-Results-from-Elegrobart-Phase-3-REVEAL2-Clinical-Trial-in-Chronic-Thyroid-Eye-Disease/default.aspx
  - date: 2026-06-30
    ticker: WVE
    event: WVE-007 Phase 1 비만 (400mg 코호트 6개월 + 600mg 코호트 3개월 데이터)
    type: Clinical Readout
    blogNote: "1상을 마치고 6월 24일에 2a상을 시작했음. INHBE를 겨냥한 siRNA로 근육 손실 없이 지방을 줄이는 걸 노림. 2a상의 반복 투여 데이터가 다음 분수령임."
    company: Wave Life
    drug: WVE-007
    indication: Obesity
    phase: Phase 1
    sources:
      - https://ir.wavelifesciences.com/news-releases/news-release-details/wave-life-sciences-announces-positive-interim-phase-1-data
    outcome: met
    outcome_date: 2026-06-24
    result: "Phase 1 INLIGHT 완료 → Phase 2a 개시(2026-06-24). 단회 투여 후 총·내장 지방 감소 + 제지방량 유지(GLP-1 유사 효과, 근손실 없음). 선형 PK·내약성 확인. Phase 2a(다회투여, 플라세보 대조, BMI 35-50, 미국+유럽) 개시."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/24/3316827/0/en/Wave-Life-Sciences-Announces-Initiation-of-Phase-2a-Portion-of-INLIGHT-Trial-of-WVE-007-INHBE-GalNAc-siRNA-for-Obesity-and-Cardiometabolic-Diseases.html
  - date: 2026-06-30
    ticker: MBX
    event: Canvuparatide Phase 2 1-yr (Q2 2026 학회 발표 예정)
    type: Clinical Readout
    blogNote: "2상 1년 데이터에서 복합 지표를 위약 31%인데 63%로 달성했음. 일주일에 한 번 맞는 부갑상선호르몬 대체요법임. 3상은 3분기에 시작할 예정이고 경쟁약과 어떻게 차별화하느냐가 관전 포인트임."
    company: MBX
    drug: Canvuparatide
    indication: Hypoparathyroidism
    phase: Phase 2
    sources:
      - https://www.globenewswire.com/news-release/2026/03/09/3251975/0/en/CORRECTING-REPLACING-MBX-Biosciences-Announces-Successful-End-of-Phase-2-FDA-Meeting-and-Provides-Phase-3-Development-Plan-for-Once-Weekly-Canvuparatide-for-Hypoparathyroidism.html
    outcome: met
    outcome_date: 2026-06-12
    result: "AVAIL Phase 2 1년 OLE 전체 데이터 — 12주 복합 endpoint 달성 63% vs 위약 31%. Phase 3 Q3 2026 개시 예정."
    outcome_sources:
      - https://www.biospace.com/press-releases/mbx-biosciences-announces-one-year-data-demonstrating-sustained-benefit-of-once-weekly-canvuparatide-as-a-potential-pth-replacement-therapy-in-chronic-hypoparathyroidism
  - date: 2026-06-30
    ticker: EVMN
    event: EVO756 CSU Phase 2 data (Phase 2b topline 상반기 예정)
    type: Clinical Readout
    blogNote: "먹는 약 EVO756의 만성 두드러기 2상 결과가 상반기에 나올 예정인데 아직 발표 전임. 항히스타민이 안 듣는 환자에게 먹는 선택지가 마땅치 않아서 첫 효능 데이터가 분수령이 됨."
    company: Evommune
    drug: EVO756
    indication: CSU
    phase: Phase 2
    sources:
      - https://ir.evommune.com/news-events/press-releases/detail/118/evommune-reports-third-quarter-2025-financial-results-and-provides-business-update
    outcome: failed
    outcome_date: 2026-06-29
    result: "Phase 2b 1차 endpoint(UAS7 12주 변화) 미충족 — 3개 용량 모두 위약 대비 유의차 없음. MRGPRX2 길항제의 CSU 개발 중단. AD Phase 2b 3Q 2026 데이터 예정, 편두통 Phase 2b 스크리닝 개시."
    outcome_sources:
      - https://ir.evommune.com/news-events/press-releases/detail/124/evommune-announces-top-line-results-from-evo756-phase-2b-trial-in-moderate-to-severe-chronic-spontaneous-urticaria
      - https://www.businesswire.com/news/home/20260629470075/en/Evommune-Announces-Top-line-Results-from-EVO756-Phase-2b-Trial-in-Moderate-to-Severe-Chronic-Spontaneous-Urticaria
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
    outcome: approved
    outcome_date: 2026-03-25
    result: "FDA 가속승인 — Hunter 증후군(MPS II) 뇌투과 ERT(Tividenofusp alfa). Ph1/2(n=47): CSF heparan sulfate 24주 -91%(93% 정상화), 뇨 HS -88%; 적응행동·인지·청력 개선. Boxed Warning 아나필락시스. 확증시험 COMPASS 진행."
    outcome_sources:
      - https://investors.denalitherapeutics.com/news-releases/news-release-details/denali-therapeutics-announces-us-fda-approval-avlayahtm
      - https://www.nejm.org/doi/full/10.1056/NEJMoa2508681
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
    blogNote: "SION-719의 낭포성 섬유증 2상 데이터가 여름에 나올 예정인데 아직 발표 전임. 기존 표준약 트리카프타에 얹어서 폐기능이 더 좋아진다면 버텍스가 독점하던 시장에 틈이 생김."
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
    blogNote: "포도막흑색종 1차 치료 임상이 목표를 달성했음. 무진행 생존이 3.1개월에서 6.9개월로 늘었음. ASCO에서 전체 데이터도 공개했고 하반기에 신약 신청을 낼 계획임. 이 분야 첫 표적치료가 될 수 있을지가 관심사임."
    company: IDEAYA
    drug: Darovasertib
    indication: MUM
    phase: Phase 3
    sources:
      - https://media.ideayabio.com/2026-04-21-IDEAYA-Biosciences-Announces-Late-Breaking-Abstract-Oral-Presentation-at-ASCO-2026-to-Provide-Complete-Data-from-Phase-2-3-Registrational-Trial-OptimUM-02-of-Darovasertib-in-Combination-with-Crizotinib-in-1L-HLA-A2-Negative-Metastatic-Uveal-Mel
    outcome: met
    outcome_date: 2026-06-01
    result: "OptimUM-02 2/3상 1L HLA-A*02:01- 전이성 포도막흑색종(ASCO LBA) — daro+crizotinib mPFS 6.9 vs 3.1개월(HR 0.42, p<0.0001), ORR 37.1% vs 5.8%. OS 미성숙·개선 경향."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/ideaya-biosciences-and-servier-provide-complete-data-from-phase-23-registrational-optimum-02-trial-of-the-darovasertib-combination-in-first-line-hlaa201-negative-metastatic-uveal-melanoma-in-a-late-breaking-oral-presentation-at-asco-302786486.html
  - date: 2026-06-30
    ticker: IONS
    event: Olezarsen 중증 HTG sNDA PDUFA
    type: PDUFA
    blogNote: "6월 24일에 FDA 승인을 받았음(제품명 TRYNGOLZA). 중증 고중성지방혈증의 첫 표적치료제로 중성지방을 72% 낮췄음. 이제는 처방이 얼마나 빨리 퍼지고 매출이 오르느냐가 관건임."
    company: Ionis
    drug: Olezarsen
    indication: Severe Hypertriglyceridemia
    phase: sNDA
    sources:
      - https://ir.ionis.com/news-releases/news-release-details/olezarsen-snda-accepted-fda-priority-review-treatment-severe
      - https://www.businesswire.com/news/home/20260226109569/en/Olezarsen-sNDA-accepted-by-the-FDA-for-Priority-Review-for-the-treatment-of-severe-hypertriglyceridemia-sHTG
    outcome: approved
    outcome_date: 2026-06-24
    result: "FDA 승인(PDUFA 6일 조기) — TRYNGOLZA® 최초 sHTG 급성 췌장염 위험 감소 치료제. CORE/CORE2 3상: TG 72% 감소(vs 위약, 6개월), 급성 췌장염 85% 감소(p=0.0002), TG<500 mg/dL 달성 86%(12개월). 50mg/80mg 월 1회 autoinjector."
    outcome_sources:
      - https://www.businesswire.com/news/home/20260624119051/en/TRYNGOLZA-olezarsen-approved-by-the-FDA-as-the-first-and-only-treatment-to-reduce-triglycerides-and-the-risk-of-acute-pancreatitis-in-patients-with-severe-hypertriglyceridemia-sHTG
      - https://ir.ionis.com/news-releases/news-release-details/tryngolzar-olezarsen-approved-fda-first-and-only-treatment
  - date: 2026-07-01
    ticker: VRTX
    event: CASGEVY(exa-cel) SCD/TDT 소아 2세+ 적응증 확대 sBLA PDUFA — 첫 2세+ 유전자치료
    type: PDUFA
    company: Vertex Pharmaceuticals
    drug: CASGEVY (exagamglogene autotemcel, exa-cel)
    indication: Sickle Cell Disease (SCD) / Transfusion-Dependent Beta Thalassemia (TDT) ages 2+
    phase: sBLA
    moa: "CRISPR-Cas9 기반 1회성 자가조혈모세포 유전자교정 — BCL11A enhancer 편집으로 태아 헤모글로빈(HbF) 재활성화"
    sources:
      - https://news.vrtx.com/news-releases/news-release-details/vertex-announces-us-fda-approval-expanded-use-casgevyr-treatment
      - https://www.businesswire.com/news/home/20260701379449/en/Vertex-Announces-US-FDA-Approval-for-Expanded-Use-of-CASGEVY-for-the-Treatment-of-People-Ages-2-Years-and-Older-With-Sickle-Cell-Disease-or-Transfusion-Dependent-Beta-Thalassemia
    outcome: approved
    outcome_date: 2026-07-01
    result: "FDA 승인 — CASGEVY 소아 2세+ 적응증 확대(기존 12세+에서 2세+로). SCD/TDT 대상 최초 2세+ 유전자치료. 국립 우선 바우처 53일 초고속 심사. 추가 소아 5,500명 치료 대상 확대."
    outcome_sources:
      - https://news.vrtx.com/news-releases/news-release-details/vertex-announces-us-fda-approval-expanded-use-casgevyr-treatment
      - https://www.businesswire.com/news/home/20260701379449/en/Vertex-Announces-US-FDA-Approval-for-Expanded-Use-of-CASGEVY-for-the-Treatment-of-People-Ages-2-Years-and-Older-With-Sickle-Cell-Disease-or-Transfusion-Dependent-Beta-Thalassemia
  - date: 2026-07-07
    ticker: VERA
    event: Atacicept IgAN BLA PDUFA (가속승인)
    type: PDUFA
    blogNote: "IgA신병증은 단백뇨가 오래 지속되면 신장이 서서히 망가지는 병인데 원인을 직접 겨냥하는 약이 아직 마땅치 않음. 아타시셉트는 항체를 과하게 만들게 하는 신호 두 개를 동시에 눌러서 단백뇨를 줄이는 약임. 가속승인이라 단백뇨 감소만으로 먼저 허가를 받고 신장 보호 효과는 나중에 확증하는 구조임. 경쟁약이 이미 들어와 있어서 초반에 얼마나 빨리 자리를 잡느냐가 관건임."
    company: Vera Therapeutics
    drug: Atacicept
    indication: IgA Nephropathy
    phase: BLA
    sources:
      - https://ir.veratx.com/news-releases/news-release-details/vera-therapeutics-announces-us-fda-granted-priority-review
      - https://www.globenewswire.com/news-release/2026/02/26/3245477/0/en/Vera-Therapeutics-Provides-Business-Update-and-Reports-Full-Year-2025-Financial-Results.html
    outcome: approved
    outcome_date: 2026-07-07
    result: "FDA 가속승인 — TRUTAKNA™(atacicept-vymj), IgA신병증(IgAN) 성인 단백뇨 감소. 첫 BAFF·APRIL 이중 표적 치료제. ORIGIN 3 사전설정 인터림(36주): 단백뇨 기저대비 -46%, vs 위약 -42%(p<0.0001). 용법 150mg SC 주1회 자가주사. 신장 기능 보호는 확인적 시험 진행 중(가속승인 조건)."
    outcome_sources:
      - https://ir.veratx.com/news-releases/news-release-details/vera-therapeutics-receives-fda-accelerated-approval-trutaknatm
      - https://www.globenewswire.com/news-release/2026/07/07/3323532/0/en/vera-therapeutics-receives-fda-accelerated-approval-for-trutakna-for-adult-patients-with-primary-iga-nephropathy.html
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
    outcome: met
    outcome_date: 2026-04-01
    result: "Positive — Cogent, bezuclastinib GIST NDA를 RTOR로 FDA 제출 완료(imatinib 내성 2L+). PEAK Phase 3: mPFS 16.5 vs 9.2개월, ORR 46%. 이후 FDA 수리·우선심사·PDUFA 2026-11-30 부여."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/04/01/3266534/0/en/Cogent-Biosciences-Announces-Submission-of-New-Drug-Application-for-Bezuclastinib-in-Gastrointestinal-Stromal-Tumors-GIST.html
      - https://investors.cogentbio.com/news-releases/news-release-details/cogent-biosciences-announces-fda-acceptance-new-drug-0
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
    outcome: met
    outcome_date: 2026-04-07
    result: "Positive — Nuvalent, neladalkib ALK+ NSCLC NDA를 FDA 제출 완료(TKI 전치료군). ALKOVE-1 Ph1/2(n=253): ORR 31%(전체 TKI 후), lorlatinib-naive 46%. G1202R 등 내성변이·뇌전이 커버."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-04-30
    result: "Positive — FDA가 daraxonrasib 확대접근(EAP) safe-to-proceed 승인(전치료 mPDAC, 4/30 서명). NDA는 National Priority Voucher 경로로 별도 제출 예정. RASolute 302 Ph3: 사망위험 60% 감소(HR 0.40)."
    outcome_sources:
      - https://ir.revmed.com/news-releases/news-release-details/revolution-medicines-statement-fda-expanded-access-authorization
      - https://www.fda.gov/news-events/press-announcements/fda-permits-expanded-access-investigational-pancreatic-cancer-drug
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
    outcome: approved
    outcome_date: 2026-05-01
    result: "FDA 승인(ESR1m 한정, 35일 조기) — 세계 첫 PROTAC 신약. VERITAC-2 3상(n=624): ESR1 변이군(n=270) mPFS 5.0 vs fulvestrant 2.1개월(HR 0.58, p<0.001). 전체군 3.8 vs 3.6(HR 0.83, p=0.07 비유의) → ESR1m만 승인."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/05/01/3286140/0/en/Arvinas-Announces-FDA-Approval-of-VEPPANU-vepdegestrant-for-the-Treatment-of-ESR1m-ER-HER2-Advanced-Breast-Cancer.html
      - https://www.nejm.org/doi/abs/10.1056/NEJMoa2505725
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
    outcome: met
    outcome_date: 2026-05-13
    result: "Positive(preclinical) — Dyne, ASGCT 2026 oral서 FORCE 플랫폼 MAPT silencing NHP 데이터 발표. TfR1 매개 SC 투여로 마우스·NHP 뇌 전반(심부 포함) MAPT RNA 약 75% knockdown, SC=IV 동등. 타우병증 후보."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-29
    result: "Positive — ALKOVE-1 pivotal: TKI 경험 ALK+ NSCLC 253명 BICR ORR 31% (lorlatinib-naive 63명 46%), 12/18개월 DOR 64%/53%. TKI-naive 44명 예비 ORR 86%·CR 9%. 두개내 반응·내약성 양호(중단 5%)."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/nuvalent-to-present-pivotal-data-from-alkove-1-trial-of-neladalkib-in-tki-pre-treated-advanced-alk-positive-nsclc-at-the-2026-american-society-of-clinical-oncology-annual-meeting-302748865.html
      - https://investors.nuvalent.com/2026-05-21-Nuvalent-Highlights-Upcoming-Data-Presentations-for-Neladalkib-and-Zidesamtinib-at-the-2026-American-Society-of-Clinical-Oncology-Annual-Meeting
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
    outcome: met
    outcome_date: 2026-05-31
    result: "PROTEUS 3상 고위험 국소 전립선암 perioperative apalutamide — pCR/MRD 8.9% vs 1.0%, MFS HR 0.80, EFS HR 0.71 (ASCO Plenary LBA1)."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/05/31/3303921/0/en/Johnson-Johnson-s-Phase-3-prostate-cancer-study-shows-ERLEADA-apalutamide-before-and-after-surgery-significantly-reduces-risk-of-metastasis-or-death-versus-hormone-therapy-alone-po.html
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
    outcome: met
    outcome_date: 2026-06-02
    result: "VIKTORIA-1 3상 PIK3CA 변이(ASCO LBA1008) — gedatolisib 삼중요법 vs alpelisib+fulv PFS 11.1 vs 5.6개월(HR 0.50, p<0.0001), 이중요법도 HR 0.51. PDUFA 7/17."
    outcome_sources:
      - https://ir.celcuity.com/news-releases/news-release-details/celcuitys-phase-3-viktoria-1-trial-achieves-primary-endpoint
  - date: 2026-06-30
    ticker: ABVX
    event: Obefazimod ABTECT Maintenance Phase 3 (44주) topline readout (Q2 2026 말 예정)
    type: Clinical Readout
    blogNote: "효능은 같은 계열에서 가장 좋았음. 임상 관해율이 위약 10%인데 51%였음. 그런데 고용량 그룹에서 암이 7건 몰려 나오면서 발표 당일 주가가 44% 빠졌음. 회사는 고령 환자라 약과는 무관하다고 보지만 FDA가 이 안전성 신호를 어떻게 받아들일지가 핵심임. 연말에 신약 신청을 낼 예정임."
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
    outcome: mixed
    outcome_date: 2026-06-01
    result: "ABTECT 유지 3상(44주) — 효능은 클래스 최고 수준: 임상관해 50mg 51.3%·25mg 50.8% vs 위약 10.4%(위약보정 ~40pp, p<0.0001), 주요 2차 EP(내시경 개선·관해·CS-free·지속관해) 전부 충족. **그러나 50mg 고용량 군에 악성종양 7건 집중**(비흑색종 피부암 4건 + 전립선암·유방암·결장 이형성증 각 1건; 회사는 60세+ 고령·약물무관 판정, 클러스터링 없음). 효능 호조에도 암 신호로 6/2 주가 약 -44% 폭락(역대 최악), Jefferies Buy→Hold 강등(PT $160→$90). 일부(Stifel·Citizens)는 '레이블 이슈 수준' 옹호. NDA late Q4 2026 제출 예정."
    outcome_sources:
      - https://ir.abivax.com/news-releases/news-release-details/abivax-announces-landmark-phase-3-abtect-maintenance-trial/
      - https://www.globenewswire.com/news-release/2026/06/01/3304711/0/en/abivax-announces-landmark-phase-3-abtect-maintenance-trial-results-evaluating-obefazimod-in-moderately-to-severely-active-ulcerative-colitis.html
      - https://www.cnbc.com/2026/06/02/abivax-stock-bowel-crohns-disease-trial-data.html
  - date: 2026-06-30
    ticker: VRDN
    event: Veligrotug (VRDN-001) TED BLA PDUFA (active + chronic, IV IGF-1R 항체)
    type: PDUFA
    blogNote: "6월 25일에 FDA 승인을 받았음(제품명 Lumvoa). 암젠의 테페자가 독점하던 갑상선안병증 시장에 첫 경쟁자로 들어감. 초반 점유율을 얼마나 가져갈지, 그리고 곧 나올 자사 피하주사 약과 시장이 겹치지 않을지가 관건임."
    company: Viridian
    drug: Veligrotug (VRDN-001)
    indication: Thyroid Eye Disease (active + chronic)
    phase: BLA
    trialDesign: "THRIVE (active TED) + THRIVE-2 (chronic TED) Phase 3 모두 primary/secondary endpoint 충족. Priority Review + BTD 지정"
    targetDisease: "갑상선안병증(TED). 자가면역 IGF-1R 활성화로 안와 섬유모세포 증식 → 안구돌출·복시·시신경 압박."
    moa: "IV 항-IGF-1R 단클론항체. 안와 섬유모세포 IGF-1R 신호 차단 → 염증·돌출·복시 감소"
    sources:
      - https://investors.viridiantherapeutics.com/news/news-details/2025/Viridian-Therapeutics-Announces-BLA-Acceptance-and-Priority-Review-for-Veligrotug-for-the-Treatment-of-Thyroid-Eye-Disease/default.aspx
    outcome: approved
    outcome_date: 2026-06-25
    result: "FDA 승인(PDUFA 5일 조기) — Lumvoa™(veligrotug-vvze) TED 치료제(active + chronic). THRIVE-2 3상(만성 TED): 15주 PRR 56%(위약보정 48%, p<0.0001), 복시 반응율 56%(위약보정 31%, p=0.0006), 전체반응 56% vs 7%(p<0.0001). AE 청력이상 12.8% vs 3.2%."
    outcome_sources:
      - https://www.businesswire.com/news/home/20260625016249/en/Viridian-Therapeutics-Announces-U.S.-FDA-Approval-and-Launch-of-Lumvoa-veligrotug-vvze-for-the-Treatment-of-Thyroid-Eye-Disease
  - date: 2026-07-17
    ticker: CELC
    event: Gedatolisib NDA PDUFA (PIK3CA wild-type HR+/HER2- 유방암, RTOR + Priority Review)
    type: PDUFA
    blogNote: "PIK3CA 정상형 유방암에서 무진행 생존을 16.6개월로 대조군 1.9개월보다 크게 늘린 데이터로 신청함. 숫자 차이가 워낙 커서 승인 가능성이 높게 점쳐짐. 다만 PI3K 억제제는 혈당이나 발진 같은 부작용 관리가 늘 관건이라 라벨에 어떤 제한이 붙느냐를 봐야 함. 우선심사라 결과가 곧 나옴."
    company: Celcuity
    drug: Gedatolisib
    indication: PIK3CA Wild-Type HR+/HER2- Advanced Breast Cancer
    phase: NDA
    trialDesign: "VIKTORIA-1 PIK3CA WT 코호트: gedatolisib + palbociclib + fulvestrant vs 대조. mPFS 16.6 vs 1.9개월 (HR 0.14)"
    targetDisease: "PIK3CA WT HR+/HER2- 전이성 유방암 (전체 HR+ 유방암 ~60%). CDK4/6i + AI 후 표준 fulvestrant 단독 효과 제한적."
    moa: "Pan-Class I PI3K + mTOR 이중 억제제. PI3K WT에서도 PI3K/AKT/mTOR 신호 차단 → CDK4/6i 내성 극복"
    sources:
      - https://www.globenewswire.com/news-release/2026/01/20/3221601/0/en/Celcuity-Announces-FDA-Acceptance-of-New-Drug-Application-for-Gedatolisib-in-HR-HER2-PIK3CA-Wild-Type-Advanced-Breast-Cancer.html
    outcome: approved
    outcome_date: 2026-07-14
    result: "FDA 승인(PDUFA 3일 조기) — REVTORPYK™(gedatolisib) 브랜드명. HR+/HER2-, PIK3CA WT 국소 진행성/전이성 유방암(CDK4/6i + 내분비요법 후 ≥1회 전이 치료 경험). 최초 Pan-Class I PI3K + mTOR 이중 억제제 승인."
    outcome_sources:
      - https://ir.celcuity.com/news-releases/news-release-details/celcuity-announces-fda-approval-revtorpyktm-gedatolisib
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
  - date: 2026-11-27
    ticker: NUVL
    event: Neladalkib ALK+ NSCLC NDA PDUFA (2L+ TKI pre-treated, ALKOVE-1 데이터, Priority Review + BTD)
    type: PDUFA
    company: Nuvalent
    drug: Neladalkib
    indication: TKI Pre-treated ALK+ NSCLC
    phase: NDA
    trialDesign: "ALKOVE-1 Phase 1/2 global (n=253): TKI pre-treated ALK+ NSCLC ORR 31%(lorlatinib 경험군), 46%(lorlatinib naive)"
    targetDisease: "Advanced ALK+ NSCLC. 1·2세대 TKI 후 lorlatinib 내성 변이(G1202R 등) 출현 시 표준치료 한계."
    moa: "ALK 선택적, TRK-sparing 3세대 TKI. 뇌전이 침투 + 내성 변이 커버"
    sources:
      - https://investors.nuvalent.com/2026-05-27-Nuvalent-Announces-Key-Program-and-Business-Updates,-Strengthening-Foundation-for-Global-Leadership-in-ROS1-and-ALK-positive-NSCLC
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
    outcome: met
    outcome_date: 2026-05-18
    result: "ENCORE 3b상 (ATS late-breaker) — 6개월 배양음전 87.8% vs 57.0%(p<0.0001). sNDA 2H 2026 제출 예정."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-18
    result: "Positive — Trevi, ATS 2026 oral서 CORAL Ph2b IPF 만성기침 1차·서브그룹 발표. 중증(20+회/h) 24h 기침빈도 위약대비 51%↓(p<0.0001), 중등도(10-19회/h) 75%↓(p<0.0001). 항섬유화제 병용·기저기침수 분석 일관."
    outcome_sources:
      - https://www.biospace.com/press-releases/trevi-therapeutics-announces-oral-presentation-and-multiple-posters-accepted-at-the-american-thoracic-society-ats-2026-international-conference
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
    outcome: approved
    outcome_date: 2026-07-13
    result: "FDA 승인(PDUFA 6주 조기) — LEQEMBI IQLIK(lecanemab-irmb) 피하주사 개시 투여(500mg 주 1회 SC) 조기 알츠하이머 sBLA 승인. IV 격주 → SC 주 1회 자가투여 전환. 출시 2026년 8월 말 예정."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/07/13/3326503/0/en/FDA-Approves-LEQEMBI-IQLIK-lecanemab-irmb-Subcutaneous-Injection-as-an-Initiation-Dose-for-Early-Alzheimer-s-Disease.html
      - https://investors.biogen.com/news-releases/news-release-details/fda-approves-leqembir-lecanemab-irmb-subcutaneous
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
    outcome: met
    outcome_date: 2026-05-27
    result: "EASL 2026 MAESTRO — 보상성 MASH 간경변(F4c) ANTICIPATE-NASH 고위험 CSPH 비율 기저 75%→2년 54.5%, 실제진료 코호트 91% 1년 간경직도 개선/유지."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/05/27/3301883/0/en/Madrigal-Presents-Data-Demonstrating-Rezdiffra-Reduced-Markers-of-Cardiovascular-and-Liver-Related-Risk-in-Patients-with-MASH.html
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
    outcome: met
    outcome_date: 2026-05-30
    result: "IGNYTE 3년 landmark OS (anti-PD-1 실패 melanoma) — mOS 32.9개월, 3yr OS 47.8%(반응자 83.5%), ORR 33.6%, mDOR 24.8개월."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-31
    result: "LIBRETTO-432 3상(n=151) — 절제후 RET+ NSCLC adjuvant, EFS 1차 EP 충족(highly significant), OS 추세 양호·미성숙 (ASCO Plenary LBA3)."
    outcome_sources:
      - https://investor.lilly.com/news-releases/news-release-details/lillys-retevmo-selpercatinib-delivers-substantial-event-free
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
    outcome: met
    outcome_date: 2026-06-01
    result: "RINGSIDE 3상 데스모이드 종양 — PFS HR 0.16 (ASCO oral). NDA 2026-04-29 제출."
    outcome_sources:
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
    outcome: mixed
    outcome_date: 2026-06-02
    result: "SENTRY 3상 frontline JAKi-naive MF(ASCO LBA) — SVR35 50% vs 28%(p<0.0001) 충족, 공동1차 TSS50 미충족(p=0.825). OS HR 0.43 우호적 경향. JCO 게재, SVR35 단독 승인 경로 논의."
    outcome_sources:
      - https://ascopubs.org/doi/10.1200/JCO-26-01080
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
    outcome: met
    outcome_date: 2026-04-20
    result: "HIBISCUS 3상 SCD 공동1차 EP 모두 충족 — VOC 27% 감소 vs 위약, 혈색소 반응 48.7% vs 7.2%(Wk24), 첫 VOC까지 4개월 지연. first-in-class 경구 PKR 활성제. filing 2H 2026."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-14
    result: "ASGCT preclinical(NHP) — in vivo CRISPR LDLR, LDL-C ≥90% 감소 6개월 유지, LDLR 단백 ≥6배 증가. IND/CTA 2026 중반, FIH 2H 2026."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/05/14/3294685/0/en/Editas-Medicine-Reports-New-Preclinical-Data-Demonstrating-Progress-of-EDIT-401-as-Potential-Treatment-for-Hyperlipidemia-at-the-American-Society-of-Gene-and-Cell-Therapy-2026-Annu.html
  - date: 2026-05-14
    ticker: BIIB
    event: "diranersen (BIIB080) CELIA Phase 2 topline (1차 CDR-SB 미달, tau↓ 2차 양성, Ph3 진행)"
    type: Clinical Readout
    company: Biogen
    drug: Diranersen (BIIB080)
    indication: Early Alzheimer's Disease
    phase: Phase 2
    trialDesign: "CELIA Phase 2 RCT (n=416), IT 주사 3용량(60/120/180mg) vs 위약, 76주 CDR-SB 1차 종결점. 공동개발: Ionis Pharmaceuticals (IONIS-MAPTRx)."
    targetDisease: "초기 알츠하이머(MCI/경도 치매, 아밀로이드 확인). tau 병리 표적."
    moa: "ASO — MAPT mRNA 표적으로 tau 단백 합성 억제."
    sources:
      - https://investors.biogen.com/news-releases/news-release-details/topline-results-phase-2-celia-study-diranersen-biib080-first
      - https://www.businesswire.com/news/home/20260514986673/en/Ionis-partner-Biogen-announces-topline-results-from-Phase-2-CELIA-study-of-diranersen-BIIB080-first-study-to-show-reduction-in-tau-pathology-and-cognitive-benefit-in-patients-with-early-Alzheimers-disease
    outcome: mixed
    outcome_date: 2026-05-14
    result: "1차 종결점(CDR-SB 76주 용량-반응) 미달. 2차: 모든 용량에서 CSF t-tau·p-tau 유의 감소, 고용량(180mg) 군 tau PET 의미있는 감소. 사전설정 임상지표 분석에서 인지저하 둔화 신호. Biogen·Ionis, 3상 레지스트레이션 진행 결정."
    outcome_sources:
      - https://investors.biogen.com/news-releases/news-release-details/topline-results-phase-2-celia-study-diranersen-biib080-first
      - https://www.businesswire.com/news/home/20260514986673/en/Ionis-partner-Biogen-announces-topline-results-from-Phase-2-CELIA-study-of-diranersen-BIIB080-first-study-to-show-reduction-in-tau-pathology-and-cognitive-benefit-in-patients-with-early-Alzheimers-disease
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
    outcome: met
    outcome_date: 2026-05-18
    result: "Positive — IMPALA-2 Phase 3 운동능력 데이터: 48주차 6분보행거리 molgramostim +167.0m vs 위약 +86.4m, 치료차이 +80.6m (P=0.0301). 운동 지속시간·peak METs도 일관 개선. 1차 종결점(A-a gradient) 충족 후 발표."
    outcome_sources:
      - https://www.biospace.com/press-releases/savara-announces-new-exercise-capacity-data-from-the-impala-2-phase-3-clinical-trial-of-molgramostim-inhalation-solution-molgramostim-in-autoimmune-pulmonary-alveolar-proteinosis-apap
      - https://investors.savarapharma.com/news/news-details/2026/Savara-To-Present-New-Data-at-the-American-Thoracic-Society-ATS-2026-International-Conference/default.aspx
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
    outcome: met
    outcome_date: 2026-05-31
    result: "Positive(modest) — RP2 Phase 1 FIH 진행성 고형암 85명: 단독 ORR 19.0%(4/21), nivolumab 병용 ORR 19.1%(9/47, DCR 48.9%). 포도막 흑색종 pooled ORR 33.3%, mDOR 미도달~22.1개월. Grade 4/5 TRAE 없음."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/05/31/3303918/0/en/Replimune-Presents-Final-First-in-Human-Data-for-RP2-in-Advanced-Solid-Tumors-During-Oral-Presentation-at-the-2026-American-Society-of-Clinical-Oncology-Annual-Meeting.html
      - https://www.biospace.com/press-releases/replimune-presents-final-first-in-human-data-for-rp2-in-advanced-solid-tumors-during-oral-presentation-at-the-2026-american-society-of-clinical-oncology-annual-meeting
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
    outcome: approved
    outcome_date: 2026-03-25
    result: "FDA 승인 (PDUFA 7/11보다 약 3.5개월 조기) — Lifyorli™(relacorilant) + nab-paclitaxel, 백금저항성 상피성 난소암·난관암·원발복막암(베바시주맙 포함 1~3차 전치료 후). 첫 선택적 GR 길항제(SGRA). ROSELLA Ph3(n=381): OS HR 0.65(사망위험 -35%, mOS +4.1개월), mPFS 6.54 vs 5.52개월(HR 0.70, p=0.0076). 용법 nab-paclitaxel 투여 전일·당일·익일 relacorilant 150mg 경구."
    outcome_sources:
      - https://ir.corcept.com/news-releases/news-release-details/fda-approves-corcepts-selective-glucocorticoid-receptor
      - https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-relacorilant-nab-paclitaxel-platinum-resistant-epithelial-ovarian-fallopian-tube-or
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
    outcome: met
    outcome_date: 2026-06-11
    result: "ENABLE Ph1 CML (EHA S164) — 80mg QD 누적 MMR 47%, 24주 내 MMR 38%, asciminib 선행 환자 누적 MMR 52%. 동일 ENABLE-2 Ph3 설계 FDA 합의(2H 2026 개시)."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-13
    result: "RISE UP 3상 SCD(n=207, 100mg BID) — 1차 혈색소 반응(≥1.0 g/dL↑) 40.6% vs 위약 2.9%(p<0.0001) 충족. 단 통증발작(VOC) 2.62 vs 3.05(p=0.12)는 비유의. sNDA 가속승인 신청(EHA Plenary S102)."
    outcome_sources:
      - https://investor.agios.com/news-releases/news-release-details/agios-present-new-data-eha-2026-reinforcing-significant
      - https://www.globenewswire.com/news-release/2026/06/13/3311392/31990/en/Agios-Showcases-RISE-UP-Phase-3-Results-at-EHA-2026-Plenary-Session-Reinforcing-Strong-Anti-Hemolytic-Profile-of-Mitapivat-in-Sickle-Cell-Disease.html
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
    outcome: met
    outcome_date: 2026-06-13
    result: "APEX 2상 진행성 전신비만세포증(AdvSM, EHA S438) — ORR 57% mIWG, PPR 80%, 89%에서 ≥50% 비만세포 부담 감소."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-20
    result: "CANOPY-HCH-3 3상 연골무형성증 유사 hypochondroplasia — 1차 충족, 연간 성장속도 위약대비 +2.33 cm/yr(p<0.0001). sNDA 라벨확장 예정."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-29
    result: "IMPACT Ph2b 48주 MASH(EASL Best of EASL) — 1.8mg 섬유화 복합반응 32.4% vs 위약 3.2%, 체중 -7.5%, 간지방 -54.7%, ALT 개선. FDA BTD 획득."
    outcome_sources:
      - https://ir.altimmune.com/news-releases/news-release-details/pemvidutide-demonstrates-significant-metabolic-improvements
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
    outcome: met
    outcome_date: 2026-05-27
    result: "Positive — ARO-INHBE Phase 1/2a EASL 2026: 비만+기저 간지방>8% 환자에서 200mg+ 단독 위약보정 LFC -44%, Activin E 최대 -85.3%(400mg). low-dose tirzepatide 병용 시 체중감소 2배·내장/총/간지방 감소 3배(vs tirzepatide 단독)."
    outcome_sources:
      - https://arrowheadpharma.com/en-us/newsroom/arrowhead-pharmaceuticals-presents-new-clinical-data-rnai-based
      - https://www.businesswire.com/news/home/20260527903149/en/Arrowhead-Pharmaceuticals-Presents-New-Clinical-Data-on-RNAi-based-Obesity-and-MASH-Candidate-ARO-INHBE-at-EASL-2026
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
    outcome: met
    outcome_date: 2026-05-29
    result: "Positive — LINKER-AL2 Phase 1/2: 2L+ 전신 AL 아밀로이드증 전 환자 깊고 빠른 반응, Day 15 유리경쇄 정상화. 최고용량(240mg) 혈액학적 CR 100%·80mg 71%. 신장(73%)·심장(50%) 장기기능 개선. 등록목적 Phase 2 진행 중."
    outcome_sources:
      - https://investor.regeneron.com/news-releases/news-release-details/lynozyficr-linvoseltamab-monotherapy-demonstrates-deep-and-rapid/
      - https://www.globenewswire.com/news-release/2026/05/21/3299793/0/en/Lynozyfic-linvoseltamab-Monotherapy-Demonstrates-Deep-and-Rapid-Responses-in-All-Treated-Patients-with-Second-Line-Plus-Systemic-Amyloid-Light-Chain-Amyloidosis.html
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
    outcome: met
    outcome_date: 2026-05-31
    result: "Positive — ABBV-969(STEAP1/PSMA ADC) mCRPC Phase 1 cORR 45%(29명), PSA50 67%·PSA90 28%. ABBV-706(SEZ6 ADC) 2L SCLC ORR 82%(17명, 1.8mg/kg RP3D). 두 oral 모두 긍정 데이터(발표 5/31·6/1)."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-05-30
    result: "Positive — Pumitamig(PD-L1xVEGF) ROSETTA Lung-02 1L NSCLC Phase 2 cORR 비편평 57.1%·편평 68.4%, DCR 100%, PD-L1 무관 반응. Gotistobart PROC Phase 2 ORR 25~27.6%(1·2mg/kg)+의미있는 OS. 두 oral 긍정."
    outcome_sources:
      - https://www.biontech.com/int/en/home/mediaroom/news/press-releases/2026/05/Global-Data-for-BioNTech-and-Bristol-Myers-Squibb-s-PD-L1xVEGF-A-Bispecific-Pumitamig-Shows-Encouraging-Efficacy-in-Patients-with-Non-Small-Cell-Lung-Cancer-in-ROSETTA-Lung-02-Trial.html
      - https://www.onclive.com/view/phase-2-data-from-rosetta-lung-02-a-global-randomized-phase-2-3-trial-of-pumitamig-pd-l1-vegf-a-bsab-chemotherapy-in-1l-nsclc
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
    outcome: met
    outcome_date: 2026-05-31
    result: "ASCENT-04/KEYNOTE-D19 3상 1L PD-L1+ mTNBC — saci govitecan+pembro vs chemo+pembro mPFS 11.2 vs 7.8개월(HR 0.65, p<0.001), DOR 16.5 vs 9.2개월. NEJM 게재."
    outcome_sources:
      - https://www.gilead.com/news/news-details/2026/new-england-journal-of-medicine-publishes-phase-3-ascent-04keynote-d19-results-supporting-trodelvy-plus-keytruda-as-a-potential-new-standard-of-care-in-first-line-pd-l1-metastatic-triple-neg
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
    outcome: met
    outcome_date: 2026-05-31
    result: "SUCCESSOR-2 3상 R/R 다발골수종 — MeziKd vs Kd mPFS 18 vs 8.3개월(HR 0.48, p<0.0001), ORR 80.2% vs 53.4% (ASCO LBA7506)."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-01
    result: "Positive — Intismeran+KEYTRUDA KEYNOTE-942 5년(60.3개월) 업데이트: 재발/사망 위험 49%↓(RFS HR 0.510), 원격전이/사망 59%↓(DMFS HR 0.411). 5년 OS 92.2% vs pembro 단독 71.3%. JCO 동시 게재."
    outcome_sources:
      - https://www.merck.com/news/moderna-and-merck-present-5-year-data-for-intismeran-autogene-in-combination-with-keytruda-pembrolizumab-in-patients-with-high-risk-stage-iii-iv-melanoma-following-complete-resection-at-the-20/
      - https://ascopubs.org/doi/10.1200/JCO-26-00835
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
    outcome: met
    outcome_date: 2026-06-01
    result: "Positive — Zelenectide pevedotin+pembrolizumab Duravelo-2 1L mUC 최적용량 ORR ~62-65%, SOC(EV+pembro) 대비 동등 반응·차별화 안전성(피부반응 ~4배↓, 말초신경병증 ~절반). 추가 데이터 2H 2026."
    outcome_sources:
      - https://www.biospace.com/press-releases/bicycle-therapeutics-to-present-initial-duravelo-2-data-at-2026-asco-annual-meeting
      - https://www.stocktitan.net/sec-filings/BCYC/8-k-bicycle-therapeutics-plc-reports-material-event-4db8c6ea7072.html
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
    outcome: met
    outcome_date: 2026-06-14
    result: "KOMET-007 1상 frontline AML(n=99, EHA oral) — ziftomenib+7+3 NPM1m CRc 96%, KMT2A-r 90%, MRD 음성 82~83%. 3상 등록 진행, 새 안전성 신호 없음."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-18
    result: "VRBPAC 9-0 만장일치 찬성 (50-64세 9-0, 65+ 9-0). 첫 mRNA 독감백신 자문위 권고. 상대 VE 26.6%(표준 4가 IIV 대비), 의료이용 outcome 47.9%. FDA PDUFA 2026-08-05 결정 예정."
    outcome_sources:
      - https://www.biospace.com/press-releases/moderna-announces-fda-advisory-committee-votes-unanimously-in-favor-of-the-benefit-risk-profile-of-mrna-1010-an-investigational-seasonal-influenza-vaccine
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
    outcome: met
    outcome_date: 2026-06-04
    result: "RESET-Myositis 1/2상(EULAR OP0170) — 1차 80%(8/10) TIS 반응, 피부근염 83%, 반응자 전원 면역억제제 중단 유지. 고등급 CRS·ICANS 없음."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/03/3305899/0/en/Cabaletta-Bio-Announces-New-Rese-cel-Data-and-Development-Updates-Across-Autoimmune-Portfolio-Including-Encouraging-Early-PC-Free-Lupus-Findings-at-EULAR-2026-Congress.html
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
    outcome: met
    outcome_date: 2026-06-05
    result: "ACCESS Ph2b 비만(ADA oral) — aleniglipron 180mg 44주 위약보정 체중 -16.3%, 240mg -16.0%, 경구 GLP-1RA 중 최고 수치. Ph3 진입 예정."
    outcome_sources:
      - https://ir.structuretx.com/news-releases/news-release-details/structure-therapeutics-reports-positive-topline-data-phase-2
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
    outcome: met
    outcome_date: 2026-06-06
    result: "EULAR LB0003 불응성 RA — AlloNK+rituximab ACR50 71%(6개월 추적군), 고등급 감염 2%·CRS/ICANS 없음. FDA RMAT 지정, 2026 Ph3 개시 예정."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/08/3307910/0/en/Artiva-Biotherapeutics-Highlights-AlloNK-Data-Presented-at-EULAR-2026-FDA-RMAT-Designation-in-Refractory-Rheumatoid-Arthritis-and-Webcast-Today.html
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
    outcome: met
    outcome_date: 2026-06-06
    result: "TRIUMPH-1 3상 비만 — 12mg 80주 위약보정 체중 -28.3% (GIP/GLP-1/Glucagon 삼중작용, ADA 발표)."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/lilly-to-present-new-data-on-foundayo-mounjaro-and-retatrutide-at-the-american-diabetes-associations-86th-scientific-sessions-building-toward-a-new-era-of-choice-in-diabetes-and-obesity-care-302783855.html
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
    outcome: met
    outcome_date: 2026-06-07
    result: "REIMAGINE 1/2/3 3상 T2D 모두 1차 충족 — REIMAGINE 2 vs sema 2.4mg HbA1c -1.91% vs -1.75%(p=0.0035), 체중 -14.2% vs -10.2%(p<0.0001); REIMAGINE 3+인슐린 체중 -12.0% vs +1.1%. Lancet 동시 게재."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-08
    result: "ACHIEVE-2/3/5 3상 T2D 모두 1차 충족(ADA) — ACHIEVE-3 경구 semaglutide 대비 HbA1c 우월(-1.9% vs -1.1%)·체중 추가감소, ACHIEVE-5(+인슐린) 최대 -2.05%. T2D 라벨 FDA 제출."
    outcome_sources:
      - https://investor.lilly.com/news-releases/news-release-details/lillys-oral-glp-1-orforglipron-demonstrated-superior-glycemic
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
    outcome: met
    outcome_date: 2026-06-12
    result: "EPCORE DLBCL-1 3상 R/R LBCL — 1차 PFS HR 0.74(95% CI 0.60-0.92, 유의), OS HR 0.96(비유의). 단독 SC 이중특이항체 3상 PFS 첫 입증."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-14
    result: "BRUIN CLL-322 3상 R/R CLL(EHA LB5001) — PVR(pirtobrutinib+venetoclax+rituximab) vs VR 진행/사망 45%↓(HR 0.55, 95% CI 0.40-0.75), 삼중요법 mPFS 미도달 vs 39.7개월. JCO 동시 게재."
    outcome_sources:
      - https://investor.lilly.com/news-releases/news-release-details/lillys-jaypirca-pirtobrutinib-significantly-reduced-risk-disease
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
    blogNote: "다발골수종 약을 정맥주사에서 몸에 붙이는 주사기 형태로 바꾸는 신청임. 효능은 기존 정맥주사와 비슷하다는 걸 이미 확인했고 투여 편의가 핵심 셀링포인트임. 항암제 중에 이런 온바디 주사기 형태는 처음이라 환자 편의와 병원 부담을 얼마나 줄이느냐가 관전 포인트임."
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
    outcome: approved
    outcome_date: 2026-07-09
    result: "FDA 승인(PDUFA 14일 조기) — Sarclisa Escena™(isatuximab-irfc SC) 다발골수종 기존 Sarclisa IV 전 적응증 동등 승인. IRAKLIA Ph3 ORR 비열등 충족(71.1% SC vs 70.5% IV). 최초 항암제 온바디 주사기(OBI) 제형. 적응증: Pd·Kd·VRd."
    outcome_sources:
      - https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-isatuximab-irfc-subcutaneous-injection-multiple-myeloma-indications
      - https://www.sanofi.com/en/media-room/press-releases/2026/2026-07-10-12-35-09-3325483
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
    outcome: met
    outcome_date: 2026-05-12
    result: "Positive — Agios, mitapivat 겸상적혈구병 가속승인 sNDA를 FDA 제출 완료. RISE UP Ph3(n=207, 2:1): Hb 반응·용혈 유의 개선. 확인적 RCT(~159명) 합의. 60일 filing review 후 수리통보 3Q 2026 예상."
    outcome_sources:
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
    outcome: approved
    outcome_date: 2026-05-22
    result: "Positive — FDA가 Hepcludex(bulevirtide-gmod) 8.5mg을 만성 D형간염(HDV) 성인(무경변/대상성 경변) 첫 치료제로 가속승인. MYR301 Phase 3의 HDV RNA 감소·ALT 정상화 기반, 확인적 임상 조건부. 미국 최초·유일 HDV 치료제."
    outcome_sources:
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
    outcome: approved
    outcome_date: 2026-06-09
    result: "Positive — FDA가 EBGLYSS(lebrikizumab) 8주 1회(250mg/2mL) 유지용량을 12세+ 중등도~중증 아토피피부염에 승인. 기존 4주 용법 확장으로 연 6회 주사만으로 유지. ADjoin Q8W 연장 + 노출-반응 모델 기반."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-11
    result: "ENERGY 2/3상 wAIHA(EHA S300) — 1차 충족. nipocalimab이 위약대비 약 3배 지속 Hgb 반응, Week 1부터 평균 ≥1g/dL 개선, 24주 ~2/3 환자 목표 달성. FDA 우선심사 중."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-13
    result: "EPCORE FL-1 3상 R/R 여포림프종 — ORR 95% vs 79%, CR 83% vs 50%, PFS HR 0.21 (vs R2 단독, EHA oral)."
    outcome_sources:
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
    outcome: met
    outcome_date: 2026-06-14
    result: "MonumenTAL-3 3상 R/R 다발골수종(EHA Plenary) — Tal+Dara±poma vs DPd PFS HR 0.28(p<0.0001), 24개월 PFS ~81%. GPRC5D 이중항체 3상 첫 우월성, NEJM 동시 게재."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/new-talvey-talquetamab-tgvs-plus-darzalex-faspro-daratumumab-and-hyaluronidase-fihj-data-demonstrate-the-strength-of-a-bispecific-combination-in-earlier-line-relapsed-or-refractory-multiple-myeloma-302799599.html
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
  - date: 2026-12-27
    ticker: PRAX
    event: "Relutrigine(PRAX-562) SCN2A/SCN8A DEE NDA PDUFA — 첫 표적 치료제, 우선심사·희귀소아질환 지정. EMBOLD 운동발작 -46% 조기종료 (2026-06-29 PDUFA 9/27→12/27 3개월 연장 — 추가 민감도분석 major amendment 분류, 안전성·제조 이슈 아님)"
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
      - https://www.globenewswire.com/news-release/2026/06/29/3319308/0/en/praxis-precision-medicines-announces-extension-period-for-relutrigine-for-treatment-of-scn2a-and-scn8a-developmental-and-epileptic-encephalopathies.html
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
    blogNote: "ZORYVE는 이미 6세 이상에서 승인된 검증된 바르는 약임. 이번엔 2세에서 5세까지 나이를 넓히는 거라 새 효능을 증명하는 게 아니어서 승인 가능성이 높게 점쳐짐. 소아 시장을 얼마나 더 가져가느냐가 관전 포인트임."
    company: Arcutis Biotherapeutics
    drug: ZORYVE (roflumilast) cream 0.3%
    indication: Plaque psoriasis in children ages 2 to 5
    phase: sNDA
    sources:
      - https://www.arcutis.com/fda-accepts-supplemental-new-drug-application-for-arcutis-zoryve-roflumilast-cream-0-3-for-the-treatment-of-plaque-psoriasis-in-children-ages-2-to-5/
      - https://www.globenewswire.com/news-release/2025/11/17/3189050/0/en/FDA-Accepts-Supplemental-New-Drug-Application-for-Arcutis-ZORYVE-roflumilast-Cream-0-3-for-the-Treatment-of-Plaque-Psoriasis-in-Children-Ages-2-to-5.html
    outcome: approved
    outcome_date: 2026-06-29
    result: "FDA 승인 — ZORYVE(roflumilast) 크림 0.3% 소아 2~5세 판상건선 적응증 확대(기존 6세+에서 2세+로). 비스테로이드성 1일1회 국소 제제 2세+ 최초 승인. PK/안전성 연구(ARQ-151-216 + 306 OLE) 기반, 전신흡수 최소."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/29/3319348/0/en/fda-approves-arcutis-zoryve-roflumilast-cream-0-3-for-the-treatment-of-plaque-psoriasis-in-children-as-young-as-age-2.html
      - https://www.arcutis.com/fda-approves-arcutis-zoryve-roflumilast-cream-0-3-for-the-treatment-of-plaque-psoriasis-in-children-as-young-as-age-2/
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
  - date: 2026-07-29
    ticker: CAPR
    event: Deramiocel(CAP-1002) DMD BLA FDA CTGTAC 자문위 — HOPE-3 Ph3 모든 1·2차 endpoint 충족, PDUFA 2026-08-22
    type: Regulatory
    blogNote: "듀센 근이영양증 세포치료제인데 3상에서 1차와 2차 목표를 모두 맞췄음. 이번 자문위에서 FDA 자문단이 이 데이터를 승인할 만하다고 보는지가 8월 22일 최종 결정의 방향을 가늠하게 함. 듀센은 치료 선택지가 절실한 병이라 자문위 분위기에 따라 주가가 크게 움직일 수 있음."
    company: Capricor
    drug: Deramiocel (CAP-1002)
    indication: Duchenne Muscular Dystrophy (DMD)
    phase: BLA
    sources:
      - https://www.globenewswire.com/news-release/2026/06/26/3318280/0/en/capricor-therapeutics-announces-fda-advisory-committee-meeting-to-review-bla-for-deramiocel-for-the-treatment-of-duchenne-muscular-dystrophy.html
      - https://www.capricor.com/investors/news-events/press-releases/detail/348/capricor-therapeutics-announces-fda-advisory-committee
  - date: 2026-07-29
    ticker: OTLK
    event: LYTENAVA(bevacizumab-vikg) 습성 AMD BLA PDUFA — 재심사(Class 1), FDA FDR 이미 효능 입증 인정
    type: PDUFA
    blogNote: "습성 황반변성에 쓰는 안과용 베바시주맙인데 앞서 한 번 보완요구를 받고 다시 낸 재심사임. FDA가 효능은 이미 인정한 상태라 이번엔 제조나 품질 쪽 문제가 풀렸는지가 관건임. 통과되면 기존 안과 항체보다 가격 경쟁력으로 승부할 수 있음."
    company: Outlook Therapeutics
    drug: LYTENAVA (ONS-5010 / bevacizumab-vikg)
    indication: Neovascular (wet) Age-Related Macular Degeneration (nAMD)
    phase: BLA (Class 1 resubmission)
    sources:
      - https://ir.outlooktherapeutics.com/news-releases/news-release-details/outlook-therapeutics-announces-fda-acceptance-resubmitted
      - https://www.globenewswire.com/news-release/2026/06/16/3312535/0/en/outlook-therapeutics-announces-fda-acceptance-of-resubmitted-biologics-license-application-for-ons-5010-lytenava-bevacizumab-vikg-as-a-treatment-for-wet-amd.html
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
  - date: 2026-06-03
    ticker: KYTX
    event: "Miv-cel EULAR 2026 ACPA+ 불응성 RA Phase 1 업데이트 (ACR70 66.6% @36주, n=6)"
    type: Conference
    company: Kyverna Therapeutics
    drug: KYV-101 (miv-cel)
    indication: Refractory ACPA-positive Rheumatoid Arthritis
    phase: Phase 1
    conferenceId: eular
    trialDesign: "오픈라벨 Phase 1 바스켓. 2+ bDMARD·JAKi 실패 ACPA+ RA 환자 n=6. CD19 CAR-T 단회 주입 후 36주 ACR70 66.6%, 고등급 CRS·ICANS 없음."
    targetDisease: "다약제 불응성 ACPA 양성 류마티스 관절염. B세포 매개 자가면역에서 CD19 CAR-T 면역리셋"
    moa: "완전인간 자가 4-1BB CD19 CAR-T. B세포 고갈 → 자가면역 리셋"
    sources:
      - https://www.globenewswire.com/news-release/2026/06/03/3305974/0/en/kyverna-therapeutics-highlights-updated-miv-cel-data-at-eular-demonstrating-substantial-reduction-in-disease-activity-in-acpa-positive-treatment-refractory-rheumatoid-arthritis.html
    outcome: met
    outcome_date: 2026-06-03
    result: "EULAR 2026 Phase 1 ACPA+ 불응성 RA(n=6) — ACR70 66.6% @36주, 고등급 CRS·ICANS 없음."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/03/3305974/0/en/kyverna-therapeutics-highlights-updated-miv-cel-data-at-eular-demonstrating-substantial-reduction-in-disease-activity-in-acpa-positive-treatment-refractory-rheumatoid-arthritis.html
  - date: 2026-06-13
    ticker: RYTM
    event: "Setmelanotide PWS Phase 2 ENDO 2026 인터림 (Positive — 17명 BMI 감소·제지방 유지·과식증 개선)"
    type: Conference
    company: Rhythm Pharmaceuticals
    drug: IMCIVREE (setmelanotide)
    indication: Prader-Willi Syndrome
    phase: Phase 2
    conferenceId: endo
    trialDesign: "Phase 2 오픈라벨 인터림. IMCIVREE SC 대상 PWS 환자 17명 — 6개월 치료 BMI 유의한 감소, 제지방(lean mass) 유지, 과식증(hyperphagia) 개선."
    targetDisease: "프래더-윌리 증후군(PWS). SNRPN 유전자 부모각인 결함으로 과식증·비만·발달지연 초희귀 유전 증후군."
    moa: "MC4R 경로 활성화 → 시상하부 포만감·에너지 항상성 조절"
    sources:
      - https://www.globenewswire.com/news-release/2026/06/13/3311380/0/en/rhythm-pharmaceuticals-presents-positive-interim-six-month-data-from-phase-2-trial-of-setmelanotide-in-patients-with-prader-willi-syndrome-pws-at-endo-2026.html
    outcome: met
    outcome_date: 2026-06-13
    result: "PWS Phase 2 인터림(ENDO 2026) — 17명 6개월 BMI 유의 감소, 제지방 유지, 과식증 개선."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/13/3311380/0/en/rhythm-pharmaceuticals-presents-positive-interim-six-month-data-from-phase-2-trial-of-setmelanotide-in-patients-with-prader-willi-syndrome-pws-at-endo-2026.html
  - date: 2026-06-13
    ticker: JAZZ
    event: "Zepzelca (lurbinectedin) LAGOON Phase 3 2L SCLC — 1차 OS endpoint 미충족 (Negative)"
    type: Clinical Readout
    company: Jazz Pharmaceuticals
    drug: Zepzelca (lurbinectedin)
    indication: 2nd-Line Small Cell Lung Cancer
    phase: Phase 3
    trialDesign: "LAGOON Phase 3 무작위배정 — lurbinectedin vs 표준 화학요법 2L SCLC. Zepzelca 가속승인(2020) 확증 시험."
    targetDisease: "소세포폐암(SCLC) 2L. 1L 백금기반 치료 진행 후 표준 옵션 부재."
    moa: "RNA 중합효소 II 억제제. 전사 중독 종양세포 선택적 사멸"
    sources:
      - https://www.prnewswire.com/news-releases/jazz-pharmaceuticals-provides-update-on-zepzelca-lurbinectedin-phase-3-lagoon-trial-in-second-line-small-cell-lung-cancer-302798651.html
    outcome: failed
    outcome_date: 2026-06-13
    result: "LAGOON 3상 2L SCLC — 1차 OS endpoint 미충족. 가속승인 기반 확증시험 실패. 가속승인 철회 가능성."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/jazz-pharmaceuticals-provides-update-on-zepzelca-lurbinectedin-phase-3-lagoon-trial-in-second-line-small-cell-lung-cancer-302798651.html
  - date: 2027-02-02
    ticker: GILD
    event: "Yeztugo (경구 lenacapavir) HIV PrEP sNDA PDUFA — 주 1회 경구제, 첫 장기작용 경구 HIV 예방제 (PURPOSE-1/2 피벗)"
    type: PDUFA
    company: Gilead Sciences
    drug: Yeztugo (oral lenacapavir 6mg QW)
    indication: HIV Pre-Exposure Prophylaxis (PrEP) in adults
    phase: sNDA
    trialDesign: "PURPOSE-1 (여성 아프리카 대상) + PURPOSE-2 (MSM/transgender women 전 세계). 주 1회 경구 lenacapavir 6mg. sNDA FDA 수락 2026-06-15, PDUFA 2027-02-02"
    targetDisease: "HIV 고위험군 예방(PrEP). 일일 복약 TDF/FTC 순응도 한계 → 주 1회 경구제로 HIV 예방 접근성 향상"
    moa: "HIV 캡시드 억제제. 주 1회 6mg 경구 투여로 HIV 복제 다단계 차단"
    sources:
      - https://www.gilead.com/news/news-details/2026/u-s--fda-accepts-gileads-application-for-investigational-once-weekly-oral-yeztugo-potentially-the-first-long-acting-pill-for-hiv-prevention
  - date: 2026-06-15
    ticker: AXSM
    event: "AXS-12(reboxetine) ENCORE 장기 Phase 3 기면증 데이터 발표 (SLEEP 2026) — 카타플렉시 빈도 유의 감소, NDA FDA 검토 중"
    type: Conference
    company: Axsome Therapeutics
    drug: AXS-12 (reboxetine)
    indication: Narcolepsy with Cataplexy
    phase: Phase 3
    moa: "선택적 노르에피네프린 재흡수 억제 — 카타플렉시·주간졸림 동시 개선"
    sources:
      - https://www.biospace.com/press-releases/axsome-therapeutics-announces-axs-12-achieves-primary-endpoint-in-encore-long-term-phase-3-trial-in-narcolepsy
    outcome: met
    outcome_date: 2026-06-15
    result: "ENCORE 장기 Phase 3(OLE·무작위 철회) 데이터 SLEEP 2026 포스터(#375) 발표 — 카타플렉시 빈도 유의 감소에 더해 과도한 주간 졸림증·인지 기능도 대다수 환자에서 개선, 장기 안전성·내약성 유지. NDA 근거 데이터."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/15/3311661/33090/en/Axsome-Therapeutics-Presents-New-Data-Highlighting-its-Innovative-Sleep-Medicine-Portfolio-at-SLEEP-2026.html
  - date: 2026-06-13
    ticker: NTLA
    event: "lonvo-z(NTLA-2002) HAELO Phase 3 HAE 추가데이터 (EAACI 2026) — 발작 87% 감소, 롤링 BLA 진행, 2027 상반기 출시 목표"
    type: Conference
    company: Intellia Therapeutics
    drug: lonvoguran ziclumeran (lonvo-z, NTLA-2002)
    indication: Hereditary Angioedema (HAE)
    phase: Phase 3
    conferenceId: null
    moa: "in vivo CRISPR/Cas9로 간 KLKB1(prekallikrein) 유전자 1회 편집 → 발작 매개 칼리크레인 영구 감소"
    sources:
      - https://ir.intelliatx.com/news-releases/news-release-details/intellia-therapeutics-report-additional-phase-3-haelo-data
    outcome: met
    outcome_date: 2026-06-13
    result: "Positive — HAELO Phase 3 추가데이터 EAACI 2026 late-breaking oral. 1회 투여로 월 발작률 0.26 vs 위약 2.10 = 87% 감소(p<0.0001). 대부분 환자가 발작·기존치료에서 자유, 롤링 BLA 진행."
    outcome_sources:
      - https://ir.intelliatx.com/news-releases/news-release-details/intellia-therapeutics-report-additional-phase-3-haelo-data
      - https://ir.intelliatx.com/news-releases/news-release-details/intellia-therapeutics-reports-positive-phase-3-results
  - date: 2026-06-14
    ticker: CRNX
    event: "Atumelnant Phase 2 CAH 전체결과 발표 (ENDO 2026) — 안드로겐(A4) -67%, ACTH·17-OHP 정상화"
    type: Conference
    company: Crinetics Pharmaceuticals
    drug: Atumelnant (CRN04894)
    indication: Congenital Adrenal Hyperplasia (CAH)
    phase: Phase 2
    conferenceId: endo
    moa: "경구 ACTH(MC2R) 길항제 — 부신 안드로겐 과생산 직접 차단"
    sources:
      - https://www.globenewswire.com/news-release/2026/06/14/3311470/0/en/Crinetics-Presents-Full-Results-From-Phase-2-Trial-of-Atumelnant-in-Congenital-Adrenal-Hyperplasia-CAH-in-Oral-Presentation-at-ENDO-2026.html
    outcome: met
    outcome_date: 2026-06-14
    result: "Positive — 아투멜난트 Phase 2 CAH 전체결과 ENDO 2026 oral. A4 morning 평균 -67%(Cohort 4, GC 감량 병행); 용량의존(40/80/120mg = -58%/-70%/-80%). 12주 완료자 88%(7/8)가 생리적 GC 용량 달성, 중대 이상반응 無."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/14/3311470/0/en/Crinetics-Presents-Full-Results-From-Phase-2-Trial-of-Atumelnant-in-Congenital-Adrenal-Hyperplasia-CAH-in-Oral-Presentation-at-ENDO-2026.html
      - https://www.stocktitan.net/news/CRNX/crinetics-presents-full-results-from-phase-2-trial-of-atumelnant-in-1rha9myamz6m.html
  - date: 2026-06-13
    ticker: ASND
    event: "Palopegteriparatide(TransCon PTH) PaTHway Phase 3 182주 장기데이터 발표 (ENDO 2026) — 부갑상선기능저하증 정상 혈중칼슘·독립 유지"
    type: Conference
    company: Ascendis Pharma
    drug: Palopegteriparatide (TransCon PTH)
    indication: Hypoparathyroidism
    phase: Phase 3
    conferenceId: endo
    moa: "지속방출형 PTH(1-34) prodrug — 생리적 PTH 농도 24시간 유지로 칼슘·인 항상성 회복"
    sources:
      - https://www.globenewswire.com/news-release/2026/06/08/3308479/0/en/Ascendis-to-Showcase-Advances-in-Treatment-of-Rare-Endocrine-Diseases-at-ENDO-2026.html
    outcome: met
    outcome_date: 2026-06-13
    result: "Positive — PaTHway Phase 3 182주(3.5년) 장기데이터 ENDO 2026. 다요소 복합 엔드포인트 86% 충족, 활성 비타민D 100%·치료적 칼슘 96% 독립, 혈중칼슘·인·골밀도 정상·안정 유지(n=82, 89% 완료)."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/13/3311416/0/en/Phase-3-Data-Show-TransCon-PTH-Replicated-Systemic-Actions-of-Endogenous-PTH-Through-Week-182-in-Adults-with-Hypoparathyroidism.html
      - https://investors.ascendispharma.com/news-releases/news-release-details/new-3-year-phase-3-data-confirmed-sustained-response-transconr
  - date: 2026-06-12
    ticker: MRK
    event: "WELIREG(belzutifan) + KEYTRUDA 보조요법 clear cell RCC FDA 승인 — 신장절제 후 중간-고위험/고위험 재발"
    type: Regulatory
    company: Merck & Co.
    drug: WELIREG (belzutifan) + KEYTRUDA (pembrolizumab)
    indication: Adjuvant clear cell RCC (post-nephrectomy)
    phase: sBLA/sNDA
    moa: "HIF-2α 억제제(belzutifan) + 항PD-1(pembrolizumab) 병용 — 최초 PD-1+HIF-2α 보조요법"
    sources:
      - https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-belzutifan-pembrolizumab-adjuvant-treatment-renal-cell-carcinoma
      - https://www.merck.com/news/fda-approves-keytruda-pembrolizumab-and-keytruda-qlex-pembrolizumab-and-berahyaluronidase-alfa-pmph-each-with-welireg-belzutifan-for-adjuvant-treatment-of-certain-patients/
    outcome: approved
    outcome_date: 2026-06-12
    result: "FDA 정규승인(신규 병용 적응증). 근거 LITESPARK-022(NCT05239728, n=1,841): 무병생존 HR 0.72(95% CI 0.59-0.87), pembrolizumab+위약 대비 재발·전이·사망 ~28% 감소. WELIREG 최초 초기단계 ccRCC 승인이자 최초 PD-1+HIF-2α 보조 병용요법."
    outcome_sources:
      - https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-belzutifan-pembrolizumab-adjuvant-treatment-renal-cell-carcinoma
      - https://www.merck.com/news/fda-approves-keytruda-pembrolizumab-and-keytruda-qlex-pembrolizumab-and-berahyaluronidase-alfa-pmph-each-with-welireg-belzutifan-for-adjuvant-treatment-of-certain-patients/
  - date: 2026-08-05
    ticker: MRNA
    event: "MFLUSIVA(mRNA-1010) 계절 독감백신 BLA PDUFA 결정 (50세+) — VRBPAC 6/18 9-0 만장일치 통과"
    type: PDUFA
    company: Moderna
    drug: MFLUSIVA (mRNA-1010)
    indication: Seasonal Influenza (Adults 50+)
    phase: BLA
    moa: "LNP mRNA 4가 독감백신(A H1N1·H3N2 + B Victoria·Yamagata HA) — 신속 균주 업데이트"
    sources:
      - https://www.biospace.com/press-releases/moderna-announces-fda-advisory-committee-votes-unanimously-in-favor-of-the-benefit-risk-profile-of-mrna-1010-an-investigational-seasonal-influenza-vaccine
  - date: 2026-09-30
    ticker: BMY
    event: "Camzyos(mavacamten) 청소년(12~17세) 증상성 폐쇄성 비대성 심근증 sNDA PDUFA (Priority Review) — SCOUT-HCM Ph3 1차 충족"
    type: PDUFA
    company: Bristol Myers Squibb
    drug: Camzyos (mavacamten)
    indication: Adolescent Symptomatic Obstructive HCM (oHCM)
    phase: sNDA (Priority Review)
    moa: "선택적 심장 미오신 억제제 — 좌심실 유출로 폐쇄 완화"
    sources:
      - https://www.businesswire.com/news/home/20260529154810/en/U.S.-Food-and-Drug-Administration-Accepts-for-Priority-Review-Bristol-Myers-Squibbs-Supplemental-New-Drug-Application-for-Camzyos-mavacamten-to-Treat-Adolescents-with-Symptomatic-Obstructive-Hypertrophic-Cardiomyopathy-oHCM
  - date: 2026-11-30
    ticker: REGN
    event: "Cemdisiran gMG NDA PDUFA (Priority Review, PRV 사용 — 정확일 미공개, FDA target action November 2026) — Ph3 NIMBLE, anti-C5 siRNA SC q12주"
    type: PDUFA
    company: Regeneron
    drug: Cemdisiran
    indication: AChR-Ab+ Generalized Myasthenia Gravis (gMG)
    phase: NDA
    trialDesign: "NIMBLE Phase 3 — 증상성 AChR-Ab+ gMG 성인, cemdisiran SC 12주마다 투여, 표준 면역억제제 병용 가능. FDA·EMA 동시 수리(2026-06-22). Priority Review Voucher 사용으로 가속 심사"
    targetDisease: "전신 중증근무력증(gMG). anti-AChR 자가항체가 보체(C5) 매개 신경근접합부 손상 유발 — 기존 보체 억제제는 정맥/빈번 투여 부담"
    priorTrialUrl: https://investor.regeneron.com/news-releases/news-release-details/regeneron-announces-positive-results-phase-3-trial-generalized
    moa: "Anti-C5 siRNA(GalNAc 접합). 간세포 C5 mRNA 침묵화로 보체 말단경로 차단 → SC 12주 1회 장기작용"
    sources:
      - https://investor.regeneron.com/news-releases/news-release-details/cemdisiran-regulatory-submissions-accepted-review-fda-and-ema
      - https://www.neurologylive.com/view/fda-ema-accepts-regulatory-applications-cemdisiran-generalized-myasthenia-gravis
  - date: 2026-08-31
    ticker: EYPT
    event: "DURAVYU(vorolanib) LUGANO Phase 3 wet AMD topline readout (mid-2026, 정확일 미정) — DSMC 3회 연속 긍정 권고"
    type: Clinical Readout
    company: EyePoint Pharmaceuticals
    drug: DURAVYU (vorolanib intravitreal insert, EYP-1901)
    indication: Neovascular (Wet) AMD
    phase: Phase 3
    trialDesign: "LUGANO(NCT06668064) 무작위 이중맹검 대조 Phase 3, 56주 1차 평가. 자매시험 LUCIA(NCT06683742) 수주 후 추가 readout 예정. DSMC 3회 연속 긍정 권고로 데이터 신뢰도 제고"
    targetDisease: "습성 노인황반변성(wet AMD). VEGF 주도 신생혈관으로 시력 급격 저하 — 기존 항VEGF 월 1회 반복주사 부담, 장기 서방형 대안 필요"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT06668064
    moa: "Vorolanib(선택적 VEGFR·PDGFR TKI)를 Durasert E 생분해 삽입제로 유리체강 내 6개월+ 서방 → 신생혈관 억제"
    sources:
      - https://www.globenewswire.com/news-release/2026/05/14/3294726/0/en/EyePoint-Announces-Third-Consecutive-Positive-DSMC-Recommendation-for-Phase-3-Wet-AMD-Trials-for-DURAVYU-Building-Confidence-Ahead-of-Mid-2026-Topline-Data.html
      - https://investors.eyepoint.bio/news-releases/news-release-details/eyepoint-announces-third-consecutive-positive-dsmc
  - date: 2026-06-14
    ticker: LEGN
    event: "LB2501 Phase 1 R/R B-NHL EHA 2026 Late-Breaking oral (Positive — in vivo CD19/CD20 이중 CAR-T, DL2 ORR 100%[6/6], CR 83%; 림프구감소 외 중증 독성 없음)"
    type: Conference
    company: Legend Biotech
    drug: LB2501
    indication: Relapsed/Refractory B-Cell Non-Hodgkin Lymphoma
    phase: Phase 1
    conferenceId: eha
    trialDesign: "개방표지 용량상승 Phase 1. R/R B-NHL 2개 용량 코호트(DL1/DL2) — 단회 IV 주입으로 체내 CD19/CD20 이중표적 CAR-T 직접 생성. 세포 제조·림프구감소 전처치 불요. DL2 ORR 100%(6/6), CR 83%"
    targetDisease: "재발/불응성 B세포 비호지킨림프종. 기존 ex vivo CAR-T는 환자별 제조 수주+고비용 — in vivo 단회 IV로 접근성 확대 목표"
    moa: "렌티바이러스 벡터로 CD19·CD20 이중특이 CAR 유전자를 체내 T세포에 직접 전달 → ex vivo 제조 없이 in vivo CAR-T 생성"
    outcome: met
    outcome_date: 2026-06-14
    result: "EHA 2026 Late-Breaking oral — in vivo CD19/CD20 이중 CAR-T, DL2에서 ORR 100%(6/6)·CR 83%. 림프구감소 외 중증 독성 없음(first-in-class in vivo CAR-T proof-of-concept)."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/14/3311435/0/en/Legend-Biotech-Establishes-Clinical-Proof-of-Concept-for-LB2501-a-Potential-First-in-Class-In-Vivo-CD19-CD20-Dual-Targeting-CAR-T-in-Relapsed-Refractory-B-Cell-Non-Hodgkin-Lymphoma.html
  - date: 2026-06-07
    ticker: LXRX
    event: "Sotagliflozin T1D inTandem 풀드분석 ADA 2026 포스터 — 주요 하위군 일관된 HbA1c 개선, NDA 재제출 근거"
    type: Conference
    company: Lexicon Pharmaceuticals
    drug: Sotagliflozin (Zynquista)
    indication: Type 1 Diabetes
    phase: Pooled Phase 3
    conferenceId: ada
    trialDesign: "inTandem1·2·3 Phase 3 풀드 데이터 하위군 분석. 주요 성인 T1D 하위군 전반에서 HbA1c 개선 일관성 검증. NDA 재제출(2026 mid-year 예정) 지지"
    targetDisease: "1형 당뇨. 인슐린 보조요법으로 혈당 변동·HbA1c 관리 미충족 수요"
    moa: "SGLT1/2 이중 억제제. SGLT2 신장 포도당 재흡수 + SGLT1 장내 흡수 동시 억제로 혈당 강하"
    sources:
      - https://www.globenewswire.com/news-release/2026/06/03/3305962/0/en/Lexicon-to-Present-Data-at-the-American-Diabetes-Association-ADA-2026-Scientific-Sessions.html
    outcome: met
    outcome_date: 2026-06-07
    result: "Positive — inTandem1·2·3 풀드 하위군 분석: sotagliflozin 성인 T1D 주요 하위군 전반 일관된 HbA1c 개선(기존 풀드 200/400mg 각 -0.36%/-0.38% vs 위약). ADA 2026 포스터 발표, NDA 재제출 근거 지지."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/06/03/3305962/0/en/Lexicon-to-Present-Data-at-the-American-Diabetes-Association-ADA-2026-Scientific-Sessions.html
      - https://www.stocktitan.net/news/LXRX/lexicon-to-present-data-on-effect-of-kidney-function-on-the-long-h182qv3mo77n.html
  - date: 2026-07-01
    ticker: RVMD
    event: "ESMO GI 2026 — zoldonrasib(G12D)+daraxonrasib 췌장암 콤보 oral 2건"
    type: Conference
    blogNote: "ESMO GI 학회에서 RAS 억제제 두 개를 합친 췌장암 데이터를 공개함. 그중 daraxonrasib는 이미 단독으로 생존기간을 두 배로 늘린 적이 있어서(6.7개월에서 13.2개월) 병용이 성적을 더 끌어올릴 수 있을지가 관전 포인트임."
    company: Revolution Medicines
    drug: Zoldonrasib + Daraxonrasib
    indication: Metastatic Pancreatic Cancer (RAS G12D)
    phase: Phase 1/2
    trialDesign: "RAS(ON) 억제제 콤보 — zoldonrasib(RAS(ON) G12D-selective) + daraxonrasib(RAS(ON) multi-selective) 병용. ESMO GI 2026(뮌헨, 7/1–4) oral 2건."
    targetDisease: "전이성 췌장선암(PDAC), KRAS G12D 변이. 1L 진행 후 표준 옵션 부재."
    moa: "RAS(ON) 이중표적 — G12D 변이체 직접 억제 + multi-selective 병용으로 잔존 RAS 신호 차단."
    sources:
      - https://www.globenewswire.com/news-release/2026/06/24/3317231/0/en/revolution-medicines-to-present-clinical-data-from-ras-on-inhibitor-combination-trials-in-pancreatic-cancer-at-esmo-gastrointestinal-cancers-congress-2026.html
    outcome: met
    outcome_date: 2026-07-02
    result: "ESMO GI 2026 oral 2건 발표. ①1L zoldonrasib+mFOLFIRINOX: ORR 82%, DCR 96%(n=41). ②1L zoldonrasib+GnP: ORR 61%, DCR 90%(n=40). ③2L+ zoldonrasib+daraxonrasib: ORR 47–50%, mPFS 9.6개월(2L). RASolute 305·309 Phase 3 진행 중."
    outcome_sources:
      - https://ir.revmd.com/news-releases/news-release-details/revolution-medicines-presents-phase-12-clinical-data-zoldonrasib
  - date: 2026-07-14
    ticker: BIIB
    event: "diranersen (BIIB080) CELIA Phase 2 완전데이터 AAIC 2026 (1차 미달, tau↓·인지둔화 2차 양성)"
    type: Conference
    blogNote: "타우 단백질을 겨냥하는 안티센스 약임. 5월 속보에서는 1차 목표는 못 맞췄지만 타우 병리가 줄고 인지 저하가 느려지는 신호가 있었음. 이번 학회에서 전체 데이터가 공개되니까 그 신호가 얼마나 단단한지 보는 게 핵심임. 아밀로이드 항체와 다른 기전이라 성공하면 치료 선택지가 넓어짐."
    company: Biogen
    drug: Diranersen (BIIB080)
    indication: Early Alzheimer's Disease
    phase: Phase 2
    conferenceId: aaic
    trialDesign: "CELIA — 416명 RCT, 척수강내 3용량(60/120/180mg) vs 위약, 76주 CDR-SB 1차. 1차 미달이나 tau 병리 감소·인지 둔화 2차 시그널(2026-05 topline). Ionis 공동개발(IONIS-MAPTRx)."
    targetDisease: "초기 알츠하이머(MCI/경도 치매, 아밀로이드 확인). tau 병리 표적."
    moa: "ASO — MAPT mRNA 표적으로 tau 단백 합성 억제."
    sources:
      - https://investors.biogen.com/news-releases/news-release-details/topline-results-phase-2-celia-study-diranersen-biib080-first
      - https://www.businesswire.com/news/home/20260514986673/en/Ionis-partner-Biogen-announces-topline-results-from-Phase-2-CELIA-study-of-diranersen-BIIB080-first-study-to-show-reduction-in-tau-pathology-and-cognitive-benefit-in-patients-with-early-Alzheimers-disease
    outcome: mixed
    outcome_date: 2026-07-14
    result: "AAIC 2026 완전 데이터(n=416) 공개. 1차 종결점(CDR-SB 76주 용량반응) 미달 재확인. 모든 용량에서 CSF tau 감소·인지저하 둔화 신호 일관 재현. 60mg 최저용량 군에서 임상 효과 가장 뚜렷. Biogen·Ionis Phase 3 진행 결정."
    outcome_sources:
      - https://investors.biogen.com/news-releases/news-release-details/biogen-presents-phase-2-celia-data-aaic-demonstrating-meaningful
      - https://ir.ionis.com/news-releases/news-release-details/ionis-partner-biogen-presents-phase-2-celia-data-aaic
  - date: 2026-06-29
    ticker: AMGN
    event: "Tavneos ANCA 혈관염 FDA 청문회 (승인취소 심리)"
    type: Regulatory
    company: Amgen
    drug: "Tavneos (avacopan)"
    indication: "ANCA-associated vasculitis"
    phase: Various
    sources:
      - https://thepharmanews.net/article/amgen-tavneos-fda-hearing-mqb2u9e5
  - date: 2026-09-30
    ticker: QURE
    event: "AMT-130 헌팅턴병 가속승인 BLA 제출 (3분기 예정)"
    type: Regulatory
    company: uniQure
    drug: "AMT-130"
    indication: "Huntington's Disease"
    phase: BLA
    sources:
      - https://www.biospectator.com/news/view/29073
  - date: 2026-09-30
    ticker: RGNX
    event: "Clemidsogene MPS II(헌터증후군) BLA 재제출 (CAMPSIITE, 3분기 예정)"
    type: Regulatory
    company: REGENXBIO
    drug: "Clemidsogene"
    indication: "MPS II (Hunter syndrome)"
    phase: BLA
    sources:
      - https://thepharmanews.net/article/regenxbio-navsunli-mpsii-mqp8xhep
  - date: 2026-12-31
    ticker: SMMT
    event: "Ivonescimab HARMONi-3 최종 PFS+OS 중간분석 (1L squamous NSCLC, 하반기)"
    type: Clinical Readout
    company: Summit Therapeutics
    drug: "Ivonescimab"
    indication: "1L squamous NSCLC"
    phase: Phase 3
    sources:
      - https://www.biospectator.com/news/view/28601
  - date: 2026-12-31
    ticker: IMVT
    event: "IMVT-1402 난치성 류마티스관절염 Ph2b 28주 위약대조 topline (하반기)"
    type: Clinical Readout
    company: Immunovant
    drug: "Imeroprubart (IMVT-1402)"
    indication: "Difficult-to-treat RA"
    phase: Phase 2
    sources:
      - https://thepharmanews.net/article/hanall-imvt-imvt1402-mpeqbwuw
  - date: 2026-12-31
    ticker: NVO
    event: "Etavopivat 겸상적혈구병 FDA 신청 (Ph3 positive, 하반기)"
    type: Regulatory
    company: Novo Nordisk
    drug: "Etavopivat"
    indication: "Sickle Cell Disease"
    phase: NDA
    sources:
      - https://thepharmanews.net/2026/04/20/novo-nordisk-etavopivat-scd/
  - date: 2026-12-31
    ticker: MIRM
    event: "Volixibat 원발성 경화성 담관염(PSC) 소양증 NDA 제출 (Ph2 positive, 하반기)"
    type: Regulatory
    company: Mirum Pharmaceuticals
    drug: "Volixibat"
    indication: "PSC cholestatic pruritus"
    phase: NDA
    sources:
      - https://thepharmanews.net/2026/05/05/mirum-volixibat-psc/
  - date: 2026-12-31
    ticker: CMPX
    event: "Tovecimig(DLL4xVEGF) 담도암 2L BLA 제출 (COMPANION-002 PFS positive, 연내)"
    type: Regulatory
    company: Compass Therapeutics
    drug: "Tovecimig"
    indication: "2L biliary tract cancer"
    phase: BLA
    sources:
      - https://www.biospectator.com/news/view/28550
  - date: 2026-12-31
    ticker: KYTX
    event: "Miv-cel(CD19 CAR-T) 강직인간증후군(SPS) BLA 롤링 제출 완료 (4분기)"
    type: Regulatory
    company: Kyverna Therapeutics
    drug: "Miv-cel"
    indication: "Stiff-person syndrome"
    phase: BLA
    sources:
      - https://www.biospectator.com/news/view/28715
  - date: 2026-12-31
    ticker: EWTX
    event: "EDG-7500 비후성심근병증(HCM) 주요 임상결과 (4분기)"
    type: Clinical Readout
    company: Edgewise Therapeutics
    drug: "EDG-7500"
    indication: "Hypertrophic cardiomyopathy"
    phase: Phase 2
    sources:
      - https://www.biospectator.com/news/view/28928
  - date: 2026-12-31
    ticker: TRDA
    event: "ENTR-601-44 뒤센근이영양증(exon 44) 고용량 코호트 디스트로핀 데이터 (4분기)"
    type: Clinical Readout
    company: Entrada Therapeutics
    drug: "ENTR-601-44"
    indication: "DMD (exon 44 skip)"
    phase: Phase 1/2
    sources:
      - https://thepharmanews.net/2026/05/07/entrada-entr-601-44-dystrophin/
  - date: 2026-12-31
    ticker: BDTX
    event: "Silevertinib non-classical EGFR NSCLC FDA pivotal 미팅 (연말)"
    type: Regulatory
    company: Black Diamond Therapeutics
    drug: "Silevertinib"
    indication: "non-classical EGFR NSCLC"
    phase: Various
    sources:
      - https://www.biospectator.com/news/view/28874
  - date: 2026-12-31
    ticker: ABBV
    event: "APG777(zumilokibart) 아토피피부염 Ph3 착수 (Apogee 인수자산, 하반기)"
    type: Clinical Readout
    company: AbbVie
    drug: "Zumilokibart (APG777)"
    indication: "Atopic Dermatitis"
    phase: Phase 3
    sources:
      - https://www.biospectator.com/news/view/29104
  - date: 2026-06-29
    ticker: GMAB
    event: "Epcoritamab + lenalidomide EPCORE DLBCL-4 Phase 3 R/R DLBCL topline (Positive — PFS HR 0.40 美 [60%↓]·0.44 美외, p<0.0001; vs R-GemOx)"
    type: Clinical Readout
    company: Genmab
    drug: Epkinly (epcoritamab, SC) + lenalidomide
    indication: Relapsed/Refractory DLBCL
    phase: Phase 3
    moa: "CD3xCD20 이중특이 T세포 관여 항체(SC) + lenalidomide 병용 — 화학요법 없는 요법"
    sources:
      - https://ir.genmab.com/news-releases/news-release-details/genmab-announces-positive-phase-3-results-epcoritamab-plus
      - https://www.globenewswire.com/news-release/2026/06/29/3319290/0/en/Genmab-Announces-Positive-Phase-3-Results-for-Epcoritamab-Plus-Lenalidomide-in-Patients-with-Relapsed-Refractory-Diffuse-Large-B-Cell-Lymphoma-Demonstrating-Statistically-Significant-Improvement-in-Progression-Free-Survival.html
    outcome: met
    outcome_date: 2026-06-29
    result: "EPCORE DLBCL-4 3상 — epcoritamab(SC)+lenalidomide vs R-GemOx 표준요법, PFS 진행/사망 위험 미국 -60%(HR 0.40, 95% CI 0.30-0.55, p<0.0001)·미국외 -56%(HR 0.44). 안전성 각 약물 기존 프로파일과 일관. AbbVie 공동개발, 규제당국 논의 예정."
    outcome_sources:
      - https://ir.genmab.com/news-releases/news-release-details/genmab-announces-positive-phase-3-results-epcoritamab-plus
  - date: 2026-06-29
    ticker: BHVN
    event: "BHV-1300 Graves병 Phase 3 pivotal 개시 (첫 환자 등록 — first-in-class MoDE 세포외 단백질 분해제)"
    type: Clinical Readout
    company: Biohaven
    drug: BHV-1300 (MoDE extracellular protein degrader)
    indication: Graves' Disease
    phase: Phase 3
    trialDesign: "무작위 이중맹검 위약대조 ~300명 성인, 26주차 항갑상선제 없이 정상 갑상선기능 회복이 1차 목표"
    targetDisease: "그레이브스병(자가면역 갑상선기능항진) — TSHR 자극 자가항체(TSHR-IgG1)가 원인"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT07661056
    moa: "first-in-class MoDE degrader — TSHR-IgG1 자가항체를 표적해 체내 청소기전으로 분해"
    sources:
      - https://www.prnewswire.com/news-releases/biohaven-advances-a-new-class-of-precision-immunology-therapies-first-mode-extracellular-protein-degrader-bhv-1300-begins-phase-3-pivotal-trial-in-graves-disease-302812720.html
  - date: 2026-06-30
    ticker: ONC
    event: "Zanubrutinib + rituximab MANGROVE Phase 3 1L 외투세포림프종(MCL) topline (Positive — PFS HR 0.57, 진행/사망 43%↓, p<0.0001; chemo-free BTK 첫 Ph3)"
    type: Clinical Readout
    company: BeOne Medicines
    drug: BRUKINSA (zanubrutinib) + rituximab
    indication: 1L Mantle Cell Lymphoma
    phase: Phase 3
    priorTrialUrl: https://clinicaltrials.gov/study/NCT04002297
    moa: "BTK 억제제 — B세포 수용체 신호 차단으로 악성 B세포 증식 억제 (화학요법 없는 병용)"
    sources:
      - https://www.businesswire.com/news/home/20260630413578/en/BeOne-Medicines-Announces-Positive-Phase-3-Results-for-BRUKINSA-in-Frontline-Mantle-Cell-Lymphoma
    outcome: met
    outcome_date: 2026-06-30
    result: "MANGROVE 3상(n=510, 미치료 MCL) — zanubrutinib+rituximab vs bendamustine+rituximab, PFS HR 0.57(95% CI 0.43-0.76, p<0.0001; 진행/사망 43%↓). BTK 기반 chemo-free 요법의 1L MCL 첫 Phase 3. 규제 제출 2H 2026 예정."
    outcome_sources:
      - https://www.businesswire.com/news/home/20260630413578/en/BeOne-Medicines-Announces-Positive-Phase-3-Results-for-BRUKINSA-in-Frontline-Mantle-Cell-Lymphoma
  - date: 2026-06-30
    ticker: SNY
    event: "Nexviazyme(avalglucosidase alfa) Baby-COMET Phase 3 영아형 폼페병(IOPD) topline (Positive — 1차·주요 2차 EP 충족)"
    type: Clinical Readout
    company: Sanofi
    drug: Nexviazyme (avalglucosidase alfa)
    indication: Infantile-Onset Pompe Disease (IOPD)
    phase: Phase 3
    moa: "재조합 GAA 효소보충요법 — M6P 수용체 매개 근육세포 흡수로 리소좀 글리코겐 축적 감소"
    sources:
      - https://www.sanofi.com/en/media-room/press-releases/2026/2026-06-30-05-00-00-3319382
    outcome: met
    outcome_date: 2026-06-30
    result: "Baby-COMET 3상 — 미치료 IOPD(생후 6개월 이하 영아) 대상 avalglucosidase alfa가 1차·주요 2차 endpoint 모두 충족(52주 무인공호흡 생존 등). 7/8 ICNMD 학회 상세 발표, 하반기 미국 라벨확장 신청 예정."
    outcome_sources:
      - https://www.sanofi.com/en/media-room/press-releases/2026/2026-06-30-05-00-00-3319382
  - date: 2026-06-30
    ticker: COGT
    event: "Bezuclastinib 진행성 전신비만세포증(AdvSM) NDA 제출 완료 (APEX Ph2 ORR 65%·PPR 81%; PDUFA일 미정)"
    type: Regulatory
    company: Cogent Biosciences
    drug: Bezuclastinib
    indication: Advanced Systemic Mastocytosis (AdvSM)
    phase: NDA
    trialDesign: "Pivotal APEX Phase 2 — AdvSM, ORR 65%(mIWG)·PPR 81%. AdvSM/NonAdvSM/GIST 순차 심사 체제"
    targetDisease: "진행성 전신비만세포증(AdvSM) — KIT D816V 변이 비만세포 클론 증식"
    moa: "선택적 KIT D816V 억제제 — 변이 KIT 신호 차단으로 비만세포 부담 감소"
    sources:
      - https://www.globenewswire.com/news-release/2026/06/30/3319594/0/en/Cogent-Biosciences-Announces-Submission-of-New-Drug-Application-NDA-for-Bezuclastinib-in-Advanced-Systemic-Mastocytosis-AdvSM.html
  - date: 2026-07-01
    ticker: NBIX
    event: "Crinecerfont(CRENESSITY) 소아(3개월–4세 미만) classic CAH Phase 2 개시 (open-label, 20명, 24주; readout일 미공개)"
    type: Clinical Readout
    company: Neurocrine Biosciences
    drug: Crinecerfont (CRENESSITY)
    indication: Classic Congenital Adrenal Hyperplasia (pediatric <4y)
    phase: Phase 2
    trialDesign: "Open-label Phase 2 — 생후 3개월~4세 미만 classic CAH 20명, 24주. 미국 소아 적응증 확대 지원"
    targetDisease: "고전형 선천성 부신과형성(classic CAH) — 21-수산화효소 결핍으로 코르티솔 부족·안드로겐 과다"
    moa: "CRF1 수용체 길항제 — ACTH·부신 안드로겐 생성 억제"
    sources:
      - https://www.prnewswire.com/news-releases/neurocrine-biosciences-initiates-phase-2-study-of-crinecerfont-in-pediatric-patients-under-4-years-old-with-classic-congenital-adrenal-hyperplasia-302816226.html
  - date: 2026-07-13
    ticker: NAMS
    event: "Obicetrapib BROADWAY 알츠하이머 예방 바이오마커 분석 AAIC 2026 oral (P-tau217 예측인자·ApoE4 용량반응; 심혈관 환자 대상)"
    type: Conference
    conferenceId: aaic
    blogNote: "원래 콜레스테롤을 낮추는 먹는 약인데 이번엔 알츠하이머 예방 쪽 데이터를 학회에서 내놓음. 심혈관 환자 중에 본인도 모르게 알츠하이머 초기 병리를 가진 사람이 많다는 분석이고 ApoE4 유전자를 가진 사람에서 반응이 다르게 나온다는 내용임. 아직 예방 효과를 증명한 건 아니고 바이오마커 단계라 기대와 신중함이 같이 필요함."
    company: NewAmsterdam Pharma
    drug: Obicetrapib
    indication: Alzheimer's Prevention (cardiovascular patients)
    phase: Phase 3
    trialDesign: "BROADWAY Ph3 하위분석 — 심혈관 고위험 환자에서 경구 CETP 억제제 obicetrapib의 혈장 p-tau217 예측인자·ApoE4 의존 용량반응 분석. AAIC 2026 oral(7/13) + 포스터 3건(7/14-15)"
    targetDisease: "심혈관 환자의 미진단 알츠하이머 병리 — CETP 억제를 통한 조기 예방 가능성 탐색"
    moa: "경구 저용량 CETP 억제제 — ApoE 대사·지질 매개 병태생리 다경로 조절"
    sources:
      - https://www.globenewswire.com/news-release/2026/07/01/3320530/0/en/newamsterdam-pharma-announces-upcoming-presentations-at-the-alzheimer-s-association-international-conference-aaic-2026.html
    outcome: met
    outcome_date: 2026-07-13
    result: "AAIC 2026 oral 발표 완료. P-tau217 위약 대비 유의 감소(전체 p=0.025, ApoE4 보유자 p=0.022). ApoE4/E4 동형 접합자에서 -20.5% vs 위약 +7.9%(p=0.010, n=29). 복수 포스터(7/14-15) 추가 발표. CETP 억제를 통한 AD 바이오마커 개선 신호 재확인."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/07/01/3320530/0/en/newamsterdam-pharma-announces-upcoming-presentations-at-the-alzheimer-s-association-international-conference-aaic-2026.html
  - date: 2026-08-02
    ticker: REPL
    event: "RP1(vusolimogene oderparepvec) + nivolumab 항PD-1 불응성 진행성 흑색종 BLA 재제출 PDUFA (AdComm 7월말 예정; IGNYTE Ph2)"
    type: PDUFA
    company: Replimune Group
    drug: RP1 (vusolimogene oderparepvec) + nivolumab
    indication: Anti-PD-1 Failed Advanced Melanoma
    phase: BLA (가속승인 재제출)
    trialDesign: "IGNYTE Phase 2 단일군(n=140) — 항PD-1 불응 진행성 흑색종. AdComm 2026년 7월말 예정, PDUFA 8/2"
    targetDisease: "항PD-1 치료 실패 진행성 흑색종 — 후속 표준옵션 제한적"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT03767348
    moa: "종양용해 HSV-1 바이러스(RP1) 종양내 투여 + 항PD-1 병용 — 국소 종양미세환경 면역활성화"
    sources:
      - https://ir.replimune.com/news-releases/news-release-details/replimune-announces-fda-acceptance-rp1-biologics-license
  - date: 2026-08-05
    ticker: MRNA
    event: "mRNA-1010(mFLUSIVA) 계절 독감백신 PDUFA 결정 (50세+ 성인; VRBPAC 6/18 9-0 만장일치 후)"
    type: PDUFA
    company: Moderna
    drug: MFLUSIVA (mRNA-1010)
    indication: Seasonal Influenza Prevention (Adults ≥50)
    phase: BLA
    trialDesign: "Phase 3 P304 — mRNA-1010 vs 표준용량 IIV4, HAI seroresponse 4균주 비열등성 충족·65+ A균주 우월. VRBPAC 6/18 9-0 만장일치 찬성"
    moa: "LNP 캡슐화 mRNA 백신 — 4개 인플루엔자 균주 hemagglutinin 인코딩"
    sources:
      - https://www.biospace.com/press-releases/moderna-announces-fda-advisory-committee-votes-unanimously-in-favor-of-the-benefit-risk-profile-of-mrna-1010-an-investigational-seasonal-influenza-vaccine
      - https://www.fda.gov/advisory-committees/advisory-committee-calendar/vaccines-and-related-biological-products-advisory-committee-june-18-2026-meeting-announcement
  - date: 2026-09-30
    ticker: BMY
    event: "Camzyos(mavacamten) 청소년(12–17세) 폐쇄성 비대심근증(oHCM) 적응증 확대 sNDA PDUFA (우선심사, SCOUT-HCM Ph3)"
    type: PDUFA
    company: Bristol Myers Squibb
    drug: Camzyos (mavacamten)
    indication: Obstructive HCM (adolescents 12 to <18)
    phase: sNDA (Priority Review)
    trialDesign: "SCOUT-HCM Phase 3 무작위 이중맹검 위약대조 — 청소년 oHCM 44명, 28주 Valsalva LVOT gradient 1차 충족"
    targetDisease: "청소년 증상성 폐쇄성 비대심근증(oHCM) — 좌심실 유출로 폐쇄"
    priorTrialUrl: https://clinicaltrials.gov/study/NCT06253221
    moa: "심근 미오신 억제제 — 과도한 액틴-미오신 교차결합 감소로 좌심실 유출로 압력차 완화"
    sources:
      - https://news.bms.com/news/corporate-financial/2026/U-S--Food-and-Drug-Administration-Accepts-for-Priority-Review-Bristol-Myers-Squibbs-Supplemental-New-Drug-Application-for-Camzyos-mavacamten-to-Treat-Adolescents-with-Symptomatic-Obstructive-Hypertrophic-Cardiomyopathy-oHCM/default.aspx
  - date: 2027-02-28
    ticker: SRPT
    event: "AMONDYS 45(casimersen)·VYONDYS 53(golodirsen) 가속→정식승인 전환 sNDA PDUFA (DMD exon 45/53 skipping; ESSENCE 확인시험+RWE)"
    type: PDUFA
    company: Sarepta Therapeutics
    drug: AMONDYS 45 (casimersen) / VYONDYS 53 (golodirsen)
    indication: DMD (exon 45 / exon 53 skipping)
    phase: sNDA
    trialDesign: "Phase 3 ESSENCE 확인시험 — 1차 미달이나 96주 dystrophin 발현 증가·기능저하 완화 근거 + real-world evidence로 정식승인 전환 신청"
    targetDisease: "듀센 근이영양증(DMD) — exon 45/53 skipping 대상 유전자형"
    moa: "포스포로디아미데이트 모르폴리노 안티센스(PMO) — 표적 엑손 스키핑으로 기능성 dystrophin 생성"
    sources:
      - https://www.businesswire.com/news/home/20260630779541/en/Sarepta-Announces-FDA-Acceptance-of-sNDAs-for-AMONDYS-45-and-VYONDYS-53
  - date: 2026-06-24
    ticker: GILD
    event: "Trodelvy(sacituzumab govitecan) 1L 전이성 삼중음성유방암(mTNBC) FDA 승인 — 단독(PD-L1 비적격) + Keytruda 병용(PD-L1+); PD-L1 무관 1L mTNBC 유일 ADC"
    type: PDUFA
    company: Gilead Sciences
    drug: Trodelvy (sacituzumab govitecan-hziy)
    indication: 1L Metastatic Triple-Negative Breast Cancer
    phase: sBLA
    moa: "TROP2 표적 ADC — 종양세포 TROP2 결합 후 SN-38(토포이소머라제 I 억제제) 전달, bystander effect"
    sources:
      - https://www.gilead.com/news/news-details/2026/u-s--fda-approves-trodelvy-for-first-line-treatment-of-metastatic-triple-negative-breast-cancer
      - https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-sacituzumab-govitecan-hziy-monotherapy-and-combination-pembrolizumab-first-line
    outcome: approved
    outcome_date: 2026-06-24
    result: "FDA 승인 — Trodelvy 1L mTNBC 2개 적응증: PD-L1 비적격 단독(ASCENT-03) + PD-L1+ Keytruda/Keytruda Qlex 병용(ASCENT-04/KEYNOTE-D19). 병용은 pembro+chemo 대비 진행/사망 -35%, mPFS 11.2 vs 7.8개월. PD-L1 상태 무관 1L mTNBC 최초·유일 ADC 백본."
    outcome_sources:
      - https://www.gilead.com/news/news-details/2026/u-s--fda-approves-trodelvy-for-first-line-treatment-of-metastatic-triple-negative-breast-cancer
      - https://www.fda.gov/drugs/resources-information-approved-drugs/fda-approves-sacituzumab-govitecan-hziy-monotherapy-and-combination-pembrolizumab-first-line
  - date: 2026-06-30
    ticker: EXEL
    event: "Zanzalintinib STELLAR-303 대장암 NLM 하위군 최종 OS 미충족 (mixed — HR 0.83, p=0.1185; ITT OS는 2025 ESMO 충족)"
    type: Clinical Readout
    company: Exelixis
    drug: Zanzalintinib (+ atezolizumab)
    indication: Metastatic Colorectal Cancer (non-MSI-high, 2L+)
    phase: Phase 3
    priorTrialUrl: https://ir.exelixis.com/news-releases/news-release-details/exelixis-announces-detailed-results-phase-3-stellar-303-pivotal
    moa: "경구 다중표적 TKI — VEGFR·MET·TAM(TYRO3/AXL/MER) 억제, cabozantinib 대비 반감기 단축"
    sources:
      - https://ir.exelixis.com/news-releases/news-release-details/exelixis-provides-update-phase-3-stellar-303-trial-evaluating
      - https://www.biospace.com/press-releases/exelixis-announces-zanzalintinib-in-combination-with-an-immune-checkpoint-inhibitor-improved-overall-survival-in-stellar-303-phase-3-pivotal-trial-in-patients-with-metastatic-colorectal-cancer
    outcome: mixed
    outcome_date: 2026-06-30
    result: "STELLAR-303 3상 — 비간전이(NLM) 하위군 최종 OS는 통계적 유의성 미달(zanza+atezo vs regorafenib, HR 0.83, 95% CI 0.66-1.05, p=0.1185; mOS 15.9 vs 12.7개월, 개선 경향). 단 공동 1차 EP인 ITT OS는 2025 ESMO에서 이미 유의 충족·Lancet 게재."
    outcome_sources:
      - https://ir.exelixis.com/news-releases/news-release-details/exelixis-provides-update-phase-3-stellar-303-trial-evaluating
  - date: 2026-07-15
    ticker: MRK
    event: "LIPFENDRA (enlicitide decanoate) FDA 승인 — 세계 최초 1일 1회 경구 PCSK9 억제제 (고콜레스테롤혈증 LDL-C 감소)"
    type: Regulatory
    company: Merck
    drug: Enlicitide decanoate (LIPFENDRA)
    indication: 고콜레스테롤혈증 성인 LDL-C 감소
    phase: Approved
    moa: "마크로사이클릭 펩타이드 경구 PCSK9 억제제. LDL 수용체 분해 차단 → LDL-C 최대 56% 감소. 기존 주사 PCSK9i 대비 경구 투여 첫 FDA 승인."
    sources:
      - https://www.businesswire.com/news/home/20260715942620/en/Mercks-LIPFENDRA-enlicitide-is-the-First-and-Only-Once-Daily-Oral-PCSK9-Inhibitor-Approved-by-the-U-S.-FDA-to-Reduce-LDL-C-in-Adults-with-Hypercholesterolemia
    outcome: approved
    outcome_date: 2026-07-15
    result: "FDA 승인 — LIPFENDRA(enlicitide decanoate) 세계 최초 1일 1회 경구 PCSK9 억제제. 성인 고콜레스테롤혈증 LDL-C 감소 적응증. CORALreef Phase 3 프로그램 기반."
    outcome_sources:
      - https://www.businesswire.com/news/home/20260715942620/en/Mercks-LIPFENDRA-enlicitide-is-the-First-and-Only-Once-Daily-Oral-PCSK9-Inhibitor-Approved-by-the-U-S.-FDA-to-Reduce-LDL-C-in-Adults-with-Hypercholesterolemia
  - date: 2026-07-15
    ticker: NVO
    event: "Wegovy 경구정(oral semaglutide 25mg) EU 집행위원회 판매허가 — EU 최초 경구 GLP-1 비만 치료제"
    type: Regulatory
    company: Novo Nordisk
    drug: Oral semaglutide 25mg (Wegovy pill)
    indication: 비만·과체중 성인 체중 관리 (EU)
    phase: Approved (EU EC)
    moa: "경구 GLP-1 수용체 작용제(세마글루티드 25mg). SNAC 흡수 촉진제 기반 위 흡수. 기존 Wegovy 주사제와 동일 성분, 경구 투여 첫 EU 승인."
    sources:
      - https://www.globenewswire.com/news-release/2026/07/15/3327953/0/en/Novo-Nordisk-receives-European-Commission-approval-of-Wegovy-pill-as-first-oral-GLP-1-for-weight-management-in-the-EU-single-ready-to-use-pen-for-higher-dose-7-2-mg-also-approved.html
    outcome: approved
    outcome_date: 2026-07-15
    result: "EU EC 승인 — Wegovy 경구정(oral semaglutide 25mg) EU 최초 경구 GLP-1 비만 치료제. 체중 관련 동반질환 있는 비만·과체중 성인 대상."
    outcome_sources:
      - https://www.globenewswire.com/news-release/2026/07/15/3327953/0/en/Novo-Nordisk-receives-European-Commission-approval-of-Wegovy-pill-as-first-oral-GLP-1-for-weight-management-in-the-EU-single-ready-to-use-pen-for-higher-dose-7-2-mg-also-approved.html
  - date: 2026-07-16
    ticker: INSM
    event: "TPIP Phase 2b OLE 12개월 양성 데이터 + Phase 3 PALM-PAH 공식 개시 (PAH)"
    type: Clinical Readout
    company: Insmed
    drug: Treprostinil palmitil inhalation powder (TPIP)
    indication: Pulmonary Arterial Hypertension (PAH)
    phase: Phase 3 개시 (OLE 데이터)
    trialDesign: "Phase 2b OLE 12개월 데이터: PAH 환자 TPIP 흡입분말 추가 투여. 6MWD·NT-proBNP·WHO FC·혈역학 지속 개선. PALM-PAH Phase 3 공식 개시 발표."
    targetDisease: "폐동맥 고혈압(PAH) — 진행성 폐혈관 저항 증가로 우심실 부전. 기존 경구·흡입 프로스타사이클린 치료의 add-on 흡입 분말 제형."
    moa: "트레프로스티닐 프로드러그 흡입분말. 에스테라제 → 트레프로스티닐 전환 → IP 수용체 작용, 폐혈관 확장·항증식."
    sources:
      - https://www.prnewswire.com/news-releases/insmed-announces-positive-12-month-data-from-the-ongoing-open-label-extension-study-of-treprostinil-palmitil-inhalation-powder-tpip-in-patients-with-pulmonary-arterial-hypertension-302827019.html
      - https://investor.insmed.com/2026-07-16-Insmed-Announces-Positive-12-Month-Data-from-the-Ongoing-Open-Label-Extension-Study-of-Treprostinil-Palmitil-Inhalation-Powder-TPIP-in-Patients-with-Pulmonary-Arterial-Hypertension
    outcome: met
    outcome_date: 2026-07-16
    result: "OLE 12개월 양성 — 6MWD·NT-proBNP·WHO FC·혈역학 지표 지속 개선. Phase 3 PALM-PAH 공식 개시."
    outcome_sources:
      - https://www.prnewswire.com/news-releases/insmed-announces-positive-12-month-data-from-the-ongoing-open-label-extension-study-of-treprostinil-palmitil-inhalation-powder-tpip-in-patients-with-pulmonary-arterial-hypertension-302827019.html
  - date: 2026-08-28
    ticker: CYTK
    event: "Aficamten ACACIA-HCM Phase 3 비폐쇄성 HCM ESC 2026 Hot Line 완전 데이터 (nHCM 최초 임상 성공)"
    type: Conference
    company: Cytokinetics
    drug: Aficamten (MYQORZO)
    indication: Non-Obstructive Hypertrophic Cardiomyopathy (nHCM)
    phase: Phase 3
    conferenceId: esc
    trialDesign: "ACACIA-HCM: 무작위 이중맹검 위약대조 Phase 3. nHCM(LVOT gradient <30mmHg), aficamten vs 위약 36주. 이중 1차 지표 KCCQ-CSS·pVO2. 2026-05-05 topline 양성 발표 → ESC 2026 Hot Line 완전 데이터 공개."
    targetDisease: "비폐쇄성 비대심근병증(nHCM) — HCM 전체 ~40%, LVOT 협착 없으나 심근 과수축으로 운동 불내성·증상 지속. FDA 승인 치료제 없음, nHCM Phase 3 최초 성공."
    moa: "심장 미오신 억제제(β-MHC ATP 결합부위 경쟁 억제) — 과도한 심근 수축력 하향 조절."
    sources:
      - https://ir.cytokinetics.com/press-releases/press-release-details/2026/Cytokinetics-Announces-Three-Late-Breaking-Science-Abstracts-at-the-European-Society-of-Cardiology-ESC-Congress-2026/default.aspx
      - https://www.globenewswire.com/news-release/2026/07/07/3323061/35409/en/cytokinetics-announces-three-late-breaking-science-abstracts-at-the-european-society-of-cardiology-esc-congress-2026.html
  - date: 2026-09-03
    ticker: ROIV
    event: "Brepocitinib NDA PDUFA — 피부근염(DM) 최초 표적치료제 승인 여부 (우선심사)"
    type: PDUFA
    company: Roivant Sciences
    drug: Brepocitinib
    indication: Dermatomyositis (DM)
    phase: NDA (Priority Review)
    trialDesign: "VALOR Phase 3(N=241, 52주, 위약대조 이중맹검). 1차 CDASI-A(피부 점수) 충족. DM 대상 최초 양성 Phase 3. NDA 수리·우선심사 2026-03-03 → PDUFA 2026-09-03(6개월 우선심사 산출)."
    targetDisease: "피부근염(Dermatomyositis) — 피부·근육 자가면역 염증질환, 미국 ~30,000명. 스테로이드·면역억제제 외 FDA 승인 표적치료제 전무."
    moa: "이중 선택적 TYK2/JAK1 억제제 — IFN-I 신호 + IL-6/IL-13 JAK1 경로 동시 차단. 피부근염 핵심 병리기전 IFN signature 표적."
    sources:
      - https://www.globenewswire.com/news-release/2026/03/03/3248199/34323/en/Priovant-Announces-FDA-Acceptance-and-Priority-Review-of-New-Drug-Application-for-Brepocitinib-in-Dermatomyositis.html
      - https://www.sec.gov/Archives/edgar/data/1635088/000114036126007447/ef20066998_ex99-1.htm
  - date: 2027-02-28
    ticker: BMRN
    event: "VOXZOGO (vosoritide) sNDA 완전 승인 PDUFA — 연골무형성증 소아 가속→완전 승인 전환"
    type: PDUFA
    company: BioMarin Pharmaceutical
    drug: Vosoritide (VOXZOGO)
    indication: Achondroplasia (children) — accelerated to full approval
    phase: sNDA
    trialDesign: "기존 VOXZOGO 가속승인(소아 연골무형성증) 근거에 확인적 데이터 추가. FDA sNDA 수리 완료 → PDUFA 2027-02-28. (hypochondroplasia 별도 sNDA와 구별)"
    targetDisease: "연골무형성증(Achondroplasia) — FGFR3 변이로 인한 가장 흔한 단신 유전질환. VOXZOGO 가속승인 → 완전 승인 전환 신청."
    moa: "CNP 유사체 — FGFR3 과활성화 억제 → 연골 분화·뼈 성장 촉진. 1일 1회 SC."
    sources:
      - https://www.prnewswire.com/news-releases/us-food-and-drug-administration-accepts-biomarins-supplemental-new-drug-application-for-full-approval-of-voxzogo-vosoritide-for-children-with-achondroplasia-302823072.html
      - https://investors.biomarin.com/news/news-details/2026/U-S--Food-and-Drug-Administration-Accepts-BioMarins-Supplemental-New-Drug-Application-for-Full-Approval-of-VOXZOGO-vosoritide-for-Children-With-Achondroplasia/default.aspx
  - date: 2027-05-01
    ticker: AXSM
    event: "AXS-12 (reboxetine) NDA PDUFA — 기면증 카탈렉시 경구 NRI"
    type: PDUFA
    company: Axsome Therapeutics
    drug: Reboxetine (AXS-12)
    indication: Cataplexy in Narcolepsy
    phase: NDA
    trialDesign: "NDA 접수 완료(2026-07-15 FDA 수리 발표). 카탈렉시 대상 표준심사. PDUFA 2027-05-01."
    targetDisease: "기면증 카탈렉시(Narcolepsy Cataplexy) — 감정 유발 갑작스러운 근긴장 소실. 미국 ~166,000명. 기존 소듐 옥시베이트·벤라팍신 외 NRI 경구 제형 부재."
    moa: "선택적 노르에피네프린 재흡수 억제(NRI) — REM 침입·카탈렉시 병리기전 억제."
    sources:
      - https://www.globenewswire.com/news-release/2026/07/15/3327580/0/en/axsome-therapeutics-announces-fda-acceptance-of-new-drug-application-for-axs-12-for-the-treatment-of-cataplexy-in-narcolepsy.html
```
