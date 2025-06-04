// src/routes/tripRoutes.ts
import { Router } from 'express';

const router = Router();

// Ruta simple de prueba
router.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Trips endpoint funcionando',
    data: []
  });
});

export default router;