'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  price: string;
  features: string[];
  badge?: string;
}

interface ProductShowcaseProps {
  className?: string;
}

const ProductShowcase = ({ className = '' }: ProductShowcaseProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const products: Product[] = [
  {
    id: 1,
    name: 'Chỉ nha khoa PineSmile - Loại bình thường',
    category: 'floss',
    description: 'Chỉ nha khoa từ sợi tơ tự nhiên với sáp ong, giúp làm sạch kẽ răng hiệu quả',
    image: "/assets/images/anh1.jpg",
    alt: 'Chỉ nha khoa PineSmile loại bình thường',
    price: '35.000₫',
    features: ['Sợi Tự Nhiên', 'Sáp Ong', 'Dễ Sử Dụng'],
    badge: 'Bán Chạy'
  },
  {
    id: 2,
    name: 'Chỉ nha khoa PineSmile - Loại bạc hà',
    category: 'floss',
    description: 'Chỉ nha khoa loại bạc hà với hương bạc hà tự nhiên giúp hơi thở thơm mát',
    image: "/assets/images/anh2.jpg",
    alt: 'Chỉ nha khoa PineSmile loại bạc hà',
    price: '40.000₫',
    features: ['Hương Bạc Hà', 'Sợi Tự Nhiên', 'Hơi Thở Thơm'],
    badge: 'Mới'
  },
  {
    id: 3,
    name: 'Chỉ nha khoa PineSmile - Combo 2 loại',
    category: 'floss',
    description: 'Combo gồm 1 loại bình thường + 1 loại bạc hà, tiết kiệm 5.000₫',
    image: "/assets/images/anh3.jpg",
    alt: 'Chỉ nha khoa PineSmile combo 2 loại',
    price: '70.000₫',
    features: ['2 Loại Khác Nhau', 'Tiết Kiệm', 'Combo'],
    badge: 'Tiết Kiệm'
  },
  {
    id: 4,
    name: 'Kem Đánh Răng Tự Nhiên',
    category: 'toothpaste',
    description: 'Sản phẩm đang trong quá trình phát triển',
    image: "https://images.unsplash.com/photo-1703549809725-f153dde9cfa3",
    alt: 'Kem đánh răng PineSmile',
    price: '---',
    features: ['Đang Phát Triển', 'Sắp Ra Mắt', 'Tự Nhiên']
  }];


  const categories = [
  { id: 'all', label: 'Tất Cả Sản Phẩm', icon: 'Squares2X2Icon' },
  { id: 'floss', label: 'Chỉ Nha Khoa', icon: 'ScissorsIcon' },
  { id: 'toothpaste', label: 'Kem Đánh Răng', icon: 'SparklesIcon' },
  { id: 'toothbrush', label: 'Bàn Chải', icon: 'PaintBrushIcon' },
  { id: 'mouthwash', label: 'Nước Súc Miệng', icon: 'BeakerIcon' }];


  const filteredProducts = selectedCategory === 'all' ?
  products :
  products.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  if (!isHydrated) {
    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Dòng Sản Phẩm PineSmile
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Khám phá bộ sưu tập chăm sóc răng miệng từ lá dứa - Hiệu quả đã được chứng minh lâm sàng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) =>
            <div
              key={product.id}
              className="bg-card rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-hover transition-all duration-300">

                <div className="relative h-64 overflow-hidden">
                  <AppImage
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover" />

                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="font-heading font-bold text-2xl text-tropical-orange mb-4">
                    {product.price}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Dòng Sản Phẩm PineSmile
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Khám phá bộ sưu tập chăm sóc răng miệng từ lá dứa - Hiệu quả đã được chứng minh lâm sàng
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) =>
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-heading font-medium transition-all duration-300 ${
            selectedCategory === category.id ?
            'bg-tropical-green text-white shadow-organic' :
            'bg-card text-text-secondary hover:bg-muted'}`
            }>

              <Icon name={category.icon as any} size={20} variant={selectedCategory === category.id ? 'solid' : 'outline'} />
              <span>{category.label}</span>
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) =>
          <div
            key={product.id}
            className="bg-card rounded-2xl overflow-hidden shadow-organic hover:shadow-organic-hover transition-all duration-300 transform hover:-translate-y-2">

              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-mint-white">
                <AppImage
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />

                {product.badge &&
              <div className="absolute top-4 right-4 px-3 py-1 bg-tropical-orange text-white text-sm font-heading font-semibold rounded-full">
                    {product.badge}
                  </div>
              }
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.map((feature, index) =>
                <span
                  key={index}
                  className="px-3 py-1 bg-mint-white text-tropical-green text-xs font-medium rounded-full">

                      {feature}
                    </span>
                )}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div className="font-heading font-bold text-2xl text-tropical-orange">
                    {product.price}
                  </div>
                  <Link
                  href="/product-collection"
                  className="flex items-center space-x-1 text-tropical-green font-heading font-semibold hover:text-forest-green transition-colors duration-300">

                    <span>Chi Tiết</span>
                    <Icon name="ArrowRightIcon" size={16} variant="solid" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/product-collection"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-tropical-green text-white font-heading font-semibold text-lg rounded-full hover:shadow-organic-hover transition-all duration-300 hover:scale-105">

            <span>Xem Tất Cả Sản Phẩm</span>
            <Icon name="ArrowRightIcon" size={20} variant="solid" />
          </Link>
        </div>
      </div>
    </section>);

};

export default ProductShowcase;