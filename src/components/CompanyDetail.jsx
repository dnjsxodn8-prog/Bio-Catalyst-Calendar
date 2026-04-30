import { useState } from 'react';
import {
  Building2,
  DollarSign,
  Cpu,
  Pill,
  Handshake,
  BarChart3,
  Store,
  Rocket,
  FlaskConical,
  Microscope,
  BookOpen,
  StickyNote,
  X,
  Star,
  Plus,
  Beaker,
} from 'lucide-react';
import {
  dDelta,
  fmtD,
  dClass,
  fmtDate,
  fmtMcap,
  phaseClass,
  typeClass,
} from '../utils/dDay';
import { renderBody, extractBoldHeader, stripBoldHeader } from '../utils/inlineMarkdown';
import Sparkline from './Sparkline';
import PctChange from './PctChange';

const PROFILE_FIELDS = [
  { key: '회사 개요', icon: Building2, label: '회사 개요', wide: true },
  { key: '매출', icon: DollarSign, label: '최근 매출' },
  { key: '플랫폼', icon: Cpu, label: '핵심 기술' },
  { key: '적응증', icon: Pill, label: '적응증' },
  { key: '파트너', icon: Handshake, label: '파트너' },
  { key: '매출 구조', icon: BarChart3, label: '매출 구조' },
  { key: '자체 판매', icon: Store, label: '자체 판매' },
  { key: '상업화 제품', icon: Rocket, label: '상업화 제품', wide: true },
];

const CLINICAL_FIELDS = [
  { key: '임상 디자인', icon: FlaskConical, label: '임상 디자인', wide: true },
  { key: '타겟 질환', icon: Microscope, label: '타겟 질환', wide: true },
  { key: '기존 치료제', icon: Pill, label: '기존 치료제', wide: true },
  { key: '사전 공개 임상', icon: FlaskConical, label: '사전 공개 임상', wide: true },
];

const DRUG_FIELDS = [
  { key: 'Modality', icon: Cpu, label: 'Modality', wide: true },
  { key: 'MOA', icon: Microscope, label: '작용 기전 (MOA)', wide: true },
  { key: '논문', icon: BookOpen, label: '주요 논문', wide: true },
];

function isFilled(v) {
  if (!v) return false;
  const s = String(v).trim();
  return s.length > 0 && s !== '정보 미입력';
}

export default function CompanyDetail({ item, data, watchlist, onClose }) {
  if (!item) return null;
  const { companies = [], catalysts = [], prices = {} } = data || {};
  const ticker = item.ticker;
  const company = companies.find((c) => c.ticker === ticker) || item;

  const ticks = catalysts
    .filter((c) => c.ticker === ticker)
    .map((c) => ({ ...c, _d: dDelta(c.date) }))
    .filter((c) => c._d != null)
    .sort((a, b) => a._d - b._d);

  const upcoming = ticks.find((t) => t._d >= 0) || ticks[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal relative" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-icon absolute top-4 right-4 z-10"
          onClick={onClose}
          title="닫기"
        >
          <X className="w-4 h-4" strokeWidth={1.6} />
        </button>

        <Hero company={company} priceCache={prices[company.ticker]} />

        <div className="px-7 py-6 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
          <CatalystTimeline ticks={ticks} />
          <SidePanels company={company} upcoming={upcoming} watchlist={watchlist} />
        </div>

        <div className="px-7 pb-6 space-y-4">
          <BodySection company={company} />
        </div>
      </div>
    </div>
  );
}

function Hero({ company, priceCache }) {
  return (
    <div
      className="relative overflow-hidden border-b border-line"
      style={{
        padding: '28px 68px 24px 28px',
        background:
          'linear-gradient(160deg, rgba(110,231,183,0.10), rgba(96,165,250,0.04) 50%, transparent), var(--panel)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: -100,
          right: -80,
          width: 300,
          height: 300,
          background:
            'radial-gradient(closest-side, rgba(110,231,183,0.20), transparent 70%)',
        }}
      />
      <div className="flex items-center gap-3.5 mb-4 relative w-full flex-wrap">
        <div className="mono text-[30px] font-extrabold bg-panel-2 border border-line-2 px-[18px] py-3.5 rounded-[10px] tracking-[0.02em] text-ink">
          {company.ticker}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[22px] font-bold tracking-[-0.02em] truncate">{company.company}</div>
          <div className="mono text-[11.5px] text-ink-3 mt-1 tracking-[0.08em] uppercase">
            {company.modality}
            {company.areas?.length ? ` · ${company.areas.join(' / ')}` : ''}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="num text-[28px] font-bold">{fmtMcap(company.mcap)}</div>
          <div className="flex items-center gap-2">
            <Sparkline ticker={company.ticker} priceCache={priceCache} width={92} height={26} />
            <PctChange ticker={company.ticker} priceCache={priceCache} size="lg" />
          </div>
          <div className="mono text-[10px] text-ink-4 tracking-[0.1em] uppercase">
            30D · Market Cap
          </div>
        </div>
      </div>

      {company.body?.['카탈리스트'] && (
        <div className="flex items-center gap-2 mb-3.5 flex-wrap">
          <span className="text-xs text-ink-3 inline-flex items-center gap-1.5">
            <Beaker className="w-[13px] h-[13px]" strokeWidth={1.6} />
            <span className="text-ink-2 font-semibold">{company.body['카탈리스트']}</span>
          </span>
        </div>
      )}
    </div>
  );
}

