// next.config.js
// Production-ready Next.js config for AlphaVital monorepo

/** @type {import('next').NextConfig} */
const baseConfig = {
  // ✅ Bonnes pratiques
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Monorepo: transpile les paquets internes
  transpilePackages: ['@alphavital/ui', '@alphavital/types', '@alphavital/utils'],

  // ✅ Images distantes autorisées
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  // ✅ En-têtes de sécurité par défaut (ajuste selon besoin)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Sécurité de base
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '0' }, // obsolète mais inoffensif; moderne = CSP

          // HSTS (active uniquement si tu es 100% HTTPS en prod)
          // { key: 'Strict-Transport-Security', value: 'max-age=15552000; includeSubDomains; preload' },

          // Permissions-Policy (ex: désactive features non utilisées)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  // Exemple de redirections si besoin
  // async redirects() {
  //   return [
  //     { source: '/old', destination: '/new', permanent: true },
  //   ]
  // },

  // Exemple de réécritures (proxy) si besoin
  // async rewrites() {
  //   return [
  //     { source: '/api/:path*', destination: 'https://api.example.com/:path*' },
  //   ]
  // },
};

// ✅ Bundle analyzer activable à la demande (ANALYZE=true)
let withBundleAnalyzer = (cfg) => cfg;
try {
  // nécessite: npm i -D @next/bundle-analyzer
  // active via: ANALYZE=true npm run build
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (_) {
  // pas installé: on ignore proprement
}

module.exports = withBundleAnalyzer(baseConfig);
