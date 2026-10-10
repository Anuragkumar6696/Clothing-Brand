import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { loadFromStorage, saveToStorage } from '../lib/storage';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

interface WishlistContextValue {
  wishlistIds: string[];
  wishlistProducts: Product[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product) => void;
  clearWishlist: () => void;
}

const STORAGE_KEY = 'aurelia_wishlist_v1';

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    return loadFromStorage<string[]>(STORAGE_KEY, []);
  });

  const { showToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    saveToStorage(STORAGE_KEY, wishlistIds);
  }, [wishlistIds]);

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        showToast('Removed from Wishlist', product.name, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast('Saved to Wishlist', product.name, 'success');
        return [...prev, product.id];
      }
    });
  }, [showToast]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const moveToCart = useCallback((product: Product) => {
    // If the product has variants, use default first option
    const defaultVariants: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        defaultVariants[v.name] = v.options[0];
      });
    }

    addToCart(product, 1, defaultVariants);
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  }, [addToCart]);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
    showToast('Wishlist Cleared', 'All saved items removed', 'info');
  }, [showToast]);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const wishlistCount = wishlistIds.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

