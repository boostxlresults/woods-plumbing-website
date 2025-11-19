import Link from 'next/link';
import { Phone, Clock, Award } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-blue-200 font-semibold">
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Licensed ROC AZ ROC {BUSINESS.trust.license}</span>
              <span className="sm:hidden">ROC {BUSINESS.trust.license}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl md:text-3xl font-bold text-blue-900">{BUSINESS.name}</span>
            <span className="text-sm md:text-base text-gray-600">{BUSINESS.tagline}</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="hidden md:inline-flex">
                Get Free Estimate
              </Button>
              <Button size="default" className="md:hidden">
                Contact
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 border-t pt-4">
          <ul className="flex flex-wrap gap-6 text-sm md:text-base">
            <li>
              <Link href="/services" className="hover:text-blue-600 font-medium">
                Services
              </Link>
            </li>
            <li>
              <Link href="/locations" className="hover:text-blue-600 font-medium">
                Locations
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 font-medium">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-600 font-medium">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-600 font-medium">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
