import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import Toast from "../components/Toast";
import Breadcrumb from "../components/Breadcrumb";
import { 
  EmptyCartIcon, 
  MinusIcon, 
  PlusIcon, 
  CreditCardIcon, 
  BankIcon, 
  WalletIcon, 
  CashIcon,
  ArrowLeftIcon 
} from "../components/Icons";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
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

  const subtotal = getCartTotal();
  const shipping = 20000;
  const total = subtotal + shipping;

  const breadcrumbItems = showCheckout
    ? [
        { label: "Home", link: "/" },
        { label: "Cart", link: "/cart" },
        { label: "Checkout" },
      ]
    : [
        { label: "Home", link: "/" },
        { label: "Cart" },
      ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    
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

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^[0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Postal code must be 5 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
    setToast({ message: "Cart updated", type: "success" });
  };

  const handleRemove = (productId, productName) => {
    removeFromCart(productId);
    setToast({ message: `${productName} removed from cart`, type: "info" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setOrderSuccess(true);
      setToast({ message: "Order placed successfully!", type: "success" });
    }, 2000);
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div style={styles.emptyCart}>
        <div style={styles.emptyIcon}>
          <EmptyCartIcon size={100} color="#ccc" />
        </div>
        <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
        <p style={styles.emptyText}>Add some products to get started!</p>
        <Link to="/products" style={styles.shopButton}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {!showCheckout && !orderSuccess && <Breadcrumb items={breadcrumbItems} />}

      {!showCheckout && !orderSuccess ? (
        <>
          <h1 style={styles.title}>Shopping Cart</h1>
          
          <div style={styles.cartContent}>
            <div style={styles.cartItems}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  
                  <div style={styles.itemInfo}>
                    <h3 style={styles.itemName}>{item.name}</h3>
                    <p style={styles.itemPrice}>Rp {item.price.toLocaleString()}</p>
                  </div>

                  <div style={styles.quantityControl}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      <MinusIcon size={24} color="#000" />
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      <PlusIcon size={24} color="#000" />
                    </button>
                  </div>

                  <div style={styles.itemTotal}>
                    <p style={styles.totalPrice}>
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      style={styles.removeButton}
                      onClick={() => handleRemove(item.id, item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.cartSummary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>
              
              <div style={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>Rp {subtotal.toLocaleString()}</span>
              </div>
              
              <div style={styles.summaryRow}>
                <span>Shipping:</span>
                <span>Rp {shipping.toLocaleString()}</span>
              </div>
              
              <div style={{...styles.summaryRow, ...styles.totalRow}}>
                <span>Total:</span>
                <span>Rp {total.toLocaleString()}</span>
              </div>

              <button
                style={styles.checkoutButton}
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </button>

              <Link to="/products" style={styles.continueShoppingLink}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      ) : orderSuccess ? (
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
          <div style={styles.successButtons}>
            <Link to="/products" style={styles.shopButton}>
              Continue Shopping
            </Link>
            <Link to="/" style={styles.homeButton}>
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <div style={styles.checkoutContainer}>
          <Breadcrumb items={breadcrumbItems} />
          
          <button
            style={styles.backButton}
            onClick={() => setShowCheckout(false)}
          >
            <ArrowLeftIcon size={20} color="#666" /> Back to Cart
          </button>

          <h1 style={styles.title}>Checkout</h1>

          <div style={styles.checkoutContent}>
            <form onSubmit={handleSubmitOrder} style={styles.form}>
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

              <button type="submit" style={styles.submitButton} disabled={isLoading}>
                {isLoading ? (
                  <span style={styles.loadingText}>
                    <span style={styles.spinner}></span>
                    Processing Order...
                  </span>
                ) : (
                  `Confirm & Pay - Rp ${total.toLocaleString()}`
                )}
              </button>
            </form>

            <div style={styles.orderSummaryCheckout}>
              <h3 style={styles.sectionTitle}>Order Summary</h3>
              
              {cartItems.map((item) => (
                <div key={item.id} style={styles.summaryItem}>
                  <img src={item.image} alt={item.name} style={styles.summaryImage} />
                  <div style={styles.summaryInfo}>
                    <p style={styles.summaryProductName}>{item.name}</p>
                    <p style={styles.summaryText}>Qty: {item.quantity}</p>
                    <p style={styles.summaryPrice}>
                      Rp {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              <div style={styles.summaryTotals}>
                <div style={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                <div style={styles.summaryRow}>
                  <span>Shipping:</span>
                  <span>Rp {shipping.toLocaleString()}</span>
                </div>
                <div style={{...styles.summaryRow, ...styles.totalRow}}>
                  <span>Total:</span>
                  <span>Rp {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    minHeight: "calc(100vh - 81px)",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "#000",
  },
  emptyCart: {
    textAlign: "center",
    padding: "100px 20px",
    minHeight: "calc(100vh - 81px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#000",
  },
  emptyText: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "30px",
  },
  shopButton: {
    padding: "15px 40px",
    fontSize: "18px",
    backgroundColor: "#000",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "inline-block",
  },
  cartContent: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "40px",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  cartItem: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    alignItems: "center",
  },
  itemImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#000",
  },
  itemPrice: {
    fontSize: "16px",
    color: "#666",
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  quantityButton: {
    width: "36px",
    height: "36px",
    border: "2px solid #000",
    backgroundColor: "#fff",
    cursor: "pointer",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    transition: "all 0.3s ease",
  },
  quantity: {
    fontSize: "18px",
    fontWeight: "600",
    minWidth: "30px",
    textAlign: "center",
  },
  itemTotal: {
    textAlign: "right",
  },
  totalPrice: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#000",
  },
  removeButton: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "transparent",
    color: "#ff4444",
    border: "1px solid #ff4444",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  cartSummary: {
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "12px",
    height: "fit-content",
    position: "sticky",
    top: "100px",
  },
  summaryTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "25px",
    color: "#000",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    marginBottom: "15px",
    color: "#666",
  },
  totalRow: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#000",
    paddingTop: "15px",
    borderTop: "2px solid #ddd",
    marginTop: "10px",
  },
  checkoutButton: {
    width: "100%",
    padding: "16px",
    fontSize: "18px",
    fontWeight: "bold",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "20px",
    marginBottom: "15px",
    transition: "all 0.3s ease",
  },
  continueShoppingLink: {
    display: "block",
    textAlign: "center",
    color: "#666",
    textDecoration: "none",
    fontSize: "16px",
  },
  checkoutContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  backButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "transparent",
    color: "#666",
    border: "1px solid #ddd",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  checkoutContent: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "40px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  formSection: {
    paddingBottom: "20px",
    borderBottom: "1px solid #eee",
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
  orderSummaryCheckout: {
    backgroundColor: "#f9f9f9",
    padding: "30px",
    borderRadius: "12px",
    height: "fit-content",
    position: "sticky",
    top: "100px",
  },
  summaryItem: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid #ddd",
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
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#000",
  },
  summaryText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
  },
  summaryPrice: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
  },
  summaryTotals: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "2px solid #ddd",
  },
  successContainer: {
    textAlign: "center",
    padding: "80px 20px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  successIcon: {
    width: "100px",
    height: "100px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "60px",
    margin: "0 auto 30px",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#000",
  },
  successText: {
    fontSize: "18px",
    color: "#666",
    marginBottom: "15px",
    lineHeight: "1.6",
  },
  successButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginTop: "40px",
  },
  homeButton: {
    padding: "15px 40px",
    fontSize: "18px",
    backgroundColor: "transparent",
    color: "#000",
    textDecoration: "none",
    border: "2px solid #000",
    borderRadius: "8px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "inline-block",
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
};
