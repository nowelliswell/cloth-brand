import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import { QualityIcon, DesignIcon, DeliveryIcon, ArrowLeftIcon, ArrowRightIcon } from "../components/Icons";

export default function Home() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Hero slider auto-play
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(heroInterval);
  }, []);

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % products.length);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentHeroSlide];

  return (
    <div style={styles.container}>
      {/* Hero Slider Section */}
      <section style={styles.heroSlider}>
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{
              ...styles.heroSlide,
              opacity: index === currentHeroSlide ? 1 : 0,
              zIndex: index === currentHeroSlide ? 1 : 0,
            }}
          >
            <div style={styles.heroOverlay} />
            <img 
              src={product.image} 
              alt={product.name}
              style={styles.heroImage}
            />
          </div>
        ))}
        
        <div style={styles.heroContent}>
          <div style={styles.heroTextContainer}>
            <h1 style={styles.heroTitle}>{currentProduct.name}</h1>
            <p style={styles.heroSubtitle}>{currentProduct.description}</p>
            <p style={styles.heroPrice}>Rp {currentProduct.price.toLocaleString()}</p>
            <div style={styles.heroButtons}>
              <Link to={`/products/${currentProduct.id}`} style={styles.shopButton}>
                View Details
              </Link>
              <Link to="/products" style={styles.shopButtonOutline}>
                Shop All
              </Link>
            </div>
          </div>
        </div>

        <button 
          style={{...styles.heroNavButton, ...styles.heroPrevButton}} 
          onClick={prevHeroSlide}
        >
          <ArrowLeftIcon size={32} color="#fff" />
        </button>
        
        <button 
          style={{...styles.heroNavButton, ...styles.heroNextButton}} 
          onClick={nextHeroSlide}
        >
          <ArrowRightIcon size={32} color="#fff" />
        </button>

        <div style={styles.heroDotsContainer}>
          {products.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.heroDot,
                ...(index === currentHeroSlide ? styles.heroActiveDot : {})
              }}
              onClick={() => setCurrentHeroSlide(index)}
            />
          ))}
        </div>
      </section>

      <section style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>
            <QualityIcon size={48} color="#000" />
          </div>
          <h3 style={styles.featureTitle}>Premium Quality</h3>
          <p style={styles.featureText}>High-quality materials for lasting comfort</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>
            <DesignIcon size={48} color="#000" />
          </div>
          <h3 style={styles.featureTitle}>Modern Design</h3>
          <p style={styles.featureText}>Trendy styles for every occasion</p>
        </div>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>
            <DeliveryIcon size={48} color="#000" />
          </div>
          <h3 style={styles.featureTitle}>Fast Delivery</h3>
          <p style={styles.featureText}>Quick shipping to your doorstep</p>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
  },
  // Hero Slider Styles
  heroSlider: {
    position: "relative",
    height: "calc(100vh - 81px)",
    width: "100%",
    overflow: "hidden",
  },
  heroSlide: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transition: "opacity 1s ease-in-out",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
    zIndex: 1,
  },
  heroContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    textAlign: "center",
    color: "#fff",
    width: "90%",
    maxWidth: "800px",
  },
  heroTextContainer: {
    animation: "fadeIn 0.8s ease-in",
  },
  heroTitle: {
    fontSize: "64px",
    fontWeight: "bold",
    margin: "0 0 20px 0",
    letterSpacing: "2px",
    textTransform: "uppercase",
    textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
  },
  heroSubtitle: {
    fontSize: "20px",
    margin: "0 0 20px 0",
    lineHeight: "1.6",
    textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
  },
  heroPrice: {
    fontSize: "36px",
    fontWeight: "bold",
    margin: "0 0 40px 0",
    textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  shopButton: {
    padding: "15px 50px",
    fontSize: "18px",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "inline-block",
  },
  shopButtonOutline: {
    padding: "15px 50px",
    fontSize: "18px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "2px solid #fff",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    display: "inline-block",
  },
  heroNavButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(255,255,255,0.3)",
    color: "#fff",
    border: "none",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 3,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(5px)",
  },
  heroPrevButton: {
    left: "30px",
  },
  heroNextButton: {
    right: "30px",
  },
  heroDotsContainer: {
    position: "absolute",
    bottom: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "15px",
    zIndex: 3,
  },
  heroDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.5)",
    border: "2px solid #fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 0,
  },
  heroActiveDot: {
    backgroundColor: "#fff",
    width: "40px",
    borderRadius: "7px",
  },
  // Product Slider Styles
  sliderSection: {
    padding: "80px 20px",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  sectionTitle: {
    fontSize: "42px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "60px",
    color: "#000",
  },
  sliderContainer: {
    position: "relative",
    maxWidth: "1200px",
    margin: "0 auto",
    height: "600px",
  },
  sliderWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  slide: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  slideContent: {
    display: "flex",
    gap: "60px",
    alignItems: "center",
    maxWidth: "1000px",
    padding: "40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
  },
  slideImage: {
    width: "400px",
    height: "400px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  },
  slideInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  productName: {
    fontSize: "36px",
    fontWeight: "bold",
    margin: 0,
    color: "#000",
  },
  productDescription: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#666",
    margin: 0,
  },
  productPrice: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#000",
    margin: 0,
  },
  viewButton: {
    padding: "15px 40px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
    textDecoration: "none",
    textAlign: "center",
    display: "inline-block",
    width: "fit-content",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "#fff",
    border: "none",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    fontSize: "32px",
    cursor: "pointer",
    zIndex: 10,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  prevButton: {
    left: "20px",
  },
  nextButton: {
    right: "20px",
  },
  dotsContainer: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "12px",
    zIndex: 10,
  },
  dot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0,0.3)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    padding: 0,
  },
  activeDot: {
    backgroundColor: "#000",
    width: "32px",
    borderRadius: "6px",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    padding: "80px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f5f5f5",
  },
  featureCard: {
    textAlign: "center",
    padding: "50px 30px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  featureIcon: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#000",
  },
  featureText: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.6",
    margin: 0,
  },
};
