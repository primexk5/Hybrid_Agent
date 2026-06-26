'use client';

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { FiLink, FiLogOut } from 'react-icons/fi';

const ConnectWallet = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();

  if (!ready) {
    return (
      <span className="flex items-center gap-2 text-gray-400 font-semibold text-sm">
        <FiLink size={14} /> Wallet…
      </span>
    );
  }

  if (authenticated) {
    const addr = user?.wallet?.address;
    const short = addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : 'Connected';
    return (
      <button
        onClick={logout}
        title="Disconnect wallet"
        className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-semibold text-sm transition-colors"
      >
        <span className="font-mono">{short}</span>
        <FiLogOut size={14} />
      </button>
    );
  }

  return (
    <button
      onClick={login}
      className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-semibold text-sm transition-colors"
    >
      <FiLink size={14} />
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;
