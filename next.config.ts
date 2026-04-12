import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pure static export - no server features
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Static hosting requires trailing slash
  trailingSlash: true,
  
  // Disable server-side features
  dynamic: 'force-static',
  
  // Disable any Cloudflare-specific processing
  experimental: {
    serverActions: false,
  },
  
  // Ensure no API routes
  api: undefined,
};

export default nextConfig;
