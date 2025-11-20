import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { Textarea } from '../src/components/ui/textarea';
import { Label } from '../src/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent } from '../src/components/ui/card';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import servicesData from '../lib/data/services.json';
import locationsData from '../lib/data/locations.json';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.string().optional(),
  location: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Head>
        <title>{`Contact Us - Get Free Estimate | ${BUSINESS.name}`}</title>
        <meta name="description" content={`Contact ${BUSINESS.name} for expert plumbing service in Southern Arizona. Call ${BUSINESS.phone} or request a free estimate online. 24/7 emergency service available.`} />
        <link rel="canonical" href={`${BUSINESS.website}/contact`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Contact ${BUSINESS.name} | Get Free Estimate`} />
        <meta property="og:description" content={`Call ${BUSINESS.phone} or request a free estimate online. ${BUSINESS.hours.emergency}.`} />
        <meta property="og:url" content={`${BUSINESS.website}/contact`} />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {`Contact ${BUSINESS.name}`}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get a free estimate or call us now for immediate service
            </p>
            <Link href={`tel:${BUSINESS.phone}`}>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                <Phone className="mr-2" />
                Call {BUSINESS.phone}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a href={`tel:${BUSINESS.phone}`} className="text-blue-600 hover:text-blue-700">
                        {BUSINESS.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href={`mailto:${BUSINESS.email}`} className="text-blue-600 hover:text-blue-700">
                        {BUSINESS.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">{`${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Hours</p>
                      <p className="text-gray-600">{BUSINESS.hours.weekday}</p>
                      <p className="text-gray-600">{BUSINESS.hours.saturday}</p>
                      <p className="text-red-600 font-semibold mt-1">{BUSINESS.hours.emergency}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">24/7 Emergency Service</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Plumbing emergency? Call us now for immediate assistance.
                  </p>
                  <Link href={`tel:${BUSINESS.phone}`}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900">
                      <Phone className="mr-2" />
                      Emergency: {BUSINESS.phone}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Get a Free Estimate</CardTitle>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Your full name"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="your.email@example.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="(520) 555-1234"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <Label htmlFor="service">Service Needed</Label>
                      <select
                        id="service"
                        {...register('service')}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option value="">Select a service...</option>
                        {servicesData.slice(0, 20).map((service) => (
                          <option key={service.slug} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <Label htmlFor="location">Your Location</Label>
                      <select
                        id="location"
                        {...register('location')}
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option value="">Select your city...</option>
                        {locationsData.map((location) => (
                          <option key={location.slug} value={location.name}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Please describe your plumbing needs..."
                        rows={5}
                        className={errors.message ? 'border-red-500' : ''}
                      />
                      {errors.message && (
                        <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                      <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-900">Thank you for contacting us!</p>
                          <p className="text-sm text-green-700">We'll get back to you within 24 hours.</p>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === 'error' && (
                      <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-900">Error</p>
                          <p className="text-sm text-red-700">{errorMessage}</p>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
