// build-screener-charts.mjs
// 스크리너 발표(블로그·텔레그램)용 차트 이미지 export 도구.
//
// src/screener.generated.json + 인라인 Plotly로 ① G×E×T1 3D 산점도 와
// ② G×E 2D 사분면을, 실제 /app/screener 페이지(src/pages/Screener.jsx)와
// 1:1 동일한 trace 로직으로 그리는 "자체완결 HTML"을 만든다.
//
// 헤드리스 샌드박스에서는 WebGL(3D)을 PNG로 직접 못 뽑으므로, 사용자가
// 브라우저에서 열어 [PNG 다운로드] 버튼으로 고해상도 이미지를 받는 방식.
// Plotly·데이터·로직 전부 인라인 → 오프라인/네트워크 정책 무관하게 동작.
//
// 출력: data/imports/screener-charts.html  (생성물, 커밋 X)

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const screener = JSON.parse(
  readFileSync(resolve(ROOT, 'src/screener.generated.json'), 'utf8')
);
const plotlySrc = readFileSync(
  resolve(ROOT, 'node_modules/plotly.js-dist-min/plotly.min.js'),
  'utf8'
);

const outDir = resolve(ROOT, 'data/imports');
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, 'screener-charts.html');

// ── 브라우저에서 실행될 차트 로직 (Screener.jsx 상수·trace 1:1 이식) ──
// 공유용 튜닝: 배경 불투명 다크(#0b0c0f), toImage scale 2 고해상도.
const clientScript = `
const screener = window.__SCREENER__;
const points = screener.points.map((p, i) => ({ ...p, _i: i }));

const COLOR = { '위대한 후보':'#22c55e','관찰 후보':'#3b82f6','무등급':'#6b7280','부적격':'#ef4444' };
const ORDER = ['위대한 후보','관찰 후보','무등급','부적격'];
const rnd = (s) => { const x = Math.sin(s) * 10000; return x - Math.floor(x) - 0.5; };
const size = (m) => (m ? Math.max(6, Math.min(30, Math.log10(m) * 5)) : 7);
const isWL = (d) => d.wl === 'Primary' || d.wl === 'Aggressive';
const AXIS = { gridcolor:'#2c303a', zeroline:false };
const BG = '#0b0c0f';

function hoverText(d) {
  const rr = isWL(d) || (d.rl && d.rl !== 'No Rerating Signal' && d.rl !== '')
    ? '<br>💠 ' + (d.rl || '—') + (isWL(d) ? ' · ' + d.wl : '') + (d.rt != null ? ' · R ' + d.rt : '')
    : '';
  return '<b>' + d.t + '</b> ' + d.c + '<br>G ' + d.g + ' · E ' + d.e + ' · T1 ' + d.t1 +
    '<br>시총 ' + (d.m ? '$' + (d.m / 1000).toFixed(1) + 'B' : '—') + ' · ' + d.grp +
    '<br>다음: ' + d.cat + rr + '<extra></extra>';
}
const CAM0 = { eye: { x: 1.5, y: -1.5, z: 0.9 } };

// ── ① 3D ──
function render3D(el) {
  const traces = ORDER.map((grp) => {
    const pts = points.filter((d) => d.grp === grp);
    return {
      type:'scatter3d', mode:'markers', name: grp + ' (' + pts.length + ')',
      x: pts.map((d,i)=> d.g + rnd(d.g*3+i)*0.6),
      y: pts.map((d,i)=> d.e + rnd(d.e*5+i)*0.6),
      z: pts.map((d,i)=> d.t1 + rnd(d.g*7+i)*0.22),
      text: pts.map(hoverText), hovertemplate:'%{text}',
      marker:{ size: pts.map((d)=> size(d.m) + (isWL(d)?5:0)), color: COLOR[grp],
        opacity:0.82, line:{ width:0.5, color:'#0b0c0f' } },
    };
  });
  const layout = {
    paper_bgcolor: BG, font:{ color:'#e6e8eb' }, showlegend:true,
    legend:{ x:0, y:1, bgcolor:'rgba(0,0,0,0)', font:{ size:14 } },
    margin:{ l:0, r:0, t:6, b:0 },
    scene:{ camera: CAM0,
      xaxis:{ title:'G 과학', range:[0,103], backgroundcolor:BG, showbackground:true, ...AXIS },
      yaxis:{ title:'E 실행', range:[0,103], backgroundcolor:BG, showbackground:true, ...AXIS },
      zaxis:{ title:'T1 임박도', backgroundcolor:BG, showbackground:true, ...AXIS } },
  };
  return Plotly.newPlot(el, traces, layout, { responsive:true, displaylogo:false });
}

// ── ② 2D 사분면 ──
function render2D(el) {
  const traces = ORDER.map((grp) => {
    const pts = points.filter((d) => d.grp === grp);
    return {
      type:'scatter', mode:'markers', name: grp + ' (' + pts.length + ')',
      x: pts.map((d,i)=> d.g + rnd(d.g*3+i)*0.5),
      y: pts.map((d,i)=> d.e + rnd(d.e*5+i)*0.5),
      text: pts.map(hoverText), hovertemplate:'%{text}',
      marker:{ size: pts.map((d)=> Math.max(7, size(d.m)*0.9) + (isWL(d)?3:0)), color: COLOR[grp],
        opacity:0.8, line:{ width: pts.map((d)=> isWL(d)?2.5:0.5), color: pts.map((d)=> isWL(d)?'#f5c518':'#0b0c0f') } },
    };
  });
  const layout = {
    paper_bgcolor: BG, plot_bgcolor: BG, font:{ color:'#e6e8eb' },
    margin:{ l:60, r:24, t:10, b:54 },
    legend:{ x:0.01, y:0.99, bgcolor:'rgba(20,22,27,0.6)', font:{ size:13 } },
    xaxis:{ title:'G — 과학적 위대함', range:[0,103], gridcolor:'#23262e', zeroline:false },
    yaxis:{ title:'E — 실행/번역 능력', range:[0,103], gridcolor:'#23262e', zeroline:false },
    shapes:[
      { type:'rect', x0:70, x1:103, y0:70, y1:103, fillcolor:'rgba(34,197,94,0.10)', line:{ width:0 } },
      { type:'line', x0:70, x1:70, y0:0, y1:103, line:{ color:'#3a3f4b', dash:'dash', width:1 } },
      { type:'line', x0:0, x1:103, y0:70, y1:70, line:{ color:'#3a3f4b', dash:'dash', width:1 } },
      { type:'line', x0:60, x1:60, y0:0, y1:103, line:{ color:'#2c303a', dash:'dot', width:1 } },
      { type:'line', x0:0, x1:103, y0:60, y1:60, line:{ color:'#2c303a', dash:'dot', width:1 } },
    ],
    annotations:[
      { x:86, y:101, text:'⭐ 위대한 후보 (G·E ≥70)', showarrow:false, font:{ color:'#22c55e', size:13 } },
      { x:20, y:101, text:'실행 좋음 / 과학 약함', showarrow:false, font:{ color:'#6b7280', size:12 } },
      { x:101, y:18, text:'과학 좋음 / 실행 리스크', showarrow:false, font:{ color:'#6b7280', size:12 }, xanchor:'right' },
    ],
  };
  return Plotly.newPlot(el, traces, layout, { responsive:true, displaylogo:false });
}

const el3d = document.getElementById('c3d');
const el2d = document.getElementById('c2d');
render3D(el3d);
render2D(el2d);

function dl(el, filename, w, h) {
  return Plotly.downloadImage(el, { format:'png', width:w, height:h, scale:2, filename });
}
document.getElementById('dl3d').onclick = () => dl(el3d, 'screener-3d', 1600, 1000);
document.getElementById('dl2d').onclick = () => dl(el2d, 'screener-2d', 1400, 1000);
document.getElementById('dlall').onclick = async () => {
  await dl(el3d, 'screener-3d', 1600, 1000);
  setTimeout(() => dl(el2d, 'screener-2d', 1400, 1000), 800);
};
`;

