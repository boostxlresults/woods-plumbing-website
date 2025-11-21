interface PromoBannerProps {
  text?: string;
  showArrow?: boolean;
}

export function PromoBanner({ 
  text = 'FREE ESTIMATES & NO TRIP CHARGE. SAME DAY SERVICE',
  showArrow = true 
}: PromoBannerProps) {
  return (
    <section className="bg-red-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-lg md:text-xl font-bold uppercase flex items-center justify-center gap-3">
            <span>{text}</span>
            {showArrow && <span className="text-2xl">→</span>}
          </p>
        </div>
      </div>
    </section>
  );
}
