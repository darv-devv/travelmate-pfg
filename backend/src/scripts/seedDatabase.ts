// src/scripts/seedDatabase.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const destinations = [
  {
    name: 'París',
    country: 'Francia',
    description: 'La ciudad del amor y la luz, famosa por la Torre Eiffel, el Louvre y su increíble gastronomía. Un destino romántico por excelencia.',
    imageUrl: '/vertical-shot-beautiful-eiffel-tower-captured-paris-france.jpg',
    latitude: 48.8566,
    longitude: 2.3522,
    category: 'capital'
  },
  {
    name: 'Nueva York',
    country: 'Estados Unidos',
    description: 'La ciudad que nunca duerme, centro financiero mundial con rascacielos icónicos, Broadway y Central Park.',
    imageUrl: '/high-angle-shot-city-buildings-new-york-manhattan.jpg',
    latitude: 40.7128,
    longitude: -74.0060,
    category: 'city'
  },
  {
    name: 'Tokio',
    country: 'Japón',
    description: 'Metrópolis moderna que combina perfectamente tradición japonesa con tecnología de vanguardia.',
    imageUrl: 'https://source.unsplash.com/800x600/?tokyo,japan,city',
    latitude: 35.6762,
    longitude: 139.6503,
    category: 'capital'
  },
  {
    name: 'Barcelona',
    country: 'España',
    description: 'Ciudad mediterránea rica en arte, arquitectura de Gaudí y vida nocturna vibrante.',
    imageUrl: 'https://source.unsplash.com/800x600/?barcelona,spain,sagrada',
    latitude: 41.3851,
    longitude: 2.1734,
    category: 'city'
  },
  {
    name: 'Londres',
    country: 'Reino Unido',
    description: 'Capital histórica con museos mundiales, el Big Ben y una rica cultura teatral.',
    imageUrl: 'https://source.unsplash.com/800x600/?london,bigben,thames',
    latitude: 51.5074,
    longitude: -0.1278,
    category: 'capital'
  },
  {
    name: 'Roma',
    country: 'Italia',
    description: 'La ciudad eterna con el Coliseo, el Vaticano y una historia milenaria.',
    imageUrl: 'https://source.unsplash.com/800x600/?rome,colosseum,italy',
    latitude: 41.9028,
    longitude: 12.4964,
    category: 'capital'
  },
  {
    name: 'Bali',
    country: 'Indonesia',
    description: 'Paraíso tropical con templos antiguos, playas paradisíacas y cultura fascinante.',
    imageUrl: 'https://source.unsplash.com/800x600/?bali,temple,beach',
    latitude: -8.3405,
    longitude: 115.0920,
    category: 'beach'
  },
  {
    name: 'Machu Picchu',
    country: 'Perú',
    description: 'Ciudadela inca en los Andes, una de las nuevas maravillas del mundo.',
    imageUrl: 'https://source.unsplash.com/800x600/?machupicchu,peru,andes',
    latitude: -13.1631,
    longitude: -72.5450,
    category: 'heritage'
  },
  {
    name: 'Dubai',
    country: 'Emiratos Árabes Unidos',
    description: 'Ciudad futurista con rascacielos impresionantes, lujo y desierto.',
    imageUrl: 'https://source.unsplash.com/800x600/?dubai,burjkhalifa,skyscraper',
    latitude: 25.2048,
    longitude: 55.2708,
    category: 'city'
  },
  {
    name: 'Santorini',
    country: 'Grecia',
    description: 'Isla griega con casas blancas, iglesias azules y atardeceres espectaculares.',
    imageUrl: 'https://source.unsplash.com/800x600/?santorini,greece,sunset',
    latitude: 36.3932,
    longitude: 25.4615,
    category: 'island'
  }
];

