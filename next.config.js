/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  // basePath: "/homepage",
  // assetPrefix:
  //   process.env.NODE_ENV === "production"
  //     ? "https://snake0207.github.io/homepage"
  //     : "",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
