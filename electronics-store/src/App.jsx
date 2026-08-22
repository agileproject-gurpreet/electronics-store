import { useState, useMemo } from 'react'
import products        from './data/products'
import LoginScreen     from './components/LoginScreen'
import Header          from './components/Header'
import Sidebar         from './components/Sidebar'
import ProductCard     from './components/ProductCard'
import ProductDetail   from './components/ProductDetail'
import CartDrawer      from './components/CartDrawer'
import DeviceFrame     from './components/DeviceFrame'
import './App.css'

const PER_PAGE_GRID = 12
const PER_PAGE_LIST = 8
const MAX_PRICE     = 2500

export default function App() {
  // auth
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail]           = useState('')

  // filters
  const [search,         setSearch]         = useState('')
  const [category,       setCategory]       = useState('All')
  const [selectedBrands, setSelectedBrands] = useState(new Set())
  const [priceRange,     setPriceRange]     = useState([0, MAX_PRICE])
  const [minRating,      setMinRating]      = useState(0)
  const [sortBy,         setSortBy]         = useState('featured')

  // view
  const [viewMode,    setViewMode]    = useState('grid')
  const [page,        setPage]        = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [deviceMode,  setDeviceMode]  = useState(null)

  // detail / cart / wishlist
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart,     setCart]     = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState(new Set())

  // derived: categories + brands + counts
  const allCategories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))].sort()
    return ['All', ...cats]
  }, [])

  const allBrands = useMemo(
    () => [...new Set(products.map(p => p.brand))].sort(),
    [],
  )

  const categoryCounts = useMemo(() => {
    const counts = { All: products.length }
    products.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return counts
  }, [])

  // filtered + sorted products
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return products
      .filter(p => category === 'All' || p.category === category)
      .filter(p => selectedBrands.size === 0 || selectedBrands.has(p.brand))
      .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      .filter(p => p.rating >= minRating)
      .filter(p => !q || p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.includes(q))))
      .sort((a, b) => {
        if (sortBy === 'price-asc')  return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating')     return b.rating - a.rating
        if (sortBy === 'newest')     return b.id - a.id
        return 0
      })
  }, [category, selectedBrands, priceRange, minRating, search, sortBy])

  const perPage    = viewMode === 'grid' ? PER_PAGE_GRID : PER_PAGE_LIST
  const totalPages = Math.ceil(filtered.length / perPage)
  const paged      = filtered.slice((page - 1) * perPage, page * perPage)

  const hasFilters = category !== 'All' || selectedBrands.size > 0 ||
    minRating > 0 || priceRange[0] > 0 || priceRange[1] < MAX_PRICE || !!search.trim()

  // cart helpers
  function addToCart(product) {
    setCart(prev => {
      const hit = prev.find(i => i.product.id === product.id)
      return hit
        ? prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { product, qty: 1 }]
    })
    setCartOpen(true)
  }

  function updateCartQty(id, qty) {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i))
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.product.id !== id))
  }

  function toggleWishlist(id) {
    setWishlist(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function changeCategory(cat) { setCategory(cat); setPage(1) }

  function toggleBrand(brand) {
    setSelectedBrands(prev => {
      const next = new Set(prev)
      next.has(brand) ? next.delete(brand) : next.add(brand)
      return next
    })
    setPage(1)
  }

  function handleSearch(val) { setSearch(val); setPage(1); setSelectedProduct(null) }

  function clearFilters() {
    setCategory('All'); setSelectedBrands(new Set()); setPriceRange([0, MAX_PRICE])
    setMinRating(0); setSearch(''); setPage(1)
  }

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  if (!isLoggedIn) {
    return <LoginScreen onLogin={e => { setEmail(e); setIsLoggedIn(true) }} />
  }

  const appShell = (
    <div className="app-root">
      <Header
        email={email}
        search={search}
        onSearch={handleSearch}
        cartCount={cartCount}
        wishlistCount={wishlist.size}
        onCartOpen={() => setCartOpen(true)}
        onWishlistOpen={() => setCartOpen(true)}
        onSignOut={() => setIsLoggedIn(false)}
        onLogoClick={() => { setSelectedProduct(null); clearFilters() }}
        deviceMode={deviceMode}
        onDevicePreview={setDeviceMode}
      />

      <div className="app-body">
        <Sidebar
          categories={allCategories}
          categoryCounts={categoryCounts}
          selectedCategory={category}
          onCategoryChange={changeCategory}
          brands={allBrands}
          selectedBrands={selectedBrands}
          onBrandToggle={toggleBrand}
          priceRange={priceRange}
          onPriceRangeChange={r => { setPriceRange(r); setPage(1) }}
          minRating={minRating}
          onRatingChange={r => { setMinRating(r); setPage(1) }}
          hasFilters={hasFilters}
          onClearFilters={clearFilters}
          mobileOpen={sidebarOpen}
          onMobileClose={() => setSidebarOpen(false)}
        />

        <main className="main-content">
          {selectedProduct ? (
            <ProductDetail
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
              onAddToCart={() => addToCart(selectedProduct)}
              isWishlisted={wishlist.has(selectedProduct.id)}
              onToggleWishlist={() => toggleWishlist(selectedProduct.id)}
            />
          ) : (
            <>
              {/* Toolbar */}
              <div className="catalogue-toolbar">
                <div className="toolbar-left">
                  <button
                    className="filter-toggle-btn"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open filters"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="4" y1="6" x2="20" y2="6"/>
                      <line x1="8" y1="12" x2="16" y2="12"/>
                      <line x1="11" y1="18" x2="13" y2="18"/>
                    </svg>
                    Filters
                  </button>
                  <p className="result-count">
                    <strong>{filtered.length}</strong>&nbsp;product{filtered.length !== 1 ? 's' : ''}
                    {category !== 'All' && <>&nbsp;in <em>{category}</em></>}
                  </p>
                </div>
                <div className="toolbar-right">
                  <label className="sort-label" htmlFor="sort-select">Sort</label>
                  <select
                    id="sort-select"
                    className="sort-select"
                    value={sortBy}
                    onChange={e => { setSortBy(e.target.value); setPage(1) }}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                  </select>
                  <div className="view-toggle" role="group" aria-label="View mode">
                    <button
                      className={viewMode === 'grid' ? 'active' : ''}
                      onClick={() => { setViewMode('grid'); setPage(1) }}
                      title="Grid view"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <rect x="0" y="0" width="7" height="7" rx="1"/>
                        <rect x="9" y="0" width="7" height="7" rx="1"/>
                        <rect x="0" y="9" width="7" height="7" rx="1"/>
                        <rect x="9" y="9" width="7" height="7" rx="1"/>
                      </svg>
                    </button>
                    <button
                      className={viewMode === 'list' ? 'active' : ''}
                      onClick={() => { setViewMode('list'); setPage(1) }}
                      title="List view"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <line x1="5" y1="3" x2="16" y2="3"/>
                        <line x1="5" y1="8" x2="16" y2="8"/>
                        <line x1="5" y1="13" x2="16" y2="13"/>
                        <circle cx="1.5" cy="3" r="1.5" fill="currentColor" stroke="none"/>
                        <circle cx="1.5" cy="8" r="1.5" fill="currentColor" stroke="none"/>
                        <circle cx="1.5" cy="13" r="1.5" fill="currentColor" stroke="none"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Active filter chips */}
              {hasFilters && (
                <div className="filter-chips" role="list" aria-label="Active filters">
                  {category !== 'All' && (
                    <span className="chip" role="listitem">
                      {category}
                      <button onClick={() => changeCategory('All')} aria-label={`Remove ${category}`}>×</button>
                    </span>
                  )}
                  {[...selectedBrands].map(b => (
                    <span className="chip" role="listitem" key={b}>
                      {b}
                      <button onClick={() => toggleBrand(b)} aria-label={`Remove ${b}`}>×</button>
                    </span>
                  ))}
                  {minRating > 0 && (
                    <span className="chip" role="listitem">
                      {'★'.repeat(minRating)} & up
                      <button onClick={() => setMinRating(0)} aria-label="Remove rating">×</button>
                    </span>
                  )}
                  {search && (
                    <span className="chip chip-search" role="listitem">
                      &ldquo;{search}&rdquo;
                      <button onClick={() => handleSearch('')} aria-label="Clear search">×</button>
                    </span>
                  )}
                  <button className="chip chip-clear" onClick={clearFilters}>Clear all</button>
                </div>
              )}

              {/* Products */}
              {paged.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon" aria-hidden="true">🔍</div>
                  <h3>No products match your filters</h3>
                  <p>Try broadening your search or adjusting the filters.</p>
                  <button className="btn-primary" onClick={clearFilters}>Clear all filters</button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'product-grid' : 'product-list-wrap'}>
                  {paged.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode={viewMode}
                      onSelect={() => setSelectedProduct(product)}
                      onAddToCart={() => addToCart(product)}
                      isWishlisted={wishlist.has(product.id)}
                      onToggleWishlist={() => toggleWishlist(product.id)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="pagination" aria-label="Product pages">
                  <button
                    className="page-btn"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    ← Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      className={`page-btn ${n === page ? 'active' : ''}`}
                      onClick={() => setPage(n)}
                      aria-current={n === page ? 'page' : undefined}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    className="page-btn"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next →
                  </button>
                </nav>
              )}
            </>
          )}
        </main>
      </div>

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
      />

      <footer className="site-footer">
        <span>© 2026 CircuitStore — Curated Electronics</span>
        <span>Privacy&nbsp;·&nbsp;Terms&nbsp;·&nbsp;Support</span>
      </footer>
    </div>
  )

  if (deviceMode) {
    return (
      <DeviceFrame type={deviceMode} onClose={setDeviceMode}>
        {appShell}
      </DeviceFrame>
    )
  }

  return appShell
}
