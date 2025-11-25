import fs from 'fs';
import path from 'path';

interface ServiceProcess {
  title: string;
  description: string;
}

interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  longDescription?: string;
  icon: string;
  benefits: string[];
  process: ServiceProcess[];
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  aliases?: string[];
  faqs?: { question: string; answer: string }[];
  commonIssues?: string[];
  serviceHighlights?: string[];
  arizonaContext?: string;
}

const BUSINESS = {
  name: "Wood's Plumbing Enterprises LLC",
  phone: "(520) 682-2233",
  yearsInBusiness: 46,
  founded: 1978,
  license: "159621"
};

const LOCATIONS = ["Tucson", "Marana", "Oro Valley", "Sahuarita", "Green Valley", "Vail", "Catalina Foothills", "Casas Adobes"];

const ARIZONA_CONTEXT = {
  climate: "desert climate with extreme heat (110°F+ summers), monsoon season (July-September), and hard water (10-25 grains per gallon)",
  waterChallenges: "Arizona's extremely hard water causes mineral buildup in pipes, water heaters, and fixtures, reducing efficiency and lifespan",
  soilConditions: "caliche soil (calcium carbite layer) and rocky desert terrain create unique challenges for underground pipe work",
  homeTypes: "mid-century ranch homes with copper pipes, newer subdivisions with PEX, and adobe/stucco construction"
};

function categorizeService(service: Service): string {
  const slug = service.slug.toLowerCase();
  const name = service.name.toLowerCase();
  
  if (slug.includes('gas')) return 'gas';
  if (slug.includes('water-heater') || slug.includes('tankless')) return 'water-heater';
  if (slug.includes('sewer')) return 'sewer';
  if (slug.includes('drain') || slug.includes('clog')) return 'drain';
  if (slug.includes('leak') || slug.includes('slab')) return 'leak';
  if (slug.includes('repipe') || slug.includes('pipe')) return 'pipe';
  if (slug.includes('water-softener') || slug.includes('filtration') || slug.includes('water-conditioning') || slug.includes('treatment')) return 'water-treatment';
  if (slug.includes('toilet') || slug.includes('faucet') || slug.includes('sink') || slug.includes('shower') || slug.includes('bathtub') || slug.includes('fixture') || slug.includes('garbage-disposal') || slug.includes('dishwasher')) return 'fixture';
  if (slug.includes('commercial')) return 'commercial';
  if (slug.includes('emergency') || slug.includes('burst')) return 'emergency';
  if (slug.includes('camera') || slug.includes('inspection')) return 'inspection';
  if (slug.includes('hydro')) return 'hydro-jetting';
  return 'general';
}

