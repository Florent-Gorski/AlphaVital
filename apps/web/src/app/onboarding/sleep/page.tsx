import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@alphavital/ui';
import { ArrowRight, ArrowLeft, Moon, Clock, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingSleepPage() {
  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900 py-12">
      <div className="site-container max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Configuration de votre sommeil</h1>
          <p className="lead">
            Définissons ensemble votre routine de sommeil optimale pour maximiser votre récupération.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-ink-500 mb-2">
            <span>Étape 2 sur 3</span>
            <span>66%</span>
          </div>
          <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
            <div className="bg-accent-600 h-2 rounded-full transition-all duration-300" style={{ width: '66%' }} />
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-accent-600" />
              Votre sanctuaire de sommeil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Heure de coucher cible */}
            <div className="space-y-4">
              <Label htmlFor="bedtime-target">À quelle heure souhaitez-vous vous coucher ?</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="bedtime-target" 
                  type="time" 
                  defaultValue="22:30"
                  className="w-32"
                />
                <div className="flex-1 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900 dark:text-blue-100">Recommandation</span>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Pour 8h de sommeil et un réveil à 6h30, couchez-vous vers 22h30. 
                    Nous ajusterons selon vos contraintes.
                  </p>
                </div>
              </div>
            </div>

            {/* Durée de sommeil souhaitée */}
            <div className="space-y-4">
              <Label>Combien d'heures de sommeil visez-vous ?</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '7', label: '7 heures' },
                  { value: '7.5', label: '7h30' },
                  { value: '8', label: '8 heures', recommended: true },
                  { value: '8.5', label: '8h30' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                      option.recommended 
                        ? 'border-brand-300 bg-brand-50 dark:border-brand-600 dark:bg-brand-900/20' 
                        : 'border-ink-200 dark:border-ink-700 hover:border-accent-300 dark:hover:border-accent-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sleep-duration"
                      value={option.value}
                      defaultChecked={option.recommended}
                      className="sr-only"
                    />
                    <span className="font-medium">{option.label}</span>
                    {option.recommended && (
                      <div className="absolute -top-2 -right-2 bg-brand-500 text-white text-xs px-2 py-1 rounded-full">
                        Optimal
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Défis actuels */}
            <div className="space-y-4">
              <Label>Quels sont vos principaux défis de sommeil ? (optionnel)</Label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Difficultés à m\'endormir',
                  'Réveils nocturnes fréquents',
                  'Réveil trop tôt le matin',
                  'Sommeil non réparateur',
                  'Horaires irréguliers',
                  'Stress/pensées qui tournent',
                ].map((challenge) => (
                  <label
                    key={challenge}
                    className="flex items-center p-3 border border-ink-200 dark:border-ink-700 rounded-lg cursor-pointer hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="sleep-challenges"
                      value={challenge}
                      className="mr-3 rounded border-ink-300 text-accent-600 focus:ring-accent-500"
                    />
                    <span>{challenge}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Environnement de sommeil */}
            <div className="space-y-4">
              <Label>Comment évaluez-vous votre environnement de sommeil actuel ?</Label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { aspect: 'Obscurité', options: ['Très sombre', 'Assez sombre', 'Un peu de lumière', 'Trop de lumière'] },
                  { aspect: 'Silence', options: ['Très silencieux', 'Assez calme', 'Quelques bruits', 'Trop bruyant'] },
                  { aspect: 'Température', options: ['Trop froid', 'Frais (idéal)', 'Correct', 'Trop chaud'] },
                ].map((env) => (
                  <div key={env.aspect} className="space-y-2">
                    <Label className="text-sm font-medium">{env.aspect}</Label>
                    <div className="flex gap-2">
                      {env.options.map((option, index) => (
                        <label
                          key={option}
                          className={`flex-1 text-center p-2 text-xs border rounded-lg cursor-pointer transition-colors ${
                            index === 1 
                              ? 'border-brand-300 bg-brand-50 dark:border-brand-600 dark:bg-brand-900/20'
                              : 'border-ink-200 dark:border-ink-700 hover:border-accent-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`env-${env.aspect.toLowerCase()}`}
                            value={option}
                            defaultChecked={index === 1}
                            className="sr-only"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-6 border-t border-ink-200 dark:border-ink-700">
              <div className="flex justify-between">
                <Button variant="ghost" asChild>
                  <Link href="/onboarding">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour
                  </Link>
                </Button>
                <Button variant="brand" asChild>
                  <Link href="/onboarding/complete">
                    Continuer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conseils */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                Le saviez-vous ?
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Un sommeil de qualité est le pilier de votre transformation. Il régule vos hormones 
                de la faim, optimise votre récupération musculaire et améliore votre métabolisme.
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• 7-9h de sommeil = -23% de risque de prise de poids</li>
                <li>• Sommeil régulier = +40% d'efficacité HIRT</li>
                <li>• Chambre à 19°C = +15% de sommeil profond</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}