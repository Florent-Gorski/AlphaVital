'use client';

import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Input, 
  Label,
  Switch
} from '@alphavital/ui';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Ruler, 
  Weight, 
  Target,
  Clock,
  Bell,
  Moon,
  Save
} from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    sleepReminder: true,
    workoutReminder: true,
    weeklyReport: true,
    achievements: true,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const profileData = {
      displayName: formData.get('displayName'),
      email: formData.get('email'),
      age: formData.get('age'),
      heightCm: formData.get('heightCm'),
      weightKg: formData.get('weightKg'),
      targetWeightKg: formData.get('targetWeightKg'),
      primaryGoal: formData.get('primaryGoal'),
      timeAvailable: formData.get('timeAvailable'),
      bedtimeTarget: formData.get('bedtimeTarget'),
    };

    try {
      // TODO: Sauvegarder via l'API
      console.log('Profile update:', { profileData, notifications });
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
                <User className="h-6 w-6 text-accent-600" />
                Mon profil
              </h1>
              <p className="text-ink-600 dark:text-ink-300">
                Gérez vos informations personnelles et préférences
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent-600" />
                    Informations personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Nom complet</Label>
                    <Input
                      id="displayName"
                      name="displayName"
                      defaultValue="Jean Dupont"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue="jean.dupont@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Âge</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        defaultValue="45"
                        min="18"
                        max="80"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Objectifs physiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent-600" />
                    Objectifs physiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heightCm">Taille (cm)</Label>
                      <div className="relative">
                        <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                        <Input
                          id="heightCm"
                          name="heightCm"
                          type="number"
                          defaultValue="175"
                          min="150"
                          max="220"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weightKg">Poids actuel (kg)</Label>
                      <div className="relative">
                        <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                        <Input
                          id="weightKg"
                          name="weightKg"
                          type="number"
                          defaultValue="85"
                          min="50"
                          max="200"
                          step="0.1"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetWeightKg">Poids objectif (kg)</Label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <Input
                        id="targetWeightKg"
                        name="targetWeightKg"
                        type="number"
                        defaultValue="75"
                        min="50"
                        max="200"
                        step="0.1"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryGoal">Objectif principal</Label>
                    <select
                      id="primaryGoal"
                      name="primaryGoal"
                      defaultValue="fat-loss"
                      className="w-full h-12 px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
                      required
                    >
                      <option value="fat-loss">Perdre du gras</option>
                      <option value="energy">Retrouver de l'énergie</option>
                      <option value="muscle">Gagner du muscle</option>
                      <option value="health">Améliorer ma santé générale</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Préférences d'entraînement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent-600" />
                    Entraînement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="timeAvailable">Temps disponible par jour</Label>
                    <select
                      id="timeAvailable"
                      name="timeAvailable"
                      defaultValue="25-30"
                      className="w-full h-12 px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
                      required
                    >
                      <option value="15-20">15-20 minutes</option>
                      <option value="25-30">25-30 minutes</option>
                      <option value="45-60">45-60 minutes</option>
                      <option value="variable">Ça dépend des jours</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedtimeTarget">Heure de coucher cible</Label>
                    <div className="relative">
                      <Moon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-ink-400" />
                      <Input
                        id="bedtimeTarget"
                        name="bedtimeTarget"
                        type="time"
                        defaultValue="22:30"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-accent-600" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sleepReminder">Rappels de sommeil</Label>
                        <p className="text-sm text-ink-500">Routine du soir et heure de coucher</p>
                      </div>
                      <Switch
                        id="sleepReminder"
                        checked={notifications.sleepReminder}
                        onCheckedChange={() => handleNotificationChange('sleepReminder')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="workoutReminder">Rappels d'entraînement</Label>
                        <p className="text-sm text-ink-500">Séances HIRT programmées</p>
                      </div>
                      <Switch
                        id="workoutReminder"
                        checked={notifications.workoutReminder}
                        onCheckedChange={() => handleNotificationChange('workoutReminder')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weeklyReport">Rapport hebdomadaire</Label>
                        <p className="text-sm text-ink-500">Résumé de vos progrès</p>
                      </div>
                      <Switch
                        id="weeklyReport"
                        checked={notifications.weeklyReport}
                        onCheckedChange={() => handleNotificationChange('weeklyReport')}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="achievements">Badges et réussites</Label>
                        <p className="text-sm text-ink-500">Notifications de vos succès</p>
                      </div>
                      <Switch
                        id="achievements"
                        checked={notifications.achievements}
                        onCheckedChange={() => handleNotificationChange('achievements')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end gap-4 pt-6 border-t border-ink-200 dark:border-ink-700">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  Annuler
                </Link>
              </Button>
              <Button
                type="submit"
                variant="brand"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Sauvegarde...'
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}