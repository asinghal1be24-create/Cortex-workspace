import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only export statically if building specifically for Capacitor
  output: process.env.CAPACITOR === 'true' ? 'export' : undefined,
  images: {
    unoptimized: true,       // Native mobile doesn't run the Next.js server image optimizer
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
