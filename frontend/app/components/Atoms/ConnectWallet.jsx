import React from 'react';
import toast from 'react-hot-toast';
import { FiLink } from 'react-icons/fi';

const ConnectWallet = () => {
  const notify = () =>
    toast('Wallet connection coming soon!', {
      style: {
        border: '1px solid #0f766e',
        padding: '14px',
        color: '#134e4a',
        background: '#f0fdf4',
        fontWeight: '600',
      },
      icon: '🚀',
    });

  return (
    <button
      onClick={notify}
      className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-semibold text-sm transition-colors"
    >
      <FiLink size={14} />
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
