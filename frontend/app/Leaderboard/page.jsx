'use client';
import React from 'react';
import { FiAward, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { leaderboardData } from '../Leaderboard/leaderboard';


const getRankColor = (rank) => {
  switch (rank) {
    case 1: return 'text-yellow-400';
    case 2: return 'text-gray-300';
    case 3: return 'text-yellow-600';
    default: return 'text-gray-500';
  }
};

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-mono text-center text-teal-700 mb-4">AGENT LEADERBOARD</h1>
        <p className="text-center text-gray-400 mb-12">Ranking our top-performing agents based on sales and revenue.</p>
        <div className="bg-white/5 rounded-2xl shadow-2xl p-4 md:p-6">
          <ul className="space-y-4">
            {leaderboardData.map((agent) => (
              <li key={agent.rank} className="bg-white/10 p-4 rounded-xl flex items-center justify-between transition-all hover:bg-white/20 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 text-xl font-bold ${getRankColor(agent.rank)}`}>
                    {agent.rank <= 3 ? <FiAward className="w-6 h-6 fill-current" /> : `#${agent.rank}`}
                  </div>
                  <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full border-2 border-teal-500/50" />
                  <span className="font-semibold text-lg">{agent.name}</span>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="text-teal-400" />
                    <span className="font-mono">{agent.sales} Sales</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <FiDollarSign className="text-teal-400" />
                    <span className="font-mono">{agent.revenue}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;