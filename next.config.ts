import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Produce a minimal standalone build for Docker/self-hosting
  output: "standalone",
  i18n: {
    locales: ["en", "hi"],
    defaultLocale: "en",
    localeDetection: false
  },
  images: {
    localPatterns: [
      {
        pathname: '/images/**'
      }
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.metmuseum.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400
  },
  // Ensure correct monorepo root for file tracing to avoid chunk resolution issues
  outputFileTracingRoot: path.resolve(__dirname, "..")
};

export default nextConfig;

// Ensure dev and prod always serve fresh Next.js static chunks and service worker
export async function headers() {
  return [
    {
      source: "/_next/static/:path*",
      headers: [
        { key: "Cache-Control", value: "no-store" }
      ]
    },
    {
      source: "/sw.js",
      headers: [
        { key: "Cache-Control", value: "no-store" }
      ]
    }
  ];
}
