# Öz Mevsim Isı Sistemleri - Website

Modern, responsive web sitesi - Netlify üzerinde static hosting ile.

## 🚀 Teknolojiler

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Netlify Functions (Serverless)
- **Hosting:** Netlify
- **Database:** Mock data (production'da gerçek DB entegrasyonu)

## 📁 Proje Yapısı

```
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable components
│   ├── lib/          # Utilities and API clients
│   └── types/        # TypeScript type definitions
├── netlify/
│   └── functions/    # Serverless functions
├── public/           # Static assets
├── netlify.toml      # Netlify configuration
├── _headers          # HTTP headers
└── _redirects        # URL redirects
```

## 🛠️ Kurulum

1. **Dependencies'leri kur:**
```bash
npm install --legacy-peer-deps
```

2. **Development server'ı başlat:**
```bash
npm run dev
```

3. **Production build:**
```bash
npm run build
```

## 🌐 Netlify Deployment

### Otomatik Deployment
1. GitHub'a push yap
2. Netlify otomatik olarak deploy eder

### Manuel Deployment
```bash
# Build yap
npm run build

# Netlify CLI ile deploy et
netlify deploy --prod --dir=out
```

## 🔧 Netlify Functions

API endpoints Netlify Functions olarak çalışır:

- `/.netlify/functions/contact` - İletişim formu
- `/.netlify/functions/products` - Ürün listesi
- `/.netlify/functions/blog` - Blog yazıları

### Local Development
```bash
# Netlify dev server'ı başlat
netlify dev
```

## 📊 Özellikler

### Frontend
- ✅ Responsive tasarım
- ✅ Modern UI/UX
- ✅ SEO optimizasyonu
- ✅ Performance optimizasyonu
- ✅ Accessibility (WCAG 2.1)

### Backend
- ✅ Serverless functions
- ✅ Form handling
- ✅ API endpoints
- ✅ CORS support
- ✅ Rate limiting

### Güvenlik
- ✅ Security headers
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Content Security Policy

## 🎯 Sayfalar

1. **Ana Sayfa** (`/`) - Hero, hizmetler, istatistikler
2. **Hakkımızda** (`/hakkimizda`) - Şirket bilgileri
3. **Hizmetler** (`/hizmetler`) - Hizmet kategorileri
4. **Ürünler** (`/urunler`) - Ürün kataloğu
5. **Projeler** (`/projeler`) - Tamamlanan projeler
6. **İletişim** (`/iletisim`) - İletişim formu
7. **Admin Panel** (`/admin`) - İçerik yönetimi

## 🔑 Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_API_URL=/.netlify/functions
```

## 📈 Performance

- **Lighthouse Score:** 95+
- **First Load JS:** ~83kB
- **Static Generation:** 52 pages
- **Image Optimization:** ✅
- **Code Splitting:** ✅

## 🚀 Production Checklist

- [ ] Environment variables ayarlandı
- [ ] Domain bağlandı
- [ ] SSL sertifikası aktif
- [ ] Analytics entegrasyonu
- [ ] Error monitoring
- [ ] Backup stratejisi

## 📞 İletişim

**Öz Mevsim Isı Sistemleri**
- 📧 Email: info@ozmevsim.com
- 📱 Telefon: 0312 357 0600
- 📍 Adres: Ankara, Türkiye

---

Made with ❤️ by Öz Mevsim Team
