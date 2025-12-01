import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { BUSINESS } from '@/lib/constants';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

const PrivacyPolicyPage: NextPage = () => {
  const lastUpdated = "December 1, 2025";

  return (
    <div className="bg-white">
      <Head>
        <title>{`Privacy Policy | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Privacy Policy for ${BUSINESS.name}. Learn how we collect, use, and protect your personal information.`} />
        <link rel="canonical" href={`${BUSINESS.website}/privacy-policy`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <section className="bg-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-300 mt-4">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-700 mb-8">
              {BUSINESS.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-navy-800 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Fill out a contact form or request a quote</li>
              <li>Schedule a service appointment</li>
              <li>Call us or send us an email</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This information may include your name, email address, phone number, physical address, and details about your plumbing needs.
            </p>

            <h3 className="text-xl font-semibold text-navy-800 mt-6 mb-3">Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Provide, operate, and maintain our plumbing services</li>
              <li>Respond to your inquiries and schedule appointments</li>
              <li>Send you service confirmations and follow-up communications</li>
              <li>Improve our website and customer experience</li>
              <li>Send promotional information with your consent</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve our website functionality</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings. However, disabling cookies may limit some website functionality.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Google Analytics</h2>
            <p className="text-gray-700 mb-4">
              We use Google Analytics to analyze website traffic and usage. Google Analytics collects information anonymously and reports website trends without identifying individual visitors. For more information about Google Analytics and how to opt out, visit{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Service providers who assist in our business operations</li>
              <li>Professional advisors (accountants, lawyers) as needed</li>
              <li>Law enforcement when required by law</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">California Privacy Rights (CCPA)</h2>
            <p className="text-gray-700 mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and how it is used, and the right to request deletion of your personal information.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated &quot;Last Updated&quot; date at the top of this page.
            </p>

            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
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

            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/contact" className="text-red-600 hover:underline font-semibold">
                ← Back to Contact Us
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PrivacyPolicyPage;
