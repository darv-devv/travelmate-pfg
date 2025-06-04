// src/server.ts
import * as express from 'express';
import * as cors from 'cors';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
//import destinationRoutes from './routes/destinationRoutes';


const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Logging básico
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas de salud
app.get('/', (req, res) => {
  res.json({
    message: 'TravelMate API funcionando ✅',
    timestamp: new Date().toISOString(),
    database: 'SQLite'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'TravelMate API - Tu compañero de viajes',
    endpoints: ['/api/auth'],
    timestamp: new Date().toISOString()
  });
});

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
//app.use('/api/destinations', destinationRoutes);

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.originalUrl,
    availableEndpoints: ['/api/auth/register', '/api/auth/login']
  });
});

// Manejo de errores globales
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({
    error: error.message || 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
🚀 TravelMate API iniciada correctamente
📍 Puerto: ${PORT}
🗄️ Base de datos: SQLite (dev.db)
🌐 Frontend: http://localhost:5173
📊 Endpoints disponibles:
   - GET  /api/health
   - POST /api/auth/register
   - POST /api/auth/login
  `);
});

export default app;