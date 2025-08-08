import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  matcher: ["/admin/:path*"],
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Configure image domains if needed
    domains: [ 'khanepani.shaktatechnology.com'],
  },
};
export default nextConfig;