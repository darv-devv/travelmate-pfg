"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var authMiddleware = function (req, res, next) {
    // Middleware temporal sin JWT para que funcione
    req.user = { id: 'test-user', email: 'test@test.com' };
    next();
};
exports.authMiddleware = authMiddleware;
