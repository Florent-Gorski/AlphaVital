// next.config.js
// Production-ready Next.js config for AlphaVital monorepo

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Monorepo: transpile internal packages
  transpilePackages: ['@alphavital/ui', '@alphavital/types', '@alphavital/utils'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '0' },
          // Enable once you're HTTPS-only in prod:
          // { key: 'Strict-Transport-Security', value: 'max-age=15552000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

let withBundleAnalyzer = (cfg) => cfg;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (_) {}

module.exports = withBundleAnalyzer(baseConfig);
