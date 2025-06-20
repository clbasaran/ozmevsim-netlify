'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PublishData() {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Simulate publishing
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Değişiklikler başarıyla yayınlandı!');
    } catch (error) {
      console.error('Publishing failed:', error);
      alert('Yayınlama sırasında hata oluştu.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-blue-900">Değişiklikleri Yayınla</h3>
          <p className="text-sm text-blue-700">Yaptığınız değişiklikleri canlı siteye yansıtın.</p>
        </div>
        <button
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPublishing ? 'Yayınlanıyor...' : 'Yayınla'}
        </button>
      </div>
    </motion.div>
  );
} 