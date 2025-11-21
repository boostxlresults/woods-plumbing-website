import Link from 'next/link';
import Image from 'next/image';
import { Phone, Clock, Award } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from '@/lib/analytics';

export function Header() {
  return (
    <header className="sticky top-[52px] z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group flex-shrink-0">
            <div className="relative w-48 h-16 md:w-64 md:h-20">
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

          {/* Right Side: Location, Phone, Schedule */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Service Area Badge */}
            <div className="hidden lg:block text-sm">
              <div className="text-gray-600 font-medium">Serving Pima County</div>
            </div>

            {/* Phone */}
            <a 
              href={`tel:${BUSINESS.phone}`} 
              onClick={() => trackPhoneClick('header')}
              className="flex items-center gap-2 text-navy-900 hover:text-copper-600 transition-colors"
            >
              <Phone className="w-5 h-5 hidden md:block" />
              <span className="font-bold text-lg md:text-xl">{BUSINESS.phone}</span>
            </a>

            {/* Schedule Button */}
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-copper-500 hover:bg-copper-600 text-white font-semibold px-6"
              >
                Schedule
              </Button>
            </Link>
          </div>
        </div>

        {/* Simple Navigation */}
        <nav className="mt-4 pt-3 border-t border-gray-100">
          <ul className="flex flex-wrap gap-6 md:gap-8 text-sm">
            <li>
              <Link href="/services" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/locations" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                Service Areas
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-700 hover:text-copper-600 font-medium transition-colors">
                Blog
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
