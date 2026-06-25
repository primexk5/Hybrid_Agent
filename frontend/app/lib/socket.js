import { io } from 'socket.io-client';
import { getToken } from './api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

let socket = null;

// Lazily create a single authenticated socket connection for the app.
export function getSocket() {
  const token = getToken();
  if (socket && socket.connected) return socket;
  if (!socket) {
    socket = io(API_URL, {
      auth: { token },
      transports: ['websocket'],
      autoConnect: true,
    });
  } else {
    socket.auth = { token };
    if (!socket.connected) socket.connect();
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
