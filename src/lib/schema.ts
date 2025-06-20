// Advanced Schema Markup Library for ozmevsim.com
export interface BusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  '@id': string;
  url: string;
  telephone: string;
  email: string;
  address: any;
  geo: any;
  openingHoursSpecification: any[];
  priceRange: string;
  image: string;
  serviceArea: any;
  areaServed: string[];
  aggregateRating?: any;
  sameAs: string[];
  foundingDate: string;
  numberOfEmployees: string;
  description: string;
}

// Ana işletme schema
export function getBusinessSchema(): BusinessSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: 'Özmevsim Doğalgaz ve Klima Sistemleri',
    '@id': 'https://ozmevsim.com/#business',
    url: 'https://ozmevsim.com',
    telephone: '+90-312-357-0600',
    email: 'info@ozmevsim.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kuşcağız Mahallesi Sanatoryum Caddesi No:221/A',
      addressLocality: 'Keçiören',
      addressRegion: 'Ankara',
      postalCode: '06000',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.9334,
      longitude: 32.8597
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00'
      }
    ],
    priceRange: '₺₺',
    image: 'https://ozmevsim.com/images/ozmevsim-logo.jpg',
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 39.9334,
        longitude: 32.8597
      },
      geoRadius: '50000'
    },
    areaServed: [
      'Çankaya', 'Keçiören', 'Mamak', 'Altındağ', 'Yenimahalle', 
      'Etimesgut', 'Sincan', 'Pursaklar', 'Gölbaşı', 'Balgat',
      'Batıkent', 'Ostim', 'İvedik', 'Siteler', 'Demetevler'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    sameAs: [
      'https://www.facebook.com/ozmevsim',
      'https://www.instagram.com/ozmevsim',
      'https://www.linkedin.com/company/ozmevsim',
      'https://twitter.com/ozmevsim'
    ],
    foundingDate: '1999',
    numberOfEmployees: '25-50',
    description: 'Ankara\'da 25 yıllık deneyimle doğalgaz tesisatı, kombi ve klima sistemleri kurulum, bakım ve onarım hizmetleri.'
  };
}

// Hizmet schema oluşturucu
export function getServiceSchema(serviceType: string, serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceType,
    name: serviceName,
    description: description,
    provider: {
      '@id': 'https://ozmevsim.com/#business'
    },
    areaServed: 'Ankara',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceName} Hizmetleri`,
      itemListElement: getServiceOffers(serviceType)
    }
  };
}

// Hizmet önerileri
function getServiceOffers(serviceType: string) {
  const offers = {
    'Doğalgaz Tesisatı': [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Yeni Bina Doğalgaz Projesi',
          description: 'Ankara\'da yeni binalar için doğalgaz proje ve tesisat hizmeti'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Doğalgaz Dönüşümü',
          description: 'Kömür ve fuel-oil sistemlerinden doğalgaza dönüşüm'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Doğalgaz Aboneliği',
          description: 'Doğalgaz abonelik işlemleri ve resmi prosedürler'
        }
      }
    ],
    'Kombi Servisi': [
      {
        '@type': 'Offer', 
        itemOffered: {
          '@type': 'Service',
          name: 'Kombi Kurulumu',
          description: 'Tüm marka kombi montaj ve kurulum hizmeti'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kombi Tamiri',
          description: 'Kombi arıza giderme ve onarım hizmeti'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Kombi Bakımı',
          description: 'Periyodik kombi bakım ve temizlik hizmeti'
        }
      }
    ],
    'Klima Servisi': [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Klima Montajı',
          description: 'Split, duvar tipi, kaset tipi klima montajı'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Klima Bakımı',
          description: 'Klima temizlik ve bakım hizmeti'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Klima Onarımı',
          description: 'Klima arıza giderme ve parça değişimi'
        }
      }
    ]
  };

  return offers[serviceType as keyof typeof offers] || [];
}

// FAQ Schema oluşturucu
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

// Ürün schema oluşturucu
export function getProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    category: product.category,
    image: `https://ozmevsim.com${product.image}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TRY',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@id': 'https://ozmevsim.com/#business'
      }
    },
    manufacturer: {
      '@type': 'Organization',
      name: product.brand
    }
  };
}

// Article/Blog schema oluşturucu
export function getArticleSchema(article: {
  title: string;
  description: string;
  publishDate: string;
  modifiedDate: string;
  author: string;
  image: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: `https://ozmevsim.com${article.image}`,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@id': 'https://ozmevsim.com/#business'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ozmevsim.com${article.url}`
    }
  };
}

// WebPage schema oluşturucu
export function getWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
  breadcrumb?: Array<{ name: string; url: string }>;
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `https://ozmevsim.com${page.url}`,
    inLanguage: 'tr-TR',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://ozmevsim.com/#website'
    },
    about: {
      '@id': 'https://ozmevsim.com/#business'
    },
    provider: {
      '@id': 'https://ozmevsim.com/#business'
    }
  };

  if (page.breadcrumb && page.breadcrumb.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@id': `https://ozmevsim.com${item.url}`,
          name: item.name
        }
      }))
    };
  }

  return schema;
}

// WebSite schema
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://ozmevsim.com/#website',
    url: 'https://ozmevsim.com',
    name: 'Özmevsim - Ankara Doğalgaz, Kombi, Klima Servisi',
    description: 'Ankara\'da doğalgaz tesisatı, kombi ve klima servisi. 25 yıllık deneyim, profesyonel hizmet.',
    publisher: {
      '@id': 'https://ozmevsim.com/#business'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ozmevsim.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'tr-TR'
  };
}

// Review schema oluşturucu
export function getReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  text: string;
  date: string;
}>) {
  return reviews.map(review => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: review.text,
    datePublished: review.date,
    itemReviewed: {
      '@id': 'https://ozmevsim.com/#business'
    }
  }));
}

// Tüm schema'ları birleştiren ana fonksiyon
export function getAllSchemas(pageType: string, data?: any) {
  const schemas: any[] = [
    getBusinessSchema(),
    getWebSiteSchema()
  ];

  switch (pageType) {
    case 'home':
      schemas.push(
        getServiceSchema('Doğalgaz Tesisatı', 'Ankara Doğalgaz Tesisatı', 'Ankara\'da doğalgaz tesisatı kurulum ve bakım hizmetleri'),
        getServiceSchema('Kombi Servisi', 'Ankara Kombi Servisi', 'Ankara\'da kombi kurulum, bakım ve onarım hizmetleri'),
        getServiceSchema('Klima Servisi', 'Ankara Klima Servisi', 'Ankara\'da klima montaj, bakım ve onarım hizmetleri')
      );
      break;
    
    case 'service':
      if (data) {
        schemas.push(getServiceSchema(data.serviceType, data.serviceName, data.description));
      }
      break;
    
    case 'product':
      if (data) {
        schemas.push(getProductSchema(data));
      }
      break;
    
    case 'article':
      if (data) {
        schemas.push(getArticleSchema(data));
      }
      break;
    
    case 'faq':
      if (data && data.faqs) {
        schemas.push(getFAQSchema(data.faqs));
      }
      break;
  }

  return schemas;
} 