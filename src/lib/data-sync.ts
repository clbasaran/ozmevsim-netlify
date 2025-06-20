// Real-time data synchronization for admin changes
export interface SyncResponse {
  success: boolean;
  message: string;
  changes?: string[];
}

export class AdminDataSync {
  private static instance: AdminDataSync;
  private pendingChanges: Map<string, any> = new Map();
  private isProduction = typeof window !== 'undefined' && 
    (window.location.hostname === 'ozmevsim.com' || 
     window.location.hostname.includes('ozmevsim-website.pages.dev'));

  static getInstance(): AdminDataSync {
    if (!AdminDataSync.instance) {
      AdminDataSync.instance = new AdminDataSync();
    }
    return AdminDataSync.instance;
  }

  // Listen for admin changes
  startListening() {
    if (typeof window === 'undefined') return;

    console.log('🚀 Admin sync system started');
    console.log('🏠 Hostname:', window.location.hostname);
    console.log('🌍 Is production:', this.isProduction);

    // Monitor localStorage changes
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = (key: string, value: string) => {
      console.log('📝 LocalStorage set:', key);
      originalSetItem.call(localStorage, key, value);
      
      if (key.startsWith('ozmevsim_')) {
        console.log('🎯 Handling admin change for:', key);
        this.handleAdminChange(key, value);
      }
    };

    // Listen for admin panel events
    window.addEventListener('adminDataChanged', (event: any) => {
      console.log('📡 Admin data changed event:', event.detail);
      this.handleAdminChange(event.detail.key, event.detail.value);
    });
  }

  // Handle admin panel changes
  private async handleAdminChange(key: string, value: string) {
    console.log('🔄 handleAdminChange called:', { key, isProduction: this.isProduction });
    
    if (this.isProduction) {
      try {
        console.log('✅ Processing production change...');
        const data = JSON.parse(value);
        this.pendingChanges.set(key, data);
        
        // Now that API routes work, auto-sync to server
        console.log('📡 Starting API sync...');
        await this.generateStaticData();
        
        // Show success notification
        console.log('🎉 Showing success notification...');
        this.notifyAutoSyncSuccess();
      } catch (error) {
        console.error('❌ Admin change handling error:', error);
      }
    } else {
      console.log('⚠️ Not in production, skipping sync');
    }
  }

  // Generate updated static data files
  private async generateStaticData(): Promise<void> {
    try {
      const staticDataUpdates: any = {};
      
      for (const [key, data] of Array.from(this.pendingChanges)) {
        switch (key) {
          case 'ozmevsim_products':
            staticDataUpdates.STATIC_PRODUCTS = this.formatProductsForStatic(data);
            break;
          case 'ozmevsim_hero_slides':
            staticDataUpdates.STATIC_HERO_SLIDES = data;
            break;
          case 'ozmevsim_services':
            staticDataUpdates.STATIC_SERVICES = data;
            break;
          case 'ozmevsim_references':
            staticDataUpdates.STATIC_REFERENCES = data;
            break;
        }
      }

      // Generate file content
      if (Object.keys(staticDataUpdates).length > 0) {
        await this.updateStaticDataFile(staticDataUpdates);
      }
    } catch (error) {
      console.error('Static data generation error:', error);
    }
  }

  // Format products for static data
  private formatProductsForStatic(products: any[]): any[] {
    return products.map((product, index) => ({
      id: product.id || (index + 1).toString(),
      name: product.name,
      brand: product.brand || product.subcategory,
      category: product.category,
      description: product.description || product.shortDescription,
      image: product.images?.[0] || product.image || `/uploads/products/default-${index + 1}.png`,
      features: product.features || [],
      specifications: this.convertSpecsToObject(product.specifications),
      inStock: product.stockStatus === 'in-stock',
      featured: product.featured || false,
      tags: product.tags || []
    }));
  }

  // Convert specifications array to object
  private convertSpecsToObject(specs: any): Record<string, string> {
    if (Array.isArray(specs)) {
      const result: Record<string, string> = {};
      specs.forEach(spec => {
        if (spec.key && spec.value) {
          result[spec.key] = spec.value;
        }
      });
      return result;
    }
    return specs || {};
  }