// Usuario demo principal y usuarios de ejemplo
const sampleUsers = [
  {
    name: 'Demo User',
    email: 'demo@travelmate.com',
    password: 'demo123',
    bio: 'Usuario de demostración para TravelMate',
    location: 'Madrid, España',
    phone: '+34 123 456 789'
  },
  {
    name: 'Ana García',
    email: 'ana@example.com',
    password: 'password123'
  },
  {
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    password: 'password123'
  },
  {
    name: 'María López',
    email: 'maria@example.com',
    password: 'password123'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Limpiar datos existentes
    console.log('🧹 Limpiando datos existentes...');
    await prisma.like.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.friendship.deleteMany();
    await prisma.trip.deleteMany();
    await prisma.destination.deleteMany();
    await prisma.user.deleteMany();

    // Crear destinos
    console.log('🌍 Creando destinos...');
    const createdDestinations = await Promise.all(
      destinations.map(dest => 
        prisma.destination.create({ data: dest })
      )
    );
    console.log(`✅ ${createdDestinations.length} destinos creados`);

    // Crear usuarios (incluyend el demo)
    console.log('👥 Creando usuarios...');
    const createdUsers = await Promise.all(
      sampleUsers.map(async user => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            bio: user.bio || null,
            location: user.location || null,
            phone: user.phone || null
          }
        });
      })
    );
    console.log(`✅ ${createdUsers.length} usuarios creados`);

    // Encontrar el usuario demo para crear sus viajes
    const demoUser = createdUsers.find(user => user.email === 'demo@travelmate.com');

   
    console.log('✈️ Creando viajes de ejemplo...');
    const sampleTrips = [
      // Viaje del usuario demo
      {
        title: 'Mi primer viaje a París',
        description: 'Una semana perfecta descubriendo la ciudad del amor con TravelMate.',
        userId: demoUser!.id,
        destinationId: createdDestinations[0].id, // París
        startDate: new Date('2024-08-15'),
        endDate: new Date('2024-08-22'),
        status: 'completed',
        budget: 2500.00,
        notes: 'Experiencia increíble usando TravelMate para planificar todo'
      },
      {
        title: 'Próxima aventura en Tokio',
        description: 'Planeando mi viaje soñado a Japón para conocer su cultura.',
        userId: demoUser!.id,
        destinationId: createdDestinations[2].id, // Tokio
        startDate: new Date('2025-03-10'),
        endDate: new Date('2025-03-20'),
        status: 'planned',
        budget: 4000.00,
        notes: 'Quiero probar el sushi auténtico y visitar templos tradicionales'
      },
      // Otros 
      {
        title: 'Escapada romántica a París',
        description: 'Una semana perfecta recorriendo los lugares más románticos de la ciudad del amor.',
        userId: createdUsers[1].id,
        destinationId: createdDestinations[0].id, // París
        startDate: new Date('2024-08-15'),
        endDate: new Date('2024-08-22'),
        status: 'completed',
        budget: 2500.00,
        notes: 'No olvidar visitar la Torre Eiffel al atardecer'
      },
      {
        title: 'Aventura en Nueva York',
        description: 'Explorando la Gran Manzana: Broadway, Central Park y rascacielos.',
        userId: createdUsers[1].id,
        destinationId: createdDestinations[1].id, // Nueva York
        startDate: new Date('2024-12-10'),
        endDate: new Date('2024-12-17'),
        status: 'planned',
        budget: 3200.00,
        notes: 'Reservar entradas para Broadway con anticipación'
      },
      {
        title: 'Cultura japonesa en Tokio',
        description: 'Inmersión cultural en la capital japonesa: templos, sushi y tecnología.',
        userId: createdUsers[2].id,
        destinationId: createdDestinations[2].id, // Tokio
        startDate: new Date('2024-10-05'),
        endDate: new Date('2024-10-15'),
        status: 'ongoing',
        budget: 4000.00,
        notes: 'Aprender algunas frases básicas en japonés'
      },
      {
        title: 'Arte y arquitectura en Barcelona',
        description: 'Descubriendo las obras de Gaudí y la cultura catalana.',
        userId: createdUsers[3].id,
        destinationId: createdDestinations[3].id, // Barcelona
        startDate: new Date('2024-09-20'),
        endDate: new Date('2024-09-27'),
        status: 'completed',
        budget: 1800.00,
        notes: 'Visita obligatoria a la Sagrada Familia'
      },
      {
        title: 'Relax tropical en Bali',
        description: 'Retiro espiritual en templos y playas paradisíacas.',
        userId: createdUsers[2].id,
        destinationId: createdDestinations[6].id, // Bali
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-01-20'),
        status: 'planned',
        budget: 2800.00,
        notes: 'Llevar ropa cómoda para yoga y meditación'
      }
    ];

    const createdTrips = await Promise.all(
      sampleTrips.map(trip => 
        prisma.trip.create({ data: trip })
      )
    );
    console.log(`✅ ${createdTrips.length} viajes creados`);

    // ============================================
    // SEED SOCIAL MEDIA DATA
    // ============================================
    console.log('📱 Creando usuarios para social media...');
    
    // Crear usuarios sociales (usando el schema correcto)
    const socialUsers = [
      {
        name: 'Alex Rodriguez',
        email: 'alex@social.com',
        password: await bcrypt.hash('password123', 10),
        bio: 'Full-stack developer 💻 | Coffee addict ☕',
        location: 'Madrid, España',
        totalTrips: 12,
        completedTrips: 8,
        plannedTrips: 4,
        countriesVisited: 6
      },
      {
        name: 'Sarah Johnson', 
        email: 'sarah@social.com',
        password: await bcrypt.hash('password123', 10),
        bio: 'UI/UX Designer 🎨 | Digital nomad 🌎',
        location: 'Barcelona, España',
        totalTrips: 15,
        completedTrips: 12,
        plannedTrips: 3,
        countriesVisited: 8
      },
      {
        name: 'Mike Chen',
        email: 'mike@social.com', 
        password: await bcrypt.hash('password123', 10),
        bio: 'Photographer 📸 | Travel enthusiast ✈️',
        location: 'Valencia, España',
        totalTrips: 20,
        completedTrips: 18,
        plannedTrips: 2,
        countriesVisited: 12
      }
    ];

    const createdSocialUsers = await Promise.all(
      socialUsers.map(user => 
        prisma.user.create({ data: user })
      )
    );
    console.log(`✅ ${createdSocialUsers.length} usuarios sociales creados`);

    // Crear posts (usando el schema correcto)
    console.log('📝 Creando posts...');
    const posts = [
      {
        userId: createdSocialUsers[0].id,
        content: '🚀 Just shipped a new feature! The feeling when everything works on the first try is unmatched. #coding #webdev',
        imageUrl: 'https://picsum.photos/600/400?random=1',
        location: 'Madrid, España'
      },
      {
        userId: createdSocialUsers[1].id,
        content: '✨ New UI design for a fintech app. Clean, minimal, and user-friendly. What do you think?',
        imageUrl: 'https://picsum.photos/600/400?random=3',
        location: 'Barcelona, España'
      },
      {
        userId: createdSocialUsers[2].id,
        content: '📸 Golden hour in Valencia. Sometimes the best shots are the unexpected ones.',
        imageUrl: 'https://picsum.photos/600/400?random=5',
        location: 'Valencia, España',
        destinationId: createdDestinations[3].id // Barcelona como destino relacionado
      },
      {
        userId: createdSocialUsers[0].id,
        content: 'Working on a new React component library. Open source coming soon! 💻✨'
      },
      {
        userId: createdSocialUsers[1].id,
        content: 'Color theory is everything in design. Here is why I chose this palette 🎨',
        imageUrl: 'https://picsum.photos/600/400?random=4'
      },
      {
        userId: createdSocialUsers[2].id,
        content: '🌍 Just got back from Paris! The Eiffel Tower at sunset was magical ✨',
        imageUrl: 'https://picsum.photos/600/400?random=6',
        destinationId: createdDestinations[0].id // París
      }
    ];

    const createdPosts = await Promise.all(
      posts.map(post => 
        prisma.post.create({ data: post })
      )
    );
    console.log(`✅ ${createdPosts.length} posts creados`);

    // Crear amistades (usando Friendship en lugar de followers)
    console.log('👥 Creando amistades...');
    const friendships = [
      { 
        user1Id: createdSocialUsers[0].id, 
        user2Id: createdSocialUsers[1].id,
        status: 'accepted'
      },
      { 
        user1Id: createdSocialUsers[0].id, 
        user2Id: createdSocialUsers[2].id,
        status: 'accepted'
      },
      { 
        user1Id: createdSocialUsers[1].id, 
        user2Id: createdSocialUsers[2].id,
        status: 'accepted'
      }
    ];

    const createdFriendships = await Promise.all(
      friendships.map(friendship => 
        prisma.friendship.create({ data: friendship })
      )
    );
    console.log(`✅ ${createdFriendships.length} amistades creadas`);

    // Crear comentarios
    console.log('💬 Creando comentarios...');
    const comments = [
      {
        postId: createdPosts[0].id,
        userId: createdSocialUsers[1].id,
        content: 'Congrats! What framework did you use?'
      },
      {
        postId: createdPosts[1].id,
        userId: createdSocialUsers[0].id,
        content: 'Clean design! The color scheme is perfect 👌'
      },
      {
        postId: createdPosts[2].id,
        userId: createdSocialUsers[1].id,
        content: 'Stunning shot! The composition is perfect 📸'
      },
      {
        postId: createdPosts[5].id,
        userId: createdSocialUsers[0].id,
        content: 'Paris is amazing! I want to go back 🇫🇷'
      }
    ];

    const createdComments = await Promise.all(
      comments.map(comment => 
        prisma.comment.create({ data: comment })
      )
    );
    console.log(`✅ ${createdComments.length} comentarios creados`);

    // Crear likes
    console.log('❤️ Creando likes...');
    const likes = [
      { postId: createdPosts[0].id, userId: createdSocialUsers[1].id },
      { postId: createdPosts[0].id, userId: createdSocialUsers[2].id },
      { postId: createdPosts[1].id, userId: createdSocialUsers[0].id },
      { postId: createdPosts[1].id, userId: createdSocialUsers[2].id },
      { postId: createdPosts[2].id, userId: createdSocialUsers[0].id },
      { postId: createdPosts[2].id, userId: createdSocialUsers[1].id },
      { postId: createdPosts[5].id, userId: createdSocialUsers[0].id },
      { postId: createdPosts[5].id, userId: createdSocialUsers[1].id }
    ];

    const createdLikes = await Promise.all(
      likes.map(like => 
        prisma.like.create({ data: like })
      )
    );
    console.log(`✅ ${createdLikes.length} likes creados`);

    console.log('🎉 Seed completado exitosamente!');
    console.log(`
📊 Resumen:
   - ${createdDestinations.length} destinos
   - ${createdUsers.length + createdSocialUsers.length} usuarios totales
   - ${createdTrips.length} viajes
   - ${createdPosts.length} posts
   - ${createdFriendships.length} amistades
   - ${createdComments.length} comentarios
   - ${createdLikes.length} likes

👤 Usuario DEMO:
   - demo@travelmate.com / demo123

👤 Usuarios sociales:
   - alex@social.com / password123
   - sarah@social.com / password123
   - mike@social.com / password123

👤 Otros usuarios de prueba:
   - ana@example.com / password123
   - carlos@example.com / password123
   - maria@example.com / password123

🎯 El usuario demo tiene ${createdTrips.filter(trip => trip.userId === demoUser!.id).length} viajes de ejemplo.
    `);

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar seed si se llama directamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seed completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Error en seed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
