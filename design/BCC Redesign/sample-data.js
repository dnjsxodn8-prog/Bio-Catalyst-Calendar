// Embedded sample — subset of real data, enough to exercise every screen.
window.BCC_DATA = {
  generated: '2026-04-28T17:28:38.369Z',
  thisWeek: '2026-04-27 ~ 2026-05-03',
  companies: [
    { ticker: 'LLY', company: 'Eli Lilly', mcap: 800000, modality: 'Small Molecule', areas: ['Obesity/Metabolic','Oncology'], recommendation: 'Core Holding', drug: 'Orforglipron', indication: 'Type 2 Diabetes', phase: 'Phase 3', mechanism: 'Oral GLP-1R agonist', summary: 'Oral GLP-1 게임체인저. ACHIEVE-1 HbA1c -1.6%, 체중 -7.9%.' },
    { ticker: 'JNJ', company: 'Johnson & Johnson', mcap: 575000, modality: 'Antibody', areas: ['Oncology','Immunology'], recommendation: 'Worth Monitoring', drug: 'Talquetamab', indication: 'Multiple Myeloma (RRMM)', phase: 'Phase 1/2', mechanism: 'GPRC5D × CD3 BiTE', summary: 'BCMA 내성 RRMM 신규 옵션. ORR 73%.' },
    { ticker: 'NVO', company: 'Novo Nordisk', mcap: 300000, modality: 'Peptide', areas: ['Obesity/Metabolic'], recommendation: 'Core Holding', drug: 'CagriSema', indication: 'Obesity', phase: 'Phase 3', mechanism: 'GLP-1 + Amylin dual agonist', summary: 'REDEFINE-1 체중 -22.7%. Zepbound 대비 우월성 미증명.' },
    { ticker: 'MRK', company: 'Merck', mcap: 280000, modality: 'mRNA', areas: ['Oncology'], recommendation: 'Core Holding', drug: 'mRNA-4157/V940', indication: 'Melanoma · NSCLC', phase: 'Phase 3', mechanism: 'Personalized neoantigen vaccine', summary: 'Moderna 협업. KEYNOTE-942 RFS HR 0.561.' },
    { ticker: 'VRTX', company: 'Vertex Pharmaceuticals', mcap: 110000, modality: 'Small Molecule', areas: ['Pain','Rare Disease'], recommendation: 'Core Holding', drug: 'Suzetrigine', indication: 'Acute Pain', phase: 'Phase 3', mechanism: 'Selective NaV1.8 inhibitor', summary: 'Non-opioid 진통제. 2026 추가 적응증 데이터.' },
    { ticker: 'REGN', company: 'Regeneron', mcap: 90000, modality: 'Antibody', areas: ['Oncology','Immunology'], recommendation: 'Worth Monitoring', drug: 'Linvoseltamab', indication: 'Multiple Myeloma', phase: 'Phase 3', mechanism: 'BCMA × CD3 BiTE', summary: 'BCMA BiTE 시장 진입.' },
    { ticker: 'BMRN', company: 'BioMarin', mcap: 12000, modality: 'Gene Therapy', areas: ['Rare Disease'], recommendation: 'Worth Monitoring', drug: 'Roctavian', indication: 'Hemophilia A', phase: 'Approved', mechanism: 'AAV5-hFVIII gene therapy', summary: '실제 시장 침투 모니터링.' },
    { ticker: 'CRSP', company: 'CRISPR Therapeutics', mcap: 4500, modality: 'Gene Editing', areas: ['Rare Disease','Oncology'], recommendation: 'Speculative', drug: 'CTX112', indication: 'B-cell malignancies', phase: 'Phase 1', mechanism: 'Allogeneic CD19 CAR-T', summary: 'Casgevy 후속. 차세대 동종 CAR-T.' },
    { ticker: 'BEAM', company: 'Beam Therapeutics', mcap: 2800, modality: 'Gene Editing', areas: ['Rare Disease'], recommendation: 'Speculative', drug: 'BEAM-302', indication: 'AATD', phase: 'Phase 1/2', mechanism: 'In vivo base editing', summary: 'AATD 첫 인비보 베이스 에디팅 readout.' },
    { ticker: 'IONS', company: 'Ionis Pharmaceuticals', mcap: 6000, modality: 'ASO', areas: ['Cardiovascular','Neurology'], recommendation: 'Worth Monitoring', drug: 'Olezarsen', indication: 'FCS · sHTG', phase: 'Phase 3', mechanism: 'APOC3 ASO', summary: '심혈관 ASO 두 번째 카탈리스트.' },
    { ticker: 'SRPT', company: 'Sarepta Therapeutics', mcap: 8500, modality: 'Gene Therapy', areas: ['Rare Disease'], recommendation: 'Worth Monitoring', drug: 'Elevidys', indication: 'DMD', phase: 'Approved', mechanism: 'AAVrh74-microdystrophin', summary: 'Elevidys 라벨 확장 후 시장 데이터.' },
    { ticker: 'ALNY', company: 'Alnylam Pharmaceuticals', mcap: 38000, modality: 'siRNA', areas: ['Cardiovascular','Rare Disease'], recommendation: 'Core Holding', drug: 'Vutrisiran', indication: 'ATTR-CM', phase: 'Phase 3', mechanism: 'TTR-targeting siRNA', summary: 'HELIOS-B 결과 기반 라벨 확장.' },
  ],
  catalysts: [
    // This week (D-0 ~ D-6)
    { ticker: 'LLY', date: '2026-04-29', event: 'Orforglipron PDUFA decision (T2D)', type: 'PDUFA', drug: 'Orforglipron', indication: 'T2D', phase: 'Phase 3' },
    { ticker: 'BEAM', date: '2026-04-30', event: 'BEAM-302 Phase 1/2 interim readout (AATD)', type: 'Clinical Readout', drug: 'BEAM-302', indication: 'AATD', phase: 'Phase 1/2' },
    { ticker: 'NVO', date: '2026-05-01', event: 'CagriSema REDEFINE-2 topline (Obesity + T2D)', type: 'Clinical Readout', drug: 'CagriSema', indication: 'Obesity + T2D', phase: 'Phase 3' },
    { ticker: 'IONS', date: '2026-05-02', event: 'Olezarsen sHTG CORE Phase 3 readout', type: 'Clinical Readout', drug: 'Olezarsen', indication: 'sHTG', phase: 'Phase 3' },
    { ticker: 'JNJ', date: '2026-05-03', event: 'Carvykti label expansion AdCom', type: 'Regulatory', drug: 'Carvykti', indication: 'RRMM 2L+', phase: 'Approved' },
    // Next 60 days
    { ticker: 'VRTX', date: '2026-05-12', event: 'Suzetrigine DPN Phase 3 topline', type: 'Clinical Readout', drug: 'Suzetrigine', indication: 'DPN', phase: 'Phase 3' },
    { ticker: 'CRSP', date: '2026-05-18', event: 'CTX112 Phase 1 dose escalation update', type: 'Clinical Readout', drug: 'CTX112', indication: 'B-NHL', phase: 'Phase 1' },
    { ticker: 'MRK', date: '2026-05-22', event: 'Keytruda SC FDA approval', type: 'PDUFA', drug: 'Keytruda SC', indication: 'Multi', phase: 'Approved' },
    { ticker: 'REGN', date: '2026-05-30', event: 'Linvoseltamab Phase 3 LINKER-MM3 readout', type: 'Clinical Readout', drug: 'Linvoseltamab', indication: 'RRMM', phase: 'Phase 3' },
    { ticker: 'ALNY', date: '2026-06-05', event: 'ASCO 2026 Vutrisiran HELIOS-B subgroup', type: 'Conference', drug: 'Vutrisiran', indication: 'ATTR-CM', phase: 'Phase 3' },
    { ticker: 'JNJ', date: '2026-06-15', event: 'ASCO 2026 Talquetamab combo data', type: 'Conference', drug: 'Talquetamab', indication: 'RRMM', phase: 'Phase 1/2' },
    { ticker: 'BMRN', date: '2026-06-25', event: 'Roctavian Q2 commercial update', type: 'Regulatory', drug: 'Roctavian', indication: 'Hemophilia A', phase: 'Approved' },
  ],
  conferences: [
    { id: 'ASCO', name: 'ASCO Annual Meeting 2026', dates: '2026-06-05 to 2026-06-09', location: 'Chicago, IL', tier: 'Tier 1', areas: ['Oncology'], notes: '종양학 최대 학회. JNJ Talquetamab, MRK mRNA-4157, REGN Linvoseltamab 발표 예정.' },
    { id: 'EHA', name: 'EHA 2026 Congress', dates: '2026-06-11 to 2026-06-14', location: 'Madrid, Spain', tier: 'Tier 1', areas: ['Hematology'], notes: '혈액종양 핵심 학회. BCMA·GPRC5D BiTE 비교 데이터.' },
    { id: 'ADA', name: 'ADA Scientific Sessions 2026', dates: '2026-06-19 to 2026-06-22', location: 'Orlando, FL', tier: 'Tier 1', areas: ['Obesity/Metabolic'], notes: 'GLP-1 / 비만 학회. Orforglipron, CagriSema 등 비만 전쟁의 중심.' },
    { id: 'AACR', name: 'AACR Annual Meeting 2026', dates: '2026-04-25 to 2026-04-30', location: 'San Diego, CA', tier: 'Tier 1', areas: ['Oncology'], notes: '진행중 — 종양 기초·중개 연구.' },
    { id: 'ASGCT', name: 'ASGCT 2026', dates: '2026-05-12 to 2026-05-16', location: 'New Orleans, LA', tier: 'Tier 2', areas: ['Gene Therapy'], notes: '유전자치료 학회. BMRN, SRPT, BEAM, CRSP 발표 다수.' },
  ],
};
