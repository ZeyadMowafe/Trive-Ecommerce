import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import QuickView from "../QuickView/QuickView";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quickAddSuccess, setQuickAddSuccess] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Find first available combination
    const availableItem = product.inventory.find((item) => item.count > 0);
    if (availableItem) {
      addToCart({
        id: product.id,
        variantId: availableItem.variantId,
        quantity: 1,
        name: product.name,
        image: product.image,
        price: product.price,
        size: availableItem.size,
        color: availableItem.color,
        stockAvailable: availableItem.stock,
      });

      // Show success feedback
      setQuickAddSuccess(true);
      setTimeout(() => setQuickAddSuccess(false), 1500);
    }
  };

  const handleChooseOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  const isSoldOut = product.count === 0;

  return (
    <>
      <motion.div
        className={`product-card ${isSoldOut ? "sold-out" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/product/${product.slug}`} className="product-link">
          <div className="product-image-wrapper">
            {/* Show Sold Out badge if product is completely sold out */}
            {isSoldOut ? (
              <span className="product-badge sold-out-badge">Sold Out</span>
            ) : (
              <>
                {product.isNew && (
                  <span className="product-badge new">New</span>
                )}
                {product.isBestSeller && !product.isNew && (
                  <span className="product-badge bestseller">Best Seller</span>
                )}
              </>
            )}

            <div className="product-images">
              <img
                src={product.images[0]}
                alt={product.name}
                className={`product-image primary ${isHovered ? "fade-out" : "fade-in"}`}
              />
              {product.images[1] && (
                <img
                  src={product.images[1]}
                  alt={product.name}
                  className={`product-image secondary ${isHovered ? "fade-in" : "fade-out"}`}
                />
              )}
            </div>

            {/* Choose Options Button - Only show if not sold out */}
            {!isSoldOut && (
              <motion.div
                className="choose-options-btn"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 20,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onClick={handleChooseOptions}
              >
                <span>Choose Options</span>
              </motion.div>
            )}

            {/* Floating Cart Button (Bottom Right) - Only show if not sold out and has 1 variant */}
            {!isSoldOut && (
              <motion.button
                className={`floating-cart-btn ${quickAddSuccess ? "success" : ""}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovered || quickAddSuccess ? 1 : 0,
                  scale: isHovered || quickAddSuccess ? 1 : 0.8,
                }}
                onClick={product.inventory.length === 1 ? handleQuickAdd : handleChooseOptions}
                aria-label="Quick add to cart"
              >
                {quickAddSuccess ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                )}
              </motion.button>
            )}
          </div>

          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.subcategory}</p>
            <div className="product-footer">
              <span className="product-price">${product.price}</span>
              <div className="product-colors">
                {product.colors.slice(0, 3).map((color, index) => (
                  <span
                    key={index}
                    className="color-dot"
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "black"
                          ? "#000"
                          : color.toLowerCase() === "white"
                            ? "#fff"
                            : color.toLowerCase() === "navy"
                              ? "#001f3f"
                              : color.toLowerCase() === "camel"
                                ? "#c19a6b"
                                : color.toLowerCase() === "cream"
                                  ? "#fffdd0"
                                  : color.toLowerCase() === "charcoal"
                                    ? "#36454f"
                                    : color.toLowerCase() === "champagne"
                                      ? "#f7e7ce"
                                      : color.toLowerCase() === "emerald"
                                        ? "#50c878"
                                        : color.toLowerCase() === "tan"
                                          ? "#d2b48c"
                                          : color.toLowerCase() === "ivory"
                                            ? "#fffff0"
                                            : color.toLowerCase() ===
                                              "dusty rose"
                                              ? "#dcae96"
                                              : color.toLowerCase() === "beige"
                                                ? "#f5f5dc"
                                                : color.toLowerCase() ===
                                                  "burgundy"
                                                  ? "#800020"
                                                  : color.toLowerCase() ===
                                                    "cognac"
                                                    ? "#9a463d"
                                                    : color.toLowerCase() ===
                                                      "sand"
                                                      ? "#c2b280"
                                                      : color.toLowerCase() ===
                                                        "sky blue"
                                                        ? "#87ceeb"
                                                        : color.toLowerCase() ===
                                                          "khaki"
                                                          ? "#f0e68c"
                                                          : "#ccc",
                      border:
                        color.toLowerCase() === "white" ||
                          color.toLowerCase() === "cream" ||
                          color.toLowerCase() === "ivory"
                          ? "1px solid #ddd"
                          : "none",
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
