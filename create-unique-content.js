const fs = require('fs');
const services = JSON.parse(fs.readFileSync('lib/data/services.json', 'utf8'));

// Unique content for each service
const uniqueContent = {
  'emergency-plumbing': {
    long: `When a plumbing emergency strikes your Southern Arizona home or business, every minute counts. Wood's Plumbing provides 24/7/365 emergency plumbing services with no additional charges for nights, weekends, or holidays. Our licensed emergency plumbers respond rapidly to burst pipes, major leaks, sewer backups, water heater failures, and other critical plumbing crises throughout Tucson, Marana, Oro Valley, and surrounding communities. With fully stocked service vehicles and over 46 years of emergency response experience, we arrive prepared to diagnose and resolve your plumbing emergency quickly, preventing further water damage and restoring normal service to your property.`,
    benefits: [
      'True 24/7/365 emergency availability with live dispatchers',
      'Rapid response times - typically 60-90 minutes or less',
      'No premium pricing for after-hours emergency calls',
      'Fully equipped trucks with emergency repair materials',
      'Licensed master plumbers with emergency experience',
      'Water damage prevention and mitigation expertise',
      'Transparent emergency pricing before work begins',
      'Serving all of Southern Arizona since 1979'
    ],
    process: [
      { title: 'Emergency Call Received', description: 'Call (520) 682-2233 any time, day or night. Our live dispatcher takes your information and immediately contacts the nearest available emergency plumber.' },
      { title: 'Rapid Dispatch', description: 'We dispatch an emergency plumber within minutes, fully equipped with professional tools and common emergency repair materials.' },
      { title: 'On-Site Assessment', description: 'Our plumber arrives, assesses the emergency, stops immediate damage (shutoff valves, containment), and diagnoses the root cause.' },
      { title: 'Clear Emergency Pricing', description: 'We explain the problem in plain language and provide upfront emergency repair pricing before starting work.' },
      { title: 'Professional Emergency Repair', description: 'We complete emergency repairs efficiently using professional techniques and quality materials, restoring your plumbing system to safe operation.' }
    ]
  },
  'burst-pipe-repair': {
    long: `A burst pipe can release hundreds of gallons of water into your home or business within minutes, causing catastrophic water damage, flooding, and potential mold growth. Wood's Plumbing provides immediate 24/7 burst pipe emergency response throughout Southern Arizona. Our emergency plumbers arrive quickly to shut off water flow, assess the damage, and implement professional burst pipe repairs. We handle burst pipes caused by freezing temperatures, corrosion, high water pressure, ground shifting, tree roots, and age-related pipe failures. Using modern pipe repair techniques and quality replacement materials, we restore your water service while minimizing property damage and disruption to walls, floors, and landscaping.`,
    benefits: [
      'Immediate 24/7 burst pipe emergency response',
      'Fast water shutoff to stop flooding and damage',
      'Electronic leak detection to locate exact burst location',
      'Minimal invasive access - preserve walls and floors',
      'Modern pipe repair and replacement techniques',
      'PEX, copper, and PVC burst pipe repairs',
      'Insurance damage documentation assistance',
      'Prevent future bursts with pressure regulation'
    ],
    process: [
      { title: 'Emergency Response', description: 'Call immediately when you discover a burst pipe. We dispatch an emergency plumber right away with tools to stop water flow and assess damage.' },
      { title: 'Water Control', description: 'We locate and shut off the main water valve or isolate the affected line to stop flooding and prevent further water damage to your property.' },
      { title: 'Damage Assessment & Location', description: 'Using electronic leak detection, we pinpoint the exact burst location and assess the extent of pipe damage and water intrusion.' },
      { title: 'Repair Plan & Pricing', description: 'We recommend the best burst pipe repair approach—section replacement, line rerouting, or full line replacement—with upfront emergency pricing.' },
      { title: 'Professional Pipe Repair', description: 'We complete burst pipe repairs using quality materials (PEX, copper), pressure test the system, and restore full water service safely.' }
    ]
  },
  'emergency-leak-repair': {
    long: `Hidden and visible plumbing leaks require immediate attention to prevent water damage, mold growth, structural damage, and sky-high water bills. Wood's Plumbing provides 24/7 emergency leak detection and repair services throughout Tucson and Southern Arizona. Our emergency plumbers use advanced electronic leak detection equipment, thermal imaging cameras, and acoustic sensors to locate hidden leaks behind walls, under slabs, and in underground lines without destructive exploratory work. We repair all types of emergency leaks including burst pipes, pinhole leaks, slab leaks, sewer leaks, water heater leaks, and fixture leaks. Fast response prevents minor leaks from becoming major disasters.`,
    benefits: [
      '24/7 emergency leak detection and repair',
      'Advanced electronic leak detection technology',
      'Locate hidden leaks without destructive demolition',
      'Stop water damage and mold growth quickly',
      'All leak types: pipes, slabs, sewers, fixtures',
      'Professional repairs with modern materials',
      'Water bill impact assessment and correction',
      'Prevent future leaks with quality repairs'
    ],
    process: [
      { title: 'Emergency Leak Call', description: 'Contact us immediately for emergency leak issues. We dispatch a plumber equipped with leak detection technology and repair materials.' },
      { title: 'Water Control & Containment', description: 'We shut off water to the affected area to stop active leaking and prevent further water damage while we investigate.' },
      { title: 'Leak Detection', description: 'Using electronic leak detection, thermal imaging, and acoustic sensors, we pinpoint the exact leak location without unnecessary demolition.' },
      { title: 'Leak Repair Strategy', description: 'We explain the leak cause, extent of damage, and recommend the best repair approach with transparent emergency pricing.' },
      { title: 'Professional Leak Repair', description: 'We complete leak repairs using appropriate techniques and materials, test thoroughly, and restore water service safely.' }
    ]
  },
  'emergency-drain-cleaning': {
    long: `Severely clogged drains and complete blockages require immediate professional attention to prevent sewage backups, flooding, and unsanitary conditions. Wood's Plumbing provides 24/7 emergency drain cleaning services for residential and commercial properties throughout Southern Arizona. Our emergency plumbers arrive with professional drain cleaning equipment including power snakes, hydro-jetting systems, and video inspection cameras. We clear severe kitchen sink clogs, bathtub and shower blockages, toilet stoppages, main sewer line backups, and floor drain obstructions. When drains back up in the middle of the night or sewage threatens your property, we respond immediately to restore proper drainage and prevent water damage.`,
    benefits: [
      'True 24/7 emergency drain cleaning availability',
      'Professional power snaking equipment (up to 100 feet)',
      'Emergency hydro-jetting for severe blockages',
      'Video camera inspection to diagnose root cause',
      'Clear all drain types: sinks, toilets, showers, sewers',
      'Prevent sewage backups and water damage',
      'Same-day emergency drain cleaning service',
      'Identify and resolve recurring drain problems'
    ],
    process: [
      { title: 'Emergency Drain Call', description: 'Call (520) 682-2233 for severe drain clogs and backups. We dispatch an emergency plumber with professional drain cleaning equipment.' },
      { title: 'Rapid On-Site Response', description: 'Our plumber arrives quickly with power snakes, hydro-jetting equipment, and video cameras ready to clear your emergency drain blockage.' },
      { title: 'Drain Assessment', description: 'We assess the blockage severity, identify the drain type and location, and determine the best clearing method for your emergency.' },
      { title: 'Emergency Drain Clearing', description: 'Using professional drain cleaning equipment, we clear the blockage completely and restore proper drainage flow.' },
      { title: 'Video Inspection & Prevention', description: 'We use video camera inspection to ensure complete clearing and identify underlying issues causing recurring clogs, then recommend solutions.' }
    ]
  },
  'sewer-backup-emergency': {
    long: `A sewer backup is one of the most unpleasant and urgent plumbing emergencies you can face. Raw sewage backing up into your home or business creates health hazards, foul odors, and potential property contamination. Wood's Plumbing provides immediate 24/7 sewer backup emergency response throughout Tucson and Southern Arizona. Our emergency plumbers arrive quickly with professional sewer cleaning equipment, protective gear, and the expertise to clear main sewer line blockages, tree root intrusions, collapsed pipes, and severe obstructions. We restore proper sewer flow, prevent further sewage backup, and implement solutions to prevent recurrence. When sewage backs up into fixtures, every minute counts—call immediately for emergency sewer service.`,
    benefits: [
      'Immediate 24/7 sewer backup emergency response',
      'Professional sewer cleaning and clearing equipment',
      'Hydro-jetting to clear severe sewer blockages',
      'Video camera sewer line inspection',
      'Clear tree roots and severe obstructions',
      'Identify collapsed or damaged sewer lines',
      'Prevent contamination and health hazards',
      'Long-term solutions to prevent recurrence'
    ],
    process: [
      { title: 'Emergency Sewer Call', description: 'Contact us immediately for sewer backup emergencies. We prioritize sewer backups for immediate dispatch due to health and safety risks.' },
      { title: 'Emergency Response', description: 'Our emergency plumber arrives with professional sewer equipment, protective gear, and tools to clear severe sewer blockages.' },
      { title: 'Sewer Line Assessment', description: 'We locate the main sewer line access, assess the backup severity, and use video camera inspection to diagnose the blockage cause.' },
      { title: 'Sewer Line Clearing', description: 'Using power snakes or hydro-jetting equipment, we clear the sewer blockage—whether tree roots, grease buildup, or foreign objects.' },
      { title: 'Long-Term Solution', description: 'After clearing the backup, we explain the root cause and recommend solutions to prevent future sewer backups.' }
    ]
  }
};

// Process each service - only update if it exists in our unique content map
services.forEach(service => {
  if (uniqueContent[service.slug]) {
    const content = uniqueContent[service.slug];
    service.longDescription = content.long;
    service.benefits = content.benefits;
    service.process = content.process;
    service.updatedAt = new Date().toISOString();
  }
});

fs.writeFileSync('lib/data/services.json', JSON.stringify(services, null, 2));
console.log(`✓ Updated ${Object.keys(uniqueContent).length} services with unique content`);
