import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    outputFileTracingIncludes: {
      '/_next/static/**/*.js',
      '/api/**/*.js',
      '/**/*.json',
    },
  },
};

export default nextConfig;