import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav style={styles.breadcrumb}>
      {items.map((item, index) => (
        <span key={index} style={styles.breadcrumbItem}>
          {index > 0 && <span style={styles.separator}>/</span>}
          {item.link ? (
            <Link to={item.link} style={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span style={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

const styles = {
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0",
    fontSize: "14px",
    color: "#666",
  },
  breadcrumbItem: {
    display: "flex",
    alignItems: "center",
  },
  separator: {
    margin: "0 10px",
    color: "#999",
  },
  link: {
    color: "#666",
    textDecoration: "none",
    transition: "color 0.3s",
  },
  current: {
    color: "#000",
    fontWeight: "600",
  },
};
