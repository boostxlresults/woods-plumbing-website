import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Phone, CheckCircle, Star, ChevronDown } from 'lucide-react';
import { trackServiceView, trackPhoneClick } from '@/lib/analytics';
import { HeroSplit } from '@/components/HeroSplit';

import servicesData from '@/lib/data/services.json';
import faqsData from '@/lib/data/faqs.json';
import reviewsData from '@/lib/data/reviews.json';

interface ServicePageProps {
  service: typeof servicesData[0];
  relatedServices: typeof servicesData;
  serviceFaqs: typeof faqsData;
}

const ServicePage: NextPage<ServicePageProps> = ({ service, relatedServices, serviceFaqs }) => {
  useEffect(() => {
    trackServiceView(service.name);
  }, [service.name]);

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
        <title>{`${service.name} in Southern Arizona | ${BUSINESS.name}`}</title>
        <meta name="description" content={service.shortDescription} />
        <link rel="canonical" href={`${BUSINESS.website}/services/${service.slug}`} />
        
        <meta property="og:title" content={`${service.name} | ${BUSINESS.name}`} />
        <meta property="og:description" content={service.shortDescription} />
        <meta property="og:url" content={`${BUSINESS.website}/services/${service.slug}`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${service.name} | ${BUSINESS.name}`} />
        <meta name="twitter:description" content={service.shortDescription} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
      </Head>

      {/* Hero Section - Roto-Rooter Split Layout */}
      <HeroSplit
        title={`PROFESSIONAL ${service.name.toUpperCase()} IN SOUTHERN ARIZONA`}
        subtitle={service.shortDescription}
        ctaText="Call Us Now!"
        imageSrc="/images/service_-_plumbing_repair_work.png"
        imageAlt={`Professional ${service.name} service in Southern Arizona`}
        backgroundColor="gray"
        showBanner={true}
        bannerText="FAST, FRIENDLY AND PROFESSIONAL SERVICE. SCHEDULE NOW!"
        showTrustBadges={true}
        analyticsLocation="service_hero"
      />

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* About This Service */}
            {service.longDescription && (
              <div className="mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  The {BUSINESS.name} Difference
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="text-lg leading-relaxed whitespace-pre-line">{service.longDescription}</p>
                </div>
              </div>
            )}

            {/* Service Benefits / What We Offer */}
            {service.benefits && Array.isArray(service.benefits) && service.benefits.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  {service.name} Services We Offer
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  {BUSINESS.name} offers comprehensive {service.name.toLowerCase()} services for residences and businesses in Southern Arizona, including:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process / How It Works */}
            {service.process && Array.isArray(service.process) && service.process.length > 0 && (
              <div className="mb-12 bg-gray-50 rounded-lg p-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  Service Done Right
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Unlike many plumbing companies, we don&apos;t just fix the immediate problem. We provide complete solutions that ensure lasting results.
                </p>
                <div className="space-y-6">
                  {service.process.map((step: any, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-navy-900 mb-2">{step.title || `Step ${index + 1}`}</h3>
                        <p className="text-gray-700 text-lg">{step.description || step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Customer Reviews
          </h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {reviewsData.slice(0, 3).map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 line-clamp-4">{review.content}</p>
                <p className="font-semibold text-navy-900">{review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {serviceFaqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {serviceFaqs.map((faq) => (
                  <details key={faq.id} className="group border border-gray-200 rounded-lg">
                    <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 flex justify-between items-center hover:bg-gray-50">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-gray-700 text-lg whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
              Related Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {relatedServices.slice(0, 8).map((related) => (
                <Link
                  key={related.id}
                  href={`/services/${related.slug}`}
                  className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow border border-gray-200"
                >
                  <h3 className="font-semibold text-navy-900 hover:text-red-600 transition-colors">
                    {related.name}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/services">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-12 bg-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-6">
            Need {service.name}?
          </h2>
          <p className="text-xl mb-6">Yeah, we do that.</p>
          <a 
            href={`tel:${BUSINESS.phone}`}
            onClick={() => trackPhoneClick('service_bottom_cta')}
          >
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 font-bold text-xl px-10 py-6">
              Call now to schedule: {BUSINESS.phone}
            </Button>
          </a>
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

  const relatedServices = servicesData
    .filter((s) => s.id !== service.id)
    .slice(0, 8);

  const serviceFaqs = faqsData
    .filter((faq) => faq.serviceSlug === service.slug)
    .slice(0, 8);

  return {
    props: {
      service,
      relatedServices,
      serviceFaqs,
    },
  };
};

export default ServicePage;
