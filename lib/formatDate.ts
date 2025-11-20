// Helper to format dates consistently on server and client to prevent hydration errors
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  
  // Use a consistent locale and timezone to prevent hydration mismatches
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'America/Phoenix' // Arizona timezone (no DST)
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'America/Phoenix'
  });
}
