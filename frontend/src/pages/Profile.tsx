import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juanperez@email.com');
  const [bio, setBio] = useState('Amante de los viajes y la fotografía.');

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200 flex justify-center items-center px-4">
      <div className="max-w-5xl mx-auto bg-white bg-opacity-10 rounded-xl shadow-lg backdrop-blur-md p-8">
        
        {/* Header  */}
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Perfil de {name}</h1>
          <p className="text-black 2-xl">{bio}</p>
        </section>

        {/* Sección info personal a editar*/}
        <section className="mb-12 bg-white bg-opacity-20 rounded-lg p-6 shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 border-b border-purple-300 pb-2">Información Personal</h2>
          <form className="space-y-4 max-w-md">
            <div>
              <label className="block mb-1 font-medium">Nombre completo</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-md p-2 text-black"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bio</label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full rounded-md p-2 text-black resize-none"
                rows={3}
              />
            </div>
            <button
              type="button"
              className="bg-orange-200 hover:bg-yellow-500 px-5 py-2 rounded-md font-semibold transition"
              onClick={() => alert('Perfil actualizado')}
            >
              Guardar cambios
            </button>
          </form>
        </section>

        {/* Sección amigos */}
        <section className="mb-12 bg-white bg-opacity-20 rounded-lg p-6 shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 border-b border-purple-300 pb-2">Amigos</h2>
          <p>Sección en construcción... Aquí iría la lista de amigos.</p>
        </section>

        {/* Sección publicaciones */}
        <section className="bg-white bg-opacity-20 rounded-lg p-6 shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 border-b border-purple-300 pb-2">Publicaciones</h2>
          <p>Sección en construcción... Aquí irían las publicaciones del usuario.</p>
        </section>
      </div>
    </div>
  );
};

export default Profile;