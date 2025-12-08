import * as fs from 'fs';

interface Service {
  id: string;
  name: string;
  slug: string;
  longDescription: string;
  [key: string]: any;
}

const categoryIntros: Record<string, (name: string) => string> = {
  emergency: (name: string) => `When a plumbing crisis strikes, every minute counts. ${name} from Wood's Plumbing Enterprises LLC provides the rapid, professional response Southern Arizona homeowners need when disaster hits. With 46 years of emergency plumbing experience and GPS-dispatched trucks positioned throughout Tucson, Marana, and Oro Valley, we typically arrive within 60 minutes—fully equipped to resolve most emergencies on the first visit. Our licensed technicians have seen it all, from burst pipes flooding living rooms to sewage backing up at the worst possible times, and we bring calm expertise to every urgent situation.`,
  
  waterHeater: (name: string) => `Your water heater works harder than almost any appliance in your home—heating water for showers, dishes, laundry, and more, day after day. ${name} from Wood's Plumbing Enterprises LLC ensures your hot water supply remains reliable and efficient. Since 1978, we've installed, repaired, and maintained thousands of water heaters across Southern Arizona, developing deep expertise with both traditional tank units and modern tankless systems. Our licensed technicians understand how Arizona's extreme temperatures and hard water affect water heater performance and longevity, helping you get the most from your investment.`,
  
  drain: (name: string) => `Slow drains and stubborn clogs don't just inconvenience your household—they can signal deeper problems in your plumbing system. ${name} from Wood's Plumbing Enterprises LLC goes beyond simple fixes to restore full drainage and identify underlying issues before they become expensive repairs. With 46 years of experience clearing drains throughout Tucson and Southern Arizona, we've encountered every type of blockage imaginable—from routine buildup to tree root invasions. Our professional-grade equipment and proven techniques ensure your drains flow freely and stay that way.`,
  
  sewer: (name: string) => `Sewer problems are among the most disruptive and potentially costly plumbing issues a homeowner can face. ${name} from Wood's Plumbing Enterprises LLC combines advanced diagnostic technology with decades of hands-on experience to solve sewer challenges efficiently and affordably. Since 1978, we've helped thousands of Southern Arizona homeowners navigate sewer repairs, replacements, and maintenance—often using trenchless methods that minimize disruption to landscaping and driveways. Our licensed technicians understand the unique soil conditions and aging infrastructure common throughout Tucson, Marana, and the surrounding areas.`,
  
  gas: (name: string) => `Gas line work requires specialized expertise, proper licensing, and unwavering attention to safety—there's no room for shortcuts. ${name} from Wood's Plumbing Enterprises LLC provides the professional gas services Southern Arizona homes and businesses depend on. Our licensed technicians hold the certifications required for gas work in Arizona and follow strict safety protocols on every job. With 46 years of experience and thousands of successful gas projects throughout Tucson, Marana, and Oro Valley, we deliver reliable results while prioritizing the safety of your family and property.`,
  
  leak: (name: string) => `Water leaks waste thousands of gallons, damage your home's structure, and create conditions for mold growth—often without obvious warning signs. ${name} from Wood's Plumbing Enterprises LLC uses advanced detection technology and decades of diagnostic experience to find leaks quickly and accurately. Since 1978, we've helped Southern Arizona homeowners identify and repair hidden leaks before they cause major damage. Our licensed technicians understand how Arizona's expansive soils, temperature extremes, and hard water contribute to leak development, allowing us to address not just the immediate problem but its underlying causes.`,
  
  pipe: (name: string) => `The pipes running through your walls and under your floors form your home's circulatory system—when they fail, everything suffers. ${name} from Wood's Plumbing Enterprises LLC addresses pipe problems ranging from minor repairs to complete whole-house repiping. With 46 years serving Southern Arizona exclusively, we've developed specialized approaches for homes of every era—from historic Tucson bungalows with original galvanized plumbing to modern construction with copper or PEX systems. Our licensed technicians understand how Arizona's aggressive water chemistry affects different pipe materials and recommend solutions that provide lasting value.`,
  
  waterTreatment: (name: string) => `Arizona's water is among the hardest in the nation, causing scale buildup, appliance damage, dry skin, and that unmistakable mineral taste. ${name} from Wood's Plumbing Enterprises LLC helps homeowners throughout Tucson, Marana, and Southern Arizona enjoy cleaner, softer, better-tasting water. Since 1978, we've installed and maintained thousands of water treatment systems—from basic softeners to comprehensive whole-house filtration. Our licensed technicians test your water, assess your household's specific needs, and recommend systems that deliver real improvements you'll notice immediately.`,
  
  fixture: (name: string) => `Quality fixtures transform daily routines into better experiences while adding value to your home. ${name} from Wood's Plumbing Enterprises LLC delivers expert installation and repair for faucets, sinks, showers, and more throughout Southern Arizona. With 46 years of experience, we've installed everything from budget-friendly basics to high-end designer fixtures—and we know what works best with Arizona's hard water. Our licensed technicians ensure proper installation, optimal water pressure, and seamless integration with your existing plumbing, whether you're updating a single faucet or renovating an entire bathroom.`,
  
  toilet: (name: string) => `Toilets may not be glamorous, but they're essential—and when they don't work properly, life gets uncomfortable fast. ${name} from Wood's Plumbing Enterprises LLC provides expert toilet services throughout Tucson, Marana, and Southern Arizona. Since 1978, we've installed and repaired thousands of toilets, from classic models in historic homes to modern high-efficiency units that save water without sacrificing performance. Our licensed technicians ensure proper installation, optimal flushing power, and no leaks—because a well-functioning toilet is something you shouldn't have to think about.`,
  
  commercial: (name: string) => `Commercial plumbing demands different expertise than residential work—larger systems, stricter codes, and the reality that plumbing problems cost your business money every minute they persist. ${name} from Wood's Plumbing Enterprises LLC serves businesses throughout Tucson and Southern Arizona with the responsive, professional service commercial clients require. With 46 years of experience, we understand that restaurants, offices, retail spaces, and industrial facilities each have unique plumbing needs. Our licensed technicians work efficiently to minimize disruption to your operations while ensuring code compliance and lasting results.`,
  
  inspection: (name: string) => `Understanding your plumbing system's condition helps you prevent emergencies, plan maintenance, and make informed decisions about your property. ${name} from Wood's Plumbing Enterprises LLC provides thorough assessments for homeowners, home buyers, and property managers throughout Southern Arizona. With 46 years of experience, we've inspected thousands of plumbing systems and know exactly what to look for—from obvious issues to subtle warning signs that less experienced eyes might miss. Our licensed technicians document findings clearly and provide honest recommendations based on what we actually observe, not what generates the most revenue.`
};

