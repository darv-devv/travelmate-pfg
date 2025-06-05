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

// Usuario demo 
const DEMO_USER = {
  id: 'demo-001',
  name: 'Usuario Demo',
  email: 'demo@travelmate.com',
  password: 'demo123'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (userData: { name: string; email: string; password: string }): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('🔄 Unos segundos...', userData.email);
      
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular registro exitoso
      const newUser = {
        id: `user-${Date.now()}`,
        name: userData.name,
        email: userData.email
      };
      
      setUser(newUser);
      console.log('✅ Registro demo exitoso');
      return true;
      
    } catch (error) {
      console.error('🚨 Error registro demo:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      console.log('🔄 Simulando login...', email);
      
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Verificar credenciales demo
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        const userData = {
          id: DEMO_USER.id,
          name: DEMO_USER.name,
          email: DEMO_USER.email
        };
        
        setUser(userData);
        console.log('✅ Loginexitoso:', userData);
        return true;
      }
      
      //Permitir con cualquiera
      if (password === 'demo') {
        const userData = {
          id: `demo-${Date.now()}`,
          name: 'Usuario Demo',
          email: email
        };
        
        setUser(userData);
        console.log('✅ Login demo exitoso (password demo):', userData);
        return true;
      }
      
      console.log('❌ Credenciales incorrectas');
      return false;
      
    } catch (error) {
      console.error('🚨 Error login demo:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    console.log('👋 Logout ');
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
