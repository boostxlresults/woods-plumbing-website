export interface Location {
  slug: string;
  name: string;
  county: string;
  description: string;
  zipCodes: string[];
  population: number;
  features: string[];
  neighborhoods?: string[];
}

export const locations: Location[] = [
  {
    slug: "tucson",
    name: "Tucson",
    county: "Pima County",
    description: "Serving Arizona's second-largest city with expert plumbing services since 1979. From historic neighborhoods to modern developments, Wood's Plumbing is Tucson's trusted plumbing contractor.",
    zipCodes: ["85701", "85702", "85703", "85704", "85705", "85706", "85707", "85708", "85709", "85710", "85711", "85712", "85713", "85714", "85715", "85716", "85717", "85718", "85719", "85730", "85741", "85742", "85743", "85745", "85746", "85747", "85748", "85749", "85750", "85756", "85757"],
    population: 548073,
    features: [
      "24/7 Emergency Service",
      "Residential & Commercial Plumbing",
      "Same-Day Service Available",
      "Licensed ROC 296386",
      "BBB A+ Rating"
    ],
    neighborhoods: ["Downtown", "Midtown", "Sam Hughes", "Armory Park", "Barrio Viejo", "Rincon Heights", "El Presidio", "Catalina Foothills", "Rita Ranch", "Dove Mountain"]
  },
  {
    slug: "marana",
    name: "Marana",
    county: "Pima County",
    description: "Expert plumbing services for Marana's growing community. From heritage ranches to new master-planned developments, we serve all of Marana with reliable plumbing solutions.",
    zipCodes: ["85653", "85658", "85741", "85742", "85743"],
    population: 51908,
    features: [
      "Residential Plumbing Specialists",
      "New Construction Plumbing",
      "Water Heater Experts",
      "Emergency Repairs",
      "Commercial Services"
    ],
    neighborhoods: ["Dove Mountain", "Gladden Farms", "Tangerine Farm", "Saguaro Springs", "Continental Reserve"]
  },
  {
    slug: "oro-valley",
    name: "Oro Valley",
    county: "Pima County",
    description: "Premium plumbing services for Oro Valley's upscale communities. Serving the foothills with expert water heater installation, drain cleaning, and emergency plumbing.",
    zipCodes: ["85704", "85737", "85739", "85742", "85755"],
    population: 47070,
    features: [
      "Luxury Home Plumbing",
      "Water Softener Installation",
      "Tankless Water Heaters",
      "Bathroom Remodeling",
      "24/7 Emergency Service"
    ],
    neighborhoods: ["Stone Canyon", "Rancho Vistoso", "SaddleBrooke", "Heritage Highlands", "Oro Valley Marketplace"]
  },
  {
    slug: "sahuarita",
    name: "Sahuarita",
    county: "Pima County",
    description: "Trusted plumbing contractor for Sahuarita's family-oriented community. Expert service for Rancho Sahuarita, Quail Creek, and all Sahuarita neighborhoods.",
    zipCodes: ["85614", "85629"],
    population: 34179,
    features: [
      "Family Home Plumbing",
      "Water Heater Replacement",
      "Drain Cleaning Services",
      "Leak Detection",
      "Same-Day Repairs"
    ],
    neighborhoods: ["Rancho Sahuarita", "Quail Creek", "Madera Highlands", "Sahuarita Farms"]
  },
  {
    slug: "green-valley",
    name: "Green Valley",
    county: "Pima County",
    description: "Serving Green Valley's retirement communities with patient, professional plumbing service. Specializing in water heater maintenance, fixture upgrades, and preventive care.",
    zipCodes: ["85614", "85622"],
    population: 21391,
    features: [
      "Senior-Friendly Service",
      "Water Heater Maintenance",
      "Fixture Installation",
      "Preventive Maintenance",
      "Emergency Response"
    ],
    neighborhoods: ["Green Valley Village", "Canoa Ranch", "Continental", "Quail Creek"]
  },
  {
    slug: "catalina-foothills",
    name: "Catalina Foothills",
    county: "Pima County",
    description: "Luxury plumbing services for Catalina Foothills estates. Expert installation and repair for high-end homes with sophisticated plumbing systems.",
    zipCodes: ["85718", "85750"],
    population: 50796,
    features: [
      "Luxury Home Specialists",
      "Custom Plumbing Solutions",
      "High-End Fixture Installation",
      "Water Treatment Systems",
      "Concierge Service"
    ],
    neighborhoods: ["Skyline", "Ventana Canyon", "Sabino Canyon", "Pima Canyon"]
  },
  {
    slug: "vail",
    name: "Vail",
    county: "Pima County",
    description: "Reliable plumbing for Vail's growing suburban communities. Serving new developments and established properties with comprehensive plumbing services.",
    zipCodes: ["85641", "85747"],
    population: 10208,
    features: [
      "Suburban Home Plumbing",
      "New Construction",
      "Well Pump Services",
      "Water Softeners",
      "Emergency Repairs"
    ],
    neighborhoods: ["Rancho del Lago", "The Lakes", "Haciendas", "Civano"]
  },
  {
    slug: "corona-de-tucson",
    name: "Corona de Tucson",
    county: "Pima County",
    description: "Expert plumbing for Corona de Tucson's rural residential community. Specializing in well systems, septic connections, and rural property plumbing.",
    zipCodes: ["85641"],
    population: 6198,
    features: [
      "Rural Plumbing Specialists",
      "Well System Services",
      "Septic Line Repairs",
      "Water Treatment",
      "Emergency Service"
    ]
  },
  {
    slug: "drexel-heights",
    name: "Drexel Heights",
    county: "Pima County",
    description: "Affordable, reliable plumbing for Drexel Heights families. Fast response times for repairs, installations, and emergency plumbing needs.",
    zipCodes: ["85746"],
    population: 27749,
    features: [
      "Family-Focused Service",
      "Affordable Pricing",
      "Water Heater Experts",
      "Drain Cleaning",
      "Same-Day Service"
    ]
  },
  {
    slug: "flowing-wells",
    name: "Flowing Wells",
    county: "Pima County",
    description: "Trusted plumbing services for Flowing Wells residents. Expert repairs, installations, and emergency service for this established Tucson community.",
    zipCodes: ["85705", "85741"],
    population: 16419,
    features: [
      "Established Community Service",
      "Emergency Plumbing",
      "Fixture Repair & Replacement",
      "Water Line Services",
      "Senior Discounts"
    ]
  },
  {
    slug: "casas-adobes",
    name: "Casas Adobes",
    county: "Pima County",
    description: "Comprehensive plumbing for Casas Adobes homes and businesses. From routine maintenance to emergency repairs, we're your local plumbing experts.",
    zipCodes: ["85704", "85705", "85741"],
    population: 66795,
    features: [
      "Residential & Commercial",
      "Water Heater Service",
      "Sewer Line Repairs",
      "Leak Detection",
      "24/7 Availability"
    ]
  },
  {
    slug: "tanque-verde",
    name: "Tanque Verde",
    county: "Pima County",
    description: "Serving Tanque Verde's upscale foothill communities with premium plumbing service. Expertise in custom homes and luxury installations.",
    zipCodes: ["85749", "85750"],
    population: 16901,
    features: [
      "Foothill Specialists",
      "Custom Plumbing",
      "Water Treatment Systems",
      "Remodel Plumbing",
      "Emergency Response"
    ]
  },
  {
    slug: "avra-valley",
    name: "Avra Valley",
    county: "Pima County",
    description: "Rural plumbing services for Avra Valley properties. Specializing in well systems, irrigation, and rural residential plumbing.",
    zipCodes: ["85653"],
    population: 6050,
    features: [
      "Rural Property Experts",
      "Well System Service",
      "Irrigation Plumbing",
      "Water Treatment",
      "Long-Distance Service"
    ]
  },
  {
    slug: "three-points",
    name: "Three Points",
    county: "Pima County",
    description: "Expert plumbing for Three Points rural homes. Well systems, septic connections, and reliable rural plumbing service.",
    zipCodes: ["85736"],
    population: 7346,
    features: [
      "Rural Specialists",
      "Well Pump Services",
      "Septic Plumbing",
      "Water Storage Systems",
      "Emergency Repairs"
    ]
  },
  {
    slug: "Picture Rocks",
    name: "picture-rocks",
    county: "Pima County",
    description: "Reliable plumbing for Picture Rocks and surrounding areas. Serving rural properties with well systems, water treatment, and general plumbing.",
    zipCodes: ["85743"],
    population: 9563,
    features: [
      "Rural Property Service",
      "Well System Experts",
      "Water Softeners",
      "Pipe Repairs",
      "Emergency Service"
    ]
  },
  {
    slug: "tortolita",
    name: "Tortolita",
    county: "Pima County",
    description: "Plumbing services for Tortolita's growing community. New construction plumbing and residential services for this developing area.",
    zipCodes: ["85742", "85755"],
    population: 688,
    features: [
      "New Construction",
      "Residential Plumbing",
      "Water Heater Installation",
      "Drain Services",
      "Emergency Repairs"
    ]
  },
  {
    slug: "sabino-canyon",
    name: "Sabino Canyon",
    county: "Pima County",
    description: "Premium plumbing for Sabino Canyon luxury homes. Specializing in high-end fixtures, water treatment, and sophisticated plumbing systems.",
    zipCodes: ["85750"],
    population: 3588,
    features: [
      "Luxury Home Plumbing",
      "Custom Installations",
      "Water Treatment",
      "Remodel Specialists",
      "Concierge Service"
    ]
  },
  {
    slug: "rita-ranch",
    name: "Rita Ranch",
    county: "Pima County",
    description: "Trusted plumbing for Rita Ranch's master-planned community. Serving new homes and established properties with reliable service.",
    zipCodes: ["85747"],
    population: 23286,
    features: [
      "Master-Planned Communities",
      "New Home Plumbing",
      "Water Heater Service",
      "Drain Cleaning",
      "Same-Day Service"
    ]
  },
  {
    slug: "rillito",
    name: "Rillito",
    county: "Pima County",
    description: "Expert plumbing for Rillito area properties. Rural residential plumbing including well systems and water treatment.",
    zipCodes: ["85654"],
    population: 88,
    features: [
      "Rural Plumbing",
      "Well Services",
      "Water Treatment",
      "General Repairs",
      "Emergency Response"
    ]
  },
  {
    slug: "summit",
    name: "Summit",
    county: "Pima County",
    description: "Plumbing services for Summit and surrounding areas. Residential plumbing, repairs, and installations for this Tucson community.",
    zipCodes: ["85735"],
    population: 3702,
    features: [
      "Residential Service",
      "Plumbing Repairs",
      "Fixture Installation",
      "Water Heaters",
      "Emergency Plumbing"
    ]
  },
  {
    slug: "continental",
    name: "Continental",
    county: "Pima County",
    description: "Serving Continental with reliable plumbing services. Expert repairs, water heaters, and emergency plumbing for this Green Valley area community.",
    zipCodes: ["85622"],
    population: 9090,
    features: [
      "Community-Focused Service",
      "Water Heater Specialists",
      "Plumbing Repairs",
      "Drain Cleaning",
      "Senior-Friendly"
    ]
  },
  {
    slug: "amphitheater",
    name: "Amphitheater",
    county: "Pima County",
    description: "Trusted plumbing for the Amphitheater area. Comprehensive residential plumbing including repairs, installations, and emergency service.",
    zipCodes: ["85705", "85741"],
    population: 20292,
    features: [
      "Residential Experts",
      "Emergency Service",
      "Water Heater Installation",
      "Sewer Line Service",
      "Affordable Pricing"
    ]
  }
];
