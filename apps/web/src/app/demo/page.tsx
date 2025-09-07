import { Button, SleepTracker, HormoneRadar, WorkoutTimer } from '@alphavital/ui';
import { ArrowRight, Play, Moon, Activity, Dumbbell } from 'lucide-react';
import Link from 'next/link';

// Mock data pour la démo
const mockSleepData = [
  { id: '1', userId: 'demo', date: new Date('2024-01-15'), bedtime: new Date('2024-01-14T22:30:00'), wakeTime: new Date('2024-01-15T06:30:00'), durationM: 480, quality: 4 },
  { id: '2', userId: 'demo', date: new Date('2024-01-14'), bedtime: new Date('2024-01-13T23:00:00'), wakeTime: new Date('2024-01-14T07:00:00'), durationM: 480, quality: 3 },
  { id: '3', userId: 'demo', date: new Date('2024-01-13'), bedtime: new Date('2024-01-12T22:45:00'), wakeTime: new Date('2024-01-13T06:45:00'), durationM: 480, quality: 4 },
  { id: '4', userId: 'demo', date: new Date('2024-01-12'), bedtime: new Date('2024-01-11T23:15:00'), wakeTime: new Date('2024-01-12T07:15:00'), durationM: 480, quality: 3 },
  { id: '5', userId: 'demo', date: new Date('2024-01-11'), bedtime: new Date('2024-01-10T22:30:00'), wakeTime: new Date('2024-01-11T06:30:00'), durationM: 480, quality: 5 },
];

const mockHormoneScores = {
  testoOestro: 3,
  ghrelineLeptine: 2,
  cortisolMelatonine: 4,
  insulineGlucagon: 3,
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900">
      {/* Header */}
      <header className="bg-white dark:bg-ink-800 border-b border-ink-200 dark:border-ink-700">
        <div className="site-container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Démonstration AlphaVital</h1>
              <p className="text-ink-600 dark:text-ink-300">
                Découvrez nos outils de transformation en action
              </p>
            </div>
            <Button asChild variant="brand">
              <Link href="/onboarding">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Introduction */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Votre transformation commence ici
            </h2>
            <p className="text-lg text-ink-600 dark:text-ink-300">
              Explorez nos trois piliers : sommeil optimisé, équilibre hormonal et entraînement HIRT. 
              Chaque outil est conçu pour maximiser vos résultats.
            </p>
          </div>

          {/* Suivi du sommeil */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Moon className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="text-2xl font-bold">Suivi du sommeil</h3>
                <p className="text-ink-600 dark:text-ink-300">
                  Optimisez votre récupération avec un suivi détaillé de votre sommeil
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SleepTracker data={mockSleepData} />
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <h4 className="font-semibold mb-3">Fonctionnalités clés</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      Suivi automatique de la durée et qualité
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      Checklist du sanctuaire de sommeil
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      Analyse des tendances et recommandations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      Rappels personnalisés pour votre routine
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Test hormonal */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Activity className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="text-2xl font-bold">Profil hormonal</h3>
                <p className="text-ink-600 dark:text-ink-300">
                  Identifiez vos déséquilibres et recevez un plan d'action personnalisé
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <HormoneRadar scores={mockHormoneScores} />
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <h4 className="font-semibold mb-3">4 duos hormonaux analysés</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cortisol/Mélatonine</span>
                      <span className="text-sm font-bold text-red-600">4/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Insuline/Glucagon</span>
                      <span className="text-sm font-bold text-orange-600">3/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Testostérone/Œstrogène</span>
                      <span className="text-sm font-bold text-yellow-600">3/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ghréline/Leptine</span>
                      <span className="text-sm font-bold text-green-600">2/5</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-accent-50 dark:bg-accent-900/20 rounded-xl">
                  <p className="text-sm">
                    <strong>Recommandation prioritaire :</strong> Optimisez votre gestion du stress 
                    et votre sommeil. Pratiquez la méditation et respectez une routine de coucher régulière.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Entraînement HIRT */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Dumbbell className="h-8 w-8 text-orange-600" />
              <div>
                <h3 className="text-2xl font-bold">Entraînement HIRT</h3>
                <p className="text-ink-600 dark:text-ink-300">
                  25-30 minutes, 3 fois par semaine pour un afterburn de 24-48h
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WorkoutTimer pyramidTop={8} />
              <div className="space-y-4">
                <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                  <h4 className="font-semibold mb-3">Pourquoi le HIRT ?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      Afterburn effect jusqu'à 48h après l'effort
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      Seulement 4 exercices par séance
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      Progression pyramidale adaptative
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full" />
                      Optimise naturellement les hormones
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <h5 className="font-semibold mb-2">Circuit pyramidal</h5>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Exemple niveau 8 : 1→2→3→4→5→6→7→8→7→6→5→4→3→2→1 répétitions 
                    pour chaque exercice, avec pause entre les rounds.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA final */}
          <div className="text-center py-12 bg-gradient-to-br from-brand-50 to-accent-50 dark:from-brand-900/20 dark:to-accent-900/20 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Prêt à commencer votre transformation ?</h3>
            <p className="text-lg text-ink-600 dark:text-ink-300 mb-6 max-w-2xl mx-auto">
              Rejoignez des milliers d'hommes qui ont déjà repris le contrôle de leur forme 
              et de leur énergie avec AlphaVital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="brand" size="lg">
                <Link href="/onboarding">
                  <Play className="mr-2 h-5 w-5" />
                  Commencer maintenant
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/">
                  Retour à l'accueil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}