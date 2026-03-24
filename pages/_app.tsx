import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Inter, Playfair_Display } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EmergencyBanner } from '@/components/EmergencyBanner'
import { pageview } from '@/lib/analytics'

// ─── Font Loading Optimization ────────────────────────────────────────────────
// next/font automatically:
//   1. Downloads fonts at build time (zero runtime network requests)
//   2. Self-hosts them on the same domain (no Google Fonts DNS lookup)
//   3. Inlines the @font-face CSS into the page (no render-blocking stylesheet)
//   4. Adds font-display: swap (text shows immediately in system font)
//
// Inter: Load only latin subset, only the weights used in the UI (400, 500, 700)
// Playfair: Load only the weights used for headings (700, 800)
// This reduces the total font payload by ~40% vs loading all weights.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '700'],
  preload: true,
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-playfair',
  preload: false, // Playfair is only used for display headings — not critical for LCP
})

// ─── Lazy-load non-critical UI components ─────────────────────────────────────
// StickyCTA, FloatingLeadForm, and CookieConsent are NOT visible on first paint.
// Loading them dynamically means their JS is NOT included in the initial bundle,
// reducing the main thread work that blocks LCP.
const StickyCTA = dynamic(() => import('@/components/StickyCTA').then(m => ({ default: m.StickyCTA })), {
  ssr: false,
})
const FloatingLeadForm = dynamic(() => import('@/components/FloatingLeadForm').then(m => ({ default: m.FloatingLeadForm })), {
  ssr: false,
})
const CookieConsent = dynamic(() => import('@/components/CookieConsent').then(m => ({ default: m.CookieConsent })), {
  ssr: false,
})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans`}>
      {/* Critical above-the-fold components — loaded synchronously */}
      <EmergencyBanner />
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Component {...pageProps} />
      </main>
      <Footer />
      {/* Non-critical components — lazy-loaded after LCP to avoid blocking first paint */}
      <StickyCTA />
      <FloatingLeadForm />
      <CookieConsent />
    </div>
  )
}

export default MyApp
