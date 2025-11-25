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
  whyChooseUs?: string[];
  warrantyInfo?: string;
  pricingFactors?: string[];
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
  soilConditions: "caliche soil (calcium carbonate layer) and rocky desert terrain create unique challenges for underground pipe work",
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
    'gas': `In Southern Arizona, gas line work requires specialized knowledge of desert conditions. Extreme temperature swings (from 30°F winter nights to 115°F summer days) cause pipe expansion and contraction that can stress connections over time. Underground gas lines must also navigate caliche—the calcium carbonate layer common throughout Tucson and Marana—which requires specialized excavation techniques. Our plumbers understand the unique soil composition and climate factors that affect gas line integrity in this region, ensuring installations that withstand decades of Arizona's demanding conditions.`,
    'water-heater': `Southern Arizona's hard water (averaging 15-25 grains per gallon in Tucson) creates significant challenges for water heaters. Mineral buildup coats heating elements, reducing efficiency by up to 30% and shortening tank life from 12 years to as little as 6-8 years without regular maintenance. Annual flushing and descaling are essential in this region. The extreme summer heat (regularly exceeding 110°F) also affects water heater performance—incoming cold water can be 90°F in summer, reducing the work your heater needs to do, while winter groundwater temperatures drop to 55°F, requiring more energy. Our technicians factor these regional variables into every installation recommendation.`,
    'sewer': `Desert soil conditions present unique challenges for sewer lines in Southern Arizona. Tree roots seeking moisture aggressively infiltrate pipe joints, while the caliche layer common throughout the region makes excavation difficult. Additionally, monsoon season (July-September) can overwhelm older sewer systems, causing backups and flooding. The extreme temperature variations cause soil expansion and contraction that stresses underground pipes, and our alkaline soil conditions accelerate deterioration of older clay and cast iron lines. We've developed specialized techniques over ${BUSINESS.yearsInBusiness} years to address these Southern Arizona-specific sewer challenges effectively.`,
    'drain': `Tucson's hard water contributes to stubborn drain clogs as mineral deposits combine with soap scum and grease. The region's older homes—many built in the 1950s-70s—often have cast iron drains that corrode and narrow over time. Modern drain cleaning requires understanding these local pipe materials and conditions. During monsoon season, debris washed into outdoor drains can cause backup issues, and the sandy soil common in desert landscapes can infiltrate damaged drain lines. Our approach accounts for these regional factors, using appropriate cleaning methods that won't damage your specific pipe materials while thoroughly removing Arizona's unique buildup combinations.`,
    'leak': `In Southern Arizona, slab leaks are particularly common due to the region's expansive soil and foundation movement. Hot water lines running through concrete slabs are especially vulnerable—the copper deteriorates faster in our alkaline soil conditions. Electronic leak detection is essential to locate hidden leaks without destructive exploration. The extreme temperature swings cause concrete expansion and contraction that stresses embedded pipes, and our hard water accelerates corrosion from the inside. Many homes built in the 1970s-90s are now experiencing failures in their original copper supply lines. Our leak detection specialists understand these regional patterns and can often predict problem areas based on home age and construction type.`,
    'pipe': `Many Tucson-area homes built before 1990 have galvanized steel or copper pipes that have deteriorated due to our extremely hard water. Galvanized pipes corrode from the inside, restricting flow and adding rust to your water. Copper pipes develop pinhole leaks from the acidic water chemistry and the electrolysis caused by our mineral-rich soil. Repiping with modern PEX or CPVC solves these issues permanently. The investment pays for itself through eliminated leak repairs, improved water pressure, better water quality, and increased home value. With ${BUSINESS.yearsInBusiness} years of repiping experience in Southern Arizona, we've perfected minimally invasive installation techniques that work around the unique construction methods common in desert homes.`,
    'water-treatment': `With water hardness levels of 15-25 grains per gallon—among the highest in the nation—Southern Arizona homes desperately need water conditioning. Untreated hard water damages appliances, leaves scale on fixtures, dries out skin and hair, and reduces the effectiveness of soaps and detergents. A properly sized water softener protects your entire plumbing system and can extend water heater life by 50% or more. Beyond hardness, Tucson water contains elevated levels of total dissolved solids (TDS), chlorine, and in some areas, arsenic. We test your specific water chemistry and recommend treatment systems that address your actual contaminant profile, not just a one-size-fits-all solution.`,
    'fixture': `Tucson's hard water leaves white calcium deposits on fixtures and clogs aerators with mineral buildup. When installing new fixtures, we use anti-scale fittings and recommend low-flow options that conserve water in our desert environment while maintaining performance. Proper installation ensures fixtures last longer despite the challenging water conditions. Arizona's water conservation requirements also affect fixture selection—many newer codes require WaterSense certified fixtures. We stay current on regulations across Tucson, Marana, Oro Valley, and Pima County, ensuring your installations meet code while maximizing water efficiency in our drought-prone region.`,
    'commercial': `Commercial plumbing in Southern Arizona faces unique challenges: high-volume water usage increases hard water damage, extreme summer heat affects rooftop equipment, and monsoon flooding can overwhelm drainage systems. We understand the specific plumbing codes for commercial properties and coordinate with inspectors throughout Pima and Pinal counties. Restaurant grease trap requirements, healthcare facility codes, and multi-story building considerations all require specialized knowledge. Our commercial team has experience with properties from small retail shops to large industrial facilities, and we offer after-hours service to minimize disruption to your business operations.`,
    'emergency': `Plumbing emergencies in Southern Arizona require rapid response—water damage spreads quickly in our dry climate (counterintuitively, the extreme heat accelerates mold growth in wet areas), and extreme heat can worsen situations involving gas leaks or failed water heaters. Our GPS-dispatched trucks are positioned throughout Tucson, Marana, and Oro Valley for response times typically under 60 minutes. We understand that emergencies don't follow business hours—our after-hours team handles everything from burst pipes during winter freezes to water heater failures during triple-digit summer days. Every emergency truck is fully stocked to complete most repairs on the first visit.`,
    'inspection': `Video camera inspection is essential in Southern Arizona where underground pipes face unique threats: tree roots seeking moisture, soil movement from our expansive clay, and mineral buildup from hard water. Our HD cameras reveal exactly what's happening inside your pipes—critical information for accurate repair estimates and avoiding unnecessary excavation. We use self-leveling camera heads that provide clear images regardless of pipe slope, and our locate equipment can mark the exact surface position of problems. This technology is invaluable for home buyers investigating older properties, and for homeowners experiencing unexplained drainage issues or water bill increases.`,
    'hydro-jetting': `Hydro-jetting is particularly effective for Tucson's drain problems. The high-pressure water (up to 4000 PSI) cuts through the mineral scale that builds up in our hard water, removes stubborn tree roots, and clears grease blockages completely. Unlike cable machines that punch holes through clogs, hydro-jetting cleans the entire pipe diameter for longer-lasting results. This is especially important in Southern Arizona where our hard water creates rapid re-buildup in poorly cleaned pipes. We always perform a camera inspection before hydro-jetting to ensure your pipes can handle the pressure, and after to verify complete cleaning.`,
    'general': `Southern Arizona presents unique plumbing challenges: extreme heat (regularly exceeding 110°F in summer), hard water averaging 15-25 grains per gallon, caliche soil conditions, and monsoon flooding. These factors accelerate wear on plumbing systems and require specialized knowledge to address effectively. With ${BUSINESS.yearsInBusiness} years serving this region exclusively, ${BUSINESS.name} has developed techniques and solutions specifically designed for our desert environment. We understand the aging patterns of different pipe materials in our water chemistry, the soil conditions that affect underground work, and the climate factors that impact every plumbing system in our service area.`
  };
  return contexts[category] || contexts['general'];
}

function generateCategoryBenefits(category: string, serviceName: string): string[] {
  const baseBenefits = [
    `Licensed and insured - Arizona ROC #${BUSINESS.license}`,
    `${BUSINESS.yearsInBusiness}+ years serving Southern Arizona exclusively`,
    "Upfront pricing with no hidden fees or surprise charges",
    "Same-day service available for urgent needs",
    "Background-checked, drug-tested technicians",
    "100% satisfaction guarantee on all work"
  ];

  const categoryBenefits: Record<string, string[]> = {
    'gas': [
      "Certified for all gas line work under Arizona regulations",
      "Electronic gas leak detection equipment for precision diagnosis",
      "Coordination with Southwest Gas for meter work and shutoffs",
      "Complete permit handling and inspection scheduling",
      "24/7 emergency gas leak response with priority dispatch",
      "Pressure testing to verify leak-free installation",
      "All work meets or exceeds Arizona fuel gas codes"
    ],
    'water-heater': [
      "All major brands installed and serviced (Rheem, AO Smith, Bradford White, Noritz, Rinnai)",
      "Tank and tankless system expertise with certified installers",
      "Annual maintenance programs to extend equipment life in hard water",
      "Rebate assistance for energy-efficient upgrades (up to $500 available)",
      "Same-day water heater replacement available for emergencies",
      "Proper sizing calculations for your home's hot water demands",
      "Complete warranty registration and documentation"
    ],
    'sewer': [
      "HD video camera inspection included with all major work",
      "Trenchless repair options that save your landscaping and hardscape",
      "Root removal and prevention treatments with guaranteed results",
      "Emergency sewer backup response 24/7 with rapid dispatch",
      "Clean and sanitary work practices with full site restoration",
      "Coordination with city/county inspectors for permitted work",
      "Extended warranties on sewer line repairs and replacements"
    ],
    'drain': [
      "Professional-grade equipment clears any clog on first visit",
      "Camera inspection available to verify complete cleaning",
      "Safe for all pipe types including older cast iron and clay",
      "Preventive maintenance programs to stop recurring problems",
      "No-mess service with protective floor coverings and cleanup",
      "Hydro-jetting available for stubborn blockages",
      "Root treatment options for drain lines with intrusion issues"
    ],
    'leak': [
      "Electronic and acoustic leak detection equipment for precision",
      "Thermal imaging cameras for hidden leak location",
      "Minimally invasive repair techniques that preserve your home",
      "Complete insurance documentation for claims support",
      "Slab leak specialists with 1000+ successful repairs",
      "Reroute options when repair isn't cost-effective",
      "Moisture testing to verify complete resolution"
    ],
    'pipe': [
      "PEX and CPVC installation experts with manufacturer training",
      "Whole-house repiping completed in 1-2 days typically",
      "Water quality testing before and after included",
      "Permit handling and all inspection coordination",
      "Lifetime warranty on repiping workmanship",
      "Drywall patching and paint-ready finish available",
      "Financing options for major repiping projects"
    ],
    'water-treatment': [
      "Comprehensive water testing and analysis included free",
      "Properly sized systems calculated for your household",
      "All major water softener brands installed and serviced",
      "Salt delivery and maintenance programs available",
      "Reverse osmosis drinking water systems for ultimate purity",
      "Whole-house filtration for chlorine and sediment removal",
      "Combination systems addressing multiple water quality issues"
    ],
    'fixture': [
      "Expert installation of all fixture brands and styles",
      "Removal and proper disposal of old fixtures included",
      "Plumbing modifications completed as needed",
      "Low-flow WaterSense options for conservation",
      "Lifetime warranty on installation workmanship",
      "ADA-compliant fixture installation for accessibility",
      "Custom fixture installations including specialty imports"
    ],
    'commercial': [
      "Licensed for commercial plumbing throughout Arizona",
      "Minimal disruption to business operations with flexible scheduling",
      "After-hours and weekend service at no extra charge",
      "Preventive maintenance contracts with priority response",
      "ADA compliance expertise for accessibility requirements",
      "Grease trap installation and maintenance for restaurants",
      "Multi-location service agreements available"
    ],
    'emergency': [
      "Guaranteed response within 60 minutes or less",
      "No extra charges for nights, weekends, or holidays",
      "Fully stocked trucks for first-visit repairs 95% of the time",
      "Water damage mitigation expertise and equipment",
      "Insurance documentation and photos provided automatically",
      "Priority dispatch for active flooding or gas leaks",
      "Temporary repairs available when parts require ordering"
    ],
    'inspection': [
      "HD video recording provided on USB drive",
      "Precise locate capability for exact pipe mapping",
      "Detailed written report with photos and findings",
      "Expert interpretation of pipe conditions and recommendations",
      "Ideal for real estate transactions with buyer-friendly reports",
      "Locator marks on surface for excavation planning",
      "Multiple camera sizes for various pipe diameters"
    ],
    'hydro-jetting': [
      "High-pressure cleaning up to 4000 PSI for complete clearing",
      "Removes roots, grease, and mineral scale completely",
      "Safe assessment before jetting to protect your pipes",
      "Before and after camera inspection included",
      "More effective and longer-lasting than cable machines",
      "Environmentally friendly—uses only water pressure",
      "Commercial-grade equipment for residential results"
    ],
    'general': [
      "Experienced technicians with ongoing manufacturer training",
      "Fully equipped service vehicles with common parts stocked",
      "Background-checked, uniformed employees you can trust",
      "Clear communication throughout every service call",
      "Respect for your home with shoe covers and drop cloths",
      "Serving all of Southern Arizona from Tucson to Green Valley",
      "Family-owned and operated since 1978"
    ]
  };

  return [...baseBenefits, ...(categoryBenefits[category] || categoryBenefits['general'])];
}

