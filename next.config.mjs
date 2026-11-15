/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // fully static site: no server to attack, deploys anywhere
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};
export default nextConfig;
