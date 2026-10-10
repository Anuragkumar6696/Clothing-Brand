import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  emptyMessage = 'No products found matching your criteria.',
  columns = 4,
}) => {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-[#E7E2D6] p-8">
        <p className="font-serif text-xl text-[#1A1918] mb-2">{emptyMessage}</p>
        <p className="text-sm text-[#736E66]">Try loosening your filters or searching for another term.</p>
      </div>
    );
  }

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-4 sm:gap-6`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
};

