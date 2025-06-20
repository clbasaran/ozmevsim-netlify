# Öz Mevsim Isı Sistemleri - Web Sitesi

Modern, database-driven HVAC şirketi web sitesi. Next.js 15, PostgreSQL ve Netlify altyapısı ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Database**: PostgreSQL ile tam entegrasyon
- **CMS**: Gelişmiş admin paneli
- **Performance**: Optimized for Netlify deployment
- **SEO**: Tam SEO desteği
- **Mobile**: Responsive tasarım
- **Türkçe**: Tam Türkçe dil desteği

## 📦 Kurulum

### 1. Projeyi İndirin
```bash
git clone https://github.com/clbasaran/ozmevsim-netlify.git
cd ozmevsim-netlify
```

### 2. Dependencies Kurun
```bash
npm install --legacy-peer-deps
```

### 3. Environment Variables
```bash
cp env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ozmevsim
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ozmevsim
DB_USER=postgres
DB_PASSWORD=your_password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_COMPANY_NAME=Öz Mevsim Isı Sistemleri
```

### 4. Database Kurulumu

PostgreSQL veritabanınızı oluşturduktan sonra:

```bash
# Database schema ve örnek veri kurulumu
npm run db:setup

# Veya manuel kurulum
node setup-database.js setup
```

### 5. Development Server
```bash
npm run dev
```

Site şu adreste açılacak: [http://localhost:3000](http://localhost:3000)

## 🗄️ Database

### PostgreSQL Kurulumu (macOS)
```bash
# Homebrew ile PostgreSQL kurulumu
brew install postgresql
brew services start postgresql

# Database oluşturma
createdb ozmevsim
```

### Database Komutları
```bash
npm run db:setup    # İlk kurulum
npm run db:reset    # Database sıfırla ve yeniden kur
npm run db:help     # Yardım
```

### Manuel Database Setup
```bash
# Schema oluşturma
psql -d ozmevsim -f database/schema.sql

# Örnek veri ekleme
psql -d ozmevsim -f database/sample-data.sql
```

## 🎯 Proje Yapısı

```
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── lib/                 # Utilities & database
│   └── types/               # TypeScript types
├── database/
│   ├── schema.sql           # Database schema
│   └── sample-data.sql      # Örnek veriler
├── netlify/
│   └── functions/           # Netlify Functions
├── public/                  # Static assets
└── setup-database.js       # Database kurulum script'i
```

## 🌐 Production Deployment (Netlify + PostgreSQL)

### 1. PostgreSQL Database Kurulumu

#### Seçenek A: Railway (Önerilen)
```bash
# Railway hesabı oluşturun: https://railway.app
# PostgreSQL service ekleyin
# Connection string'i kopyalayın
```

#### Seçenek B: Neon (Ücretsiz)
```bash
# Neon hesabı oluşturun: https://neon.tech
# PostgreSQL database oluşturun
# Connection string'i alın
```

#### Seçenek C: Supabase
```bash
# Supabase hesabı oluşturun: https://supabase.com
# PostgreSQL database oluşturun
# Connection details'i alın
```

### 2. Database Schema Kurulumu

Production database'inize schema kurulumu:

```bash
# 1. Local'de .env.local dosyasına production DATABASE_URL ekleyin
DATABASE_URL=postgresql://username:password@host:port/database

# 2. Schema ve veri kurulumu
npm run db:setup
```

### 3. Netlify Deployment

#### Build Settings (netlify.toml)
```toml
[build]
  publish = "out"
  command = "npm run netlify-build"

[functions]
  directory = "netlify/functions"
```

#### Environment Variables
Netlify Dashboard > Site Settings > Environment Variables:

```env
# Database (En Önemli!)
DATABASE_URL=postgresql://username:password@host:port/database

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_COMPANY_NAME=Öz Mevsim Isı Sistemleri
NEXT_PUBLIC_PHONE=+90 312 357 0600
NEXT_PUBLIC_EMAIL=info@ozmevsim.com

# Email (İletişim formu için)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@ozmevsim.com

# Security
NODE_ENV=production
API_KEY=your-optional-api-key
```

### 4. Deploy Kontrolü

Deploy sonrası aşağıdaki endpoint'leri test edin:

```bash
# API endpoint'leri test
curl https://your-site.netlify.app/api/products
curl https://your-site.netlify.app/api/blog

# Frontend pages test
https://your-site.netlify.app/
https://your-site.netlify.app/urunler
https://your-site.netlify.app/admin
```

### 5. Production Database Monitoring

```bash
# Database bağlantı testi
node -e "
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'YOUR_DATABASE_URL',
  ssl: { rejectUnauthorized: false }
});
pool.query('SELECT NOW()').then(r => console.log('✅ Connected:', r.rows[0]));
"
```

## 👨‍💼 Admin Panel

**URL**: `/admin`
**Demo Giriş**:
- Email: admin@ozmevsim.com
- Şifre: admin123

### Admin Özellikler
- ✅ İçerik yönetimi (CMS)
- ✅ Ürün yönetimi
- ✅ Blog yazıları
- ✅ İletişim mesajları
- ✅ Medya yönetimi
- ✅ SEO ayarları

## 🔧 API Endpoints

### Netlify Functions
- `/api/products` - Ürün listesi
- `/api/contact` - İletişim formu
- `/api/blog` - Blog yazıları

### Local Development
```bash
# API test
curl http://localhost:3000/api/products
```

## 📱 Sayfalar

- **Ana Sayfa** (`/`) - Hero, hizmetler, iletişim
- **Hakkımızda** (`/hakkimizda`) - Şirket bilgileri
- **Ürünler** (`/urunler`) - Ürün kataloğu
- **Hizmetler** (`/hizmetler`) - Hizmet listesi
- **Blog** (`/blog`) - Blog yazıları
- **İletişim** (`/iletisim`) - İletişim formu
- **Admin** (`/admin`) - Yönetim paneli

## 🎨 Tasarım

- **Tema**: HVAC/ısıtma sistemleri temalı mavi-turuncu tonlar
- **Typography**: Modern, okunabilir fontlar
- **Components**: Modüler ve yeniden kullanılabilir
- **Responsive**: Mobile-first yaklaşım

## 🔒 Güvenlik

- ✅ SQL Injection koruması
- ✅ XSS koruması
- ✅ CSRF token'ları
- ✅ Rate limiting
- ✅ Input validation

## 📊 Performance

- ✅ Image optimization
- ✅ Code splitting
- ✅ Static generation
- ✅ CDN optimization
- ✅ Caching strategies

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

Bu proje özel kullanım içindir.

## 📞 Destek

Teknik destek için: [celal@basaran.com](mailto:celal@basaran.com)

---

**Geliştirici**: Celal Başaran
**Versiyon**: 2.0.0
**Son Güncelleme**: Ocak 2025
