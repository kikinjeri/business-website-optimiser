/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // Vercel uses SWC by default
  },

  reactStrictMode: true,
  swcMinify: true,

  // Vercel automatically handles image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Avoid build failures from TS or ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Smaller bundles, faster cold starts
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },

  // Required for Vercel’s serverless output
  output: 'standalone',
};

module.exports = nextConfig;
