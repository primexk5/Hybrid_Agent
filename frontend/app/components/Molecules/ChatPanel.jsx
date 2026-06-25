'use client';

import React from 'react';
import { FiX, FiShield } from 'react-icons/fi';
import ChatThread from './ChatThread';

// Slide-over wrapper around a live ChatThread (used on the listing detail page).
const ChatPanel = ({ conversationId, title = 'Chat with agent', onClose }) => (
  <div className="fixed inset-0 z-50 flex justify-end">
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />
    <div className="relative w-full max-w-md bg-white dark:bg-gray-950 h-full shadow-2xl flex flex-col" style={{ animation: 'fade-up 0.3s ease-out' }}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-[11px] text-teal-600 dark:text-teal-400 flex items-center gap-1"><FiShield size={11} /> Secured on-platform</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-white"><FiX size={22} /></button>
      </div>
      <ChatThread conversationId={conversationId} className="flex-1" />
    </div>
  </div>
);

export default ChatPanel;
