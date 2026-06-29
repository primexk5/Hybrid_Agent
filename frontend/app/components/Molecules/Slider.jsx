'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=700&fit=crop&auto=format&q=80',
    label: 'Modern Luxury Villa',
  },
  {
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=700&fit=crop&auto=format&q=80',
    label: 'Ferrari Sports Car',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=700&fit=crop&auto=format&q=80',
    label: 'Elegant Family Home',
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=700&fit=crop&auto=format&q=80',
    label: 'Premium Coupe',
  },
  {
    src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=700&fit=crop&auto=format&q=80',
    label: 'Villa with Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=700&fit=crop&auto=format&q=80',
    label: 'Luxury Sedan',
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0">
            <img
              src={slide.src}
              alt={slide.label}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="w-full object-cover h-64 md:h-96"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-4 py-3">
              <span className="text-white text-sm font-semibold">{slide.label}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={14} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <FaChevronRight size={14} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 right-4 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
