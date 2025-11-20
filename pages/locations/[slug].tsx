import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, MapPin, CheckCircle, Wrench } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { trackLocationView } from '@/lib/analytics';

// Import JSON data
import locationsData from '@/lib/data/locations.json';
import servicesData from '@/lib/data/services.json';

interface LocationPageProps {
  location: typeof locationsData[0];
  popularServices: typeof servicesData;
}

const LocationPage: NextPage<LocationPageProps> = ({ location, popularServices }) => {
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

  return (
    <div>
      <Head>
        <title>{`Plumber in ${location.name}, AZ | ${BUSINESS.name}`}</title>
        <meta name="description" content={`${location.description} Licensed plumber serving ${location.zipCodes.join(', ')} and surrounding areas. Call ${BUSINESS.phone} for 24/7 emergency service.`} />
        <link rel="canonical" href={`${BUSINESS.website}/locations/${location.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Plumber in ${location.name}, AZ | ${BUSINESS.name}`} />
        <meta property="og:description" content={`${location.description} Call ${BUSINESS.phone} for service.`} />
        <meta property="og:url" content={`${BUSINESS.website}/locations/${location.slug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Plumber in ${location.name}, AZ`} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Locations', href: '/locations' },
        { label: location.name }
      ]} />

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-sm bg-blue-700 px-3 py-1 rounded">Pima County</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plumber in {location.name}, Arizona
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {location.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${BUSINESS.phone}`}>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                  <Phone className="mr-2" />
                  Call {BUSINESS.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100">
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Professional Plumbing Services in {location.name}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Wood's Plumbing has been serving {location.name} residents and businesses since {BUSINESS.trust.founded}. 
                  As a licensed and insured plumbing contractor (ROC {BUSINESS.trust.license}), we provide comprehensive plumbing 
                  services throughout Pima County.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Whether you need emergency plumbing repairs, water heater installation, drain cleaning, or routine maintenance, 
                  our experienced plumbers are ready to help. We serve all zip codes in {location.name} including {location.zipCodes.slice(0, 5).join(', ')}
                  {location.zipCodes.length > 5 && `, and ${location.zipCodes.length - 5} more areas`}.
                </p>
              </div>

              {/* Why Choose Us */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Why {location.name} Trusts Wood's Plumbing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Licensed ROC {BUSINESS.trust.license}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{BUSINESS.trust.yearsInBusiness}+ Years of Experience</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">BBB {BUSINESS.trust.bbbRating} Rating</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{BUSINESS.trust.displayRating} Stars ({BUSINESS.trust.totalReviews}+ Reviews)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">24/7 Emergency Service</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Same-Day Service Available</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Upfront Pricing - No Hidden Fees</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">100% Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Plumbing Services in {location.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularServices.map((service) => (
                    <Card key={service.slug} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-start justify-between">
                          <span>{service.name}</span>
                          {service.name.toLowerCase().includes('emergency') && (
                            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded ml-2 flex-shrink-0">
                              24/7
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/services/${service.slug}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            <Wrench className="mr-2 w-4 h-4" />
                            Learn More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/services">
                    <Button size="lg">View All {servicesData.length} Services</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Google Maps Embed */}
              <Card className="mb-6 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-[4/3] w-full">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location.name + ', Arizona')}&zoom=12`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${location.name}, AZ`}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="mb-6 bg-blue-900 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Serving {location.name}</h3>
                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Coverage Area:</p>
                        <p className="text-blue-100">All of {location.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Service Level:</p>
                        <p className="text-blue-100">Same-day & Emergency</p>
                      </div>
                    </div>
                  </div>
                  <a href={`tel:${BUSINESS.phone}`}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold mb-3">
                      <Phone className="mr-2" />
                      {BUSINESS.phone}
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full bg-white text-blue-900 hover:bg-gray-100">
                      Request Estimate
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Zip Codes */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Zip Codes Served in {location.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {location.zipCodes.map((zip) => (
                      <span key={zip} className="bg-blue-100 text-blue-900 px-3 py-1 rounded text-sm font-semibold">
                        {zip}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trust Signals */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{BUSINESS.trust.yearsInBusiness}+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>BBB {BUSINESS.trust.bbbRating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{BUSINESS.trust.displayRating} Star Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{BUSINESS.trust.totalReviews}+ Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Licensed ROC {BUSINESS.trust.license}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need a Plumber in {location.name}?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Call now for same-day service or request a free estimate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                <Phone className="mr-2" />
                Call {BUSINESS.phone}
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Get Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = locationsData.map((location) => ({
    params: { slug: location.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<LocationPageProps> = async ({ params }) => {
  const location = locationsData.find((l) => l.slug === params?.slug);
  
  if (!location) {
    return { notFound: true };
  }

  // Get featured services for display
  const popularServices = servicesData.filter(s => s.featured).slice(0, 9);

  return {
    props: {
      location,
      popularServices,
    },
  };
};

export default LocationPage;