function generateWhyChooseUs(category: string, serviceName: string): string[] {
  const baseReasons = [
    `${BUSINESS.yearsInBusiness} Years of Local Expertise: Since 1978, we've focused exclusively on Southern Arizona, developing specialized knowledge of our unique plumbing challenges.`,
    "Transparent Pricing: You'll receive a detailed written estimate before work begins. The price we quote is the price you pay—no surprises, no hidden fees.",
    "Skilled, Trustworthy Technicians: Our plumbers are background-checked, drug-tested, and continuously trained on the latest techniques and equipment."
  ];

  const categoryReasons: Record<string, string[]> = {
    'gas': [
      "Specialized Gas Certification: Our technicians hold specific certifications for gas line work, meeting and exceeding Arizona's strict requirements for fuel gas systems.",
      "Safety-First Approach: Every gas job includes comprehensive leak testing and proper ventilation verification—we never cut corners on gas safety.",
      "Complete Code Compliance: We handle all permits, inspections, and coordination with Southwest Gas, ensuring your installation meets every requirement."
    ],
    'water-heater': [
      "Brand-Certified Installers: We're factory-trained on all major water heater brands, ensuring proper installation that maintains your warranty coverage.",
      "Right-Sizing Expertise: We calculate your actual hot water needs—family size, fixture count, usage patterns—to recommend the perfect size and type.",
      "Efficiency Optimization: In Arizona's hard water, proper installation and setup can improve efficiency 20-30% and extend equipment life significantly."
    ],
    'sewer': [
      "Advanced Diagnostic Technology: Our HD cameras and precision locators mean we know exactly what's wrong and where before any digging begins.",
      "Multiple Repair Options: From spot repairs to trenchless relining to full replacement, we present all viable options so you can make an informed decision.",
      "Guaranteed Results: Our sewer repairs come with extended warranties because we're confident in the quality and longevity of our work."
    ],
    'drain': [
      "Complete Clearing Guaranteed: We don't just punch through clogs—we clean the full pipe diameter for lasting results.",
      "Root Cause Analysis: We identify why clogs keep happening and address the underlying issue, not just the symptom.",
      "Pipe-Safe Methods: We match our cleaning approach to your pipe material and condition, protecting older plumbing from damage."
    ],
    'leak': [
      "Non-Invasive Detection: Our electronic and thermal equipment locates leaks within inches without exploratory demolition.",
      "Insurance Claim Support: We document everything thoroughly and work directly with adjusters to support your claim.",
      "Permanent Solutions: We fix the cause, not just the symptom, with solutions designed to prevent future leaks in the same area."
    ],
    'pipe': [
      "Minimally Invasive Installation: We've perfected techniques that minimize wall openings and disruption to your daily life.",
      "Quality Materials: We use only premium PEX and fittings with proven track records in Arizona's demanding water conditions.",
      "Lifetime Workmanship Warranty: We stand behind our repiping work for as long as you own your home."
    ],
    'water-treatment': [
      "Customized Solutions: We test your specific water and design treatment systems that address your actual issues, not generic problems.",
      "Proper Sizing: An undersized or oversized system wastes money and doesn't perform—we calculate exactly what your household needs.",
      "Ongoing Support: From salt delivery to maintenance to filter changes, we support your system throughout its life."
    ],
    'fixture': [
      "Expert Installation: Proper fixture installation prevents leaks, ensures optimal performance, and maintains warranty coverage.",
      "Code Compliance: We ensure all installations meet current Arizona plumbing codes and water conservation requirements.",
      "Attention to Detail: From precise leveling to clean caulk lines, we deliver installations you'll be proud of."
    ],
    'commercial': [
      "Business-Focused Scheduling: We work around your hours to minimize disruption to operations and revenue.",
      "Code Expertise: Commercial plumbing codes differ from residential—we know the requirements for your property type.",
      "Reliable Partnership: Many businesses rely on us for ongoing maintenance, trusting us with their plumbing year after year."
    ],
    'emergency': [
      "Rapid Response: Our GPS-dispatched trucks are positioned throughout the area for response times typically under 60 minutes.",
      "First-Visit Resolution: 95% of emergencies are fully resolved on the first visit thanks to our fully-stocked trucks.",
      "Calm Expertise: We've handled thousands of emergencies and bring professional calm to stressful situations."
    ],
    'inspection': [
      "Comprehensive Reports: Our detailed inspection reports with photos help you understand exactly what we found.",
      "Honest Assessment: We tell you what's actually happening in your pipes—including when things look good and don't need work.",
      "Real Estate Expertise: Our reports are designed to be useful for buyers, sellers, and real estate professionals."
    ],
    'hydro-jetting': [
      "Complete Cleaning: Unlike cables that punch holes, hydro-jetting cleans the entire pipe circumference for longer-lasting results.",
      "Safe Operation: We always camera-inspect first to ensure your pipes can handle the pressure safely.",
      "Proven Results: Camera verification after cleaning shows you the results and documents the pipe condition."
    ],
    'general': [
      "Local Family Business: We're not a franchise or national chain—we're your neighbors, invested in this community.",
      "Reputation Matters: Our business grows through referrals and repeat customers—your satisfaction is our livelihood.",
      "Complete Service: From simple repairs to complex installations, we handle all your plumbing needs under one trusted roof."
    ]
  };

  return [...baseReasons, ...(categoryReasons[category] || categoryReasons['general'])];
}

function generateWarrantyInfo(category: string): string {
  const warranties: Record<string, string> = {
    'gas': `All gas line work is backed by our 2-year workmanship warranty, covering any issues related to installation quality. Manufacturer warranties on gas valves, connectors, and appliance hookups vary by component and are registered on your behalf. Emergency repairs are warranted for 1 year. We also guarantee our work will pass all required inspections—if any corrections are needed, we handle them at no additional cost.`,
    'water-heater': `New water heater installations include the full manufacturer warranty (typically 6-12 years on tank, 1 year on parts) plus our 2-year workmanship warranty on installation. We register your warranty with the manufacturer and provide all documentation. Tankless units often carry longer warranties (up to 15 years on heat exchangers). Our annual maintenance service helps maintain warranty validity and extends equipment life.`,
    'sewer': `Sewer line repairs carry our 5-year workmanship warranty on traditional repairs and up to 10 years on trenchless pipe lining. This covers any failures related to installation quality or materials we provide. Root treatments are warranted for 1 year with available maintenance programs that extend protection. Full sewer line replacements include a 10-year warranty on pipe materials and workmanship.`,
    'drain': `Drain cleaning is warranted for 30 days against re-clogging at the same location. If the same blockage returns within 30 days, we'll re-clear it at no charge. Hydro-jetting carries a 90-day warranty. If underlying pipe damage is causing recurring clogs, we'll apply drain cleaning costs toward repair work. Maintenance program customers receive extended 60-day warranties on all drain cleaning.`,
    'leak': `Leak repairs carry our 2-year workmanship warranty covering any failures related to repair quality. Slab leak repairs include a 5-year warranty given the complexity and importance of these repairs. Rerouted lines are warranted for 10 years. We also guarantee accurate leak location—if we don't find the leak or identify the wrong location, there's no charge for detection services.`,
    'pipe': `Whole-house repiping is backed by our lifetime workmanship warranty—we stand behind our installation work for as long as you own your home. PEX tubing typically carries a 25-year manufacturer warranty, and premium brass fittings are warranted for life. We provide all warranty documentation and handle any warranty claims on your behalf. Partial repiping carries a 10-year workmanship warranty.`,
    'water-treatment': `Water softener and treatment system installations include manufacturer warranties (typically 5-10 years on tanks, 1-3 years on control valves) plus our 2-year workmanship warranty. We handle warranty registration and provide all documentation. Maintenance program customers receive extended coverage and priority service. Reverse osmosis systems include 1-year warranties on filters and membranes.`,
    'fixture': `Fixture installations carry our lifetime workmanship warranty on the installation itself. Fixtures are covered by their individual manufacturer warranties, which we register on your behalf. If any installation-related issue arises—leaks, loose mounting, improper function—we'll correct it at no charge regardless of when the problem appears. Supply lines and connections are warranted for 5 years.`,
    'commercial': `Commercial plumbing work is warranted for 1-2 years depending on scope, with extended warranties available through maintenance agreements. We work within your business insurance requirements and provide all documentation needed for commercial property management. Warranty response for commercial customers is prioritized with same-day or next-business-day service.`,
    'emergency': `Emergency repairs are warranted for 1 year against workmanship defects. If a permanent repair requires follow-up work (as with some temporary fixes), we credit the emergency service cost toward the permanent solution. All parts used in emergency repairs carry their standard manufacturer warranties. We document all emergency work thoroughly for insurance purposes.`,
    'inspection': `Video inspections include a recording of the inspection provided on USB drive or digital download. Our written report is guaranteed accurate—if our assessment leads to unnecessary work or missed problems, we stand behind our findings. Inspection reports for real estate transactions are warranted for the condition at time of inspection, with documentation suitable for negotiation purposes.`,
    'hydro-jetting': `Hydro-jetting is warranted for 90 days against re-clogging at the same location. If blockage returns within 90 days, we'll re-jet at no charge. This warranty is conditional on pipe condition—if our pre-cleaning camera inspection reveals damage, warranty may be limited. Commercial hydro-jetting for grease lines carries a 30-day warranty with maintenance programs available for extended coverage.`,
    'general': `All ${BUSINESS.name} plumbing work is backed by our standard 1-year workmanship warranty at minimum. This covers any issues resulting from our installation or repair work. We use quality parts that carry their own manufacturer warranties. If you're ever unsatisfied with our work, contact us—we'll make it right. Our reputation depends on your satisfaction.`
  };
  return warranties[category] || warranties['general'];
}

