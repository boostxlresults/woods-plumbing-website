'use client';

import { Phone, Clock } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { trackPhoneClick } from '@/lib/analytics';

export const EmergencyBanner: React.FC = () => {
  return (
    <div className="bg-red-600 text-white py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2 font-bold">
          <Clock className="w-5 h-5 animate-pulse" />
          <span className="text-sm sm:text-base">Emergency Service Available</span>
        </div>
        <a 
          href={`tel:${BUSINESS.phone}`}
          onClick={() => trackPhoneClick('emergency_banner')}
          className="flex items-center gap-2 bg-white text-red-600 px-4 py-1.5 rounded-md font-bold hover:bg-gray-100 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Call Now: {BUSINESS.phone}</span>
        </a>
      </div>
    </div>
  );
};
