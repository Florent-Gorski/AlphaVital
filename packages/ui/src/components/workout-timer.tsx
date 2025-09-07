'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import { cn } from '../lib/utils';

interface WorkoutTimerProps {
  pyramidTop: number;
  onComplete?: (totalReps: number, durationMin: number) => void;
  className?: string;
}

const exercises = [
  { key: 'SWING', name: 'Swings', icon: '🏋️' },
  { key: 'SQUAT', name: 'Squats', icon: '🦵' },
  { key: 'PRESS', name: 'Développés militaires', icon: '💪' },
  { key: 'PUSHUP', name: 'Pompes', icon: '👐' },
];

export function WorkoutTimer({ pyramidTop, onComplete, className }: WorkoutTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalReps, setTotalReps] = useState(0);

  // Générer la séquence pyramidale (1 -> pyramidTop -> 1)
  const pyramidSequence = [
    ...Array.from({ length: pyramidTop }, (_, i) => i + 1),
    ...Array.from({ length: pyramidTop - 1 }, (_, i) => pyramidTop - 1 - i),
  ];

  const currentReps = pyramidSequence[currentRound - 1] || 0;
  const totalRounds = pyramidSequence.length;
  const isComplete = currentRound > totalRounds;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isComplete) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isComplete]);

  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete(totalReps, Math.floor(timeElapsed / 60));
    }
  }, [isComplete, totalReps, timeElapsed, onComplete]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  
  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      // Fin du round, passer au suivant
      setTotalReps(prev => prev + currentReps * exercises.length);
      setCurrentExercise(0);
      setCurrentRound(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentRound(1);
    setCurrentExercise(0);
    setTimeElapsed(0);
    setTotalReps(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold mb-2">Séance terminée !</h3>
          <div className="space-y-2 text-ink-600 dark:text-ink-300">
            <p>Durée : {formatTime(timeElapsed)}</p>
            <p>Total répétitions : {totalReps}</p>
            <p>Pyramide {pyramidTop} complétée</p>
          </div>
          <Button onClick={handleReset} className="mt-4">
            Nouvelle séance
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-accent-600" />
          HIRT - Pyramide {pyramidTop}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timer et contrôles */}
        <div className="text-center space-y-4">
          <div className="text-4xl font-mono font-bold text-accent-600">
            {formatTime(timeElapsed)}
          </div>
          <div className="flex justify-center gap-2">
            {!isRunning ? (
              <Button onClick={handleStart} variant="brand">
                <Play className="h-4 w-4 mr-2" />
                {timeElapsed === 0 ? 'Commencer' : 'Reprendre'}
              </Button>
            ) : (
              <Button onClick={handlePause} variant="ghost">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={handleReset} variant="outline" size="icon">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progression */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Round {currentRound}/{totalRounds}</span>
            <span>{Math.round((currentRound / totalRounds) * 100)}%</span>
          </div>
          <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent-400 to-accent-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            />
          </div>
        </div>

        {/* Exercice actuel */}
        <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 rounded-xl">
          <div className="text-4xl mb-2">
            {exercises[currentExercise].icon}
          </div>
          <h3 className="text-xl font-bold mb-2">
            {exercises[currentExercise].name}
          </h3>
          <div className="text-3xl font-bold text-accent-600 mb-4">
            {currentReps} répétitions
          </div>
          <Button 
            onClick={handleNextExercise}
            disabled={!isRunning}
            variant="brand"
            className="w-full"
          >
            Exercice terminé
          </Button>
        </div>

        {/* Séquence pyramidale */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">Séquence pyramidale</h4>
          <div className="flex flex-wrap gap-1">
            {pyramidSequence.map((reps, index) => (
              <div
                key={index}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  index + 1 === currentRound
                    ? "bg-accent-600 text-white"
                    : index + 1 < currentRound
                    ? "bg-brand-200 text-brand-800"
                    : "bg-ink-200 text-ink-600"
                )}
              >
                {reps}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}