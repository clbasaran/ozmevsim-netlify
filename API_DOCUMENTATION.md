# Öz Mevsim Isı Sistemleri - API Dokümantasyonu

## 📋 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Kurulum](#kurulum)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Strapi CMS Entegrasyonu](#strapi-cms-entegrasyonu)
- [Webhook Yapılandırması](#webhook-yapılandırması)
- [Deployment](#deployment)

## 🚀 Genel Bakış

Bu API, Öz Mevsim Isı Sistemleri web sitesi için oluşturulmuş kapsamlı bir backend çözümüdür. Next.js 14 App Router, Strapi CMS, TypeScript ve modern güvenlik standartları kullanılarak geliştirilmiştir.

### Teknoloji Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **CMS**: Strapi
- **Database**: PostgreSQL
- **Email**: Nodemailer
- **Validation**: Zod
- **Rate Limiting**: Custom implementation

### Mimari

```
Frontend (Next.js) ←→ API Routes ←→ Strapi CMS ←→ PostgreSQL
                   ↓
              External Services
              (Email, SMS, Webhooks)
```

## ⚙️ Kurulum

### 1. Environment Variables

`env.example` dosyasını `.env.local` olarak kopyalayın ve gerekli değerleri doldurun:

```bash
cp env.example .env.local
```

### 2. Gerekli Paketler

```bash
npm install nodemailer @types/nodemailer zod
```

### 3. Strapi CMS Kurulumu

```bash
# Strapi projesini oluşturun
npx create-strapi-app@latest ozmevsim-cms --typescript

# Gerekli pluginleri yükleyin
cd ozmevsim-cms
npm install @strapi/plugin-i18n @strapi/plugin-seo strapi-plugin-slugify
npm install strapi-provider-upload-cloudinary
```

## 🔗 API Endpoints

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://ozmevsim.com/api`

### İletişim Formu

#### `POST /api/contact`

İletişim formu gönderimini işler.

**Request Body:**
```json
{
  "name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "phone": "+90 532 123 45 67",
  "subject": "Klima Montajı",
  "message": "Klima montajı için bilgi almak istiyorum.",
  "service": "Klima Montajı",
  "consent": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
  }
}
```

**Features:**
- Rate limiting (5 istek/15 dakika)
- Email bildirimleri (admin + müşteri)
- Spam koruması (honeypot)
- Strapi CMS'e kayıt

### Ürünler

#### `GET /api/products`

Ürün listesini getirir.

**Query Parameters:**
- `category` (string): Kategori slug'ı
- `brand` (string): Marka slug'ı
- `featured` (boolean): Öne çıkan ürünler
- `search` (string): Arama terimi
- `page` (number): Sayfa numarası (default: 1)
- `pageSize` (number): Sayfa boyutu (default: 12, max: 50)
- `sortBy` (string): Sıralama kriteri (name, brand, newest)
- `sortOrder` (string): Sıralama yönü (asc, desc)

**Example:**
```
GET /api/products?category=klima&featured=true&page=1&pageSize=12
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Daikin FTXM35R",
        "slug": "daikin-ftxm35r",
        "shortDescription": "A++ Enerji Sınıfı Split Klima",
        "mainImage": {
          "data": {
            "attributes": {
              "url": "/uploads/klima1.jpg"
            }
          }
        },
        "brand": {
          "data": {
            "attributes": {
              "name": "Daikin",
              "slug": "daikin"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 12,
    "total": 45,
    "pageCount": 4
  }
}
```

### Hizmetler

#### `GET /api/services`

Hizmet listesini getirir.

**Query Parameters:**
- `category` (string): Kategori slug'ı
- `featured` (boolean): Öne çıkan hizmetler
- `search` (string): Arama terimi
- `limit` (number): Maksimum sonuç sayısı

#### `GET /api/services/[slug]`

Belirli bir hizmeti getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "attributes": {
      "name": "Klima Montajı",
      "slug": "klima-montaji",
      "description": "Profesyonel klima montaj hizmetimiz...",
      "coverImage": {
        "data": {
          "attributes": {
            "url": "/uploads/service1.jpg"
          }
        }
      },
      "features": [
        {
          "title": "Uzman Kadro",
          "description": "15 yıllık deneyim"
        }
      ]
    }
  }
}
```

### Galeri

#### `GET /api/gallery`

Galeri öğelerini getirir.

**Query Parameters:**
- `category` (string): Kategori (klima, kombi, radyator, diger)
- `featured` (boolean): Öne çıkan projeler
- `service` (string): Hizmet slug'ı
- `page` (number): Sayfa numarası
- `pageSize` (number): Sayfa boyutu (default: 9, max: 50)

### İstatistikler

#### `GET /api/statistics`

Site istatistiklerini getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "happyCustomers": 500,
    "yearsExperience": 15,
    "expertTeam": 25,
    "completedProjects": 1000
  }
}
```

### Bülten Aboneliği

#### `POST /api/newsletter`

