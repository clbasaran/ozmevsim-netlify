// KV-based data management for Cloudflare Pages
import { saveToStorage, loadFromStorage } from './storage-sync';

// Data types
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  stats: Array<{ value: string; label: string }>;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  isActive: boolean;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  isActive: boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  brand: string;
  features: string[];
  isActive: boolean;
}

// Storage keys
export const STORAGE_KEYS = {
  HERO_SLIDES: 'ozmevsim_hero_slides',
  SERVICES: 'ozmevsim_services',
  PRODUCTS: 'ozmevsim_products',
  REFERENCES: 'ozmevsim_references',
  TEAM_MEMBERS: 'team-members',
  HOME_STATS: 'homeStats',
  HOME_TESTIMONIALS: 'homeTestimonials',
  CONTACT_MESSAGES: 'contactMessages',
  CONTACT_INFO: 'ozmevsim_contact_info',
  LOCATIONS: 'ozmevsim_locations',
  FAQS: 'ozmevsim_faqs'
};

// Hero Slides functions
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await loadFromStorage(STORAGE_KEYS.HERO_SLIDES);
  return data ? data.filter((slide: HeroSlide) => slide.isActive) : [];
}

export async function getAllHeroSlides(): Promise<HeroSlide[]> {
  const data = await loadFromStorage(STORAGE_KEYS.HERO_SLIDES);
  return data || [];
}

export async function updateHeroSlide(id: number, updatedSlide: Partial<HeroSlide>): Promise<boolean> {
  try {
    const slides = await getAllHeroSlides();
    const index = slides.findIndex(slide => slide.id === id);
    
    if (index !== -1) {
      slides[index] = { ...slides[index], ...updatedSlide };
      await saveToStorage(STORAGE_KEYS.HERO_SLIDES, slides);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return false;
  }
}

export async function addHeroSlide(slide: Omit<HeroSlide, 'id'>): Promise<HeroSlide | null> {
  try {
    const slides = await getAllHeroSlides();
    const newId = Math.max(...slides.map(s => s.id), 0) + 1;
    const newSlide: HeroSlide = { ...slide, id: newId };
    
    slides.push(newSlide);
    await saveToStorage(STORAGE_KEYS.HERO_SLIDES, slides);
    return newSlide;
  } catch (error) {
    console.error('Error adding hero slide:', error);
    return null;
  }
}

export async function deleteHeroSlide(id: number): Promise<boolean> {
  try {
    const slides = await getAllHeroSlides();
    const filteredSlides = slides.filter(slide => slide.id !== id);
    
    if (filteredSlides.length !== slides.length) {
      await saveToStorage(STORAGE_KEYS.HERO_SLIDES, filteredSlides);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return false;
  }
}

// Services functions
export async function getServices(): Promise<Service[]> {
  const data = await loadFromStorage(STORAGE_KEYS.SERVICES);
  return data ? data.filter((service: Service) => service.isActive) : [];
}

export async function getAllServices(): Promise<Service[]> {
  const data = await loadFromStorage(STORAGE_KEYS.SERVICES);
  return data || [];
}

export async function updateService(id: number, updatedService: Partial<Service>): Promise<boolean> {
  try {
    const services = await getAllServices();
    const index = services.findIndex(service => service.id === id);
    
    if (index !== -1) {
      services[index] = { ...services[index], ...updatedService };
      await saveToStorage(STORAGE_KEYS.SERVICES, services);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating service:', error);
    return false;
  }
}

// Products functions
export async function getProducts(): Promise<Product[]> {
  const data = await loadFromStorage(STORAGE_KEYS.PRODUCTS);
  return data ? data.filter((product: Product) => product.isActive) : [];
}

export async function getAllProducts(): Promise<Product[]> {
  const data = await loadFromStorage(STORAGE_KEYS.PRODUCTS);
  return data || [];
}

export async function updateProduct(id: number, updatedProduct: Partial<Product>): Promise<boolean> {
  try {
    const products = await getAllProducts();
    const index = products.findIndex(product => product.id === id);
    
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      await saveToStorage(STORAGE_KEYS.PRODUCTS, products);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating product:', error);
    return false;
  }
} 