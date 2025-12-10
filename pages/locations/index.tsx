import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';

// Import JSON data
import locationsData from '@/lib/data/locations.json';

interface LocationsPageProps {
  locations: typeof locationsData;
}

const LocationsPage: NextPage<LocationsPageProps> = ({ locations }) => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Plumbing Services",
    "provider": {
      "@type": "Plumber",
      "name": BUSINESS.name,
      "telephone": BUSINESS.phone,
      "url": BUSINESS.website,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": BUSINESS.address.city,
        "addressRegion": BUSINESS.address.state,
        "addressCountry": BUSINESS.address.country
      }
    },
    "areaServed": locations.map(loc => ({
      "@type": "City",
      "name": loc.name,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Southern Arizona"
      }
    }))
  };

  return (
    <div>
      <Head>
        <title>Service Areas - Plumbers in Tucson, Marana & Southern Arizona</title>
        <meta name="description" content="Professional plumbing services in Tucson, Marana, Oro Valley, Sahuarita, Green Valley, Vail & more. 8+ communities served since 1979. 24/7 emergency service available. Call (520) 682-2233." />
        <meta name="keywords" content="plumber Tucson, plumber Marana, plumber Oro Valley, plumber Sahuarita, Southern Arizona plumbing, service areas" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${BUSINESS.website}/locations`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Service Areas | ${BUSINESS.name}`} />
        <meta property="og:description" content={`Serving ${locations.length}+ communities across Southern Arizona since ${BUSINESS.trust.founded}.`} />
        <meta property="og:url" content={`${BUSINESS.website}/locations`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={BUSINESS.name} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Service Areas - Southern Arizona" />

        {/* AI Search Optimization */}
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Southern Arizona" />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Serving Southern Arizona Since {BUSINESS.trust.founded}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional plumbing services across {locations.length} communities in Tucson and Southern Arizona
            </p>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                <Phone className="mr-2" />
                {BUSINESS.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Service Areas
            </h2>
            <p className="text-xl text-gray-600">
              Trusted plumbing services in communities across Southern Arizona
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Card key={location.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    {location.name}
                  </CardTitle>
                  <CardDescription>Pima County, Arizona</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{location.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 font-semibold">
                      {location.zipCodes.length} Zip Code{location.zipCodes.length !== 1 ? 's' : ''} Served
                    </p>
                    <p className="text-xs text-gray-500">
                      {location.zipCodes.slice(0, 3).join(', ')}
                      {location.zipCodes.length > 3 && ` +${location.zipCodes.length - 3} more`}
                    </p>
                    <Link href={`/locations/${location.slug}`}>
                      <Button variant="outline" className="w-full mt-2">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Plumbing Service in Your Area?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We serve all of Southern Arizona with expert plumbing solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold text-lg px-8 py-6">
                <Phone className="mr-2" />
                Call {BUSINESS.phone}
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6">
                Get Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<LocationsPageProps> = async () => {
  return {
    props: {
      locations: locationsData,
    },
  };
};

export default LocationsPage;
