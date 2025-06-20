/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during builds if needed
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
    unoptimized: true,
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com', 'ozmevsim.netlify.app']
  },
  env: {
    SITE_NAME: 'Öz Mevsim Isı Sistemleri',
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://ozmevsim.netlify.app'
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  output: 'standalone'
};

module.exports = nextConfig; 