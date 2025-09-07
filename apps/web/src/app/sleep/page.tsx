'use client';

import { useState } from 'react';
import { 
  SleepTracker, 
  SleepChecklist, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button,
  Input,
  Label
} from '@alphavital/ui';
import { ArrowLeft, Moon, Plus, Calendar, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import type { SleepLog, SleepChecklist as SleepChecklistType } from '@alphavital/types';

// Mock data - à remplacer par de vraies données
const mockSleepData: SleepLog[] = [
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

export default function SleepPage() {
  const [showAddLog, setShowAddLog] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  const handleChecklistComplete = (checklist: SleepChecklistType) => {
    console.log('Checklist completed:', checklist);
    setShowChecklist(false);
    // TODO: Sauvegarder la checklist
  };

  const handleAddSleepLog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const sleepLog = {
      date: new Date(formData.get('date') as string),
      bedtime: formData.get('bedtime') ? new Date(`${formData.get('date')}T${formData.get('bedtime')}`) : undefined,
      wakeTime: formData.get('wakeTime') ? new Date(`${formData.get('date')}T${formData.get('wakeTime')}`) : undefined,
      quality: formData.get('quality') ? parseInt(formData.get('quality') as string) : undefined,
      notes: formData.get('notes') as string || undefined,
    };
    
    console.log('New sleep log:', sleepLog);
    setShowAddLog(false);
    // TODO: Sauvegarder via l'API
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
                  <Moon className="h-6 w-6 text-blue-600" />
                  Suivi du sommeil
                </h1>
                <p className="text-ink-600 dark:text-ink-300">
                  Optimisez votre récupération et vos hormones
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowChecklist(true)}
                variant="ghost"
              >
                <Moon className="h-4 w-4 mr-2" />
                Checklist du soir
              </Button>
              <Button 
                onClick={() => setShowAddLog(true)}
                variant="brand"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une nuit
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Checklist overlay */}
          {showChecklist && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <SleepChecklist 
                  onComplete={handleChecklistComplete}
                  bedtimeTarget="22:30"
                />
                <Button 
                  onClick={() => setShowChecklist(false)}
                  variant="ghost"
                  className="mt-4 w-full"
                >
                  Fermer
                </Button>
              </div>
            </div>
          )}

          {/* Add log overlay */}
          {showAddLog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-md w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent-600" />
                    Ajouter une nuit de sommeil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddSleepLog} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input 
                        id="date" 
                        name="date" 
                        type="date" 
                        defaultValue={new Date().toISOString().split('T')[0]}
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bedtime">Heure de coucher</Label>
                        <Input 
                          id="bedtime" 
                          name="bedtime" 
                          type="time" 
                          defaultValue="22:30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="wakeTime">Heure de réveil</Label>
                        <Input 
                          id="wakeTime" 
                          name="wakeTime" 
                          type="time" 
                          defaultValue="06:30"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quality">Qualité du sommeil (1-5)</Label>
                      <select 
                        id="quality" 
                        name="quality"
                        className="w-full h-12 px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="1">1 - Très mauvais</option>
                        <option value="2">2 - Mauvais</option>
                        <option value="3">3 - Correct</option>
                        <option value="4">4 - Bon</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes (optionnel)</Label>
                      <textarea 
                        id="notes" 
                        name="notes"
                        rows={3}
                        placeholder="Réveils nocturnes, rêves, sensation au réveil..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 resize-none"
                      />
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <Button 
                        type="button"
                        onClick={() => setShowAddLog(false)}
                        variant="ghost"
                        className="flex-1"
                      >
                        Annuler
                      </Button>
                      <Button type="submit" variant="brand" className="flex-1">
                        Enregistrer
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne principale - Tracker */}
            <div className="lg:col-span-2">
              <SleepTracker data={mockSleepData} />
            </div>

            {/* Colonne droite - Conseils et objectifs */}
            <div className="space-y-6">
              {/* Objectifs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent-600" />
                    Vos objectifs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">Heure de coucher</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">22h30</p>
                    <p className="text-sm text-ink-600 dark:text-ink-300">
                      Pour 8h de sommeil optimal
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Moon className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">Durée cible</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">8h00</p>
                    <p className="text-sm text-ink-600 dark:text-ink-300">
                      Réveil naturel vers 6h30
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Conseils du jour */}
              <Card>
                <CardHeader>
                  <CardTitle>Conseil du jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
                      <h4 className="font-semibold mb-2">💡 Température optimale</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-300">
                        Maintenez votre chambre entre 18-19°C. Une température fraîche 
                        favorise l'endormissement et améliore la qualité du sommeil profond.
                      </p>
                    </div>
                    
                    <div className="text-xs text-ink-500 space-y-1">
                      <p>• Ouvrez la fenêtre 30 min avant le coucher</p>
                      <p>• Utilisez des draps légers en coton</p>
                      <p>• Évitez les pyjamas trop chauds</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rappels */}
              <Card>
                <CardHeader>
                  <CardTitle>Rappels activés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                      <div>
                        <p className="font-medium">Routine du soir</p>
                        <p className="text-sm text-ink-500">21h00</p>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                      <div>
                        <p className="font-medium">Couper les écrans</p>
                        <p className="text-sm text-ink-500">21h00</p>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                      <div>
                        <p className="font-medium">Heure de coucher</p>
                        <p className="text-sm text-ink-500">22h15</p>
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
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