import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Add trailing slash for static hosting
  trailingSlash: true,
  
  // Disable server features that don't work with static export
  experimental: {
    serverActions: false,
    serverComponentsExternalPackages: [],
  },
  
  // Disable static page generation that might cause issues
  generateStaticParams: undefined,
  
  // Ensure no dynamic APIs are used at build time
  dynamic: 'force-static',
};

export default nextConfig;
