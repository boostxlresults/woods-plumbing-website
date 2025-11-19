import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { businessInfo } from '@/data/businessInfo';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';

const LocationsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Service Areas - Plumbing Services Across Southern Arizona | {businessInfo.name}</title>
        <meta name="description" content={`Professional plumbing services across Southern Arizona including Tucson, Marana, Oro Valley, Sahuarita, and ${locations.length}+ communities. Call ${businessInfo.phone}.`} />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Serving Southern Arizona Since {businessInfo.foundedYear}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Professional plumbing services across {locations.length}+ communities in {businessInfo.serviceArea.primary}
            </p>
            <Link href={`tel:${businessInfo.phone}`}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                <Phone className="mr-2" />
                {businessInfo.phone}
              </Button>
            </Link>
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
              Trusted plumbing services in communities across Pima County
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
                  <CardDescription>{location.county}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{location.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">
                      Population: {location.population.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Zip Codes: {location.zipCodes.slice(0, 3).join(', ')}
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
            <Link href={`tel:${businessInfo.phone}`}>
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                <Phone className="mr-2" />
                Call {businessInfo.phone}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="xl" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900">
                Get Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
