import React from 'react';
import HeroCards from '../components/Molecules/HeroCards';
import Slider from '../components/Molecules/Slider';
import { FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/bgttt.avif')` }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 px-4 md:px-10 lg:px-20 xl:px-14 h-full">
        <div className="w-full lg:w-1/2">
          <HeroCards />
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <Slider />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce hidden md:block">
        <FaArrowDown size={24} />
      </div>
    </main>
  );
};

export default Hero;