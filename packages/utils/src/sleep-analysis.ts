import type { SleepLog } from '@alphavital/types';
import { formatDuration } from './date-utils';

export interface SleepAnalysis {
  avgDuration: number;
  avgQuality: number;
  consistency: number; // 0-100%
  streak: number;
  trends: {
    duration: 'improving' | 'declining' | 'stable';
    quality: 'improving' | 'declining' | 'stable';
  };
  recommendations: string[];
}

/**
 * Analyse les données de sommeil sur une période donnée
 */
export function analyzeSleepData(sleepLogs: SleepLog[]): SleepAnalysis {
  if (sleepLogs.length === 0) {
    return {
      avgDuration: 0,
      avgQuality: 0,
      consistency: 0,
      streak: 0,
      trends: { duration: 'stable', quality: 'stable' },
      recommendations: ['Commencez à enregistrer vos données de sommeil']
    };
  }

  // Trier par date (plus récent en premier)
  const sortedLogs = [...sleepLogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculer les moyennes
  const logsWithDuration = sortedLogs.filter(log => log.durationM);
  const logsWithQuality = sortedLogs.filter(log => log.quality);

  const avgDuration = logsWithDuration.length > 0
    ? logsWithDuration.reduce((sum, log) => sum + (log.durationM || 0), 0) / logsWithDuration.length
    : 0;

  const avgQuality = logsWithQuality.length > 0
    ? logsWithQuality.reduce((sum, log) => sum + (log.quality || 0), 0) / logsWithQuality.length
    : 0;

  // Calculer la consistance (écart-type des heures de coucher)
  const consistency = calculateSleepConsistency(sortedLogs);

  // Calculer le streak actuel
  const streak = calculateSleepStreak(sortedLogs);

  // Analyser les tendances
  const trends = analyzeSleepTrends(sortedLogs);

  // Générer des recommandations
  const recommendations = generateSleepRecommendations({
    avgDuration,
    avgQuality,
    consistency,
    streak,
    trends,
    recentLogs: sortedLogs.slice(0, 7)
  });

  return {
    avgDuration,
    avgQuality,
    consistency,
    streak,
    trends,
    recommendations
  };
}

function calculateSleepConsistency(logs: SleepLog[]): number {
  const bedtimes = logs
    .filter(log => log.bedtime)
    .map(log => {
      const bedtime = new Date(log.bedtime!);
      return bedtime.getHours() * 60 + bedtime.getMinutes();
    });

  if (bedtimes.length < 2) return 100;

  const mean = bedtimes.reduce((sum, time) => sum + time, 0) / bedtimes.length;
  const variance = bedtimes.reduce((sum, time) => sum + Math.pow(time - mean, 2), 0) / bedtimes.length;
  const stdDev = Math.sqrt(variance);

  // Convertir en pourcentage (moins d'écart = plus de consistance)
  // 30 minutes d'écart-type = 100%, 120 minutes = 0%
  return Math.max(0, Math.min(100, 100 - (stdDev / 120) * 100));
}

function calculateSleepStreak(logs: SleepLog[]): number {
  let streak = 0;
  const targetDuration = 7 * 60; // 7 heures minimum

  for (const log of logs) {
    if (log.durationM && log.durationM >= targetDuration) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function analyzeSleepTrends(logs: SleepLog[]): {
  duration: 'improving' | 'declining' | 'stable';
  quality: 'improving' | 'declining' | 'stable';
} {
  if (logs.length < 4) {
    return { duration: 'stable', quality: 'stable' };
  }

  const recent = logs.slice(0, 3);
  const older = logs.slice(3, 6);

  const recentAvgDuration = recent
    .filter(log => log.durationM)
    .reduce((sum, log) => sum + (log.durationM || 0), 0) / recent.length;

  const olderAvgDuration = older
    .filter(log => log.durationM)
    .reduce((sum, log) => sum + (log.durationM || 0), 0) / older.length;

  const recentAvgQuality = recent
    .filter(log => log.quality)
    .reduce((sum, log) => sum + (log.quality || 0), 0) / recent.length;

  const olderAvgQuality = older
    .filter(log => log.quality)
    .reduce((sum, log) => sum + (log.quality || 0), 0) / older.length;

  const durationTrend = recentAvgDuration > olderAvgDuration + 15 ? 'improving'
    : recentAvgDuration < olderAvgDuration - 15 ? 'declining'
    : 'stable';

  const qualityTrend = recentAvgQuality > olderAvgQuality + 0.3 ? 'improving'
    : recentAvgQuality < olderAvgQuality - 0.3 ? 'declining'
    : 'stable';

  return { duration: durationTrend, quality: qualityTrend };
}

function generateSleepRecommendations(analysis: {
  avgDuration: number;
  avgQuality: number;
  consistency: number;
  streak: number;
  trends: { duration: string; quality: string };
  recentLogs: SleepLog[];
}): string[] {
  const recommendations: string[] = [];

  // Durée de sommeil
  if (analysis.avgDuration < 7 * 60) {
    recommendations.push('Visez 7-9h de sommeil par nuit pour optimiser votre récupération');
  } else if (analysis.avgDuration > 9 * 60) {
    recommendations.push('Votre durée de sommeil est élevée, vérifiez la qualité de votre repos');
  }

  // Qualité de sommeil
  if (analysis.avgQuality < 3) {
    recommendations.push('Améliorez votre environnement de sommeil : obscurité, température, silence');
  } else if (analysis.avgQuality >= 4) {
    recommendations.push('Excellente qualité de sommeil ! Maintenez vos bonnes habitudes');
  }

  // Consistance
  if (analysis.consistency < 70) {
    recommendations.push('Régularisez vos heures de coucher et de lever, même le week-end');
  }

  // Tendances
  if (analysis.trends.duration === 'declining') {
    recommendations.push('Votre durée de sommeil diminue, identifiez les causes et ajustez');
  }
  if (analysis.trends.quality === 'declining') {
    recommendations.push('Votre qualité de sommeil se dégrade, revoyez votre routine du soir');
  }

  // Streak
  if (analysis.streak === 0) {
    recommendations.push('Commencez par viser 7h de sommeil pendant 3 nuits consécutives');
  } else if (analysis.streak >= 7) {
    recommendations.push(`Félicitations ! ${analysis.streak} nuits consécutives de bon sommeil`);
  }

  // Recommandations spécifiques basées sur les données récentes
  const recentBedtimes = analysis.recentLogs
    .filter(log => log.bedtime)
    .map(log => new Date(log.bedtime!).getHours());

  if (recentBedtimes.some(hour => hour >= 24 || hour <= 2)) {
    recommendations.push('Évitez de vous coucher après minuit pour respecter votre rythme circadien');
  }

  if (recommendations.length === 0) {
    recommendations.push('Votre sommeil semble bien optimisé, continuez ainsi !');
  }

  return recommendations.slice(0, 3); // Limiter à 3 recommandations max
}

/**
 * Calcule le score de sommeil global (0-100)
 */
export function calculateSleepScore(analysis: SleepAnalysis): number {
  const durationScore = Math.min(100, Math.max(0, 
    100 - Math.abs(analysis.avgDuration - 8 * 60) / 60 * 20
  ));
  
  const qualityScore = (analysis.avgQuality / 5) * 100;
  const consistencyScore = analysis.consistency;
  
  return Math.round((durationScore * 0.4 + qualityScore * 0.4 + consistencyScore * 0.2));
}

/**
 * Génère des insights personnalisés sur le sommeil
 */
export function generateSleepInsights(logs: SleepLog[]): string[] {
  const insights: string[] = [];
  
  if (logs.length < 7) {
    insights.push('Enregistrez vos données pendant une semaine pour des insights personnalisés');
    return insights;
  }

  // Analyser les patterns par jour de la semaine
  const dayPatterns = analyzeDayPatterns(logs);
  if (dayPatterns.worstDay) {
    insights.push(`Vos ${dayPatterns.worstDay}s semblent plus difficiles pour le sommeil`);
  }

  // Analyser la corrélation qualité/durée
  const qualityDurationCorr = analyzeQualityDurationCorrelation(logs);
  if (qualityDurationCorr === 'negative') {
    insights.push('Plus vous dormez longtemps, moins la qualité semble bonne - vérifiez votre environnement');
  } else if (qualityDurationCorr === 'positive') {
    insights.push('Votre qualité de sommeil s\'améliore avec la durée - continuez à prioriser le temps de repos');
  }

  return insights;
}

function analyzeDayPatterns(logs: SleepLog[]): { worstDay?: string } {
  const dayStats: Record<string, { quality: number[]; duration: number[] }> = {};
  const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

  logs.forEach(log => {
    const dayOfWeek = new Date(log.date).getDay();
    const dayName = dayNames[dayOfWeek];
    
    if (!dayStats[dayName]) {
      dayStats[dayName] = { quality: [], duration: [] };
    }
    
    if (log.quality) dayStats[dayName].quality.push(log.quality);
    if (log.durationM) dayStats[dayName].duration.push(log.durationM);
  });

  let worstDay: string | undefined;
  let worstScore = Infinity;

  Object.entries(dayStats).forEach(([day, stats]) => {
    if (stats.quality.length > 0) {
      const avgQuality = stats.quality.reduce((sum, q) => sum + q, 0) / stats.quality.length;
      if (avgQuality < worstScore) {
        worstScore = avgQuality;
        worstDay = day;
      }
    }
  });

  return { worstDay: worstScore < 3 ? worstDay : undefined };
}

function analyzeQualityDurationCorrelation(logs: SleepLog[]): 'positive' | 'negative' | 'none' {
  const validLogs = logs.filter(log => log.quality && log.durationM);
  
  if (validLogs.length < 5) return 'none';

  // Calcul simple de corrélation
  const qualities = validLogs.map(log => log.quality!);
  const durations = validLogs.map(log => log.durationM!);
  
  const meanQuality = qualities.reduce((sum, q) => sum + q, 0) / qualities.length;
  const meanDuration = durations.reduce((sum, d) => sum + d, 0) / durations.length;
  
  let numerator = 0;
  let denomQuality = 0;
  let denomDuration = 0;
  
  for (let i = 0; i < validLogs.length; i++) {
    const qDiff = qualities[i] - meanQuality;
    const dDiff = durations[i] - meanDuration;
    
    numerator += qDiff * dDiff;
    denomQuality += qDiff * qDiff;
    denomDuration += dDiff * dDiff;
  }
  
  const correlation = numerator / Math.sqrt(denomQuality * denomDuration);
  
  if (correlation > 0.3) return 'positive';
  if (correlation < -0.3) return 'negative';
  return 'none';
}