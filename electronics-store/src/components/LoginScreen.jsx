import { useState } from 'react'

export default function LoginScreen({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setLoading(true)
    // Simulate async auth round-trip
    setTimeout(() => { setLoading(false); onLogin(email) }, 600)
  }

  return (
    <div className="login-page">
      {/* ── Brand panel ── */}
      <div className="login-brand">
        <div className="login-brand-inner">
          <div className="login-logo">
            <span className="logo-bolt">⚡</span>
            <span>CircuitStore</span>
          </div>

          <h1 className="login-headline">
            Where technology<br />
            meets <em>intention.</em>
          </h1>

          <p className="login-brand-copy">
            Curated electronics for professionals, creators, and the relentlessly curious.
          </p>

          <div className="login-stats">
            <div className="stat">
              <strong>32+</strong>
              <span>Products</span>
            </div>
            <div className="stat">
              <strong>8</strong>
              <span>Brands</span>
            </div>
            <div className="stat">
              <strong>50 K+</strong>
              <span>Customers</span>
            </div>
          </div>
        </div>

        <div className="login-brand-deco" aria-hidden="true">
          <div className="deco-ring r1" />
          <div className="deco-ring r2" />
          <div className="deco-ring r3" />
        </div>
      </div>

      {/* ── Form panel ── */}
      <div className="login-form-panel">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2>Sign in</h2>
          <p className="login-subtitle">
            Access your personalized electronics storefront.
          </p>

          <div className="field-group">
            <label htmlFor="l-email">Email address</label>
            <input
              id="l-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              autoFocus
              disabled={loading}
            />
          </div>

          <div className="field-group">
            <label htmlFor="l-password">Password</label>
            <input
              id="l-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && <p className="field-error">{error}</p>}

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in to store'}
          </button>

          <p className="login-demo-note">
            Demo mode — any valid email works, password is not checked.
          </p>
        </form>
      </div>
    </div>
  )
}