function generateArizonaContext(category: string): string {
  const contexts: Record<string, string> = {
    'gas': `In Southern Arizona, gas line work requires specialized knowledge of desert conditions. Extreme temperature swings (from 30°F winter nights to 115°F summer days) cause pipe expansion and contraction that can stress connections over time. Underground gas lines must also navigate caliche—the calcium carbonate layer common throughout Tucson and Marana—which requires specialized excavation techniques.`,
    'water-heater': `Southern Arizona's hard water (averaging 15-25 grains per gallon in Tucson) creates significant challenges for water heaters. Mineral buildup coats heating elements, reducing efficiency by up to 30% and shortening tank life from 12 years to as little as 6-8 years without regular maintenance. Annual flushing and descaling are essential in this region.`,
    'sewer': `Desert soil conditions present unique challenges for sewer lines in Southern Arizona. Tree roots seeking moisture aggressively infiltrate pipe joints, while the caliche layer common throughout the region makes excavation difficult. Additionally, monsoon season (July-September) can overwhelm older sewer systems, causing backups and flooding.`,
    'drain': `Tucson's hard water contributes to stubborn drain clogs as mineral deposits combine with soap scum and grease. The region's older homes—many built in the 1950s-70s—often have cast iron drains that corrode and narrow over time. Modern drain cleaning requires understanding these local pipe materials and conditions.`,
    'leak': `In Southern Arizona, slab leaks are particularly common due to the region's expansive soil and foundation movement. Hot water lines running through concrete slabs are especially vulnerable—the copper deteriorates faster in our alkaline soil conditions. Electronic leak detection is essential to locate hidden leaks without destructive exploration.`,
    'pipe': `Many Tucson-area homes built before 1990 have galvanized steel or copper pipes that have deteriorated due to our extremely hard water. Galvanized pipes corrode from the inside, restricting flow and adding rust to your water. Copper pipes develop pinhole leaks from the acidic water chemistry. Repiping with modern PEX or CPVC solves these issues permanently.`,
    'water-treatment': `With water hardness levels of 15-25 grains per gallon—among the highest in the nation—Southern Arizona homes desperately need water conditioning. Untreated hard water damages appliances, leaves scale on fixtures, dries out skin and hair, and reduces the effectiveness of soaps and detergents. A properly sized water softener protects your entire plumbing system.`,
    'fixture': `Tucson's hard water leaves white calcium deposits on fixtures and clogs aerators with mineral buildup. When installing new fixtures, we use anti-scale fittings and recommend low-flow options that conserve water in our desert environment while maintaining performance. Proper installation ensures fixtures last longer despite the challenging water conditions.`,
    'commercial': `Commercial plumbing in Southern Arizona faces unique challenges: high-volume water usage increases hard water damage, extreme summer heat affects rooftop equipment, and monsoon flooding can overwhelm drainage systems. We understand the specific plumbing codes for commercial properties and coordinate with inspectors throughout Pima and Pinal counties.`,
    'emergency': `Plumbing emergencies in Southern Arizona require rapid response—water damage spreads quickly in our dry climate, and extreme heat can worsen situations involving gas leaks or failed water heaters. Our GPS-dispatched trucks are positioned throughout Tucson, Marana, and Oro Valley for response times typically under 60 minutes.`,
    'inspection': `Video camera inspection is essential in Southern Arizona where underground pipes face unique threats: tree roots seeking moisture, soil movement from our expansive clay, and mineral buildup from hard water. Our HD cameras reveal exactly what's happening inside your pipes—critical information for accurate repair estimates and avoiding unnecessary excavation.`,
    'hydro-jetting': `Hydro-jetting is particularly effective for Tucson's drain problems. The high-pressure water (up to 4000 PSI) cuts through the mineral scale that builds up in our hard water, removes stubborn tree roots, and clears grease blockages completely. Unlike cable machines that punch holes through clogs, hydro-jetting cleans the entire pipe diameter for longer-lasting results.`,
    'general': `Southern Arizona presents unique plumbing challenges: extreme heat, hard water averaging 15-25 grains per gallon, caliche soil conditions, and monsoon flooding. With ${BUSINESS.yearsInBusiness} years serving this region, ${BUSINESS.name} understands these local factors and delivers solutions designed for our desert environment.`
  };
  return contexts[category] || contexts['general'];
}

