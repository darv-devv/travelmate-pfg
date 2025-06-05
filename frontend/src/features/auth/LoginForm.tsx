import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Tipo para el contexto de autenticación
type AuthContextType = {
  user: string | null; // El 'user' puede ser un email o 'null' si no hay usuario autenticado
  login: (email: string) => void;  // Método para iniciar sesión, recibe el email
  logout: () => void;  // Método para cerrar sesión
};

// Crear el contexto con el tipo definido
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor de autenticación
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null); // Estado para almacenar el email del usuario

  // Función para iniciar sesión
  const login = (email: string) => {
    setUser(email); // Establecer el usuario en el estado
    localStorage.setItem("user", email); // Guardar el email en el almacenamiento local
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null); // Borrar el usuario del estado
    localStorage.removeItem("user"); // Eliminar el usuario del almacenamiento local
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}  
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);  // Obtener el contexto
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");  // Verificación de contexto
  return context;  // Retornar el contexto
};
