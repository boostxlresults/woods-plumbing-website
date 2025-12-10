import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Wrench } from 'lucide-react';

// Import JSON data
import servicesData from '@/lib/data/services.json';

// Group services by general category (we'll infer from service names/types)
const serviceGroups = [
  { name: 'Emergency Services', keywords: ['emergency', 'burst', 'backup'] },
  { name: 'Water Heaters', keywords: ['water heater', 'tankless'] },
  { name: 'Drain & Sewer', keywords: ['drain', 'sewer', 'hydro', 'camera'] },
  { name: 'Leak Detection & Repair', keywords: ['leak', 'slab'] },
  { name: 'Gas Services', keywords: ['gas'] },
  { name: 'Pipes & Repiping', keywords: ['pipe', 'repipe', 'plumbing'] },
  { name: 'Water Treatment', keywords: ['water softener', 'filtration', 'treatment'] },
  { name: 'Fixtures & Installations', keywords: ['toilet', 'faucet', 'fixture', 'sink', 'shower', 'bathtub', 'garbage disposal', 'dishwasher'] },
  { name: 'Commercial Services', keywords: ['commercial'] },
];

interface ServicesPageProps {
  groupedServices: Array<{
    name: string;
    services: typeof servicesData;
  }>;
  totalServices: number;
}

const ServicesPage: NextPage<ServicesPageProps> = ({ groupedServices, totalServices }) => {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Plumbing Services by ${BUSINESS.name}`,
    "description": `Complete plumbing services in Southern Arizona including emergency repairs, water heaters, drain cleaning, and more.`,
    "numberOfItems": totalServices,
    "itemListElement": servicesData.slice(0, 10).map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.name,
        "description": service.shortDescription,
        "url": `${BUSINESS.website}/services/${service.slug}`,
        "provider": {
          "@type": "LocalBusiness",
          "name": BUSINESS.name,
          "telephone": BUSINESS.phone
        }
      }
    }))
  };

  return (
    <div>
      <Head>
        <title>Plumbing Services Tucson & Southern AZ | 66+ Services</title>
        <meta name="description" content="Emergency repairs, water heaters, drains, leaks & more. Licensed ROC #146498. 24/7 service." />
        <meta name="keywords" content="plumbing services Tucson, emergency plumber, water heater repair, drain cleaning, leak detection, gas line repair, Southern Arizona plumber" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${BUSINESS.website}/services`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${totalServices}+ Plumbing Services | ${BUSINESS.name}`} />
        <meta property="og:description" content={`Emergency repairs, water heaters, drain cleaning, and more. Licensed ROC ${BUSINESS.trust.license}.`} />
        <meta property="og:url" content={`${BUSINESS.website}/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={BUSINESS.name} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${totalServices}+ Plumbing Services`} />

        {/* AI Search Optimization */}
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Southern Arizona" />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Plumbing Services
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive plumbing solutions for homes and businesses across Southern Arizona. {totalServices}+ specialized services available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${BUSINESS.phone}`}>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                  <Phone className="mr-2" />
                  {BUSINESS.phone}
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

      {/* Services by Category */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {groupedServices.map((group) => {
            if (group.services.length === 0) return null;

            return (
              <div key={group.name} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
                  {group.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {group.services.map((service) => (
                    <Card key={service.slug} className="hover:shadow-lg transition-shadow h-full flex flex-col">
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between">
                          <span className="text-lg">{service.name}</span>
                          {service.name.toLowerCase().includes('emergency') && (
                            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded ml-2 flex-shrink-0">
                              24/7
                            </span>
                          )}
                          {service.featured && !service.name.toLowerCase().includes('emergency') && (
                            <span className="text-xs bg-yellow-500 text-blue-900 px-2 py-1 rounded ml-2 flex-shrink-0 font-semibold">
                              Popular
                            </span>
                          )}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{service.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <Link href={`/services/${service.slug}`}>
                          <Button variant="outline" className="w-full">
                            <Wrench className="mr-2 w-4 h-4" />
                            Learn More
                          </Button>
                        </Link>
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

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  // Group services by category based on keywords
  const groupedServices = serviceGroups.map(group => {
    const services = servicesData.filter(service => {
      const serviceName = service.name.toLowerCase();
      return group.keywords.some(keyword => serviceName.includes(keyword));
    });

    return {
      name: group.name,
      services,
    };
  });

  // Add "Other Services" for any services not categorized
  const categorizedSlugs = new Set(
    groupedServices.flatMap(group => group.services.map(s => s.slug))
  );
  const otherServices = servicesData.filter(s => !categorizedSlugs.has(s.slug));
  
  if (otherServices.length > 0) {
    groupedServices.push({
      name: 'Other Services',
      services: otherServices,
    });
  }

  return {
    props: {
      groupedServices,
      totalServices: servicesData.length,
    },
  };
};

export default ServicesPage;
