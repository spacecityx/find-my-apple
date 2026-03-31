interface Props{active:boolean;onOpen:()=>void}
export default function SplashScreen({active,onOpen}:Props){
  if(!active)return null
  return(
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#0a0f1e,#0d1628)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 40px 80px'}}>
      <div style={{width:160,height:160,borderRadius:'50%',background:'radial-gradient(circle at 40% 35%,#2563eb,#1d4ed8,#1e3a5f,#0d1b3e)',boxShadow:'0 0 60px rgba(37,99,235,0.4)',marginBottom:40,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect x="12" y="26" width="32" height="22" rx="6" fill="white" opacity="0.9"/>
          <path d="M19 26v-8a9 9 0 0 1 18 0v8" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9"/>
          <circle cx="28" cy="36" r="4" fill="#1d4ed8"/>
        </svg>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(34,197,94,0.12)',border:'1px solid rgba(34,197,94,0.25)',borderRadius:20,padding:'5px 12px',fontSize:11,fontWeight:600,color:'#4ade80',marginBottom:24}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#4ade80'}}/>SECURE SESSION
      </div>
      <h1 style={{fontSize:28,fontWeight:800,letterSpacing:'-0.03em',marginBottom:8,textAlign:'center'}}>Find My Apple</h1>
      <p style={{fontSize:14,color:'#94a3b8',textAlign:'center',lineHeight:1.5,marginBottom:48,maxWidth:240}}>Protected access to Apple's Find My service with biometric authentication</p>
      <button onClick={onOpen} style={{width:'100%',padding:'18px 24px',background:'linear-gradient(135deg,#3b82f6,#2563eb)',border:'none',borderRadius:17,color:'white',fontSize:16,fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Open Find My iPhone
      </button>
      <p style={{marginTop:'auto',paddingTop:24,fontSize:10,color:'#475569',letterSpacing:'0.03em'}}>PROTECTED BY BIOMETRIC AUTH · AES-256</p>
    </div>
  )
}