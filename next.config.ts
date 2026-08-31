import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves the generated files directly; no Node server is required.
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
    qualities: [75, 100],
  },
};

export default nextConfig;
