import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import products, { categories } from "../data/products";
import Toast from "../components/Toast";
import Breadcrumb from "../components/Breadcrumb";
import { 
  MinusIcon, 
  PlusIcon, 
  CreditCardIcon, 
  BankIcon, 
  WalletIcon, 
  CashIcon,
  CloseIcon 
} from "../components/Icons";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id == id);
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "credit-card",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!product) return <p style={styles.notFound}>Product not found</p>;

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/products" },
    { label: product.name },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10,13}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10-13 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code must be 5 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "increase" && quantity >= product.stock) {
      setToast({ message: "Maximum stock reached", type: "warning" });
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      setToast({ message: "Product is out of stock", type: "error" });
      return;
    }
    
    if (quantity > product.stock) {
      setToast({ message: `Only ${product.stock} items available`, type: "warning" });
      return;
    }

    addToCart(product, quantity);
    setToast({ message: `${product.name} added to cart!`, type: "success" });
    setQuantity(1);
  };

  const totalPrice = product.price * quantity;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOrderSuccess(true);
      setToast({ message: "Order placed successfully!", type: "success" });
    }, 2000);
  };

  return (
    <div style={styles.container}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Breadcrumb items={breadcrumbItems} />

      <div style={styles.content}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <div style={styles.info}>
          <span style={styles.category}>
            {categories.find(c => c.id === product.category)?.name}
          </span>
          <h1 style={styles.title}>{product.name}</h1>
          <p style={styles.description}>{product.description}</p>
          <h3 style={styles.price}>Rp {product.price.toLocaleString()}</h3>
          
          <p style={styles.stockInfo}>
            {product.stock > 0 ? (
              <span style={styles.inStock}>✓ In Stock ({product.stock} available)</span>
            ) : (
              <span style={styles.outOfStock}>✕ Out of Stock</span>
            )}
          </p>

          <div style={styles.quantitySection}>
            <label style={styles.label}>Quantity:</label>
            <div style={styles.quantityControl}>
              <button 
                style={styles.quantityButton} 
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                <MinusIcon size={24} color={quantity <= 1 ? "#ccc" : "#000"} />
              </button>
              <span style={styles.quantityDisplay}>{quantity}</span>
              <button 
                style={styles.quantityButton} 
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity >= product.stock || product.stock === 0}
              >
                <PlusIcon size={24} color={(quantity >= product.stock || product.stock === 0) ? "#ccc" : "#000"} />
              </button>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button 
              style={{
                ...styles.addToCartButton,
                ...(product.stock === 0 ? styles.disabledButton : {})
              }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button 
              style={{
                ...styles.button,
                ...(product.stock === 0 ? styles.disabledButton : {})
              }}
              onClick={() => setShowModal(true)}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>

          <Link to="/products" style={styles.backLink}>← Back to Products</Link>
        </div>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton} 
              onClick={() => setShowModal(false)}
            >
              <CloseIcon size={24} color="#666" />
            </button>

            {!orderSuccess ? (
              <>
                <h2 style={styles.modalTitle}>Complete Your Order</h2>
                
                {/* Order Summary */}
                <div style={styles.orderSummary}>
                  <div style={styles.summaryItem}>
                    <img src={product.image} alt={product.name} style={styles.summaryImage} />
                    <div style={styles.summaryInfo}>
                      <h4 style={styles.summaryProductName}>{product.name}</h4>
                      <p style={styles.summaryText}>Quantity: {quantity}</p>
                      <p style={styles.summaryPrice}>Rp {totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder} style={styles.form}>
                  {/* Customer Information */}
                  <div style={styles.formSection}>
                    <h3 style={styles.sectionTitle}>Customer Information</h3>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={styles.input}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={styles.input}
                          required
                          placeholder="your@email.com"
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Phone *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          style={styles.input}
                          required
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        style={{...styles.input, ...styles.textarea}}
                        required
                        placeholder="Enter your complete address"
                      />
                    </div>

                    <div style={styles.formRow}>
                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          style={styles.input}
                          required
                          placeholder="City"
                        />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={styles.formLabel}>Postal Code *</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          style={styles.input}
                          required
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div style={styles.formSection}>
                    <h3 style={styles.sectionTitle}>Payment Method</h3>
                    
                    <div style={styles.paymentOptions}>
                      <label style={styles.paymentOption}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === "credit-card"}
                          onChange={handleInputChange}
                          style={styles.radio}
                        />
                        <div style={styles.paymentLabel}>
                          <span style={styles.paymentIcon}>💳</span>
                          <span>Credit/Debit Card</span>
                        </div>
                      </label>

                      <label style={styles.paymentOption}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === "bank-transfer"}
                          onChange={handleInputChange}
                          style={styles.radio}
                        />
                        <div style={styles.paymentLabel}>
                          <span style={styles.paymentIcon}>🏦</span>
                          <span>Bank Transfer</span>
                        </div>
                      </label>

                      <label style={styles.paymentOption}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="e-wallet"
                          checked={formData.paymentMethod === "e-wallet"}
                          onChange={handleInputChange}
                          style={styles.radio}
                        />
                        <div style={styles.paymentLabel}>
                          <span style={styles.paymentIcon}>📱</span>
                          <span>E-Wallet (GoPay, OVO, Dana)</span>
                        </div>
                      </label>

                      <label style={styles.paymentOption}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleInputChange}
                          style={styles.radio}
                        />
                        <div style={styles.paymentLabel}>
                          <span style={styles.paymentIcon}>💵</span>
                          <span>Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Total */}
                  <div style={styles.totalSection}>
                    <div style={styles.totalRow}>
                      <span>Subtotal:</span>
                      <span>Rp {totalPrice.toLocaleString()}</span>
                    </div>
                    <div style={styles.totalRow}>
                      <span>Shipping:</span>
                      <span>Rp 20.000</span>
                    </div>
                    <div style={{...styles.totalRow, ...styles.grandTotal}}>
                      <span>Total:</span>
                      <span>Rp {(totalPrice + 20000).toLocaleString()}</span>
                    </div>
                  </div>

                  <button type="submit" style={styles.submitButton}>
                    Confirm & Pay
                  </button>
                </form>
              </>
            ) : (
              <div style={styles.successContainer}>
                <div style={styles.successIcon}>✓</div>
                <h2 style={styles.successTitle}>Order Successful!</h2>
                <p style={styles.successText}>
                  Thank you for your purchase. Your order has been received and will be processed shortly.
                </p>
                <p style={styles.successText}>
                  Order ID: <strong>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong>
                </p>
                <p style={styles.successText}>
                  We've sent a confirmation email to <strong>{formData.email}</strong>
                </p>
                <button 
                  style={styles.submitButton} 
                  onClick={() => {
                    setShowModal(false);
                    setOrderSuccess(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      address: "",
                      city: "",
                      postalCode: "",
                      paymentMethod: "credit-card",
                    });
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
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
  content: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    height: "500px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  info: {
    flex: 1,
    minWidth: "300px",
  },
  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "30px",
    lineHeight: "1.6",
  },
  price: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "30px",
  },
  quantitySection: {
    marginBottom: "30px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
    display: "block",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "10px",
  },
  quantityButton: {
    width: "40px",
    height: "40px",
    border: "2px solid #000",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
  },
  quantityDisplay: {
    fontSize: "20px",
    fontWeight: "600",
    minWidth: "40px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  addToCartButton: {
    padding: "15px 40px",
    fontSize: "18px",
    backgroundColor: "#fff",
    color: "#000",
    border: "2px solid #000",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "15px 40px",
    fontSize: "18px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    flex: 1,
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  addedMessage: {
    padding: "12px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "16px",
    fontWeight: "600",
    textAlign: "center",
    animation: "fadeIn 0.3s ease",
  },
  category: {
    display: "inline-block",
    fontSize: "14px",
    color: "#666",
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: "0.5px",
    marginBottom: "10px",
  },
  stockInfo: {
    marginBottom: "20px",
  },
  inStock: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: "16px",
  },
  outOfStock: {
    color: "#f44336",
    fontWeight: "600",
    fontSize: "16px",
  },
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  inputError: {
    borderColor: "#f44336",
  },
  errorText: {
    color: "#f44336",
    fontSize: "14px",
    marginTop: "5px",
    display: "block",
  },
  loadingText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    display: "inline-block",
  },
  backLink: {
    display: "inline-block",
    color: "#666",
    textDecoration: "none",
    fontSize: "16px",
  },
  notFound: {
    textAlign: "center",
    padding: "40px",
    fontSize: "20px",
  },
  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
    overflowY: "auto",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    maxWidth: "700px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "40px",
    position: "relative",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#000",
  },
  orderSummary: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  summaryItem: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  summaryImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  summaryInfo: {
    flex: 1,
  },
  summaryProductName: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  summaryText: {
    fontSize: "14px",
    color: "#666",
    margin: "4px 0",
  },
  summaryPrice: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#000",
    margin: "8px 0 0 0",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  formSection: {
    borderBottom: "1px solid #eee",
    paddingBottom: "20px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#000",
  },
  formGroup: {
    marginBottom: "20px",
  },
  formLabel: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  },
  textarea: {
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "inherit",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  radio: {
    marginRight: "12px",
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  paymentLabel: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "16px",
    fontWeight: "500",
  },
  paymentIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  totalSection: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    marginBottom: "12px",
    color: "#666",
  },
  grandTotal: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#000",
    paddingTop: "12px",
    borderTop: "2px solid #ddd",
    marginTop: "8px",
  },
  submitButton: {
    padding: "16px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width: "100%",
  },
  successContainer: {
    textAlign: "center",
    padding: "40px 20px",
  },
  successIcon: {
    width: "80px",
    height: "80px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    margin: "0 auto 30px",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#000",
  },
  successText: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "15px",
    lineHeight: "1.6",
  },
};
