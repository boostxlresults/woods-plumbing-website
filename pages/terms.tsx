import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const TermsPage: NextPage = () => {
  const lastUpdated = "December 1, 2025";

  return (
    <div className="bg-white">
      <Head>
        <title>Terms of Use - Service Agreement & Policies | Wood&apos;s Plumbing Enterprises LLC</title>
        <meta name="description" content="Review the terms of use for Wood's Plumbing Enterprises LLC website and plumbing services. Includes service policies, pricing terms, warranties, and customer rights for Arizona residents." />
        <link rel="canonical" href={`${BUSINESS.website}/terms`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Breadcrumb items={[{ label: 'Terms of Use' }]} />

      <section className="bg-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center">
            Terms of Use
          </h1>
          <p className="text-center text-gray-300 mt-4">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-700 mb-8">
              Welcome to {BUSINESS.name}. By accessing or using our website, you agree to be bound by these Terms of Use. Please read them carefully before using our services.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using this website, you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">2. Services Description</h2>
            <p className="text-gray-700 mb-4">
              {BUSINESS.name} provides professional plumbing services in Southern Arizona, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Emergency plumbing repairs</li>
              <li>Water heater installation and repair</li>
              <li>Drain cleaning and sewer services</li>
              <li>Leak detection and repair</li>
              <li>Gas line services</li>
              <li>Water treatment and conditioning</li>
              <li>Plumbing inspections and maintenance</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">3. Licensing and Insurance</h2>
            <p className="text-gray-700 mb-4">
              {BUSINESS.name} is a licensed plumbing contractor in the State of Arizona (ROC License #{BUSINESS.trust.license}). We maintain appropriate liability insurance and bonding as required by Arizona law.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">4. Service Estimates and Pricing</h2>
            <p className="text-gray-700 mb-4">
              We provide upfront, transparent pricing for all services. Important pricing terms include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Estimates are provided before work begins</li>
              <li>Final pricing may vary based on actual conditions discovered during service</li>
              <li>Any changes to the original estimate will be communicated and approved before proceeding</li>
              <li>Payment is due upon completion of services unless otherwise arranged</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">5. Scheduling and Cancellation</h2>
            <p className="text-gray-700 mb-4">
              We strive to accommodate your scheduling needs. Please note:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Appointments should be cancelled or rescheduled at least 24 hours in advance when possible</li>
              <li>Emergency services are available 24/7</li>
              <li>Arrival times are estimates and may vary based on job complexity and traffic conditions</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">6. Warranty and Guarantees</h2>
            <p className="text-gray-700 mb-4">
              We stand behind our work with the following guarantees:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>100% satisfaction guarantee on all workmanship</li>
              <li>Warranty periods vary by service type and are specified in your service agreement</li>
              <li>Manufacturer warranties apply to installed parts and equipment</li>
              <li>Warranty claims must be reported promptly</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">7. Website Use</h2>
            <p className="text-gray-700 mb-4">
              When using our website, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Provide accurate information when submitting forms</li>
              <li>Not use the website for any unlawful purpose</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
              <li>Not interfere with the proper functioning of the website</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on this website, including text, graphics, logos, images, and software, is the property of {BUSINESS.name} or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, {BUSINESS.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of our website or services. Our liability shall be limited to the amount paid for the specific service in question.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold harmless {BUSINESS.name}, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these Terms of Use or misuse of our services.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms of Use shall be governed by and construed in accordance with the laws of the State of Arizona, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Pima County, Arizona.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">13. Severability</h2>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms of Use is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Use, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mt-4">
              <p className="font-semibold text-navy-900">{BUSINESS.name}</p>
              <p className="text-gray-700">{BUSINESS.address.street}</p>
              <p className="text-gray-700">{BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}</p>
              <p className="text-gray-700 mt-2">
                Phone: <a href={`tel:${BUSINESS.phone}`} className="text-red-600 hover:underline">{BUSINESS.phone}</a>
              </p>
              <p className="text-gray-700">
                Email: <a href={`mailto:${BUSINESS.email}`} className="text-red-600 hover:underline">{BUSINESS.email}</a>
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
              <Link href="/privacy-policy" className="text-red-600 hover:underline font-semibold">
                View Privacy Policy →
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/contact" className="text-red-600 hover:underline font-semibold">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TermsPage;