function generatePricingFactors(category: string, serviceName: string): string[] {
  const basePricingFactors = [
    "Scope of work and complexity of the repair or installation",
    "Parts and materials required, including brand and quality level",
    "Access difficulty and any obstacles requiring extra time"
  ];

  const categoryPricingFactors: Record<string, string[]> = {
    'gas': [
      "Length of new gas line and number of connections required",
      "BTU requirements of appliances being connected",
      "Whether trenching or boring is needed for underground runs",
      "Permit and inspection fees (included in our quotes)",
      "Any code upgrades required to bring existing lines up to standard",
      "Pressure testing requirements and system complexity"
    ],
    'water-heater': [
      "Type of water heater: standard tank, high-efficiency, or tankless",
      "Tank size (40, 50, 75+ gallon) or tankless flow rate (GPM)",
      "Brand and model—basic, mid-range, or premium units",
      "Whether existing connections can be reused or need upgrading",
      "Code requirements: expansion tanks, seismic straps, drain pans",
      "Gas line or electrical upgrades if switching fuel types"
    ],
    'sewer': [
      "Length and depth of sewer line requiring attention",
      "Repair method: spot repair, lining, bursting, or full replacement",
      "Soil conditions and excavation difficulty (caliche, rock, landscaping)",
      "Permit requirements and inspection fees",
      "Surface restoration: concrete, asphalt, landscaping",
      "Whether cleanout installation is needed"
    ],
    'drain': [
      "Location and accessibility of the clogged drain",
      "Severity and type of blockage (grease, roots, objects, buildup)",
      "Cleaning method required: cable, hydro-jet, or specialty tools",
      "Whether camera inspection is recommended or required",
      "Length of drain line being cleaned",
      "Additional drains included in service"
    ],
    'leak': [
      "Type of leak detection needed and equipment required",
      "Location of leak: accessible, in-wall, or under slab",
      "Repair method: direct repair, section replacement, or reroute",
      "Restoration work needed after repair (concrete, drywall, flooring)",
      "Whether multiple leaks are present",
      "Emergency vs. scheduled service timing"
    ],
    'pipe': [
      "Size of home and number of fixtures being connected",
      "Pipe material chosen: PEX, CPVC, or copper",
      "Single story vs. multi-story, slab vs. crawlspace",
      "Number of access points required",
      "Drywall repair scope: patch, texture match, or full wall",
      "Whether main line from meter also needs replacement"
    ],
    'water-treatment': [
      "Type of system: softener, filter, RO, or combination",
      "System capacity and flow rate for your household size",
      "Brand and features: basic, programmable, or high-efficiency",
      "Installation complexity and location requirements",
      "Whether drain access or electrical is needed",
      "Pre-treatment testing and system customization"
    ],
    'fixture': [
      "Fixture brand and quality level (builder-grade to luxury)",
      "Whether rough-in plumbing needs modification",
      "Old fixture removal and disposal requirements",
      "Additional parts: supply lines, valves, traps, drains",
      "Special mounting requirements (wall-hung, vessel, etc.)",
      "Multiple fixture discounts when replacing several at once"
    ],
    'commercial': [
      "Scope of work and number of fixtures or systems involved",
      "Access requirements and scheduling constraints",
      "Code compliance and inspection requirements",
      "Whether work requires after-hours scheduling",
      "Maintenance agreement inclusion for ongoing savings",
      "Multi-location or multi-unit pricing considerations"
    ],
    'emergency': [
      "Time of call: standard hours or after-hours response",
      "Severity and type of emergency (active flooding, gas leak, etc.)",
      "Parts and materials needed for immediate repair",
      "Whether temporary vs. permanent repair is performed",
      "Follow-up work required for complete resolution",
      "Water damage mitigation if included"
    ],
    'inspection': [
      "Length of pipe being inspected",
      "Number of inspection points or access locations",
      "Whether locate/marking services are needed",
      "Inspection purpose: diagnosis, real estate, or pre-purchase",
      "Report detail level and documentation requirements",
      "Same-day report turnaround if requested"
    ],
    'hydro-jetting': [
      "Length of line being cleaned",
      "Diameter of pipes and pressure requirements",
      "Severity of blockage (light buildup vs. heavy roots)",
      "Whether pre/post camera inspection is included",
      "Access point availability or creation needed",
      "Frequency: one-time cleaning vs. maintenance program"
    ],
    'general': [
      "Type of repair or installation required",
      "Materials and parts needed for the job",
      "Time required to complete the work properly",
      "Whether permits or inspections are required",
      "Access considerations and site conditions",
      "Urgency: scheduled service vs. same-day/emergency"
    ]
  };

  return [...basePricingFactors, ...(categoryPricingFactors[category] || categoryPricingFactors['general'])];
}

function generateDetailedProcess(category: string, serviceName: string): ServiceProcess[] {
  const categoryProcesses: Record<string, ServiceProcess[]> = {
    'gas': [
      { title: "Safety-First Evaluation", description: `Our licensed gas technician arrives and first checks for any active safety concerns using electronic gas detection equipment capable of detecting parts-per-million concentrations. If a leak is suspected, we secure the area and ventilate before proceeding with any diagnostic work. Your safety is always the first priority.` },
      { title: "Complete System Inspection", description: `We inspect all visible gas lines, connections, fittings, and appliances to assess the full scope of work needed. For new installations, we evaluate the best routing options and calculate proper pipe sizing based on BTU requirements and line length to ensure adequate gas flow to all appliances.` },
      { title: "Detailed Written Proposal", description: `We provide a comprehensive written estimate covering all work, materials, permits, and inspection fees. We explain your options clearly, answer all questions, and give you time to decide—no pressure tactics, no artificial urgency. You'll understand exactly what you're getting.` },
      { title: "Professional Installation/Repair", description: `Our certified technicians perform all work using proper materials rated for your application and techniques that meet or exceed Arizona fuel gas codes. We pressure test all new lines and connections to verify leak-free operation before connecting any appliances.` },
      { title: "Testing & Safety Verification", description: `Every gas connection is tested with electronic leak detection. We verify all appliances operate correctly, flames burn properly (blue, not yellow), and ventilation is adequate. We check carbon monoxide levels to ensure safe combustion.` },
      { title: "Inspection & Documentation", description: `We schedule all required inspections, meet with the inspector, and ensure code compliance approval. You receive complete documentation of all work performed, test results, and permit sign-offs for your records and future reference.` }
    ],
    'water-heater': [
      { title: "Hot Water Needs Assessment", description: `We assess your current water heater and evaluate your actual hot water demands—family size, number of bathrooms, simultaneous usage patterns, and peak demand times. This ensures we recommend the right type, size, and capacity for your household.` },
      { title: "Options & Recommendations", description: `We present options at different price points with clear explanations of features, efficiency ratings, warranty coverage, and expected lifespan. Tank vs. tankless, gas vs. electric, standard vs. high-efficiency—we help you understand the trade-offs so you can choose confidently.` },
      { title: "Transparent Pricing", description: `You receive a detailed written quote covering equipment, installation, required code items (expansion tank, seismic straps, drain pan), permit fees, and removal of your old unit. The price is firm—no surprises on installation day.` },
      { title: "Professional Removal", description: `We safely disconnect and remove your old water heater, draining it properly and disposing of it according to regulations. We inspect the surrounding plumbing, gas or electric connections, and venting to identify any upgrades needed for the new unit.` },
      { title: "Expert Installation", description: `Your new water heater is installed according to manufacturer specifications and all applicable codes. This includes proper venting (for gas units), electrical connections, water line hookups, seismic strapping, expansion tank if required, and drain pan with proper drainage.` },
      { title: "Testing & Homeowner Education", description: `We fill the tank, purge air, check all connections for leaks, and adjust temperature settings for optimal efficiency and safety. We demonstrate the controls, explain maintenance requirements, and provide all warranty information and documentation.` }
    ],
    'sewer': [
      { title: "Video Camera Inspection", description: `We start with a high-definition camera inspection to see exactly what's happening inside your sewer line. This reveals the location, nature, and extent of problems—roots, breaks, offsets, bellies, or blockages—without any guessing or unnecessary exploration.` },
      { title: "Problem Diagnosis", description: `Based on camera findings, we explain precisely what we found and what's causing your issues. We show you the video footage and point out problem areas so you understand the situation before discussing solutions.` },
      { title: "Repair Options Presentation", description: `We present all viable repair options with honest pros and cons of each approach. This might include spot repair, pipe lining, pipe bursting, or full replacement—each with different costs, disruption levels, and warranty coverage.` },
      { title: "Clear Written Estimate", description: `You receive detailed written estimates for recommended options. Sewer work can be significant—you deserve to understand exactly what you're paying for, what's included, and what to expect before making a decision.` },
      { title: "Professional Repair", description: `Our experienced crew completes the work using professional equipment and proven techniques. For trenchless repairs, we minimize excavation; for traditional repairs, we restore the excavation area neatly after backfilling properly.` },
      { title: "Verification & Final Inspection", description: `We perform a final camera inspection to verify successful repair, document the completed work on video, and coordinate any required city/county inspections. Your sewer line is flowing freely with documented proof of resolution.` }
    ],
    'drain': [
      { title: "Problem Assessment", description: `We evaluate the clogged drain, testing the severity and gathering information about history. Recurring clogs in the same location often indicate an underlying issue that simple cleaning won't solve—we dig deeper to find the real cause.` },
      { title: "Method Selection", description: `Based on the drain type, pipe material, and clog characteristics, we select the appropriate cleaning method. Cable machines, hydro-jetting, specialty augers, and enzymatic treatments all have their place—we match the tool to the situation.` },
      { title: "Professional Cleaning", description: `Our technicians use professional-grade equipment to clear the drain completely. We work carefully to avoid damaging pipes, especially important in older homes with fragile cast iron, clay, or corroded galvanized drains.` },
      { title: "Completeness Verification", description: `We verify the drain flows freely, testing with water to confirm full clearing. For stubborn or recurring clogs, we can run a camera to ensure complete clearing and identify any underlying issues.` },
      { title: "Camera Inspection (if indicated)", description: `If we suspect pipe damage, root intrusion, or buildup likely to cause future problems, we'll recommend camera inspection. This small investment prevents bigger problems and gives you complete information about your drain's condition.` },
      { title: "Prevention & Recommendations", description: `We advise on preventing future clogs based on what we found. Some drains benefit from periodic professional maintenance before they clog completely—we'll tell you if yours is one of them.` }
    ],
    'leak': [
      { title: "Advanced Leak Detection", description: `Using electronic listening equipment that can hear water escaping through pipes (even through concrete) and thermal imaging cameras that detect temperature differences caused by water, we locate leaks with precision. For slab leaks, we can pinpoint location within inches.` },
      { title: "Scope Assessment", description: `Once located, we assess the leak fully—its cause, extent, and the condition of surrounding piping. Sometimes a single leak indicates a systemic problem; other times it's an isolated issue. We determine which and explain our findings.` },
      { title: "Access Planning", description: `We determine the best way to access the leak with minimal damage to your home. This might mean working through a floor, opening a wall, accessing from outside, or in some cases recommending a reroute that avoids destructive access entirely.` },
      { title: "Repair Options", description: `Depending on leak location and pipe condition, we present options: spot repair for isolated issues, section replacement for damaged segments, or rerouting if the existing pipe path is problematic or access costs would be excessive.` },
      { title: "Expert Repair", description: `We complete the repair using appropriate materials and methods, ensuring a permanent fix. For slab work, we restore concrete and prepare access areas for flooring restoration. All connections are pressure tested.` },
      { title: "Documentation & Verification", description: `We pressure test to confirm the repair holds, run water to verify normal operation, and document everything with photos. If you're filing an insurance claim, we provide thorough documentation to support your case.` }
    ]
  };

  return categoryProcesses[category] || [
    { title: "Schedule Your Appointment", description: `Call ${BUSINESS.phone} or schedule online. We'll gather information about your ${serviceName.toLowerCase()} needs, answer preliminary questions, and schedule a convenient appointment—often same-day for urgent situations.` },
    { title: "On-Site Evaluation", description: `Your licensed plumber arrives on time, evaluates the situation thoroughly, and discusses findings with you. We take time to understand your goals, explain what we see, and answer all your questions before discussing solutions.` },
    { title: "Options & Clear Pricing", description: `Before any work begins, you receive a detailed written quote. We explain what's included, present options if multiple approaches exist, and ensure you understand exactly what you're paying for. No hidden fees, no surprise charges.` },
    { title: "Professional Service", description: `We complete the work efficiently using quality materials and proven techniques. Our plumbers treat your home with respect—using floor protection, maintaining clean work areas, and cleaning up thoroughly afterward.` },
    { title: "Quality Verification", description: `We test all work thoroughly, demonstrate that everything functions properly, and walk you through what was done. You'll understand the work performed and any maintenance recommendations.` },
    { title: "Complete Documentation", description: `You receive documentation of work performed, warranty information, and any recommendations for future maintenance. Our office follows up to ensure your complete satisfaction with the service.` }
  ];
}

