import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable standalone output for static export
  outputFileTracing: false,
  // Skip Cloudflare Pages adapter
  experimental: {
    // works with output: 'export'
  },
};

export default nextConfig;
