'use client';

import { Star, Quote } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';
import testimonials from '@/lib/data/testimonials.json';

interface GoogleReviewsWidgetProps {
  maxReviews?: number;
  showHeader?: boolean;
  compact?: boolean;
}

export const GoogleReviewsWidget: React.FC<GoogleReviewsWidgetProps> = ({
  maxReviews = 4,
  showHeader = true,
  compact = false,
}) => {
  const displayedReviews = testimonials.slice(0, maxReviews);

  return (
    <div className={`bg-white rounded-xl shadow-lg ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
      {showHeader && (
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="w-6 h-6 fill-yellow-400 text-yellow-400" 
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">{BUSINESS.trust.displayRating}</span>
          </div>
          <p className="text-gray-600">
            Based on {BUSINESS.trust.totalReviews}+ reviews on Google
          </p>
          <a
            href={BUSINESS.social.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-2"
          >
            View all reviews on Google
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      )}

      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        {displayedReviews.map((review) => (
          <div 
            key={review.id} 
            className="bg-gray-50 rounded-lg p-4 border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <Quote className="w-8 h-8 text-navy-200 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${star <= review.ratingValue ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-3 line-clamp-4">
                  "{review.reviewBody}"
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium text-gray-900">{review.author}</span>
                  <span>{review.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  <span>{review.reviewPlatform}</span>
                  <span>•</span>
                  <span>{review.service}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a
          href={BUSINESS.social.googleBusiness}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white border-2 border-navy-700 text-navy-700 px-6 py-3 rounded-lg font-semibold hover:bg-navy-700 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Leave Us a Review
        </a>
      </div>
    </div>
  );
};
