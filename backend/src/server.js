"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
var express = require("express");
var cors = require("cors");
var authRoutes_1 = require("./routes/authRoutes");
var tripRoutes_1 = require("./routes/tripRoutes");
//import destinationRoutes from './routes/destinationRoutes';
var app = express();
var PORT = 5000;
// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Logging básico
app.use(function (req, res, next) {
    console.log("".concat(new Date().toISOString(), " - ").concat(req.method, " ").concat(req.path));
    next();
});
// Rutas de salud
app.get('/', function (req, res) {
    res.json({
        message: 'TravelMate API funcionando ✅',
        timestamp: new Date().toISOString(),
        database: 'SQLite'
    });
});
app.get('/api/health', function (req, res) {
    res.json({
        status: 'OK',
        message: 'TravelMate API - Tu compañero de viajes',
        endpoints: ['/api/auth'],
        timestamp: new Date().toISOString()
    });
});
// Rutas principales
app.use('/api/auth', authRoutes_1.default);
app.use('/api/trips', tripRoutes_1.default);
//app.use('/api/destinations', destinationRoutes);
// Manejo de errores 404
app.use('*', function (req, res) {
    res.status(404).json({
        error: 'Endpoint no encontrado',
        path: req.originalUrl,
        availableEndpoints: ['/api/auth/register', '/api/auth/login']
    });
});
// Manejo de errores globales
app.use(function (error, req, res, next) {
    console.error('Error:', error);
    res.status(error.status || 500).json({
        error: error.message || 'Error interno del servidor'
    });
});
// Iniciar servidor
app.listen(PORT, function () {
    console.log("\n\uD83D\uDE80 TravelMate API iniciada correctamente\n\uD83D\uDCCD Puerto: ".concat(PORT, "\n\uD83D\uDDC4\uFE0F Base de datos: SQLite (dev.db)\n\uD83C\uDF10 Frontend: http://localhost:5173\n\uD83D\uDCCA Endpoints disponibles:\n   - GET  /api/health\n   - POST /api/auth/register\n   - POST /api/auth/login\n  "));
});
exports.default = app;
