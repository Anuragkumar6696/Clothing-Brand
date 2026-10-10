import React, { useState } from 'react';
import { Product } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { RatingStars } from './RatingStars';
import { formatINR, calculateDiscount } from '../../lib/currency';
import { createSingleProductWhatsAppUrl } from '../../lib/whatsapp';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ShoppingBag, MessageCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        initial[v.name] = v.options[0];
      });
    }
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isWishlisted = isInWishlist(product.id);

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    onClose();
  };

  const whatsAppUrl = createSingleProductWhatsAppUrl(product, quantity, selectedVariants);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Gallery Column */}
        <div className="space-y-4">
          <div className="aspect-square bg-[#F7F4EC] rounded-xl overflow-hidden border border-[#E7E2D6] relative">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-rose-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider">
                SAVE {discount}%
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#1A1918] ring-1 ring-[#1A1918]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="flex flex-col h-full justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-[#736E66] font-medium">
                {product.category}
              </span>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <h2 className="font-serif text-2xl font-normal text-[#1A1918] mb-1.5">
              {product.name}
            </h2>

            <p className="text-xs text-[#736E66] italic mb-3">{product.tagline}</p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-semibold text-[#1A1918]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-[#736E66] line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-sm text-[#353330] leading-relaxed mb-5">
              {product.shortDescription}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4 pt-2 pb-4 border-t border-[#E7E2D6]">
                {product.variants.map((v) => (
                  <div key={v.id}>
                    <label className="block text-xs font-semibold text-[#1A1918] uppercase tracking-wider mb-2">
                      {v.name}: <span className="font-normal text-[#736E66]">{selectedVariants[v.name]}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {v.options.map((option) => {
                        const isSelected = selectedVariants[v.name] === option;
                        return (
                          <button
                            key={option}
                            onClick={() => handleVariantSelect(v.name, option)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              isSelected
                                ? 'bg-[#1A1918] text-white border-[#1A1918]'
                                : 'bg-[#F7F4EC] text-[#353330] border-[#E7E2D6] hover:border-[#1A1918]'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-[#E7E2D6] rounded-lg bg-[#F7F4EC]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm text-[#353330] hover:text-[#1A1918]"
                >
                  −
                </button>
                <span className="px-3 py-1 text-sm font-semibold text-[#1A1918]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-sm text-[#353330] hover:text-[#1A1918]"
                >
                  +
                </button>
              </div>

              <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                In Stock ({product.stockCount} available)
              </span>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="space-y-3 pt-4 border-t border-[#E7E2D6]">
            <div className="flex gap-2">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={handleAddToCart}
                icon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Bag
              </Button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-lg border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-[#F7F4EC] border-[#E7E2D6] text-[#736E66] hover:text-[#1A1918]'
                }`}
                title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] text-sm font-semibold transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              Order on WhatsApp Directly
            </a>

            <div className="text-center pt-1">
              <Link
                to={`/product/${product.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs text-[#736E66] hover:text-[#1A1918] transition-colors font-medium underline underline-offset-4"
              >
                View Full Product Specifications &amp; Reviews
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

