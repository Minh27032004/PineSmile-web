import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import ProductCollectionInteractive from './components/ProductCollectionInteractive';

export const metadata: Metadata = {
  title: 'Bộ sưu tập sản phẩm - PineSmile',
  description: 'Khám phá dòng sản phẩm chăm sóc răng miệng từ chiết xuất lá dứa tự nhiên của PineSmile. Kem đánh răng, bàn chải, nước súc miệng và nhiều sản phẩm khác với công nghệ bền vững và hiệu quả vượt trội.',
};

export default function ProductCollectionPage() {
  return (
    <>
      <Header />
      <ProductCollectionInteractive />
    </>
  );
}