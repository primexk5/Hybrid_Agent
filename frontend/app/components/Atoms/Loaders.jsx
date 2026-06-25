'use client';

import React from 'react';

// Circular spinner. `size` in px, inherits text color via currentColor.
export const Spinner = ({ size = 20, className = '' }) => (
  <svg
    className={`animate-spin ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Loading"
    role="status"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
    <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Three bouncing dots — for buttons / inline "working" states.
export const Dots = ({ className = '' }) => (
  <span className={`inline-flex items-center gap-1 ${className}`}>
    {[0, 150, 300].map((delay) => (
      <span
        key={delay}
        className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </span>
);

// Skeleton block with a shimmer sweep.
export const Skeleton = ({ className = '' }) => (
  <div className={`shimmer bg-gray-200 dark:bg-white/10 rounded-lg ${className}`} />
);

// Branded full-page loader with a pulsing ring around the logo mark.
export const PageLoader = ({ label = 'Loading' }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5">
    <div className="relative w-16 h-16 flex items-center justify-center">
      <span className="absolute inset-0 rounded-full border-2 border-teal-500/60 animate-pulse-ring" />
      <span className="absolute inset-0 rounded-full border-2 border-teal-500/40 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
      <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-extrabold text-lg shadow-lg">
        H
      </div>
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
      {label}
      <Dots />
    </p>
  </div>
);

export default Spinner;
