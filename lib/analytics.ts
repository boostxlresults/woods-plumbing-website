declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackContactFormSubmission = (service?: string) => {
  trackEvent('form_submission', 'Contact', service || 'General Inquiry');
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      event_category: 'Contact',
      event_label: 'Form Submission',
    });
  }
};

export const trackPhoneClick = (source: string) => {
  trackEvent('phone_click', 'Contact', source);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      event_category: 'Contact',
      event_label: 'Phone Click',
    });
  }
};

export const trackServiceView = (serviceName: string) => {
  trackEvent('service_view', 'Services', serviceName);
};

export const trackLocationView = (locationName: string) => {
  trackEvent('location_view', 'Locations', locationName);
};

export const trackBlogView = (postTitle: string, category: string) => {
  trackEvent('blog_view', category, postTitle);
};
