import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, Flame, CheckCircle, Thermometer } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';

const WaterHeaterPage: NextPage = () => {
  const waterHeaterServices = servicesData.filter(s => 
    s.slug.includes('water-heater') || s.name.toLowerCase().includes('water heater') || s.slug.includes('tankless')
  );
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Water Heater Services",
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
    "description": "Professional water heater installation, repair, replacement, and maintenance services in Southern Arizona. Tank and tankless systems."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Should I get a tankless water heater or traditional tank?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both have advantages. Tankless heaters provide endless hot water and save space, while tank heaters have lower upfront costs and can supply multiple fixtures simultaneously. We'll assess your hot water needs and help you choose the best option for your home."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a water heater last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional tank water heaters typically last 8-12 years, while tankless units can last 15-20 years with proper maintenance. Southern Arizona's hard water can shorten lifespan without regular flushing and maintenance."
        }
      },
      {
        "@type": "Question",
        "name": "Can you install a water heater the same day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer same-day water heater installation for most standard replacements. Our trucks carry popular models, so we can often replace your failed unit the same day you call."
        }
      }
    ]
  };

  return (
    <div>
      <Head>
        <title>{`Water Heater Services in Tucson & Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Professional water heater installation, repair, and replacement in Southern Arizona. Tank and tankless systems. Same-day service available. Licensed ROC ${BUSINESS.trust.license}. Call ${BUSINESS.phone}.`} />
        <link rel="canonical" href={`${BUSINESS.website}/water-heater`} />
        
        <meta property="og:title" content={`Water Heater Services | ${BUSINESS.name}`} />
        <meta property="og:description" content="Water heater installation, repair, and replacement. Tank and tankless systems. Same-day service." />
        <meta property="og:url" content={`${BUSINESS.website}/water-heater`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Water Heater Services | ${BUSINESS.name}`} />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="water heater Tucson, tankless water heater, water heater installation, water heater repair, water heater replacement, hot water heater, Arizona plumber" />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Tucson" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <HeroSplit
        title="WATER HEATER SERVICES"
        subtitle="Professional water heater installation, repair, and replacement throughout Southern Arizona. Tank and tankless systems from all major brands."
        ctaText="Call Us Now!"
        imageSrc="/images/team_-_professional_plumbing_crew.png"
        imageAlt="Professional water heater services"
        backgroundColor="gray"
        showBanner={true}
        bannerText="SAME-DAY WATER HEATER REPLACEMENT AVAILABLE"
        showTrustBadges={true}
        analyticsLocation="water_heater_services_hero"
      />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Hot Water When You Need It
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Nothing ruins your morning like a cold shower. When your water heater fails—or when it&apos;s time to upgrade to a more efficient system—Wood&apos;s Plumbing delivers fast, professional service. We install, repair, and maintain all types of water heaters: traditional tank units, modern tankless systems, and hybrid heat pump models.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Southern Arizona&apos;s hard water is tough on water heaters. Mineral buildup insulates heating elements, reduces efficiency, and shortens equipment life. Our maintenance services include flushing and descaling to maximize your water heater&apos;s lifespan and efficiency. We also install water softeners that protect your entire plumbing system.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <Thermometer className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Tank and tankless water heaters</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Same-day installation available</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">All major brands serviced</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Annual maintenance programs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Our Water Heater Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {waterHeaterServices.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group flex flex-col p-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Flame className="w-6 h-6 text-white" />
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
                  Should I get a tankless water heater or traditional tank?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Both have advantages. Tankless heaters provide endless hot water and save space, while tank heaters have lower upfront costs and can supply multiple fixtures simultaneously. We&apos;ll assess your hot water needs and help you choose the best option for your home.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  How long does a water heater last?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Traditional tank water heaters typically last 8-12 years, while tankless units can last 15-20 years with proper maintenance. Southern Arizona&apos;s hard water can shorten lifespan without regular flushing and maintenance.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  Can you install a water heater the same day?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Yes, we offer same-day water heater installation for most standard replacements. Our trucks carry popular models, so we can often replace your failed unit the same day you call.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Need Water Heater Service?
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

export default WaterHeaterPage;
