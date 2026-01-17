import { Link } from "react-router-dom";
import { useRecentlyViewed } from "../context/RecentlyViewedContext";

export default function RecentlyViewed({ currentProductId }) {
  const { recentlyViewed } = useRecentlyViewed();

  // Filter out current product
  const items = recentlyViewed.filter((p) => p.id !== currentProductId);

  if (items.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recently Viewed</h3>
      <div style={styles.grid}>
        {items.slice(0, 4).map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={styles.card}
          >
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.info}>
              <h4 style={styles.productName}>{product.name}</h4>
              <p style={styles.price}>Rp {product.price.toLocaleString()}</p>
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
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
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
    height: "200px",
    objectFit: "cover",
  },
  info: {
    padding: "12px",
  },
  productName: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};
