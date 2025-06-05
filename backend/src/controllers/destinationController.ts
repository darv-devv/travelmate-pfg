// src/controllers/destinationsController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDestinations = async (req: Request, res: Response) => {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: [
        { popularity: 'desc' },
        { rating: 'desc' }
      ],
      take: 50
    });

    res.json({
      success: true,
      data: destinations
    });
  } catch (error) {
    console.error('Error getDestinations:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

export const getRecentTrips = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        destination: {
          select: {
            name: true,
            country: true,
            imageUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    const formattedTrips = trips.map(trip => ({
      id: trip.id,
      destination: `${trip.destination.name}, ${trip.destination.country}`,
      date: trip.startDate.toISOString().split('T')[0],
      status: trip.status,
      image: trip.destination.imageUrl || `https://via.placeholder.com/300x200/3B82F6/ffffff?text=${trip.destination.name}`
    }));

    res.json({
      success: true,
      data: formattedTrips
    });
  } catch (error) {
    console.error('Error getRecentTrips:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};
