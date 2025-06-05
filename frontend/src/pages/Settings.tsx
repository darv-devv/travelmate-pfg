// pages/Settings.tsx
import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Estados para los formularios
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: ''
  });

  const [preferencesForm, setPreferencesForm] = useState({
    language: 'es',
    currency: 'EUR',
    notifications: true,
    emailUpdates: true,
    theme: 'light'
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = async (formType: string) => {
    setIsLoading(true);
    
    // Simular guardado - reemplazar con lógica real
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // Lógica para eliminar cuenta
      logout();
    }
  };

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: 'user' },
    { id: 'preferences', name: 'Preferencias', icon: 'settings' },
    { id: 'security', name: 'Seguridad', icon: 'shield' },
    { id: 'notifications', name: 'Notificaciones', icon: 'bell' }
  ];

  const getTabIcon = (iconName: string) => {
    const icons = {
      user: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      settings: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      shield: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bell: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 17H4l5 5v-5zM7 7V4a4 4 0 018 0v3" />
        </svg>
      )
    };
    return icons[iconName as keyof typeof icons] || icons.user;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Configuración
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona tu cuenta y preferencias de TravelMate
          </p>
            </div>
          );
        };
        
        export default Settings;

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800">Configuración guardada correctamente</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border-2 border-amber-300'
                      : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50 border border-transparent'
                  }`}
                >
                  {getTabIcon(tab.icon)}
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-amber-100 p-6">
              
              {/* Tab: Perfil */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Información del Perfil</h2>
                  
                  <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                        <p className="text-sm text-gray-500 mt-2">JPG, PNG o GIF. Máximo 2MB.</p>
                      </div>
                    </div>

                    {/* Formulario */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    export default Settings;

                    {/* Formulario */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                          placeholder="Ciudad, País"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                      <textarea
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        placeholder="Cuéntanos sobre ti y tus experiencias de viaje..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSave('profile')}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
                      >
                        {isLoading && (
                          <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )}
                        <span>Guardar Cambios</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Preferencias */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferencias</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                        <select
                          value={preferencesForm.language}
                          onChange={(e) => setPreferencesForm({...preferencesForm, language: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        >
                          <option value="es">Español</option>
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Moneda</label>
                        <select
                          value={preferencesForm.currency}
                          onChange={(e) => setPreferencesForm({...preferencesForm, currency: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        >
                          <option value="EUR">Euro (€)</option>
                          <option value="USD">Dólar ($)</option>
                          <option value="GBP">Libra (£)</option>
                          <option value="JPY">Yen (¥)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Notificaciones push</h3>
                          <p className="text-sm text-gray-500">Recibe notificaciones en tiempo real</p>
                        </div>
                        <button
                          onClick={() => setPreferencesForm({...preferencesForm, notifications: !preferencesForm.notifications})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferencesForm.notifications ? 'bg-amber-500' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferencesForm.notifications ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Actualizaciones por email</h3>
                          <p className="text-sm text-gray-500">Recibe ofertas y novedades por correo</p>
                        </div>
                        <button
                          onClick={() => setPreferencesForm({...preferencesForm, emailUpdates: !preferencesForm.emailUpdates})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            preferencesForm.emailUpdates ? 'bg-amber-500' : 'bg-gray-300'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferencesForm.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSave('preferences')}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50"
                      >
                        Guardar Preferencias
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Seguridad */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Seguridad</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña actual</label>
                        <input
                          type="password"
                          value={securityForm.currentPassword}
                          onChange={(e) => setSecurityForm({...securityForm, currentPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                        <input
                          type="password"
                          value={securityForm.newPassword}
                          onChange={(e) => setSecurityForm({...securityForm, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar nueva contraseña</label>
                        <input
                          type="password"
                          value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSave('security')}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50"
                      >
                        Cambiar Contraseña
                      </button>
                    </div>

                    {/* Zona peligrosa */}
                    <div className="border-t pt-6 mt-8">
                      <h3 className="text-lg font-semibold text-red-600 mb-4">Zona Peligrosa</h3>
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 mb-2">Eliminar cuenta</h4>
                        <p className="text-sm text-red-600 mb-4">
                          Una vez que elimines tu cuenta, no hay vuelta atrás. Todos tus datos se perderán permanentemente.
                        </p>
                        <button
                          onClick={handleDeleteAccount}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Eliminar mi cuenta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Notificaciones */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notificaciones</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'trips', name: 'Recordatorios de viajes', desc: 'Alertas sobre próximos viajes' },
                      { id: 'offers', name: 'Ofertas especiales', desc: 'Descuentos y promociones' },
                      { id: 'social', name: 'Actividad social', desc: 'Nuevos seguidores y comentarios' },
                      { id: 'updates', name: 'Actualizaciones de la app', desc: 'Nuevas funciones y mejoras' }
                    ].map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{notification.name}</h3>
                          <p className="text-sm text-gray-500">{notification.desc}</p>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-amber-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
