'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const authenticated = localStorage.getItem('admin_authenticated');
      if (authenticated === 'true') {
        router.push('/admin');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay for security
    setTimeout(() => {
      if (password === 'mali06') {
        localStorage.setItem('admin_authenticated', 'true');
        router.push('/admin');
      } else {
        setError('Hatalı şifre! Lütfen tekrar deneyin.');
        setPassword('');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center font-bold text-2xl text-white mx-auto mb-4 shadow-lg">
            ÖM
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Öz Mevsim Yönetim Sistemi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Admin Şifresi
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 placeholder-gray-500 bg-white"
                style={{ color: '#111827', backgroundColor: '#ffffff' }}
                placeholder="Şifrenizi girin"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Giriş yapılıyor...
              </div>
            ) : (
              'Giriş Yap'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Öz Mevsim. Tüm hakları saklıdır.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 