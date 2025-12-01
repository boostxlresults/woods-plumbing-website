'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  Phone, MapPin, Calendar, ChevronDown, Menu, X, Wrench, Droplet, Flame, FlaskConical, 
  Home, Zap, AlertCircle, Pipette, Sparkles, AlertTriangle, Droplets, Wind, AlertOctagon,
  RefreshCw, ThermometerSun, Shield, ClipboardCheck, ShowerHead, Gauge, Factory,
  Waves, Trash2, Search, Camera, WrenchIcon, Settings, Package, CircleAlert,
  BadgeCheck, TreePine, Users, BookOpen, Info, ChevronRight
} from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from '@/lib/analytics';
import { serviceCategories } from '@/lib/data/service-categories';
import locationsData from '@/lib/data/locations.json';
import servicesData from '@/lib/data/services.json';

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  // Icon mapping for categories
  const categoryIcons: Record<string, any> = {
    'Emergency Services': AlertCircle,
    'Plumbing Services': Wrench,
    'Leak Detection': Droplet,
    'Repiping': Pipette,
    'Drains & Sewer': Droplet,
    'Water Heaters': Flame,
    'Gas Services': Flame,
    'Water Treatment': FlaskConical,
    'Fixtures & Installations': Home,
    'Additional Services': Sparkles
  };

  // Get icon component from icon name string
  const getServiceIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'AlertCircle': AlertCircle,
      'AlertTriangle': AlertTriangle,
      'Droplets': Droplets,
      'Wind': Wind,
      'AlertOctagon': AlertOctagon,
      'Wrench': Wrench,
      'RefreshCw': RefreshCw,
      'Zap': Zap,
      'ThermometerSun': ThermometerSun,
      'Shield': Shield,
      'ClipboardCheck': ClipboardCheck,
      'ShowerHead': ShowerHead,
      'Gauge': Gauge,
      'Factory': Factory,
      'Droplet': Droplet,
      'Waves': Waves,
      'Trash2': Trash2,
      'Search': Search,
      'Camera': Camera,
      'WrenchIcon': WrenchIcon,
      'Settings': Settings,
      'Package': Package,
      'CircleAlert': CircleAlert,
      'Flame': Flame,
      'FlaskConical': FlaskConical,
      'Home': Home,
      'Pipette': Pipette,
      'BadgeCheck': BadgeCheck,
      'TreePine': TreePine,
      'Users': Users,
      'Sparkles': Sparkles
    };
    return iconMap[iconName] || Wrench;
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
                className="relative group"
              >
                <button 
                  className="text-navy-700 hover:text-red-600 font-bold text-base uppercase transition-colors flex items-center gap-1"
                  onMouseEnter={() => handleMouseEnter(menu.slug)}
                >
                  {menu.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {activeDropdown === menu.slug && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50"
                    onMouseEnter={() => handleMouseEnter(menu.slug)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg shadow-2xl min-w-[700px]">
                      <div className="p-8 grid grid-cols-2 gap-8">
                        {menu.categories.map((categoryName) => {
                          const category = serviceCategories.find(c => c.name === categoryName);
                          if (!category) return null;
                          const CategoryIcon = categoryIcons[category.name] || Wrench;
                          
                          return (
                            <div key={category.slug}>
                              <h3 className="font-bold text-navy-700 text-sm mb-4 uppercase flex items-center gap-2">
                                <CategoryIcon className="w-5 h-5 text-red-600" />
                                {category.name}
                              </h3>
                              <ul className="space-y-2.5 ml-7">
                                {category.services.map((service) => {
                                  const serviceData = servicesData.find(s => s.slug === service.slug);
                                  const ServiceIcon = serviceData?.icon ? getServiceIcon(serviceData.icon) : Wrench;
                                  
                                  return (
                                    <li key={service.slug}>
                                      <Link
                                        href={`/services/${service.slug}`}
                                        className="text-gray-600 hover:text-red-600 text-sm transition-colors flex items-center gap-2 hover:translate-x-1 transform duration-200"
                                      >
                                        <ServiceIcon className="w-4 h-4 flex-shrink-0" />
                                        <span>{service.name}</span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                      <div className="border-t border-gray-200 px-8 py-4 bg-gradient-to-r from-gray-50 to-white rounded-b-lg">
                        <Link 
                          href="/services" 
                          className="text-red-600 hover:text-red-700 font-bold text-sm flex items-center gap-2 group"
                        >
                          <span>View All Services</span>
                          <span className="group-hover:translate-x-1 transform transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* About Dropdown with nested Service Areas */}
            <div
              className="relative group"
            >
              <button 
                className="text-navy-700 hover:text-red-600 font-bold text-base uppercase transition-colors flex items-center gap-1"
                onMouseEnter={() => handleMouseEnter('about')}
              >
                ABOUT
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {(activeDropdown === 'about' || activeDropdown === 'about-service-areas') && (
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50"
                  onMouseEnter={() => handleMouseEnter('about')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-white border border-gray-200 rounded-lg shadow-2xl min-w-[350px]">
                    <div className="p-6 space-y-1">
                      {/* About Us Link */}
                      <Link
                        href="/about"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all group"
                      >
                        <Info className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-sm">About Us</span>
                      </Link>

                      {/* Service Areas with nested dropdown */}
                      <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('about-service-areas')}
                        onMouseLeave={() => handleMouseEnter('about')}
                      >
                        <button
                          className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-red-600" />
                            <span className="font-semibold text-sm">Service Areas</span>
                          </div>
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Nested Service Areas Dropdown */}
                        {activeDropdown === 'about-service-areas' && (
                          <div 
                            className="absolute left-full top-0 pl-2 z-50"
                          >
                            <div className="bg-white border border-gray-200 rounded-lg shadow-2xl min-w-[400px]">
                              <div className="p-6">
                                <h4 className="font-bold text-navy-700 text-xs mb-3 uppercase">
                                  We Serve Southern Arizona
                                </h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {locations.map((location) => (
                                    <Link
                                      key={location.slug}
                                      href={`/locations/${location.slug}`}
                                      className="text-gray-600 hover:text-red-600 text-sm transition-colors py-2 hover:translate-x-1 transform duration-200 flex items-center gap-2"
                                    >
                                      <MapPin className="w-3 h-3 flex-shrink-0" />
                                      <span>{location.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                              <div className="border-t border-gray-200 px-6 py-3 bg-gradient-to-r from-gray-50 to-white rounded-b-lg">
                                <Link 
                                  href="/locations" 
                                  className="text-red-600 hover:text-red-700 font-bold text-sm flex items-center gap-2 group"
                                >
                                  <span>View All Service Areas</span>
                                  <span className="group-hover:translate-x-1 transform transition-transform">→</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Blog Link */}
                      <Link
                        href="/blog"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all group"
                      >
                        <BookOpen className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-sm">Blog & Tips</span>
                      </Link>

                      {/* FAQ Link */}
                      <Link
                        href="/faq"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-all group"
                      >
                        <Info className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-sm">FAQs</span>
                      </Link>
                    </div>
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

            {/* Mobile: Hamburger + Call Button */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Larger Hamburger Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-navy-700 hover:text-red-600 flex flex-col justify-center items-center"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-9 h-9" />
                ) : (
                  <div className="flex flex-col gap-[6px]">
                    <span className="block w-8 h-[4px] bg-navy-700 rounded-full"></span>
                    <span className="block w-8 h-[4px] bg-navy-700 rounded-full"></span>
                    <span className="block w-8 h-[4px] bg-navy-700 rounded-full"></span>
                  </div>
                )}
              </button>

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
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link href="/locations" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  SERVICE AREAS
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  BLOG
                </Link>
              </li>
              <li>
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-navy-700 hover:text-red-600 font-bold uppercase text-sm block py-2">
                  CONTACT
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
