import { useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import screener from '../screener.generated.json';

// ── make_viz.py 상수 1:1 이식 (spec 010 §4.1) ──────────────────────────────
const COLOR = {
  '위대한 후보': '#22c55e',
  '관찰 후보': '#3b82f6',
  무등급: '#6b7280',
  부적격: '#ef4444',
};
const ORDER = ['위대한 후보', '관찰 후보', '무등급', '부적격'];

const rnd = (s) => {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x) - 0.5; // 결정적 jitter
};
const size = (m) => (m ? Math.max(6, Math.min(30, Math.log10(m) * 5)) : 7);
const isWL = (d) => d.wl === 'Primary' || d.wl === 'Aggressive';

const MC_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'micro', label: '$100M 미만' },
  { value: 'small', label: '$100M ~ $1B' },
  { value: 'mid', label: '$1B ~ $10B' },
  { value: 'large', label: '$10B ~ $100B' },
  { value: 'mega', label: '$100B 이상' },
];
function mcBucket(m) {
  if (m == null) return 'na';
  if (m < 100) return 'micro';
  if (m < 1000) return 'small';
  if (m < 10000) return 'mid';
  if (m < 100000) return 'large';
  return 'mega';
}

const AXIS = { gridcolor: '#2c303a', zeroline: false };

function hoverText(d) {
  const rr =
    isWL(d) || (d.rl && d.rl !== 'No Rerating Signal' && d.rl !== '')
      ? `<br>💠 ${d.rl || '—'}${isWL(d) ? ' · ' + d.wl : ''}${d.rt != null ? ' · R ' + d.rt : ''}`
      : '';
  return (
    `<b>${d.t}</b> ${d.c}<br>G ${d.g} · E ${d.e} · T1 ${d.t1}` +
    `<br>시총 ${d.m ? '$' + (d.m / 1000).toFixed(1) + 'B' : '—'} · ${d.grp}<br>다음: ${d.cat}${rr}<extra></extra>`
  );
}

const CAM0 = { eye: { x: 1.5, y: -1.5, z: 0.9 } };

