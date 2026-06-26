'use client';

import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';

// Wraps the app in Privy so embedded wallets + email login are available app-wide
// (ConnectWallet, claim, withdraw). If no app id is configured, render children
// untouched so the app still runs without Privy.
export default function PrivyProviderWrapper({ children }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  if (!appId) return children;

  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: { theme: 'light', accentColor: '#0f766e' },
        loginMethods: ['email'],
        embeddedWallets: { createOnLogin: 'users-without-wallets', showWalletUIs: true },
        defaultChain: sepolia,
        supportedChains: [sepolia],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
