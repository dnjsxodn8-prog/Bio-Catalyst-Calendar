function Sidebar({ tab, setTab, theme }) {
  const items = [
    { id: 'dashboard', label: '대시보드', sub: 'Dashboard', icon: 'Dashboard' },
    { id: 'companies', label: '종목', sub: 'Companies', icon: 'Building' },
    { id: 'catalysts', label: '카탈리스트', sub: 'Catalysts', icon: 'Pulse' },
    { id: 'conferences', label: '학회', sub: 'Conferences', icon: 'Mic' },
  ];
  const total = (window.BCC_DATA?.companies || []).length;
  const cat = (window.BCC_DATA?.catalysts || []).length;
  const conf = (window.BCC_DATA?.conferences || []).length;
  const counts = { companies: total, catalysts: cat, conferences: conf };

  return (
    <aside style={sidebarStyles.aside}>
      {/* Brand */}
      <div style={sidebarStyles.brand}>
        <div style={sidebarStyles.avatar}>
          <img src="assets/avatar.jpg" alt="원탱" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        </div>
        <div style={{lineHeight:1.2, minWidth:0}}>
          <div style={{fontSize:12.5, fontWeight:700, letterSpacing:'-0.01em', color:'var(--ink)'}}>원탱’s</div>
          <div style={{fontSize:11.5, color:'var(--ink-2)', marginTop:2, fontWeight:500}}>Biotech Catalyst</div>
          <div className="mono" style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:3}}>Calendar · v3.0</div>
        </div>
      </div>

      {/* Watchlist marker */}
      <div style={sidebarStyles.watchBlock}>
        <div className="row" style={{justifyContent:'space-between', marginBottom:10}}>
          <span className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase'}}>This Week</span>
          <span className="d-counter imminent" style={{height:20, fontSize:10}}>D-0</span>
        </div>
        <div style={{fontSize:13, color:'var(--ink)', fontWeight:600, lineHeight:1.4}}>
          5 events
        </div>
        <div style={{fontSize:11.5, color:'var(--ink-3)', marginTop:4}}>
          <span style={{color:'var(--pdufa)'}}>2 PDUFA</span>
          <span style={{margin:'0 6px', color:'var(--ink-4)'}}>•</span>
          <span style={{color:'var(--readout)'}}>3 Readout</span>
        </div>
        <div style={{display:'flex',gap:3,marginTop:10}}>
          {Array.from({length:7}).map((_,i)=>(
            <div key={i} style={{
              flex:1, height:4, borderRadius:2,
              background: i<2 ? '#FBBF24' : i<5 ? '#C084FC' : 'var(--line)'
            }}/>
          ))}
        </div>
      </div>

      <nav style={{display:'flex', flexDirection:'column', gap:2, padding:'4px 12px'}}>
        <div className="mono" style={sidebarStyles.navLabel}>Navigate</div>
        {items.map(it => (
          <button key={it.id} onClick={()=>setTab(it.id)}
            style={{...sidebarStyles.navItem, ...(tab===it.id ? sidebarStyles.navItemActive : {})}}>
            {React.createElement(Icons[it.icon], { size: 18 })}
            <div style={{flex:1, textAlign:'left', display:'flex', flexDirection:'column', gap:2}}>
              <span style={{fontSize:13, fontWeight: tab===it.id ? 600 : 500}}>{it.label}</span>
              <span className="mono" style={{fontSize:9.5, color: tab===it.id ? 'var(--ink-3)' : 'var(--ink-4)', letterSpacing:'0.08em', textTransform:'uppercase'}}>{it.sub}</span>
            </div>
            {counts[it.id] != null && (
              <span className="num" style={sidebarStyles.navCount}>{counts[it.id]}</span>
            )}
            {tab===it.id && <span style={sidebarStyles.navActiveBar}/>}
          </button>
        ))}
      </nav>

      {/* Pinned tickers */}
      <div style={{padding:'12px 16px 4px', marginTop: 8}}>
        <div className="mono" style={sidebarStyles.navLabel}>
          <span><Icons.Pin size={11} style={{marginRight:6,verticalAlign:'-2px'}}/>Pinned</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:2,marginTop:6}}>
          {['LLY','VRTX','BEAM','NVO'].map(t => (
            <div key={t} style={sidebarStyles.pinRow}>
              <span className="mono" style={{fontSize:11.5, fontWeight:600, color:'var(--ink-2)'}}>{t}</span>
              <span className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.04em'}}>
                {t==='LLY'?'D-0':t==='VRTX'?'D-13':t==='BEAM'?'D-1':'D-2'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social links */}
      <div style={sidebarStyles.social}>
        <a href="https://blog.naver.com/kor_breaking_bad" target="_blank" rel="noopener noreferrer"
          onClick={(e)=>{ e.preventDefault(); window.open('https://blog.naver.com/kor_breaking_bad','_blank','noopener,noreferrer'); }}
          style={sidebarStyles.socialLink} title="Naver Blog">
          <span style={{...sidebarStyles.socialBadge, background:'#03C75A', color:'#062018'}}>N</span>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:11.5, color:'var(--ink-2)', fontWeight:600}}>Naver Blog</div>
            <div className="mono" style={{fontSize:9.5, color:'var(--ink-4)', letterSpacing:'0.04em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>kor_breaking_bad</div>
          </div>
          <Icons.External size={12} style={{color:'var(--ink-4)'}}/>
        </a>
        <a href="https://t.me/biotech_catalyst_calendar" target="_blank" rel="noopener noreferrer"
          onClick={(e)=>{ e.preventDefault(); window.open('https://t.me/biotech_catalyst_calendar','_blank','noopener,noreferrer'); }}
          style={sidebarStyles.socialLink} title="Telegram">
          <span style={{...sidebarStyles.socialBadge, background:'#229ED9', color:'#fff'}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19l-9.5 6L3.7 11.97c-.88-.25-.89-.86.2-1.3l16.5-6.4c.74-.27 1.43.18 1.15 1.3l-2.83 13.32c-.19.91-.74 1.13-1.5.7l-4.1-3.03-1.97 1.92c-.23.23-.42.42-.83.42z"/></svg>
          </span>
          <div style={{flex:1, minWidth:0}}>
            <div style={{fontSize:11.5, color:'var(--ink-2)', fontWeight:600}}>Telegram 채널</div>
            <div className="mono" style={{fontSize:9.5, color:'var(--ink-4)', letterSpacing:'0.04em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>@biotech_catalyst_calendar</div>
          </div>
          <Icons.External size={12} style={{color:'var(--ink-4)'}}/>
        </a>
      </div>

      {/* Footer */}
      <div style={sidebarStyles.footer}>
        <div className="row" style={{gap:8}}>
          <div style={sidebarStyles.statusDot}/>
          <span className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.06em'}}>LIVE · Apr 29 09:36</span>
        </div>
        <div style={{fontSize:10.5, color:'var(--ink-4)', marginTop:6}}>396 종목 · 51 이벤트 · 33 학회</div>
      </div>
    </aside>
  );
}

const sidebarStyles = {
  aside: {
    width: 248, flexShrink: 0,
    background: 'var(--panel)',
    borderRight: '1px solid var(--line)',
    display: 'flex', flexDirection: 'column',
    height: '100vh', position: 'sticky', top: 0,
    overflow: 'hidden',
  },
  brand: {
    display:'flex', alignItems:'center', gap:12,
    padding:'18px 18px 16px',
    borderBottom: '1px solid var(--line)'
  },
  brandMark: {
    width:34, height:34, borderRadius:8,
    background:'linear-gradient(135deg, rgba(110,231,183,0.18), rgba(110,231,183,0.06))',
    border:'1px solid rgba(110,231,183,0.35)',
    color:'var(--acc)',
    display:'flex',alignItems:'center',justifyContent:'center',
    boxShadow:'0 0 24px -6px rgba(110,231,183,0.4)',
  },
  avatar: {
    width:42, height:42, borderRadius:10,
    overflow:'hidden',
    border:'1px solid rgba(251,191,36,0.45)',
    boxShadow:'0 0 18px -4px rgba(251,191,36,0.35), inset 0 0 0 1px rgba(0,0,0,0.4)',
    flexShrink:0,
  },
  social: {
    margin:'auto 12px 0',
    padding:'10px 0 6px',
    borderTop:'1px solid var(--hairline)',
    display:'flex', flexDirection:'column', gap:4,
  },
  socialLink: {
    display:'flex', alignItems:'center', gap:10,
    padding:'8px 10px',
    borderRadius:8,
    border:'1px solid transparent',
    textDecoration:'none',
    transition:'all .15s ease',
  },
  socialBadge: {
    width:24, height:24, borderRadius:6,
    display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:13, fontWeight:800, fontFamily:'JetBrains Mono, monospace',
    flexShrink:0,
  },
  watchBlock: {
    margin: '14px 14px 8px',
    padding: '12px 14px',
    borderRadius: 10,
    background: 'linear-gradient(180deg, rgba(248,113,113,0.06), rgba(192,132,252,0.04))',
    border: '1px solid rgba(248,113,113,0.18)',
  },
  navLabel: {
    fontSize:10, color:'var(--ink-4)', letterSpacing:'0.12em', textTransform:'uppercase',
    padding:'8px 10px 6px',
  },
  navItem: {
    position:'relative',
    display:'flex',alignItems:'center',gap:12,
    padding:'10px 12px',
    background:'transparent',
    border:'1px solid transparent',
    borderRadius:8,
    color:'var(--ink-2)',
    cursor:'pointer',
    transition:'all .15s ease',
  },
  navItemActive: {
    background: 'var(--panel-2)',
    borderColor: 'var(--line-2)',
    color: 'var(--ink)',
  },
  navActiveBar: {
    position:'absolute', left:-1, top:6, bottom:6, width:3, borderRadius:2,
    background:'linear-gradient(180deg, var(--acc), #10B981)',
    boxShadow:'0 0 12px var(--acc)',
  },
  navCount: {
    fontSize:10.5, color:'var(--ink-3)',
    background:'rgba(255,255,255,0.04)',
    border:'1px solid var(--line)',
    padding:'2px 7px', borderRadius:4,
    letterSpacing:'0.04em',
  },
  pinRow: {
    display:'flex', justifyContent:'space-between', alignItems:'center',
    padding:'7px 10px', borderRadius:6,
    cursor:'pointer',
  },
  footer: {
    padding: '12px 18px 14px',
    borderTop: '1px solid var(--line)',
  },
  statusDot: {
    width:6, height:6, borderRadius:'50%', background:'#34D399',
    boxShadow:'0 0 10px #34D399',
    animation: 'pulse 1.6s infinite ease-in-out',
  },
};

window.Sidebar = Sidebar;
