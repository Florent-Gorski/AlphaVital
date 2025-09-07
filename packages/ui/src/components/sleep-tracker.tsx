import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Moon, Sun, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { SleepLog } from '@alphavital/types';
import { formatTime } from '@alphavital/utils';

interface SleepTrackerProps {
  data: SleepLog[];
  targetDuration?: number; // en minutes, défaut 480 (8h)
  className?: string;
}

export function SleepTracker({ 
  data, 
  targetDuration = 480, 
  className 
}: SleepTrackerProps) {
  const last7Days = data.slice(-7);
  const avgDuration = last7Days.reduce((sum, day) => sum + (day.durationM || 0), 0) / last7Days.length;
  const avgQuality = last7Days.reduce((sum, day) => sum + (day.quality || 0), 0) / last7Days.length;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins > 0 ? mins.toString().padStart(2, '0') : ''}`;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Moon className="h-5 w-5 text-accent-600" />
          Suivi du sommeil
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Statistiques globales */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-ink-50 dark:bg-ink-800/50 rounded-xl">
            <div className="text-2xl font-bold text-accent-600">
              {formatDuration(Math.round(avgDuration))}
            </div>
            <div className="text-sm text-ink-500">Durée moyenne</div>
          </div>
          <div className="text-center p-4 bg-ink-50 dark:bg-ink-800/50 rounded-xl">
            <div className="text-2xl font-bold text-brand-600">
              {avgQuality.toFixed(1)}/5
            </div>
            <div className="text-sm text-ink-500">Qualité moyenne</div>
          </div>
        </div>

        {/* Progression vers l'objectif */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Objectif de sommeil</span>
            <span>{Math.round((avgDuration / targetDuration) * 100)}%</span>
          </div>
          <Progress value={(avgDuration / targetDuration) * 100} />
        </div>

        {/* Historique 7 jours */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">7 derniers jours</h4>
          <div className="space-y-2">
            {last7Days.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">
                    {day.date.toLocaleDateString('fr-FR', { 
                      weekday: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  {day.bedtime && (
                    <div className="flex items-center gap-1 text-xs text-ink-500">
                      <Moon className="h-3 w-3" />
                      {formatTime(day.bedtime)}
                    </div>
                  )}
                  {day.wakeTime && (
                    <div className="flex items-center gap-1 text-xs text-ink-500">
                      <Sun className="h-3 w-3" />
                      {formatTime(day.wakeTime)}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {day.durationM && (
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3" />
                      {formatDuration(day.durationM)}
                    </div>
                  )}
                  {day.quality && (
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            star <= day.quality! 
                              ? "bg-brand-400" 
                              : "bg-ink-200 dark:bg-ink-600"
                          )}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}