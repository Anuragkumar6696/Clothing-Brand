import React from 'react';
import { Link } from 'react-router-dom';
import { STORE_CONFIG } from '../config/store';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Leaf } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Hero */}
      <section className="bg-[#F7F4EC] border-b border-[#E7E2D6] py-16 sm:py-24 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold">
            Our Heritage &amp; Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1918] font-normal leading-tight">
            Crafted for the quiet, <br />meaningful moments.
          </h1>
          <p className="text-sm sm:text-base text-[#736E66] leading-relaxed max-w-xl mx-auto">
            {STORE_CONFIG.brandName} was established in Bengaluru to cultivate home goods and everyday essentials that champion authentic material integrity.
          </p>
        </div>
      </section>

      {/* Narrative Section 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#736E66] font-semibold">
              The Journey
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1A1918]">
              Born out of reverence for the handmade.
            </h2>
            <p className="text-sm text-[#353330] leading-relaxed">
              We began as an independent studio collaborating directly with multi-generational ceramicists in Khurja, handloom weavers in Wardha, and brass smiths in Moradabad. Rather than chasing seasonal fashion trends, our design philosophy is anchored in timeless silhouettes, organic textures, and materials that mature gracefully.
            </p>
            <p className="text-sm text-[#353330] leading-relaxed">
              Every curve in our stoneware, every slub in our French linen, and every edge of our vegetable-tanned leather reflects intentional human touch.
            </p>
          </div>

          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7E2D6] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80"
              alt="Pottery Studio Craft"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-[#F7F4EC] border-y border-[#E7E2D6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-serif text-3xl text-[#1A1918]">The Guiding Principles</h2>
            <p className="text-xs text-[#736E66] mt-2">
              Every product in our collection adheres to four non-negotiable standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F4EC] flex items-center justify-center text-[#C25E38]">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1A1918]">Pure Materials</h3>
              <p className="text-xs text-[#736E66] leading-relaxed">
                European flax, lead-free food glazes, non-GMO soy wax, and virgin brass. We never compromise on honest materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F4EC] flex items-center justify-center text-[#C25E38]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1A1918]">Direct Artisan Honor</h3>
              <p className="text-xs text-[#736E66] leading-relaxed">
                We work directly with artisanal clusters without predatory middlemen, ensuring fair compensation and dignified working conditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E7E2D6] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F7F4EC] flex items-center justify-center text-[#C25E38]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg text-[#1A1918]">Human Concierge</h3>
              <p className="text-xs text-[#736E66] leading-relaxed">
                Shopping with us feels like visiting an intimate neighborhood boutique. We talk to you personally on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-5">
        <h2 className="font-serif text-3xl text-[#1A1918]">Explore Our Work</h2>
        <p className="text-sm text-[#736E66] max-w-md mx-auto">
          We invite you to discover our curated collection and bring enduring warmth to your sanctuary.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#353330] transition-colors"
        >
          <span>Browse Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

