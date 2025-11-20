import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { RelatedServices } from '@/components/RelatedServices';

// Import JSON data
import servicesData from '@/lib/data/services.json';
import faqsData from '@/lib/data/faqs.json';

interface ServicePageProps {
  service: typeof servicesData[0];
  relatedServices: typeof servicesData;
  serviceFaqs: typeof faqsData;
}

const ServicePage: NextPage<ServicePageProps> = ({ service, relatedServices, serviceFaqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "Plumber",
      "name": BUSINESS.name,
      "telephone": BUSINESS.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": BUSINESS.address.street,
        "addressLocality": BUSINESS.address.city,
        "addressRegion": BUSINESS.address.state,
        "postalCode": BUSINESS.address.zip
      },
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": BUSINESS.trust.displayRating,
        "reviewCount": BUSINESS.trust.totalReviews
      }
    },
    "areaServed": {
      "@type": "State",
      "name": "Arizona"
    },
    "description": service.shortDescription
  };

  const faqSchema = serviceFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": serviceFaqs.map(faq => ({
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
        <title>{`${service.name} in Tucson AZ | ${BUSINESS.name}`}</title>
        <meta name="description" content={service.shortDescription} />
        <link rel="canonical" href={`${BUSINESS.website}/services/${service.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${service.name} | ${BUSINESS.name}`} />
        <meta property="og:description" content={service.shortDescription} />
        <meta property="og:url" content={`${BUSINESS.website}/services/${service.slug}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${service.name} | ${BUSINESS.name}`} />
        <meta name="twitter:description" content={service.shortDescription} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
      </Head>

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'Services', href: '/services' },
        { label: service.name }
      ]} />

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              {service.featured && (
                <span className="text-sm bg-yellow-500 text-blue-900 px-3 py-1 rounded font-semibold">Popular Service</span>
              )}
              {service.name.toLowerCase().includes('emergency') && (
                <span className="text-sm bg-red-600 px-3 py-1 rounded">24/7 Emergency Service</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {service.shortDescription}
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

      {/* Service Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About This Service */}
              {service.longDescription && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Service</h2>
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">{service.longDescription}</p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && Array.isArray(service.benefits) && service.benefits.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process */}
              {service.process && Array.isArray(service.process) && service.process.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Process</h2>
                  <div className="space-y-4">
                    {service.process.map((step: any, index: number) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">{step.title || `Step ${index + 1}`}</h3>
                          <p className="text-gray-700">{step.description || step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {serviceFaqs.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {serviceFaqs.map((faq) => (
                      <Card key={faq.id}>
                        <CardHeader>
                          <CardTitle className="text-xl">{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Quick Contact */}
              <Card className="mb-6 bg-blue-900 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Need This Service?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">24/7 Emergency Available</span>
                    </div>
                    <a href={`tel:${BUSINESS.phone}`}>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                        <Phone className="mr-2" />
                        {BUSINESS.phone}
                      </Button>
                    </a>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full bg-white text-blue-900 hover:bg-gray-100">
                        Request Estimate
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Signals */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Licensed ROC {BUSINESS.trust.license}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{BUSINESS.trust.yearsInBusiness}+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>BBB {BUSINESS.trust.bbbRating} Rated</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{BUSINESS.trust.displayRating} Stars ({BUSINESS.trust.totalReviews}+ Reviews)</span>
                  </div>
                </CardContent>
              </Card>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Related Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {relatedServices.map((related) => (
                        <Link key={related.slug} href={`/services/${related.slug}`}>
                          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors">
                            <span className="text-sm">{related.name}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <RelatedServices services={relatedServices} currentSlug={service.slug} />

      {/* CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Call now or request a free estimate for {service.name.toLowerCase()}
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
  const paths = servicesData.map((service) => ({
    params: { slug: service.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const service = servicesData.find((s) => s.slug === params?.slug);
  
  if (!service) {
    return { notFound: true };
  }

  // Get FAQs for this service
  const serviceFaqs = faqsData
    .filter((faq) => faq.serviceSlug === service.slug)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Get related services (featured services excluding current one)
  const relatedServices = servicesData
    .filter((s) => s.featured && s.slug !== service.slug)
    .slice(0, 5);

  return {
    props: {
      service,
      relatedServices,
      serviceFaqs,
    },
  };
};

export default ServicePage;
