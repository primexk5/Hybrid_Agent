'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
  // Stable seeded images from picsum.photos (consistent across loads):
  'https://picsum.photos/seed/house1/1600/900',
  'https://picsum.photos/seed/car1/1600/900',
  'https://picsum.photos/seed/house2/1600/900',
  'https://picsum.photos/seed/car2/1600/900',
  'https://picsum.photos/seed/house3/1600/900',
  'https://picsum.photos/seed/car3/1600/900',
];

const FALLBACK_IMAGE = 'https://via.placeholder.com/1600x900?text=Image+not+available';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={src.includes('car') ? `Car ${index + 1}` : `House ${index + 1}`}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            className="w-full flex-shrink-0 object-cover h-64 md:h-96"
          />
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition">
        <FaChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Slider;