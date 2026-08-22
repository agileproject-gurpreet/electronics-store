import { useEffect, useState } from 'react'

function Stars({ rating }) {
  return (
    <span className="stars large" aria-label={`${rating} out of 5`}>
      {'★'.repeat(Math.floor(rating))}
      {rating - Math.floor(rating) >= 0.5 && '★'}
      {'☆'.repeat(5 - Math.ceil(rating))}
    </span>
  )
}

export default function ProductDetail({
  product, onBack, onAddToCart, isWishlisted, onToggleWishlist,
}) {
  const [qty, setQty] = useState(1)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [product.id])

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  function handleAdd() {
    for (let i = 0; i < qty; i++) onAddToCart()
  }

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <button onClick={onBack}>Home</button>
        <span>›</span>
        <button onClick={onBack}>{product.category}</button>
        <span>›</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-image-col">
          <div className="detail-image-frame">
            <img src={product.image} alt={product.name} />
          </div>
          {product.badge && (
            <span className={`card-badge detail-badge badge-${product.badge.toLowerCase()}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="detail-info-col">
          <p className="detail-brand">{product.brand}</p>
          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating">
            <Stars rating={product.rating} />
            <span className="detail-rating-num">{product.rating}</span>
            <span className="detail-review-count">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="detail-price-row">
            <strong className="detail-price">${product.price.toLocaleString()}</strong>
            {product.originalPrice && (
              <>
                <span className="detail-price-old">${product.originalPrice.toLocaleString()}</span>
                <span className="price-off">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Stock */}
          <p className={`detail-stock ${product.stock <= 5 ? 'low' : ''}`}>
            {product.stock > 10 ? '✓ In stock' : `⚠ Only ${product.stock} left`}
          </p>

          {/* Qty + cart */}
          <div className="detail-cart-row">
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn-primary btn-add-cart" onClick={handleAdd}>
              Add to Cart
            </button>
            <button
              className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={onToggleWishlist}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWishlisted ? '♥' : '♡'}
            </button>
          </div>

          {/* Specs */}
          <div className="detail-specs">
            <h3>Specifications</h3>
            <table className="specs-table">
              <tbody>
                {product.specs.map(s => (
                  <tr key={s.label}>
                    <td className="spec-label">{s.label}</td>
                    <td className="spec-value">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Back */}
      <button className="back-link" onClick={onBack}>
        ← Back to collection
      </button>
    </div>
  )
}
