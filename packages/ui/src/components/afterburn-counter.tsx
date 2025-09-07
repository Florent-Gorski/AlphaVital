'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Flame, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

interface AfterburnCounterProps {
  workoutDate: Date;
  afterburnHours: number;
  className?: string;
}

export function AfterburnCounter({ 
  workoutDate, 
  afterburnHours, 
  className 
}: AfterburnCounterProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const afterburnEnd = new Date(workoutDate.getTime() + afterburnHours * 60 * 60 * 1000);
      const remainingMs = afterburnEnd.getTime() - now.getTime();

      if (remainingMs <= 0) {
        setTimeRemaining(null);
        return;
      }

      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [workoutDate, afterburnHours]);

  if (!timeRemaining) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="text-center py-8">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2">Afterburn terminé</h3>
          <p className="text-ink-600 dark:text-ink-300">
            Votre métabolisme est revenu à la normale
          </p>
        </CardContent>
      </Card>
    );
  }

  const totalMinutes = timeRemaining.hours * 60 + timeRemaining.minutes;
  const progressPercentage = ((afterburnHours * 60 - totalMinutes) / (afterburnHours * 60)) * 100;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Afterburn actif
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Compte à rebours principal */}
        <div className="text-center">
          <div className="text-4xl font-mono font-bold text-orange-500 mb-2">
            {timeRemaining.hours.toString().padStart(2, '0')}:
            {timeRemaining.minutes.toString().padStart(2, '0')}:
            {timeRemaining.seconds.toString().padStart(2, '0')}
          </div>
          <p className="text-sm text-ink-600 dark:text-ink-300">
            Temps restant d'afterburn
          </p>
        </div>

        {/* Barre de progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progression</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Informations sur l'afterburn */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-semibold text-sm">Effet afterburn</span>
          </div>
          <p className="text-xs text-ink-600 dark:text-ink-300 mb-3">
            Votre métabolisme brûle encore des calories supplémentaires grâce à votre séance HIRT.
          </p>
          
          {/* Conseils pendant l'afterburn */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>Hydratez-vous régulièrement</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>Privilégiez les protéines</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Dormez suffisamment</span>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
            <div className="text-lg font-bold text-orange-500">
              {afterburnHours}h
            </div>
            <div className="text-xs text-ink-500">Durée totale</div>
          </div>
          <div className="text-center p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
            <div className="text-lg font-bold text-red-500">
              +25%
            </div>
            <div className="text-xs text-ink-500">Métabolisme</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}