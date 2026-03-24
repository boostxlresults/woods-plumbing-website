import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <Html lang="en">
      <Head>
        {/* Default meta robots tag for SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://static.servicetitan.com" />
        <link rel="preconnect" href="https://embed.scheduler.servicetitan.com" />
        <link rel="preconnect" href="https://scheduler.servicetitan.com" />
        <link rel="preconnect" href="https://mads-dni-go.servicetitan.com" />
        
        {GA_MEASUREMENT_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  
                  // ─── Consent Mode v2 ──────────────────────────────────────────────────
                  // Wood's Plumbing is a US-based business (Marana, AZ).
                  // CCPA (California) does NOT require opt-in consent for analytics —
                  // only opt-OUT rights. GDPR applies to EU residents only and is not
                  // applicable here. Defaulting to 'granted' is correct for US traffic.
                  // The CookieConsent banner still provides users the ability to opt out,
                  // fully satisfying CCPA requirements.
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
        
        {/* ServiceTitan DNI - Dynamic Number Insertion for Call Tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var dni = (function(q,w,e,r,t,y,u){q['ServiceTitanDniObject']=t;q[t]=q[t]||function(){
                (q[t].q=q[t].q||[]).push(arguments)};q[t].l=1*new Date();y=w.createElement(e);
                u=w.getElementsByTagName(e)[0];y.async=true;y.src=r;u.parentNode.insertBefore(y,u);
                return q[t];
              })(window,document,'script','https://static.servicetitan.com/marketing-ads/dni.js','dni');
              dni('init', '227669022');
              document.addEventListener('DOMContentLoaded', function() { dni('load'); }, false);
            `,
          }}
        />
        
        {/* ServiceTitan Scheduling Pro Widget - Now lazy-loaded in ScheduleButton component for performance */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
