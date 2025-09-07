import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button,
  Progress
} from '@alphavital/ui';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  Award,
  Moon,
  Activity,
  Dumbbell,
  Target,
  Flame,
  Clock
} from 'lucide-react';
import Link from 'next/link';

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900">
      {/* Header */}
      <header className="bg-white dark:bg-ink-800 border-b border-ink-200 dark:border-ink-700">
        <div className="site-container py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-accent-600" />
                Statistiques et progrès
              </h1>
              <p className="text-ink-600 dark:text-ink-300">
                Analysez votre évolution et vos performances
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Vue d'ensemble */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink-500">Jours actifs</p>
                    <p className="text-2xl font-bold text-accent-600">28</p>
                  </div>
                  <Calendar className="h-8 w-8 text-accent-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink-500">Streak actuel</p>
                    <p className="text-2xl font-bold text-brand-600">12 jours</p>
                  </div>
                  <Award className="h-8 w-8 text-brand-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink-500">Séances HIRT</p>
                    <p className="text-2xl font-bold text-orange-600">24</p>
                  </div>
                  <Dumbbell className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ink-500">Badges gagnés</p>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                  </div>
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Progression sommeil */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-blue-600" />
                  Progression sommeil (30 jours)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">8h12</div>
                    <div className="text-sm text-ink-500">Durée moyenne</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">4.2/5</div>
                    <div className="text-sm text-ink-500">Qualité moyenne</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Objectif durée (8h)</span>
                      <span>102%</span>
                    </div>
                    <Progress value={102} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Régularité coucher</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Checklist sanctuaire</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <h4 className="font-semibold mb-2">🎯 Amélioration</h4>
                  <p className="text-sm text-ink-600 dark:text-ink-300">
                    +45 minutes de sommeil en moyenne par rapport au mois dernier. 
                    Continuez à respecter votre routine !
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Progression entraînement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-orange-600" />
                  Progression HIRT (30 jours)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">Niveau 10</div>
                    <div className="text-sm text-ink-500">Pyramide max</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">1,240</div>
                    <div className="text-sm text-ink-500">Total répétitions</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Objectif séances (3/semaine)</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Intensité moyenne (RPE)</span>
                      <span>7.8/10</span>
                    </div>
                    <Progress value={78} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Afterburn 36h+</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} />
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                  <h4 className="font-semibold mb-2">🔥 Performance</h4>
                  <p className="text-sm text-ink-600 dark:text-ink-300">
                    Progression de 3 niveaux de pyramide ce mois-ci. 
                    Votre force et endurance s'améliorent !
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Équilibre hormonal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Évolution hormonale
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                    <div>
                      <span className="font-medium">Cortisol/Mélatonine</span>
                      <div className="flex items-center gap-2 text-sm text-ink-500">
                        <span>4/5 → 2/5</span>
                        <span className="text-green-600">↓ -2</span>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">Amélioré</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                    <div>
                      <span className="font-medium">Insuline/Glucagon</span>
                      <div className="flex items-center gap-2 text-sm text-ink-500">
                        <span>3/5 → 2/5</span>
                        <span className="text-green-600">↓ -1</span>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">Amélioré</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                    <div>
                      <span className="font-medium">Testostérone/Œstrogène</span>
                      <div className="flex items-center gap-2 text-sm text-ink-500">
                        <span>3/5 → 3/5</span>
                        <span className="text-ink-400">→ 0</span>
                      </div>
                    </div>
                    <div className="text-ink-500 font-bold">Stable</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                    <div>
                      <span className="font-medium">Ghréline/Leptine</span>
                      <div className="flex items-center gap-2 text-sm text-ink-500">
                        <span>2/5 → 1/5</span>
                        <span className="text-green-600">↓ -1</span>
                      </div>
                    </div>
                    <div className="text-green-600 font-bold">Amélioré</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <h4 className="font-semibold mb-2">📈 Bilan</h4>
                  <p className="text-sm text-ink-600 dark:text-ink-300">
                    3 duos hormonaux sur 4 se sont améliorés grâce à votre régularité. 
                    Prochain test recommandé dans 2 semaines.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Badges et réussites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Badges récents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg text-center">
                    <div className="text-2xl mb-1">✨</div>
                    <div className="text-xs font-semibold">Semaine parfaite</div>
                    <div className="text-xs text-ink-500">Il y a 2 jours</div>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg text-center">
                    <div className="text-2xl mb-1">🔺</div>
                    <div className="text-xs font-semibold">Pyramide 10</div>
                    <div className="text-xs text-ink-500">Il y a 5 jours</div>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg text-center">
                    <div className="text-2xl mb-1">⚖️</div>
                    <div className="text-xs font-semibold">Équilibre retrouvé</div>
                    <div className="text-xs text-ink-500">Il y a 1 semaine</div>
                  </div>

                  <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs font-semibold">Champion régularité</div>
                    <div className="text-xs text-ink-500">Il y a 2 semaines</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Prochains objectifs</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>🏔️ Pyramide ultime (niveau 15)</span>
                      <span className="text-ink-500">10/15</span>
                    </div>
                    <Progress value={67} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>👑 Maître du sommeil (30 nuits)</span>
                      <span className="text-ink-500">12/30</span>
                    </div>
                    <Progress value={40} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résumé mensuel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent-600" />
                Résumé du mois
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 rounded-xl">
                  <Flame className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                  <div className="text-2xl font-bold mb-1">720h</div>
                  <div className="text-sm text-ink-500 mb-2">Afterburn total</div>
                  <div className="text-xs text-orange-600">≈ 3,600 calories bonus</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <Clock className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                  <div className="text-2xl font-bold mb-1">246h</div>
                  <div className="text-sm text-ink-500 mb-2">Sommeil total</div>
                  <div className="text-xs text-blue-600">+12h vs mois dernier</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-500" />
                  <div className="text-2xl font-bold mb-1">92%</div>
                  <div className="text-sm text-ink-500 mb-2">Score global</div>
                  <div className="text-xs text-green-600">+15 points ce mois</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}