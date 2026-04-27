import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [68, 70, 72, 75, 78, 80, 82, 85, 90],
  },
};

export default nextConfig;
