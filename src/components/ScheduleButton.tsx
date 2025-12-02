'use client';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const SCHEDULER_ID = process.env.NEXT_PUBLIC_SERVICETITAN_SCHEDULER_ID || '';

declare global {
  interface Window {
    _scheduler?: {
      show: (config?: { schedulerId?: string }) => void;
    };
  }
}

const isWhitelistedDomain = (): boolean => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname === 'woodsplumbing.com' || 
         hostname === 'www.woodsplumbing.com' ||
         hostname.endsWith('.woodsplumbing.com');
};

interface ScheduleButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  fullWidth?: boolean;
}

export function ScheduleButton({
  variant = 'default',
  size = 'default',
  className = '',
  children = 'SCHEDULE ONLINE',
  showIcon = true,
  fullWidth = false,
}: ScheduleButtonProps) {
  const router = useRouter();
  const [canUseScheduler, setCanUseScheduler] = useState(false);
  
  useEffect(() => {
    setCanUseScheduler(isWhitelistedDomain() && typeof window !== 'undefined' && !!window._scheduler);
  }, []);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (canUseScheduler && window._scheduler) {
      try {
        window._scheduler.show({ schedulerId: SCHEDULER_ID });
      } catch (error) {
        console.error('Error opening scheduler:', error);
        router.push('/contact');
      }
    } else {
      router.push('/contact');
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`cursor-pointer ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {showIcon && <Calendar className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
}

export function openScheduler() {
  if (isWhitelistedDomain() && typeof window !== 'undefined' && window._scheduler) {
    window._scheduler.show({ schedulerId: SCHEDULER_ID });
  } else {
    window.location.href = '/contact';
  }
}
