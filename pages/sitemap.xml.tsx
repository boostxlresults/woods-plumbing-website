import { GetServerSideProps } from 'next';
import servicesData from '@/lib/data/services.json';
import locationsData from '@/lib/data/locations.json';
import blogPostsData from '@/lib/data/blog-posts.json';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.woodsplumbing.com';

function generateSiteMap() {
  const today = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Pages -->
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/knowledge-base</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE_URL}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Services Index -->
  <url>
    <loc>${SITE_URL}/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Service Pages -->
  ${servicesData.map((service) => {
    return `
  <url>
    <loc>${SITE_URL}/services/${service.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('')}
  
  <!-- Locations Index -->
  <url>
    <loc>${SITE_URL}/locations</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Location Pages -->
  ${locationsData.map((location) => {
    return `
  <url>
    <loc>${SITE_URL}/locations/${location.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('')}
  
  <!-- Geo-Service Intersection Pages (Location x Service Matrix) -->
  ${(() => {
    const priorityLocationSlugs = ['marana', 'tucson', 'oro-valley', 'gladden-farms', 'continental-ranch', 'dove-mountain', 'avra-valley', 'catalina-foothills', 'sahuarita', 'green-valley', 'vail', 'picture-rocks'];
    const priorityServiceSlugs = ['emergency-plumbing', 'drain-cleaning', 'water-heater-repair', 'water-heater-installation', 'tankless-water-heaters', 'leak-detection', 'slab-leak-detection', 'sewer-line-repair', 'hydro-jetting', 'gas-line-installation', 'water-softener-installation', 'burst-pipe-repair', 'toilet-repair', 'faucet-installation', 'garbage-disposal-repair', 'whole-house-repiping', 'sewer-camera-inspection', 'trenchless-sewer-repair', 'gas-leak-detection', 'reverse-osmosis-systems'];
    const geoServiceUrls: string[] = [];
    for (const locSlug of priorityLocationSlugs) {
      const locExists = locationsData.find((l: any) => l.slug === locSlug);
      if (!locExists) continue;
      for (const svcSlug of priorityServiceSlugs) {
        const svcExists = servicesData.find((s: any) => s.slug === svcSlug);
        if (!svcExists) continue;
        geoServiceUrls.push(`
  <url>
    <loc>${SITE_URL}/locations/${locSlug}/${svcSlug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`);
      }
    }
    return geoServiceUrls.join('');
  })()}
  
  <!-- Blog Index -->
  <url>
    <loc>${SITE_URL}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog Posts -->
  ${blogPostsData.map((post) => {
    const postDate = new Date(post.publishedAt).toISOString();
    return `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join('')}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate the XML sitemap
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
