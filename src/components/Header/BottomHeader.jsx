import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { productsAPI } from "../../services/api";
import CartDrawer from "../CartDrawer/CartDrawer";
import "./Header.css";

const BottomHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { getCartCount, toggleCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live search effect
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length === 0) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      try {
        const response = await productsAPI.getAll();
        const filtered = response.products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.subcategory
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()),
        );

        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(() => {
      searchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleProductClick = (productSlug) => {
    navigate(`/product/${productSlug}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="bottom-header">
        <div className="container-custom">
          <div className="header-content">
            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn d-lg-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            {/* Logo */}
            <Link to="/" className="logo">
              <img src="src\assets\img\Logo.png" alt="TRIVÉ" className="logo-image" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav d-none d-lg-flex">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="header-actions">
              {/* Search */}
              <button
                className="action-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>

              {/* Login/Account */}
              <Link
                to={isAuthenticated ? "/account" : "/login"}
                className="action-btn login-btn"
                aria-label="Account"
                onClick={handleLinkClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>

              {/* Cart */}
              <button
                className="action-btn cart-btn"
                onClick={toggleCart}
                aria-label="Shopping cart"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {getCartCount() > 0 && (
                  <motion.span
                    className="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={getCartCount()}
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              ref={searchRef}
              className="search-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container-custom">
                <form onSubmit={handleSearch} className="search-form">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" aria-label="Submit search">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                </form>

                {/* Live Search Results */}
                {searchQuery.trim().length > 0 && (
                  <div className="search-results">
                    {isSearching ? (
                      <div className="search-loading">
                        <div className="spinner"></div>
                        <span>Searching...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <div className="results-list">
                          {searchResults.map((product) => (
                            <div
                              key={product.id}
                              className="search-result-item"
                              onClick={() => handleProductClick(product.slug)}
                            >
                              <div className="result-image">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                />
                              </div>
                              <div className="result-info">
                                <h4>{product.name}</h4>
                                <p className="result-category">
                                  {product.subcategory || product.category}
                                </p>
                                <span className="result-price">
                                  ${product.price}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          className="view-all-btn"
                          onClick={handleViewAllResults}
                        >
                          View all results for "{searchQuery}"
                        </button>
                      </>
                    ) : (
                      <div className="no-results">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <p>No products found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu d-lg-none"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <nav className="mobile-nav">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Login item - Mobile only */}
                <Link
                  to={isAuthenticated ? "/account" : "/login"}
                  className="mobile-nav-link mobile-nav-login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>{isAuthenticated ? "Account" : "Login"}</span>
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="mobile-overlay d-lg-none"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>

      <CartDrawer />
    </>
  );
};

export default BottomHeader;
