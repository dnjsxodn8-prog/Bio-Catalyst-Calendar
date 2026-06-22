// spec 018 — Company Research Page. 모달이 아닌 풀페이지. 표준 탭(데이터 있는 것만, 순서 고정).
// 기존 CompanyDetail.jsx의 섹션 컴포넌트를 재사용하고, 한 줄 스크롤 대신 탭으로 재편.
import { useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Building2, Pill, FlaskConical, Rocket, BookOpen, Cpu, Microscope, StickyNote } from 'lucide-react';
import {
  Hero,
  ScreenerScore,
  CompanyFeed,
  CatalystTimeline,
  SidePanels,
  ScoreSummary,
  NarrativeSection,
  PeerChart,
  NewsSection,
  AssetSection,
  ResearchSources,
  SectionBox,
  FieldCard,
} from '../components/CompanyDetail';
import { dDelta } from '../utils/dDay';
import { feedForTicker } from '../utils/feed';

function isFilled(v) {
  if (!v) return false;
  const s = String(v).trim();
  return s.length > 0 && s !== '정보 미입력';
}

// body 필드 그룹 (CompanyDetail PROFILE/CLINICAL/DRUG_FIELDS 와 동일 키)
const PROFILE_FIELDS = [
  { key: '매출', icon: () => null, label: '최근 매출' },
  { key: '플랫폼', icon: Cpu, label: '핵심 기술' },
  { key: '적응증', icon: Pill, label: '적응증' },
  { key: '파트너', icon: Building2, label: '파트너' },
  { key: '매출 구조', icon: BookOpen, label: '매출 구조' },
  { key: '자체 판매', icon: Rocket, label: '자체 판매' },
  { key: '상업화 제품', icon: Rocket, label: '상업화 제품', wide: true },
];
const CLINICAL_FIELDS = [
  { key: '임상 디자인', icon: FlaskConical, label: '임상 디자인', wide: true },
  { key: '타겟 질환', icon: Microscope, label: '타겟 질환', wide: true },
  { key: '기존 치료제', icon: Pill, label: '기존 치료제', wide: true },
  { key: '사전 공개 임상', icon: FlaskConical, label: '사전 공개 임상', wide: true },
];
const PIPELINE_FIELDS = [
  { key: 'Modality', icon: Cpu, label: 'Modality', wide: true },
  { key: 'MOA', icon: Microscope, label: '작용 기전 (MOA)', wide: true },
  { key: '상업화 제품', icon: Rocket, label: '상업화 제품', wide: true },
  { key: '적응증', icon: Pill, label: '적응증' },
  { key: '논문', icon: BookOpen, label: '주요 논문', wide: true },
];

function FieldGroup({ title, icon, color, body, fields }) {
  const rows = fields.filter((f) => isFilled(body?.[f.key]));
  if (!rows.length) return null;
  return (
    <SectionBox title={title} icon={icon} color={color}>
      {rows.map((f) => (
        <FieldCard key={f.key} icon={f.icon} label={f.label} value={body[f.key]} wide={f.wide} />
      ))}
    </SectionBox>
  );
}

// research 내러티브 — Overview(한눈에/종합)는 따로, 심층 탭은 나머지.
const RESEARCH_DEEP = [
  { key: 'companyProfile', label: '기업 개요', scoreKey: null },
  { key: 'growthOutlook', label: '성장 전망', scoreKey: 'growth' },
  { key: 'profitability', label: '수익성', scoreKey: 'profitability' },
  { key: 'competitiveMoat', label: '경쟁 우위', scoreKey: 'moat' },
  { key: 'financialHealth', label: '재무 건전성', scoreKey: 'financial_health' },
  { key: 'valuation', label: '밸류에이션', scoreKey: 'valuation' },
  { key: 'shareholderReturns', label: '주주 환원', scoreKey: null },
];

