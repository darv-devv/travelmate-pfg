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
exports.getTripStats = exports.deleteTrip = exports.updateTrip = exports.getTripById = exports.createTrip = exports.getUserTrips = void 0;
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
// GET /api/trips - Obtener viajes del usuario
var getUserTrips = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, trips, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'Usuario no autenticado'
                        })];
                }
                return [4 /*yield*/, prisma.trip.findMany({
                        where: { userId: userId },
                        include: {
                            destination: true
                        },
                        orderBy: { createdAt: 'desc' }
                    })];
            case 1:
                trips = _b.sent();
                res.json({
                    success: true,
                    data: { trips: trips }
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Error obteniendo viajes:', error_1);
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserTrips = getUserTrips;
// POST /api/trips - Crear nuevo viaje
var createTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, title, description, destinationId, startDate, endDate, budget, notes, destination, trip, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                _a = req.body, title = _a.title, description = _a.description, destinationId = _a.destinationId, startDate = _a.startDate, endDate = _a.endDate, budget = _a.budget, notes = _a.notes;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'Usuario no autenticado'
                        })];
                }
                // Validaciones básicas
                if (!title || !destinationId || !startDate || !endDate) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Campos requeridos: title, destinationId, startDate, endDate'
                        })];
                }
                return [4 /*yield*/, prisma.destination.findUnique({
                        where: { id: destinationId }
                    })];
            case 1:
                destination = _c.sent();
                if (!destination) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: 'Destino no encontrado'
                        })];
                }
                return [4 /*yield*/, prisma.trip.create({
                        data: {
                            title: title,
                            description: description,
                            userId: userId,
                            destinationId: destinationId,
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                            budget: budget ? parseFloat(budget) : null,
                            notes: notes,
                            status: 'PLANNED'
                        },
                        include: {
                            destination: true
                        }
                    })];
            case 2:
                trip = _c.sent();
                res.status(201).json({
                    success: true,
                    message: 'Viaje creado exitosamente',
                    data: { trip: trip }
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _c.sent();
                console.error('Error creando viaje:', error_2);
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createTrip = createTrip;
// GET /api/trips/:id - Obtener viaje específico
var getTripById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tripId, trip, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                tripId = req.params.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'Usuario no autenticado'
                        })];
                }
                return [4 /*yield*/, prisma.trip.findFirst({
                        where: {
                            id: tripId,
                            userId: userId // Solo viajes del usuario autenticado
                        },
                        include: {
                            destination: true
                        }
                    })];
            case 1:
                trip = _b.sent();
                if (!trip) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: 'Viaje no encontrado'
                        })];
                }
                res.json({
                    success: true,
                    data: { trip: trip }
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error('Error obteniendo viaje:', error_3);
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTripById = getTripById;
// PUT /api/trips/:id - Actualizar viaje
var updateTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tripId, _a, title, description, startDate, endDate, budget, notes, status_1, existingTrip, updatedTrip, error_4;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                tripId = req.params.id;
                _a = req.body, title = _a.title, description = _a.description, startDate = _a.startDate, endDate = _a.endDate, budget = _a.budget, notes = _a.notes, status_1 = _a.status;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'Usuario no autenticado'
                        })];
                }
                return [4 /*yield*/, prisma.trip.findFirst({
                        where: {
                            id: tripId,
                            userId: userId
                        }
                    })];
            case 1:
                existingTrip = _c.sent();
                if (!existingTrip) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: 'Viaje no encontrado'
                        })];
                }
                return [4 /*yield*/, prisma.trip.update({
                        where: { id: tripId },
                        data: __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (title && { title: title })), (description && { description: description })), (startDate && { startDate: new Date(startDate) })), (endDate && { endDate: new Date(endDate) })), (budget !== undefined && { budget: budget ? parseFloat(budget) : null })), (notes !== undefined && { notes: notes })), (status_1 && { status: status_1 })), { updatedAt: new Date() }),
                        include: {
                            destination: true
                        }
                    })];
            case 2:
                updatedTrip = _c.sent();
                res.json({
                    success: true,
                    message: 'Viaje actualizado exitosamente',
                    data: { trip: updatedTrip }
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                console.error('Error actualizando viaje:', error_4);
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateTrip = updateTrip;
// DELETE /api/trips/:id - Eliminar viaje
var deleteTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, tripId, existingTrip, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                tripId = req.params.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'Usuario no autenticado'
                        })];
                }
                return [4 /*yield*/, prisma.trip.findFirst({
                        where: {
                            id: tripId,
                            userId: userId
                        }
                    })];
            case 1:
                existingTrip = _b.sent();
                if (!existingTrip) {
                    return [2 /*return*/, res.status(404).json({
                            success: false,
                            message: 'Viaje no encontrado'
                        })];
                }
                // Eliminar viaje
                return [4 /*yield*/, prisma.trip.delete({
                        where: { id: tripId }
                    })];
            case 2:
                // Eliminar viaje
                _b.sent();
                res.json({
                    success: true,
                    message: 'Viaje eliminado exitosamente'
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                console.error('Error eliminando viaje:', error_5);
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteTrip = deleteTrip;
// GET /api/trips/stats - Estadísticas de viajes del usuario
var getTripStats = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, totalTrips, completedTrips, plannedTrips, ongoingTrips, error_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
                if (!userId) {
                    return [2 /*return*/, res.status(401).json({
                            success: false,
                            message: 'Usuario no autenticado'
                        })];
                }
                return [4 /*yield*/, Promise.all([
                        prisma.trip.count({ where: { userId: userId } }),
                        prisma.trip.count({ where: { userId: userId, status: 'COMPLETED' } }),
                        prisma.trip.count({ where: { userId: userId, status: 'PLANNED' } }),
                        prisma.trip.count({ where: { userId: userId, status: 'ONGOING' } })
                    ])];
            case 1:
                _a = _c.sent(), totalTrips = _a[0], completedTrips = _a[1], plannedTrips = _a[2], ongoingTrips = _a[3];
                res.json({
                    success: true,
                    data: {
                        stats: {
                            totalTrips: totalTrips,
                            completedTrips: completedTrips,
                            plannedTrips: plannedTrips,
                            ongoingTrips: ongoingTrips
                        }
                    }
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _c.sent();
                console.error('Error obteniendo estadísticas:', error_6);
                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor'
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getTripStats = getTripStats;

