'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  {
    name: 'Bosch',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop&crop=center',
    description: 'Dünya lideri teknoloji ve hizmet sağlayıcısı'
  },
  {
    name: 'Vaillant',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center',
    description: 'Avrupa\'nın önde gelen ısıtma teknolojisi markası'
  },
  {
    name: 'Buderus',
    logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop&crop=center',
    description: 'Sistem uzmanı ve güvenilir çözümler'
  },
  {
    name: 'Baymak',
    logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=100&fit=crop&crop=center',
    description: 'Türkiye\'nin güvenilir ısıtma markası'
  },
  {
    name: 'Demirdöküm',
    logo: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?w=200&h=100&fit=crop&crop=center',
    description: 'Güçlü ve dayanıklı ısıtma çözümleri'
  },
  {
    name: 'ECA',
    logo: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200&h=100&fit=crop&crop=center',
    description: 'Kaliteli su ısıtıcıları ve kombi sistemleri'
  }
];

export default function PartnersSection() {
  return (
    <section className="py-20 bg-gray-50">
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
            İş Ortaklarımız
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dünya çapında tanınan güvenilir markalarla birlikte, size en kaliteli ürün ve hizmetleri sunuyoruz
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="relative h-16 mb-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Partner Name */}
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                {partner.name}
              </h3>

              {/* Description - Hidden on mobile, shown on hover for larger screens */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block">
                <p className="text-sm text-gray-600 text-center leading-tight">
                  {partner.description}
                </p>
              </div>

              {/* Mobile description */}
              <p className="text-xs text-gray-600 text-center lg:hidden">
                {partner.description}
              </p>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-5 rounded-xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Partnership Benefits */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Güçlü Ortaklıklarımızın Avantajları
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dünya çapında güvenilir markalarla kurduğumuz ortaklıklar sayesinde size sunduğumuz faydalar
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Güvenilir Kalite</h4>
              <p className="text-gray-600 text-sm">Dünya standartlarında kaliteli ürünler ve güvenilir hizmet garantisi</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Yenilikçi Teknoloji</h4>
              <p className="text-gray-600 text-sm">En son teknoloji ürünleri ve gelişmiş çözümlerle modern konfor</p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Kapsamlı Destek</h4>
              <p className="text-gray-600 text-sm">Satış öncesi danışmanlık, kurulum ve satış sonrası destek hizmetleri</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">
            Bu güvenilir markalarla birlikte size en iyi hizmeti sunmaya devam ediyoruz
          </p>
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium">
            Ürünlerimizi İnceleyin
          </button>
        </motion.div>
      </div>
    </section>
  );
} 