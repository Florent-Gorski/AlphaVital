/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@alphavital/ui', '@alphavital/types', '@alphavital/utils'],
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
  },
}

module.exports = nextConfig;