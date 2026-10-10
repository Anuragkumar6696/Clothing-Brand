import { Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface FilterOptions {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  searchQuery?: string;
  sortBy?: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export function filterAndSortProducts(options: FilterOptions): Product[] {
  let result = [...PRODUCTS];

  // Category filter
  if (options.categoryId && options.categoryId !== 'all') {
    result = result.filter(p => p.categoryId === options.categoryId);
  }

  // Stock filter
  if (options.inStockOnly) {
    result = result.filter(p => p.inStock);
  }

  // Price range
  if (options.minPrice !== undefined && !isNaN(options.minPrice)) {
    result = result.filter(p => p.price >= (options.minPrice || 0));
  }
  if (options.maxPrice !== undefined && !isNaN(options.maxPrice)) {
    result = result.filter(p => p.price <= (options.maxPrice || Infinity));
  }

  // Search query (matches name, description, category, and keywords)
  if (options.searchQuery && options.searchQuery.trim().length > 0) {
    const query = options.searchQuery.toLowerCase().trim();
    result = result.filter(p => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchCategory = p.category.toLowerCase().includes(query);
      const matchShort = p.shortDescription.toLowerCase().includes(query);
      const matchKeywords = p.keywords.some(k => k.toLowerCase().includes(query));
      return matchName || matchCategory || matchShort || matchKeywords;
    });
  }

  // Sorting
  switch (options.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      break;
    case 'featured':
    default:
      // Featured / Bestseller first
      result.sort((a, b) => {
        const scoreA = (a.isFeatured ? 2 : 0) + (a.isBestseller ? 1 : 0);
        const scoreB = (b.isFeatured ? 2 : 0) + (b.isBestseller ? 1 : 0);
        return scoreB - scoreA;
      });
      break;
  }

  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getRelatedProducts(currentProduct: Product, limit: number = 4): Product[] {
  return PRODUCTS
    .filter(p => p.id !== currentProduct.id && p.categoryId === currentProduct.categoryId)
    .slice(0, limit);
}

export function getBestsellers(limit: number = 8): Product[] {
  return PRODUCTS.filter(p => p.isBestseller).slice(0, limit);
}

export function getNewArrivals(limit: number = 8): Product[] {
  return PRODUCTS.filter(p => p.isNewArrival).slice(0, limit);
}

