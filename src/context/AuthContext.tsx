import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  healthScore: number;
  joinedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr_shams_01',
  name: 'علی رضایی',
  email: 'ali.rezaei@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  healthScore: 78,
  joinedDate: '۱۴۰۳/۰۶/۱۵',
};

const STORAGE_KEY = 'shams_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Start with demo user logged in for immediate showcase, or default to DEMO_USER
        setUser(DEMO_USER);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_USER));
      }
    } catch {
      setUser(DEMO_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, remember: boolean = true): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate real network request with 600ms latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'invalid_email' };
    }
    if (!password || password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'invalid_password' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      healthScore: 82,
      joinedDate: new Date().toLocaleDateString('fa-IR'),
    };

    setUser(newUser);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    }
    setIsLoading(false);
    return { success: true };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 650));

    if (!name || name.trim().length < 2) {
      setIsLoading(false);
      return { success: false, error: 'invalid_name' };
    }
    if (!email || !email.includes('@')) {
      setIsLoading(false);
      return { success: false, error: 'invalid_email' };
    }
    if (!password || password.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'invalid_password' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      healthScore: 80,
      joinedDate: new Date().toLocaleDateString('fa-IR'),
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!email || !email.includes('@')) {
      return { success: false, message: 'invalid_email' };
    }
    return { success: true, message: 'reset_sent' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
