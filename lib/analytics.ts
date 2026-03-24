// ─── Wood's Plumbing Analytics & Conversion Tracking ─────────────────────────
// Centralized gtag event library. All custom events fire through these helpers
// so every conversion point on the site is tracked consistently in GA4.
//
// GA4 Event Naming Convention: snake_case, descriptive, under 40 chars
// Every event includes: event_category, event_label, and page_location
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// ─── Safe gtag wrapper ────────────────────────────────────────────────────────
const gtagSafe = (...args: Parameters<typeof window.gtag>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

// ─── Page Views ───────────────────────────────────────────────────────────────
export const pageview = (url: string) => {
  gtagSafe('config', GA_MEASUREMENT_ID!, {
    page_path: url,
  });
};

// ─── Generic Event ────────────────────────────────────────────────────────────
export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  gtagSafe('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

// ─── Phone Clicks ─────────────────────────────────────────────────────────────
// Fires on every tel: link click across the site.
// 'source' = where on the page the click happened (e.g. 'hero', 'sticky_cta')
export const trackPhoneClick = (source: string) => {
  gtagSafe('event', 'phone_click', {
    event_category: 'Conversion',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    conversion_type: 'call',
  });
  // Also fire as a GA4 conversion event
  gtagSafe('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'Call',
    event_label: source,
  });
};

// ─── Scheduling / ServiceTitan ────────────────────────────────────────────────
// trackScheduleClick  = user clicks any "Schedule Online" button
// trackScheduleOpen   = ServiceTitan scheduler widget successfully opens
// trackScheduleComplete = user completes booking in the scheduler
export const trackScheduleClick = (source: string) => {
  gtagSafe('event', 'schedule_click', {
    event_category: 'Conversion',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    conversion_type: 'schedule',
  });
};

export const trackScheduleOpen = (source: string) => {
  gtagSafe('event', 'schedule_open', {
    event_category: 'Conversion',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackScheduleComplete = (source: string) => {
  gtagSafe('event', 'schedule_complete', {
    event_category: 'Conversion',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    conversion_type: 'schedule',
  });
  // High-value conversion — fire as explicit GA4 conversion
  gtagSafe('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'Schedule',
    event_label: source,
  });
};

// ─── Contact Form ─────────────────────────────────────────────────────────────
// trackFormStart      = user focuses the first form field (engagement signal)
// trackContactFormSubmission = form successfully submitted
export const trackFormStart = (formName: string) => {
  gtagSafe('event', 'form_start', {
    event_category: 'Engagement',
    event_label: formName,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackContactFormSubmission = (service?: string) => {
  gtagSafe('event', 'form_submission', {
    event_category: 'Conversion',
    event_label: service || 'General Inquiry',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    conversion_type: 'form',
  });
  // Fire as GA4 conversion
  gtagSafe('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'Contact',
    event_label: service || 'Form Submission',
  });
};

// ─── Emergency / Urgency CTAs ─────────────────────────────────────────────────
// Fires when user clicks an emergency-specific CTA (high-intent signal)
export const trackEmergencyClick = (source: string) => {
  gtagSafe('event', 'emergency_click', {
    event_category: 'High Intent',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    conversion_type: 'emergency_call',
  });
};

// ─── Chat / Floating Lead Form ────────────────────────────────────────────────
export const trackChatOpen = (source: string) => {
  gtagSafe('event', 'chat_open', {
    event_category: 'Engagement',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackLeadFormOpen = (source: string) => {
  gtagSafe('event', 'lead_form_open', {
    event_category: 'Engagement',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackLeadFormSubmit = (source: string, service?: string) => {
  gtagSafe('event', 'lead_form_submit', {
    event_category: 'Conversion',
    event_label: source,
    service_requested: service || 'Not specified',
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    conversion_type: 'lead_form',
  });
  gtagSafe('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'Lead Form',
    event_label: source,
  });
};

// ─── Content Engagement ───────────────────────────────────────────────────────
export const trackServiceView = (serviceName: string) => {
  gtagSafe('event', 'service_view', {
    event_category: 'Services',
    event_label: serviceName,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackLocationView = (locationName: string) => {
  gtagSafe('event', 'location_view', {
    event_category: 'Locations',
    event_label: locationName,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackGeoServiceView = (locationName: string, serviceName: string) => {
  gtagSafe('event', 'geo_service_view', {
    event_category: 'Geo-Service',
    event_label: `${locationName} — ${serviceName}`,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackBlogView = (postTitle: string, category: string) => {
  gtagSafe('event', 'blog_view', {
    event_category: category,
    event_label: postTitle,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackServiceAreaClick = (locationName: string, source: string) => {
  gtagSafe('event', 'service_area_click', {
    event_category: 'Navigation',
    event_label: locationName,
    click_source: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackReviewClick = (platform: string) => {
  gtagSafe('event', 'review_click', {
    event_category: 'Social Proof',
    event_label: platform,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};

export const trackDirectionsClick = (source: string) => {
  gtagSafe('event', 'directions_click', {
    event_category: 'Engagement',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
  });
};
