function CompanyDetail({ item, onClose }) {
  if (!item) return null;
  const data = window.BCC_DATA || {};
  // item could be a company or a catalyst — find the company
  const ticker = item.ticker;
  const company = (data.companies||[]).find(c => c.ticker === ticker) || item;
  const ticks = (data.catalysts||[]).filter(c => c.ticker === ticker)
    .map(c => ({...c, d: dDelta(c.date)}))
    .sort((a,b)=>a.d - b.d);

  const recClass = company.recommendation === 'Core Holding' ? 'core' : company.recommendation === 'Worth Monitoring' ? 'watch' : 'spec';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        {/* Hero */}
        <div style={detailStyles.hero}>
          <div style={detailStyles.heroGlow}/>
          <div className="row" style={{gap:14, marginBottom:18, position:'relative'}}>
            <div style={detailStyles.bigTicker}>{company.ticker}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:22, fontWeight:700, letterSpacing:'-0.02em'}}>{company.company}</div>
              <div className="mono" style={{fontSize:11.5, color:'var(--ink-3)', marginTop:4, letterSpacing:'0.08em', textTransform:'uppercase'}}>
                {company.modality} · {(company.areas||[]).join(' / ')}
              </div>
            </div>
            <div style={{textAlign:'right', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6}}>
              <div className="num" style={{fontSize:28, fontWeight:700}}>{fmtMcap(company.mcap)}</div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <Sparkline ticker={company.ticker} width={92} height={26}/>
                <PctChange ticker={company.ticker} size="lg"/>
              </div>
              <div className="mono" style={{fontSize:10, color:'var(--ink-4)', letterSpacing:'0.1em', textTransform:'uppercase'}}>30D · Market Cap</div>
            </div>
            <button className="btn icon" onClick={onClose}><Icons.Close size={16}/></button>
          </div>

          <div className="row" style={{gap:8, marginBottom:14}}>
            <span className={`pill-rec ${recClass}`}>{company.recommendation}</span>
            <span className={`chip ${phaseClass(company.phase)}`}>{company.phase}</span>
            <span style={{fontSize:12, color:'var(--ink-3)', marginLeft:8}}>
              <Icons.Beaker size={13} style={{verticalAlign:'-2px', marginRight:6}}/>
              <b style={{color:'var(--ink-2)'}}>{company.drug}</b>
              <span style={{margin:'0 8px',color:'var(--ink-4)'}}>·</span>
              {company.indication}
            </span>
          </div>

          <p style={{fontSize:14, color:'var(--ink-2)', lineHeight:1.6, margin:0}}>{company.summary}</p>
        </div>

        <div style={{padding:'24px 28px', display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:24}}>
          {/* Left: Catalysts */}
          <div>
            <div className="section-h"><h2>카탈리스트 타임라인</h2><span className="meta">{ticks.length} EVENTS</span></div>

            {/* Vertical timeline */}
            <div style={{position:'relative', paddingLeft:24}}>
              <div style={{position:'absolute', left:8, top:8, bottom:8, width:1, background:'var(--line)'}}/>
              {ticks.map((t,i)=>(
                <div key={i} style={{position:'relative', padding:'12px 14px', marginBottom:8, background:'var(--panel-2)', border:'1px solid var(--line)', borderRadius:8}}>
                  <div style={{position:'absolute', left:-21, top:18, width:14, height:14, borderRadius:'50%',
                    background: t.d < 0 ? 'var(--panel-2)' : t.d <= 7 ? '#FBBF24' : 'var(--ink-4)',
                    border:'2px solid var(--bg)',
                    boxShadow: t.d >= 0 && t.d <= 7 ? '0 0 12px rgba(251,191,36,0.6)' : 'none'}}/>
                  <div className="row" style={{gap:8, marginBottom:6}}>
                    <span className={`d-counter ${dClass(t.d)}`}>{fmtD(t.d)}</span>
                    <span className="ev-date">{fmtDate(t.date)} · 2026</span>
                    <span className={`chip ${typeClass(t.type)}`}>{t.type}</span>
                    <span className={`chip ${phaseClass(t.phase)}`}>{t.phase}</span>
                  </div>
                  <div style={{fontSize:13, color:'var(--ink)', fontWeight:500}}>{t.event}</div>
                </div>
              ))}
              {ticks.length === 0 && (
                <div style={{padding:20, color:'var(--ink-4)', fontSize:13}}>예정된 카탈리스트가 없습니다.</div>
              )}
            </div>
          </div>

          {/* Right: Stats + actions */}
          <div style={{display:'flex', flexDirection:'column', gap:16}}>
            <div className="panel" style={{padding:16}}>
              <div className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:12}}>Asset Profile</div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
                <DetailStat label="Modality" value={company.modality}/>
                <DetailStat label="Phase" value={company.phase}/>
                <DetailStat label="Drug" value={company.drug}/>
                <DetailStat label="Indication" value={company.indication}/>
              </div>
              <div style={{marginTop:14, paddingTop:12, borderTop:'1px solid var(--hairline)'}}>
                <div className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:6}}>Mechanism</div>
                <div style={{fontSize:13, color:'var(--ink-2)'}}>{company.mechanism}</div>
              </div>
            </div>

            <div className="panel" style={{padding:16, background:'linear-gradient(180deg, rgba(110,231,183,0.04), transparent)'}}>
              <div className="row" style={{justifyContent:'space-between', marginBottom:10}}>
                <div className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase'}}>Next Move</div>
                {ticks[0] && <span className={`d-counter ${dClass(ticks[0].d)}`}>{fmtD(ticks[0].d)}</span>}
              </div>
              {ticks[0] ? (
                <div>
                  <div style={{fontSize:14, color:'var(--ink)', fontWeight:600, lineHeight:1.4}}>{ticks[0].event}</div>
                  <div style={{fontSize:12, color:'var(--ink-3)', marginTop:6}}>{fmtDate(ticks[0].date)} · 2026</div>
                </div>
              ) : <div style={{fontSize:13, color:'var(--ink-4)'}}>—</div>}
              <div style={{display:'flex',gap:6,marginTop:14}}>
                <button className="btn primary" style={{flex:1}}><Icons.Bell size={13}/> 알림 받기</button>
                <button className="btn"><Icons.External size={13}/></button>
              </div>
            </div>

            <div className="panel" style={{padding:16}}>
              <div className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10}}>Quick Actions</div>
              <div style={{display:'flex', flexDirection:'column', gap:6}}>
                <button className="btn ghost" style={{justifyContent:'flex-start',width:'100%'}}><Icons.Star size={14}/> 워치리스트 추가</button>
                <button className="btn ghost" style={{justifyContent:'flex-start',width:'100%'}}><Icons.Pin size={14}/> 사이드바에 핀</button>
                <button className="btn ghost" style={{justifyContent:'flex-start',width:'100%'}}><Icons.Flag size={14}/> 비교 그룹에 추가</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailStat({ label, value }) {
  return (
    <div>
      <div className="mono" style={{fontSize:10, color:'var(--ink-4)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4}}>{label}</div>
      <div style={{fontSize:12.5, color:'var(--ink)', fontWeight:500}}>{value}</div>
    </div>
  );
}

const detailStyles = {
  hero: {
    position:'relative', overflow:'hidden',
    padding:'28px 28px 24px',
    background:'linear-gradient(160deg, rgba(110,231,183,0.10), rgba(96,165,250,0.04) 50%, transparent), var(--panel)',
    borderBottom:'1px solid var(--line)',
  },
  heroGlow: {
    position:'absolute', top:-100, right:-80, width:300, height:300,
    background:'radial-gradient(closest-side, rgba(110,231,183,0.20), transparent 70%)',
    pointerEvents:'none',
  },
  bigTicker: {
    fontSize:30, fontWeight:800, fontFamily:'JetBrains Mono, monospace',
    background:'var(--panel-2)', border:'1px solid var(--line-2)',
    padding:'14px 18px', borderRadius:10, letterSpacing:'0.02em',
    color:'var(--ink)',
  },
};

window.CompanyDetail = CompanyDetail;
