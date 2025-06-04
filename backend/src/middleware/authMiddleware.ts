// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Middleware temporal sin JWT para que funcione
  req.user = { id: 'test-user', email: 'test@test.com' };
  next();
};