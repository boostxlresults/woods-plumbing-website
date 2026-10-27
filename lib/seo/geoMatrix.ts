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
