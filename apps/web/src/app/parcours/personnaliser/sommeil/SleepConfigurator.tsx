'use client';
import React, { useEffect, useMemo, useState } from 'react';

type SleepConfig = {
  bedtime: string;   // '23:30'
  wakeTime: string;  // '07:30'
  targetHours: number; // 6 | 7 | 8 | 9
};

const TARGETS = [6, 7, 8, 9];

function computeDuration(bedtime: string, wakeTime: string) {
  if (!bedtime || !wakeTime) return '';
  const [bh, bm] = bedtime.split(':').map(Number);
  const [wh, wm] = wakeTime.split(':').map(Number);
  let start = bh * 60 + bm;
  let end = wh * 60 + wm;
  if (end <= start) end += 24 * 60; // cross midnight
  const mins = end - start;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h${m.toString().padStart(2, '0')}`;
}

export default function SleepConfigurator() {
  const [cfg, setCfg] = useState<SleepConfig>({
    bedtime: '23:00',
    wakeTime: '07:00',
    targetHours: 8,
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('alphavital:sleep-config');
      if (raw) setCfg(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('alphavital:sleep-config', JSON.stringify(cfg));
    } catch {}
  }, [cfg]);

  const actual = useMemo(() => computeDuration(cfg.bedtime, cfg.wakeTime), [cfg]);

  return (
    <section id="sleep-config" className="relative z-10 pointer-events-auto">
      <div className="max-w-2xl rounded-2xl border border-gray-200 p-6 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Configurer votre sommeil</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-600">Heure du coucher</span>
            <input
              type="time"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={cfg.bedtime}
              onChange={(e) => setCfg((s) => ({ ...s, bedtime: e.target.value }))}
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Heure du réveil</span>
            <input
              type="time"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={cfg.wakeTime}
              onChange={(e) => setCfg((s) => ({ ...s, wakeTime: e.target.value }))}
            />
          </label>
        </div>

        <p className="mt-3 text-sm text-gray-700">
          Durée estimée&nbsp;: <strong>{actual || '—'}</strong>
        </p>

        <div className="mt-5">
          <span className="text-sm text-gray-600">Durée de sommeil visée</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {TARGETS.map((h) => (
              <button
                key={h}
                type="button"
                className={[
                  'rounded-lg border px-3 py-2 text-sm transition',
                  h === cfg.targetHours
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                ].join(' ')}
                onClick={() => setCfg((s) => ({ ...s, targetHours: h }))}
              >
                {h} heures
              </button>
            ))}
          </div>
        </div>

        <Delta actual={actual} target={cfg.targetHours} />
      </div>
    </section>
  );
}

function Delta({ actual, target }: { actual: string; target: number }) {
  const [ah, am] = actual ? actual.replace('h', ':').split(':').map(Number) : [0, 0];
  const actualMin = ah * 60 + am;
  const targetMin = target * 60;
  const diff = actual ? actualMin - targetMin : 0;
  if (!actual) return null;

  const sign = diff === 0 ? '' : diff > 0 ? '+' : '–';
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 60);
  const m = abs % 60;

  return (
    <p className="mt-4 text-sm">
      Écart vs objectif&nbsp;:&nbsp;
      <strong>
        {sign}
        {h}h{m.toString().padStart(2, '0')}
      </strong>
    </p>
  );
}
