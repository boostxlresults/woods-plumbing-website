import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, CheckCircle, Star, Wrench, ChevronDown } from 'lucide-react';
import { trackLocationView, trackPhoneClick } from '@/lib/analytics';
import { HeroSplit } from '@/components/HeroSplit';

import locationsData from '@/lib/data/locations.json';
import servicesData from '@/lib/data/services.json';
import faqsData from '@/lib/data/faqs.json';

interface LocationPageProps {
  location: typeof locationsData[0];
  popularServices: typeof servicesData;
  locationFaqs: typeof faqsData;
}

const LocationPage: NextPage<LocationPageProps> = ({ location, popularServices, locationFaqs }) => {
  useEffect(() => {
    trackLocationView(location.name);
  }, [location.name]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": `${BUSINESS.name} - ${location.name}`,
    "image": `${BUSINESS.website}/logo.png`,
    "telephone": BUSINESS.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": "AZ",
      "postalCode": location.zipCodes[0],
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": location.name
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS.trust.displayRating,
      "reviewCount": BUSINESS.trust.totalReviews
    }
  };

  const faqSchema = locationFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": locationFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div>
      <Head>
        <title>{`Plumber in ${location.name} AZ - 24/7 Emergency Service | Wood's Plumbing`}</title>
        <meta name="description" content={`Professional plumber in ${location.name}, Arizona. ${location.description.slice(0, 80)} Licensed, BBB A+ rated. 24/7 emergency service. Call (520) 682-2233.`} />
        <link rel="canonical" href={`${BUSINESS.website}/locations/${location.slug}`} />
        
        <meta property="og:title" content={`Plumber in ${location.name}, AZ | ${BUSINESS.name}`} />
        <meta property="og:description" content={`${location.description} Call ${BUSINESS.phone} for service.`} />
        <meta property="og:url" content={`${BUSINESS.website}/locations/${location.slug}`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Plumber in ${location.name}, AZ`} />
        <meta name="twitter:description" content={`${location.description} Call ${BUSINESS.phone}.`} />
        
        {/* AI Search Optimization */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content={`plumber ${location.name}, plumbing ${location.name}, emergency plumber ${location.name}, ${location.zipCodes.join(', ')}, Southern Arizona plumber, drain cleaning ${location.name}, water heater ${location.name}`} />
        <meta name="author" content={BUSINESS.name} />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content={location.name} />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
      </Head>

      {/* Hero Section - Roto-Rooter Split Layout */}
      <HeroSplit
        title={`${location.name.toUpperCase()}'S TRUSTED PLUMBING, DRAIN & WATER SERVICES`}
        subtitle={location.description}
        ctaText="Call Us Now!"
        imageSrc={`/images/locations/${location.slug}.png`}
        imageAlt={`Professional plumbing services in ${location.name}, Arizona`}
        backgroundColor="gray"
        showBanner={true}
        bannerText="FREE ESTIMATES. NO EXTRA CHARGE FOR EVENING SERVICE"
        showTrustBadges={true}
        analyticsLocation="location_hero"
      />

      {/* Value Propositions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Plumbers You&apos;ve Trusted in {location.name} for over {BUSINESS.trust.yearsInBusiness} Years
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Open 24/7</h3>
                <p className="text-gray-700">No Extra Charge Nights, Weekends, and Holidays</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Free Estimates</h3>
                <p className="text-gray-700">Upfront pricing before we start any work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Full-Service Plumbing</h3>
                <p className="text-gray-700">For Home & Business Throughout {location.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">State-of-the-Art Equipment</h3>
                <p className="text-gray-700">Professional drain cleaning and plumbing tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Licensed & Insured</h3>
                <p className="text-gray-700">Trusted Since {BUSINESS.trust.founded} - ROC {BUSINESS.trust.license}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Same-Day Service</h3>
                <p className="text-gray-700">Available when you need us most</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-12 text-center">
            Our Services
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {popularServices.slice(0, 8).map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
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
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Hand-Crafted Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Your Trusted Plumber in {location.name}, AZ
            </h2>
            
            {location.longDescription ? (
              <div className="prose prose-lg max-w-none text-gray-700">
                {location.longDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  In {location.name}, where plumbing needs are as diverse as the residents, {BUSINESS.name} stands out for our commitment to excellence. We&apos;re your neighborhood problem-solvers, with skilled plumbers available 24/7 to ensure your pipes, drains, and water systems function flawlessly.
                </p>
                <p className="mb-4">
                  Trusted and recommended since {BUSINESS.trust.founded}, {BUSINESS.name} is the obvious choice when people in {location.name} need a professional plumber.
                </p>
              </div>
            )}
            
            {location.serviceHighlights && location.serviceHighlights.length > 0 && (
              <div className="mt-8">
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-4">
                  Why {location.name} Chooses Wood&apos;s Plumbing
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {location.serviceHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {location.neighborhoods && location.neighborhoods.length > 0 && (
              <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
                <h3 className="font-display text-xl font-bold text-navy-900 mb-3">
                  Neighborhoods We Serve in {location.name}
                </h3>
                <p className="text-gray-700">
                  {location.neighborhoods.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Zip Codes Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold text-navy-900 mb-4">
              Serving {location.name} Zip Codes
            </h3>
            <p className="text-gray-700 text-lg">
              We proudly serve all zip codes in {location.name} including: <span className="font-semibold">{location.zipCodes.join(', ')}</span>
            </p>
            <p className="mt-4">
              For service from the most dependable plumbers in {location.name}, <Link href="/contact" className="text-red-600 hover:text-red-700 font-semibold">schedule online</Link> or call <a href={`tel:${BUSINESS.phone}`} className="text-red-600 hover:text-red-700 font-semibold">{BUSINESS.phone}</a>.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
              Serving the Entire {location.name} Area
            </h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.name + ', Arizona')}&zoom=11`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${location.name}, AZ`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {locationFaqs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8">
                Frequently Asked Questions - {location.name}
              </h2>
              <div className="space-y-4">
                {locationFaqs.map((faq) => (
                  <details key={faq.id} className="group border border-gray-200 rounded-lg bg-white">
                    <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 flex justify-between items-center hover:bg-gray-50">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-gray-700 text-lg whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Plumbing and water services in {location.name}.
          </h2>
          <p className="text-2xl mb-8">Yeah, we do both.</p>
          <a 
            href={`tel:${BUSINESS.phone}`}
            onClick={() => trackPhoneClick('location_bottom_cta')}
          >
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold text-xl px-10 py-6">
              Call now to schedule: {BUSINESS.phone}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: { params: { slug: string } }[] = [];
  
  locationsData.forEach((location) => {
    paths.push({ params: { slug: location.slug } });
    if (location.aliases) {
      location.aliases.forEach((alias: string) => {
        paths.push({ params: { slug: alias } });
      });
    }
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<LocationPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  let location = locationsData.find((l) => l.slug === slug);
  
  if (!location) {
    location = locationsData.find((l) => l.aliases?.includes(slug));
  }

  if (!location) {
    return { notFound: true };
  }

  const popularServices = servicesData.filter(s => s.featured).slice(0, 12);
  
  const locationFaqs = faqsData
    .filter((faq) => faq.locationSlug === location!.slug)
    .slice(0, 10);

  return {
    props: {
      location,
      popularServices,
      locationFaqs,
    },
  };
};

export default LocationPage;
