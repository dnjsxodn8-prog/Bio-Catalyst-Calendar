// scripts/apply-changes.mjs
// 1회용 스크립트.
// - Step 1: ticker 변경 4건 (DIS→IRON, ARS→SPRY, EVMT→EVMN, AVDX→RNAM)
// - Step 1: 삭제 2건 (ORCA = 비상장 Orca Bio, AVDL = M&A 가능)
// - Step 2~4: 리포트의 330개 빈 깡통 생성 (modality=Other, sources=[], 본문은 정보 미입력)
//
// 빈 깡통은 modality/areas 정확한 정보 없이 시작. 사용자가 점진 채워나가야 함.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPANIES_DIR = path.join(ROOT, 'data/companies');
const TODAY = new Date().toISOString().slice(0, 10);

const TICKER_RENAMES = [
  { old: 'DIS', new: 'IRON' },
  { old: 'ARS', new: 'SPRY' },
  { old: 'EVMT', new: 'EVMN' },
  { old: 'AVDX', new: 'RNAM' },
];

const TICKER_DELETIONS = ['ORCA', 'AVDL'];

const STUBS = [
  // ── Mega/Large Cap ($10B+) — 25 ──
  { ticker: 'JNJ', company: 'Johnson & Johnson', mcap: 575000 },
  { ticker: 'ABBV', company: 'AbbVie', mcap: 409000 },
  { ticker: 'TMO', company: 'Thermo Fisher Scientific', mcap: 194000 },
  { ticker: 'PFE', company: 'Pfizer', mcap: 151000 },
  { ticker: 'ZTS', company: 'Zoetis', mcap: 54000 },
  { ticker: 'ARGX', company: 'argenx SE', mcap: 44000 },
  { ticker: 'TEVA', company: 'Teva Pharmaceutical', mcap: 37000 },
  { ticker: 'A', company: 'Agilent Technologies', mcap: 33000 },
  { ticker: 'ONC', company: 'BeOne Medicines (BeiGene)', mcap: 32000 },
  { ticker: 'DXCM', company: 'DexCom', mcap: 28000 },
  { ticker: 'RPRX', company: 'Royalty Pharma', mcap: 26000 },
  { ticker: 'LH', company: 'LabCorp', mcap: 23000 },
  { ticker: 'ROIV', company: 'Roivant Sciences', mcap: 21000 },
  { ticker: 'EXAS', company: 'Exact Sciences', mcap: 20000 },
  { ticker: 'ILMN', company: 'Illumina', mcap: 20000 },
  { ticker: 'GMAB', company: 'Genmab', mcap: 17000 },
  { ticker: 'VTRS', company: 'Viatris', mcap: 17000 },
  { ticker: 'ASND', company: 'Ascendis Pharma', mcap: 15000 },
  { ticker: 'MEDP', company: 'Medpace', mcap: 13000 },
  { ticker: 'NBIX', company: 'Neurocrine Biosciences', mcap: 13000 },
  { ticker: 'BBIO', company: 'BridgeBio Pharma', mcap: 13000 },
  { ticker: 'ELAN', company: 'Elanco', mcap: 12000 },
  { ticker: 'JAZZ', company: 'Jazz Pharmaceuticals', mcap: 11000 },
  { ticker: 'RVTY', company: 'Revvity', mcap: 11000 },
  { ticker: 'QGEN', company: 'Qiagen', mcap: 10000 },

  // ── Large/Mid Cap ($2B–$10B) — 81 ──
  { ticker: 'TEM', company: 'Tempus AI', mcap: 9000 },
  { ticker: 'IBRX', company: 'ImmunityBio', mcap: 9000 },
  { ticker: 'ABVX', company: 'Abivax', mcap: 9000 },
  { ticker: 'CRL', company: 'Charles River Labs', mcap: 9000 },
  { ticker: 'TECH', company: 'Bio-Techne', mcap: 9000 },
  { ticker: 'PRAX', company: 'Praxis Precision Medicines', mcap: 9000 },
  { ticker: 'PCVX', company: 'Vaxcyte', mcap: 9000 },
  { ticker: 'CYTK', company: 'Cytokinetics', mcap: 7000 },
  { ticker: 'BLTE', company: 'Belite Bio', mcap: 7000 },
  { ticker: 'ACLX', company: 'Arcellx', mcap: 7000 },
  { ticker: 'PTGX', company: 'Protagonist Therapeutics', mcap: 6000 },
  { ticker: 'IMVT', company: 'Immunovant', mcap: 5000 },
  { ticker: 'CAI', company: 'Caris Life Sciences', mcap: 5000 },
  { ticker: 'CGON', company: 'CG Oncology', mcap: 5000 },
  { ticker: 'MIRM', company: 'Mirum Pharmaceuticals', mcap: 5000 },
  { ticker: 'SRRK', company: 'Scholar Rock Holding', mcap: 5000 },
  { ticker: 'PTCT', company: 'PTC Therapeutics', mcap: 5000 },
  { ticker: 'APGE', company: 'Apogee Therapeutics', mcap: 5000 },
  { ticker: 'ERAS', company: 'Erasca', mcap: 5000 },
  { ticker: 'FOLD', company: 'Amicus Therapeutics', mcap: 5000 },
  { ticker: 'TGTX', company: 'TG Therapeutics', mcap: 4000 },
  { ticker: 'GPCR', company: 'Structure Therapeutics', mcap: 4000 },
  { ticker: 'LGND', company: 'Ligand Pharmaceuticals', mcap: 4000 },
  { ticker: 'CNTA', company: 'Centessa Pharmaceuticals', mcap: 4000 },
  { ticker: 'ACAD', company: 'ACADIA Pharmaceuticals', mcap: 4000 },
  { ticker: 'ADMA', company: 'ADMA Biologics', mcap: 4000 },
  { ticker: 'CORT', company: 'Corcept Therapeutics', mcap: 4000 },
  { ticker: 'LEGN', company: 'Legend Biotech', mcap: 4000 },
  { ticker: 'NAMS', company: 'NewAmsterdam Pharma', mcap: 3000 },
  { ticker: 'EWTX', company: 'Edgewise Therapeutics', mcap: 3000 },
  { ticker: 'ARQT', company: 'Arcutis Biotherapeutics', mcap: 3000 },
  { ticker: 'CPRX', company: 'Catalyst Pharmaceuticals', mcap: 3000 },
  { ticker: 'DNTH', company: 'Dianthus Therapeutics', mcap: 3000 },
  { ticker: 'VERA', company: 'Vera Therapeutics', mcap: 3000 },
  { ticker: 'RCUS', company: 'Arcus Biosciences', mcap: 3000 },
  { ticker: 'APLS', company: 'Apellis Pharmaceuticals', mcap: 3000 },
  { ticker: 'TLX', company: 'Telix Pharmaceuticals', mcap: 3000 },
  { ticker: 'TVTX', company: 'Travere Therapeutics', mcap: 3000 },
  { ticker: 'DYN', company: 'Dyne Therapeutics', mcap: 2000 },
  { ticker: 'TNGX', company: 'Tango Therapeutics', mcap: 2000 },
  { ticker: 'IMNM', company: 'Immunome', mcap: 2000 },
  { ticker: 'ADPT', company: 'Adaptive Biotechnologies', mcap: 2000 },
  { ticker: 'OCUL', company: 'Ocular Therapeutix', mcap: 2000 },
  { ticker: 'DAWN', company: 'Day One Biopharmaceuticals', mcap: 2000 },
  { ticker: 'ZLAB', company: 'Zai Lab', mcap: 2000 },
  { ticker: 'MAZE', company: 'Maze Therapeutics', mcap: 2000 },
  { ticker: 'GLPG', company: 'Galapagos NV', mcap: 2000 },
  { ticker: 'AAPG', company: 'Ascentage Pharma', mcap: 2000 },
  { ticker: 'MLYS', company: 'Mineralys Therapeutics', mcap: 2000 },
  { ticker: 'MESO', company: 'Mesoblast', mcap: 2000 },
  { ticker: 'RARE', company: 'Ultragenyx Pharmaceutical', mcap: 2000 },
  { ticker: 'SLNO', company: 'Soleno Therapeutics', mcap: 2000 },
  { ticker: 'NKTR', company: 'Nektar Therapeutics', mcap: 2000 },
  { ticker: 'CLDX', company: 'Celldex Therapeutics', mcap: 2000 },
  { ticker: 'SNDX', company: 'Syndax Pharmaceuticals', mcap: 2000 },
  { ticker: 'AUPH', company: 'Aurinia Pharmaceuticals', mcap: 2000 },
  { ticker: 'TYRA', company: 'Tyra Biosciences', mcap: 2000 },
  { ticker: 'RXRX', company: 'Recursion Pharmaceuticals', mcap: 2000 },
  { ticker: 'MANE', company: 'Veradermics', mcap: 2000 },
  { ticker: 'PVLA', company: 'Palvella Therapeutics', mcap: 2000 },
  { ticker: 'ZYME', company: 'Zymeworks', mcap: 2000 },
  { ticker: 'RLAY', company: 'Relay Therapeutics', mcap: 2000 },
  { ticker: 'DFTX', company: 'Definium Therapeutics', mcap: 2000 },
  { ticker: 'ELVN', company: 'Enliven Therapeutics', mcap: 2000 },
  { ticker: 'GLTO', company: 'Galecto', mcap: 2000 },
  { ticker: 'VCEL', company: 'Vericel', mcap: 2000 },
  { ticker: 'TRVI', company: 'Trevi Therapeutics', mcap: 2000 },
  { ticker: 'OLMA', company: 'Olema Pharmaceuticals', mcap: 2000 },
  { ticker: 'PHVS', company: 'Pharvaris', mcap: 2000 },
  { ticker: 'IMCR', company: 'Immunocore Holdings', mcap: 2000 },
  { ticker: 'HRMY', company: 'Harmony Biosciences', mcap: 2000 },
  { ticker: 'INVA', company: 'Innoviva', mcap: 2000 },
  { ticker: 'NVAX', company: 'Novavax', mcap: 2000 },
  { ticker: 'AGIO', company: 'Agios Pharmaceuticals', mcap: 2000 },
  { ticker: 'NBTX', company: 'Nanobiotix', mcap: 2000 },
  { ticker: 'ORKA', company: 'Oruka Therapeutics', mcap: 2000 },
  { ticker: 'OCS', company: 'Oculis Holding', mcap: 2000 },
  { ticker: 'NRIX', company: 'Nurix Therapeutics', mcap: 2000 },
  { ticker: 'KOD', company: 'Kodiak Sciences', mcap: 2000 },
  { ticker: 'VIR', company: 'Vir Biotechnology', mcap: 2000 },
  { ticker: 'ARDX', company: 'Ardelyx', mcap: 2000 },

  // ── Mid Cap ($1B–$2B) — 22 ──
  { ticker: 'BHVN', company: 'Biohaven', mcap: 1500 },
  { ticker: 'GENB', company: 'Generate Biomedicines', mcap: 1400 },
  { ticker: 'GLUE', company: 'Monte Rosa Therapeutics', mcap: 1400 },
  { ticker: 'ORIC', company: 'ORIC Pharmaceuticals', mcap: 1400 },
  { ticker: 'ZBIO', company: 'Zenas BioPharma', mcap: 1400 },
  { ticker: 'CRVS', company: 'Corvus Pharmaceuticals', mcap: 1300 },
  { ticker: 'IMTX', company: 'Immatics', mcap: 1300 },
  { ticker: 'EYPT', company: 'EyePoint', mcap: 1300 },
  { ticker: 'SVRA', company: 'Savara', mcap: 1300 },
  { ticker: 'MLTX', company: 'MoonLake Immunotherapeutics', mcap: 1300 },
  { ticker: 'SEPN', company: 'Septerna', mcap: 1300 },
  { ticker: 'TSHA', company: 'Taysha Gene Therapies', mcap: 1250 },
  { ticker: 'ATAI', company: 'AtaiBeckley', mcap: 1200 },
  { ticker: 'DBVT', company: 'DBV Technologies', mcap: 1200 },
  { ticker: 'BCAX', company: 'Bicara Therapeutics', mcap: 1200 },
  { ticker: 'PGEN', company: 'Precigen', mcap: 1200 },
  { ticker: 'IVA', company: 'Inventiva', mcap: 1150 },
  { ticker: 'PHAR', company: 'Pharming Group', mcap: 1060 },
  { ticker: 'ABCL', company: 'AbCellera Biologics', mcap: 1050 },
  { ticker: 'AVBP', company: 'ArriVent BioPharma', mcap: 1040 },
  { ticker: 'INBX', company: 'Inhibrx Biosciences', mcap: 1000 },
  { ticker: 'XERS', company: 'Xeris Biopharma', mcap: 1000 },

  // ── Small Cap ($500M–$1B) — 60 ──
  { ticker: 'URGN', company: 'UroGen Pharma', mcap: 996 },
  { ticker: 'CMPX', company: 'Compass Therapeutics', mcap: 992 },
  { ticker: 'GHRS', company: 'GH Research', mcap: 988 },
  { ticker: 'AKTS', company: 'Aktis Oncology', mcap: 988 },
  { ticker: 'GERN', company: 'Geron', mcap: 980 },
  { ticker: 'SLS', company: 'SELLAS Life Sciences', mcap: 942 },
  { ticker: 'CGEM', company: 'Cullinan Therapeutics', mcap: 930 },
  { ticker: 'VALN', company: 'Valneva', mcap: 920 },
  { ticker: 'MRVI', company: 'Maravai LifeSciences', mcap: 913 },
  { ticker: 'FTRE', company: 'Fortrea Holdings', mcap: 899 },
  { ticker: 'SGP', company: 'SpyGlass Pharma', mcap: 889 },
  { ticker: 'QURE', company: 'uniQure', mcap: 889 },
  { ticker: 'ABUS', company: 'Arbutus Biopharma', mcap: 871 },
  { ticker: 'ARVN', company: 'Arvinas', mcap: 870 },
  { ticker: 'PHAT', company: 'Phathom Pharmaceuticals', mcap: 841 },
  { ticker: 'SANA', company: 'Sana Biotechnology', mcap: 841 },
  { ticker: 'BBOT', company: 'BridgeBio Oncology Therapeutics', mcap: 834 },
  { ticker: 'XNCR', company: 'Xencor', mcap: 830 },
  { ticker: 'KALV', company: 'KalVista Pharmaceuticals', mcap: 820 },
  { ticker: 'OMER', company: 'Omeros', mcap: 818 },
  { ticker: 'MPLT', company: 'MapLight Therapeutics', mcap: 808 },
  { ticker: 'MNKD', company: 'MannKind', mcap: 804 },
  { ticker: 'CTMX', company: 'CytomX Therapeutics', mcap: 793 },
  { ticker: 'EIKN', company: 'Eikon Therapeutics', mcap: 776 },
  { ticker: 'ANNX', company: 'Annexon', mcap: 769 },
  { ticker: 'DRUG', company: 'Bright Minds Biosciences', mcap: 738 },
  { ticker: 'LXRX', company: 'Lexicon Pharmaceuticals', mcap: 730 },
  { ticker: 'GYRE', company: 'Gyre Therapeutics', mcap: 701 },
  { ticker: 'PROK', company: 'ProKidney', mcap: 692 },
  { ticker: 'TBPH', company: 'Theravance Biopharma', mcap: 688 },
  { ticker: 'TECX', company: 'Tectonic Therapeutic', mcap: 674 },
  { ticker: 'MDXG', company: 'MiMedx Group', mcap: 669 },
  { ticker: 'REPL', company: 'Replimune Group', mcap: 666 },
  { ticker: 'AGMB', company: 'AgomAb Therapeutics', mcap: 664 },
  { ticker: 'ZURA', company: 'Zura Bio', mcap: 661 },
  { ticker: 'JBIO', company: 'Jade Biosciences', mcap: 646 },
  { ticker: 'ANRO', company: 'Alto Neuroscience', mcap: 645 },
  { ticker: 'VOR', company: 'Vor Biopharma', mcap: 628 },
  { ticker: 'LBRX', company: 'LB Pharmaceuticals', mcap: 602 },
  { ticker: 'ENGN', company: 'enGene Holdings', mcap: 581 },
  { ticker: 'YDES', company: 'YD Bio', mcap: 573 },
  { ticker: 'DSGN', company: 'Design Therapeutics', mcap: 572 },
  { ticker: 'LRMR', company: 'Larimar Therapeutics', mcap: 567 },
  { ticker: 'MGTX', company: 'MeiraGTx Holdings', mcap: 563 },
  { ticker: 'VSTM', company: 'Verastem', mcap: 560 },
  { ticker: 'DRTS', company: 'Alpha Tau Medical', mcap: 547 },
  { ticker: 'FULC', company: 'Fulcrum Therapeutics', mcap: 544 },
  { ticker: 'RIGL', company: 'Rigel Pharmaceuticals', mcap: 533 },
  { ticker: 'OCGN', company: 'Ocugen', mcap: 528 },
  { ticker: 'SLDB', company: 'Solid Biosciences', mcap: 526 },
  { ticker: 'ALLO', company: 'Allogene Therapeutics', mcap: 517 },
  { ticker: 'PRTA', company: 'Prothena', mcap: 516 },
  { ticker: 'NMRA', company: 'Neumora Therapeutics', mcap: 513 },
  { ticker: 'FBRX', company: 'Forte Biosciences', mcap: 513 },
  { ticker: 'CRMD', company: 'CorMedix', mcap: 511 },
  { ticker: 'ADCT', company: 'ADC Therapeutics', mcap: 509 },
  { ticker: 'IVVD', company: 'Invivyd', mcap: 508 },
  { ticker: 'CTNM', company: 'Contineum Therapeutics', mcap: 507 },
  { ticker: 'ZVRA', company: 'Zevra Therapeutics', mcap: 506 },
  { ticker: 'LXEO', company: 'Lexeo Therapeutics', mcap: 500 },

  // ── Small/Micro Cap ($100M–$500M) — 142 ──
  { ticker: 'IMMX', company: 'Immix Biopharma', mcap: 490 },
  { ticker: 'EPRX', company: 'Eupraxia Pharmaceuticals', mcap: 482 },
  { ticker: 'LYEL', company: 'Lyell Immunopharma', mcap: 477 },
  { ticker: 'AVIR', company: 'Atea Pharmaceuticals', mcap: 469 },
  { ticker: 'VNDA', company: 'Vanda Pharmaceuticals', mcap: 466 },
  { ticker: 'ALT', company: 'Altimmune', mcap: 460 },
  { ticker: 'IPSC', company: 'Century Therapeutics', mcap: 460 },
  { ticker: 'TRDA', company: 'Entrada Therapeutics', mcap: 453 },
  { ticker: 'LCTX', company: 'Lineage Cell Therapeutics', mcap: 448 },
  { ticker: 'ASMB', company: 'Assembly Biosciences', mcap: 447 },
  { ticker: 'RGNX', company: 'REGENXBIO', mcap: 446 },
  { ticker: 'VTVT', company: 'vTv Therapeutics', mcap: 439 },
  { ticker: 'TENX', company: 'Tenax Therapeutics', mcap: 434 },
  { ticker: 'FDMT', company: '4D Molecular Therapeutics', mcap: 433 },
  { ticker: 'AVXL', company: 'Anavex Life Sciences', mcap: 431 },
  { ticker: 'STRO', company: 'Sutro Biopharma', mcap: 414 },
  { ticker: 'UPB', company: 'Upstream Bio', mcap: 414 },
  { ticker: 'DMAC', company: 'DiaMedica Therapeutics', mcap: 413 },
  { ticker: 'IMMP', company: 'Immutep', mcap: 408 },
  { ticker: 'NAGE', company: 'Niagen Bioscience', mcap: 406 },
  { ticker: 'NBP', company: 'NovaBridge Biosciences', mcap: 404 },
  { ticker: 'AUTL', company: 'Autolus Therapeutics', mcap: 402 },
  { ticker: 'CBIO', company: 'Crescent Biopharma', mcap: 401 },
  { ticker: 'PRTC', company: 'PureTech Health', mcap: 400 },
  { ticker: 'ENTA', company: 'Enanta Pharmaceuticals', mcap: 393 },
  { ticker: 'PEPG', company: 'PepGen', mcap: 391 },
  { ticker: 'BNTC', company: 'Benitec Biopharma', mcap: 388 },
  { ticker: 'ARMP', company: 'Armata Pharmaceuticals', mcap: 386 },
  { ticker: 'MNPR', company: 'Monopar Therapeutics', mcap: 385 },
  { ticker: 'STTK', company: 'Shattuck Labs', mcap: 379 },
  { ticker: 'DNA', company: 'Ginkgo Bioworks', mcap: 378 },
  { ticker: 'ACRS', company: 'Aclaris Therapeutics', mcap: 369 },
  { ticker: 'LENZ', company: 'LENZ Therapeutics', mcap: 365 },
  { ticker: 'CADL', company: 'Candel Therapeutics', mcap: 362 },
  { ticker: 'BCYC', company: 'Bicycle Therapeutics', mcap: 361 },
  { ticker: 'ABSI', company: 'Absci', mcap: 358 },
  { ticker: 'AURA', company: 'Aura Biosciences', mcap: 356 },
  { ticker: 'IMRX', company: 'Immuneering', mcap: 344 },
  { ticker: 'NGNE', company: 'Neurogene', mcap: 343 },
  { ticker: 'CLYM', company: 'Climb Bio', mcap: 343 },
  { ticker: 'FHTX', company: 'Foghorn Therapeutics', mcap: 339 },
  { ticker: 'IRD', company: 'Opus Genetics', mcap: 337 },
  { ticker: 'ANL', company: 'Adlai Nortye', mcap: 329 },
  { ticker: 'XFOR', company: 'X4 Pharmaceuticals', mcap: 329 },
  { ticker: 'RLMD', company: 'Relmada Therapeutics', mcap: 326 },
  { ticker: 'RZLT', company: 'Rezolute', mcap: 323 },
  { ticker: 'AVTX', company: 'Avalo Therapeutics', mcap: 320 },
  { ticker: 'GLSI', company: 'Greenwich LifeSciences', mcap: 320 },
  { ticker: 'TARA', company: 'Protara Therapeutics', mcap: 316 },
  { ticker: 'NAUT', company: 'Nautilus Biotechnology', mcap: 313 },
  { ticker: 'XOMA', company: 'XOMA Royalty', mcap: 309 },
  { ticker: 'PBYI', company: 'Puma Biotechnology', mcap: 308 },
  { ticker: 'CABA', company: 'Cabaletta Bio', mcap: 305 },
  { ticker: 'CCCC', company: 'C4 Therapeutics', mcap: 297 },
  { ticker: 'SLN', company: 'Silence Therapeutics', mcap: 294 },
  { ticker: 'ALXO', company: 'ALX Oncology Holdings', mcap: 290 },
  { ticker: 'CNTX', company: 'Context Therapeutics', mcap: 287 },
  { ticker: 'ACIU', company: 'AC Immune', mcap: 276 },
  { ticker: 'OABI', company: 'OmniAb', mcap: 274 },
  { ticker: 'CHRS', company: 'Coherus Oncology', mcap: 272 },
  { ticker: 'ENLV', company: 'Enlivex', mcap: 271 },
  { ticker: 'PRLD', company: 'Prelude Therapeutics', mcap: 266 },
  { ticker: 'CLLS', company: 'Cellectis', mcap: 265 },
  { ticker: 'FENC', company: 'Fennec Pharmaceuticals', mcap: 263 },
  { ticker: 'ABEO', company: 'Abeona Therapeutics', mcap: 263 },
  { ticker: 'HELP', company: 'Cybin', mcap: 263 },
  { ticker: 'NERV', company: 'Minerva Neurosciences', mcap: 260 },
  { ticker: 'IKT', company: 'Inhibikase Therapeutics', mcap: 257 },
  { ticker: 'SRZN', company: 'Surrozen', mcap: 252 },
  { ticker: 'OVID', company: 'Ovid Therapeutics', mcap: 249 },
  { ticker: 'OBIO', company: 'Orchestra BioMed', mcap: 244 },
  { ticker: 'PALI', company: 'Palisade Bio', mcap: 243 },
  { ticker: 'NVCT', company: 'Nuvectis Pharma', mcap: 237 },
  { ticker: 'CNTN', company: 'Canton Strategic Holdings', mcap: 231 },
  { ticker: 'SLGL', company: 'Sol-Gel Technologies', mcap: 227 },
  { ticker: 'ACHV', company: 'Achieve Life Sciences', mcap: 227 },
  { ticker: 'KROS', company: 'Keros Therapeutics', mcap: 223 },
  { ticker: 'ALEC', company: 'Alector', mcap: 221 },
  { ticker: 'ELDN', company: 'Eledon Pharmaceuticals', mcap: 221 },
  { ticker: 'MDWD', company: 'MediWound', mcap: 219 },
  { ticker: 'CAMP', company: 'Camp4 Therapeutics', mcap: 218 },
  { ticker: 'VYGR', company: 'Voyager Therapeutics', mcap: 217 },
  { ticker: 'HUMA', company: 'Humacyte', mcap: 214 },
  { ticker: 'CBUS', company: 'Cibus', mcap: 213 },
  { ticker: 'PLX', company: 'Protalix BioTherapeutics', mcap: 211 },
  { ticker: 'PMN', company: 'ProMIS Neurosciences', mcap: 210 },
  { ticker: 'ELTX', company: 'Elicio Therapeutics', mcap: 203 },
  { ticker: 'ARCT', company: 'Arcturus Therapeutics', mcap: 202 },
  { ticker: 'ABOS', company: 'Acumen Pharmaceuticals', mcap: 200 },
  { ticker: 'GALT', company: 'Galectin Therapeutics', mcap: 200 },
  { ticker: 'CGEN', company: 'Compugen', mcap: 197 },
  { ticker: 'EDIT', company: 'Editas Medicine', mcap: 195 },
  { ticker: 'TNYA', company: 'Tenaya Therapeutics', mcap: 192 },
  { ticker: 'NTHI', company: 'NeOnc Technologies', mcap: 188 },
  { ticker: 'PRQR', company: 'ProQR Therapeutics', mcap: 188 },
  { ticker: 'MOLN', company: 'Molecular Partners', mcap: 187 },
  { ticker: 'KLRS', company: 'Kalaris Therapeutics', mcap: 184 },
  { ticker: 'HRTX', company: 'Heron Therapeutics', mcap: 182 },
  { ticker: 'SABS', company: 'SAB Biotherapeutics', mcap: 180 },
  { ticker: 'RNAC', company: 'Cartesian Therapeutics', mcap: 178 },
  { ticker: 'NKTX', company: 'Nkarta', mcap: 178 },
  { ticker: 'TLSA', company: 'Tiziana Life Sciences', mcap: 177 },
  { ticker: 'VXRT', company: 'Vaxart', mcap: 177 },
  { ticker: 'WHWK', company: 'Whitehawk Therapeutics', mcap: 177 },
  { ticker: 'SGMT', company: 'Sagimet Biosciences', mcap: 176 },
  { ticker: 'TNXP', company: 'Tonix Pharmaceuticals', mcap: 172 },
  { ticker: 'CRBU', company: 'Caribou Biosciences', mcap: 170 },
  { ticker: 'MENS', company: 'Jyong Biotech', mcap: 166 },
  { ticker: 'KPTI', company: 'Karyopharm Therapeutics', mcap: 161 },
  { ticker: 'MIST', company: 'Milestone Pharmaceuticals', mcap: 161 },
  { ticker: 'IMUX', company: 'Immunic', mcap: 160 },
  { ticker: 'RANI', company: 'Rani Therapeutics', mcap: 158 },
  { ticker: 'FATE', company: 'Fate Therapeutics', mcap: 155 },
  { ticker: 'IPHA', company: 'Innate Pharma', mcap: 151 },
  { ticker: 'ZNTL', company: 'Zentalis Pharmaceuticals', mcap: 149 },
  { ticker: 'CRBP', company: 'Corbus Pharmaceuticals', mcap: 148 },
  { ticker: 'UNCY', company: 'Unicycive Therapeutics', mcap: 142 },
  { ticker: 'MGNX', company: 'MacroGenics', mcap: 141 },
  { ticker: 'ARTV', company: 'Artiva Biotherapeutics', mcap: 141 },
  { ticker: 'SGMO', company: 'Sangamo Therapeutics', mcap: 140 },
  { ticker: 'CNTB', company: 'Connect Biopharma', mcap: 139 },
  { ticker: 'ADAG', company: 'Adagene', mcap: 134 },
  { ticker: 'ORMP', company: 'Oramed Pharmaceuticals', mcap: 131 },
  { ticker: 'PLYX', company: 'Polaryx Therapeutics', mcap: 130 },
  { ticker: 'SPRO', company: 'Spero Therapeutics', mcap: 130 },
  { ticker: 'CRDF', company: 'Cardiff Oncology', mcap: 129 },
  { ticker: 'AARD', company: 'Aardvark Therapeutics', mcap: 127 },
  { ticker: 'ACOG', company: 'Alpha Cognition', mcap: 126 },
  { ticker: 'BDTX', company: 'Black Diamond Therapeutics', mcap: 123 },
  { ticker: 'GNLX', company: 'Genelux', mcap: 120 },
  { ticker: 'INO', company: 'Inovio Pharmaceuticals', mcap: 120 },
  { ticker: 'GANX', company: 'Gain Therapeutics', mcap: 117 },
  { ticker: 'GOSS', company: 'Gossamer Bio', mcap: 116 },
  { ticker: 'ONCY', company: 'Oncolytics Biotech', mcap: 114 },
  { ticker: 'COYA', company: 'Coya Therapeutics', mcap: 112 },
  { ticker: 'CDXS', company: 'Codexis', mcap: 111 },
  { ticker: 'DTIL', company: 'Precision BioSciences', mcap: 111 },
  { ticker: 'EQ', company: 'Equillium', mcap: 108 },
  { ticker: 'FBIO', company: 'Fortress Biotech', mcap: 104 },
  { ticker: 'TTRX', company: 'Turn Therapeutics', mcap: 103 },
  { ticker: 'AGEN', company: 'Agenus', mcap: 101 },
  { ticker: 'SEER', company: 'Seer', mcap: 100 },
];

