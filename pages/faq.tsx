import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { trackPhoneClick } from '@/lib/analytics';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do you offer emergency plumbing services?",
    answer: "Yes. Wood's Plumbing provides reliable emergency plumbing service in Marana, Tucson, and its surrounding areas. Whether it is a burst pipe, gas leak, or sudden water heater issue, our team is available to assist when you need immediate attention."
  },
  {
    question: "How fast can an emergency plumber arrive at my home?",
    answer: "Response time depends on your location, but we strive to dispatch an emergency plumber in Marana, Tucson, and its surrounding areas as quickly as possible. Our team is available 24/7 to respond to plumbing emergencies."
  },
  {
    question: "What types of plumbing services do you provide?",
    answer: "We handle everything from leak repairs and drain cleaning to water heaters, sewer line services, and gas line inspections. Homeowners often contact us for both routine plumbing appointments and emergency plumbing service in Marana, Tucson, and its surrounding areas."
  },
  {
    question: "Are your plumbers licensed and experienced?",
    answer: `Wood's Plumbing has served the community since ${BUSINESS.trust.founded}, and all technicians are trained, licensed, and experienced. When you call for an emergency plumber, you can trust that a qualified professional will handle the job.`
  },
  {
    question: "Do you offer gas line repair and installation?",
    answer: "Yes. We provide comprehensive gas services for both residential and commercial properties. If you experience unusual odors or suspect a gas issue, contact us immediately for emergency plumbing service in Marana, Tucson, and its surrounding areas."
  },
  {
    question: "How do I know when I need an emergency plumber?",
    answer: "If you experience flooding, sewer backups, gas smells, or sudden loss of water, you should call an emergency plumber in Marana, Tucson, and its surrounding areas right away. These issues can worsen quickly and may require immediate professional attention."
  },
  {
    question: "Can you help with long-term plumbing maintenance?",
    answer: "Yes. In addition to emergency services, we offer routine plumbing maintenance and inspections to help prevent issues before they become costly repairs. Regular maintenance can extend the life of your plumbing system and save you money in the long run."
  }
];

const FAQPage: NextPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BUSINESS.website
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Frequently Asked Questions",
        "item": `${BUSINESS.website}/faq`
      }
    ]
  };

  return (
    <div>
      <Head>
        <title>Plumbing FAQs - Emergency Plumber Marana & Tucson</title>
        <meta 
          name="description" 
          content="Common plumbing questions answered. 24/7 emergency plumber in Marana & Tucson. Licensed technicians, fast response."
        />
        <link rel="canonical" href={`${BUSINESS.website}/faq`} />
        
        <meta property="og:title" content={`Plumbing FAQs | ${BUSINESS.name}`} />
        <meta property="og:description" content="Find answers to frequently asked questions about our plumbing services in Marana, Tucson, and Southern Arizona." />
        <meta property="og:url" content={`${BUSINESS.website}/faq`} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Plumbing FAQs | ${BUSINESS.name}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-navy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Get answers to common questions about our plumbing services in Marana, Tucson, and Southern Arizona.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:${BUSINESS.phone}`}
                onClick={() => trackPhoneClick('faq_hero')}
              >
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  Call {BUSINESS.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-700 font-bold px-8">
                  Schedule Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <nav className="text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-red-600">Home</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-navy-700 font-medium">FAQs</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-semibold text-lg text-navy-900 pr-4">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="p-6 bg-white border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-navy-900 mb-8 text-center">
              Still Have Questions?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-xl text-navy-900 mb-4">Contact Us Directly</h3>
                <p className="text-gray-700 mb-4">
                  Our friendly team is ready to answer any questions you may have about our plumbing services in Marana, Tucson, and the surrounding areas.
                </p>
                <a 
                  href={`tel:${BUSINESS.phone}`}
                  onClick={() => trackPhoneClick('faq_contact')}
                  className="text-red-600 hover:text-red-700 font-semibold text-lg"
                >
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="font-bold text-xl text-navy-900 mb-4">Request a Free Estimate</h3>
                <p className="text-gray-700 mb-4">
                  Not sure what service you need? We offer free onsite estimates with upfront pricing before any work begins.
                </p>
                <Link href="/contact" className="text-red-600 hover:text-red-700 font-semibold text-lg">
                  Schedule an Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Need an Emergency Plumber in Marana or Tucson?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Our team is available 24/7 to help with any plumbing emergency. Fast response, dependable service.
          </p>
          <a 
            href={`tel:${BUSINESS.phone}`}
            onClick={() => trackPhoneClick('faq_cta')}
          >
            <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100 font-bold text-xl px-10 py-6">
              Call Now: {BUSINESS.phone}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
