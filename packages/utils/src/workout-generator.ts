import type { Exercise } from '@alphavital/types';

/**
 * Génère la séquence pyramidale pour une séance HIRT
 * Ex: pyramidTop = 10 → [1,2,3,4,5,6,7,8,9,10,9,8,7,6,5,4,3,2,1]
 */
export function generatePyramidSequence(pyramidTop: number): number[] {
  const ascending = Array.from({ length: pyramidTop }, (_, i) => i + 1);
  const descending = Array.from({ length: pyramidTop - 1 }, (_, i) => pyramidTop - 1 - i);
  return [...ascending, ...descending];
}

/**
 * Calcule le nombre total de répétitions pour une pyramide
 */
export function calculateTotalReps(pyramidTop: number, exerciseCount: number = 4): number {
  const sequence = generatePyramidSequence(pyramidTop);
  const repsPerRound = sequence.reduce((sum, reps) => sum + reps, 0);
  return repsPerRound * exerciseCount;
}

/**
 * Estime la durée d'une séance HIRT
 */
export function estimateWorkoutDuration(pyramidTop: number): { min: number; max: number } {
  const totalRounds = generatePyramidSequence(pyramidTop).length;
  
  // Estimation basée sur :
  // - 30-45 secondes par exercice selon les reps
  // - 4 exercices par round
  // - 60-90 secondes de pause entre rounds
  
  const minTimePerRound = (4 * 30) + 60; // 180 secondes = 3 min
  const maxTimePerRound = (4 * 45) + 90; // 270 secondes = 4.5 min
  
  return {
    min: Math.round((totalRounds * minTimePerRound) / 60),
    max: Math.round((totalRounds * maxTimePerRound) / 60)
  };
}

/**
 * Recommande un poids de départ selon l'exercice et le niveau
 */
export function recommendStartingWeight(
  exercise: Exercise,
  userLevel: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): { kg: number; notes: string } {
  const recommendations = {
    SWING: {
      beginner: { kg: 8, notes: 'Kettlebell ou haltère, focus sur la technique' },
      intermediate: { kg: 12, notes: 'Mouvement explosif des hanches' },
      advanced: { kg: 16, notes: 'Puissance maximale, contrôle parfait' }
    },
    SQUAT: {
      beginner: { kg: 0, notes: 'Poids du corps, descente contrôlée' },
      intermediate: { kg: 8, notes: 'Haltère ou kettlebell goblet' },
      advanced: { kg: 16, notes: 'Charge progressive, amplitude complète' }
    },
    PRESS: {
      beginner: { kg: 4, notes: 'Haltères légers, mouvement strict' },
      intermediate: { kg: 6, notes: 'Développé militaire, core engagé' },
      advanced: { kg: 10, notes: 'Charge lourde, stabilité parfaite' }
    },
    PUSHUP: {
      beginner: { kg: 0, notes: 'Sur genoux si nécessaire' },
      intermediate: { kg: 0, notes: 'Pompes classiques, tempo contrôlé' },
      advanced: { kg: 0, notes: 'Variantes difficiles (déclinées, diamant)' }
    }
  };

  return recommendations[exercise][userLevel];
}

/**
 * Génère des conseils techniques pour chaque exercice
 */
export function getExerciseTips(exercise: Exercise): {
  setup: string;
  execution: string;
  breathing: string;
  common_mistakes: string[];
} {
  const tips = {
    SWING: {
      setup: 'Pieds écartés largeur d\'épaules, poids devant vous',
      execution: 'Mouvement explosif des hanches, bras tendus',
      breathing: 'Inspirez en descendant, expirez fort en montant',
      common_mistakes: [
        'Plier les genoux au lieu des hanches',
        'Lever avec les bras au lieu des hanches',
        'Ne pas engager les fessiers'
      ]
    },
    SQUAT: {
      setup: 'Pieds largeur d\'épaules, pointes légèrement ouvertes',
      execution: 'Descente contrôlée, cuisses parallèles au sol',
      breathing: 'Inspirez en descendant, expirez en remontant',
      common_mistakes: [
        'Genoux qui rentrent vers l\'intérieur',
        'Dos qui s\'arrondit',
        'Ne pas descendre assez bas'
      ]
    },
    PRESS: {
      setup: 'Debout, pieds ancrés, core engagé',
      execution: 'Poussée verticale stricte, sans élan des jambes',
      breathing: 'Inspirez en bas, expirez en poussant',
      common_mistakes: [
        'Cambrer excessivement le dos',
        'Utiliser l\'élan des jambes',
        'Trajectoire non verticale'
      ]
    },
    PUSHUP: {
      setup: 'Planche parfaite, mains sous les épaules',
      execution: 'Descente contrôlée, poitrine près du sol',
      breathing: 'Inspirez en descendant, expirez en poussant',
      common_mistakes: [
        'Hanches qui montent ou descendent',
        'Amplitude incomplète',
        'Mains trop écartées'
      ]
    }
  };

  return tips[exercise];
}

/**
 * Calcule la progression suggérée pour les prochaines séances
 */
export function calculateProgression(
  currentPyramidTop: number,
  completedSessions: number,
  avgRPE: number
): {
  nextPyramidTop: number;
  suggestion: string;
  reasoning: string;
} {
  let nextPyramidTop = currentPyramidTop;
  let suggestion = 'Maintenir';
  let reasoning = '';

  // Logique de progression basée sur RPE et nombre de séances
  if (completedSessions >= 3 && avgRPE <= 6) {
    // Trop facile, augmenter
    nextPyramidTop = Math.min(currentPyramidTop + 1, 15);
    suggestion = 'Augmenter';
    reasoning = 'Votre RPE moyen est faible, vous pouvez progresser';
  } else if (avgRPE >= 9) {
    // Trop difficile, réduire
    nextPyramidTop = Math.max(currentPyramidTop - 1, 6);
    suggestion = 'Réduire';
    reasoning = 'Votre RPE est très élevé, consolidez d\'abord';
  } else if (completedSessions >= 6 && avgRPE >= 7 && avgRPE <= 8) {
    // Progression normale
    nextPyramidTop = Math.min(currentPyramidTop + 1, 15);
    suggestion = 'Augmenter';
    reasoning = 'Progression normale, vous êtes prêt pour l\'étape suivante';
  } else {
    reasoning = 'Continuez à ce niveau pour consolider vos acquis';
  }

  return { nextPyramidTop, suggestion, reasoning };
}