import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.heavenlyliberation.org" }],
        destination: "https://heavenlyliberation.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
