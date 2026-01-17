import { useState } from "react";
import products, { categories } from "../data/products";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { SearchIcon } from "../components/Icons";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products" },
  ];

  return (
    <div style={styles.container}>
      <Breadcrumb items={breadcrumbItems} />
      
      <h1 style={styles.title}>Our Products</h1>

      {/* Search and Filter Section */}
      <div style={styles.filterSection}>
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>
            <SearchIcon size={22} color="#666" />
          </span>
        </div>

        {/* Category Filter */}
        <div>
          <div style={styles.categoryFilter}>
            <span style={styles.categoryLabel}>Categories:</span>
            {categories.map((category) => (
              <button
                key={category.id}
                style={{
                  ...styles.categoryButton,
                  ...(selectedCategory === category.id ? styles.activeCategoryButton : {}),
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div style={styles.sortContainer}>
          <label style={styles.sortLabel}>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p style={styles.resultsCount}>
        Showing {sortedProducts.length} of {products.length} products
      </p>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div style={styles.grid}>
          {sortedProducts.map((p) => (
            <div key={p.id} style={styles.card}>
              <img src={p.image} alt={p.name} style={styles.image} />
              <div style={styles.cardContent}>
                <span style={styles.category}>{categories.find(c => c.id === p.category)?.name}</span>
                <h3 style={styles.productName}>{p.name}</h3>
                <div style={styles.ratingSection}>
                  <span style={styles.stars}>★</span>
                  <span style={styles.ratingText}>{p.rating} ({p.reviewCount})</span>
                </div>
                <p style={styles.price}>Rp {p.price.toLocaleString()}</p>
                <p style={styles.stock}>
                  {p.stock > 0 ? `Stock: ${p.stock}` : "Out of Stock"}
                </p>
                <Link to={`/products/${p.id}`} style={styles.detailLink}>
                  View Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noResults}>
          <p style={styles.noResultsText}>No products found</p>
          <p style={styles.noResultsSubtext}>Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "35px",
    textAlign: "center",
    color: "#000",
  },
  filterSection: {
    marginBottom: "40px",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  searchContainer: {
    position: "relative",
    maxWidth: "100%",
    width: "100%",
  },
  searchInput: {
    width: "100%",
    padding: "15px 50px 15px 20px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  searchIcon: {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "22px",
    pointerEvents: "none",
    color: "#666",
  },
  categoryFilter: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  categoryLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#000",
    marginRight: "10px",
  },
  categoryButton: {
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "600",
    border: "2px solid #000",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },
  activeCategoryButton: {
    backgroundColor: "#000",
    color: "#fff",
    borderColor: "#000",
    transform: "scale(1.05)",
  },
  sortContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  sortLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#000",
  },
  sortSelect: {
    padding: "12px 20px",
    fontSize: "15px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    cursor: "pointer",
    minWidth: "220px",
    fontWeight: "500",
    color: "#333",
  },
  resultsCount: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "25px",
    fontWeight: "500",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "30px",
    padding: "20px 0",
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  cardContent: {
    padding: "20px",
  },
  category: {
    fontSize: "12px",
    color: "#666",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: "1px",
    display: "inline-block",
    backgroundColor: "#f0f0f0",
    padding: "4px 12px",
    borderRadius: "12px",
    marginBottom: "10px",
  },
  productName: {
    fontSize: "20px",
    fontWeight: "700",
    marginTop: "8px",
    marginBottom: "8px",
    color: "#000",
  },
  ratingSection: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "8px",
  },
  stars: {
    color: "#FFD700",
    fontSize: "16px",
  },
  ratingText: {
    fontSize: "13px",
    color: "#666",
  },
  price: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "10px",
  },
  stock: {
    fontSize: "14px",
    color: "#4CAF50",
    marginBottom: "18px",
    fontWeight: "600",
  },
  detailLink: {
    display: "block",
    padding: "12px 24px",
    backgroundColor: "#000",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    textAlign: "center",
    transition: "all 0.3s ease",
    fontWeight: "600",
    fontSize: "15px",
  },
  noResults: {
    textAlign: "center",
    padding: "60px 20px",
  },
  noResultsText: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  noResultsSubtext: {
    fontSize: "16px",
    color: "#666",
  },
};
