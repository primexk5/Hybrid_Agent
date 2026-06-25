'use client';

import React, { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ConnectWallet from './ConnectWallet';

export default function Dropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem('currentUser'));
    checkAuth();
    window.addEventListener('storage', checkAuth);
    window.addEventListener('authChanged', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('authChanged'));
    toast.success('Logged out successfully!');
    router.push('/');
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors outline-none border border-gray-200 dark:border-gray-700">
        Account
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 shadow-xl focus:outline-none overflow-hidden">
        <div className="py-1 text-sm text-gray-700 dark:text-gray-200">
          {isLoggedIn ? (
            <>
              <MenuItem>
                <Link
                  className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium"
                  href="/Profile"
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 text-red-500 hover:text-red-600 transition-colors font-medium"
                >
                  Log out
                </button>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium" href="/Registration">
                  Register
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className="block px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium" href="/Login">
                  Login
                </Link>
              </MenuItem>
              <div className="border-t border-gray-100 dark:border-gray-800 my-1" />
              <MenuItem>
                <div className="px-4 py-2.5">
                  <ConnectWallet />
                </div>
              </MenuItem>
            </>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}
