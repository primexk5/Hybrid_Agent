'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, getToken } from '@/lib/api';
import { disconnectSocket } from '@/lib/socket';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = useCallback(async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { user } = await api.me();
      setUser(user);
    } catch (err) {
      // Invalid/expired token — drop it. Leave it if the server is just offline.
      if (!err.offline) localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const persist = (token, nextUser) => {
    localStorage.setItem('token', token);
    setUser(nextUser);
    window.dispatchEvent(new Event('authChanged'));
  };

  const register = async (form) => {
    const { token, user } = await api.register(form);
    persist(token, user);
    return user;
  };

  const login = async (email, password) => {
    const { token, user } = await api.login({ email, password });
    persist(token, user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    disconnectSocket();
    setUser(null);
    window.dispatchEvent(new Event('authChanged'));
  };

  const verifyKyc = async () => {
    const { user } = await api.verifyKyc();
    setUser(user);
    return user;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isLoggedIn: !!user, register, login, logout, verifyKyc, refresh: loadMe, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
