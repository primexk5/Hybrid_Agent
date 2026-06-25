'use client';

import { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { useNotifications } from './NotificationProvider';
import { getSocket } from '@/lib/socket';
import { getActiveChat } from '@/lib/activeChat';

// Global listener: turns incoming chat messages into bell + toast notifications
// on any page, unless the user is already viewing that conversation.
export default function ChatNotifier() {
  const { user } = useAuth();
  const { notify } = useNotifications();

  useEffect(() => {
    if (!user) return;
    const socket = getSocket();

    const onNotify = ({ conversationId, message }) => {
      if (!message || message.sender_id === user.id) return;
      if (getActiveChat() === conversationId && typeof document !== 'undefined' && document.hasFocus()) return;
      notify({
        type: 'info',
        title: `New message from ${message.sender_name || 'a user'}`,
        message: message.body,
      });
    };

    socket.on('message:notify', onNotify);
    return () => socket.off('message:notify', onNotify);
  }, [user, notify]);

  return null;
}
