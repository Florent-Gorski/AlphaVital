export const locales = ['fr', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'fr';

/**
 * Détecte la locale préférée de l'utilisateur
 */
export function detectLocale(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return defaultLocale;
  
  const preferred = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())
    .find(lang => locales.includes(lang as Locale));
    
  return (preferred as Locale) || defaultLocale;
}

/**
 * Valide qu'une locale est supportée
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}