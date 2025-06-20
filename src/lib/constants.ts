import { NavItem } from '@/types';

// Site Configuration
export const SITE_CONFIG = {
  name: 'Öz Mevsim Isı Sistemleri',
  description: 'İzmir\'de profesyonel klima, kombi ve ısıtma sistemleri montajı ve satışı',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://ozmevsim.com',
  keywords: [
    'klima montajı',
    'kombi montajı',
    'ısıtma sistemleri',
    'radyatör montajı',
    'İzmir klima',
    'İzmir kombi',
    'VRF sistem',
    'split klima',
    'salon tipi klima',
    'yoğuşmalı kombi',
    'panel radyatör',
    'döküm radyatör',
    'yerden ısıtma'
  ],
  author: 'Öz Mevsim Isı Sistemleri',
  creator: 'Öz Mevsim Isı Sistemleri',
  publisher: 'Öz Mevsim Isı Sistemleri',
};

// Navigation Menu
export const NAVIGATION_MENU: NavItem[] = [
  {
    label: 'Anasayfa',
    href: '/',
  },
  {
    label: 'Hizmetlerimiz',
    href: '/hizmetlerimiz',
    children: [
      {
        label: 'Klima Montajı',
        href: '/hizmetlerimiz/klima-montaji',
        icon: 'snowflake',
      },
      {
        label: 'Kombi Montajı',
        href: '/hizmetlerimiz/kombi-montaji',
        icon: 'flame',
      },
      {
        label: 'Radyatör Montajı',
        href: '/hizmetlerimiz/radyator-montaji',
        icon: 'thermometer',
      },
      {
        label: 'VRF Sistemler',
        href: '/hizmetlerimiz/vrf-sistemler',
        icon: 'building',
      },
      {
        label: 'Yerden Isıtma',
        href: '/hizmetlerimiz/yerden-isitma',
        icon: 'home',
      },
    ],
  },
  {
    label: 'Ürünlerimiz',
    href: '/urunlerimiz',
    children: [
      {
        label: 'Klimalar',
        href: '/urunlerimiz/klimalar',
        icon: 'snowflake',
      },
      {
        label: 'Kombiler',
        href: '/urunlerimiz/kombiler',
        icon: 'flame',
      },
      {
        label: 'Radyatörler',
        href: '/urunlerimiz/radyatorler',
        icon: 'thermometer',
      },
    ],
  },
  {
    label: 'Galeri',
    href: '/galeri',
  },
  {
    label: 'Hakkımızda',
    href: '/hakkimizda',
  },
  {
    label: 'İletişim',
    href: '/iletisim',
  },
];

// Service Categories
export const SERVICE_CATEGORIES = {
  KLIMA: 'klima',
  KOMBI: 'kombi',
  RADYATOR: 'radyator',
  VRF: 'vrf',
  YERDEN_ISITMA: 'yerden-isitma',
} as const;

// Product Categories
export const PRODUCT_CATEGORIES = {
  KLIMA: 'klima',
  KOMBI: 'kombi',
  RADYATOR: 'radyator',
} as const;

// Brands
export const BRANDS = [
  {
    name: 'Demirdöküm',
    logo: '/images/brands/demirdokum.png',
    description: 'Türkiye\'nin önde gelen ısıtma sistemleri markası',
  },
  {
    name: 'Bosch',
    logo: '/images/brands/bosch.png',
    description: 'Alman teknolojisi ile güvenilir ısıtma çözümleri',
  },
  {
    name: 'Buderus',
    logo: '/images/brands/buderus.png',
    description: 'Premium kalitede kombi ve ısıtma sistemleri',
  },
  {
    name: 'Vaillant',
    logo: '/images/brands/vaillant.png',
    description: 'Yenilikçi ısıtma teknolojileri',
  },
  {
    name: 'Daikin',
    logo: '/images/brands/daikin.png',
    description: 'Dünya lideri klima teknolojileri',
  },
  {
    name: 'Mitsubishi',
    logo: '/images/brands/mitsubishi.png',
    description: 'Japon teknolojisi klima sistemleri',
  },
  {
    name: 'Toshiba',
    logo: '/images/brands/toshiba.png',
    description: 'Inverter teknolojili klima çözümleri',
  },
  {
    name: 'Samsung',
    logo: '/images/brands/samsung.png',
    description: 'Akıllı klima sistemleri',
  },
];

// Statistics
export const STATISTICS = [
  {
    label: 'Mutlu Müşteri',
    value: 500,
    suffix: '+',
    icon: 'users',
  },
  {
    label: 'Yıllık Deneyim',
    value: 10,
    suffix: '+',
    icon: 'calendar',
  },
  {
    label: 'Uzman Ekip',
    value: 50,
    suffix: '+',
    icon: 'user-check',
  },
  {
    label: 'Tamamlanan Proje',
    value: 1000,
    suffix: '+',
    icon: 'check-circle',
  },
];

