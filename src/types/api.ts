export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    pageSize?: number;
    totalPages?: number;
  };
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service?: string;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
  source: 'website' | 'phone' | 'email' | 'referral';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  description: string;
  image: string;
  features: string[];
  inStock: boolean;
  rating: number;
  slug?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  image: string;
  category: string;
  tags: string[];
} 