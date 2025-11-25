import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, Wrench, CheckCircle, Clock } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';

const RepairServicesPage: NextPage = () => {
  const repairServices = servicesData.filter(s => 
    s.slug.includes('repair') || s.name.toLowerCase().includes('repair') || 
    s.slug.includes('fix') || s.name.toLowerCase().includes('fix')
  );
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Plumbing Repair Services",
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
    "description": "Professional plumbing repair services for homes and businesses in Southern Arizona. Emergency repairs, leak fixes, pipe repairs, and more."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you offer same-day plumbing repairs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer same-day plumbing repair service for most issues. Our trucks are fully stocked with common parts, so we can often complete repairs in a single visit without waiting for parts."
        }
      },
      {
        "@type": "Question",
        "name": "How much do plumbing repairs cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Plumbing repair costs vary based on the type and complexity of the repair. We provide free estimates and upfront pricing before starting any work—no hidden fees or surprises."
        }
      },
      {
        "@type": "Question",
        "name": "Do you charge extra for evening or weekend repairs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, Wood's Plumbing does not charge extra for evening, weekend, or holiday service. Our rates are the same 24/7, so you never have to wait for a 'cheaper' time to get plumbing problems fixed."
        }
      }
    ]
  };

  return (
    <div>
      <Head>
        <title>{`Plumbing Repair Services in Tucson & Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Professional plumbing repair services in Southern Arizona. Same-day service, no extra charges for evenings or weekends. Licensed ROC ${BUSINESS.trust.license}. Call ${BUSINESS.phone}.`} />
        <link rel="canonical" href={`${BUSINESS.website}/repair`} />
        
        <meta property="og:title" content={`Plumbing Repairs | ${BUSINESS.name}`} />
        <meta property="og:description" content="Same-day plumbing repairs. No extra charges for evenings or weekends. Free estimates." />
        <meta property="og:url" content={`${BUSINESS.website}/repair`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Plumbing Repairs | ${BUSINESS.name}`} />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="plumbing repair Tucson, pipe repair, leak repair, faucet repair, toilet repair, drain repair, Arizona plumber" />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Tucson" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <HeroSplit
        title="PLUMBING REPAIR SERVICES"
        subtitle="Professional plumbing repairs for homes and businesses throughout Southern Arizona. Same-day service available—no extra charges for evenings or weekends."
        ctaText="Call Us Now!"
        imageSrc="/images/team_-_professional_plumbing_crew.png"
        imageAlt="Professional plumbing repair services"
        backgroundColor="gray"
        showBanner={true}
        bannerText="SAME-DAY REPAIRS. NO EXTRA CHARGE FOR EVENINGS."
        showTrustBadges={true}
        analyticsLocation="repair_services_hero"
      />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Fix It Right the First Time
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              When plumbing breaks, you need it fixed fast—and fixed right. Wood&apos;s Plumbing delivers same-day repair service with no extra charges for evenings, weekends, or holidays. Our fully-stocked trucks carry common parts and supplies, so we can often complete repairs in a single visit without waiting for special orders.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              From dripping faucets to major pipe repairs, our licensed technicians have the training and tools to handle any plumbing problem. We diagnose issues accurately, explain your options clearly, and provide upfront pricing before we start work. No hidden fees, no surprises—just honest, reliable plumbing repair.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Same-day repair service available</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">No extra charges for evenings or weekends</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Upfront pricing before work begins</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Fully stocked service trucks</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Repair Services We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {repairServices.slice(0, 12).map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group flex flex-col p-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
              >
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-navy-900 group-hover:text-red-600 transition-colors mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">{service.shortDescription}</p>
              </Link>
            ))}
          </div>
          {repairServices.length > 12 && (
            <div className="text-center mt-10">
              <Link href="/services">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8">
                  View All Services
                </Button>
              </Link>
            </div>
          )}
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
                  Do you offer same-day plumbing repairs?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Yes, we offer same-day plumbing repair service for most issues. Our trucks are fully stocked with common parts, so we can often complete repairs in a single visit without waiting for parts.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  How much do plumbing repairs cost?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Plumbing repair costs vary based on the type and complexity of the repair. We provide free estimates and upfront pricing before starting any work—no hidden fees or surprises.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  Do you charge extra for evening or weekend repairs?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  No, Wood&apos;s Plumbing does not charge extra for evening, weekend, or holiday service. Our rates are the same 24/7, so you never have to wait for a &quot;cheaper&quot; time to get plumbing problems fixed.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Need a Plumbing Repair?
          </h2>
          <p className="text-xl mb-6">Yeah, we fix that.</p>
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

export default RepairServicesPage;
