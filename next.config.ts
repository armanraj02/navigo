import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/navigo',
  assetPrefix: '/navigo/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
