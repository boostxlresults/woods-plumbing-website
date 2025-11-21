export interface ServiceCategory {
  name: string;
  slug: string;
  services: {
    name: string;
    slug: string;
  }[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Emergency Services",
    slug: "emergency",
    services: [
      { name: "24/7 Emergency Plumbing", slug: "emergency-plumbing" },
      { name: "Burst Pipe Repair", slug: "burst-pipe-repair" },
      { name: "Emergency Leak Repair", slug: "emergency-leak-repair" },
      { name: "Emergency Drain Cleaning", slug: "emergency-drain-cleaning" },
      { name: "Sewer Backup Emergency", slug: "sewer-backup-emergency" },
      { name: "Frozen Pipe Repair", slug: "frozen-pipe-repair" },
    ],
  },
  {
    name: "Plumbing Services",
    slug: "plumbing",
    services: [
      { name: "Plumbing Repairs", slug: "plumbing-repairs" },
      { name: "Plumbing Maintenance", slug: "plumbing-maintenance" },
      { name: "Plumbing Inspection", slug: "plumbing-inspection" },
      { name: "Pipe Repair", slug: "pipe-repair" },
      { name: "Pipe Replacement", slug: "pipe-replacement" },
      { name: "Backflow Prevention", slug: "backflow-prevention" },
      { name: "Commercial Plumbing", slug: "commercial-plumbing" },
    ],
  },
  {
    name: "Drains & Sewer",
    slug: "drains-sewer",
    services: [
      { name: "Drain Cleaning", slug: "drain-cleaning" },
      { name: "Clogged Drain Repair", slug: "clogged-drain-repair" },
      { name: "Sewer Line Repair", slug: "sewer-line-repair" },
      { name: "Sewer Line Cleaning", slug: "sewer-line-cleaning" },
      { name: "Sewer Line Replacement", slug: "sewer-line-replacement" },
      { name: "Hydro Jetting", slug: "hydro-jetting" },
      { name: "Rooter Service", slug: "rooter-service" },
      { name: "Trenchless Sewer Repair", slug: "trenchless-sewer-repair" },
      { name: "Sewer Camera Inspection", slug: "sewer-camera-inspection" },
    ],
  },
  {
    name: "Water Heaters",
    slug: "water-heaters",
    services: [
      { name: "Water Heater Installation", slug: "water-heater-installation" },
      { name: "Water Heater Repair", slug: "water-heater-repair" },
      { name: "Water Heater Replacement", slug: "water-heater-replacement" },
      { name: "Tankless Water Heaters", slug: "tankless-water-heaters" },
      { name: "Tank Water Heaters", slug: "tank-water-heaters" },
      { name: "Water Heater Maintenance", slug: "water-heater-maintenance" },
      { name: "Water Heater Flushing", slug: "water-heater-flushing" },
      { name: "Gas Water Heater Service", slug: "gas-water-heater-service" },
      { name: "Electric Water Heater Service", slug: "electric-water-heater-service" },
    ],
  },
  {
    name: "Gas Services",
    slug: "gas",
    services: [
      { name: "Gas Leak Detection", slug: "gas-leak-detection" },
      { name: "Gas Leak Repair", slug: "gas-leak-repair" },
      { name: "Gas Line Installation", slug: "gas-line-installation" },
      { name: "Gas Line Repair", slug: "gas-line-repair" },
      { name: "Gas Line Relocation", slug: "gas-line-relocation" },
      { name: "Gas Line Inspection", slug: "gas-line-inspection" },
      { name: "Gas Pipe Testing", slug: "gas-pipe-testing" },
    ],
  },
  {
    name: "Leak Detection",
    slug: "leak-detection",
    services: [
      { name: "Leak Detection", slug: "leak-detection" },
      { name: "Water Leak Repair", slug: "water-leak-repair" },
      { name: "Pipe Leak Repair", slug: "pipe-leak-repair" },
      { name: "Slab Leak Detection", slug: "slab-leak-detection" },
      { name: "Slab Leak Repair", slug: "slab-leak-repair" },
    ],
  },
  {
    name: "Repiping",
    slug: "repiping",
    services: [
      { name: "Whole House Repiping", slug: "whole-house-repiping" },
      { name: "Water Line Installation", slug: "water-line-installation" },
      { name: "Water Line Repair", slug: "water-line-repair" },
      { name: "Water Line Replacement", slug: "water-line-replacement" },
    ],
  },
  {
    name: "Water Treatment",
    slug: "water-treatment",
    services: [
      { name: "Water Conditioning", slug: "water-conditioning" },
      { name: "Water Filtration Systems", slug: "water-filtration-systems" },
      { name: "Water Softener Installation", slug: "water-softener-installation" },
      { name: "Water Softener Repair", slug: "water-softener-repair" },
      { name: "Reverse Osmosis Systems", slug: "reverse-osmosis-systems" },
      { name: "Water Pressure Repair", slug: "water-pressure-repair" },
    ],
  },
  {
    name: "Fixtures & Installations",
    slug: "fixtures",
    services: [
      { name: "Toilet Installation", slug: "toilet-installation" },
      { name: "Toilet Repair", slug: "toilet-repair" },
      { name: "Faucet Installation", slug: "faucet-installation" },
      { name: "Faucet Repair", slug: "faucet-repair" },
      { name: "Sink Installation", slug: "sink-installation" },
      { name: "Sink Repair", slug: "sink-repair" },
      { name: "Shower Installation", slug: "shower-installation" },
      { name: "Shower Repair", slug: "shower-repair" },
      { name: "Bathtub Installation", slug: "bathtub-installation" },
      { name: "Garbage Disposal Installation", slug: "garbage-disposal-installation" },
      { name: "Garbage Disposal Repair", slug: "garbage-disposal-repair" },
      { name: "Fixture Installation", slug: "fixture-installation" },
    ],
  },
  {
    name: "Additional Services",
    slug: "additional",
    services: [
      { name: "Septic System Service", slug: "septic-system-service" },
    ],
  },
];
