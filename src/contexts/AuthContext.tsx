import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// User types
export type UserRole = 'guest' | 'host' | 'admin';

export interface User {
  id: string; // Unique identifier for the user
  name: string; // User's name
  email: string; // User's email address
  role: UserRole; // User's role (guest, host, admin)
  profile_picture: string; // URL of the user's profile picture
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

// Define the context type
interface AuthContextType {
  user: User | null; // Current user object or null if not authenticated
  setUser: (user: User | null) => void; // Function to set the user
  login: (email: string, password: string) => Promise<boolean>; // Function to log in the user
  logout: () => void; // Function to log out the user
  isAuthenticated: boolean; // Boolean indicating if the user is authenticated
  getDashboardPath: () => string; // Function to get the dashboard path based on user role
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to provide context to children
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // State to hold user data
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State to track authentication status

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('kinnstay_user'); // Retrieve user data from local storage
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
      setIsAuthenticated(true); // Set authenticated state to true
    }
  }, []);

  // Helper function to get the dashboard path based on user role
  const getDashboardPath = (): string => {
    if (!user) return '/'; // Return home if no user is logged in
    
    switch (user.role) {
      case 'guest':
        return '/dashboard/guest'; // Path for guest users
      case 'host':
        return '/dashboard/host'; // Path for host users
      case 'admin':
        return '/dashboard/admin'; // Path for admin users
      default:
        return '/'; // Default path
    }
  };

  // Function to log in the user
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const data = await response.json(); // Parse response data

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials. Please try again.'); // Handle login error
      }

      // Decode the token to get user information
      const decodedToken = jwtDecode(data.token);
      const user = {
        id: (decodedToken as any).id,
        name: (decodedToken as any).name,
        email: (decodedToken as any).email,
        role: (decodedToken as any).role,
        profile_picture: (decodedToken as any).profile_picture,
        phone: (decodedToken as any).phone,
      };

      setUser(user); // Set user in context
      setIsAuthenticated(true); // Set authenticated state to true
      localStorage.setItem('authToken', data.token); // Store token in local storage
      localStorage.setItem('kinnstay_user', JSON.stringify(user)); // Store user data in local storage
      return true; // Return success
    } catch (error) {
      console.error('Login error:', error); // Log error to console
      return false; // Return failure
    }
  };

  // Function to log out the user
  const logout = () => {
    setUser(null); // Clear user data
    setIsAuthenticated(false); // Set authenticated state to false
    localStorage.removeItem('kinnstay_user'); // Remove user data from local storage
  };

  // Provide context values to children
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated, getDashboardPath }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider'); // Error if used outside provider
  }
  return context; // Return context
};
