import { ApiResponse } from '@/types/api';
import toast from 'react-hot-toast';

interface RequestOptions extends RequestInit {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
}

class ApiClient {
  private baseUrl: string;
  
  constructor() {
    // For Netlify, use /.netlify/functions
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/.netlify/functions';
  }
  
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { 
      showErrorToast = true, 
      showSuccessToast = false, 
      successMessage,
      ...fetchOptions 
    } = options;
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });
      
      const data: ApiResponse<T> = await response.json();
      
      if (!response.ok) {
        if (showErrorToast) {
          toast.error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        throw new Error(data.error || 'API request failed');
      }
      
      if (showSuccessToast && data.success) {
        toast.success(successMessage || 'İşlem başarıyla tamamlandı');
      }
      
      return data;
    } catch (error) {
      console.error('API Client Error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError = 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.';
        if (showErrorToast) {
          toast.error(networkError);
        }
        throw new Error(networkError);
      }
      
      throw error;
    }
  }
  
  async get<T>(
    endpoint: string, 
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'GET',
      ...options 
    });
  }
  
  async post<T>(
    endpoint: string, 
    data?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }
  
  async put<T>(
    endpoint: string, 
    data?: any,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }
  
  async delete<T>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'DELETE',
      ...options 
    });
  }
  
  // Helper method for URL with query parameters
  buildUrl(endpoint: string, params?: Record<string, any>): string {
    if (!params) return endpoint;
    
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, String(item)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  }
}

export const apiClient = new ApiClient();

// Specialized API functions
export const contactApi = {
  submit: async (data: {
    name: string;
    email: string;
    phone: string;
    subject?: string;
    message: string;
    service?: string;
    consent: boolean;
  }) => {
    return apiClient.post('/contact', data, {
      showSuccessToast: true,
      successMessage: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    });
  },
};

export const productsApi = {
  list: async (params?: {
    category?: string;
    brand?: string;
    featured?: boolean;
    search?: string;
    page?: number;
    pageSize?: number;
    sort?: string;
  }) => {
    const url = apiClient.buildUrl('/products', params);
    return apiClient.get(url, { showErrorToast: false });
  },
  
  getById: async (id: string) => {
    return apiClient.get(`/products/${id}`, { showErrorToast: false });
  },
  
  getBySlug: async (slug: string) => {
    return apiClient.get(`/products/slug/${slug}`, { showErrorToast: false });
  },
};

export const servicesApi = {
  list: async (params?: {
    category?: string;
    featured?: boolean;
    search?: string;
  }) => {
    const url = apiClient.buildUrl('/services', params);
    return apiClient.get(url, { showErrorToast: false });
  },
  
  getBySlug: async (slug: string) => {
    return apiClient.get(`/services/${slug}`, { showErrorToast: false });
  },
};

export const galleryApi = {
  list: async (params?: {
    category?: string;
    featured?: boolean;
    page?: number;
    pageSize?: number;
  }) => {
    const url = apiClient.buildUrl('/gallery', params);
    return apiClient.get(url, { showErrorToast: false });
  },
  
  getById: async (id: string) => {
    return apiClient.get(`/gallery/${id}`, { showErrorToast: false });
  },
};

export const newsletterApi = {
  subscribe: async (data: {
    email: string;
    name?: string;
  }) => {
    return apiClient.post('/newsletter', data, {
      showSuccessToast: true,
      successMessage: 'Bülten aboneliğiniz başarıyla oluşturuldu.',
    });
  },
};

export const statisticsApi = {
  get: async () => {
    return apiClient.get('/statistics', { showErrorToast: false });
  },
};

export const searchApi = {
  global: async (query: string, filters?: {
    type?: 'all' | 'products' | 'services' | 'gallery';
    limit?: number;
  }) => {
    const params = { query, ...filters };
    const url = apiClient.buildUrl('/search', params);
    return apiClient.get(url, { showErrorToast: false });
  },
};

// React hooks for API calls
import { useState, useEffect } from 'react';

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);
  
  return { data, loading, error, refetch: fetchData };
}

export function useAsyncApi<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const execute = async (apiCall: () => Promise<ApiResponse<T>>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      return response.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, error, execute };
} 