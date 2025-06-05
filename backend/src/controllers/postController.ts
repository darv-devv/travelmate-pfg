// src/controllers/postsController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            location: true
          }
        },
        destination: {
          select: {
            name: true,
            country: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        },
        comments: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      user: {
        name: post.user.name,
        avatar: post.user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face`,
        location: post.user.location || 'España'
      },
      content: post.content,
      image: post.imageUrl,
      location: post.location || (post.destination ? `${post.destination.name}, ${post.destination.country}` : 'España'),
      timestamp: post.createdAt,
      likes: post.likes.length,
      comments: post.comments.length
    }));

    res.json({
      success: true,
      data: formattedPosts
    });
  } catch (error) {
    console.error('Error getPosts:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, imageUrl, location, userId } = req.body;

    if (!content || !userId) {
      return res.status(400).json({
        success: false,
        message: 'Contenido y usuario son requeridos'
      });
    }

    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        location,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            location: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Post creado exitosamente',
      data: {
        id: post.id,
        user: {
          name: post.user.name,
          avatar: post.user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face`,
          location: post.user.location || 'España'
        },
        content: post.content,
        image: post.imageUrl,
        location: post.location || 'España',
        timestamp: post.createdAt,
        likes: 0,
        comments: 0
      }
    });
  } catch (error) {
    console.error('Error createPost:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    // Verificar si ya existe un like 
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    });

    if (existingLike) {
      return res.status(400).json({
        success: false,
        message: 'Ya diste like a este post'
      });
    }

    await prisma.like.create({
      data: {
        postId,
        userId
      }
    });

    // Contar likes 
    const likesCount = await prisma.like.count({
      where: { postId }
    });

    res.json({
      success: true,
      message: 'Like agregado',
      data: {
        likes: likesCount
      }
    });
  } catch (error) {
    console.error('Error likePost:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};
