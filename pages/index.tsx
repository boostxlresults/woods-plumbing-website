import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle, Clock, Shield, Users, Award, ThumbsUp, Wrench, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from '@/lib/analytics';

import servicesData from '@/lib/data/services.json';
import locationsData from '@/lib/data/locations.json';
import reviewsData from '@/lib/data/reviews.json';

interface HomeProps {
  services: typeof servicesData;
  locations: typeof locationsData;
  featuredReviews: typeof reviewsData;
}

const Home: NextPage<HomeProps> = ({ services, locations, featuredReviews }) => {
  const featuredServices = services.filter(s => s.featured).slice(0, 7);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": BUSINESS.name,
    "image": `${BUSINESS.website}/logo.png`,
    "@id": BUSINESS.website,
    "url": BUSINESS.website,
    "telephone": BUSINESS.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS.address.street,
      "addressLocality": BUSINESS.address.city,
      "addressRegion": BUSINESS.address.state,
      "postalCode": BUSINESS.address.zip,
      "addressCountry": BUSINESS.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS.geo.latitude,
      "longitude": BUSINESS.geo.longitude
    },
    "openingHours": "Mo-Fr 07:00-17:00,Sa 08:00-16:00",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS.trust.displayRating,
      "reviewCount": BUSINESS.trust.totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div>
      <Head>
        <title>{`${BUSINESS.name} - ${BUSINESS.tagline}`}</title>
        <meta name="description" content={`Professional plumbing services in Southern Arizona since ${BUSINESS.trust.founded}. 24/7 emergency repairs, water heaters, drain cleaning, and more. BBB ${BUSINESS.trust.bbbRating} rated with ${BUSINESS.trust.totalReviews}+ reviews.`} />
        <link rel="canonical" href={BUSINESS.website} />
        
        <meta property="og:title" content={`${BUSINESS.name} - ${BUSINESS.tagline}`} />
        <meta property="og:description" content={`Licensed plumbing contractor serving Southern Arizona since ${BUSINESS.trust.founded}. ${BUSINESS.hours.emergency}.`} />
        <meta property="og:url" content={BUSINESS.website} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${BUSINESS.name} - ${BUSINESS.tagline}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </Head>

      {/* Hero Section - Roto-Rooter Style */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/75 to-navy-900/60 z-10"></div>
        <Image
          src="/images/hero_-_plumber_with_customers_arizona.png"
          alt="Professional plumber serving Southern Arizona"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={85}
        />
        
        <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Southern Arizona&apos;s Trusted Plumbing, Drain & Water Services
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href={`tel:${BUSINESS.phone}`}
                onClick={() => trackPhoneClick('hero')}
                className="inline-block"
              >
                <Button size="lg" className="bg-copper-500 hover:bg-copper-600 text-white font-bold text-xl px-8 py-6 w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-navy-900 hover:bg-gray-100 font-bold text-xl px-8 py-6 w-full sm:w-auto">
                  Schedule Online
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-copper-400 text-copper-400" />
                ))}
              </div>
              <span className="text-lg font-semibold">Rated {BUSINESS.trust.displayRating} on Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-copper-500 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg md:text-xl font-semibold">
            Free Estimates. No Extra Charge for Evening Service
          </p>
        </div>
      </div>

      {/* Value Propositions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Plumbers You&apos;ve Trusted in Southern Arizona for over {BUSINESS.trust.yearsInBusiness} Years
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-copper-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Open 24/7</h3>
                <p className="text-gray-700">No Extra Charge Nights, Weekends, and Holidays</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-copper-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Free Estimates</h3>
                <p className="text-gray-700">Upfront pricing before we start any work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-copper-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Full-Service Plumbing</h3>
                <p className="text-gray-700">For Home & Business Throughout Pima County</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-copper-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">State-of-the-Art Equipment</h3>
                <p className="text-gray-700">Professional drain cleaning and plumbing tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-copper-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Licensed & Insured</h3>
                <p className="text-gray-700">Trusted Since {BUSINESS.trust.founded} - ROC {BUSINESS.trust.license}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-copper-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Local Family-Owned</h3>
                <p className="text-gray-700">Serving our neighbors throughout Southern Arizona</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services - Icon Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-12 text-center">
            Our Services
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-copper-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-copper-600 transition-colors">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 group-hover:text-copper-600 transition-colors">
                  {service.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button size="lg" className="bg-copper-500 hover:bg-copper-600 text-white font-semibold px-8">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Plumber in Marana, AZ
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                In the heart of Southern Arizona, where plumbing needs are as diverse as the residents, {BUSINESS.name} stands out for our commitment to excellence. We&apos;re not just another plumbing company in Pima County; we&apos;re your neighborhood problem-solvers, with skilled plumbers available 24/7 to ensure your pipes, drains, and water systems function flawlessly.
              </p>
              <p className="mb-4">
                Trusted and recommended since {BUSINESS.trust.founded}, {BUSINESS.name} is the obvious choice when people need a professional plumber in Southern Arizona. More families and businesses depend on Wood&apos;s Plumbing than any other local plumbing company. When you work with us, you get:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Same day service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>24/7 availability</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>No additional charges for nights, weekends, or holidays</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Free onsite and upfront cost estimates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Highly trained, insured, and experienced plumbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Industry-leading equipment</span>
                </li>
              </ul>
              <p>
                For service with a smile from the most dependable plumbers in Southern Arizona, <Link href="/contact" className="text-copper-600 hover:text-copper-700 font-semibold">reach out through our online scheduling form</Link> or call our round-the-clock service line at <a href={`tel:${BUSINESS.phone}`} className="text-copper-600 hover:text-copper-700 font-semibold">{BUSINESS.phone}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Solutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Comprehensive Plumbing Solutions in Southern Arizona
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Wondering whether we provide the plumbing service you need? Any Wood&apos;s Plumbing technician will tell you: &quot;Yeah, we do that, too!&quot; We&apos;re your do-it-all local plumbing heroes, bringing you a comprehensive range of plumbing services to meet all of your needs, including:
              </p>
              <ul className="grid md:grid-cols-2 gap-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Emergency plumbing services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Sewer & drain cleaning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Faucet repair & replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Water heater repairs and installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Toilet repair and replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Garbage disposal repair and replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Sewer line repair and replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Water line and gas line services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Leak detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" />
                  <span>Whole home re-piping</span>
                </li>
              </ul>
              <p>
                There are competent plumbers, and then there are trusted local experts. That&apos;s why {BUSINESS.name} is the go-to plumbing service for Southern Arizona — because our professionals understand older homes, water supply management in the desert, and other unique challenges of Arizona plumbing. We tailor our solutions to address these factors, and we know how to spot issues that less experienced plumbers might miss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Guarantee Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            LEAVE PLUMBING TO THE PROS
          </h2>
          <p className="text-xl text-center mb-12 text-gray-300">
            BECAUSE WITH {BUSINESS.name.toUpperCase()}, YOU GET MORE THAN A GUARANTEE
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-copper-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">REPUTATION</h3>
              <p className="text-gray-300">
                Highly-trained professionals since {BUSINESS.trust.founded}. A job done right by local experts you can trust.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-copper-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">QUALITY</h3>
              <p className="text-gray-300">
                Full-service plumbing and drain cleaning – using state-of-the-art diagnostics and equipment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-copper-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">TRANSPARENCY</h3>
              <p className="text-gray-300">
                Free onsite estimates. No hidden or extra charges for plumbing service on holidays, nights, and weekends.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-copper-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">EFFICIENCY</h3>
              <p className="text-gray-300">
                Same-day and emergency service 365 days a year. Available 24/7 when you need us most.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-copper-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">LOCAL EXPERTS</h3>
              <p className="text-gray-300">
                Family-owned and operated. We understand Southern Arizona homes and businesses.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-copper-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">SATISFACTION</h3>
              <p className="text-gray-300">
                BBB {BUSINESS.trust.bbbRating} rated with {BUSINESS.trust.totalReviews}+ satisfied customers. 100% satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Serving All of Pima County
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {locations.map((location) => (
              <Link 
                key={location.id}
                href={`/locations/${location.slug}`}
                className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-navy-900 hover:text-copper-600 transition-colors">
                  {location.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/locations">
              <Button className="bg-copper-500 hover:bg-copper-600 text-white font-semibold">
                View All Service Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-copper-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Plumbing and water services.
          </h2>
          <p className="text-2xl mb-8">Yeah, we do both.</p>
          <a 
            href={`tel:${BUSINESS.phone}`}
            onClick={() => trackPhoneClick('bottom_cta')}
          >
            <Button size="lg" className="bg-white text-copper-600 hover:bg-gray-100 font-bold text-xl px-10 py-6">
              Call now to schedule: {BUSINESS.phone}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      services: servicesData,
      locations: locationsData,
      featuredReviews: reviewsData.slice(0, 10),
    },
  };
};

export default Home;
