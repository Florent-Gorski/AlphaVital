'use client';

import { useState } from 'react';
import { HormoneTestForm, HormoneRadar, Card, CardContent, CardHeader, CardTitle, Button } from '@alphavital/ui';
import { ArrowLeft, Activity, TrendingUp, Target } from 'lucide-react';
import Link from 'next/link';
import { calculateHormoneScores, generatePersonalizedRecommendations } from '@alphavital/utils';
import type { HormoneScores } from '@alphavital/types';

export default function HormoneTestPage() {
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<{
    scores: HormoneScores;
    priorityOrder: Array<keyof HormoneScores>;
    summary: string;
    recommendations: Record<string, string[]>;
  } | null>(null);

  const handleTestComplete = (answers: Record<string, boolean>) => {
    const result = calculateHormoneScores(answers);
    const recommendations = generatePersonalizedRecommendations(result.scores, result.priorityOrder);
    
    setResults({
      ...result,
      recommendations
    });
    setTestCompleted(true);
    
    // TODO: Sauvegarder les résultats via l'API
    console.log('Test completed:', { answers, result, recommendations });
  };

  const handleRetakeTest = () => {
    setTestCompleted(false);
    setResults(null);
  };

  if (!testCompleted || !results) {
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
                  <Activity className="h-6 w-6 text-green-600" />
                  Test hormonal AlphaVital
                </h1>
                <p className="text-ink-600 dark:text-ink-300">
                  Identifiez vos déséquilibres hormonaux en 5 minutes
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="site-container py-8">
          <div className="max-w-4xl mx-auto">
            <HormoneTestForm onComplete={handleTestComplete} />
            
            {/* Info sur le test */}
            <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
              <h3 className="font-semibold mb-3 text-green-900 dark:text-green-100">
                Comment fonctionne ce test ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800 dark:text-green-200">
                <div>
                  <h4 className="font-medium mb-2">🧬 4 duos hormonaux évalués</h4>
                  <ul className="space-y-1">
                    <li>• Cortisol/Mélatonine (stress & sommeil)</li>
                    <li>• Insuline/Glucagon (glycémie & énergie)</li>
                    <li>• Testostérone/Œstrogène (force & motivation)</li>
                    <li>• Ghréline/Leptine (faim & satiété)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📊 Analyse personnalisée</h4>
                  <ul className="space-y-1">
                    <li>• Score de 0 à 5 par duo hormonal</li>
                    <li>• Priorisation automatique des actions</li>
                    <li>• Recommandations spécifiques</li>
                    <li>• Plan d'action sur mesure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
                  <Activity className="h-6 w-6 text-green-600" />
                  Résultats de votre test hormonal
                </h1>
                <p className="text-ink-600 dark:text-ink-300">
                  Votre profil personnalisé et plan d'action
                </p>
              </div>
            </div>
            <Button onClick={handleRetakeTest} variant="outline">
              Refaire le test
            </Button>
          </div>
        </div>
      </header>

      <main className="site-container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Colonne gauche - Radar et résumé */}
            <div className="space-y-6">
              <HormoneRadar scores={results.scores} />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent-600" />
                    Analyse de votre profil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-br from-accent-50 to-brand-50 dark:from-accent-900/20 dark:to-brand-900/20 rounded-xl">
                      <p className="text-sm leading-relaxed">{results.summary}</p>
                    </div>
                    
                    {/* Scores détaillés */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Scores par duo hormonal</h4>
                      {results.priorityOrder.map((hormone, index) => {
                        const score = results.scores[hormone];
                        const isHighPriority = score >= 3;
                        
                        return (
                          <div key={hormone} className="flex items-center justify-between p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0 ? 'bg-red-500 text-white' :
                                index === 1 ? 'bg-orange-500 text-white' :
                                index === 2 ? 'bg-yellow-500 text-white' :
                                'bg-green-500 text-white'
                              }`}>
                                {index + 1}
                              </div>
                              <span className="font-medium">
                                {hormone === 'testoOestro' ? 'Testostérone/Œstrogène' :
                                 hormone === 'ghrelineLeptine' ? 'Ghréline/Leptine' :
                                 hormone === 'cortisolMelatonine' ? 'Cortisol/Mélatonine' :
                                 'Insuline/Glucagon'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${
                                isHighPriority ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {score}/5
                              </span>
                              {isHighPriority && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                  Priorité
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Colonne droite - Recommandations */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent-600" />
                    Plan d'action personnalisé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(results.recommendations).map(([category, tips]) => (
                      <div key={category} className="space-y-3">
                        <h4 className="font-semibold text-accent-700 dark:text-accent-300">
                          {category}
                        </h4>
                        <ul className="space-y-2">
                          {tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 flex-shrink-0" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Prochaines étapes */}
              <Card>
                <CardHeader>
                  <CardTitle>Prochaines étapes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <h4 className="font-semibold mb-2">1. Commencez par le plus important</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-300">
                        Concentrez-vous sur votre priorité #1 pendant 2-3 semaines avant d'ajouter d'autres changements.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <h4 className="font-semibold mb-2">2. Intégrez le sommeil</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-300">
                        Un bon sommeil améliore tous les déséquilibres hormonaux. Priorisez votre routine nocturne.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                      <h4 className="font-semibold mb-2">3. Ajoutez le HIRT</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-300">
                        L'entraînement HIRT optimise naturellement vos hormones. Commencez dès que possible.
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-ink-200 dark:border-ink-700">
                    <Button asChild variant="brand" className="w-full">
                      <Link href="/dashboard">
                        Voir mon tableau de bord
                      </Link>
                    </Button>
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