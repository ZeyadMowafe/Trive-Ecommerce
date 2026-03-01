import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import QuickView from "../Quickview/QuickView";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();

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
          </div>

          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-category">{product.categoryName}</p>
            <div className="product-footer">
              <span className="product-price">
                {`${product.price} EGP`}
              </span>
              <div className="product-colors">
                {product.colors.slice(0, 6).map((color, index) => (
                  <span
                    key={index}
                    className="color-dot"
                    style={{
                      backgroundColor: product.colorMap?.[color] || color.toLowerCase(),
                      border: (product.colorMap?.[color]?.toLowerCase() === "#ffffff" ||
                        color.toLowerCase() === "white" ||
                        color.toLowerCase() === "cream")
                        ? "1px solid #ddd" : "none",
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 6 && (
                  <span className="colors-more">+{product.colors.length - 6}</span>
                )}
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
