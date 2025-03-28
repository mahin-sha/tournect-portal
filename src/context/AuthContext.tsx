
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  walletBalance?: number;
  creditLimit?: number;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

// Mock user data for fallback
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Agent User',
    email: 'agent@example.com',
    password: 'agent123',
    role: 'agent' as const,
    walletBalance: 5000,
    creditLimit: 10000,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would validate the token with your backend
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Try to authenticate with the API
      const response = await fetch('https://localhost:7000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      // If API call fails, fall back to mock users for development
      if (!response.ok) {
        console.warn('API login failed, falling back to mock users for development');
        
        // Find user by email and password in mock data
        const foundUser = MOCK_USERS.find(
          u => u.email === email && u.password === password
        );
        
        if (!foundUser) {
          throw new Error('Invalid credentials');
        }
        
        // Remove password before storing
        const { password: _, ...userWithoutPassword } = foundUser;
        
        // Store user in state and localStorage
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        toast.success(`Welcome back, ${userWithoutPassword.name}`);
        return;
      }
      
      // API call succeeded
      const data = await response.json();
      
      // Store user data from API
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success(`Welcome back, ${data.user.name}`);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
