import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTelegramPlane, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-900 dark:text-white w-full border-t border-gray-200 dark:border-gray-800 px-6 md:px-16 lg:px-24 xl:px-40 py-10 transition-colors duration-300 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-xl font-extrabold tracking-tight">
            <span className="text-teal-600 dark:text-teal-500">HYBRID</span>
            <span>Agent</span>
          </p>
          <p className="text-sm mt-2 max-w-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Secure commission payments for agents — locally &amp;{' '}
            <span className="text-teal-600 dark:text-teal-400">on-chain</span>.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/LearnMore" className="hover:text-teal-600 dark:hover:text-teal-400 transition">About</Link>
          <Link href="/Listings" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Listings</Link>
          <Link href="/Contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Contact</Link>
          <Link href="/Reviews" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Reviews</Link>
          <Link href="/Leaderboard" className="hover:text-teal-600 dark:hover:text-teal-400 transition">Leaderboard</Link>
        </div>

        <div className="flex gap-4 text-xl text-gray-500 dark:text-gray-400">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition" aria-label="Telegram">
            <FaTelegramPlane />
          </a>
          <a href="https://x.com/NewKingweb" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition" aria-label="Twitter / X">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-xs text-gray-400 dark:text-gray-500">
        &copy; {new Date().getFullYear()} HybridAgent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
