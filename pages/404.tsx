import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../src/components/ui/button';
import { Home, Phone, Search } from 'lucide-react';
import { BUSINESS } from '../lib/constants';

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{`Page Not Found | ${BUSINESS.name}`}</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse our plumbing services or contact us for help." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Graphic */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-900">404</h1>
            <div className="text-6xl mt-4">🚰</div>
          </div>

          {/* Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Oops! This Page Has Sprung a Leak
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            But don&apos;t worry—we can help you find what you need!
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Home className="mr-2 h-5 w-5" />
                Go to Homepage
              </Button>
            </Link>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Phone className="mr-2 h-5 w-5" />
                Call {BUSINESS.phone}
              </Button>
            </a>
          </div>

          {/* Popular Links */}
          <div className="bg-white rounded-lg shadow-md p-8 text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Search className="mr-2 h-5 w-5 text-blue-600" />
              Looking for something specific?
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Services</h4>
                <ul className="space-y-2 text-blue-600">
                  <li><Link href="/services/emergency-plumbing" className="hover:underline">Emergency Plumbing</Link></li>
                  <li><Link href="/services/water-heater-repair" className="hover:underline">Water Heater Repair</Link></li>
                  <li><Link href="/services/drain-cleaning" className="hover:underline">Drain Cleaning</Link></li>
                  <li><Link href="/services" className="hover:underline font-semibold">View All Services →</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Information</h4>
                <ul className="space-y-2 text-blue-600">
                  <li><Link href="/locations" className="hover:underline">Service Areas</Link></li>
                  <li><Link href="/about" className="hover:underline">About Us</Link></li>
                  <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                  <li><Link href="/blog" className="hover:underline">Plumbing Tips & Blog</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-800 font-semibold">
              Have a plumbing emergency? Call {BUSINESS.phone} now for immediate assistance!
            </p>
            <p className="text-red-600 text-sm mt-1">{BUSINESS.hours.emergency}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
