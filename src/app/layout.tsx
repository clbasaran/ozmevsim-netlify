import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://ozmevsim.com'),
  title: {
    default: 'Ankara Doğalgaz Tesisatı | Kombi Servisi | Klima - Özmevsim',
    template: '%s | Öz Mevsim'
  },
  description: 'Ankara\'da doğalgaz tesisatı, kombi satış-servis ve klima sistemleri. 7/24 servis ✓ Uygun fiyat ✓ Garantili işçilik. ☎ 0312 357 0600',
  applicationName: 'Öz Mevsim',
  authors: [{ name: 'Öz Mevsim Isı Sistemleri' }],
  manifest: '/site.webmanifest',
  keywords: [
    'ankara doğalgaz',
    'ankara kombi servisi', 
    'ankara klima servisi',
    'doğalgaz tesisatı ankara',
    'kombi tamiri ankara',
    'ankara klima montajı',
    'ankara kombi bakımı',
    'doğalgaz projesi ankara',
    'ankara kombi arızası',
    'ankara klima tamiri'
  ],
  creator: 'Öz Mevsim Isı Sistemleri',
  publisher: 'Öz Mevsim Isı Sistemleri',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  other: {
    'msapplication-TileColor': '#da532c',
    'theme-color': '#ffffff',
  },
  alternates: {
    canonical: 'https://ozmevsim.com/',
    languages: {
      'tr-TR': 'https://ozmevsim.com/tr',
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
  },
  openGraph: {
    title: 'Öz Mevsim - Isı Sistemleri Mühendislik',
    description: '25 yıllık deneyimle Ankara\'da kombi, klima, doğalgaz sistemleri kurulum hizmetleri.',
    url: 'https://ozmevsim.com/',
    siteName: 'Öz Mevsim',
    locale: 'tr_TR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Öz Mevsim Isı Sistemleri',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ozmevsim',
    title: 'Öz Mevsim - Isı Sistemleri Mühendislik',
    description: '25 yıllık deneyimle Ankara\'da kombi, klima, doğalgaz sistemleri kurulum hizmetleri.',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    shortcut: '/favicon-16x16.png',
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FFD700" />
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Öz Mevsim" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Improved preload hints for Chrome optimization */}
        <link rel="preload" href="/Mevsim-4.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/uploads/hero-kombi.jpg" as="image" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Theme detection script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `
          }}
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Öz Mevsim Isı Sistemleri Mühendislik",
              "url": "https://ozmevsim.com",
              "logo": "https://ozmevsim.com/images/logo.png",
              "description": "25 yıllık deneyimle Ankara'da kombi, klima, doğalgaz sistemleri kurulum hizmetleri.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kuşcağız Mahallesi Sanatoryum Caddesi No:221/A",
                "addressLocality": "Keçiören, Ankara",
                "addressCountry": "TR"
              },
              "telephone": "+90 312 357 0600",
              "email": "info@ozmevsim.com",
              "sameAs": [
                "https://www.facebook.com/ozmevsim",
                "https://www.instagram.com/ozmevsim",
                "https://www.linkedin.com/company/ozmevsim",
                "https://twitter.com/ozmevsim"
              ],
              "foundingDate": "1999",
              "numberOfEmployees": "50",
              "areaServed": {
                "@type": "City",
                "name": "Ankara"
              },
              "serviceType": [
                "Kombi Montaj",
                "Klima Montaj", 
                "Doğalgaz Tesisatı",
                "Mekanik Tesisat",
                "Enerji Verimliliği"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  );
} 