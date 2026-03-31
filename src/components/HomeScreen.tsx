import{useEffect,useState}from 'react'
interface Props{active:boolean;sessionStart:Date|null;onLock:()=>void;onOpenFindMy:()=>void;onTestBlocked:()=>void}
export default function HomeScreen({active,sessionStart,onLock,onOpenFindMy,onTestBlocked}:Props){
  const[label,setLabel]=useState('Just authenticated')
  useEffect(()=>{
    if(!active||!sessionStart)return
    const id=setInterval(()=>{
      const s=Math.floor((Date.now()-sessionStart.getTime())/1000)
      setLabel(s<60?`${s}s ago`:`${Math.floor(s/60)}m ago`)
    },1000)
    return()=>clearInterval(id)
  },[active,sessionStart])
  if(!active)return null
  const stats=[['Auth Method','Face ID',null],['Security Level','Level 5','#4ade80'],['Encryption','AES-256',null],['Devices Found','4 Active','#60a5fa']]
  return(
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0a0f1e,#0d1628)',padding:'68px 20px 40px',display:'flex',flexDirection:'column',gap:16,overflowY:'auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 4px 4px'}}>
        <div>
          <div style={{fontSize:11,color:'#475569',fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:2}}>Secure</div>
          <div style={{fontSize:20,fontWeight:800,letterSpacing:'-0.03em'}}>Find My Apple</div>
        </div>
        <button onClick={onLock} style={{width:44,height:44,borderRadius:12,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'white'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </button>
      </div>
      <div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:20,padding:16}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
          <div style={{width:32,height:32,borderRadius:9,background:'rgba(34,197,94,0.15)',border:'1px solid rgba(34,197,94,0.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <div style={{fontSize:12,fontWeight:600,color:'#4ade80',letterSpacing:'0.04em',textTransform:'uppercase'}}>Active Session</div>
          <div style={{marginLeft:'auto',fontSize:11,color:'#475569'}}>{label}</div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
          {stats.map(([l,v,c])=>(
            <div key={l as string} style={{background:'rgba(255,255,255,0.03)',borderRadius:12,padding:10}}>
              <div style={{fontSize:10,color:'#475569',fontWeight:500,letterSpacing:'0.04em',textTransform:'uppercase',marginBottom:3}}>{l}</div>
              <div style={{fontSize:13,fontWeight:700,color:(c as string)||'white'}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onOpenFindMy} style={{width:'100%',padding:'18px 24px',background:'linear-gradient(135deg,#3b82f6,#2563eb)',border:'none',borderRadius:17,color:'white',fontSize:16,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Open Find My iPhone
      </button>
      <button onClick={onTestBlocked} style={{width:'100%',padding:'16px 24px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.10)',borderRadius:17,color:'white',fontSize:14,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
        Test Blocked Navigation
      </button>
      <div style={{background:'rgba(251,191,36,0.07)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:16,padding:'14px 16px',display:'flex',gap:10}}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" style={{flexShrink:0,marginTop:1}}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        <div style={{fontSize:11,color:'rgba(251,191,36,0.85)',lineHeight:1.5,fontWeight:500}}>Navigation is restricted to Apple's Find My domain only. All external links will be blocked and logged.</div>
      </div>
    </div>
  )
}