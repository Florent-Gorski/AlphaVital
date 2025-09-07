'use client';

import { useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@alphavital/ui';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    const confirmPassword = formData.get('confirmPassword') as string;
    const displayName = formData.get('displayName') as string;

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Implémenter l'inscription réelle
      console.log('Register attempt:', { email, password, displayName });
      
      // Simulation d'une inscription réussie
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/onboarding');
    } catch (err) {
      setError('Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Créer un compte</h1>
          <p className="mt-2 text-ink-600 dark:text-ink-300">
            Rejoignez AlphaVital et transformez votre corps
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Inscription gratuite</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="displayName">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <Input
                    id="displayName"
                    name="displayName"
                    type="text"
                    required
                    placeholder="Jean Dupont"
                    className="pl-10"
                  />
                </div>
              </div>

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
                    placeholder="Au moins 8 caractères"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Répétez votre mot de passe"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ink-400 hover:text-ink-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded border-ink-300 text-accent-600 focus:ring-accent-500"
                />
                <span className="ml-2 text-sm text-ink-600 dark:text-ink-300">
                  J'accepte les{' '}
                  <Link href="/legal/terms" className="text-accent-600 hover:text-accent-700">
                    conditions d'utilisation
                  </Link>{' '}
                  et la{' '}
                  <Link href="/legal/privacy" className="text-accent-600 hover:text-accent-700">
                    politique de confidentialité
                  </Link>
                </span>
              </div>

              <Button
                type="submit"
                variant="brand"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Création du compte...'
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Login link */}
        <div className="text-center">
          <p className="text-sm text-ink-600 dark:text-ink-300">
            Déjà un compte ?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-accent-600 hover:text-accent-700"
            >
              Se connecter
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