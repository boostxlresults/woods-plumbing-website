import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import servicesData from '@/lib/data/services.json';
import locationsData from '@/lib/data/locations.json';

export function Footer() {
  const popularServices = servicesData.filter(s => s.featured).slice(0, 8);
  const popularLocations = locationsData.slice(0, 6);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{BUSINESS.name}</h3>
            <p className="text-sm mb-4">{BUSINESS.tagline}</p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-white">
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-white">
                  {BUSINESS.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{BUSINESS.address.street}, {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a href={BUSINESS.social.facebook} className="hover:text-white" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={BUSINESS.social.instagram} className="hover:text-white" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Popular Services</h3>
            <ul className="space-y-2 text-sm">
              {popularServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-white">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="hover:text-white font-semibold">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Service Areas</h3>
            <ul className="space-y-2 text-sm">
              {popularLocations.map((location) => (
                <li key={location.slug}>
                  <Link href={`/locations/${location.slug}`} className="hover:text-white">
                    {location.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="hover:text-white font-semibold">
                  View All Locations →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Plumbing Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/services/emergency-plumbing" className="hover:text-white">
                  24/7 Emergency Service
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-white">
                  Knowledge Base
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-blue-900 rounded-lg">
              <p className="text-white font-bold text-sm">24/7 Emergency</p>
              <a href={`tel:${BUSINESS.phone}`} className="text-yellow-400 text-lg font-bold">
                {BUSINESS.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>
            © 2025 {BUSINESS.legalName}. All rights reserved. |{' '}
            License: {BUSINESS.trust.license}
          </p>
          <p className="mt-2 text-gray-500">
            Proudly serving Southern Arizona since {BUSINESS.trust.founded}
          </p>
        </div>
      </div>
    </footer>
  );
}
