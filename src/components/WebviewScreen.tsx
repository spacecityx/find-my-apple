import{useState}from 'react'
import{DEVICES}from '../types'
interface Props{active:boolean;selectedDevice:number;onSelectDevice:(i:number)=>void;onBack:()=>void;onLock:()=>void}
const PINS=[{cx:195,cy:95},{cx:75,cy:145},{cx:320,cy:60},{cx:300,cy:155}]
export default function WebviewScreen({active,selectedDevice,onSelectDevice,onBack,onLock}:Props){
  const[spin,setSpin]=useState(false)
  if(!active)return null
  const refresh=()=>{setSpin(true);setTimeout(()=>setSpin(false),800)}
  const sel=DEVICES[selectedDevice]
  return(
    <div style={{position:'absolute',inset:0,background:'#0a0f1e',display:'flex',flexDirection:'column',paddingTop:59}}>
      <div style={{background:'rgba(16,22,40,0.95)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'10px 16px',display:'flex',flexDirection:'column',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57',cursor:'pointer'}} onClick={onLock}/>
          <div style={{width:12,height:12,borderRadius:'50%',background:'#febc2e'}}/>
          <div style={{width:12,height:12,borderRadius:'50%',background:'#28c840'}}/>
          <div style={{marginLeft:'auto',display:'flex',gap:6}}>
            <button onClick={onBack} style={{width:28,height:28,borderRadius:7,background:'rgba(255,255,255,0.05)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#94a3b8'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={refresh} style={{width:28,height:28,borderRadius:7,background:'rgba(255,255,255,0.05)',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'#94a3b8'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{animation:spin?'spin 1s linear infinite':'none'}}><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </button>
          </div>
        </div>
        <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'8px 12px',display:'flex',alignItems:'center',gap:8}}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span style={{fontSize:12,color:'#94a3b8',flex:1,fontWeight:500}}><span style={{color:'white'}}>findmy.apple.com</span> — Secure</span>
        </div>
      </div>
      <div style={{background:'rgba(34,197,94,0.08)',borderBottom:'1px solid rgba(34,197,94,0.12)',padding:'8px 16px',display:'flex',alignItems:'center',gap:8,fontSize:11,fontWeight:600,color:'#4ade80'}}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Protected by Find My Apple · E2E Encrypted
      </div>
      <div style={{flex:1,overflowY:'auto'}}>
        <svg width="100%" height="200" viewBox="0 0 390 200" style={{display:'block',background:'#0d1a2e'}}>
          <g stroke="rgba(255,255,255,0.03)" strokeWidth="1">{[50,100,150].map(y=><line key={y} x1="0" y1={y} x2="390" y2={y}/>)}{[78,156,234,312].map(x=><line key={x} x1={x} y1="0" x2={x} y2="200"/>)}</g>
          <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round">
            <path d="M0 80 Q100 70 200 90 Q300 110 390 85"/><path d="M0 130 Q80 140 180 125 Q280 110 390 140"/>
            <path d="M120 0 Q130 100 125 200"/><path d="M260 0 Q255 100 270 200"/>
          </g>
          <g fill="rgba(20,40,70,0.7)">{[[10,20,60,45],[140,15,70,55],[295,25,80,40],[10,110,95,70],[170,105,85,55]].map(([x,y,w,h],i)=><rect key={i} x={x} y={y} width={w} height={h} rx="3"/>)}</g>
          {DEVICES.map((d,i)=>{
            const p=PINS[i];const color=d.status==='online'?'#2563eb':d.status==='alert'?'#d97706':'#64748b';const isSel=i===selectedDevice
            return(<g key={i} onClick={()=>onSelectDevice(i)} style={{cursor:'pointer'}}>
              {isSel&&<circle cx={p.cx} cy={p.cy} r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>}
              <circle cx={p.cx} cy={p.cy} r="9" fill={color} stroke="white" strokeWidth="2"/>
              <text x={p.cx} y={p.cy+4} textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="sans-serif">{d.model[0]}</text>
            </g>)
          })}
        </svg>
        <div style={{padding:16}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',color:'#475569',marginBottom:10}}>My Devices</div>
          {DEVICES.map((d,i)=>{
            const bc=d.battery>50?'#4ade80':d.battery>20?'#fbbf24':'#f87171'
            const sc=d.status==='online'?'#4ade80':d.status==='alert'?'#fbbf24':'#475569'
            return(<div key={i} onClick={()=>onSelectDevice(i)} style={{display:'flex',alignItems:'center',gap:14,padding:12,borderRadius:14,cursor:'pointer',background:i===selectedDevice?'rgba(255,255,255,0.05)':'transparent',marginBottom:2,position:'relative'}}>
              {i===selectedDevice&&<div style={{position:'absolute',left:0,top:10,bottom:10,width:3,borderRadius:2,background:'#3b82f6'}}/>}
              <div style={{width:44,height:44,borderRadius:13,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="3"/><path d="M10 19h4"/></svg>
                <div style={{position:'absolute',bottom:-2,right:-2,width:11,height:11,borderRadius:'50%',background:sc,border:'2px solid #0a0f1e'}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14,fontWeight:700,marginBottom:2}}>{d.name}</div>
                <div style={{fontSize:11,color:'#94a3b8',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.location}</div>
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                <div style={{width:32,height:5,background:'rgba(255,255,255,0.08)',borderRadius:3,overflow:'hidden'}}>
                  <div style={{height:'100%',borderRadius:3,background:bc,width:`${d.battery}%`}}/>
                </div>
                <div style={{fontSize:10,fontWeight:600,color:'#475569'}}>{d.battery}%</div>
                <div style={{fontSize:9,color:'#475569'}}>{d.time}</div>
              </div>
            </div>)
          })}
          {sel&&(
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:16,marginTop:8}}>
              <div style={{fontSize:15,fontWeight:700,marginBottom:12}}>{sel.name}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:12}}>
                {[['Coordinates',sel.coords],['Network',sel.network]].map(([l,v])=>(
                  <div key={l} style={{background:'rgba(255,255,255,0.03)',borderRadius:10,padding:8}}>
                    <div style={{fontSize:9,color:'#475569',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.04em',marginBottom:3}}>{l}</div>
                    <div style={{fontSize:10,fontWeight:600,fontFamily:'monospace'}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:8}}>
                {['Play Sound','Lost Mode','Erase'].map(a=>(
                  <button key={a} style={{flex:1,padding:'10px 6px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:a==='Erase'?'rgba(248,113,113,0.05)':'rgba(255,255,255,0.04)',color:a==='Erase'?'#f87171':'white',fontSize:10,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>{a}</button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{height:20}}/>
      </div>
    </div>
  )
}