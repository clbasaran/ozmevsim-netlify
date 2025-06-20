'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ServerIcon,
  CircleStackIcon,
  FolderIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

interface Backup {
  id: string;
  name: string;
  type: 'full' | 'database' | 'files' | 'settings';
  size: string;
  date: string;
  status: 'completed' | 'failed' | 'in_progress';
  description: string;
}

export default function BackupPage() {
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: '1',
      name: 'Tam Yedek - Mart 2024',
      type: 'full',
      size: '2.4 GB',
      date: '2024-03-20 14:30',
      status: 'completed',
      description: 'Tüm site verilerinin tam yedeği'
    },
    {
      id: '2',
      name: 'Veritabanı Yedeği',
      type: 'database',
      size: '156 MB',
      date: '2024-03-20 10:15',
      status: 'completed',
      description: 'Veritabanı tabloları ve içerikleri'
    },
    {
      id: '3',
      name: 'Medya Dosyaları',
      type: 'files',
      size: '1.8 GB',
      date: '2024-03-19 22:00',
      status: 'completed',
      description: 'Resim, video ve belge dosyaları'
    },
    {
      id: '4',
      name: 'Sistem Ayarları',
      type: 'settings',
      size: '12 MB',
      date: '2024-03-19 18:45',
      status: 'failed',
      description: 'Konfigürasyon ve ayar dosyaları'
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupType, setBackupType] = useState('full');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusBadge = (status: string) => {
    const badges = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    };
    return badges[status as keyof typeof badges] || badges.completed;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />;
      case 'in_progress':
        return <ArrowPathIcon className="w-4 h-4 text-yellow-500 animate-spin" />;
      default:
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full':
        return <ServerIcon className="w-5 h-5" />;
      case 'database':
        return <CircleStackIcon className="w-5 h-5" />;
      case 'files':
        return <FolderIcon className="w-5 h-5" />;
      case 'settings':
        return <CogIcon className="w-5 h-5" />;
      default:
        return <ServerIcon className="w-5 h-5" />;
    }
  };

  const getTypeName = (type: string) => {
    const names = {
      full: 'Tam Yedek',
      database: 'Veritabanı',
      files: 'Dosyalar',
      settings: 'Ayarlar'
    };
    return names[type as keyof typeof names] || 'Bilinmeyen';
  };

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      const newBackup: Backup = {
        id: Date.now().toString(),
        name: `${getTypeName(backupType)} - ${new Date().toLocaleDateString('tr-TR')}`,
        type: backupType as 'full' | 'database' | 'files' | 'settings',
        size: '0 MB',
        date: new Date().toLocaleString('tr-TR'),
        status: 'in_progress',
        description: 'Yedekleme işlemi devam ediyor...'
      };
      setBackups(prev => [newBackup, ...prev]);
      setIsCreatingBackup(false);
      setShowCreateModal(false);
      
      // Simulate completion after 3 seconds
      setTimeout(() => {
        setBackups(prev => prev.map(backup => 
          backup.id === newBackup.id 
            ? { ...backup, status: 'completed' as const, size: '1.2 GB', description: 'Yedekleme başarıyla tamamlandı' }
            : backup
        ));
      }, 3000);
    }, 2000);
  };

  const stats = [
    {
      title: 'Toplam Yedek',
      value: backups.length.toString(),
      icon: DocumentDuplicateIcon,
      color: 'blue'
    },
    {
      title: 'Başarılı',
      value: backups.filter(b => b.status === 'completed').length.toString(),
      icon: CheckCircleIcon,
      color: 'green'
    },
    {
      title: 'Toplam Boyut',
      value: '4.3 GB',
      icon: ServerIcon,
      color: 'purple'
    },
    {
      title: 'Son Yedek',
      value: '2 saat önce',
      icon: ClockIcon,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Yedekleme</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Site verilerini yedekleyin ve geri yükleyin
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          disabled={isCreatingBackup}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CloudArrowUpIcon className="w-5 h-5" />
          {isCreatingBackup ? 'Yedekleniyor...' : 'Yeni Yedek Oluştur'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Backup Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Otomatik Yedekleme Ayarları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Yedekleme Sıklığı
            </label>
            <select className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="daily">Günlük</option>
              <option value="weekly">Haftalık</option>
              <option value="monthly">Aylık</option>
              <option value="manual">Manuel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Saklama Süresi
            </label>
            <select className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="7">7 Gün</option>
              <option value="30">30 Gün</option>
              <option value="90">90 Gün</option>
              <option value="365">1 Yıl</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="autoBackup"
            className="rounded text-orange-500 focus:ring-orange-500 mr-2"
            defaultChecked
          />
          <label htmlFor="autoBackup" className="text-sm text-gray-700 dark:text-gray-300">
            Otomatik yedeklemeyi etkinleştir
          </label>
        </div>
      </div>

      {/* Backup List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Yedek Dosyaları
          </h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {backups.map((backup, index) => (
            <motion.div
              key={backup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {getTypeIcon(backup.type)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{backup.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {backup.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(backup.date).toLocaleString('tr-TR')}
                      </span>
                      <span>{backup.size}</span>
                      <span className="capitalize">{getTypeName(backup.type)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(backup.status)}`}>
                    {getStatusIcon(backup.status)}
                    <span className="ml-1">
                      {backup.status === 'completed' ? 'Tamamlandı' : 
                       backup.status === 'failed' ? 'Başarısız' : 'Devam Ediyor'}
                    </span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="İndir"
                      disabled={backup.status !== 'completed'}
                    >
                      <CloudArrowDownIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Geri Yükle"
                      disabled={backup.status !== 'completed'}
                    >
                      <ArrowPathIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <TrashIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Backup Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Yeni Yedek Oluştur
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Yedek Türü
                </label>
                <select
                  value={backupType}
                  onChange={(e) => setBackupType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700"
                >
                  <option value="full">Tam Yedek (Tüm Veriler)</option>
                  <option value="database">Veritabanı</option>
                  <option value="files">Dosyalar</option>
                  <option value="settings">Ayarlar</option>
                </select>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {backupType === 'full' && 'Tüm site verileri, veritabanı ve dosyalar yedeklenecek.'}
                  {backupType === 'database' && 'Sadece veritabanı tabloları ve içerikleri yedeklenecek.'}
                  {backupType === 'files' && 'Sadece medya ve dosyalar yedeklenecek.'}
                  {backupType === 'settings' && 'Sadece sistem ayarları ve konfigürasyonlar yedeklenecek.'}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleCreateBackup}
                disabled={isCreatingBackup}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreatingBackup ? 'Oluşturuluyor...' : 'Yedek Oluştur'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 