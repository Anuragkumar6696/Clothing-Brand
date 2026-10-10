import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { STORE_CONFIG } from '../../config/store';
import { CATEGORIES } from '../../data/categories';
import { useToast } from '../../context/ToastContext';
import { MessageCircle, Phone, Mail, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }

    setIsSubscribed(true);
    showToast(
      'Subscribed (Demo)',
      'Thank you! In this frontend demo, your email is validated locally.',
      'info'
    );
    setEmail('');
  };

  return (
    <footer className="bg-[#1A1918] text-[#FDFBF7] pt-16 pb-12 border-t border-[#353330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Col 1 & 2: Brand & WhatsApp Concierge */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" inverted />
            <p className="text-xs sm:text-sm text-[#D4CDBC] leading-relaxed max-w-sm">
              Thoughtfully curated lifestyle goods, tactile ceramics, unbleached linens, and artisanal heirlooms. Built for intentional living, made with enduring craftsmanship.
            </p>

            {/* Direct WhatsApp Ordering Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 max-w-sm">
              <div className="flex items-center gap-2 text-[#25D366]">
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Direct WhatsApp Ordering
                </span>
              </div>
              <p className="text-xs text-[#D4CDBC] leading-snug">
                Browse our catalogue and order directly on WhatsApp. Our concierge confirms product availability, custom requests, and payment details instantly.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                  <span>WhatsApp: {STORE_CONFIG.whatsapp.displayNumber}</span>
                </a>
                <a
                  href={`tel:${STORE_CONFIG.phone.callingNumber}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Collections */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D4CDBC]">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Customer Care & Policies */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D4CDBC]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Brand Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Studio
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Ordering &amp; FAQs
                </Link>
              </li>
              <li>
                <Link to="/policies/shipping" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/returns" className="hover:text-white transition-colors">
                  Returns &amp; Exchange
                </Link>
              </li>
              <li>
                <Link to="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/policies/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-white">
              The Aurelia Journal
            </h4>
            <p className="text-xs text-[#D4CDBC] leading-relaxed">
              Stories of craft, mindful interiors, and early previews of limited small-batch editions.
            </p>

            {isSubscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>You are subscribed for preview releases.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3.5 py-2.5 text-xs bg-white/10 border border-white/15 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 bg-[#C25E38] text-white rounded-md hover:bg-[#A94E2B] transition-colors"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-white/40">
                  Demo mode: no spam, unsubscribe anytime.
                </p>
              </form>
            )}

            {/* Studio Address */}
            <div className="pt-2 text-[11px] text-[#D4CDBC] space-y-1">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C25E38] shrink-0 mt-0.5" />
                <span>
                  {STORE_CONFIG.location.studio}, {STORE_CONFIG.location.city}, {STORE_CONFIG.location.state}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4CDBC] shrink-0" />
                <span>{STORE_CONFIG.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D4CDBC]">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.brandName}. All rights reserved.</p>
          <p className="text-[11px] text-white/50 text-center sm:text-right">
            Designed as an artisanal frontend store with direct WhatsApp ordering.
          </p>
        </div>
      </div>
    </footer>
  );
};
