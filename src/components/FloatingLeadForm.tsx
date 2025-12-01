'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { QuickLeadForm } from './QuickLeadForm';

export const FloatingLeadForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-40 bg-copper-500 hover:bg-copper-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
          aria-label="Get a free estimate"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Floating Form Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-5 duration-300">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 z-10 bg-gray-800 text-white p-1 rounded-full shadow-lg hover:bg-gray-700"
              aria-label="Close form"
            >
              <X className="w-4 h-4" />
            </button>
            <QuickLeadForm variant="floating" title="Get Your Free Estimate" />
          </div>
        </div>
      )}
    </>
  );
};
