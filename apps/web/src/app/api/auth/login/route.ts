import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'argon2';
import { PrismaClient } from '@prisma/client';
import { LoginSchema } from '@alphavital/types';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const validatedData = LoginSchema.parse(body);
    
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    
    if (!user) {
      return NextResponse.json(
        { code: 'INVALID_CREDENTIALS', message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }
    
    // Vérifier le mot de passe
    const isValidPassword = await verify(user.passwordHash, validatedData.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { code: 'INVALID_CREDENTIALS', message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }
    
    // Générer le JWT
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    // Retourner les données utilisateur (sans le hash du mot de passe)
    const { passwordHash, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    
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