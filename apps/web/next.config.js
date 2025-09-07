/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Suppression de experimental.appDir (inutile depuis Next 13)
  transpilePackages: ['@alphavital/ui', '@alphavital/types', '@alphavital/utils'],
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
  },
  reactStrictMode: true, // ✅ bonne pratique
  swcMinify: true        // ✅ active le minify natif
}

module.exports = nextConfig;
