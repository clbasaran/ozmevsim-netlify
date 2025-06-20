'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for better performance
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
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

export default function AboutPage() {
  return (
    <main className="min-h-screen main-content">
      {/* Header */}
      <Header />

      {/* About Section */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <AboutSection />
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