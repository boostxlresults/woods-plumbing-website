import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Clock, Award, Star, CheckCircle, MapPin, Calendar, Wrench } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { formatDateShort } from '@/lib/formatDate';
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
  const featuredServices = services.filter(s => s.featured).slice(0, 6);

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
    },
    "review": featuredReviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "reviewBody": review.content,
      "datePublished": review.date
    }))
  };

  return (
    <div>
      <Head>
        <title>{`${BUSINESS.name} - ${BUSINESS.tagline}`}</title>
        <meta name="description" content={`Professional plumbing services in Southern Arizona since ${BUSINESS.trust.founded}. 24/7 emergency repairs, water heaters, drain cleaning, and more. BBB ${BUSINESS.trust.bbbRating} rated with ${BUSINESS.trust.totalReviews}+ reviews.`} />
        <link rel="canonical" href={BUSINESS.website} />
        <link rel="icon" href="/favicon.ico" />
        
        <meta property="og:title" content={`${BUSINESS.name} - ${BUSINESS.tagline}`} />
        <meta property="og:description" content={`Licensed plumbing contractor serving Southern Arizona since ${BUSINESS.trust.founded}. ${BUSINESS.hours.emergency}.`} />
        <meta property="og:url" content={BUSINESS.website} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${BUSINESS.name} - ${BUSINESS.tagline}`} />
        <meta name="twitter:description" content={`Licensed plumbing contractor serving Southern Arizona since ${BUSINESS.trust.founded}.`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </Head>

      {/* Hero Section with Background Image */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/70 z-10"></div>
        <Image
          src="/images/hero_-_plumber_with_customers_arizona.png"
          alt="Professional plumber with happy customers in Arizona"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={90}
        />
        
        <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Tucson&apos;s Most Trusted Plumbing Experts
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-200 leading-relaxed">
              Licensed, professional plumbing services for Southern Arizona since {BUSINESS.trust.founded}
            </p>
            <p className="text-lg mb-10 text-gray-300">
              24/7 emergency repairs • Same-day service • 100% satisfaction guaranteed
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href={`tel:${BUSINESS.phone}`}
                onClick={() => trackPhoneClick('hero_primary')}
              >
                <Button size="lg" className="bg-copper-500 hover:bg-copper-600 text-white font-bold text-lg px-8 py-7 shadow-large hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  <Phone className="mr-2 h-6 w-6" />
                  Call {BUSINESS.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-navy-900 backdrop-blur-sm text-lg px-8 py-7 font-semibold transition-all duration-300 w-full sm:w-auto">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Service
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-copper-400 font-display">{BUSINESS.trust.yearsInBusiness}+</div>
                <div className="text-sm text-gray-300 mt-1">Years of Excellence</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-copper-400 font-display">{BUSINESS.trust.displayRating}</div>
                <div className="text-sm text-gray-300 mt-1">Average Rating</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-copper-400 font-display">{BUSINESS.trust.totalReviews}+</div>
                <div className="text-sm text-gray-300 mt-1">Happy Customers</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold text-copper-400 font-display">{BUSINESS.trust.bbbRating}</div>
                <div className="text-sm text-gray-300 mt-1">BBB Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Expert Plumbing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From emergency repairs to planned installations, we deliver professional solutions you can trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredServices.map((service, index) => {
              const serviceImages = [
                '/images/service_-_plumbing_repair_work.png',
                '/images/service_-_water_heater_installation.png',
                '/images/service_-_drain_cleaning_professional.png'
              ];
              
              return (
                <Card key={service.slug} className="group hover:shadow-large transition-all duration-300 border border-gray-200 hover:border-copper-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {index < 3 && (
                      <Image
                        src={serviceImages[index]}
                        alt={service.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {service.name.toLowerCase().includes('emergency') && (
                      <div className="absolute top-4 right-4 bg-copper-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        24/7
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-navy-900 group-hover:text-copper-600 transition-colors">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/services/${service.slug}`}>
                      <Button variant="outline" className="w-full border-navy-200 hover:bg-copper-50 hover:border-copper-500 hover:text-copper-700 transition-all">
                        Learn More →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button size="lg" className="bg-navy-800 hover:bg-navy-900 text-white px-10 py-6 text-lg font-semibold shadow-medium hover:shadow-large transition-all">
                View All {services.length} Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gradient-to-br from-navy-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-copper-500 text-copper-500" />
              ))}
            </div>
            <p className="text-xl text-gray-600">
              {BUSINESS.trust.displayRating} stars from {BUSINESS.trust.totalReviews}+ verified reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredReviews.slice(0, 3).map((review) => (
              <Card key={review.id} className="bg-white shadow-medium hover:shadow-large transition-shadow duration-300 border-t-4 border-copper-500">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-copper-500 text-copper-500" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {review.source}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-navy-900">{review.author}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-3">{review.content}</p>
                  <p className="text-xs text-gray-500">{formatDateShort(review.date)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Why Choose Wood&apos;s Plumbing?
            </h2>
            <p className="text-xl text-gray-600">
              Southern Arizona&apos;s most trusted plumbing company for over {BUSINESS.trust.yearsInBusiness} years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-copper-100 text-copper-600 mb-5 group-hover:bg-copper-500 group-hover:text-white transition-all duration-300 shadow-soft">
                <Award className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">Licensed & Insured</h3>
              <p className="text-gray-600 leading-relaxed">
                ROC {BUSINESS.trust.license} - Fully licensed Arizona plumbing contractor with comprehensive insurance
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-copper-100 text-copper-600 mb-5 group-hover:bg-copper-500 group-hover:text-white transition-all duration-300 shadow-soft">
                <Star className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">BBB {BUSINESS.trust.bbbRating} Rated</h3>
              <p className="text-gray-600 leading-relaxed">
                {BUSINESS.trust.displayRating} stars with {BUSINESS.trust.totalReviews}+ verified customer reviews
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-copper-100 text-copper-600 mb-5 group-hover:bg-copper-500 group-hover:text-white transition-all duration-300 shadow-soft">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">24/7 Emergency Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Always available when you need us - Same-day service for urgent repairs
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-copper-100 text-copper-600 mb-5 group-hover:bg-copper-500 group-hover:text-white transition-all duration-300 shadow-soft">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">100% Satisfaction</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete satisfaction guaranteed on all work - We stand behind our service
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 to-navy-800 opacity-50"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Serving Southern Arizona
            </h2>
            <p className="text-xl text-gray-300">
              Professional plumbing services across Tucson and surrounding communities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {locations.slice(0, 8).map((location) => (
              <Link key={location.slug} href={`/locations/${location.slug}`}>
                <div className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-large hover:-translate-y-1">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-copper-400 group-hover:text-copper-300" />
                  <h3 className="font-semibold text-lg text-white group-hover:text-copper-300 transition-colors">{location.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{location.zipCodes.length} zip codes</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/locations">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-2 border-copper-400 text-copper-400 hover:bg-copper-500 hover:text-white hover:border-copper-500 px-10 py-6 text-lg font-semibold transition-all"
              >
                View All Service Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-copper-500 to-copper-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Wrench className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-copper-50">
            From emergency repairs to planned installations, Wood&apos;s Plumbing delivers expert service you can trust. Call now or schedule online!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${BUSINESS.phone}`}
              onClick={() => trackPhoneClick('bottom_cta')}
            >
              <Button size="lg" className="bg-navy-900 hover:bg-navy-800 text-white font-bold text-lg px-10 py-7 shadow-large hover:shadow-xl transition-all w-full sm:w-auto">
                <Phone className="mr-2 h-6 w-6" />
                Call {BUSINESS.phone}
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-copper-600 text-lg px-10 py-7 font-semibold transition-all w-full sm:w-auto">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Service Online
              </Button>
            </Link>
          </div>
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
      featuredReviews: reviewsData.filter(r => r.featured),
    },
  };
};

export default Home;
