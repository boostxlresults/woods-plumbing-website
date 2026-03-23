import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Phone, CheckCircle, MapPin, Star, Clock, Shield, Wrench } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import {
  generateGeoServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateOrganizationSchema,
} from '@/lib/seo/schemas';

import locationsData from '@/lib/data/locations.json';
import servicesData from '@/lib/data/services.json';
import faqsData from '@/lib/data/faqs.json';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface Location {
  id: string;
  name: string;
  slug: string;
  zipCodes: string[];
  geo?: { latitude: number; longitude: number };
  neighborhoods?: string[];
  longDescription?: string;
  serviceHighlights?: string[];
}

interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  featured?: boolean;
}

interface GeoServicePageProps {
  location: Location;
  service: Service;
  relatedServices: Service[];
  relatedLocations: Location[];
  faqs: Array<{ question: string; answer: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────
const GeoServicePage: NextPage<GeoServicePageProps> = ({
  location,
  service,
  relatedServices,
  relatedLocations,
  faqs,
}) => {
  const pageUrl = `${BUSINESS.website}/locations/${location.slug}/${service.slug}`;

  // Schema markup
  const geoServiceSchema = generateGeoServiceSchema({
    serviceName: service.name,
    serviceType: service.name,
    serviceDescription: `Professional ${service.name.toLowerCase()} services in ${location.name}, AZ. ${service.shortDescription}`,
    cityName: location.name,
    cityZipCodes: location.zipCodes,
    cityLatitude: location.geo?.latitude ?? BUSINESS.geo.latitude,
    cityLongitude: location.geo?.longitude ?? BUSINESS.geo.longitude,
    pageUrl,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Locations', href: '/locations' },
    { name: location.name, href: `/locations/${location.slug}` },
    { name: service.name },
  ]);

  const faqSchema = generateFAQSchema(faqs);
  const orgSchema = generateOrganizationSchema();

  const metaTitle = `${service.name} in ${location.name}, AZ | Wood's Plumbing`;
  const metaDescription = `Expert ${service.name.toLowerCase()} in ${location.name}, AZ. Licensed plumber (ROC #${BUSINESS.trust.license}, CR-37). ${BUSINESS.trust.displayRating}-star rated, ${BUSINESS.trust.totalReviews}+ reviews. 24/7 emergency service. Call ${BUSINESS.phone}.`;

  return (
    <div>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BUSINESS.website}/images/hero-plumber.jpg`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={BUSINESS.name} />

        {/* Geo meta tags */}
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content={`${location.name}, Arizona`} />
        {location.geo && (
          <>
            <meta name="geo.position" content={`${location.geo.latitude};${location.geo.longitude}`} />
            <meta name="ICBM" content={`${location.geo.latitude}, ${location.geo.longitude}`} />
          </>
        )}

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoServiceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </Head>

      {/* ── Hero ── */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-blue-300 text-sm mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/locations" className="hover:text-white">Locations</Link>
              <span className="mx-2">/</span>
              <Link href={`/locations/${location.slug}`} className="hover:text-white">{location.name}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{service.name}</span>
            </nav>

            <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span>{location.name}, AZ {location.zipCodes.join(', ')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.name} in {location.name}, AZ
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              {service.shortDescription} Serving {location.name} and surrounding areas since {BUSINESS.trust.founded}.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm">
              <div className="flex items-center gap-1 bg-blue-800 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{BUSINESS.trust.displayRating} Stars ({BUSINESS.trust.totalReviews}+ Reviews)</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-800 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Licensed ROC #{BUSINESS.trust.license}</span>
              </div>
              <div className="flex items-center gap-1 bg-blue-800 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${BUSINESS.phone}`}>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold text-lg px-8">
                  <Phone className="mr-2" />
                  {BUSINESS.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold">
                  Get Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional {service.name} Services in {location.name}
              </h2>

              <div className="prose prose-lg max-w-none text-gray-700 mb-8">
                <p>
                  When you need <strong>{service.name.toLowerCase()}</strong> in {location.name}, AZ, Wood&apos;s Plumbing
                  is the trusted choice. Our licensed plumbers (ROC #{BUSINESS.trust.license}, CR-37 Plumbing) have been
                  serving {location.name} and all of Southern Arizona since {BUSINESS.trust.founded}. With a{' '}
                  {BUSINESS.trust.displayRating}-star rating and {BUSINESS.trust.totalReviews}+ verified reviews, we
                  deliver expert service at honest prices — every time.
                </p>
                <p>
                  {service.longDescription || service.shortDescription} Our team is familiar with the specific plumbing
                  challenges in {location.name}, including Arizona&apos;s hard water, extreme heat, and monsoon-season
                  drainage issues. We&apos;re not just a plumbing company that drives through — we&apos;re your local
                  experts, based right here in Marana.
                </p>
              </div>

              {/* Why Choose Us */}
              <div className="bg-blue-50 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why {location.name} Chooses Wood&apos;s Plumbing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    `24/7 emergency ${service.name.toLowerCase()} — no overtime charges`,
                    `Licensed ROC #${BUSINESS.trust.license}, CR-37 Plumbing`,
                    `${BUSINESS.trust.displayRating}-star rated, ${BUSINESS.trust.totalReviews}+ reviews`,
                    `${BUSINESS.trust.yearsInBusiness}+ years serving ${location.name}`,
                    'Upfront pricing — no hidden fees',
                    'BBB A+ rated business',
                    'Fully insured and background-checked techs',
                    'Same-day service available',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neighborhoods Served */}
              {location.neighborhoods && location.neighborhoods.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.name} Throughout {location.name}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We provide {service.name.toLowerCase()} to every neighborhood in {location.name}, including:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {location.neighborhoods.map((neighborhood) => (
                      <div key={neighborhood} className="flex items-center gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm">{neighborhood}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {faqs.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions — {service.name} in {location.name}
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((faq, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-5">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-700 text-sm">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-blue-900 text-white rounded-xl p-6 mb-6 sticky top-4">
                <h3 className="text-xl font-bold mb-2">
                  Need {service.name} in {location.name}?
                </h3>
                <p className="text-blue-200 text-sm mb-4">
                  Call now for same-day service or request a free estimate. Available 24/7.
                </p>
                <a href={`tel:${BUSINESS.phone}`} className="block w-full">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold mb-3">
                    <Phone className="mr-2 w-4 h-4" />
                    {BUSINESS.phone}
                  </Button>
                </a>
                <Link href="/contact" className="block w-full">
                  <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
                    Free Estimate
                  </Button>
                </Link>
                <div className="mt-4 pt-4 border-t border-blue-700 text-xs text-blue-300 space-y-1">
                  <div>✓ Licensed ROC #{BUSINESS.trust.license}</div>
                  <div>✓ BBB A+ Rated</div>
                  <div>✓ No Overtime Charges</div>
                  <div>✓ Free Estimates</div>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    More Services in {location.name}
                  </h3>
                  <div className="space-y-2">
                    {relatedServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/locations/${location.slug}/${s.slug}`}
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm py-1"
                      >
                        <Wrench className="w-4 h-4 flex-shrink-0" />
                        {s.name} in {location.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Locations */}
              {relatedLocations.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {service.name} Near {location.name}
                  </h3>
                  <div className="space-y-2">
                    {relatedLocations.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}/${service.slug}`}
                        className="flex items-center gap-2 text-blue-700 hover:text-blue-900 text-sm py-1"
                      >
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        {service.name} in {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Expert {service.name} in {location.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Call Wood&apos;s Plumbing now for same-day service. Licensed ROC #{BUSINESS.trust.license},
            BBB A+ rated, {BUSINESS.trust.displayRating} stars. No overtime charges — ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold text-lg px-8 py-6">
                <Phone className="mr-2" />
                {BUSINESS.phone}
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

// ─────────────────────────────────────────────────────────────────────────────
// Static Paths — Generate all location × service combinations
// Focus on the top 3 cities × top 20 services = 60 high-value pages
// ─────────────────────────────────────────────────────────────────────────────
export const getStaticPaths: GetStaticPaths = async () => {
  // Priority locations for geo-service matrix
  const priorityLocationSlugs = [
    'marana', 'tucson', 'oro-valley',
    'gladden-farms', 'continental-ranch', 'dove-mountain',
    'avra-valley', 'catalina-foothills', 'sahuarita',
    'green-valley', 'vail', 'picture-rocks',
  ];

  // Top services for geo-service matrix
  const priorityServiceSlugs = [
    'emergency-plumbing',
    'drain-cleaning',
    'water-heater-repair',
    'water-heater-installation',
    'tankless-water-heaters',
    'leak-detection',
    'slab-leak-detection',
    'sewer-line-repair',
    'hydro-jetting',
    'gas-line-installation',
    'water-softener-installation',
    'burst-pipe-repair',
    'toilet-repair',
    'faucet-installation',
    'garbage-disposal-repair',
    'whole-house-repiping',
    'sewer-camera-inspection',
    'trenchless-sewer-repair',
    'gas-leak-detection',
    'reverse-osmosis-systems',
  ];

  const paths: Array<{ params: { locationSlug: string; serviceSlug: string } }> = [];

  for (const locationSlug of priorityLocationSlugs) {
    const locationExists = locationsData.find((l: any) => l.slug === locationSlug);
    if (!locationExists) continue;

    for (const serviceSlug of priorityServiceSlugs) {
      const serviceExists = servicesData.find((s: any) => s.slug === serviceSlug);
      if (!serviceExists) continue;

      paths.push({ params: { locationSlug, serviceSlug } });
    }
  }

  return {
    paths,
    fallback: 'blocking', // ISR for any additional combinations
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Static Props
// ─────────────────────────────────────────────────────────────────────────────
export const getStaticProps: GetStaticProps<GeoServicePageProps> = async ({ params }) => {
  const { locationSlug, serviceSlug } = params as { locationSlug: string; serviceSlug: string };

  const location = locationsData.find((l: any) => l.slug === locationSlug);
  const service = servicesData.find((s: any) => s.slug === serviceSlug);

  if (!location || !service) {
    return { notFound: true };
  }

  // Related services (same category, different service)
  const relatedServices = servicesData
    .filter((s: any) => s.slug !== serviceSlug)
    .filter((s: any) => s.featured || s.slug.includes('emergency') || s.slug.includes('water-heater') || s.slug.includes('drain'))
    .slice(0, 6) as Service[];

  // Related locations (nearby cities, same service)
  const relatedLocations = locationsData
    .filter((l: any) => l.slug !== locationSlug && l.featured)
    .slice(0, 4) as Location[];

  // FAQs for this service + location combination
  const serviceFaqs = (faqsData as any[])
    .filter((f: any) => f.serviceSlug === serviceSlug || f.locationSlug === locationSlug)
    .slice(0, 5)
    .map((f: any) => ({ question: f.question, answer: f.answer }));

  // Fallback FAQs if none found
  const fallbackFaqs = [
    {
      question: `How quickly can you respond to ${service.name.toLowerCase()} calls in ${location.name}?`,
      answer: `We typically respond to ${service.name.toLowerCase()} calls in ${location.name} within 60-90 minutes, and often faster for emergencies. Our trucks are positioned throughout the Marana area for rapid dispatch.`,
    },
    {
      question: `Are your plumbers licensed for ${service.name.toLowerCase()} in ${location.name}?`,
      answer: `Yes, Wood's Plumbing holds Arizona ROC License #${BUSINESS.trust.license} (CR-37 Plumbing), fully authorizing us to perform all plumbing work including ${service.name.toLowerCase()} throughout ${location.name} and all of Arizona.`,
    },
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${location.name}?`,
      answer: `The cost of ${service.name.toLowerCase()} in ${location.name} varies based on the scope of work. We provide free estimates and upfront pricing before any work begins — no hidden fees or surprise charges. Call us at ${BUSINESS.phone} for a quote.`,
    },
  ];

  const faqs = serviceFaqs.length >= 3 ? serviceFaqs : [...serviceFaqs, ...fallbackFaqs].slice(0, 5);

  return {
    props: {
      location: location as Location,
      service: service as Service,
      relatedServices,
      relatedLocations,
      faqs,
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
};

export default GeoServicePage;