export default function Screener({ onOpenCompany }) {
  const points = useMemo(
    () => screener.points.map((p, i) => ({ ...p, _i: i })),
    []
  );
  const [mc, setMc] = useState('all');
  const [zmode, setZmode] = useState('t1');
  const [selected, setSelected] = useState(null);
  const [plotly, setPlotly] = useState(null);
  const [loadError, setLoadError] = useState(false);

  const p3dRef = useRef(null);
  const p2dRef = useRef(null);

  // Plotly lazy-load (스크리너 진입 시에만, spec 010 §4.2)
  useEffect(() => {
    let alive = true;
    import('plotly.js-dist-min')
      .then((mod) => {
        if (alive) setPlotly(mod.default || mod);
      })
      .catch(() => {
        if (alive) setLoadError(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const mcapPass = useMemo(() => (d) => mc === 'all' || mcBucket(d.m) === mc, [mc]);
  const visible = useMemo(() => points.filter(mcapPass), [points, mcapPass]);

  // ── 3D ──
  useEffect(() => {
    if (!plotly || !p3dRef.current) return;
    const traces = ORDER.map((grp) => {
      const pts = points.filter((d) => d.grp === grp && mcapPass(d));
      const z = pts.map((d, i) =>
        zmode === 't1'
          ? d.t1 + rnd(d.g * 7 + i) * 0.22
          : (d.m ? Math.log10(d.m) : 1.5) + rnd(d.g + i) * 0.05
      );
      return {
        type: 'scatter3d',
        mode: 'markers',
        name: `${grp} (${pts.length})`,
        x: pts.map((d, i) => d.g + rnd(d.g * 3 + i) * 0.6),
        y: pts.map((d, i) => d.e + rnd(d.e * 5 + i) * 0.6),
        z,
        customdata: pts.map((d) => d._i),
        text: pts.map(hoverText),
        hovertemplate: '%{text}',
        marker: {
          size: pts.map((d) => size(d.m) + (isWL(d) ? 5 : 0)),
          color: COLOR[grp],
          opacity: 0.82,
          line: { width: 0.5, color: '#0b0c0f' },
        },
      };
    });
    const layout = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#e6e8eb' },
      showlegend: true,
      legend: { x: 0, y: 1, bgcolor: 'rgba(0,0,0,0)' },
      margin: { l: 0, r: 0, t: 6, b: 0 },
      scene: {
        camera: CAM0,
        xaxis: { title: 'G 과학', range: [0, 103], backgroundcolor: 'rgba(0,0,0,0)', showbackground: true, ...AXIS },
        yaxis: { title: 'E 실행', range: [0, 103], backgroundcolor: 'rgba(0,0,0,0)', showbackground: true, ...AXIS },
        zaxis: { title: zmode === 't1' ? 'T1 임박도' : '시총(로그)', backgroundcolor: 'rgba(0,0,0,0)', showbackground: true, ...AXIS },
      },
    };
    plotly.react(p3dRef.current, traces, layout, { responsive: true, displaylogo: false });
  }, [plotly, points, mcapPass, zmode]);

  // ── 2D 사분면 ──
  useEffect(() => {
    if (!plotly || !p2dRef.current) return;
    const traces = ORDER.map((grp) => {
      const pts = points.filter((d) => d.grp === grp && mcapPass(d));
      return {
        type: 'scatter',
        mode: 'markers',
        name: `${grp} (${pts.length})`,
        x: pts.map((d, i) => d.g + rnd(d.g * 3 + i) * 0.5),
        y: pts.map((d, i) => d.e + rnd(d.e * 5 + i) * 0.5),
        customdata: pts.map((d) => d._i),
        text: pts.map(hoverText),
        hovertemplate: '%{text}',
        marker: {
          size: pts.map((d) => Math.max(7, size(d.m) * 0.9) + (isWL(d) ? 3 : 0)),
          color: COLOR[grp],
          opacity: 0.8,
          line: {
            width: pts.map((d) => (isWL(d) ? 2.5 : 0.5)),
            color: pts.map((d) => (isWL(d) ? '#f5c518' : '#0b0c0f')),
          },
        },
      };
    });
    const layout = {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#e6e8eb' },
      margin: { l: 55, r: 20, t: 8, b: 50 },
      legend: { x: 0.01, y: 0.99, bgcolor: 'rgba(20,22,27,0.6)' },
      xaxis: { title: 'G — 과학적 위대함', range: [0, 103], gridcolor: '#23262e', zeroline: false },
      yaxis: { title: 'E — 실행/번역 능력', range: [0, 103], gridcolor: '#23262e', zeroline: false },
      shapes: [
        { type: 'rect', x0: 70, x1: 103, y0: 70, y1: 103, fillcolor: 'rgba(34,197,94,0.10)', line: { width: 0 } },
        { type: 'line', x0: 70, x1: 70, y0: 0, y1: 103, line: { color: '#3a3f4b', dash: 'dash', width: 1 } },
        { type: 'line', x0: 0, x1: 103, y0: 70, y1: 70, line: { color: '#3a3f4b', dash: 'dash', width: 1 } },
        { type: 'line', x0: 60, x1: 60, y0: 0, y1: 103, line: { color: '#2c303a', dash: 'dot', width: 1 } },
        { type: 'line', x0: 0, x1: 103, y0: 60, y1: 60, line: { color: '#2c303a', dash: 'dot', width: 1 } },
      ],
      annotations: [
        { x: 86, y: 101, text: '⭐ 위대한 후보 (G·E ≥70)', showarrow: false, font: { color: '#22c55e', size: 12 } },
        { x: 20, y: 101, text: '실행 좋음 / 과학 약함', showarrow: false, font: { color: '#6b7280', size: 11 } },
        { x: 101, y: 18, text: '과학 좋음 / 실행 리스크', showarrow: false, font: { color: '#6b7280', size: 11 }, xanchor: 'right' },
      ],
    };
    plotly.react(p2dRef.current, traces, layout, { responsive: true, displaylogo: false });
  }, [plotly, points, mcapPass]);

  // ── 클릭 → 선택 패널 (spec 010 §4.3) ──
  useEffect(() => {
    if (!plotly) return;
    const handler = (ev) => {
      const cd = ev?.points?.[0]?.customdata;
      if (cd == null) return;
      setSelected(points[cd] || null);
    };
    const els = [p3dRef.current, p2dRef.current].filter(Boolean);
    els.forEach((el) => el.on && el.on('plotly_click', handler));
    return () => {
      els.forEach((el) => el.removeAllListeners && el.removeAllListeners('plotly_click'));
    };
  }, [plotly, points]);

  // 언마운트 시 Plotly 정리
  useEffect(() => {
    const a = p3dRef.current;
    const b = p2dRef.current;
    return () => {
      if (plotly) {
        if (a) plotly.purge(a);
        if (b) plotly.purge(b);
      }
    };
  }, [plotly]);

  const resetCam = () => {
    if (plotly && p3dRef.current) plotly.relayout(p3dRef.current, { 'scene.camera': CAM0 });
  };

  const rrActive = useMemo(() => {
    const a = points.filter(
      (d) =>
        d.wl === 'Primary' ||
        d.wl === 'Aggressive' ||
        d.rl === 'Early Rerating Candidate' ||
        d.rl === 'Deep Value Watch'
    );
    a.sort((x, y) => (y.rt ?? -1) - (x.rt ?? -1));
    return a;
  }, [points]);

  if (!screener.points.length) {
    return (
      <div className="panel p-8 text-center text-ink-3 text-sm">
        스크리너 데이터가 비어 있습니다. 로컬에서 <code className="mono">npm run build-screener</code> 실행 후 다시 빌드하세요.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Header counts={screener.counts} coverage={screener.coverage} generated={screener.generated} />

      {loadError && (
        <div className="panel p-4 text-sm text-danger">
          차트 라이브러리를 불러오지 못했습니다. 네트워크를 확인하고 새로고침하세요.
        </div>
      )}

      {/* 시총 구간 필터 */}
      <div className="panel p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-[13px] text-ink-2 font-semibold">시총 구간 필터</label>
          <select
            value={mc}
            onChange={(e) => setMc(e.target.value)}
            className="bg-panel-2 text-ink border border-line rounded-md px-2.5 py-1.5 text-[13px]"
          >
            {MC_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="text-[12px] text-ink-3">
            표시 중: {visible.length}개 / 전체 {points.length}개
          </span>
        </div>
        <div className="text-[12px] text-ink-4 mt-2">
          선택 구간의 기업만 ①·② 차트에 표시됩니다. (시총 미상은 ‘전체’에서만 표시)
        </div>
      </div>

      {/* 선택 패널 — 차트 위 sticky 로 고정해 어느 차트를 클릭해도 바로 보이게 */}
      <div className="sticky top-[78px] z-10">
        <SelectionPanel selected={selected} onOpenCompany={onOpenCompany} onClear={() => setSelected(null)} />
      </div>

      {/* ① 3D */}
      <div className="panel p-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <h2 className="text-[15px] font-bold text-ink">① 3D 산점도 — G × E × T1</h2>
          <div className="flex items-center gap-2">
            <label className="text-[12px] text-ink-3">높이(Z)축</label>
            <select
              value={zmode}
              onChange={(e) => setZmode(e.target.value)}
              className="bg-panel-2 text-ink border border-line rounded-md px-2 py-1 text-[12px]"
            >
              <option value="t1">T1 임박도 (0~4)</option>
              <option value="mlog">시총(로그)</option>
            </select>
            <button onClick={resetCam} className="btn btn-icon" title="시점 초기화">
              <RotateCcw className="w-4 h-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>
        <div className="text-[12px] text-ink-4 mb-2">
          드래그=회전 · 휠=확대 · 점 클릭=상세. ★ 우상단 위로 갈수록 과학·실행 강하고 카탈리스트 임박.
        </div>
        <ChartHost ready={!!plotly} refEl={p3dRef} height={620} />
      </div>

      {/* ② 2D */}
      <div className="panel p-4">
        <h2 className="text-[15px] font-bold text-ink mb-1">② G×E 매트릭스 (2D 사분면)</h2>
        <div className="text-[12px] text-ink-4 mb-2">
          초록 영역 = 위대한 후보(G·E ≥70). 점선 = 60/70 컷. 점 클릭 시 아래 상세 패널에 표시됩니다.
        </div>
        <ChartHost ready={!!plotly} refEl={p2dRef} height={600} />
      </div>

      {/* ③ Rerating */}
      <div className="panel p-4">
        <h2 className="text-[15px] font-bold text-ink mb-1">
          ③ 💠 Rerating 관심종목 <span className="text-ink-3 font-normal text-[13px]">— {rrActive.length}종</span>
        </h2>
        <div className="text-[12px] text-ink-4 mb-3">
          저점권 고품질주 조기 편입 보조 레이어. <b>Primary</b> = 위대한 후보 + Early/Deep Value · <b>Aggressive</b> = min(G,E)≥65 + 강촉매. <b>자동 매수신호 아님 — 검토 우선순위.</b>
        </div>
        <ReratingTable rows={rrActive} onOpenCompany={onOpenCompany} />
      </div>
    </div>
  );
}

function Header({ counts, coverage, generated }) {
  const date = (generated || '').slice(0, 10);
  const order = ['위대한 후보', '관찰 후보', '무등급', '부적격'];
  return (
    <div>
      <h1 className="text-[22px] font-bold tracking-[-0.02em] text-ink">🧬 Great Biotech Screener</h1>
      <p className="text-[13px] text-ink-3 mt-1.5 leading-relaxed max-w-3xl">
        <b className="text-ink-2">G</b> 과학적 위대함 · <b className="text-ink-2">E</b> 실행/번역 능력 · <b className="text-ink-2">T1</b> 임박도 ·
        점 크기 = 시총 · 색 = 등급. 노란 테두리 = Rerating watchlist.
      </p>
      <div className="flex items-center gap-2 flex-wrap mt-3 text-[12px]">
        {order
          .filter((k) => counts[k])
          .map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-panel-2 border border-line">
              <span className="w-2 h-2 rounded-full" style={{ background: COLOR[k] }} />
              <span className="text-ink-2">{k}</span>
              <span className="num font-semibold text-ink">{counts[k]}</span>
            </span>
          ))}
        <span className="text-ink-4 ml-1">
          · {coverage?.total ?? 0}종 · Calendar 연동 {coverage?.inCalendar ?? 0}종 · {date}
        </span>
      </div>
    </div>
  );
}

function ChartHost({ ready, refEl, height }) {
  return (
    <div className="relative w-full" style={{ height }}>
      <div ref={refEl} className="w-full h-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-ink-3 text-sm">
          <span className="inline-block w-4 h-4 mr-2.5 rounded-full border-2 border-ink-4 border-t-transparent animate-spin" />
          차트 불러오는 중…
        </div>
      )}
    </div>
  );
}

function SelectionPanel({ selected, onOpenCompany, onClear }) {
  if (!selected) {
    return (
      <div className="panel px-3.5 py-2 text-[12px] text-ink-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-ink-4" />
        차트의 점을 클릭하면 여기에 종목 상세가 표시됩니다.
      </div>
    );
  }
  const d = selected;
  return (
    <div className="panel p-4 ring-1 ring-acc/40 shadow-lg">
      <div className="flex items-start gap-3 flex-wrap">
        <span className="w-2.5 h-2.5 rounded-full mt-2" style={{ background: COLOR[d.grp] }} />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="mono text-[17px] font-extrabold text-ink">{d.t}</span>
            <span className="text-[14px] text-ink-2 truncate">{d.c}</span>
            <span className="text-[11px] text-ink-4">{d.grp}</span>
          </div>
          <div className="text-[12.5px] text-ink-3 mt-1">
            G <b className="text-ink">{d.g}</b> · E <b className="text-ink">{d.e}</b> · T1 {d.t1} · 시총{' '}
            {d.m ? '$' + (d.m / 1000).toFixed(1) + 'B' : '—'}
          </div>
          {(isWL(d) || (d.rl && d.rl !== 'No Rerating Signal')) && (
            <div className="text-[12px] text-ink-3 mt-1">
              💠 {d.rl || '—'}
              {isWL(d) ? ` · ${d.wl}` : ''}
              {d.rt != null ? ` · R ${d.rt}` : ''}
            </div>
          )}
          <div className="text-[12px] text-ink-4 mt-1">다음: {d.cat}</div>
        </div>
        <div className="flex items-center gap-2">
          {d.inCalendar ? (
            <button
              onClick={() => onOpenCompany(d.t)}
              className="h-9 px-3.5 rounded-md bg-ink text-bg text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              상세정보 보기 →
            </button>
          ) : (
            <span
              className="h-9 px-3 rounded-md border border-line text-ink-4 text-[12px] flex items-center cursor-not-allowed"
              title="Calendar 미등록 종목 — 스크리너 지표만 제공"
            >
              Calendar 미등록
            </span>
          )}
          <button onClick={onClear} className="btn btn-icon" title="선택 해제">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function ReratingTable({ rows, onOpenCompany }) {
  if (!rows.length) {
    return <div className="text-[13px] text-ink-3">현재 활성 Rerating 관심종목 없음.</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-ink-3 text-left border-b border-line">
            <th className="py-2 pr-3 font-semibold">종목</th>
            <th className="py-2 pr-3 font-semibold">회사</th>
            <th className="py-2 pr-3 font-semibold">G/E</th>
            <th className="py-2 pr-3 font-semibold">Rerating 라벨</th>
            <th className="py-2 pr-3 font-semibold">watchlist</th>
            <th className="py-2 pr-1 font-semibold text-right">R_total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.t} className="border-b border-[var(--hairline)] hover:bg-white/[0.03]">
              <td className="py-2 pr-3">
                {d.inCalendar ? (
                  <button onClick={() => onOpenCompany(d.t)} className="mono font-bold text-ink hover:text-acc">
                    {d.t}
                  </button>
                ) : (
                  <span className="mono font-bold text-ink">{d.t}</span>
                )}
              </td>
              <td className="py-2 pr-3 text-ink-2 truncate max-w-[220px]">{d.c}</td>
              <td className="py-2 pr-3 num text-ink">{d.g}/{d.e}</td>
              <td className="py-2 pr-3 text-ink-2">{d.rl || '—'}</td>
              <td className="py-2 pr-3">
                {d.wl === 'Primary' || d.wl === 'Aggressive' ? (
                  <span className="text-[#22c55e] font-semibold">{d.wl}</span>
                ) : (
                  '—'
                )}
              </td>
              <td className="py-2 pr-1 num text-right text-ink">{d.rt != null ? d.rt : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
