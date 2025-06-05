// src/routes/postsRoutes.ts
import { Router } from 'express';
import { getPosts, createPost, likePost } from '../controllers/postsController';

const router = Router();

// GET /api/posts
router.get('/', getPosts);

// POST /api/posts
router.post('/', createPost);

// POST /api/posts/:postId/like
router.post('/:postId/like', likePost);

export default router;
