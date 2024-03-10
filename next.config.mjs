/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack() {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
  },
};

export default nextConfig;
