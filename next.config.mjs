/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
