import React, { useState } from 'react';
import { STORE_CONFIG } from '../../config/store';
import { MessageCircle, Phone, X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1A1918] text-[#FDFBF7] text-xs font-medium py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left helper: direct phone/whatsapp quick link on desktop */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#D4CDBC]">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Ordering Concierge</span>
          </a>
          <span>•</span>
          <a
            href={`tel:${STORE_CONFIG.phone.callingNumber}`}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-[#D4CDBC]" />
            <span>{STORE_CONFIG.phone.displayNumber}</span>
          </a>
        </div>

        {/* Center: announcement message */}
        <div className="flex-1 text-center flex items-center justify-center gap-2 tracking-wide text-[11px] sm:text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C25E38] shrink-0" />
          <span className="hidden sm:inline">
            Complimentary Pan-India Shipping on orders over ₹1,999 • Handcrafted with Care
          </span>
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden flex items-center gap-1.5 text-white underline underline-offset-2"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366] shrink-0" />
            <span>Order on WhatsApp: {STORE_CONFIG.whatsapp.displayNumber}</span>
          </a>
        </div>

        {/* Right: Dismiss button */}
        <div className="flex items-center justify-end">
          <button
            onClick={() => setIsVisible(false)}
            className="text-[#D4CDBC] hover:text-white p-1 -mr-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

