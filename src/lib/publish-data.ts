// Publish localStorage data to production
import { STORAGE_KEYS } from './data';

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

  // Get all localStorage data
  const dataKeys = [
    STORAGE_KEYS.HERO_SLIDES,
    STORAGE_KEYS.SERVICES,
    STORAGE_KEYS.PRODUCTS,
    STORAGE_KEYS.REFERENCES
  ];

  for (const key of dataKeys) {
    try {
      const data = localStorage.getItem(key);
      if (!data) continue;

      // For static sites, we need to use Cloudflare Functions
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
    if (e.key && e.newValue && e.key.startsWith('ozmevsim_')) {
      syncSingleData(e.key, JSON.parse(e.newValue));
    }
  });

  // Listen for custom events
  ['heroSlidesUpdated', 'servicesUpdated', 'productsUpdated', 'referencesUpdated'].forEach(event => {
    window.addEventListener(event, () => {
      const key = event.replace('Updated', '').replace(/([A-Z])/g, '_$1').toLowerCase();
      const fullKey = `ozmevsim_${key}`;
      const data = localStorage.getItem(fullKey);
      if (data) {
        syncSingleData(fullKey, JSON.parse(data));
      }
    });
  });
} 