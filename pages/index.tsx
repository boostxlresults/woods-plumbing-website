import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle, Clock, Shield, Users, Award, ThumbsUp, Wrench, Star } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ScheduleButton } from '@/components/ScheduleButton';
import { trackPhoneClick } from '@/lib/analytics';
import { generateReviewSchema, generateEEATSchema } from '@/lib/seo/schemas';

import servicesData from '@/lib/data/services.json';
import locationsData from '@/lib/data/locations.json';
import reviewsData from '@/lib/data/reviews.json';
import testimonials from '@/lib/data/testimonials.json';

interface HomeProps {
  services: typeof servicesData;
  locations: typeof locationsData;
  featuredReviews: typeof reviewsData;
}

const Home: NextPage<HomeProps> = ({ services, locations, featuredReviews }) => {
  const featuredServices = services.filter(s => s.featured).slice(0, 7);

  const reviewSchemas = generateReviewSchema(testimonials.slice(0, 5));
  const eeatSchema = generateEEATSchema();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": BUSINESS.name,
    "image": `${BUSINESS.website}/logo.png`,
    "@id": BUSINESS.website,
    "url": BUSINESS.website,
    "telephone": BUSINESS.phone,
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
    "openingHours": "Mo-Fr 07:00-17:00,Sa 08:00-16:00",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": BUSINESS.trust.displayRating,
      "reviewCount": BUSINESS.trust.totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div>
      <Head>
        <title>{`${BUSINESS.name} - Plumber in Marana, Tucson & Southern Arizona`}</title>
        <meta name="description" content={`Wood's Plumbing is your first choice for top-quality plumbing solutions in Tucson and Marana. Professional plumbing service in Marana, emergency plumber available 24/7. Trusted since ${BUSINESS.trust.founded}. BBB ${BUSINESS.trust.bbbRating} rated.`} />
        <link rel="canonical" href={BUSINESS.website} />
        
        <meta property="og:title" content={`${BUSINESS.name} - ${BUSINESS.tagline}`} />
        <meta property="og:description" content={`Licensed plumbing contractor serving Southern Arizona since ${BUSINESS.trust.founded}. ${BUSINESS.hours.emergency}.`} />
        <meta property="og:url" content={BUSINESS.website} />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${BUSINESS.name} - ${BUSINESS.tagline}`} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        
        {/* E-E-A-T Schema for expertise and trust signals */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eeatSchema) }}
        />
        
        {/* Individual Review schemas for rich snippets */}
        {reviewSchemas.map((schema, index) => (
          <script
            key={`review-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      {/* Hero Section - Roto-Rooter Layout */}
      <section className="bg-gray-100">
        <div className="md:container md:mx-auto md:px-4">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            {/* Left Side: Image */}
            <div className="relative h-[400px] md:h-[500px] w-full">
              <Image
                src="/images/hero-plumber.png"
                alt="Wood's Plumbing professional technician greeting homeowners in Arizona"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
                quality={90}
              />
            </div>

            {/* Right Side: Content */}
            <div className="py-12 md:py-16 px-4 md:px-12 flex flex-col items-center text-center md:items-start md:text-left">
              <h1 className="text-navy-700 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 uppercase max-w-xl">
                THE PLUMBING EXPERTS YOU&apos;VE TRUSTED FOR OVER {new Date().getFullYear() - BUSINESS.trust.founded} YEARS IN SOUTHERN ARIZONA
              </h1>
              
              <p className="text-red-600 font-bold text-2xl md:text-3xl mb-4">
                Call Us Now!
              </p>
              
              <a 
                href={`tel:${BUSINESS.phone}`}
                onClick={() => trackPhoneClick('hero')}
                className="block mb-6"
              >
                <p className="text-navy-700 font-bold text-4xl md:text-5xl lg:text-6xl hover:text-red-600 transition-colors">
                  {BUSINESS.phone}
                </p>
              </a>
              
              <ScheduleButton 
                size="lg" 
                className="bg-navy-700 hover:bg-navy-800 text-white font-bold uppercase px-8 py-6 text-lg mx-auto md:mx-0"
                showIcon={false}
              >
                <span>SCHEDULE ONLINE</span>
                <span className="text-xl ml-2">✓</span>
              </ScheduleButton>
            </div>
          </div>
        </div>
      </section>

      {/* Red Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-lg md:text-xl font-bold uppercase flex items-center justify-center gap-3">
              <span>FREE ESTIMATES &amp; NO TRIP CHARGE. SAME DAY SERVICE</span>
              <span className="text-2xl">→</span>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Banner - Removed duplicate, already have red banner above */}

      {/* Value Propositions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Plumbers You&apos;ve Trusted in Southern Arizona for over {BUSINESS.trust.yearsInBusiness} Years
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Open 24/7</h3>
                <p className="text-gray-700">No Extra Charge Nights, Weekends, and Holidays</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Free Estimates</h3>
                <p className="text-gray-700">Upfront pricing before we start any work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Full-Service Plumbing</h3>
                <p className="text-gray-700">For Home & Business Throughout Pima County</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">State-of-the-Art Equipment</h3>
                <p className="text-gray-700">Professional drain cleaning and plumbing tools</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Licensed & Insured</h3>
                <p className="text-gray-700">Trusted Since {BUSINESS.trust.founded} - ROC {BUSINESS.trust.license}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-navy-900 mb-1">Local Family-Owned</h3>
                <p className="text-gray-700">Serving our neighbors throughout Southern Arizona</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services - Icon Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-12 text-center">
            Our Services
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Link 
                key={service.id} 
                href={`/services/${service.slug}`}
                className="group flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-navy-900 group-hover:text-red-600 transition-colors">
                  {service.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - SEO Optimized */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              About Wood&apos;s Plumbing
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4 text-xl font-medium text-navy-800">
                Wood&apos;s Plumbing is your first choice for top-quality plumbing solutions in Tucson and Marana, as well as the surrounding areas.
              </p>
              <p className="mb-4">
                If you are looking for reliable plumbing companies that are always professional, accurate, and on time, then you have come to the right place. Our <strong>plumbing services in Marana</strong>, Tucson and its surrounding areas are unmatched, and we are also proud to be the plumbing company you can always rely on even for last-minute emergencies. As a trusted option for anyone seeking an <strong>emergency plumber in Marana</strong>, Tucson, and its surrounding areas, our team is known for fast response and dependable service.
              </p>
              <p className="mb-4">
                Many homeowners also rely on us when they need a <strong>plumbing service in Marana</strong>, Tucson, and its surrounding areas, whether it is for routine maintenance or unexpected issues. We work hard to ensure complete customer satisfaction, so you will always have someone to call when you need a <strong>plumber in Marana</strong> or anywhere in Southern Arizona.
              </p>
              <p>
                If you&apos;re ready to learn more, then <Link href="/contact" className="text-red-600 hover:text-red-700 font-semibold">contact us today</Link> or call <a href={`tel:${BUSINESS.phone}`} onClick={() => trackPhoneClick('about_section')} className="text-red-600 hover:text-red-700 font-semibold">{BUSINESS.phone}</a>!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Comprehensive Services - SEO Optimized */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-10 text-center">
              Our Comprehensive Services
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Repairs */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <Wrench className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">Repairs</h3>
                <p className="text-gray-700">
                  There may be a million and one common repair problems, but we are prepared for all of them.
                </p>
              </div>

              {/* Leak Detection */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">Leak Detection</h3>
                <p className="text-gray-700">
                  We are highly experienced at diagnosing water line leaks, gas line leaks, and sewer line leaks.
                </p>
              </div>

              {/* Water Heaters */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">Water Heaters</h3>
                <p className="text-gray-700">
                  We are the trusted name with regard to American and AO Smith water heater sales, installation, repair, and service. In addition, we are ACT hot water-certified.
                </p>
              </div>

              {/* Water Conditioning */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">Water Conditioning</h3>
                <p className="text-gray-700">
                  Our water treatment and conditioning services restore the quality of your water, giving your family the healthiest, safest water possible.
                </p>
              </div>

              {/* Repiping */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">Repiping</h3>
                <p className="text-gray-700">
                  We can replace any type of piping for your entire home. No job is too small or too big for us, so you can count on our expertise to get the job done right.
                </p>
              </div>

              {/* Sewer */}
              <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">Sewer</h3>
                <p className="text-gray-700">
                  One of the worst issues a property owner can encounter is a sewer problem, but Wood&apos;s Plumbing has the expertise to help quickly.
                </p>
              </div>
            </div>

            {/* Gas Services - Full Width */}
            <div className="mt-8 bg-navy-50 border border-navy-200 rounded-xl p-8">
              <h3 className="font-bold text-2xl text-navy-900 mb-4">Gas Services</h3>
              <p className="text-gray-700 mb-4">
                If your gas piping system requires a professional touch, then Wood&apos;s Plumbing can help. Whether you are reaching out for routine inspections or sudden concerns, many customers contacting us for gas-related needs also look for an <strong>emergency plumber in Marana</strong>, Tucson, and its surrounding areas to ensure fast, dependable support.
              </p>
              <p className="text-gray-700 mb-4">
                As part of our commitment to quality, we continue to offer a full range of solutions that complement any <strong>plumbing service in Marana</strong>, Tucson and its surrounding areas, keeping homes and businesses functioning safely.
              </p>
              <p className="text-gray-700">
                We offer a wide array of essential gas services to residential and commercial customers throughout the Tucson area. We have been serving the community since {BUSINESS.trust.founded}, so we&apos;re ready to provide you with the services you need. Our team will work to ensure that you&apos;re never at a loss when it comes to getting fast, safe and dependable gas services.
              </p>
            </div>

            <div className="text-center mt-10">
              <Link href="/services">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work - SEO Optimized */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-10 text-center">
              How We Work
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">Make an Appointment</h3>
                <p className="text-gray-700">
                  If you need a plumber, then you&apos;re in luck! We&apos;re one of Tucson&apos;s top plumbing companies, so get in touch with us today.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">In-Depth Diagnosis</h3>
                <p className="text-gray-700">
                  We assess the situation so we can come up with a solution to fix the problem. Then, we give you an upfront price.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="font-bold text-xl text-navy-900 mb-3">We Get the Job Done</h3>
                <p className="text-gray-700">
                  If you accept our proposal, then our trucks are fully stocked and ready to complete the job! We work fast, so you can get back to normal as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Guarantee Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            LEAVE PLUMBING TO THE PROS
          </h2>
          <p className="text-xl text-center mb-12 text-gray-300">
            BECAUSE WITH {BUSINESS.name.toUpperCase()}, YOU GET MORE THAN A GUARANTEE
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">REPUTATION</h3>
              <p className="text-gray-300">
                Highly-trained professionals since {BUSINESS.trust.founded}. A job done right by local experts you can trust.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">QUALITY</h3>
              <p className="text-gray-300">
                Full-service plumbing and drain cleaning – using state-of-the-art diagnostics and equipment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">TRANSPARENCY</h3>
              <p className="text-gray-300">
                Free onsite estimates. No hidden or extra charges for plumbing service on holidays, nights, and weekends.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">EFFICIENCY</h3>
              <p className="text-gray-300">
                Same-day and emergency service 365 days a year. Available 24/7 when you need us most.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">LOCAL EXPERTS</h3>
              <p className="text-gray-300">
                Family-owned and operated. We understand Southern Arizona homes and businesses.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">SATISFACTION</h3>
              <p className="text-gray-300">
                BBB {BUSINESS.trust.bbbRating} rated with {BUSINESS.trust.totalReviews}+ satisfied customers. 100% satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            Serving All of Pima County
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {locations.map((location) => (
              <Link 
                key={location.id}
                href={`/locations/${location.slug}`}
                className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-navy-900 hover:text-red-600 transition-colors">
                  {location.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/locations">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                View All Service Areas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-navy-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Plumbing and water services.
          </h2>
          <p className="text-2xl mb-8">Yeah, we do both.</p>
          <a 
            href={`tel:${BUSINESS.phone}`}
            onClick={() => trackPhoneClick('bottom_cta')}
          >
            <Button size="lg" className="bg-white text-navy-700 hover:bg-gray-100 font-bold text-xl px-10 py-6">
              Call now to schedule: {BUSINESS.phone}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      services: servicesData,
      locations: locationsData,
      featuredReviews: reviewsData.slice(0, 10),
    },
  };
};

export default Home;
