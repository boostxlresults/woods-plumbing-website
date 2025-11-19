import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';
import { services } from '@/data/services';
import { locations } from '@/data/locations';

export function Footer() {
  const popularServices = services.slice(0, 8);
  const popularLocations = locations.slice(0, 6);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">{businessInfo.name}</h3>
            <p className="text-sm mb-4">{businessInfo.tagline}</p>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="hover:text-white">
                  {businessInfo.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white">
                  {businessInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>{businessInfo.address.full}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <a href={businessInfo.social.facebook} className="hover:text-white" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={businessInfo.social.instagram} className="hover:text-white" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={businessInfo.social.twitter} className="hover:text-white" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={businessInfo.social.youtube} className="hover:text-white" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
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
                    {service.title}
                  </Link>
                </li>
              ))}
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
                <Link href="/emergency" className="hover:text-white">
                  24/7 Emergency Service
                </Link>
              </li>
              <li>
                <Link href="/knowledge-base" className="hover:text-white">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white">
                  Customer Reviews
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-blue-900 rounded-lg">
              <p className="text-white font-bold text-sm">24/7 Emergency</p>
              <a href={`tel:${businessInfo.phone}`} className="text-yellow-400 text-lg font-bold">
                {businessInfo.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>
            © {new Date().getFullYear()} {businessInfo.legalName}. All rights reserved. |{' '}
            License: {businessInfo.license} |{' '}
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link> |{' '}
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </p>
          <p className="mt-2 text-gray-500">
            Proudly serving Southern Arizona since {businessInfo.foundedYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
