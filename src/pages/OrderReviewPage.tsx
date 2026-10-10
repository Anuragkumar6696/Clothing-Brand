import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/currency';
import { createCartOrderWhatsAppUrl, generateOrderReference } from '../lib/whatsapp';
import { CustomerOrderDetails } from '../types';
import { STORE_CONFIG } from '../config/store';
import {
  MessageCircle,
  Phone,
  ShieldAlert,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Info,
  Clock,
  Sparkles,
} from 'lucide-react';

export const OrderReviewPage: React.FC = () => {
  const { items, itemCount, subtotal, shippingFee, total } = useCart();
  const navigate = useNavigate();

  const [orderRef] = useState<string>(() => generateOrderReference());
  const [formData, setFormData] = useState<CustomerOrderDetails>({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    deliveryNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F7F4EC] flex items-center justify-center mx-auto text-[#736E66]">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="font-serif text-2xl text-[#1A1918]">No Items to Review</h1>
        <p className="text-xs text-[#736E66]">
          Your bag is currently empty. Add items before proceeding to review your order.
        </p>
        <Link
          to="/shop"
          className="inline-block px-5 py-2.5 rounded-lg bg-[#1A1918] text-white text-xs font-semibold"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please provide your name';
    if (!formData.addressLine1.trim()) errs.addressLine1 = 'Please provide your delivery address';
    if (!formData.city.trim()) errs.city = 'Please provide your city';
    if (!formData.pincode.trim() || formData.pincode.length < 6)
      errs.pincode = 'Valid 6-digit PIN code required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const whatsAppUrl = createCartOrderWhatsAppUrl(
    items,
    subtotal,
    shippingFee,
    total,
    formData,
    orderRef
  );

  const handleConfirmOrder = () => {
    if (!validate()) {
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    // Open WhatsApp in new tab
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div>
        <nav className="text-xs text-[#736E66] mb-2 flex items-center gap-1.5">
          <Link to="/cart" className="hover:text-[#1A1918] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Bag
          </Link>
          <span>/</span>
          <span className="text-[#1A1918] font-medium">Order Review &amp; WhatsApp Confirmation</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal">
          Review Your Order
        </h1>
        <p className="text-xs sm:text-sm text-[#736E66] mt-1">
          Reference Code: <strong className="text-[#1A1918]">#{orderRef}</strong> • Ready for WhatsApp Concierge dispatch
        </p>
      </div>

      {/* Honest Prototype Notice / Ordering Explanation */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5 text-xs text-amber-900">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-amber-950 text-sm">
            How Aurelia &amp; Co. WhatsApp Ordering Works:
          </p>
          <p className="leading-relaxed">
            We operate directly with our clients over WhatsApp. When you click <strong>"Confirm via WhatsApp"</strong>, WhatsApp will open with your pre-formatted order summary and delivery notes. Simply send the message, and our studio concierge will confirm real-time batch availability, exact delivery time, and share official UPI / Bank transfer details with you.
          </p>
          <p className="font-semibold text-amber-950 pt-1">
            • No sensitive payment credentials (cards/PINs) are ever entered or collected on this website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Customer Details Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E7E2D6] shadow-sm space-y-6">
            <div className="border-b border-[#E7E2D6] pb-4">
              <h2 className="font-serif text-xl text-[#1A1918]">1. Delivery Details</h2>
              <p className="text-xs text-[#736E66] mt-0.5">
                These will be included in your WhatsApp message for accurate delivery.
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none transition-all ${
                    errors.fullName ? 'border-rose-500' : 'border-[#E7E2D6] focus:border-[#1A1918]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 9876543210 (Optional if sending directly)"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="For tracking updates"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
                  />
                </div>
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                  Delivery Address <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Flat/House number, building, street, locality"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm bg-[#FDFBF7] focus:bg-white focus:outline-none transition-all ${
                    errors.addressLine1 ? 'border-rose-500' : 'border-[#E7E2D6] focus:border-[#1A1918]'
                  }`}
                />
                {errors.addressLine1 && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.addressLine1}</p>
                )}
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                    City <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7]"
                  />
                  {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                    PIN Code <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    maxLength={6}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E7E2D6] text-xs sm:text-sm bg-[#FDFBF7]"
                  />
                  {errors.pincode && <p className="text-[11px] text-rose-600 mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                  Order Instructions &amp; Gifting Notes
                </label>
                <textarea
                  name="deliveryNotes"
                  rows={2}
                  value={formData.deliveryNotes}
                  onChange={handleInputChange}
                  placeholder="e.g. Include handwritten birthday note, leave with security, call before arrival..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E7E2D6] text-xs bg-[#FDFBF7] focus:bg-white focus:outline-none focus:border-[#1A1918]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & WhatsApp Action (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E7E2D6] pb-3">
              <h2 className="font-serif text-xl text-[#1A1918]">2. Bag Breakdown</h2>
              <span className="text-xs text-[#736E66]">{itemCount} items</span>
            </div>

            {/* Itemized List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#E7E2D6]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#1A1918] line-clamp-1">{item.product.name}</p>
                    {Object.entries(item.selectedVariants).length > 0 && (
                      <p className="text-[11px] text-[#736E66]">
                        {Object.entries(item.selectedVariants).map(([k, v]) => `${v}`).join(', ')}
                      </p>
                    )}
                    <p className="text-[#736E66]">
                      Qty: {item.quantity} × {formatINR(item.product.price)}
                    </p>
                  </div>
                  <span className="font-semibold text-[#1A1918]">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="pt-3 border-t border-[#E7E2D6] space-y-2 text-xs text-[#353330]">
              <div className="flex justify-between">
                <span className="text-[#736E66]">Subtotal</span>
                <span className="font-semibold text-[#1A1918]">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#736E66]">Estimated Shipping</span>
                <span className="font-semibold text-[#1A1918]">
                  {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : formatINR(shippingFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E7E2D6] flex justify-between text-base font-semibold text-[#1A1918]">
                <span>Estimated Total</span>
                <span className="text-xl text-[#1A1918]">{formatINR(total)}</span>
              </div>
            </div>

            {/* Action Button: WhatsApp Order */}
            <div className="pt-3 space-y-3">
              <button
                type="button"
                onClick={handleConfirmOrder}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] font-semibold text-sm transition-all shadow-md cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                <span>Confirm Order via WhatsApp</span>
              </button>

              <a
                href={`tel:${STORE_CONFIG.phone.callingNumber}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#E7E2D6] text-[#1A1918] text-xs font-semibold hover:bg-[#F7F4EC] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#1A1918]" />
                <span>Prefer to Call Directly? {STORE_CONFIG.phone.displayNumber}</span>
              </a>
            </div>

            <p className="text-[11px] text-[#736E66] text-center leading-snug">
              Clicking will launch WhatsApp with your pre-filled order message. Please press send in WhatsApp to submit your enquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