  // Update static data file
  private async updateStaticDataFile(updates: any): Promise<void> {
    try {
      console.log('🔄 Syncing to D1 database...');
      
      // Sync products to D1 database
      if (updates.STATIC_PRODUCTS) {
        await this.syncProductsToD1(updates.STATIC_PRODUCTS);
      }
      
      // Also save to admin-sync endpoint for logging
      const response = await fetch('/api/admin-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates,
          timestamp: new Date().toISOString(),
          source: 'admin-panel'
        })
      });

      if (response.ok) {
        console.log('✅ Static data updates saved for developer');
      }
    } catch (error) {
      console.error('Static data file update error:', error);
    }
  }

  // Sync products to D1 database
  private async syncProductsToD1(products: any[]): Promise<void> {
    try {
      console.log('📦 Starting D1 products sync...', products.length, 'products');
      
      // Get current products from localStorage to track deletions
      let currentProducts = [];
      let deletedProducts = [];
      
      try {
        const productsData = localStorage.getItem('ozmevsim_products');
        const deletedData = localStorage.getItem('ozmevsim_deleted_products');
        
        if (productsData) {
          currentProducts = JSON.parse(productsData);
        }
        
        if (deletedData) {
          deletedProducts = JSON.parse(deletedData);
        }
      } catch (error) {
        console.error('Error reading localStorage:', error);
      }

      console.log('📊 Current products count:', currentProducts.length);
      console.log('🗑️ Deleted products count:', deletedProducts.length);

      // First, handle deletions
      if (deletedProducts.length > 0) {
        for (const deletedProduct of deletedProducts) {
          try {
            const deleteResponse = await fetch('/api/products', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: deletedProduct.id })
            });

            if (deleteResponse.ok) {
              console.log(`✅ Deleted product from D1: ${deletedProduct.name} (ID: ${deletedProduct.id})`);
            } else {
              const error = await deleteResponse.text();
              console.error(`❌ Failed to delete product ${deletedProduct.id}:`, error);
            }
          } catch (error) {
            console.error(`❌ Error deleting product ${deletedProduct.id}:`, error);
          }
        }
        
        // Clear deleted products after processing
        localStorage.setItem('ozmevsim_deleted_products', JSON.stringify([]));
      }

      // Then, sync current products (add/update)
      for (const product of currentProducts) {
        try {
          // Check if product exists
          const checkResponse = await fetch(`/api/products?id=${product.id}`);
          
          if (checkResponse.status === 404) {
            // Product doesn't exist, create it
            const createResponse = await fetch('/api/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: product.name,
                brand: product.brand || product.subcategory || 'Unknown',
                category: product.category || 'Uncategorized',
                description: product.description || product.shortDescription || '',
                image_url: product.images?.[0] || product.image || '',
                features: JSON.stringify(product.features || []),
                specifications: JSON.stringify(product.specifications || {}),
                price: product.price || 0,
                status: product.stockStatus === 'in-stock' ? 'active' : 'inactive'
              })
            });

            if (createResponse.ok) {
              const created = await createResponse.json();
              console.log(`✅ Created product in D1: ${product.name} (ID: ${created.id})`);
            } else {
              const error = await createResponse.text();
              console.error(`❌ Failed to create product ${product.name}:`, error);
            }
          } else if (checkResponse.ok) {
            // Product exists, update it
            const updateResponse = await fetch('/api/products', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: product.id,
                title: product.name,
                brand: product.brand || product.subcategory || 'Unknown',
                category: product.category || 'Uncategorized',
                description: product.description || product.shortDescription || '',
                image_url: product.images?.[0] || product.image || '',
                features: JSON.stringify(product.features || []),
                specifications: JSON.stringify(product.specifications || {}),
                price: product.price || 0,
                status: product.stockStatus === 'in-stock' ? 'active' : 'inactive'
              })
            });

            if (updateResponse.ok) {
              console.log(`✅ Updated product in D1: ${product.name} (ID: ${product.id})`);
            } else {
              const error = await updateResponse.text();
              console.error(`❌ Failed to update product ${product.id}:`, error);
            }
          }
        } catch (error) {
          console.error(`❌ Error syncing product ${product.id}:`, error);
        }
      }

      console.log('🎉 D1 products sync completed!');
    } catch (error) {
      console.error('❌ D1 sync error:', error);
    }
  }

  // Notify that auto sync was successful
  private notifyAutoSyncSuccess() {
    // Show admin notification
    if (typeof window !== 'undefined') {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      notification.innerHTML = `
        ✅ Değişiklik kaydedildi!<br>
        <small>Canlı sitede otomatik güncellenecek.</small>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  }

  // Export current admin data for manual integration
  async exportAdminData(): Promise<string> {
    const exportData: any = {
      products: [],
      heroSlides: [],
      services: [],
      references: [],
      timestamp: new Date().toISOString(),
      source: 'admin-export'
    };

    if (typeof window !== 'undefined') {
      // Collect all admin data
      const keys = ['ozmevsim_products', 'ozmevsim_hero_slides', 'ozmevsim_services', 'ozmevsim_references'];
      
      for (const key of keys) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsed = JSON.parse(data);
            switch (key) {
              case 'ozmevsim_products':
                exportData.products = this.formatProductsForStatic(parsed);
                break;
              case 'ozmevsim_hero_slides':
                exportData.heroSlides = parsed;
                break;
              case 'ozmevsim_services':
                exportData.services = parsed;
                break;
              case 'ozmevsim_references':
                exportData.references = parsed;
                break;
            }
          } catch (error) {
            console.error(`Error parsing ${key}:`, error);
          }
        }
      }
    }

    return JSON.stringify(exportData, null, 2);
  }

  // Clear pending changes
  clearPendingChanges() {
    this.pendingChanges.clear();
  }
}

// Initialize the sync system
export function initializeAdminSync() {
  console.log('🎬 initializeAdminSync called');
  
  if (typeof window !== 'undefined') {
    console.log('🌐 Window is available, starting sync...');
    const sync = AdminDataSync.getInstance();
    sync.startListening();
  } else {
    console.log('❌ Window not available (SSR)');
  }
}

// Export function for admin panels
export async function exportAdminChanges(): Promise<void> {
  const sync = AdminDataSync.getInstance();
  const exportData = await sync.exportAdminData();
  
  // Download as JSON file
  const blob = new Blob([exportData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `admin-changes-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
} 