function generateCategoryBenefits(category: string, serviceName: string): string[] {
  const baseBenefits = [
    `Licensed and insured - Arizona ROC #${BUSINESS.license}`,
    `${BUSINESS.yearsInBusiness}+ years serving Southern Arizona`,
    "Upfront pricing with no hidden fees",
    "Same-day service available",
  ];

  const categoryBenefits: Record<string, string[]> = {
    'gas': [
      "Certified for all gas line work under Arizona regulations",
      "Electronic gas leak detection equipment",
      "Coordination with Southwest Gas for meter work",
      "Complete permit handling and inspection scheduling",
      "24/7 emergency gas leak response"
    ],
    'water-heater': [
      "All major brands installed and serviced",
      "Tank and tankless system expertise",
      "Annual maintenance programs to extend equipment life",
      "Rebate assistance for energy-efficient upgrades",
      "Same-day water heater replacement available"
    ],
    'sewer': [
      "HD video camera inspection included",
      "Trenchless repair options that save your landscaping",
      "Root removal and prevention treatments",
      "Emergency sewer backup response 24/7",
      "Clean and sanitary work practices"
    ],
    'drain': [
      "Professional-grade equipment clears any clog",
      "Camera inspection to verify complete cleaning",
      "Safe for all pipe types including older homes",
      "Preventive maintenance programs available",
      "No-mess service with protective floor coverings"
    ],
    'leak': [
      "Electronic and acoustic leak detection equipment",
      "Thermal imaging for hidden leak location",
      "Minimally invasive repair techniques",
      "Insurance documentation for claims",
      "Slab leak specialists with foundation experience"
    ],
    'pipe': [
      "PEX and CPVC installation experts",
      "Whole-house repiping without major wall damage",
      "Water quality testing before and after",
      "Permit handling and inspection coordination",
      "Lifetime warranty on repiping workmanship"
    ],
    'water-treatment': [
      "Water testing and analysis included",
      "Properly sized systems for your home",
      "All major water softener brands serviced",
      "Salt delivery and maintenance programs",
      "Reverse osmosis drinking water systems available"
    ],
    'fixture': [
      "Expert installation of all fixture brands",
      "Removal and disposal of old fixtures",
      "Plumbing modifications as needed",
      "Low-flow options for water conservation",
      "Lifetime warranty on installation workmanship"
    ],
    'commercial': [
      "Licensed for commercial plumbing in Arizona",
      "Minimal disruption to business operations",
      "After-hours service available",
      "Preventive maintenance contracts",
      "ADA compliance expertise"
    ],
    'emergency': [
      "Guaranteed response within 60 minutes",
      "No extra charges for nights, weekends, holidays",
      "Fully stocked trucks for first-visit repairs",
      "Water damage mitigation expertise",
      "Insurance documentation and photos provided"
    ],
    'inspection': [
      "HD video with recording provided to homeowner",
      "Locate capability for precise pipe mapping",
      "Detailed written report with findings",
      "Expert interpretation of conditions",
      "Ideal for real estate transactions"
    ],
    'hydro-jetting': [
      "High-pressure cleaning up to 4000 PSI",
      "Removes roots, grease, and mineral scale",
      "Safe for most residential pipes",
      "Camera inspection before and after",
      "More effective than cable machines"
    ],
    'general': [
      "Experienced technicians with ongoing training",
      "Fully equipped service vehicles",
      "Background-checked employees",
      "100% satisfaction guarantee",
      "Serving all of Southern Arizona"
    ]
  };

  return [...baseBenefits, ...(categoryBenefits[category] || categoryBenefits['general'])];
}

