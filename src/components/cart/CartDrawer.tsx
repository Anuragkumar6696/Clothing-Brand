import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../lib/currency';
import { createCartOrderWhatsAppUrl } from '../../lib/whatsapp';
import { STORE_CONFIG } from '../../config/store';
import { PRODUCTS } from '../../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    total,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToCart,
  } = useCart();

  const navigate = useNavigate();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };

    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!isCartDrawerOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const quickWhatsAppUrl = createCartOrderWhatsAppUrl(items, subtotal, shippingFee, total);

  // Recommendations for empty cart
  const emptyRecommendations = PRODUCTS.slice(0, 3);

  const handleCheckoutClick = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1918]/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={closeCartDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E7E2D6] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-[#E7E2D6] flex items-center justify-between bg-[#FDFBF7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1A1918]" />
              <h2 className="font-serif text-xl font-medium text-[#1A1918]">Your Shopping Bag</h2>
              <span className="text-xs bg-[#F7F4EC] text-[#736E66] border border-[#E7E2D6] px-2 py-0.5 rounded-full font-medium">
                {itemCount}
              </span>
            </div>

            <button
              onClick={closeCartDrawer}
              className="p-1.5 text-[#736E66] hover:text-[#1A1918] hover:bg-[#F7F4EC] rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Goal Progress Bar */}
          {items.length > 0 && (
            <div className="px-5 py-3 bg-[#F7F4EC]/60 border-b border-[#E7E2D6] text-xs">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#1A1918]">
                  <Truck className="w-4 h-4 text-[#C25E38]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">
                      Unlocked! Free Complimentary Shipping
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#1A1918]">{formatINR(amountNeededForFreeShipping)}</strong> more for Free Delivery
                    </span>
                  )}
                </span>
                <span className="text-[#736E66]">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full bg-[#E7E2D6] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C25E38] h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items Content / Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#F7F4EC] border border-[#E7E2D6] flex items-center justify-center mx-auto text-[#736E66]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1A1918]">Your bag is empty</h3>
                  <p className="text-xs text-[#736E66] mt-1 max-w-xs mx-auto">
                    Explore our curated collection of lifestyle essentials and handcrafted wares.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1A1918] text-[#FDFBF7] text-xs font-semibold hover:bg-[#353330] transition-colors"
                  >
                    Start Exploring Goods
                  </Link>
                </div>

                {/* Popular Recommendations in Empty Cart */}
                <div className="pt-6 border-t border-[#E7E2D6] text-left">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#736E66] mb-3">
                    Curated Essentials You May Love
                  </p>
                  <div className="space-y-3">
                    {emptyRecommendations.map((prod) => (
                      <div
                        key={prod.id}
                        className="flex items-center justify-between p-2 rounded-lg border border-[#E7E2D6] bg-[#FDFBF7] hover:border-[#1A1918]/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div>
                            <Link
                              to={`/product/${prod.slug}`}
                              onClick={closeCartDrawer}
                              className="text-xs font-medium text-[#1A1918] hover:underline block line-clamp-1"
                            >
                              {prod.name}
                            </Link>
                            <span className="text-xs text-[#736E66] font-semibold">
                              {formatINR(prod.price)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(prod, 1)}
                          className="text-xs font-semibold text-[#C25E38] hover:text-[#A94E2B] px-2 py-1"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3 rounded-xl border border-[#E7E2D6] bg-white transition-all hover:border-[#D4CDBC]"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 bg-[#F7F4EC] rounded-lg overflow-hidden shrink-0 border border-[#E7E2D6]">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          to={`/product/${item.product.slug}`}
                          onClick={closeCartDrawer}
                          className="font-serif text-sm font-medium text-[#1A1918] hover:text-[#C25E38] line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#736E66] hover:text-rose-600 p-0.5 rounded transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Selected Variants */}
                      {Object.entries(item.selectedVariants).length > 0 && (
                        <p className="text-[11px] text-[#736E66] mt-0.5">
                          {Object.entries(item.selectedVariants)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(' • ')}
                        </p>
                      )}

                      <p className="text-xs font-semibold text-[#1A1918] mt-1">
                        {formatINR(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E7E2D6]/60">
                      <div className="inline-flex items-center border border-[#E7E2D6] rounded-md bg-[#F7F4EC] text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#353330] hover:text-[#1A1918]"
                        >
                          −
                        </button>
                        <span className="px-2 py-0.5 font-semibold text-[#1A1918]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#353330] hover:text-[#1A1918]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#1A1918]">
                        Line: {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Financial Calculations & Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E7E2D6] bg-[#FDFBF7] space-y-3">
              <div className="space-y-1.5 text-xs text-[#353330]">
                <div className="flex justify-between">
                  <span className="text-[#736E66]">Bag Subtotal</span>
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
                <div className="flex justify-between text-sm pt-2 border-t border-[#E7E2D6] font-semibold text-[#1A1918]">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#1A1918]">{formatINR(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1A1918] text-[#FDFBF7] hover:bg-[#353330] text-sm font-semibold transition-all shadow-sm"
                >
                  <span>Proceed to Order Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={quickWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] text-xs font-semibold transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Instant Checkout on WhatsApp</span>
                </a>

                <div className="flex items-center justify-between text-[11px] text-[#736E66] pt-1">
                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="hover:underline font-medium text-[#1A1918]"
                  >
                    View Full Cart Page
                  </Link>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="hover:text-rose-600 transition-colors"
                  >
                    Clear Bag
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

