import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, Wrench, CheckCircle, Camera } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';

const SewerServicesPage: NextPage = () => {
  const sewerServices = servicesData.filter(s => 
    s.slug.includes('sewer') || s.name.toLowerCase().includes('sewer')
  );
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Sewer Services",
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
    "description": "Professional sewer line repair, replacement, cleaning, and camera inspection services in Southern Arizona."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I know if my sewer line needs repair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Warning signs include slow drains throughout the house, gurgling sounds from toilets, sewage odors in the yard, wet spots in the lawn, or sewage backing up into the home. A camera inspection can diagnose the exact problem."
        }
      },
      {
        "@type": "Question",
        "name": "What is trenchless sewer repair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trenchless sewer repair allows us to fix or replace damaged sewer lines without digging up your entire yard. We use pipe lining or pipe bursting techniques that require only small access points, saving your landscaping and reducing costs."
        }
      },
      {
        "@type": "Question",
        "name": "How much does sewer line replacement cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sewer line replacement costs vary based on length, depth, and method. We provide free estimates after a camera inspection to assess the situation. Trenchless methods are often more cost-effective than traditional excavation."
        }
      }
    ]
  };

  return (
    <div>
      <Head>
        <title>{`Sewer Line Services in Tucson & Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Professional sewer line repair, replacement, cleaning, and camera inspection in Southern Arizona. Trenchless sewer solutions available. Licensed ROC ${BUSINESS.trust.license}. Call ${BUSINESS.phone}.`} />
        <link rel="canonical" href={`${BUSINESS.website}/sewer`} />
        
        <meta property="og:title" content={`Sewer Services | ${BUSINESS.name}`} />
        <meta property="og:description" content="Sewer line repair, replacement, cleaning, and camera inspection. Trenchless solutions available." />
        <meta property="og:url" content={`${BUSINESS.website}/sewer`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Sewer Services | ${BUSINESS.name}`} />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="sewer repair Tucson, sewer line replacement, trenchless sewer repair, sewer camera inspection, sewer cleaning, sewer backup, Arizona sewer service" />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Tucson" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <HeroSplit
        title="SEWER LINE SERVICES"
        subtitle="Professional sewer line repair, replacement, cleaning, and camera inspection throughout Southern Arizona. Trenchless solutions that save your yard and your budget."
        ctaText="Call Us Now!"
        imageSrc="/images/team_-_professional_plumbing_crew.png"
        imageAlt="Professional sewer line services"
        backgroundColor="gray"
        showBanner={true}
        bannerText="FREE SEWER CAMERA INSPECTION WITH REPAIR"
        showTrustBadges={true}
        analyticsLocation="sewer_services_hero"
      />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Complete Sewer Line Solutions
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Sewer problems are serious—but they don&apos;t always require tearing up your entire yard. Wood&apos;s Plumbing specializes in both traditional and trenchless sewer repair methods, giving you options that fit your situation and budget. We start every sewer job with a camera inspection so we know exactly what we&apos;re dealing with before recommending solutions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              From emergency sewer backups at 2 AM to scheduled sewer line replacements, our team has the equipment and experience to handle it all. We&apos;ve repaired and replaced thousands of sewer lines throughout Tucson and Southern Arizona, in everything from 1950s ranch homes to modern subdivisions. When you call Wood&apos;s Plumbing, you get honest answers and effective solutions.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <Camera className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">HD camera inspection reveals exact problems</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Trenchless repair saves landscaping</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">24/7 emergency sewer backup service</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Root removal and prevention</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Our Sewer Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sewerServices.map((service) => (
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
                  How do I know if my sewer line needs repair?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Warning signs include slow drains throughout the house, gurgling sounds from toilets, sewage odors in the yard, wet spots in the lawn, or sewage backing up into the home. A camera inspection can diagnose the exact problem.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  What is trenchless sewer repair?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Trenchless sewer repair allows us to fix or replace damaged sewer lines without digging up your entire yard. We use pipe lining or pipe bursting techniques that require only small access points, saving your landscaping and reducing costs.
                </div>
              </details>
              <details className="group border border-gray-200 rounded-lg bg-white">
                <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 hover:bg-gray-50">
                  How much does sewer line replacement cost?
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  Sewer line replacement costs vary based on length, depth, and method. We provide free estimates after a camera inspection to assess the situation. Trenchless methods are often more cost-effective than traditional excavation.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Need Sewer Service?
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

export default SewerServicesPage;
