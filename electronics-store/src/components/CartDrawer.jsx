export default function CartDrawer({ cart, open, onClose, onUpdateQty, onRemove }) {
  const subtotal  = cart.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const itemCount = cart.reduce((sum, { qty }) => sum + qty, 0)
  const shipping  = subtotal > 0 ? (subtotal >= 100 ? 0 : 9.99) : 0

  return (
    <>
      <div
        className={`drawer-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`cart-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="drawer-header">
          <h2>
            Cart
            {itemCount > 0 && <span className="drawer-count">{itemCount}</span>}
          </h2>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {/* Items */}
        <div className="drawer-items">
          {cart.length === 0 ? (
            <div className="drawer-empty">
              <p className="drawer-empty-icon">🛒</p>
              <p>Your cart is empty.</p>
              <p className="drawer-empty-sub">Add some products to get started.</p>
            </div>
          ) : (
            cart.map(({ product, qty }) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} className="cart-item-img" />
                <div className="cart-item-body">
                  <p className="cart-item-brand">{product.brand}</p>
                  <p className="cart-item-name">{product.name}</p>
                  <div className="cart-item-row">
                    <div className="qty-control small">
                      <button onClick={() => onUpdateQty(product.id, qty - 1)} aria-label="Decrease">−</button>
                      <span>{qty}</span>
                      <button onClick={() => onUpdateQty(product.id, qty + 1)} aria-label="Increase">+</button>
                    </div>
                    <strong className="cart-item-price">
                      ${(product.price * qty).toLocaleString()}
                    </strong>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="drawer-line">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="drawer-line">
              <span>Shipping</span>
              <span>{shipping === 0 ? <em>Free</em> : `$${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="free-ship-note">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="drawer-line total">
              <span>Total</span>
              <span>${(subtotal + shipping).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <button className="btn-checkout">Proceed to Checkout →</button>
            <button className="btn-continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
