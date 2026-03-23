import { BUSINESS, SERVICE_AREA_ZIP_CODES } from "../constants";

// Schema.org type definitions
type SchemaOrgLocalBusiness = {
  "@context": string;
  "@type": string | string[];
  [key: string]: any;
};

type SchemaOrgService = {
  "@context": string;
  "@type": string;
  [key: string]: any;
};

type SchemaOrgBreadcrumb = {
  "@context": string;
  "@type": string;
  [key: string]: any;
};

// ─────────────────────────────────────────────────────────────────────────────
// ORGANIZATION SCHEMA — Site-wide entity anchor
// Uses the full type hierarchy: Organization > LocalBusiness >
// HomeAndConstructionBusiness > Plumber (per schema.org spec)
// ─────────────────────────────────────────────────────────────────────────────
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness", "Plumber"],
    "@id": `${BUSINESS.website}#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: [
      "Wood's Plumbing",
      "Woods Plumbing",
      "Wood's Plumbing Marana",
      "Wood's Plumbing Tucson",
      "Wood's Plumbing Oro Valley",
      "Woods Plumbing AZ",
    ],
    url: BUSINESS.website,
    logo: {
      "@type": "ImageObject",
      "@id": `${BUSINESS.website}#logo`,
      url: `${BUSINESS.website}/images/woods-plumbing-logo.png`,
      contentUrl: `${BUSINESS.website}/images/woods-plumbing-logo.png`,
      caption: `${BUSINESS.name} — Licensed Plumber in Marana, AZ`,
      width: 400,
      height: 120,
    },
    image: {
      "@type": "ImageObject",
      "@id": `${BUSINESS.website}#hero-image`,
      url: `${BUSINESS.website}/images/hero-plumber.jpg`,
      contentUrl: `${BUSINESS.website}/images/hero-plumber.jpg`,
      caption: `${BUSINESS.name} professional plumber serving Marana, Tucson & Oro Valley`,
    },
    description: `${BUSINESS.tagline}. Licensed plumbing contractor (ROC #${BUSINESS.trust.license}, CR-37) serving Marana, Tucson, and Oro Valley since ${BUSINESS.trust.founded}.`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    foundingDate: String(BUSINESS.trust.founded),
    founder: {
      "@id": `${BUSINESS.website}#founder`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check, Financing Available",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "23:59",
        description: "Emergency Services Only",
      },
    ],
    knowsAbout: [
      "Emergency Plumbing Repairs",
      "Water Heater Installation",
      "Tankless Water Heaters",
      "Drain Cleaning",
      "Sewer Line Repair",
      "Sewer Line Replacement",
      "Gas Line Installation",
      "Gas Line Repair",
      "Leak Detection",
      "Slab Leak Detection and Repair",
      "Whole House Repiping",
      "Water Softener Installation",
      "Reverse Osmosis Systems",
      "Garbage Disposal Repair",
      "Faucet Installation",
      "Toilet Repair",
      "Commercial Plumbing",
      "Hydro Jetting",
      "Camera Sewer Inspection",
      "Backflow Prevention",
      "Water Pressure Issues",
      "Trenchless Sewer Repair",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona Registrar of Contractors License CR-37 Plumbing",
        identifier: `ROC #${BUSINESS.trust.license}`,
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Arizona Registrar of Contractors",
          url: "https://roc.az.gov",
        },
        validIn: {
          "@type": "State",
          name: "Arizona",
          sameAs: "https://en.wikipedia.org/wiki/Arizona",
        },
      },
    ],
    award: [
      "BBB A+ Rated Business",
      `${BUSINESS.trust.yearsInBusiness}+ Years Serving Southern Arizona`,
      "Family-Owned & Operated Since 1979",
      `${BUSINESS.trust.totalReviews}+ Verified Customer Reviews`,
      "4.9-Star Average Rating",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Better Business Bureau",
        url: "https://www.bbb.org",
      },
      {
        "@type": "Organization",
        name: "Plumbing-Heating-Cooling Contractors Association",
        url: "https://www.phccweb.org",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.trust.displayRating,
      reviewCount: BUSINESS.trust.totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: Object.values(BUSINESS.social).filter(Boolean),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
    slogan: BUSINESS.tagline,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,
        contactType: "customer service",
        areaServed: "US-AZ",
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,
        contactType: "emergency",
        areaServed: "US-AZ",
        availableLanguage: ["English", "Spanish"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Marana",
        addressRegion: "AZ",
        sameAs: "https://en.wikipedia.org/wiki/Marana,_Arizona",
      },
      {
        "@type": "City",
        name: "Tucson",
        addressRegion: "AZ",
        sameAs: "https://en.wikipedia.org/wiki/Tucson,_Arizona",
      },
      {
        "@type": "City",
        name: "Oro Valley",
        addressRegion: "AZ",
        sameAs: "https://en.wikipedia.org/wiki/Oro_Valley,_Arizona",
      },
      { "@type": "City", name: "Gladden Farms", addressRegion: "AZ" },
      { "@type": "City", name: "Continental Ranch", addressRegion: "AZ" },
      { "@type": "City", name: "Dove Mountain", addressRegion: "AZ" },
      { "@type": "City", name: "Avra Valley", addressRegion: "AZ" },
      { "@type": "City", name: "Sahuarita", addressRegion: "AZ" },
      { "@type": "City", name: "Green Valley", addressRegion: "AZ" },
      { "@type": "City", name: "Catalina Foothills", addressRegion: "AZ" },
      { "@type": "City", name: "Vail", addressRegion: "AZ" },
      { "@type": "City", name: "Picture Rocks", addressRegion: "AZ" },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL BUSINESS SCHEMA — With DefinedRegion zip codes
// ─────────────────────────────────────────────────────────────────────────────
export function generateLocalBusinessSchema(
  options: {
    includezipCodes?: boolean;
    specificLocation?: string;
    zipCodes?: string[];
  } = {}
): SchemaOrgLocalBusiness {
  const { includezipCodes = true, specificLocation, zipCodes } = options;

  const areaServed = includezipCodes
    ? (zipCodes || SERVICE_AREA_ZIP_CODES).map((zip) => ({
        "@type": "DefinedRegion" as const,
        postalCode: zip,
        addressCountry: "US",
      }))
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Plumber"],
    "@id": `${BUSINESS.website}#localbusiness`,
    name: BUSINESS.name,
    description: specificLocation
      ? `Professional plumbing services in ${specificLocation} and surrounding areas. ${BUSINESS.tagline}`
      : `${BUSINESS.tagline}. Serving Southern Arizona with expert plumbing solutions.`,
    url: BUSINESS.website,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    areaServed,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.trust.displayRating,
      reviewCount: BUSINESS.trust.totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    priceRange: "$$",
    image: `${BUSINESS.website}/images/hero-plumber.jpg`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE SCHEMA — For individual service pages
// ─────────────────────────────────────────────────────────────────────────────
export function generateServiceSchema(options: {
  serviceType: string;
  serviceName: string;
  description?: string;
  location?: string;
  zipCodes?: string[];
  ratingValue?: string;
  reviewCount?: number;
  url?: string;
}): SchemaOrgService {
  const { serviceType, serviceName, description, location, zipCodes, ratingValue, reviewCount, url } = options;

  const areaServed = zipCodes
    ? zipCodes.map((zip) => ({
        "@type": "DefinedRegion" as const,
        postalCode: zip,
        addressCountry: "US" as const,
      }))
    : location
    ? [
        {
          "@type": "City" as const,
          name: location,
          addressRegion: "AZ",
        },
      ]
    : [
        { "@type": "City", name: "Marana", addressRegion: "AZ" },
        { "@type": "City", name: "Tucson", addressRegion: "AZ" },
        { "@type": "City", name: "Oro Valley", addressRegion: "AZ" },
      ];

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": url ? `${url}#service` : undefined,
    serviceType: serviceType,
    name: serviceName,
    provider: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Plumber"],
      "@id": `${BUSINESS.website}#organization`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.state,
        postalCode: BUSINESS.address.zip,
        addressCountry: BUSINESS.address.country,
      },
    },
    areaServed,
    description:
      description ||
      `Professional ${serviceName} services in Marana, Tucson & Oro Valley, AZ. Expert installations, repairs, and maintenance by licensed plumber ROC #${BUSINESS.trust.license}.`,
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: BUSINESS.phone,
        contactType: "customer service",
      },
    },
  };

  // Add service-specific AggregateRating if data is provided
  if (ratingValue && reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue,
      reviewCount: reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

// ─────────────────────────────────────────────────────────────────────────────
// GEO-SERVICE INTERSECTION SCHEMA
// For /locations/[city]/[service] pages — hyper-local service+city targeting
// ─────────────────────────────────────────────────────────────────────────────
export function generateGeoServiceSchema(options: {
  serviceName: string;
  serviceType: string;
  serviceDescription: string;
  cityName: string;
  cityZipCodes: string[];
  cityLatitude: number;
  cityLongitude: number;
  pageUrl: string;
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const {
    serviceName,
    serviceType,
    serviceDescription,
    cityName,
    cityZipCodes,
    cityLatitude,
    cityLongitude,
    pageUrl,
  } = options;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `${serviceName} in ${cityName}, AZ`,
    serviceType: serviceType,
    description: serviceDescription,
    provider: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Plumber"],
      "@id": `${BUSINESS.website}#organization`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.city,
        addressRegion: "AZ",
        postalCode: BUSINESS.address.zip,
        addressCountry: "US",
      },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona ROC License CR-37 Plumbing",
        identifier: `ROC #${BUSINESS.trust.license}`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: BUSINESS.trust.displayRating,
        reviewCount: BUSINESS.trust.totalReviews,
        bestRating: "5",
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: cityName,
        addressRegion: "AZ",
        sameAs: `https://en.wikipedia.org/wiki/${cityName.replace(/\s+/g, "_")},_Arizona`,
      },
      ...cityZipCodes.map((zip) => ({
        "@type": "DefinedRegion",
        postalCode: zip,
        addressCountry: "US",
      })),
    ],
    availableAtOrFrom: {
      "@type": "Place",
      name: `${BUSINESS.name} — ${cityName} Service Area`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: cityLatitude,
        longitude: cityLongitude,
      },
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WEBSITE SCHEMA — With SearchAction for sitelinks searchbox
// ─────────────────────────────────────────────────────────────────────────────
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS.website}#website`,
    url: BUSINESS.website,
    name: BUSINESS.name,
    description: `${BUSINESS.tagline}. Professional plumbing services throughout Southern Arizona.`,
    publisher: {
      "@id": `${BUSINESS.website}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BUSINESS.website}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE OBJECT SCHEMA — For logo and hero images
// ─────────────────────────────────────────────────────────────────────────────
export function generateImageObjectSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `${BUSINESS.website}#logo`,
      url: `${BUSINESS.website}/images/woods-plumbing-logo.png`,
      contentUrl: `${BUSINESS.website}/images/woods-plumbing-logo.png`,
      caption: `${BUSINESS.name} — Licensed Plumber in Marana, AZ`,
      description: `Official logo of ${BUSINESS.name}, licensed plumbing contractor serving Marana, Tucson, and Oro Valley since ${BUSINESS.trust.founded}.`,
      width: 400,
      height: 120,
      representativeOfPage: false,
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "@id": `${BUSINESS.website}#og-image`,
      url: `${BUSINESS.website}/images/og-image.jpg`,
      contentUrl: `${BUSINESS.website}/images/og-image.jpg`,
      caption: `${BUSINESS.name} — Marana's Trusted Plumber Since ${BUSINESS.trust.founded}`,
      description: `Wood's Plumbing Enterprises LLC serves Marana, Tucson, and Oro Valley with 24/7 emergency plumbing, water heater service, drain cleaning, and more.`,
      width: 1200,
      height: 630,
      representativeOfPage: true,
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMB SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
export function generateBreadcrumbSchema(items: Array<{ name: string; href?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href ? `${BUSINESS.website}${item.href}` : undefined,
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
export function generateReviewSchema(reviews: Array<{
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  reviewPlatform?: string;
}>) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
    itemReviewed: {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Plumber"],
      "@id": `${BUSINESS.website}#organization`,
      name: BUSINESS.name,
      telephone: BUSINESS.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS.address.city,
        addressRegion: BUSINESS.address.state,
      },
    },
    publisher: review.reviewPlatform ? {
      "@type": "Organization",
      name: review.reviewPlatform,
    } : undefined,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// FOUNDER / OWNER SCHEMA — E-E-A-T signal
// Updated to reflect Andrew M Dobbins as ROC license holder (CR-37)
// while Bill Wood is the operational owner/master plumber
// ─────────────────────────────────────────────────────────────────────────────
export function generateFounderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BUSINESS.website}#founder`,
    name: BUSINESS.owner.name,
    jobTitle: BUSINESS.owner.title,
    worksFor: {
      "@id": `${BUSINESS.website}#organization`,
    },
    description: `${BUSINESS.owner.name} is the owner and master plumber at ${BUSINESS.name}, bringing over ${BUSINESS.owner.yearsExperience} years of hands-on plumbing experience to Southern Arizona. As a licensed Arizona contractor (ROC #${BUSINESS.trust.license}, CR-37 Plumbing), the team at Wood's Plumbing is dedicated to quality workmanship and customer satisfaction in Marana, Tucson, and Oro Valley.`,
    knowsAbout: [
      "Residential Plumbing",
      "Commercial Plumbing",
      "Water Heater Systems",
      "Drain and Sewer Services",
      "Gas Line Installation",
      "Emergency Plumbing Repairs",
      "Water Treatment Systems",
      "Plumbing Code Compliance",
      "Slab Leak Detection",
      "Trenchless Sewer Repair",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona Master Plumber License",
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Arizona Registrar of Contractors",
          url: "https://roc.az.gov",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona ROC License CR-37 Plumbing",
        identifier: `ROC #${BUSINESS.trust.license}`,
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Arizona Registrar of Contractors",
          url: "https://roc.az.gov",
        },
      },
    ],
    memberOf: {
      "@type": "Organization",
      name: BUSINESS.name,
      url: BUSINESS.website,
    },
    award: [
      `${BUSINESS.owner.yearsExperience}+ Years Master Plumber Experience`,
      "Arizona ROC Licensed Contractor CR-37",
      "BBB A+ Rated Business",
    ],
    sameAs: Object.values(BUSINESS.social).filter(Boolean),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// E-E-A-T SCHEMA — Comprehensive trust signal for AI engines
