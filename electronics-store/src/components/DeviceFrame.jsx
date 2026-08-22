import { useState, useEffect } from 'react'

function padZero(n) { return String(n).padStart(2, '0') }

function LiveTime() {
  const [time, setTime] = useState(() => {
    const d = new Date()
    return `${padZero(d.getHours())}:${padZero(d.getMinutes())}`
  })
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date()
      setTime(`${padZero(d.getHours())}:${padZero(d.getMinutes())}`)
    }, 10_000)
    return () => clearInterval(id)
  }, [])
  return <span className="df-time">{time}</span>
}

const SignalBars = () => (
  <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden="true">
    <rect x="0"   y="7" width="2.5" height="4"  rx=".5" opacity=".4"/>
    <rect x="3.5" y="4.5" width="2.5" height="6.5" rx=".5" opacity=".6"/>
    <rect x="7"   y="2" width="2.5" height="9"  rx=".5" opacity=".8"/>
    <rect x="10.5" y="0" width="2.5" height="11" rx=".5"/>
  </svg>
)

const WifiIcon = () => (
  <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor" aria-hidden="true">
    <path d="M7.5 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-3.2a5 5 0 0 1 3.6 1.5l1.4-1.4A7 7 0 0 0 7.5 3.2a7 7 0 0 0-5 2.2L4 6.8A5 5 0 0 1 7.5 5.3zm0-4.6a9 9 0 0 1 6.5 2.7L15.4.9A11.2 11.2 0 0 0 7.5 0 11.2 11.2 0 0 0-.4.9l1.4 1.5A9 9 0 0 1 7.5.7z"/>
  </svg>
)

const BatteryIcon = () => (
  <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor" aria-hidden="true">
    <rect x=".5" y=".5" width="20" height="11" rx="3" stroke="currentColor" strokeWidth="1" fill="none"/>
    <rect x="2" y="2" width="15" height="8" rx="1.5"/>
    <path d="M22 4v4a2 2 0 0 0 0-4z"/>
  </svg>
)

export default function DeviceFrame({ type, onClose, children }) {
  const isIOS = type === 'ios'

  return (
    <div className="df-bg">
      {/* Top label bar */}
      <div className="df-top-bar">
        <div className="df-device-name">
          <span className={`df-os-dot ${isIOS ? 'ios' : 'android'}`} />
          {isIOS ? 'iPhone 16 Pro · iOS 18' : 'Pixel 9 Pro · Android 15'}
        </div>
        <div className="df-switcher">
          <button
            className={!isIOS ? 'active' : ''}
            onClick={() => onClose('android')}
          >
            Android
          </button>
          <button
            className={isIOS ? 'active' : ''}
            onClick={() => onClose('ios')}
          >
            iOS
          </button>
          <button className="df-exit" onClick={() => onClose(null)}>
            Exit Preview
          </button>
        </div>
      </div>

      {/* Phone shell */}
      <div className={`df-phone ${isIOS ? 'df-ios' : 'df-android'}`}>

        {/* Physical side buttons (decorative) */}
        <div className="df-side-left">
          <div className="df-btn" />
          <div className="df-btn tall" />
          <div className="df-btn tall" />
        </div>
        <div className="df-side-right">
          <div className="df-btn tall" />
        </div>

        {/* OS Status bar */}
        <div className="df-status-bar">
          <LiveTime />
          {isIOS   && <div className="df-island" />}
          {!isIOS  && <div className="df-camera-hole" />}
          <div className="df-status-icons">
            <SignalBars />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Scrollable app content */}
        <div className="df-screen">
          {children}
        </div>

        {/* Bottom OS chrome */}
        {isIOS ? (
          <div className="df-home-bar"><div className="df-home-pill" /></div>
        ) : (
          <div className="df-android-nav">
            <button aria-label="Back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button aria-label="Home">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="5"/>
              </svg>
            </button>
            <button aria-label="Recents">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      <p className="df-hint">Scroll inside the phone frame to explore the app</p>
    </div>
  )
}