const STUB_BODY_HEADINGS = [
  '카탈리스트', '회사 개요', '매출', '플랫폼', '적응증',
  '파트너', '매출 구조', '자체 판매', '상업화 제품', '메모',
];

async function renameTicker({ old: oldTicker, new: newTicker }) {
  const oldPath = path.join(COMPANIES_DIR, `${oldTicker}.md`);
  const newPath = path.join(COMPANIES_DIR, `${newTicker}.md`);
  try {
    let content = await fs.readFile(oldPath, 'utf8');
    content = content.replace(
      new RegExp(`^ticker: ${oldTicker}$`, 'm'),
      `ticker: ${newTicker}`,
    );
    content = content.replace(`(${oldTicker})`, `(${newTicker})`);
    await fs.writeFile(newPath, content, 'utf8');
    await fs.unlink(oldPath);
    return `✅ ${oldTicker} → ${newTicker}`;
  } catch (e) {
    return `⚠️  ${oldTicker} → ${newTicker} 실패: ${e.message}`;
  }
}

async function deleteTicker(ticker) {
  const filePath = path.join(COMPANIES_DIR, `${ticker}.md`);
  try {
    await fs.unlink(filePath);
    return `🗑️  ${ticker}.md 삭제`;
  } catch (e) {
    return `⚠️  ${ticker} 삭제 실패: ${e.message}`;
  }
}

