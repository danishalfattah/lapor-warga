'use client';

import { useState, useEffect } from 'react';
import { mockCurrentUser } from '@/data/mockUsers';

export function useAuth() {
  const [user, setUser] = useState<typeof mockCurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      // For demo: user is always logged in with mock user
      setUser(mockCurrentUser);
      setLoading(false);
    }, 500);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - always succeeds
    setLoading(true);
    setTimeout(() => {
      setUser(mockCurrentUser);
      setLoading(false);
    }, 1000);
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock register - always succeeds
    setLoading(true);
    setTimeout(() => {
      setUser({ ...mockCurrentUser, name, email });
      setLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}
