import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatINR, calculateDiscount } from '../../lib/currency';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { RatingStars } from './RatingStars';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If product has multiple variants, open quick view to let customer choose
    if (product.variants && product.variants.length > 0) {
      setIsQuickViewOpen(true);
      return;
    }

    addToCart(product, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
      <div className="group relative flex flex-col bg-white rounded-xl border border-[#E7E2D6] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#D4CDBC]">
        {/* Product Image Stage */}
        <div className="relative aspect-[4/5] bg-[#F7F4EC] overflow-hidden">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={product.images[0]}
              alt={product.name}
              loading={priority ? 'eager' : 'lazy'}
              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </Link>

          {/* Badges on Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.isBestseller && (
              <span className="bg-[#1A1918] text-[#FDFBF7] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-sm">
                Bestseller
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-[#C25E38] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-sm">
                New
              </span>
            )}
            {discount > 0 && (
              <span className="bg-rose-700 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded shadow-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button on Top Right */}
          <button
            type="button"
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 shadow-sm ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600'
                : 'bg-white/80 text-[#736E66] hover:text-[#1A1918] hover:bg-white'
            }`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
          </button>

          {/* Quick Actions Hover Drawer on Desktop */}
          <div className="absolute inset-x-3 bottom-3 flex gap-2 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="flex-1 py-2 px-3 bg-white/95 backdrop-blur-sm text-[#1A1918] text-xs font-semibold rounded-lg shadow-md hover:bg-white flex items-center justify-center gap-1.5 transition-colors border border-[#E7E2D6]"
            >
              <Eye className="w-3.5 h-3.5" />
              Quick View
            </button>
            <button
              type="button"
              onClick={handleQuickAdd}
              className="p-2 bg-[#1A1918] text-white rounded-lg shadow-md hover:bg-[#353330] flex items-center justify-center transition-colors"
              title="Add to bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-white">
          <div>
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#736E66] font-medium mb-1">
              <span>{product.category}</span>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            </div>

            <Link
              to={`/product/${product.slug}`}
              className="font-serif text-base font-normal text-[#1A1918] hover:text-[#C25E38] transition-colors line-clamp-1 block"
            >
              {product.name}
            </Link>

            <p className="text-xs text-[#736E66] line-clamp-1 mt-0.5">
              {product.tagline}
            </p>
          </div>

          {/* Price & Mobile Add */}
          <div className="mt-3 pt-3 border-t border-[#E7E2D6]/60 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-[#1A1918]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-[#736E66] line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile-only visible quick-add */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className="md:hidden text-xs font-medium text-[#C25E38] hover:text-[#A94E2B] flex items-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

