import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { isWatchlist as isWL } from '../../utils/screenerFilters';
import { COLOR } from './screenerFormat';

// ── make_viz.py 상수 1:1 이식 (spec 010 §4.1, 기존 Screener.jsx 에서 이관) ──
const ORDER = ['위대한 후보', '관찰 후보', '무등급', '부적격'];

const rnd = (s) => {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x) - 0.5; // 결정적 jitter
};
const size = (m) => (m ? Math.max(6, Math.min(30, Math.log10(m) * 5)) : 7);
const AXIS = { gridcolor: '#2c303a', zeroline: false };
const CAM0 = { eye: { x: 1.5, y: -1.5, z: 0.9 } };

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

// 필터 적용된 points 를 받아 3D/2D 산점도를 그린다. 시각 동작은 기존과 동일.
// props: points(필터본) · chart({type,z}) · onChartChange(patch) · onSelect(point)
export default function ScreenerChart({ points, chart, onChartChange, onSelect }) {
  const [plotly, setPlotly] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const p3dRef = useRef(null);
  const p2dRef = useRef(null);
  const zmode = chart.z;
  const type = chart.type;

  // Plotly lazy-load (스크리너 진입 시에만, spec 010 §4.2)
  useEffect(() => {
    let alive = true;
    import('plotly.js-dist-min')
      .then((mod) => {
        const P = mod.default || mod;
        // dev 첫 진입 시 plotly 가 사전번들 제외(vite.config optimizeDeps.exclude)라
        // on-demand 최적화 중 빈 모듈이 잠시 반환될 수 있음 → .react 없으면 set 하지 않고
        // Vite 의 자동 full-reload 후 재시도(빈 모듈에 draw 호출 시 페이지 크래시 방지).
        if (alive && P && typeof P.react === 'function') setPlotly(P);
      })
      .catch(() => {
        if (alive) setLoadError(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  // ── 3D ──
  useEffect(() => {
    if (!plotly || type !== '3d' || !p3dRef.current) return;
    const traces = ORDER.map((grp) => {
      const pts = points.filter((d) => d.grp === grp);
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
  }, [plotly, points, zmode, type]);

  // ── 2D 사분면 ──
  useEffect(() => {
    if (!plotly || type !== '2d' || !p2dRef.current) return;
    const traces = ORDER.map((grp) => {
      const pts = points.filter((d) => d.grp === grp);
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
  }, [plotly, points, type]);

  // ── 클릭 → 선택 (spec 010 §4.3) ──
  useEffect(() => {
    if (!plotly) return;
    const handler = (ev) => {
      const cd = ev?.points?.[0]?.customdata;
      if (cd == null) return;
      const found = points.find((p) => p._i === cd);
      if (found) onSelect(found);
    };
    const els = [p3dRef.current, p2dRef.current].filter(Boolean);
    els.forEach((el) => el.on && el.on('plotly_click', handler));
    return () => {
      els.forEach((el) => el.removeAllListeners && el.removeAllListeners('plotly_click'));
    };
  }, [plotly, points, onSelect]);

  // 언마운트/타입전환 시 정리
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

  if (loadError) {
    return (
      <div className="panel p-4 text-sm text-danger">
        차트 라이브러리를 불러오지 못했습니다. 네트워크를 확인하고 새로고침하세요.
      </div>
    );
  }

  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
        <div className="inline-flex rounded-md border border-line overflow-hidden">
          <ChartTab active={type === '3d'} onClick={() => onChartChange({ type: '3d' })}>
            3D · G×E×{zmode === 't1' ? 'T1' : '시총'}
          </ChartTab>
          <ChartTab active={type === '2d'} onClick={() => onChartChange({ type: '2d' })}>
            2D 사분면
          </ChartTab>
        </div>
        {type === '3d' && (
          <div className="flex items-center gap-2">
            <label className="text-[12px] text-ink-3">높이(Z)축</label>
            <select
              value={zmode}
              onChange={(e) => onChartChange({ z: e.target.value })}
              className="bg-panel-2 text-ink border border-line rounded-md px-2 py-1 text-[12px]"
            >
              <option value="t1">T1 임박도 (0~4)</option>
              <option value="mlog">시총(로그)</option>
            </select>
            <button onClick={resetCam} className="btn btn-icon" title="시점 초기화">
              <RotateCcw className="w-4 h-4" strokeWidth={1.6} />
            </button>
          </div>
        )}
      </div>
      <div className="text-[12px] text-ink-4 mb-2">
        {type === '3d'
          ? '드래그=회전 · 휠=확대 · 점 클릭=상세. ★ 우상단 위로 갈수록 과학·실행 강하고 카탈리스트 임박.'
          : '초록 영역 = 위대한 후보(G·E ≥70). 점선 = 60/70 컷. 노란 테두리 = Rerating watchlist. 점 클릭=상세.'}
      </div>
      {/* 두 컨테이너 모두 마운트 유지(purge 충돌 방지), 비활성은 숨김 */}
      <div style={{ display: type === '3d' ? 'block' : 'none' }}>
        <ChartHost ready={!!plotly} refEl={p3dRef} height={620} />
      </div>
      <div style={{ display: type === '2d' ? 'block' : 'none' }}>
        <ChartHost ready={!!plotly} refEl={p2dRef} height={600} />
      </div>
    </div>
  );
}

function ChartTab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[12px] font-semibold transition-colors ${
        active ? 'bg-ink text-bg' : 'bg-panel-2 text-ink-3 hover:text-ink-2'
      }`}
    >
      {children}
    </button>
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
