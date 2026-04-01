import { useState, useEffect } from 'react'

interface Props {
  active: boolean
  onContinue: (email: string, password: string) => void
  onSkip: () => void
  onBack: () => void
}

const STORAGE_KEY_EMAIL = 'fma_email'
const STORAGE_KEY_PASS = 'fma_pass'

export default function CredentialsScreen({ active, onContinue, onSkip, onBack }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!active) return
    const savedEmail = localStorage.getItem(STORAGE_KEY_EMAIL) || ''
    const savedPass = localStorage.getItem(STORAGE_KEY_PASS) || ''
    if (savedEmail) { setEmail(savedEmail); setPassword(savedPass); setLoaded(true) }
  }, [active])

  const handleContinue = () => {
    if (remember) {
      localStorage.setItem(STORAGE_KEY_EMAIL, email)
      localStorage.setItem(STORAGE_KEY_PASS, password)
    } else {
      localStorage.removeItem(STORAGE_KEY_EMAIL)
      localStorage.removeItem(STORAGE_KEY_PASS)
    }
    onContinue(email, password)
  }

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY_EMAIL)
    localStorage.removeItem(STORAGE_KEY_PASS)
    setEmail(''); setPassword(''); setLoaded(false)
  }

  if (!active) return null

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#0a0f1e,#0d1628)', display: 'flex', flexDirection: 'column', paddingTop: 59 }}>
      <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Apple ID</div>
          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Sign in to iCloud Find My</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" opacity="0.9">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </div>
        </div>

        {loaded && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 600 }}>Credentials loaded — just enter your 2FA code</span>
          </div>
        )}

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>Apple ID</div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="yourname@icloud.com"
            style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, color: 'white', fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>Password</div>
          <div style={{ position: 'relative' }}>
            <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••"
              style={{ width: '100%', padding: '14px 48px 14px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, color: 'white', fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
            <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
              {showPass
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '14px 16px' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Remember credentials</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Securely saved on this device</div>
          </div>
          <div onClick={() => setRemember(!remember)} style={{ width: 44, height: 26, borderRadius: 13, background: remember ? '#2563eb' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: 3, left: remember ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}/>
          </div>
        </div>

        <button onClick={handleContinue} disabled={!email || !password}
          style={{ width: '100%', padding: '17px 24px', background: email && password ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 17, color: 'white', fontSize: 16, fontWeight: 700, cursor: email && password ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Open Find My with Apple ID
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onSkip} style={{ flex: 1, padding: '13px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, color: '#94a3b8', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Skip for now</button>
          {loaded && <button onClick={handleClear} style={{ flex: 1, padding: '13px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 14, color: '#f87171', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Clear saved</button>}
        </div>

        <div style={{ textAlign: 'center', fontSize: 10, color: '#475569', lineHeight: 1.5 }}>
          Credentials stored locally on device only. Never shared with any server.
        </div>
      </div>
    </div>
  )
}