function generateExpandedFAQs(category: string, serviceName: string): { question: string; answer: string }[] {
  const categoryFAQs: Record<string, { question: string; answer: string }[]> = {
    'gas': [
      { question: `How do I know if I have a gas leak?`, answer: `Signs of a gas leak include the smell of rotten eggs (mercaptan is added to natural gas for detection), hissing or whistling sounds near gas lines or appliances, dead vegetation near underground lines, visible damage to gas connectors, and higher-than-normal gas bills without usage changes. If you smell gas strongly, leave the home immediately without using light switches or phones, and call us or 911 from outside. For faint odors, ventilate the area and call us for same-day leak detection.` },
      { question: `Are you licensed for gas line work in Arizona?`, answer: `Yes, ${BUSINESS.name} is fully licensed for gas line work under Arizona ROC license #${BUSINESS.license}. Our technicians receive specialized training and hold certifications specific to fuel gas systems. We're authorized to install, repair, and modify gas lines for all residential and commercial applications, including coordination with Southwest Gas for meter work when needed.` },
      { question: `Can you install a gas line for an outdoor grill, fire pit, or pool heater?`, answer: `Yes, we regularly extend gas lines to outdoor kitchens, built-in grills, fire pits, fire tables, pool heaters, spa heaters, and patio heaters. We handle all necessary permits and inspections to ensure the work meets Arizona fuel gas codes. We'll calculate the proper pipe size based on BTU requirements and distance to ensure your outdoor appliances receive adequate gas flow.` },
      { question: `How much does gas line installation cost?`, answer: `Gas line costs vary based on length of run, pipe size needed (determined by BTU load), whether work is above or below ground, and access conditions. A simple appliance connection might run $200-400, while extending gas to a detached outdoor kitchen could be $1,500-3,000+. We provide free detailed estimates with firm pricing—you'll know the exact cost before we begin.` },
      { question: `Is it safe to do gas work myself?`, answer: `No, gas work requires proper licensing, specialized tools, and code knowledge. Improper gas work can cause leaks leading to explosion risk, carbon monoxide poisoning, or fire. Arizona requires permits and inspection for gas line work, and unpermitted work can void insurance and create liability issues. Always hire a licensed professional for gas line installation, repair, or modification.` },
      { question: `What's involved in gas line pressure testing?`, answer: `Pressure testing involves isolating the gas line, pressurizing it with air or nitrogen to a specific pressure (typically 3 PSI or higher), and monitoring for pressure drop over time. Any pressure loss indicates a leak. We use electronic leak detection at all fittings and joints. Testing is required by code for new installations and recommended for any existing system where a leak is suspected.` }
    ],
    'water-heater': [
      { question: `How long does water heater installation take?`, answer: `Most standard tank water heater replacements take 2-4 hours. Tankless conversions take longer—typically 4-8 hours—due to additional gas line sizing or electrical upgrades, venting modifications, and new water line connections. If your current installation isn't up to code (missing expansion tank, improper venting, etc.), allow extra time for necessary upgrades.` },
      { question: `Should I get a tankless water heater?`, answer: `Tankless heaters provide endless hot water, save space, and typically last longer (20+ years vs. 10-12 for tanks). They cost more upfront ($3,000-5,500 installed vs. $1,500-2,500 for tanks) but offer energy savings of 20-30%. They're ideal for smaller households (1-3 people), homes with limited space, or situations where you run out of hot water frequently. We'll help you analyze the costs and benefits for your specific situation.` },
      { question: `How often should I flush my water heater in Arizona?`, answer: `In Southern Arizona's hard water (15-25 grains per gallon), we recommend annual flushing to remove sediment buildup. Sediment insulates the heating element (or burner in gas units), reducing efficiency and accelerating tank deterioration. Regular flushing can extend tank life by 3-5 years and maintain efficiency. We offer annual maintenance programs that include flushing, anode rod inspection, and safety checks.` },
      { question: `What size water heater do I need?`, answer: `Sizing depends on family size, number of bathrooms, and peak usage patterns. General guidelines: 1-2 people need 30-40 gallons, 2-3 people need 40-50 gallons, 3-4 people need 50-65 gallons, and 5+ people need 65-80+ gallons. However, your actual needs may vary based on how often multiple fixtures run simultaneously. We calculate your specific "first hour rating" needs to recommend the right size.` },
      { question: `Why is my water heater making noise?`, answer: `Popping, rumbling, or banging noises usually indicate sediment buildup on the tank bottom. As water heats, it percolates through the sediment, creating noise. This is especially common in Arizona's hard water. Flushing often resolves the issue. Screeching might indicate a partially closed valve. Hammering when taps close could be water hammer requiring an expansion tank. We can diagnose the specific cause and recommend solutions.` },
      { question: `How do I know when my water heater needs replacing?`, answer: `Signs of failing water heaters include: age over 10-12 years, rusty water from hot taps only, leaking around the tank base, inadequate hot water that's gotten worse, frequent pilot light issues, and increasing energy bills. If your unit is over 10 years old and having problems, replacement is often more cost-effective than repair. We provide honest assessments—if repair makes sense, we'll tell you.` }
    ],
    'sewer': [
      { question: `What causes sewer line problems?`, answer: `Common causes include tree root intrusion (trees aggressively seek the moisture in sewer lines), ground shifting and settling that causes pipe bellies or breaks, corrosion in older cast iron and clay pipes, buildup from grease, debris, and mineral deposits, and damage from improper items flushed (wipes, feminine products, etc.). In Arizona, our expansive soil movement and tree roots are primary causes. A camera inspection reveals the exact cause of your specific problem.` },
      { question: `What is trenchless sewer repair?`, answer: `Trenchless methods repair or replace sewer lines with minimal digging—typically just two small access pits. Pipe lining (CIPP) involves pulling a resin-coated liner through the existing pipe; it cures in place, creating a new pipe within the old one. Pipe bursting breaks the old pipe while simultaneously pulling a new HDPE pipe through. Both methods preserve landscaping, driveways, and hardscaping while providing a 50+ year solution.` },
      { question: `How much does sewer line replacement cost?`, answer: `Sewer line costs vary widely based on length (40-100+ feet), depth (3-10+ feet), repair method, and access conditions. Spot repairs might cost $800-2,000, while full replacement ranges from $5,000-15,000+. Trenchless methods often cost the same or less than traditional excavation while preserving your landscaping. After camera inspection, we provide detailed written estimates for all viable options so you can compare approaches.` },
      { question: `How do I know if I have a sewer line problem?`, answer: `Warning signs include: multiple drains backing up simultaneously (the key indicator), gurgling sounds from drains or toilets when water runs elsewhere, sewage odors in your yard or inside the home, soggy spots or unusually green/fast-growing grass over the sewer line, slow drains throughout the house, and sewage backing up into floor drains or lowest fixtures. If you notice these signs, call for camera inspection before the problem worsens.` },
      { question: `How long does sewer line replacement take?`, answer: `Traditional excavation replacement typically takes 2-3 days depending on length and conditions. Trenchless lining can often be completed in one day, with cure time overnight and final inspection the next morning. Pipe bursting usually takes 1-2 days. We'll provide a timeline estimate specific to your situation after camera inspection and site evaluation.` },
      { question: `Will sewer work damage my landscaping?`, answer: `Traditional excavation requires trenching the entire line length, disrupting everything in its path. Trenchless methods dramatically reduce disruption—typically just two access pits approximately 4x4 feet each. We restore excavation areas with proper backfill and compaction. For traditional repairs, we can coordinate landscaping restoration, though many homeowners prefer to handle this themselves or with their landscaper.` }
    ],
    'drain': [
      { question: `Why does my drain keep clogging?`, answer: `Recurring clogs usually indicate an underlying issue rather than user behavior. Common causes include: pipe damage or root intrusion creating a "catch point" for debris, improper pipe slope (bellies) where material accumulates, buildup that cable cleaning doesn't fully remove, and undersized or deteriorated pipes that can't handle normal flow. A camera inspection can identify the root cause and help us recommend a permanent solution rather than repeated temporary clearing.` },
      { question: `Is hydro-jetting safe for old pipes?`, answer: `It depends on the pipe material and condition. Hydro-jetting is safe for most pipes in good condition, including cast iron, clay, PVC, and ABS. However, fragile pipes with existing cracks, severe corrosion, or root damage could be further damaged by high pressure. We always camera-inspect before recommending hydro-jetting to assess pipe condition. If jetting isn't safe for your pipes, we'll recommend appropriate alternatives.` },
      { question: `How can I prevent drain clogs?`, answer: `For kitchen drains: avoid pouring grease down the drain (it solidifies in pipes), run plenty of water when using the disposal, and avoid fibrous foods (celery, artichokes) in disposals. For bathroom drains: use hair catchers in showers and tubs, and don't flush anything except toilet paper. Periodically running hot water down drains helps keep grease moving. For problem-prone drains, consider periodic professional cleaning before they clog completely.` },
      { question: `What's the difference between cable cleaning and hydro-jetting?`, answer: `Cable machines (snakes) spin a cutting head that breaks through clogs and cuts roots, essentially punching a hole through the blockage. Hydro-jetting uses high-pressure water (up to 4000 PSI) to scour the entire pipe circumference, removing grease, scale, and roots completely. Jetting provides more thorough cleaning and longer-lasting results, especially for grease buildup and root intrusion, but costs more. We recommend the appropriate method based on your specific situation.` },
      { question: `How much does drain cleaning cost?`, answer: `Simple drain cleaning starts around $150-200 for a single accessible drain. More complex situations—main line clogs, multiple drains, or those requiring camera inspection—range from $250-500+. Hydro-jetting typically costs $400-800 depending on line length and access. We provide upfront pricing before work begins, and there are no overtime charges for weekends or evenings.` },
      { question: `Why do my drains smell bad?`, answer: `Drain odors typically come from: dried-out P-traps (run water in unused drains to refill the trap that blocks sewer gases), biofilm buildup in drain pipes (a slimy bacteria film that grows on pipe walls), venting problems allowing sewer gas into the home, or actual sewer line issues. For persistent odors, we can diagnose the cause. Sometimes a thorough drain cleaning eliminates biofilm odors; other times, vent repair or sewer work is needed.` }
    ],
    'leak': [
      { question: `How do you find leaks without tearing up my house?`, answer: `We use advanced non-invasive detection technology. Electronic listening equipment amplifies the sound of water escaping through pipes—we can hear leaks through concrete, walls, and soil. Thermal imaging cameras detect temperature differences caused by water (wet areas are cooler). Tracer gas can detect leaks too small to hear. These tools let us pinpoint leaks within inches without exploratory demolition. We only open access where we've confirmed the leak exists.` },
      { question: `What is a slab leak?`, answer: `A slab leak is a leak in the water supply pipes (hot or cold) that run through or under your concrete foundation. These pipes were commonly installed directly in the concrete in homes built from the 1960s-1990s. Slab leaks are common in Arizona due to soil movement, aggressive water chemistry that corrodes copper, and the electrolysis effect from our mineral-rich soil. Left untreated, slab leaks can cause foundation damage, mold growth, and massive water bills.` },
      { question: `Will insurance cover leak repair?`, answer: `Homeowner's insurance typically covers damage caused by sudden, accidental leaks—water damage to flooring, walls, personal property. However, most policies don't cover the repair of the pipe itself, damage from gradual/long-term leaks, or maintenance-related issues. Coverage varies by policy. We provide thorough documentation—photos, moisture readings, repair details—to support your claim and can work directly with your adjuster if needed.` },
      { question: `What are signs of a hidden leak?`, answer: `Watch for: unexplained water bill increases (the most common first sign), the sound of running water when all fixtures are off, warm or hot spots on floors (hot water slab leak), cracks developing in walls or flooring, mold or mildew odors without visible moisture, low water pressure that's new or getting worse, and moisture or water appearing at floor edges. If you notice these signs, call for leak detection promptly—water damage worsens rapidly.` },
      { question: `How much does leak repair cost?`, answer: `Leak detection typically costs $150-350 depending on complexity. Repair costs vary significantly based on location and method: accessible pipe repairs might be $200-500, while slab leak repairs can range from $1,500-4,000+ depending on whether we repair in place, replace a section, or reroute the line overhead. We provide detailed quotes after locating and assessing the leak—you'll know costs before we begin repair work.` },
      { question: `Should I repair or reroute a slab leak?`, answer: `It depends on several factors: pipe condition (if one spot failed, others may be close behind), number of previous repairs, access difficulty, and cost comparison. For a single leak in an otherwise sound pipe, spot repair often makes sense. If you've had multiple slab leaks, or if access would require significant tile/flooring destruction, rerouting through walls or attic is often more cost-effective long-term. We present both options with honest pros and cons.` }
    ],
    'pipe': [
      { question: `How do I know if I need repiping?`, answer: `Signs indicating potential repiping needs include: discolored water (rust, brown, or yellow) especially from hot taps, low water pressure that's worsened over time, frequent leaks or pinhole failures, visible corrosion on exposed pipes, rusty stains on fixtures, and metallic taste in water. Homes built before 1990 with galvanized steel or copper pipes in hard water areas like Arizona often need repiping by 30-40 years of age. We can assess your specific pipes and recommend timing.` },
      { question: `What pipe material do you recommend?`, answer: `We primarily recommend PEX (cross-linked polyethylene) for residential repiping in Arizona. PEX resists scale buildup from hard water, won't corrode, is flexible enough to handle ground movement, requires fewer connections than rigid pipe, and has excellent long-term track record. For specific applications, we might recommend CPVC or even copper. We'll explain options and recommendations for your specific situation.` },
      { question: `How long does whole-house repiping take?`, answer: `Most single-story homes can be repiped in 1-2 days. Two-story homes or those with difficult access typically take 2-3 days. This includes all new supply piping, connections to fixtures, and pressure testing. We minimize water outage time—usually you'll have water each evening. Drywall patching (if included) adds 1-2 days. We provide a specific timeline estimate after evaluating your home.` },
      { question: `How much does repiping cost?`, answer: `Whole-house repiping typically costs $5,000-15,000 depending on home size, number of fixtures, stories, accessibility, and chosen materials. A typical 1,500 sq ft single-story home runs $6,000-9,000. This includes all new supply piping, fixture connections, permit, and inspection. Drywall patching is additional if desired. We provide detailed written estimates after evaluating your specific situation—no ballpark guessing.` },
      { question: `Will repiping damage my walls?`, answer: `Some wall access is necessary to replace pipes running through walls. We use strategic access points to minimize openings and work through existing access where possible. Most homes require 6-15 access openings approximately 4-6 inches each. We can provide basic patching (ready for your painter) or coordinate with drywall contractors for texture-match finishing. Our techniques have been refined over thousands of repiping projects to minimize disruption.` },
      { question: `What warranty comes with repiping?`, answer: `Our repiping work includes a lifetime workmanship warranty—we stand behind our installation for as long as you own your home. This covers any leaks or failures related to installation quality. PEX tubing carries a 25-year manufacturer warranty against material defects. Premium brass fittings have lifetime manufacturer warranties. You receive all warranty documentation, and we handle any warranty claims on your behalf.` }
    ],
    'water-treatment': [
      { question: `How hard is Tucson water?`, answer: `Tucson water hardness typically ranges from 15-25 grains per gallon (GPG), with some areas exceeding 25 GPG. This is considered "very hard" (over 10 GPG is "hard"). By comparison, soft water is under 1 GPG. Our hard water causes scale buildup in pipes, water heaters, and fixtures; reduces soap effectiveness; damages appliances; and leaves spots on dishes and shower doors. Water softening is essentially necessary for protecting your plumbing system in our area.` },
      { question: `What size water softener do I need?`, answer: `Proper sizing depends on water hardness, household size, and daily water usage. The calculation multiplies people by gallons used per day by hardness, then factors in regeneration frequency. An undersized softener regenerates too often (wasting salt and water) and may not keep up with demand. An oversized unit wastes money upfront. We test your water and calculate the right size—typically 32,000-64,000 grain capacity for most homes in our area.` },
      { question: `How much does a water softener cost?`, answer: `Quality residential water softeners typically cost $1,500-3,500 installed, depending on capacity, brand, and features. Economy units start lower but often don't hold up to our demanding hard water. High-efficiency models with smart features cost more but use less salt and water. We offer multiple options at different price points. Salt costs approximately $5-10/month depending on household size and water usage.` },
      { question: `Do I need a water softener and reverse osmosis?`, answer: `They serve different purposes. Softeners remove hardness minerals (calcium, magnesium) to protect plumbing and improve soap effectiveness. Reverse osmosis (RO) removes dissolved solids, contaminants, and impurities for drinking water quality. Many Arizona homes benefit from both: a whole-house softener to protect plumbing, plus an RO system at the kitchen sink for pure drinking water. We can test your water and recommend what you actually need.` },
      { question: `How often does a water softener need maintenance?`, answer: `Water softeners are relatively low-maintenance. Salt needs replenishing regularly—typically monthly depending on usage. The resin bed can last 10-20 years with proper care. Annual inspection checks for salt bridges, resin condition, and proper regeneration. We offer maintenance programs including salt delivery, annual inspection, and priority service. Most issues we see come from neglected systems—regular maintenance extends life significantly.` },
      { question: `Is softened water safe to drink?`, answer: `Softened water is safe for most people. The softening process adds a small amount of sodium (about 30-50 mg per 8 oz glass for typical hardness levels). People on sodium-restricted diets may want to install an RO system at the kitchen sink for drinking water, or we can set up a bypass for a drinking water faucet. The sodium level from softened water is far less than most people consume from food.` }
    ],
    'fixture': [
      { question: `How much does fixture installation cost?`, answer: `Fixture installation costs vary based on the complexity. Simple faucet replacements where existing connections work typically run $150-250. Toilet replacement with a basic toilet is $300-450; with a premium toilet, $500-700+. Sink installations range from $250-500 depending on type. If rough-in plumbing needs modification, add $150-300. We provide upfront pricing for your specific fixtures and situation—no surprise charges.` },
      { question: `Do you install customer-purchased fixtures?`, answer: `Yes, we install fixtures purchased elsewhere. However, we recommend purchasing from established retailers with good return policies—some online fixtures have quality issues or missing parts. Our labor warranty applies regardless of where you purchased the fixture, but fixture defects would be the manufacturer's responsibility. We can also supply fixtures at competitive prices if you'd prefer one-stop shopping with matched warranties.` },
      { question: `How long does fixture installation take?`, answer: `Most fixture installations take 1-2 hours per fixture when existing connections are compatible. Faucets typically take 45-90 minutes, toilets 1-2 hours, and sinks 2-3 hours. If rough-in modifications are needed, add 1-2 hours. We provide time estimates when scheduling and typically confirm on arrival after assessing the specific installation conditions.` },
      { question: `What fixtures do you recommend for hard water areas?`, answer: `For Arizona's hard water, we recommend fixtures with: ceramic disc valves (more durable than rubber washers), easily removable aerators for cleaning, and finishes that resist water spotting (brushed nickel, matte black hide spots better than polished chrome). WaterSense certified fixtures meet our water conservation requirements while performing well. We can recommend specific models that balance quality, features, and budget.` },
      { question: `Can you install specialty fixtures like wall-hung toilets or vessel sinks?`, answer: `Yes, we install all fixture types including wall-hung toilets (which require in-wall carriers), vessel sinks, wall-mount faucets, and specialty items. These often require rough-in modifications—wall-hung toilets need proper carrier installation and drain relocation. We can assess your situation and provide a complete quote including any required modifications.` },
      { question: `Should I repair or replace my old fixture?`, answer: `It depends on the fixture age, condition, and part availability. For quality fixtures less than 10-15 years old, repair often makes sense. For older fixtures, parts may be unavailable or the fixture may be near end-of-life anyway—replacement makes more sense. We'll give you an honest assessment. Sometimes the repair cost approaches replacement cost, making a new fixture with full warranty the better value.` }
    ],
    'commercial': [
      { question: `Do you offer after-hours service for businesses?`, answer: `Yes, we provide after-hours service at no extra charge. We understand restaurants, medical offices, and retail spaces often need plumbing work done outside business hours to avoid disrupting operations and revenue. We can schedule work for evenings, early mornings, or weekends. For maintenance agreements, we provide priority scheduling and guaranteed response times.` },
      { question: `Are you licensed for commercial plumbing?`, answer: `Yes, ${BUSINESS.name} holds Arizona ROC license #${BUSINESS.license} for both residential and commercial plumbing. Our team has experience with properties ranging from small retail shops and offices to restaurants, medical facilities, multi-family buildings, and light industrial applications. We understand commercial codes, ADA requirements, and the specific needs of different business types.` },
      { question: `Do you offer maintenance contracts for businesses?`, answer: `Yes, we offer customized maintenance agreements for commercial properties. These typically include scheduled inspections, priority emergency response, discounted service rates, and proactive maintenance to prevent disruptions. Restaurants especially benefit from regular grease trap service and drain maintenance. We'll design a program that fits your property's needs and budget.` },
      { question: `Can you work around our business hours?`, answer: `Absolutely. We schedule most commercial work to minimize business disruption. This might mean early morning, evening, or weekend work. For emergency situations during business hours, we work efficiently to resolve issues quickly. We understand that downtime costs you money and coordinate with your staff to complete work with minimal impact.` },
      { question: `How do you handle commercial emergencies?`, answer: `Commercial emergencies receive priority dispatch. We understand that a backed-up sewer or broken water line can close your business—every hour matters. Our commercial team is equipped to handle larger-scale issues and has experience with commercial systems. Maintenance agreement customers receive guaranteed response times, typically under 2 hours for emergencies.` },
      { question: `Do you handle multi-tenant buildings?`, answer: `Yes, we service multi-family properties, office buildings, and retail centers. We can coordinate with property managers, provide documentation for ownership/tenants, and handle the communication complexities of multi-tenant situations. Our experience includes HOA-governed properties, apartment complexes, and mixed-use buildings.` }
    ],
    'emergency': [
      { question: `What counts as a plumbing emergency?`, answer: `True plumbing emergencies include: active water leaks you cannot stop, sewer backing up into living spaces, no water to the home, gas leaks (leave immediately and call from outside), water heater failures with flooding, burst pipes, and any situation causing ongoing property damage. Clogged drains and dripping faucets, while inconvenient, typically aren't emergencies. When in doubt, call—we'll help you assess the urgency.` },
      { question: `Is there an extra charge for emergency service?`, answer: `We don't charge extra for evenings, weekends, or holidays. Our pricing is consistent regardless of when you call. The only cost variables are the work performed and parts needed. We provide upfront pricing before starting work, so you know exactly what you'll pay. We believe fair pricing shouldn't change just because it's Sunday or 10 PM.` },
      { question: `How fast can you respond to an emergency?`, answer: `Our goal is arrival within 60 minutes for true emergencies. GPS-dispatched trucks positioned throughout our service area enable rapid response. Response time varies by time of day and current call volume, but we prioritize active flooding, gas leaks, and situations causing property damage. When you call, we'll give you a specific ETA based on current conditions.` },
      { question: `What should I do while waiting for emergency service?`, answer: `For water leaks: locate and turn off the water supply (main shutoff is typically near the water meter or where the line enters the house). For sewer backup: stop using all drains and toilets. For gas leaks: leave immediately without using electrical switches and call from outside. For water heater failure: turn off the cold water supply to the heater and the gas/electric. We'll guide you by phone if you're unsure.` },
      { question: `Can you fix most problems on the first visit?`, answer: `Yes, approximately 95% of emergency calls are fully resolved on the first visit. Our trucks are stocked with common repair parts—various fittings, valves, water heater components, drain equipment, and more. For unusual situations requiring specialty parts, we can often perform a temporary repair to stop damage while ordering what's needed for permanent repair.` },
      { question: `Do you provide documentation for insurance claims?`, answer: `Yes, we thoroughly document emergency situations with photos, descriptions, and repair details. This documentation supports insurance claims for water damage. We can work with your adjuster if needed and provide any additional documentation they require. While we can't guarantee claim approval (that's your insurer's decision), we provide comprehensive evidence of the situation and repairs.` }
    ],
    'inspection': [
      { question: `Why would I need a video camera inspection?`, answer: `Common reasons include: diagnosing recurring drain problems, investigating sewer backups, pre-purchase home inspections, checking pipe condition before buying, unexplained water bill increases, evaluating pipes before remodeling, and locating specific problems before repair. Camera inspection prevents guesswork—you see exactly what's happening inside pipes that are otherwise invisible. It often saves money by enabling targeted repairs.` },
      { question: `How does pipe camera inspection work?`, answer: `We insert a waterproof HD camera on a flexible cable into your pipes through cleanouts, drains, or other access points. The camera transmits real-time video to a monitor where we can see pipe condition, blockages, root intrusion, breaks, and other issues. A radio transmitter in the camera head allows us to mark the surface location of problems for precise excavation planning if repairs are needed.` },
      { question: `How much does camera inspection cost?`, answer: `Standard sewer line camera inspection runs $200-350, which includes the inspection, walkthrough of findings with you, and a recording of the video. Main line inspection from cleanout to city connection is typically on the lower end; adding drain lines or accessing through toilets may cost more. For real estate transactions, we provide a detailed written report suitable for negotiations.` },
      { question: `Do you provide the video recording?`, answer: `Yes, we provide the video recording on USB drive or via digital download at no extra charge. The video shows exactly what we saw, including a timestamp and any distance markers. This is valuable for your records, for sharing with other contractors, or for before/after documentation if repairs are performed. For real estate transactions, this documentation is especially useful.` },
      { question: `Can camera inspection find all pipe problems?`, answer: `Camera inspection reveals most common issues: root intrusion, breaks, cracks, offsets, bellies (low spots), blockages, corrosion, and buildup. It can't see through standing water (though we can often clear enough to inspect), and it may miss problems behind thick buildup. Despite limitations, it's the most effective diagnostic tool available and far better than guessing or exploratory excavation.` },
      { question: `Should I get a camera inspection before buying a home?`, answer: `We highly recommend it, especially for homes over 15-20 years old. Sewer line replacement can cost $5,000-15,000+, and this expense should factor into your purchase decision. A $250 inspection can reveal issues worth thousands in negotiation or help you avoid a money pit. We provide buyer-friendly reports that clearly explain findings in terms anyone can understand.` }
    ],
    'hydro-jetting': [
      { question: `What is hydro-jetting?`, answer: `Hydro-jetting uses highly pressurized water (up to 4000 PSI) delivered through a specialized nozzle to clean the inside of drain and sewer pipes. The nozzle creates powerful water jets that cut through grease, roots, mineral scale, and debris while simultaneously flushing everything downstream. Unlike cable machines that punch holes through clogs, hydro-jetting cleans the entire pipe circumference for longer-lasting results.` },
      { question: `How much does hydro-jetting cost?`, answer: `Residential hydro-jetting typically costs $400-800 depending on the line length, access conditions, and severity of buildup. This includes camera inspection before (to assess pipe condition and safety) and after (to verify complete cleaning). While more expensive than cable cleaning, hydro-jetting provides more thorough cleaning and longer-lasting results—especially valuable for grease buildup or root problems.` },
      { question: `Is hydro-jetting safe for my pipes?`, answer: `Hydro-jetting is safe for pipes in good condition, including cast iron, clay, PVC, and ABS. However, it can damage pipes that are already cracked, severely corroded, or compromised. We always camera-inspect before hydro-jetting to assess pipe condition. If jetting isn't safe for your pipes, we'll recommend appropriate alternatives. The inspection is included in our hydro-jetting service.` },
      { question: `How often should I have my lines hydro-jetted?`, answer: `Frequency depends on your specific situation. Restaurants and commercial kitchens with heavy grease typically need quarterly to annual jetting. Homes with recurring root problems may need annual jetting. For most residential properties, hydro-jetting isn't needed regularly—it's reserved for stubborn problems that cable cleaning can't solve. We'll recommend an appropriate maintenance schedule if ongoing jetting would benefit your system.` },
      { question: `What can hydro-jetting remove?`, answer: `Hydro-jetting effectively removes: grease buildup, tree roots (cuts them at the pipe wall), mineral scale deposits, soap and sludge accumulation, sand and debris, and most organic blockages. It's particularly effective in Arizona for removing the mineral scale that builds up in our hard water. For severe root problems, we may combine jetting with chemical root treatment for maximum effectiveness.` },
      { question: `Why choose hydro-jetting over cable cleaning?`, answer: `Cable machines break through clogs by cutting a path through the center—debris remains on pipe walls and clogs return quickly. Hydro-jetting cleans the entire pipe diameter, removing buildup from walls and restoring full flow capacity. Results last 3-5 times longer, especially for grease and scale problems. For recurring clogs, hydro-jetting addresses the underlying buildup rather than just creating temporary relief.` }
    ],
    'general': [
      { question: `How much does ${serviceName.toLowerCase()} cost?`, answer: `Costs for ${serviceName.toLowerCase()} vary based on the specific work needed, materials required, and job complexity. We provide free estimates with upfront, detailed pricing—you'll know the exact cost before we begin any work. There are never hidden fees, and our quote is the price you pay. Call ${BUSINESS.phone} for a specific estimate for your situation.` },
      { question: `Do you offer same-day service?`, answer: `Yes, we offer same-day service for most plumbing needs. Call ${BUSINESS.phone} and we'll schedule the earliest available appointment—often the same day for urgent situations. For non-urgent work, we can schedule a convenient time that fits your schedule, including evenings and weekends at no extra charge.` },
      { question: `Are your plumbers licensed and insured?`, answer: `Yes, ${BUSINESS.name} is fully licensed under Arizona ROC #${BUSINESS.license} and carries comprehensive liability insurance and workers' compensation coverage. Our plumbers are experienced professionals with ongoing training in the latest techniques and code requirements. We're the plumbing company families have trusted for ${BUSINESS.yearsInBusiness} years.` },
      { question: `Do you offer free estimates?`, answer: `Yes, we provide free estimates for most work. For complex projects, we may need to perform diagnostic work (like camera inspection) to provide an accurate estimate—we'll explain any diagnostic fees upfront. Our estimates are detailed, written, and firm. The price we quote is the price you pay, with no hidden fees or surprise charges.` },
      { question: `What areas do you serve?`, answer: `We serve all of Southern Arizona including Tucson, Marana, Oro Valley, Sahuarita, Green Valley, Vail, Catalina Foothills, Casas Adobes, and surrounding communities in Pima and Pinal counties. Our service trucks are positioned throughout the area for rapid response. If you're unsure whether we serve your location, just call—we probably do.` },
      { question: `Do you offer warranties on your work?`, answer: `Yes, all our work is backed by warranties. Workmanship warranties range from 1 year for basic repairs to lifetime for major installations like repiping. Parts carry their manufacturer warranties, which we register on your behalf. Extended warranties are available for many services. We stand behind our work—if there's ever an issue, we'll make it right.` }
    ]
  };

  return categoryFAQs[category] || categoryFAQs['general'];
}

