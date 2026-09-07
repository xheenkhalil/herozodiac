import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/natal-chart',
        destination: '/calculator',
      },
      {
        source: '/astrology/natal-chart',
        destination: '/calculator',
      },
      {
        source: '/natal',
        destination: '/calculator',
      },
    ];
  },
};

export default nextConfig;
