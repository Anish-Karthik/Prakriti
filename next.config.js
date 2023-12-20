/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        // images.unsplash.com
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // allow all domains 
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    typescript: {
      ignoreBuildErrors: true,
    },
  },
};


module.exports = (nextConfig);