// ─────────────────────────────────────────────────────────────────────────────
export function generateEEATSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Plumber"],
    "@id": `${BUSINESS.website}#business`,
    name: BUSINESS.name,
    image: `${BUSINESS.website}/images/hero-plumber.jpg`,
    description: `${BUSINESS.name} has been providing expert plumbing services in Marana, Tucson, and Oro Valley since ${BUSINESS.trust.founded}. With ${BUSINESS.trust.yearsInBusiness}+ years of hands-on experience, Arizona ROC License #${BUSINESS.trust.license} (CR-37 Plumbing), and over ${BUSINESS.trust.totalReviews} verified customer reviews, we are the trusted choice for residential and commercial plumbing in Southern Arizona.`,
    foundingDate: String(BUSINESS.trust.founded),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: BUSINESS.website,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.state,
      postalCode: BUSINESS.address.zip,
      addressCountry: BUSINESS.address.country,
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona Registrar of Contractors License CR-37 Plumbing",
        identifier: `ROC #${BUSINESS.trust.license}`,
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Arizona Registrar of Contractors",
          url: "https://roc.az.gov",
        },
        validIn: {
          "@type": "AdministrativeArea",
          name: "Arizona",
        },
      },
    ],
    knowsAbout: [
      "Emergency Plumbing",
      "Water Heater Installation and Repair",
      "Drain Cleaning",
      "Sewer Line Services",
      "Gas Line Services",
      "Leak Detection",
      "Pipe Repair and Repiping",
      "Water Treatment Systems",
      "Commercial Plumbing",
      "Slab Leak Repair",
      "Hydro Jetting",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.trust.displayRating,
      reviewCount: BUSINESS.trust.totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Marana",
        addressRegion: "AZ",
        sameAs: "https://en.wikipedia.org/wiki/Marana,_Arizona",
      },
      {
        "@type": "City",
        name: "Tucson",
        addressRegion: "AZ",
        sameAs: "https://en.wikipedia.org/wiki/Tucson,_Arizona",
      },
      {
        "@type": "City",
        name: "Oro Valley",
        addressRegion: "AZ",
        sameAs: "https://en.wikipedia.org/wiki/Oro_Valley,_Arizona",
      },
      { "@type": "City", name: "Gladden Farms", addressRegion: "AZ" },
      { "@type": "City", name: "Continental Ranch", addressRegion: "AZ" },
      { "@type": "City", name: "Dove Mountain", addressRegion: "AZ" },
      { "@type": "City", name: "Avra Valley", addressRegion: "AZ" },
      { "@type": "City", name: "Sahuarita", addressRegion: "AZ" },
      { "@type": "City", name: "Green Valley", addressRegion: "AZ" },
      { "@type": "City", name: "Vail", addressRegion: "AZ" },
    ],
    award: [
      "BBB A+ Rating",
      `${BUSINESS.trust.yearsInBusiness}+ Years Serving Southern Arizona`,
      "Family-Owned & Operated",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Better Business Bureau",
        url: "https://www.bbb.org",
      },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOWTO SCHEMA — For DIY/instructional blog posts
// ─────────────────────────────────────────────────────────────────────────────
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface HowToSchemaParams {
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: { currency: string; value: string };
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
  image?: string;
}

export function generateHowToSchema(params: HowToSchemaParams) {
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": params.name,
    "description": params.description,
    "step": params.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
    })),
  };

  if (params.totalTime) schema.totalTime = params.totalTime;
  if (params.estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      "currency": params.estimatedCost.currency,
      "value": params.estimatedCost.value,
    };
  }
  if (params.supply && params.supply.length > 0) {
    schema.supply = params.supply.map(item => ({ "@type": "HowToSupply", "name": item }));
  }
  if (params.tool && params.tool.length > 0) {
    schema.tool = params.tool.map(item => ({ "@type": "HowToTool", "name": item }));
  }
  if (params.image) schema.image = params.image;

  return schema;
}
