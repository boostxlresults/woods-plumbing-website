import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}

export default MyApp
