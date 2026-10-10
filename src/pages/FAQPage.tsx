import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/store';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Ordering via WhatsApp',
    question: 'Why do you take orders via WhatsApp instead of regular card gateways?',
    answer: 'As an artisanal small-batch business, many of our pieces are made in limited studio editions. Direct WhatsApp ordering lets us confirm current batch availability, advise on piece care or dimensions, offer custom gift wrapping, and give you personal attention without intermediary payment gateway delays or transaction surcharges.',
  },
  {
    category: 'Ordering via WhatsApp',
    question: 'How do I place an order?',
    answer: 'Simply browse our website, add items to your bag (or select a single product), and click "Confirm via WhatsApp" or "Order on WhatsApp". A pre-written summary of your selected items, variants, and delivery details will open in WhatsApp. You just hit send, and our concierge will take care of the rest!',
  },
  {
    category: 'Ordering via WhatsApp',
    question: 'Can I call instead of texting on WhatsApp?',
    answer: `Yes, absolutely! You can reach our studio line directly at ${STORE_CONFIG.phone.displayNumber} between 10:00 AM and 7:00 PM IST, Monday through Saturday.`,
  },
  {
    category: 'Payments & Pricing',
    question: 'What payment modes are accepted?',
    answer: 'Once your order is confirmed with our concierge, you can pay easily via any UPI app (Google Pay, PhonePe, Paytm, BHIM), direct IMPS/NEFT bank transfer, or QR code. For select metro cities, partial Cash on Delivery (COD) verification is also available.',
  },
  {
    category: 'Payments & Pricing',
    question: 'Are prices inclusive of taxes?',
    answer: 'Yes, all prices displayed on Aurelia & Co. are inclusive of all applicable GST taxes. There are no hidden charges at checkout.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How long does delivery take?',
    answer: 'Orders are packed with care and dispatched within 24–48 hours from Bengaluru. Metro deliveries typically arrive within 2 to 4 business days, while non-metro locations take 4 to 6 business days.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'What are the shipping charges?',
    answer: `We offer complimentary pan-India shipping on all orders totaling ₹${STORE_CONFIG.shipping.freeShippingThreshold} and above. For orders below this threshold, a flat nominal shipping fee of ₹${STORE_CONFIG.shipping.standardShippingFee} applies.`,
  },
  {
    category: 'Shipping & Delivery',
    question: 'What happens if a ceramic or glassware piece arrives broken?',
    answer: 'We pack every fragile item using reinforced honeycomb kraft cushioning and biodegradable filler. In the rare event of transit damage, simply send us an unboxing photo on WhatsApp within 48 hours of delivery, and we will dispatch a free replacement immediately with zero hassle.',
  },
  {
    category: 'Care & Materials',
    question: 'Are the ceramics microwave and dishwasher safe?',
    answer: 'Yes, our high-fired stoneware pieces (mugs, pasta bowls, pour-over sets) are lead-free, food-grade, and safe for standard microwave and gentle dishwasher cycles. However, hand washing with mild detergent is always recommended to prolong reactive glaze luster.',
  },
  {
    category: 'Care & Materials',
    question: 'How do I care for pure French linen products?',
    answer: 'Our pure European linen has been pre-washed for vintage softness. We recommend a gentle cold machine wash using mild liquid detergent. Line dry in the shade to maintain natural texture; ironing is unnecessary as natural linen wrinkles are part of its relaxed aesthetic.',
  },
];

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Ordering via WhatsApp', 'Payments & Pricing', 'Shipping & Delivery', 'Care & Materials'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#C25E38] font-semibold">
          Help &amp; Answers
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#736E66] max-w-lg mx-auto">
          Everything you need to know about our handcrafted goods, WhatsApp ordering flow, payment arrangements, and shipping guarantees.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeCategory === cat
                ? 'bg-[#1A1918] text-white border-[#1A1918]'
                : 'bg-white text-[#353330] border-[#E7E2D6] hover:border-[#1A1918]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="bg-white rounded-2xl border border-[#E7E2D6] divide-y divide-[#E7E2D6] overflow-hidden shadow-sm">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <span className="font-serif text-base sm:text-lg text-[#1A1918]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#736E66] shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="pt-3 text-xs sm:text-sm text-[#736E66] leading-relaxed animate-in fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help CTA */}
      <div className="p-6 rounded-2xl bg-[#F7F4EC] border border-[#E7E2D6] text-center space-y-3">
        <h3 className="font-serif text-xl text-[#1A1918]">Still have questions?</h3>
        <p className="text-xs text-[#736E66] max-w-md mx-auto">
          Our studio curators are ready to help with product measurements, gift selections, or delivery inquiries.
        </p>
        <div className="pt-2">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsapp.defaultGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-all shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Ask Concierge on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

