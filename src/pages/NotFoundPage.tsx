import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CATEGORIES } from '../data/categories';
import { ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-[#F7F4EC] border border-[#E7E2D6] flex items-center justify-center mx-auto text-[#C25E38]">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#736E66] font-semibold">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1918] font-normal">
          Page Not Found
        </h1>
        <p className="text-sm text-[#736E66] max-w-md mx-auto">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-3">
        <Link to="/">
          <Button variant="primary">Return to Homepage</Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline">Browse Catalogue</Button>
        </Link>
      </div>

      {/* Recommended Categories */}
      <div className="pt-12 border-t border-[#E7E2D6] max-w-lg mx-auto text-left space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#736E66]">
          Popular Collections:
        </p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#E7E2D6] text-xs text-[#1A1918] hover:border-[#1A1918] transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

