import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, Flame, CheckCircle, AlertTriangle } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';

const GasServicesPage: NextPage = () => {
  const gasServices = servicesData.filter(s => 
    s.slug.includes('gas') || s.name.toLowerCase().includes('gas')
  );
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Gas Line Services",
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
    "description": "Professional gas line installation, repair, testing, and leak detection services in Southern Arizona."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you offer emergency gas leak repair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Wood's Plumbing provides 24/7 emergency gas leak detection and repair services. If you smell gas, leave the area immediately and call us at (520) 682-2233."
        }
      },
      {
        "@type": "Question",
        "name": "Are your plumbers licensed for gas work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our technicians are fully licensed and certified for gas line work under Arizona regulations. We carry ROC license #159621."
        }
      },
      {
        "@type": "Question",
        "name": "Can you install a gas line for a new appliance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we install gas lines for ranges, water heaters, dryers, outdoor grills, fire pits, and generators. We handle all permits and inspections."
        }
      }
    ]
  };

  return (
    <div>
      <Head>
        <title>{`Gas Line Services in Tucson & Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Professional gas line installation, repair, testing, and leak detection in Southern Arizona. Licensed for gas work - ROC ${BUSINESS.trust.license}. 24/7 emergency gas leak service. Call ${BUSINESS.phone}.`} />
        <link rel="canonical" href={`${BUSINESS.website}/gas-services`} />
        
        <meta property="og:title" content={`Gas Line Services | ${BUSINESS.name}`} />
        <meta property="og:description" content="Gas line installation, repair, testing, and emergency leak detection. Licensed and certified." />
        <meta property="og:url" content={`${BUSINESS.website}/gas-services`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Gas Services | ${BUSINESS.name}`} />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="gas line installation Tucson, gas leak repair, gas pipe testing, gas line relocation, gas plumber Arizona, emergency gas service" />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Tucson" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <HeroSplit
        title="GAS LINE SERVICES"
        subtitle="Professional gas line installation, repair, testing, and leak detection throughout Southern Arizona. Licensed and certified for all gas work."
        ctaText="Call Us Now!"
        imageSrc="/images/team_-_professional_plumbing_crew.png"
        imageAlt="Professional gas line services"
        backgroundColor="gray"
        showBanner={true}
        bannerText="24/7 EMERGENCY GAS LEAK SERVICE"
        showTrustBadges={true}
        analyticsLocation="gas_services_hero"
      />

      <section className="py-6 bg-yellow-50 border-y border-yellow-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-yellow-800">
            <AlertTriangle className="w-8 h-8" />
            <p className="text-lg font-semibold">
              Smell gas? Leave immediately and call us at <a href={`tel:${BUSINESS.phone}`} className="underline">{BUSINESS.phone}</a> or 911.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Licensed Gas Line Experts
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Gas line work requires specialized training, licensing, and equipment that most plumbers don&apos;t have. Wood&apos;s Plumbing holds the certifications required by Arizona law for gas piping work, and our technicians receive ongoing training in the latest safety protocols and installation techniques.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you&apos;re extending gas service to a new appliance, need a gas leak repaired immediately, or require pressure testing for a real estate transaction, we have the expertise to do it safely and correctly. Every gas job we complete passes inspection the first time.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Licensed for gas work under Arizona regulations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Electronic leak detection equipment</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Permit handling and inspection coordination</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Southwest Gas coordination for meter upgrades</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Our Gas Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {gasServices.map((service) => (
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
                  Do you offer emergency gas leak repair?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Yes, Wood&apos;s Plumbing provides 24/7 emergency gas leak detection and repair services. If you smell gas, leave the area immediately and call us at {BUSINESS.phone}.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  Are your plumbers licensed for gas work?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Yes, our technicians are fully licensed and certified for gas line work under Arizona regulations. We carry ROC license #{BUSINESS.trust.license}.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  Can you install a gas line for a new appliance?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Yes, we install gas lines for ranges, water heaters, dryers, outdoor grills, fire pits, and generators. We handle all permits and inspections.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Need Gas Line Service?
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

export default GasServicesPage;
