import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, Wrench, CheckCircle, Building, Home } from 'lucide-react';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';

const AdditionalServicesPage: NextPage = () => {
  const fixtureServices = servicesData.filter(s => 
    s.slug.includes('toilet') || s.slug.includes('faucet') || s.slug.includes('sink') || 
    s.slug.includes('shower') || s.slug.includes('bathtub') || s.slug.includes('garbage-disposal') ||
    s.slug.includes('dishwasher') || s.slug.includes('fixture')
  );
  
  const commercialServices = servicesData.filter(s => 
    s.slug.includes('commercial') || s.name.toLowerCase().includes('commercial')
  );
  
  const waterTreatmentServices = servicesData.filter(s => 
    s.slug.includes('water-softener') || s.slug.includes('filtration') || s.slug.includes('water-conditioning') ||
    s.slug.includes('treatment')
  );
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Additional Plumbing Services",
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
    "description": "Additional plumbing services including fixture installation, commercial plumbing, water treatment, and specialty services in Southern Arizona."
  };

  return (
    <div>
      <Head>
        <title>{`Additional Plumbing Services in Tucson & Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Additional plumbing services: fixture installation, commercial plumbing, water treatment, and specialty services in Southern Arizona. Licensed ROC ${BUSINESS.trust.license}. Call ${BUSINESS.phone}.`} />
        <link rel="canonical" href={`${BUSINESS.website}/additional-services`} />
        
        <meta property="og:title" content={`Additional Services | ${BUSINESS.name}`} />
        <meta property="og:description" content="Fixture installation, commercial plumbing, water treatment, and specialty plumbing services." />
        <meta property="og:url" content={`${BUSINESS.website}/additional-services`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Additional Services | ${BUSINESS.name}`} />
        
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content="fixture installation Tucson, commercial plumbing, water softener, faucet installation, toilet installation, garbage disposal, Arizona plumber" />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Tucson" />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <HeroSplit
        title="ADDITIONAL PLUMBING SERVICES"
        subtitle="Beyond emergency repairs and major projects, Wood's Plumbing handles all your plumbing needs—fixture installation, commercial service, water treatment, and more."
        ctaText="Call Us Now!"
        imageSrc="/images/team_-_professional_plumbing_crew.png"
        imageAlt="Additional plumbing services"
        backgroundColor="gray"
        showBanner={true}
        bannerText="FREE ESTIMATES ON ALL SERVICES"
        showTrustBadges={true}
        analyticsLocation="additional_services_hero"
      />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Complete Plumbing Solutions
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Wood&apos;s Plumbing is your one-call solution for every plumbing need. Beyond our core services in emergency plumbing, water heaters, drains, and leak detection, we offer a full range of additional services for homes and businesses throughout Southern Arizona.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Need a new faucet installed? Want to upgrade your toilet to a water-saving model? Looking for a commercial plumbing contractor for your business? Interested in water treatment to protect your plumbing from Arizona&apos;s hard water? We handle it all—and we do it with the same professionalism, fair pricing, and quality workmanship that has made us Southern Arizona&apos;s trusted plumber for over 46 years.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-start gap-3">
                <Home className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Residential fixture installation</span>
              </div>
              <div className="flex items-start gap-3">
                <Building className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Commercial plumbing services</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Water softeners and filtration</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Appliance connections</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {fixtureServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
              Fixture Installation & Repair
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {fixtureServices.map((service) => (
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
      )}

      {waterTreatmentServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
              Water Treatment Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {waterTreatmentServices.map((service) => (
                <Link 
                  key={service.id} 
                  href={`/services/${service.slug}`}
                  className="group flex flex-col p-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
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
      )}

      {commercialServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
              Commercial Plumbing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {commercialServices.map((service) => (
                <Link 
                  key={service.id} 
                  href={`/services/${service.slug}`}
                  className="group flex flex-col p-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-navy-800 transition-colors">
                    <Building className="w-6 h-6 text-white" />
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
      )}

      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Need Any Plumbing Service?
          </h2>
          <p className="text-xl mb-6">Yeah, we probably do that too.</p>
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

export default AdditionalServicesPage;
