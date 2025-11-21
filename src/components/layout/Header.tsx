import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Calendar } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from '@/lib/analytics';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-[52px] z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-40 h-14 md:w-48 md:h-16">
              <Image
                src="/images/woods-plumbing-logo.png"
                alt={BUSINESS.name}
                fill
                sizes="(max-width: 768px) 160px, 192px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/locations" className="text-navy-700 hover:text-red-600 font-bold text-sm uppercase transition-colors">
              LOCATIONS
            </Link>
            <Link href="/services" className="text-navy-700 hover:text-red-600 font-bold text-sm uppercase transition-colors">
              PLUMBING
            </Link>
            <Link href="/services?category=drain" className="text-navy-700 hover:text-red-600 font-bold text-sm uppercase transition-colors">
              DRAINS
            </Link>
            <Link href="/services?category=water-quality" className="text-navy-700 hover:text-red-600 font-bold text-sm uppercase transition-colors">
              WATER QUALITY
            </Link>
            <Link href="/contact" className="text-navy-700 hover:text-red-600 font-bold text-sm uppercase transition-colors">
              CONTACT
            </Link>
          </nav>

          {/* Right Side: Location + CTAs */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Location Badge */}
            <div className="hidden md:flex items-center gap-2 text-navy-700">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="font-semibold text-sm">MARANA, AZ</span>
            </div>

            {/* Schedule Button */}
            <Link href="/contact">
              <Button 
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>SCHEDULE</span>
              </Button>
            </Link>

            {/* Call Button */}
            <a 
              href={`tel:${BUSINESS.phone}`} 
              onClick={() => trackPhoneClick('header')}
            >
              <Button 
                size="sm"
                className="bg-navy-700 hover:bg-navy-800 text-white font-bold uppercase px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">CALL {BUSINESS.phone}</span>
                <span className="sm:hidden">CALL</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden mt-3 pt-3 border-t border-gray-200">
          <ul className="flex flex-wrap gap-4 text-xs">
            <li>
              <Link href="/locations" className="text-navy-700 hover:text-red-600 font-bold uppercase">
                LOCATIONS
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-navy-700 hover:text-red-600 font-bold uppercase">
                PLUMBING
              </Link>
            </li>
            <li>
              <Link href="/services?category=drain" className="text-navy-700 hover:text-red-600 font-bold uppercase">
                DRAINS
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-navy-700 hover:text-red-600 font-bold uppercase">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
