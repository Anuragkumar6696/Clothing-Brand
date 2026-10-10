import { STORE_CONFIG } from '../config/store';
import { CartItem, CustomerOrderDetails, Product } from '../types';
import { formatINR } from './currency';

/**
 * Generates an alphanumeric order reference code for local tracking
 * e.g., "AUR-84291"
 */
export function generateOrderReference(): string {
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  return `AUR-${randomPart}`;
}

/**
 * Builds a direct general WhatsApp chat URL with customizable greeting
 */
export function createGeneralWhatsAppUrl(customText?: string): string {
  const greeting = customText || STORE_CONFIG.whatsapp.defaultGreeting;
  return `https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(greeting)}`;
}

/**
 * Builds a WhatsApp click-to-chat URL for an instant single-product order
 */
export function createSingleProductWhatsAppUrl(
  product: Product,
  quantity: number = 1,
  selectedVariants: Record<string, string> = {}
): string {
  const lineTotal = product.price * quantity;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const variantText = Object.entries(selectedVariants).length > 0
    ? Object.entries(selectedVariants).map(([k, v]) => `• ${k}: *${v}*`).join('\n')
    : '• Standard variant';

  const message = [
    `*NEW ORDER ENQUIRY — ${STORE_CONFIG.brandName}*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Hello! I would like to order the following item:`,
    ``,
    `🛍️ *${product.name}*`,
    variantText,
    `• Quantity: *${quantity}*`,
    `• Unit Price: *${formatINR(product.price)}*`,
    `• Line Total: *${formatINR(lineTotal)}*`,
    ``,
    `🔗 Product Link: ${currentUrl}`,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Please confirm product availability, shipping time, and payment details for delivery. Thank you!`,
  ].join('\n');

  return `https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds a WhatsApp click-to-chat URL for an entire cart order with customer details
 */
export function createCartOrderWhatsAppUrl(
  items: CartItem[],
  subtotal: number,
  shippingFee: number,
  total: number,
  customerDetails?: CustomerOrderDetails,
  orderRef?: string
): string {
  const reference = orderRef || generateOrderReference();
  
  const itemListText = items
    .map((item, idx) => {
      const variantStr = Object.entries(item.selectedVariants).length > 0
        ? ` (${Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ')})`
        : '';
      const lineTotal = item.product.price * item.quantity;
      return `${idx + 1}. *${item.product.name}*${variantStr}\n   Qty: ${item.quantity} × ${formatINR(item.product.price)} = *${formatINR(lineTotal)}*`;
    })
    .join('\n\n');

  let customerText = '';
  if (customerDetails && customerDetails.fullName.trim()) {
    customerText = [
      `👤 *CUSTOMER & DELIVERY DETAILS:*`,
      `• Name: *${customerDetails.fullName}*`,
      customerDetails.phone ? `• Phone: *${customerDetails.phone}*` : '',
      customerDetails.email ? `• Email: ${customerDetails.email}` : '',
      `• Address: ${customerDetails.addressLine1}`,
      `• City & State: ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.pincode}`,
      customerDetails.deliveryNotes ? `• Notes: "${customerDetails.deliveryNotes}"` : '',
      ``,
    ].filter(Boolean).join('\n');
  }

  const shippingText = shippingFee === 0 ? 'FREE (Special Offer)' : formatINR(shippingFee);

  const message = [
    `*NEW WEBSITE ORDER — ${STORE_CONFIG.brandName}*`,
    `Order Reference: *#${reference}*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    customerText,
    `🛒 *ORDER SUMMARY (${items.length} ${items.length === 1 ? 'item' : 'items'}):*`,
    itemListText,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `• Subtotal: *${formatINR(subtotal)}*`,
    `• Estimated Shipping: *${shippingText}*`,
    `• *ESTIMATED TOTAL: ${formatINR(total)}*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Please verify availability and advise payment arrangements (UPI / NetBanking / COD verification). Thank you!`,
  ].filter(Boolean).join('\n');

  return `https://wa.me/${STORE_CONFIG.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns a tel: link for instant calling
 */
export function getPhoneCallUrl(): string {
  return `tel:${STORE_CONFIG.phone.callingNumber}`;
}

