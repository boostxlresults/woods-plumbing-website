import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Facebook, Instagram, Calendar } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { trackPhoneClick } from '@/lib/analytics';
import { ScheduleButton } from '@/components/ScheduleButton';
import servicesData from '@/lib/data/services.json';
import locationsData from '@/lib/data/locations.json';

export function Footer() {
  const popularServices = servicesData.filter(s => s.featured).slice(0, 8);
  const popularLocations = locationsData.slice(0, 6);

  return (
    <footer className="bg-navy-950 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="relative w-72 h-32 mb-4">
              <Image
                src="/images/woods-plumbing-logo.png"
                alt={BUSINESS.name}
                fill
                sizes="288px"
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-sm mb-6 text-gray-400">{BUSINESS.tagline}</p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-red-400" />
                <a 
                  href={`tel:${BUSINESS.phone}`} 
                  onClick={() => trackPhoneClick('footer')}
                  className="hover:text-red-400 transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-red-400" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-red-400 transition-colors">
                  {BUSINESS.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-red-400" />
                <span className="text-gray-400">{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a 
                href={BUSINESS.social.facebook} 
                className="hover:text-red-400 transition-colors" 
                aria-label="Facebook" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={BUSINESS.social.instagram} 
                className="hover:text-red-400 transition-colors" 
                aria-label="Instagram" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Schedule Button in Footer */}
            <div className="mt-6">
              <ScheduleButton 
                className="bg-red-600 hover:bg-red-700 text-white w-full"
                size="lg"
              />
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Popular Services</h3>
            <ul className="space-y-2.5 text-sm">
              {popularServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-red-400 transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="hover:text-red-400 font-semibold transition-colors">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2.5 text-sm">
              {popularLocations.map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className="hover:text-red-400 transition-colors">
                    {location.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/locations" className="hover:text-red-400 font-semibold transition-colors">
                  View All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-400 transition-colors">
                  Plumbing Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services/emergency-plumbing" className="hover:text-red-400 transition-colors">
                  24/7 Emergency Service
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-red-400 transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-red-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-5 bg-red-600 rounded-lg shadow-medium hover:shadow-large transition-shadow">
              <p className="text-white font-bold text-sm mb-1">24/7 Emergency Service</p>
              <a 
                href={`tel:${BUSINESS.phone}`}
                onClick={() => trackPhoneClick('footer_emergency')}
                className="text-white text-xl font-bold hover:text-navy-100 transition-colors block"
              >
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-12 pt-8 border-t border-navy-800">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-white text-lg font-bold mb-2">Find Us on Google Maps</h3>
              <p className="text-gray-400 text-sm mb-3">
                Visit our location in Marana, AZ or call for service throughout Southern Arizona
              </p>
              <a 
                href={BUSINESS.social.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium text-sm transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                View on Google Maps
              </a>
            </div>
            <div className="w-full md:w-96 lg:w-[450px] rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7241.52024404527!2d-111.2083739!3d32.45883450000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86d5e4946b344903%3A0xa0d7cf9d3dd6f0c3!2sWood&#39;s%20Plumbing%20Enterprises%20LLC!5e1!3m2!1sen!2sus!4v1764620181207!5m2!1sen!2sus" 
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Wood's Plumbing Enterprises LLC on Google Maps"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-8 pt-8 text-sm text-center">
          <p className="text-gray-400">
            © 2025 {BUSINESS.legalName}. All rights reserved. |{' '}
            <span className="text-red-400">License: {BUSINESS.trust.license}</span>
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-4 text-gray-500">
            <Link href="/privacy-policy" className="hover:text-red-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms" className="hover:text-red-400 transition-colors">
              Terms of Use
            </Link>
            <span className="text-gray-600">|</span>
            <a 
              href={BUSINESS.social.googleBusiness} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-400 transition-colors"
            >
              Google Business Profile
            </a>
          </div>
          <p className="mt-2 text-gray-500">
            Proudly serving Southern Arizona since {BUSINESS.trust.founded}
          </p>
        </div>
      </div>
    </footer>
  );
}
