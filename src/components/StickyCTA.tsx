'use client';

import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { ScheduleButton } from '@/components/ScheduleButton';
import { trackPhoneClick } from '@/lib/analytics';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition > windowHeight * 0.3 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy-900 border-t-4 border-copper-500 shadow-2xl z-50 transform transition-transform duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="hidden md:block flex-1">
            <p className="text-white font-bold text-sm md:text-base">
              Need a Plumber? Get Fast, Reliable Service!
            </p>
            <p className="text-gray-300 text-xs md:text-sm">
              24/7 Emergency Service Available
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-1 md:flex-none justify-center md:justify-end">
            <a
              href={`tel:${BUSINESS.phone}`}
              onClick={() => trackPhoneClick('sticky_cta')}
              className="flex items-center gap-2 bg-white text-navy-900 px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{BUSINESS.phone}</span>
              <span className="sm:hidden">Call Now</span>
            </a>
            
            <ScheduleButton
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 text-sm"
              showIcon={true}
            >
              <span className="hidden sm:inline">Schedule Online</span>
              <span className="sm:hidden">Book Now</span>
            </ScheduleButton>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-gray-400 hover:text-white p-1 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
