// Storage synchronization utility
const API_BASE = '/api';

export class StorageSync {
  private static instance: StorageSync;
  private syncQueue: Map<string, any> = new Map();
  private isSyncing = false;

  static getInstance(): StorageSync {
    if (!StorageSync.instance) {
      StorageSync.instance = new StorageSync();
    }
    return StorageSync.instance;
  }

  // Save to both localStorage and server
  async saveData(key: string, data: any): Promise<boolean> {
    try {
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
      }

      // Queue for server sync
      this.syncQueue.set(key, data);
      
      // Trigger sync
      if (!this.isSyncing) {
        this.startSync();
      }

      return true;
    } catch (error) {
      console.error('Save error:', error);
      return false;
    }
  }

  // Load data (try server first, fallback to localStorage)
  async loadData(key: string): Promise<any> {
    try {
      // Try to load from server first
      const response = await fetch(`${API_BASE}/data-kv?key=${key}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          // Update localStorage with server data
          if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(result.data));
          }
          return result.data;
        }
      }
    } catch (error) {
      console.warn('Server load failed, using localStorage:', error);
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('localStorage parse error:', error);
        }
      }
    }

    return null;
  }

  // Start syncing queued items to server
  private async startSync() {
    if (this.isSyncing || this.syncQueue.size === 0) return;
    
    this.isSyncing = true;

    try {
      for (const entry of Array.from(this.syncQueue.entries())) {
        const [key, data] = entry;
        try {
          const response = await fetch(`${API_BASE}/data-kv?key=${key}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            this.syncQueue.delete(key);
          }
        } catch (error) {
          console.error(`Sync failed for ${key}:`, error);
        }
      }
    } finally {
      this.isSyncing = false;
    }

    // If there are still items in queue, retry after delay
    if (this.syncQueue.size > 0) {
      setTimeout(() => this.startSync(), 5000);
    }
  }

  // Force sync all localStorage data to server
  async syncAllData() {
    if (typeof window === 'undefined') return;

    const keys = [
      'ozmevsim_hero_slides',
      'ozmevsim_services', 
      'ozmevsim_products',
      'ozmevsim_references',
      'team-members',
      'homeStats',
      'homeTestimonials',
      'contactMessages',
      'ozmevsim_contact_info',
      'ozmevsim_locations',
      'ozmevsim_faqs'
    ];

    for (const key of keys) {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          await this.saveData(key, parsed);
        } catch (error) {
          console.error(`Failed to sync ${key}:`, error);
        }
      }
    }
  }
}

// Convenience functions
export const storageSync = StorageSync.getInstance();

export async function saveToStorage(key: string, data: any) {
  return await storageSync.saveData(key, data);
}

export async function loadFromStorage(key: string) {
  return await storageSync.loadData(key);
}

// Auto-sync on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    storageSync.syncAllData();
  });
} 