const counts = screener.counts || {};
const cov = screener.coverage || {};
const date = (screener.generated || '').slice(0, 10);
const ORDER = ['위대한 후보', '관찰 후보', '무등급', '부적격'];

const html = `<!doctype html>
<html lang="ko"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Great Biotech Screener — 차트 이미지 export</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; background:#070809; color:#e6e8eb;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Apple SD Gothic Neo','Malgun Gothic',sans-serif; }
  .wrap { max-width:1180px; margin:0 auto; padding:24px 20px 80px; }
  h1 { font-size:22px; margin:0 0 4px; letter-spacing:-0.02em; }
  .sub { color:#9aa0aa; font-size:13px; margin:0 0 18px; }
  .bar { display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin:14px 0 6px;
    padding:12px 14px; background:#101216; border:1px solid #23262e; border-radius:10px; }
  .bar b { font-size:13px; }
  .pill { display:inline-flex; align-items:center; gap:6px; padding:4px 9px; border-radius:7px;
    background:#161922; border:1px solid #23262e; font-size:12px; }
  .dot { width:9px; height:9px; border-radius:50%; display:inline-block; }
  .btns { display:flex; gap:10px; flex-wrap:wrap; margin:16px 0 8px; }
  button { background:#e6e8eb; color:#0b0c0f; border:0; border-radius:8px; padding:10px 16px;
    font-size:14px; font-weight:700; cursor:pointer; }
  button.ghost { background:#161922; color:#e6e8eb; border:1px solid #2c303a; }
  .card { background:#0b0c0f; border:1px solid #23262e; border-radius:12px; padding:14px; margin:14px 0; }
  .card h2 { font-size:15px; margin:0 0 4px; }
  .card .hint { color:#7d828c; font-size:12px; margin:0 0 8px; }
  .chart { width:100%; }
  #c3d { height:640px; } #c2d { height:620px; }
  .note { color:#7d828c; font-size:12.5px; line-height:1.6; margin-top:8px; }
</style></head>
<body><div class="wrap">
  <h1>🧬 Great Biotech Screener — 차트 이미지 export</h1>
  <p class="sub">실제 <code>/app/screener</code> 페이지와 동일한 차트입니다. 아래 버튼으로 고해상도 PNG를 받아 블로그·텔레그램에 첨부하세요. (데이터 기준일 ${date})</p>

  <div class="bar">
    ${ORDER.filter((k) => counts[k])
      .map(
        (k) =>
          `<span class="pill"><span class="dot" style="background:${
            { '위대한 후보': '#22c55e', '관찰 후보': '#3b82f6', 무등급: '#6b7280', 부적격: '#ef4444' }[k]
          }"></span>${k} <b>${counts[k]}</b></span>`
      )
      .join('')}
    <span class="pill">plotted <b>${cov.total ?? 0}</b></span>
    <span class="pill">Calendar 연동 <b>${cov.inCalendar ?? 0}</b></span>
  </div>

  <div class="btns">
    <button id="dlall">⬇ 3D · 2D 둘 다 다운로드</button>
    <button class="ghost" id="dl3d">① 3D PNG</button>
    <button class="ghost" id="dl2d">② 2D PNG</button>
  </div>
  <p class="note">버튼이 안 먹으면 차트 우상단 카메라 아이콘(📷)으로도 PNG를 받을 수 있습니다. 3D는 드래그로 각도를 맞춘 뒤 받으세요.</p>

  <div class="card">
    <h2>① 3D 산점도 — G × E × T1</h2>
    <p class="hint">우상단 위로 갈수록 과학·실행 강하고 카탈리스트 임박. 점 크기 = 시총 · 색 = 등급 · 노란 테두리 = Rerating watchlist.</p>
    <div id="c3d" class="chart"></div>
  </div>

  <div class="card">
    <h2>② G×E 매트릭스 (2D 사분면)</h2>
    <p class="hint">초록 영역(G·E ≥70) = 위대한 후보. 점선 = 60/70 컷.</p>
    <div id="c2d" class="chart"></div>
  </div>
</div>
<script>${plotlySrc}</script>
<script>window.__SCREENER__ = ${JSON.stringify(screener)};</script>
<script>${clientScript}</script>
</body></html>`;

writeFileSync(outPath, html, 'utf8');
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`✓ ${outPath} (${kb} KB)`);
console.log(
  `  등급: 위대 ${counts['위대한 후보'] ?? 0} · 관찰 ${counts['관찰 후보'] ?? 0} · 무등급 ${
    counts['무등급'] ?? 0
  } · 부적격 ${counts['부적격'] ?? 0} / plotted ${cov.total ?? 0} · 연동 ${cov.inCalendar ?? 0} · 기준 ${date}`
);
console.log('  → 브라우저에서 열어 [다운로드] 버튼으로 PNG 2장을 받으세요.');