export default function CompanyPage({ data, watchlist, pushRecent }) {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const { companies = [], catalysts = [], prices = {} } = data || {};
  const company = useMemo(() => companies.find((c) => c.ticker === ticker), [companies, ticker]);

  useEffect(() => {
    if (company?.ticker) pushRecent?.(company.ticker);
  }, [company?.ticker, pushRecent]);

  const ticks = useMemo(
    () =>
      catalysts
        .filter((c) => c.ticker === ticker)
        .map((c) => ({ ...c, _d: dDelta(c.date) }))
        .filter((c) => c._d != null)
        .sort((a, b) => a._d - b._d),
    [catalysts, ticker]
  );
  const upcoming = ticks.find((t) => t._d >= 0) || ticks[0];
  const feedItems = useMemo(() => (company ? feedForTicker(data, ticker) : []), [data, ticker, company]);

  // 탭 가용성 (고정 순서, 데이터 있는 것만)
  const tabs = useMemo(() => {
    if (!company) return [];
    const body = company.body || {};
    const research = company.research;
    const out = [{ id: 'overview', label: 'Overview' }];
    if (ticks.length) out.push({ id: 'catalysts', label: 'Catalysts' });
    const hasPipeline =
      (research?.assets?.length || research?.platform) ||
      PIPELINE_FIELDS.some((f) => isFilled(body[f.key]));
    if (hasPipeline) out.push({ id: 'pipeline', label: 'Pipeline' });
    if (CLINICAL_FIELDS.some((f) => isFilled(body[f.key]))) out.push({ id: 'clinical', label: 'Clinical' });
    if (research && RESEARCH_DEEP.some((s) => isFilled(research.sections?.[s.key])))
      out.push({ id: 'research', label: '심층 리서치' });
    if (feedItems.length || research?.news?.length) out.push({ id: 'news', label: 'News' });
    if (research?.peers?.length) out.push({ id: 'peers', label: 'Peers' });
    if (isFilled(body['메모']) || company.sources?.length || research?.sources?.length)
      out.push({ id: 'notes', label: 'Notes' });
    return out;
  }, [company, ticks, feedItems]);

  const tabParam = params.get('tab');
  const active = tabs.some((t) => t.id === tabParam) ? tabParam : 'overview';
  const setActive = (id) => setParams(id === 'overview' ? {} : { tab: id }, { replace: true });

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/app');
  };

  if (!company) return <Navigate to="/app/screener" replace />;

  const body = company.body || {};
  const research = company.research;

  return (
    <div className="-mt-2">
      <button
        onClick={goBack}
        className="inline-flex items-center gap-1.5 mb-3 text-[13px] text-ink-3 hover:text-ink transition-colors"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.8} /> 뒤로
      </button>

      <div className="panel overflow-hidden">
        <Hero company={company} priceCache={prices[company.ticker]} />
        <ScreenerScore ticker={company.ticker} />

        {/* 탭바 (sticky) */}
        {tabs.length > 1 && (
          <div className="sticky top-0 z-10 mt-4 px-7 border-b border-line bg-panel/95 backdrop-blur-sm">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((t) => {
                const on = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={[
                      'relative px-3.5 py-2.5 text-[13px] font-semibold whitespace-nowrap transition-colors',
                      on ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
                    ].join(' ')}
                  >
                    {t.label}
                    {on && (
                      <span
                        className="absolute left-2 right-2 bottom-0 h-[2px] rounded-sm"
                        style={{ background: 'var(--acc)' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 탭 콘텐츠 */}
        <div className="px-5 lg:px-7 py-6 space-y-6">
          {active === 'overview' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
                <div className="space-y-4">
                  {research && isFilled(research.sections?.atGlance) && (
                    <NarrativeSection id="ov-glance" label="한눈에" text={research.sections.atGlance} />
                  )}
                  <FieldGroup title="기업 프로필" icon={Building2} color="green" body={body} fields={PROFILE_FIELDS} />
                  {research && isFilled(research.sections?.bottomLine) && (
                    <NarrativeSection id="ov-bottom" label="종합" text={research.sections.bottomLine} />
                  )}
                </div>
                <SidePanels company={company} upcoming={upcoming} watchlist={watchlist} />
              </div>
            </>
          )}

          {active === 'catalysts' && <CatalystTimeline ticks={ticks} />}

          {active === 'pipeline' &&
            (research?.assets?.length || research?.platform ? (
              <AssetSection
                ticker={company.ticker}
                assets={research.assets || []}
                platform={research.platform}
                pipelineNote={research.pipelineNote}
              />
            ) : (
              <FieldGroup title="파이프라인 · 약물" icon={Pill} color="violet" body={body} fields={PIPELINE_FIELDS} />
            ))}

          {active === 'clinical' && (
            <FieldGroup title="임상 정보" icon={FlaskConical} color="blue" body={body} fields={CLINICAL_FIELDS} />
          )}

          {active === 'research' && research && (
            <>
              <ScoreSummary scores={research.scores || {}} />
              {RESEARCH_DEEP.filter((s) => isFilled(research.sections?.[s.key])).map((s) => (
                <NarrativeSection
                  key={s.key}
                  id={`deep-${s.key}`}
                  label={s.label}
                  text={research.sections[s.key]}
                  score={s.scoreKey ? research.scores?.[s.scoreKey] : null}
                />
              ))}
            </>
          )}

          {active === 'news' && (
            <>
              <CompanyFeed data={data} ticker={ticker} />
              {research?.news?.length > 0 && <NewsSection news={research.news} />}
            </>
          )}

          {active === 'peers' && (
            <div>
              <div className="section-h">
                <h2>동료 비교</h2>
                <span className="meta">{(research?.peers || []).length} PEERS</span>
              </div>
              <PeerChart ticker={company.ticker} peers={research?.peers} />
              {research?.peers?.length > 0 && (
                <div className="text-[12.5px] text-ink-3 mt-2">
                  비교 종목: {research.peers.join(' · ')}
                </div>
              )}
            </div>
          )}

          {active === 'notes' && (
            <>
              {isFilled(body['메모']) && (
                <SectionBox title="메모" icon={StickyNote} color="green">
                  <FieldCard icon={StickyNote} label="메모" value={body['메모']} wide />
                </SectionBox>
              )}
              {company.sources?.length > 0 && (
                <div className="text-[11px] text-ink-4 leading-relaxed">
                  <span className="uppercase tracking-wider mr-2">Sources</span>
                  {company.sources.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="mr-3 underline decoration-ink-4/40 hover:text-accent-blue break-all"
                    >
                      {url}
                    </a>
                  ))}
                </div>
              )}
              {research?.sources?.length > 0 && <ResearchSources sources={research.sources} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
