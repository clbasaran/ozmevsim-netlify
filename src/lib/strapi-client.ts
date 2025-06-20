interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string;
  cache?: 'no-store' | 'force-cache' | 'no-cache';
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

class StrapiClient {
  private baseUrl: string;
  private apiToken: string;
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337';
    this.apiToken = process.env.STRAPI_API_TOKEN || '';
  }
  
  private async request<T>(
    endpoint: string,
    options: StrapiRequestOptions = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiToken) {
      defaultHeaders['Authorization'] = `Bearer ${this.apiToken}`;
    }
    
    const requestOptions: RequestInit = {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      cache: options.cache || 'no-store',
      next: options.next,
    };
    
    if (options.body) {
      requestOptions.body = options.body;
    }
    
    try {
      const response = await fetch(url, requestOptions);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Strapi request failed: ${response.status} ${response.statusText}. ${
            errorData.error?.message || ''
          }`
        );
      }
      
      return await response.json();
    } catch (error) {
      console.error('Strapi request error:', error);
      throw error;
    }
  }
  
  // GET requests
  async find<T>(
    resource: string,
    params?: Record<string, any>,
    options?: Pick<StrapiRequestOptions, 'cache' | 'next'>
  ): Promise<StrapiResponse<T[]>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T[]>(`/${resource}${queryString}`, options);
  }
  
  async findOne<T>(
    resource: string,
    id: string | number,
    params?: Record<string, any>,
    options?: Pick<StrapiRequestOptions, 'cache' | 'next'>
  ): Promise<StrapiResponse<T>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`/${resource}/${id}${queryString}`, options);
  }
  
  async findBySlug<T>(
    resource: string,
    slug: string,
    params?: Record<string, any>,
    options?: Pick<StrapiRequestOptions, 'cache' | 'next'>
  ): Promise<T | null> {
    const searchParams = new URLSearchParams({
      'filters[slug][$eq]': slug,
      ...params,
    });
    
    const response = await this.request<T[]>(`/${resource}?${searchParams.toString()}`, options);
    
    return response.data && response.data.length > 0 ? response.data[0] : null;
  }
  
  // POST requests
  async create<T>(
    resource: string,
    data: any
  ): Promise<StrapiResponse<T>> {
    return this.request<T>(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }
  
  // PUT requests
  async update<T>(
    resource: string,
    id: string | number,
    data: any
  ): Promise<StrapiResponse<T>> {
    return this.request<T>(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
  }
  
  // DELETE requests
  async delete<T>(
    resource: string,
    id: string | number
  ): Promise<StrapiResponse<T>> {
    return this.request<T>(`/${resource}/${id}`, {
      method: 'DELETE',
    });
  }
  
  // Utility methods
  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${this.baseUrl}${imagePath}`;
  }
  
  // Build populate params for complex queries
  buildPopulateParams(populate: string[]): Record<string, string> {
    const params: Record<string, string> = {};
    populate.forEach((field, index) => {
      params[`populate[${index}]`] = field;
    });
    return params;
  }
  
  // Build filter params
  buildFilterParams(filters: Record<string, any>): Record<string, string> {
    const params: Record<string, string> = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        // Handle nested filters
        Object.entries(value).forEach(([operator, operatorValue]) => {
          params[`filters[${key}][${operator}]`] = String(operatorValue);
        });
      } else {
        // Simple equality filter
        params[`filters[${key}][$eq]`] = String(value);
      }
    });
    
    return params;
  }
  
  // Build pagination params
  buildPaginationParams(page?: number, pageSize?: number): Record<string, string> {
    const params: Record<string, string> = {};
    
    if (page) {
      params['pagination[page]'] = String(page);
    }
    
    if (pageSize) {
      params['pagination[pageSize]'] = String(pageSize);
    }
    
    return params;
  }
  
  // Build sort params
  buildSortParams(sort: string[]): Record<string, string> {
    return {
      sort: sort.join(','),
    };
  }
  
  // Combined query builder
  buildQuery(options: {
    populate?: string[];
    filters?: Record<string, any>;
    sort?: string[];
    page?: number;
    pageSize?: number;
  }): Record<string, string> {
    let params: Record<string, string> = {};
    
    if (options.populate) {
      params = { ...params, ...this.buildPopulateParams(options.populate) };
    }
    
    if (options.filters) {
      params = { ...params, ...this.buildFilterParams(options.filters) };
    }
    
    if (options.sort) {
      params = { ...params, ...this.buildSortParams(options.sort) };
    }
    
    if (options.page || options.pageSize) {
      params = { ...params, ...this.buildPaginationParams(options.page, options.pageSize) };
    }
    
    return params;
  }
}

export const strapiClient = new StrapiClient();

// Helper functions for common queries
export async function getHeroSlides() {
  try {
    const response = await strapiClient.find('hero-sliders', 
      strapiClient.buildQuery({
        populate: ['backgroundImage', 'mobileImage', 'buttonPrimary', 'buttonSecondary'],
        filters: { isActive: true },
        sort: ['order:asc'],
      }),
      { 
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
}

export async function getServices(options?: {
  category?: string;
  featured?: boolean;
  limit?: number;
}) {
  try {
    const filters: Record<string, any> = { isActive: true };
    
    if (options?.category) {
      filters['category.slug'] = options.category;
    }
    
    if (options?.featured) {
      filters.isFeatured = true;
    }
    
    const response = await strapiClient.find('services',
      strapiClient.buildQuery({
        populate: ['coverImage', 'category', 'seo'],
        filters,
        sort: ['order:asc', 'createdAt:desc'],
        pageSize: options?.limit || 50,
      }),
      { 
        next: { revalidate: 300 }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    const service = await strapiClient.findBySlug('services', slug,
      strapiClient.buildQuery({
        populate: [
          'coverImage',
          'gallery', 
          'features',
          'process',
          'category',
          'faqs',
          'seo'
        ],
      }),
      { 
        next: { revalidate: 300 }
      }
    );
    
    return service;
  } catch (error) {
    console.error('Error fetching service by slug:', error);
    return null;
  }
}

export async function getProducts(options?: {
  category?: string;
  brand?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  try {
    const filters: Record<string, any> = { isActive: true };
    
    if (options?.category) {
      filters['category.slug'] = options.category;
    }
    
    if (options?.brand) {
      filters['brand.slug'] = options.brand;
    }
    
    if (options?.featured) {
      filters.isFeatured = true;
    }
    
    if (options?.search) {
      filters.name = { $containsi: options.search };
    }
    
    const response = await strapiClient.find('products',
      strapiClient.buildQuery({
        populate: ['mainImage', 'brand', 'category', 'seo'],
        filters,
        sort: ['order:asc', 'createdAt:desc'],
        page: options?.page || 1,
        pageSize: options?.pageSize || 12,
      }),
      { 
        next: { revalidate: 300 }
      }
    );
    
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [], meta: { pagination: { total: 0 } } };
  }
}

export async function getGalleryItems(options?: {
  category?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}) {
  try {
    const filters: Record<string, any> = {};
    
    if (options?.category) {
      filters.category = options.category;
    }
    
    if (options?.featured) {
      filters.isFeatured = true;
    }
    
    const response = await strapiClient.find('galleries',
      strapiClient.buildQuery({
        populate: ['images', 'service', 'beforeAfter.before', 'beforeAfter.after'],
        filters,
        sort: ['projectDate:desc'],
        page: options?.page || 1,
        pageSize: options?.pageSize || 9,
      }),
      { 
        next: { revalidate: 300 }
      }
    );
    
    return response;
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return { data: [], meta: { pagination: { total: 0 } } };
  }
} 