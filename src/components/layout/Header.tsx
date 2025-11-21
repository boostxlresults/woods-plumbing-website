import Link from 'next/link';
import Image from 'next/image';
import { Phone, Clock, Award } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from '@/lib/analytics';

export function Header() {
  return (
    <header className="sticky top-[52px] z-40 bg-white shadow-sm">
      {/* Top Bar with Trust Signals */}
      <div className="bg-navy-800 text-white py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a 
                href={`tel:${BUSINESS.phone}`} 
                onClick={() => trackPhoneClick('header_topbar')}
                className="flex items-center gap-2 hover:text-copper-300 transition-colors font-semibold"
              >
                <Phone className="w-4 h-4" />
                <span>{BUSINESS.phone}</span>
              </a>
              <div className="hidden md:flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Licensed ROC AZ ROC {BUSINESS.trust.license}</span>
              <span className="sm:hidden">ROC {BUSINESS.trust.license}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center group">
            <div className="relative w-48 h-20 md:w-64 md:h-24">
              <Image
                src="/images/woods-plumbing-logo.png"
                alt={BUSINESS.name}
                fill
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/contact">
              <Button 
                size="lg" 
                className="hidden md:inline-flex bg-copper-500 hover:bg-copper-600 text-white shadow-sm hover:shadow-md transition-all duration-200"
              >
                Get Free Estimate
              </Button>
              <Button 
                size="default" 
                className="md:hidden bg-copper-500 hover:bg-copper-600 text-white"
              >
                Estimate
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-5 pt-4 border-t border-gray-200">
          <ul className="flex flex-wrap gap-6 md:gap-8 text-sm md:text-base">
            <li>
              <Link href="/services" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                Locations
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
