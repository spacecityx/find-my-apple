interface Props{active:boolean;onHome:()=>void;onBack:()=>void}
export default function BlockedOverlay({active,onHome,onBack}:Props){
  if(!active)return null
  const time=new Date().toLocaleTimeString()
  const eventId='EVT-'+Math.random().toString(36).substr(2,8).toUpperCase()
  const rows=[['Attempted URL','evil.example.com'],['Reason','Domain not allowed'],['Timestamp',time],['Policy','findmy.apple.com only'],['Event ID',eventId]]
  return(
    <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.9)',backdropFilter:'blur(30px)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px 36px',textAlign:'center',zIndex:200}}>
      <div style={{width:72,height:72,borderRadius:22,background:'rgba(248,113,113,0.12)',border:'1.5px solid rgba(248,113,113,0.3)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:24}}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
      </div>
      <div style={{fontSize:20,fontWeight:800,color:'#f87171',marginBottom:8}}>Navigation Blocked</div>
      <div style={{fontSize:13,color:'#94a3b8',lineHeight:1.6,marginBottom:24}}>This URL has been blocked by the Find My Apple security policy.</div>
      <div style={{width:'100%',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:14,padding:16,marginBottom:24,textAlign:'left'}}>
        {rows.map(([l,v])=>(
          <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',fontSize:11,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
            <span style={{color:'#475569',fontWeight:500}}>{l}</span>
            <span style={{color:'white',fontWeight:600,fontFamily:'monospace'}}>{v}</span>
          </div>
        ))}
      </div>
      <button onClick={onHome} style={{width:'100%',maxWidth:260,padding:'16px 24px',background:'linear-gradient(135deg,#3b82f6,#2563eb)',border:'none',borderRadius:17,color:'white',fontSize:15,fontWeight:700,cursor:'pointer',marginBottom:8}}>Return to Home</button>
      <button onClick={onBack} style={{width:'100%',maxWidth:260,padding:'14px 24px',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:17,color:'white',fontSize:14,fontWeight:600,cursor:'pointer'}}>Back to Find My</button>
    </div>
  )
}