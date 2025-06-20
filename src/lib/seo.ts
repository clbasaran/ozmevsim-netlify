// SEO Optimization Library
import { Metadata } from 'next';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  service?: string;
  location?: string;
  schema?: Record<string, any>;
}

// Ana anahtar kelimeler
export const PRIMARY_KEYWORDS = {
  'ankara-dogalgaz': 'ankara doğalgaz tesisatı',
  'ankara-kombi': 'ankara kombi servisi',
  'ankara-klima': 'ankara klima servisi',
  'ankara-kombi-tamiri': 'ankara kombi tamiri',
  'ankara-klima-montaji': 'ankara klima montajı'
};

// İlçe bazlı anahtar kelimeler
export const ANKARA_DISTRICTS = [
  'Çankaya', 'Keçiören', 'Mamak', 'Yenimahalle', 'Etimesgut',
  'Sincan', 'Altındağ', 'Pursaklar', 'Gölbaşı', 'Polatlı'
];

// SEO meta tag şablonları
export const SEO_TEMPLATES = {
  home: {
    title: 'Ankara Doğalgaz Tesisatı | Kombi Servisi | Klima - Özmevsim',
    description: 'Ankara\'da doğalgaz tesisatı, kombi satış-servis ve klima sistemleri. 7/24 servis ✓ Uygun fiyat ✓ Garantili işçilik. ☎ 0312 357 0600',
    keywords: ['ankara doğalgaz', 'ankara kombi servisi', 'ankara klima servisi', 'doğalgaz tesisatı ankara', 'kombi tamiri ankara']
  },
  services: {
    'dogalgaz-tesisati': {
      title: 'Ankara Doğalgaz Tesisatı | Proje | Abonelik - Özmevsim',
      description: 'Ankara\'da doğalgaz tesisatı, proje, ruhsat ve abonelik işlemleri. Güvenli kurulum, uygun fiyat. 7/24 hizmet. ☎ 0312 357 0600',
      keywords: ['ankara doğalgaz tesisatı', 'ankara doğalgaz projesi', 'ankara doğalgaz ruhsatı', 'ankara doğalgaz aboneliği']
    },
    'kombi-servisi': {
      title: 'Ankara Kombi Servisi - Baymak, Demirdöküm, Vaillant Yetkili',
      description: 'Ankara kombi servisi 7/24. Tüm marka kombi tamiri, bakım, montaj. Aynı gün servis. Garanti. ☎ 0312 357 0600',
      keywords: ['ankara kombi servisi', 'ankara kombi tamiri', 'ankara kombi bakımı', 'ankara kombi montajı']
    },
    'klima-servisi': {
      title: 'Ankara Klima Montajı ve Servisi | Split, VRF Sistemler',
      description: 'Ankara klima montajı ve servisi. Tüm marka klima kurulumu, bakım, onarım. Hızlı servis, uygun fiyat. ☎ 0312 357 0600',
      keywords: ['ankara klima servisi', 'ankara klima montajı', 'ankara klima tamiri', 'ankara split klima']
    }
  }
};

// Dinamik meta tag oluşturucu
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const baseUrl = 'https://ozmevsim.com';
  
  // Dinamik başlık oluşturma
  let title = config.title;
  if (config.service && config.location) {
    title = `${config.location} ${config.service} | Özmevsim`;
  }
  
  // Dinamik açıklama oluşturma
  let description = config.description;
  if (config.service && config.location) {
    description = `${config.location} bölgesinde profesyonel ${config.service.toLowerCase()} hizmeti. 7/24 hizmet, uygun fiyat, garantili işçilik.`;
  }
  
  return {
    title: title || 'Özmevsim - Ankara Doğalgaz, Kombi, Klima Servisi',
    description: description || 'Ankara\'da doğalgaz tesisatı, kombi ve klima servisi. Profesyonel hizmet, uygun fiyat.',
    keywords: config.keywords || [],
    authors: [{ name: 'Özmevsim Isı Sistemleri' }],
    creator: 'Özmevsim Isı Sistemleri',
    publisher: 'Özmevsim Isı Sistemleri',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical || '/',
      languages: {
        'tr-TR': '/tr',
      },
    },
    openGraph: {
      title: title || 'Özmevsim - Ankara Doğalgaz, Kombi, Klima Servisi',
      description: description || 'Ankara\'da doğalgaz tesisatı, kombi ve klima servisi.',
      url: config.canonical || baseUrl,
      siteName: 'Özmevsim',
      images: [
        {
          url: config.ogImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Özmevsim Ankara Doğalgaz Kombi Klima Servisi',
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Özmevsim - Ankara Doğalgaz, Kombi, Klima Servisi',
      description: description || 'Ankara\'da doğalgaz tesisatı, kombi ve klima servisi.',
      images: [config.ogImage || '/twitter-image.jpg'],
      creator: '@ozmevsim',
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    other: {
      'msapplication-TileColor': '#da532c',
      'theme-color': '#ffffff',
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
      yandex: process.env.YANDEX_VERIFICATION || '',
    },
    category: 'business',
    applicationName: 'Özmevsim'
  };
}

// Hizmet bazlı meta tag oluşturucu
export function generateServiceMetadata(service: string, location?: string): Metadata {
  const serviceConfig = SEO_TEMPLATES.services[service as keyof typeof SEO_TEMPLATES.services];
  
  if (!serviceConfig) {
    return generateSEOMetadata({});
  }
  
  return generateSEOMetadata({
    title: location ? `${location} ${serviceConfig.title}` : serviceConfig.title,
    description: location ? `${location} bölgesinde ${serviceConfig.description}` : serviceConfig.description,
    keywords: serviceConfig.keywords,
    canonical: `/${service}`,
    service,
    location
  });
}

// İlçe bazlı sayfa meta tag oluşturucu
export function generateLocationMetadata(district: string, service: string): Metadata {
  const serviceNames = {
    'dogalgaz-tesisati': 'Doğalgaz Tesisatı',
    'kombi-servisi': 'Kombi Servisi',
    'klima-servisi': 'Klima Servisi'
  };
  
  const serviceName = serviceNames[service as keyof typeof serviceNames] || service;
  
  return generateSEOMetadata({
    title: `${district} ${serviceName} | 7/24 Hizmet - Özmevsim`,
    description: `${district} bölgesinde profesyonel ${serviceName.toLowerCase()} hizmeti. Hızlı servis, uygun fiyat, garantili işçilik. ☎ 0312 357 0600`,
    keywords: [
      `${district.toLowerCase()} ${service.replace('-', ' ')}`,
      `${district.toLowerCase()} ${serviceName.toLowerCase()}`,
      `${district} ${serviceName} fiyatı`,
      `${district} ${serviceName} servisi`
    ],
    canonical: `/${district.toLowerCase().replace(' ', '-')}-${service}`,
    service: serviceName,
    location: district
  });
}

// Breadcrumb oluşturucu
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': `https://ozmevsim.com${item.url}`,
        name: item.name
      }
    }))
  };
} 