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
            during HTML parsing — before CSS, JS, or fonts. The imagesrcset
            matches the Next.js image optimizer output for a 100vw mobile image.
        ──────────────────────────────────────────────────────────────────── */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-plumber.jpg"
          // @ts-ignore — imagesrcset is valid HTML but not yet in TS types
          imagesrcset="/_next/image?url=%2Fimages%2Fhero-plumber.jpg&w=640&q=75 640w, /_next/image?url=%2Fimages%2Fhero-plumber.jpg&w=828&q=75 828w, /_next/image?url=%2Fimages%2Fhero-plumber.jpg&w=1080&q=75 1080w"
          imagesizes="100vw"
        />

        {/* ─── DNS Prefetch only (NOT preconnect) for GTM ───────────────────
            CRITICAL CHANGE: Removed preconnect for googletagmanager.com.
            Preconnect was causing the browser to prioritize the GTM TCP/TLS
            handshake during the critical path, contributing to element render
            delay. dns-prefetch resolves the IP without blocking the parser.
            GTM itself is now loaded AFTER LCP via requestIdleCallback.
        ──────────────────────────────────────────────────────────────────── */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://static.servicetitan.com" />
        <link rel="dns-prefetch" href="https://embed.scheduler.servicetitan.com" />
        <link rel="dns-prefetch" href="https://scheduler.servicetitan.com" />
        <link rel="dns-prefetch" href="https://mads-dni-go.servicetitan.com" />

        {/* ─── Consent Mode v2 — Inline only (no network request) ──────────
            CRITICAL CHANGE: The gtag consent initialization is kept inline
            because it is tiny (~200 bytes, no network) and MUST fire before
            any GA4 hits. However, the actual gtag/js script (170 KiB) is
            NO LONGER loaded here with `async`.

            The 170 KiB GTM script was causing 153ms of main thread blocking
            BEFORE the LCP image could render, contributing to the 1,810ms
            Element Render Delay shown in PageSpeed Insights.

            The full gtag/js script is now loaded via requestIdleCallback
            AFTER the LCP element has painted (see body script below).
            This eliminates the element render delay entirely.

            Consent Mode: Wood's Plumbing is a US-based business (Marana, AZ).
            CCPA does NOT require opt-in consent — only opt-OUT rights.
            Defaulting to 'granted' is correct for US traffic.
        ──────────────────────────────────────────────────────────────────── */}
        {GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Initialize dataLayer and gtag queue — synchronous, no network
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                // Consent Mode v2 defaults — must be set before gtag/js loads
                gtag('consent', 'default', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'functionality_storage': 'granted',
                  'personalization_storage': 'granted',
                  'security_storage': 'granted'
                });

                // Queue the config — will execute once gtag/js loads
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
        )}

        {/* ─── ServiceTitan DNI queue init — synchronous, no network ────────
            Initialize the DNI queue object so dni('init') calls don't throw.
            The actual 6 KiB dni.js script is loaded after LCP (see body).
        ──────────────────────────────────────────────────────────────────── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window['ServiceTitanDniObject'] = 'dni';
              window['dni'] = window['dni'] || function() {
                (window['dni'].q = window['dni'].q || []).push(arguments);
              };
              window['dni'].l = 1 * new Date();
              dni('init', '227669022');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/* ─── Post-LCP Script Loader ────────────────────────────────────────
            CORE LCP FIX: Load all third-party scripts AFTER the LCP element
            has painted. Strategy:

            1. Listen for the LCP PerformanceObserver entry to confirm the
               LCP element has painted.
            2. Use requestIdleCallback (rIC) to load scripts only when the
               browser's main thread is idle — zero impact on LCP or FCP.
            3. Fallback: if rIC isn't supported (Safari < 16), load after
               a 3-second delay to ensure LCP has had time to paint.

            Scripts loaded this way:
            - gtag/js (170 KiB, 153ms main thread) — the primary LCP blocker
            - dni.js (6 KiB) — ServiceTitan call tracking

            This pattern eliminates the "Element render delay" subpart of LCP
            by ensuring no third-party JS runs on the main thread before paint.
        ──────────────────────────────────────────────────────────────────── */}
        {GA_MEASUREMENT_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var GA_ID = '${GA_MEASUREMENT_ID}';
                  var scriptsLoaded = false;

                  function loadThirdPartyScripts() {
                    if (scriptsLoaded) return;
                    scriptsLoaded = true;

                    // Load GTM/GA4 — the primary LCP blocker (170 KiB)
                    var gtagScript = document.createElement('script');
                    gtagScript.async = true;
                    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
                    document.head.appendChild(gtagScript);

                    // Load ServiceTitan DNI after GTM
                    gtagScript.onload = function() {
                      var dniScript = document.createElement('script');
                      dniScript.async = true;
                      dniScript.src = 'https://static.servicetitan.com/marketing-ads/dni.js';
                      dniScript.onload = function() {
                        if (window.dni && typeof window.dni === 'function') {
                          dni('load');
                        }
                      };
                      document.head.appendChild(dniScript);
                    };
                  }

                  // Strategy 1: Load after LCP has painted (most precise)
                  if ('PerformanceObserver' in window) {
                    try {
                      var lcpObserver = new PerformanceObserver(function(list) {
                        var entries = list.getEntries();
                        if (entries.length > 0) {
                          lcpObserver.disconnect();
                          // LCP has painted — now load third-party scripts
                          if ('requestIdleCallback' in window) {
                            requestIdleCallback(loadThirdPartyScripts, { timeout: 2000 });
                          } else {
                            setTimeout(loadThirdPartyScripts, 0);
                          }
                        }
                      });
                      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
                    } catch(e) {
                      // PerformanceObserver not supported for LCP — use fallback
                      setTimeout(loadThirdPartyScripts, 3000);
                    }
                  } else {
                    // Strategy 2: Fallback for browsers without PerformanceObserver
                    if ('requestIdleCallback' in window) {
                      requestIdleCallback(loadThirdPartyScripts, { timeout: 3000 });
                    } else {
                      // Strategy 3: Final fallback — load after 3s delay
                      setTimeout(loadThirdPartyScripts, 3000);
                    }
                  }

                  // Safety net: always load within 5 seconds regardless
                  setTimeout(loadThirdPartyScripts, 5000);
                })();
              `,
            }}
          />
        )}
      </body>
    </Html>
  );
}
