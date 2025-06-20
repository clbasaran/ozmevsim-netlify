'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FireIcon,
  WifiIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  CogIcon,
  BoltIcon,
  ChartBarIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  PlayIcon,
  PauseIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface Device {
  id: string;
  name: string;
  type: 'kombi' | 'klima' | 'thermostat' | 'sensor';
  location: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  temperature: number;
  targetTemperature: number;
  humidity?: number;
  pressure?: number;
  powerConsumption: number;
  efficiency: number;
  lastUpdate: Date;
  isActive: boolean;
  alerts: Alert[];
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  deviceId: string;
}

const IoTDashboard = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockDevices: Device[] = [
      {
        id: '1',
        name: 'Ana Kombi - Villa A',
        type: 'kombi',
        location: 'Sarıyer, İstanbul',
        status: 'online',
        temperature: 65,
        targetTemperature: 70,
        humidity: 45,
        pressure: 1.5,
        powerConsumption: 12.5,
        efficiency: 94,
        lastUpdate: new Date(),
        isActive: true,
        alerts: []
      },
      {
        id: '2',
        name: 'Salon Klima - Apt B12',
        type: 'klima',
        location: 'Beşiktaş, İstanbul',
        status: 'online',
        temperature: 22,
        targetTemperature: 24,
        humidity: 55,
        powerConsumption: 2.8,
        efficiency: 87,
        lastUpdate: new Date(),
        isActive: true,
        alerts: []
      },
      {
        id: '3',
        name: 'Termostat - Ofis 301',
        type: 'thermostat',
        location: 'Şişli, İstanbul',
        status: 'warning',
        temperature: 19,
        targetTemperature: 22,
        humidity: 42,
        powerConsumption: 0.1,
        efficiency: 98,
        lastUpdate: new Date(Date.now() - 300000), // 5 minutes ago
        isActive: true,
        alerts: [
          {
            id: 'a1',
            type: 'warning',
            message: 'Hedef sıcaklığa ulaşılamıyor',
            timestamp: new Date(),
            deviceId: '3'
          }
        ]
      },
      {
        id: '4',
        name: 'Sıcaklık Sensörü - Depo',
        type: 'sensor',
        location: 'Çerkezköy, Tekirdağ',
        status: 'error',
        temperature: 8,
        targetTemperature: 15,
        humidity: 78,
        powerConsumption: 0.05,
        efficiency: 0,
        lastUpdate: new Date(Date.now() - 1800000), // 30 minutes ago
        isActive: false,
        alerts: [
          {
            id: 'a2',
            type: 'error',
            message: 'Cihaz çevrimdışı - Bağlantı hatası',
            timestamp: new Date(),
            deviceId: '4'
          }
        ]
      }
    ];

    setTimeout(() => {
      setDevices(mockDevices);
      setAlerts(mockDevices.flatMap(d => d.alerts));
      setIsLoading(false);
    }, 1000);
  }, []);

  // Real-time data simulation
  useEffect(() => {
    if (!realTimeData) return;

    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => ({
        ...device,
        temperature: device.temperature + (Math.random() - 0.5) * 2,
        powerConsumption: Math.max(0, device.powerConsumption + (Math.random() - 0.5) * 0.5),
        lastUpdate: new Date()
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircleIcon;
      case 'warning': return ExclamationTriangleIcon;
      case 'error': return ExclamationTriangleIcon;
      case 'offline': return WifiIcon;
      default: return WifiIcon;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'kombi': return FireIcon;
      case 'klima': return FireIcon;
      case 'thermostat': return AdjustmentsHorizontalIcon;
      case 'sensor': return ChartBarIcon;
      default: return CogIcon;
    }
  };

  const handleDeviceControl = (deviceId: string, action: string) => {
    setDevices(prev => prev.map(device => {
      if (device.id === deviceId) {
        switch (action) {
          case 'toggle':
            return { ...device, isActive: !device.isActive };
          case 'increase_temp':
            return { ...device, targetTemperature: device.targetTemperature + 1 };
          case 'decrease_temp':
            return { ...device, targetTemperature: device.targetTemperature - 1 };
          default:
            return device;
        }
      }
      return device;
    }));
  };

  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const totalAlerts = alerts.length;
  const avgEfficiency = devices.reduce((acc, d) => acc + d.efficiency, 0) / devices.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">IoT Dashboard Yükleniyor...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">IoT Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Isı sistemleri uzaktan izleme ve kontrol paneli
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setRealTimeData(!realTimeData)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  realTimeData 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                <WifiIcon className="h-5 w-5" />
                <span>Canlı Veri</span>
              </button>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300">
                Rapor Al
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Toplam Cihaz</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalDevices}</p>
              </div>
              <CogIcon className="h-12 w-12 text-primary-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Çevrimiçi</p>
                <p className="text-3xl font-bold text-green-600">{onlineDevices}</p>
              </div>
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Aktif Uyarı</p>
                <p className="text-3xl font-bold text-yellow-600">{totalAlerts}</p>
              </div>
              <ExclamationTriangleIcon className="h-12 w-12 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Ortalama Verim</p>
                <p className="text-3xl font-bold text-blue-600">{avgEfficiency.toFixed(1)}%</p>
              </div>
              <ChartBarIcon className="h-12 w-12 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Devices List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cihaz Listesi</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {devices.map((device) => {
                    const StatusIcon = getStatusIcon(device.status);
                    const DeviceIcon = getDeviceIcon(device.type);
                    
                    return (
                      <motion.div
                        key={device.id}
                        layout
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        onClick={() => setSelectedDevice(device)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <DeviceIcon className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">{device.name}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{device.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <FireIcon className="h-4 w-4 text-gray-400" />
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {device.temperature.toFixed(1)}°C
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <BoltIcon className="h-3 w-3" />
                                <span>{device.powerConsumption.toFixed(1)} kW</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-center space-y-2">
                              <StatusIcon className={`h-5 w-5 ${getStatusColor(device.status)}`} />
                              <span className={`text-xs font-medium ${getStatusColor(device.status)}`}>
                                {device.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {device.alerts.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                            {device.alerts.map((alert) => (
                              <div key={alert.id} className="flex items-center space-x-2 text-sm text-yellow-600">
                                <ExclamationTriangleIcon className="h-4 w-4" />
                                <span>{alert.message}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Device Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cihaz Kontrolü</h2>
              </div>
              <div className="p-6">
                {selectedDevice ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {selectedDevice.name}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        selectedDevice.status === 'online' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : selectedDevice.status === 'warning'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {selectedDevice.status}
                      </span>
                    </div>

                    {/* Temperature Control */}
                    <div className="text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Sıcaklık</p>
                      <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {selectedDevice.temperature.toFixed(1)}°C
                      </div>
                      <div className="flex items-center justify-center space-x-4">
                        <button
                          onClick={() => handleDeviceControl(selectedDevice.id, 'decrease_temp')}
                          className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-300 p-3 rounded-full transition-colors duration-300"
                        >
                          <ArrowTrendingDownIcon className="h-5 w-5" />
                        </button>
                        <div className="text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Hedef</p>
                          <p className="text-xl font-semibold text-gray-900 dark:text-white">
                            {selectedDevice.targetTemperature}°C
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeviceControl(selectedDevice.id, 'increase_temp')}
                          className="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 dark:text-red-300 p-3 rounded-full transition-colors duration-300"
                        >
                          <ArrowTrendingUpIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Power Control */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-white font-medium">Güç</span>
                      <button
                        onClick={() => handleDeviceControl(selectedDevice.id, 'toggle')}
                        className={`p-3 rounded-full transition-colors duration-300 ${
                          selectedDevice.isActive
                            ? 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-600 dark:text-green-300'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {selectedDevice.isActive ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Device Stats */}
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Nem</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedDevice.humidity}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Güç Tüketimi</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedDevice.powerConsumption.toFixed(1)} kW
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Verimlilik</span>
                        <span className="font-medium text-green-600">
                          {selectedDevice.efficiency}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Son Güncelleme</span>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {selectedDevice.lastUpdate.toLocaleTimeString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <CogIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Kontrol etmek için bir cihaz seçin</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-6">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Son Uyarılar</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3">
                      <ExclamationTriangleIcon className={`h-5 w-5 mt-0.5 ${
                        alert.type === 'error' ? 'text-red-500' : 
                        alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white">{alert.message}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {alert.timestamp.toLocaleString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  ))}
                  {alerts.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <ShieldCheckIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Aktif uyarı bulunmuyor</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTDashboard; 