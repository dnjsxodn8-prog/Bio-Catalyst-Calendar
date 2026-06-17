// "이번 주" hero — the centerpiece of the redesign
function HeroWeek({ catalysts, onPick }) {
  const sorted = [...catalysts]
    .map(c => ({...c, d: dDelta(c.date)}))
    .filter(c => c.d >= -1 && c.d <= 7)
    .sort((a,b) => a.d - b.d);

  const featured = sorted[0]; // Today's biggest event
  const rest = sorted.slice(1, 5);

  return (
    <section style={heroStyles.wrap}>
      {/* Featured "today" card */}
      {featured && (
        <div style={heroStyles.featured} onClick={()=>onPick && onPick(featured)}>
          <div style={heroStyles.featuredGlow}/>
          <div className="row" style={{gap:10, marginBottom:14}}>
            <span className="d-counter imminent" style={{fontSize:12, height:28, padding:'0 10px'}}>
              {fmtD(featured.d)} · TODAY
            </span>
            <span className={`chip ${typeClass(featured.type)}`}>{featured.type}</span>
            <span className={`chip ${phaseClass(featured.phase)}`}>{featured.phase}</span>
          </div>

          <div className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:6}}>
            {featured.ticker} · {fmtDate(featured.date)} · 2026
          </div>
          <h2 style={heroStyles.featuredTitle}>{featured.event}</h2>
          <div style={{fontSize:13.5, color:'var(--ink-2)', marginTop:10, lineHeight:1.55}}>
            <b style={{color:'var(--ink)'}}>{featured.drug}</b> · {featured.indication}
          </div>

          <div style={heroStyles.featuredFooter}>
            <button className="btn primary" onClick={(e)=>{e.stopPropagation(); onPick && onPick(featured);}}>
              상세 보기 <Icons.Chevron size={14}/>
            </button>
            <button className="btn ghost"><Icons.Star size={14}/> 워치리스트</button>
            <div style={{marginLeft:'auto', display:'flex', alignItems:'baseline', gap:8}}>
              <span className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'0.06em', textTransform:'uppercase'}}>EXPECTED MOVE</span>
              <span className="num" style={{fontSize:20, fontWeight:700, color:'var(--positive)'}}>±18%</span>
            </div>
          </div>
        </div>
      )}

      {/* Right: this-week list */}
      <div style={heroStyles.list}>
        <div className="section-h">
          <h2>이번 주 카탈리스트</h2>
          <span className="meta">{sorted.length} EVENTS · APR 27 — MAY 03</span>
        </div>
        <div className="panel" style={{overflow:'hidden'}}>
          {sorted.map((c,i)=>(
            <div key={i} className="ev-row" onClick={()=>onPick && onPick(c)}>
              <span className={`d-counter ${dClass(c.d)}`}>{fmtD(c.d)}</span>
              <span className="ev-date">{fmtDate(c.date)} · {parseDate(c.date).toLocaleDateString('en-US',{weekday:'short'}).toUpperCase()}</span>
              <span className="ev-ticker">{c.ticker}</span>
              <span className="ev-title">
                <b>{c.drug}</b> · <span style={{color:'var(--ink-3)'}}>{c.indication}</span>
              </span>
              <span className={`chip ${phaseClass(c.phase)}`}>{c.phase}</span>
              <span className={`chip ${typeClass(c.type)}`}>{c.type}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const heroStyles = {
  wrap: {
    display: 'grid',
    gridTemplateColumns: '380px 1fr',
    gap: 20,
    marginBottom: 24,
  },
  featured: {
    position:'relative', overflow:'hidden',
    padding: '24px 24px 20px',
    background:
      'linear-gradient(160deg, rgba(248,113,113,0.10) 0%, rgba(192,132,252,0.06) 50%, rgba(11,15,21,0.4) 100%), var(--panel)',
    border: '1px solid rgba(248,113,113,0.30)',
    borderRadius: 'var(--r-lg)',
    cursor:'pointer',
    boxShadow: '0 30px 60px -30px rgba(248,113,113,0.30)',
  },
  featuredGlow: {
    position:'absolute', top:-80, right:-60, width:240, height:240,
    background:'radial-gradient(closest-side, rgba(251,191,36,0.30), transparent 70%)',
    pointerEvents:'none',
  },
  featuredTitle: {
    margin:0, fontSize:21, fontWeight:700, lineHeight:1.3,
    letterSpacing:'-0.015em', color:'var(--ink)',
  },
  featuredFooter: {
    display:'flex', alignItems:'center', gap:10,
    marginTop:18, paddingTop:16,
    borderTop:'1px solid var(--hairline)',
  },
  list: { display:'flex', flexDirection:'column' },
};

window.HeroWeek = HeroWeek;
