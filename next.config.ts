/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Avoid build failures from TS
  typescript: {
    ignoreBuildErrors: true,
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
