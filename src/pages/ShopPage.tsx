import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { filterAndSortProducts } from '../lib/productUtils';
import { ProductCard } from '../components/products/ProductCard';
import { formatINR } from '../lib/currency';
import {
  SlidersHorizontal,
  X,
  Search,
  RotateCcw,
  Check,
  ChevronDown,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('q') || '';
  const sortParam = (searchParams.get('sort') as any) || 'featured';

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [sortBy, setSortBy] = useState<any>(sortParam);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchQuery(queryParam);
    if (sortParam) setSortBy(sortParam);
  }, [categoryParam, queryParam, sortParam]);

  // Update URL helper
  const updateUrlParams = (newCat: string, newQuery: string, newSort: string) => {
    const params: Record<string, string> = {};
    if (newCat && newCat !== 'all') params.category = newCat;
    if (newQuery) params.q = newQuery;
    if (newSort && newSort !== 'featured') params.sort = newSort;
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    updateUrlParams(slug, searchQuery, sortBy);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateUrlParams(selectedCategory, searchQuery, newSort);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams(selectedCategory, searchQuery, sortBy);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setInStockOnly(false);
    setMinPrice(0);
    setMaxPrice(6000);
    setSearchParams({});
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts({
      categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < 6000 ? maxPrice : undefined,
      inStockOnly,
      searchQuery,
      sortBy,
    });
  }, [selectedCategory, minPrice, maxPrice, inStockOnly, searchQuery, sortBy]);

  // Count active filters
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    inStockOnly ||
    minPrice > 0 ||
    maxPrice < 6000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div>
        <nav className="text-xs text-[#736E66] mb-2 flex items-center gap-1.5">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#1A1918] font-medium">Catalogue</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] font-normal">
              The Complete Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-[#736E66] mt-1">
              Explore {PRODUCTS.length} curated objects crafted for intentional everyday living.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="text-xs text-[#736E66]">
            Showing <strong className="text-[#1A1918]">{filteredProducts.length}</strong> of {PRODUCTS.length} products
          </div>
        </div>
      </div>

      {/* Control Bar: Mobile Filter Button, Search Bar, Desktop Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-[#E7E2D6] shadow-sm">
        {/* Search Field */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#736E66] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by keyword..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-[#F7F4EC] rounded-lg border border-[#E7E2D6] focus:border-[#1A1918] focus:bg-white focus:outline-none transition-all placeholder:text-[#736E66]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                updateUrlParams(selectedCategory, '', sortBy);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#736E66] hover:text-[#1A1918]"
            >
              ✕
            </button>
          )}
        </form>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F7F4EC] text-[#1A1918] text-xs font-semibold border border-[#E7E2D6]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#736E66] hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="appearance-none bg-[#F7F4EC] border border-[#E7E2D6] rounded-lg py-2 pl-3 pr-8 text-xs font-medium text-[#1A1918] focus:outline-none focus:border-[#1A1918] cursor-pointer"
              >
                <option value="featured">Featured &amp; Bestsellers</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#736E66] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[#736E66] font-medium mr-1">Active filters:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1918] text-white">
              <span>Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span>
              <button onClick={() => handleCategoryChange('all')} className="hover:text-rose-300">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1918] text-white">
              <span>Query: "{searchQuery}"</span>
              <button onClick={() => { setSearchQuery(''); updateUrlParams(selectedCategory, '', sortBy); }}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1918] text-white">
              <span>In Stock Only</span>
              <button onClick={() => setInStockOnly(false)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(minPrice > 0 || maxPrice < 6000) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1A1918] text-white">
              <span>Price: {formatINR(minPrice)} – {formatINR(maxPrice)}</span>
              <button onClick={() => { setMinPrice(0); setMaxPrice(6000); }}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#C25E38] hover:underline font-semibold ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Clear all
          </button>
        </div>
      )}

      {/* Main Layout Grid: Desktop Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-[#E7E2D6]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D6]">
            <h3 className="font-serif text-lg font-medium text-[#1A1918]">Filter By</h3>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-[11px] text-[#C25E38] hover:underline font-semibold"
              >
                Reset
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#1A1918]">Category</h4>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#1A1918] text-white'
                    : 'text-[#353330] hover:bg-[#F7F4EC]'
                }`}
              >
                <span>All Products</span>
                <span className="opacity-70 text-[11px]">{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-[#1A1918] text-white'
                      : 'text-[#353330] hover:bg-[#F7F4EC]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-70 text-[11px]">{cat.itemCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3 pt-3 border-t border-[#E7E2D6]">
            <div className="flex justify-between items-center">
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#1A1918]">Price Range</h4>
              <span className="text-[11px] text-[#736E66]">
                {formatINR(minPrice)} - {formatINR(maxPrice)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-[#736E66] block">Min (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="6000"
                  step="200"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full p-2 bg-[#F7F4EC] border border-[#E7E2D6] rounded-md text-xs focus:outline-none focus:border-[#1A1918]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#736E66] block">Max (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="6000"
                  step="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full p-2 bg-[#F7F4EC] border border-[#E7E2D6] rounded-md text-xs focus:outline-none focus:border-[#1A1918]"
                />
              </div>
            </div>
          </div>

          {/* Stock Availability */}
          <div className="pt-3 border-t border-[#E7E2D6]">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#1A1918]">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-[#D4CDBC] text-[#1A1918] focus:ring-0"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-2xl border border-[#E7E2D6] p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F7F4EC] flex items-center justify-center mx-auto text-[#736E66]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#1A1918]">No matching products found</h3>
              <p className="text-xs sm:text-sm text-[#736E66] max-w-sm mx-auto">
                We couldn't find any items matching your selected criteria. Try adjusting or clearing your filters.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#353330] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-Out Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-[#1A1918]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-[#E7E2D6] flex items-center justify-between bg-[#FDFBF7]">
              <h3 className="font-serif text-lg font-medium text-[#1A1918]">Filter Catalogue</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-[#736E66] hover:text-[#1A1918]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#1A1918] mb-2">Category</h4>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-[#1A1918] text-white'
                        : 'text-[#353330] hover:bg-[#F7F4EC]'
                    }`}
                  >
                    <span>All Products</span>
                    <span>{PRODUCTS.length}</span>
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? 'bg-[#1A1918] text-white'
                          : 'text-[#353330] hover:bg-[#F7F4EC]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span>{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-[#E7E2D6] space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#1A1918]">Price (INR)</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-[#736E66]">Min (₹)</span>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full p-2 bg-[#F7F4EC] border border-[#E7E2D6] rounded-md text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#736E66]">Max (₹)</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full p-2 bg-[#F7F4EC] border border-[#E7E2D6] rounded-md text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="pt-4 border-t border-[#E7E2D6]">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#1A1918]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-[#E7E2D6] bg-[#FDFBF7] flex gap-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-2.5 px-3 rounded-lg border border-[#E7E2D6] text-xs font-semibold text-[#1A1918]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-lg bg-[#1A1918] text-white text-xs font-semibold"
              >
                Show Results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

