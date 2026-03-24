import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Replit preview iframe to access the dev server
  ...(process.env.REPLIT_DEV_DOMAIN && {
    allowedDevOrigins: [
      `https://${process.env.REPLIT_DEV_DOMAIN}`,
      process.env.REPLIT_DEV_DOMAIN,
    ],
  }),

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Legacy one-off redirect
      {
        source: '/drain-cleaning-services-in-tucson-marana-and-oro-valley-az',
        destination: '/services/drain-cleaning',
        permanent: true,
      },

      // Standalone duplicate service pages → canonical /services/ URLs
      // These pages duplicate content from /services/[slug] and were causing
      // "Duplicate, Google chose different canonical" errors in GSC.
      { source: '/water-heater', destination: '/services/water-heater-repair', permanent: true },
      { source: '/repair', destination: '/services/plumbing-repairs', permanent: true },
      { source: '/sewer', destination: '/services/sewer-line-repair', permanent: true },
      { source: '/leak', destination: '/services/leak-detection', permanent: true },
      { source: '/gas-services', destination: '/services/gas-line-installation', permanent: true },
      { source: '/plumbing-services', destination: '/services', permanent: true },
      { source: '/additional-services', destination: '/services', permanent: true },

      // Trailing slash normalization — prevents duplicate content
      { source: '/:path+/', destination: '/:path+', permanent: true },
    ];
  },

  // ─── Performance Headers ──────────────────────────────────────────────────
  // These headers instruct Vercel's CDN and the browser to cache aggressively,
  // which dramatically reduces TTFB and LCP on repeat visits and for users
  // hitting a warm CDN edge node.
  async headers() {
    return [
      {
        // Cache all static assets for 1 year (immutable = never revalidate)
        // Next.js content-hashes these files so cache busting is automatic.
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache all images for 1 year
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        // Cache fonts for 1 year
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // For all pages: add security headers + tell CDN to cache HTML for
        // 60 seconds at the edge (stale-while-revalidate: 300 means Vercel
        // serves stale HTML while regenerating in background — reduces TTFB).
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
        ],
      },
      {
        // Homepage: preload hero image via Link header (HTTP Early Hints)
        // This tells Vercel to push the image resource before the HTML is
        // even fully sent, giving the browser a head start on the LCP element.
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</_next/image?url=%2Fimages%2Fhero-plumber.jpg&w=828&q=75>; rel=preload; as=image',
          },
        ],
      },
    ];
  },

  // ─── Image Optimization ───────────────────────────────────────────────────
  // AVIF first (50% smaller than WebP), WebP as fallback.
  // minimumCacheTTL: cache optimized images for 30 days on Vercel's CDN.
  // Reduced deviceSizes to only what's actually needed (removes 2048/3840
  // which were generating huge files that never got used on this site).
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2592000, // 30 days
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },

  // ─── Build Optimizations ──────────────────────────────────────────────────
  compress: true,
  poweredByHeader: false,
  // Disable source maps in production — they add ~200ms to build time and
  // expose your source code. Use Vercel's built-in error tracking instead.
  productionBrowserSourceMaps: false,

  // Experimental: enable React compiler for automatic memoization
  // and partial prerendering for faster TTFB on dynamic pages.
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-slot'],
  },
};

export default nextConfig;
