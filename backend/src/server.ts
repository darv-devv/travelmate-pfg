// src/server.ts
import * as express from 'express';
import * as cors from 'cors';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';

//import userRoutes from './routes/userRoutes';
//import postsRoutes from './routes/postsRoutes';
//import destinationRoutes from './routes/destinationRoutes';

console.log('=== SERVER STARTING - TEST LOG ===');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',   // Puerto original
    'http://127.0.0.1:5173',   // Puerto original
    'http://localhost:5175',   // Puerto actual  
    'http://127.0.0.1:5175',   // Puerto actual
    'http://localhost:5174',   
    'http://127.0.0.1:5174',  
 
    'https://*.railway.app'      
  ],
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
//app.use('/api/users', userRoutes);
//app.use('/api/posts', postsRoutes);
//app.use('/api/destinations', destinationRoutes);

// AGREGA ESTO A TU server.ts ANTES DE "Manejo de errores 404"

// ============================================
// ENDPOINTS RÁPIDOS PARA EL FRONTEND
// ============================================

// GET /api/posts/feed - Feed social
app.get('/api/posts/feed', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            location: true
          }
        },
        destination: {
          select: {
            name: true,
            country: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      content: post.content,
      imageUrl: post.imageUrl,
      location: post.location,
      createdAt: post.createdAt,
      user: {
        id: post.user.id,
        name: post.user.name,
        username: post.user.name.toLowerCase().replace(' ', '_'),
        profileImage: post.user.avatar || 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 10),
        location: post.user.location
      },
      destination: post.destination,
      stats: {
        likes: post._count.likes,
        comments: post._count.comments,
        shares: Math.floor(Math.random() * 20)
      },
      isLiked: false,
      timeAgo: getTimeAgo(post.createdAt)
    }));

    res.json({
      success: true,
      posts: formattedPosts
    });
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener posts'
    });
  }
});

// GET /api/users/profile - Perfil del usuario
app.get('/api/users/profile', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    // Obtener el primer usuario social para demo
    const user = await prisma.user.findFirst({
      where: {
        email: {
          contains: '@social.com'
        }
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 6,
          include: {
            _count: {
              select: {
                likes: true,
                comments: true
              }
            }
          }
        },
        trips: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 3,
          include: {
            destination: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const profile = {
      id: user.id,
      name: user.name,
      username: user.name.toLowerCase().replace(' ', '_'),
      bio: user.bio,
      location: user.location,
      profileImage: user.avatar || 'https://i.pravatar.cc/150?img=1',
      coverImage: 'https://picsum.photos/800/300?random=1',
      stats: {
        posts: user.posts.length,
        trips: user.totalTrips,
        countries: user.countriesVisited,
        friends: Math.floor(Math.random() * 500) + 100
      },
      recentPosts: user.posts.map(post => ({
        id: post.id,
        imageUrl: post.imageUrl,
        likes: post._count.likes
      })),
      recentTrips: user.trips.map(trip => ({
        id: trip.id,
        title: trip.title,
        destination: trip.destination?.name,
        status: trip.status
      })),
      joinedDate: user.createdAt
    };

    res.json({
      success: true,
      profile
    });
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener perfil'
    });
  }
});

// GET /api/stats/dashboard - Stats del dashboard
app.get('/api/stats/dashboard', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const stats = {
      totalPosts: await prisma.post.count(),
      totalUsers: await prisma.user.count(),
      totalTrips: await prisma.trip.count(),
      totalDestinations: await prisma.destination.count(),
      recentActivity: [
        { type: 'post', message: 'Nuevo post compartido', time: '2 min ago' },
        { type: 'trip', message: 'Viaje planificado a París', time: '1 hora ago' },
        { type: 'like', message: 'Tu post recibió 5 likes', time: '3 horas ago' }
      ]
    };

    res.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas'
    });
  }
});

// Función helper para calcular tiempo
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}


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
🌐 Frontend: http://localhost:5175
📊 Endpoints disponibles:
   - GET  /api/health
   - POST /api/auth/register
   - POST /api/auth/login
  `);
});

export default app;
