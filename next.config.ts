import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Use polling instead of WebSocket for HMR when behind reverse proxy
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;

