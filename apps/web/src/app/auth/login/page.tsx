'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@alphavital/ui';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // TODO: Implémenter l'authentification réelle
      console.log('Login attempt:', { email, password });
      
      // Simulation d'une connexion réussie
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="mt-2 text-ink-600 dark:text-ink-300">
            Accédez à votre tableau de bord AlphaVital
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="votre@email.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Votre mot de passe"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink-400 hover:text-ink-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-ink-300 text-accent-600 focus:ring-accent-500"
                  />
                  <span className="ml-2 text-sm text-ink-600 dark:text-ink-300">
                    Se souvenir de moi
                  </span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-accent-600 hover:text-accent-700"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                variant="brand"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Connexion...'
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-sm text-ink-600 dark:text-ink-300">
            Pas encore de compte ?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-accent-600 hover:text-accent-700"
            >
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-ink-500 hover:text-ink-700"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}