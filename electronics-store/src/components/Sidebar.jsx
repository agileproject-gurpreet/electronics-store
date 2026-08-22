import { useState } from 'react'

const RATING_OPTIONS = [4, 3, 2]

function Section({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="sidebar-section">
      <button className="sidebar-section-head" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{title}</span>
        <span className={`sidebar-chevron ${open ? 'open' : ''}`}>›</span>
      </button>
      {open && <div className="sidebar-section-body">{children}</div>}
    </div>
  )
}

export default function Sidebar({
  categories, categoryCounts,
  selectedCategory, onCategoryChange,
  brands, selectedBrands, onBrandToggle,
  priceRange, onPriceRangeChange,
  minRating, onRatingChange,
  hasFilters, onClearFilters,
  mobileOpen, onMobileClose,
}) {
  const maxPrice = 2500

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onMobileClose} aria-hidden="true" />
      )}

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`} aria-label="Product filters">
        {/* Sidebar brand mark */}
        <div className="sidebar-brand" aria-hidden="true">
          <span className="logo-bolt">⚡</span>
          <span>CircuitStore</span>
        </div>

        {/* Categories */}
        <Section title="Categories">
          <ul className="sidebar-cat-list">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  className={`sidebar-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => { onCategoryChange(cat); onMobileClose() }}
                >
                  <span>{cat === 'All' ? 'All Products' : cat}</span>
                  <span className="cat-count">{categoryCounts[cat] ?? 0}</span>
                </button>
              </li>
            ))}
          </ul>
        </Section>

        {/* Price range */}
        <Section title="Price Range">
          <div className="price-range-inputs">
            <div className="price-input-wrap">
              <span>$</span>
              <input
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={e => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                aria-label="Minimum price"
              />
            </div>
            <span className="price-dash">—</span>
            <div className="price-input-wrap">
              <span>$</span>
              <input
                type="number"
                min={priceRange[0]}
                max={maxPrice}
                value={priceRange[1]}
                onChange={e => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                aria-label="Maximum price"
              />
            </div>
          </div>
          <div className="price-range-track">
            <div
              className="price-range-fill"
              style={{
                left: `${(priceRange[0] / maxPrice) * 100}%`,
                right: `${100 - (priceRange[1] / maxPrice) * 100}%`,
              }}
            />
          </div>
        </Section>

        {/* Brands */}
        <Section title="Brands">
          <ul className="sidebar-check-list">
            {brands.map(brand => (
              <li key={brand}>
                <label className="sidebar-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedBrands.has(brand)}
                    onChange={() => onBrandToggle(brand)}
                  />
                  <span className="check-mark" />
                  <span>{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        </Section>

        {/* Rating */}
        <Section title="Min. Rating">
          <ul className="sidebar-rating-list">
            {RATING_OPTIONS.map(r => (
              <li key={r}>
                <button
                  className={`sidebar-rating-btn ${minRating === r ? 'active' : ''}`}
                  onClick={() => onRatingChange(minRating === r ? 0 : r)}
                >
                  {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                  <span className="rating-label">&amp; up</span>
                </button>
              </li>
            ))}
          </ul>
        </Section>

        {hasFilters && (
          <button className="sidebar-clear-btn" onClick={onClearFilters}>
            Clear all filters
          </button>
        )}
      </aside>
    </>
  )
}
