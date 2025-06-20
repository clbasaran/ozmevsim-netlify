'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for better performance
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
});

const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen main-content">
      {/* Header */}
      <Header />

      {/* Services Section */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <ServicesSection />
      </Suspense>

      {/* Process Section */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <ProcessSection />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  );
} 