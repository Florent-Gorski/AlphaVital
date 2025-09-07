import { format, parseISO, startOfDay, endOfDay } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

/**
 * Convertit une date locale en UTC pour stockage
 */
export function toUTC(date: Date, timeZone: string): Date {
  return zonedTimeToUtc(date, timeZone);
}

/**
 * Convertit une date UTC en date locale pour affichage
 */
export function fromUTC(date: Date, timeZone: string): Date {
  return utcToZonedTime(date, timeZone);
}

/**
 * Normalise une date au début de la journée en UTC
 */
export function normalizeDate(date: Date, timeZone: string): Date {
  const localDate = fromUTC(date, timeZone);
  const startOfLocalDay = startOfDay(localDate);
  return toUTC(startOfLocalDay, timeZone);
}

/**
 * Formate une date selon la locale
 */
export function formatDate(date: Date, locale: string = 'fr-FR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Formate une heure selon la locale
 */
export function formatTime(date: Date, locale: string = 'fr-FR'): string {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Calcule la durée de sommeil en minutes
 */
export function calculateSleepDuration(bedtime: Date, wakeTime: Date): number {
  let duration = wakeTime.getTime() - bedtime.getTime();
  
  // Si le réveil est le lendemain
  if (duration < 0) {
    duration += 24 * 60 * 60 * 1000; // Ajouter 24h
  }
  
  return Math.floor(duration / (1000 * 60)); // Convertir en minutes
}