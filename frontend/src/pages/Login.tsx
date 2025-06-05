
//login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext'; // esta línea nueva
//import { Footer } from '../components/Footer';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Se elimina useAuth
  const navigate = useNavigate();
  const { login } = useAuth();

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login(email, password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      alert('Correo o contraseña incorrectos');
    }
  };
 
    //localStorage.setItem('user', email); //Se soluciona problema que provica error en localStorage 
    //localStorage.setItem('password', password); 

    //const storedEmail = localStorage.getItem('user'); 
    //const storedPassword = localStorage.getItem('password'); 

    //if (email === storedEmail && password === storedPassword) {
      //login(email);
      //navigate('/dashboard');
    //} else {
      //alert('Correo o contraseña incorrectos');
    //}
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
      <div className="flex justify-center mb-4">
        <img src="/favicon-32x32.png" alt="Logo" className="w-20" />
      </div>
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Iniciar sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
    
    </div>
  
  );
};

export default Login;
