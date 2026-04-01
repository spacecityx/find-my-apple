import { useState, useRef } from 'react'
import { Screen } from '../types'
import SplashScreen from '../components/SplashScreen'
import BiometricOverlay from '../components/BiometricOverlay'
import HomeScreen from '../components/HomeScreen'
import CredentialsScreen from '../components/CredentialsScreen'
import WebviewScreen from '../components/WebviewScreen'
import BlockedOverlay from '../components/BlockedOverlay'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [sessionStart, setSessionStart] = useState<Date|null>(null)
  const credentialsRef = useRef<{email:string;password:string}>({email:'',password:''})

  const goTo = (s: Screen) => {
    if (s === 'home') setSessionStart(new Date())
    if (s === 'splash') setSessionStart(null)
    setScreen(s)
  }

  const handleCredentials = (email: string, password: string) => {
    credentialsRef.current = { email, password }
    goTo('webview')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-950)' }}>
      <div style={{ position: 'relative', width: 390, height: 844, borderRadius: 54, background: '#111218', border: '1.5px solid rgba(255,255,255,0.12)', boxShadow: '0 40px 80px rgba(0,0,0,0.8)', overflow: 'hidden' }}>
        <SplashScreen active={screen === 'splash'} onOpen={() => goTo('biometric')} />
        <BiometricOverlay active={screen === 'biometric'} onSuccess={() => goTo('home')} onCancel={() => goTo('splash')} />
        <HomeScreen active={screen === 'home'} sessionStart={sessionStart} onLock={() => goTo('splash')} onOpenFindMy={() => goTo('credentials')} onTestBlocked={() => goTo('blocked')} />
        <CredentialsScreen active={screen === 'credentials'} onContinue={handleCredentials} onSkip={() => goTo('webview')} onBack={() => goTo('home')} />
        <WebviewScreen active={screen === 'webview'} credentials={credentialsRef.current} onBack={() => goTo('home')} onLock={() => goTo('splash')} />
        <BlockedOverlay active={screen === 'blocked'} onHome={() => goTo('home')} onBack={() => goTo('webview')} />
      </div>
    </div>
  )
}