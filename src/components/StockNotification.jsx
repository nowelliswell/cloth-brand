import { useState } from "react";
import Toast from "./Toast";

export default function StockNotification({ productName, productId }) {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Save to localStorage (in real app, send to backend)
      const notifications = JSON.parse(localStorage.getItem("stockNotifications") || "[]");
      notifications.push({ productId, email, date: new Date().toISOString() });
      localStorage.setItem("stockNotifications", JSON.stringify(notifications));
      
      setToast({ message: "You'll be notified when this item is back in stock!", type: "success" });
      setIsSubmitted(true);
      setEmail("");
    }
  };

  if (isSubmitted) {
    return (
      <div style={styles.successMessage}>
        ✓ You'll receive an email when this product is back in stock
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <h4 style={styles.title}>Notify Me When Available</h4>
      <p style={styles.description}>
        Enter your email and we'll notify you when {productName} is back in stock
      </p>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Notify Me
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#fff3cd",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
    border: "1px solid #ffc107",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#856404",
  },
  description: {
    fontSize: "14px",
    color: "#856404",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ffc107",
    borderRadius: "4px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "#856404",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
  },
  successMessage: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "15px",
    borderRadius: "8px",
    marginTop: "20px",
    border: "1px solid #c3e6cb",
    fontSize: "14px",
    fontWeight: "500",
  },
};
