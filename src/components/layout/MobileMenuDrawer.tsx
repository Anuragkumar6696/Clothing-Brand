import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { STORE_CONFIG } from '../../config/store';
import { Logo } from '../ui/Logo';
import { X, Heart, ShoppingBag, Phone, MessageCircle, ChevronRight, HelpCircle } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { wishlistCount } = useWishlist();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1918]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#E7E2D6] flex items-center justify-between bg-[#FDFBF7]">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 text-[#736E66] hover:text-[#1A1918] hover:bg-[#EAE4D7] rounded-full transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links Navigation */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Main Primary Links */}
          <div className="space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-sm font-semibold text-[#1A1918] hover:text-[#C25E38] transition-colors"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-[#736E66]" />
            </Link>
            <Link
              to="/shop"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-sm font-semibold text-[#1A1918] hover:text-[#C25E38] transition-colors"
            >
              <span>Shop All Products</span>
              <ChevronRight className="w-4 h-4 text-[#736E66]" />
            </Link>
            <Link
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2 text-sm font-semibold text-[#1A1918] hover:text-[#C25E38] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                <span>Saved Wishlist</span>
              </div>
              {wishlistCount > 0 && (
                <span className="text-xs bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* Shop Categories */}
          <div className="pt-4 border-t border-[#E7E2D6]">
            <p className="text-[11px] uppercase tracking-wider font-bold text-[#736E66] mb-3">
              Categories
            </p>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/shop?category=${cat.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 text-xs text-[#353330] hover:text-[#C25E38] transition-colors"
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-[#736E66]">({cat.itemCount})</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Story & Information */}
          <div className="pt-4 border-t border-[#E7E2D6]">
            <p className="text-[11px] uppercase tracking-wider font-bold text-[#736E66] mb-3">
              Company
            </p>
            <div className="space-y-2 text-xs">
              <Link
                to="/about"
                onClick={onClose}
                className="block py-1 text-[#353330] hover:text-[#C25E38]"
              >
                Our Heritage &amp; Craft
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="block py-1 text-[#353330] hover:text-[#C25E38]"
              >
                Contact &amp; Studio Showroom
              </Link>
              <Link
                to="/faq"
                onClick={onClose}
                className="block py-1 text-[#353330] hover:text-[#C25E38]"
              >
                Frequently Asked Questions
              </Link>
              <Link
                to="/policies/shipping"
                onClick={onClose}
                className="block py-1 text-[#353330] hover:text-[#C25E38]"
              >
                Shipping &amp; Delivery Policies
              </Link>
            </div>
          </div>
        </div>

        {/* Footer actions: WhatsApp & Call */}
        <div className="p-5 border-t border-[#E7E2D6] bg-[#FDFBF7] space-y-2">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Chat &amp; Order on WhatsApp</span>
          </a>

          <a
            href={`tel:${STORE_CONFIG.phone.callingNumber}`}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[#E7E2D6] text-xs font-semibold text-[#1A1918] hover:bg-[#EAE4D7] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#1A1918]" />
            <span>Call: {STORE_CONFIG.phone.displayNumber}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