function generateExpandedCommonIssues(category: string): string[] {
  const categoryIssues: Record<string, string[]> = {
    'gas': [
      "Gas odor (rotten egg smell) indicating potential leak",
      "Yellow or flickering pilot lights instead of steady blue",
      "Appliances not producing enough heat or weak flames",
      "Higher than normal gas bills without usage changes",
      "Corrosion, rust, or damage on visible gas pipes",
      "Hissing or whistling sounds near gas lines",
      "Black soot marks around gas appliances",
      "Carbon monoxide detector alarms without obvious cause",
      "Pilot lights that won't stay lit",
      "Need to extend gas service to new appliances or outdoor areas"
    ],
    'water-heater': [
      "No hot water or running out of hot water quickly",
      "Water not hot enough even at maximum settings",
      "Water too hot, fluctuating temperatures, or scalding risk",
      "Rusty, brown, or discolored hot water",
      "Strange noises from water heater (popping, rumbling, banging)",
      "Water leaking from tank, fittings, or relief valve",
      "Higher energy bills without increased usage",
      "Pilot light won't stay lit or igniter problems",
      "Water heater more than 10 years old",
      "Visible corrosion or rust on tank or connections"
    ],
    'sewer': [
      "Multiple drains backing up at the same time",
      "Gurgling sounds from drains or toilets",
      "Sewage odors in yard or inside the home",
      "Soggy spots or sinkholes in yard over sewer line",
      "Unusually green or fast-growing grass patches",
      "Slow drains throughout the entire house",
      "Sewage backing up into floor drains or lowest fixtures",
      "Foundation cracks or settling near sewer line",
      "Rodent or pest problems near sewer areas",
      "Trees or large shrubs planted near sewer line path"
    ],
    'drain': [
      "Slow draining sinks, tubs, or showers",
      "Completely clogged or non-draining fixtures",
      "Recurring clogs in the same drain",
      "Gurgling sounds when water drains",
      "Foul or sewer odors coming from drains",
      "Water backing up in other fixtures when one drains",
      "Multiple fixtures draining slowly",
      "Fruit flies or drain flies around drains",
      "Water pooling around floor drains",
      "Outdoor drain grates overflowing during rain"
    ],
    'leak': [
      "Unexplained increase in water bills",
      "Sound of running water when all fixtures are off",
      "Warm or hot spots on floors (hot water leak)",
      "Cracks developing in walls, ceiling, or flooring",
      "Mold, mildew, or musty odors without visible moisture",
      "Low water pressure that's new or getting worse",
      "Discolored walls or ceilings from water damage",
      "Water meter spinning when no water is being used",
      "Bubbling paint or wallpaper",
      "Foundation shifting or cracks near plumbing walls"
    ],
    'pipe': [
      "Discolored water (rust, brown, yellow, or cloudy)",
      "Low water pressure that's gradually gotten worse",
      "Frequent pinhole leaks in copper pipes",
      "Visible corrosion, stains, or mineral buildup on pipes",
      "Rusty or blue-green stains on fixtures",
      "Metallic or bad taste in water",
      "Age of pipes over 40 years (galvanized) or 25+ (copper in hard water)",
      "Water flow that's restricted compared to neighbors",
      "Leaks at multiple locations",
      "Plumber recommending repairs that approach replacement cost"
    ],
    'water-treatment': [
      "White scale buildup on fixtures, showerheads, and faucets",
      "Dry, itchy skin and dull, brittle hair after bathing",
      "Spots and film on dishes, glassware, and shower doors",
      "Stiff, scratchy, or dingy-looking laundry",
      "Soap, shampoo, and detergent don't lather well",
      "Appliances wearing out faster than expected",
      "Cloudy ice cubes or bad-tasting drinking water",
      "Frequent plumbing repairs related to scale buildup",
      "Water heater element failures or reduced efficiency",
      "Rings and stains in toilets and bathtubs"
    ],
    'fixture': [
      "Dripping or leaking faucets that waste water and cause stains",
      "Toilet that runs constantly or won't stop filling",
      "Weak water flow or pressure from fixtures",
      "Outdated, damaged, or corroded fixtures",
      "Hard water damage, scale, or discoloration on fixtures",
      "Handles that are difficult to turn or broken",
      "Wobbly or unstable toilet",
      "Garbage disposal that's jammed, leaking, or not working",
      "Bathroom or kitchen remodel requiring new fixtures",
      "Need to upgrade for water efficiency or ADA compliance"
    ],
    'commercial': [
      "Restroom fixtures requiring frequent repair",
      "Drain problems affecting multiple units or floors",
      "Water heater insufficient for business demand",
      "Grease trap issues or compliance concerns",
      "Backflow prevention maintenance or testing needed",
      "High water bills suggesting leaks or inefficiency",
      "Code compliance concerns after inspection",
      "Tenant complaints about water pressure or temperature",
      "Emergency preparedness for plumbing failures",
      "Need for after-hours plumbing service capabilities"
    ],
    'emergency': [
      "Burst or broken pipe flooding your home",
      "Sewer backing up into living spaces",
      "Complete loss of water service",
      "Gas leak (rotten egg smell)—leave and call from outside",
      "Water heater failure with active flooding",
      "Toilet overflow you cannot stop",
      "Frozen pipes in danger of bursting",
      "Active water leak you cannot shut off",
      "Sewage coming up through floor drains or toilets",
      "Water damage in progress requiring immediate action"
    ],
    'inspection': [
      "Buying a home and need sewer/plumbing inspection",
      "Recurring drain problems without clear cause",
      "Suspected root intrusion in sewer lines",
      "Unexplained sewage odors or slow drains",
      "Before remodeling to understand existing conditions",
      "Sewer problems at specific locations needing diagnosis",
      "Insurance requiring documentation of pipe condition",
      "Locating pipes before excavation or construction",
      "Previous repair failure requiring assessment",
      "Property transaction requiring inspection report"
    ],
    'hydro-jetting': [
      "Grease buildup in kitchen drain lines",
      "Tree root problems that cable cleaning doesn't resolve",
      "Recurring clogs despite multiple cleanings",
      "Slow drains throughout the building",
      "Commercial kitchen drains requiring deep cleaning",
      "Mineral scale buildup in older pipes",
      "Preparation before pipe lining or coating",
      "Restaurant or food service drain maintenance",
      "Buildup in pipes visible on camera inspection",
      "Main sewer line clogs that resist cable cleaning"
    ],
    'general': [
      "Unexpected plumbing problems or system malfunctions",
      "Aging plumbing components approaching end of life",
      "Need for system upgrades or efficiency improvements",
      "Concerns about plumbing system condition",
      "Preventive maintenance needs before problems occur",
      "Strange sounds from plumbing (banging, gurgling, hissing)",
      "Visible plumbing deterioration or damage",
      "Planning home improvements that affect plumbing",
      "Water quality concerns or testing needs",
      "Second opinions on proposed plumbing work"
    ]
  };

  return categoryIssues[category] || categoryIssues['general'];
}

