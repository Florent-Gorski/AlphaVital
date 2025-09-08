'use client';
import React, { useMemo, useState } from 'react';
import '../sleep-fix.css';

function minsToHhmm(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h${m.toString().padStart(2, '0')}`;
}

export default function SleepPage() {
  const [bedtime, setBedtime] = useState<string>('22:30');
  const [sleepDuration, setSleepDuration] = useState<number>(480); // minutes

  const durationLabel = useMemo(() => minsToHhmm(sleepDuration), [sleepDuration]);

  return (
    <main className="container mx-auto max-w-4xl p-6">
      <section className="sleep-card relative z-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Configuration de votre sommeil</h1>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 pointer-events-auto">
          {/* Heure de coucher */}
          <div className="space-y-2">
            <label htmlFor="bedtime" className="text-sm text-gray-600">
              Heure de coucher souhaitée
            </label>
            <input
              id="bedtime"
              type="time"
              step={300}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
            />
          </div>

          {/* Durée visée */}
          <div className="space-y-2">
            <span className="text-sm text-gray-600">Durée de sommeil visée</span>
            <div className="flex items-center gap-4">
              <div className="flex-1 px-2">
                <input
                  type="range"
                  min={360}
                  max={540}
                  step={15}
                  value={sleepDuration}
                  onChange={(e) => setSleepDuration(parseInt(e.target.value, 10))}
                  className="w-full cursor-pointer"
                />
              </div>
              <div className="w-12 text-right font-semibold">{durationLabel}</div>
            </div>
          </div>
        </div>

        {/* Checklist d'hygiène du sommeil (placeholder) */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-4 text-sm text-gray-600">Chambre sombre</div>
          <div className="rounded-xl border p-4 text-sm text-gray-600">Température ~19°C</div>
          <div className="rounded-xl border p-4 text-sm text-gray-600">Sans écrans</div>
          <div className="rounded-xl border p-4 text-sm text-gray-600">Bruits blancs optionnels</div>
        </div>
      </section>
    </main>
  );
}
