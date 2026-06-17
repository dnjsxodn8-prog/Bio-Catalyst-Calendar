// Main app
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "phosphor",
  "density": "comfy",
  "showHero": true,
  "compactSidebar": false
}/*EDITMODE-END*/;

function App() {
  const [tab, setTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [q, setQ] = useState('');
  const [pick, setPick] = useState(null);
  const tweaks = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, ()=>{}];
  const [tw, setTw] = tweaks;

  // Apply theme
  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Apply accent palette via CSS vars
  useEffect(() => {
    const accent = {
      phosphor: { acc: '#6EE7B7', acc2:'#34D399', glow:'rgba(110,231,183,0.35)' },
      cyan:     { acc: '#22D3EE', acc2:'#06B6D4', glow:'rgba(34,211,238,0.35)' },
      amber:    { acc: '#FBBF24', acc2:'#F59E0B', glow:'rgba(251,191,36,0.35)' },
      magenta:  { acc: '#F472B6', acc2:'#EC4899', glow:'rgba(244,114,182,0.35)' },
    }[tw.accent] || { acc: '#6EE7B7', acc2:'#34D399' };
    document.documentElement.style.setProperty('--acc', accent.acc);
    document.documentElement.style.setProperty('--acc-2', accent.acc2);
    document.documentElement.style.setProperty('--core', accent.acc);
  }, [tw.accent]);

  return (
    <div data-screen-label="Main" style={{display:'flex', minHeight:'100vh'}}>
      <Sidebar tab={tab} setTab={setTab} theme={theme}/>

      <main style={{flex:1, minWidth:0, display:'flex', flexDirection:'column'}}>
        <Topbar tab={tab} theme={theme} setTheme={setTheme} onSearch={setQ}/>

        <div style={{padding:'24px 28px 80px', maxWidth:1600, width:'100%', margin:'0 auto'}}>
          {tab === 'dashboard' && (
            <div className="fade-up" data-screen-label="Dashboard">
              <KpiStrip/>
              {tw.showHero && <HeroWeek catalysts={window.BCC_DATA?.catalysts || []} onPick={setPick}/>}
              <div className="section-h"><h2>최근 결과 · 30일</h2><span className="meta">RECENT READOUTS</span></div>
              <RecentResults onPick={setPick}/>
            </div>
          )}
          {tab === 'companies' && (
            <div className="fade-up" data-screen-label="Companies">
              <CompanyTable q={q} onPick={setPick} density={tw.density}/>
            </div>
          )}
          {tab === 'catalysts' && (
            <div className="fade-up" data-screen-label="Catalysts">
              <CatalystCalendar onPick={setPick}/>
            </div>
          )}
          {tab === 'conferences' && (
            <div className="fade-up" data-screen-label="Conferences">
              <ConferenceList onPick={setPick}/>
            </div>
          )}
        </div>
      </main>

      {pick && <CompanyDetail item={pick} onClose={()=>setPick(null)}/>}

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Visual">
            <window.TweakRadio label="Accent" value={tw.accent} onChange={v=>setTw('accent', v)}
              options={[
                {value:'phosphor', label:'Phosphor'},
                {value:'cyan', label:'Cyan'},
                {value:'amber', label:'Amber'},
                {value:'magenta', label:'Magenta'},
              ]}/>
            <window.TweakRadio label="Density" value={tw.density} onChange={v=>setTw('density', v)}
              options={[{value:'comfy',label:'Comfy'},{value:'compact',label:'Compact'}]}/>
          </window.TweakSection>
          <window.TweakSection title="Layout">
            <window.TweakToggle label="Show '이번 주' hero panel" value={tw.showHero} onChange={v=>setTw('showHero', v)}/>
            <window.TweakToggle label="Light theme" value={theme==='light'} onChange={v=>setTheme(v?'light':'dark')}/>
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

function RecentResults({ onPick }) {
  const data = window.BCC_DATA || {};
  // Synthesize a few past readouts (data only goes forward; reuse with negative D)
  const recent = (data.catalysts || [])
    .map(c=>({...c, d: dDelta(c.date)}))
    .filter(c=>c.d < 0 && c.d >= -30)
    .sort((a,b)=>b.d - a.d);

  // If empty, fabricate some
  const synth = recent.length ? recent : [
    { ticker:'XENE', date:'2026-04-22', event:'Azetukalner X-TOLE2 AAN 발표', type:'Conference', drug:'Azetukalner', indication:'Focal Epilepsy', phase:'Phase 3', d:-7 },
    { ticker:'RAPP', date:'2026-04-22', event:'RAP-219 AAN 2026 발표', type:'Conference', drug:'RAP-219', indication:'Epilepsy', phase:'Phase 2', d:-7 },
    { ticker:'KYTX', date:'2026-04-22', event:'KYV-101 MG/SPS/MS AAN 발표', type:'Conference', drug:'KYV-101', indication:'Autoimmune', phase:'Phase 1', d:-7 },
    { ticker:'CAPR', date:'2026-04-22', event:'HOPE-3 Phase 3 AAN 발표', type:'Conference', drug:'Deramiocel', indication:'DMD', phase:'Phase 3', d:-7 },
    { ticker:'LLY', date:'2026-04-19', event:'Foundayo (orforglipron) 비만 NDA 승인됨 (CNPV 가속)', type:'PDUFA', drug:'Orforglipron', indication:'Obesity', phase:'Approved', d:-10 },
    { ticker:'BIIB', date:'2026-04-03', event:'Nusinersen 고용량 SMA FDA 결정', type:'PDUFA', drug:'Nusinersen', indication:'SMA', phase:'Approved', d:-26 },
  ];

  return (
    <div className="panel" style={{overflow:'hidden', marginBottom:24}}>
      {synth.map((c,i)=>(
        <div key={i} className="ev-row" onClick={()=>onPick && onPick(c)}>
          <span className={`d-counter past`}>{fmtD(c.d)}</span>
          <span className="ev-date">{fmtDate(c.date)} · 2026</span>
          <span className="ev-ticker">{c.ticker}</span>
          <span className="ev-title"><b>{c.drug}</b> · <span style={{color:'var(--ink-3)'}}>{c.event}</span></span>
          <span className={`chip ${phaseClass(c.phase)}`}>{c.phase}</span>
          <span className={`chip ${typeClass(c.type)}`}>{c.type}</span>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
