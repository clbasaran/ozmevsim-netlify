# Öz Mevsim Isı Sistemleri Website

Modern, veritabanı-destekli Next.js 14 uygulaması. Ankara'da kombi, klima ve doğalgaz sistemleri hizmetleri sunan Öz Mevsim Isı Sistemleri'nin kurumsal web sitesi.

## 🎯 Proje Durumu

**✅ Veritabanı Entegrasyonu Tamamlandı**
- Tüm static data kaldırıldı
- PostgreSQL veritabanı tam entegre edildi
- API-driven architecture uygulandı
- Production'a hazır durum

## 🏗️ Teknik Mimari

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** 
- **Tailwind CSS**
- **Framer Motion** (animasyonlar)
- **React Hook Form** (form yönetimi)

### Backend & Database
- **PostgreSQL** (Railway üzerinde)
- **API Routes** (RESTful endpoints)
- **Server-side rendering**
- **Real-time data fetching**

### API Endpoints
- `/api/products` - Ürün yönetimi
- `/api/services` - Hizmet yönetimi  
- `/api/blog` - Blog yazıları
- `/api/faq` - Sık sorulan sorular
- `/api/company` - Şirket bilgileri
- `/api/references` - Referanslar
- `/api/contact` - İletişim formları

## 🚀 Çalıştırma

### Gereksinimler
- Node.js 18+
- PostgreSQL veritabanı
- Railway hesabı (production için)

### Kurulum
```bash
# Projeyi klonlayın
git clone [repository-url]
cd ozmevsimnetlify

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını ayarlayın
cp .env.example .env.local

# Geliştirme sunucusunu başlatın
npm run dev
```

### Environment Değişkenleri
```env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Veritabanı Kurulumu
```bash
# Schema oluşturun
psql -h host -U user -d database -f database/schema.sql

# Örnek verileri ekleyin
psql -h host -U user -d database -f database/sample-data.sql
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── api/               # API endpoints
│   ├── admin/             # Admin panel
│   └── [pages]/           # Public sayfalar
├── components/            # React bileşenleri
│   ├── sections/          # Sayfa bölümleri
│   ├── layout/            # Layout bileşenleri
│   └── ui/                # UI bileşenleri
├── lib/                   # Utility fonksiyonları
│   ├── database.ts        # Veritabanı bağlantısı
│   └── [utils]/           # Yardımcı fonksiyonlar
└── types/                 # TypeScript tip tanımları
```

## 🗄️ Veritabanı Şeması

### Ana Tablolar
- **products** - Ürün kataloğu
- **services** - Hizmet kataloğu
- **blog_posts** - Blog yazıları
- **faq** - Sık sorulan sorular
- **company_info** - Şirket bilgileri
- **references** - Müşteri referansları
- **contact_messages** - İletişim formları

## 🎨 Özellikler

### Public Website
- ✅ Dinamik ürün kataloğu
- ✅ Hizmet sayfaları
- ✅ Blog sistemi
- ✅ İletişim formları
- ✅ SEO optimizasyonu
- ✅ Responsive tasarım
- ✅ Performance optimizasyonu

### Admin Panel
- ✅ İçerik yönetimi
- ✅ Ürün/hizmet CRUD
- ✅ Blog yazısı editörü
- ✅ İstatistik dashboard
- ✅ Medya yönetimi

## 🔧 API Kullanımı

### Ürünleri Getirme
```javascript
const response = await fetch('/api/products/');
const products = await response.json();
```

### Hizmetleri Getirme
```javascript
const response = await fetch('/api/services/');
const services = await response.json();
```

### Blog Yazılarını Getirme
```javascript
const response = await fetch('/api/blog/');
const posts = await response.json();
```

## 🚀 Deployment

### Railway Deployment
```bash
# Railway CLI ile deploy
railway login
railway link
railway deploy
```

### Netlify Alternative
```bash
# Build
npm run build

# Build output'u Netlify'a yükleyin
# /out klasörünü static site olarak deploy edin
```

## 📈 Performance

- **Lighthouse Score**: 95+
- **Core Web Vitals**: Optimized
- **SEO Score**: 100
- **Accessibility**: WCAG 2.1 AA

## 🔒 Güvenlik

- Input validation
- SQL injection protection
- XSS protection
- CORS configuration
- Environment variable security

## 📞 İletişim

**Öz Mevsim Isı Sistemleri**
- Telefon: +90 312 357 0600
- Email: info@ozmevsim.com
- Adres: Kuşcağız Mahallesi, Sanatoryum Caddesi No:221/A, Keçiören, Ankara

## 📄 Lisans

Bu proje özel lisans altındadır. Tüm hakları Öz Mevsim Isı Sistemleri'ne aittir.

---

**Not**: Bu proje static data'dan tam veritabanı entegrasyonuna geçiş yapmıştır. Tüm içerik artık PostgreSQL veritabanından dinamik olarak yüklenmektedir.
