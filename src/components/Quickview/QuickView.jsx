import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import "./QuickView.css";

const QuickView = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getCartQuantity, refreshCart, openCart } = useCart();

  useEffect(() => {
    if (product && isOpen) {
      const firstAvailableSize = getAvailableSizes()[0] || product.sizes[0];
      setSelectedSize(firstAvailableSize);

      const availableColors = getAvailableColorsForSize(firstAvailableSize);
      setSelectedColor(availableColors[0] || product.colors[0]);

      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!product) return null;

  // ─── Inventory Helpers ───────────────────────────────────────────────
  const getAvailableSizes = () => {
    const sizesWithStock = product.inventory
      .filter((item) => item.count > 0)
      .map((item) => item.size);
    return [...new Set(sizesWithStock)];
  };

  const getAvailableColors = () => {
    const colorsWithStock = product.inventory
      .filter((item) => item.count > 0)
      .map((item) => item.color);
    return [...new Set(colorsWithStock)];
  };

  const getAvailableColorsForSize = (size) => {
    return product.inventory
      .filter((item) => item.size === size && item.count > 0)
      .map((item) => item.color);
  };

  const getAvailableSizesForColor = (color) => {
    return product.inventory
      .filter((item) => item.color === color && item.count > 0)
      .map((item) => item.size);
  };

  const getCurrentVariant = () => {
    if (!selectedSize || !selectedColor) return null;
    return product.inventory.find(
      (i) => i.size === selectedSize && i.color === selectedColor,
    );
  };

  const getCurrentStock = () => {
    const variant = getCurrentVariant();
    return variant ? variant.count : 0;
  };

  const getCurrentPrice = () => {
    const variant = getCurrentVariant();
    return variant ? variant.price : product.price;
  };

  // ─── Handlers ────────────────────────────────────────────────────────
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const availableColorsForSize = getAvailableColorsForSize(size);
    if (!availableColorsForSize.includes(selectedColor)) {
      setSelectedColor(availableColorsForSize[0] || product.colors[0]);
    }
    setQuantity(1);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const availableSizesForColor = getAvailableSizesForColor(color);
    if (!availableSizesForColor.includes(selectedSize)) {
      setSelectedSize(availableSizesForColor[0] || product.sizes[0]);
    }
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (selectedSize && selectedColor && availableToAdd > 0) {
      const variant = getCurrentVariant();
      await addToCart({
        id: product.id,
        variantId: variant?.variantId || null,
        quantity: quantity,
        name: product.name,
        image: product.image,
        price: variationPrice,
        size: selectedSize,
        color: selectedColor,
        stockAvailable: currentStock,
      });
      await refreshCart();
      openCart();
      setTimeout(() => onClose(), 800);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
  };

  // ─── Derived state ───────────────────────────────────────────────────
  const currentStock = getCurrentStock();
  const variationPrice = getCurrentPrice();
  const cartQuantity = getCartQuantity(product.id, selectedSize, selectedColor);
  const availableToAdd = currentStock - cartQuantity;
  const availableColorsForSize = getAvailableColorsForSize(selectedSize);
  const availableSizesForColor = getAvailableSizesForColor(selectedColor);

  // ─── Animation Variants ──────────────────────────────────────────────
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 30, stiffness: 300 },
    },
    exit: {
      x: "100%",
      transition: { type: "spring", damping: 30, stiffness: 300 },
    },
  };

  // ─── Color resolver ──────────────────────────────────────────────────
  const resolveColor = (color) => {
    if (product.colorMap?.[color]) return product.colorMap[color];
    const map = {
      black: "#000", white: "#fff", navy: "#001f3f", camel: "#c19a6b",
      cream: "#fffdd0", charcoal: "#36454f", champagne: "#f7e7ce",
      emerald: "#50c878", tan: "#d2b48c", ivory: "#fffff0",
      "dusty rose": "#dcae96", beige: "#f5f5dc", burgundy: "#800020",
      cognac: "#9a463d", sand: "#c2b280", "sky blue": "#87ceeb", khaki: "#f0e68c",
    };
    return map[color.toLowerCase()] || "#ccc";
  };

  const isLightColor = (color) =>
    ["white", "cream", "ivory", "champagne", "beige", "khaki"].includes(color.toLowerCase()) ||
    product.colorMap?.[color]?.toLowerCase() === "#ffffff";

  // ───────────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="quick-view-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="quick-view-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="quick-view-header">
              <h2>Quick View</h2>
              <button className="close-btn" onClick={onClose} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="quick-view-content">
              {/* Images */}
              <div className="quick-view-images">
                <motion.div
                  className="main-image"
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={product.images[selectedImage]} alt={product.name} />
                </motion.div>

                {product.images.length > 1 && (
                  <div className="thumbnails">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img src={image} alt={`${product.name} ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="quick-view-info">
                <div className="product-header">
                  <h1>{product.name}</h1>
                  <p className="price">{variationPrice} EGP</p>
                  {product.subcategory && (
                    <p className="category">{product.subcategory}</p>
                  )}
                </div>

                {product.description && (
                  <p className="description">{product.description}</p>
                )}

                {/* Size */}
                {product.sizes.length > 0 && (
                  <div className="option-group">
                    <label>Size</label>
                    <div className="size-options">
                      {product.sizes.map((size) => {
                        const isSizeAvailable = getAvailableSizes().includes(size);
                        return (
                          <button
                            key={size}
                            className={`size-btn ${selectedSize === size ? "active" : ""} ${!isSizeAvailable ? "sold-out" : ""}`}
                            onClick={() => isSizeAvailable && handleSizeSelect(size)}
                            disabled={!isSizeAvailable}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Color */}
                {product.colors.length > 0 && (
                  <div className="option-group">
                    <label>Color: <span className="color-name">{selectedColor}</span></label>
                    <div className="color-options">
                      {product.colors.map((color) => {
                        const isColorAvailable = getAvailableColors().includes(color);
                        return (
                          <button
                            key={color}
                            className={`color-btn ${selectedColor === color ? "active" : ""} ${!isColorAvailable ? "sold-out" : ""}`}
                            onClick={() => isColorAvailable && handleColorSelect(color)}
                            disabled={!isColorAvailable}
                            title={color}
                            style={{
                              backgroundColor: resolveColor(color),
                              border: isLightColor(color) ? "2px solid #ddd" : "none",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Stock info */}
                {availableToAdd > 0 && availableToAdd <= 5 && (
                  <div className="stock-warning">
                    Only {availableToAdd} left in stock!
                    {cartQuantity > 0 && ` (${cartQuantity} already in cart)`}
                  </div>
                )}
                {availableToAdd === 0 && cartQuantity > 0 && (
                  <div className="stock-out">
                    You have {cartQuantity} of this item in your cart (max available)
                  </div>
                )}
                {availableToAdd === 0 && cartQuantity === 0 && (
                  <div className="stock-out">This combination is currently out of stock</div>
                )}

                {/* Quantity */}
                <div className="option-group">
                  <label>Quantity</label>
                  <div className="quantity-selector">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>−</button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(availableToAdd, quantity + 1))}
                      disabled={quantity >= availableToAdd || availableToAdd === 0}
                    >+</button>
                  </div>
                </div>

                {/* Actions */}
                <div className="quick-view-actions">
                  <button className="btn-outline" onClick={handleAddToCart} disabled={availableToAdd === 0}>
                    {availableToAdd === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button className="btn-primary" onClick={handleBuyNow} disabled={availableToAdd === 0}>
                    {availableToAdd === 0 ? "Out of Stock" : "Buy It Now"}
                  </button>
                </div>

                {/* Meta */}
                <div className="product-meta">
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{product.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Availability:</span>
                    <span className={availableToAdd > 0 ? "in-stock" : "out-of-stock"}>
                      {availableToAdd > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickView;
