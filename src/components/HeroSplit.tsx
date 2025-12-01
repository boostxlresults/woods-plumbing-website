import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ScheduleButton } from '@/components/ScheduleButton';
import { trackPhoneClick } from '@/lib/analytics';
import { BUSINESS } from '@/lib/constants';
import { TrustBadges } from './TrustBadges';

interface HeroSplitProps {
  // Content
  title: string;
  subtitle?: string;
  ctaText?: string;
  phoneNumber?: string;
  buttonText?: string;
  buttonLink?: string;
  
  // Image
  imageSrc: string;
  imageAlt: string;
  
  // Layout options
  backgroundColor?: 'white' | 'gray';
  showBanner?: boolean;
  bannerText?: string;
  showTrustBadges?: boolean;
  
  // Analytics
  analyticsLocation?: string;
}

export function HeroSplit({
  title,
  subtitle,
  ctaText,
  phoneNumber = BUSINESS.phone,
  buttonText = 'SCHEDULE ONLINE',
  buttonLink = '/contact',
  imageSrc,
  imageAlt,
  backgroundColor = 'gray',
  showBanner = true,
  bannerText = 'FREE ESTIMATES & NO TRIP CHARGE. SAME DAY SERVICE',
  showTrustBadges = false,
  analyticsLocation = 'hero'
}: HeroSplitProps) {
  const bgClass = backgroundColor === 'white' ? 'bg-white' : 'bg-gray-100';
  
  return (
    <>
      {/* Hero Section - Roto-Rooter Split Layout */}
      <section className={bgClass}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            {/* Left Side: Image */}
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
                quality={90}
              />
            </div>

            {/* Right Side: Content */}
            <div className="py-12 md:py-16 px-6 md:px-12">
              <h1 className="text-navy-700 font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 uppercase">
                {title}
              </h1>
              
              {subtitle && (
                <p className="text-gray-700 text-lg md:text-xl mb-6">
                  {subtitle}
                </p>
              )}
              
              {ctaText && (
                <p className="text-red-600 font-bold text-2xl md:text-3xl mb-4">
                  {ctaText}
                </p>
              )}
              
              {phoneNumber && (
                <a 
                  href={`tel:${phoneNumber}`}
                  onClick={() => trackPhoneClick(analyticsLocation)}
                  className="block mb-6"
                >
                  <p className="text-navy-700 font-bold text-4xl md:text-5xl lg:text-6xl hover:text-red-600 transition-colors">
                    {phoneNumber}
                  </p>
                </a>
              )}
              
              <ScheduleButton 
                size="lg" 
                className="bg-navy-700 hover:bg-navy-800 text-white font-bold uppercase px-8 py-6 text-lg"
                showIcon={false}
              >
                <span>{buttonText}</span>
                <span className="text-xl ml-2">✓</span>
              </ScheduleButton>
            </div>
          </div>
        </div>
      </section>

      {/* Red Banner */}
      {showBanner && bannerText && (
        <section className="bg-red-600 text-white py-4">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-lg md:text-xl font-bold uppercase flex items-center justify-center gap-3">
                <span>{bannerText}</span>
                <span className="text-2xl">→</span>
              </p>
            </div>
          </div>
        </section>
      )}
      
      {/* Trust Badges */}
      {showTrustBadges && <TrustBadges />}
    </>
  );
}
