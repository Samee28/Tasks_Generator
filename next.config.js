/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    turbo: false, // Disable turbopack for production
  },
};

module.exports = nextConfig;
