import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Still experimental in 16.4.2; the only way to get a styled 404 with two static root layouts (app/(en), app/(es)).
    globalNotFound: true,
  },
};

export default nextConfig;
