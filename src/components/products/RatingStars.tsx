import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
  showCount?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
}) => {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="inline-flex items-center gap-1.5 select-none" title={`Illustrative rating: ${rating} out of 5`}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-[#D4CDBC]'
            }`}
          />
        ))}
      </div>

      {showCount && (
        <span className={`${textSize} text-[#736E66] font-medium`}>
          {rating.toFixed(1)} {reviewCount ? `(${reviewCount})` : ''}
        </span>
      )}
    </div>
  );
};

