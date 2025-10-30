'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Dropdown from '../Atoms/Dropdown';
// import ThemeToggle from '../ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <>
      <header className='fixed top-0 left-0 w-full z-50 flex p-4 justify-between items-center bg-black text-gray-800 dark:text-gray-100 px-4 md:px-10 lg:px-20 xl:px-60 border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm'>
        <Link href="/">
          <span className='text-2xl font-extrabold text-white cursor-pointer'> <img src="/" className='w-40 text-gray-200' alt="" /><b className='text-teal-800'>HYBRID</b>AGENT</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-8 font-bold'>
          <Link className='hover:text-teal-400 transition' href="/">Home</Link>
          <Link className='hover:text-teal-400 transition' href="/LearnMore">About</Link>
          <Link className='hover:text-teal-400 transition' href="/Contact">Contact us</Link>
          <Link className='hover:text-teal-400 transition' href="/Listings">Listings</Link>
          <Link className='hover:text-teal-400 transition' href="/Reviews">Reviews</Link>
          <Link className='hover:text-teal-400 transition' href="/Leaderboard">Leaderboard</Link>
        </nav>

        <div className="flex items-center gap-4">
            <div className="hidden md:block">
                <Dropdown />
            </div>
            {/* <ThemeToggle /> */}
            {/* Mobile Navigation Toggle */}
            <div className='md:hidden'>
                <button 
                    onClick={handleNavToggle} 
                    className="relative w-10 h-10 text-white focus:outline-none" 
                    aria-label="Toggle navigation"
                >
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-5 transform transition-all duration-300 ${navOpen ? 'rotate-180' : ''}`}>
                        <span className={`absolute top-0 left-0 w-full h-[2px] bg-white transform transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`absolute top-1/2 left-0 w-full h-[2px] bg-white transform -translate-y-1/2 transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-white transform transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </div>
                </button>
            </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-md z-40 transform 
          ${navOpen 
            ? 'translate-x-0 opacity-100' 
            : '-translate-x-full opacity-0'
          } transition-all duration-300 ease-in-out pt-24`}
        onClick={handleNavToggle}
      >
        <nav 
          className='flex flex-col items-center justify-center h-full -mt-24 text-white font-bold gap-12'
          onClick={(e) => e.stopPropagation()}
        >
          <Link 
            className='relative w-48 text-center text-2xl hover:text-teal-400 transition-all duration-200 
              after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
              after:bg-teal-400 after:transition-all hover:after:w-full' 
            href="/" 
            onClick={closeNav}
          >
            Home
          </Link>
          <Link 
            className='relative w-48 text-center text-2xl hover:text-teal-400 transition-all duration-200 
              after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
              after:bg-teal-400 after:transition-all hover:after:w-full' 
            href="/LearnMore" 
            onClick={closeNav}
          >
            About
          </Link>
          <Link 
            className='relative w-48 text-center text-2xl hover:text-teal-400 transition-all duration-200 
              after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
              after:bg-teal-400 after:transition-all hover:after:w-full' 
            href="/Contact" 
            onClick={closeNav}
          >
            Contact Us
          </Link>
          <Link 
            className='relative w-48 text-center text-2xl hover:text-teal-400 transition-all duration-200 
              after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
              after:bg-teal-400 after:transition-all hover:after:w-full' 
            href="/Listings" 
            onClick={closeNav}
          >
            Listings
          </Link><Link 
            className='relative w-48 text-center text-2xl hover:text-teal-400 transition-all duration-200 
              after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
              after:bg-teal-400 after:transition-all hover:after:w-full' 
            href="/Leaderboard" 
            onClick={closeNav}
          >
            Leaderboard
          </Link>
          <Link 
            className='relative w-48 text-center text-2xl hover:text-teal-400 transition-all duration-200 
              after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
              after:bg-teal-400 after:transition-all hover:after:w-full' 
            href="/Reviews" 
            onClick={closeNav}
          >
            Reviews
          </Link>
          <div className="mt-8 scale-110">
            <Dropdown />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar;
