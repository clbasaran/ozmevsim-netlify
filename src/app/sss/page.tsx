'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for better performance
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

const Header = dynamic(() => import('@/components/layout/Header'), {
  loading: () => <div className="h-20 bg-white shadow-sm animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="h-96 bg-gray-900 animate-pulse" />
});

export default function FAQPage() {
  return (
    <main className="min-h-screen main-content">
      {/* Header */}
      <Header />

      {/* FAQ Section */}
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <FAQSection />
      </Suspense>

      {/* Footer */}
      <Suspense fallback={<div className="h-96 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  );
} 