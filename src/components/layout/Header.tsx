'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bars3Icon, 
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface MenuItemType {
  label: string;
  href: string;
  submenu?: Array<{
    label: string;
    href: string;
    description?: string;
    icon?: string;
  }>;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems: MenuItemType[] = [
    {
      label: 'Ana Sayfa',
      href: '/'
    },
    {
      label: 'Hakkımızda',
      href: '/hakkimizda'
    },
    {
      label: 'Hizmetler',
      href: '/hizmetler'
    },
    {
      label: 'Ürünler',
      href: '/urunler'
    },
    {
      label: 'Referanslar',
      href: '/referanslar'
    },
    {
      label: 'Blog',
      href: '/blog'
    },
    {
      label: 'S.S.S',
      href: '/sss'
    },
    {
      label: 'İletişim',
      href: '/iletisim'
    }
  ];

  return (
    <>
      {/* Unified Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 shadow-lg backdrop-blur-lg backdrop-saturate-150' 
            : 'bg-black/10 backdrop-blur-sm'
        }`}
      >
        {/* Top Bar - Only visible when not scrolled */}
        <div className={`bg-primary-600 text-white py-2 text-sm transition-all duration-300 ${
          isScrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'
        } hidden lg:block`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>+90 312 357 0600</span>
                </div>
                <div className="flex items-center space-x-2">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>info@ozmevsim.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ClockIcon className="h-4 w-4" />
                  <span>Pazartesi - Cumartesi: 08:00 - 18:00</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4" />
                <span>Keçiören, Ankara</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="relative w-24 h-24">
                <Image
                  src="/Mevsim-4.png"
                  alt="Öz Mevsim Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Öz Mevsim
                </span>
                <span className={`text-sm ${
                  isScrolled ? 'text-gray-600' : 'text-gray-200'
                }`}>
                  Isı Sistemleri Mühendislik
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                {menuItems.map((item) => (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={() => setActiveSubmenu(item.label)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={`font-medium transition-colors duration-300 hover:text-primary-600 flex items-center ${
                        isScrolled ? 'text-gray-700' : 'text-white hover:text-primary-200'
                      }`}
                    >
                      {item.label}
                      {item.submenu && (
                        <ChevronDownIcon className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                    </Link>

                    {/* Submenu Dropdown */}
                    <AnimatePresence>
                      {item.submenu && activeSubmenu === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
                        >
                          <div className="py-2">
                            {item.submenu.map((subItem, index) => (
                              <Link
                                key={index}
                                href={subItem.href}
                                className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <div className="font-medium">{subItem.label}</div>
                                {subItem.description && (
                                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-md transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white dark:bg-gray-900 shadow-lg lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 