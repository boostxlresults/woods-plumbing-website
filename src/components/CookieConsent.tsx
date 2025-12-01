'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const sessionConsent = sessionStorage.getItem('cookie-consent-checked');
        const storedConsent = localStorage.getItem('cookie-consent');
        
        if (sessionConsent === 'accepted' || sessionConsent === 'declined') {
          setIsVisible(false);
          if (sessionConsent === 'accepted' && storedConsent === 'accepted' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted'
            });
          }
        } else if (storedConsent === 'accepted') {
          sessionStorage.setItem('cookie-consent-checked', 'accepted');
          setIsVisible(false);
          if ((window as any).gtag) {
            (window as any).gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'granted'
            });
          }
        } else {
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, 1000);
          return () => clearTimeout(timer);
        }
      } catch {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
      setHasCheckedConsent(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      sessionStorage.setItem('cookie-consent-checked', 'accepted');
      localStorage.setItem('cookie-consent', 'accepted');
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted'
        });
      }
    } catch {
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      sessionStorage.setItem('cookie-consent-checked', 'declined');
      localStorage.removeItem('cookie-consent');
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied'
        });
      }
    } catch {
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg md:flex md:items-center md:justify-between md:p-6">
      <div className="flex-1 mb-4 md:mb-0 md:mr-8">
        <p className="text-sm text-gray-700">
          We use cookies to enhance your browsing experience and analyze site traffic. 
          By clicking &quot;Accept&quot;, you consent to our use of analytics cookies. 
          Essential cookies required for site functionality are always active. Read our{' '}
          <Link href="/privacy-policy" className="text-red-600 hover:underline font-medium">
            Privacy Policy
          </Link>{' '}
          for more information.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={handleDecline}
          className="text-sm px-4 py-2"
        >
          Essential Only
        </Button>
        <Button
          onClick={handleAccept}
          className="bg-navy-700 hover:bg-navy-800 text-white text-sm px-6 py-2"
        >
          Accept All
        </Button>
      </div>
      <button
        onClick={handleDecline}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 md:hidden"
        aria-label="Close cookie consent"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
