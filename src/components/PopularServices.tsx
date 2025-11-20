import Link from 'next/link';
import { Wrench } from 'lucide-react';

interface Service {
  name: string;
  slug: string;
}

interface PopularServicesProps {
  services: Service[];
}

export const PopularServices: React.FC<PopularServicesProps> = ({ services }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Wrench className="w-5 h-5 text-blue-600" />
        Popular Services
      </h3>
      <ul className="space-y-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link 
              href={`/services/${service.slug}`}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