const slugToCategory: Record<string, string> = {
  'emergency-plumbing': 'emergency',
  'burst-pipe-repair': 'emergency',
  'emergency-leak-repair': 'emergency',
  'emergency-drain-cleaning': 'emergency',
  'sewer-backup-emergency': 'emergency',
  'frozen-pipe-repair': 'emergency',
  
  'water-heater-installation': 'waterHeater',
  'water-heater-repair': 'waterHeater',
  'water-heater-replacement': 'waterHeater',
  'tankless-water-heaters': 'waterHeater',
  'tank-water-heaters': 'waterHeater',
  'water-heater-flushing': 'waterHeater',
  'water-heater-maintenance': 'waterHeater',
  'electric-water-heater-service': 'waterHeater',
  'gas-water-heater-service': 'waterHeater',
  
  'drain-cleaning': 'drain',
  'clogged-drain-repair': 'drain',
  'rooter-service': 'drain',
  'hydro-jetting': 'drain',
  
  'sewer-line-repair': 'sewer',
  'sewer-line-replacement': 'sewer',
  'sewer-line-cleaning': 'sewer',
  'sewer-camera-inspection': 'sewer',
  'trenchless-sewer-repair': 'sewer',
  'septic-system-service': 'sewer',
  
  'gas-line-installation': 'gas',
  'gas-line-repair': 'gas',
  'gas-leak-detection': 'gas',
  'gas-leak-repair': 'gas',
  'gas-line-inspection': 'gas',
  'gas-line-relocation': 'gas',
  'gas-pipe-testing': 'gas',
  
  'leak-detection': 'leak',
  'slab-leak-detection': 'leak',
  'slab-leak-repair': 'leak',
  'water-leak-repair': 'leak',
  'pipe-leak-repair': 'leak',
  
  'pipe-repair': 'pipe',
  'pipe-replacement': 'pipe',
  'whole-house-repiping': 'pipe',
  'water-line-installation': 'pipe',
  'water-line-repair': 'pipe',
  'water-line-replacement': 'pipe',
  'backflow-prevention': 'pipe',
  'water-pressure-repair': 'pipe',
  
  'water-softener-installation': 'waterTreatment',
  'water-softener-repair': 'waterTreatment',
  'water-filtration-systems': 'waterTreatment',
  'water-conditioning': 'waterTreatment',
  'reverse-osmosis-systems': 'waterTreatment',
  
  'faucet-installation': 'fixture',
  'faucet-repair': 'fixture',
  'sink-installation': 'fixture',
  'sink-repair': 'fixture',
  'shower-installation': 'fixture',
  'shower-repair': 'fixture',
  'bathtub-installation': 'fixture',
  'fixture-installation': 'fixture',
  'garbage-disposal-installation': 'fixture',
  'garbage-disposal-repair': 'fixture',
  
  'toilet-installation': 'toilet',
  'toilet-repair': 'toilet',
  
  'commercial-plumbing': 'commercial',
  
  'plumbing-inspection': 'inspection',
  'plumbing-maintenance': 'inspection',
  'plumbing-repairs': 'inspection'
};

function getNewIntro(slug: string, name: string): string {
  const category = slugToCategory[slug];
  if (!category) {
    console.warn(`No category mapping for slug: ${slug}`);
    return categoryIntros.inspection(name);
  }
  const introFn = categoryIntros[category];
  if (!introFn) {
    console.warn(`No intro template for category: ${category}`);
    return categoryIntros.inspection(name);
  }
  return introFn(name);
}

function updateServices() {
  const servicesPath = 'lib/data/services.json';
  const services: Service[] = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));
  
  let updatedCount = 0;
  
  for (const service of services) {
    const oldIntro = service.longDescription;
    const newIntro = getNewIntro(service.slug, service.name);
    
    const templatePattern = /^[^.]+is one of the most important and frequently requested services at Wood's Plumbing Enterprises LLC\. Whether you're dealing with an urgent situation requiring immediate attention or planning a scheduled project, our licensed plumbers deliver professional results backed by 46 years of experience serving Southern Arizona exclusively\. We understand the unique challenges our desert climate, hard water, and soil conditions create, and we've developed specialized approaches to address them effectively\.\n\n/;
    
    if (templatePattern.test(oldIntro)) {
      service.longDescription = newIntro + '\n\n' + oldIntro.replace(templatePattern, '');
      updatedCount++;
      console.log(`Updated: ${service.slug} (${slugToCategory[service.slug] || 'unknown'})`);
    } else {
      console.log(`Skipped (no template match): ${service.slug}`);
    }
  }
  
  fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2));
  console.log(`\nUpdated ${updatedCount} of ${services.length} services`);
}

updateServices();
