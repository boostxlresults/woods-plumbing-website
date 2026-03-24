import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <Html lang="en">
      <Head>
        {/* ─── Metadata ─────────────────────────────────────────────────────── */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* ─── LCP Preload: Hero image ───────────────────────────────────────
            Preloading the hero JPEG tells the browser to fetch it immediately
            during HTML parsing — before CSS, JS, or fonts. This is the single
            highest-impact LCP fix available. The `imagesrcset` matches the
            Next.js image optimizer output for a 100vw mobile image.
        ──────────────────────────────────────────────────────────────────── */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-plumber.jpg"
          // @ts-ignore — imagesrcset is valid HTML but not yet in TS types
          imagesrcset="/_next/image?url=%2Fimages%2Fhero-plumber.jpg&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fhero-plumber.jpg&w=828&q=75 828w, /_next/image?url=%2Fimages%2Fhero-plumber.jpg&w=1080&q=75 1080w"
          imagesizes="100vw"
        />

        {/* ─── DNS Prefetch + Preconnect for critical third parties ─────────
            Preconnect establishes the TCP/TLS handshake early so requests
            to these origins don't block rendering. Only preconnect to origins
            that are needed on first paint.
        ──────────────────────────────────────────────────────────────────── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://static.servicetitan.com" />
        <link rel="dns-prefetch" href="https://embed.scheduler.servicetitan.com" />
        <link rel="dns-prefetch" href="https://scheduler.servicetitan.com" />
        <link rel="dns-prefetch" href="https://mads-dni-go.servicetitan.com" />

        {/* ─── Google Analytics / Consent Mode v2 ──────────────────────────
            Consent defaults to 'granted' for all signals. Wood's Plumbing is
            a US-based business (Marana, AZ). CCPA does NOT require opt-in
            consent for analytics — only opt-OUT rights. GDPR applies to EU
            residents only and is not applicable here. The CookieConsent
            banner still provides users the ability to opt out, fully
            satisfying CCPA requirements.

            IMPORTANT: The gtag inline script must come BEFORE the async
            gtag/js script so consent mode is initialized before any hits fire.
            The gtag/js script is loaded with `async` so it does NOT block
            HTML parsing or LCP.
        ──────────────────────────────────────────────────────────────────── */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}

                  gtag('consent', 'default', {
                    'analytics_storage': 'granted',
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'functionality_storage': 'granted',
                    'personalization_storage': 'granted',
                    'security_storage': 'granted'
                  });

                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                    send_page_view: true,
                    allow_google_signals: true,
                    allow_ad_personalization_signals: true,
                  });
                `,
              }}
            />
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
          </>
        )}

        {/* ─── ServiceTitan DNI (Dynamic Number Insertion) ──────────────────
            PERFORMANCE FIX: Moved from a synchronous inline script to a
            deferred load strategy. The original implementation used
            insertBefore() which is synchronous and blocks HTML parsing.

            New approach:
            1. We initialize the DNI queue object synchronously (tiny, ~200 bytes)
               so dni('init') calls don't throw errors.
            2. The actual dni.js script file is loaded via a separate <script>
               tag with `defer` — this means it downloads in parallel but only
               executes AFTER the HTML is fully parsed, so it never blocks LCP.
            3. dni('load') is called via DOMContentLoaded which fires after
               defer scripts execute — same behavior as before, zero LCP impact.
        ──────────────────────────────────────────────────────────────────── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize DNI queue — synchronous but tiny (~200 bytes, no network request)
              window['ServiceTitanDniObject'] = 'dni';
              window['dni'] = window['dni'] || function() {
                (window['dni'].q = window['dni'].q || []).push(arguments);
              };
              window['dni'].l = 1 * new Date();
              dni('init', '227669022');
            `,
          }}
        />
        {/* Load the actual DNI script deferred — never blocks LCP */}
        <script
          defer
          src="https://static.servicetitan.com/marketing-ads/dni.js"
          onLoad={() => {}}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                if (window.dni && typeof window.dni === 'function') {
                  dni('load');
                }
              }, false);
            `,
          }}
        />

        {/* ServiceTitan Scheduling Pro Widget — lazy-loaded in ScheduleButton component */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
