'use client';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SCHEDULER_ID = process.env.NEXT_PUBLIC_SERVICETITAN_SCHEDULER_ID || '';
const API_KEY = process.env.NEXT_PUBLIC_SERVICETITAN_API_KEY || '';

declare global {
  interface Window {
    _scheduler?: {
      show: (config?: { schedulerId?: string }) => void;
    };
    _serviceTitanLoading?: boolean;
    _serviceTitanLoaded?: boolean;
  }
}

function loadServiceTitanScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window not available'));
      return;
    }

    if (window._serviceTitanLoaded && window._scheduler) {
      resolve();
      return;
    }

    if (window._serviceTitanLoading) {
      const checkInterval = setInterval(() => {
        if (window._serviceTitanLoaded && window._scheduler) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Timeout waiting for ServiceTitan'));
      }, 10000);
      return;
    }

    window._serviceTitanLoading = true;

    const script = document.createElement('script');
    script.id = 'se-widget-embed';
    script.src = 'https://embed.scheduler.servicetitan.com/scheduler-v1.js';
    script.defer = true;
    script.setAttribute('data-api-key', API_KEY);
    script.setAttribute('data-schedulerid', SCHEDULER_ID);

    script.onload = () => {
      const checkScheduler = setInterval(() => {
        if (window._scheduler) {
          clearInterval(checkScheduler);
          window._serviceTitanLoaded = true;
          window._serviceTitanLoading = false;
          resolve();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkScheduler);
        window._serviceTitanLoading = false;
        reject(new Error('Scheduler not initialized'));
      }, 5000);
    };

    script.onerror = () => {
      window._serviceTitanLoading = false;
      reject(new Error('Failed to load ServiceTitan script'));
    };

    document.head.appendChild(script);
  });
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
  const [loading, setLoading] = useState(false);
  
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!SCHEDULER_ID || !API_KEY) {
      router.push('/contact');
      return;
    }

    if (window._scheduler) {
      try {
        window._scheduler.show({ schedulerId: SCHEDULER_ID });
        return;
      } catch (error) {
        console.error('Error opening scheduler:', error);
      }
    }

    setLoading(true);
    try {
      await loadServiceTitanScript();
      if (window._scheduler) {
        window._scheduler.show({ schedulerId: SCHEDULER_ID });
      } else {
        router.push('/contact');
      }
    } catch (error) {
      console.error('Error loading scheduler:', error);
      router.push('/contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={loading}
      className={`cursor-pointer ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {showIcon && <Calendar className="w-4 h-4 mr-2" />}
      {loading ? 'Loading...' : children}
    </Button>
  );
}

export async function openScheduler() {
  if (typeof window === 'undefined') return;
  
  if (window._scheduler && SCHEDULER_ID) {
    window._scheduler.show({ schedulerId: SCHEDULER_ID });
    return;
  }

  try {
    await loadServiceTitanScript();
    if (window._scheduler) {
      window._scheduler.show({ schedulerId: SCHEDULER_ID });
    } else {
      window.location.href = '/contact';
    }
  } catch {
    window.location.href = '/contact';
  }
}