function generateDetailedProcess(category: string, serviceName: string): ServiceProcess[] {
  const categoryProcesses: Record<string, ServiceProcess[]> = {
    'gas': [
      { title: "Safety-First Evaluation", description: `Our licensed gas technician arrives and first checks for any safety concerns using electronic gas detection equipment. If a leak is suspected, we secure the area before proceeding with any work.` },
      { title: "Complete System Inspection", description: `We inspect all visible gas lines, connections, and appliances to assess the scope of work needed. For new installations, we evaluate the best routing and calculate proper pipe sizing for adequate gas flow.` },
      { title: "Detailed Proposal", description: `We provide a written estimate covering all work, materials, permits, and inspection fees. We explain your options and answer questions before any work begins—no pressure, no surprises.` },
      { title: "Professional Installation/Repair", description: `Our technicians perform the work using proper materials and techniques per Arizona gas codes. We pressure test all new lines and connections to verify leak-free operation.` },
      { title: "Inspection & Documentation", description: `We schedule the required inspection, meet with the inspector, and ensure approval. You receive documentation of all work for your records, and we verify all appliances function properly.` }
    ],
    'water-heater': [
      { title: "Evaluation & Recommendation", description: `We assess your current water heater and hot water needs—family size, number of bathrooms, peak usage times. We recommend the right type and size, whether tank or tankless, gas or electric.` },
      { title: "Upfront Pricing Options", description: `We present options at different price points with clear explanations of the benefits of each. You choose what works best for your budget and needs—no high-pressure sales tactics.` },
      { title: "Professional Removal", description: `We safely disconnect and remove your old water heater, disposing of it properly. We inspect the surrounding plumbing and make any necessary upgrades to support the new unit.` },
      { title: "Expert Installation", description: `We install your new water heater according to manufacturer specifications and local codes. This includes proper venting (for gas units), electrical connections, water line hookups, and expansion tank if required.` },
      { title: "Testing & Education", description: `We test the system thoroughly, adjust temperature settings for efficiency and safety, and show you how to operate the unit. You receive all warranty information and maintenance recommendations.` }
    ],
    'sewer': [
      { title: "Initial Assessment", description: `We start with a camera inspection to see exactly what's happening inside your sewer line. This reveals the location and cause of problems—roots, breaks, bellies, or blockages—without guessing.` },
      { title: "Diagnosis & Options", description: `Based on camera findings, we explain the problem and present repair options. This might include spot repair, pipe lining, pipe bursting, or full replacement, with pros and cons of each approach.` },
      { title: "Clear Pricing", description: `We provide detailed written estimates for each option. Sewer work can be significant—you deserve to understand exactly what you're paying for before making a decision.` },
      { title: "Professional Repair", description: `Our crew completes the work using professional equipment and proper techniques. For trenchless repairs, we minimize excavation; for traditional repairs, we restore the excavation area neatly.` },
      { title: "Final Inspection", description: `We perform a final camera inspection to verify successful repair, and coordinate any required city/county inspections. Your sewer line is flowing freely and problems are documented as resolved.` }
    ],
    'drain': [
      { title: "Problem Assessment", description: `We evaluate the clogged drain, checking the severity and potential causes. We ask about history—recurring clogs may indicate a deeper issue that cleaning alone won't solve.` },
      { title: "Method Selection", description: `Based on the drain type and clog, we select the appropriate cleaning method: cable machine, hydro-jetting, or specialty tools for specific blockages. We explain the approach before starting.` },
      { title: "Professional Cleaning", description: `Our technicians use professional-grade equipment to clear the drain completely. We work carefully to avoid damaging pipes, especially in older homes with fragile cast iron or galvanized drains.` },
      { title: "Camera Verification", description: `For stubborn or recurring clogs, we run a camera to verify the drain is clear and identify any underlying issues like root intrusion, pipe damage, or buildup that could cause future problems.` },
      { title: "Prevention Recommendations", description: `We advise on preventing future clogs and recommend maintenance if your drains are prone to problems. Some drains benefit from periodic professional cleaning before they clog completely.` }
    ],
    'leak': [
      { title: "Detection & Location", description: `Using electronic listening equipment and thermal imaging, we locate the source of the leak without destructive exploration. For slab leaks, we pinpoint the exact location within inches.` },
      { title: "Access Planning", description: `We determine the best way to access the leak with minimal damage to your home. Sometimes the leak is accessible; other times we must work through floors, walls, or from outside.` },
      { title: "Repair Options", description: `Depending on the leak location and pipe condition, we present options: spot repair, section replacement, or rerouting if the existing pipe path is problematic. You choose the best approach for your situation.` },
      { title: "Expert Repair", description: `We complete the repair using appropriate materials and methods, ensuring a permanent fix. For slab work, we restore concrete and flooring access areas as neatly as possible.` },
      { title: "Testing & Documentation", description: `We pressure test to confirm the repair holds, run water to verify normal operation, and document everything with photos for your insurance company if needed.` }
    ]
  };

  return categoryProcesses[category] || [
    { title: "Initial Contact", description: `Call ${BUSINESS.phone} or schedule online. We'll gather information about your ${serviceName.toLowerCase()} needs and schedule a convenient appointment.` },
    { title: "On-Site Evaluation", description: `Our licensed plumber arrives, evaluates the situation, and discusses options with you. We take time to understand your goals and answer questions.` },
    { title: "Clear Pricing", description: `Before any work begins, you receive a detailed quote. We explain what's included and there are never hidden fees or surprise charges.` },
    { title: "Professional Service", description: `We complete the work efficiently using quality materials and proven techniques. Our plumbers treat your home with respect, using floor protection and cleaning up afterward.` },
    { title: "Quality Verification", description: `We test all work thoroughly, explain what was done, and ensure your complete satisfaction. You receive documentation for your records.` }
  ];
}

