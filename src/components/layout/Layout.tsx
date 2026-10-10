import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './AnnouncementBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { STORE_CONFIG } from '../../config/store';
import { MessageCircle, Phone } from 'lucide-react';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1A1918]">
      {/* 1. Global Announcement */}
      <AnnouncementBar />

      {/* 2. Global Header */}
      <Header />

      {/* 3. Main Route Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 4. Global Cart Drawer */}
      <CartDrawer />

      {/* 5. Global Footer */}
      <Footer />

      {/* Floating Concierge Action on Mobile (hidden on product detail page to avoid sticky bar collision) */}
      {!pathname.startsWith('/product/') && (
        <div className="fixed bottom-5 right-4 z-30 flex items-center gap-2 sm:hidden animate-in fade-in slide-in-from-bottom-2">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-2xl hover:bg-[#20ba59] transition-all font-semibold text-xs active:scale-95 border-2 border-white/60"
            aria-label="Order on WhatsApp"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
};

