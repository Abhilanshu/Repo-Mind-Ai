import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  phoneNumber?: string;
  avatar?: string;
  organizationId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string, phoneNumber?: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('repomind_auth_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Restore authenticated session from backend on page refresh
  useEffect(() => {
    const restoreSession = async () => {
      const savedToken = localStorage.getItem('repomind_auth_token');
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            'Authorization': `Bearer ${savedToken}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setToken(data.token || savedToken);
        } else {
          // Token invalid or expired
          localStorage.removeItem('repomind_auth_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        // Backend offline or network failure fallback
        console.warn('Backend API connection check fallback:', err);
        const savedUserStr = localStorage.getItem('repomind_auth_user_cache');
        if (savedUserStr) {
          try {
            setUser(JSON.parse(savedUserStr));
          } catch (e) {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed. Invalid credentials.');
        setIsLoading(false);
        return false;
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('repomind_auth_token', data.token);
      localStorage.setItem('repomind_auth_user_cache', JSON.stringify(data.user));
      setIsLoading(false);
      return true;
    } catch (err) {
      // Offline fallback login for client demonstration
      console.warn('API login offline fallback:', err);
      if (email && password.length >= 6) {
        const fallbackUser: User = {
          _id: 'usr_' + Date.now(),
          name: email.split('@')[0],
          email,
          role: 'Senior Architect',
          plan: 'Pro Plan'
        };
        const mockToken = 'mock_jwt_' + Date.now();
        setUser(fallbackUser);
        setToken(mockToken);
        localStorage.setItem('repomind_auth_token', mockToken);
        localStorage.setItem('repomind_auth_user_cache', JSON.stringify(fallbackUser));
        setIsLoading(false);
        return true;
      }

      setError('Network connection error. Server unreachable.');
      setIsLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role = 'Senior Architect', phoneNumber = '+91 98765 43210'): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, phoneNumber })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed. Check your input.');
        setIsLoading(false);
        return false;
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('repomind_auth_token', data.token);
      localStorage.setItem('repomind_auth_user_cache', JSON.stringify(data.user));
      setIsLoading(false);
      return true;
    } catch (err) {
      // Offline fallback registration
      if (name && email && password.length >= 6) {
        const fallbackUser: User = {
          _id: 'usr_' + Date.now(),
          name,
          email,
          role,
          plan: 'Pro Plan',
          phoneNumber
        };
        const mockToken = 'mock_jwt_' + Date.now();
        setUser(fallbackUser);
        setToken(mockToken);
        localStorage.setItem('repomind_auth_token', mockToken);
        localStorage.setItem('repomind_auth_user_cache', JSON.stringify(fallbackUser));
        setIsLoading(false);
        return true;
      }

      setError('Network connection error. Server unreachable.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    fetch(`${API_BASE_URL}/logout`, { method: 'POST' }).catch(() => {});
    setUser(null);
    setToken(null);
    localStorage.removeItem('repomind_auth_token');
    localStorage.removeItem('repomind_auth_user_cache');
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, error, login, register, logout, clearError }}>
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
