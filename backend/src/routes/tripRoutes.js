"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/tripRoutes.ts
var express_1 = require("express");
var router = (0, express_1.Router)();
// Ruta simple de prueba
router.get('/', function (req, res) {
    res.json({
        success: true,
        message: 'Trips endpoint funcionando',
        data: []
    });
});
exports.default = router;
