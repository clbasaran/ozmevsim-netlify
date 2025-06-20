'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  UserIcon,
  CpuChipIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  FireIcon,
  BoltIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
  actions?: Array<{
    label: string;
    type: 'call' | 'email' | 'link';
    value: string;
  }>;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Kombi kurulumu',
    'Klima montajı',
    'Proje danışmanlığı',
    'Fiyat bilgisi',
    'İletişim bilgileri'
  ];

  const responses: Record<string, {
    text: string;
    quickReplies?: string[];
    actions?: Array<{
      label: string;
      type: 'call' | 'email' | 'link';
      value: string;
    }>;
  }> = {
    'kombi kurulumu': {
      text: 'Kombi kurulum hizmetimiz profesyonel ekibimizle gerçekleştirilir. Tüm marka kombiler için kurulum yapıyoruz.',
      quickReplies: ['Fiyat bilgisi', 'Randevu al', 'Garanti süresi'],
      actions: [
        { label: 'Hemen Ara', type: 'call', value: '+902125550123' },
        { label: 'WhatsApp', type: 'link', value: 'https://wa.me/905355550123' }
      ]
    },
    'klima montajı': {
      text: 'Klima montaj hizmetimizde tüm marka klimalar için profesyonel kurulum yapıyoruz. Split, multi split ve VRF sistemler.',
      quickReplies: ['Fiyat bilgisi', 'Randevu al', 'Hangi markalar'],
      actions: [
        { label: 'Hemen Ara', type: 'call', value: '+902125550123' }
      ]
    },
    'proje danışmanlığı': {
      text: 'Mühendislik ekibimizle proje danışmanlığı hizmeti sunuyoruz. Enerji verimliliği ve sistem tasarımı konularında uzmanız.',
      quickReplies: ['Randevu al', 'Referanslar', 'İletişim'],
      actions: [
        { label: 'E-posta Gönder', type: 'email', value: 'info@ozmevsim.com' }
      ]
    },
    'fiyat bilgisi': {
      text: 'Fiyat bilgisi için lütfen bizimle iletişime geçin. Her proje özeldir ve detaylı keşif sonrası fiyatlandırma yapılır.',
      actions: [
        { label: 'Hemen Ara', type: 'call', value: '+902125550123' },
        { label: 'E-posta', type: 'email', value: 'info@ozmevsim.com' }
      ]
    },
    'iletişim bilgileri': {
      text: 'İletişim bilgilerimiz:',
      actions: [
        { label: 'Telefon', type: 'link', value: 'tel:+903123570600' },
        { label: 'WhatsApp', type: 'link', value: 'https://wa.me/905324467367' },
        { label: 'Adres', type: 'link', value: 'https://maps.google.com/?q=Kuşcağız+Mahallesi+Sanatoryum+Caddesi+No+221/A+Keçiören+Ankara' }
      ]
    },
    'default': {
      text: 'Size nasıl yardımcı olabilirim? Kombi kurulumu, klima montajı veya proje danışmanlığı konularında destek verebilirim.',
      quickReplies: quickReplies
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: 'Merhaba! Öz Mevsim Isı Sistemleri\'ne hoş geldiniz. Size nasıl yardımcı olabilirim?',
        isBot: true,
        timestamp: new Date(),
        quickReplies: quickReplies
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const key = text.toLowerCase().trim();
      const response = responses[key] || responses['default'];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        quickReplies: response.quickReplies,
        actions: response.actions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleAction = (action: { type: string; value: string }) => {
    switch (action.type) {
      case 'call':
        window.open(`tel:${action.value}`);
        break;
      case 'email':
        window.open(`mailto:${action.value}`);
        break;
      case 'link':
        window.open(action.value, '_blank');
        break;
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChatBubbleLeftRightIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
        
        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
          1
        </div>
        

      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <CpuChipIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Öz Mevsim Asistan</h3>
                  <p className="text-sm opacity-90">Online • Hemen yanıtlıyor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.isBot 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {message.isBot ? (
                        <CpuChipIcon className="h-5 w-5" />
                      ) : (
                        <UserIcon className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.isBot
                          ? 'bg-white text-gray-800 shadow-sm'
                          : 'bg-primary-600 text-white'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                      
                      {/* Quick Replies */}
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-2">
                          {message.quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full hover:bg-primary-200 transition-colors"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {/* Actions */}
                      {message.actions && (
                        <div className="flex flex-wrap gap-2">
                          {message.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => handleAction(action)}
                              className="px-3 py-2 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-1"
                            >
                              {action.type === 'call' && <PhoneIcon className="h-3 w-3" />}
                              {action.type === 'email' && <EnvelopeIcon className="h-3 w-3" />}
                              {action.type === 'link' && <MapPinIcon className="h-3 w-3" />}
                              <span>{action.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString('tr-TR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                      <CpuChipIcon className="h-5 w-5" />
                    </div>
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
              
              {/* Quick Access */}
              <div className="flex justify-center mt-3">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-3 w-3" />
                    <span>Ortalama yanıt: 2dk</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <InformationCircleIcon className="h-3 w-3" />
                    <span>7/24 Destek</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot; 