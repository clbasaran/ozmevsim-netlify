'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PDFViewerPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      }
    >
      <PDFViewerWrapper />
    </Suspense>
  );
}

function PDFViewerWrapper() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const title = searchParams.get('title');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError('PDF URL bulunamadı');
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [url]);

  const handleDownload = () => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = title || 'katalog.pdf';
    link.click();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">PDF Yüklenemedi</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Kataloglara Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/katalog"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Kataloglara Dön</span>
              </Link>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-orange-600" />
                <h1 className="font-medium text-gray-900 truncate max-w-xs sm:max-w-md">
                  {title || 'PDF Katalog'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span className="hidden sm:inline">İndir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
              <p className="text-gray-600">PDF yükleniyor...</p>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-4rem)] w-full">
            <iframe
              src={`${url}#toolbar=1&navpanes=1&scrollbar=1&page=1&view=FitH`}
              className="w-full h-full border-0"
              title={title || 'PDF Katalog'}
            />
          </div>
        )}
      </main>
    </div>
  );
} 