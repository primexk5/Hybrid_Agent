'use client';

import { CgProfile } from "react-icons/cg";
import React, { useState } from 'react';
import Link from 'next/link';
import Dropdown from '../Atoms/Dropdown';
// import ThemeToggle from '../ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa'; // FaBars and FaTimes were unused

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/LearnMore", label: "About" },
  { href: "/Contact", label: "Contact us" },
  { href: "/Listings", label: "Listings" },
  { href: "/Reviews", label: "Reviews" },
  { href: "/Leaderboard", label: "Leaderboard" },
];

const MobileNavLink = ({ href, label, onClick }) => (
  <Link
    className='relative w-48 text-center text-2xl hover:text-teal-400 transition-all duration-200 
              after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] 
              after:bg-teal-400 after:transition-all hover:after:w-full'
    href={href}
    onClick={onClick}
  >
    {label}
  </Link>
);

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
      <header className='fixed top-0 left-0 w-full z-50 flex p-4 justify-between items-center bg-black text-gray-300 px-4 md:px-8 lg:px-12 xl:px-20 2xl:px-60 border-b border-gray-800 dark:border-gray-700 backdrop-blur-sm'>
        <Link href="/">
          <span className='text-2xl font-extrabold text-white cursor-pointer'><b className='text-teal-800'>HYBRID</b>AGENT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex space-x-8 font-bold'>
          {navLinks.map((link) => (
            <Link key={link.href} className='hover:text-teal-400 transition' href={link.href}>{link.label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className=" hidden lg:block">
            <div className="flex items-center gap-5">
              <Link href="/Profile" onClick={closeNav} aria-label="Profile">
              <CgProfile size={32} className="text-gray-300 hover:text-teal-400 transition-colors" />
            </Link>
            <Dropdown />
            </div>
          </div>
          {/* <ThemeToggle /> */}
          {/* Mobile Navigation Toggle */}
          <div className='lg:hidden'>
            <button
              onClick={handleNavToggle}
              className="relative w-10 h-10 text-white focus:outline-none"
              aria-label={navOpen ? "Close navigation" : "Open navigation"}
            >
              {navOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-md z-40 transform 
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
          {navLinks.map((link) => (
            <MobileNavLink key={link.href} href={link.href} label={link.label} onClick={closeNav} />
          ))}

          <div className="mt-8 flex justify-center items-center gap-6">
            <Link href="/Profile" onClick={closeNav} aria-label="Profile">
              <CgProfile size={32} className="text-gray-300 hover:text-teal-400 transition-colors" />
            </Link>
            <Dropdown />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar;
