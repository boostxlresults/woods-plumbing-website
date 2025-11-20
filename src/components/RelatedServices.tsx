import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ArrowRight } from 'lucide-react';

interface Service {
  name: string;
  slug: string;
  shortDescription: string;
}

interface RelatedServicesProps {
  services: Service[];
  currentSlug: string;
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({ services, currentSlug }) => {
  // Filter out current service and limit to 3
  const relatedServices = services
    .filter(s => s.slug !== currentSlug)
    .slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 mt-16 border-t-4 border-blue-600">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Related Services
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </span>
                    <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {service.shortDescription}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
