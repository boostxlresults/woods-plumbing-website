import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { services, Service } from '@/data/services';
import { businessInfo } from '@/data/businessInfo';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface ServicePageProps {
  service: Service;
  relatedServices: Service[];
}

const ServicePage: NextPage<ServicePageProps> = ({ service, relatedServices }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": businessInfo.name,
      "telephone": businessInfo.phone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": businessInfo.address.street,
        "addressLocality": businessInfo.address.city,
        "addressRegion": businessInfo.address.state,
        "postalCode": businessInfo.address.zip
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Tucson"
    },
    "description": service.description,
    ...(service.priceRange && { "offers": {
      "@type": "Offer",
      "priceRange": service.priceRange
    }})
  };

  const faqSchema = service.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
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
        <title>{service.title} | {businessInfo.name}</title>
        <meta name="description" content={service.excerpt} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm bg-blue-700 px-3 py-1 rounded">{service.category}</span>
              {service.emergencyAvailable && (
                <span className="text-sm bg-red-600 px-3 py-1 rounded">24/7 Emergency Service</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {service.excerpt}
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

      {/* Service Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Service</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
              </div>

              {/* Benefits */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {service.faqs.map((faq, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-xl">{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{faq.answer}</p>
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
                    <Link href={`tel:${businessInfo.phone}`}>
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                        <Phone className="mr-2" />
                        {businessInfo.phone}
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full bg-white text-blue-900 hover:bg-gray-100">
                        Request Estimate
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              {service.priceRange && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">{service.priceRange}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Final pricing depends on specific requirements. Call for exact quote.
                    </p>
                  </CardContent>
                </Card>
              )}

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
                          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <span className="text-sm">{related.title}</span>
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

      {/* CTA */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Call now or request a free estimate for {service.title.toLowerCase()}
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
  const paths = services.map((service) => ({
    params: { slug: service.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const service = services.find((s) => s.slug === params?.slug);
  
  if (!service) {
    return { notFound: true };
  }

  const relatedServices = services
    .filter((s) => service.relatedServices.includes(s.slug))
    .slice(0, 5);

  return {
    props: {
      service,
      relatedServices,
    },
  };
};

export default ServicePage;
