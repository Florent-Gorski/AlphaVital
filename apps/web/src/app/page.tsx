import { Button } from '@alphavital/ui';
import { ArrowRight, Moon, Activity, Dumbbell, Target } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero py-20 md:py-32">
        <div className="site-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6">
              Transformez votre corps après 40 ans avec la méthode{' '}
              <span className="text-gradient">AlphaVital</span>
            </h1>
            <p className="lead mb-8 max-w-2xl mx-auto text-white/95 drop-shadow-md">
              Perdez du gras durablement grâce à notre approche scientifique combinant 
              sommeil optimisé, équilibre hormonal et entraînement HIRT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="brand" size="lg">
                <Link href="/onboarding">
                  Commencer ma transformation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/demo">
                  Voir la démonstration
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-ink-800">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Une méthode complète en 3 piliers</h2>
            <p className="lead max-w-2xl mx-auto">
              Notre approche holistique s'attaque aux vraies causes de la prise de poids après 40 ans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Sommeil */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center">
                <Moon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-4">Sommeil Optimisé</h3>
              <p className="text-ink-600 dark:text-ink-300 mb-6">
                Créez votre sanctuaire de sommeil et maîtrisez les routines qui régénèrent 
                vos hormones naturellement.
              </p>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Routine de coucher personnalisée
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Optimisation de l'environnement
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  Suivi qualité 7j/7
                </li>
              </ul>
            </div>

            {/* Hormones */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-4">Équilibre Hormonal</h3>
              <p className="text-ink-600 dark:text-ink-300 mb-6">
                Identifiez vos déséquilibres hormonaux et recevez un plan d'action 
                personnalisé pour les corriger.
              </p>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  Test des 4 duos hormonaux
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  Plan d'action priorisé
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  Suivi évolution
                </li>
              </ul>
            </div>

            {/* HIRT */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/40 rounded-2xl flex items-center justify-center">
                <Dumbbell className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="mb-4">Entraînement HIRT</h3>
              <p className="text-ink-600 dark:text-ink-300 mb-6">
                25-30 minutes, 3 fois par semaine. Un afterburn qui brûle des calories 
                jusqu'à 48h après l'effort.
              </p>
              <ul className="text-sm space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  Circuit pyramidal guidé
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  4 exercices seulement
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full" />
                  Afterburn jusqu'à 48h
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-ink-50 dark:bg-ink-900">
        <div className="site-container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Des résultats mesurables</h2>
            <p className="lead max-w-2xl mx-auto">
              Notre méthode scientifique vous permet de suivre vos progrès en temps réel.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white dark:bg-ink-800 rounded-2xl shadow-elevated">
              <div className="text-3xl font-bold text-accent-600 mb-2">7-9h</div>
              <div className="text-sm text-ink-500">Sommeil optimal</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-ink-800 rounded-2xl shadow-elevated">
              <div className="text-3xl font-bold text-brand-600 mb-2">4 duos</div>
              <div className="text-sm text-ink-500">Hormones équilibrées</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-ink-800 rounded-2xl shadow-elevated">
              <div className="text-3xl font-bold text-orange-600 mb-2">25-30min</div>
              <div className="text-sm text-ink-500">Séances HIRT</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-ink-800 rounded-2xl shadow-elevated">
              <div className="text-3xl font-bold text-purple-600 mb-2">48h</div>
              <div className="text-sm text-ink-500">Afterburn max</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-ink-800">
        <div className="site-container">
          <div className="max-w-3xl mx-auto text-center">
            <Target className="h-16 w-16 mx-auto mb-6 text-accent-600" />
            <h2 className="mb-4">Prêt à transformer votre corps ?</h2>
            <p className="lead mb-8">
              Rejoignez des milliers d'hommes qui ont déjà repris le contrôle de leur forme 
              et de leur énergie avec AlphaVital.
            </p>
            <Button asChild variant="brand" size="lg">
              <Link href="/onboarding">
                Commencer maintenant - C'est gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-ink-500 mt-4">
              Aucune carte de crédit requise • Résultats visibles en 2 semaines
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}