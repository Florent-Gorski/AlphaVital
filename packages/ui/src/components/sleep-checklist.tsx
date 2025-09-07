'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Moon, CheckCircle, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import type { SleepChecklist } from '@alphavital/types';

interface SleepChecklistProps {
  onComplete?: (checklist: SleepChecklist) => void;
  initialData?: Partial<SleepChecklist>;
  bedtimeTarget?: string; // HH:MM format
  className?: string;
}

const CHECKLIST_ITEMS = [
  {
    key: 'noScreens90min' as keyof SleepChecklist,
    label: 'Écrans éteints 90 min avant le coucher',
    description: 'Télé, téléphone, ordinateur, tablette',
    icon: '📱',
    tip: 'La lumière bleue perturbe la production de mélatonine'
  },
  {
    key: 'hotShower2h' as keyof SleepChecklist,
    label: 'Douche chaude 1-2h avant',
    description: 'La baisse de température corporelle favorise l\'endormissement',
    icon: '🚿',
    tip: 'L\'effet rafraîchissant après la douche signale au corps qu\'il est temps de dormir'
  },
  {
    key: 'readingRoutine' as keyof SleepChecklist,
    label: 'Routine relaxante (lecture, respiration)',
    description: '15-30 minutes d\'activité calme',
    icon: '📖',
    tip: 'Créez un rituel qui signale à votre cerveau qu\'il est temps de se détendre'
  },
  {
    key: 'room19degrees' as keyof SleepChecklist,
    label: 'Chambre à 19°C maximum',
    description: 'Température fraîche pour un sommeil optimal',
    icon: '🌡️',
    tip: 'Une chambre trop chaude perturbe les cycles de sommeil profond'
  },
  {
    key: 'totalDarkness' as keyof SleepChecklist,
    label: 'Obscurité totale',
    description: 'Rideaux occultants, masque de nuit si nécessaire',
    icon: '🌑',
    tip: 'Même une petite lumière peut réduire la qualité du sommeil'
  },
  {
    key: 'phoneOutside' as keyof SleepChecklist,
    label: 'Téléphone hors de la chambre',
    description: 'Ou en mode avion avec réveil séparé',
    icon: '📵',
    tip: 'Évitez la tentation de consulter votre téléphone la nuit'
  }
];

export function SleepChecklist({ 
  onComplete, 
  initialData = {}, 
  bedtimeTarget,
  className 
}: SleepChecklistProps) {
  const [checklist, setChecklist] = useState<SleepChecklist>({
    noScreens90min: initialData.noScreens90min ?? false,
    hotShower2h: initialData.hotShower2h ?? false,
    readingRoutine: initialData.readingRoutine ?? false,
    room19degrees: initialData.room19degrees ?? false,
    totalDarkness: initialData.totalDarkness ?? false,
    phoneOutside: initialData.phoneOutside ?? false,
  });

  const completedItems = Object.values(checklist).filter(Boolean).length;
  const totalItems = Object.keys(checklist).length;
  const completionRate = (completedItems / totalItems) * 100;

  const handleToggle = (key: keyof SleepChecklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleComplete = () => {
    onComplete?.(checklist);
  };

  const getTimeUntilBedtime = () => {
    if (!bedtimeTarget) return null;
    
    const now = new Date();
    const [hours, minutes] = bedtimeTarget.split(':').map(Number);
    const bedtime = new Date();
    bedtime.setHours(hours, minutes, 0, 0);
    
    // Si l'heure de coucher est passée, c'est pour demain
    if (bedtime <= now) {
      bedtime.setDate(bedtime.getDate() + 1);
    }
    
    const diffMs = bedtime.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours: diffHours, minutes: diffMinutes };
  };

  const timeUntilBedtime = getTimeUntilBedtime();

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-accent-600" />
          Checklist du sanctuaire de sommeil
        </CardTitle>
        {bedtimeTarget && timeUntilBedtime && (
          <div className="flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
            <Clock className="h-4 w-4" />
            <span>
              Coucher dans {timeUntilBedtime.hours}h{timeUntilBedtime.minutes.toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression</span>
            <span>{completedItems}/{totalItems} ({Math.round(completionRate)}%)</span>
          </div>
          <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent-400 to-accent-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        {/* Items de la checklist */}
        <div className="space-y-4">
          {CHECKLIST_ITEMS.map((item) => (
            <div
              key={item.key}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200",
                checklist[item.key]
                  ? "border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-900/20"
                  : "border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{item.icon}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor={item.key}
                      className={cn(
                        "font-semibold cursor-pointer",
                        checklist[item.key] && "text-brand-700 dark:text-brand-300"
                      )}
                    >
                      {item.label}
                    </Label>
                    <Switch
                      id={item.key}
                      checked={checklist[item.key]}
                      onCheckedChange={() => handleToggle(item.key)}
                    />
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-300">
                    {item.description}
                  </p>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      💡 {item.tip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Score et encouragements */}
        <div className="p-4 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className={cn(
              "h-6 w-6",
              completionRate >= 80 ? "text-brand-600" : "text-ink-400"
            )} />
            <h3 className="font-semibold">
              {completionRate >= 100 ? "Sanctuaire parfait !" :
               completionRate >= 80 ? "Excellent travail !" :
               completionRate >= 60 ? "Bon début !" :
               "Chaque étape compte !"}
            </h3>
          </div>
          <p className="text-sm text-ink-600 dark:text-ink-300">
            {completionRate >= 100 ? "Votre environnement est optimal pour un sommeil réparateur." :
             completionRate >= 80 ? "Vous êtes sur la bonne voie pour un sommeil de qualité." :
             completionRate >= 60 ? "Continuez, chaque habitude améliore votre sommeil." :
             "Commencez par 2-3 éléments, puis ajoutez progressivement les autres."}
          </p>
        </div>

        {/* Bouton de validation */}
        {onComplete && (
          <Button 
            onClick={handleComplete}
            variant="brand"
            className="w-full"
            disabled={completedItems === 0}
          >
            Valider ma routine du soir
          </Button>
        )}
      </CardContent>
    </Card>
  );
}