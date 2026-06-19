---
ticker: CRMD
updated: 2026-06-19
author: codex
scores:
  growth: 68
  profitability: 46
  moat: 70
  financial_health: 58
  valuation: 61
peers: [SCPH, TELA, XERS, ACRS]
news:
  - date: 2025-07-01
    title: "CorMedix Spikes To Four-Year High On A Surprise Deal For DefenCath"
    summary: "대형 투석 기관의 DefenCath 사용 확대 소식 이후 매출 가이던스가 상향됐다고 보도됐다. 투석센터 채택률이 CRMD의 핵심 상업 지표임을 보여 준 사건이다."
    url: "https://www.investors.com/news/technology/cormedix-stock-defencath-large-dialysis-organization/"
    source: "Investor's Business Daily"
  - date: 2025-05-13
    title: "CorMedix Reports First Quarter 2025 Financial Results and Provides Corporate Update"
    summary: "DefenCath 상업화 초기 매출과 투석센터 계약 진행 상황이 업데이트됐다. 단일 제품 회사인 만큼 분기별 vial 사용량과 계정 확대가 중요하다."
    url: "https://www.cormedix.com/cormedix-reports-first-quarter-2025-financial-results-and-provides-corporate-update/"
    source: "CorMedix"
  - date: 2024-04-19
    title: "CorMedix Shares Rise After DefenCath Meets Payment Criteria"
    summary: "CMS의 TDAPA 관련 결정으로 DefenCath의 외래 투석센터 도입 경제성이 개선됐다고 보도됐다. 상업화 초기에는 환급 구조가 채택 속도의 핵심이다."
    url: "https://www.wsj.com/articles/cormedix-shares-rise-6-after-defencath-meets-payment-criteria-992a5953"
    source: "Wall Street Journal"
  - date: 2023-11-15
    title: "CorMedix Announces FDA Approval of DefenCath"
    summary: "FDA가 성인 혈액투석 중심정맥카테터 환자의 카테터 관련 혈류감염 감소를 위해 DefenCath를 승인했다. 이는 회사의 단일 핵심 상업 자산이다."
    url: "https://www.cormedix.com/cormedix-inc-announces-fda-approval-of-defencath-to-reduce-the-incidence-of-catheter-related-bloodstream-infections-in-adult-hemodialysis-patients/"
    source: "CorMedix"
  - date: 2022-03-28
    title: "LOCK-IT-100 Phase 3 Data Support DefenCath CRBSI Reduction"
    summary: "LOCK-IT-100은 taurolidine/heparin catheter lock이 heparin 대비 CRBSI 위험을 낮춘 근거로 인용된다. 이 데이터가 허가 패키지의 중심이다."
    url: "https://clinicaltrials.gov/study/NCT02651428"
    source: "ClinicalTrials.gov"
sources:
  - "https://www.cormedix.com/pipeline"
  - "https://www.investors.com/news/technology/cormedix-stock-defencath-large-dialysis-organization/"
  - "https://clinicaltrials.gov/study/NCT02651428"
  - "https://www.wsj.com/articles/cormedix-shares-rise-6-after-defencath-meets-payment-criteria-992a5953"
  - "https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=DefenCath"
assets:
  - name: DefenCath (taurolidine/heparin)
    indication: 혈액투석 중심정맥 카테터 관련 혈류감염(CRBSI) 예방
    modality: 항균 카테터 락 용액 (taurolidine 항균 + heparin 항응고)
    stage: approved
    revenue_ttm_usd: 258800000
    tier: free
    etiology: 중심정맥 카테터(CVC) 내강에 균이 집락해 바이오필름을 형성하고, 이 바이오필름에서 박테리아·진균이 혈류로 파종되어 카테터
      관련 혈류감염(CRBSI)을 일으킨다. CVC를 장기 유지하는 혈액투석 환자에서 CRBSI는 입원·패혈증·사망의 주요 원인이다.
    moa: 투석 세션 사이에 카테터 내강을 채워두는 락 용액으로, taurolidine이 비항생제 광범위 항균·항바이오필름 작용으로 균 집락을
      억제하고 heparin이 카테터 개존을 확보한다. 피벗 LOCK-IT-100 3상에서 헤파린 단독 대비 CRBSI 위험을 71%
      감소(HR 0.29)시켰다.
    market:
      patients: 미국 혈액투석 CVC 사용 환자 약 150,000명
      patients_basis: 가정 (USRDS/회사 자료 기반 통상 추정)
      annual_price_usd: 39000
      price_basis: WAC $249.99/vial × 주3회 투석 ≈ 연 156 lock 가정 (net·TDAPA 환급은 더 낮음)
      penetration: 0.12
      penetration_basis: 가정
      pxq_usd: 258800000
      tam_usd: 700000000
      market_sources:
        - https://www.stocktitan.net/news/CRMD/cor-medix-inc-reports-fourth-quarter-and-full-year-2025-financial-zfzk9d7zg7bc.html
        - https://www.grandviewresearch.com/industry-analysis/us-hemodialysis-catheter-market-report
    expansion:
      - axis: 적응증 확장
        detail: TPN(완전정맥영양) 카테터 환자 대상 Phase 3 — 회사 추산 연 약 500만 infusion 추가, $500–750M
          기회. 2027 상반기 완료 목표
        status: ph3
        sources:
          - https://www.globenewswire.com/news-release/2026/05/14/3294799/0/en/Cormedix-Therapeutics-Reports-First-Quarter-2026-Financial-Results-and-Provides-Business-Update.html
      - axis: 적응증 확장
        detail: 소아 혈액투석 환자 대상 임상 진행 중
        status: 가정
