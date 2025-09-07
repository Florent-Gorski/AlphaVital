import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'argon2';
import { PrismaClient } from '@prisma/client';
import { RegisterSchema } from '@alphavital/types';
import { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const validatedData = RegisterSchema.parse(body);
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { code: 'USER_EXISTS', message: 'Un compte existe déjà avec cette adresse email' },
        { status: 409 }
      );
    }
    
    // Hasher le mot de passe
    const passwordHash = await hash(validatedData.password);
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        displayName: validatedData.displayName,
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        createdAt: true,
        locale: true,
        tz: true,
      }
    });
    
    // Générer le JWT
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );
    
    return NextResponse.json({
      success: true,
      data: {
        user,
        token
      }
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    
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