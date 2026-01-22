import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { CartIcon, MenuIcon, CloseIcon } from "./Icons";
import styles from "./navbar.module.css";

export default function Navbar() {
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logoLink} onClick={closeMobileMenu}>
          <h2 className={styles.logo}>MYCLOTH</h2>
        </Link>

        {/* Desktop Menu */}
        <div className={styles.links}>
          <Link 
            to="/" 
            className={`${styles.link} ${location.pathname === "/" ? styles.activeLink : ""}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`${styles.link} ${location.pathname.includes("/products") ? styles.activeLink : ""}`}
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            className={`${styles.cartLink} ${location.pathname === "/cart" ? styles.activeLink : ""}`}
          >
            <CartIcon size={24} color={location.pathname === "/cart" ? "#000" : "#666"} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </div>

        {/* Hamburger Button */}
        <button className={styles.hamburger} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <CloseIcon size={28} color="#000" />
          ) : (
            <MenuIcon size={28} color="#000" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link 
            to="/" 
            className={`${styles.link} ${location.pathname === "/" ? styles.activeLink : ""}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`${styles.link} ${location.pathname.includes("/products") ? styles.activeLink : ""}`}
            onClick={closeMobileMenu}
          >
            Products
          </Link>
          <Link 
            to="/cart" 
            className={`${styles.cartLink} ${location.pathname === "/cart" ? styles.activeLink : ""}`}
            onClick={closeMobileMenu}
          >
            <CartIcon size={24} color={location.pathname === "/cart" ? "#000" : "#666"} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </div>
      )}
    </>
  );
}
