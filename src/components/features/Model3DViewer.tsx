'use client';

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CubeIcon,
  EyeIcon,
  ArrowsPointingOutIcon,
  PhotoIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Model3DViewerProps {
  modelPath?: string;
  productName?: string;
  onClose?: () => void;
}

// Loading component
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-900 dark:text-white font-medium">3D Model Yükleniyor...</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

// 3D Model Component
const Model = ({ modelPath }: { modelPath: string }) => {
  const meshRef = useRef<any>();
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Load 3D model (for demo, we'll create a simple geometric model)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={hovered ? '#ff6600' : '#0066ff'} 
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

// Product Model Components (for different heating system products)
const KombiModel = () => {
  const meshRef = useRef<any>();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 4, 1.5]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Front panel */}
      <mesh position={[0, 0, 0.8]}>
        <boxGeometry args={[2.8, 3.8, 0.1]} />
        <meshStandardMaterial color="#333333" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Display */}
      <mesh position={[0, 1, 0.85]}>
        <boxGeometry args={[1, 0.5, 0.05]} />
        <meshStandardMaterial color="#0066ff" emissive="#0044aa" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Pipes */}
      <mesh position={[-1, -2.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1, -2.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

const KlimaModel = () => {
  const meshRef = useRef<any>();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main unit */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.5, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.8} />
      </mesh>
      
      {/* Front grille */}
      <mesh position={[0, 0, 0.6]}>
        <boxGeometry args={[3.8, 1.3, 0.1]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.2} roughness={0.9} />
      </mesh>
      
      {/* Logo area */}
      <mesh position={[1.5, 0, 0.65]}>
        <boxGeometry args={[0.8, 0.3, 0.02]} />
        <meshStandardMaterial color="#0066ff" />
      </mesh>
      
      {/* Vents */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[-1.5 + i * 0.3, 0, 0.62]}>
          <boxGeometry args={[0.1, 1.2, 0.05]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
    </group>
  );
};

const RadyatorModel = () => {
  const meshRef = useRef<any>();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Radiator panels */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[-2.8 + i * 0.8, 0, 0]}>
          <boxGeometry args={[0.7, 3, 0.3]} />
          <meshStandardMaterial color="#f5f5f5" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}
      
      {/* Connection pipes */}
      <mesh position={[0, -1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 6]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Valve */}
      <mesh position={[-3.2, -1.8, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3]} />
        <meshStandardMaterial color="#brass" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const Model3DViewer: React.FC<Model3DViewerProps> = ({ 
  modelPath = 'kombi', 
  productName = 'Ürün 3D Görünüm',
  onClose 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedModel, setSelectedModel] = useState(modelPath);

  const modelTypes = [
    { id: 'kombi', name: 'Kombi Sistemi', component: KombiModel },
    { id: 'klima', name: 'Klima Sistemi', component: KlimaModel },
    { id: 'radyator', name: 'Radyatör Sistemi', component: RadyatorModel },
  ];

  const getCurrentModel = () => {
    const modelType = modelTypes.find(m => m.id === selectedModel);
    return modelType ? modelType.component : KombiModel;
  };

  const ModelComponent = getCurrentModel();

  const productInfo = {
    kombi: {
      title: 'Yoğuşmalı Kombi Sistemi',
      description: 'Yüksek verimli yoğuşmalı teknoloji ile %96 verimlilik',
      specs: [
        'Güç: 24 kW',
        'Verimlilik: %96',
        'Garanti: 5 Yıl',
        'Yakıt: Doğalgaz'
      ]
    },
    klima: {
      title: 'Split Klima Sistemi',
      description: 'Inverter teknoloji ile enerji tasarrufu',
      specs: [
        'Soğutma: 12.000 BTU',
        'Verimlilik: A+++',
        'Garanti: 5 Yıl',
        'Tip: Split Klima'
      ]
    },
    radyator: {
      title: 'Panel Radyatör Sistemi',
      description: 'Hızlı ısınma ve homojen sıcaklık dağılımı',
      specs: [
        'Güç: 1200W',
        'Boyut: 60x60cm',
        'Garanti: 5 Yıl',
        'Tip: Panel Radyatör'
      ]
    }
  };

  const currentProductInfo = productInfo[selectedModel as keyof typeof productInfo];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative w-full h-96'} bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden`}>
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg text-sm border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {modelTypes.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          title={isRotating ? 'Rotasyonu Durdur' : 'Rotasyonu Başlat'}
        >
          {isRotating ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        </button>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          title="Ürün Bilgileri"
        >
          <InformationCircleIcon className="h-5 w-5" />
        </button>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          title={isFullscreen ? 'Tam Ekrandan Çık' : 'Tam Ekran'}
        >
          <ArrowsPointingOutIcon className="h-5 w-5" />
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            title="Kapat"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Product Info Panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="absolute left-4 top-16 z-10 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl max-w-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {currentProductInfo.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {currentProductInfo.description}
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">Özellikler:</h4>
              {currentProductInfo.specs.map((spec, index) => (
                <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  • {spec}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
          🖱️ Sürükleyerek çevirin • 🖲️ Zoom için tekerlek • 📱 Dokunarak etkileşim
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* 3D Model */}
          <ModelComponent />

          {/* Environment and Effects */}
          <Environment preset="sunset" />
          <ContactShadows 
            position={[0, -3, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={4} 
          />

          {/* Controls */}
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={isRotating}
            autoRotateSpeed={2}
            minDistance={3}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex space-x-2">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          title={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
          {isMuted ? <SpeakerXMarkIcon className="h-5 w-5" /> : <SpeakerWaveIcon className="h-5 w-5" />}
        </button>
        
        <button
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          title="Ekran Görüntüsü Al"
        >
          <PhotoIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Loading State */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center opacity-20">
          <CubeIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">3D Model Görüntüleyici</p>
        </div>
      </div>
    </div>
  );
};

export default Model3DViewer; 