function generateExtendedLongDescription(service: Service, category: string): string {
  const intro = `${service.name} is one of the most important and frequently requested services at ${BUSINESS.name}. Whether you're dealing with an urgent situation requiring immediate attention or planning a scheduled project, our licensed plumbers deliver professional results backed by ${BUSINESS.yearsInBusiness} years of experience serving Southern Arizona exclusively. We understand the unique challenges our desert climate, hard water, and soil conditions create, and we've developed specialized approaches to address them effectively.`;

  const serviceImportance = getServiceImportance(service.name, category);
  
  const arizonaContext = generateArizonaContext(category);

  const qualityCommitment = `At ${BUSINESS.name}, quality isn't just a promise—it's how we've built our reputation since 1978. Every technician on our team undergoes continuous training on the latest techniques, tools, and code requirements. We use professional-grade equipment and quality materials that stand up to Arizona's demanding conditions. Our plumbers aren't just technically skilled—they're courteous professionals who respect your home, communicate clearly, and take pride in their work. We show up when promised, explain our findings honestly, and charge fair prices with no hidden fees or surprise charges.`;

  const whyChooseUs = `When you choose ${BUSINESS.name} for ${service.name.toLowerCase()}, you get more than just technical expertise. You get a company with deep roots in this community—we've been the trusted plumber for thousands of families across ${LOCATIONS.slice(0, 4).join(', ')}, and surrounding communities. Our technicians are background-checked, drug-tested, and uniformed, so you can feel comfortable having them in your home. We provide detailed written estimates before work begins, and the price we quote is the price you pay. If something unexpected arises during the job, we discuss it with you before proceeding—no surprises.`;

  const localExpertise = `Southern Arizona presents unique plumbing challenges that out-of-state companies and newcomers simply don't understand. Our extremely hard water (15-25 grains per gallon in most areas) causes mineral buildup that damages pipes, water heaters, and fixtures far faster than in other regions. The caliche layer—a calcium carbonate rock formation common throughout Tucson and Marana—makes excavation for underground work particularly challenging. Our extreme temperature swings stress plumbing connections, and monsoon season can overwhelm drainage systems. With ${BUSINESS.yearsInBusiness} years focused exclusively on this region, we've encountered every situation and developed solutions that work in our specific conditions.`;

  const satisfaction = `Your satisfaction is our priority and our livelihood. As a family-owned local business, we depend on referrals and repeat customers—we can't afford to leave anyone unhappy. If you're ever unsatisfied with our work, please let us know. We'll make it right, period. This commitment to customer satisfaction is why we've maintained an excellent reputation for over four decades and why families continue to recommend us to their friends, neighbors, and family members.`;

  const callToAction = `Don't wait until a small problem becomes a major repair or emergency. Contact ${BUSINESS.name} today at ${BUSINESS.phone} to schedule your ${service.name.toLowerCase()} service. We offer free estimates, upfront pricing, and same-day service when you need it most. Evening and weekend appointments are available at no extra charge. Let us show you why Southern Arizona has trusted ${BUSINESS.name} for ${BUSINESS.yearsInBusiness} years.`;

  return `${intro}\n\n${serviceImportance}\n\n${arizonaContext}\n\n${qualityCommitment}\n\n${whyChooseUs}\n\n${localExpertise}\n\n${satisfaction}\n\n${callToAction}`;
}

