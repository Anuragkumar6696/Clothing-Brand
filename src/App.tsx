import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { RecentlyViewedProvider } from './context/RecentlyViewedContext';

// Layout & Pages
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { OrderReviewPage } from './pages/OrderReviewPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PolicyPage } from './pages/PolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="shop" element={<ShopPage />} />
                  <Route path="product/:slug" element={<ProductDetailPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="checkout" element={<OrderReviewPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="faq" element={<FAQPage />} />
                  <Route path="policies/:type" element={<PolicyPage />} />
                  <Route path="policies" element={<Navigate to="/policies/shipping" replace />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
};

export default App;

