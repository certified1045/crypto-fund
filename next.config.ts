const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Allows production builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
  // experimental: {
  //   serverActions: true,
  // },
};

export default nextConfig;
