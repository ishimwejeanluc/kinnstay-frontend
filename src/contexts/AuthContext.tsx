import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

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
  getDashboardPath: () => string;
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

  // Helper function to get the dashboard path based on user role
  const getDashboardPath = (): string => {
    if (!user) return '/';
    
    switch (user.role) {
      case 'guest':
        return '/dashboard/guest';
      case 'host':
        return '/dashboard/host';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials. Please try again.');
      }

      // Decode the token to get user information
      const decodedToken = jwtDecode(data.token);
      const user = {
        id: (decodedToken as any).id,
        name: (decodedToken as any).name,
        email: (decodedToken as any).email,
        role: (decodedToken as any).role,
      };

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('kinnstay_user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('kinnstay_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getDashboardPath }}>
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
