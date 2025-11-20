import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { trackPhoneClick } from '@/lib/analytics';
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
            <h3 className="text-white text-2xl font-bold font-display mb-4">{BUSINESS.name}</h3>
            <p className="text-sm mb-6 text-gray-400">{BUSINESS.tagline}</p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-copper-400" />
                <a 
                  href={`tel:${BUSINESS.phone}`} 
                  onClick={() => trackPhoneClick('footer')}
                  className="hover:text-copper-400 transition-colors"
                >
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-copper-400" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-copper-400 transition-colors">
                  {BUSINESS.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-copper-400" />
                <span className="text-gray-400">{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a 
                href={BUSINESS.social.facebook} 
                className="hover:text-copper-400 transition-colors" 
                aria-label="Facebook" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={BUSINESS.social.instagram} 
                className="hover:text-copper-400 transition-colors" 
                aria-label="Instagram" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Popular Services</h3>
            <ul className="space-y-2.5 text-sm">
              {popularServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-copper-400 transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="hover:text-copper-400 font-semibold transition-colors">
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
                  <Link href={`/locations/${location.slug}`} className="hover:text-copper-400 transition-colors">
                    {location.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/locations" className="hover:text-copper-400 font-semibold transition-colors">
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
                <Link href="/about" className="hover:text-copper-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-copper-400 transition-colors">
                  Plumbing Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-copper-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services/emergency-plumbing" className="hover:text-copper-400 transition-colors">
                  24/7 Emergency Service
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-copper-400 transition-colors">
                  Knowledge Base
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-5 bg-copper-600 rounded-lg shadow-medium hover:shadow-large transition-shadow">
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

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-12 pt-8 text-sm text-center">
          <p className="text-gray-400">
            © 2025 {BUSINESS.legalName}. All rights reserved. |{' '}
            <span className="text-copper-400">License: {BUSINESS.trust.license}</span>
          </p>
          <p className="mt-2 text-gray-500">
            Proudly serving Southern Arizona since {BUSINESS.trust.founded}
          </p>
        </div>
      </div>
    </footer>
  );
}
