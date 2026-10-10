import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { CATEGORIES } from '../../data/categories';
import { formatINR } from '../../lib/currency';
import { loadFromStorage, saveToStorage } from '../../lib/storage';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';

interface QuickSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SEARCH_HISTORY_KEY = 'aurelia_search_history_v1';

export const QuickSearchOverlay: React.FC<QuickSearchOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    return loadFromStorage<string[]>(SEARCH_HISTORY_KEY, [
      'Linen',
      'Ceramic',
      'Candle',
      'Brass',
      'Wallet',
    ]);
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Filter matching products
  const matchingProducts = trimmed
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.keywords.some((k) => k.toLowerCase().includes(trimmed))
        );
      }).slice(0, 6)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trimmed) return;

    // Save to history
    const updated = [query.trim(), ...recentSearches.filter((s) => s.toLowerCase() !== trimmed)].slice(0, 6);
    setRecentSearches(updated);
    saveToStorage(SEARCH_HISTORY_KEY, updated);

    onClose();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectHistory = (term: string) => {
    setQuery(term);
    onClose();
    navigate(`/shop?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A1918]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Header Panel */}
      <div className="relative w-full bg-white border-b border-[#E7E2D6] shadow-2xl z-10 animate-in slide-in-from-top-4 duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#736E66] absolute left-3.5 sm:left-4 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by product, material, category..."
              className="w-full pl-10 sm:pl-13 pr-16 sm:pr-24 py-3 sm:py-4 text-sm sm:text-lg bg-[#F7F4EC] rounded-xl sm:rounded-2xl border border-[#E7E2D6] focus:border-[#1A1918] focus:bg-white focus:outline-none transition-all placeholder:text-[#736E66]"
            />
            <div className="absolute right-4 flex items-center gap-2">
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-[#736E66] hover:text-[#1A1918] text-xs font-semibold"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#736E66] hover:text-[#1A1918] hover:bg-[#EAE4D7] rounded-full transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Categories & Recent Searches when query is empty */}
          {!trimmed && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E7E2D6]/60">
              {/* Popular Categories */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#736E66] mb-3">
                  Explore by Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.slug}`}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-lg bg-[#F7F4EC] border border-[#E7E2D6] text-xs font-medium text-[#353330] hover:border-[#1A1918] hover:bg-[#1A1918] hover:text-white transition-all"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Search Terms */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#736E66] mb-3">
                  Trending &amp; Recent Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleSelectHistory(term)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E2D6] text-xs text-[#1A1918] hover:border-[#C25E38] hover:text-[#C25E38] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instant Search Results */}
          {trimmed && (
            <div className="mt-6 pt-4 border-t border-[#E7E2D6]/60">
              {matchingProducts.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#736E66]">
                      Matching Products ({matchingProducts.length})
                    </p>
                    <button
                      type="button"
                      onClick={() => handleSearchSubmit()}
                      className="text-xs font-semibold text-[#C25E38] hover:underline flex items-center gap-1"
                    >
                      <span>View all results for "{query}"</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        onClick={onClose}
                        className="flex gap-3 p-2.5 rounded-xl border border-[#E7E2D6] bg-[#FDFBF7] hover:border-[#1A1918]/40 hover:bg-white transition-all group"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-[#736E66] font-semibold tracking-wider block">
                              {p.category}
                            </span>
                            <p className="font-serif text-xs font-medium text-[#1A1918] group-hover:text-[#C25E38] line-clamp-1">
                              {p.name}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#1A1918]">
                            {formatINR(p.price)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="font-serif text-lg text-[#1A1918]">
                    No matches found for "{query}"
                  </p>
                  <p className="text-xs text-[#736E66] mt-1 mb-4">
                    Check your spelling or try exploring our primary categories.
                  </p>
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1A1918] text-white text-xs font-semibold hover:bg-[#353330]"
                  >
                    <span>Browse Complete Catalogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

