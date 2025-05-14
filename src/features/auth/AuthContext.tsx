
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
  };
  
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (email: string) => {
    setUser(email);
    localStorage.setItem("user", email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");//Limpiamos el usuario del localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

