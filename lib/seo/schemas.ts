import { BUSINESS, SERVICE_AREA_ZIP_CODES } from "../constants";

// Schema.org type definitions
type SchemaOrgLocalBusiness = {
  "@context": string;
  "@type": string;
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

// Organization Schema - Used on all pages
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "additionalType": "https://schema.org/Plumber",
    "@id": `${BUSINESS.website}#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: [
      "Wood's Plumbing",
      "Woods Plumbing",
      "Wood's Plumbing Marana",
      "Wood's Plumbing Tucson",
      "Woods Plumbing AZ",
    ],
    url: BUSINESS.website,
    logo: `${BUSINESS.website}/logo.png`,
    description: `${BUSINESS.tagline}. Professional plumbing services in Southern Arizona since ${BUSINESS.trust.founded}.`,
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
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona Registrar of Contractors License",
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
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Better Business Bureau",
        url: "https://www.bbb.org",
      },
    ],
    sameAs: Object.values(BUSINESS.social).filter(Boolean),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
    slogan: BUSINESS.tagline,
    paymentAccepted: "Cash, Credit Card, Check, Financing Available",
    currenciesAccepted: "USD",
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
  };
}

// LocalBusiness Schema with DefinedRegion for zip codes
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
    "@type": "Plumber",
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
      bestRating: 5,
    },
    priceRange: "$$",
    image: [`${BUSINESS.website}/og-image.jpg`],
  };
}

// Service Schema
export function generateServiceSchema(options: {
  serviceType: string;
  serviceName: string;
  description?: string;
  location?: string;
  zipCodes?: string[];
}): SchemaOrgService {
  const { serviceType, serviceName, description, location, zipCodes } = options;

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
        },
      ]
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceType,
    provider: {
      "@type": "Plumber",
      name: BUSINESS.name,
    },
    areaServed,
    description:
      description ||
      `Professional ${serviceName} services in Southern Arizona. Expert installations, repairs, and maintenance.`,
  };
}

// WebSite Schema
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
  };
}

// FAQ Schema for frequently asked questions
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

// BreadcrumbList Schema for navigation
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

// Individual Review Schema with testimonials
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
      "@type": "Plumber",
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

// Person Schema for Bill Wood (Founder/Owner) - E-E-A-T Signal
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
    description: `${BUSINESS.owner.name} is the owner and master plumber at ${BUSINESS.name}, bringing over ${BUSINESS.owner.yearsExperience} years of hands-on plumbing experience to Southern Arizona. As a licensed Arizona contractor, Bill leads a team of skilled professionals dedicated to quality workmanship and customer satisfaction.`,
    knowsAbout: [
      "Residential Plumbing",
      "Commercial Plumbing",
      "Water Heater Systems",
      "Drain and Sewer Services",
      "Gas Line Installation",
      "Emergency Plumbing Repairs",
      "Water Treatment Systems",
      "Plumbing Code Compliance",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona Master Plumber License",
        recognizedBy: {
          "@type": "GovernmentOrganization",
          name: "Arizona Registrar of Contractors",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        name: "Arizona ROC Licensed Contractor",
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
      "Arizona ROC Licensed Contractor",
    ],
    sameAs: Object.values(BUSINESS.social).filter(Boolean),
  };
}

// E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) Schema
export function generateEEATSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${BUSINESS.website}#business`,
    name: BUSINESS.name,
    description: `${BUSINESS.name} has been providing expert plumbing services in Southern Arizona since ${BUSINESS.trust.founded}. With ${BUSINESS.trust.yearsInBusiness}+ years of hands-on experience, Arizona ROC License #${BUSINESS.trust.license}, and over ${BUSINESS.trust.totalReviews} verified customer reviews, we are the trusted choice for residential and commercial plumbing.`,
    foundingDate: String(BUSINESS.trust.founded),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: BUSINESS.website,
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
        name: "Arizona Registrar of Contractors License",
        recognizedBy: {
          "@type": "Organization",
          name: "Arizona Registrar of Contractors",
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
    ],
    areaServed: {
      "@type": "State",
      name: "Arizona",
      containsPlace: [
        { "@type": "City", name: "Tucson" },
        { "@type": "City", name: "Marana" },
        { "@type": "City", name: "Oro Valley" },
        { "@type": "City", name: "Vail" },
        { "@type": "City", name: "Sahuarita" },
        { "@type": "City", name: "Green Valley" },
        { "@type": "City", name: "Casa Grande" },
        { "@type": "City", name: "Sierra Vista" },
      ],
    },
    award: [
      "BBB A+ Rating",
      `${BUSINESS.trust.yearsInBusiness}+ Years Serving Southern Arizona`,
    ],
    memberOf: {
      "@type": "Organization",
      name: "Better Business Bureau",
    },
  };
}

// HowTo Schema - For DIY/instructional blog posts
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

  if (params.totalTime) {
    schema.totalTime = params.totalTime;
  }

  if (params.estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      "currency": params.estimatedCost.currency,
      "value": params.estimatedCost.value,
    };
  }

  if (params.supply && params.supply.length > 0) {
    schema.supply = params.supply.map(item => ({
      "@type": "HowToSupply",
      "name": item,
    }));
  }

  if (params.tool && params.tool.length > 0) {
    schema.tool = params.tool.map(item => ({
      "@type": "HowToTool",
      "name": item,
    }));
  }

  if (params.image) {
    schema.image = params.image;
  }

  return schema;
}