pipeline_note: DefenCath는 미국 최초·유일 FDA 승인 항균 카테터 락 용액으로 2024년 상업 출시했다. 2025년 매출
  급성장(DefenCath $258.8M, Melinta 인수 포함 pro forma 총매출 $401.3M)하며 흑자 전환했고 FY2026
  가이던스는 순매출 $300–320M이다. 라벨 확장(TPN Phase 3, 소아 투석)이 성장 레버다. ※Melinta
  포트폴리오(REZZAYO 등)는 별도 자산.
---

## At a Glance
CorMedix는 혈액투석 환자의 중심정맥카테터 감염을 줄이는 DefenCath 하나에 사실상 집중된 소형 상업화 바이오파마다. DefenCath는 taurolidine과 heparin을 조합한 catheter lock solution으로, 투석 세션 사이 카테터 내강에 남겨 세균 증식과 혈전을 줄이는 제품이다. 이미 FDA 승인을 받았기 때문에 핵심은 임상 성공보다 투석센터 채택, 환급, 대형 dialysis organization 계약이다. 이 회사를 이해하려면 "신약 플랫폼"보다 "감염 예방 단일 제품의 미국 투석센터 침투율"을 보면 된다.

## Company Profile
CorMedix의 사업은 DefenCath 상업화에 집중돼 있다. 제품은 성인 신부전 환자가 만성 혈액투석을 중심정맥카테터로 받을 때 catheter-related bloodstream infection(CRBSI)을 줄이는 용도로 승인됐다. Taurolidine은 항생제와 달리 비특이적 항균·항생물막 작용을 하고, heparin은 카테터 폐색을 줄이는 역할을 한다. 회사는 미국 투석센터, 병원, 장기요양/입원 관련 catheter setting으로 적응증과 사용처를 넓히려 한다.

## Growth Outlook
성장성은 DefenCath가 투석센터 표준 프로토콜에 얼마나 빠르게 들어가는지에 달려 있다. 미국 혈액투석 환자 중 중심정맥카테터를 쓰는 환자는 감염 위험이 높고, CRBSI는 입원·사망·비용 부담이 크다. TDAPA 등 환급 제도는 초기 도입 경제성을 높이지만, 시간이 지나면 실제 사용량과 비용효과성이 더 중요해진다. 대형 dialysis organization 계약과 신규 적응증 개발이 2026년 이후 성장의 주요 변수다.

## Profitability
CorMedix는 단일 제품 매출이 늘기 시작한 초기 상업화 단계다. 제품이 병원·투석센터에 반복 사용되는 구조라 일정 규모를 넘으면 매출총이익률은 개선될 수 있다. 그러나 영업망, payer 대응, 제조·재고, 임상 확장 비용이 여전히 필요하다. 흑자전환은 DefenCath가 제한된 초기 계정을 넘어 넓은 outpatient dialysis 네트워크로 확산되는지에 달려 있다.

## Competitive Moat
DefenCath의 해자는 FDA 승인 catheter lock 제품이라는 규제 지위와 LOCK-IT-100 데이터다. 항생제 lock solution은 내성 우려가 있고 heparin 단독은 감염 예방 효과가 제한적이라는 점에서 제품 포지션이 뚜렷하다. 다만 catheter care는 병원 프로토콜과 비용 민감도가 큰 영역이라, 임상적 우위가 곧바로 빠른 채택으로 이어지지는 않는다. 경쟁은 다른 약물보다 기존 관행, 비용, 환급, 센터 운영 절차와의 싸움에 가깝다.

## Financial Health
CRMD의 재무건전성은 DefenCath 매출 성장 속도에 매우 민감하다. 소형 단일제품 회사라 현금 보유와 분기 매출 변동성이 주가와 자본조달 위험에 직접 연결된다. 대형 계정이 확대되면 현금흐름 가시성이 좋아지지만, 채택이 늦거나 환급 구조가 바뀌면 추가 자금조달 필요성이 생길 수 있다. 재무 리스크는 임상 실패보다 상업 실행과 working capital 부담이다.

## Valuation
CRMD의 가치는 미국 투석 catheter 환자군에서 DefenCath가 차지할 수 있는 점유율을 얼마나 보수적으로 보느냐에 달려 있다. 승인 제품이 있다는 점은 하방을 지지하지만, 단일 제품과 제한 적응증이라는 할인 요인도 크다. 대형 dialysis organization 계약은 밸류에이션을 크게 움직일 수 있고, 반대로 환급 변화나 사용량 둔화는 빠르게 반영될 수 있다. 계정 수, 환자 수, vial 사용량이 핵심 지표다.

## Shareholder Returns
CorMedix는 배당이나 자사주 매입보다 DefenCath 상업화에 자본을 집중해야 하는 단계다. 주주환원은 직접 환원보다 매출 성장으로 희석 위험을 낮추는 방식으로 나타난다. 소형 단일제품 회사 특성상 현금 보전이 우선이다.

## Bottom Line
CorMedix는 복잡한 플랫폼 회사가 아니라 승인된 감염예방 catheter lock 제품의 상업화 사례다. 강점은 FDA 승인, CRBSI 감소 근거, 투석센터 미충족 수요이고, 리스크는 단일 제품 의존도, 환급 변화, 대형 계정 채택 속도다. 2026년에는 DefenCath 매출과 dialysis organization 확산이 회사 가치의 거의 전부를 설명하는 지표가 된다.
