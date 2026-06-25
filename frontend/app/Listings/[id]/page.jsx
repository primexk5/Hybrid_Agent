'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FiHome, FiTruck, FiDollarSign, FiShield, FiPhone, FiMessageSquare,
  FiShoppingCart, FiX, FiCheck, FiAlertTriangle, FiUser, FiStar,
} from 'react-icons/fi';
import { useAuth } from '../../components/Atoms/AuthProvider';
import { useNotifications } from '../../components/Atoms/NotificationProvider';
import { PageLoader, Spinner } from '../../components/Atoms/Loaders';
import ChatPanel from '../../components/Molecules/ChatPanel';
import ReviewModal from '../../components/Molecules/ReviewModal';
import { StarRating } from '../../components/Atoms/StarRating';
import { api } from '@/lib/api';
import { formatUsdc } from '@/lib/format';

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/10 rounded-lg p-3">
    <Icon className="text-teal-600 dark:text-teal-400 flex-shrink-0" size={18} />
    <div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className="font-semibold text-gray-900 dark:text-white text-sm capitalize">{value}</div>
    </div>
  </div>
);

const ItemDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const notifications = useNotifications();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatConv, setChatConv] = useState(null);
  const [opening, setOpening] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [quote, setQuote] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState({ summary: null, reviews: [] });

  const load = useCallback(async () => {
    try {
      setItem(await api.listing(id));
    } catch {
      setItem(false);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const loadReviews = useCallback(async (agentId) => {
    try { setReviewData(await api.agentReviews(agentId)); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (item?.created_by) loadReviews(item.created_by);
  }, [item?.created_by, loadReviews]);

  const isVehicle = item?.asset_type === 'vehicle';
  const isOwnerOfListing = user && item && item.created_by === user.id;
  const priceBase = item ? BigInt(Math.round(Number(item.price_usdc) * 1e6)) : 0n;

  const openChat = async () => {
    if (!isLoggedIn) {
      notifications.info('Sign in to chat', 'Log in to message the agent on-platform.');
      return router.push('/Login');
    }
    setOpening(true);
    try {
      const conv = await api.openConversation(item.id);
      setChatConv(conv.id);
    } catch (err) {
      notifications.error('Could not open chat', err.message);
    } finally {
      setOpening(false);
    }
  };

  const openBuy = async () => {
    if (!isLoggedIn) {
      notifications.info('Sign in to buy', 'Log in to purchase securely through escrow.');
      return router.push('/Login');
    }
    setBuyOpen(true);
    try {
      setQuote(await api.quote(`?price=${priceBase}&commissionBps=${item.commission_bps || 0}&platformFeeBps=100`));
    } catch {
      setQuote(null);
    }
  };

  const confirmBuy = async () => {
    // On-chain USDC escrow checkout activates once contracts are deployed.
    // For now we open a secured conversation so the buyer can coordinate.
    try {
      const conv = await api.openConversation(item.id);
      setBuyOpen(false);
      setChatConv(conv.id);
      notifications.success('Purchase started', 'Coordinate with the agent here. Payment settles in USDC via escrow.');
    } catch (err) {
      notifications.error('Could not start purchase', err.message);
    }
  };

  if (loading) return <div className="min-h-screen bg-white dark:bg-black pt-24"><PageLoader label="Loading listing" /></div>;

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white">
        <div className="text-center">
          <p className="text-7xl font-bold text-teal-500 mb-4">404</p>
          <p className="text-2xl font-semibold mb-6">Listing not found</p>
          <Link href="/Listings" className="bg-teal-700 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">← Back to Listings</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-fade-up">
        <Link href="/Listings" className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-medium text-sm mb-6">← Back to Listings</Link>

        <div className="bg-gray-50 dark:bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 w-full">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-64 sm:h-80 md:h-full object-cover" style={{ maxHeight: '560px' }} />
              ) : (
                <div className="w-full h-64 md:h-full min-h-[320px] bg-gradient-to-br from-teal-100 to-gray-100 dark:from-teal-900/30 dark:to-white/5 flex items-center justify-center text-teal-300 dark:text-teal-700">
                  {isVehicle ? <FiTruck size={64} /> : <FiHome size={64} />}
                </div>
              )}
            </div>

            <div className="md:w-1/2 w-full p-6 sm:p-8 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{item.title}</h1>
                <span className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full capitalize ${item.status === 'sold' ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'}`}>
                  {item.status === 'open' ? 'Available' : item.status}
                </span>
              </div>

              {/* Fixed price tag */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">{Number(item.price_usdc).toLocaleString()}</span>
                <span className="text-lg font-semibold text-gray-400">USDC</span>
                <span className="text-xs text-gray-400 ml-2">· fixed price</span>
              </div>

              {item.description && <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{item.description}</p>}

              <div className="grid grid-cols-2 gap-3 mb-6">
                <DetailRow icon={FiDollarSign} label="Price" value={`${item.price_usdc} USDC`} />
                <DetailRow icon={isVehicle ? FiTruck : FiHome} label="Type" value={item.asset_type} />
                {item.listing_type === 'agent_brokered' && <DetailRow icon={FiUser} label="Sold by agent" value="Brokered" />}
                <DetailRow icon={FiShield} label="Settlement" value="USDC escrow" />
              </div>

              {/* Actions: Buy + Chat (no negotiation, no email) */}
              <div className="mt-auto space-y-3">
                {isOwnerOfListing ? (
                  <div className="bg-teal-50 dark:bg-teal-900/15 border border-teal-100 dark:border-teal-900/40 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-300">
                    This is your listing.{' '}
                    {item.listing_type === 'agent_brokered' && item.owner_status === 'pending' && (
                      <AttachOwner id={item.id} onDone={load} notifications={notifications} />
                    )}
                  </div>
                ) : item.status === 'sold' ? (
                  <div className="text-center bg-gray-100 dark:bg-white/5 rounded-xl py-3 text-sm font-semibold text-gray-500">This item has been sold.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button onClick={openBuy} className="flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                      <FiShoppingCart size={18} /> Buy now
                    </button>
                    <button onClick={openChat} disabled={opening} className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 hover:border-teal-500 font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-60">
                      {opening ? <Spinner size={18} /> : <><FiMessageSquare size={18} /> Chat with agent</>}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Certified agent */}
        {item.agent_name && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Listed by</h2>
            <div className="bg-gray-50 dark:bg-white/5 p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img src={item.agent_avatar} alt={item.agent_name} className="w-20 h-20 rounded-full border-4 border-teal-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold">{item.agent_name}</h3>
                  {item.agent_kyc === 'verified' && (
                    <span className="flex items-center gap-1 bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 px-2.5 py-1 rounded-full text-xs font-bold">
                      <FiShield size={12} /> Certified agent
                    </span>
                  )}
                </div>
                {item.agent_username && <p className="text-sm text-gray-500 dark:text-gray-400">@{item.agent_username}</p>}
                <div className="flex items-center gap-2 mt-1.5">
                  <StarRating value={Number(item.agent_rating) || 0} size={14} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {Number(item.agent_rating) > 0 ? `${Number(item.agent_rating).toFixed(1)} · ` : ''}{item.agent_review_count || 0} review{Number(item.agent_review_count) === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  {item.agent_phone && (
                    <a href={`tel:${item.agent_phone}`} className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline text-sm font-medium">
                      <FiPhone size={14} /> {item.agent_phone}
                    </a>
                  )}
                  {!isOwnerOfListing && (
                    <button onClick={openChat} className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline text-sm font-medium">
                      <FiMessageSquare size={14} /> Message on-platform
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-3 flex items-start gap-1.5">
                  <FiAlertTriangle size={12} className="mt-0.5 flex-shrink-0 text-amber-500" />
                  Call to arrange a site visit, but keep all dealings &amp; payment on HybridAgent so we can protect you if anything goes wrong.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Agent reviews */}
        {item.agent_name && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Agent reviews{reviewData.summary?.count ? ` (${reviewData.summary.count})` : ''}
              </h2>
              {!isOwnerOfListing && (
                <button
                  onClick={() => {
                    if (!isLoggedIn) { notifications.info('Sign in to review', 'Log in to review this agent.'); return router.push('/Login'); }
                    setReviewOpen(true);
                  }}
                  className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1.5"
                >
                  <FiStar size={14} /> Write a review
                </button>
              )}
            </div>

            {reviewData.summary?.count > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <SummaryChip label="Overall" value={reviewData.summary.rating} />
                <SummaryChip label="Communication" value={reviewData.summary.communication} />
                <SummaryChip label="Professionalism" value={reviewData.summary.professionalism} />
              </div>
            )}

            {reviewData.reviews.length === 0 ? (
              <p className="text-sm text-gray-400 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center">
                No reviews yet. Chat with the agent, then be the first to review.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {reviewData.reviews.map((r) => (
                  <div key={r.id} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <img src={r.reviewer_avatar} alt={r.reviewer_name} className="w-9 h-9 rounded-full border-2 border-teal-500" />
                        <span className="font-semibold text-sm">{r.reviewer_name}</span>
                      </div>
                      <StarRating value={r.rating} size={13} />
                    </div>
                    {r.comment && <p className="text-sm text-gray-600 dark:text-gray-300">{r.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {reviewOpen && (
        <ReviewModal
          agentId={item.created_by}
          agentName={item.agent_name}
          onClose={() => setReviewOpen(false)}
          onDone={(res) => { setReviewData(res); load(); }}
        />
      )}

      {/* Buy modal */}
      {buyOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setBuyOpen(false)}>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold">Buy · {Number(item.price_usdc).toLocaleString()} USDC</h3>
              <button onClick={() => setBuyOpen(false)} className="text-gray-400 hover:text-gray-700 dark:hover:text-white"><FiX size={22} /></button>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">You pay the exact listed price into escrow. On completion, funds split automatically:</p>
              {quote ? (
                <div className="space-y-2 text-sm bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                  <Row label="You pay" value={`${formatUsdc(quote.price)} USDC`} bold />
                  {Number(quote.commission) > 0 && <Row label="Agent commission" value={`${formatUsdc(quote.commission)} USDC`} />}
                  <Row label="Platform fee" value={`${formatUsdc(quote.platformFee)} USDC`} />
                  <Row label="To owner/seller" value={`${formatUsdc(quote.sellerProceeds)} USDC`} />
                </div>
              ) : (
                <div className="flex justify-center py-4"><Spinner size={22} className="text-teal-500" /></div>
              )}
              <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400 bg-teal-50 dark:bg-teal-900/15 rounded-xl p-3">
                <FiShield className="text-teal-500 flex-shrink-0 mt-0.5" size={14} />
                Your money is held in escrow and released only when the deal completes — protecting you, the owner, and the agent.
              </div>
              <button onClick={confirmBuy} className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-600 text-white font-bold py-3 rounded-xl transition-colors">
                <FiCheck size={16} /> Proceed to secure escrow
              </button>
              <p className="text-[11px] text-center text-gray-400">USDC on-chain checkout activates when escrow contracts go live. You'll coordinate with the agent meanwhile.</p>
            </div>
          </div>
        </div>
      )}

      {chatConv && <ChatPanel conversationId={chatConv} title={`Chat · ${item.agent_name || 'Agent'}`} onClose={() => setChatConv(null)} />}
    </div>
  );
};

const Row = ({ label, value, bold }) => (
  <div className="flex justify-between">
    <span className="text-gray-500 dark:text-gray-400">{label}</span>
    <span className={bold ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-700 dark:text-gray-200'}>{value}</span>
  </div>
);

const SummaryChip = ({ label, value }) => (
  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-3 py-1.5 rounded-full">
    {label}
    <span className="text-teal-900 dark:text-teal-100">{Number(value || 0).toFixed(1)}/5</span>
  </span>
);

const AttachOwner = ({ id, onDone, notifications }) => {
  const [addr, setAddr] = useState('');
  const [saving, setSaving] = useState(false);
  const save = async () => {
    setSaving(true);
    try {
      await api.attachOwner(id, addr);
      notifications.success('Owner payout attached', 'The owner will be paid directly at settlement.');
      onDone();
    } catch (err) {
      notifications.error('Could not attach owner', err.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="mt-3">
      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1.5">Owner payout pending — add their wallet before the sale closes.</p>
      <div className="flex gap-2">
        <input value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="0x owner wallet" className="flex-1 bg-white dark:bg-black/40 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm font-mono outline-none focus:ring-2 focus:ring-teal-500" />
        <button onClick={save} disabled={saving || !addr} className="bg-teal-600 hover:bg-teal-500 text-white px-4 rounded-lg text-sm font-semibold disabled:opacity-50">{saving ? '…' : 'Attach'}</button>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
