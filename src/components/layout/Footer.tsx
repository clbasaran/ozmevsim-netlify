'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CogIcon,
  FireIcon,
  BoltIcon,
  ShieldCheckIcon,
  StarIcon,
  HeartIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  CheckBadgeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Kombi Kurulumu', href: '#services', icon: FireIcon },
    { name: 'Klima Montajı', href: '#services', icon: BoltIcon },
    { name: 'Proje Danışmanlığı', href: '#services', icon: CogIcon },
  ];

  const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Hizmetler', href: '/hizmetler' },
    { name: 'Ürünler', href: '/urunler' },
    { name: 'Projeler', href: '/referanslar' },
    { name: 'İletişim', href: '/iletisim' },
    { name: 'Blog', href: '/blog' },
    { name: 'SSS', href: '/sss' },
  ];

  const legalLinks = [
    { name: 'Gizlilik Politikası', href: '/gizlilik' },
    { name: 'Kullanım Şartları', href: '/kullanim-sartlari' },
    { name: 'Çerez Politikası', href: '/cerez-politikasi' },
    { name: 'KVKK', href: '/kvkk' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com/ozmevsim', icon: '📘' },
    { name: 'Instagram', href: 'https://instagram.com/ozmevsim', icon: '📷' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/ozmevsim', icon: '💼' },
    { name: 'Twitter', href: 'https://twitter.com/ozmevsim', icon: '🐦' },
    { name: 'YouTube', href: 'https://youtube.com/ozmevsim', icon: '📺' },
  ];

  const certifications = [
    { name: 'TSE Sertifikalı', icon: CheckBadgeIcon },
    { name: 'ISO 9001:2015', icon: TrophyIcon },
    { name: 'Yetkili Servis', icon: ShieldCheckIcon },
    { name: 'Garanti Kapsamı', icon: StarIcon },
  ];

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Telefon',
      content: '+90 312 357 0600',
      href: 'tel:+903123570600'
    },
    {
      icon: EnvelopeIcon,
      title: 'E-posta',
      content: 'info@ozmevsim.com',
      href: 'mailto:info@ozmevsim.com'
    },
    {
      icon: MapPinIcon,
      title: 'Adres',
      content: 'Kuşcağız Mah. Sanatoryum Cad. No:221/A Keçiören, Ankara',
      href: 'https://maps.google.com/?q=Kuşcağız+Mahallesi+Sanatoryum+Caddesi+No+221/A+Keçiören+Ankara'
    },
    {
      icon: ClockIcon,
      title: 'Çalışma Saatleri',
      content: 'Pazartesi - Cumartesi: 08:00 - 18:00'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src="/Mevsim-4.png"
                    alt="Öz Mevsim"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Öz Mevsim</h3>
                  <p className="text-sm text-gray-400">Isı Sistemleri Mühendislik</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                25 yıllık deneyimle Ankara'da kombi, klima ve doğalgaz sistemleri kurulum hizmetleri sunuyoruz.
              </p>

              {/* Certifications */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gold uppercase tracking-wide">
                  Sertifikalar & Yetkilendirmeler
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                      <cert.icon className="h-4 w-4 text-gold" />
                      <span>{cert.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gold">Hizmetlerimiz</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-gold transition-colors duration-300 group"
                    >
                      <service.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>{service.name}</span>
                      <ArrowRightIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                <h4 className="text-sm font-semibold text-gold mb-3">Başarılarımız</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">25+</div>
                    <div className="text-xs text-gray-400">Yıl Deneyim</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">10K+</div>
                    <div className="text-xs text-gray-400">Mutlu Müşteri</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gold">Hızlı Bağlantılar</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <ArrowRightIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Legal Links */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gold mb-3">Yasal</h4>
                <ul className="space-y-2">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gold">İletişim</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <info.icon className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-white">{info.title}</h4>
                      {info.href ? (
                        <Link
                          href={info.href}
                          className="text-sm text-gray-300 hover:text-gold transition-colors duration-300"
                        >
                          {info.content}
                        </Link>
                      ) : (
                        <p className="text-sm text-gray-300">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gold mb-4">Sosyal Medya</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300 transform hover:scale-110"
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-gray-400">
                © {currentYear} Öz Mevsim Isı Sistemleri Mühendislik. Tüm hakları saklıdır.
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <HeartIcon className="h-4 w-4 text-red-500" />
                  <span>Türkiye'de tasarlandı</span>
                </span>
                <span className="flex items-center space-x-2">
                  <GlobeAltIcon className="h-4 w-4 text-gold" />
                  <span>Ankara merkezli</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 