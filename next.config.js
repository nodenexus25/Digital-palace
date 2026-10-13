/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
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
  outputFileTracingRoot: require('path').join(__dirname),
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
