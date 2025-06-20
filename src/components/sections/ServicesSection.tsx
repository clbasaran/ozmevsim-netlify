'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  isActive: boolean;
}

const defaultServices: Service[] = [
  {
    id: 1,
    title: "Kombi Satış & Montaj",
    description: "Baymak, Vaillant, Bosch gibi güvenilir markaların satış ve montaj hizmetleri.",
    icon: "🔥",
    features: [
      "Ücretsiz keşif ve proje çizimi",
      "Profesyonel montaj ekibi",
      "2 yıl montaj garantisi",
      "Düzenli bakım hizmeti"
    ],
    isActive: true
  },
  {
    id: 2,
    title: "Klima Sistemleri",
    description: "Split, VRF ve merkezi klima sistemlerinin satış, montaj ve bakım hizmetleri.",
    icon: "❄️",
    features: [
      "Enerji verimli modeller",
      "Sessiz çalışma teknolojisi",
      "Uzaktan kontrol sistemleri",
      "Düzenli temizlik ve bakım"
    ],
    isActive: true
  },
  {
    id: 3,
    title: "Doğalgaz Tesisatı",
    description: "Güvenli ve standartlara uygun doğalgaz iç tesisat projeleri.",
    icon: "⚡",
    features: [
      "TSE standartlarında montaj",
      "Güvenlik kontrolleri",
      "Belgeli ustalar",
      "Sızdırmazlık testleri"
    ],
    isActive: true
  }
];

export default function ServicesSection() {
  const [services] = useState<Service[]>(defaultServices);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kaliteli ısıtma ve soğutma sistemleri konusunda 30 yıllık deneyimimizle, 
            müşterilerimize en iyi hizmeti sunmaktan gurur duyuyoruz.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.filter(service => service.isActive).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group p-8"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <span className="text-3xl">{service.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/hizmetler"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-all"
              >
                Detaylı Bilgi
                <ArrowRightIcon className="h-4 w-4 ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Tüm Hizmetleri İncele
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 