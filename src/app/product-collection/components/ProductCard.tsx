'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    alt: string;
    rating: number;
    reviews: number;
    badge?: string;
    features: string[];
    sustainabilityScore: number;
    status?: 'available' | 'coming-soon';
  };
  onAddToCart: (productId: number) => void;
  onQuickView: (productId: number) => void;
}

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="bg-white rounded-lg shadow-organic hover:shadow-organic-hover transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-mint-white">
        <AppImage
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.badge && (
            <span className="px-3 py-1 bg-tropical-orange text-white text-xs font-semibold rounded-full">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 bg-error text-white text-xs font-semibold rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Sustainability Score */}
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <div className="flex items-center gap-1">
            <Icon name="SparklesIcon" size={16} className="text-tropical-green" variant="solid" />
            <span className="text-xs font-bold text-tropical-green">{product.sustainabilityScore}</span>
          </div>
        </div>

        {/* Coming Soon Overlay */}
        {product.status === 'coming-soon' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg px-4 py-3 text-center">
              <p className="font-heading font-bold text-tropical-orange">Đang Phát Triển</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-3 transition-opacity duration-300">
            <button
              onClick={() => onQuickView(product.id)}
              className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
              aria-label="Quick view product"
            >
              <Icon name="EyeIcon" size={20} />
            </button>
            <button
              onClick={() => onAddToCart(product.id)}
              className="p-3 bg-white rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
              aria-label="Add to cart"
            >
              <Icon name="ShoppingCartIcon" size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</span>
          <h3 className="font-heading font-semibold text-lg text-foreground mt-1 line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        {product.status !== 'coming-soon' && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  name="StarIcon"
                  size={14}
                  variant={index < Math.floor(product.rating) ? 'solid' : 'outline'}
                  className={index < Math.floor(product.rating) ? 'text-tropical-yellow' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        )}

        {/* Features */}
        <div className="mb-3 space-y-1">
          {product.features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon name="CheckCircleIcon" size={14} className="text-tropical-green" variant="solid" />
              <span className="text-xs text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        {product.status !== 'coming-soon' ? (
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">{product.price.toLocaleString('vi-VN')}₫</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString('vi-VN')}₫
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="font-heading font-semibold text-tropical-orange">Sắp ra mắt</p>
          </div>
        )}
      </div>
    </div>
  );
}