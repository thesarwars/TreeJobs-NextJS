"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem('tj_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (email: string) => {
    const found = INITIAL_USERS.find(u => u.email === email);
    if (found) {
      setUser(found);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tj_user', JSON.stringify(found));
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('tj_user');
    }
  };

  const signup = (name: string, email: string, role: UserRole) => {
    const newUser: User = { id: `u${Date.now()}`, name, email, role };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tj_user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
