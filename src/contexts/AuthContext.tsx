
import React, { createContext, useContext, useState, useEffect } from 'react';

// User types
export type UserRole = 'guest' | 'host' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Sample users for demonstration
export const SAMPLE_USERS = {
  guest: {
    id: '1',
    name: 'John Doe',
    email: 'guest@kinnstay.com',
    role: 'guest' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  host: {
    id: '2',
    name: 'Sarah Williams',
    email: 'host@kinnstay.com',
    role: 'host' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  admin: {
    id: '3',
    name: 'Admin User',
    email: 'admin@kinnstay.com',
    role: 'admin' as UserRole,
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
  }
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('kinnstay_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll use the sample users with any password
    const lowerEmail = email.toLowerCase();
    let matchedUser = null;
    
    if (lowerEmail === SAMPLE_USERS.guest.email) {
      matchedUser = SAMPLE_USERS.guest;
    } else if (lowerEmail === SAMPLE_USERS.host.email) {
      matchedUser = SAMPLE_USERS.host;
    } else if (lowerEmail === SAMPLE_USERS.admin.email) {
      matchedUser = SAMPLE_USERS.admin;
    }
    
    if (matchedUser) {
      setUser(matchedUser);
      setIsAuthenticated(true);
      localStorage.setItem('kinnstay_user', JSON.stringify(matchedUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('kinnstay_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
