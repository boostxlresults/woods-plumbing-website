import { GetServerSideProps } from 'next';
import servicesData from '@/lib/data/services.json';
import locationsData from '@/lib/data/locations.json';
import { BUSINESS } from '@/lib/constants';

// /llms-full.txt: the complete, plain-text version of the site for AI assistants
// and answer engines. /llms.txt is the short index; this file carries the full
// service and service-area content so a model can cite specifics.

type Faq = { question: string; answer: string };

function section(title: string, body?: string | null) {
  return body ? `### ${title}\n\n${body.trim()}\n\n` : '';
}

function list(title: string, items?: unknown) {
  if (!Array.isArray(items) || items.length === 0) return '';
  return `### ${title}\n\n${items.map((i) => `- ${String(i)}`).join('\n')}\n\n`;
}

function buildLlmsFull() {
  const site = BUSINESS.website;
  const years = new Date().getFullYear() - BUSINESS.trust.founded;

  let out = `# ${BUSINESS.name}\n\n`;
  out += `> Licensed plumbing contractor based in Marana, Arizona, serving Marana, Northwest Tucson, Oro Valley and the greater Tucson area since ${BUSINESS.trust.founded} (${years} years). Arizona ROC #${BUSINESS.trust.license} (CR-37 Plumbing). 24/7 emergency service.\n\n`;

  out += `## Business facts\n\n`;
  out += `- Name: ${BUSINESS.name}\n`;
  out += `- Phone: ${BUSINESS.phone}\n`;
  out += `- Address: ${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}\n`;
  out += `- Website: ${site}\n`;
  out += `- Founded: ${BUSINESS.trust.founded}\n`;
  out += `- License: Arizona Registrar of Contractors #${BUSINESS.trust.license}, CR-37 Plumbing\n`;
  out += `- Google rating: ${BUSINESS.trust.displayRating} stars from ${BUSINESS.trust.totalReviews}+ reviews\n`;
  out += `- Hours: ${BUSINESS.hours.weekday}; ${BUSINESS.hours.saturday}; ${BUSINESS.hours.emergency}\n\n`;

  out += `## Services\n\n`;
  for (const s of servicesData as any[]) {
    out += `## ${s.name}\n\nURL: ${site}/services/${s.slug}\n\n`;
    out += `${(s.shortDescription || '').trim()}\n\n`;
    out += section('Overview', s.longDescription);
    out += list('Common problems', s.commonIssues);
    out += section('Southern Arizona considerations', s.arizonaContext);
    out += list('What affects the price', s.pricingFactors);
    out += section('Warranty', s.warrantyInfo);
    const faqs: Faq[] = Array.isArray(s.faqs) ? s.faqs : [];
    if (faqs.length) {
      out += `### Frequently asked questions\n\n`;
      out += faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');
      out += `\n\n`;
    }
  }

  out += `## Service areas\n\n`;
  for (const l of locationsData as any[]) {
    out += `## ${l.name}, AZ\n\nURL: ${site}/locations/${l.slug}\n`;
    if (Array.isArray(l.zipCodes) && l.zipCodes.length) out += `ZIP codes: ${l.zipCodes.join(', ')}\n`;
    if (Array.isArray(l.neighborhoods) && l.neighborhoods.length) out += `Neighborhoods: ${l.neighborhoods.join(', ')}\n`;
    out += `\n${(l.longDescription || l.description || '').trim()}\n\n`;
  }

  return out;
}

export default function LlmsFull() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(buildLlmsFull());
  res.end();
  return { props: {} };
};
