'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Input, 
  Label,
  ToggleGroup,
  ToggleGroupItem,
  Slider,
  Checkbox,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@alphavital/ui';
import { ArrowRight, User, Target, Clock, Moon, Thermometer } from 'lucide-react';
import Link from 'next/link';
import { OnboardingSchema, OnboardingData, defaultOnboardingValues } from '@/lib/schemas';
import { cn } from '@alphavital/ui';

const GOAL_OPTIONS = [
  { id: "fat_loss", label: "Perdre du gras", icon: "🔥" },
  { id: "muscle", label: "Gagner du muscle", icon: "💪" },
  { id: "energy", label: "Augmenter l'énergie", icon: "⚡" },
  { id: "sleep", label: "Mieux dormir", icon: "😴" },
];

const TIME_OPTIONS = [
  { id: "15-20", label: "15-20 minutes", desc: "Sessions courtes" },
  { id: "25-30", label: "25-30 minutes", desc: "Recommandé" },
  { id: "45-60", label: "45-60 minutes", desc: "Sessions longues" },
  { id: "variable", label: "Ça dépend", desc: "Flexible" },
];

export default function OnboardingPage() {
  const form = useForm<OnboardingData>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: defaultOnboardingValues,
  });

  const { watch, formState: { isValid } } = form;
  const watchedGoals = watch('goals');
  const watchedTimeAvailable = watch('timeAvailable');
  const watchedSleepDuration = watch('sleepDurationMin');

  const formatSleepDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins > 0 ? mins.toString().padStart(2, '0') : ''}`;
  };

  const onSubmit = (data: OnboardingData) => {
    console.log('Onboarding data:', data);
    // Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'onboarding_goals_updated', {
        goals: data.goals,
      });
      (window as any).gtag('event', 'onboarding_sleep_config_updated', {
        bedtime: data.bedtimeTarget,
        duration: data.sleepDurationMin,
      });
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-900 py-12">
      <div className="site-container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Personnalisez votre parcours</h1>
          <p className="lead">
            Configurons ensemble votre programme AlphaVital selon vos objectifs et contraintes.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-ink-500 mb-2">
            <span>Configuration personnalisée</span>
            <span>{watchedGoals.length > 0 && watchedTimeAvailable ? '100%' : '50%'}</span>
          </div>
          <div className="w-full bg-ink-200 dark:bg-ink-700 rounded-full h-2">
            <div 
              className="bg-accent-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: watchedGoals.length > 0 && watchedTimeAvailable ? '100%' : '50%' }} 
            />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations de base */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-accent-600" />
                    Informations de base
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Âge</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="45" 
                              min="18" 
                              max="80"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="heightCm"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taille (cm)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="175" 
                              min="150" 
                              max="220"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weightKg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poids actuel (kg)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="85" 
                              min="50" 
                              max="200"
                              step="0.1"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="targetWeightKg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poids objectif (kg)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="75" 
                              min="50" 
                              max="200"
                              step="0.1"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Objectifs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent-600" />
                    Vos objectifs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quel est votre objectif principal ? (plusieurs choix possibles)</FormLabel>
                        <FormControl>
                          <ToggleGroup
                            type="multiple"
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid gap-3 sm:grid-cols-2"
                          >
                            {GOAL_OPTIONS.map(opt => (
                              <ToggleGroupItem
                                key={opt.id}
                                value={opt.id}
                                aria-label={opt.label}
                                className={cn(
                                  "h-16 justify-start rounded-xl border-2 p-4 data-[state=on]:bg-accent-50 data-[state=on]:border-accent-500 dark:data-[state=on]:bg-accent-900/20",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                                  "hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-all duration-200"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{opt.icon}</span>
                                  <span className="font-medium">{opt.label}</span>
                                </div>
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeAvailable"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temps disponible pour l'entraînement</FormLabel>
                        <FormControl>
                          <ToggleGroup
                            type="single"
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid gap-3"
                          >
                            {TIME_OPTIONS.map(opt => (
                              <ToggleGroupItem
                                key={opt.id}
                                value={opt.id}
                                aria-label={opt.label}
                                className={cn(
                                  "h-14 justify-between rounded-xl border-2 p-4 data-[state=on]:bg-accent-50 data-[state=on]:border-accent-500 dark:data-[state=on]:bg-accent-900/20",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2",
                                  "hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-all duration-200"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <Clock className="h-5 w-5 text-accent-600" />
                                  <div className="text-left">
                                    <div className="font-medium">{opt.label}</div>
                                    <div className="text-sm text-ink-500">{opt.desc}</div>
                                  </div>
                                </div>
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Configuration sommeil */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-blue-600" />
                  Configuration de votre sommeil
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="bedtimeTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de coucher souhaitée</FormLabel>
                        <FormControl>
                          <Input
                            type="time"
                            step={300}
                            className="pointer-events-auto"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sleepDurationMin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durée de sommeil visée</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <Slider className="pointer-events-auto"
                                min={360}
                                max={540}
                                step={15}
                                value={[field.value]}
                                onValueChange={(v) => field.onChange(v[0])}
                                className="flex-1"
                              />
                              <span className="w-16 text-right tabular-nums font-medium">
                                {formatSleepDuration(field.value)}
                              </span>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Évaluez votre environnement de sommeil (cochez ce qui est OK)</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="sleepEnv.roomDark"
                      render={({ field }) => (
                        <FormItem>
                          <label className="flex items-center gap-3 rounded-xl border-2 p-4 hover:bg-ink-50 dark:hover:bg-ink-800/50 cursor-pointer transition-colors">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🌑</span>
                              <span>Chambre dans l'obscurité totale</span>
                            </div>
                          </label>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sleepEnv.temp19c"
                      render={({ field }) => (
                        <FormItem>
                          <label className="flex items-center gap-3 rounded-xl border-2 p-4 hover:bg-ink-50 dark:hover:bg-ink-800/50 cursor-pointer transition-colors">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-5 w-5 text-blue-500" />
                              <span>Température ~19°C</span>
                            </div>
                          </label>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sleepEnv.noScreens"
                      render={({ field }) => (
                        <FormItem>
                          <label className="flex items-center gap-3 rounded-xl border-2 p-4 hover:bg-ink-50 dark:hover:bg-ink-800/50 cursor-pointer transition-colors">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">📵</span>
                              <span>Aucun écran dans la chambre</span>
                            </div>
                          </label>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sleepEnv.noiseControlled"
                      render={({ field }) => (
                        <FormItem>
                          <label className="flex items-center gap-3 rounded-xl border-2 p-4 hover:bg-ink-50 dark:hover:bg-ink-800/50 cursor-pointer transition-colors">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">🔇</span>
                              <span>Silence ou bruits blancs</span>
                            </div>
                          </label>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-ink-200 dark:border-ink-700">
              <Button variant="ghost" asChild>
                <Link href="/">
                  Retour
                </Link>
              </Button>
              <Button 
                type="submit"
                variant="brand" 
                disabled={!isValid}
                asChild
              >
                <Link href="/onboarding/complete">
                  Continuer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </form>
        </Form>

        {/* Debug info (dev only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <details>
              <summary className="cursor-pointer font-medium">Debug Form State</summary>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify({ 
                  values: form.getValues(), 
                  errors: form.formState.errors,
                  isValid: form.formState.isValid 
                }, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}