import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ContentfulProvider } from './contexts/ContentfulContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { AuthProvider } from './contexts/AuthContext'; // ✅ Ajoute cette ligne
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Categories from './pages/Categories';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice';
import { Fade, Slide, Bounce, Zoom, Flip, Rotate, Roll, JackInTheBox, Hinge } from "react-awesome-reveal";

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <FirebaseProvider>
      <ContentfulProvider>
        <FavoritesProvider>
          <CartProvider>
            <AuthProvider> {/* ✅ Entoure ton app avec AuthProvider */}
              <Router>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <PageWrapper>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/legal" element={<LegalNotice />} />
                      </Routes>
                    </PageWrapper>
                  </main>
                  <Footer />
                </div>
              </Router>
            </AuthProvider>
          </CartProvider>
        </FavoritesProvider>
      </ContentfulProvider>
    </FirebaseProvider>
  );
}

export default App;
