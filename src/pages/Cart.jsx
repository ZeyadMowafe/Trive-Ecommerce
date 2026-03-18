import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-page">
        <div className="container-custom">
          <motion.div
            className="empty-cart-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
            <Link to="/shop" className="btn-primary">Start Shopping</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container-custom">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items-section">
            {cartItems.map((item) => {
              const isMaxStock = item.quantity >= item.stockAvailable;

              return (
                <motion.div
                  key={item.cartId}
                  className="cart-item-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="cart-item-image">
                    <Link to={`/product/${item.slug}`}>
                      <img src={item.images?.[0] || item.image || '/placeholder.jpg'} alt={item.name} />
                    </Link>
                  </div>

                  <div className="cart-item-details">
                    <Link to={`/product/${item.slug}`} className="cart-item-name-link">
                      <h3>{item.name}</h3>
                    </Link>
                    <div className="item-meta">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>

                    {isMaxStock && (
                      <p className="stock-limit-msg">
                        Max stock reached ({item.stockAvailable})
                      </p>
                    )}

                    <div className="cart-item-price">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          disabled={isMaxStock}
                          aria-label="Increase quantity"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.cartId)}
                        aria-label="Remove item"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{getCartTotal().toFixed(2)} EGP</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{getCartTotal().toFixed(2)} EGP</span>
            </div>
            <Link to="/checkout" className="btn-primary w-100">
              Proceed to Checkout
            </Link>
            <Link to="/shop" className="btn-outline w-100">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;