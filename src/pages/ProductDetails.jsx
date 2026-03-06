import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard/ProductCard";
import { productsAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [direction, setDirection] = useState(0); // ✨ New state for animation direction
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart, getCartQuantity, openCart, refreshCart } = useCart(); // ✨ إضافة refreshCart

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productsAPI.getById(id);
        setProduct(data);

        // Set first available size and color
        if (data.sizes.length > 0) {
          const firstAvailableSize = getAvailableSizes()[0] || data.sizes[0];
          setSelectedSize(firstAvailableSize);

          // Get available colors for first size
          const availableColors = getAvailableColorsForSize(
            firstAvailableSize,
            data,
          );
          setSelectedColor(availableColors[0] || data.colors[0]);
        }

        // Fetch similar products
        const similar = await productsAPI.getByCategory(data.category);
        setSimilarProducts(
          similar.products.filter((p) => p.id !== data.id).slice(0, 4),
        );
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  // Get available sizes (any size that has at least one color in stock)
  const getAvailableSizes = () => {
    if (!product) return [];
    const sizesWithStock = product.inventory
      .filter((item) => item.count > 0)
      .map((item) => item.size);
    return [...new Set(sizesWithStock)];
  };

  // Get available colors (any color that has at least one size in stock)
  const getAvailableColors = () => {
    if (!product) return [];
    const colorsWithStock = product.inventory
      .filter((item) => item.count > 0)
      .map((item) => item.color);
    return [...new Set(colorsWithStock)];
  };

  // Get available colors for selected size
  const getAvailableColorsForSize = (size, prod = product) => {
    if (!prod) return [];
    return prod.inventory
      .filter((item) => item.size === size && item.count > 0)
      .map((item) => item.color);
  };

  // Get available sizes for selected color
  const getAvailableSizesForColor = (color) => {
    if (!product) return [];
    return product.inventory
      .filter((item) => item.color === color && item.count > 0)
      .map((item) => item.size);
  };

  // Check if specific combination is available
  const isAvailable = (size, color) => {
    if (!product) return false;
    const item = product.inventory.find(
      (i) => i.size === size && i.color === color,
    );
    return item && item.count > 0;
  };

  // Get stock for current selection
  const getCurrentVariant = () => {
    if (!product || !selectedSize || !selectedColor) return null;
    return product.inventory.find(
      (i) => i.size === selectedSize && i.color === selectedColor,
    );
  };

  const getCurrentStock = () => {
    if (!product) return 0;
    if (product.sizes.length === 0 && product.colors.length === 0) return product.count || 0;
    const variant = getCurrentVariant();
    return variant ? variant.count : 0;
  };

  const getCurrentPrice = () => {
    if (!product) return 0;
    const variant = getCurrentVariant();
    return variant ? variant.price : product.price;
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);

    // Check if current color is available for this size
    const availableColorsForSize = getAvailableColorsForSize(size);

    if (!availableColorsForSize.includes(selectedColor)) {
      // If current color not available, select first available color
      setSelectedColor(availableColorsForSize[0] || product.colors[0]);
    }

    // ✨ Reset quantity when changing size
    setQuantity(1);
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);

    // Check if current size is available for this color
    const availableSizesForColor = getAvailableSizesForColor(color);

    if (!availableSizesForColor.includes(selectedSize)) {
      // If current size not available, select first available size
      setSelectedSize(availableSizesForColor[0] || product.sizes[0]);
    }

    // ✨ Reset quantity when changing color
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (!product || availableToAdd <= 0) return;

    const variant = getCurrentVariant();

    // If product has variants but none selected (shouldn't happen with auto-select), don't add
    if ((product.sizes.length > 0 || product.colors.length > 0) && !variant && (selectedSize || selectedColor)) {
      // Allow adding if only one option exists and it's selected
      if (product.sizes.length > 0 && !selectedSize) return;
      if (product.colors.length > 0 && !selectedColor) return;
    }

    try {
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
      // ✨ Force refresh to ensure UI sees the new items immediately
      await refreshCart();
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    openCart(); // ✨ فتح الكارت تلقائياً
  };

  if (loading || !product) {
    return (
      <div className="container-custom" style={{ padding: "4rem 0" }}>
        <div className="skeleton" style={{ height: "600px" }}></div>
      </div>
    );
  }

  const handleImageSelect = (index) => {
    setDirection(index > selectedImage ? 1 : -1);
    setSelectedImage(index);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setDirection(1);
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setDirection(-1);
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const currentStock = getCurrentStock();
  const variationPrice = getCurrentPrice();
  // ✨ حساب الكمية الموجودة في الكارت والمتاح للإضافة
  const cartQuantity = getCartQuantity(product.id, selectedSize, selectedColor);
  const availableToAdd = currentStock - cartQuantity;

  const availableSizes = getAvailableSizes();
  const availableColors = getAvailableColors();
  const availableColorsForSize = getAvailableColorsForSize(selectedSize);
  const availableSizesForColor = getAvailableSizesForColor(selectedColor);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="product-details-page">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="product-details-container">
          {/* Left: Images */}
          <div className="product-images-section">
            <div className="product-main-image">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={selectedImage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  src={product.images[selectedImage]}
                  alt={product.name}
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                    if (swipe && offset.x > 0) {
                      prevImage(e);
                    } else if (swipe && offset.x < 0) {
                      nextImage(e);
                    }
                  }}
                />
              </AnimatePresence>

              {product.images.length > 1 && (
                <>
                  <button className="nav-btn prev" onClick={prevImage} aria-label="Previous image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <button className="nav-btn next" onClick={nextImage} aria-label="Next image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </>
              )}
            </div>
            <div className="product-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? "active" : ""} `}
                  onClick={() => handleImageSelect(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1} `} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{variationPrice} EGP</p>
            <p className="product-description">{product.description}</p>

            {/* Size Selection */}
            <div className="product-option">
              <label>Size</label>
              <div className="size-options">
                {product.sizes.map((size) => {
                  const isSizeInStockAtAll = availableSizes.includes(size);
                  const isSizeAvailableForColor = availableSizesForColor.includes(size);
                  const isSoldOut = !isSizeInStockAtAll;
                  const isUnavailable = isSizeInStockAtAll && !isSizeAvailableForColor;

                  return (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? "active" : ""} ${isSoldOut ? "sold-out" : ""} ${isUnavailable ? "unavailable" : ""}`}
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                      {isSoldOut && (
                        <span className="sold-out-label">Sold Out</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selection */}
            <div className="product-option">
              <label>Color: {selectedColor}</label>
              <div className="color-options">
                {product.colors.map((color) => {
                  const isColorInStockAtAll = availableColors.includes(color);
                  const isColorAvailableForSize = availableColorsForSize.includes(color);
                  const isSoldOut = !isColorInStockAtAll;
                  const isUnavailable = isColorInStockAtAll && !isColorAvailableForSize;

                  return (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? "active" : ""} ${isSoldOut ? "sold-out" : ""} ${isUnavailable ? "unavailable" : ""}`}
                      onClick={() => handleColorSelect(color)}
                      title={color}
                      style={{
                        backgroundColor: product.colorMap?.[color] || color.toLowerCase(),
                        border:
                          (product.colorMap?.[color]?.toLowerCase() === "#ffffff" ||
                            color.toLowerCase() === "white" ||
                            color.toLowerCase() === "cream" ||
                            color.toLowerCase() === "ivory")
                            ? "2px solid #ddd"
                            : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* ✨ Stock Info - محدثة */}
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

            {/* ✨ Quantity - محدثة */}
            <div className="product-option">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
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

            {/* ✨ Action Buttons - محدثة */}
            <div className="product-actions">
              <button
                className="btn-outline"
                onClick={handleAddToCart}
                disabled={availableToAdd === 0}
              >
                {availableToAdd === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                className="btn-primary"
                onClick={handleBuyNow}
                disabled={availableToAdd === 0}
              >
                {availableToAdd === 0 ? "Out of Stock" : "Buy It Now"}
              </button>
            </div>

            {/* Product Meta */}
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <Link to={`/shop/${product.categorySlug || product.category}`}>{product.category}</Link>
              </div>
              <div className="meta-item">
                <span className="meta-label">Availability:</span>
                <span className={product.inStock ? "in-stock" : "out-of-stock"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section className="similar-products-section">
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {similarProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
