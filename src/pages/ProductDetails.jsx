import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard/ProductCard";
import { productsAPI } from "../services/api";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart, getCartQuantity } = useCart(); // ✨ إضافة getCartQuantity

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
  const getCurrentStock = () => {
    if (!product || !selectedSize || !selectedColor) return 0;
    const item = product.inventory.find(
      (i) => i.size === selectedSize && i.color === selectedColor,
    );
    return item ? item.count : 0;
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

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor && availableToAdd > 0) {
      addToCart(product, selectedSize, selectedColor, quantity);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout would happen here
  };

  if (loading || !product) {
    return (
      <div className="container-custom" style={{ padding: "4rem 0" }}>
        <div className="skeleton" style={{ height: "600px" }}></div>
      </div>
    );
  }

  const currentStock = getCurrentStock();
  // ✨ حساب الكمية الموجودة في الكارت والمتاح للإضافة
  const cartQuantity = getCartQuantity(product.id, selectedSize, selectedColor);
  const availableToAdd = currentStock - cartQuantity;

  const availableSizes = getAvailableSizes();
  const availableColors = getAvailableColors();
  const availableColorsForSize = getAvailableColorsForSize(selectedSize);
  const availableSizesForColor = getAvailableSizesForColor(selectedColor);

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
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="product-thumbnails">
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
          </div>

          {/* Right: Details */}
          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>

            {/* Size Selection */}
            <div className="product-option">
              <label>Size</label>
              <div className="size-options">
                {product.sizes.map((size) => {
                  const isSizeAvailable = availableSizesForColor.includes(size);
                  return (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? "active" : ""} ${!isSizeAvailable ? "sold-out" : ""}`}
                      onClick={() => isSizeAvailable && handleSizeSelect(size)}
                      disabled={!isSizeAvailable}
                    >
                      {size}
                      {!isSizeAvailable && (
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
                  const isColorAvailable =
                    availableColorsForSize.includes(color);
                  return (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? "active" : ""} ${!isColorAvailable ? "sold-out" : ""}`}
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
                                            : color.toLowerCase() === "ivory"
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
                          color.toLowerCase() === "cream"
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
                <Link to={`/shop/${product.category}`}>{product.category}</Link>
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
