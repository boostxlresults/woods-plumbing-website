// Single source of truth for the location x service page matrix.
// Used by pages/locations/[slug]/[serviceSlug].tsx (static paths) and the sitemap,
// so the two can never drift apart.

export const GEO_MATRIX_LOCATION_SLUGS = [
  'marana', 'tucson', 'oro-valley',
  'gladden-farms', 'continental-ranch', 'dove-mountain',
  'avra-valley', 'catalina-foothills', 'sahuarita',
  'green-valley', 'vail', 'picture-rocks',
];

export const GEO_MATRIX_SERVICE_SLUGS = [
  'emergency-plumbing',
  'drain-cleaning',
  'water-heater-repair',
  'water-heater-installation',
  'water-heater-replacement',
  'tankless-water-heaters',
  'leak-detection',
  'slab-leak-detection',
  'slab-leak-repair',
  'sewer-line-repair',
  'hydro-jetting',
  'gas-line-installation',
  'water-softener-installation',
  'burst-pipe-repair',
  'toilet-repair',
  'faucet-installation',
  'garbage-disposal-repair',
  'whole-house-repiping',
  'sewer-camera-inspection',
  'trenchless-sewer-repair',
  'gas-leak-detection',
  'reverse-osmosis-systems',
];

// Locations outside the full matrix that have hand-written pages for a subset
// of services. Only add a pair here once it has an entry in geo-content.json.
export const GEO_EXTRA_PAGES: Record<string, string[]> = {
  'northwest-tucson': [
    'emergency-plumbing',
    'drain-cleaning',
    'water-heater-repair',
    'water-heater-replacement',
    'tankless-water-heaters',
    'slab-leak-detection',
    'slab-leak-repair',
    'sewer-line-repair',
    'whole-house-repiping',
    'water-softener-installation',
  ],
};

export function geoServicesFor(locationSlug: string): string[] {
  if (GEO_MATRIX_LOCATION_SLUGS.includes(locationSlug)) return GEO_MATRIX_SERVICE_SLUGS;
  return GEO_EXTRA_PAGES[locationSlug] || [];
}

export function isGeoPage(locationSlug: string, serviceSlug: string): boolean {
  return geoServicesFor(locationSlug).includes(serviceSlug);
}

export function allGeoPairs(): Array<{ locationSlug: string; serviceSlug: string }> {
  const pairs: Array<{ locationSlug: string; serviceSlug: string }> = [];
  for (const loc of [...GEO_MATRIX_LOCATION_SLUGS, ...Object.keys(GEO_EXTRA_PAGES)]) {
    for (const svc of geoServicesFor(loc)) pairs.push({ locationSlug: loc, serviceSlug: svc });
  }
  return pairs;
}
