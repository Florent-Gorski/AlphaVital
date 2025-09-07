import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateWorkoutSessionSchema } from '@alphavital/types';
import { calculateAfterburnHours, calculateTotalReps } from '@alphavital/utils';
import { verifyAuth } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return NextResponse.json(
        { code: 'UNAUTHORIZED', message: 'Non autorisé' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = CreateWorkoutSessionSchema.parse(body);
    
    // Calculer les métriques de la séance
    const totalReps = validatedData.sets.reduce((sum, set) => sum + set.reps, 0);
    const estimatedDuration = Math.round(totalReps * 0.8 + validatedData.sets.length * 2); // Estimation basique
    const afterburnHours = calculateAfterburnHours(
      validatedData.pyramidTop,
      estimatedDuration,
      validatedData.perceivedEff
    );
    
    // Créer la séance d'entraînement
    const workoutSession = await prisma.workoutSession.create({
      data: {
        userId: authResult.userId,
        pyramidTop: validatedData.pyramidTop,
        durationMin: estimatedDuration,
        afterburnH: afterburnHours,
        perceivedEff: validatedData.perceivedEff,
        totalReps,
        notes: validatedData.notes,
        sets: {
          create: validatedData.sets.map((set, index) => ({
            order: index + 1,
            exercise: set.exercise,
            reps: set.reps,
            weightKg: set.weightKg,
          }))
        }
      },
      include: {
        sets: {
          orderBy: { order: 'asc' }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: workoutSession
    });
    
  } catch (error) {
    console.error('Workout session creation error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { code: 'VALIDATION_ERROR', message: 'Données invalides', details: error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authResult = await verifyAuth(request);
    if (!authResult.success) {
      return NextResponse.json(
        { code: 'UNAUTHORIZED', message: 'Non autorisé' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Récupérer les séances d'entraînement de l'utilisateur
    const workoutSessions = await prisma.workoutSession.findMany({
      where: { userId: authResult.userId },
      include: {
        sets: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { date: 'desc' },
      take: limit,
      skip: offset
    });
    
    return NextResponse.json({
      success: true,
      data: workoutSessions
    });
    
  } catch (error) {
    console.error('Workout sessions fetch error:', error);
    
    return NextResponse.json(
      { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}