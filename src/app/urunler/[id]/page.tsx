import { products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetailClient productId={params.id} />;
} 