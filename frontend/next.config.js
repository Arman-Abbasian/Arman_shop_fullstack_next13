/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverMiddleware: ["./middleware.js"],
};

module.exports = nextConfig;
