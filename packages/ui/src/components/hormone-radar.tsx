import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Activity } from 'lucide-react';
import { cn } from '../lib/utils';

interface HormoneScores {
  testoOestro: number;
  ghrelineLeptine: number;
  cortisolMelatonine: number;
  insulineGlucagon: number;
}

interface HormoneRadarProps {
  scores: HormoneScores;
  className?: string;
}

export function HormoneRadar({ scores, className }: HormoneRadarProps) {
  const hormoneLabels = {
    testoOestro: 'Testo/Œstro',
    ghrelineLeptine: 'Ghréline/Leptine',
    cortisolMelatonine: 'Cortisol/Mélatonine',
    insulineGlucagon: 'Insuline/Glucagon',
  };

  const maxScore = 5;
  const center = 100;
  const radius = 80;

  // Calculer les points du radar
  const points = Object.entries(scores).map(([key, value], index) => {
    const angle = (index * 2 * Math.PI) / 4 - Math.PI / 2; // Commencer en haut
    const distance = (value / maxScore) * radius;
    const x = center + Math.cos(angle) * distance;
    const y = center + Math.sin(angle) * distance;
    return { x, y, value, label: hormoneLabels[key as keyof HormoneScores] };
  });

  // Points pour les cercles de référence
  const referenceCircles = [1, 2, 3, 4, 5].map(level => {
    const distance = (level / maxScore) * radius;
    return Object.entries(scores).map((_, index) => {
      const angle = (index * 2 * Math.PI) / 4 - Math.PI / 2;
      const x = center + Math.cos(angle) * distance;
      const y = center + Math.sin(angle) * distance;
      return { x, y };
    });
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent-600" />
          Profil hormonal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {/* Radar Chart */}
          <svg width="200" height="200" viewBox="0 0 200 200" className="w-full max-w-sm">
            {/* Cercles de référence */}
            {referenceCircles.map((circle, level) => (
              <g key={level}>
                <polygon
                  points={circle.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-ink-200 dark:text-ink-700"
                  opacity="0.3"
                />
              </g>
            ))}
            
            {/* Lignes vers les axes */}
            {points.map((point, index) => {
              const angle = (index * 2 * Math.PI) / 4 - Math.PI / 2;
              const endX = center + Math.cos(angle) * radius;
              const endY = center + Math.sin(angle) * radius;
              return (
                <line
                  key={index}
                  x1={center}
                  y1={center}
                  x2={endX}
                  y2={endY}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-ink-200 dark:text-ink-700"
                  opacity="0.3"
                />
              );
            })}

            {/* Zone de données */}
            <path
              d={pathData}
              fill="url(#radarGradient)"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              opacity="0.7"
            />

            {/* Points de données */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="rgb(59, 130, 246)"
                stroke="white"
                strokeWidth="2"
              />
            ))}

            {/* Gradient pour la zone */}
            <defs>
              <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* Labels */}
            {points.map((point, index) => {
              const angle = (index * 2 * Math.PI) / 4 - Math.PI / 2;
              const labelDistance = radius + 20;
              const labelX = center + Math.cos(angle) * labelDistance;
              const labelY = center + Math.sin(angle) * labelDistance;
              
              return (
                <text
                  key={index}
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-current text-ink-600 dark:text-ink-300"
                >
                  {point.label}
                </text>
              );
            })}
          </svg>

          {/* Scores détaillés */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {Object.entries(scores).map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-ink-50 dark:bg-ink-800/50 rounded-lg">
                <div className="text-lg font-bold text-accent-600">
                  {value}/5
                </div>
                <div className="text-xs text-ink-500">
                  {hormoneLabels[key as keyof HormoneScores]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}