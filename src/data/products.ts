export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

export const products: Product[] = [
  // BOSCH Kombiler
  {
    id: '1',
    name: 'Condens 1200W',
    brand: 'Bosch',
    category: 'Kombi',
    description: 'Bosch Condens 1200W yoğuşmalı kombi, kompakt tasarım ve yüksek verimlilik sunar. Ev tipi kullanım için ideal.',
    image: '/uploads/kombiler/bosch/codens 1200w.png',
    features: [
      'Yoğuşmalı teknoloji',
      'A+ enerji sınıfı',
      'Kompakt tasarım',
      'Sessiz çalışma',
      'Kolay montaj'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'A+',
      'Boyutlar': '717 x 400 x 330 mm',
      'Ağırlık': '34 kg',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: true,
    tags: ['kombi', 'yoğuşmalı', 'bosch', 'kompakt']
  },
  {
    id: '2',
    name: 'Condens 2200i',
    brand: 'Bosch',
    category: 'Kombi',
    description: 'Bosch Condens 2200i akıllı kombi sistemi, modern teknoloji ve üstün performans ile öne çıkar.',
    image: '/uploads/kombiler/bosch/codens 2200i.png',
    features: [
      'Akıllı kontrol sistemi',
      'A++ enerji sınıfı',
      'Modülasyonlu yanma',
      'Uzaktan kontrol',
      'Yüksek verimlilik'
    ],
    specifications: {
      'Güç': '24-30 kW',
      'Enerji Sınıfı': 'A++',
      'Boyutlar': '717 x 400 x 348 mm',
      'Ağırlık': '36 kg',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: true,
    tags: ['kombi', 'akıllı', 'bosch', 'uzaktan-kontrol']
  },

  // DemirDöküm Kombiler
  {
    id: '3',
    name: 'AdemiX',
    brand: 'DemirDöküm',
    category: 'Kombi',
    description: 'DemirDöküm AdemiX kombi, yerli üretim kalitesi ve güvenilir performans sunar. Ekonomik çözüm arayan kullanıcılar için ideal.',
    image: '/uploads/kombiler/demirdokum/ademiX.png',
    features: [
      'Yerli üretim',
      'Güvenilir çalışma',
      'Kolay bakım',
      'Geniş servis ağı',
      'Ekonomik işletme'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'B',
      'Tip': 'Geleneksel',
      'Boyutlar': '730 x 400 x 320 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: false,
    tags: ['kombi', 'demirdokum', 'yerli', 'ekonomik']
  },
  {
    id: '4',
    name: 'VintomiX',
    brand: 'DemirDöküm',
    category: 'Kombi',
    description: 'DemirDöküm VintomiX kombi, modern tasarım ve güçlü performans ile evinizde konfor sağlar.',
    image: '/uploads/kombiler/demirdokum/vintomiX.png',
    features: [
      'Modern tasarım',
      'Güçlü performans',
      'Dayanıklı yapı',
      'Kolay kullanım',
      'Sessiz çalışma'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'B',
      'Tip': 'Geleneksel',
      'Boyutlar': '730 x 400 x 320 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: false,
    tags: ['kombi', 'demirdokum', 'modern', 'güçlü']
  },
  {
    id: '5',
    name: 'Nitromix',
    brand: 'DemirDöküm',
    category: 'Kombi',
    description: 'DemirDöküm Nitromix kombi, nitro teknolojisi ile yüksek verimlilik ve temiz yanma sağlar.',
    image: '/uploads/kombiler/demirdokum/nitromix.png',
    features: [
      'Nitro teknolojisi',
      'Temiz yanma',
      'Verimli çalışma',
      'Çevre dostu',
      'Uzun ömür'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'B',
      'Tip': 'Nitro',
      'Boyutlar': '730 x 400 x 320 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: true,
    tags: ['kombi', 'demirdokum', 'nitro', 'temiz-yanma']
  },
  {
    id: '6',
    name: 'Nitromix Ioni',
    brand: 'DemirDöküm',
    category: 'Kombi',
    description: 'DemirDöküm Nitromix Ioni kombi, iyonik alev teknolojisi ile üstün performans ve enerji tasarrufu sunar.',
    image: '/uploads/kombiler/demirdokum/nitromix ioni.png',
    features: [
      'İyonik alev teknolojisi',
      'Üstün performans',
      'Enerji tasarrufu',
      'Temiz emisyon',
      'Gelişmiş kontrol'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'A',
      'Tip': 'İyonik',
      'Boyutlar': '730 x 400 x 320 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: true,
    tags: ['kombi', 'demirdokum', 'iyonik', 'enerji-tasarrufu']
  },
  {
    id: '7',
    name: 'Nitromix Ioni Hero',
    brand: 'DemirDöküm',
    category: 'Kombi',
    description: 'DemirDöküm Nitromix Ioni Hero kombi, en gelişmiş teknoloji ile maksimum verimlilik ve konfor sağlar.',
    image: '/uploads/kombiler/demirdokum/nitromix ioni hero.png',
    features: [
      'Hero teknolojisi',
      'Maksimum verimlilik',
      'Premium özellikler',
      'Akıllı kontrol',
      'Üstün kalite'
    ],
    specifications: {
      'Güç': '24-30 kW',
      'Enerji Sınıfı': 'A+',
      'Tip': 'Hero Serisi',
      'Boyutlar': '730 x 400 x 320 mm',
      'Garanti': '3 yıl'
    },
    inStock: true,
    featured: true,
    tags: ['kombi', 'demirdokum', 'hero', 'premium']
  },
  {
    id: '8',
    name: 'IsoMix',
    brand: 'DemirDöküm',
    category: 'Kombi',
    description: 'DemirDöküm IsoMix kombi, izolasyon teknolojisi ile enerji kaybını minimize eder ve yüksek verimlilik sağlar.',
    image: '/uploads/kombiler/demirdokum/isomix.png',
    features: [
      'İzolasyon teknolojisi',
      'Enerji kaybı minimumu',
      'Yüksek verimlilik',
      'Çevre dostu',
      'Dayanıklı yapı'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'A',
      'Tip': 'İzolasyonlu',
      'Boyutlar': '730 x 400 x 320 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: false,
    tags: ['kombi', 'demirdokum', 'izolasyon', 'verimli']
  },

  // VAILLANT Ürünleri
  {
    id: '10',
    name: 'ecoTEC Plus',
    brand: 'Vaillant',
    category: 'Kombi',
    description: 'Vaillant ecoTEC Plus yoğuşmalı kombi, güvenilir performans ve uzun ömür sunar.',
    image: '/uploads/products/vaillant-ecotec-plus.png',
    features: [
      'Yoğuşmalı teknoloji',
      'Kompakt tasarım',
      'Kolay kurulum',
      'Güvenilir performans',
      'Ekonomik işletme'
    ],
    specifications: {
      'Güç': '24-35 kW',
      'Enerji Sınıfı': 'A',
      'Boyutlar': '720 x 440 x 340 mm',
      'Tip': 'Yoğuşmalı',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: false,
    tags: ['kombi', 'yoğuşmalı', 'vaillant', 'güvenilir']
  },

  // BUDERUS Ürünleri
  {
    id: '12',
    name: 'Logano Plus GB125',
    brand: 'Buderus',
    category: 'Kombi',
    description: 'Buderus Logano Plus GB125 kombi, Alman kalitesi ve mükemmel performans bir arada.',
    image: '/uploads/products/buderus-logano-plus.png',
    features: [
      'Alman teknolojisi',
      'Yoğuşmalı sistem',
      'Dayanıklı yapı',
      'Kolay bakım',
      'Uzun ömür'
    ],
    specifications: {
      'Güç': '55 kW',
      'Enerji Sınıfı': 'A',
      'Tip': 'Yoğuşmalı',
      'Boyutlar': '830 x 440 x 360 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: false,
    tags: ['kombi', 'alman', 'buderus', 'dayanıklı']
  },

  // BAYMAK Ürünleri
  {
    id: '13',
    name: 'Lunatec Kombi',
    brand: 'Baymak',
    category: 'Kombi',
    description: 'Baymak Lunatec tam yoğuşmalı kombi, yerli üretim kalitesi ve uygun fiyat avantajı.',
    image: '/uploads/products/baymak-lunatec-kombi.png',
    features: [
      'Tam yoğuşmalı',
      'Yerli üretim',
      'Kolay kurulum',
      'Geniş servis ağı'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'A',
      'Tip': 'Yoğuşmalı',
      'Boyutlar': '700 x 400 x 280 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: false,
    tags: ['kombi', 'baymak', 'yerli']
  },


  // ECA Ürünleri
  {
    id: '15',
    name: 'Confeo Premix Kombi',
    brand: 'ECA',
    category: 'Kombi',
    description: 'ECA Confeo premix kombi, tam modülasyonlu yanma teknolojisi ile yüksek verim.',
    image: '/uploads/products/eca-confeo-kombi.png',
    features: [
      'Premix yanma teknolojisi',
      'Tam modülasyon',
      'Düşük emisyon',
      'Sessiz çalışma',
      'Kompakt tasarım'
    ],
    specifications: {
      'Güç': '24 kW',
      'Enerji Sınıfı': 'A',
      'Tip': 'Premix',
      'Boyutlar': '720 x 350 x 280 mm',
      'Garanti': '2 yıl'
    },
    inStock: true,
    featured: false,
    tags: ['kombi', 'eca', 'premix', 'düşük-emisyon']
  }
];

export const categories = [
  'Tümü',
  'Kombi',
  'Klima',
  'Isı Pompası', 
  'Su Isıtıcısı'
];

export const brands = [
  'Tümü',
  'Bosch',
  'DemirDöküm',
  'Vaillant', 
  'Buderus',
  'Baymak',
  'ECA'
];

// Helper functions
export const getProductsByCategory = (category: string) => {
  if (category === 'Tümü') return products;
  return products.filter(product => product.category === category);
};

export const getProductsByBrand = (brand: string) => {
  if (brand === 'Tümü') return products;
  return products.filter(product => product.brand === brand);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}; 