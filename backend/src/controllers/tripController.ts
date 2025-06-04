// src/controllers/tripController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// GET /api/trips - Obtener viajes del usuario
export const getUserTrips = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        destination: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: { trips }
    });

  } catch (error) {
    console.error('Error obteniendo viajes:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// POST /api/trips - Crear nuevo viaje
export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { title, description, destinationId, startDate, endDate, budget, notes } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    // Validaciones básicas
    if (!title || !destinationId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Campos requeridos: title, destinationId, startDate, endDate'
      });
    }

    // Verificar que el destino existe
    const destination = await prisma.destination.findUnique({
      where: { id: destinationId }
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destino no encontrado'
      });
    }

    // Crear viaje
    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        userId,
        destinationId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: budget ? parseFloat(budget) : null,
        notes,
        status: 'PLANNED'
      },
      include: {
        destination: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Viaje creado exitosamente',
      data: { trip }
    });

  } catch (error) {
    console.error('Error creando viaje:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// GET /api/trips/:id - Obtener viaje específico
export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const trip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId // Solo viajes del usuario autenticado
      },
      include: {
        destination: true
      }
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Viaje no encontrado'
      });
    }

    res.json({
      success: true,
      data: { trip }
    });

  } catch (error) {
    console.error('Error obteniendo viaje:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// PUT /api/trips/:id - Actualizar viaje
export const updateTrip = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;
    const { title, description, startDate, endDate, budget, notes, status } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    // Verificar que el viaje existe y pertenece al usuario
    const existingTrip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId
      }
    });

    if (!existingTrip) {
      return res.status(404).json({
        success: false,
        message: 'Viaje no encontrado'
      });
    }

    // Actualizar viaje
    const updatedTrip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(budget !== undefined && { budget: budget ? parseFloat(budget) : null }),
        ...(notes !== undefined && { notes }),
        ...(status && { status }),
        updatedAt: new Date()
      },
      include: {
        destination: true
      }
    });

    res.json({
      success: true,
      message: 'Viaje actualizado exitosamente',
      data: { trip: updatedTrip }
    });

  } catch (error) {
    console.error('Error actualizando viaje:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// DELETE /api/trips/:id - Eliminar viaje
export const deleteTrip = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const tripId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    // Verificar que el viaje existe y pertenece al usuario
    const existingTrip = await prisma.trip.findFirst({
      where: {
        id: tripId,
        userId
      }
    });

    if (!existingTrip) {
      return res.status(404).json({
        success: false,
        message: 'Viaje no encontrado'
      });
    }

    // Eliminar viaje
    await prisma.trip.delete({
      where: { id: tripId }
    });

    res.json({
      success: true,
      message: 'Viaje eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error eliminando viaje:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// GET /api/trips/stats - Estadísticas de viajes del usuario
export const getTripStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const [totalTrips, completedTrips, plannedTrips, ongoingTrips] = await Promise.all([
      prisma.trip.count({ where: { userId } }),
      prisma.trip.count({ where: { userId, status: 'COMPLETED' } }),
      prisma.trip.count({ where: { userId, status: 'PLANNED' } }),
      prisma.trip.count({ where: { userId, status: 'ONGOING' } })
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          totalTrips,
          completedTrips,
          plannedTrips,
          ongoingTrips
        }
      }
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};