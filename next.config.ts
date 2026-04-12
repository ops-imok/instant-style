import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone output for Cloudflare
  output: 'standalone',
  
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
};

export default nextConfig;
