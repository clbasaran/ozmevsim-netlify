'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FireIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: string;
  title: string;
  description: string;
  short_description: string;
  icon?: string;
  image_url?: string;
  features?: string[];
  price_min?: string;
  price_max?: string;
  is_featured: boolean;
  is_active: boolean;
}

const fallbackServices: Service[] = [
  {
    id: '1',
    title: 'Kombi Satış & Montaj',
    description: 'Baymak, Vaillant, Bosch, Buderus gibi güvenilir markaların kombi satış ve montaj hizmetleri.',
    short_description: 'Güvenilir markaların kombi satış ve montaj hizmetleri',
    icon: '🔥',
    features: ['Ücretsiz keşif', 'Profesyonel montaj', '2 yıl garanti', 'Servis desteği'],
    is_featured: false,
    is_active: true
  },
  {
    id: '2', 
    title: 'Klima Sistemleri',
    description: 'Split, VRF ve merkezi klima sistemlerinin satış, montaj ve bakım hizmetleri.',
    short_description: 'Enerji verimli klima sistemleri',
    icon: '❄️',
    features: ['Enerji verimli', 'Sessiz çalışma', 'Uzaktan kontrol', 'Temizlik servisi'],
    is_featured: false,
    is_active: true
  },
  {
    id: '3',
    title: 'Doğalgaz Tesisatı', 
    description: 'Güvenli ve standartlara uygun doğalgaz iç tesisat projeleri.',
    short_description: 'TSE standartlarında doğalgaz tesisatı',
    icon: '⚡',
    features: ['TSE standartları', 'Güvenlik kontrolleri', 'Belgeli ustalar', 'Test raporu'],
    is_featured: false,
    is_active: true
  }
];

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services/');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white p-8 rounded-xl shadow-lg h-96">
                    <div className="h-12 w-12 bg-gray-300 rounded-full mb-6"></div>
                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-6"></div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-4 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const activeServices = services.filter(service => service.is_active);
  const featuredServices = activeServices.filter(service => service.is_featured);
  const displayServices = featuredServices.length > 0 ? featuredServices : activeServices.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50" id="hizmetler">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            30 yıllık deneyimimizle İstanbul genelinde kaliteli ısıtma ve soğutma çözümleri sunuyoruz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => {
            const features = typeof service.features === 'string' 
              ? JSON.parse(service.features) 
              : service.features || [];
            
            const priceRange = service.price_min && service.price_max 
              ? `₺${parseInt(service.price_min).toLocaleString()} - ₺${parseInt(service.price_max).toLocaleString()}`
              : 'Fiyat için arayın';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    {service.icon ? (
                      <div className="text-4xl mb-4">{service.icon}</div>
                    ) : (
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <CogIcon className="h-6 w-6 text-blue-600" />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.short_description || service.description}
                  </p>

                  {/* Features */}
                  {features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {features.slice(0, 4).map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <CheckIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Price Range */}
                  {priceRange && (
                    <div className="mb-6">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {priceRange}
                      </span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors group-hover:shadow-lg flex items-center justify-center space-x-2">
                      <span>Detaylı Bilgi</span>
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* More Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/hizmetler"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
          >
            <span>Tüm Hizmetlerimizi Görün</span>
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
} 