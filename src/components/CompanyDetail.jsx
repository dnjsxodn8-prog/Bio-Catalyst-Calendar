import { Building2, DollarSign, Cpu, Pill, Handshake, BarChart3, Store, Rocket, FlaskConical, Microscope, BookOpen, StickyNote } from 'lucide-react';
import { formatMcap, formatDate } from '../utils/format';
import { renderBody, extractBoldHeader, stripBoldHeader } from '../utils/inlineMarkdown';
import Sparkline from './Sparkline';

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
  { key: '기존 치료제', icon: Pill, label: '기존 치료제 · 차별점', wide: true },
  { key: '사전 공개 임상', icon: FlaskConical, label: '사전 공개 임상', wide: true },
];

const DRUG_FIELDS = [
  { key: 'Modality', icon: Cpu, label: 'Modality', wide: true },
  { key: 'MOA', icon: Microscope, label: '작용 기전 (MOA)', wide: true },
  { key: '논문', icon: BookOpen, label: '주요 논문 · 참고자료', wide: true },
];

const SECTION_COLOR = {
  green: { text: 'text-accent-green', bar: 'bg-accent-green' },
  blue: { text: 'text-accent-blue', bar: 'bg-accent-blue' },
  violet: { text: 'text-accent-violet', bar: 'bg-accent-violet' },
};

function isFilled(v) {
  if (!v) return false;
  const s = String(v).trim();
  return s.length > 0 && s !== '정보 미입력';
}

function FieldCard({ icon: Icon, label, value, wide, isText }) {
  return (
    <div
      className={[
        'rounded-lg bg-bg-card/70 border border-border/60 p-3',
        wide ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 shrink-0 text-fg-muted" />
        <div className="text-[14px] font-semibold text-fg leading-snug">
          {label}
        </div>
      </div>
      {isText ? (
        <div className="text-[13px] text-fg whitespace-pre-line break-words leading-snug">
          {value}
        </div>
      ) : (
        <div className="space-y-2">{renderBody(value)}</div>
      )}
    </div>
  );
}

function SectionBox({ title, icon: Icon, color = 'green', subtitle, children }) {
  const c = SECTION_COLOR[color];
  return (
    <div className="rounded-xl border border-border bg-bg-card2/25 p-3.5">
      <div className="flex items-center flex-wrap gap-2 mb-3">
        <span className={`w-1 h-4 rounded-sm ${c.bar}`} aria-hidden />
        {Icon ? <Icon className={`w-4 h-4 ${c.text}`} /> : null}
        <h4 className={`text-sm font-semibold ${c.text}`}>{title}</h4>
        {subtitle ? (
          <span className="text-[13px] text-fg-muted">
            <span className="mx-1 text-fg-dim">·</span>
            <span className="font-medium text-fg">{subtitle}</span>
          </span>
        ) : null}
      </div>
      <div className="grid sm:grid-cols-2 gap-2.5">{children}</div>
    </div>
  );
}

function PriceBox({ priceCache }) {
  const data = priceCache?.data;
  if (!Array.isArray(data) || data.length < 2) return null;

  const first = data[0].close;
  const last = data[data.length - 1].close;
  const pct = ((last - first) / first) * 100;
  const trend = last > first ? 'up' : last < first ? 'down' : 'flat';
  const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '─';
  const colorClass =
    trend === 'up' ? 'text-accent-green' : trend === 'down' ? 'text-accent-red' : 'text-fg-muted';

  const currency = priceCache.currency || 'USD';
  const symbol = currency === 'USD' ? '$' : `${currency} `;
  const fetchedDate = priceCache.fetched ? priceCache.fetched.slice(0, 10) : null;

  return (
    <div className="rounded-xl border border-border bg-bg-card2/25 p-3.5">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-fg-muted">
          30일 주가
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-fg font-mono tabular-nums">
            {symbol}
            {last.toFixed(2)}
          </span>
          <span className={`text-sm font-mono tabular-nums ${colorClass}`}>
            {arrow} {pct >= 0 ? '+' : ''}
            {pct.toFixed(1)}%
          </span>
        </div>
      </div>
      <Sparkline data={data} height={48} />
      {fetchedDate ? (
        <div className="mt-1.5 text-[10px] text-fg-dim">fetched {formatDate(fetchedDate)}</div>
      ) : null}
    </div>
  );
}

export default function CompanyDetail({ company, catalystMeta, priceCache }) {
  if (!company) {
    return <div className="text-sm text-fg-muted">종목 정보가 없습니다.</div>;
  }

  const body = company.body ?? {};
  const memo = body['메모'];

  const profileRows = PROFILE_FIELDS.filter((f) => isFilled(body[f.key]));
  const clinicalRows = CLINICAL_FIELDS.filter((f) => isFilled(body[f.key]));
  const drugRows = DRUG_FIELDS.filter((f) => isFilled(body[f.key]));

  return (
    <div className="space-y-4">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h3 className="text-lg font-semibold text-fg">{company.company}</h3>
        <span className="text-sm font-mono text-accent-green">{company.ticker}</span>
      </div>

      {catalystMeta ? (
        <div className="rounded-xl border border-accent-green/30 bg-accent-green/5 p-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-accent-green mb-1.5">
            카탈리스트
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {catalystMeta.drug ? (
              <span className="text-base font-semibold text-fg">{catalystMeta.drug}</span>
            ) : null}
            {catalystMeta.indication ? (
              <span className="text-sm text-fg-muted">{catalystMeta.indication}</span>
            ) : null}
            {catalystMeta.phase ? (
              <span className="text-xs px-2 py-0.5 rounded bg-fg-dim/15 text-fg-muted font-mono">
                {catalystMeta.phase}
              </span>
            ) : null}
          </div>
          {catalystMeta.event ? (
            <div className="mt-2 text-sm text-fg-muted leading-snug">{catalystMeta.event}</div>
          ) : null}
        </div>
      ) : null}

      <PriceBox priceCache={priceCache} />

      <SectionBox title="기업 프로필" icon={Building2} color="green">
        <FieldCard
          icon={DollarSign}
          label="시가총액"
          value={formatMcap(company.mcap)}
          isText
        />
        {profileRows.map((f) => (
          <FieldCard
            key={f.key}
            icon={f.icon}
            label={f.label}
            value={body[f.key]}
            wide={f.wide}
          />
        ))}
      </SectionBox>

      {clinicalRows.length > 0 ? (
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
      ) : null}

      {drugRows.length > 0 ? (
        <SectionBox
          title="약물 정보"
          icon={Pill}
          color="violet"
          subtitle={extractBoldHeader(body['Modality'])}
        >
          {drugRows.map((f) => {
            const raw = body[f.key];
            const v = f.key === 'Modality' ? stripBoldHeader(raw) : raw;
            return (
              <FieldCard key={f.key} icon={f.icon} label={f.label} value={v} wide={f.wide} />
            );
          })}
        </SectionBox>
      ) : null}

      {isFilled(memo) ? (
        <SectionBox title="메모" icon={StickyNote} color="green">
          <FieldCard icon={StickyNote} label="메모" value={memo} wide />
        </SectionBox>
      ) : null}

      {company.sources?.length ? (
        <div className="text-[11px] text-fg-dim leading-relaxed">
          <span className="uppercase tracking-wider mr-2">Sources</span>
          {company.sources.map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mr-3 underline decoration-fg-dim/40 hover:text-accent-blue hover:decoration-accent-blue break-all"
            >
              {url}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
