import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { STORE_CONFIG } from '../config/store';

type PolicyType = 'shipping' | 'returns' | 'privacy' | 'terms';

export const PolicyPage: React.FC = () => {
  const { type = 'shipping' } = useParams<{ type: string }>();

  const currentType: PolicyType = ['shipping', 'returns', 'privacy', 'terms'].includes(type)
    ? (type as PolicyType)
    : 'shipping';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Policy Navigation Tabs */}
      <div className="flex border-b border-[#E7E2D6] overflow-x-auto gap-6 text-xs uppercase font-semibold tracking-wider pb-3">
        <Link
          to="/policies/shipping"
          className={`pb-1 border-b-2 whitespace-nowrap transition-colors ${
            currentType === 'shipping'
              ? 'border-[#1A1918] text-[#1A1918]'
              : 'border-transparent text-[#736E66] hover:text-[#1A1918]'
          }`}
        >
          Shipping &amp; Delivery
        </Link>
        <Link
          to="/policies/returns"
          className={`pb-1 border-b-2 whitespace-nowrap transition-colors ${
            currentType === 'returns'
              ? 'border-[#1A1918] text-[#1A1918]'
              : 'border-transparent text-[#736E66] hover:text-[#1A1918]'
          }`}
        >
          Returns &amp; Exchange
        </Link>
        <Link
          to="/policies/privacy"
          className={`pb-1 border-b-2 whitespace-nowrap transition-colors ${
            currentType === 'privacy'
              ? 'border-[#1A1918] text-[#1A1918]'
              : 'border-transparent text-[#736E66] hover:text-[#1A1918]'
          }`}
        >
          Privacy Policy
        </Link>
        <Link
          to="/policies/terms"
          className={`pb-1 border-b-2 whitespace-nowrap transition-colors ${
            currentType === 'terms'
              ? 'border-[#1A1918] text-[#1A1918]'
              : 'border-transparent text-[#736E66] hover:text-[#1A1918]'
          }`}
        >
          Terms of Service
        </Link>
      </div>

      {/* Policy Content */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E7E2D6] shadow-sm space-y-6 text-xs sm:text-sm text-[#353330] leading-relaxed">
        {currentType === 'shipping' && (
          <div className="space-y-4">
            <h1 className="font-serif text-3xl text-[#1A1918] font-normal">
              Shipping &amp; Delivery Policy
            </h1>
            <p className="text-[#736E66]">Last updated: October 2026</p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">1. Pan-India Delivery Coverage</h3>
            <p>
              {STORE_CONFIG.brandName} ships across all serviceable postal pincodes in India. Orders are processed from our fulfillment studio in Bengaluru, Karnataka.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">2. Shipping Rates &amp; Free Shipping Threshold</h3>
            <p>
              We provide complimentary standard shipping on all orders of ₹{STORE_CONFIG.shipping.freeShippingThreshold} and above. For orders below this threshold, a flat delivery fee of ₹{STORE_CONFIG.shipping.standardShippingFee} is added to cover secure transit packaging and courier fees.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">3. Dispatch &amp; Delivery Timelines</h3>
            <p>
              Orders are dispatched within 24 to 48 business hours after order confirmation via WhatsApp. Standard delivery timelines are:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#736E66]">
              <li>Metro cities (Bengaluru, Mumbai, Delhi-NCR, Chennai, Hyderabad): 2 to 4 business days.</li>
              <li>Rest of India: 4 to 6 business days.</li>
            </ul>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">4. Eco-Conscious Fragile Packaging</h3>
            <p>
              To protect handcrafted ceramics, glass, and stoneware, every shipment is nestled in 100% recyclable paper honeycomb wrap and organic water-soluble starch peanuts. In the rare case of transit damage, we provide full free replacement.
            </p>
          </div>
        )}

        {currentType === 'returns' && (
          <div className="space-y-4">
            <h1 className="font-serif text-3xl text-[#1A1918] font-normal">
              Returns &amp; Exchange Policy
            </h1>
            <p className="text-[#736E66]">Last updated: October 2026</p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">1. 7-Day Exchange Window</h3>
            <p>
              We want you to adore your purchase. If you wish to exchange an unused item (in its original packaging and undamaged condition), please notify our WhatsApp concierge within 7 days of delivery.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">2. Damaged or Defective Items</h3>
            <p>
              If an item arrives damaged or broken during courier transit, please take a clear photograph or unboxing video within 48 hours and send it to our WhatsApp team. We will dispatch an identical replacement at zero extra cost.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">3. Non-Returnable Items</h3>
            <p>
              Due to hygiene and organic considerations, botanical facial oils, lit candles, bath soaks, and opened grooming items cannot be returned once unsealed.
            </p>
          </div>
        )}

        {currentType === 'privacy' && (
          <div className="space-y-4">
            <h1 className="font-serif text-3xl text-[#1A1918] font-normal">
              Privacy &amp; Data Notice
            </h1>
            <p className="text-[#736E66]">Last updated: October 2026</p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">1. Frontend Prototype Operations</h3>
            <p>
              This website functions as a frontend shopping interface without backend tracking or external database collection. Your shopping cart, saved wishlist, and recently viewed items are stored solely inside your browser's LocalStorage.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">2. WhatsApp Communications</h3>
            <p>
              When you choose to order via WhatsApp, the product details and delivery information you provide are transmitted directly to our studio through WhatsApp's end-to-end encrypted messaging service.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">3. Zero Third-Party Selling</h3>
            <p>
              We do not sell, rent, or trade customer contact details, phone numbers, or email addresses with external advertisers or data brokers.
            </p>
          </div>
        )}

        {currentType === 'terms' && (
          <div className="space-y-4">
            <h1 className="font-serif text-3xl text-[#1A1918] font-normal">
              Terms of Service
            </h1>
            <p className="text-[#736E66]">Last updated: October 2026</p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">1. Handmade Characteristics</h3>
            <p>
              Many products featured on {STORE_CONFIG.brandName} are individually wheel-thrown, hand-woven, or hand-carved. Subtle variations in glaze speckling, wood grain, or textile slubs are inherent hallmarks of artisanal craft and are not defects.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">2. Order Confirmation</h3>
            <p>
              Placing an order enquiry on this frontend website does not constitute a legally binding transaction until our team verifies stock on WhatsApp, confirms payment arrangements, and sends an official dispatch acknowledgement.
            </p>

            <h3 className="font-serif text-lg text-[#1A1918] pt-2">3. Intellectual Property</h3>
            <p>
              All logo marks, branding assets, custom photography layouts, and editorial text are protected properties of {STORE_CONFIG.legalName}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