function generateFAQs(category: string, serviceName: string): { question: string; answer: string }[] {
  const baseFAQs: Record<string, { question: string; answer: string }[]> = {
    'gas': [
      { question: `How do I know if I have a gas leak?`, answer: `Signs of a gas leak include the smell of rotten eggs (added to natural gas for detection), hissing sounds near gas lines, dead vegetation near underground lines, and higher-than-normal gas bills. If you smell gas, leave immediately and call us or 911 from outside the home.` },
      { question: `Are you licensed for gas line work in Arizona?`, answer: `Yes, ${BUSINESS.name} is fully licensed for gas line work under Arizona ROC license #${BUSINESS.license}. Our technicians receive specialized training and certification for gas piping systems.` },
      { question: `Can you install a gas line for an outdoor grill or fire pit?`, answer: `Yes, we regularly extend gas lines to outdoor kitchens, grills, fire pits, and pool heaters. We handle all necessary permits and inspections to ensure the work meets code.` }
    ],
    'water-heater': [
      { question: `How long does water heater installation take?`, answer: `Most standard water heater replacements take 2-4 hours. Tankless conversions may take longer—typically 4-6 hours—due to additional gas line or electrical work and venting modifications.` },
      { question: `Should I get a tankless water heater?`, answer: `Tankless heaters provide endless hot water and save space, but cost more upfront. They're ideal for smaller households or homes with limited space. We'll help you weigh the pros and cons for your specific situation.` },
      { question: `How often should I flush my water heater?`, answer: `In Southern Arizona's hard water, we recommend annual flushing to remove sediment buildup. Regular maintenance extends tank life and maintains efficiency—especially important when water hardness exceeds 15 grains per gallon.` }
    ],
    'sewer': [
      { question: `What causes sewer line problems?`, answer: `Common causes include tree root intrusion (trees seek the moisture in sewer lines), ground shifting and settling, corrosion in older pipes, and buildup from grease, debris, and mineral deposits. A camera inspection reveals the exact cause.` },
      { question: `What is trenchless sewer repair?`, answer: `Trenchless methods repair or replace sewer lines with minimal digging—typically just two small access holes. Options include pipe lining (installing a new pipe inside the old one) and pipe bursting (breaking the old pipe while pulling in a new one).` },
      { question: `How much does sewer line replacement cost?`, answer: `Costs vary widely based on length, depth, method, and access conditions. After a camera inspection, we provide detailed written estimates. Trenchless methods often cost the same or less than traditional excavation while preserving your landscaping.` }
    ],
    'drain': [
      { question: `Why does my drain keep clogging?`, answer: `Recurring clogs usually indicate an underlying issue: pipe damage, root intrusion, improper slope, or buildup that cable cleaning doesn't fully remove. A camera inspection can identify the root cause and help us recommend a permanent solution.` },
      { question: `Is hydro-jetting safe for old pipes?`, answer: `It depends on the pipe material and condition. We assess your pipes before recommending hydro-jetting. For fragile cast iron or damaged pipes, we may recommend gentler methods or repair before cleaning.` },
      { question: `How can I prevent drain clogs?`, answer: `Avoid putting grease, coffee grounds, and fibrous foods down kitchen drains. Use hair catchers in shower drains. Run plenty of water when using the garbage disposal. Consider periodic professional cleaning for drains that tend to clog.` }
    ],
    'leak': [
      { question: `How do you find leaks without tearing up my house?`, answer: `We use electronic leak detection equipment that can "hear" water escaping through pipes, even through concrete slabs. Thermal imaging cameras detect temperature differences caused by water. These tools let us pinpoint leaks within inches without exploratory demolition.` },
      { question: `What is a slab leak?`, answer: `A slab leak is a leak in the water pipes that run through or under your concrete foundation. Common in Arizona due to soil conditions and copper pipe deterioration, slab leaks can cause foundation damage, mold growth, and high water bills if not repaired.` },
      { question: `Will insurance cover leak repair?`, answer: `Homeowner's insurance typically covers water damage caused by sudden leaks but may not cover the repair itself or gradual damage. We provide thorough documentation to support your claim and can work directly with your adjuster.` }
    ]
  };

  const categoryFAQs = baseFAQs[category] || [
    { question: `How much does ${serviceName.toLowerCase()} cost?`, answer: `Costs vary based on the specific work needed. We provide free estimates with upfront pricing—you'll know the exact cost before we begin any work. There are never hidden fees or surprise charges.` },
    { question: `Do you offer same-day ${serviceName.toLowerCase()} service?`, answer: `Yes, we offer same-day service for most plumbing needs. Call ${BUSINESS.phone} and we'll schedule the earliest available appointment, often the same day for urgent situations.` },
    { question: `Are your plumbers licensed and insured?`, answer: `Yes, ${BUSINESS.name} is fully licensed under Arizona ROC #${BUSINESS.license} and carries comprehensive liability insurance. Our plumbers are experienced professionals with ongoing training.` }
  ];

  return categoryFAQs;
}

