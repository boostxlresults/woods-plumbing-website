import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <Html lang="en">
      <Head>
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
                  
                  // GDPR/CCPA Compliance: Default to denied until user consents
                  gtag('consent', 'default', {
                    'analytics_storage': 'denied',
                    'ad_storage': 'denied',
                    'wait_for_update': 500
                  });
                  
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
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