function CatalystTimeline({ ticks }) {
  return (
    <div>
      <div className="section-h">
        <h2>카탈리스트 타임라인</h2>
        <span className="meta">{ticks.length} EVENTS</span>
      </div>
      <div className="relative pl-5">
        <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-line" />
        {ticks.map((t, i) => (
          <div
            key={`${t.ticker}-${t.date}-${i}`}
            className="relative px-2.5 py-2 mb-1.5 bg-panel-2 border border-line rounded-md"
          >
            <div
              className="absolute -left-[18px] top-[12px] w-2.5 h-2.5 rounded-full border-2"
              style={{
                background: t._d < 0 ? 'var(--panel-2)' : t._d <= 7 ? '#FBBF24' : 'var(--ink-4)',
                borderColor: 'var(--bg)',
                boxShadow: t._d >= 0 && t._d <= 7 ? '0 0 10px rgba(251,191,36,0.55)' : 'none',
              }}
            />
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              <span className={`d-counter ${dClass(t._d)}`} style={{ height: 20, fontSize: 10 }}>
                {fmtD(t._d)}
              </span>
              <span className="ev-date" style={{ fontSize: 10.5 }}>
                {fmtDate(t.date)} · {t.date.slice(0, 4)}
              </span>
              <span className={`chip ${typeClass(t.type)}`} style={{ height: 18, fontSize: 9.5 }}>
                {t.type}
              </span>
              {t.phase && (
                <span className={`chip ${phaseClass(t.phase)}`} style={{ height: 18, fontSize: 9.5 }}>
                  {t.phase}
                </span>
              )}
            </div>
            <div className="text-[12px] text-ink font-medium leading-snug">{t.event}</div>
          </div>
        ))}
        {ticks.length === 0 && (
          <div className="px-3 py-3 text-ink-4 text-xs">예정된 카탈리스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

function SidePanels({ company, upcoming, watchlist }) {
  const stats = [
    ['Modality', company.modality],
    ['Mcap', fmtMcap(company.mcap)],
    ['Areas', (company.areas || []).join(' / ')],
  ].filter(([, v]) => v);

  return (
    <div className="flex flex-col gap-4">
      <div className="panel p-4">
        <div className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase mb-3">
          Asset Profile
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          {stats.map(([label, value]) => (
            <DetailStat key={label} label={label} value={value} />
          ))}
        </div>
      </div>

      <div
        className="panel p-4"
        style={{
          background:
            'linear-gradient(180deg, rgba(110,231,183,0.04), transparent), var(--panel)',
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase">
            Next Move
          </div>
          {upcoming && (
            <span className={`d-counter ${dClass(upcoming._d)}`}>{fmtD(upcoming._d)}</span>
          )}
        </div>
        {upcoming ? (
          <div>
            <div className="text-[14px] text-ink font-semibold leading-snug">
              {upcoming.event}
            </div>
            <div className="text-xs text-ink-3 mt-1.5">
              {fmtDate(upcoming.date)} · {upcoming.date.slice(0, 4)}
            </div>
          </div>
        ) : (
          <div className="text-[13px] text-ink-4">—</div>
        )}
      </div>

      <WatchlistPanel ticker={company.ticker} watchlist={watchlist} />
    </div>
  );
}

function WatchlistPanel({ ticker, watchlist }) {
  const { groups, isMember, toggle, addGroup } = watchlist || {};
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  if (!watchlist) return null;

  const submit = (e) => {
    e?.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setCreating(false);
      return;
    }
    addGroup(trimmed);
    toggle(trimmed, ticker);
    setName('');
    setCreating(false);
  };

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between mb-2.5">
        <div className="mono text-[10.5px] text-ink-3 tracking-[0.1em] uppercase flex items-center gap-1.5">
          <Star className="w-[12px] h-[12px]" strokeWidth={1.6} />
          관심 종목
        </div>
        <button
          onClick={() => setCreating((v) => !v)}
          className="text-ink-3 hover:text-ink p-0.5"
          title="새 그룹"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.8} />
        </button>
      </div>

      {creating && (
        <form onSubmit={submit} className="mb-2">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={submit}
            onKeyDown={(e) => e.key === 'Escape' && (setCreating(false), setName(''))}
            placeholder="새 그룹 이름…"
            className="w-full bg-panel-2 border border-line rounded-md px-2.5 py-1.5 text-[12px] text-ink outline-none focus:border-line-2"
          />
        </form>
      )}

      {groups.length === 0 ? (
        <div className="text-[12px] text-ink-4 leading-snug">
          그룹이 없습니다. 우측 + 로 그룹을 만들면 이 종목이 자동 등록됩니다.
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {groups.map((g) => {
            const active = isMember(g, ticker);
            return (
              <button
                key={g}
                onClick={() => toggle(g, ticker)}
                className={[
                  'px-2.5 py-1 rounded-md text-[11.5px] border transition-colors',
                  active
                    ? 'bg-acc/10 text-acc border-acc/40'
                    : 'bg-panel-2 text-ink-2 border-line hover:border-line-2',
                ].join(' ')}
              >
                {active && '★ '}
                {g}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DetailStat({ label, value }) {
  return (
    <div>
      <div className="mono text-[10px] text-ink-4 tracking-[0.1em] uppercase mb-1">
        {label}
      </div>
      <div className="text-[12.5px] text-ink font-medium break-words">{value}</div>
    </div>
  );
}

function FieldCard({ icon: Icon, label, value, wide, isText }) {
  return (
    <div
      className={[
        'rounded-lg bg-panel-2 border border-line p-3',
        wide ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 shrink-0 text-ink-3" strokeWidth={1.6} />
        <div className="text-[14px] font-semibold text-ink leading-snug">{label}</div>
      </div>
      {isText ? (
        <div className="text-[13px] text-ink whitespace-pre-line break-words leading-snug">
          {value}
        </div>
      ) : (
        <div className="space-y-2">{renderBody(value)}</div>
      )}
    </div>
  );
}

function SectionBox({ title, icon: Icon, color = 'green', subtitle, children }) {
  const tone =
    color === 'blue' ? '#60A5FA' : color === 'violet' ? '#C084FC' : '#6EE7B7';
  return (
    <div className="rounded-xl border border-line bg-bg-2 p-3.5">
      <div className="flex items-center flex-wrap gap-2 mb-3">
        <span
          className="w-1 h-4 rounded-sm"
          style={{ background: tone }}
          aria-hidden
        />
        {Icon && <Icon className="w-4 h-4" style={{ color: tone }} strokeWidth={1.6} />}
        <h4 className="text-sm font-semibold" style={{ color: tone }}>
          {title}
        </h4>
        {subtitle && (
          <span className="text-[13px] text-ink-2">
            <span className="mx-1 text-ink-4">·</span>
            <span className="font-medium text-ink">{subtitle}</span>
          </span>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-2.5">{children}</div>
    </div>
  );
}

function BodySection({ company }) {
  const body = company.body ?? {};
  const memo = body['메모'];
  const profileRows = PROFILE_FIELDS.filter((f) => isFilled(body[f.key]));
  const clinicalRows = CLINICAL_FIELDS.filter((f) => isFilled(body[f.key]));
  const drugRows = DRUG_FIELDS.filter((f) => isFilled(body[f.key]));

  return (
    <>
      <SectionBox title="기업 프로필" icon={Building2} color="green">
        <FieldCard icon={DollarSign} label="시가총액" value={fmtMcap(company.mcap)} isText />
        {profileRows.map((f) => (
          <FieldCard key={f.key} icon={f.icon} label={f.label} value={body[f.key]} wide={f.wide} />
        ))}
      </SectionBox>

      {clinicalRows.length > 0 && (
        <SectionBox title="임상 정보" icon={FlaskConical} color="blue">
          {clinicalRows.map((f) => (
            <FieldCard
              key={f.key}
              icon={f.icon}
              label={f.label}
              value={body[f.key]}
              wide={f.wide}
            />
          ))}
        </SectionBox>
      )}

      {drugRows.length > 0 && (
        <SectionBox
          title="약물 정보"
          icon={Pill}
          color="violet"
          subtitle={extractBoldHeader(body['Modality'])}
        >
          {drugRows.map((f) => {
            const raw = body[f.key];
            const v = f.key === 'Modality' ? stripBoldHeader(raw) : raw;
            return <FieldCard key={f.key} icon={f.icon} label={f.label} value={v} wide={f.wide} />;
          })}
        </SectionBox>
      )}

      {isFilled(memo) && (
        <SectionBox title="메모" icon={StickyNote} color="green">
          <FieldCard icon={StickyNote} label="메모" value={memo} wide />
        </SectionBox>
      )}

      {company.sources?.length ? (
        <div className="text-[11px] text-ink-4 leading-relaxed">
          <span className="uppercase tracking-wider mr-2">Sources</span>
          {company.sources.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mr-3 underline decoration-ink-4/40 hover:text-accent-blue hover:decoration-accent-blue break-all"
            >
              {url}
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
