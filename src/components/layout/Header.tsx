import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { CATEGORIES } from '../../data/categories';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { STORE_CONFIG } from '../../config/store';
import { Search, Heart, ShoppingBag, Menu, ChevronDown, MessageCircle } from 'lucide-react';
import { QuickSearchOverlay } from './QuickSearchOverlay';
import { MobileMenuDrawer } from './MobileMenuDrawer';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  const { itemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E7E2D6]'
            : 'bg-[#FDFBF7] border-b border-[#E7E2D6]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Hamburger & Desktop Navigation */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#1A1918] hover:text-[#C25E38] transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-7">
                <Link
                  to="/shop"
                  className={`text-xs uppercase tracking-[0.15em] font-semibold transition-colors hover:text-[#C25E38] ${
                    location.pathname === '/shop' && !location.search
                      ? 'text-[#C25E38]'
                      : 'text-[#1A1918]'
                  }`}
                >
                  Shop All
                </Link>

                {/* Categories Dropdown */}
                <div
                  className="relative group py-6"
                  onMouseEnter={() => setIsCategoryHovered(true)}
                  onMouseLeave={() => setIsCategoryHovered(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-semibold text-[#1A1918] group-hover:text-[#C25E38] transition-colors"
                  >
                    <span>Categories</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {/* Dropdown Menu */}
                  {isCategoryHovered && (
                    <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-[#E7E2D6] p-4 grid gap-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#736E66] px-3 pb-1 border-b border-[#E7E2D6]/60">
                        Explore Collections
                      </p>
                      {CATEGORIES.map((category) => (
                        <Link
                          key={category.id}
                          to={`/shop?category=${category.slug}`}
                          onClick={() => setIsCategoryHovered(false)}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F7F4EC] transition-colors group/item"
                        >
                          <img
                            src={category.image}
                            alt=""
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <span className="text-xs font-semibold text-[#1A1918] group-hover/item:text-[#C25E38] transition-colors block">
                              {category.name}
                            </span>
                            <span className="text-[11px] text-[#736E66]">
                              {category.itemCount} handcrafted items
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  className={`text-xs uppercase tracking-[0.15em] font-semibold transition-colors hover:text-[#C25E38] ${
                    location.pathname === '/about' ? 'text-[#C25E38]' : 'text-[#1A1918]'
                  }`}
                >
                  Our Story
                </Link>

                <Link
                  to="/contact"
                  className={`text-xs uppercase tracking-[0.15em] font-semibold transition-colors hover:text-[#C25E38] ${
                    location.pathname === '/contact' ? 'text-[#C25E38]' : 'text-[#1A1918]'
                  }`}
                >
                  Concierge
                </Link>
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-1 flex justify-center lg:flex-initial">
              <Logo size="md" />
            </div>

            {/* Right: Actions (Search, Wishlist, Bag) */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#1A1918] hover:text-[#C25E38] hover:bg-[#F7F4EC] rounded-full transition-colors flex items-center gap-2"
                aria-label="Search products"
                title="Search products (Ctrl+K or click)"
              >
                <Search className="w-5 h-5" />
                <span className="hidden xl:inline text-xs font-medium text-[#736E66]">Search</span>
              </button>

              {/* Direct WhatsApp Concierge CTA */}
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-[#25D366] hover:bg-[#25D366]/10 rounded-full transition-colors flex items-center gap-1.5"
                title={`Chat on WhatsApp (${STORE_CONFIG.whatsapp.displayNumber})`}
                aria-label="Direct WhatsApp Ordering"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="hidden md:inline text-xs font-semibold text-[#1A1918]">WhatsApp</span>
              </a>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="p-2 text-[#1A1918] hover:text-[#C25E38] hover:bg-[#F7F4EC] rounded-full transition-colors relative"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in-75">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={openCartDrawer}
                className="flex items-center gap-2.5 py-2 px-3 sm:px-3.5 rounded-full bg-[#1A1918] text-[#FDFBF7] hover:bg-[#353330] transition-all shadow-sm active:scale-95"
                aria-label={`Shopping bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-semibold">{itemCount}</span>
                <span className="hidden sm:inline text-xs text-[#D4CDBC] font-normal border-l border-white/20 pl-2">
                  Bag
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Interactive Overlays */}
      <QuickSearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

