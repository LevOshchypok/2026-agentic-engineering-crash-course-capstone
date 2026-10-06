import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // The production VM does not support the SIMD instructions required by sharp.
  images: { unoptimized: true },
  // Lets `next dev` hydrate correctly when the site is opened from another
  // device on the local network (e.g. http://192.168.0.137:3000). Without
  // this, Next.js's dev-mode cross-origin protection blocks hydration for
  // that origin, so the page renders but click handlers never attach.
  allowedDevOrigins: ["192.168.0.137"],
};

export default nextConfig;
