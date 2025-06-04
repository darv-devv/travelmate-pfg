// src/features/auth/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { name: string; email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const API_BASE_URL = 'http://localhost:5000/api';
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('🔄 Intentando registro...', userData.email);
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      console.log('📡 Respuesta:', response.status);
      const data = await response.json();
      console.log('📦 Datos:', data);

      if (response.ok && data.success) {
        setUser(data.data.user);
        localStorage.setItem('travelmate_token', data.data.token);
        console.log('✅ Registro exitoso');
        return true;
      }
      return false;
    } catch (error) {
      console.error('🚨 Error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('🔄 Intentando login...', email);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('📦 Login data:', data);

      if (response.ok && data.success) {
        setUser(data.data.user);
        localStorage.setItem('travelmate_token', data.data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('🚨 Error login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelmate_token');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};