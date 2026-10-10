import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/currency';
import { createCartOrderWhatsAppUrl } from '../lib/whatsapp';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/products/ProductCard';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const whatsAppUrl = createCartOrderWhatsAppUrl(items, subtotal, shippingFee, total);

  // Recommendations for empty cart or cross-sell
  const crossSellProducts = PRODUCTS.slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F7F4EC] border border-[#E7E2D6] flex items-center justify-center mx-auto text-[#736E66]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918]">Your Shopping Bag is Empty</h1>
          <p className="text-sm text-[#736E66] max-w-md mx-auto">
            You haven't added any items to your bag yet. Explore our handcrafted essentials and find something you love.
          </p>
        </div>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#353330] transition-colors shadow-sm"
          >
            <span>Explore Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Suggested Pieces */}
        <div className="pt-16 text-left border-t border-[#E7E2D6] mt-12 space-y-6">
          <h2 className="font-serif text-2xl text-[#1A1918]">Curated Recommendations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {crossSellProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E7E2D6]">
        <div>
          <nav className="text-xs text-[#736E66] mb-1">
            <Link to="/" className="hover:text-[#1A1918]">Home</Link> / <span>Shopping Bag</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal">
            Your Shopping Bag
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#736E66]">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
          <button
            type="button"
            onClick={clearCart}
            className="text-rose-600 hover:underline flex items-center gap-1 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear bag
          </button>
        </div>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-xl bg-[#F7F4EC] border border-[#E7E2D6]">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="flex items-center gap-2 text-[#1A1918]">
            <Truck className="w-4 h-4 text-[#C25E38]" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-800">
                You've unlocked Complimentary Pan-India Delivery!
              </span>
            ) : (
              <span>
                Add <strong className="text-[#C25E38]">{formatINR(amountNeededForFreeShipping)}</strong> more to your bag for Free Delivery
              </span>
            )}
          </span>
          <span className="text-[#736E66]">{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full bg-[#E7E2D6] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C25E38] h-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Grid: Items List + Order Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-[#E7E2D6] overflow-hidden divide-y divide-[#E7E2D6]">
            {items.map((item) => (
              <div key={item.cartItemId} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-start sm:items-center">
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#F7F4EC] overflow-hidden shrink-0 border border-[#E7E2D6]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#736E66] font-semibold">
                    {item.product.category}
                  </span>
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-serif text-base sm:text-lg text-[#1A1918] hover:text-[#C25E38] transition-colors line-clamp-1 block"
                  >
                    {item.product.name}
                  </Link>

                  {/* Variants */}
                  {Object.entries(item.selectedVariants).length > 0 && (
                    <p className="text-xs text-[#736E66]">
                      {Object.entries(item.selectedVariants)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(' • ')}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm font-semibold text-[#1A1918]">
                    Unit: {formatINR(item.product.price)}
                  </p>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-6 shrink-0">
                  <div className="inline-flex items-center border border-[#E7E2D6] rounded-lg bg-[#F7F4EC] text-xs">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="px-2.5 py-1 text-[#353330] hover:text-[#1A1918]"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-2.5 py-1 font-semibold text-[#1A1918]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="px-2.5 py-1 text-[#353330] hover:text-[#1A1918]"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold text-sm sm:text-base text-[#1A1918] min-w-[70px] text-right">
                    {formatINR(item.product.price * item.quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-[#736E66] hover:text-rose-600 p-1 rounded transition-colors"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/shop"
              className="text-xs text-[#1A1918] hover:text-[#C25E38] font-semibold underline underline-offset-4 flex items-center gap-1.5"
            >
              ← Continue Shopping Our Collections
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] shadow-sm space-y-5">
            <h2 className="font-serif text-xl text-[#1A1918]">Order Summary</h2>

            <div className="space-y-3 text-xs sm:text-sm text-[#353330]">
              <div className="flex justify-between">
                <span className="text-[#736E66]">Subtotal ({itemCount} items)</span>
                <span className="font-semibold text-[#1A1918]">{formatINR(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#736E66]">Estimated Shipping</span>
                <span className="font-semibold text-[#1A1918]">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700">FREE</span>
                  ) : (
                    formatINR(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E7E2D6] flex justify-between text-base font-semibold text-[#1A1918]">
                <span>Estimated Total</span>
                <span className="text-xl text-[#1A1918]">{formatINR(total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#1A1918] text-[#FDFBF7] hover:bg-[#353330] text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <span>Proceed to Order Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] text-xs font-semibold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Instant Order via WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 border-t border-[#E7E2D6] space-y-2 text-[11px] text-[#736E66]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C25E38] shrink-0" />
                <span>No upfront digital payment needed on this frontend prototype</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Order details are routed directly to our WhatsApp concierge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

