// Pipeline-by-modality + therapy area distribution
function Pipeline() {
  const data = window.BCC_DATA || {};
  const companies = data.companies || [];

  // Modality distribution
  const modCounts = {};
  companies.forEach(c => { modCounts[c.modality] = (modCounts[c.modality] || 0) + 1; });
  const modalities = Object.entries(modCounts).sort((a,b)=>b[1]-a[1]);
  const modTotal = companies.length;

  // Therapy area
  const areaCounts = {};
  companies.forEach(c => (c.areas||[]).forEach(a => { areaCounts[a] = (areaCounts[a]||0)+1; }));
  const areas = Object.entries(areaCounts).sort((a,b)=>b[1]-a[1]);
  const areaTotal = areas.reduce((s,[,v])=>s+v, 0);

  // recommendation breakdown
  const recCounts = { 'Core Holding': 0, 'Worth Monitoring': 0, 'Speculative': 0 };
  companies.forEach(c => { if (c.recommendation in recCounts) recCounts[c.recommendation]++; });
  const recTotal = companies.length;

  const modColor = (m) => ({
    'Small Molecule': '#6EE7B7',
    'Antibody': '#60A5FA',
    'mRNA': '#C084FC',
    'Peptide': '#34D399',
    'Gene Therapy': '#F472B6',
    'Gene Editing': '#FBBF24',
    'siRNA': '#22D3EE',
    'ASO': '#A78BFA',
  }[m] || '#64748B');

  const areaColor = (i) => ['#6EE7B7','#60A5FA','#C084FC','#FBBF24','#F472B6','#22D3EE','#A78BFA','#34D399'][i % 8];

  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:24}}>
      {/* Recommendation rings (donut SVG) */}
      <div className="panel" style={pipelineStyles.card}>
        <div className="section-h">
          <h2>포트폴리오 등급</h2>
          <span className="meta">{recTotal} CO.</span>
        </div>
        <div style={{display:'flex', gap:24, alignItems:'center'}}>
          <RecDonut data={recCounts} total={recTotal}/>
          <div style={{display:'flex', flexDirection:'column', gap:10, flex:1}}>
            {Object.entries(recCounts).map(([k,v]) => {
              const klass = k==='Core Holding'?'core':k==='Worth Monitoring'?'watch':'spec';
              return (
                <div key={k} style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:10}}>
                  <span className={`pill-rec ${klass}`}>{k.split(' ')[0]}</span>
                  <div style={{flex:1, height:4, background:'var(--bg-2)', borderRadius:2, overflow:'hidden'}}>
                    <div style={{height:'100%', width:`${v/recTotal*100}%`, background:`var(--${klass})`, borderRadius:2}}/>
                  </div>
                  <span className="num" style={{fontSize:12, color:'var(--ink-2)', width:30, textAlign:'right'}}>{v}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modality bars */}
      <div className="panel" style={pipelineStyles.card}>
        <div className="section-h">
          <h2>Modality 분포</h2>
          <span className="meta">{modalities.length} TYPES</span>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {modalities.map(([k,v]) => (
            <div key={k}>
              <div className="row" style={{justifyContent:'space-between', marginBottom:5}}>
                <span style={{fontSize:12.5, color:'var(--ink-2)'}}>{k}</span>
                <span className="num" style={{fontSize:11, color:'var(--ink-3)'}}>{v} <span style={{color:'var(--ink-4)'}}>· {Math.round(v/modTotal*100)}%</span></span>
              </div>
              <div style={pipelineStyles.barTrack}>
                <div style={{
                  height:'100%', width:`${v/modTotal*100}%`,
                  background: `linear-gradient(90deg, ${modColor(k)}, ${modColor(k)}80)`,
                  borderRadius: 3,
                  boxShadow:`0 0 12px -2px ${modColor(k)}80`,
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Therapy area chips */}
      <div className="panel" style={pipelineStyles.card}>
        <div className="section-h">
          <h2>치료 영역</h2>
          <span className="meta">{areas.length} AREAS</span>
        </div>
        <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
          {areas.map(([k,v],i) => (
            <div key={k} style={{
              display:'flex',alignItems:'center',gap:8,
              padding:'8px 12px',
              background:'var(--panel-2)',
              border:`1px solid ${areaColor(i)}33`,
              borderRadius:8,
            }}>
              <span style={{width:6,height:6,borderRadius:'50%',background:areaColor(i),boxShadow:`0 0 8px ${areaColor(i)}`}}/>
              <span style={{fontSize:12, color:'var(--ink-2)'}}>{k}</span>
              <span className="num" style={{fontSize:11, color:'var(--ink-3)'}}>·{v}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:14, paddingTop:12, borderTop:'1px solid var(--hairline)'}}>
          <div className="mono" style={{fontSize:10.5, color:'var(--ink-4)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8}}>Top weighted</div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            {areas.slice(0,3).map(([k,v],i)=>(
              <div key={k} className="row" style={{justifyContent:'space-between', fontSize:12}}>
                <span style={{color:'var(--ink)'}}>{k}</span>
                <span className="num" style={{color:'var(--ink-2)'}}>{Math.round(v/areaTotal*100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecDonut({ data, total }) {
  const r = 42, c = 2 * Math.PI * r;
  const segments = [
    { key:'Core Holding', val:data['Core Holding'], color:'#6EE7B7' },
    { key:'Worth Monitoring', val:data['Worth Monitoring'], color:'#FBBF24' },
    { key:'Speculative', val:data['Speculative'], color:'#F472B6' },
  ];
  let offset = 0;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--bg-2)" strokeWidth="14"/>
      {segments.map((s,i)=>{
        const len = (s.val/total) * c;
        const dash = `${len} ${c-len}`;
        const dashOff = -offset;
        offset += len;
        return (
          <circle key={i} cx="60" cy="60" r={r} fill="none"
            stroke={s.color} strokeWidth="14"
            strokeDasharray={dash} strokeDashoffset={dashOff}
            transform="rotate(-90 60 60)"
            strokeLinecap="butt"/>
        );
      })}
      <text x="60" y="58" textAnchor="middle" fill="var(--ink)" fontSize="22" fontWeight="700" fontFamily="JetBrains Mono">{total}</text>
      <text x="60" y="74" textAnchor="middle" fill="var(--ink-3)" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.5">COMPANIES</text>
    </svg>
  );
}

const pipelineStyles = {
  card: { padding: 18 },
  barTrack: { height:6, background:'var(--bg-2)', borderRadius:3, overflow:'hidden' },
};

window.Pipeline = Pipeline;
