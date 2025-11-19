import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Phone, Clock, Award, Star, CheckCircle, Wrench, Droplet, Flame } from 'lucide-react';
import { businessInfo } from '@/data/businessInfo';
import { services, serviceCategories } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const Home: NextPage = () => {
  const featuredServices = services.filter(s => s.emergencyAvailable).slice(0, 6);
  
  return (
    <div>
      <Head>
        <title>{`${businessInfo.name} - ${businessInfo.tagline}`}</title>
        <meta name="description" content={`Professional plumbing services in Southern Arizona since ${businessInfo.foundedYear}. 24/7 emergency repairs, water heaters, drain cleaning, and more. BBB A+ rated with ${businessInfo.reviewCount}+ reviews.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {businessInfo.tagline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional Plumbing Services Across Southern Arizona
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`tel:${businessInfo.phone}`}>
                <Button size="xl" variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                  <Phone className="mr-2" />
                  {businessInfo.phone}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100">
                  Get Free Estimate
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
              <div>
                <div className="text-4xl font-bold text-yellow-400">{businessInfo.yearsInBusiness}+</div>
                <div className="text-sm text-blue-100">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">{businessInfo.rating}</div>
                <div className="text-sm text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">{businessInfo.reviewCount}+</div>
                <div className="text-sm text-blue-100">5-Star Reviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">{businessInfo.bbbRating}</div>
                <div className="text-sm text-blue-100">BBB Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <div className="font-bold text-lg">24/7 Emergency Plumbing Service</div>
                <div className="text-sm text-red-100">Fast Response • No Overtime Charges</div>
              </div>
            </div>
            <Link href={`tel:${businessInfo.phone}`}>
              <Button size="lg" variant="default" className="bg-white text-red-600 hover:bg-gray-100">
                <Phone className="mr-2" />
                Call Now: {businessInfo.phone}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Plumbing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From emergency repairs to planned installations, we handle all your plumbing needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredServices.map((service) => (
              <Card key={service.slug} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span className="text-lg">{service.title}</span>
                    {service.emergencyAvailable && (
                      <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">24/7</span>
                    )}
                  </CardTitle>
                  <CardDescription>{service.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button size="lg">
                View All {services.length} Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Wood's Plumbing?
            </h2>
            <p className="text-xl text-gray-600">
              Tucson's most trusted plumbing company for over {businessInfo.yearsInBusiness} years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">ROC {businessInfo.license} - Fully licensed plumbing contractor</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">BBB A+ Rated</h3>
              <p className="text-gray-600">{businessInfo.rating} stars with {businessInfo.reviewCount}+ reviews</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Emergency</h3>
              <p className="text-gray-600">Always available - no overtime charges</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Guarantee</h3>
              <p className="text-gray-600">Lifetime warranty on workmanship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving Southern Arizona
            </h2>
            <p className="text-xl text-gray-600">
              Professional plumbing services across {businessInfo.serviceArea.primary}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {businessInfo.serviceArea.cities.map((city) => (
              <Link key={city} href={`/locations/${city.toLowerCase().replace(/ /g, '-')}`}>
                <Card className="hover:shadow-md transition-shadow text-center p-4">
                  <CardTitle className="text-base">{city}</CardTitle>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/locations">
              <Button size="lg" variant="outline">
                View All Service Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need a Plumber? We're Here to Help!
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            From emergency repairs to planned installations, Wood's Plumbing delivers expert service you can trust
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
                Request Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
