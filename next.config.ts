import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the embedded iframe demo page to be framed by same origin.
  async headers() {
    return [
      {
        source: "/integration/iframe/embedded",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;
