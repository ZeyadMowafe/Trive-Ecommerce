import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quickAddSuccess, setQuickAddSuccess] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add with default size and color
    addToCart(product, product.sizes[0], product.colors[0], 1);
    
    // Show success feedback
    setQuickAddSuccess(true);
    setTimeout(() => setQuickAddSuccess(false), 1500);
  };

  return (
    <motion.div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          {product.isNew && (
            <span className="product-badge new">New</span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="product-badge bestseller">Best Seller</span>
          )}
          
          <div className="product-images">
            <img 
              src={product.images[0]} 
              alt={product.name}
              className={`product-image primary ${isHovered ? 'fade-out' : 'fade-in'}`}
            />
            {product.images[1] && (
              <img 
                src={product.images[1]} 
                alt={product.name}
                className={`product-image secondary ${isHovered ? 'fade-in' : 'fade-out'}`}
              />
            )}
          </div>

          <motion.button 
            className={`quick-add-btn ${quickAddSuccess ? 'success' : ''}`}
            onClick={handleQuickAdd}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.2 }}
          >
            {quickAddSuccess ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Added
              </>
            ) : (
              'Quick Add'
            )}
          </motion.button>
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
                    backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                    color.toLowerCase() === 'white' ? '#fff' :
                                    color.toLowerCase() === 'navy' ? '#001f3f' :
                                    color.toLowerCase() === 'camel' ? '#c19a6b' :
                                    color.toLowerCase() === 'cream' ? '#fffdd0' :
                                    color.toLowerCase() === 'charcoal' ? '#36454f' :
                                    color.toLowerCase() === 'champagne' ? '#f7e7ce' :
                                    color.toLowerCase() === 'emerald' ? '#50c878' :
                                    color.toLowerCase() === 'tan' ? '#d2b48c' :
                                    color.toLowerCase() === 'ivory' ? '#fffff0' :
                                    color.toLowerCase() === 'dusty rose' ? '#dcae96' :
                                    color.toLowerCase() === 'beige' ? '#f5f5dc' :
                                    color.toLowerCase() === 'burgundy' ? '#800020' :
                                    color.toLowerCase() === 'cognac' ? '#9a463d' :
                                    color.toLowerCase() === 'sand' ? '#c2b280' :
                                    color.toLowerCase() === 'sky blue' ? '#87ceeb' :
                                    '#ccc',
                    border: color.toLowerCase() === 'white' || color.toLowerCase() === 'cream' || color.toLowerCase() === 'ivory' ? '1px solid #ddd' : 'none'
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;