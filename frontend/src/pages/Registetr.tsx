import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Se elimina uso de AuthContext

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //const { login } = useAuth();
  //const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    //Simulación de registro por problema con el token
    navigate('/dashboard');

    //if (password !== confirmPassword) {
      //alert('Las contraseñas no coinciden');
      //return;
    }

    //localStorage.setItem('user', email);
    //localStorage.setItem('password', password);
    //localStorage.setItem('name', name);

    //login(email);
    //navigate('/dashboard');
  //};

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Crear cuenta</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            //required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            //required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            //required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            //type="password"
            //placeholder="Confirmar contraseña"
            //value={confirmPassword}
            //onChange={(e) => setConfirmPassword(e.target.value)}
            //required
            //className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;