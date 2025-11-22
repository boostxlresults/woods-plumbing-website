import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../src/components/ui/card';
import { Phone, Award, Users, Clock, CheckCircle, Star, ChevronDown } from 'lucide-react';
import { BUSINESS } from '../lib/constants';

const AboutPage: NextPage = () => {
  // Schema.org Organization markup
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": BUSINESS.name,
    "legalName": BUSINESS.legalName,
    "url": BUSINESS.website,
    "logo": `${BUSINESS.website}/images/woods-plumbing-logo.png`,
    "foundingDate": BUSINESS.trust.founded.toString(),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BUSINESS.address.street,
      "addressLocality": BUSINESS.address.city,
      "addressRegion": BUSINESS.address.state,
      "postalCode": BUSINESS.address.zip,
      "addressCountry": BUSINESS.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": BUSINESS.geo.latitude,
      "longitude": BUSINESS.geo.longitude
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": BUSINESS.phone,
      "contactType": "customer service",
      "email": BUSINESS.email,
      "areaServed": "Southern Arizona",
      "availableLanguage": "English"
    },
    "sameAs": BUSINESS.social ? [
      BUSINESS.social.facebook,
      BUSINESS.social.instagram,
      BUSINESS.social.yelp,
      BUSINESS.social.googleBusiness
    ].filter(Boolean) : [],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS.trust.displayRating,
      "reviewCount": BUSINESS.trust.totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // About FAQs
  const aboutFaqs = [
    {
      question: `How long has ${BUSINESS.name} been in business?`,
      answer: `${BUSINESS.name} has been serving Southern Arizona since ${BUSINESS.trust.founded}, with over ${BUSINESS.trust.yearsInBusiness} years of trusted plumbing expertise.`
    },
    {
      question: "Is your company licensed and insured?",
      answer: `Yes, we are fully licensed (Arizona ROC ${BUSINESS.trust.license}), bonded, and insured. All our plumbers are certified professionals who meet or exceed industry standards.`
    },
    {
      question: "Do you offer a warranty on your work?",
      answer: "Yes, we stand behind our work with a lifetime warranty on workmanship. We also honor manufacturer warranties on parts and equipment we install."
    },
    {
      question: "Are you available for emergency calls?",
      answer: `Yes! We provide ${BUSINESS.hours.emergency}. We understand plumbing emergencies don't wait for business hours, so we're always available when you need us.`
    },
    {
      question: "Do you charge overtime for emergency calls?",
      answer: "No, we do not charge overtime fees for emergency calls. Our emergency rates are fair and transparent, with upfront pricing before we start any work."
    },
    {
      question: "What areas do you serve?",
      answer: "We serve all of Southern Arizona, including Tucson, Marana, Oro Valley, Sahuarita, Green Valley, Vail, Catalina, and Flowing Wells."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aboutFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div>
      <Head>
        <title>{`About Us - Tucson's Trusted Plumber Since ${BUSINESS.trust.founded} | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Learn about ${BUSINESS.name}, Tucson's most trusted plumbing company since ${BUSINESS.trust.founded}. BBB A+ rated, ${BUSINESS.trust.displayRating} stars, ${BUSINESS.trust.totalReviews}+ reviews.`} />
        <meta name="keywords" content={`about ${BUSINESS.name}, plumber history, Tucson plumber since ${BUSINESS.trust.founded}, licensed plumber Arizona, BBB A+ plumber, family owned plumbing`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`${BUSINESS.website}/about`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`About ${BUSINESS.name} | Tucson's Trusted Plumber Since ${BUSINESS.trust.founded}`} />
        <meta property="og:description" content={`BBB A+ rated with ${BUSINESS.trust.displayRating} stars. Serving Southern Arizona since ${BUSINESS.trust.founded}.`} />
        <meta property="og:url" content={`${BUSINESS.website}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={BUSINESS.name} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About ${BUSINESS.name}`} />
        <meta name="twitter:description" content={`BBB A+ rated with ${BUSINESS.trust.displayRating} stars.`} />

        {/* AI Search Optimization */}
        <meta name="author" content={BUSINESS.name} />
        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Southern Arizona" />
        <meta name="geo.position" content={`${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`} />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {`About ${BUSINESS.name}`}
            </h1>
            <p className="text-xl text-blue-100">
              {`Serving Southern Arizona with expert plumbing since ${BUSINESS.trust.founded}`}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {`For over ${BUSINESS.trust.yearsInBusiness} years, ${BUSINESS.name} has been the trusted name in plumbing services across Southern Arizona. What started as a small family operation in ${BUSINESS.trust.founded} has grown into one of the region's most respected plumbing contractors, built on a foundation of honest service, quality workmanship, and genuine care for our customers.`}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We understand that plumbing problems don&apos;t wait for convenient times. That&apos;s why we maintain 24/7 emergency 
                service with no overtime charges—because Tucson families and businesses deserve reliable help whenever they 
                need it. Our team of licensed, experienced plumbers brings not just technical expertise but a commitment to 
                treating every home and business like our own.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {`From emergency repairs to planned installations, from residential homes to commercial facilities, we've seen it all and fixed it all. Our BBB A+ rating and ${BUSINESS.trust.displayRating}-star average across ${BUSINESS.trust.totalReviews}+ reviews reflect our unwavering commitment to customer satisfaction and quality work.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{`Why Tucson Trusts ${BUSINESS.name}`}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-blue-600" />
                  <CardTitle>Licensed & Insured</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {`Fully licensed (ROC ${BUSINESS.trust.license}), bonded, and insured. Our technicians are certified professionals who stay current with industry standards and local codes.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-8 h-8 text-blue-600" />
                  <CardTitle>BBB A+ Rated</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {`${BUSINESS.trust.displayRating} star rating with ${BUSINESS.trust.totalReviews}+ verified reviews. Our reputation is built on decades of honest service and customer satisfaction.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <CardTitle>24/7 Emergency Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Always available when you need us most—nights, weekends, holidays. No overtime charges for emergency 
                  calls because emergencies don&apos;t wait.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-blue-600" />
                  <CardTitle>{`${BUSINESS.trust.yearsInBusiness}+ Years Experience`}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {`Since ${BUSINESS.trust.founded}, we've solved every type of plumbing challenge Southern Arizona can present. Experience matters when it comes to quality repairs.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                  <CardTitle>Lifetime Warranty</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We stand behind our work with a lifetime warranty on workmanship. Quality installations and repairs 
                  that last, backed by our guarantee.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="w-8 h-8 text-blue-600" />
                  <CardTitle>Local & Family-Owned</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We&apos;re your neighbors, serving the Tucson community for over four decades. Local ownership means we&apos;re 
                  invested in this community&apos;s success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Certifications & Qualifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{`Arizona ROC License #${BUSINESS.trust.license}`}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{`BBB A+ Rated (${BUSINESS.trust.bbbRating})`}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Fully Bonded & Insured</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Certified Master Plumbers on Staff</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment to You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">Quality Workmanship Guaranteed</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">24/7 Emergency Service</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">Upfront Pricing - No Hidden Fees</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-blue-100">Licensed & Insured Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {aboutFaqs.map((faq, index) => (
                <details key={index} className="group border border-gray-200 rounded-lg bg-white">
                  <summary className="cursor-pointer p-6 font-semibold text-lg text-gray-900 flex justify-between items-center hover:bg-gray-50">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray-700 text-lg">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {`Experience the ${BUSINESS.name} Difference`}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers across Southern Arizona
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="mr-2" />
                Call {BUSINESS.phone}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
