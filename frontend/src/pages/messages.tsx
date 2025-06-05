// src/pages/Messages.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext'; 

// Datos para chats 
const demoChats = [
  { id: 1, name: 'Ana Pérez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face', lastMessage: '¡Hola! ¿Cómo estás?', timestamp: '10:30 AM', unread: 2 },
  { id: 2, name: 'Carlos Ruiz', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face', lastMessage: 'Perfecto, nos vemos mañana.', timestamp: 'Ayer', unread: 0 },
  { id: 3, name: 'Laura Gómez', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face', lastMessage: 'Revisa el documento por favor.', timestamp: 'Hace 2 días', unread: 1 },
  { id: 4, name: 'Pedro Martín', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&fit=crop&crop=face', lastMessage: 'Entendido, gracias.', timestamp: '1/6/2025', unread: 0 },
];

const demoMessages: { [key: number]: Array<{id: number, text: string, sender: string, timestamp: string, isMe: boolean}> } = {
  1: [
    { id: 1, text: '¡Hola!', sender: 'Ana Pérez', timestamp: '10:30 AM', isMe: false },
    { id: 2, text: ' Preparando el viaje a París.', sender: 'Yo', timestamp: '10:31 AM', isMe: true },
    { id: 3, text: '¡Qué emoción! Yo también quiero ir pronto.', sender: 'Ana Pérez', timestamp: '10:32 AM', isMe: false },
  ],
  2: [
    { id: 1, text: 'Confirmado el itinerario para Tokio.', sender: 'Carlos Ruiz', timestamp: 'Ayer 09:15 PM', isMe: false },
    { id: 2, text: 'Perfecto, nos vemos mañana.', sender: 'Yo', timestamp: 'Ayer 09:20 PM', isMe: true },
  ],
  3: [
    { id: 1, text: 'Tenemos que confirmar con el hotel aquellas tarifas.', sender: 'Laura Gómez', timestamp: 'Hace 2 días 11:00 AM', isMe: false },
  ],
   4: [
    { id: 1, text: 'Entendido, gracias.', sender: 'Pedro Martín', timestamp: '1/6/2025 02:00 PM', isMe: false },
  ],
};


const Messages: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [selectedChatId, setSelectedChatId] = useState<number | null>(demoChats[0]?.id || null); // Selecciona el primer chat por defecto
  const [currentMessage, setCurrentMessage] = useState('');

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Mis Viajes', path: '/trips', icon: '✈️' },
    { name: 'Explorar', path: '/destination', icon: '🌍' },
    { name: 'Amigos', path: '/friends', icon: '👥' },
    { name: 'Mensajes', path: '/messages', icon: '💬' } // Esta es la página actual
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = () => {
    if (currentMessage.trim() === '' || !selectedChatId) return;
    // Aquí iría la lógica para enviar el mensaje a una API
    // Por ahora sesimula
    console.log(`Enviando a chat ${selectedChatId}: ${currentMessage}`);
    setCurrentMessage('');
  };
  
  const selectedChatDetails = selectedChatId ? demoChats.find(chat => chat.id === selectedChatId) : null;
  const messagesForSelectedChat = selectedChatId ? demoMessages[selectedChatId] || [] : [];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-50 relative">
      {/* Navbar */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <h1 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">Travel</span>
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Mate</span>
              </h1>
            </div>
            <div className="hidden md:flex space-x-4">
              {navigationItems.map((item) => (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:bg-white/50 hover:text-blue-600'}`}>
                  {item.icon} {item.name}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V9.09c0-2.33-1.9-4.09-4.24-4.09S6.52 6.76 6.52 9.09V12l-5 5h5m8 0a3 3 0 01-6 0" /></svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"><span className="text-xs text-white font-bold">3</span></span>
              </button>
              <div className="relative">
                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center space-x-2 p-1 rounded-xl hover:bg-white/50 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">{(user?.name || 'U')[0].toUpperCase()}</span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700">{user?.name || 'Usuario'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'email@example.com'}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-600 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/20">
                      <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuario Demo'}</p><p className="text-sm text-gray-500">{user?.email || 'demo@travelmate.com'}</p>
                    </div>
                    <div className="py-1">
                      <button onClick={() => { navigate('/profile'); setIsProfileMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"> <span className="mr-3">👤</span> Ver Perfil </button>
                      <button onClick={() => { navigate('/settings'); setIsProfileMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"> <span className="mr-3">⚙️</span> Configuración </button>
                      <button onClick={() => { navigate('/help'); setIsProfileMenuOpen(false); }} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-all duration-300"> <span className="mr-3">❓</span> Ayuda </button>
                    </div>
                    <div className="border-t border-white/20 py-1">
                      <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-all duration-300"> <span className="mr-3">🚪</span> Cerrar Sesión </button>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-white/50 rounded-xl transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-white/20">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <button key={item.path} onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/80'}`}>
                  <span>{item.icon}</span><span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {(isMenuOpen || isProfileMenuOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setIsMenuOpen(false); setIsProfileMenuOpen(false); }} />
      )}

      {/* FOndo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-80 -left-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-indigo-400/25 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10"><div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle, #60A5FA 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-50/50 pointer-events-none"></div>
      </div>

      {/* Content message */}
      <div className="relative z-10 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center">
              💬 Mensajes 
            </h2>
          </div>

          {/* Layout main */}
          <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-220px)] md:h-[calc(100vh-240px)]"> {/* Altura ajustada */}
            
            {/*  Sidebar) */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 p-4 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 px-2">Conversaciones</h3>
              <div className="overflow-y-auto flex-grow pr-1"> {/* pr-1 para espacio de scrollbar */}
                {demoChats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`flex items-center p-3 mb-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-blue-100/70
                                ${selectedChatId === chat.id ? 'bg-blue-200/80 shadow-md' : 'hover:shadow-sm'}`}
                  >
                    <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-800 text-sm">{chat.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1">{chat.timestamp}</p>
                      {chat.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ml-auto">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/*  Chat seleccionado */}
            <div className="w-full md:w-2/3 lg:w-3/4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100/50 flex flex-col">
              {selectedChatDetails ? (
                <>
                  {/* Header del chat */}
                  <div className="flex items-center p-4 border-b border-blue-100/50">
                    <img src={selectedChatDetails.avatar} alt={selectedChatDetails.name} className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{selectedChatDetails.name}</h3>
                      <p className="text-xs text-green-500">En línea</p> {/* Ejemplo de estado */}
                    </div>
                  </div>

                  {/* Cuerpo de mensajes */}
                  <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messagesForSelectedChat.map(msg => (
                      <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow ${
                          msg.isMe 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none' 
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.isMe ? 'text-blue-200' : 'text-gray-500'} text-right`}>{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input para nuevo mensaje */}
                  <div className="p-4 border-t border-blue-100/50">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Escribe un mensaje..."
                        className="flex-grow w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        aria-label="Enviar mensaje"
                      >
                        <svg className="w-6 h-6 transform rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11a1 1 0 112 0v5.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  <p className="text-lg">Selecciona un chat para ver los mensajes.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
