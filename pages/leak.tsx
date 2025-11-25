import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, Droplets, CheckCircle, Search } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';

const LeakServicesPage: NextPage = () => {
  const leakServices = servicesData.filter(s => 
    s.slug.includes('leak') || s.name.toLowerCase().includes('leak') || s.slug.includes('slab')
  );
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Leak Detection and Repair",
    "provider": {
      "@type": "Plumber",
      "name": BUSINESS.name,
      "telephone": BUSINESS.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Marana",
        "addressRegion": "AZ",
        "postalCode": "85653"
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Arizona"
    },
    "description": "Professional leak detection and repair services including slab leaks, hidden leaks, and water line repairs in Southern Arizona."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do you detect hidden leaks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use advanced electronic leak detection equipment including acoustic listening devices, thermal imaging cameras, and pressure testing. These tools allow us to pinpoint leaks behind walls, under floors, and underground without destructive exploration."
        }
      },
      {
        "@type": "Question",
        "name": "What are the signs of a slab leak?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Common signs include unexplained increases in water bills, the sound of running water when fixtures are off, warm spots on floors, cracks in walls or flooring, mold or mildew odors, and water pooling around your foundation."
        }
      },
      {
        "@type": "Question",
        "name": "How much does leak detection cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leak detection costs vary based on complexity. We offer free estimates and provide upfront pricing before any work begins. Finding leaks early saves money by preventing water damage and high utility bills."
        }
      }
    ]
  };

  return (
    <div>
      <Head>
        <title>{`Leak Detection & Repair in Tucson & Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Professional leak detection and repair services in Southern Arizona. Slab leaks, hidden leaks, water line repairs. Advanced electronic detection equipment. Licensed ROC ${BUSINESS.trust.license}. Call ${BUSINESS.phone}.`} />
        <link rel="canonical" href={`${BUSINESS.website}/leak`} />
        
        <meta property="og:title" content={`Leak Detection & Repair | ${BUSINESS.name}`} />
        <meta property="og:description" content="Advanced leak detection and expert repair for slab leaks, hidden leaks, and water line issues." />
        <meta property="og:url" content={`${BUSINESS.website}/leak`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Leak Services | ${BUSINESS.name}`} />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="leak detection Tucson, slab leak repair, water leak repair, hidden leak detection, pipe leak, emergency leak repair, Arizona leak service" />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Tucson" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <HeroSplit
        title="LEAK DETECTION & REPAIR"
        subtitle="Advanced electronic leak detection and expert repair services throughout Southern Arizona. We find hidden leaks fast—saving your property and your water bill."
        ctaText="Call Us Now!"
        imageSrc="/images/team_-_professional_plumbing_crew.png"
        imageAlt="Professional leak detection services"
        backgroundColor="gray"
        showBanner={true}
        bannerText="ADVANCED ELECTRONIC LEAK DETECTION"
        showTrustBadges={true}
        analyticsLocation="leak_services_hero"
      />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Find Leaks Before They Cause Damage
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Hidden leaks are silent budget killers. A small leak behind a wall or under your slab can waste thousands of gallons of water, drive up utility bills, and cause extensive damage before you even know it&apos;s there. Wood&apos;s Plumbing uses advanced electronic leak detection technology to find leaks without tearing apart your home.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our detection equipment includes acoustic listening devices that can hear water flowing through pipes behind walls and under concrete, thermal imaging cameras that detect temperature differences caused by leaking water, and pressure testing equipment that identifies even the smallest leaks in your system. Once we locate the problem, we provide repair options that minimize disruption to your property.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <Search className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Electronic acoustic leak detection</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Thermal imaging for hidden leaks</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Slab leak specialists</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">24/7 emergency leak service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Our Leak Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {leakServices.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group flex flex-col p-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-navy-900 group-hover:text-red-600 transition-colors mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  How do you detect hidden leaks?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  We use advanced electronic leak detection equipment including acoustic listening devices, thermal imaging cameras, and pressure testing. These tools allow us to pinpoint leaks behind walls, under floors, and underground without destructive exploration.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  What are the signs of a slab leak?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Common signs include unexplained increases in water bills, the sound of running water when fixtures are off, warm spots on floors, cracks in walls or flooring, mold or mildew odors, and water pooling around your foundation.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  How much does leak detection cost?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Leak detection costs vary based on complexity. We offer free estimates and provide upfront pricing before any work begins. Finding leaks early saves money by preventing water damage and high utility bills.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Think You Have a Leak?
          </h2>
          <p className="text-xl mb-6">Yeah, we find those.</p>
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

export default LeakServicesPage;
