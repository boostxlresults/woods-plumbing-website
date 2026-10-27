export const BUSINESS = {
  name: "Wood's Plumbing Enterprises LLC",
  legalName: "Wood's Plumbing Enterprises LLC",
  tagline: "Southern Arizona's Trusted Plumber Since 1979",
  phone: "(520) 682-2233",
  email: "info@woodsplumbingaz.com",
  website: process.env.NEXT_PUBLIC_SITE_URL || "https://www.woodsplumbing.com",
  
  address: {
    street: "13880 N Adonis Rd",
    city: "Marana",
    state: "AZ",
    zip: "85658",
    country: "US",
  },
  
  geo: {
    latitude: 32.4588,
    longitude: -111.2084,
  },
  
  hours: {
    weekday: "Office: Monday-Friday 7:00 AM - 5:00 PM",
    saturday: "Office: Saturday 8:00 AM - 4:00 PM",
    sunday: "Sunday: Emergency Services Only",
    emergency: "Open 24/7 for plumbing emergencies",
  },
  
  trust: {
    founded: 1979,
    yearsInBusiness: new Date().getFullYear() - 1979,
    license: "296386",
    // Keep in sync with the Google Business Profile (4.8 stars, 203 reviews as of Oct 2026)
    rating: 4.8,
    displayRating: "4.8",
    totalReviews: 200,
    bbbRating: "A+",
  },
  
  social: {
    facebook: "https://facebook.com/woodsplumbingaz",
    instagram: "https://instagram.com/woodsplumbingaz",
    yelp: "https://yelp.com/biz/woods-plumbing-tucson",
    googleBusiness: "https://www.google.com/maps/place/?q=place_id:ChIJA0k0a5Tk1YYRw_DWPZ3P16A",
    bbb: "https://www.bbb.org/us/az/marana/profile/plumber/woods-plumbing-enterprises-llc-1286-1000065937",
  },
  
  founder: {
    name: "Bill Woods",
    title: "Founder",
    founded: 1979,
  },

  owner: {
    name: "Andrew Dobbins",
    title: "Owner",
    bio: "U.S. Marine Corps veteran and founder of Intelligent Design (2011), owner of Wood's Plumbing since the two companies joined in 2022.",
  },

  // Wood's joined Intelligent Design in 2022. Wood's keeps its own name, phone,
  // address and Google Business Profile; Intelligent Design is the parent company.
  parent: {
    name: "Intelligent Design Home Services",
    url: "https://www.idesignac.com",
    joined: 2022,
    ratingClaim: "4.96 stars across 23,000+ customer reviews",
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
