import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { STORE_CONFIG } from '../config/store';
import { ProductCard } from '../components/products/ProductCard';
import { Button } from '../components/ui/Button';
import {
  ArrowRight,
  MessageCircle,
  Truck,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Star,
  Quote,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Filter products for homepage sections
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative overflow-hidden bg-[#F7F4EC] border-b border-[#E7E2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Copy Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E7E2D6] text-xs font-semibold uppercase tracking-wider text-[#C25E38]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Artisanal Collection</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1A1918] font-normal tracking-tight leading-[1.12]">
                Everyday rituals, <br />
                <span className="italic font-serif">crafted with soul.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#736E66] max-w-lg leading-relaxed">
                Elevate your daily living with tactile earthen ceramics, washed European linens, pure botanical aromas, and heirloom woodcraft.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/shop">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    <span>Shop All Goods</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] font-semibold text-sm transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-[#E7E2D6] flex flex-wrap gap-6 text-xs text-[#736E66]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C25E38]" />
                  <span>Complimentary delivery over ₹1,999</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C25E38]" />
                  <span>Verified Master Artisans</span>
                </div>
              </div>
            </div>

            {/* Visual Column / Editorial Imagery */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E7E2D6] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85"
                  alt="Aurelia & Co. Editorial Still Life"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest font-semibold text-white/80 block mb-1">
                    Autumn Editions
                  </span>
                  <p className="font-serif text-lg sm:text-xl font-medium">
                    Hand-thrown stoneware &amp; pure flax textiles
                  </p>
                </div>
              </div>

              {/* Floating Accent Card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-[#E7E2D6] items-center gap-3.5 max-w-xs animate-in fade-in">
                <img
                  src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=200&q=80"
                  alt="Soy Candle"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="text-xs font-semibold text-[#1A1918]">Pure Sandalwood Candle</p>
                  <p className="text-[11px] text-[#736E66]">4.9 ★ • Hand-poured batch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold block mb-1">
              Curated Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1918]">
              Explore by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1918] hover:text-[#C25E38] transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group relative flex flex-col rounded-xl overflow-hidden bg-white border border-[#E7E2D6] hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/5] bg-[#F7F4EC] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-medium leading-tight">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-white/80 mt-0.5 block">
                    {cat.itemCount} items
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BESTSELLERS PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold block mb-1">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1918]">
              Most Cherished Pieces
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1918] hover:text-[#C25E38] transition-colors"
          >
            <span>Browse Full Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONAL COLLECTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#1A1918] text-[#FDFBF7] p-8 sm:p-14 lg:p-16 border border-[#353330]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#C25E38] font-bold">
                Direct WhatsApp Ordering Advantage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                Personalized shopping, right from your phone.
              </h2>
              <p className="text-sm sm:text-base text-[#D4CDBC] leading-relaxed max-w-lg">
                Have questions regarding custom ceramic dimensions, gift packaging, or immediate dispatch? Chat directly with our studio concierge on WhatsApp before completing your order.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] font-semibold text-sm transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Start WhatsApp Chat</span>
                </a>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold text-sm transition-all"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-end">
              <div className="relative w-80 aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
                  alt="Ceramic Dining"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold block mb-1">
              Fresh Off The Potter’s Wheel &amp; Loom
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1918]">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1A1918] hover:text-[#C25E38] transition-colors"
          >
            <span>See All New Goods</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. STORE VALUE PILLARS / BENEFITS */}
      <section className="bg-[#F7F4EC] border-y border-[#E7E2D6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E2D6] flex items-center justify-center text-[#C25E38]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">WhatsApp Checkout</h3>
              <p className="text-xs text-[#736E66] leading-relaxed">
                Order instantly via prefilled WhatsApp messages. No complicated passwords or account setups needed.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E2D6] flex items-center justify-center text-[#C25E38]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">Careful Transit</h3>
              <p className="text-xs text-[#736E66] leading-relaxed">
                Complimentary pan-India delivery on orders over ₹1,999 with 100% plastic-free cushioned packaging.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E2D6] flex items-center justify-center text-[#C25E38]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">Artisan Craftsmanship</h3>
              <p className="text-xs text-[#736E66] leading-relaxed">
                Individually handcrafted by hereditary potters, weavers, and leatherworkers across India.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E2D6] flex items-center justify-center text-[#C25E38]">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">Safe Arrival Guarantee</h3>
              <p className="text-xs text-[#736E66] leading-relaxed">
                Every fragile stoneware or glassware item is insured for safe arrival or immediate free replacement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BRAND STORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7E2D6] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan ceramic craft"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden sm:block w-48 aspect-square rounded-xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
                alt="Woven Linen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-5 lg:pl-6">
            <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1918] leading-tight">
              Honoring slow materials &amp; human hands.
            </h2>
            <p className="text-sm text-[#736E66] leading-relaxed">
              In a world hurried by disposable mass production, Aurelia &amp; Co. is a sanctuary for objects that carry presence. We work alongside small-batch studios and master makers to produce home wares, linens, and everyday carry that deepen in character as they age.
            </p>
            <p className="text-sm text-[#736E66] leading-relaxed">
              From our studio in Bangalore to homes across India, our purpose is simple: to make everyday spaces feel grounded, intentional, and warm.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1A1918] hover:text-[#C25E38] border-b border-[#1A1918] hover:border-[#C25E38] pb-1 transition-all"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ILLUSTRATIVE CUSTOMER TESTIMONIALS */}
      <section className="bg-[#F7F4EC] py-20 border-y border-[#E7E2D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold">
              Client Experiences
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1A1918] mt-1">
              Words From Our Community
            </h2>
            <p className="text-xs text-[#736E66] mt-2">
              Illustrative customer reviews demonstrating our ordering experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#353330] leading-relaxed italic">
                  "Ordering through WhatsApp was extraordinarily easy. The team sent photos of the fluted terracotta vase before dispatching, and the packaging was completely plastic-free."
                </p>
              </div>
              <div className="pt-4 border-t border-[#E7E2D6] mt-4">
                <p className="text-xs font-semibold text-[#1A1918]">Ananya R.</p>
                <p className="text-[11px] text-[#736E66]">Bengaluru • Verified Buyer</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#353330] leading-relaxed italic">
                  "The French linen waffle throw has the most comforting weight. It arrived in three days to Mumbai, exactly as shown. Exceptional quality."
                </p>
              </div>
              <div className="pt-4 border-t border-[#E7E2D6] mt-4">
                <p className="text-xs font-semibold text-[#1A1918]">Devendra K.</p>
                <p className="text-[11px] text-[#736E66]">Mumbai • Verified Buyer</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#353330] leading-relaxed italic">
                  "The Sandalwood botanical candle smells divine without any synthetic sharpness. Will definitely be returning for festive gifts."
                </p>
              </div>
              <div className="pt-4 border-t border-[#E7E2D6] mt-4">
                <p className="text-xs font-semibold text-[#1A1918]">Meera S.</p>
                <p className="text-[11px] text-[#736E66]">New Delhi • Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

