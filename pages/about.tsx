import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { Button } from '../src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../src/components/ui/card';
import { Phone, Award, Users, Clock, CheckCircle, Star } from 'lucide-react';
import { BUSINESS } from '../lib/constants';

const AboutPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>{`About Us - Tucson's Trusted Plumber Since ${BUSINESS.trust.founded} | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Learn about ${BUSINESS.name}, Tucson's most trusted plumbing company since ${BUSINESS.trust.founded}. BBB A+ rated, ${BUSINESS.trust.displayRating} stars, ${BUSINESS.trust.totalReviews}+ reviews.`} />
      </Head>

      <Header />

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
                We understand that plumbing problems don't wait for convenient times. That's why we maintain 24/7 emergency 
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
                  calls because emergencies don't wait.
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
                  We're your neighbors, serving the Tucson community for over four decades. Local ownership means we're 
                  invested in this community's success.
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

      <Footer />
    </div>
  );
};

export default AboutPage;
