import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@alphavital/ui';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlphaVital - Transformation Durable pour Hommes 40+',
  description: 'Perdez du gras durablement grâce à notre méthode scientifique combinant sommeil, équilibre hormonal et entraînement HIRT.',
  keywords: 'perte de poids, hommes 40+, HIRT, sommeil, hormones, transformation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className={cn(inter.className, "h-full bg-ink-50 dark:bg-ink-900")}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}