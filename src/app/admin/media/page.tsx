'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhotoIcon,
  FolderIcon,
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FolderPlusIcon,
  XMarkIcon,
  CheckIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';

interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  type: 'image' | 'video' | 'document';
  mimeType: string;
  size: number;
  url: string;
  thumbnail?: string;
  folder: string;
  uploadedAt: string;
  dimensions?: { width: number; height: number };
  description?: string;
  alt?: string;
  tags?: string[];
}

interface MediaFolder {
  id: number;
  name: string;
  path: string;
  parent?: number;
  filesCount: number;
  createdAt: string;
}

const defaultFolders: MediaFolder[] = [
  { id: 1, name: 'Ürünler', path: 'products', filesCount: 0, createdAt: '2024-01-01' },
  { id: 2, name: 'Blog', path: 'blog', filesCount: 0, createdAt: '2024-01-01' },
  { id: 3, name: 'Referanslar', path: 'references', filesCount: 0, createdAt: '2024-01-01' },
  { id: 4, name: 'Logolar', path: 'logos', filesCount: 0, createdAt: '2024-01-01' },
  { id: 5, name: 'Genel', path: 'general', filesCount: 0, createdAt: '2024-01-01' }
];

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [folders, setFolders] = useState<MediaFolder[]>(defaultFolders);
  const [currentFolder, setCurrentFolder] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showFolderForm, setShowFolderForm] = useState(false);
  const [showFileDetail, setShowFileDetail] = useState(false);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFilesFromR2();
  }, [currentFolder]);

  const loadFilesFromR2 = async () => {
    setIsLoading(true);
    try {
      // Check if we're in development (use Cloudflare Functions) or production
      const isDev = process.env.NODE_ENV === 'development';
      const apiUrl = isDev ? '/api/upload-r2' : '/api/upload-r2';
      
      const response = await fetch(`${apiUrl}?folder=${currentFolder}`);
      const data = await response.json();
      
      if (data.success) {
        setFiles(data.data || []);
      } else {
        console.error('Failed to load files:', data.error);
        // Fallback to empty array in case of error
        setFiles([]);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesFolder = !currentFolder || file.folder === currentFolder || file.name.startsWith(currentFolder + '/');
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.tags && file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesType = !filterType || file.type === filterType;
    return matchesFolder && matchesSearch && matchesType;
  });

  const currentFolderData = folders.find(f => f.path === currentFolder);
  const subFolders = folders.filter(f => f.parent === currentFolderData?.id);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <PhotoIcon className="w-8 h-8 text-blue-500" />;
      case 'video': return <VideoCameraIcon className="w-8 h-8 text-red-500" />;
      case 'audio': return <MusicalNoteIcon className="w-8 h-8 text-green-500" />;
      default: return <DocumentIcon className="w-8 h-8 text-gray-500" />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    handleFiles(uploadedFiles);
  };

  const handleFiles = async (uploadedFiles: File[]) => {
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('folder', currentFolder);

      // Check if we're in development or production
      const isDev = process.env.NODE_ENV === 'development';
      const apiUrl = isDev ? '/api/upload-r2' : '/api/upload-r2';

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        // Refresh the file list
        await loadFilesFromR2();
        setShowUpload(false);
        alert(`${data.data.length} dosya başarıyla yüklendi!`);
      } else {
        alert('Dosya yükleme hatası: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Dosya yükleme sırasında bir hata oluştu.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleDeleteFile = async (id: string) => {
    if (confirm('Bu dosyayı silmek istediğinizden emin misiniz?')) {
      try {
        // TODO: Implement R2 delete API call when available
        const updated = files.filter(file => file.id !== id);
        setFiles(updated);
        alert('Dosya silindi. (Not: R2 silme işlemi henüz implementasyonda)');
      } catch (error) {
        console.error('Delete error:', error);
        alert('Dosya silinirken hata oluştu.');
      }
    }
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: MediaFolder = {
      id: Date.now(),
      name,
      path: currentFolder === '/' ? `/${name.toLowerCase()}` : `${currentFolder}/${name.toLowerCase()}`,
      parent: currentFolderData?.id,
      filesCount: 0,
      createdAt: new Date().toISOString()
    };

    const updated = [...folders, newFolder];
    setFolders(updated);
    setShowFolderForm(false);
  };

  const handleUpdateFile = (fileData: MediaFile) => {
    const updated = files.map(file => file.id === fileData.id ? fileData : file);
    setFiles(updated);
    setShowFileDetail(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medya Yönetimi</h1>
          <p className="mt-1 text-sm text-gray-600">
            Dosyalarınızı organize edin ve yönetin (Cloudflare R2)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFolderForm(true)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <FolderPlusIcon className="w-4 h-4" />
            Klasör Oluştur
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
          >
            <ArrowUpTrayIcon className="w-4 h-4" />
            Dosya Yükle
          </button>
        </div>
      </div>

      {/* Navigation & Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={() => setCurrentFolder('general')}
              className={`hover:text-orange-600 ${currentFolder === 'general' ? 'text-orange-600 font-medium' : ''}`}
            >
              Ana Dizin
            </button>
            {currentFolder !== 'general' && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {folders.find(f => f.path === currentFolder)?.name || currentFolder}
                </span>
              </>
            )}
          </div>

          <div className="flex-1 flex gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Dosya ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Filters */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Tüm Dosyalar</option>
              <option value="image">Resimler</option>
              <option value="video">Videolar</option>
              <option value="document">Belgeler</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                  <div className="bg-current w-1.5 h-1.5 rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
              >
                <div className="flex flex-col gap-1 w-4 h-4">
                  <div className="bg-current w-full h-0.5 rounded-sm"></div>
                  <div className="bg-current w-full h-0.5 rounded-sm"></div>
                  <div className="bg-current w-full h-0.5 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Folder Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Klasörler</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setCurrentFolder(folder.path)}
              className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
                currentFolder === folder.path 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <FolderIcon className={`w-12 h-12 mb-2 ${
                currentFolder === folder.path ? 'text-orange-500' : 'text-blue-500'
              }`} />
              <span className="text-sm font-medium">{folder.name}</span>
              <span className="text-xs text-gray-500">
                {files.filter(f => f.folder === folder.path || f.name.startsWith(folder.path + '/')).length} dosya
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Drag & Drop Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
        }`}
      >
        <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Dosyaları buraya sürükleyip bırakın
        </p>
        <p className="text-sm text-gray-600">
          veya <button onClick={() => setShowUpload(true)} className="text-orange-600 hover:text-orange-700">dosya seçin</button>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Seçili klasör: <span className="font-medium">{folders.find(f => f.path === currentFolder)?.name || currentFolder}</span>
        </p>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-8 h-8 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Dosyalar yükleniyor...</p>
        </div>
      ) : (
        /* Files */
        filteredFiles.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Dosyalar ({filteredFiles.length})
              </h3>
              {selectedFiles.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedFiles.length} seçili</span>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    İndir
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`${selectedFiles.length} dosyayı silmek istediğinizden emin misiniz?`)) {
                        selectedFiles.forEach(id => handleDeleteFile(id));
                        setSelectedFiles([]);
                      }
                    }}
                    className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                  >
                    Sil
                  </button>
                </div>
              )}
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFiles.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnail || file.url}
                          alt={file.alt || file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </div>
                    
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{file.name}</h4>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>

                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setShowFileDetail(true);
                        }}
                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFile(file);
                          setShowFileDetail(true);
                        }}
                        className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedFiles([...selectedFiles, file.id]);
                        } else {
                          setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                        }
                      }}
                      className="absolute top-2 left-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosya</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boyut</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedFiles.includes(file.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFiles([...selectedFiles, file.id]);
                                } else {
                                  setSelectedFiles(selectedFiles.filter(id => id !== file.id));
                                }
                              }}
                              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mr-3"
                            />
                            <div className="flex items-center">
                              {file.type === 'image' ? (
                                <img
                                  src={file.thumbnail || file.url}
                                  alt={file.alt || file.name}
                                  className="w-10 h-10 rounded object-cover mr-3"
                                />
                              ) : (
                                <div className="w-10 h-10 flex items-center justify-center mr-3">
                                  {getFileIcon(file.type)}
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900">{file.name}</div>
                                {file.dimensions && (
                                  <div className="text-xs text-gray-500">
                                    {file.dimensions.width} × {file.dimensions.height}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {new Date(file.uploadedAt).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedFile(file);
                                setShowFileDetail(true);
                              }}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedFile(file);
                                setShowFileDetail(true);
                              }}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteFile(file.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Dosya bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterType
                ? 'Arama kriterlerinizi değiştirmeyi deneyin.'
                : 'Bu klasörde henüz dosya yok.'}
            </p>
          </div>
        )
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Dosya Yükle</h2>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Dosya Seçin</h3>
                  <p className="text-sm text-gray-600 mb-4">PNG, JPG, GIF, MP4, PDF (maks. 10MB)</p>
                  
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 cursor-pointer"
                  >
                    <PhotoIcon className="w-4 h-4 mr-2" />
                    Dosya Seç
                  </label>
                </div>

                {isUploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-sm text-gray-600">Dosyalar yükleniyor...</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Folder Form Modal */}
      <AnimatePresence>
        {showFolderForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Yeni Klasör</h2>
                  <button
                    onClick={() => setShowFolderForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const name = formData.get('name') as string;
                  if (name.trim()) {
                    handleCreateFolder(name.trim());
                  }
                }}
                className="p-6"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Klasör Adı
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Klasör adını girin"
                  />
                </div>

                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowFolderForm(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Oluştur
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Detail Modal */}
      <AnimatePresence>
        {showFileDetail && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Dosya Detayları</h2>
                  <button
                    onClick={() => setShowFileDetail(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* File Preview */}
                <div className="text-center">
                  {selectedFile.type === 'image' ? (
                    <img
                      src={selectedFile.url}
                      alt={selectedFile.alt || selectedFile.name}
                      className="max-w-full max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-lg">
                      {getFileIcon(selectedFile.type)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosya Adı
                    </label>
                    <input
                      type="text"
                      value={selectedFile.name}
                      onChange={(e) => setSelectedFile({...selectedFile, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dosya Boyutu
                    </label>
                    <input
                      type="text"
                      value={formatFileSize(selectedFile.size)}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>

                  {selectedFile.type === 'image' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alt Text
                      </label>
                      <input
                        type="text"
                        value={selectedFile.alt || ''}
                        onChange={(e) => setSelectedFile({...selectedFile, alt: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Görsel açıklaması"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={selectedFile.url}
                        disabled
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(selectedFile.url)}
                        className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200"
                      >
                        <DocumentDuplicateIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    rows={3}
                    value={selectedFile.description || ''}
                    onChange={(e) => setSelectedFile({...selectedFile, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="Dosya açıklaması"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etiketler (virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    value={selectedFile.tags?.join(', ') || ''}
                    onChange={(e) => setSelectedFile({...selectedFile, tags: e.target.value.split(', ').filter(t => t.trim())})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="etiket1, etiket2, etiket3"
                  />
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowFileDetail(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => handleUpdateFile(selectedFile)}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <CheckIcon className="w-4 h-4" />
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 