// Features
export const FEATURES = [
  {
    title: 'Uzman Kadro',
    description: 'Alanında uzman ve sertifikalı teknisyen kadromuz',
    icon: 'user-check',
  },
  {
    title: 'Hızlı Montaj',
    description: 'Profesyonel ekipmanlarla hızlı ve kaliteli montaj',
    icon: 'clock',
  },
  {
    title: 'Garanti',
    description: 'Tüm işlerimizde 2 yıl servis garantisi',
    icon: 'shield-check',
  },
  {
    title: '7/24 Destek',
    description: 'Arıza durumlarında 7/24 teknik destek hizmeti',
    icon: 'phone',
  },
];

// Contact Information
export const CONTACT_INFO = {
  phone: '+90 232 XXX XX XX',
  whatsapp: '+90 532 XXX XX XX',
  email: 'info@ozmevsim.com',
  address: 'Adres bilgisi buraya gelecek, İzmir',
  workingHours: 'Pazartesi - Cumartesi: 08:00 - 18:00',
  socialMedia: {
    facebook: 'https://facebook.com/ozmevsim',
    instagram: 'https://instagram.com/ozmevsim',
    twitter: 'https://twitter.com/ozmevsim',
    linkedin: 'https://linkedin.com/company/ozmevsim',
    youtube: 'https://youtube.com/@ozmevsim',
  },
};

// API Endpoints
export const API_ENDPOINTS = {
  HERO_SLIDES: '/api/hero-slides',
  SERVICES: '/api/services',
  PRODUCTS: '/api/products',
  BRANDS: '/api/brands',
  GALLERY: '/api/gallery',
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/newsletter',
  SEARCH: '/api/search',
};

// Image Sizes
export const IMAGE_SIZES = {
  HERO: {
    width: 1920,
    height: 1080,
  },
  CARD: {
    width: 400,
    height: 300,
  },
  THUMBNAIL: {
    width: 200,
    height: 150,
  },
  GALLERY: {
    width: 800,
    height: 600,
  },
  BRAND_LOGO: {
    width: 200,
    height: 100,
  },
};

// Animation Delays
export const ANIMATION_DELAYS = {
  FAST: 0.1,
  NORMAL: 0.2,
  SLOW: 0.3,
  STAGGER: 0.1,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PRODUCTS_PER_PAGE: 16,
  SERVICES_PER_PAGE: 8,
  GALLERY_PER_PAGE: 20,
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Bu alan zorunludur',
  EMAIL_INVALID: 'Geçerli bir email adresi giriniz',
  PHONE_INVALID: 'Geçerli bir telefon numarası giriniz',
  MIN_LENGTH: (length: number) => `En az ${length} karakter olmalıdır`,
  MAX_LENGTH: (length: number) => `En fazla ${length} karakter olmalıdır`,
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
  NETWORK: 'Bağlantı hatası. İnternet bağlantınızı kontrol ediniz.',
  NOT_FOUND: 'Aradığınız sayfa bulunamadı.',
  SERVER_ERROR: 'Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.',
  FORM_VALIDATION: 'Lütfen formu doğru şekilde doldurunuz.',
  FILE_TOO_LARGE: 'Dosya boyutu çok büyük.',
  UNSUPPORTED_FILE: 'Desteklenmeyen dosya formatı.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Formunuz başarıyla gönderildi.',
  MESSAGE_SENT: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
  NEWSLETTER_SUBSCRIBED: 'Bülten aboneliğiniz başarıyla oluşturuldu.',
  COPY_SUCCESS: 'Panoya kopyalandı.',
};

// Meta Tags
export const META_TAGS = {
  VIEWPORT: 'width=device-width, initial-scale=1',
  THEME_COLOR: '#3B82F6',
  APPLE_MOBILE_WEB_APP_CAPABLE: 'yes',
  APPLE_MOBILE_WEB_APP_STATUS_BAR_STYLE: 'default',
  APPLE_MOBILE_WEB_APP_TITLE: 'Öz Mevsim',
  APPLICATION_NAME: 'Öz Mevsim Isı Sistemleri',
  MSAPPLICATION_TOOLTIP: 'Öz Mevsim Isı Sistemleri',
  MSAPPLICATION_START_URL: '/',
};

// Cache Durations (in seconds)
export const CACHE_DURATIONS = {
  STATIC_ASSETS: 31536000, // 1 year
  IMAGES: 86400, // 1 day
  API_RESPONSES: 300, // 5 minutes
  PAGE_CACHE: 3600, // 1 hour
};

// Rate Limiting
export const RATE_LIMITS = {
  CONTACT_FORM: {
    requests: 5,
    window: 900, // 15 minutes
  },
  API_GENERAL: {
    requests: 100,
    window: 3600, // 1 hour
  },
}; 