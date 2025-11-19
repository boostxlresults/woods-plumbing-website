import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Phone, Clock, Award, Star, CheckCircle, MapPin } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

// Import JSON data
import servicesData from '@/lib/data/services.json';
import locationsData from '@/lib/data/locations.json';
import reviewsData from '@/lib/data/reviews.json';

interface HomeProps {
  services: typeof servicesData;
  locations: typeof locationsData;
  featuredReviews: typeof reviewsData;
}

const Home: NextPage<HomeProps> = ({ services, locations, featuredReviews }) => {
  // Get featured services for homepage
  const featuredServices = services.filter(s => s.featured).slice(0, 6);

  return (
    <div>
      <Head>
        <title>{`${BUSINESS.name} - ${BUSINESS.tagline}`}</title>
        <meta name="description" content={`Professional plumbing services in Southern Arizona since ${BUSINESS.trust.founded}. 24/7 emergency repairs, water heaters, drain cleaning, and more. BBB ${BUSINESS.trust.bbbRating} rated with ${BUSINESS.trust.totalReviews}+ reviews.`} />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Schema.org Local Business Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
                "reviewCount": BUSINESS.trust.totalReviews
              }
            })
          }}
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {BUSINESS.tagline}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Licensed Plumbing Contractor Serving Tucson & Southern Arizona Since {BUSINESS.trust.founded}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${BUSINESS.phone}`}>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold text-lg px-8 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  {BUSINESS.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6">
                  Get Free Estimate
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
              <div>
                <div className="text-4xl font-bold text-yellow-400">{BUSINESS.trust.yearsInBusiness}+</div>
                <div className="text-sm text-blue-100">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">{BUSINESS.trust.displayRating}</div>
                <div className="text-sm text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">{BUSINESS.trust.totalReviews}+</div>
                <div className="text-sm text-blue-100">5-Star Reviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">{BUSINESS.trust.bbbRating}</div>
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
                <div className="text-sm text-red-100">Fast Response • Licensed & Insured • {BUSINESS.trust.license}</div>
              </div>
            </div>
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold">
                <Phone className="mr-2" />
                Call Now: {BUSINESS.phone}
              </Button>
            </a>
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
                    <span className="text-lg">{service.name}</span>
                    {service.name.toLowerCase().includes('emergency') && (
                      <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">24/7</span>
                    )}
                  </CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
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

      {/* Customer Reviews */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              {BUSINESS.trust.displayRating} stars from {BUSINESS.trust.totalReviews}+ verified reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredReviews.slice(0, 3).map((review) => (
              <Card key={review.id} className="bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.source}</span>
                  </div>
                  <CardTitle className="text-base">{review.author}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{review.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(review.date).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            ))}
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
              Tucson's most trusted plumbing company for over {BUSINESS.trust.yearsInBusiness} years
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Licensed & Insured</h3>
              <p className="text-gray-600">ROC {BUSINESS.trust.license} - Fully licensed plumbing contractor</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">BBB {BUSINESS.trust.bbbRating} Rated</h3>
              <p className="text-gray-600">{BUSINESS.trust.displayRating} stars with {BUSINESS.trust.totalReviews}+ reviews</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Emergency</h3>
              <p className="text-gray-600">Always available - Same-day service</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Guarantee</h3>
              <p className="text-gray-600">Satisfaction guaranteed on all work</p>
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
              Professional plumbing services across Tucson and surrounding areas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {locations.map((location) => (
              <Link key={location.slug} href={`/locations/${location.slug}`}>
                <Card className="hover:shadow-md transition-shadow text-center p-4 h-full">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <CardTitle className="text-base">{location.name}</CardTitle>
                  <p className="text-xs text-gray-500 mt-1">{location.zipCodes.length} zip codes</p>
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
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold text-lg px-8 py-6">
                <Phone className="mr-2" />
                Call {BUSINESS.phone}
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 text-lg px-8 py-6">
                Request Free Estimate
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
