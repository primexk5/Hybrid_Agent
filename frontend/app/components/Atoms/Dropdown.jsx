'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ConnectWallet from './ConnectWallet'


export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/20 px-3 py-2 text-lg font-bold outline-none text-white ring-1 ring-inset ring-white/10 hover:bg-white/20">
        Onboarding
        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 md:origin-top-right z-10 mt-2 w-56 origin-top rounded-md bg-black bg-opacity-90 shadow-2xl border border-teal-600 focus:outline-none transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1 text-teal-500 font-bold">
          <MenuItem>
            <Link className="block px-4 py-2 text-sm data-focus:bg-white/20 data-focus:text-teal-700" href="/Registration">Register</Link>
          </MenuItem>
          <MenuItem>
            <div className="block px-4 py-2 text-sm data-focus:bg-white/20 data-focus:text-teal-700">
              <ConnectWallet />
            </div>
          </MenuItem>
          <MenuItem as="div">
            <form action="#" method="POST" className="w-full">
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm data-focus:bg-white/20 data-focus:text-teal-700"
              >
                Sign out
              </button>
            </form>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}