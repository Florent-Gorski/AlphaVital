import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

export interface AuthResult {
  success: boolean;
  userId?: string;
  email?: string;
  error?: string;
}

export async function verifyAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, error: 'Token manquant' };
    }
    
    const token = authHeader.substring(7);
    
    const decoded = verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret'
    ) as { userId: string; email: string };
    
    return {
      success: true,
      userId: decoded.userId,
      email: decoded.email
    };
    
  } catch (error) {
    console.error('Auth verification error:', error);
    return { success: false, error: 'Token invalide' };
  }
}

export function createAuthHeaders(token: string): Record<string, string> {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}