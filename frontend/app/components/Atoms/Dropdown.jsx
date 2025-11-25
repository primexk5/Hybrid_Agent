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
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('currentUser'));
    };
    checkAuth();
    window.addEventListener('storage', checkAuth); // Listen for changes in other tabs
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
    router.push('/');
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/20 px-3 py-2 text-lg font-bold outline-none text-white ring-1 ring-inset ring-white/10 hover:bg-white/20">
        {isLoggedIn ? 'Account' : 'Onboarding'}
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 md:origin-top-right z-10 mt-2 w-56 origin-top rounded-md bg-black bg-opacity-90 shadow-2xl border border-teal-600 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 text-teal-500 font-bold">
          {isLoggedIn ? (
            <>
              <MenuItem>
                <Link className="block px-4 py-2 text-sm data-focus:bg-white/20 data-focus:text-teal-700" href="/Profile">Profile</Link>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm data-focus:bg-white/20 data-focus:text-teal-700"
                >
                  Sign out
                </button>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem>
                <Link className="block px-4 py-2 text-sm data-focus:bg-white/20 data-focus:text-teal-700" href="/Registration">Register</Link>

              </MenuItem>
              <MenuItem>
                <Link className="block px-4 py-2 text-sm data-focus:bg-white/20 data-focus:text-teal-700" href="/Login">Login</Link>
              </MenuItem>
              <MenuItem>
                <div className="block px-4 py-2 text-sm data-focus:bg-white/20 data-focus:text-teal-700">
                  <ConnectWallet />
                </div>
              </MenuItem>
            </>
          )}
        </div>
      </MenuItems>
    </Menu>
  )
}