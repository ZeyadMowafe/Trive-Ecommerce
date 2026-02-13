import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import  ProductCard  from "../components/ProductCard/ProductCard";
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
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productsAPI.getById(id);
        setProduct(data);
        setSelectedSize(data.sizes[0]);
        setSelectedColor(data.colors[0]);

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

  const handleAddToCart = () => {
    if (product && selectedSize && selectedColor) {
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
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="product-option">
              <label>Color: {selectedColor}</label>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? "active" : ""}`}
                    onClick={() => setSelectedColor(color)}
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
                                                        : "#ccc",
                      border:
                        color.toLowerCase() === "white" ||
                        color.toLowerCase() === "cream"
                          ? "2px solid #ddd"
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="product-option">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button className="btn-outline" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn-primary" onClick={handleBuyNow}>
                Buy It Now
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

