/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export since we're using database integration
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for Netlify hosting
    domains: ['localhost', 'images.unsplash.com', 'via.placeholder.com', 'ozmevsim.netlify.app']
  },
  env: {
    SITE_NAME: 'Öz Mevsim Isı Sistemleri',
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://ozmevsim.netlify.app'
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig; 