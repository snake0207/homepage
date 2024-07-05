/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // basePath: "/homepage",
  images: {
    unoptimized: true,
    path: process.env.NEXT_PUBLIC_HOMEURL,
  },
  assetPrefix: process.env.NEXT_PUBLIC_IMAGEPATH,
};

module.exports = nextConfig;