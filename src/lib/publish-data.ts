// Publish localStorage data to production

interface PublishResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export async function publishAllData(): Promise<PublishResponse> {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Only available in browser' };
  }

  const errors: string[] = [];
  const successes: string[] = [];

  // Get essential localStorage data keys
  const dataKeys = [
    'homeServices',
    'homeStats',  
    'homeTestimonials',
    'homeSettings'
  ];

  for (const key of dataKeys) {
    try {
      const data = localStorage.getItem(key);
      if (!data) continue;

      // For static sites, we can handle this with simple JSON storage
      const response = await fetch('/api/publish-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key,
          data: JSON.parse(data),
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        successes.push(key);
      } else {
        errors.push(`${key}: ${response.statusText}`);
      }
    } catch (error) {
      errors.push(`${key}: ${error}`);
    }
  }

  return {
    success: errors.length === 0,
    message: `Published ${successes.length} data sets${errors.length > 0 ? `, ${errors.length} errors` : ''}`,
    errors: errors.length > 0 ? errors : undefined
  };
}

export async function syncSingleData(key: string, data: any): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    const response = await fetch('/api/publish-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        data,
        timestamp: new Date().toISOString()
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Sync error:', error);
    return false;
  }
}

// Auto-sync when data changes
export function enableAutoSync() {
  if (typeof window === 'undefined') return;

  // Listen for storage changes
  window.addEventListener('storage', (e) => {
    if (e.key && e.newValue && ['homeServices', 'homeStats', 'homeTestimonials', 'homeSettings'].includes(e.key)) {
      syncSingleData(e.key, JSON.parse(e.newValue));
    }
  });

  // Listen for custom events
  ['servicesUpdated', 'statsUpdated', 'testimonialsUpdated', 'settingsUpdated'].forEach(event => {
    window.addEventListener(event, () => {
      const key = event.replace('Updated', '');
      const data = localStorage.getItem(key);
      if (data) {
        syncSingleData(key, JSON.parse(data));
      }
    });
  });
} 