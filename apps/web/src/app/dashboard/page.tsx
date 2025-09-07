import { 
  SleepTracker, 
  HormoneRadar, 
  AfterburnCounter,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button
} from '@alphavital/ui';
import { 
  Moon, 
  Activity, 
  Dumbbell, 
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';
import Link from 'next/link';

// Mock data - à remplacer par de vraies données
const mockSleepData = [
  { 
    id: '1', 
    userId: 'user1', 
    date: new Date('2024-01-15'), 
    bedtime: new Date('2024-01-14T22:30:00'), 
    wakeTime: new Date('2024-01-15T06:30:00'), 
    durationM: 480, 
    quality: 4 
  },
  { 
    id: '2', 
    userId: 'user1', 
    date: new Date('2024-01-14'), 
    bedtime: new Date('2024-01-13T23:00:00'), 
    wakeTime: new Date('2024-01-14T07:00:00'), 
    durationM: 480, 
    quality: 3 
  },
  { 
    id: '3', 
    userId: 'user1', 
    date: new Date('2024-01-13'), 
    bedtime: new Date('2024-01-12T22:45:00'), 
    wakeTime: new Date('2024-01-13T06:45:00'), 
    durationM: 480, 
    quality: 4 
  },
  { 
    id: '4', 
    userId: 'user1', 
    date: new Date('2024-01-12'), 
    bedtime: new Date('2024-01-11T23:15:00'), 
    wakeTime: new Date('2024-01-12T07:15:00'), 
    durationM: 480, 
    quality: 3 
  },
  { 
    id: '5', 
    userId: 'user1', 
    date: new Date('2024-01-11'), 
    bedtime: new Date('2024-01-10T22:30:00'), 
    wakeTime: new Date('2024-01-11T06:30:00'), 
    durationM: 480, 
    quality: 5 
  },
  { 
    id: '6', 
    userId: 'user1', 
    date: new Date('2024-01-10'), 
    bedtime: new Date('2024-01-09T23:00:00'), 
    wakeTime: new Date('2024-01-10T07:00:00'), 
    durationM: 480, 
    quality: 4 
  },
  { 
    id: '7', 
    userId: 'user1', 
    date: new Date('2024-01-09'), 
    bedtime: new Date('2024-01-08T22:45:00'), 
    wakeTime: new Date('2024-01-09T06:45:00'), 
    durationM: 480, 
    quality: 4 
  },
];

const mockHormoneScores = {
  testoOestro: 3,
  ghrelineLeptine: 2,
  cortisolMelatonine: 4,
  insulineGlucagon: 3,
};

const mockLastWorkout = new Date('2024-01-15T08:00:00');
const mockAfterburnHours = 36;

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900">
      {/* Header */}
      <header className="bg-white dark:bg-ink-800 border-b border-ink-200 dark:border-ink-700">
        <div className="site-container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <p className="text-ink-600 dark:text-ink-300">
                Bonjour ! Voici votre progression aujourd'hui.
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="ghost">
                <Link href="/sleep">
                  <Moon className="h-4 w-4 mr-2" />
                  Sommeil
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/hormone-test">
                  <Activity className="h-4 w-4 mr-2" />
                  Test hormonal
                </Link>
              </Button>
              <Button asChild variant="brand">
                <Link href="/workout">
                  <Dumbbell className="h-4 w-4 mr-2" />
                  Séance HIRT
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        {/* KPIs rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">Sommeil moyen</p>
                  <p className="text-2xl font-bold text-accent-600">8h00</p>
                </div>
                <Moon className="h-8 w-8 text-accent-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">Score hormonal</p>
                  <p className="text-2xl font-bold text-brand-600">3.0/5</p>
                </div>
                <Activity className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">Séances/semaine</p>
                  <p className="text-2xl font-bold text-orange-600">3/3</p>
                </div>
                <Dumbbell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">Streak actuel</p>
                  <p className="text-2xl font-bold text-purple-600">12 jours</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche */}
          <div className="space-y-8">
            <SleepTracker data={mockSleepData} />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-accent-600" />
                  Prochaines actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div>
                    <p className="font-semibold">Routine de coucher</p>
                    <p className="text-sm text-ink-600 dark:text-ink-300">
                      Dans 2h30 - Préparez votre sanctuaire
                    </p>
                  </div>
                  <Button size="sm" variant="ghost">
                    Rappel
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <div>
                    <p className="font-semibold">Séance HIRT</p>
                    <p className="text-sm text-ink-600 dark:text-ink-300">
                      Demain 8h00 - Pyramide 10
                    </p>
                  </div>
                  <Button size="sm" variant="ghost">
                    Planifier
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonne droite */}
          <div className="space-y-8">
            <HormoneRadar scores={mockHormoneScores} />
            
            <AfterburnCounter 
              workoutDate={mockLastWorkout}
              afterburnHours={mockAfterburnHours}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent-600" />
                  Progression cette semaine
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Qualité sommeil</span>
                    <span className="text-sm font-semibold text-green-600">+0.5</span>
                  </div>
                  <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Séances HIRT</span>
                    <span className="text-sm font-semibold text-orange-600">3/3</span>
                  </div>
                  <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Régularité</span>
                    <span className="text-sm font-semibold text-blue-600">85%</span>
                  </div>
                  <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}