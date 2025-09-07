import type { HormoneScores, CreateHormoneTestInput } from '@alphavital/types';

export interface HormoneTestResult {
  scores: HormoneScores;
  priorityOrder: Array<keyof HormoneScores>;
  summary: string;
}

/**
 * Calcule les scores hormonaux et génère un plan d'action priorisé
 */
export function calculateHormoneScores(
  answers: Record<string, boolean>
): HormoneTestResult {
  // Grouper les réponses par duo hormonal (5 questions par duo)
  const duos = {
    testoOestro: Object.keys(answers)
      .filter(key => key.startsWith('testo_'))
      .map(key => answers[key]),
    ghrelineLeptine: Object.keys(answers)
      .filter(key => key.startsWith('ghreline_'))
      .map(key => answers[key]),
    cortisolMelatonine: Object.keys(answers)
      .filter(key => key.startsWith('cortisol_'))
      .map(key => answers[key]),
    insulineGlucagon: Object.keys(answers)
      .filter(key => key.startsWith('insuline_'))
      .map(key => answers[key]),
  };

  // Calculer les scores (nombre de réponses positives sur 5)
  const scores: HormoneScores = {
    testoOestro: duos.testoOestro.filter(Boolean).length,
    ghrelineLeptine: duos.ghrelineLeptine.filter(Boolean).length,
    cortisolMelatonine: duos.cortisolMelatonine.filter(Boolean).length,
    insulineGlucagon: duos.insulineGlucagon.filter(Boolean).length,
  };

  // Logique de priorisation selon les spécifications
  const priorityOrder = getPriorityOrder(scores);
  const summary = generateSummary(scores, priorityOrder);

  return {
    scores,
    priorityOrder,
    summary,
  };
}

function getPriorityOrder(scores: HormoneScores): Array<keyof HormoneScores> {
  const priorities: Array<{ key: keyof HormoneScores; score: number; priority: number }> = [
    { key: 'cortisolMelatonine', score: scores.cortisolMelatonine, priority: 1 },
    { key: 'insulineGlucagon', score: scores.insulineGlucagon, priority: 2 },
    { key: 'testoOestro', score: scores.testoOestro, priority: 3 },
    { key: 'ghrelineLeptine', score: scores.ghrelineLeptine, priority: 4 },
  ];

  // Trier par priorité si score >= 3, sinon par score décroissant
  const highPriority = priorities
    .filter(p => p.score >= 3)
    .sort((a, b) => a.priority - b.priority);
    
  const lowPriority = priorities
    .filter(p => p.score < 3)
    .sort((a, b) => b.score - a.score);

  return [...highPriority, ...lowPriority].map(p => p.key);
}

function generateSummary(
  scores: HormoneScores,
  priorityOrder: Array<keyof HormoneScores>
): string {
  const recommendations: Record<keyof HormoneScores, string> = {
    cortisolMelatonine: 'Optimisez votre gestion du stress et votre sommeil. Pratiquez la méditation, respectez une routine de coucher régulière, et créez un environnement propice au repos.',
    insulineGlucagon: 'Stabilisez votre glycémie en privilégiant les protéines et fibres à chaque repas, limitez les sucres rapides, et respectez des horaires de repas réguliers.',
    testoOestro: 'Renforcez votre force et motivation avec un entraînement de résistance régulier, un sommeil de qualité, et une alimentation riche en bonnes graisses.',
    ghrelineLeptine: 'Régularisez vos signaux de faim en maintenant des horaires de repas constants, un sommeil suffisant, et en évitant les restrictions caloriques extrêmes.',
  };

  if (priorityOrder.length === 0) {
    return 'Votre profil hormonal semble équilibré ! Continuez vos bonnes habitudes et surveillez l\'évolution de vos scores.';
  }

  const topPriority = priorityOrder[0];
  const topScore = scores[topPriority];

  let summary = `Votre profil hormonal révèle que l'équilibre ${getHormoneName(topPriority)} nécessite une attention prioritaire (score: ${topScore}/5). `;
  summary += recommendations[topPriority];

  if (priorityOrder.length > 1 && scores[priorityOrder[1]] >= 3) {
    const secondPriority = priorityOrder[1];
    summary += ` En complément, travaillez sur ${getHormoneName(secondPriority)}.`;
  }

  return summary;
}

function getHormoneName(key: keyof HormoneScores): string {
  const names: Record<keyof HormoneScores, string> = {
    testoOestro: 'Testostérone/Œstrogène',
    ghrelineLeptine: 'Ghréline/Leptine',
    cortisolMelatonine: 'Cortisol/Mélatonine',
    insulineGlucagon: 'Insuline/Glucagon',
  };
  return names[key];
}

/**
 * Génère des recommandations personnalisées basées sur les scores
 */
export function generatePersonalizedRecommendations(
  scores: HormoneScores,
  priorityOrder: Array<keyof HormoneScores>
): Record<string, string[]> {
  const recommendations: Record<string, string[]> = {};

  priorityOrder.forEach((hormone, index) => {
    if (scores[hormone] >= 3) {
      switch (hormone) {
        case 'cortisolMelatonine':
          recommendations['Stress & Sommeil'] = [
            'Créez une routine de coucher fixe (même heure chaque soir)',
            'Pratiquez 10 minutes de méditation ou respiration profonde',
            'Évitez les écrans 90 minutes avant le coucher',
            'Maintenez votre chambre à 19°C maximum',
            'Utilisez des techniques de gestion du stress (journaling, marche)'
          ];
          break;
        case 'insulineGlucagon':
          recommendations['Glycémie & Énergie'] = [
            'Commencez chaque repas par des protéines et des fibres',
            'Limitez les sucres rapides et les aliments transformés',
            'Mangez à heures régulières (3 repas + 1-2 collations si besoin)',
            'Évitez la caféine après 14h',
            'Intégrez une marche de 10-15 min après les repas principaux'
          ];
          break;
        case 'testoOestro':
          recommendations['Force & Motivation'] = [
            'Priorisez l\'entraînement de résistance (HIRT 3x/semaine)',
            'Dormez 7-9h par nuit de manière régulière',
            'Consommez des bonnes graisses (avocat, noix, huile d\'olive)',
            'Limitez l\'alcool et les perturbateurs endocriniens',
            'Exposez-vous à la lumière naturelle le matin'
          ];
          break;
        case 'ghrelineLeptine':
          recommendations['Satiété & Appétit'] = [
            'Mangez lentement et mastiquez bien (20 min minimum par repas)',
            'Hydratez-vous suffisamment (2-3L d\'eau par jour)',
            'Évitez les régimes restrictifs extrêmes',
            'Privilégiez les aliments riches en fibres et protéines',
            'Dormez suffisamment (la fatigue augmente la faim)'
          ];
          break;
      }
    }
  });

  return recommendations;
}