/**
 * Calcule la durée d'afterburn basée sur les paramètres d'entraînement HIRT
 * Selon les spécifications : si pyramidTop ≥ 10 ET durationMin ≤ 30 ET RPE ≥ 7 ⇒ 36–48h, sinon 24–36h
 */
export function calculateAfterburnHours(
  pyramidTop: number,
  durationMin: number,
  rpe?: number
): number {
  const isHighIntensity = pyramidTop >= 10 && durationMin <= 30 && (rpe ?? 0) >= 7;
  
  if (isHighIntensity) {
    // 36-48h pour haute intensité
    return Math.floor(Math.random() * 13) + 36; // 36-48
  } else {
    // 24-36h pour intensité modérée
    return Math.floor(Math.random() * 13) + 24; // 24-36
  }
}

/**
 * Vérifie si l'utilisateur est encore dans sa fenêtre d'afterburn
 */
export function isInAfterburnWindow(
  workoutDate: Date,
  afterburnHours: number
): boolean {
  const now = new Date();
  const afterburnEnd = new Date(workoutDate.getTime() + afterburnHours * 60 * 60 * 1000);
  return now < afterburnEnd;
}

/**
 * Calcule le temps restant dans la fenêtre d'afterburn
 */
export function getAfterburnTimeRemaining(
  workoutDate: Date,
  afterburnHours: number
): { hours: number; minutes: number; seconds: number } | null {
  if (!isInAfterburnWindow(workoutDate, afterburnHours)) {
    return null;
  }
  
  const now = new Date();
  const afterburnEnd = new Date(workoutDate.getTime() + afterburnHours * 60 * 60 * 1000);
  const remainingMs = afterburnEnd.getTime() - now.getTime();
  
  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

/**
 * Calcule le pourcentage de progression dans la fenêtre d'afterburn
 */
export function getAfterburnProgress(
  workoutDate: Date,
  afterburnHours: number
): number {
  const now = new Date();
  const afterburnEnd = new Date(workoutDate.getTime() + afterburnHours * 60 * 60 * 1000);
  const totalDuration = afterburnHours * 60 * 60 * 1000;
  const elapsed = now.getTime() - workoutDate.getTime();
  
  if (elapsed <= 0) return 0;
  if (elapsed >= totalDuration) return 100;
  
  return Math.round((elapsed / totalDuration) * 100);
}

/**
 * Génère des conseils pour maximiser l'afterburn
 */
export function getAfterburnTips(hoursRemaining: number): string[] {
  const tips = [
    'Hydratez-vous régulièrement (2-3L d\'eau par jour)',
    'Privilégiez les protéines à chaque repas',
    'Dormez 7-9h pour optimiser la récupération',
    'Évitez l\'alcool qui peut réduire l\'effet afterburn',
    'Restez actif avec de la marche légère',
  ];

  if (hoursRemaining > 24) {
    tips.push('Profitez de cette fenêtre pour des activités légères');
    tips.push('Votre métabolisme est encore très élevé');
  } else if (hoursRemaining > 12) {
    tips.push('L\'effet afterburn se maintient encore bien');
    tips.push('Continuez à bien vous alimenter');
  } else {
    tips.push('Dernières heures d\'afterburn intensif');
    tips.push('Préparez votre prochaine séance HIRT');
  }

  return tips;
}

/**
 * Calcule les calories supplémentaires brûlées pendant l'afterburn
 * Estimation basée sur une augmentation métabolique de 15-25%
 */
export function estimateAfterburnCalories(
  baseMetabolism: number, // calories de base par jour
  afterburnHours: number,
  intensity: 'low' | 'medium' | 'high' = 'medium'
): number {
  const multipliers = {
    low: 0.15,    // +15%
    medium: 0.20, // +20%
    high: 0.25    // +25%
  };

  const hourlyBase = baseMetabolism / 24;
  const bonusCaloriesPerHour = hourlyBase * multipliers[intensity];
  
  return Math.round(bonusCaloriesPerHour * afterburnHours);
}