import { useState, useRef } from 'react'
import { Screen } from '../types'
import SplashScreen from '../components/SplashScreen'
import BiometricOverlay from '../components/BiometricOverlay'
import HomeScreen from '../components/HomeScreen'
import WebviewScreen from '../components/WebviewScreen'
import BlockedOverlay from '../components/BlockedOverlay'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [selectedDevice, setSelectedDevice] = useState(0)
  const sessionStart = useRef<Date | null>(null)

  const goTo = (s: Screen) => {
    if (s === 'home') sessionStart.current = new Date()
    if (s === 'splash') sessionStart.current = null
    setScreen(s)
  }

  return (
    <div className="scene">
      <div className="scene-bg" />
      <div className="phone-wrapper">
        <div className="phone">
          <SplashScreen active={screen === 'splash'} onOpen={() => goTo('biometric')} />
          <BiometricOverlay active={screen === 'biometric'} onSuccess={() => goTo('home')} onCancel={() => goTo('splash')} />
          <HomeScreen active={screen === 'home'} sessionStart={sessionStart.current} onLock={() => goTo('splash')} onOpenFindMy={() => goTo('webview')} onTestBlocked={() => goTo('blocked')} />
          <WebviewScreen active={screen === 'webview'} selectedDevice={selectedDevice} onSelectDevice={setSelectedDevice} onBack={() => goTo('home')} onLock={() => goTo('splash')} />
          <BlockedOverlay active={screen === 'blocked'} onHome={() => goTo('home')} onBack={() => goTo('webview')} />
        </div>
      </div>
    </div>
  )
}