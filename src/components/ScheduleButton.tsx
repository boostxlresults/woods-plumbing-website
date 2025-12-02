'use client';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const SCHEDULER_ID = process.env.NEXT_PUBLIC_SERVICETITAN_SCHEDULER_ID || '';

declare global {
  interface Window {
    _scheduler?: {
      show: (config?: { schedulerId?: string }) => void;
    };
  }
}

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
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined' && window._scheduler && SCHEDULER_ID) {
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
  if (typeof window !== 'undefined' && window._scheduler && SCHEDULER_ID) {
    window._scheduler.show({ schedulerId: SCHEDULER_ID });
  } else {
    window.location.href = '/contact';
  }
}
