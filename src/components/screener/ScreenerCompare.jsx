import { ArrowLeft } from 'lucide-react';
import {
  COLOR,
  G_SUB,
  E_SUB,
  fmtMcap,
  fmtRunway,
  reratingTag,
} from './screenerFormat';

// 종목 비교 전용 패널 (spec 020 §11). 1열=지표, 이후 종목당 1열. 숫자 행 최댓값 강조.
export default function ScreenerCompare({ items, onClose, onRemove, onOpenCompany }) {
  return (
    <div className="panel p-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-line">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-2 hover:text-ink"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
          목록으로
        </button>
        <span className="text-[13px] font-bold text-ink">종목 비교 ({items.length})</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="border-b border-line">
              <th className="sticky left-0 bg-panel z-10 text-left py-3 px-3 text-ink-3 font-semibold w-[140px] min-w-[140px]">
                지표
              </th>
              {items.map((d) => (
                <th key={d.t} className="py-3 px-3 text-left min-w-[150px] align-top">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COLOR[d.grp] }} />
                        {d.inCalendar ? (
                          <button onClick={() => onOpenCompany(d.t)} className="mono font-bold text-ink hover:text-acc">
                            {d.t}
                          </button>
                        ) : (
                          <span className="mono font-bold text-ink">{d.t}</span>
                        )}
                      </div>
                      <div className="text-[11px] text-ink-4 font-normal truncate max-w-[130px] mt-0.5">{d.c}</div>
                    </div>
                    <button onClick={() => onRemove(d.t)} className="text-ink-4 hover:text-danger text-[12px]" title="제거">
                      ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TextRow label="등급" items={items} render={(d) => d.grp} />
            <NumRow label="시총" items={items} get={(d) => d.m} render={(d) => fmtMcap(d.m)} />
            <TextRow label="다음 카탈리스트" items={items} render={(d) => d.cat} wrap />
            <TextRow label="카탈리스트 일자" items={items} render={(d) => d.kdate || '—'} />

            <SectionRow label="G · 과학적 위대함" span={items.length} />
            <NumRow label="G_conf" items={items} get={(d) => d.g} render={(d) => d.g} />
            <NumRow label="G_total" items={items} get={(d) => d.gt} render={(d) => d.gt ?? '—'} />
            {G_SUB.map((s) => (
              <NumRow key={s.key} label={s.label} title={s.desc} items={items} get={(d) => d[s.key]} render={(d) => d[s.key] ?? '—'} />
            ))}

            <SectionRow label="E · 실행/번역 능력" span={items.length} />
            <NumRow label="E_conf" items={items} get={(d) => d.e} render={(d) => d.e} />
            <NumRow label="E_total" items={items} get={(d) => d.et} render={(d) => d.et ?? '—'} />
            {E_SUB.map((s) => (
              <NumRow key={s.key} label={s.label} title={s.desc} items={items} get={(d) => d[s.key]} render={(d) => d[s.key] ?? '—'} />
            ))}

            <SectionRow label="T · 진입 타이밍 / 재무" span={items.length} />
            <NumRow label="T1 임박도" items={items} get={(d) => d.t1} render={(d) => d.t1} />
            <NumRow label="T2 딜환경" items={items} get={(d) => d.t2} render={(d) => d.t2 ?? '—'} />
            <NumRow label="T3 런웨이점수" items={items} get={(d) => d.t3} render={(d) => d.t3 ?? '—'} />
            <NumRow label="T_total" items={items} get={(d) => d.tt} render={(d) => d.tt ?? '—'} />
            <NumRow label="런웨이(분기)" items={items} get={(d) => d.runway} render={(d) => fmtRunway(d.runway)} />

            <SectionRow label="기타" span={items.length} />
            <TextRow label="모달리티" items={items} render={(d) => d.mod || '—'} />
            <TextRow label="적응증" items={items} render={(d) => (d.area && d.area.length ? d.area.join(' / ') : '—')} wrap />
            <NumRow label="R_total" items={items} get={(d) => d.rt} render={(d) => d.rt ?? '—'} />
            <TextRow label="Rerating" items={items} render={(d) => reratingTag(d) || '—'} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Cell({ children, highlight, wrap }) {
  return (
    <td className={`py-2 px-3 align-top ${wrap ? '' : 'whitespace-nowrap'} ${highlight ? 'text-ink font-bold' : 'text-ink-2'}`}>
      {children}
    </td>
  );
}

function RowLabel({ label, title }) {
  return (
    <td
      className="sticky left-0 bg-panel z-10 py-2 px-3 text-ink-3 text-[12px] align-top border-r border-[var(--hairline)]"
      title={title}
    >
      {label}
    </td>
  );
}

// 숫자 행: 최댓값(들) 강조
function NumRow({ label, title, items, get, render }) {
  const vals = items.map(get).filter((v) => v != null && v !== '');
  const max = vals.length ? Math.max(...vals) : null;
  return (
    <tr className="border-b border-[var(--hairline)] hover:bg-white/[0.02]">
      <RowLabel label={label} title={title} />
      {items.map((d) => {
        const v = get(d);
        const hl = max != null && v != null && v === max && items.length > 1;
        return (
          <Cell key={d.t} highlight={hl}>
            {render(d)}
          </Cell>
        );
      })}
    </tr>
  );
}

function TextRow({ label, title, items, render, wrap }) {
  return (
    <tr className="border-b border-[var(--hairline)] hover:bg-white/[0.02]">
      <RowLabel label={label} title={title} />
      {items.map((d) => (
        <Cell key={d.t} wrap={wrap}>
          {render(d)}
        </Cell>
      ))}
    </tr>
  );
}

function SectionRow({ label, span }) {
  return (
    <tr className="bg-panel-2/40">
      <td className="sticky left-0 bg-panel-2/40 z-10 py-1.5 px-3 text-[11px] font-semibold text-ink-3 uppercase tracking-wide">
        {label}
      </td>
      <td colSpan={span} className="py-1.5 px-3" />
    </tr>
  );
}
