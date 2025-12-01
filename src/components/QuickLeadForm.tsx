'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BUSINESS } from '@/lib/constants';

const quickLeadSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  service: z.string().optional(),
  website: z.string().optional(),
});

type QuickLeadFormData = z.infer<typeof quickLeadSchema>;

interface QuickLeadFormProps {
  variant?: 'inline' | 'sidebar' | 'floating';
  title?: string;
  className?: string;
}

export const QuickLeadForm: React.FC<QuickLeadFormProps> = ({
  variant = 'inline',
  title = 'Get a Free Estimate',
  className = '',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickLeadFormData>({
    resolver: zodResolver(quickLeadSchema),
  });

  const onSubmit = async (data: QuickLeadFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          email: '',
          message: `Quick lead form submission. Service interest: ${data.service || 'General inquiry'}`,
          source: 'quick-lead-form',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Unable to submit. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 text-center ${className}`}>
        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">Thank you! We&apos;ll call you shortly.</p>
      </div>
    );
  }

  const formClasses = {
    inline: 'bg-navy-700 text-white rounded-lg p-4 md:p-6',
    sidebar: 'bg-white border border-gray-200 rounded-lg p-4 shadow-sm',
    floating: 'bg-white rounded-xl shadow-2xl p-4 md:p-6 border-t-4 border-copper-500',
  };

  return (
    <div className={`${formClasses[variant]} ${className}`}>
      <h3 className={`font-display text-lg md:text-xl font-bold mb-3 ${variant === 'inline' ? 'text-white' : 'text-navy-900'}`}>
        {title}
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            {...register('name')}
            className={`w-full px-3 py-2 rounded-md border text-sm ${
              variant === 'inline' 
                ? 'bg-white/10 border-white/20 text-white placeholder-white/60' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-copper-500`}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register('phone')}
            className={`w-full px-3 py-2 rounded-md border text-sm ${
              variant === 'inline' 
                ? 'bg-white/10 border-white/20 text-white placeholder-white/60' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-copper-500`}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <select
            {...register('service')}
            className={`w-full px-3 py-2 rounded-md border text-sm ${
              variant === 'inline' 
                ? 'bg-white/10 border-white/20 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-copper-500`}
          >
            <option value="">Select a Service</option>
            <option value="Emergency Plumbing">Emergency Plumbing</option>
            <option value="Water Heater">Water Heater</option>
            <option value="Drain Cleaning">Drain Cleaning</option>
            <option value="Leak Repair">Leak Repair</option>
            <option value="Gas Line">Gas Line Services</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Honeypot anti-spam field */}
        <div className="absolute -left-[9999px] opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true">
          <input
            type="text"
            {...register('website')}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-copper-500 hover:bg-copper-600 text-white font-semibold py-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Free Quote
            </>
          )}
        </Button>
      </form>

      <div className="mt-3 text-center">
        <p className={`text-xs ${variant === 'inline' ? 'text-white/70' : 'text-gray-500'}`}>
          Or call now for immediate service
        </p>
        <a
          href={`tel:${BUSINESS.phone}`}
          className={`inline-flex items-center gap-1 font-bold text-sm mt-1 ${
            variant === 'inline' ? 'text-copper-400 hover:text-copper-300' : 'text-navy-700 hover:text-navy-900'
          }`}
        >
          <Phone className="w-4 h-4" />
          {BUSINESS.phone}
        </a>
      </div>
    </div>
  );
};
