"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/scripts/seedDatabase.ts
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var prisma = new client_1.PrismaClient();
var destinations = [
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
var sampleUsers = [
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
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var createdDestinations, createdUsers, sampleTrips, createdTrips, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, 8, 10]);
                    console.log('🌱 Iniciando seed de la base de datos...');
                    // Limpiar datos existentes
                    console.log('🧹 Limpiando datos existentes...');
                    return [4 /*yield*/, prisma.trip.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.destination.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 3:
                    _a.sent();
                    // Crear destinos
                    console.log('🌍 Creando destinos...');
                    return [4 /*yield*/, Promise.all(destinations.map(function (dest) {
                            return prisma.destination.create({ data: dest });
                        }))];
                case 4:
                    createdDestinations = _a.sent();
                    console.log("\u2705 ".concat(createdDestinations.length, " destinos creados"));
                    // Crear usuarios de ejemplo
                    console.log('👥 Creando usuarios de ejemplo...');
                    return [4 /*yield*/, Promise.all(sampleUsers.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var hashedPassword;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bcrypt.hash(user.password, 10)];
                                    case 1:
                                        hashedPassword = _a.sent();
                                        return [2 /*return*/, prisma.user.create({
                                                data: __assign(__assign({}, user), { password: hashedPassword })
                                            })];
                                }
                            });
                        }); }))];
                case 5:
                    createdUsers = _a.sent();
                    console.log("\u2705 ".concat(createdUsers.length, " usuarios creados"));
                    // Crear algunos viajes de ejemplo
                    console.log('✈️ Creando viajes de ejemplo...');
                    sampleTrips = [
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
                    return [4 /*yield*/, Promise.all(sampleTrips.map(function (trip) {
                            return prisma.trip.create({ data: trip });
                        }))];
                case 6:
                    createdTrips = _a.sent();
                    console.log("\u2705 ".concat(createdTrips.length, " viajes creados"));
                    console.log('🎉 Seed completado exitosamente!');
                    console.log("\n\uD83D\uDCCA Resumen:\n   - ".concat(createdDestinations.length, " destinos\n   - ").concat(createdUsers.length, " usuarios\n   - ").concat(createdTrips.length, " viajes\n\n\uD83D\uDC64 Usuarios de prueba:\n   - ana@example.com / password123\n   - carlos@example.com / password123\n   - maria@example.com / password123\n    "));
                    return [3 /*break*/, 10];
                case 7:
                    error_1 = _a.sent();
                    console.error('❌ Error durante el seed:', error_1);
                    throw error_1;
                case 8: return [4 /*yield*/, prisma.$disconnect()];
                case 9:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    });
}
// Ejecutar seed si se llama directamente
if (require.main === module) {
    seedDatabase()
        .then(function () {
        console.log('✅ Seed completado');
        process.exit(0);
    })
        .catch(function (error) {
        console.error('❌ Error en seed:', error);
        process.exit(1);
    });
}
exports.default = seedDatabase;
