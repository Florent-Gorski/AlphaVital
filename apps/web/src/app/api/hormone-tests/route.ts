import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { CreateHormoneTestSchema } from '@alphavital/types';
import { calculateHormoneScores, generatePersonalizedRecommendations } from '@alphavital/utils';
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
    const validatedData = CreateHormoneTestSchema.parse(body);
    
    // Calculer les scores et générer le résumé
    const result = calculateHormoneScores(validatedData.answers);
    const recommendations = generatePersonalizedRecommendations(result.scores, result.priorityOrder);
    
    // Créer le test hormonal
    const hormoneTest = await prisma.hormoneTest.create({
      data: {
        userId: authResult.userId,
        scores: result.scores,
        answers: validatedData.answers,
        summary: result.summary,
        priorityOrder: result.priorityOrder,
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        ...hormoneTest,
        recommendations
      }
    });
    
  } catch (error) {
    console.error('Hormone test creation error:', error);
    
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

    // Récupérer les tests hormonaux de l'utilisateur
    const hormoneTests = await prisma.hormoneTest.findMany({
      where: { userId: authResult.userId },
      orderBy: { createdAt: 'desc' },
      take: 10 // Limiter aux 10 derniers tests
    });
    
    return NextResponse.json({
      success: true,
      data: hormoneTests
    });
    
  } catch (error) {
    console.error('Hormone tests fetch error:', error);
    
    return NextResponse.json(
      { code: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}