// Data service for fetching data from D1 database via API endpoints
// This service replaces the localStorage-based data.ts for production use

export interface Product {
  id: number;
  title: string;
  description: string;
  price?: number;
  image_url: string;
  category: string;
  brand: string;
  model: string;
  features: string[];
  specifications: any;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: string;
  status: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  avatar_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  replied_at?: string;
  created_at: string;
}

export interface SiteSetting {
  key: string;
  value: any;
  type: string;
  category: string;
  description: string;
}

const API_BASE = typeof window !== 'undefined' ? window.location.origin : '';

export class DataService {
  private static instance: DataService;

  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Products API - Temporarily disabled due to static export limitations
  async getProducts(): Promise<any[]> {
    try {
      // Since /api/products is not working in static export mode,
      // we'll return empty array for now and handle this differently
      console.warn('Products API not available in static export mode');
      return [];
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  }

  async createProduct(productData: any): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      // Products API not available in static export mode
      console.warn('Products API not available in static export mode');
      return { success: false, error: 'API not available in static export mode' };
    } catch (error) {
      console.error('Failed to create product:', error);
      return { success: false, error: 'Failed to create product' };
    }
  }

  async updateProduct(id: string, productData: any): Promise<{ success: boolean; error?: string }> {
    try {
      // Products API not available in static export mode
      console.warn('Products API not available in static export mode');
      return { success: false, error: 'API not available in static export mode' };
    } catch (error) {
      console.error('Failed to update product:', error);
      return { success: false, error: 'Failed to update product' };
    }
  }

  async deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Products API not available in static export mode
      console.warn('Products API not available in static export mode');
      return { success: false, error: 'API not available in static export mode' };
    } catch (error) {
      console.error('Failed to delete product:', error);
      return { success: false, error: 'Failed to delete product' };
    }
  }

  // Blog API - Working
  async getBlogPosts(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/api/blog`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      return [];
    }
  }

  async createBlogPost(postData: any): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const response = await fetch(`${API_BASE}/api/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create blog post:', error);
      return { success: false, error: 'Failed to create blog post' };
    }
  }

  // FAQ API - Working  
  async getFAQs(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/api/faq`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      return [];
    }
  }

  async createFAQ(faqData: any): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const response = await fetch(`${API_BASE}/api/faq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(faqData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create FAQ:', error);
      return { success: false, error: 'Failed to create FAQ' };
    }
  }

  // Contact API - Working
  async submitContact(contactData: any): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to submit contact:', error);
      return { success: false, error: 'Failed to submit contact' };
    }
  }

  // Testimonials API
  async getTestimonials(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/api/testimonials`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      return [];
    }
  }

  async createTestimonial(testimonialData: any): Promise<{ success: boolean; id?: string; error?: string }> {
    try {
      const response = await fetch(`${API_BASE}/api/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create testimonial:', error);
      return { success: false, error: 'Failed to create testimonial' };
    }
  }
}

// Utility function to check if we're in development mode
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

// Utility function to check if we're in static mode (no API available)
export function isStaticMode(): boolean {
  return typeof window !== 'undefined' && !window.location.href.includes('localhost');
} 