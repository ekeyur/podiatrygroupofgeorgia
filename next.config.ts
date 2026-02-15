import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.podiatrygroupofgeorgia.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination:
          "https://www.podiatrygroupofgeorgia.com/wp-content/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
