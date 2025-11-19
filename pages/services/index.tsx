import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { services, serviceCategories } from '@/data/services';
import { businessInfo } from '@/data/businessInfo';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const ServicesPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{`Plumbing Services in Tucson & Southern Arizona | ${businessInfo.name}`}</title>
        <meta name="description" content={`Complete plumbing services in Southern Arizona. Emergency repairs, water heaters, drain cleaning, leak detection, and more. Licensed ROC ${businessInfo.license}.`} />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Plumbing Services
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive plumbing solutions for homes and businesses across Southern Arizona
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

      {/* Services by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {serviceCategories.map((category) => {
            const categoryServices = services.filter(s => s.category === category);
            if (categoryServices.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {categoryServices.map((service) => (
                    <Card key={service.slug} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between">
                          <span>{service.title}</span>
                          {service.emergencyAvailable && (
                            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded ml-2 flex-shrink-0">
                              24/7
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription>{service.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {service.priceRange && (
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">Price Range:</span> {service.priceRange}
                            </p>
                          )}
                          <Link href={`/services/${service.slug}`}>
                            <Button variant="outline" className="w-full">
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Plumbing Service Today?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Call now for same-day service or request a free estimate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`tel:${businessInfo.phone}`}>
              <Button size="xl" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                <Phone className="mr-2" />
                {businessInfo.phone}
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

export default ServicesPage;
