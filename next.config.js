/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'www.eternalmewar.in',
      },
    ],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    qualities: [50, 60, 70, 75, 80, 85, 90, 95],
  },
  reactStrictMode: true,
  output: 'standalone',
  typedRoutes: false,
  poweredByHeader: false,
  outputFileTracingRoot: require('path').join(__dirname),
  async headers() {
    return [
      {
        // Apply security headers to all routes except the Sanity Studio, which
        // needs to render inside an iframe-friendly environment and loads
        // third-party scripts.
        source: '/:path((?!studio$|studio/).*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/stories',
        destination: '/legends',
      },
      {
        source: '/stories/:path*',
        destination: '/legends/:path*',
      },
    ];
  },
}

module.exports = nextConfig
