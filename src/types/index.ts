export interface ProductVariant {
  id: string;
  name: string; // e.g. "Size", "Color", "Volume"
  options: string[]; // e.g. ["250ml", "500ml"] or ["Sand", "Olive", "Charcoal"]
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  categoryId: string;
  price: number; // in INR
  originalPrice?: number; // for discounts
  images: string[];
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  variants?: ProductVariant[];
  inStock: boolean;
  stockCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  rating: number; // illustrative demo rating
  reviewCount: number; // illustrative demo review count
  keywords: string[];
}

export interface CartItem {
  cartItemId: string; // unique key composite of productId + selected variants
  product: Product;
  selectedVariants: Record<string, string>;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CustomerOrderDetails {
  fullName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

