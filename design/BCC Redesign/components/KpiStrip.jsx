function KpiStrip() {
  const data = window.BCC_DATA || {};
  const cats = data.catalysts || [];
  const today = TODAY;
  const within = (n) => cats.filter(c => { const d = dDelta(c.date); return d >= 0 && d <= n; });
  const past = (n) => cats.filter(c => { const d = dDelta(c.date); return d < 0 && d >= -n; });
  const byType = (t) => cats.filter(c => c.type === t);

  const kpis = [
    { label: '7일 이내', sub: 'this week · D-7', value: within(7).length, total: cats.length, accent: '#F87171', spark:[2,3,1,4,2,5,3] },
    { label: '30일 이내', sub: 'next 30d', value: within(30).length, total: cats.length, accent: '#FBBF24', spark:[1,2,2,3,4,3,5,4,3,4] },
    { label: 'PDUFA 대기', sub: 'fda decisions', value: byType('PDUFA').length, total: cats.length, accent: '#FBBF24', spark:[1,1,2,1,2,1,2] },
    { label: '임상 readout', sub: 'clinical readouts', value: byType('Clinical Readout').length, total: cats.length, accent: '#C084FC', spark:[2,1,3,2,4,3,2] },
    { label: '학회 발표', sub: 'conference talks', value: byType('Conference').length, total: cats.length, accent: '#60A5FA', spark:[1,2,1,3,2,1,2] },
  ];

  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14, marginBottom:24}}>
      {kpis.map((k,i)=>(
        <div key={i} className="kpi" style={{'--accent-color': k.accent}}>
          <div className="row" style={{justifyContent:'space-between'}}>
            <span className="kpi-label">{k.label}</span>
            <span className="spark" style={{height:18}}>
              {k.spark.map((v,j)=>(
                <span key={j} style={{
                  height: `${Math.max(3, v*4)}px`,
                  background: j === k.spark.length-1 ? k.accent : 'var(--ink-4)',
                  opacity: j === k.spark.length-1 ? 1 : 0.5,
                }}/>
              ))}
            </span>
          </div>
          <div className="row" style={{justifyContent:'space-between', alignItems:'baseline'}}>
            <span className="kpi-value">{k.value}</span>
            <span className="num" style={{fontSize:11, color:'var(--ink-3)'}}>/ {k.total}</span>
          </div>
          <div className="kpi-sub">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}

window.KpiStrip = KpiStrip;
