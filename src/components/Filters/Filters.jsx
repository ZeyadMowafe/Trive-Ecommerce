import { useState } from "react";
import "./Filters.css";

const Filters = ({ filters, onFilterChange }) => {
  const [isStockOpen, setIsStockOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const handleStockChange = (value) => {
    onFilterChange({ inStock: value });
  };

  const handlePriceChange = (min, max) => {
    onFilterChange({ minPrice: min, maxPrice: max });
  };

  return (
    <div className="filters">
      <div className="filter-section">
        <button
          className="filter-header"
          onClick={() => setIsStockOpen(!isStockOpen)}
        >
          <span>Availability</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isStockOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isStockOpen && (
          <div className="filter-content">
            <label className="filter-option">
              <input
                type="radio"
                name="stock"
                value="all"
                checked={filters.inStock === "all"}
                onChange={(e) => handleStockChange(e.target.value)}
              />
              <span>All Products</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="stock"
                value="in-stock"
                checked={filters.inStock === "in-stock"}
                onChange={(e) => handleStockChange(e.target.value)}
              />
              <span>In Stock</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="stock"
                value="out-of-stock"
                checked={filters.inStock === "out-of-stock"}
                onChange={(e) => handleStockChange(e.target.value)}
              />
              <span>Out of Stock</span>
            </label>
          </div>
        )}
      </div>

      <div className="filter-section">
        <button
          className="filter-header"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <span>Price Range</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              transform: isPriceOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {isPriceOpen && (
          <div className="filter-content">
            <div className="price-display-top">
              <span className="price-label">Selected Range</span>
              <span className="price-value">
                {filters.minPrice} — {filters.maxPrice} EGP
              </span>
            </div>

            <div className="price-range-container">
              <div className="price-range-track"></div>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.minPrice}
                onChange={(e) =>
                  handlePriceChange(Number(e.target.value), filters.maxPrice)
                }
                className="range-slider range-slider-min"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.maxPrice}
                onChange={(e) =>
                  handlePriceChange(filters.minPrice, Number(e.target.value))
                }
                className="range-slider range-slider-max"
              />
            </div>

            <div className="price-inputs">
              <div className="price-input-group">
                <label>Minimum</label>
                <div className="price-input-wrapper">
                  <span className="currency-symbol">EGP</span>
                  <input
                    type="number"
                    min="0"
                    max={filters.maxPrice}
                    value={filters.minPrice}
                    onChange={(e) =>
                      handlePriceChange(
                        Number(e.target.value),
                        filters.maxPrice,
                      )
                    }
                  />
                </div>
              </div>
              <div className="price-input-group">
                <label>Maximum</label>
                <div className="price-input-wrapper">
                  <span className="currency-symbol">EGP</span>
                  <input
                    type="number"
                    min={filters.minPrice}
                    max="1000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handlePriceChange(
                        filters.minPrice,
                        Number(e.target.value),
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
