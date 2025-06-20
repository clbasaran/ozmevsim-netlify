'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for better performance
const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), {
  loading: () => <div className="h-screen bg-gradient-to-br from-blue-900 to-blue-700 animate-pulse" />
});



const ProductsSection = dynamic(() => import('@/components/sections/ProductsSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Suspense fallback={<div className="h-screen bg-gradient-to-br from-blue-900 to-blue-700 animate-pulse" />}>
        <HeroSection />
      </Suspense>

      {/* Products Section */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <ProductsSection />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ContactSection />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  );
} 