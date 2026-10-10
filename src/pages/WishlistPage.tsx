import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../lib/currency';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, wishlistCount, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistCount === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#F7F4EC] border border-[#E7E2D6] flex items-center justify-center mx-auto text-[#736E66]">
          <Heart className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918]">Your Wishlist is Empty</h1>
          <p className="text-sm text-[#736E66] max-w-md mx-auto">
            You haven't saved any items yet. Tap the heart icon on any product to save pieces you admire for later.
          </p>
        </div>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#353330] transition-colors shadow-sm"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#E7E2D6]">
        <div>
          <nav className="text-xs text-[#736E66] mb-1">
            <Link to="/" className="hover:text-[#1A1918]">Home</Link> / <span>Wishlist</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal">
            Saved Pieces
          </h1>
          <p className="text-xs text-[#736E66] mt-1">
            {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved in your private collection
          </p>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Wishlist
        </button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="group relative flex flex-col bg-white rounded-xl border border-[#E7E2D6] overflow-hidden hover:shadow-lg transition-all"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] bg-[#F7F4EC] overflow-hidden">
              <Link to={`/product/${product.slug}`} className="block w-full h-full">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <button
                type="button"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-600 hover:bg-white shadow transition-colors"
                title="Remove from saved"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#736E66]">
                  {product.category}
                </span>
                <Link
                  to={`/product/${product.slug}`}
                  className="font-serif text-base text-[#1A1918] hover:text-[#C25E38] block line-clamp-1"
                >
                  {product.name}
                </Link>
                <span className="text-sm font-semibold text-[#1A1918] mt-1 block">
                  {formatINR(product.price)}
                </span>
              </div>

              {/* Move to bag button */}
              <button
                type="button"
                onClick={() => moveToCart(product)}
                className="w-full py-2.5 px-3 rounded-lg bg-[#1A1918] text-white hover:bg-[#353330] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

