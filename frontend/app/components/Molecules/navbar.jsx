'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Dropdown from '../Atoms/Dropdown';
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
      <header className='fixed top-0 left-0 w-full z-50 flex p-4 justify-between items-center bg-black bg-opacity-20 text-gray-100 px-4 md:px-10 lg:px-20 xl:px-60 border-b border-gray-800 backdrop-blur-sm'>
        <Link href="/">
          <span className='text-2xl font-extrabold text-white cursor-pointer'> <img src="/" className='w-40' alt="" /><b className='text-teal-800'>HYBRID </b>Agent</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-8 font-bold'>
          <Link className='hover:text-teal-400 transition' href="/">Home</Link>
          <Link className='hover:text-teal-400 transition' href="/LearnMore">About</Link>
          <Link className='hover:text-teal-400 transition' href="/Contact">Contact us</Link>
          <Link className='hover:text-teal-400 transition' href="/Listings">Listings</Link>
        </nav>

        <div className="flex items-center gap-4">
            <div className="hidden md:block">
                <Dropdown />
            </div>
            {/* Mobile Navigation Toggle */}
            <div className='md:hidden'>
                <button onClick={handleNavToggle} className="text-white text-2xl focus:outline-none" aria-label="Toggle navigation">
                    {navOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 z-40 transform ${navOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out pt-24`}
        onClick={handleNavToggle}
      >
        <nav className='flex flex-col items-center justify-center h-full -mt-24 text-white font-bold text-2xl gap-8' onClick={(e) => e.stopPropagation()}>
          <Link className='hover:text-teal-400 transition py-2' href="/" onClick={closeNav}>Home</Link>
          <Link className='hover:text-teal-400 transition py-2' href="/about" onClick={closeNav}>About</Link>
          <Link className='hover:text-teal-400 transition py-2' href="/contact" onClick={closeNav}>Contact Us</Link>
          <Link className='hover:text-teal-400 transition py-2' href="/listings" onClick={closeNav}>Listings</Link>
          <div className="mt-4">
            <Dropdown />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar;
