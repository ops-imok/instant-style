import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  outputFileTracingIncludes: {
    '/_next/static/**/*': ['.js'],
    '/api/**/*': ['.js'],
    '/**/*.json': ['.json'],
    '/_next/server/**/*': ['*'],
  },
};

export default nextConfig;