export * from './api';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  category: string;
  price?: {
    min: number;
    max: number;
    unit: string;
  };
  duration?: string;
  warranty?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  featured?: boolean;
  projectDate?: string;
  location?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  service?: string;
  location?: string;
  avatar?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
} 