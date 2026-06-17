function CompanyTable({ q, onPick, density }) {
  const data = window.BCC_DATA || {};
  const companies = data.companies || [];
  const cats = data.catalysts || [];

  // map next catalyst per ticker
  const nextByTicker = {};
  cats.forEach(c => {
    const d = dDelta(c.date);
    if (d < -2) return;
    if (!nextByTicker[c.ticker] || dDelta(nextByTicker[c.ticker].date) > d) nextByTicker[c.ticker] = c;
  });

  const [sortBy, setSortBy] = React.useState('mcap');
  const [filterRec, setFilterRec] = React.useState('all');

  const filt = companies
    .filter(c => filterRec === 'all' || c.recommendation === filterRec)
    .filter(c => !q || (c.ticker+c.company+c.drug+c.indication).toLowerCase().includes(q.toLowerCase()))
    .sort((a,b) => {
      if (sortBy === 'mcap') return b.mcap - a.mcap;
      if (sortBy === 'next') {
        const da = nextByTicker[a.ticker] ? dDelta(nextByTicker[a.ticker].date) : 999;
        const db = nextByTicker[b.ticker] ? dDelta(nextByTicker[b.ticker].date) : 999;
        return da - db;
      }
      return a.ticker.localeCompare(b.ticker);
    });

  const rowH = density === 'compact' ? 44 : 56;

  return (
    <div className="panel" style={{overflow:'hidden'}}>
      <div style={ctStyles.toolbar}>
        <div className="row" style={{gap:6}}>
          {[['all','전체'],['Core Holding','Core'],['Worth Monitoring','Watch'],['Speculative','Spec']].map(([v,l])=>(
            <button key={v} onClick={()=>setFilterRec(v)}
              style={{...ctStyles.filt, ...(filterRec===v ? ctStyles.filtActive : {})}}>
              {l}
              {v!=='all' && <span className="num" style={{marginLeft:6, color:'var(--ink-4)'}}>
                {companies.filter(c=>c.recommendation===v).length}
              </span>}
            </button>
          ))}
        </div>
        <div className="row" style={{gap:8, marginLeft:'auto'}}>
          <span className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.1em', textTransform:'uppercase'}}>Sort</span>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={ctStyles.select}>
            <option value="mcap">시총</option>
            <option value="next">다음 카탈리스트</option>
            <option value="ticker">티커</option>
          </select>
          <span className="mono" style={{fontSize:10.5, color:'var(--ink-3)', letterSpacing:'0.06em', marginLeft:8}}>{filt.length} / {companies.length}</span>
        </div>
      </div>

      <div style={ctStyles.headerRow}>
        <span style={{width:80}}>티커</span>
        <span style={{flex:1.4}}>회사 / 핵심 자산</span>
        <span style={{width:110}}>Modality</span>
        <span style={{width:130}}>적응증</span>
        <span style={{width:80}}>Phase</span>
        <span style={{width:90, textAlign:'right'}}>시총</span>
        <span style={{width:140, textAlign:'right'}}>30D PRICE</span>
        <span style={{width:80}}>등급</span>
        <span style={{width:160}}>다음 카탈리스트</span>
      </div>

      <div>
        {filt.map((c,i) => {
          const next = nextByTicker[c.ticker];
          const recClass = c.recommendation === 'Core Holding' ? 'core' : c.recommendation === 'Worth Monitoring' ? 'watch' : 'spec';
          return (
            <div key={c.ticker} style={{...ctStyles.row, height: rowH}} onClick={()=>onPick && onPick(c)}>
              <span style={{width:80, display:'flex', alignItems:'center', gap:8}}>
                <span style={ctStyles.tickAv}><span style={{color: c.recommendation === 'Core Holding' ? 'var(--core)' : c.recommendation === 'Worth Monitoring' ? 'var(--watch)' : 'var(--spec)'}}>●</span></span>
                <span className="mono" style={{fontSize:13, fontWeight:700}}>{c.ticker}</span>
              </span>
              <span style={{flex:1.4, display:'flex', flexDirection:'column', gap:2, minWidth:0}}>
                <span style={{fontSize:13, color:'var(--ink)', fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.company}</span>
                <span style={{fontSize:11.5, color:'var(--ink-3)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.drug}</span>
              </span>
              <span style={{width:110, fontSize:12, color:'var(--ink-2)'}}>{c.modality}</span>
              <span style={{width:130, fontSize:12, color:'var(--ink-2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.indication}</span>
              <span style={{width:80}}><span className={`chip ${phaseClass(c.phase)}`}>{c.phase}</span></span>
              <span style={{width:90, textAlign:'right'}} className="num">
                <span style={{fontSize:13, color:'var(--ink)', fontWeight:600}}>{fmtMcap(c.mcap)}</span>
              </span>
              <span style={{width:140, display:'flex', alignItems:'center', justifyContent:'flex-end', gap:10}}>
                <Sparkline ticker={c.ticker} width={70} height={22}/>
                <span style={{minWidth:54, textAlign:'right'}}><PctChange ticker={c.ticker}/></span>
              </span>
              <span style={{width:80}}><span className={`pill-rec ${recClass}`}>{c.recommendation === 'Core Holding' ? 'CORE' : c.recommendation === 'Worth Monitoring' ? 'WATCH' : 'SPEC'}</span></span>
              <span style={{width:160, display:'flex', alignItems:'center', gap:8}}>
                {next ? (
                  <>
                    <span className={`d-counter ${dClass(dDelta(next.date))}`} style={{minWidth:48, fontSize:10.5, height:22}}>{fmtD(dDelta(next.date))}</span>
                    <span className="ev-date" style={{fontSize:10.5}}>{fmtDate(next.date)}</span>
                  </>
                ) : <span style={{fontSize:11, color:'var(--ink-4)'}}>—</span>}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ctStyles = {
  toolbar: {
    display:'flex',alignItems:'center',
    padding:'14px 16px',
    borderBottom:'1px solid var(--line)',
    gap:8,
  },
  filt: {
    height:30, padding:'0 12px',
    background:'transparent', color:'var(--ink-3)',
    border:'1px solid transparent',
    borderRadius:6,
    fontSize:12, fontFamily:'inherit',
    cursor:'pointer',
  },
  filtActive: {
    background:'var(--panel-2)', color:'var(--ink)',
    borderColor:'var(--line-2)',
  },
  select: {
    background:'var(--panel-2)', color:'var(--ink)',
    border:'1px solid var(--line)',
    borderRadius:6, padding:'4px 8px',
    fontSize:12, fontFamily:'inherit',
  },
  headerRow: {
    display:'flex', alignItems:'center', gap:14,
    padding:'10px 16px',
    background:'var(--bg-2)',
    borderBottom:'1px solid var(--line)',
    fontFamily:'JetBrains Mono, monospace',
    fontSize:10.5, color:'var(--ink-3)',
    letterSpacing:'0.1em', textTransform:'uppercase',
  },
  row: {
    display:'flex', alignItems:'center', gap:14,
    padding:'0 16px',
    borderBottom:'1px solid var(--hairline)',
    cursor:'pointer',
    transition:'background .12s ease',
  },
  tickAv: {
    width:22, height:22, borderRadius:5,
    background:'var(--panel-2)',
    border:'1px solid var(--line)',
    display:'flex',alignItems:'center',justifyContent:'center',
    fontSize:10,
  },
};

window.CompanyTable = CompanyTable;
