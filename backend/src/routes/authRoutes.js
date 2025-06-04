"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var router = (0, express_1.Router)();
// POST /api/auth/register
router.post('/register', authController_1.register);
// POST /api/auth/login
router.post('/login', authController_1.login);
exports.default = router;
