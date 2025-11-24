const fs = require('fs');
const services = JSON.parse(fs.readFileSync('lib/data/services.json', 'utf8'));

// Comprehensive unique content for ALL 66 services
const uniqueContent = {
  // EMERGENCY SERVICES (6 services)
  'emergency-plumbing': {
    long: `When a plumbing emergency strikes your Southern Arizona home or business, every minute counts. Wood's Plumbing provides 24/7/365 emergency plumbing services with no additional charges for nights, weekends, or holidays. Our licensed emergency plumbers respond rapidly to burst pipes, major leaks, sewer backups, water heater failures, and other critical plumbing crises throughout Tucson, Marana, Oro Valley, and surrounding communities. With fully stocked service vehicles and over 46 years of emergency response experience, we arrive prepared to diagnose and resolve your plumbing emergency quickly, preventing further water damage and restoring normal service to your property.`,
    benefits: ['True 24/7/365 emergency availability with live dispatchers', 'Rapid response times - typically 60-90 minutes or less', 'No premium pricing for after-hours emergency calls', 'Fully equipped trucks with emergency repair materials', 'Licensed master plumbers with emergency experience', 'Water damage prevention and mitigation expertise', 'Transparent emergency pricing before work begins', 'Serving all of Southern Arizona since 1979'],
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
    benefits: ['Immediate 24/7 burst pipe emergency response', 'Fast water shutoff to stop flooding and damage', 'Electronic leak detection to locate exact burst location', 'Minimal invasive access - preserve walls and floors', 'Modern pipe repair and replacement techniques', 'PEX, copper, and PVC burst pipe repairs', 'Insurance damage documentation assistance', 'Prevent future bursts with pressure regulation'],
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
    benefits: ['24/7 emergency leak detection and repair', 'Advanced electronic leak detection technology', 'Locate hidden leaks without destructive demolition', 'Stop water damage and mold growth quickly', 'All leak types: pipes, slabs, sewers, fixtures', 'Professional repairs with modern materials', 'Water bill impact assessment and correction', 'Prevent future leaks with quality repairs'],
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
    benefits: ['True 24/7 emergency drain cleaning availability', 'Professional power snaking equipment (up to 100 feet)', 'Emergency hydro-jetting for severe blockages', 'Video camera inspection to diagnose root cause', 'Clear all drain types: sinks, toilets, showers, sewers', 'Prevent sewage backups and water damage', 'Same-day emergency drain cleaning service', 'Identify and resolve recurring drain problems'],
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
    benefits: ['Immediate 24/7 sewer backup emergency response', 'Professional sewer cleaning and clearing equipment', 'Hydro-jetting to clear severe sewer blockages', 'Video camera sewer line inspection', 'Clear tree roots and severe obstructions', 'Identify collapsed or damaged sewer lines', 'Prevent contamination and health hazards', 'Long-term solutions to prevent recurrence'],
    process: [
      { title: 'Emergency Sewer Call', description: 'Contact us immediately for sewer backup emergencies. We prioritize sewer backups for immediate dispatch due to health and safety risks.' },
      { title: 'Emergency Response', description: 'Our emergency plumber arrives with professional sewer equipment, protective gear, and tools to clear severe sewer blockages.' },
      { title: 'Sewer Line Assessment', description: 'We locate the main sewer line access, assess the backup severity, and use video camera inspection to diagnose the blockage cause.' },
      { title: 'Sewer Line Clearing', description: 'Using power snakes or hydro-jetting equipment, we clear the sewer blockage—whether tree roots, grease buildup, or foreign objects.' },
      { title: 'Long-Term Solution', description: 'After clearing the backup, we explain the root cause and recommend solutions to prevent future sewer backups.' }
    ]
  },
  'frozen-pipe-repair': {
    long: `While freezing temperatures are rare in Southern Arizona, they can occur during winter cold snaps and cause significant pipe damage. Frozen pipes can burst when ice expands inside the pipe or when thawing causes sudden pressure changes. Wood's Plumbing provides frozen pipe repair and prevention services to protect your plumbing system during cold weather. Our plumbers safely thaw frozen pipes using proper techniques that prevent pipe bursting, repair any damage caused by freezing, and implement insulation and heat trace solutions to prevent future freezing. We serve Tucson and Southern Arizona with emergency response when cold weather threatens your plumbing system.`,
    benefits: ['Safe pipe thawing techniques prevent bursting', 'Repair frozen pipe damage and leaks', 'Identify vulnerable pipes prone to freezing', 'Install pipe insulation and heat trace cable', 'Prevent future freeze damage', 'Emergency response during cold snaps', 'Protect outdoor pipes, sprinkler systems', 'Licensed plumbers experienced in freeze protection'],
    process: [
      { title: 'Frozen Pipe Assessment', description: 'Call us if you suspect frozen pipes (no water flow, visible frost). We dispatch a plumber to locate frozen sections and assess damage risk.' },
      { title: 'Safe Thawing Process', description: 'We safely thaw frozen pipes using proper heating methods that prevent pipe bursting from rapid temperature changes or ice expansion.' },
      { title: 'Leak Inspection', description: 'After thawing, we inspect for cracks, splits, or leaks caused by ice expansion and test the system under normal pressure.' },
      { title: 'Damage Repair', description: 'If freezing damaged pipes, we repair or replace affected sections using appropriate materials and techniques.' },
      { title: 'Freeze Prevention', description: 'We install pipe insulation, heat trace cable, or recommend other solutions to protect vulnerable pipes from future freezing.' }
    ]
  },

  // WATER HEATER SERVICES (9 services)
  'water-heater-installation': {
    long: `Installing a new water heater requires professional expertise to ensure safe operation, code compliance, and optimal performance. Wood's Plumbing is an authorized dealer for American, AO Smith, and ACT water heaters, providing expert installation services throughout Southern Arizona. Our certified water heater installers handle both tank and tankless models, gas and electric systems, and ensure all installations meet manufacturer specifications and local building codes. We help you select the right size and type for your household needs, remove and dispose of your old unit, and install your new water heater with professional workmanship backed by our warranty. With over 46 years of experience, we deliver reliable water heater installations that provide years of trouble-free hot water service.`,
    benefits: ['Authorized dealer for American, AO Smith, ACT brands', 'Expert sizing recommendations for your needs', 'Professional installation meets all codes', 'Gas and electric water heater installation', 'Tank and tankless water heater expertise', 'Old unit removal and proper disposal', 'Manufacturer warranty protection', 'Same-day installation service available'],
    process: [
      { title: 'Needs Assessment', description: 'We assess your hot water needs based on household size, usage patterns, and preferences to recommend the ideal water heater type and capacity.' },
      { title: 'Product Selection', description: 'We present options within your budget, explain differences between tank vs tankless and gas vs electric, and help you choose the best water heater.' },
      { title: 'Professional Installation', description: 'Our certified installers professionally install your new water heater following manufacturer specifications and all local building codes.' },
      { title: 'Safety Testing', description: 'We test the water heater for proper operation, check all connections for leaks, verify temperature and pressure relief valve function, and test hot water delivery.' },
      { title: 'Customer Education', description: 'We explain your new water heater operation, maintenance requirements, warranty coverage, and answer all your questions before we leave.' }
    ]
  },
  'water-heater-repair': {
    long: `When your water heater stops producing hot water, leaks, or makes unusual noises, professional repair can often restore function at a fraction of replacement cost. Wood's Plumbing provides expert water heater repair services for all brands, types, and models throughout Tucson and Southern Arizona. Our experienced technicians diagnose and repair common water heater problems including pilot light failures, thermostat malfunctions, heating element burnout, pressure relief valve leaks, sediment buildup, gas control valve issues, and anode rod corrosion. We offer same-day water heater repair service, carry common replacement parts on our trucks, and provide honest assessments about repair versus replacement based on your water heater's age and condition.`,
    benefits: ['Expert repair for all water heater brands and models', 'Same-day water heater repair service', 'Diagnose and fix common water heater problems', 'Replace heating elements, thermostats, valves', 'Gas and electric water heater expertise', 'Honest repair vs replacement recommendations', 'Warranty on parts and labor', 'Prevent future failures with maintenance'],
    process: [
      { title: 'Problem Diagnosis', description: 'We inspect your water heater, test components, and diagnose the problem causing no hot water, leaks, or poor performance.' },
      { title: 'Repair Recommendation', description: 'We explain the problem, recommend repair solutions, and provide upfront pricing. We\'ll advise if replacement is more cost-effective than repair.' },
      { title: 'Professional Repair', description: 'We complete water heater repairs using quality replacement parts, following manufacturer service procedures for reliable, lasting repairs.' },
      { title: 'System Testing', description: 'After repairs, we test the water heater thoroughly to ensure proper operation, check for leaks, and verify hot water delivery.' },
      { title: 'Maintenance Recommendations', description: 'We inspect your water heater condition and recommend maintenance like flushing or anode rod replacement to extend its lifespan.' }
    ]
  },
  'water-heater-replacement': {
    long: `Replacing an aging or failed water heater restores reliable hot water service and often improves energy efficiency. Wood's Plumbing provides complete water heater replacement services throughout Southern Arizona, handling tank and tankless models in gas and electric configurations. Our water heater replacement service includes removing and disposing of your old unit, upgrading connections and venting if needed, installing your new water heater to manufacturer specifications and local codes, and ensuring optimal performance. We help you choose between traditional tank water heaters and energy-efficient tankless systems, size the unit correctly for your household, and complete installation professionally. As authorized dealers for American, AO Smith, and ACT, we offer quality products with full warranty protection.`,
    benefits: ['Complete old water heater removal and disposal', 'Expert sizing for your household hot water needs', 'Upgrade to energy-efficient tankless or tank models', 'Professional installation meets all codes', 'Gas line and electrical upgrades if needed', 'Authorized dealer warranty protection', 'Improve energy efficiency and lower bills', 'Same-day water heater replacement available'],
    process: [
      { title: 'Assessment & Recommendation', description: 'We evaluate your current water heater, assess your hot water needs, and recommend the best replacement options for your situation and budget.' },
      { title: 'Product Selection', description: 'We present water heater options, explain tank vs tankless benefits, discuss energy efficiency, and help you select the ideal replacement.' },
      { title: 'Old Unit Removal', description: 'We safely disconnect, drain, and remove your old water heater, then dispose of it properly following environmental regulations.' },
      { title: 'Professional Installation', description: 'We install your new water heater professionally, upgrading connections and venting as needed, following all codes and manufacturer requirements.' },
      { title: 'Testing & Warranty', description: 'We test the new water heater thoroughly, explain operation and maintenance, register your warranty, and ensure you\'re completely satisfied.' }
    ]
  },
  'tankless-water-heaters': {
    long: `Tankless water heaters provide endless hot water on demand while reducing energy costs by 20-30% compared to traditional tank water heaters. Wood's Plumbing specializes in tankless water heater installation, repair, and maintenance throughout Southern Arizona. Our certified technicians install gas and electric tankless models from leading manufacturers, properly sized for your household's hot water demands. Tankless water heaters heat water only when needed, eliminating standby energy losses and providing continuous hot water for multiple showers, appliances, and fixtures simultaneously. With compact wall-mounted designs that free up floor space and lifespan of 15-20 years, tankless water heaters offer significant advantages. We help you determine if tankless is right for your home and provide professional installation backed by manufacturer warranties.`,
    benefits: ['Endless hot water - never run out', 'Energy savings of 20-30% vs tank heaters', 'Compact wall-mounted design saves space', 'Longer lifespan: 15-20 years vs 8-12 for tanks', 'Lower monthly operating costs', 'Precise temperature control', 'Professional sizing for your needs', 'Gas and electric tankless installation'],
    process: [
      { title: 'Tankless Assessment', description: 'We assess your hot water usage patterns, household size, and simultaneous demand to determine if tankless is suitable and calculate required capacity.' },
      { title: 'System Design', description: 'We design the tankless installation including unit selection, venting requirements, gas line sizing or electrical capacity, and optimal location.' },
      { title: 'Professional Installation', description: 'We install your tankless water heater following manufacturer specifications, upgrading gas lines or electrical service as needed for proper operation.' },
      { title: 'Commissioning & Testing', description: 'We program the tankless heater for optimal temperature, test hot water delivery to all fixtures, and verify proper operation under demand.' },
      { title: 'Owner Training', description: 'We explain tankless operation, temperature adjustment, descaling maintenance requirements, and answer all questions about your new system.' }
    ]
  },
  'tank-water-heaters': {
    long: `Traditional tank water heaters remain a reliable and cost-effective choice for many Southern Arizona homes and businesses. Wood's Plumbing installs, repairs, and maintains tank water heaters from American, AO Smith, ACT, and all major brands. Tank water heaters store 30-80 gallons of hot water ready for immediate use, providing simple operation and lower upfront costs compared to tankless systems. Our expert plumbers help you select the right tank size for your household (typically 40-50 gallons for families), choose between gas and electric models based on your utilities and preferences, and install your tank water heater professionally. With proper maintenance including annual flushing and anode rod inspection, quality tank water heaters provide 8-12 years of reliable hot water service.`,
    benefits: ['Lower upfront cost than tankless systems', 'Simple, proven technology with easy repairs', 'Immediate hot water from storage tank', 'Available in 30-80 gallon capacities', 'Gas and electric models available', 'Works with standard home utilities', 'Professional installation and sizing', '8-12 year lifespan with maintenance'],
    process: [
      { title: 'Size Calculation', description: 'We calculate the appropriate tank size based on your household occupancy, hot water usage patterns, and peak demand requirements.' },
      { title: 'Tank Selection', description: 'We recommend tank water heaters within your budget, explain gas vs electric benefits, and discuss features like digital displays and self-cleaning.' },
      { title: 'Professional Installation', description: 'We install your tank water heater following codes, properly size temperature/pressure relief valves, and ensure all connections are secure.' },
      { title: 'Water Heating Optimization', description: 'We set the appropriate temperature (120-140°F), install thermal expansion tanks if required, and test hot water delivery throughout your home.' },
      { title: 'Maintenance Education', description: 'We explain annual flushing requirements, anode rod inspection, and other maintenance to maximize your tank water heater lifespan.' }
    ]
  },
  'water-heater-maintenance': {
    long: `Regular water heater maintenance extends equipment lifespan, maintains energy efficiency, prevents unexpected failures, and ensures safe operation. Wood's Plumbing provides comprehensive water heater maintenance services for tank and tankless models throughout Tucson and Southern Arizona. Our maintenance service includes flushing sediment from tank water heaters (critical in Arizona's hard water areas), inspecting and replacing anode rods that prevent tank corrosion, testing temperature and pressure relief valves, checking gas burners or electric heating elements, inspecting venting systems, and verifying optimal operation. Annual water heater maintenance prevents premature failures, improves energy efficiency, and helps you avoid costly emergency repairs or unexpected replacements. We service all water heater brands and types.`,
    benefits: ['Extend water heater lifespan significantly', 'Maintain peak energy efficiency', 'Prevent unexpected failures and breakdowns', 'Annual flushing removes sediment buildup', 'Anode rod inspection and replacement', 'Safety valve testing and verification', 'Catch small problems before major failures', 'Service all brands: tank and tankless'],
    process: [
      { title: 'Visual Inspection', description: 'We inspect your water heater for leaks, corrosion, proper venting, and signs of problems that could lead to failure or safety issues.' },
      { title: 'Tank Flushing', description: 'We drain and flush tank water heaters to remove sediment buildup that reduces efficiency and causes premature failure, especially critical in hard water areas.' },
      { title: 'Component Testing', description: 'We test the temperature/pressure relief valve, check anode rod condition, test heating elements or gas burners, and verify thermostat accuracy.' },
      { title: 'Performance Optimization', description: 'We adjust temperature settings for optimal efficiency and safety, check for proper hot water delivery, and verify energy consumption is appropriate.' },
      { title: 'Maintenance Report', description: 'We provide a detailed report of your water heater condition, recommended repairs or replacements, and schedule your next maintenance service.' }
    ]
  }
};

// Due to the large size, I'll continue with the script in the next command
console.log('Script started, preparing to update services...');
