function ConferenceList({ onPick }) {
  const data = window.BCC_DATA || {};
  const confs = data.conferences || [];
  const cats = data.catalysts || [];

  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(420px,1fr))', gap:16}}>
      {confs.map((c,i) => {
        const start = parseDate(c.dates.split(' to ')[0]);
        const end = parseDate(c.dates.split(' to ')[1]);
        const dStart = dDelta(c.dates.split(' to ')[0]);
        const ongoing = dStart <= 0 && dDelta(c.dates.split(' to ')[1]) >= 0;
        const linkedCats = cats.filter(ct => c.notes && c.notes.includes(ct.ticker));
        const tierColor = c.tier === 'Tier 1' ? '#6EE7B7' : '#60A5FA';

        return (
          <div key={c.id} className="panel" style={confStyles.card}>
            <div style={{position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${tierColor}, transparent)`, borderRadius:'14px 14px 0 0'}}/>
            <div className="row" style={{gap:10, marginBottom:12}}>
              <div className="mono" style={{
                fontSize:18, fontWeight:800, color:'var(--ink)',
                background:'var(--panel-2)', border:'1px solid var(--line)',
                padding:'8px 12px', borderRadius:8, letterSpacing:'0.04em',
              }}>{c.id}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.name.replace(c.id,'').replace(' Annual Meeting','').replace(' Congress','').trim()}</div>
                <div className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.08em', marginTop:3}}>{c.location.toUpperCase()}</div>
              </div>
              <span style={{
                fontSize:10.5, fontFamily:'JetBrains Mono', fontWeight:600,
                color: tierColor,
                background: `${tierColor}1A`,
                border: `1px solid ${tierColor}40`,
                padding:'3px 8px', borderRadius:4, letterSpacing:'0.06em',
              }}>{c.tier.toUpperCase()}</span>
            </div>

            <div style={confStyles.dateRow}>
              <div className={`d-counter ${ongoing ? 'imminent' : dClass(dStart)}`}>
                {ongoing ? 'LIVE' : fmtD(dStart)}
              </div>
              <span className="mono" style={{fontSize:11.5, color:'var(--ink-2)'}}>
                {fmtDate(c.dates.split(' to ')[0])} – {fmtDate(c.dates.split(' to ')[1])} · 2026
              </span>
            </div>

            <p style={{fontSize:12.5, color:'var(--ink-2)', lineHeight:1.55, margin:'12px 0'}}>{c.notes}</p>

            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:12}}>
              {(c.areas||[]).map(a=>(
                <span key={a} style={{
                  fontSize:11, color:'var(--ink-3)',
                  background:'var(--panel-2)', border:'1px solid var(--line)',
                  padding:'3px 8px', borderRadius:4,
                }}>{a}</span>
              ))}
            </div>

            {linkedCats.length>0 && (
              <div style={{paddingTop:12, borderTop:'1px solid var(--hairline)'}}>
                <div className="mono" style={{fontSize:10.5, color:'var(--ink-4)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8}}>Related Catalysts · {linkedCats.length}</div>
                <div style={{display:'flex',flexDirection:'column',gap:4}}>
                  {linkedCats.slice(0,3).map((lc,j)=>(
                    <div key={j} className="row" style={{gap:8, fontSize:12, padding:'4px 0'}}
                      onClick={(e)=>{e.stopPropagation(); onPick && onPick(lc);}}>
                      <span className="mono" style={{color:'var(--ink-2)', fontWeight:600, width:48}}>{lc.ticker}</span>
                      <span style={{flex:1, color:'var(--ink-3)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{lc.drug}</span>
                      <span className={`d-counter ${dClass(dDelta(lc.date))}`} style={{height:20, fontSize:10}}>{fmtD(dDelta(lc.date))}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const confStyles = {
  card: {
    position:'relative', overflow:'hidden',
    padding:'18px 18px 16px',
  },
  dateRow: {
    display:'flex', alignItems:'center', gap:10,
    padding:'8px 12px',
    background:'var(--bg-2)',
    borderRadius:8, border:'1px solid var(--hairline)',
  },
};

window.ConferenceList = ConferenceList;
