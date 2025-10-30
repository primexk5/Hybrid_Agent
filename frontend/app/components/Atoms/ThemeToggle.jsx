'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
      {theme === 'light' ? <FiMoon className="w-6 h-6" /> : <FiSun className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;