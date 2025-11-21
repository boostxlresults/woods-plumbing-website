'use client';

import { Phone, Clock } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { trackPhoneClick } from '@/lib/analytics';

export const EmergencyBanner: React.FC = () => {
  return (
    <div className="bg-navy-700 text-white py-2.5 px-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span className="font-medium">24/7 Emergency Service Available</span>
        </div>
        <a 
          href={`tel:${BUSINESS.phone}`}
          onClick={() => trackPhoneClick('emergency_banner')}
          className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded font-bold hover:bg-red-700 transition-all duration-200"
        >
          <Phone className="w-4 h-4" />
          <span className="text-base">Call Now: {BUSINESS.phone}</span>
        </a>
      </div>
    </div>
  );
};
