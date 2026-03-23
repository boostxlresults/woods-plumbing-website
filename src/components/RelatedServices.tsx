import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowRight, MapPin } from 'lucide-react';

interface Service {
  name: string;
  slug: string;
  shortDescription: string;
}

interface RelatedServicesProps {
  services: Service[];
  currentSlug: string;
  /** Optional: if provided, links will point to the geo-service intersection page */
  locationSlug?: string;
  /** Optional: display name of the location for heading context */
  locationName?: string;
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({
  services,
  currentSlug,
  locationSlug,
  locationName,
}) => {
  // Filter out current service and limit to 3
  const relatedServices = services
    .filter(s => s.slug !== currentSlug)
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  const heading = locationName
    ? `More Plumbing Services in ${locationName}`
    : 'Related Services';

  const buildHref = (serviceSlug: string) =>
    locationSlug
      ? `/locations/${locationSlug}/${serviceSlug}`
      : `/services/${serviceSlug}`;

  return (
    <section className="bg-gray-50 py-12 mt-16 border-t-4 border-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          {locationName && <MapPin className="w-6 h-6 text-blue-600" />}
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            {heading}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <Link key={service.slug} href={buildHref(service.slug)}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="group-hover:text-blue-600 transition-colors">
                      {service.name}
                      {locationName && (
                        <span className="block text-sm font-normal text-gray-500 mt-0.5">
                          in {locationName}
                        </span>
                      )}
                    </span>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        {locationName && (
          <div className="text-center mt-8">
            <Link
              href={`/locations/${locationSlug}`}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm underline underline-offset-2"
            >
              View all plumbing services in {locationName} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
