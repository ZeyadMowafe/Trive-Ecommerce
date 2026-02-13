import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import Filters from '../../components/Filters/Filters';
import { productsAPI } from '../../services/api';
import './Shop.css';

const Shop = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    inStock: 'all',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'newest'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (category) {
          data = await productsAPI.getByCategory(category);
        } else if (searchQuery) {
          data = await productsAPI.search(searchQuery);
        } else {
          data = await productsAPI.getAll();
        }
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  useEffect(() => {
    let result = [...products];

    // Apply stock filter
    if (filters.inStock === 'in-stock') {
      result = result.filter(p => p.inStock);
    } else if (filters.inStock === 'out-of-stock') {
      result = result.filter(p => !p.inStock);
    }

    // Apply price filter
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getCategoryTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return 'All Products';
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container-custom">
          <h1 className="shop-title">{getCategoryTitle()}</h1>
          <p className="shop-count">{filteredProducts.length} Products</p>
        </div>
      </div>

      <div className="container-custom">
        <div className="shop-container">
          {/* Mobile Filter Button */}
          <button 
            className="mobile-filter-btn d-lg-none"
            onClick={() => setIsFilterOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            Filters
          </button>

          <div className="shop-content">
            {/* Desktop Filters - Left Side */}
            <div className="filters-sidebar d-none d-lg-block">
              <Filters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Mobile Filters - Drawer */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  <motion.div 
                    className="filters-overlay d-lg-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <motion.div 
                    className="filters-drawer d-lg-none"
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  >
                    <div className="filters-drawer-header">
                      <h3>Filters</h3>
                      <button onClick={() => setIsFilterOpen(false)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                    <Filters 
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
                    <div className="filters-drawer-footer">
                      <button 
                        className="btn-primary w-100"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Products - Right Side */}
            <div className="products-section">
              {/* Sort Dropdown */}
              <div className="shop-controls">
                <select 
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                  className="sort-select"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="products-grid">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="skeleton" style={{ height: '500px' }}></div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="no-products">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search criteria</p>
                </div>
              ) : (
                <motion.div 
                  className="products-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;