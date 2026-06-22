import { GRADES, MC_OPTIONS, clearAllFacets } from '../../utils/screenerFilters';

// 멀티패싯 필터 패널 (spec 020 §3·§4). 컨트롤 바의 "필터" 버튼으로 열고 닫는다.
// 같은 패싯 내 칩 = OR, 패싯 간 = AND.
export default function ScreenerFilterPanel({ filters, setFilters, facetOpts }) {
  const f = filters;
  const patch = (p) => setFilters({ ...f, ...p });
  const toggleIn = (key, value) => {
    const arr = f[key];
    patch({ [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value] });
  };

  return (
    <div className="panel p-4 space-y-4">
      <Row label="등급">
        <div className="flex flex-wrap gap-1.5">
          {GRADES.map((g) => (
            <Chip key={g} active={f.grp.includes(g)} onClick={() => toggleIn('grp', g)}>
              {g}
            </Chip>
          ))}
        </div>
      </Row>

      <Row label="G 과학">
        <MinMax min={f.gMin} max={f.gMax} lo={0} hi={100} step={5}
          onMin={(v) => patch({ gMin: v })} onMax={(v) => patch({ gMax: v })} />
      </Row>
      <Row label="E 실행">
        <MinMax min={f.eMin} max={f.eMax} lo={0} hi={100} step={5}
          onMin={(v) => patch({ eMin: v })} onMax={(v) => patch({ eMax: v })} />
      </Row>
      <Row label="T1 임박">
        <MinMax min={f.t1Min} max={f.t1Max} lo={0} hi={4} step={1}
          onMin={(v) => patch({ t1Min: v })} onMax={(v) => patch({ t1Max: v })} />
      </Row>

      <Row label="시총">
        <select
          value={f.mc}
          onChange={(e) => patch({ mc: e.target.value })}
          className="bg-panel-2 text-ink border border-line rounded-md px-2.5 py-1.5 text-[13px]"
        >
          {MC_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </Row>

      <Row label="런웨이(분기)">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="range" min={0} max={12} step={1}
            value={f.runwayMin ?? 0}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              patch({ runwayMin: v === 0 ? null : v });
            }}
            className="w-40 accent-acc"
          />
          <span className="text-[12px] text-ink-2 mono w-20">
            {f.runwayMin == null ? '미적용' : `≥ ${f.runwayMin}Q`}
          </span>
          <label className="text-[12px] text-ink-3 flex items-center gap-1.5">
            <input
              type="checkbox" checked={f.runwayInclNA}
              onChange={(e) => patch({ runwayInclNA: e.target.checked })}
              className="accent-acc"
            />
            미상 포함
          </label>
        </div>
      </Row>

      <Row label="Rerating">
        <div className="flex flex-wrap gap-1.5">
          <Chip active={f.rr.includes('wl')} onClick={() => toggleIn('rr', 'wl')}>
            Primary/Aggressive
          </Chip>
          <Chip active={f.rr.includes('early')} onClick={() => toggleIn('rr', 'early')}>
            Early/Deep Value
          </Chip>
        </div>
      </Row>

      <Row label="Calendar">
        <label className="text-[13px] text-ink-2 flex items-center gap-1.5">
          <input
            type="checkbox" checked={f.inCalOnly}
            onChange={(e) => patch({ inCalOnly: e.target.checked })}
            className="accent-acc"
          />
          Calendar 등록 종목만
        </label>
      </Row>

      <Row label="모달리티">
        <ChipCloud
          options={facetOpts.mod} selected={f.mod}
          onToggle={(v) => toggleIn('mod', v)}
        />
      </Row>

      <Row label="적응증">
        <ChipCloud
          options={facetOpts.area} selected={f.area}
          onToggle={(v) => toggleIn('area', v)}
        />
      </Row>

      <div className="flex items-center justify-between pt-1 border-t border-line">
        <span className="text-[12px] text-ink-4">같은 항목 = OR · 다른 항목 = AND</span>
        <button
          onClick={() => setFilters(clearAllFacets(f))}
          className="text-[12px] text-ink-3 hover:text-ink-2 px-2.5 py-1 rounded-md border border-line"
        >
          필터 전체 해제
        </button>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="text-[12px] text-ink-3 font-semibold w-24 flex-shrink-0">{label}</div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full text-[12px] border transition-colors ${
        active
          ? 'bg-acc/15 border-acc/50 text-ink'
          : 'bg-panel-2 border-line text-ink-3 hover:text-ink-2 hover:border-line-2'
      }`}
    >
      {children}
    </button>
  );
}

function ChipCloud({ options, selected, onToggle }) {
  if (!options.length) return <span className="text-[12px] text-ink-4">데이터 없음</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <Chip key={o.value} active={selected.includes(o.value)} onClick={() => onToggle(o.value)}>
          {o.value} <span className="text-ink-4">{o.count}</span>
        </Chip>
      ))}
    </div>
  );
}

// 최소/최대 듀얼 슬라이더. min > max 가 되지 않게 서로 밀어준다.
function MinMax({ min, max, lo, hi, step, onMin, onMax }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <input
        type="range" min={lo} max={hi} step={step} value={min}
        onChange={(e) => onMin(Math.min(parseInt(e.target.value, 10), max))}
        className="w-32 accent-acc"
      />
      <input
        type="range" min={lo} max={hi} step={step} value={max}
        onChange={(e) => onMax(Math.max(parseInt(e.target.value, 10), min))}
        className="w-32 accent-acc"
      />
      <span className="text-[12px] text-ink-2 mono w-20">{min}–{max}</span>
    </div>
  );
}
