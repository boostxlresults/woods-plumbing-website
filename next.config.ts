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
      // ─── Legacy one-off redirect ───────────────────────────────────────────
      {
        source: '/drain-cleaning-services-in-tucson-marana-and-oro-valley-az',
        destination: '/services/drain-cleaning',
        permanent: true,
      },

      // ─── Standalone duplicate service pages → canonical /services/ URLs ───
      // These pages duplicate content from /services/[slug] and were causing
      // "Duplicate, Google chose different canonical" errors in GSC.
      // 301 redirects are the strongest possible canonical signal.
      {
        source: '/water-heater',
        destination: '/services/water-heater-repair',
        permanent: true,
      },
      {
        source: '/repair',
        destination: '/services/plumbing-repairs',
        permanent: true,
      },
      {
        source: '/sewer',
        destination: '/services/sewer-line-repair',
        permanent: true,
      },
      {
        source: '/leak',
        destination: '/services/leak-detection',
        permanent: true,
      },
      {
        source: '/gas-services',
        destination: '/services/gas-line-installation',
        permanent: true,
      },
      {
        source: '/plumbing-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/additional-services',
        destination: '/services',
        permanent: true,
      },

      // ─── Trailing slash normalization ──────────────────────────────────────
      // Prevents Google from treating /services/drain-cleaning/ and
      // /services/drain-cleaning as two separate URLs (duplicate content).
      // Redirect any URL with a trailing slash (except homepage) to no-slash.
      {
        source: '/:path+/',
        destination: '/:path+',
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
