'use client';
import React from 'react';
import { FiAward, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

const leaderboardData = [
  { rank: 1, name: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/85.jpg', sales: 15, revenue: '$2,500,000' },
  { rank: 2, name: 'Maria Garcia', avatar: 'https://randomuser.me/api/portraits/women/79.jpg', sales: 12, revenue: '$1,800,000' },
  { rank: 3, name: 'James Smith', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', sales: 10, revenue: '$1,500,000' },
  { rank: 4, name: 'Emily White', avatar: 'https://randomuser.me/api/portraits/women/47.jpg', sales: 9, revenue: '$1,250,000' },
  { rank: 5, name: 'Chris Lee', avatar: 'https://randomuser.me/api/portraits/men/56.jpg', sales: 8, revenue: '$950,000' },
  { rank: 6, name: 'Patricia Brown', avatar: 'https://randomuser.me/api/portraits/women/32.jpg', sales: 7, revenue: '$870,000' },
  { rank: 7, name: 'Michael Davis', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', sales: 6, revenue: '$760,000' },
  { rank: 8, name: 'Linda Wilson', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', sales: 5, revenue: '$650,000' },
];

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