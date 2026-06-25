'use client';
import React, { useState, useEffect } from 'react';
import { FiAward, FiTrendingUp, FiStar, FiShield, FiGrid } from 'react-icons/fi';
import { StarRating } from '../components/Atoms/StarRating';
import { Skeleton } from '../components/Atoms/Loaders';
import { api } from '@/lib/api';

const RANK = {
  0: { ring: 'ring-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-400/10', border: 'border-yellow-400', label: '🥇' },
  1: { ring: 'ring-gray-400', bg: 'bg-gray-50 dark:bg-gray-400/10', border: 'border-gray-400', label: '🥈' },
  2: { ring: 'ring-amber-600', bg: 'bg-amber-50 dark:bg-amber-600/10', border: 'border-amber-600', label: '🥉' },
};

const LeaderboardPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.agents()
      .then((data) => active && setAgents(data))
      .catch(() => active && setAgents([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const topThree = agents.slice(0, 3);
  const rest = agents.slice(3);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-up">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-teal-600 dark:text-teal-500 mb-3">Agent Leaderboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Top agents ranked by client ratings, reviews, and completed sales.</p>
        </div>

        {loading ? (
          <div className="space-y-4">{[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
        ) : agents.length === 0 ? (
          <div className="text-center py-20">
            <FiAward size={36} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No ranked agents yet. As agents get reviewed, they'll climb the board here.</p>
          </div>
        ) : (
          <>
            {/* Podium */}
            {topThree.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8 items-end">
                {[1, 0, 2].map((idx) => {
                  const a = topThree[idx];
                  const r = RANK[idx];
                  const first = idx === 0;
                  return (
                    <div key={a.id} className={`flex flex-col items-center rounded-2xl border ${r.bg} ${first ? `border-2 ${r.ring} ring-2 scale-105 p-5` : 'border-gray-200 dark:border-gray-800 p-4'}`}>
                      <span className={first ? 'text-3xl mb-2' : 'text-2xl mb-2'}>{r.label}</span>
                      <img src={a.avatar} alt={a.full_name} className={`rounded-full border-4 ${r.border} mb-2 ${first ? 'w-16 h-16' : 'w-14 h-14'}`} loading="lazy" />
                      <p className="font-bold text-sm text-center truncate w-full">{a.full_name}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <FiStar size={12} className="text-teal-500 fill-current" />
                        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">{Number(a.rating).toFixed(1)}</span>
                        <span className="text-[10px] text-gray-400">({a.review_count})</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full list */}
            <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <ul className="divide-y divide-gray-200 dark:divide-gray-800">
                {agents.map((a, i) => (
                  <li key={a.id} className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${i < 3 ? 'bg-teal-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                        {i < 3 ? <FiAward size={15} /> : `#${i + 1}`}
                      </div>
                      <img src={a.avatar} alt={a.full_name} className="w-11 h-11 rounded-full border-2 border-teal-500/40 flex-shrink-0" loading="lazy" />
                      <div className="min-w-0">
                        <p className="font-semibold text-sm flex items-center gap-1.5 truncate">
                          {a.full_name}
                          {a.kyc_status === 'verified' && <FiShield size={12} className="text-teal-500 flex-shrink-0" title="Verified" />}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <StarRating value={a.rating} size={12} />
                          <span className="text-xs text-gray-400">{Number(a.rating).toFixed(1)} · {a.review_count} reviews</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 text-right flex-shrink-0">
                      <div className="hidden sm:flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                        <FiGrid size={14} className="text-teal-500" />
                        <span className="text-sm font-mono">{a.listing_count}</span>
                        <span className="text-xs text-gray-400">listings</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                        <FiTrendingUp size={14} className="text-teal-500" />
                        <span className="text-sm font-mono">{a.sales_count}</span>
                        <span className="text-xs text-gray-400 hidden sm:inline">sales</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
