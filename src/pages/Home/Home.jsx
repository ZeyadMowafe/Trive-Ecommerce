import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard/ProductCard";
import { productsAPI, categoriesAPI } from "../../services/api";
import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#new-arrivals") {
      const element = document.getElementById("new-arrivals");
      if (element) {
        // Simple scrollIntoView as requested/originally intended
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash, loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredData, newArrivalsData, categoriesData] = await Promise.all([
          productsAPI.getFeatured(),
          productsAPI.getNewArrivals(),
          categoriesAPI.getCategories(),
        ]);
        setFeaturedProducts(featuredData);
        setNewArrivalsProducts(newArrivalsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredNewArrivals =
    selectedCategory === "all"
      ? newArrivalsProducts
      : newArrivalsProducts.filter(
        (p) =>
          p.categorySlug === selectedCategory ||
          p.categoryName.toLowerCase() === selectedCategory.toLowerCase(),
      );

  const bestSellers = featuredProducts;

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600",
      title: "Winter Collection",
      subtitle: "Discover Timeless Elegance",
      link: "/shop/women",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600",
      title: "New Arrivals",
      subtitle: "Fresh Styles for the Season",
      link: "/shop/new",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass:
              "swiper-pagination-bullet-active custom-bullet-active",
          }}
          loop
          className="hero-swiper"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="hero-slide">
                <div className="hero-image">
                  <img src={slide.image} alt={slide.title} />
                  <div className="hero-overlay"></div>
                </div>
                <div className="hero-content" style={{ marginBottom: "5rem" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <p className="hero-subtitle">{slide.subtitle}</p>
                    <h1 className="hero-title">{slide.title}</h1>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Shop Now Button - ثابت خارج الـ Swiper */}
        <div className="hero-content" style={{ pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto", marginTop: "20rem" }}>
            <Link to="/shop" className="main-btn-home" onClick={scrollToTop}>
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section id="new-arrivals" className="new-arrivals-section section-padding">
        <div className="container-custom">
          <div className="section-header">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              New Arrivals
            </motion.h2>

            <div className="category-tabs">
              <button
                className={`category-tab ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-tab ${selectedCategory === category.slug ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="products-grid">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: "500px" }}
                ></div>
              ))}
            </div>
          ) : (
            <motion.div
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={selectedCategory}
            >
              {filteredNewArrivals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Discover Categories Section */}
      <section className="categories-section section-padding">
        <div className="container-custom">
          <motion.h2
            className="section-title-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Discover Categories
          </motion.h2>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="category-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/shop/${category.slug}`} onClick={scrollToTop}>
                  <div className="category-image">
                    <img src={category.image} alt={category.name} />
                    <div className="category-overlay"></div>
                  </div>
                  <div className="category-content">
                    <h3>{category.name}</h3>
                    <span className="category-arrow">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bestsellers-section section-padding">
        <div className="container-custom">
          <motion.h2
            className="section-title-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Best Sellers
          </motion.h2>

          {loading ? (
            <div className="products-grid">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="skeleton"
                  style={{ height: "500px" }}
                ></div>
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {bestSellers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="section-cta">
            <Link to="/shop" className="btn-outline" onClick={scrollToTop}>
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
