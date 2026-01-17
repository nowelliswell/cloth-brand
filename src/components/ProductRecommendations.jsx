import { Link } from "react-router-dom";
import products from "../data/products";

export default function ProductRecommendations({ currentProductId, category }) {
  // Get related products from same category, excluding current product
  const recommendations = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  if (recommendations.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>You May Also Like</h3>
      <div style={styles.grid}>
        {recommendations.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={styles.card}
          >
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.info}>
              <h4 style={styles.productName}>{product.name}</h4>
              <p style={styles.price}>Rp {product.price.toLocaleString()}</p>
              <div style={styles.rating}>
                <span style={styles.stars}>★</span>
                <span style={styles.ratingText}>
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "60px",
    padding: "40px 0",
    borderTop: "1px solid #eee",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px",
  },
  card: {
    textDecoration: "none",
    color: "inherit",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  info: {
    padding: "15px",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  stars: {
    color: "#FFD700",
    fontSize: "16px",
  },
  ratingText: {
    fontSize: "14px",
    color: "#666",
  },
};
