
# TravelMate

# TravelMate - Red Social de Viajes

> Proyecto Final de Grado - Desarrollo de Aplicaciones Web (DAW)

**TravelMate** es una red social/prototipo de viajes que permite a los usuarios registrarse, iniciar sesión, explorar destinos y planificar viajes. 

## 📋 Descripción del Proyecto

TravelMate es una plataforma social diseñada para viajeros que buscan conectar, compartir experiencias y descubrir nuevos destinos. La aplicación busca proporcionar un entorno seguro y funcional para la gestión de usuarios y contenido relacionado con viajes.

## 🚀 Características Principales

- **Sistema de Autenticación Completo**: Registro y login de usuarios con JWT
- **Interfaz Responsive**: Diseño adaptable a diferentes dispositivos
- **Navegación SPA**: Experiencia de usuario fluida sin recargas de página
- **API RESTful**: Backend con endpoints bien definidos
- **Base de Datos**: Gestión eficiente de datos con Prisma ORM
- **Seguridad**: Protección de rutas y middleware de autenticación

## 🛠️ Stack Tech

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Bundler y servidor de desarrollo
- **React Router v7** - Enrutamiento para SPA
- **TailwindCSS** - Framework de estilos utilitarios
- **Axios** - Cliente HTTP para comunicación con API

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **TypeScript** - Desarrollo tipado en el backend
- **Prisma ORM** - Gestor de base de datos
- **SQLite** - Base de datos para desarrollo
- **JWT** - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Configuración de intercambio de recursos

## 🏗️ Arquitectura del Sistema

```
TravelMate/
├── backend/                 # API REST Node.js + Express
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── middleware/      # Middleware personalizado
│   │   ├── routes/          # Definición de rutas
│   │   ├── scripts/         # Scripts de utilidad
│   │   └── server.ts        # Punto de entrada del servidor
│   ├── prisma/              # Configuración de base de datos
│   └── package.json
│
├── frontend/                # Aplicación React alternativa
│   └── src/
│
├── src/                     # Aplicación React principal
│   ├── components/          # Componentes reutilizables
│   ├── features/           # Características principales (auth)
│   ├── pages/              # Páginas de la aplicación
│   ├── routes/             # Configuración de rutas
│   ├── services/           # Servicios de API
│   └── App.tsx             # Componente principal
│
└── public/                  # Archivos estáticos
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de nuevos usuarios
- `POST /api/auth/login` - Inicio de sesión de usuarios

### Salud del Sistema
- `GET /api/health` - Verificación del estado del servidor

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn
- Git

### 1. Clonar el Repositorio
```bash
git clone https://github.com/darv-devv/travelmate-pfg.git
cd travelmate-pfg
```

### 2. Configuración del Backend
```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar la base de datos (Prisma)
npx prisma generate
npx prisma db push

# Iniciar el servidor de desarrollo
npm run dev
```

El backend estará disponible en: `http://localhost:5000`

### 3. Configuración del Frontend
```bash
# En una nueva terminal, desde la raíz del proyecto
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

### 4. Verificación de la Instalación
1. Abrir `http://localhost:5173` en el navegador
2. Verificar que la aplicación carga correctamente
3. Probar el registro y login de usuarios
4. Confirmar la comunicación frontend-backend

## 🔧 Scripts Disponibles




### Backend
```bash
# Desarrollo
npm run dev      # 🚀 Servidor de desarrollo con recarga automática
npm start        # 🏭 Servidor de producción

# Base de datos
npx prisma generate    # 🔄 Generar cliente Prisma
npx prisma db push     # 📤 Aplicar cambios al schema
npx ts-node src/scripts/seedDatabase.ts  # 🌱 Poblar BD con datos de prueba
```

### Frontend
```bash
# Desarrollo
npm run dev      # ⚡ Servidor de desarrollo Vite
npm start        # 🚀 Alias para desarrollo

# Construcción
npm run build    # 🏗️ Construir para producción
npm run preview  # 👀 Vista previa de la build

# Calidad de código
npm run lint     # 🔍 Análisis de código con ESLint
npm run format   # ✨ Formatear código con Prettier
```

### Comandos Útiles
```bash
# Testing
npm test                   # 🧪 Ejecutar tests
npm run test:coverage      # 📊 Tests con cobertura
npm run test:watch         # 👁️ Tests en modo watch

# Utilidades
npm run type-check         # 🔬 Verificar tipos TypeScript
npm run clean              # 🧹 Limpiar archivos temporales
npm run build:analyze      # 📈 Analizar bundle de producción
```

## 🌐 Configuración de Puertos

- **Frontend**: Puerto 5173 (Vite dev server)
- **Backend**: Puerto 5000 (Express server)
- **Base de Datos**: SQLite local (dev.db)

🌐 Variables de entorno
Frontend (.env)
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_MAPS_API_KEY=tu_google_maps_key
REACT_APP_ENV=development

Backend (.env.server)
PORT=3001
NODE_ENV=development
DATABASE_URL=mysql://user@travelmate.com:password@localhost:3306/travelmate_db
JWT_SECRET=travelmate
CORS_ORIGIN=http://localhost:3000

## 📱 Funcionalidades Implementadas

### Sistema de Autenticación
- Registro de usuarios con validación
- Inicio de sesión seguro
- Protección de rutas privadas
- Gestión de sesiones con JWT
- Logout funcional

### Interfaz de Usuario
- Landing page atractiva
- Dashboard personalizado post-login
- Navegación intuitiva
- Diseño responsive
- Feedback visual de estados

### Backend API
- Endpoints RESTful bien estructurados
- Middleware de autenticación
- Validación de datos
- Manejo de errores
- Configuración CORS

## 🔒 Seguridad

- Encriptación de contraseñas con bcrypt
- Autenticación basada en JWT
- Validación de tokens en rutas protegidas
- Configuración CORS apropiada
- Sanitización de datos de entrada

## 📈 Estado del Proyecto

Este proyecto está en desarrollo activo como parte del Trabajo de Fin de Grado en Desarrollo de Aplicaciones Web. Incluye todas las funcionalidades base para una red social de viajes y está preparado para futuras expansiones.

## 📋 Próximas Funcionalidades

- Sistema de posts y contenido de viajes
- Perfil de usuario completo
- Sistema de seguimiento entre usuarios
- Búsqueda y filtrado de destinos
- Integración con APIs de mapas
- Sistema de reviews y calificaciones

## 👨‍💻 Autor

**Adrian Rodriguez Velaz** - 
- GitHub: [@darv-devv](https://github.com/darv-devv)

## 📄 Licencia

Este proyecto constituye el trabajo de fin de grado de DAW.

---



**Nota**: Este proyecto forma parte del Proyecto Final de Grado en Desarrollo de Aplicaciones Web. La arquitectura y tecnologías seleccionadas reflejan las mejores prácticas actuales en desarrollo fullstack con JavaScript/TypeScript.
