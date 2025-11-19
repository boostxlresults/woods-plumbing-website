export interface Service {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  benefits: string[];
  faqs: { question: string; answer: string; }[];
  relatedServices: string[];
  priceRange?: string;
  emergencyAvailable: boolean;
}

export const serviceCategories = [
  "Emergency Repairs",
  "Water Heaters",
  "Drain Services",
  "Pipe Repairs",
  "Fixture Installation",
  "Commercial Services",
  "Preventive Maintenance",
  "Specialized Services"
];

export const services: Service[] = [
  {
    slug: "emergency-plumbing",
    title: "24/7 Emergency Plumbing Services",
    category: "Emergency Repairs",
    excerpt: "Fast emergency plumbing repairs available 24/7 across Southern Arizona. No overtime charges.",
    description: "When a plumbing emergency strikes, Wood's Plumbing is here 24/7/365. Our experienced emergency plumbers respond quickly to burst pipes, severe leaks, sewer backups, and other urgent plumbing issues. We arrive fully equipped to diagnose and repair your emergency on the first visit.",
    benefits: [
      "24/7/365 availability including holidays",
      "No overtime charges for emergency calls",
      "Average response time under 60 minutes",
      "Fully stocked service vehicles",
      "Licensed and insured emergency technicians"
    ],
    faqs: [
      {
        question: "How quickly can you respond to a plumbing emergency?",
        answer: "Our average response time is under 60 minutes for emergency calls in the Tucson metro area. We maintain a team of on-call plumbers 24/7 to ensure rapid response."
      },
      {
        question: "Do you charge extra for emergency services?",
        answer: "No, we do not charge overtime rates for emergency calls. You pay our standard rates regardless of when you call."
      },
      {
        question: "What qualifies as a plumbing emergency?",
        answer: "Plumbing emergencies include burst pipes, severe leaks, sewer backups, no hot water, gas leaks, and any situation that could cause water damage or health hazards."
      }
    ],
    relatedServices: ["burst-pipe-repair", "leak-detection", "sewer-line-repair"],
    emergencyAvailable: true
  },
  {
    slug: "burst-pipe-repair",
    title: "Burst Pipe Repair & Replacement",
    category: "Emergency Repairs",
    excerpt: "Expert burst pipe repair to stop water damage. Emergency service available 24/7.",
    description: "A burst pipe can cause thousands of dollars in water damage within hours. Our expert plumbers respond immediately to locate, repair, or replace burst pipes. We use advanced leak detection equipment to find hidden leaks and provide permanent solutions.",
    benefits: [
      "Immediate emergency response",
      "Advanced leak detection technology",
      "Minimize water damage",
      "Complete pipe replacement if needed",
      "Insurance documentation assistance"
    ],
    faqs: [
      {
        question: "What causes pipes to burst?",
        answer: "Common causes include freezing temperatures, water pressure fluctuations, aging pipes, corrosion, and tree root intrusion. Southern Arizona's mineral-heavy water can also accelerate pipe deterioration."
      },
      {
        question: "Should I turn off my water if a pipe bursts?",
        answer: "Yes, immediately shut off your main water valve to prevent further flooding. Then call us for emergency repair. Locate your shut-off valve now so you're prepared for emergencies."
      }
    ],
    relatedServices: ["emergency-plumbing", "leak-detection", "pipe-replacement"],
    emergencyAvailable: true
  },
  {
    slug: "leak-detection",
    title: "Professional Leak Detection Services",
    category: "Emergency Repairs",
    excerpt: "Advanced leak detection technology finds hidden leaks before they cause major damage.",
    description: "Hidden leaks waste water, increase bills, and cause structural damage. Our certified leak detection specialists use electronic listening devices, thermal imaging, and video inspection to locate even the smallest leaks without destructive investigation.",
    benefits: [
      "Non-invasive leak detection methods",
      "Thermal imaging technology",
      "Video pipe inspection",
      "Accurate leak location",
      "Detailed repair recommendations"
    ],
    faqs: [
      {
        question: "How do I know if I have a hidden leak?",
        answer: "Signs include unexplained water bill increases, wet spots on walls or ceilings, musty odors, water meter running when no water is in use, and foundation cracks."
      },
      {
        question: "Can you find leaks without tearing up my property?",
        answer: "Yes, our advanced leak detection equipment can locate most leaks without excavation or demolition. We only recommend invasive methods when absolutely necessary."
      }
    ],
    relatedServices: ["burst-pipe-repair", "slab-leak-repair", "emergency-plumbing"],
    emergencyAvailable: true
  },
  {
    slug: "water-heater-repair",
    title: "Water Heater Repair Services",
    category: "Water Heaters",
    excerpt: "Expert water heater repair for all brands. Same-day service available.",
    description: "No hot water? Our water heater experts diagnose and repair all types of water heaters including tank, tankless, gas, and electric models. We service all major brands and provide honest recommendations on repair vs. replacement.",
    benefits: [
      "All brands serviced",
      "Same-day repairs available",
      "Tank and tankless expertise",
      "Honest repair vs. replace advice",
      "90-day warranty on repairs"
    ],
    faqs: [
      {
        question: "How long do water heater repairs take?",
        answer: "Most common repairs (thermostats, heating elements, pilot lights) take 1-2 hours. More complex repairs may require ordering parts and a follow-up visit."
      },
      {
        question: "Should I repair or replace my water heater?",
        answer: "If your water heater is over 10 years old and needs major repairs, replacement is usually more cost-effective. We'll provide honest recommendations based on your specific situation."
      }
    ],
    relatedServices: ["water-heater-installation", "tankless-water-heater", "water-heater-maintenance"],
    priceRange: "$150-$500",
    emergencyAvailable: true
  },
  {
    slug: "water-heater-installation",
    title: "Water Heater Installation",
    category: "Water Heaters",
    excerpt: "Professional water heater installation with lifetime warranty on workmanship.",
    description: "Upgrading to a new water heater? Our licensed plumbers install all types of water heaters to code. We'll help you choose the right size and type for your home, remove your old unit, and ensure your new water heater operates efficiently for years.",
    benefits: [
      "Help choosing the right water heater",
      "Code-compliant installation",
      "Old unit removal included",
      "Lifetime warranty on installation",
      "Manufacturer warranty honored"
    ],
    faqs: [
      {
        question: "What size water heater do I need?",
        answer: "Size depends on your household size and hot water usage. For a family of 4, we typically recommend 50-75 gallon tanks or tankless units rated at 7-9 GPM."
      },
      {
        question: "Do you provide the water heater or do I buy it?",
        answer: "We can provide and install quality water heaters, or install units you purchase. We offer competitive pricing on all major brands."
      }
    ],
    relatedServices: ["tankless-water-heater", "water-heater-repair", "water-heater-maintenance"],
    priceRange: "$1,200-$3,500",
    emergencyAvailable: false
  },
  {
    slug: "tankless-water-heater",
    title: "Tankless Water Heater Installation",
    category: "Water Heaters",
    excerpt: "Energy-efficient tankless water heaters provide endless hot water and lower utility bills.",
    description: "Tankless water heaters provide endless hot water while using 30% less energy than traditional tank models. We install Rinnai, Navien, and other top tankless brands. Perfect for Arizona's climate and water conditions.",
    benefits: [
      "Endless hot water supply",
      "30-40% energy savings",
      "Space-saving design",
      "20+ year lifespan",
      "Qualified for energy rebates"
    ],
    faqs: [
      {
        question: "Can a tankless water heater serve my whole house?",
        answer: "Yes, properly sized tankless units can serve entire homes. We calculate your peak demand to recommend the right size unit."
      },
      {
        question: "What's the payback period for tankless vs. tank?",
        answer: "With energy savings of $100-300/year, most homeowners see payback in 6-10 years. Factor in the 20+ year lifespan and rebates for even better ROI."
      }
    ],
    relatedServices: ["water-heater-installation", "water-heater-repair", "water-heater-maintenance"],
    priceRange: "$2,500-$5,500",
    emergencyAvailable: false
  },
  {
    slug: "water-heater-maintenance",
    title: "Water Heater Maintenance & Tune-Up",
    category: "Water Heaters",
    excerpt: "Annual water heater maintenance extends lifespan and prevents breakdowns.",
    description: "Regular maintenance extends water heater life and prevents unexpected breakdowns. Our comprehensive tune-up includes flushing sediment, checking anodes, testing safety valves, and inspecting all components. Recommended annually for Arizona's hard water.",
    benefits: [
      "Extend water heater lifespan",
      "Improve energy efficiency",
      "Prevent unexpected breakdowns",
      "Maintain manufacturer warranty",
      "Sediment removal for hard water"
    ],
    faqs: [
      {
        question: "How often should I maintain my water heater?",
        answer: "Annual maintenance is recommended, especially in Arizona where hard water accelerates sediment buildup and component wear."
      },
      {
        question: "What's included in water heater maintenance?",
        answer: "We flush the tank, inspect and replace anode rods, test pressure relief valves, check heating elements/burners, inspect for leaks, and test overall performance."
      }
    ],
    relatedServices: ["water-heater-repair", "water-heater-installation", "tankless-water-heater"],
    priceRange: "$95-$150",
    emergencyAvailable: false
  },
  {
    slug: "drain-cleaning",
    title: "Professional Drain Cleaning",
    category: "Drain Services",
    excerpt: "Clear stubborn clogs with professional drain cleaning. Same-day service available.",
    description: "Slow or clogged drains? Our professional drain cleaning service removes hair, grease, soap scum, and other buildup. We use drain snakes, hydro-jetting, and video inspection to clear blockages and restore proper flow.",
    benefits: [
      "Same-day service available",
      "Clear any type of clog",
      "Hydro-jetting for tough blockages",
      "Video inspection available",
      "Prevent future clogs"
    ],
    faqs: [
      {
        question: "How do I know if I need professional drain cleaning?",
        answer: "Signs include slow drains, recurring clogs, gurgling sounds, foul odors, and water backing up. If DIY methods don't work, professional cleaning is needed."
      },
      {
        question: "Is hydro-jetting better than snaking?",
        answer: "Hydro-jetting provides more thorough cleaning by scouring pipe walls, not just punching through clogs. It's ideal for grease buildup and recurring problems."
      }
    ],
    relatedServices: ["sewer-line-cleaning", "drain-repair", "video-pipe-inspection"],
    priceRange: "$95-$350",
    emergencyAvailable: true
  },
  {
    slug: "sewer-line-cleaning",
    title: "Sewer Line Cleaning & Jetting",
    category: "Drain Services",
    excerpt: "High-pressure hydro-jetting clears main sewer lines of roots, grease, and debris.",
    description: "Main sewer line clogs can cause sewage backups throughout your home. Our hydro-jetting service uses high-pressure water to completely clear roots, grease, and debris from sewer lines. We inspect with video before and after to ensure complete clearing.",
    benefits: [
      "Complete sewer line clearing",
      "Remove tree roots effectively",
      "Video inspection included",
      "Prevent sewage backups",
      "Environmentally safe method"
    ],
    faqs: [
      {
        question: "How often should I clean my sewer line?",
        answer: "If you have trees near sewer lines, annual cleaning prevents root intrusion. Otherwise, cleaning every 18-24 months maintains clear flow."
      },
      {
        question: "Will hydro-jetting damage old pipes?",
        answer: "Our technicians assess pipe condition with video inspection first. We adjust pressure for older pipes and recommend replacement if pipes are deteriorated."
      }
    ],
    relatedServices: ["drain-cleaning", "sewer-line-repair", "video-pipe-inspection"],
    priceRange: "$350-$800",
    emergencyAvailable: true
  },
  {
    slug: "drain-repair",
    title: "Drain Line Repair & Replacement",
    category: "Drain Services",
    excerpt: "Expert drain line repairs fix leaks, breaks, and collapsed pipes.",
    description: "Damaged drain lines cause leaks, odors, and sewage backups. We repair or replace damaged sections using traditional or trenchless methods. Video inspection identifies the exact problem location for targeted repairs.",
    benefits: [
      "Trenchless repair options",
      "Minimal landscaping disruption",
      "Permanent solutions",
      "Video-verified repairs",
      "10-year warranty"
    ],
    faqs: [
      {
        question: "What is trenchless drain repair?",
        answer: "Trenchless methods repair pipes from inside without extensive digging. Pipe lining or bursting techniques restore pipes with minimal property disruption."
      },
      {
        question: "How do I know if my drain line needs repair vs. cleaning?",
        answer: "Video inspection reveals the difference. Clogs need cleaning; cracks, breaks, or collapsed sections need repair or replacement."
      }
    ],
    relatedServices: ["drain-cleaning", "sewer-line-repair", "video-pipe-inspection"],
    priceRange: "$500-$3,000",
    emergencyAvailable: true
  },
  {
    slug: "sewer-line-repair",
    title: "Sewer Line Repair & Replacement",
    category: "Pipe Repairs",
    excerpt: "Traditional and trenchless sewer line repair saves your landscaping.",
    description: "Broken sewer lines cause sewage backups, foul odors, and property damage. We offer traditional excavation and trenchless repair methods. Our experienced team will recommend the most cost-effective solution for your situation.",
    benefits: [
      "Trenchless options available",
      "Preserve landscaping",
      "50-year pipe warranties",
      "Video inspection included",
      "Same-day diagnosis"
    ],
    faqs: [
      {
        question: "How much does sewer line replacement cost?",
        answer: "Costs range from $3,000-$15,000 depending on length, depth, and method. Trenchless replacement typically costs 30-50% more but saves landscaping restoration costs."
      },
      {
        question: "How long does sewer line replacement take?",
        answer: "Traditional replacement takes 2-4 days. Trenchless replacement can be completed in 1-2 days with less disruption."
      }
    ],
    relatedServices: ["sewer-line-cleaning", "drain-repair", "video-pipe-inspection"],
    priceRange: "$3,000-$15,000",
    emergencyAvailable: true
  },
  {
    slug: "pipe-replacement",
    title: "Whole House Repiping Services",
    category: "Pipe Repairs",
    excerpt: "Complete home repiping with PEX or copper. Stop leaks permanently.",
    description: "If your home has frequent leaks, low water pressure, or discolored water, whole house repiping may be the solution. We replace old galvanized, polybutylene, or corroded copper pipes with durable PEX or copper piping.",
    benefits: [
      "Stop recurring leaks",
      "Improve water pressure",
      "Increase home value",
      "Lifetime warranty on installation",
      "Minimal wall/ceiling damage"
    ],
    faqs: [
      {
        question: "How do I know if I need whole house repiping?",
        answer: "Signs include multiple leaks, rusty water, low pressure, pipes over 50 years old, and galvanized or polybutylene pipes."
      },
      {
        question: "How long does repiping take?",
        answer: "Most homes take 3-5 days for complete repiping. We work efficiently to minimize disruption and restore your plumbing quickly."
      }
    ],
    relatedServices: ["pipe-repair", "leak-detection", "water-pressure"],
    priceRange: "$4,500-$15,000",
    emergencyAvailable: false
  },
  {
    slug: "pipe-repair",
    title: "Pipe Repair Services",
    category: "Pipe Repairs",
    excerpt: "Expert repair of leaking, frozen, or damaged pipes. Fast, reliable service.",
    description: "Leaking pipes cause water damage, mold, and high water bills. Our expert plumbers quickly locate and repair leaking pipes using the latest techniques. We repair copper, PEX, PVC, and galvanized pipes.",
    benefits: [
      "All pipe types repaired",
      "Leak detection included",
      "Minimize property damage",
      "Permanent repairs",
      "Warranty on workmanship"
    ],
    faqs: [
      {
        question: "Can you repair pinhole leaks in copper pipes?",
        answer: "Yes, we repair pinhole leaks. However, multiple pinholes indicate corrosion and may require pipe replacement for a permanent solution."
      },
      {
        question: "Do you repair PEX pipes?",
        answer: "Yes, we repair and replace PEX pipes. PEX is easy to work with and repairs are typically quick and affordable."
      }
    ],
    relatedServices: ["leak-detection", "pipe-replacement", "burst-pipe-repair"],
    priceRange: "$150-$600",
    emergencyAvailable: true
  },
  {
    slug: "slab-leak-repair",
    title: "Slab Leak Detection & Repair",
    category: "Pipe Repairs",
    excerpt: "Expert slab leak repair prevents foundation damage. Non-invasive detection.",
    description: "Slab leaks occur when pipes under your foundation crack or burst. Left untreated, they cause foundation damage and mold. We use electronic leak detection to locate slab leaks without destructive investigation, then provide repair or rerouting solutions.",
    benefits: [
      "Electronic leak detection",
      "Minimize foundation damage",
      "Rerouting options available",
      "Complete foundation protection",
      "Insurance claim assistance"
    ],
    faqs: [
      {
        question: "What are signs of a slab leak?",
        answer: "Signs include warm spots on floors, high water bills, low pressure, foundation cracks, and water pooling around your foundation."
      },
      {
        question: "Do you have to break my slab to fix a slab leak?",
        answer: "Not always. We can often reroute pipes around the slab, avoiding expensive concrete work. We only access through the slab when necessary."
      }
    ],
    relatedServices: ["leak-detection", "pipe-repair", "pipe-replacement"],
    priceRange: "$500-$4,000",
    emergencyAvailable: true
  },
  {
    slug: "toilet-repair",
    title: "Toilet Repair Services",
    category: "Fixture Installation",
    excerpt: "Fix running, leaking, or clogged toilets. Same-day repairs available.",
    description: "A malfunctioning toilet wastes water and causes frustration. We repair all toilet problems including running toilets, weak flushes, leaks, clogs, and broken components. Most repairs completed same-day.",
    benefits: [
      "Same-day repairs",
      "All brands serviced",
      "Stop water waste",
      "Honest pricing",
      "Quality replacement parts"
    ],
    faqs: [
      {
        question: "Why does my toilet keep running?",
        answer: "Common causes include worn flappers, faulty fill valves, or improper float adjustment. These are quick, affordable fixes that save water."
      },
      {
        question: "Should I repair or replace my toilet?",
        answer: "If your toilet is old, inefficient, or needs frequent repairs, replacement is often more cost-effective. New toilets use 50-80% less water."
      }
    ],
    relatedServices: ["toilet-installation", "drain-cleaning", "fixture-repair"],
    priceRange: "$95-$350",
    emergencyAvailable: true
  },
  {
    slug: "toilet-installation",
    title: "Toilet Installation & Replacement",
    category: "Fixture Installation",
    excerpt: "Professional toilet installation with warranty. Save water with modern efficient models.",
    description: "Upgrading to a new toilet improves efficiency, performance, and appearance. We install all toilet types including standard, comfort height, dual flush, and ADA-compliant models. Old toilet removal and disposal included.",
    benefits: [
      "Save water with efficient models",
      "Improve flushing performance",
      "Old toilet removal included",
      "Code-compliant installation",
      "Lifetime installation warranty"
    ],
    faqs: [
      {
        question: "What's the best toilet brand?",
        answer: "We recommend Kohler, American Standard, and Toto for reliability and performance. We'll help you choose based on your needs and budget."
      },
      {
        question: "How much water do new toilets save?",
        answer: "Modern WaterSense toilets use 1.28 gallons per flush vs. 3.5+ gallons for older models. That's savings of $100+/year for a family of four."
      }
    ],
    relatedServices: ["toilet-repair", "bathroom-plumbing", "fixture-installation"],
    priceRange: "$250-$650",
    emergencyAvailable: false
  },
  {
    slug: "faucet-repair",
    title: "Faucet Repair Services",
    category: "Fixture Installation",
    excerpt: "Fix dripping, leaking, or low-pressure faucets. Stop water waste.",
    description: "Dripping faucets waste thousands of gallons annually and increase water bills. We repair all faucet types including kitchen, bathroom, outdoor, and commercial faucets. Most repairs completed in one visit.",
    benefits: [
      "Stop water waste",
      "All brands serviced",
      "Same-day repairs",
      "Quality replacement parts",
      "Improve water pressure"
    ],
    faqs: [
      {
        question: "How much water does a dripping faucet waste?",
        answer: "A faucet dripping once per second wastes over 3,000 gallons annually—that's 180 showers worth! Repairs typically pay for themselves in months."
      },
      {
        question: "Can you repair any faucet brand?",
        answer: "Yes, we service all brands including Kohler, Delta, Moen, American Standard, and more. We stock common parts for quick repairs."
      }
    ],
    relatedServices: ["faucet-installation", "fixture-repair", "sink-repair"],
    priceRange: "$95-$250",
    emergencyAvailable: false
  },
  {
    slug: "faucet-installation",
    title: "Faucet Installation Services",
    category: "Fixture Installation",
    excerpt: "Professional faucet installation for kitchen, bathroom, and outdoor fixtures.",
    description: "Installing a new faucet updates your space and improves functionality. We install all faucet types including single-handle, widespread, pull-down, touchless, and commercial-style fixtures. Precision installation ensures leak-free operation.",
    benefits: [
      "All faucet types installed",
      "Precision installation",
      "Old faucet removal included",
      "No leaks guaranteed",
      "Lifetime installation warranty"
    ],
    faqs: [
      {
        question: "Do you install faucets I purchased online?",
        answer: "Yes, we install customer-supplied faucets. We also carry quality fixtures if you prefer our recommendations and faster service."
      },
      {
        question: "How long does faucet installation take?",
        answer: "Most installations take 1-2 hours. Complex installations with new supply lines or valve replacement may take longer."
      }
    ],
    relatedServices: ["faucet-repair", "sink-installation", "fixture-installation"],
    priceRange: "$150-$350",
    emergencyAvailable: false
  },
  {
    slug: "sink-installation",
    title: "Sink Installation Services",
    category: "Fixture Installation",
    excerpt: "Expert sink installation for kitchens, bathrooms, and utility rooms.",
    description: "Installing a new sink? Our plumbers expertly install all sink types including undermount, drop-in, farmhouse, pedestal, and vessel sinks. We handle all plumbing connections to ensure leak-free operation.",
    benefits: [
      "All sink types installed",
      "Plumbing connections included",
      "Old sink removal available",
      "Leak-free installation",
      "Warranty on workmanship"
    ],
    faqs: [
      {
        question: "Can you install a garbage disposal with my new sink?",
        answer: "Yes, we routinely install garbage disposals with sink installations. It's the perfect time to upgrade your disposal."
      },
      {
        question: "What's the difference in installation between sink types?",
        answer: "Undermount sinks require more skill for proper support. Farmhouse sinks need cabinet modifications. We handle all complexity levels."
      }
    ],
    relatedServices: ["faucet-installation", "garbage-disposal", "bathroom-plumbing"],
    priceRange: "$200-$500",
    emergencyAvailable: false
  },
  {
    slug: "garbage-disposal",
    title: "Garbage Disposal Installation & Repair",
    category: "Fixture Installation",
    excerpt: "Install, repair, or replace garbage disposals. Stop jams and leaks.",
    description: "Garbage disposals make kitchen cleanup easy. We install, repair, and replace all disposal brands. Whether you have a jam, leak, or want to upgrade to a more powerful unit, we provide expert service.",
    benefits: [
      "All brands serviced",
      "Unclog jammed disposals",
      "Quiet modern models available",
      "Same-day service",
      "Improve kitchen efficiency"
    ],
    faqs: [
      {
        question: "What size garbage disposal do I need?",
        answer: "For average households, 1/2-3/4 HP is sufficient. Large families or those who cook frequently benefit from 1 HP models with multi-grind features."
      },
      {
        question: "Can you fix a jammed garbage disposal?",
        answer: "Yes, we clear most jams quickly. However, if the motor is burned out or the unit is old, replacement is often more cost-effective."
      }
    ],
    relatedServices: ["sink-installation", "drain-cleaning", "kitchen-plumbing"],
    priceRange: "$150-$450",
    emergencyAvailable: true
  },
  {
    slug: "shower-repair",
    title: "Shower Repair Services",
    category: "Fixture Installation",
    excerpt: "Fix leaky, low-pressure, or malfunctioning showers and shower valves.",
    description: "Shower problems disrupt your daily routine. We repair all shower issues including leaks, low pressure, temperature control problems, and faulty valves. We service all shower types including standard, rain, and multi-head systems.",
    benefits: [
      "All shower types serviced",
      "Fix leaks and low pressure",
      "Valve repair and replacement",
      "Same-day repairs available",
      "Quality replacement parts"
    ],
    faqs: [
      {
        question: "Why is my shower pressure low?",
        answer: "Common causes include clogged shower heads, faulty valves, pipe restrictions, or sediment buildup. We diagnose and fix the root cause."
      },
      {
        question: "Can you fix a shower that won't maintain temperature?",
        answer: "Yes, this usually indicates a faulty mixing valve or pressure-balancing valve. We replace these to restore consistent temperature control."
      }
    ],
    relatedServices: ["shower-installation", "bathtub-repair", "bathroom-plumbing"],
    priceRange: "$150-$500",
    emergencyAvailable: false
  },
  {
    slug: "shower-installation",
    title: "Shower Installation & Remodeling",
    category: "Fixture Installation",
    excerpt: "Professional shower installation for bathroom remodels and upgrades.",
    description: "Upgrading your shower? We install all shower systems including standard showers, walk-in showers, steam showers, and luxury multi-head systems. Complete plumbing rough-in and finish work for bathroom remodels.",
    benefits: [
      "All shower systems installed",
      "Remodel plumbing expertise",
      "Code-compliant installation",
      "Precise valve placement",
      "Leak-free installation guaranteed"
    ],
    faqs: [
      {
        question: "Can you install a steam shower?",
        answer: "Yes, we install complete steam shower systems including generators, controls, and specialized plumbing required for steam operation."
      },
      {
        question: "What's involved in shower installation?",
        answer: "We install supply lines, drain lines, shower valves, heads, and all fixtures. For remodels, we also handle rough-in plumbing before finishes are installed."
      }
    ],
    relatedServices: ["shower-repair", "bathtub-installation", "bathroom-remodel"],
    priceRange: "$500-$3,000",
    emergencyAvailable: false
  },
  {
    slug: "bathtub-repair",
    title: "Bathtub Repair Services",
    category: "Fixture Installation",
    excerpt: "Repair leaking, draining, or damaged bathtubs and tub fixtures.",
    description: "Bathtub problems range from slow drains to leaking faucets and cracked surfaces. We repair bathtub plumbing including drains, faucets, spouts, and valves. We also provide referrals for surface repairs and refinishing.",
    benefits: [
      "All tub types serviced",
      "Fix leaks and slow drains",
      "Faucet and valve repair",
      "Improve drainage",
      "Prevent water damage"
    ],
    faqs: [
      {
        question: "Why won't my bathtub drain?",
        answer: "Common causes include hair clogs, soap scum buildup, or faulty drain mechanisms. We clear clogs and repair or replace drain assemblies."
      },
      {
        question: "Can you fix a leaking bathtub faucet?",
        answer: "Yes, we repair and replace tub faucets and valves. Many leaks are simple washer or cartridge replacements."
      }
    ],
    relatedServices: ["bathtub-installation", "shower-repair", "drain-cleaning"],
    priceRange: "$150-$400",
    emergencyAvailable: false
  },
  {
    slug: "bathtub-installation",
    title: "Bathtub Installation & Replacement",
    category: "Fixture Installation",
    excerpt: "Professional bathtub installation for remodels and replacements.",
    description: "Installing a new bathtub transforms your bathroom. We install all tub types including alcove, freestanding, drop-in, and walk-in tubs. Complete plumbing installation ensures proper drainage and water supply.",
    benefits: [
      "All tub types installed",
      "Complete plumbing installation",
      "Old tub removal included",
      "Level installation guaranteed",
      "Prevent future leaks"
    ],
    faqs: [
      {
        question: "Can you install a freestanding tub?",
        answer: "Yes, we install freestanding tubs including floor-mounted faucet installations. Proper supply and drain placement is critical for these installations."
      },
      {
        question: "How long does tub installation take?",
        answer: "Simple tub replacements take 4-6 hours. Complex installations with new plumbing rough-in may take 1-2 days."
      }
    ],
    relatedServices: ["bathtub-repair", "shower-installation", "bathroom-remodel"],
    priceRange: "$600-$2,500",
    emergencyAvailable: false
  },
  {
    slug: "bathroom-plumbing",
    title: "Bathroom Plumbing Services",
    category: "Fixture Installation",
    excerpt: "Complete bathroom plumbing for remodels, repairs, and new construction.",
    description: "Bathroom plumbing requires precision and code knowledge. We provide complete bathroom plumbing services including rough-in, fixture installation, repairs, and remodels. From powder rooms to master suites, we handle all complexity levels.",
    benefits: [
      "Complete bathroom services",
      "Remodel specialists",
      "Code-compliant work",
      "Fixture installation expertise",
      "Lifetime installation warranty"
    ],
    faqs: [
      {
        question: "What's involved in bathroom plumbing rough-in?",
        answer: "Rough-in includes all supply lines, drain lines, and vents installed before walls are closed. Proper rough-in is critical for fixture installation and code compliance."
      },
      {
        question: "Can you help design bathroom plumbing layouts?",
        answer: "Yes, we provide expert guidance on fixture placement, drain locations, and plumbing configurations to optimize your bathroom design."
      }
    ],
    relatedServices: ["bathroom-remodel", "shower-installation", "toilet-installation"],
    priceRange: "$500-$5,000",
    emergencyAvailable: false
  },
  {
    slug: "kitchen-plumbing",
    title: "Kitchen Plumbing Services",
    category: "Fixture Installation",
    excerpt: "Complete kitchen plumbing for remodels, repairs, and fixture installation.",
    description: "Kitchen plumbing combines functionality with design. We handle all kitchen plumbing including sink installation, dishwasher hookups, garbage disposals, ice maker lines, and remodel rough-in. Expertise in modern kitchen features.",
    benefits: [
      "Kitchen remodel expertise",
      "Multiple fixture installations",
      "Appliance hookups",
      "Gas line installation",
      "Code-compliant work"
    ],
    faqs: [
      {
        question: "Can you install plumbing for a kitchen island?",
        answer: "Yes, we install sink and dishwasher plumbing for kitchen islands, including proper drain venting which is critical for island installations."
      },
      {
        question: "Do you install gas lines for ranges?",
        answer: "Yes, we're licensed to install and modify gas lines for ranges, cooktops, and other gas appliances."
      }
    ],
    relatedServices: ["sink-installation", "garbage-disposal", "dishwasher-installation"],
    priceRange: "$300-$3,000",
    emergencyAvailable: false
  },
  {
    slug: "bathroom-remodel",
    title: "Bathroom Remodel Plumbing",
    category: "Fixture Installation",
    excerpt: "Expert plumbing for bathroom remodels. Transform your bathroom with confidence.",
    description: "Planning a bathroom remodel? Our plumbing expertise ensures your new bathroom functions flawlessly. We handle complete plumbing rough-in, fixture installation, and final connections. Work seamlessly with contractors and homeowners.",
    benefits: [
      "Complete remodel plumbing",
      "Work with contractors",
      "Design consultation",
      "Permit and inspection handling",
      "On-time completion"
    ],
    faqs: [
      {
        question: "When should I hire a plumber for my bathroom remodel?",
        answer: "Involve us during design phase to ensure your plans are feasible and code-compliant. We rough-in before walls close and return for fixture installation."
      },
      {
        question: "Do you pull permits for bathroom remodels?",
        answer: "Yes, we obtain necessary plumbing permits and schedule inspections to ensure your remodel meets all codes."
      }
    ],
    relatedServices: ["bathroom-plumbing", "shower-installation", "bathtub-installation"],
    priceRange: "$1,500-$8,000",
    emergencyAvailable: false
  },
  {
    slug: "commercial-plumbing",
    title: "Commercial Plumbing Services",
    category: "Commercial Services",
    excerpt: "Reliable commercial plumbing for businesses across Southern Arizona.",
    description: "Commercial plumbing demands reliability and minimal downtime. We serve restaurants, offices, retail, medical facilities, and industrial clients. From repairs to new construction, our licensed commercial plumbers keep your business running.",
    benefits: [
      "Minimize business disruption",
      "24/7 emergency service",
      "Preventive maintenance programs",
      "Licensed commercial plumbers",
      "All commercial systems serviced"
    ],
    faqs: [
      {
        question: "Do you offer commercial maintenance contracts?",
        answer: "Yes, our preventive maintenance programs keep your plumbing systems running smoothly and prevent expensive emergency repairs."
      },
      {
        question: "Can you work after business hours?",
        answer: "Yes, we schedule work during off-hours to minimize disruption to your business operations."
      }
    ],
    relatedServices: ["restaurant-plumbing", "backflow-prevention", "grease-trap"],
    emergencyAvailable: true
  },
  {
    slug: "restaurant-plumbing",
    title: "Restaurant Plumbing Services",
    category: "Commercial Services",
    excerpt: "Specialized plumbing for restaurants and food service establishments.",
    description: "Restaurant plumbing requires specialized knowledge of health codes and commercial equipment. We install and service grease traps, commercial dishwashers, ice machines, hand sinks, and all restaurant plumbing needs.",
    benefits: [
      "Health code expertise",
      "Grease trap specialists",
      "Commercial equipment hookups",
      "Emergency priority service",
      "Prevent health department violations"
    ],
    faqs: [
      {
        question: "How often should grease traps be serviced?",
        answer: "Health codes typically require monthly cleaning. We provide grease trap installation, repair, and cleaning referrals."
      },
      {
        question: "Can you install a 3-compartment sink?",
        answer: "Yes, we install all commercial sinks and ensure compliance with health department requirements for your facility type."
      }
    ],
    relatedServices: ["commercial-plumbing", "grease-trap", "backflow-prevention"],
    emergencyAvailable: true
  },
  {
    slug: "backflow-prevention",
    title: "Backflow Prevention & Testing",
    category: "Commercial Services",
    excerpt: "Certified backflow testing and preventer installation for compliance.",
    description: "Backflow preventers protect drinking water from contamination. We install, test, and certify backflow prevention devices for commercial and residential properties. State-certified testers ensure compliance with local regulations.",
    benefits: [
      "State-certified testers",
      "Annual testing programs",
      "Repair and replacement",
      "Compliance documentation",
      "Prevent water contamination"
    ],
    faqs: [
      {
        question: "How often does my backflow preventer need testing?",
        answer: "Most jurisdictions require annual testing. We provide testing, certification, and file reports with local water authorities."
      },
      {
        question: "What buildings need backflow preventers?",
        answer: "Commercial buildings, irrigation systems, fire sprinklers, and some residential applications require backflow prevention per local codes."
      }
    ],
    relatedServices: ["commercial-plumbing", "irrigation-repair", "water-pressure"],
    priceRange: "$95-$150",
    emergencyAvailable: false
  },
  {
    slug: "grease-trap",
    title: "Grease Trap Installation & Service",
    category: "Commercial Services",
    excerpt: "Commercial grease trap installation and maintenance for food service.",
    description: "Grease traps are required for most food service establishments. We size, install, and service grease traps to meet health department requirements and prevent sewer line clogs. Compliance documentation provided.",
    benefits: [
      "Proper sizing for your facility",
      "Health code compliant",
      "Installation and repair",
      "Prevent sewer clogs",
      "Compliance documentation"
    ],
    faqs: [
      {
        question: "What size grease trap do I need?",
        answer: "Size depends on your facility type, fixture units, and local codes. We calculate requirements and install appropriately sized traps."
      },
      {
        question: "Can you repair a leaking grease trap?",
        answer: "Yes, we repair grease traps. However, severely damaged or undersized traps should be replaced for compliance and proper function."
      }
    ],
    relatedServices: ["restaurant-plumbing", "commercial-plumbing", "drain-cleaning"],
    priceRange: "$500-$3,000",
    emergencyAvailable: false
  },
  {
    slug: "water-softener",
    title: "Water Softener Installation & Service",
    category: "Specialized Services",
    excerpt: "Protect your plumbing and appliances with professional water softener service.",
    description: "Arizona's hard water damages plumbing, appliances, and fixtures. Water softeners remove minerals that cause scale buildup. We install, service, and repair all water softener brands. Improve water quality and protect your investment.",
    benefits: [
      "Protect pipes and appliances",
      "Reduce soap usage",
      "Softer skin and hair",
      "Extend appliance life",
      "All brands serviced"
    ],
    faqs: [
      {
        question: "Do I need a water softener in Arizona?",
        answer: "Arizona has very hard water (250+ PPM in most areas). Softeners dramatically extend appliance life and improve water quality."
      },
      {
        question: "What size water softener do I need?",
        answer: "Size depends on household size, water hardness, and daily usage. We test your water and recommend appropriate sizing."
      }
    ],
    relatedServices: ["water-filtration", "reverse-osmosis", "water-pressure"],
    priceRange: "$800-$2,500",
    emergencyAvailable: false
  },
  {
    slug: "water-filtration",
    title: "Water Filtration System Installation",
    category: "Specialized Services",
    excerpt: "Whole house and point-of-use water filtration for clean, safe water.",
    description: "Water filtration removes contaminants, improves taste, and protects your health. We install whole house filters, under-sink systems, and specialty filtration. Custom solutions for your water quality concerns.",
    benefits: [
      "Remove contaminants",
      "Improve taste and odor",
      "Protect your health",
      "Reduce bottled water waste",
      "Custom solutions available"
    ],
    faqs: [
      {
        question: "Should I get whole house or point-of-use filtration?",
        answer: "Whole house systems filter all water. Point-of-use (under-sink) systems provide highly filtered drinking water. Many choose both for comprehensive protection."
      },
      {
        question: "How often do filters need replacement?",
        answer: "Depends on filter type and usage. Sediment filters: 3-6 months. Carbon filters: 6-12 months. RO membranes: 2-3 years. We provide maintenance reminders."
      }
    ],
    relatedServices: ["reverse-osmosis", "water-softener", "water-testing"],
    priceRange: "$300-$3,000",
    emergencyAvailable: false
  },
  {
    slug: "reverse-osmosis",
    title: "Reverse Osmosis System Installation",
    category: "Specialized Services",
    excerpt: "Premium reverse osmosis systems for the purest drinking water.",
    description: "Reverse osmosis provides the highest quality drinking water by removing up to 99% of contaminants. We install under-sink RO systems with dedicated faucets. Perfect for Arizona's mineral-heavy water.",
    benefits: [
      "99% contaminant removal",
      "Great tasting water",
      "Eliminate bottled water",
      "Multiple stages of filtration",
      "Space-saving under-sink installation"
    ],
    faqs: [
      {
        question: "What contaminants does RO remove?",
        answer: "RO removes lead, arsenic, fluoride, chlorine, nitrates, bacteria, viruses, and dissolved minerals. It's the most thorough home filtration method."
      },
      {
        question: "How much water does RO waste?",
        answer: "Traditional RO wastes 3-4 gallons per gallon produced. Modern systems are more efficient, wasting 1-2 gallons per gallon. The health benefits outweigh waste for most families."
      }
    ],
    relatedServices: ["water-filtration", "water-softener", "faucet-installation"],
    priceRange: "$400-$1,200",
    emergencyAvailable: false
  },
  {
    slug: "sump-pump",
    title: "Sump Pump Installation & Repair",
    category: "Specialized Services",
    excerpt: "Protect your basement from flooding with reliable sump pump service.",
    description: "Sump pumps prevent basement and crawl space flooding. We install, repair, and maintain sump pump systems including battery backup systems for power outages. Protect your home from water damage.",
    benefits: [
      "Prevent basement flooding",
      "Battery backup available",
      "All pump types serviced",
      "Annual testing programs",
      "Emergency replacement"
    ],
    faqs: [
      {
        question: "Do I need a battery backup sump pump?",
        answer: "Storms that cause flooding often include power outages. Battery backup ensures your sump pump works when you need it most."
      },
      {
        question: "How often should sump pumps be tested?",
        answer: "Test monthly by pouring water in the pit. Annual professional maintenance ensures reliability when monsoons hit."
      }
    ],
    relatedServices: ["drain-cleaning", "emergency-plumbing", "leak-detection"],
    priceRange: "$400-$1,500",
    emergencyAvailable: true
  },
  {
    slug: "gas-line-installation",
    title: "Gas Line Installation & Repair",
    category: "Specialized Services",
    excerpt: "Licensed gas line installation for appliances, fireplaces, and outdoor kitchens.",
    description: "Gas line work requires specialized licensing and expertise. We install gas lines for ranges, dryers, water heaters, fireplaces, pool heaters, and outdoor kitchens. All work pressure tested and inspected for safety.",
    benefits: [
      "Licensed gas technicians",
      "All applications served",
      "Pressure tested installations",
      "Leak detection and repair",
      "Permit and inspection handling"
    ],
    faqs: [
      {
        question: "Can you install a gas line for my outdoor kitchen?",
        answer: "Yes, we install gas lines for grills, pizza ovens, fire pits, and all outdoor cooking equipment."
      },
      {
        question: "How do I know if I have a gas leak?",
        answer: "Signs include sulfur (rotten egg) smell, hissing sounds, dead vegetation, and higher gas bills. If you suspect a leak, evacuate and call 911, then call us."
      }
    ],
    relatedServices: ["water-heater-installation", "outdoor-plumbing", "leak-detection"],
    priceRange: "$300-$2,000",
    emergencyAvailable: true
  },
  {
    slug: "water-pressure",
    title: "Water Pressure Repair & Regulation",
    category: "Specialized Services",
    excerpt: "Fix low or high water pressure problems. Protect pipes and fixtures.",
    description: "Proper water pressure is essential for comfort and protecting your plumbing. We diagnose and fix low pressure issues and install pressure regulators to protect against high pressure. Optimal pressure extends appliance life.",
    benefits: [
      "Diagnose pressure problems",
      "Pressure regulator installation",
      "Protect pipes and fixtures",
      "Improve fixture performance",
      "Extend appliance lifespan"
    ],
    faqs: [
      {
        question: "What causes low water pressure?",
        answer: "Causes include partially closed valves, pipe corrosion, leaks, failing pressure regulators, and municipal supply issues. We diagnose the exact cause."
      },
      {
        question: "Is high water pressure dangerous?",
        answer: "Yes, pressure above 80 PSI stresses pipes, causes leaks, and shortens appliance life. We install pressure regulators to maintain safe 45-75 PSI."
      }
    ],
    relatedServices: ["pipe-repair", "leak-detection", "water-heater-repair"],
    priceRange: "$150-$600",
    emergencyAvailable: false
  },
  {
    slug: "outdoor-plumbing",
    title: "Outdoor Plumbing Services",
    category: "Specialized Services",
    excerpt: "Hose bibbs, outdoor showers, irrigation, and all exterior plumbing.",
    description: "Outdoor plumbing withstands Arizona's harsh weather. We install and repair hose bibbs, outdoor showers, irrigation connections, pool plumbing, and outdoor kitchens. Freeze-proof fixtures prevent winter damage.",
    benefits: [
      "All outdoor plumbing services",
      "Freeze-proof fixtures",
      "Irrigation connections",
      "Outdoor kitchen plumbing",
      "Weather-resistant installation"
    ],
    faqs: [
      {
        question: "Do I need freeze-proof hose bibbs in Arizona?",
        answer: "Tucson occasionally freezes overnight. Freeze-proof bibbs prevent pipe bursts during cold snaps and are worth the small investment."
      },
      {
        question: "Can you install plumbing for an outdoor shower?",
        answer: "Yes, we install hot and cold water lines for outdoor showers, including proper drainage to prevent water pooling."
      }
    ],
    relatedServices: ["gas-line-installation", "irrigation-repair", "hose-bibb"],
    priceRange: "$150-$1,500",
    emergencyAvailable: false
  },
  {
    slug: "irrigation-repair",
    title: "Irrigation System Repair",
    category: "Specialized Services",
    excerpt: "Fix irrigation leaks, broken valves, and water line repairs.",
    description: "Irrigation problems waste water and increase bills. We repair irrigation leaks, broken pipes, faulty valves, and backflow preventers. While we don't service sprinkler heads or timers, we handle all plumbing aspects of your irrigation system.",
    benefits: [
      "Stop water waste",
      "Repair leaks and breaks",
      "Valve replacement",
      "Backflow testing",
      "Reduce water bills"
    ],
    faqs: [
      {
        question: "Do you repair sprinkler heads?",
        answer: "We focus on irrigation plumbing (pipes, valves, backflow). We can refer trusted irrigation specialists for sprinkler heads and controllers."
      },
      {
        question: "Can you find underground irrigation leaks?",
        answer: "Yes, we use leak detection equipment to locate underground irrigation leaks without excavating your entire yard."
      }
    ],
    relatedServices: ["leak-detection", "backflow-prevention", "outdoor-plumbing"],
    priceRange: "$150-$800",
    emergencyAvailable: false
  },
  {
    slug: "hose-bibb",
    title: "Hose Bibb Installation & Repair",
    category: "Specialized Services",
    excerpt: "Install, repair, or replace outdoor faucets and hose bibbs.",
    description: "Outdoor faucets (hose bibbs) are essential for irrigation, washing, and outdoor tasks. We install freeze-proof bibbs, repair leaks, and add additional outdoor faucets wherever needed.",
    benefits: [
      "Freeze-proof installation",
      "Fix leaking outdoor faucets",
      "Add new faucet locations",
      "Prevent pipe freezing",
      "Extend reach for convenience"
    ],
    faqs: [
      {
        question: "Why is my outdoor faucet leaking?",
        answer: "Common causes include worn washers, damaged stems, or freeze damage. Most repairs are quick and affordable."
      },
      {
        question: "Can you add an outdoor faucet to the side of my house?",
        answer: "Yes, we run supply lines and install hose bibbs wherever convenient for your yard maintenance needs."
      }
    ],
    relatedServices: ["outdoor-plumbing", "faucet-repair", "pipe-repair"],
    priceRange: "$150-$400",
    emergencyAvailable: false
  },
  {
    slug: "dishwasher-installation",
    title: "Dishwasher Installation & Repair",
    category: "Fixture Installation",
    excerpt: "Professional dishwasher hookup and repair. Prevent leaks and ensure proper drainage.",
    description: "Proper dishwasher installation prevents leaks and ensures efficient operation. We install new dishwashers, repair leaks and drainage issues, and replace faulty components. All connections tested for leak-free operation.",
    benefits: [
      "Leak-free installation",
      "Proper drainage setup",
      "Repair leaks and clogs",
      "All brands serviced",
      "Warranty on installation"
    ],
    faqs: [
      {
        question: "Can you install a dishwasher if there isn't one currently?",
        answer: "Yes, we run new supply lines, install drains, and provide electrical if there's an outlet nearby. We'll assess feasibility during our visit."
      },
      {
        question: "Why does my dishwasher leak?",
        answer: "Leaks often come from faulty door seals, loose connections, or drain hose problems. We diagnose and repair all dishwasher leaks."
      }
    ],
    relatedServices: ["kitchen-plumbing", "garbage-disposal", "drain-cleaning"],
    priceRange: "$150-$400",
    emergencyAvailable: false
  },
  {
    slug: "washing-machine",
    title: "Washing Machine Installation & Repair",
    category: "Fixture Installation",
    excerpt: "Washing machine hookup, drain installation, and leak repair.",
    description: "Washing machine installation requires proper water supply and drainage. We install new hookups, repair leaks, upgrade to flood-proof valves, and relocate connections for laundry room remodels.",
    benefits: [
      "Proper drain installation",
      "Flood-proof valve installation",
      "Fix leaks and slow drains",
      "Washing machine relocation",
      "Prevent water damage"
    ],
    faqs: [
      {
        question: "Should I install flood-proof washing machine valves?",
        answer: "Absolutely. Auto-shutoff valves stop water flow when the washing machine is off, preventing burst hose flooding—a leading cause of home water damage."
      },
      {
        question: "Can you relocate washing machine hookups?",
        answer: "Yes, we relocate water supply and drains for laundry room remodels or to accommodate new appliances."
      }
    ],
    relatedServices: ["drain-cleaning", "leak-detection", "fixture-installation"],
    priceRange: "$200-$600",
    emergencyAvailable: false
  },
  {
    slug: "fixture-installation",
    title: "Plumbing Fixture Installation",
    category: "Fixture Installation",
    excerpt: "Expert installation of all plumbing fixtures for homes and businesses.",
    description: "Installing plumbing fixtures correctly ensures years of trouble-free operation. We install all fixtures including faucets, toilets, sinks, tubs, showers, and appliances. Professional installation with precision and care.",
    benefits: [
      "All fixture types installed",
      "Precise installation",
      "Prevent leaks and problems",
      "Code-compliant work",
      "Lifetime installation warranty"
    ],
    faqs: [
      {
        question: "Do I need to buy fixtures before scheduling installation?",
        answer: "We can install customer-supplied fixtures or provide fixtures. Purchasing through us often means faster service and better warranty support."
      },
      {
        question: "How long do fixture installations take?",
        answer: "Most single fixture installations take 1-3 hours. Multiple fixtures or complex installations may take longer."
      }
    ],
    relatedServices: ["faucet-installation", "toilet-installation", "sink-installation"],
    priceRange: "$150-$500",
    emergencyAvailable: false
  },
  {
    slug: "fixture-repair",
    title: "Plumbing Fixture Repair",
    category: "Fixture Installation",
    excerpt: "Repair leaking, damaged, or malfunctioning plumbing fixtures.",
    description: "Fixture problems cause water waste and frustration. We repair all fixture types including faucets, toilets, sinks, tubs, and showers. Most repairs completed same-day to restore your plumbing quickly.",
    benefits: [
      "All fixtures repaired",
      "Same-day repairs available",
      "Quality replacement parts",
      "Stop water waste",
      "Prevent further damage"
    ],
    faqs: [
      {
        question: "Is it better to repair or replace fixtures?",
        answer: "If fixtures are new and repairs are minor, repair is cost-effective. Older fixtures with frequent problems are better replaced with modern efficient models."
      },
      {
        question: "Do you have parts in stock?",
        answer: "We stock common repair parts for quick same-day repairs. Specialty parts may require ordering."
      }
    ],
    relatedServices: ["faucet-repair", "toilet-repair", "fixture-installation"],
    priceRange: "$95-$350",
    emergencyAvailable: false
  },
  {
    slug: "video-pipe-inspection",
    title: "Video Pipe Inspection Services",
    category: "Specialized Services",
    excerpt: "Camera inspection reveals pipe condition and pinpoints problems accurately.",
    description: "Video pipe inspection provides visual confirmation of pipe problems. Our waterproof cameras navigate drain and sewer lines to identify cracks, blockages, root intrusion, and deterioration. Essential for buying homes or diagnosing recurring problems.",
    benefits: [
      "See actual pipe condition",
      "Pinpoint problem locations",
      "No unnecessary excavation",
      "Pre-purchase inspections",
      "Document repairs needed"
    ],
    faqs: [
      {
        question: "When should I get a video pipe inspection?",
        answer: "Before buying a home, for recurring drain problems, before sewer repairs, and to locate problems without destructive investigation."
      },
      {
        question: "What can video inspection find?",
        answer: "Cameras reveal clogs, cracks, breaks, root intrusion, pipe collapse, bellies (sagging), corrosion, and connection failures."
      }
    ],
    relatedServices: ["sewer-line-repair", "drain-cleaning", "leak-detection"],
    priceRange: "$150-$400",
    emergencyAvailable: false
  },
  {
    slug: "hydro-jetting",
    title: "Hydro-Jetting Services",
    category: "Drain Services",
    excerpt: "High-pressure water jetting completely clears drain and sewer lines.",
    description: "Hydro-jetting uses high-pressure water to scour pipes clean. More effective than snaking for grease, scale, and root removal. Restores pipes to like-new condition and prevents recurring clogs.",
    benefits: [
      "Complete pipe cleaning",
      "Remove stubborn blockages",
      "Prevent future clogs",
      "Environmentally safe",
      "Restore full pipe capacity"
    ],
    faqs: [
      {
        question: "Is hydro-jetting safe for old pipes?",
        answer: "We inspect pipes with video first. If pipes are sound, hydro-jetting is safe. Deteriorated pipes may need replacement instead."
      },
      {
        question: "How is hydro-jetting different from snaking?",
        answer: "Snaking punches through clogs. Hydro-jetting scours pipe walls clean, removing all buildup for longer-lasting results."
      }
    ],
    relatedServices: ["sewer-line-cleaning", "drain-cleaning", "video-pipe-inspection"],
    priceRange: "$350-$800",
    emergencyAvailable: true
  },
  {
    slug: "preventive-maintenance",
    title: "Preventive Plumbing Maintenance",
    category: "Preventive Maintenance",
    excerpt: "Annual plumbing inspections prevent emergencies and extend system life.",
    description: "Preventive maintenance catches small problems before they become expensive emergencies. Our comprehensive inspection covers water heaters, fixtures, drains, supply lines, and more. Annual maintenance saves money and prevents inconvenient breakdowns.",
    benefits: [
      "Prevent expensive repairs",
      "Extend equipment life",
      "Comprehensive inspection",
      "Priority scheduling",
      "Detailed maintenance report"
    ],
    faqs: [
      {
        question: "What's included in preventive maintenance?",
        answer: "We inspect water heaters, test fixtures, check for leaks, examine exposed pipes, test water pressure, and provide a detailed report with recommendations."
      },
      {
        question: "How often should I schedule plumbing maintenance?",
        answer: "Annual maintenance is ideal for most homes. Older homes or those with well water may benefit from twice-annual service."
      }
    ],
    relatedServices: ["water-heater-maintenance", "drain-cleaning", "leak-detection"],
    priceRange: "$150-$300",
    emergencyAvailable: false
  },
  {
    slug: "plumbing-inspection",
    title: "Plumbing Inspection Services",
    category: "Preventive Maintenance",
    excerpt: "Pre-purchase home inspections and plumbing system evaluations.",
    description: "Buying a home? Our detailed plumbing inspection reveals hidden problems before purchase. We inspect all accessible plumbing, test fixtures, examine water heaters, and provide a comprehensive report. Protect your investment.",
    benefits: [
      "Identify problems before purchase",
      "Detailed inspection report",
      "Repair cost estimates",
      "Video inspection available",
      "Protect your investment"
    ],
    faqs: [
      {
        question: "Is a plumbing inspection different from a home inspection?",
        answer: "Yes, plumbing-specific inspections are more thorough than general home inspections. We test every fixture, inspect hidden areas, and may use cameras."
      },
      {
        question: "Should I get a plumbing inspection before buying?",
        answer: "Absolutely. Plumbing repairs can cost thousands. Our inspection reveals problems and provides negotiating power with sellers."
      }
    ],
    relatedServices: ["video-pipe-inspection", "leak-detection", "preventive-maintenance"],
    priceRange: "$200-$500",
    emergencyAvailable: false
  },
  {
    slug: "water-testing",
    title: "Water Testing & Analysis",
    category: "Specialized Services",
    excerpt: "Comprehensive water testing identifies contaminants and quality issues.",
    description: "Know what's in your water. We test for hardness, contaminants, bacteria, and specific concerns. Results guide filtration and treatment recommendations. Essential for well water and those concerned about water quality.",
    benefits: [
      "Identify contaminants",
      "Test for hardness",
      "Well water testing",
      "Guide treatment choices",
      "Detailed results report"
    ],
    faqs: [
      {
        question: "What does water testing include?",
        answer: "Standard tests cover hardness, pH, chlorine, iron, and bacteria. Comprehensive tests add heavy metals, nitrates, pesticides, and specific contaminants."
      },
      {
        question: "Should I test my water if I'm on city supply?",
        answer: "City water meets EPA standards, but testing reveals hardness levels (for softener sizing) and if additional filtration would benefit your family."
      }
    ],
    relatedServices: ["water-softener", "water-filtration", "reverse-osmosis"],
    priceRange: "$50-$300",
    emergencyAvailable: false
  },
  {
    slug: "tank-removal",
    title: "Water Tank Removal Services",
    category: "Specialized Services",
    excerpt: "Safe removal of old water heaters, expansion tanks, and water storage tanks.",
    description: "Removing old water heaters and tanks requires proper disconnection and disposal. We safely disconnect, remove, and dispose of old tanks. Prevent leaks and free up space when upgrading equipment.",
    benefits: [
      "Safe disconnection",
      "Proper disposal",
      "Prevent leaks during removal",
      "Free up space",
      "Included with new installations"
    ],
    faqs: [
      {
        question: "Do you dispose of old water heaters?",
        answer: "Yes, proper disposal is included with new water heater installations. We also remove tanks separately if needed."
      },
      {
        question: "Can you remove large water storage tanks?",
        answer: "Yes, we remove tanks of all sizes including large storage tanks, expansion tanks, and pressure tanks."
      }
    ],
    relatedServices: ["water-heater-installation", "tank-installation", "water-softener"],
    priceRange: "$75-$200",
    emergencyAvailable: false
  },
  {
    slug: "sink-repair",
    title: "Sink Repair Services",
    category: "Fixture Installation",
    excerpt: "Fix leaking, clogged, or damaged sinks in kitchens and bathrooms.",
    description: "Sink problems include leaks, clogs, damaged basins, and faulty drains. We repair all sink issues quickly to prevent water damage. From simple clogs to drain replacement, we handle all sink repairs.",
    benefits: [
      "All sink types repaired",
      "Fix leaks and clogs",
      "Drain repair/replacement",
      "Prevent water damage",
      "Same-day repairs available"
    ],
    faqs: [
      {
        question: "Why does my sink drain slowly?",
        answer: "Slow drains indicate clogs from hair, soap, grease, or debris. We clear clogs and can install screens to prevent future problems."
      },
      {
        question: "Can you fix a cracked sink basin?",
        answer: "We repair plumbing connections but can't repair cracked basins. We'll recommend sink replacement and provide installation if needed."
      }
    ],
    relatedServices: ["drain-cleaning", "sink-installation", "faucet-repair"],
    priceRange: "$95-$300",
    emergencyAvailable: false
  },
  {
    slug: "septic-services",
    title: "Septic System Services",
    category: "Specialized Services",
    excerpt: "Septic line inspections, repairs, and connections for rural properties.",
    description: "Rural properties rely on septic systems. While we don't pump or maintain septic tanks, we handle all plumbing connections, line repairs, and inspections. We work with septic specialists to ensure complete system health.",
    benefits: [
      "Septic line repairs",
      "Connection services",
      "Video line inspection",
      "Work with septic specialists",
      "Prevent system failures"
    ],
    faqs: [
      {
        question: "Do you pump septic tanks?",
        answer: "No, but we repair sewer lines, connections, and handle plumbing aspects. We refer trusted septic pumping specialists."
      },
      {
        question: "Can you inspect my septic lines?",
        answer: "Yes, video inspection reveals septic line condition, locate problems, and identify needed repairs before they cause backups."
      }
    ],
    relatedServices: ["sewer-line-repair", "video-pipe-inspection", "drain-cleaning"],
    emergencyAvailable: true
  },
  {
    slug: "plumbing-code",
    title: "Plumbing Code Compliance",
    category: "Specialized Services",
    excerpt: "Ensure your plumbing meets Arizona building codes and regulations.",
    description: "Plumbing work must meet local codes for safety and legal compliance. Our licensed plumbers ensure all work meets or exceeds Arizona plumbing codes. We handle permits, inspections, and code violations.",
    benefits: [
      "Code-compliant work",
      "Permit handling",
      "Inspection coordination",
      "Fix code violations",
      "Protect property value"
    ],
    faqs: [
      {
        question: "When do I need plumbing permits?",
        answer: "Major work like repiping, water heater replacement, and new fixtures typically require permits. We handle all permit requirements."
      },
      {
        question: "Can you fix code violations found in inspections?",
        answer: "Yes, we correct code violations from home sales, inspections, or rental properties to meet compliance requirements."
      }
    ],
    relatedServices: ["plumbing-inspection", "bathroom-remodel", "water-heater-installation"],
    emergencyAvailable: false
  },
  {
    slug: "remodel-plumbing",
    title: "Remodel Plumbing Services",
    category: "Fixture Installation",
    excerpt: "Complete plumbing for kitchen and bathroom remodels.",
    description: "Remodeling transforms your space. Our remodel plumbing specialists handle rough-in, fixture installation, and final connections. We coordinate with contractors and homeowners for seamless project completion.",
    benefits: [
      "Remodel specialists",
      "Rough-in and finish work",
      "Coordinate with contractors",
      "Design consultation",
      "On-time completion"
    ],
    faqs: [
      {
        question: "When should plumbers get involved in remodels?",
        answer: "Involve us during design to ensure your plans are feasible and code-compliant. We rough-in before walls close and return for fixtures."
      },
      {
        question: "Do you work with my contractor?",
        answer: "Yes, we coordinate with contractors, designers, and DIY homeowners to complete remodels on schedule."
      }
    ],
    relatedServices: ["bathroom-remodel", "kitchen-plumbing", "fixture-installation"],
    emergencyAvailable: false
  },
  {
    slug: "new-construction",
    title: "New Construction Plumbing",
    category: "Commercial Services",
    excerpt: "Complete plumbing installation for new homes and commercial buildings.",
    description: "Building new? We provide complete new construction plumbing from underground work to final fixtures. Licensed for residential and commercial projects. Work directly with builders and homeowners.",
    benefits: [
      "Complete plumbing installation",
      "Residential and commercial",
      "Underground and above-ground",
      "Code-compliant work",
      "Builder and owner coordination"
    ],
    faqs: [
      {
        question: "What's included in new construction plumbing?",
        answer: "We handle underground sewer/water lines, rough-in plumbing, gas lines, and fixture installation. Complete turnkey plumbing services."
      },
      {
        question: "Do you work on multi-family projects?",
        answer: "Yes, we handle apartments, condos, and commercial buildings in addition to single-family homes."
      }
    ],
    relatedServices: ["commercial-plumbing", "gas-line-installation", "fixture-installation"],
    emergencyAvailable: false
  },
  {
    slug: "emergency-shutoff",
    title: "Emergency Water Shutoff Services",
    category: "Emergency Repairs",
    excerpt: "Stop uncontrolled water flow from bursts, breaks, and major leaks.",
    description: "Can't shut off your water during an emergency? We respond immediately to shut off water and prevent further damage. Available 24/7 for water emergencies that you can't control.",
    benefits: [
      "24/7 emergency response",
      "Stop water flow quickly",
      "Minimize water damage",
      "Locate shut-off valves",
      "Emergency repairs available"
    ],
    faqs: [
      {
        question: "Where is my main water shutoff?",
        answer: "Usually near the water meter, in the garage, or at the street. If you can't locate it during an emergency, call us immediately."
      },
      {
        question: "What if my shutoff valve won't turn?",
        answer: "Corroded valves seize over time. We'll shut off water at the meter and can replace your main shutoff to prevent future emergencies."
      }
    ],
    relatedServices: ["emergency-plumbing", "burst-pipe-repair", "leak-detection"],
    emergencyAvailable: true
  },
  {
    slug: "frozen-pipe",
    title: "Frozen Pipe Repair & Prevention",
    category: "Emergency Repairs",
    excerpt: "Thaw frozen pipes and prevent freeze damage during cold snaps.",
    description: "Tucson occasionally freezes overnight. Frozen pipes can burst and cause severe damage. We thaw frozen pipes safely and install freeze prevention measures like pipe insulation and heat cable.",
    benefits: [
      "Safe pipe thawing",
      "Prevent burst pipes",
      "Insulation installation",
      "Heat cable for problem areas",
      "Emergency service available"
    ],
    faqs: [
      {
        question: "How do I know if my pipes are frozen?",
        answer: "Signs include no water flow, frost on exposed pipes, and strange sounds when turning on faucets. Call immediately before they burst."
      },
      {
        question: "How can I prevent frozen pipes in Tucson?",
        answer: "Insulate exposed pipes, especially outdoor faucets and pipes in unheated spaces. Disconnect garden hoses and use freeze-proof hose bibbs."
      }
    ],
    relatedServices: ["burst-pipe-repair", "pipe-insulation", "hose-bibb"],
    emergencyAvailable: true
  },
  {
    slug: "pipe-insulation",
    title: "Pipe Insulation Services",
    category: "Preventive Maintenance",
    excerpt: "Insulate pipes to prevent freezing, condensation, and energy loss.",
    description: "Pipe insulation prevents freeze damage, reduces energy loss, and stops condensation. We insulate hot and cold water lines, especially in crawl spaces, attics, and exterior walls.",
    benefits: [
      "Prevent freeze damage",
      "Reduce energy loss",
      "Stop pipe condensation",
      "Quieter water flow",
      "Protect expensive repairs"
    ],
    faqs: [
      {
        question: "What pipes should be insulated in Arizona?",
        answer: "Insulate hot water lines for energy savings, exposed cold lines to prevent rare freezes, and cold lines in humid areas to prevent condensation."
      },
      {
        question: "Does pipe insulation save energy?",
        answer: "Insulating hot water lines reduces heat loss, meaning water stays hot longer and your water heater works less. Savings of 3-4% on water heating costs."
      }
    ],
    relatedServices: ["frozen-pipe", "water-heater-maintenance", "preventive-maintenance"],
    priceRange: "$100-$500",
    emergencyAvailable: false
  },
  {
    slug: "tankless-maintenance",
    title: "Tankless Water Heater Maintenance",
    category: "Water Heaters",
    excerpt: "Annual tankless water heater descaling and maintenance.",
    description: "Tankless water heaters require annual maintenance for optimal performance. We descale, clean filters, check burners, and test all components. Essential in Arizona's hard water areas to prevent mineral buildup.",
    benefits: [
      "Descale heat exchanger",
      "Clean filters and burners",
      "Maintain efficiency",
      "Prevent breakdowns",
      "Extend unit lifespan"
    ],
    faqs: [
      {
        question: "How often do tankless heaters need maintenance?",
        answer: "Annual maintenance is essential, especially in Tucson's hard water. Neglecting maintenance voids warranties and reduces efficiency."
      },
      {
        question: "What happens if I don't maintain my tankless?",
        answer: "Mineral buildup reduces efficiency, increases energy costs, and eventually causes failure. Regular maintenance prevents these expensive problems."
      }
    ],
    relatedServices: ["tankless-water-heater", "water-heater-maintenance", "water-softener"],
    priceRange: "$150-$250",
    emergencyAvailable: false
  },
  {
    slug: "expansion-tank",
    title: "Expansion Tank Installation",
    category: "Water Heaters",
    excerpt: "Required expansion tanks prevent pressure damage to water heaters.",
    description: "Expansion tanks are required by code in closed systems. They absorb pressure increases from heating water, protecting your water heater and pipes. Essential for homes with backflow preventers.",
    benefits: [
      "Protect water heater",
      "Prevent pressure damage",
      "Code requirement",
      "Extend equipment life",
      "Stop leaks from pressure"
    ],
    faqs: [
      {
        question: "Do I need an expansion tank?",
        answer: "If you have a backflow preventer or pressure regulator creating a closed system, codes require expansion tanks to prevent dangerous pressure buildup."
      },
      {
        question: "What size expansion tank do I need?",
        answer: "Size depends on water heater capacity and system pressure. We calculate proper sizing during installation."
      }
    ],
    relatedServices: ["water-heater-installation", "water-pressure", "backflow-prevention"],
    priceRange: "$200-$400",
    emergencyAvailable: false
  },
  {
    slug: "recirculation-pump",
    title: "Hot Water Recirculation Pump Installation",
    category: "Water Heaters",
    excerpt: "Instant hot water throughout your home with recirculation systems.",
    description: "Tired of waiting for hot water? Recirculation pumps provide near-instant hot water at every fixture while saving water. Modern systems use timers or sensors for efficiency.",
    benefits: [
      "Instant hot water",
      "Save thousands of gallons",
      "Programmable operation",
      "Improve convenience",
      "Increase home value"
    ],
    faqs: [
      {
        question: "How much water do recirculation pumps save?",
        answer: "Families save 12,000+ gallons annually by not running water waiting for it to heat. Systems pay for themselves in water savings."
      },
      {
        question: "Do recirculation pumps increase energy costs?",
        answer: "Modern pumps with timers or demand operation use minimal energy. The water savings typically exceed any minor energy increase."
      }
    ],
    relatedServices: ["water-heater-installation", "tankless-water-heater", "pipe-installation"],
    priceRange: "$600-$1,500",
    emergencyAvailable: false
  },
  {
    slug: "ejector-pump",
    title: "Sewage Ejector Pump Installation & Repair",
    category: "Specialized Services",
    excerpt: "Basement bathroom plumbing requires ejector pumps to lift waste to sewer lines.",
    description: "Basement bathrooms below sewer lines need ejector pumps to lift waste. We install, repair, and maintain sewage ejector pumps for reliable basement bathroom operation.",
    benefits: [
      "Enable basement bathrooms",
      "Reliable waste removal",
      "Emergency repairs available",
      "Alarm systems included",
      "Prevent sewage backups"
    ],
    faqs: [
      {
        question: "Do I need an ejector pump for a basement bathroom?",
        answer: "If your basement is below the main sewer line, yes. Ejector pumps lift waste up to the sewer, enabling below-grade bathrooms."
      },
      {
        question: "How often do ejector pumps fail?",
        answer: "Quality pumps last 7-10 years with proper maintenance. We recommend annual service to ensure reliability."
      }
    ],
    relatedServices: ["sump-pump", "bathroom-plumbing", "drain-cleaning"],
    priceRange: "$800-$2,500",
    emergencyAvailable: true
  }
];
