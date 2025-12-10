import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Replit preview iframe to access the dev server
  ...(process.env.REPLIT_DEV_DOMAIN && {
    allowedDevOrigins: [
      `https://${process.env.REPLIT_DEV_DOMAIN}`,
      process.env.REPLIT_DEV_DOMAIN,
    ],
  }),
  async redirects() {
    return [
      {
        source: '/drain-cleaning-services-in-tucson-marana-and-oro-valley-az',
        destination: '/services/drain-cleaning',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
};

export default nextConfig;
