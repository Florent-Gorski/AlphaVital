'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { HORMONE_QUESTIONS, HORMONE_LABELS } from '@alphavital/types';

interface HormoneTestFormProps {
  onComplete: (answers: Record<string, boolean>) => void;
  className?: string;
}

type HormoneDuo = keyof typeof HORMONE_QUESTIONS;

export function HormoneTestForm({ onComplete, className }: HormoneTestFormProps) {
  const [currentDuo, setCurrentDuo] = useState<HormoneDuo>('cortisolMelatonine');
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const duos: HormoneDuo[] = ['cortisolMelatonine', 'insulineGlucagon', 'testoOestro', 'ghrelineLeptine'];
  const currentDuoIndex = duos.indexOf(currentDuo);
  const currentQuestions = HORMONE_QUESTIONS[currentDuo];
  const totalQuestions = Object.values(HORMONE_QUESTIONS).flat().length;
  const answeredQuestions = Object.keys(answers).length;

  const handleAnswer = (answer: boolean) => {
    const questionKey = `${currentDuo.replace(/([A-Z])/g, '_$1').toLowerCase()}_${currentQuestionIndex}`;
    setAnswers(prev => ({ ...prev, [questionKey]: answer }));

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentDuoIndex < duos.length - 1) {
      setCurrentDuo(duos[currentDuoIndex + 1]);
      setCurrentQuestionIndex(0);
    } else {
      // Test terminé
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentDuoIndex > 0) {
      const prevDuo = duos[currentDuoIndex - 1];
      setCurrentDuo(prevDuo);
      setCurrentQuestionIndex(HORMONE_QUESTIONS[prevDuo].length - 1);
    }
  };

  const canGoPrevious = currentDuoIndex > 0 || currentQuestionIndex > 0;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent-600" />
          Test hormonal - {HORMONE_LABELS[currentDuo]}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-ink-500">
            <span>Question {answeredQuestions + 1} sur {totalQuestions}</span>
            <span>{Math.round(progress)}% complété</span>
          </div>
          <Progress value={progress} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Indicateur de duo actuel */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            {duos.map((duo, index) => (
              <div
                key={duo}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index < currentDuoIndex
                    ? "bg-brand-500"
                    : index === currentDuoIndex
                    ? "bg-accent-500"
                    : "bg-ink-200 dark:bg-ink-700"
                )}
              />
            ))}
          </div>
        </div>

        {/* Question actuelle */}
        <div className="text-center space-y-6">
          <div className="p-6 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 rounded-xl">
            <h3 className="text-xl font-semibold mb-4">
              {currentQuestions[currentQuestionIndex]}
            </h3>
            <p className="text-sm text-ink-600 dark:text-ink-300">
              Répondez honnêtement selon votre ressenti des dernières semaines
            </p>
          </div>

          {/* Boutons de réponse */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => handleAnswer(true)}
              variant="outline"
              size="lg"
              className="flex-1 max-w-xs h-16 text-lg border-2 border-red-200 hover:border-red-400 hover:bg-red-50 dark:border-red-800 dark:hover:border-red-600 dark:hover:bg-red-900/20"
            >
              <span className="text-2xl mr-3">😔</span>
              Oui, ça me correspond
            </Button>
            <Button
              onClick={() => handleAnswer(false)}
              variant="outline"
              size="lg"
              className="flex-1 max-w-xs h-16 text-lg border-2 border-green-200 hover:border-green-400 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-600 dark:hover:bg-green-900/20"
            >
              <span className="text-2xl mr-3">😊</span>
              Non, pas vraiment
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-ink-200 dark:border-ink-700">
          <Button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            variant="ghost"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>
          
          <div className="text-sm text-ink-500 self-center">
            Duo {currentDuoIndex + 1}/4
          </div>
          
          <div className="w-24" /> {/* Spacer pour équilibrer */}
        </div>

        {/* Info sur le duo actuel */}
        <div className="p-4 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
          <h4 className="font-semibold mb-2">À propos de {HORMONE_LABELS[currentDuo]}</h4>
          <p className="text-sm text-ink-600 dark:text-ink-300">
            {getDuoDescription(currentDuo)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function getDuoDescription(duo: HormoneDuo): string {
  const descriptions = {
    cortisolMelatonine: 'Le cortisol (hormone du stress) et la mélatonine (hormone du sommeil) régulent votre cycle veille-sommeil et votre réponse au stress.',
    insulineGlucagon: 'L\'insuline et le glucagon contrôlent votre glycémie et votre stockage énergétique. Un déséquilibre peut causer fatigue et prise de poids.',
    testoOestro: 'La testostérone et les œstrogènes influencent votre force, motivation, libido et composition corporelle.',
    ghrelineLeptine: 'La ghréline (hormone de la faim) et la leptine (hormone de satiété) régulent votre appétit et votre métabolisme.'
  };
  
  return descriptions[duo];
}