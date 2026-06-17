function Topbar({ tab, theme, setTheme, onSearch }) {
  const titles = {
    dashboard: ['대시보드', 'Mission Control'],
    companies: ['종목 라이브러리', 'Companies'],
    catalysts: ['카탈리스트 캘린더', 'Catalysts'],
    conferences: ['학회 트래커', 'Conferences'],
  };
  const [k, sub] = titles[tab] || titles.dashboard;
  return (
    <header style={topbarStyles.bar}>
      <div style={{display:'flex', flexDirection:'column', gap:3}}>
        <div className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.12em', textTransform:'uppercase'}}>
          BCC / {sub}
        </div>
        <h1 style={{margin:0,fontSize:22, fontWeight:700, letterSpacing:'-0.02em'}}>{k}</h1>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:10, marginLeft:'auto'}}>
        <div style={topbarStyles.search}>
          <Icons.Search size={15} style={{color:'var(--ink-3)'}}/>
          <input placeholder="ticker · drug · indication 검색…  (⌘K)"
            onChange={e=>onSearch && onSearch(e.target.value)}
            style={topbarStyles.searchInput}/>
          <kbd style={topbarStyles.kbd}>⌘K</kbd>
        </div>

        <button className="btn icon" onClick={()=>setTheme(theme==='dark'?'light':'dark')} title="theme">
          {theme==='dark' ? <Icons.Sun size={16}/> : <Icons.Moon size={16}/>}
        </button>
        <button className="btn icon" title="notifications" style={{position:'relative'}}>
          <Icons.Bell size={16}/>
          <span style={topbarStyles.notifDot}/>
        </button>
        <button className="btn primary">
          <Icons.Plus size={14}/> 워치리스트 추가
        </button>
      </div>
    </header>
  );
}

const topbarStyles = {
  bar: {
    height: 72, padding: '0 28px',
    display:'flex', alignItems:'center', gap:18,
    borderBottom: '1px solid var(--line)',
    background: 'rgba(8,9,12,0.65)',
    backdropFilter: 'blur(12px)',
    position:'sticky', top:0, zIndex: 20,
  },
  search: {
    display:'flex',alignItems:'center', gap:10,
    height:38, padding:'0 14px 0 12px',
    width:380,
    background: 'var(--panel-2)',
    border:'1px solid var(--line)',
    borderRadius: 10,
  },
  searchInput: {
    flex:1, background:'transparent', border:0, outline:0,
    color:'var(--ink)', fontSize:13, fontFamily:'inherit',
  },
  kbd: {
    fontFamily:'JetBrains Mono, monospace',
    fontSize:10, padding:'2px 6px',
    background:'var(--bg-2)', border:'1px solid var(--line)',
    borderRadius:4, color:'var(--ink-3)', letterSpacing:'0.04em',
  },
  notifDot: {
    position:'absolute', top:7, right:7,
    width:7, height:7, borderRadius:'50%', background:'#FBBF24',
    boxShadow:'0 0 0 2px var(--panel-2)',
  },
};

window.Topbar = Topbar;
