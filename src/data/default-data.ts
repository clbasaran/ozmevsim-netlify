// Default data for static site - overrides localStorage for production
export const STATIC_HERO_SLIDES = [
  {
    id: 1,
    title: "Ankara'nın En Güvenilir",
    subtitle: "Kombi ve Klima Servisi",
    description: "25 yıllık deneyimle ev ve işyerlerinizde konfor yaratıyor, enerji tasarrufu sağlıyoruz. 7/24 servis hizmeti.",
    backgroundImage: "/images/kombi-montaj-hero.jpg",
    stats: [
      { value: "25+", label: "Yıl Deneyim" },
      { value: "10,000+", label: "Mutlu Müşteri" },
      { value: "7/24", label: "Servis Hizmeti" },
      { value: "%98", label: "Müşteri Memnuniyeti" }
    ],
    primaryCTA: {
      text: "Ücretsiz Keşif",
      href: "/iletisim"
    },
    secondaryCTA: {
      text: "Ürünlerimiz",
      href: "/urunler"
    },
    isActive: true
  },
  {
    id: 2,
    title: "Profesyonel Kombi",
    subtitle: "Montaj ve Servis Hizmeti",
    description: "Uzman ekibimizle en kaliteli markaların montajını yapıyor, düzenli bakım hizmeti sunuyoruz.",
    backgroundImage: "/images/kombi-montaj-hero.jpg",
    stats: [
      { value: "5,000+", label: "Kombi Montajı" },
      { value: "24", label: "Saat Servis" },
      { value: "15", label: "Marka Yetkili" },
      { value: "2", label: "Yıl Garanti" }
    ],
    primaryCTA: {
      text: "Teklif Al",
      href: "/iletisim"
    },
    secondaryCTA: {
      text: "Markalar",
      href: "/urunler"
    },
    isActive: true
  }
];

export const STATIC_SERVICES = [
  {
    id: 1,
    title: "Kombi Satış & Montaj",
    description: "Baymak, Vaillant, Bosch gibi güvenilir markaların satış ve montaj hizmetleri.",
    icon: "🔥",
    features: [
      "Ücretsiz keşif ve proje çizimi",
      "Profesyonel montaj ekibi",
      "2 yıl montaj garantisi",
      "Düzenli bakım hizmeti"
    ],
    isActive: true
  },
  {
    id: 2,
    title: "Klima Sistemleri",
    description: "Split, VRF ve merkezi klima sistemlerinin satış, montaj ve bakım hizmetleri.",
    icon: "❄️",
    features: [
      "Enerji verimli modeller",
      "Sessiz çalışma teknolojisi",
      "Uzaktan kontrol sistemleri",
      "Düzenli temizlik ve bakım"
    ],
    isActive: true
  },
  {
    id: 3,
    title: "Doğalgaz Tesisatı",
    description: "Güvenli ve standartlara uygun doğalgaz iç tesisat projeleri.",
    icon: "⚡",
    features: [
      "TSE standartlarında montaj",
      "Güvenlik kontrolleri",
      "Belgeli ustalar",
      "Sızdırmazlık testleri"
    ],
    isActive: true
  }
];

// Updated products with your localStorage data
export const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "Condens 1200W",
    description: "Bosch Condens 1200W yoğuşmalı kombi, kompakt tasarım ve yüksek verimlilik sunar. Ev tipi kullanım için ideal.",
    image: "/uploads/kombiler/bosch/codens 1200w.png",
    category: "Kombi",
    brand: "Bosch",
    features: [
      "Yoğuşmalı teknoloji",
      "A+ enerji sınıfı", 
      "Kompakt tasarım",
      "Sessiz çalışma",
      "Çevre dostu"
    ],
    isActive: true
  },
  {
    id: 2,
    name: "Condens 2200i",
    description: "Bosch Condens 2200i akıllı kombi sistemi, modern teknoloji ve üstün performans ile öne çıkar.",
    image: "/uploads/kombiler/bosch/codens 2200i.png",
    category: "Kombi",
    brand: "Bosch",
    features: [
      "Akıllı kontrol sistemi",
      "A++ enerji sınıfı",
      "ModBus bağlantısı",
      "Uzaktan kontrol",
      "Üstün performans"
    ],
    isActive: true
  },
  {
    id: 5,
    name: "Nitromix",
    description: "DemirDöküm Nitromix kombi, nitro teknolojisi ile yüksek verimlilik ve temiz yanma sağlar.",
    image: "/uploads/kombiler/demirdokum/nitromix.png",
    category: "Kombi",
    brand: "DemirDöküm",
    features: [
      "Nitro teknolojisi",
      "Temiz yanma",
      "Yüksek verimlilik",
      "Uzun ömür",
      "Ekonomik"
    ],
    isActive: true
  },
  {
    id: 6,
    name: "Nitromix Ioni",
    description: "DemirDöküm Nitromix Ioni kombi, iyonik alev teknolojisi ile üstün performans ve enerji tasarrufu sunar.",
    image: "/uploads/kombiler/demirdokum/nitromix ioni.png",
    category: "Kombi",
    brand: "DemirDöküm",
    features: [
      "İyonik alev teknolojisi",
      "Üstün performans",
      "Enerji tasarrufu",
      "Çevve dostu",
      "Akıllı sistem"
    ],
    isActive: true
  },
  {
    id: 7,
    name: "Nitromix Ioni Hero",
    description: "DemirDöküm Nitromix Ioni Hero kombi, en gelişmiş teknoloji ile maksimum verimlilik ve konfor sağlar.",
    image: "/uploads/kombiler/demirdokum/nitromix ioni hero.png",
    category: "Kombi",
    brand: "DemirDöküm",
    features: [
      "Hero teknolojisi",
      "Maksimum verimlilik",
      "İleri teknoloji",
      "Premium konfor",
      "Üstün kalite"
    ],
    isActive: true
  },

];

export const STATIC_REFERENCES = [
  {
    id: 1,
    title: "Ankara Büyükşehir Belediyesi",
    description: "Belediye binası merkezi ısıtma sistemi modernizasyonu",
    image: "/uploads/references/ankara-buyuksehir.jpg",
    category: "Kurumsal",
    completedDate: "2024-01-15",
    isActive: true
  },
  {
    id: 2,
    title: "Çankaya Sitesi",
    description: "240 daireli site kombi değişimi ve doğalgaz tesisatı yenileme",
    image: "/uploads/references/cankaya-sitesi.jpg", 
    category: "Konut",
    completedDate: "2023-12-20",
    isActive: true
  }
];

// Production override functions
export function getStaticData(key: string): any {
  if (typeof window === 'undefined') {
    // Server-side rendering - always use static data
    switch (key) {
      case 'ozmevsim_hero_slides':
        return STATIC_HERO_SLIDES;
      case 'ozmevsim_services':
        return STATIC_SERVICES;
      case 'ozmevsim_products':
        return STATIC_PRODUCTS;
      case 'ozmevsim_references':
        return STATIC_REFERENCES;
      default:
        return null;
    }
  }
  
  // Client-side - check environment
  const isProduction = window.location.hostname === 'ozmevsim.com';
  
  if (isProduction) {
    // Production: Use static data instead of localStorage
    switch (key) {
      case 'ozmevsim_hero_slides':
        return STATIC_HERO_SLIDES;
      case 'ozmevsim_services':
        return STATIC_SERVICES;
      case 'ozmevsim_products':
        return STATIC_PRODUCTS;
      case 'ozmevsim_references':
        return STATIC_REFERENCES;
      default:
        return null;
    }
  } else {
    // Development: Use localStorage
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  }
} 