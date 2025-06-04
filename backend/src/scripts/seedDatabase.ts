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

const sampleUsers = [
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

    // Crear usuarios de ejemplo
    console.log('👥 Creando usuarios de ejemplo...');
    const createdUsers = await Promise.all(
      sampleUsers.map(async user => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return prisma.user.create({
          data: {
            ...user,
            password: hashedPassword
          }
        });
      })
    );
    console.log(`✅ ${createdUsers.length} usuarios creados`);

    // Crear algunos viajes de ejemplo
    console.log('✈️ Creando viajes de ejemplo...');
    const sampleTrips = [
      {
        title: 'Escapada romántica a París',
        description: 'Una semana perfecta recorriendo los lugares más románticos de la ciudad del amor.',
        userId: createdUsers[0].id,
        destinationId: createdDestinations[0].id, // París
        startDate: new Date('2024-08-15'),
        endDate: new Date('2024-08-22'),
        status: 'COMPLETED',
        budget: 2500.00,
        notes: 'No olvidar visitar la Torre Eiffel al atardecer'
      },
      {
        title: 'Aventura en Nueva York',
        description: 'Explorando la Gran Manzana: Broadway, Central Park y rascacielos.',
        userId: createdUsers[0].id,
        destinationId: createdDestinations[1].id, // Nueva York
        startDate: new Date('2024-12-10'),
        endDate: new Date('2024-12-17'),
        status: 'PLANNED',
        budget: 3200.00,
        notes: 'Reservar entradas para Broadway con anticipación'
      },
      {
        title: 'Cultura japonesa en Tokio',
        description: 'Inmersión cultural en la capital japonesa: templos, sushi y tecnología.',
        userId: createdUsers[1].id,
        destinationId: createdDestinations[2].id, // Tokio
        startDate: new Date('2024-10-05'),
        endDate: new Date('2024-10-15'),
        status: 'ONGOING',
        budget: 4000.00,
        notes: 'Aprender algunas frases básicas en japonés'
      },
      {
        title: 'Arte y arquitectura en Barcelona',
        description: 'Descubriendo las obras de Gaudí y la cultura catalana.',
        userId: createdUsers[2].id,
        destinationId: createdDestinations[3].id, // Barcelona
        startDate: new Date('2024-09-20'),
        endDate: new Date('2024-09-27'),
        status: 'COMPLETED',
        budget: 1800.00,
        notes: 'Visita obligatoria a la Sagrada Familia'
      },
      {
        title: 'Relax tropical en Bali',
        description: 'Retiro espiritual en templos y playas paradisíacas.',
        userId: createdUsers[1].id,
        destinationId: createdDestinations[6].id, // Bali
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-01-20'),
        status: 'PLANNED',
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

    console.log('🎉 Seed completado exitosamente!');
    console.log(`
📊 Resumen:
   - ${createdDestinations.length} destinos
   - ${createdUsers.length} usuarios
   - ${createdTrips.length} viajes

👤 Usuarios de prueba:
   - ana@example.com / password123
   - carlos@example.com / password123
   - maria@example.com / password123
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