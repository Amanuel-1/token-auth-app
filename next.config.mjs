/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin:'use-credentials',
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:4000/:path*', // Proxy to Backend
          },
        ]
      },
};

export default nextConfig;
