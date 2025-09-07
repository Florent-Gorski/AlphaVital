import { Button, Card, CardContent, CardHeader, CardTitle } from '@alphavital/ui';
import { CheckCircle, ArrowRight, Target, Moon, Activity, Dumbbell } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingCompletePage() {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900 py-12">
      <div className="site-container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-brand-100 dark:bg-brand-900/40 rounded-full flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-brand-600" />
          </div>
          <h1 className="mb-4">Félicitations ! Votre profil est configuré</h1>
          <p className="lead">
            Vous êtes maintenant prêt à commencer votre transformation avec AlphaVital. 
            Voici votre plan personnalisé.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-ink-500 mb-2">
            <span>Configuration terminée</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
            <div className="bg-brand-600 h-2 rounded-full transition-all duration-300" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Résumé du profil */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-accent-600" />
              Votre profil AlphaVital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-ink-700 dark:text-ink-200">Objectif principal</h4>
                  <p className="text-ink-600 dark:text-ink-300">Perdre du gras durablement</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-700 dark:text-ink-200">Temps disponible</h4>
                  <p className="text-ink-600 dark:text-ink-300">25-30 minutes par jour</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-700 dark:text-ink-200">Objectif de poids</h4>
                  <p className="text-ink-600 dark:text-ink-300">85 kg → 75 kg (-10 kg)</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-ink-700 dark:text-ink-200">Heure de coucher cible</h4>
                  <p className="text-ink-600 dark:text-ink-300">22h30 (pour 8h de sommeil)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-700 dark:text-ink-200">Réveil optimal</h4>
                  <p className="text-ink-600 dark:text-ink-300">6h30</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink-700 dark:text-ink-200">Pyramide HIRT</h4>
                  <p className="text-ink-600 dark:text-ink-300">Niveau 8 (progression vers 10)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan d'action */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Étape 1: Sommeil */}
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center">
                <Moon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-center font-semibold mb-3">1. Optimiser le sommeil</h3>
              <ul className="text-sm space-y-2 text-ink-600 dark:text-ink-300">
                <li>• Routine de coucher à 22h30</li>
                <li>• Checklist sanctuaire quotidienne</li>
                <li>• Suivi qualité 7j/7</li>
                <li>• Objectif: 8h par nuit</li>
              </ul>
              <Button asChild variant="ghost" size="sm" className="w-full mt-4">
                <Link href="/sleep">Commencer</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Étape 2: Test hormonal */}
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-center font-semibold mb-3">2. Test hormonal</h3>
              <ul className="text-sm space-y-2 text-ink-600 dark:text-ink-300">
                <li>• Évaluation 4 duos hormonaux</li>
                <li>• Plan d'action personnalisé</li>
                <li>• Recommandations prioritaires</li>
                <li>• Suivi évolution mensuelle</li>
              </ul>
              <Button asChild variant="ghost" size="sm" className="w-full mt-4">
                <Link href="/hormone-test">Faire le test</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Étape 3: HIRT */}
          <Card>
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/40 rounded-xl flex items-center justify-center">
                <Dumbbell className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-center font-semibent mb-3">3. Entraînement HIRT</h3>
              <ul className="text-sm space-y-2 text-ink-600 dark:text-ink-300">
                <li>• 3 séances par semaine</li>
                <li>• Pyramide niveau 8</li>
                <li>• 4 exercices seulement</li>
                <li>• Afterburn 24-48h</li>
              </ul>
              <Button asChild variant="ghost" size="sm" className="w-full mt-4">
                <Link href="/workout">Première séance</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Prochaines étapes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vos prochaines étapes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Ce soir (22h30)</h4>
                  <p className="text-sm text-ink-600 dark:text-ink-300">
                    Commencez votre routine de coucher. Nous vous enverrons un rappel à 21h00.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Demain matin</h4>
                  <p className="text-sm text-ink-600 dark:text-ink-300">
                    Faites votre test hormonal (10 minutes) pour identifier vos priorités.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Dans 2-3 jours</h4>
                  <p className="text-sm text-ink-600 dark:text-ink-300">
                    Première séance HIRT quand vous vous sentez prêt. Commencez doucement !
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA principal */}
        <div className="text-center">
          <Button asChild variant="brand" size="lg" className="mb-4">
            <Link href="/dashboard">
              Accéder à mon tableau de bord
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-ink-500">
            Vous pouvez modifier ces paramètres à tout moment dans vos préférences.
          </p>
        </div>

        {/* Encouragement */}
        <div className="mt-12 p-6 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 rounded-xl text-center">
          <h3 className="font-semibold mb-2 text-brand-900 dark:text-brand-100">
            🎯 Votre transformation commence maintenant !
          </h3>
          <p className="text-sm text-brand-800 dark:text-brand-200">
            Avec AlphaVital, vous avez tous les outils pour réussir. Restez régulier, 
            soyez patient, et les résultats suivront. Nous sommes là pour vous accompagner !
          </p>
        </div>
      </div>
    </div>
  );
}