function getServiceImportance(serviceName: string, category: string): string {
  const importanceStatements: Record<string, string> = {
    'gas': `Gas line work isn't something to take lightly—improper installation or repairs can create life-threatening hazards including fire, explosion, and carbon monoxide poisoning. Arizona requires specific licensing and permits for gas line work, and inspections ensure code compliance. At ${BUSINESS.name}, our gas technicians hold specialized certifications and follow rigorous safety protocols on every job. We use proper materials rated for your specific application, pressure test all connections, and verify safe operation of all connected appliances before considering any job complete.`,
    'water-heater': `Your water heater works harder than almost any appliance in your home, operating continuously to provide hot water for bathing, cleaning, cooking, and laundry. In Arizona's hard water, water heaters face accelerated wear as mineral buildup coats heating elements and tank interiors. Proper installation maximizes efficiency and lifespan—an improperly installed water heater can fail years earlier than it should, operate inefficiently (costing you hundreds in wasted energy), or even create safety hazards. We size systems correctly for your household, install according to manufacturer specifications and code requirements, and set up maintenance schedules that protect your investment.`,
    'sewer': `Your sewer line is the single most critical drain in your home—when it fails, nothing works. Sewer problems can cause property damage, health hazards, and tremendous inconvenience. Unfortunately, many homeowners don't think about their sewer line until there's a major problem. Camera inspection technology has revolutionized sewer diagnostics—we can now see exactly what's happening inside pipes without any digging or guesswork. This allows for accurate diagnosis, targeted repairs, and informed decisions about repair methods. Whether you're dealing with an active backup or proactively inspecting an aging system, understanding your sewer line's condition is invaluable.`,
    'drain': `Clogged drains are more than an inconvenience—they can indicate developing problems that will worsen without attention. Recurring clogs in the same location often signal pipe damage, root intrusion, or buildup that simple snaking won't resolve. Slow drains throughout the house suggest main line issues. Professional drain cleaning not only clears immediate blockages but can identify underlying issues before they become emergencies. We use professional equipment designed for complete clearing, and we take time to understand why clogs are occurring so we can recommend solutions that prevent recurrence.`,
    'leak': `Water leaks cause more property damage in American homes than fires, storms, and break-ins combined. A small, hidden leak can waste thousands of gallons of water while silently destroying flooring, walls, and foundations. Mold begins growing within 24-48 hours of water exposure. The challenge with leaks is often finding them—water travels along pipes and framing, appearing far from the actual leak location. Our electronic detection equipment locates leaks precisely, minimizing the exploration damage that often accompanies leak diagnosis. Once located, we present repair options that address both the immediate leak and any systemic issues that could cause future problems.`,
    'pipe': `The pipes in your home are its circulatory system—when they fail, everything suffers. Older homes in Southern Arizona often have galvanized steel or copper pipes that have deteriorated significantly due to our aggressive water chemistry. Low water pressure, discolored water, frequent leaks, and metallic taste are all signs of pipe deterioration. While repiping represents a significant investment, it's often the most cost-effective long-term solution compared to ongoing repairs, water damage, and the limitations of failing pipes. Modern PEX piping handles our hard water beautifully and can last 50+ years with minimal maintenance.`,
    'water-treatment': `Water quality profoundly affects your daily life and your plumbing system. Southern Arizona's extremely hard water causes problems ranging from dry skin and dull hair to scale-destroyed water heaters and restricted pipe flow. The right water treatment system protects your entire plumbing system while making bathing, cleaning, and laundry more effective and pleasant. However, water treatment isn't one-size-fits-all—systems must be properly sized for your household and configured for your specific water chemistry. We test your water, calculate your actual needs, and recommend systems that address your real issues rather than selling oversized or unnecessary equipment.`,
    'fixture': `Fixtures are the touchpoints of your plumbing system—the faucets, toilets, showers, and sinks you interact with daily. Quality fixtures properly installed last for decades; poor fixtures or improper installation lead to frustration, leaks, and premature failure. Arizona's hard water is particularly tough on fixtures, clogging aerators and coating surfaces with scale. We install all types and brands of fixtures, from basic builder-grade to high-end specialty items. Proper installation includes secure mounting, correct connections, and leak testing—details that distinguish professional installation from DIY attempts.`,
    'commercial': `Commercial plumbing serves more users, handles higher volumes, and faces stricter code requirements than residential systems. Whether you operate a restaurant, medical office, retail space, or multi-family property, plumbing problems mean lost revenue and unhappy customers or tenants. Commercial systems also face unique challenges—grease traps, backflow prevention, ADA compliance, and high-volume water heating all require specialized knowledge. We understand commercial plumbing codes, work around your business hours to minimize disruption, and offer maintenance programs that prevent problems before they impact your operations.`,
    'emergency': `Plumbing emergencies don't wait for convenient times—they often happen at the worst possible moments. When water is flooding your home or you smell gas, you need immediate professional help, not an answering service or a callback in the morning. ${BUSINESS.name} provides true 24/7 emergency response with plumbers who can actually solve problems, not just assess them. Our emergency trucks are fully stocked for most common repairs, so the majority of emergencies are resolved completely on the first visit. We understand the stress of plumbing emergencies and respond with both urgency and professionalism.`,
    'inspection': `You can't fix what you can't see—and most plumbing is hidden behind walls or underground. Video camera inspection technology has transformed plumbing diagnostics, allowing us to view the inside of pipes in real-time and record exactly what we find. This technology is invaluable for diagnosing recurring problems, planning repairs, evaluating pipe condition before purchase, and documenting issues for insurance or real estate transactions. Camera inspection eliminates guesswork, enables accurate estimates, and often prevents unnecessary excavation by pinpointing exactly where problems exist.`,
    'hydro-jetting': `When standard drain cleaning isn't enough, hydro-jetting provides the deep cleaning that restores full pipe function. Using water pressure up to 4000 PSI, hydro-jetting cuts through grease, roots, and mineral scale while scouring the entire pipe interior—not just punching a hole through the middle like cable machines. The result is longer-lasting clearing and pipes restored to near-original capacity. Hydro-jetting is particularly effective in Arizona where our hard water creates rapid mineral buildup and desert vegetation aggressively seeks moisture in sewer lines.`,
    'general': `Professional plumbing service makes a difference you can see and feel. From proper diagnosis that identifies real problems to quality repairs that last, working with experienced professionals protects your home and saves money long-term. DIY repairs and handyman work often create bigger problems—incorrect materials, improper connections, and code violations can lead to failures, water damage, and safety hazards. ${BUSINESS.name} brings ${BUSINESS.yearsInBusiness} years of local experience to every job, ensuring work is done right the first time with appropriate materials and techniques.`
  };

  return importanceStatements[category] || importanceStatements['general'];
}

