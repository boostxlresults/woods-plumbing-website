import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ScheduleButton } from '@/components/ScheduleButton';
import { Phone, CheckCircle, Star, ChevronDown, Shield, Award, Clock, Users, DollarSign } from 'lucide-react';
import { trackServiceView, trackPhoneClick } from '@/lib/analytics';

import servicesData from '@/lib/data/services.json';
import faqsData from '@/lib/data/faqs.json';
import reviewsData from '@/lib/data/reviews.json';

const getServiceImage = (slug: string): string => {
  const emergencyServices = ['emergency-plumbing', 'burst-pipe-repair', 'emergency-leak-repair', 'emergency-drain-cleaning', 'sewer-backup-emergency', 'frozen-pipe-repair'];
  const waterHeaterServices = ['water-heater-installation', 'water-heater-repair', 'water-heater-replacement', 'tankless-water-heaters', 'tank-water-heaters', 'water-heater-maintenance', 'water-heater-flushing', 'gas-water-heater-service', 'electric-water-heater-service'];
  const drainSewerServices = ['drain-cleaning', 'sewer-line-repair', 'sewer-line-replacement', 'sewer-camera-inspection', 'hydro-jetting', 'trenchless-sewer-repair', 'sewer-line-cleaning', 'rooter-service', 'clogged-drain-repair', 'septic-system-service', 'backflow-prevention'];
  const leakServices = ['leak-detection', 'water-leak-repair', 'gas-leak-detection', 'slab-leak-detection', 'slab-leak-repair', 'pipe-leak-repair', 'water-pressure-repair'];
  const toiletServices = ['toilet-repair', 'toilet-installation'];
  const fixtureServices = ['plumbing-repairs', 'faucet-repair', 'faucet-installation', 'sink-installation', 'sink-repair', 'garbage-disposal-repair', 'garbage-disposal-installation', 'shower-repair', 'bathtub-installation', 'shower-installation', 'fixture-installation', 'plumbing-maintenance', 'plumbing-inspection'];
  const pipeServices = ['pipe-repair', 'whole-house-repiping', 'pipe-replacement', 'water-line-installation', 'water-line-repair', 'water-line-replacement'];
  const waterTreatmentServices = ['water-softener-installation', 'water-softener-repair', 'water-filtration-systems', 'reverse-osmosis-systems', 'water-conditioning'];
  const gasServices = ['gas-line-installation', 'gas-line-repair', 'gas-leak-repair', 'gas-line-inspection', 'gas-pipe-testing', 'gas-line-relocation'];
  const commercialServices = ['commercial-plumbing'];

  if (emergencyServices.includes(slug)) return '/images/services/emergency.png';
  if (waterHeaterServices.includes(slug)) return '/images/services/water-heater.png';
  if (drainSewerServices.includes(slug)) return '/images/services/drain-sewer.png';
  if (leakServices.includes(slug)) return '/images/services/leak-detection.png';
  if (toiletServices.includes(slug)) return '/images/services/toilet.png';
  if (fixtureServices.includes(slug)) return '/images/services/fixture-repair.png';
  if (pipeServices.includes(slug)) return '/images/services/pipe-repair.png';
  if (waterTreatmentServices.includes(slug)) return '/images/services/water-treatment.png';
  if (gasServices.includes(slug)) return '/images/services/gas-service.png';
  if (commercialServices.includes(slug)) return '/images/services/commercial.png';
  
  return '/images/services/fixture-repair.png';
};

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
    "areaServed": [
      {
        "@type": "City",
        "name": "Tucson",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      {
        "@type": "City",
        "name": "Marana",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      {
        "@type": "City",
        "name": "Oro Valley",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      {
        "@type": "City",
        "name": "Sahuarita",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      {
        "@type": "City",
        "name": "Green Valley",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      {
        "@type": "City",
        "name": "Vail",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      {
        "@type": "City",
        "name": "Catalina",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      },
      {
        "@type": "City",
        "name": "Flowing Wells",
        "containedInPlace": {
          "@type": "State",
          "name": "Arizona"
        }
      }
    ],
    "description": service.shortDescription
  };

  const allFaqs = [
    ...((service as any).faqs || []).map((faq: { question: string; answer: string }) => ({
      question: faq.question,
      answer: faq.answer
    })),
    ...serviceFaqs.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  ];

  const faqSchema = allFaqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const localSeoTitle = `${service.name} in Tucson & Marana AZ - 24/7 Service | Wood's Plumbing`;
  const localSeoDescription = `Professional ${service.name.toLowerCase()} services in Tucson, Marana & Southern Arizona. ${service.shortDescription.slice(0, 80)} Licensed ROC #146498. 24/7 emergency service. Call (520) 682-2233.`;

  // AI-optimized keywords for this specific service
  const aiKeywords = `${service.name}, plumbing ${service.name.toLowerCase()}, ${service.name} Tucson, ${service.name} Southern Arizona, ${service.name} Marana, ${service.name} Oro Valley, licensed plumber, emergency plumber, ROC ${BUSINESS.trust.license}`;

  return (
    <div>
      <Head>
        <title>{localSeoTitle}</title>
        <meta name="description" content={localSeoDescription} />
        <meta name="keywords" content={aiKeywords} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${BUSINESS.website}/services/${service.slug}`} />
        
        {/* Open Graph for Social & AI */}
        <meta property="og:title" content={localSeoTitle} />
        <meta property="og:description" content={localSeoDescription} />
        <meta property="og:url" content={`${BUSINESS.website}/services/${service.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={BUSINESS.name} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={localSeoTitle} />
        <meta name="twitter:description" content={localSeoDescription} />
        
        {/* AI Search Optimization */}
        <meta name="author" content={BUSINESS.name} />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Southern Arizona" />
        <meta name="geo.position" content={`${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`} />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        )}
      </Head>

      {/* Hero Section - Matching Homepage Layout */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            {/* Left Side: Image */}
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src={getServiceImage(service.slug)}
                alt={`Professional ${service.name} service in Tucson and Southern Arizona`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
                quality={90}
              />
            </div>

            {/* Right Side: Content */}
            <div className="py-12 md:py-16 px-6 md:px-12">
              <h1 className="text-navy-700 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 uppercase">
                PROFESSIONAL {service.name.toUpperCase()} IN TUCSON & SOUTHERN ARIZONA
              </h1>
              
              <p className="text-gray-700 text-lg mb-6">
                {service.shortDescription}
              </p>
              
              <p className="text-red-600 font-bold text-2xl md:text-3xl mb-4">
                Call Us Now!
              </p>
              
              <a 
                href={`tel:${BUSINESS.phone}`}
                onClick={() => trackPhoneClick('service_hero')}
                className="block mb-6"
              >
                <p className="text-navy-700 font-bold text-4xl md:text-5xl lg:text-6xl hover:text-red-600 transition-colors">
                  {BUSINESS.phone}
                </p>
              </a>
              
              <ScheduleButton 
                size="lg" 
                className="bg-navy-700 hover:bg-navy-800 text-white font-bold uppercase px-8 py-6 text-lg"
                showIcon={false}
              >
                <span>SCHEDULE ONLINE</span>
                <span className="text-xl ml-2">✓</span>
              </ScheduleButton>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-red-600 mb-2" />
              <p className="font-semibold text-navy-900 text-sm">Licensed & Insured</p>
              <p className="text-xs text-gray-600">ROC {BUSINESS.trust.license}</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-red-600 mb-2" />
              <p className="font-semibold text-navy-900 text-sm">BBB {BUSINESS.trust.bbbRating} Rated</p>
              <p className="text-xs text-gray-600">{BUSINESS.trust.totalReviews}+ Reviews</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-red-600 mb-2" />
              <p className="font-semibold text-navy-900 text-sm">{new Date().getFullYear() - BUSINESS.trust.founded}+ Years</p>
              <p className="text-xs text-gray-600">Serving Arizona</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-red-600 mb-2" />
              <p className="font-semibold text-navy-900 text-sm">Expert Team</p>
              <p className="text-xs text-gray-600">Certified Plumbers</p>
            </div>
          </div>
        </div>
      </section>

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

            {/* Common Issues Section */}
            {(service as any).commonIssues && Array.isArray((service as any).commonIssues) && (service as any).commonIssues.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  Signs You Need {service.name}
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  Don&apos;t ignore these warning signs. Early action prevents costly repairs and property damage:
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {(service as any).commonIssues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Arizona-Specific Context - Using blockquote for AI parsing */}
            {(service as any).arizonaContext && (
              <figure className="mb-12">
                <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg italic">
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-3 not-italic">
                    {service.name} in Southern Arizona
                  </h3>
                  <p className="text-gray-700 text-lg not-italic">{(service as any).arizonaContext}</p>
                </blockquote>
                <figcaption className="text-sm text-gray-500 mt-2 ml-6">
                  — Local expertise from {BUSINESS.name}, serving Arizona since {BUSINESS.trust.founded}
                </figcaption>
              </figure>
            )}

            {/* Process / How It Works */}
            {service.process && Array.isArray(service.process) && service.process.length > 0 && (
              <div className="mb-12 bg-gray-50 rounded-lg p-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  Our {service.name} Process
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

            {/* Why Choose Us Section */}
            {(service as any).whyChooseUs && Array.isArray((service as any).whyChooseUs) && (service as any).whyChooseUs.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                  Why Choose {BUSINESS.name} for {service.name}?
                </h2>
                <div className="space-y-4">
                  {(service as any).whyChooseUs.map((reason: string, index: number) => {
                    const [title, ...descParts] = reason.split(': ');
                    const description = descParts.join(': ');
                    return (
                      <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-navy-900">{title}</h3>
                          {description && <p className="text-gray-700 mt-1">{description}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pricing Factors Section */}
            {(service as any).pricingFactors && Array.isArray((service as any).pricingFactors) && (service as any).pricingFactors.length > 0 && (
              <div className="mb-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="font-display text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                  What Affects {service.name} Cost?
                </h3>
                <p className="text-gray-700 mb-4">
                  We provide free estimates with upfront pricing. Here are factors that influence the cost of your project:
                </p>
                <ul className="grid md:grid-cols-2 gap-2">
                  {(service as any).pricingFactors.map((factor: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-amber-600 mt-1">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warranty Information Section - Using blockquote for AI parsing */}
            {(service as any).warrantyInfo && (
              <figure className="mb-12">
                <blockquote className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-green-600" />
                    Our Warranty & Guarantee
                  </h3>
                  <p className="text-gray-700 text-lg">{(service as any).warrantyInfo}</p>
                </blockquote>
              </figure>
            )}

            {/* Why Choose Us Comparison Table - AI-friendly table format */}
            <div className="mb-12 overflow-x-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                {BUSINESS.name} vs. Other Plumbers
              </h2>
              <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-navy-700 text-white">
                    <th className="text-left p-4 font-semibold">Service Feature</th>
                    <th className="text-center p-4 font-semibold">{BUSINESS.name}</th>
                    <th className="text-center p-4 font-semibold">Other Companies</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Years of Experience</td>
                    <td className="p-4 text-center text-green-600 font-semibold">{BUSINESS.trust.yearsInBusiness}+ Years</td>
                    <td className="p-4 text-center text-gray-500">Varies</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="p-4 text-gray-700">24/7 Emergency Service</td>
                    <td className="p-4 text-center text-green-600 font-semibold">✓ Yes</td>
                    <td className="p-4 text-center text-gray-500">Limited</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Upfront Pricing</td>
                    <td className="p-4 text-center text-green-600 font-semibold">✓ Always</td>
                    <td className="p-4 text-center text-gray-500">Sometimes</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="p-4 text-gray-700">Licensed & Insured</td>
                    <td className="p-4 text-center text-green-600 font-semibold">✓ ROC #{BUSINESS.trust.license}</td>
                    <td className="p-4 text-center text-gray-500">Check Required</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4 text-gray-700">Customer Reviews</td>
                    <td className="p-4 text-center text-green-600 font-semibold">{BUSINESS.trust.displayRating}/5 ({BUSINESS.trust.totalReviews}+ reviews)</td>
                    <td className="p-4 text-center text-gray-500">Varies</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 text-gray-700">Satisfaction Guarantee</td>
                    <td className="p-4 text-center text-green-600 font-semibold">✓ 100%</td>
                    <td className="p-4 text-center text-gray-500">Limited</td>
                  </tr>
                </tbody>
              </table>
            </div>
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

      {/* FAQ Section - Combines external FAQs and service-embedded FAQs */}
      {(serviceFaqs.length > 0 || ((service as any).faqs && (service as any).faqs.length > 0)) && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8">
                Frequently Asked Questions About {service.name}
              </h2>
              <div className="space-y-4">
                {/* Service-embedded FAQs first */}
                {(service as any).faqs && (service as any).faqs.map((faq: { question: string; answer: string }, index: number) => (
                  <details key={`service-faq-${index}`} className="group border border-gray-200 rounded-lg">
                    <summary className="cursor-pointer p-6 font-semibold text-lg text-navy-900 flex justify-between items-center hover:bg-gray-50">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 text-gray-700 text-lg whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </details>
                ))}
                {/* External FAQs from faqs.json */}
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
  const paths: { params: { slug: string } }[] = [];
  
  servicesData.forEach((service) => {
    paths.push({ params: { slug: service.slug } });
    if (service.aliases) {
      service.aliases.forEach((alias: string) => {
        paths.push({ params: { slug: alias } });
      });
    }
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  let service = servicesData.find((s) => s.slug === slug);
  
  if (!service) {
    service = servicesData.find((s) => s.aliases?.includes(slug));
  }

  if (!service) {
    return { notFound: true };
  }

  const relatedServices = servicesData
    .filter((s) => s.id !== service!.id)
    .slice(0, 8);

  const serviceFaqs = faqsData
    .filter((faq) => faq.serviceSlug === service!.slug)
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
