// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUserProfile, updateUserProfile, getUserStats } from '../controllers/userController';

const router = Router();

// GET /api/users/:userId/profile
router.get('/:userId/profile', getUserProfile);

// PUT /api/users/:userId/profile
router.put('/:userId/profile', updateUserProfile);

// GET /api/users/:userId/stats
router.get('/:userId/stats', getUserStats);

export default router;
