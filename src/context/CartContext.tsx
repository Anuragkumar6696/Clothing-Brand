import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { loadFromStorage, saveToStorage } from '../lib/storage';
import { STORE_CONFIG } from '../config/store';
import { useToast } from './ToastContext';

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  total: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  addToCart: (product: Product, quantity?: number, selectedVariants?: Record<string, string>) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = 'aurelia_cart_v1';

const CartContext = createContext<CartContextValue | undefined>(undefined);

function createCartItemId(productId: string, variants: Record<string, string>): string {
  const sortedKeys = Object.keys(variants).sort();
  const variantStr = sortedKeys.map((k) => `${k}:${variants[k]}`).join('|');
  return variantStr ? `${productId}__${variantStr}` : productId;
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    return loadFromStorage<CartItem[]>(STORAGE_KEY, []);
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { showToast } = useToast();

  // Persist items to local storage on change
  useEffect(() => {
    saveToStorage(STORAGE_KEY, items);
  }, [items]);

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);
  const toggleCartDrawer = useCallback(() => setIsCartDrawerOpen(prev => !prev), []);

  const addToCart = useCallback((
    product: Product,
    quantity: number = 1,
    selectedVariants: Record<string, string> = {}
  ) => {
    if (quantity < 1) return;

    const cartItemId = createCartItemId(product.id, selectedVariants);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const nextQty = existing.quantity + quantity;
        updated[existingIndex] = { ...existing, quantity: nextQty };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            cartItemId,
            product,
            selectedVariants,
            quantity,
          },
        ];
      }
    });

    const variantSummary = Object.values(selectedVariants).join(', ');
    showToast(
      'Added to Bag',
      `${product.name}${variantSummary ? ` (${variantSummary})` : ''}`,
      'success'
    );

    // Open slide-out cart drawer for instant feedback
    setIsCartDrawerOpen(true);
  }, [showToast]);

  const updateQuantity = useCallback((cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
      showToast('Item removed', 'Your bag has been updated', 'info');
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [showToast]);

  const removeFromCart = useCallback((cartItemId: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.cartItemId === cartItemId);
      if (item) {
        showToast('Removed from Bag', item.product.name, 'info');
      }
      return prev.filter((i) => i.cartItemId !== cartItemId);
    });
  }, [showToast]);

  const clearCart = useCallback(() => {
    setItems([]);
    showToast('Bag Cleared', 'All items have been removed', 'info');
  }, [showToast]);

  // Derived financial totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  const freeShippingThreshold = STORE_CONFIG.shipping.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : STORE_CONFIG.shipping.standardShippingFee;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingFee,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        total,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        toggleCartDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

