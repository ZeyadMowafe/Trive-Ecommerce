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
            {cartItems.map((item) => (
              <div key={item.cartId} className="cart-item-row">
                <div className="cart-item-image">
                  <Link to={`/product/${item.slug}`}>
                    <img src={item.images[0]} alt={item.name} />
                  </Link>
                </div>

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-meta">Size: {item.size} | Color: {item.color}</p>
                  <p className="item-price-mobile">{item.price} EGP</p>
                </div>

                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                </div>

                <div className="cart-item-price">
                  {(item.price * item.quantity).toFixed(2)} EGP
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.cartId)}
                  aria-label="Remove item"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
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
