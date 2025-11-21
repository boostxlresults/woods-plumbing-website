import { Star, Shield, Award, ThumbsUp } from 'lucide-react';
import { BUSINESS } from '@/lib/constants';

export function TrustBadges() {
  return (
    <section className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Star Rating */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-5 h-5 fill-red-600 text-red-600" 
                />
              ))}
            </div>
            <p className="font-bold text-navy-900 text-lg">{BUSINESS.trust.displayRating}/5.0</p>
            <p className="text-sm text-gray-600">{BUSINESS.trust.totalReviews}+ Reviews</p>
          </div>

          {/* BBB Rating */}
          <div className="flex flex-col items-center text-center">
            <Shield className="w-10 h-10 text-red-600 mb-2" />
            <p className="font-bold text-navy-900 text-lg">BBB {BUSINESS.trust.bbbRating}</p>
            <p className="text-sm text-gray-600">Rated</p>
          </div>

          {/* Licensed */}
          <div className="flex flex-col items-center text-center">
            <Award className="w-10 h-10 text-red-600 mb-2" />
            <p className="font-bold text-navy-900 text-lg">Licensed</p>
            <p className="text-sm text-gray-600">ROC #{BUSINESS.trust.license}</p>
          </div>

          {/* Years in Business */}
          <div className="flex flex-col items-center text-center">
            <ThumbsUp className="w-10 h-10 text-red-600 mb-2" />
            <p className="font-bold text-navy-900 text-lg">{BUSINESS.trust.yearsInBusiness}+ Years</p>
            <p className="text-sm text-gray-600">In Business</p>
          </div>
        </div>
      </div>
    </section>
  );
}