function generateCommonIssues(category: string): string[] {
  const categoryIssues: Record<string, string[]> = {
    'gas': [
      "Gas odor (rotten egg smell) indicating potential leak",
      "Yellow or flickering pilot lights on gas appliances",
      "Appliances not producing enough heat or flame",
      "Higher than normal gas bills without usage changes",
      "Corrosion or damage on visible gas pipes",
      "Need to extend gas service to new appliances"
    ],
    'water-heater': [
      "No hot water or not enough hot water",
      "Water not hot enough or too hot",
      "Rusty or discolored hot water",
      "Strange noises (popping, rumbling, banging)",
      "Leaking around the tank base",
      "Higher energy bills without usage changes"
    ],
    'sewer': [
      "Multiple drains backing up simultaneously",
      "Gurgling sounds from drains or toilets",
      "Sewage odors in yard or inside home",
      "Soggy spots or unusually green grass in yard",
      "Slow drains throughout the house",
      "Sewage backing up into lowest fixtures"
    ],
    'drain': [
      "Slow draining sinks, tubs, or showers",
      "Completely clogged drains",
      "Recurring clogs in the same drain",
      "Gurgling sounds when water drains",
      "Foul odors from drains",
      "Water backing up in other fixtures"
    ],
    'leak': [
      "Unexplained increase in water bills",
      "Sound of running water when all fixtures are off",
      "Warm or hot spots on floors",
      "Cracks in walls or flooring",
      "Mold or mildew odors",
      "Low water pressure throughout house"
    ],
    'pipe': [
      "Discolored water (rust, brown, or yellow)",
      "Low water pressure that's gotten worse over time",
      "Frequent pinhole leaks in copper pipes",
      "Visible corrosion on pipes",
      "Rusty stains on fixtures",
      "Metallic taste in water"
    ],
    'water-treatment': [
      "White scale buildup on fixtures and showerheads",
      "Dry, itchy skin and dull hair after bathing",
      "Spots on dishes and glassware",
      "Stiff, scratchy laundry",
      "Soap doesn't lather well",
      "Appliances wearing out prematurely"
    ],
    'fixture': [
      "Dripping or leaking faucets",
      "Running or constantly flushing toilet",
      "Weak water flow from fixtures",
      "Outdated or damaged fixtures",
      "Hard water damage to fixtures",
      "Need to upgrade for water efficiency"
    ]
  };

  return categoryIssues[category] || [
    "Unexpected plumbing problems or malfunctions",
    "Aging plumbing components needing replacement",
    "Upgrades needed for better performance",
    "Concerns about plumbing system condition",
    "Preventive maintenance needs"
  ];
}

