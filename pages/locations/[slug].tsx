import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { locations, Location } from '@/data/locations';
import { services } from '@/data/services';
import { businessInfo } from '@/data/businessInfo';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Phone, MapPin, CheckCircle, Users } from 'lucide-react';

interface LocationPageProps {
  location: Location;
}

const LocationPage: NextPage<LocationPageProps> = ({ location }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${businessInfo.name} - ${location.name}`,
    "image": "",
    "telephone": businessInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": "AZ",
      "postalCode": location.zipCodes[0]
    },
    "areaServed": {
      "@type": "City",
      "name": location.name
    },
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": businessInfo.rating,
      "reviewCount": businessInfo.reviewCount
    }
  };

  const popularServices = services.slice(0, 9);

  return (
    <div>
      <Head>
        <title>{`Plumber in ${location.name}, AZ | ${businessInfo.name}`}</title>
        <meta name="description" content={`${location.description} Licensed plumber serving ${location.zipCodes.join(', ')} and surrounding areas.`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6" />
              <span className="text-sm bg-blue-700 px-3 py-1 rounded">{location.county}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Plumber in {location.name}, Arizona
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {location.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`tel:${businessInfo.phone}`}>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                  <Phone className="mr-2" />
                  Call {businessInfo.phone}
                </Button>
              </Link>
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
                  Wood's Plumbing has been serving {location.name} residents and businesses since {businessInfo.foundedYear}. 
                  As a licensed and insured plumbing contractor (ROC {businessInfo.license}), we provide comprehensive plumbing 
                  services throughout {location.county}.
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
                  {location.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighborhoods */}
              {location.neighborhoods && location.neighborhoods.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Neighborhoods We Serve in {location.name}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {location.neighborhoods.map((neighborhood, index) => (
                      <div key={index} className="bg-gray-100 p-3 rounded-lg text-center">
                        {neighborhood}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                          <span>{service.title}</span>
                          {service.emergencyAvailable && (
                            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded ml-2 flex-shrink-0">
                              24/7
                            </span>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/services/${service.slug}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Learn More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/services">
                    <Button size="lg">View All Services</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
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
                      <Users className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Population Served:</p>
                        <p className="text-blue-100">{location.population.toLocaleString()}+</p>
                      </div>
                    </div>
                  </div>
                  <Link href={`tel:${businessInfo.phone}`}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 mb-3">
                      <Phone className="mr-2" />
                      {businessInfo.phone}
                    </Button>
                  </Link>
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
                  <CardTitle>Zip Codes Served</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {location.zipCodes.map((zip) => (
                      <span key={zip} className="bg-blue-100 text-blue-900 px-3 py-1 rounded text-sm">
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
                      <span>{businessInfo.yearsInBusiness}+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>BBB {businessInfo.bbbRating} Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{businessInfo.rating} Star Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>{businessInfo.reviewCount}+ Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Licensed ROC {businessInfo.license}</span>
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
            <Link href={`tel:${businessInfo.phone}`}>
              <Button size="xl" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="mr-2" />
                Call {businessInfo.phone}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="xl" variant="outline">
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
  const paths = locations.map((location) => ({
    params: { slug: location.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const location = locations.find((l) => l.slug === params?.slug);
  
  if (!location) {
    return { notFound: true };
  }

  return {
    props: {
      location,
    },
  };
};

export default LocationPage;
