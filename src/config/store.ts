/**
 * =========================================================================
 * STORE CONFIGURATION & OWNER SETTINGS
 * =========================================================================
 * Modify this file to update store identity, WhatsApp order routing,
 * phone numbers, shipping rules, and contact information.
 */

export const STORE_CONFIG = {
  // Brand Identity
  brandName: "AURELIA & CO.",
  legalName: "Aurelia Living Goods Private Limited",
  tagline: "Thoughtfully Curated Goods for Modern Living",
  announcement: "Handcrafted Luxury • Complimentary pan-India delivery on orders over ₹1,999 • Direct WhatsApp concierge",

  // Business Contacts for WhatsApp & Direct Phone Calls
  // In WhatsApp URLs, use international format without '+' or spaces (e.g., '919876543210')
  whatsapp: {
    phoneNumber: "917481820136",
    displayNumber: "+91 74818 20136",
    defaultGreeting: "Hello Aurelia & Co.! I'd like to place an order from your website.",
  },

  phone: {
    callingNumber: "+917481820136",
    displayNumber: "+91 74818 20136",
    callHours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
  },

  email: "care@aureliaco.in",
  
  location: {
    studio: "Studio 14, Lavelle Road, Shanthala Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
    country: "India",
  },

  // E-Commerce & Shipping Parameters
  currency: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
  },

  shipping: {
    freeShippingThreshold: 1999, // in INR
    standardShippingFee: 149,   // in INR
    estimatedDeliveryDays: "3 to 5 business days",
  },

  // Social Links
  socials: {
    instagram: "https://instagram.com/aureliaco.living",
    pinterest: "https://pinterest.com/aureliacoliving",
    facebook: "https://facebook.com/aureliacoliving",
  },
} as const;

