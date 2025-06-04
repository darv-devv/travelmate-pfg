// Removed unused import for 'RegisterForm'
import React from 'react';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './features/auth/AuthContext'; // Importamos el contexto de autenticación

const App: React.FC = () => {
  return (
    <AuthProvider>
    <AppRouter />
    </AuthProvider>
  )
};

export default App;