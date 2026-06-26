'use client';

import React, { Suspense, useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import {
  FiMail, FiShield, FiCheckCircle, FiCopy, FiCheck, FiArrowRight, FiHome,
  FiTruck, FiLock, FiClock, FiAlertTriangle, FiExternalLink,
} from 'react-icons/fi';
import { PageLoader, Spinner } from '../components/Atoms/Loaders';
import { useNotifications } from '../components/Atoms/NotificationProvider';
import { api } from '@/lib/api';
import { getUsdcBalance, withdrawUsdc, pickEmbeddedWallet } from '@/lib/wallet';

const EXPLORER_TX = 'https://sepolia.etherscan.io/tx/';

function ClaimInner() {
  const params = useSearchParams();
  const listingId = params.get('listingId');
  const notifications = useNotifications();

  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [withdrawTo, setWithdrawTo] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState(null); // { formatted, raw }
  const [balLoading, setBalLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  useEffect(() => {
    if (!listingId) { setLoading(false); return; }
    api.claim(listingId)
      .then((c) => { setClaim(c); })
      .catch(() => setClaim(false))
      .finally(() => setLoading(false));
  }, [listingId]);

  // The embedded wallet the owner controls after signing in.
  const wallet = useMemo(
    () => pickEmbeddedWallet(wallets, claim?.ownerWallet),
    [wallets, claim]
  );
  const mismatch = Boolean(
    authenticated && wallet && claim?.ownerWallet &&
    wallet.address.toLowerCase() !== claim.ownerWallet.toLowerCase()
  );
  const signedIn = authenticated && wallet && !mismatch;

  const refreshBalance = useCallback(async () => {
    if (!wallet?.address) return;
    setBalLoading(true);
    try {
      setBalance(await getUsdcBalance(wallet.address));
    } catch { /* leave previous */ }
    finally { setBalLoading(false); }
  }, [wallet]);

  useEffect(() => { if (signedIn) refreshBalance(); }, [signedIn, refreshBalance]);

  if (loading) return <div className="min-h-screen bg-gray-50 dark:bg-black pt-24"><PageLoader label="Loading your claim" /></div>;

  if (!listingId || !claim) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black text-center px-4">
        <div>
          <p className="text-5xl font-bold text-teal-500 mb-3">404</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-5">Claim link is invalid or expired.</p>
          <Link href="/" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">← Back to HybridAgent</Link>
        </div>
      </div>
    );
  }

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(claim.ownerWallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const withdraw = async (e) => {
    e.preventDefault();
    if (!wallet) return;
    setWithdrawing(true);
    setTxHash(null);
    try {
      const dest = withdrawTo.trim() || wallet.address;
      const receipt = await withdrawUsdc(wallet, dest); // full balance
      setTxHash(receipt.hash);
      notifications.success('Withdrawal sent', 'Your USDC transfer is confirmed on-chain.');
      await refreshBalance();
    } catch (err) {
      notifications.error('Withdrawal failed', err?.shortMessage || err?.message || 'Transaction was rejected.');
    } finally {
      setWithdrawing(false);
    }
  };

  const Icon = claim.assetType === 'vehicle' ? FiTruck : FiHome;
  const short = `${claim.ownerWallet.slice(0, 8)}…${claim.ownerWallet.slice(-6)}`;
  const hasFunds = balance && balance.raw > 0n;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white flex items-center justify-center px-4 py-24 transition-colors">
      <div className="w-full max-w-md animate-fade-up">
        {/* Brand */}
        <div className="text-center mb-6">
          <span className="text-2xl font-extrabold tracking-tight">
            <b className="text-teal-600">HYBRID</b><span className="text-gray-900 dark:text-white">AGENT</span>
          </span>
        </div>

        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Asset summary */}
          <div className="flex items-center gap-4 p-5 border-b border-gray-100 dark:border-gray-800">
            {claim.image ? (
              <img src={claim.image} alt={claim.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                <Icon className="text-teal-500" size={24} />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-bold truncate">{claim.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Listed by {claim.agentName}</p>
              <span className={`inline-flex items-center gap-1 mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${claim.settled ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300'}`}>
                {claim.settled ? <><FiCheckCircle size={11} /> Sale completed</> : <><FiClock size={11} /> Sale in progress</>}
              </span>
            </div>
          </div>

          {!signedIn ? (
            /* ---- Sign in with Privy email ---- */
            <div className="p-6">
              <h1 className="text-xl font-bold mb-1">Claim your funds</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Sign in with the email your agent used. We open the secure wallet reserved for you — no seed phrase, no crypto knowledge needed.
              </p>

              {mismatch ? (
                <div className="mb-4 flex items-start gap-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-3">
                  <FiAlertTriangle className="mt-0.5 flex-shrink-0" size={14} />
                  <span>You're signed in with a different wallet than the one reserved for {claim.ownerEmail}. Log out and sign in with that email to access your funds.</span>
                </div>
              ) : null}

              <button
                onClick={login}
                disabled={!ready}
                className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl disabled:opacity-60 transition-colors"
              >
                {!ready ? <Spinner size={18} /> : <><FiMail size={16} /> Sign in to claim <FiArrowRight size={16} /></>}
              </button>
              {mismatch ? (
                <button onClick={logout} className="w-full mt-2 text-sm font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  Log out
                </button>
              ) : null}

              <div className="flex items-center gap-2 mt-5 text-[11px] text-gray-400">
                <FiShield size={12} className="text-teal-500" /> Your wallet is reserved for {claim.ownerEmail}. Only this email can open it.
              </div>
            </div>
          ) : (
            /* ---- Signed in: wallet + balance + withdraw ---- */
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold">
                  <FiCheckCircle size={16} /> Signed in
                </span>
                <button onClick={logout} className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">Log out</button>
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl p-5 mb-4">
                <p className="text-xs text-teal-100 mb-1">Available to withdraw</p>
                <p className="text-3xl font-extrabold">
                  {balLoading && !balance ? '…' : (balance ? Number(balance.formatted).toLocaleString() : '0')}
                  <span className="text-lg font-semibold text-teal-100"> USDC</span>
                </p>
                <button onClick={copyWallet} className="mt-3 flex items-center gap-2 text-xs font-mono text-teal-50 hover:text-white">
                  {short} {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
                </button>
              </div>

              <form onSubmit={withdraw} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Withdraw to</label>
                  <input
                    value={withdrawTo}
                    onChange={(e) => setWithdrawTo(e.target.value)}
                    placeholder="0x external wallet (optional)"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-sm font-mono outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">Leave blank to keep funds in your reserved wallet.</p>
                </div>
                <button
                  type="submit"
                  disabled={!hasFunds || withdrawing}
                  className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50 transition-colors"
                >
                  {withdrawing ? <Spinner size={18} /> : <><FiLock size={15} /> {hasFunds ? 'Withdraw funds' : 'No funds to withdraw yet'}</>}
                </button>
              </form>

              {txHash ? (
                <a href={`${EXPLORER_TX}${txHash}`} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                  View transaction <FiExternalLink size={12} />
                </a>
              ) : !hasFunds ? (
                <p className="text-[11px] text-gray-400 mt-3 text-center">We'll email you the moment the sale completes and your funds land here.</p>
              ) : null}
            </div>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Secured by HybridAgent escrow · funds paid directly to your reserved wallet
        </p>
      </div>
    </div>
  );
}

export default function ClaimPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-black pt-24"><PageLoader /></div>}>
      <ClaimInner />
    </Suspense>
  );
}
