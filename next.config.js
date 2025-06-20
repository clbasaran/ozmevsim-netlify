/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static hosting
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com', 'ozmevsim.netlify.app']
  },
  env: {
    SITE_NAME: 'Öz Mevsim Isı Sistemleri',
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://ozmevsim.netlify.app'
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Static export configuration
  distDir: 'out'
};

module.exports = nextConfig; 