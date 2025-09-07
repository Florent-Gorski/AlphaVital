import type { Badge, SleepLog, WorkoutSession, HormoneTest } from '@alphavital/types';

export interface BadgeDefinition {
  key: string;
  name: string;
  description: string;
  icon: string;
  category: 'sleep' | 'workout' | 'hormone' | 'streak' | 'milestone';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: (data: UserActivityData) => boolean;
}

export interface UserActivityData {
  sleepLogs: SleepLog[];
  workoutSessions: WorkoutSession[];
  hormoneTests: HormoneTest[];
  currentBadges: Badge[];
  userCreatedAt: Date;
}

/**
 * Définitions de tous les badges disponibles
 */
export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // Badges de sommeil
  {
    key: 'sleep_streak_3',
    name: 'Dormeur régulier',
    description: '3 nuits consécutives de 7h+ de sommeil',
    icon: '🌙',
    category: 'sleep',
    rarity: 'common',
    condition: (data) => calculateSleepStreak(data.sleepLogs) >= 3
  },
  {
    key: 'sleep_streak_7',
    name: 'Semaine parfaite',
    description: '7 nuits consécutives de sommeil optimal',
    icon: '✨',
    category: 'sleep',
    rarity: 'rare',
    condition: (data) => calculateSleepStreak(data.sleepLogs) >= 7
  },
  {
    key: 'sleep_streak_30',
    name: 'Maître du sommeil',
    description: '30 nuits consécutives de sommeil de qualité',
    icon: '👑',
    category: 'sleep',
    rarity: 'epic',
    condition: (data) => calculateSleepStreak(data.sleepLogs) >= 30
  },
  {
    key: 'sleep_quality_master',
    name: 'Qualité premium',
    description: 'Moyenne de qualité 4.5/5 sur 2 semaines',
    icon: '⭐',
    category: 'sleep',
    rarity: 'rare',
    condition: (data) => {
      const recent = data.sleepLogs.slice(0, 14);
      const avgQuality = recent
        .filter(log => log.quality)
        .reduce((sum, log) => sum + (log.quality || 0), 0) / recent.length;
      return avgQuality >= 4.5;
    }
  },

  // Badges d'entraînement
  {
    key: 'first_hirt',
    name: 'Premier HIRT',
    description: 'Première séance HIRT complétée',
    icon: '🏋️',
    category: 'workout',
    rarity: 'common',
    condition: (data) => data.workoutSessions.length >= 1
  },
  {
    key: 'hirt_week_complete',
    name: 'Semaine HIRT',
    description: '3 séances HIRT en une semaine',
    icon: '💪',
    category: 'workout',
    rarity: 'common',
    condition: (data) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const recentWorkouts = data.workoutSessions.filter(
        session => new Date(session.date) >= oneWeekAgo
      );
      return recentWorkouts.length >= 3;
    }
  },
  {
    key: 'pyramid_master_10',
    name: 'Pyramide 10',
    description: 'Première pyramide niveau 10 complétée',
    icon: '🔺',
    category: 'workout',
    rarity: 'rare',
    condition: (data) => data.workoutSessions.some(session => session.pyramidTop >= 10)
  },
  {
    key: 'pyramid_master_15',
    name: 'Pyramide ultime',
    description: 'Pyramide niveau 15 - Le sommet !',
    icon: '🏔️',
    category: 'workout',
    rarity: 'legendary',
    condition: (data) => data.workoutSessions.some(session => session.pyramidTop >= 15)
  },
  {
    key: 'afterburn_warrior',
    name: 'Guerrier afterburn',
    description: '10 séances avec afterburn 36h+',
    icon: '🔥',
    category: 'workout',
    rarity: 'epic',
    condition: (data) => {
      const highAfterburnSessions = data.workoutSessions.filter(
        session => session.afterburnH >= 36
      );
      return highAfterburnSessions.length >= 10;
    }
  },

  // Badges hormonaux
  {
    key: 'hormone_test_complete',
    name: 'Profil hormonal',
    description: 'Premier test hormonal complété',
    icon: '🧬',
    category: 'hormone',
    rarity: 'common',
    condition: (data) => data.hormoneTests.length >= 1
  },
  {
    key: 'hormone_improvement',
    name: 'Équilibre retrouvé',
    description: 'Amélioration de 2 points sur un duo hormonal',
    icon: '⚖️',
    category: 'hormone',
    rarity: 'rare',
    condition: (data) => {
      if (data.hormoneTests.length < 2) return false;
      const latest = data.hormoneTests[0];
      const previous = data.hormoneTests[1];
      
      const latestScores = latest.scores as any;
      const previousScores = previous.scores as any;
      
      return Object.keys(latestScores).some(key => 
        latestScores[key] - previousScores[key] >= 2
      );
    }
  },

  // Badges de streak global
  {
    key: 'consistency_champion',
    name: 'Champion de la régularité',
    description: '2 semaines de sommeil ET entraînement réguliers',
    icon: '🎯',
    category: 'streak',
    rarity: 'epic',
    condition: (data) => {
      const sleepStreak = calculateSleepStreak(data.sleepLogs);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const recentWorkouts = data.workoutSessions.filter(
        session => new Date(session.date) >= twoWeeksAgo
      );
      return sleepStreak >= 14 && recentWorkouts.length >= 6;
    }
  },

  // Badges de milestone
  {
    key: 'alphavital_month',
    name: 'Un mois AlphaVital',
    description: '30 jours depuis votre inscription',
    icon: '📅',
    category: 'milestone',
    rarity: 'common',
    condition: (data) => {
      const daysSinceCreation = Math.floor(
        (Date.now() - data.userCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSinceCreation >= 30;
    }
  },
  {
    key: 'data_collector',
    name: 'Collectionneur de données',
    description: '50 entrées de données au total',
    icon: '📊',
    category: 'milestone',
    rarity: 'rare',
    condition: (data) => {
      const totalEntries = data.sleepLogs.length + 
                          data.workoutSessions.length + 
                          data.hormoneTests.length;
      return totalEntries >= 50;
    }
  }
];

/**
 * Calcule le streak de sommeil actuel
 */
function calculateSleepStreak(sleepLogs: SleepLog[]): number {
  let streak = 0;
  const targetDuration = 7 * 60; // 7 heures minimum
  
  // Trier par date décroissante
  const sortedLogs = [...sleepLogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const log of sortedLogs) {
    if (log.durationM && log.durationM >= targetDuration) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Vérifie quels nouveaux badges l'utilisateur a gagnés
 */
export function checkNewBadges(
  userData: UserActivityData
): BadgeDefinition[] {
  const currentBadgeKeys = new Set(userData.currentBadges.map(badge => badge.key));
  
  return BADGE_DEFINITIONS.filter(badgeDef => 
    !currentBadgeKeys.has(badgeDef.key) && badgeDef.condition(userData)
  );
}

/**
 * Calcule le score de progression global de l'utilisateur
 */
export function calculateProgressScore(userData: UserActivityData): {
  score: number;
  level: number;
  nextLevelProgress: number;
  breakdown: {
    sleep: number;
    workout: number;
    hormone: number;
    consistency: number;
  };
} {
  const sleepScore = calculateSleepScore(userData);
  const workoutScore = calculateWorkoutScore(userData);
  const hormoneScore = calculateHormoneScore(userData);
  const consistencyScore = calculateConsistencyScore(userData);

  const totalScore = sleepScore + workoutScore + hormoneScore + consistencyScore;
  const level = Math.floor(totalScore / 100) + 1;
  const nextLevelProgress = (totalScore % 100);

  return {
    score: totalScore,
    level,
    nextLevelProgress,
    breakdown: {
      sleep: sleepScore,
      workout: workoutScore,
      hormone: hormoneScore,
      consistency: consistencyScore
    }
  };
}

function calculateSleepScore(userData: UserActivityData): number {
  const { sleepLogs } = userData;
  if (sleepLogs.length === 0) return 0;

  const recentLogs = sleepLogs.slice(0, 30); // 30 derniers jours
  const streak = calculateSleepStreak(sleepLogs);
  
  let score = Math.min(30, recentLogs.length); // Points pour régularité
  score += Math.min(20, streak); // Points pour streak
  
  // Points pour qualité moyenne
  const avgQuality = recentLogs
    .filter(log => log.quality)
    .reduce((sum, log) => sum + (log.quality || 0), 0) / recentLogs.length;
  score += avgQuality * 10;

  return Math.round(score);
}

function calculateWorkoutScore(userData: UserActivityData): number {
  const { workoutSessions } = userData;
  if (workoutSessions.length === 0) return 0;

  let score = Math.min(30, workoutSessions.length); // Points pour nombre de séances
  
  // Points pour progression pyramide
  const maxPyramid = Math.max(...workoutSessions.map(s => s.pyramidTop));
  score += Math.min(20, (maxPyramid - 6) * 2);

  // Points pour régularité récente
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const recentSessions = workoutSessions.filter(
    session => new Date(session.date) >= oneMonthAgo
  );
  score += Math.min(25, recentSessions.length * 2);

  return Math.round(score);
}

function calculateHormoneScore(userData: UserActivityData): number {
  const { hormoneTests } = userData;
  if (hormoneTests.length === 0) return 0;

  let score = 10; // Points pour avoir fait au moins un test
  
  if (hormoneTests.length >= 2) {
    score += 15; // Points pour suivi régulier
    
    // Points pour amélioration
    const latest = hormoneTests[0];
    const previous = hormoneTests[1];
    const latestScores = latest.scores as any;
    const previousScores = previous.scores as any;
    
    const improvements = Object.keys(latestScores).filter(key => 
      latestScores[key] > previousScores[key]
    );
    score += improvements.length * 5;
  }

  return Math.round(score);
}

function calculateConsistencyScore(userData: UserActivityData): number {
  const { sleepLogs, workoutSessions } = userData;
  
  let score = 0;
  
  // Consistance sommeil (dernières 2 semaines)
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  
  const recentSleepLogs = sleepLogs.filter(
    log => new Date(log.date) >= twoWeeksAgo
  );
  score += Math.min(15, recentSleepLogs.length);

  // Consistance entraînement (dernières 4 semaines)
  const fourWeeksAgo = new Date();
  fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
  
  const recentWorkouts = workoutSessions.filter(
    session => new Date(session.date) >= fourWeeksAgo
  );
  
  // 3 séances par semaine = optimal
  const optimalWeeklyWorkouts = 3;
  const weeksCount = 4;
  const actualWeeklyAvg = recentWorkouts.length / weeksCount;
  const consistencyRatio = Math.min(1, actualWeeklyAvg / optimalWeeklyWorkouts);
  
  score += consistencyRatio * 10;

  return Math.round(score);
}

/**
 * Génère des suggestions pour gagner de nouveaux badges
 */
export function generateBadgeSuggestions(userData: UserActivityData): {
  badge: BadgeDefinition;
  progress: string;
  tip: string;
}[] {
  const currentBadgeKeys = new Set(userData.currentBadges.map(badge => badge.key));
  const availableBadges = BADGE_DEFINITIONS.filter(badge => 
    !currentBadgeKeys.has(badge.key)
  );

  const suggestions: { badge: BadgeDefinition; progress: string; tip: string; }[] = [];

  availableBadges.forEach(badge => {
    let progress = '';
    let tip = '';

    switch (badge.key) {
      case 'sleep_streak_3':
        const currentStreak = calculateSleepStreak(userData.sleepLogs);
        progress = `${currentStreak}/3 nuits`;
        tip = 'Dormez 7h+ pendant 3 nuits consécutives';
        break;
      
      case 'sleep_streak_7':
        const streak7 = calculateSleepStreak(userData.sleepLogs);
        progress = `${streak7}/7 nuits`;
        tip = 'Maintenez une routine de sommeil régulière';
        break;
      
      case 'hirt_week_complete':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyWorkouts = userData.workoutSessions.filter(
          session => new Date(session.date) >= oneWeekAgo
        ).length;
        progress = `${weeklyWorkouts}/3 séances`;
        tip = 'Complétez 3 séances HIRT cette semaine';
        break;
      
      case 'pyramid_master_10':
        const maxPyramid = userData.workoutSessions.length > 0 
          ? Math.max(...userData.workoutSessions.map(s => s.pyramidTop))
          : 0;
        progress = `Niveau ${maxPyramid}/10`;
        tip = 'Progressez graduellement vers la pyramide niveau 10';
        break;
    }

    if (progress && tip) {
      suggestions.push({ badge, progress, tip });
    }
  });

  return suggestions.slice(0, 3); // Limiter à 3 suggestions
}