Bülten aboneliği oluşturur.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "Ahmet Yılmaz"
}
```

## 🔐 Authentication

Genel API endpoint'leri public'tir. Admin işlemleri için API key gerekebilir:

```javascript
headers: {
  'X-API-Key': 'your-api-key'
}
```

## ⚡ Rate Limiting

### Limitler

- **Genel API**: 100 istek/saat
- **İletişim Formu**: 5 istek/15 dakika
- **Bülten**: 5 istek/15 dakika

### Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Rate Limit Aşımı

```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "error_tr": "Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin."
}
```

## 🛠️ Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": "Error message in English",
  "details": [] // Validation errors (if any)
}
```

### HTTP Status Codes

- `200` - Success
- `400` - Bad Request (Validation error)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

### Validation Errors

```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["name"],
      "message": "Required"
    }
  ]
}
```

## 🎛️ Strapi CMS Entegrasyonu

### Content Types

#### Hero Slider
```javascript
{
  "title": "string",
  "subtitle": "text",
  "backgroundImage": "media",
  "mobileImage": "media",
  "buttonPrimary": "component",
  "buttonSecondary": "component",
  "order": "integer",
  "isActive": "boolean"
}
```

#### Services
```javascript
{
  "name": "string",
  "slug": "uid",
  "shortDescription": "text",
  "description": "richtext",
  "coverImage": "media",
  "gallery": "media[]",
  "features": "component[]",
  "category": "relation",
  "seo": "component"
}
```

#### Products
```javascript
{
  "name": "string",
  "slug": "uid",
  "model": "string",
  "brand": "relation",
  "category": "relation",
  "mainImage": "media",
  "images": "media[]",
  "technicalSpecs": "component[]",
  "energyClass": "enumeration",
  "isActive": "boolean",
  "isFeatured": "boolean"
}
```

### API Configuration

```javascript
// strapi/config/api.js
module.exports = {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
  },
};
```

## 🔄 Webhook Yapılandırması

### Strapi Webhooks

```javascript
// strapi/config/webhooks.js
module.exports = {
  'entry.update': {
    url: process.env.WEBHOOK_URL + '/api/webhooks/content-updated',
    headers: {
      'X-Webhook-Secret': process.env.WEBHOOK_SECRET,
    },
  },
};
```

### Content Update Handler

`POST /api/webhooks/content-updated`

- İçerik güncellendiğinde Next.js cache'ini temizler
- Slack bildirimi gönderir
- Signature doğrulaması yapar

## 🚀 Deployment

### Environment Variables

Production için gerekli environment variables:

```bash
# Site
NEXT_PUBLIC_SITE_URL=https://ozmevsim.com

# Strapi
STRAPI_URL=https://cms.ozmevsim.com
STRAPI_API_TOKEN=your-production-token

# Email
SMTP_USER=your-production-email
SMTP_PASS=your-production-password

# Security
WEBHOOK_SECRET=your-webhook-secret
API_KEY=your-api-key
```

### Netlify Deployment

1. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables:**
   Netlify dashboard'da yukarıdaki değişkenleri ayarlayın.

3. **Redirects (_redirects):**
   ```
   /api/* /.netlify/functions/:splat 200
   ```

### Strapi Deployment (Railway)

1. **Database:**
   ```
   Railway PostgreSQL service ekleyin
   ```

2. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://...
   APP_KEYS=your-app-keys
   API_TOKEN_SALT=your-salt
   ADMIN_JWT_SECRET=your-secret
   JWT_SECRET=your-jwt-secret
   ```

## 📊 Monitoring & Analytics

### Logging

```javascript
// Structured logging
console.log('API Request', {
  method: req.method,
  url: req.url,
  ip: getClientIP(req),
  userAgent: req.headers.get('user-agent'),
  timestamp: new Date().toISOString()
});
```

### Error Tracking

Production'da error tracking için Sentry entegrasyonu önerilir:

```bash
npm install @sentry/nextjs
```

### Performance Monitoring

- API response times
- Cache hit/miss rates
- Rate limiting metrics
- Database query performance

## 🔒 Security Checklist

- [x] Rate limiting implemented
- [x] Input validation with Zod
- [x] SQL injection protection
- [x] XSS protection headers
- [x] CORS configuration
- [x] Webhook signature validation
- [x] Honeypot spam protection
- [x] IP-based blocking for suspicious activity

## 🤝 API Usage Examples

### JavaScript/React

```javascript
import { apiClient, contactApi } from '@/lib/api-client';

// Contact form submission
const handleSubmit = async (formData) => {
  try {
    const response = await contactApi.submit(formData);
    toast.success('Mesajınız gönderildi!');
  } catch (error) {
    toast.error(error.message);
  }
};

// Fetch products
const { data, loading, error } = useApi(() => 
  productsApi.list({ category: 'klima', featured: true })
);
```

### cURL Examples

```bash
# Contact form
curl -X POST https://ozmevsim.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "phone": "+90 532 123 45 67",
    "message": "Test mesajı",
    "consent": true
  }'

# Get products
curl "https://ozmevsim.com/api/products?category=klima&page=1"

# Get service by slug  
curl "https://ozmevsim.com/api/services/klima-montaji"
```

## 📞 Support

Teknik destek için:
- Email: dev@ozmevsim.com
- Slack: #api-support

---

*Bu dokümantasyon Öz Mevsim Isı Sistemleri API v1.0 için hazırlanmıştır.* 