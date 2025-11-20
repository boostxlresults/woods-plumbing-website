import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EmergencyBanner } from '@/components/EmergencyBanner'
import { pageview } from '@/lib/analytics'

// Optimize font loading with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
    <div className={`${inter.variable} font-sans`}>
      <EmergencyBanner />
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
