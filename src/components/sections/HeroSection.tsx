'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PhoneIcon, 
  CalendarIcon,
  ArrowRightIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import { type HeroSlide, getHeroSlides } from '@/lib/data';

// Brand logos data
const brandLogos = [
  {
    name: 'Bosch',
    logo: '/uploads/brands/bosch-seeklogo.png',
    alt: 'Bosch Logo'
  },
  {
    name: 'Vaillant',
    logo: '/uploads/brands/vaillant-new-seeklogo.png',
    alt: 'Vaillant Logo'
  },
  {
    name: 'Buderus',
    logo: '/uploads/brands/buderus.png',
    alt: 'Buderus Logo'
  },
  {
    name: 'Baymak',
    logo: '/uploads/brands/baymak-seeklogo.png',
    alt: 'Baymak Logo'
  },
  {
    name: 'ECA',
    logo: '/uploads/brands/eca-seeklogo.png',
    alt: 'ECA Logo'
  },
  {
    name: 'Demirdöküm',
    logo: '/uploads/brands/demirdokum.png',
    alt: 'Demirdöküm Logo'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load hero slides from data
  useEffect(() => {
    try {
      const heroSlides = getHeroSlides();
      setSlides(heroSlides);
    } catch (error) {
      console.error('Failed to load hero slides:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-play for hero slides
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Reset currentSlide if it's out of bounds
  useEffect(() => {
    if (slides.length > 0 && currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 animate-pulse">
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-white text-2xl">Yükleniyor...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show message if no slides available
  if (slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700">
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-white text-2xl">Henüz hero slider içeriği bulunmuyor.</div>
          </div>
        </div>
      </section>
    );
  }

  const currentSlideData = slides[currentSlide] || slides[0];

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <div className="relative h-full">
          <Image
            src={currentSlideData.backgroundImage}
            alt={currentSlideData.title}
            fill
            className="object-cover transition-all duration-1000"
            priority
            unoptimized={true}
            onError={(e) => {
              console.error('Image failed to load:', currentSlideData.backgroundImage);
            }}
            onLoad={() => {
              console.log('Image loaded successfully:', currentSlideData.backgroundImage);
            }}
          />
          {/* Overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 main-content">
          <div className="max-w-4xl">
            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
                  {currentSlideData.title}
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gold font-semibold mb-6">
                  {currentSlideData.subtitle}
                </h2>
              </div>

              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed">
                {currentSlideData.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {currentSlideData.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href={currentSlideData.primaryCTA.href}
                  className="group inline-flex items-center justify-center bg-gold text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  {currentSlideData.primaryCTA.text}
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={currentSlideData.secondaryCTA.href}
                  className="group inline-flex items-center justify-center bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  {currentSlideData.secondaryCTA.text}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 mb-6">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span>TSE Sertifikalı</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span>ISO 9001:2015</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 mr-2" />
                  <span>Garanti Kapsamında</span>
                </div>
              </div>

              {/* Brand Partners - Only show on 4th slide (İş Ortaklarımız) */}
              {currentSlide === 3 && (
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
                    {brandLogos.map((brand, brandIndex) => (
                      <div 
                        key={brandIndex} 
                        className="group bg-white/90 rounded-lg p-3 md:p-4 flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <img
                          src={brand.logo}
                          alt={brand.alt}
                          className="w-full h-auto max-h-12 md:max-h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ filter: 'contrast(1.1) saturate(0.9)' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
          {/* Slide Indicators */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8 bg-gold'
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
          >
            {isAutoPlaying ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 4h3v12H6zM11 4h3v12h-3z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5l8 7-8 7V5z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white text-sm flex flex-col items-center gap-2 animate-bounce">
        <span>Keşfet</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 