function generateExpandedLongDescription(service: Service, category: string): string {
  const intro = `${service.name} is one of the most requested services at ${BUSINESS.name}. Whether you're dealing with an urgent situation or planning a scheduled project, our licensed plumbers deliver professional results backed by ${BUSINESS.yearsInBusiness} years of experience serving Southern Arizona.`;

  const arizonaContext = generateArizonaContext(category);

  const whyChooseUs = `When you choose ${BUSINESS.name} for ${service.name.toLowerCase()}, you get more than just technical expertise. You get plumbers who respect your home, communicate clearly, and stand behind their work. We show up on time, provide honest assessments, and charge fair prices—the same approach that has made us the trusted plumbing company for thousands of families across ${LOCATIONS.join(', ')}, and surrounding communities.`;

  const callToAction = `Don't wait until a small problem becomes a major repair. Contact ${BUSINESS.name} today at ${BUSINESS.phone} to schedule your ${service.name.toLowerCase()} service. We offer free estimates, upfront pricing, and same-day service when you need it most.`;

  return `${intro}\n\n${arizonaContext}\n\n${whyChooseUs}\n\n${callToAction}`;
}

function expandService(service: Service): Service {
  const category = categorizeService(service);
  
  const skipSlugs = [
    'emergency-plumbing', 'drain-cleaning', 'whole-house-repiping', 
    'water-conditioning', 'gas-line-installation', 'gas-leak-repair', 
    'gas-pipe-testing', 'gas-line-relocation'
  ];
  
  if (skipSlugs.includes(service.slug)) {
    console.log(`Skipping ${service.slug} - already has hand-crafted content`);
    return service;
  }

  const existingLongDesc = service.longDescription || '';
  const hasRichContent = existingLongDesc.length > 800 && 
    existingLongDesc.includes('Wood\'s Plumbing') &&
    existingLongDesc.split('\n\n').length > 2;
  
  if (hasRichContent) {
    console.log(`Skipping ${service.slug} - already has rich content (${existingLongDesc.length} chars)`);
    return service;
  }

  console.log(`Expanding ${service.slug} (category: ${category})`);

  const expanded: Service = {
    ...service,
    longDescription: generateExpandedLongDescription(service, category),
    benefits: generateCategoryBenefits(category, service.name),
    process: generateDetailedProcess(category, service.name),
    faqs: generateFAQs(category, service.name),
    commonIssues: generateCommonIssues(category),
    arizonaContext: generateArizonaContext(category),
    updatedAt: new Date().toISOString()
  };

  return expanded;
}

async function main() {
  const servicesPath = path.join(process.cwd(), 'lib/data/services.json');
  const servicesData: Service[] = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

  console.log(`\nExpanding content for ${servicesData.length} services...\n`);

  const expandedServices = servicesData.map(service => expandService(service));

  fs.writeFileSync(servicesPath, JSON.stringify(expandedServices, null, 2));

  console.log(`\nContent expansion complete!`);
  console.log(`Updated ${expandedServices.length} services in services.json`);
  
  const richCount = expandedServices.filter(s => 
    (s.longDescription?.length || 0) > 500 && 
    s.faqs && s.faqs.length > 0
  ).length;
  
  console.log(`Services with rich content: ${richCount}/${expandedServices.length}`);
}

main().catch(console.error);
