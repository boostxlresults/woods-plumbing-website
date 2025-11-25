import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, Wrench, CheckCircle } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';

const PlumbingServicesPage: NextPage = () => {
  const featuredServices = servicesData.filter(s => s.featured).slice(0, 12);
  const allServices = servicesData;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Plumbing Services - ${BUSINESS.name}`,
    "description": "Complete plumbing services for homes and businesses in Southern Arizona",
    "numberOfItems": allServices.length,
    "itemListElement": featuredServices.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.shortDescription,
        "url": `${BUSINESS.website}/services/${service.slug}`
      }
    }))
  };

  return (
    <div>
      <Head>
        <title>{`Complete Plumbing Services in Tucson & Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Wood's Plumbing offers ${allServices.length}+ professional plumbing services in Tucson and Southern Arizona. Emergency repairs, water heaters, drain cleaning, leak detection, gas lines, and more. Licensed ROC ${BUSINESS.trust.license}. Call ${BUSINESS.phone}.`} />
        <link rel="canonical" href={`${BUSINESS.website}/plumbing-services`} />
        
        <meta property="og:title" content={`Complete Plumbing Services | ${BUSINESS.name}`} />
        <meta property="og:description" content={`${allServices.length}+ professional plumbing services. Emergency repairs, water heaters, drain cleaning, and more.`} />
        <meta property="og:url" content={`${BUSINESS.website}/plumbing-services`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Plumbing Services | ${BUSINESS.name}`} />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="plumbing services Tucson, plumber Tucson AZ, emergency plumbing, water heater repair, drain cleaning, leak detection, Southern Arizona plumber" />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Tucson" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <HeroSplit
        title="COMPLETE PLUMBING SERVICES"
        subtitle={`${allServices.length}+ professional plumbing services for homes and businesses throughout Southern Arizona. From emergency repairs to routine maintenance, Wood's Plumbing has you covered.`}
        ctaText="Call Us Now!"
        imageSrc="/images/team_-_professional_plumbing_crew.png"
        imageAlt="Professional plumbing services team"
        backgroundColor="gray"
        showBanner={true}
        bannerText="FREE ESTIMATES. NO EXTRA CHARGE FOR EVENING SERVICE"
        showTrustBadges={true}
        analyticsLocation="plumbing_services_hero"
      />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Your Full-Service Plumbing Company
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              For over 46 years, Wood&apos;s Plumbing has been Southern Arizona&apos;s trusted plumbing contractor. We handle everything from emergency repairs at 3 AM to scheduled water heater replacements, from stubborn drain clogs to complete home repiping projects. No job is too big or too small.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our fleet of fully-equipped service vehicles is positioned throughout Tucson, Marana, Oro Valley, and surrounding communities for rapid response. When you call Wood&apos;s Plumbing, you get licensed technicians with the training, tools, and parts to fix it right the first time.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">24/7 Emergency Service Available</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">No Extra Charge for Evenings & Weekends</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Licensed & Insured - ROC {BUSINESS.trust.license}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Free Estimates on All Work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Our Most Popular Services
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featuredServices.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 group-hover:text-red-600 transition-colors">
                  {service.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8">
                View All {allServices.length} Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-center">
              Service Categories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/emergency-plumber-in-tucson" className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-bold mb-2">Emergency Services</h3>
                <p className="text-gray-300">24/7 emergency plumbing for burst pipes, floods, and urgent repairs.</p>
              </Link>
              <Link href="/water-heater" className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-bold mb-2">Water Heaters</h3>
                <p className="text-gray-300">Installation, repair, and replacement of tank and tankless systems.</p>
              </Link>
              <Link href="/clogged-drain-services" className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-bold mb-2">Drain Services</h3>
                <p className="text-gray-300">Drain cleaning, hydro-jetting, and camera inspection.</p>
              </Link>
              <Link href="/sewer" className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-bold mb-2">Sewer Services</h3>
                <p className="text-gray-300">Sewer line repair, replacement, and trenchless solutions.</p>
              </Link>
              <Link href="/leak" className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-bold mb-2">Leak Detection</h3>
                <p className="text-gray-300">Advanced leak detection and repair for hidden leaks.</p>
              </Link>
              <Link href="/gas-services" className="bg-white/10 p-6 rounded-lg hover:bg-white/20 transition-colors">
                <h3 className="text-xl font-bold mb-2">Gas Services</h3>
                <p className="text-gray-300">Gas line installation, repair, testing, and leak detection.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Need Plumbing Services?
          </h2>
          <p className="text-xl mb-6">Yeah, we do that.</p>
          <a href={`tel:${BUSINESS.phone}`}>
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold text-xl px-10 py-6">
              Call now: {BUSINESS.phone}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default PlumbingServicesPage;
