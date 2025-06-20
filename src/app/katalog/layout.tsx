import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ürün Katalogları | Öz Mevsim İsı Sistemleri',
  description: 'DemirDöküm, Vaillant, Bosch ve diğer markalara ait kombi, klima ve ısı pompası kataloglarını inceleyin ve indirin. Teknik föyler ve kurulum rehberleri.',
  keywords: 'katalog, kombi katalogu, klima katalogu, ürün broşürü, teknik föy, demirdöküm katalog, vaillant katalog, bosch katalog, ısı sistemleri katalog',
  openGraph: {
    title: 'Ürün Katalogları | Öz Mevsim İsı Sistemleri',
    description: 'Tüm markalarımıza ait ürün katalogları, teknik föyler ve kurulum rehberlerini inceleyin ve indirin.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ürün Katalogları | Öz Mevsim İsı Sistemleri',
    description: 'Tüm markalarımıza ait ürün katalogları, teknik föyler ve kurulum rehberlerini inceleyin ve indirin.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 