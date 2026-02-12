/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  /* config options here */
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

module.exports = nextConfig;
