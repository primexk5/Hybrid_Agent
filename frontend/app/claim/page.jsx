'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FiMail, FiShield, FiCheckCircle, FiCopy, FiCheck, FiArrowRight, FiHome,
  FiTruck, FiLock, FiClock,
} from 'react-icons/fi';
import { PageLoader, Spinner } from '../components/Atoms/Loaders';
import { useNotifications } from '../components/Atoms/NotificationProvider';
import { api } from '@/lib/api';

function ClaimInner() {
  const params = useSearchParams();
  const listingId = params.get('listingId');
  const notifications = useNotifications();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('login'); // login | sent | signedIn
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!listingId) { setLoading(false); return; }
    api.claim(listingId)
      .then((c) => { setClaim(c); setEmail(c.ownerEmail || ''); })
      .catch(() => setClaim(false))
      .finally(() => setLoading(false));
  }, [listingId]);

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

  const sendLink = (e) => {
    e.preventDefault();
    setSending(true);
    // Scaffold for Privy email magic-link. Production: privy.login({ loginMethods: ['email'] }).
    setTimeout(() => { setSending(false); setStep('sent'); }, 800);
  };

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(claim.ownerWallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const withdraw = (e) => {
    e.preventDefault();
    if (!claim.settled) return;
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      notifications.success('Withdrawal queued', 'On-chain USDC withdrawal activates once the escrow contracts are live.');
    }, 900);
  };

  const Icon = claim.assetType === 'vehicle' ? FiTruck : FiHome;
  const short = `${claim.ownerWallet.slice(0, 8)}…${claim.ownerWallet.slice(-6)}`;

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

          {step !== 'signedIn' ? (
            /* ---- Sign-in (email magic link) ---- */
            <div className="p-6">
              <h1 className="text-xl font-bold mb-1">Claim your funds</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                Sign in with the email your agent used. We open the secure wallet reserved for you — no seed phrase, no crypto knowledge needed.
              </p>

              {step === 'login' ? (
                <form onSubmit={sendLink} className="space-y-3">
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-500" size={16} />
                    <input
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                      placeholder="you@email.com"
                      className="w-full pl-10 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl disabled:opacity-60 transition-colors">
                    {sending ? <Spinner size={18} /> : <>Email me a magic link <FiArrowRight size={16} /></>}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <FiMail size={32} className="mx-auto text-teal-500 mb-3" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Magic link sent to <b>{email}</b>.</p>
                  <p className="text-xs text-gray-400 mb-5">Check your inbox and tap the link to sign in.</p>
                  {/* Dev scaffold: simulate the magic-link click (replaced by Privy in prod) */}
                  <button onClick={() => setStep('signedIn')} className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                    Simulate sign-in (demo) →
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 mt-5 text-[11px] text-gray-400">
                <FiShield size={12} className="text-teal-500" /> Your wallet is reserved for {claim.ownerEmail}. Only this email can open it.
              </div>
            </div>
          ) : (
            /* ---- Signed in: wallet + balance + withdraw ---- */
            <div className="p-6">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-4">
                <FiCheckCircle size={16} /> Signed in
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white rounded-2xl p-5 mb-4">
                <p className="text-xs text-teal-100 mb-1">{claim.settled ? 'Available to withdraw' : 'Reserved (arrives on completion)'}</p>
                <p className="text-3xl font-extrabold">{claim.payoutUsdc} <span className="text-lg font-semibold text-teal-100">USDC</span></p>
                <button onClick={copyWallet} className="mt-3 flex items-center gap-2 text-xs font-mono text-teal-50 hover:text-white">
                  {short} {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
                </button>
              </div>

              <form onSubmit={withdraw} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Withdraw to</label>
                  <input placeholder="0x your external wallet (optional)" className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-sm font-mono outline-none focus:ring-2 focus:ring-teal-500" />
                </div>
                <button type="submit" disabled={!claim.settled || withdrawing} className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl disabled:opacity-50 transition-colors">
                  {withdrawing ? <Spinner size={18} /> : <><FiLock size={15} /> {claim.settled ? 'Withdraw funds' : 'Funds not released yet'}</>}
                </button>
              </form>

              {!claim.settled && (
                <p className="text-[11px] text-gray-400 mt-3 text-center">We'll email you the moment the sale completes and your funds land here.</p>
              )}
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
