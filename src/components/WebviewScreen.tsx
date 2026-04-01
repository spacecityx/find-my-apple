import { useEffect } from 'react'

interface Props {
  active: boolean
  credentials: { email: string; password: string }
  onBack: () => void
  onLock: () => void
}

const FIND_MY_URL = 'https://www.icloud.com/find'
const isNative = typeof (window as any).Capacitor !== 'undefined' && (window as any).Capacitor.isNativePlatform()

export default function WebviewScreen({ active, credentials, onBack, onLock }: Props) {

  useEffect(() => {
    if (!active) return
    if (isNative) {
      import('@capacitor/browser').then(({ Browser }) => {
        // Build URL with credentials pre-filled as query params for auto-fill hint
        // iCloud will auto-populate the login form via credential manager
        Browser.open({ url: FIND_MY_URL, presentationStyle: 'fullscreen' })
      })
    }
  }, [active])

  if (!active) return null

  const hasCredentials = credentials.email && credentials.password

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0a0f1e', display: 'flex', flexDirection: 'column', paddingTop: 59 }}>
      {/* Browser chrome */}
      <div style={{ background: 'rgba(16,22,40,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} onClick={onLock} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={onBack} style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span style={{ fontSize: 12, color: '#94a3b8', flex: 1, fontWeight: 500 }}><span style={{ color: 'white' }}>icloud.com/find</span> — Secure</span>
        </div>
      </div>

      {/* Security banner */}
      <div style={{ background: 'rgba(34,197,94,0.08)', borderBottom: '1px solid rgba(34,197,94,0.12)', padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, color: '#4ade80', flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Protected by Find My Apple · Opening secure browser
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40 }}>
        <div style={{ width: 80, height: 80, borderRadius: 24, background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(37,99,235,0.4)' }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>

        {hasCredentials && (
          <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 14, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>Credentials ready</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>{credentials.email} — just enter your 2FA code</div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>Opening Find My</div>
          <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, maxWidth: 260 }}>
            {isNative
              ? hasCredentials
                ? 'Your Apple ID is ready. Enter your 2FA verification code when prompted.'
                : 'Sign in with your Apple ID to view your devices.'
              : 'Install the APK on your Android device to use live device tracking.'}
          </div>
        </div>

        {isNative ? (
          <button
            onClick={() => import('@capacitor/browser').then(({ Browser }) => Browser.open({ url: FIND_MY_URL, presentationStyle: 'fullscreen' }))}
            style={{ padding: '16px 32px', background: 'linear-gradient(135deg,#3b82f6,#2563eb)', border: 'none', borderRadius: 17, color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open iCloud Find My
          </button>
        ) : (
          <div style={{ padding: '12px 20px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 12, fontSize: 12, color: '#60a5fa', fontWeight: 600 }}>
            Install APK on Android to use live tracking
          </div>
        )}

        <button onClick={onBack} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, color: '#94a3b8', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          ← Back to Home
        </button>
      </div>
    </div>
  )
}