function expandServiceV2(service: Service): Service {
  const category = categorizeService(service);
  
  console.log(`Expanding ${service.slug} (category: ${category}) with enhanced content...`);

  const expanded: Service = {
    ...service,
    longDescription: generateExtendedLongDescription(service, category),
    benefits: generateCategoryBenefits(category, service.name),
    process: generateDetailedProcess(category, service.name),
    faqs: generateExpandedFAQs(category, service.name),
    commonIssues: generateExpandedCommonIssues(category),
    arizonaContext: generateArizonaContext(category),
    whyChooseUs: generateWhyChooseUs(category, service.name),
    warrantyInfo: generateWarrantyInfo(category),
    pricingFactors: generatePricingFactors(category, service.name),
    updatedAt: new Date().toISOString()
  };

  return expanded;
}

async function main() {
  const servicesPath = path.join(process.cwd(), 'lib/data/services.json');
  const servicesData: Service[] = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

  console.log(`\n=== Enhanced Content Expansion V2 ===\n`);
  console.log(`Expanding content for ${servicesData.length} services with:`);
  console.log(`- 800-1000+ word descriptions`);
  console.log(`- 5-6 FAQs per service`);
  console.log(`- "Why Choose Us" sections`);
  console.log(`- Warranty information`);
  console.log(`- Pricing factors`);
  console.log(`- 8-10 common issues per service\n`);

  const expandedServices = servicesData.map(service => expandServiceV2(service));

  fs.writeFileSync(servicesPath, JSON.stringify(expandedServices, null, 2));

  console.log(`\n=== Expansion Complete ===\n`);
  
  let totalWords = 0;
  let totalFaqs = 0;
  let totalIssues = 0;
  
  expandedServices.forEach(s => {
    const words = (s.longDescription || '').split(/\s+/).length;
    totalWords += words;
    totalFaqs += (s.faqs || []).length;
    totalIssues += (s.commonIssues || []).length;
  });

  console.log(`Total services updated: ${expandedServices.length}`);
  console.log(`Average words per service: ${Math.round(totalWords / expandedServices.length)}`);
  console.log(`Average FAQs per service: ${(totalFaqs / expandedServices.length).toFixed(1)}`);
  console.log(`Average issues per service: ${(totalIssues / expandedServices.length).toFixed(1)}`);
  console.log(`\nServices with enhanced content: ${expandedServices.filter(s => s.whyChooseUs && s.warrantyInfo).length}/${expandedServices.length}`);
}

main().catch(console.error);
