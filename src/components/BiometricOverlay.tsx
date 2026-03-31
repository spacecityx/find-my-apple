import { useEffect, useRef, useState } from 'react'

interface Props { active: boolean; onSuccess: () => void; onCancel: () => void }

export default function BiometricOverlay({ active, onSuccess, onCancel }: Props) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'scanning'|'success'>('scanning')
  const interval = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (!active) { setProgress(0); setPhase('scanning'); return }
    setTimeout(() => {
      interval.current = setInterval(() => {
        setProgress(p => {
          const next = p + 3 + Math.random() * 4
          if (next >= 100) {
            clearInterval(interval.current)
            setPhase('success')
            setTimeout(onSuccess, 900)
            return 100
          }
          return next
        })
      }, 80)
    }, 400)
    return () => clearInterval(interval.current)
  }, [active])

  if (!active) return null
  const isSuccess = phase === 'success'

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(30px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, zIndex: 200 }}>
      <div style={{ width: 120, height: 120, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, position: 'relative' }}>
        <div style={{ width: 92, height: 92, borderRadius: '50%', background: isSuccess ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.08)', border: `1.5px solid ${isSuccess ? '#4ade80' : 'rgba(59,130,246,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isSuccess ? '0 0 20px rgba(34,197,94,0.2)' : 'none' }}>
          {isSuccess
            ? <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            : <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <rect x="7" y="7" width="8" height="3" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="7" y="7" width="3" height="8" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="27" y="7" width="8" height="3" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="32" y="7" width="3" height="8" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="7" y="32" width="8" height="3" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="7" y="27" width="3" height="8" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="27" y="32" width="8" height="3" rx="1.5" fill="white" opacity="0.6"/>
                <rect x="32" y="27" width="3" height="8" rx="1.5" fill="white" opacity="0.6"/>
                <circle cx="16" cy="18" r="2" fill="white"/>
                <circle cx="26" cy="18" r="2" fill="white"/>
                <path d="M16 25 Q21 30 26 25" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
          }
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: isSuccess ? '#4ade80' : 'white' }}>{isSuccess ? 'Authenticated' : 'Face ID'}</div>
      <div style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', marginBottom: 40, lineHeight: 1.5 }}>{isSuccess ? 'Identity verified successfully' : 'Look at your iPhone to authenticate'}</div>
      <div style={{ width: 200, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden', marginBottom: 40 }}>
        <div style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg,#3b82f6,#60a5fa)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
      </div>
      {!isSuccess && <button onClick={onCancel} style={{ width: 200, padding: '16px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 17, color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>}
    </div>
  )
}