async function updateCatalysts() {
  const filePath = path.join(ROOT, 'data/catalysts.md');
  const md = await fs.readFile(filePath, 'utf8');
  const yamlMatch = md.match(/```yaml\n([\s\S]*?)```/);
  if (!yamlMatch) throw new Error('catalysts.md에 yaml 블록 없음');

  const data = yaml.parse(yamlMatch[1]);
  const renameMap = Object.fromEntries(TICKER_RENAMES.map(r => [r.old, r.new]));

  let renamedCount = 0;
  let deletedCount = 0;
  data.events = data.events.filter(e => {
    if (TICKER_DELETIONS.includes(e.ticker)) {
      deletedCount++;
      return false;
    }
    if (renameMap[e.ticker]) {
      e.ticker = renameMap[e.ticker];
      renamedCount++;
    }
    return true;
  });

  const newYaml = yaml.stringify(data);
  const newMd = md.replace(/```yaml\n[\s\S]*?```/, '```yaml\n' + newYaml + '```');
  await fs.writeFile(filePath, newMd, 'utf8');
  return { renamedCount, deletedCount };
}

async function createStub({ ticker, company, mcap }) {
  const filePath = path.join(COMPANIES_DIR, `${ticker}.md`);
  try {
    await fs.access(filePath);
    return { ticker, status: 'skipped' };
  } catch {
    // 파일 없음 → 생성
  }
  const fm = {
    ticker,
    company,
    mcap,
    modality: 'Other',
    areas: ['Other'],
    nextCatalyst: null,
    recommendation: 'Worth Monitoring',
    verified: TODAY,
    sources: [],
  };
  const bodyParts = [`# ${company} (${ticker})`, ''];
  for (const heading of STUB_BODY_HEADINGS) {
    bodyParts.push(`## ${heading}`);
    bodyParts.push('정보 미입력');
    bodyParts.push('');
  }
  const content = `---\n${yaml.stringify(fm).trimEnd()}\n---\n\n${bodyParts.join('\n').trimEnd()}\n`;
  await fs.writeFile(filePath, content, 'utf8');
  return { ticker, status: 'created' };
}

