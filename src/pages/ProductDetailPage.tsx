import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getRelatedProducts } from '../lib/productUtils';
import { formatINR, calculateDiscount } from '../lib/currency';
import { createSingleProductWhatsAppUrl } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { RatingStars } from '../components/products/RatingStars';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/ui/Button';
import { STORE_CONFIG } from '../config/store';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = slug ? getProductBySlug(slug) : undefined;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recordView, recentlyViewedProducts } = useRecentlyViewed();

  // Reset variant selections and active image whenever product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
      const initialVariants: Record<string, string> = {};
      if (product.variants) {
        product.variants.forEach((v) => {
          initialVariants[v.name] = v.options[0];
        });
      }
      setSelectedVariants(initialVariants);
      recordView(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="font-serif text-3xl text-[#1A1918]">Product Not Found</h1>
        <p className="text-sm text-[#736E66]">
          The product you are looking for may have been retired or moved.
        </p>
        <Link to="/shop">
          <Button variant="primary">Return to Catalogue</Button>
        </Link>
      </div>
    );
  }

  const discount = calculateDiscount(product.price, product.originalPrice);
  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product, 4);
  const recentExcludingCurrent = recentlyViewedProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const whatsAppUrl = createSingleProductWhatsAppUrl(product, quantity, selectedVariants);

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 pb-24 lg:pb-16">
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-[#736E66] flex items-center gap-2 flex-wrap">
        <Link to="/" className="hover:text-[#1A1918]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-[#1A1918]">Catalogue</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/shop?category=${product.categoryId}`} className="hover:text-[#1A1918]">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#1A1918] font-medium line-clamp-1">{product.name}</span>
      </nav>

      {/* 2. Product Presentation Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image */}
          <div className="aspect-[4/5] sm:aspect-square bg-[#F7F4EC] rounded-2xl overflow-hidden border border-[#E7E2D6] relative shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80';
              }}
            />

            {/* Badges on Gallery */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
              {product.isBestseller && (
                <span className="bg-[#1A1918] text-[#FDFBF7] text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded shadow">
                  Bestseller
                </span>
              )}
              {discount > 0 && (
                <span className="bg-rose-700 text-white text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded shadow">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/80 text-[#736E66] hover:text-[#1A1918] hover:bg-white'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#1A1918] ring-2 ring-[#1A1918]/20'
                      : 'border-[#E7E2D6] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Buying Stage & Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#736E66]">
                {product.category}
              </span>
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-[#736E66] italic mt-1">{product.tagline}</p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-semibold text-[#1A1918]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-[#736E66] line-through">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded border border-rose-200">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-[#353330] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Variant Selection Options */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4 pt-3 border-t border-[#E7E2D6]">
              {product.variants.map((v) => (
                <div key={v.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
                      {v.name}: <span className="font-normal text-[#736E66]">{selectedVariants[v.name]}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {v.options.map((option) => {
                      const isSelected = selectedVariants[v.name] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleVariantSelect(v.name, option)}
                          className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-[#1A1918] text-white border-[#1A1918] shadow-sm'
                              : 'bg-white text-[#353330] border-[#E7E2D6] hover:border-[#1A1918]'
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

          {/* Quantity & Stock Status */}
          <div className="pt-3 border-t border-[#E7E2D6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
                Quantity:
              </span>
              <div className="inline-flex items-center border border-[#E7E2D6] rounded-lg bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm text-[#353330] hover:text-[#1A1918]"
                >
                  −
                </button>
                <span className="px-3 py-1.5 text-sm font-semibold text-[#1A1918]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm text-[#353330] hover:text-[#1A1918]"
                >
                  +
                </button>
              </div>
            </div>

            <span className="text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
              In Stock ({product.stockCount} left)
            </span>
          </div>

          {/* Primary CTA Buttons */}
          <div className="space-y-3 pt-3">
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleAddToCart}
              icon={<ShoppingBag className="w-5 h-5" />}
            >
              Add to Shopping Bag
            </Button>

            {/* Direct WhatsApp Ordering */}
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] font-semibold text-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
              <span>Instant Order via WhatsApp</span>
            </a>

            <p className="text-[11px] text-[#736E66] text-center leading-snug">
              Pre-fills your product selection and sends directly to our studio WhatsApp.
            </p>
          </div>

          {/* Delivery & Assurance Highlights */}
          <div className="p-4 rounded-xl bg-[#F7F4EC] border border-[#E7E2D6] space-y-2.5 text-xs text-[#353330]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#C25E38] shrink-0" />
              <span>
                Complimentary delivery on orders over ₹1,999 (Typically 3-5 days)
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#C25E38] shrink-0" />
              <span>Breakage-free insured transit on all ceramics &amp; glass</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#C25E38] shrink-0" />
              <span>Easy 7-day studio exchange for unused items</span>
            </div>
          </div>

          {/* Accordion Sections: Details, Specs, Care, FAQs */}
          <div className="border-t border-[#E7E2D6] divide-y divide-[#E7E2D6] pt-2">
            {/* 1. Features & Narrative */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('desc')}
                className="w-full py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1A1918]"
              >
                <span>About this piece</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'desc' && (
                <div className="pb-4 text-xs text-[#353330] space-y-3 leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="space-y-1.5 pt-1">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C25E38] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Specifications Table */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('specs')}
                className="w-full py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1A1918]"
              >
                <span>Specifications &amp; Materials</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'specs' && (
                <div className="pb-4 text-xs space-y-2">
                  <div className="bg-white rounded-lg border border-[#E7E2D6] overflow-hidden divide-y divide-[#E7E2D6]">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-2.5 gap-0.5 sm:gap-2">
                        <span className="font-semibold text-[#1A1918]">{key}</span>
                        <span className="sm:col-span-2 text-[#736E66]">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Shipping & Returns */}
            <div>
              <button
                type="button"
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-3.5 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-[#1A1918]"
              >
                <span>Shipping, Dispatch &amp; Packaging</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pb-4 text-xs text-[#736E66] space-y-2 leading-relaxed">
                  <p>
                    All orders are hand-inspected and packed in Bengaluru using 100% recyclable honeycomb paper and biodegradable starch peanuts.
                  </p>
                  <p>
                    Standard dispatch is completed within 24 to 48 business hours. Tracking details are shared directly over WhatsApp once handed over to our courier partner.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-[#E7E2D6] space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold">
                More from {product.category}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1918] font-normal mt-1">
                Complementary Pieces
              </h2>
            </div>
            <Link
              to={`/shop?category=${product.categoryId}`}
              className="text-xs font-semibold text-[#1A1918] hover:text-[#C25E38] flex items-center gap-1"
            >
              <span>View Category</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Recently Viewed Products */}
      {recentExcludingCurrent.length > 0 && (
        <section className="pt-10 border-t border-[#E7E2D6] space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#736E66] font-semibold">
              Your Browsing History
            </span>
            <h2 className="font-serif text-2xl text-[#1A1918] font-normal mt-1">
              Recently Viewed
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recentExcludingCurrent.map((recent) => (
              <ProductCard key={recent.id} product={recent} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Add To Cart / WhatsApp Bottom Bar */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#E7E2D6] px-4 pt-3 z-30 flex items-center gap-2.5 shadow-2xl safe-bottom"
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#1A1918] truncate">{product.name}</p>
          <p className="text-xs text-[#C25E38] font-bold">{formatINR(product.price)}</p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="px-4 py-2.5 rounded-lg bg-[#1A1918] text-white text-xs font-semibold shrink-0"
        >
          Add to Bag
        </button>
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-[#25D366] text-white shrink-0"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
        </a>
      </div>
    </div>
  );
};

