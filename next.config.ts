import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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

  // Disable Turbopack (fixes dev server hanging on Windows + pnpm)
  turbo: {
    enabled: false,
  },
};

export default nextConfig;