async function main() {
  console.log('=== Step 1: Ticker rename ===');
  for (const r of TICKER_RENAMES) {
    console.log(' ', await renameTicker(r));
  }

  console.log('\n=== Step 1: Deletions ===');
  for (const t of TICKER_DELETIONS) {
    console.log(' ', await deleteTicker(t));
  }

  console.log('\n=== Step 1: catalysts.md cleanup ===');
  const { renamedCount, deletedCount } = await updateCatalysts();
  console.log(`  ↻ ${renamedCount}건 ticker 갱신, ${deletedCount}건 항목 삭제`);

  console.log('\n=== Step 2~4: 빈 깡통 생성 ===');
  const results = await Promise.all(STUBS.map(createStub));
  const created = results.filter(r => r.status === 'created').length;
  const skipped = results.filter(r => r.status === 'skipped');
  console.log(`  ✅ 새로 생성: ${created}개`);
  if (skipped.length > 0) {
    console.log(`  ⏭️  이미 존재(skip): ${skipped.length}개 → ${skipped.map(s => s.ticker).join(', ')}`);
  }

  const finalCount = (await fs.readdir(COMPANIES_DIR)).filter(f => f.endsWith('.md')).length;
  console.log(`\n=== 최종 ===`);
  console.log(`  data/companies/ 총 .md 파일: ${finalCount}개`);
  console.log('');
  console.log('📌 빈 깡통은 modality=Other, areas=[Other], sources=[]로 시작.');
  console.log('📌 verify-data 시 sources 비어있어 fail 예상. 점진 채워야 함.');
}

main().catch(err => {
  console.error('실패:', err);
  process.exit(1);
});
