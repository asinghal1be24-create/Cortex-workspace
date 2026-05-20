import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',          // Tells Next.js to export static HTML/CSS/JS (builds into the "out" folder)
  images: {
    unoptimized: true,       // Native mobile doesn't run the Next.js server image optimizer
  },
};

export default nextConfig;
