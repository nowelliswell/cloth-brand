import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import Home from "./pages/home";
import Products from "./pages/products";
import ProductDetail from "./pages/productdetail";
import Cart from "./pages/cart";
import Navbar from "./components/navbar";

function App() {
  return (
    <RecentlyViewedProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <div style={{ margin: 0, padding: 0 }}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </RecentlyViewedProvider>
  );
}

export default App;
