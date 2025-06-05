// src/routes/destinationRoutes.ts
import { Router } from 'express';
import { getDestinations, getRecentTrips } from '../controllers/destinationsController';

const router = Router();

// GET /api/destinations
router.get('/', getDestinations);

// GET /api/destinations/trips/:userId
router.get('/trips/:userId', getRecentTrips);

export default router;
