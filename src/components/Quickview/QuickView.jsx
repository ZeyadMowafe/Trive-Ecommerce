import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import "./QuickView.css";

const QuickView = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getCartQuantity } = useCart();

  useEffect(() => {
    if (product && isOpen) {
      // Set first available size and color when product changes
      const firstAvailableSize = getAvailableSizes()[0] || product.sizes[0];
      setSelectedSize(firstAvailableSize);

      const availableColors = getAvailableColorsForSize(firstAvailableSize);
      setSelectedColor(availableColors[0] || product.colors[0]);

      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product, isOpen]);

  useEffect(() => {
    // Lock body scroll when drawer is open
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

  // Get available sizes (any size that has at least one color in stock)
  const getAvailableSizes = () => {
    const sizesWithStock = product.inventory
      .filter((item) => item.count > 0)
      .map((item) => item.size);
    return [...new Set(sizesWithStock)];
  };

  // Get available colors for selected size
  const getAvailableColorsForSize = (size) => {
    return product.inventory
      .filter((item) => item.size === size && item.count > 0)
      .map((item) => item.color);
  };

  // Get available sizes for selected color
  const getAvailableSizesForColor = (color) => {
    return product.inventory
      .filter((item) => item.color === color && item.count > 0)
      .map((item) => item.size);
  };

  // Get stock for current selection
  const getCurrentStock = () => {
    if (!selectedSize || !selectedColor) return 0;
    const item = product.inventory.find(
      (i) => i.size === selectedSize && i.color === selectedColor,
    );
    return item ? item.count : 0;
  };

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

  const handleAddToCart = () => {
    if (selectedSize && selectedColor && availableToAdd > 0) {
      const variant = product.inventory.find(
        (v) => v.size === selectedSize && v.color === selectedColor,
      );
      addToCart({
        id: product.id,
        variantId: variant?.variantId,
        quantity: quantity,
        name: product.name,
        image: product.image,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        stockAvailable: currentStock,
      });
      // Show success feedback
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  const currentStock = getCurrentStock();
  const cartQuantity = getCartQuantity(product.id, selectedSize, selectedColor);
  const availableToAdd = currentStock - cartQuantity;
  const availableColorsForSize = getAvailableColorsForSize(selectedSize);
  const availableSizesForColor = getAvailableSizesForColor(selectedColor);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
  };

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
              <button
                className="close-btn"
                onClick={onClose}
                aria-label="Close"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="quick-view-content">
              {/* Images Section */}
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
                  <p className="price">${product.price}</p>
                  {product.subcategory && (
                    <p className="category">{product.subcategory}</p>
                  )}
                </div>

                {product.description && (
                  <p className="description">{product.description}</p>
                )}

                {/* Size Selection */}
                <div className="option-group">
                  <label>Size</label>
                  <div className="size-options">
                    {product.sizes.map((size) => {
                      const isSizeAvailable =
                        availableSizesForColor.includes(size);
                      return (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize === size ? "active" : ""} ${!isSizeAvailable ? "disabled" : ""}`}
                          onClick={() =>
                            isSizeAvailable && handleSizeSelect(size)
                          }
                          disabled={!isSizeAvailable}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="option-group">
                  <label>Color: {selectedColor}</label>
                  <div className="color-options">
                    {product.colors.map((color) => {
                      const isColorAvailable =
                        availableColorsForSize.includes(color);
                      return (
                        <button
                          key={color}
                          className={`color-btn ${selectedColor === color ? "active" : ""} ${!isColorAvailable ? "disabled" : ""}`}
                          onClick={() =>
                            isColorAvailable && handleColorSelect(color)
                          }
                          disabled={!isColorAvailable}
                          title={color}
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
                                                : color.toLowerCase() ===
                                                  "ivory"
                                                  ? "#fffff0"
                                                  : color.toLowerCase() ===
                                                    "dusty rose"
                                                    ? "#dcae96"
                                                    : color.toLowerCase() ===
                                                      "beige"
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
                                ? "2px solid #ddd"
                                : "none",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Stock Info */}
                {availableToAdd > 0 && availableToAdd <= 5 && (
                  <div className="stock-warning">
                    Only {availableToAdd} left in stock!
                    {cartQuantity > 0 && ` (${cartQuantity} already in cart)`}
                  </div>
                )}

                {availableToAdd === 0 && cartQuantity > 0 && (
                  <div className="stock-out">
                    You have {cartQuantity} of this item in your cart (max
                    available)
                  </div>
                )}

                {availableToAdd === 0 && cartQuantity === 0 && (
                  <div className="stock-out">
                    This combination is currently out of stock
                  </div>
                )}

                {/* Quantity */}
                <div className="option-group">
                  <label>Quantity</label>
                  <div className="quantity-selector">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(availableToAdd, quantity + 1))
                      }
                      disabled={quantity >= availableToAdd}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="quick-view-actions">
                  <button
                    className="btn-add-to-cart"
                    onClick={handleAddToCart}
                    disabled={availableToAdd === 0}
                  >
                    {availableToAdd === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
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
