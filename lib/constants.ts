export const BUSINESS = {
  name: "Wood's Plumbing Enterprises LLC",
  legalName: "Wood's Plumbing Enterprises LLC",
  tagline: "Tucson's Best Plumber Since 1979",
  phone: "(520) 682-2233",
  email: "info@woodsplumbingaz.com",
  website: process.env.NEXT_PUBLIC_SITE_URL || "https://woodsplumbing.com",
  
  address: {
    street: "123 N Main Ave",
    city: "Tucson",
    state: "AZ",
    zip: "85701",
    country: "US",
  },
  
  geo: {
    latitude: 32.2226,
    longitude: -110.9747,
  },
  
  hours: {
    weekday: "Monday-Friday: 7:00 AM - 5:00 PM",
    saturday: "Saturday: 8:00 AM - 4:00 PM",
    sunday: "Sunday: Emergency Services Only",
    emergency: "24/7 Emergency Service Available",
  },
  
  trust: {
    founded: 1979,
    yearsInBusiness: 46, // 2025 - 1979
    license: "296386",
    rating: 4.9,
    displayRating: "4.9",
    totalReviews: 300,
    bbbRating: "A+",
  },
  
  social: {
    facebook: "https://facebook.com/woodsplumbingaz",
    instagram: "https://instagram.com/woodsplumbingaz",
    yelp: "https://yelp.com/biz/woods-plumbing-tucson",
    googleBusiness: "https://g.page/woods-plumbing-tucson",
  },
  
  emergencyServices: {
    available: true,
    response: "Same-day emergency service available",
    phone: "(520) 682-2233",
  },
};

export const SERVICE_AREA_ZIP_CODES = [
  "85701", "85702", "85704", "85705", "85706", "85707", "85708", "85709",
  "85710", "85711", "85712", "85713", "85714", "85715", "85716", "85718",
  "85719", "85730", "85741", "85742", "85743", "85745", "85746", "85747",
  "85748", "85749", "85750", "85755", "85756", "85757", "85775",
];

export const BLOG_CATEGORIES = [
  "Plumbing Tips",
  "Home Maintenance",
  "Water Conservation",
  "Emergency Plumbing",
  "Green Plumbing",
  "DIY Guides",
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];
