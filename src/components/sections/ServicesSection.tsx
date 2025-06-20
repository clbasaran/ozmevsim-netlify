'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  WrenchScrewdriverIcon,
  CogIcon,
  ClipboardDocumentCheckIcon,
  PhoneIcon,
  FireIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { getServices, type Service } from '@/lib/data';

// Icon mapping for services
const iconMap: { [key: string]: React.ComponentType<any> } = {
  'fire': FireIcon,
  'snowflake': CloudIcon,
  'flame': FireIcon,
  'wrench': WrenchScrewdriverIcon,
  'cog': CogIcon,
  'clipboard': ClipboardDocumentCheckIcon
};

// Color mapping for service categories
const colorMap: { [key: string]: string } = {
  'Kombi': 'bg-red-600',
  'Klima': 'bg-blue-600', 
  'Doğalgaz': 'bg-orange-600',
  'Tesisat': 'bg-green-600',
  'Bakım': 'bg-purple-600'
};

// Default stats as fallback
const defaultStatsData = [
  { number: '15+', label: 'Yıllık Deneyim' },
  { number: '2500+', label: 'Tamamlanan Proje' },
  { number: '1200+', label: 'Mutlu Müşteri' },
  { number: '45+', label: 'Uzman Teknisyen' }
];

interface HomeStat {
  id: number;
  label: string;
  value: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [statsData, setStatsData] = useState(defaultStatsData);
  const [isLoading, setIsLoading] = useState(true);

  // WhatsApp redirect function
  const handleWhatsAppRedirect = (serviceName: string) => {
    const phoneNumber = '+905324467367'; // WhatsApp number
    const message = `Merhaba! ${serviceName} hizmeti hakkında bilgi almak istiyorum. Detaylı bilgi verir misiniz?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Load services from data
  useEffect(() => {
    try {
      const activeServices = getServices();
      setServices(activeServices);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load stats from localStorage
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('homeStats');
      if (savedStats) {
        const homeStats: HomeStat[] = JSON.parse(savedStats);
        const activeStats = homeStats
          .filter(stat => stat.isActive)
          .sort((a, b) => a.order - b.order)
          .map(stat => ({
            number: stat.value,
            label: stat.label
          }));
        
        if (activeStats.length > 0) {
          setStatsData(activeStats);
          console.log('Loaded stats from localStorage:', activeStats);
        } else {
          setStatsData(defaultStatsData);
        }
      } else {
        setStatsData(defaultStatsData);
      }
    } catch (error) {
      console.error('Error loading stats from localStorage:', error);
      setStatsData(defaultStatsData);
    }
  }, []);

  // Listen for storage changes to update services when admin makes changes
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const activeServices = getServices();
        setServices(activeServices);
        
        // Also reload stats
        const savedStats = localStorage.getItem('homeStats');
        if (savedStats) {
          const homeStats: HomeStat[] = JSON.parse(savedStats);
          const activeStats = homeStats
            .filter(stat => stat.isActive)
            .sort((a, b) => a.order - b.order)
            .map(stat => ({
              number: stat.value,
              label: stat.label
            }));
          
          if (activeStats.length > 0) {
            setStatsData(activeStats);
          } else {
            setStatsData(defaultStatsData);
          }
        }
      } catch (error) {
        console.error('Error reloading data:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from same tab
    window.addEventListener('servicesUpdated', handleStorageChange);
    window.addEventListener('statsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('servicesUpdated', handleStorageChange);
      window.removeEventListener('statsUpdated', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return (
      <section id="hizmetler" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="hizmetler" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-xl text-gray-600">Henüz hizmet bulunmuyor.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-40 pb-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Işıtma ve soğutma sistemleri konusunda uzman ekibimizle kaliteli hizmet sunuyoruz
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || WrenchScrewdriverIcon;
            const serviceCategory = service.title.includes('Kombi') ? 'Kombi' :
                                  service.title.includes('Klima') ? 'Klima' :
                                  service.title.includes('Doğalgaz') ? 'Doğalgaz' : 'Tesisat';
            const colorClass = colorMap[serviceCategory] || 'bg-gray-600';
            
            return (
              <motion.div
                key={service.id}
                className={`relative overflow-hidden rounded-xl p-8 cursor-pointer transition-all duration-300 ${
                  selectedService === index 
                    ? 'bg-white shadow-2xl scale-105' 
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setSelectedService(index)}
              >
                <div className={`w-16 h-16 ${colorClass} rounded-xl flex items-center justify-center mb-6`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppRedirect(service.title);
                    }}
                  >
                    <PhoneIcon className="h-5 w-5 mr-2" />
                    Bilgi Al
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>


      </div>
    </section>
  );
} 