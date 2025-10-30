import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTelegramPlane, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full border-t-1 border-gray-800 px-8 md:px-32 lg:px-60 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="text-2xl font-extrabold">
            <span className="text-teal-500">HYBRID</span>Agent
          </p>
          <p className="text-sm font-semibold mt-2 max-w-xs">
            A highly secure way to receive commissions <span className="text-teal-400">locally</span> & <span className="text-teal-400">on-chain</span>.
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row gap-4 md:gap-6 text-sm mt-8 md:mt-0">
          <Link href="/LearnMore" className="hover:text-teal-400 transition">About</Link>
          <Link href="/features" className="hover:text-teal-400 transition">Features</Link>
          <Link href="/Contact" className="hover:text-teal-400 transition">Contact us</Link>
          <Link href="/privacy" className="hover:text-teal-400 transition">Privacy Policy</Link>
        </div>

        <div className="flex gap-4 text-2xl">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="Telegram">
            <FaTelegramPlane />
          </a>
          <a href="https://x.com/NewKingweb" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} HYBRIDAgent. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;