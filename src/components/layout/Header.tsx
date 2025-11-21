'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Phone, MapPin, Calendar, ChevronDown, Menu, X } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from '@/lib/analytics';
import { serviceCategories } from '@/lib/data/service-categories';
import locationsData from '@/lib/data/locations.json';

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const megaMenuCategories = [
    {
      label: "PLUMBING",
      slug: "plumbing",
      categories: ['Emergency Services', 'Plumbing Services', 'Leak Detection', 'Repiping']
    },
    {
      label: "DRAINS",
      slug: "drains",
      categories: ['Drains & Sewer']
    },
    {
      label: "WATER HEATERS",
      slug: "water-heaters",
      categories: ['Water Heaters']
    },
    {
      label: "GAS SERVICES",
      slug: "gas",
      categories: ['Gas Services']
    },
    {
      label: "MORE",
      slug: "more",
      categories: ['Water Treatment', 'Fixtures & Installations', 'Additional Services']
    }
  ];

  const locations = locationsData.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-[60px] z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between lg:gap-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-36 h-16 md:w-48 md:h-20 lg:w-56 lg:h-24">
              <Image
                src="/images/woods-plumbing-logo.png"
                alt={BUSINESS.name}
                fill
                sizes="(max-width: 768px) 144px, (max-width: 1024px) 192px, 224px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Center Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 flex-1">
            <Link href="/" className="text-navy-700 hover:text-red-600 font-bold text-base uppercase transition-colors">
              HOME
            </Link>
            
            {megaMenuCategories.map((menu) => (
              <div
                key={menu.slug}
                className="relative"
                onMouseEnter={() => handleMouseEnter(menu.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-navy-700 hover:text-red-600 font-bold text-base uppercase transition-colors flex items-center gap-1">
                  {menu.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {activeDropdown === menu.slug && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[600px] z-50">
                    <div className="p-6 grid grid-cols-2 gap-6">
                      {menu.categories.map((categoryName) => {
                        const category = serviceCategories.find(c => c.name === categoryName);
                        if (!category) return null;
                        
                        return (
                          <div key={category.slug}>
                            <h3 className="font-bold text-navy-700 text-sm mb-3 uppercase">{category.name}</h3>
                            <ul className="space-y-2">
                              {category.services.map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="text-gray-700 hover:text-red-600 text-sm transition-colors block"
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 rounded-b-lg">
                      <Link 
                        href="/services" 
                        className="text-red-600 hover:text-red-700 font-semibold text-sm"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Service Areas Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('service-areas')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-navy-700 hover:text-red-600 font-bold text-base uppercase transition-colors flex items-center gap-1">
                SERVICE AREAS
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {activeDropdown === 'service-areas' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl min-w-[400px] z-50">
                  <div className="p-6">
                    <h3 className="font-bold text-navy-700 text-sm mb-3 uppercase">We Serve Southern Arizona</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {locations.map((location) => (
                        <Link
                          key={location.slug}
                          href={`/locations/${location.slug}`}
                          className="text-gray-700 hover:text-red-600 text-sm transition-colors py-1"
                        >
                          {location.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-6 py-3 bg-gray-50 rounded-b-lg">
                    <Link 
                      href="/locations" 
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      View All Service Areas →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className="text-navy-700 hover:text-red-600 font-bold text-base uppercase transition-colors">
              CONTACT
            </Link>
          </nav>

          {/* Right Side: Mobile Menu Button + Desktop CTAs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/contact">
                <Button 
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase px-6 py-3 text-sm flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>SCHEDULE</span>
                </Button>
              </Link>

              <a 
                href={`tel:${BUSINESS.phone}`} 
                onClick={() => trackPhoneClick('header')}
              >
                <Button 
                  size="sm"
                  className="bg-navy-700 hover:bg-navy-800 text-white font-bold uppercase px-6 py-3 text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL {BUSINESS.phone}</span>
                </Button>
              </a>
            </div>

            {/* Mobile: Call Button + Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <a 
                href={`tel:${BUSINESS.phone}`} 
                onClick={() => trackPhoneClick('header')}
              >
                <Button 
                  size="sm"
                  className="bg-navy-700 hover:bg-navy-800 text-white font-bold uppercase px-3 py-2 text-xs flex items-center gap-1"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL</span>
                </Button>
              </a>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-navy-700 hover:text-red-600"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-3 pt-3 border-t border-gray-200">
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  ALL SERVICES
                </Link>
              </li>
              <li>
                <Link href="/locations" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  SERVICE AREAS
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  CONTACT
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  BLOG
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-200">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>SCHEDULE ONLINE</span>
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
