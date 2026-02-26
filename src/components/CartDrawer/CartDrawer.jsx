import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
import "./CartDrawer.css";

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
            />

            {/* Drawer */}
            <motion.div
              className="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="cart-header">
                <h2>Shopping Cart</h2>
                <button
                  onClick={closeCart}
                  className="close-btn"
                  aria-label="Close cart"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <p>Your bag is empty</p>
                  <Link to="/shop" onClick={closeCart} className="btn-outline">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => {
                      const isMaxStock = item.quantity >= item.stockAvailable;

                      return (
                        <motion.div
                          key={item.cartId}
                          className="cart-item"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                        >
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="cart-item-image"
                          >
                            <img src={item.images?.[0] || item.image || '/placeholder.jpg'} alt={item.name} />
                          </Link>

                          <div className="cart-item-details">
                            <Link
                              to={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="cart-item-name-link"
                            >
                              <h3>{item.name}</h3>
                            </Link>
                            <div className="cart-item-meta">
                              <span>Size: {item.size}</span>
                              <span>Color: {item.color}</span>
                            </div>

                            {isMaxStock && (
                              <p className="stock-limit-msg">
                                Max stock reached ({item.stockAvailable})
                              </p>
                            )}

                            <div className="cart-item-actions">
                              <div className="quantity-control">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartId,
                                      item.quantity - 1,
                                    )
                                  }
                                  aria-label="Decrease quantity"
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.cartId,
                                      item.quantity + 1,
                                    )
                                  }
                                  disabled={isMaxStock}
                                  aria-label="Increase quantity"
                                  title={
                                    isMaxStock
                                      ? `Max available: ${item.stockAvailable}`
                                      : ""
                                  }
                                >
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
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
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="cart-item-price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Subtotal</span>
                      <span className="total-price">
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="cart-actions">
                      <Link
                        to="/cart"
                        onClick={closeCart}
                        className="btn-outline w-100"
                      >
                        View Cart
                      </Link>
                      <Link
                        to="/checkout"
                        onClick={closeCart}
                        className="btn-primary w-100"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
