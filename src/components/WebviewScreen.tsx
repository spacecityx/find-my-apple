import { useEffect, useRef, useState } from 'react'

interface Props {
  active: boolean
  onBack: () => void
  onLock: () => void
}

const FIND_MY_URL = 'https://www.icloud.com/find'

export default function WebviewScreen({ active, onBack, onLock }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loading, setLoading] = useState(true)
  const [currentUrl, setCurrentUrl] = useState(FIND_MY_URL)

  useEffect(() => {
    if (active) { setLoading(true); setCurrentUrl(FIND_MY_URL) }
  }, [active])

  if (!active) return null

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0a0f1e', display: 'flex', flexDirection: 'column', paddingTop: 59 }}>
      {/* Browser chrome */}
      <div style={{ background: 'rgba(16,22,40,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', cursor: 'pointer' }} onClick={onLock} title="Lock" />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <button onClick={onBack} style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => { setLoading(true); setCurrentUrl(FIND_MY_URL + '?t=' + Date.now()) }} style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.05)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
            </button>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span style={{ fontSize: 12, color: '#94a3b8', flex: 1, fontWeight: 500 }}>
            <span style={{ color: 'white' }}>icloud.com/find</span> — Secure
          </span>
        </div>
      </div>

      {/* Security banner */}
      <div style={{ background: 'rgba(34,197,94,0.08)', borderBottom: '1px solid rgba(34,197,94,0.12)', padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 600, color: '#4ade80', flexShrink: 0 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Protected by Find My Apple · Sign in with your Apple ID
      </div>

      {/* Loading indicator */}
      {loading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 10 }}>
          <div style={{ width: 40, height: 40, border: '3px solid rgba(59,130,246,0.2)', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>Loading Find My...</div>
        </div>
      )}

      {/* Real iCloud Find My WebView */}
      <iframe
        ref={iframeRef}
        src={currentUrl}
        style={{ flex: 1, border: 'none', width: '100%', opacity: loading ? 0 : 1, transition: 'opacity 0.3s' }}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        allow="geolocation"
        title="Find My"
      />
    </div>
  )
}