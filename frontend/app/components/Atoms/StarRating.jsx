'use client';

import React, { useState } from 'react';
import { FiStar } from 'react-icons/fi';

// Display or interactive star rating. Pass onChange to make it selectable.
export const StarRating = ({ value = 0, size = 16, onChange, className = '' }) => {
  const [hover, setHover] = useState(0);
  const interactive = typeof onChange === 'function';
  const shown = hover || value;

  return (
    <div className={`flex items-center gap-0.5 ${className}`} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => interactive && setHover(n)}
          className={interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <FiStar size={size} className={n <= Math.round(shown) ? 'text-teal-500 fill-current' : 'text-gray-300 dark:text-gray-600'} />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
