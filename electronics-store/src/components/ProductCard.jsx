function Stars({ rating }) {
  const full  = Math.floor(rating)
  const frac  = rating - full >= 0.5
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {'★'.repeat(full)}
      {frac && '★'}
      {'☆'.repeat(5 - full - (frac ? 1 : 0))}
    </span>
  )
}

function HeartBtn({ wishlisted, onToggle }) {
  return (
    <button
      className={`card-wish-btn ${wishlisted ? 'active' : ''}`}
      onClick={e => { e.stopPropagation(); onToggle() }}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {wishlisted ? '♥' : '♡'}
    </button>
  )
}

const BADGE_CLASS = {
  SALE:       'badge-sale',
  NEW:        'badge-new',
  BESTSELLER: 'badge-best',
}

// ── Grid card ────────────────────────────────────────────────────────────────
function GridCard({ product, onSelect, onAddToCart, isWishlisted, onToggleWishlist }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <article className="product-card" onClick={onSelect} tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      role="button" aria-label={`View ${product.name}`}
    >
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        {product.badge && (
          <span className={`card-badge ${BADGE_CLASS[product.badge] ?? ''}`}>
            {product.badge}
          </span>
        )}

        <HeartBtn wishlisted={isWishlisted} onToggle={onToggleWishlist} />

        <button
          className="card-cart-overlay"
          onClick={e => { e.stopPropagation(); onAddToCart() }}
          aria-label={`Add ${product.name} to cart`}
        >
          + Add to Cart
        </button>
      </div>

      <div className="card-body">
        <p className="card-brand">{product.brand}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-rating">
          <Stars rating={product.rating} />
          <span className="review-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="card-price">
          <strong className="price-now">${product.price.toLocaleString()}</strong>
          {product.originalPrice && (
            <>
              <span className="price-old">${product.originalPrice.toLocaleString()}</span>
              <span className="price-off">-{discount}%</span>
            </>
          )}
        </div>
        {product.stock <= 10 && (
          <p className="stock-warning">Only {product.stock} left</p>
        )}
      </div>
    </article>
  )
}

// ── List card ────────────────────────────────────────────────────────────────
function ListCard({ product, onSelect, onAddToCart, isWishlisted, onToggleWishlist }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <article className="product-list-card" onClick={onSelect} tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect()}
      role="button" aria-label={`View ${product.name}`}
    >
      <div className="list-card-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && (
          <span className={`card-badge ${BADGE_CLASS[product.badge] ?? ''}`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className="list-card-body">
        <p className="card-brand">{product.brand} · {product.category}</p>
        <h3 className="list-card-name">{product.name}</h3>
        <div className="card-rating">
          <Stars rating={product.rating} />
          <span className="review-count">({product.reviews.toLocaleString()} reviews)</span>
        </div>
        <p className="list-card-desc">{product.description}</p>
        <div className="list-card-specs">
          {product.specs.slice(0, 3).map(s => (
            <span key={s.label} className="spec-chip">{s.label}: {s.value}</span>
          ))}
        </div>
      </div>

      <div className="list-card-actions">
        <div className="card-price">
          <strong className="price-now">${product.price.toLocaleString()}</strong>
          {product.originalPrice && (
            <>
              <span className="price-old">${product.originalPrice.toLocaleString()}</span>
              <span className="price-off">-{discount}%</span>
            </>
          )}
        </div>
        {product.stock <= 10 && (
          <p className="stock-warning">Only {product.stock} left</p>
        )}
        <button
          className="btn-primary"
          onClick={e => { e.stopPropagation(); onAddToCart() }}
        >
          Add to Cart
        </button>
        <HeartBtn wishlisted={isWishlisted} onToggle={onToggleWishlist} />
      </div>
    </article>
  )
}

export default function ProductCard({ product, viewMode, onSelect, onAddToCart, isWishlisted, onToggleWishlist }) {
  const props = { product, onSelect, onAddToCart, isWishlisted, onToggleWishlist }
  return viewMode === 'list' ? <ListCard {...props} /> : <GridCard {...props} />
}
