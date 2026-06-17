// Catalyst calendar — month-grid timeline with vertical "today" line
function CatalystCalendar({ onPick }) {
  const data = window.BCC_DATA || {};
  const cats = (data.catalysts || []).map(c => ({...c, d: dDelta(c.date)})).sort((a,b)=>a.d - b.d);
  const [view, setView] = React.useState('timeline'); // timeline | list
  const [filterType, setFilterType] = React.useState('all');

  const filtered = cats.filter(c => filterType === 'all' || c.type === filterType);

  // Timeline: arrange events by week buckets
  const buckets = {};
  filtered.forEach(c => {
    const wk = Math.floor((c.d + 60) / 7); // ad-hoc
    buckets[wk] = buckets[wk] || [];
    buckets[wk].push(c);
  });

  return (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>
      {/* Legend / filters */}
      <div className="panel" style={{padding:'12px 16px', display:'flex',alignItems:'center',gap:8}}>
        <div className="row" style={{gap:6}}>
          {[['all','All'],['PDUFA','PDUFA'],['Clinical Readout','Readout'],['Conference','Conference'],['Regulatory','Regulatory']].map(([v,l])=>(
            <button key={v} onClick={()=>setFilterType(v)}
              style={{
                height:30, padding:'0 12px', borderRadius:6,
                background: filterType===v ? 'var(--panel-2)' : 'transparent',
                border: `1px solid ${filterType===v ? 'var(--line-2)' : 'transparent'}`,
                color: filterType===v ? 'var(--ink)' : 'var(--ink-3)',
                fontSize:12, fontFamily:'inherit', cursor:'pointer',
                display:'flex', alignItems:'center', gap:6,
              }}>
              {v!=='all' && <span style={{width:6,height:6,borderRadius:'50%', background: typeColorOf(v)}}/>}
              {l}
            </button>
          ))}
        </div>
        <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:10}}>
          <span className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase'}}>{filtered.length} EVENTS</span>
          <div style={{display:'flex', gap:2, padding:2, background:'var(--bg-2)', borderRadius:6, border:'1px solid var(--line)'}}>
            {[['timeline','Timeline'],['list','List']].map(([v,l])=>(
              <button key={v} onClick={()=>setView(v)}
                style={{
                  padding:'5px 10px', borderRadius:4,
                  background: view===v ? 'var(--panel-2)' : 'transparent',
                  border:0, color: view===v ? 'var(--ink)' : 'var(--ink-3)',
                  fontSize:11.5, fontFamily:'inherit', cursor:'pointer',
                }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      {view === 'timeline' ? (
        <TimelineView events={filtered} onPick={onPick}/>
      ) : (
        <ListView events={filtered} onPick={onPick}/>
      )}
    </div>
  );
}

function typeColorOf(t) {
  return { 'PDUFA':'#FBBF24', 'Clinical Readout':'#C084FC', 'Conference':'#60A5FA', 'Regulatory':'#F472B6' }[t] || '#94A3B8';
}

function TimelineView({ events, onPick }) {
  // Bucket by month
  const byMonth = {};
  events.forEach(e => {
    const d = parseDate(e.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    byMonth[key] = byMonth[key] || [];
    byMonth[key].push(e);
  });
  const monthKeys = Object.keys(byMonth).sort();

  return (
    <div className="panel" style={{padding:'8px 0'}}>
      {monthKeys.map(mk => {
        const [y,m] = mk.split('-');
        const monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+m-1];
        return (
          <div key={mk} style={{display:'grid',gridTemplateColumns:'120px 1fr', gap:0, padding:'14px 0', borderTop:'1px solid var(--hairline)'}}>
            <div style={{padding:'6px 18px', borderRight:'1px solid var(--hairline)'}}>
              <div className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'0.12em', textTransform:'uppercase'}}>{y}</div>
              <div style={{fontSize:24, fontWeight:700, fontFamily:'JetBrains Mono, monospace', color:'var(--ink)', letterSpacing:'-0.02em', marginTop:2}}>{monthName}</div>
              <div style={{fontSize:11.5, color:'var(--ink-4)', marginTop:6}}>{byMonth[mk].length} events</div>
            </div>
            <div style={{padding:'4px 18px', display:'flex', flexDirection:'column', gap:6}}>
              {byMonth[mk].map((e,i) => (
                <div key={i} className="ev-row" onClick={()=>onPick && onPick(e)}
                  style={{gridTemplateColumns:'70px 56px 64px 1fr auto auto', padding:'9px 12px', borderRadius:8, border:'1px solid var(--hairline)', borderBottom:'1px solid var(--hairline)', background:'var(--panel-2)'}}>
                  <span className={`d-counter ${dClass(e.d)}`}>{fmtD(e.d)}</span>
                  <span className="ev-date">{fmtDate(e.date)}</span>
                  <span className="ev-ticker">{e.ticker}</span>
                  <span className="ev-title"><b>{e.drug}</b> · <span style={{color:'var(--ink-3)'}}>{e.indication}</span></span>
                  <span className={`chip ${phaseClass(e.phase)}`}>{e.phase}</span>
                  <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ListView({ events, onPick }) {
  return (
    <div className="panel" style={{overflow:'hidden'}}>
      {events.map((e,i) => (
        <div key={i} className="ev-row" onClick={()=>onPick && onPick(e)}>
          <span className={`d-counter ${dClass(e.d)}`}>{fmtD(e.d)}</span>
          <span className="ev-date">{fmtDate(e.date)} · 2026</span>
          <span className="ev-ticker">{e.ticker}</span>
          <span className="ev-title"><b>{e.event}</b></span>
          <span className={`chip ${phaseClass(e.phase)}`}>{e.phase}</span>
          <span className={`chip ${typeClass(e.type)}`}>{e.type}</span>
        </div>
      ))}
    </div>
  );
}

window.CatalystCalendar = CatalystCalendar;
