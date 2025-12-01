'use client';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    _scheduler?: {
      show: (config: { schedulerId: string }) => void;
    };
  }
}

const SCHEDULER_ID = 'sched_dup1lncrqzibtdq0swxu05r8';

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
  const handleClick = () => {
    if (typeof window !== 'undefined' && window._scheduler) {
      window._scheduler.show({ schedulerId: SCHEDULER_ID });
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {showIcon && <Calendar className="w-4 h-4 mr-2" />}
      {children}
    </Button>
  );
}

export function openScheduler() {
  if (typeof window !== 'undefined' && window._scheduler) {
    window._scheduler.show({ schedulerId: SCHEDULER_ID });
  }
}
