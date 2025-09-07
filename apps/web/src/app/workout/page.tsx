import { WorkoutTimer, Card, CardContent, CardHeader, CardTitle, Button } from '@alphavital/ui';
import { Dumbbell, Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WorkoutPage() {
  const handleWorkoutComplete = (totalReps: number, durationMin: number) => {
    console.log('Workout completed:', { totalReps, durationMin });
    // Ici on sauvegarderait les données et redirigerait vers le dashboard
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900">
      {/* Header */}
      <header className="bg-white dark:bg-ink-800 border-b border-ink-200 dark:border-ink-700">
        <div className="site-container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-orange-600" />
                  Séance HIRT
                </h1>
                <p className="text-ink-600 dark:text-ink-300">
                  Entraînement haute intensité en circuit pyramidal
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timer principal */}
            <div className="lg:col-span-2">
              <WorkoutTimer 
                pyramidTop={10}
                onComplete={handleWorkoutComplete}
              />
            </div>

            {/* Informations et conseils */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-accent-600" />
                    Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Règles importantes :</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Aucune pause entre les exercices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Pause seulement entre les rounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Maintenez une intensité élevée</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Respirez profondément</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exercices du circuit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      { 
                        name: 'Swings', 
                        icon: '🏋️',
                        description: 'Kettlebell ou haltère, mouvement explosif des hanches'
                      },
                      { 
                        name: 'Squats', 
                        icon: '🦵',
                        description: 'Poids du corps ou avec charge, descente contrôlée'
                      },
                      { 
                        name: 'Développés militaires', 
                        icon: '💪',
                        description: 'Haltères ou kettlebell, mouvement strict'
                      },
                      { 
                        name: 'Pompes', 
                        icon: '👐',
                        description: 'Classiques ou sur genoux selon votre niveau'
                      },
                    ].map((exercise, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                        <div className="text-2xl">{exercise.icon}</div>
                        <div>
                          <h5 className="font-semibold">{exercise.name}</h5>
                          <p className="text-xs text-ink-600 dark:text-ink-300">
                            {exercise.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Afterburn Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-ink-600 dark:text-ink-300">
                      Après cette séance, votre métabolisme restera élevé pendant 24-48h, 
                      brûlant des calories supplémentaires même au repos.
                    </p>
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                      <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                        💡 Maximisez l'effet en dormant 7-9h et en vous hydratant bien !
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}