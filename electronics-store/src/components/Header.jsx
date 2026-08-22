const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)

const CartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const AndroidIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
    <path d="M1.5 5h11A1.5 1.5 0 0 1 14 6.5v6A1.5 1.5 0 0 1 12.5 14h-11A1.5 1.5 0 0 1 0 12.5v-6A1.5 1.5 0 0 1 1.5 5zm-.5 8h11V7H1v6zM4 4L2.5 2m7 2L11 2M4 6.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm6 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"/>
  </svg>
)

const AppleIcon = () => (
  <svg width="14" height="16" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-113.7C078 432.3 74.9 178.4 223.9 101.9 249.2 88.8 279.9 80 315.3 80c63.4 0 107.4 32.6 148.1 47.8 32.6 12.4 85.3 47.8 145.5 47.8 0 0 70.7-5.8 140.3-68.7zM511.4 7.2C537.4-4.5 578.4-15.9 620.3 0c25.4 9.4 91.4 36.9 121.8 125.7 0 0-93.3 53.1-97.8 175.9 0 0-74.4-81.4-133.1-106.6-26.2-11.3-64.9-30.7-89.4-73.5C454.5 119.8 476.9 22.3 511.4 7.2z"/>
  </svg>
)

export default function Header({
  email, search, onSearch,
  cartCount, wishlistCount,
  onCartOpen, onWishlistOpen, onSignOut, onLogoClick,
  deviceMode, onDevicePreview,
}) {
  return (
    <header className="site-header">
      {/* Logo */}
      <button className="header-logo" onClick={onLogoClick} aria-label="Go to homepage">
        <span className="logo-bolt">⚡</span>
        <span className="logo-text">CircuitStore</span>
      </button>

      {/* Search */}
      <div className="header-search">
        <span className="search-icon-wrap"><SearchIcon /></span>
        <input
          type="search"
          className="search-input"
          placeholder="Search products, brands, categories…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search products"
        />
        {search && (
          <button className="search-clear-btn" onClick={() => onSearch('')} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="header-actions">
        {/* Device preview toggles — only visible on desktop */}
        {onDevicePreview && (
          <div className="device-preview-toggle" role="group" aria-label="Device preview">
            <button
              className={`device-preview-btn ${deviceMode === 'android' ? 'active' : ''}`}
              onClick={() => onDevicePreview(deviceMode === 'android' ? null : 'android')}
              title="Android preview"
            >
              <AndroidIcon />
              <span>Android</span>
            </button>
            <button
              className={`device-preview-btn ${deviceMode === 'ios' ? 'active' : ''}`}
              onClick={() => onDevicePreview(deviceMode === 'ios' ? null : 'ios')}
              title="iOS preview"
            >
              <AppleIcon />
              <span>iOS</span>
            </button>
          </div>
        )}
        <button className="header-icon-btn" onClick={onWishlistOpen} aria-label={`Wishlist (${wishlistCount})`}>
          <HeartIcon filled={wishlistCount > 0} />
          {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
        </button>

        <button className="header-icon-btn" onClick={onCartOpen} aria-label={`Cart (${cartCount} items)`}>
          <CartIcon />
          {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
        </button>

        <button className="header-avatar" onClick={onSignOut} title={`Signed in as ${email} — click to sign out`}>
          {email.charAt(0).toUpperCase() || 'U'}
        </button>
      </div>
    </header>
  )
}
