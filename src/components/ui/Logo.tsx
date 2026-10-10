import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  inverted = false,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-xl tracking-[0.25em]',
    lg: 'text-2xl tracking-[0.3em]',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-90 select-none group ${className}`}
      aria-label="Aurelia & Co. Homepage"
    >
      {/* Handcrafted Brand Mark */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Subtle Outer Frame */}
          <rect
            x="1"
            y="1"
            width="42"
            height="42"
            rx="9"
            className={inverted ? "fill-white/10 stroke-white/20" : "fill-[#1A1918] stroke-[#1A1918]"}
            strokeWidth="1.5"
          />
          {/* Subtle Inner Ring */}
          <circle
            cx="22"
            cy="22"
            r="15"
            stroke={inverted ? "#F7F4EC" : "#D4CDBC"}
            strokeWidth="1"
            strokeDasharray="2 2"
            strokeOpacity="0.6"
          />
          {/* Architectural Serif Letter 'A' Form */}
          <path
            d="M22 9L31 32H27L24.8 26.2H19.2L17 32H13L22 9Z"
            fill={inverted ? "#FFFFFF" : "#FDFBF7"}
          />
          {/* Terracotta Golden Sun / Heart Knot */}
          <circle cx="22" cy="19.5" r="2.8" fill="#C25E38" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-serif uppercase font-medium leading-none ${titleSizes[size]} ${
            inverted ? 'text-white' : 'text-[#1A1918]'
          }`}
        >
          Aurelia &amp; Co.
        </span>
        {showSubtitle && (
          <span
            className={`text-[9px] tracking-[0.35em] uppercase font-medium mt-1 ${
              inverted ? 'text-white/60' : 'text-[#736E66]'
            }`}
          >
            Living &amp; Goods
          </span>
        )}
      </div>
    </Link>
  );
};

