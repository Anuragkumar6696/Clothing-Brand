import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'bestseller' | 'new' | 'sale' | 'neutral' | 'stock';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    bestseller: 'bg-[#1A1918] text-[#FDFBF7] font-semibold tracking-wider',
    new: 'bg-[#C25E38] text-white font-semibold tracking-wider',
    sale: 'bg-rose-700 text-white font-semibold tracking-wider',
    neutral: 'bg-[#F7F4EC] text-[#353330] border border-[#E7E2D6]',
    stock: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

