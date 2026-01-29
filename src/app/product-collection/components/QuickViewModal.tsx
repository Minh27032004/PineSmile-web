'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface QuickViewProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: { url: string; alt: string }[];
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  sustainabilityScore: number;
  ingredients: string[];
  certifications: string[];
}

interface QuickViewModalProps {
  product: QuickViewProduct;
  onClose: () => void;
  onAddToCart: (productId: number, quantity: number) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    onClose();
  };

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-5xl w-full">
          <div className="h-96 animate-pulse bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-bold text-2xl text-foreground">Xem nhanh sản phẩm</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
            aria-label="Close quick view"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div>
            <div className="relative h-96 rounded-lg overflow-hidden bg-mint-white mb-4">
              <AppImage
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <div className="flex items-center gap-1">
                  <Icon name="SparklesIcon" size={16} className="text-tropical-green" variant="solid" />
                  <span className="text-xs font-bold text-tropical-green">{product.sustainabilityScore}/10</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <AppImage
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-wide">{product.category}</span>
            <h3 className="font-heading font-bold text-2xl text-foreground mt-2 mb-3">{product.name}</h3>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    name="StarIcon"
                    size={18}
                    variant={index < Math.floor(product.rating) ? 'solid' : 'outline'}
                    className={index < Math.floor(product.rating) ? 'text-tropical-yellow' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">{product.price.toLocaleString('vi-VN')}₫</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString('vi-VN')}₫
                  </span>
                  <span className="px-2 py-1 bg-error text-white text-xs font-semibold rounded">
                    Tiết kiệm {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-text-secondary mb-6 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-base text-foreground mb-3">Đặc điểm nổi bật:</h4>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Icon name="CheckCircleIcon" size={18} className="text-tropical-green flex-shrink-0 mt-0.5" variant="solid" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-base text-foreground mb-3">Chứng nhận:</h4>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-mint-white text-tropical-green text-xs font-semibold rounded-full border border-tropical-green">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-foreground">Số lượng:</span>
              <div className="flex items-center border-2 border-border rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition-colors duration-200"
                  aria-label="Decrease quantity"
                >
                  <Icon name="MinusIcon" size={16} />
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-muted transition-colors duration-200"
                  aria-label="Increase quantity"
                >
                  <Icon name="PlusIcon" size={16} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3 bg-tropical-orange text-white font-heading font-semibold rounded-full hover:shadow-organic-hover transition-all duration-300 hover:scale-105"
              >
                Thêm vào giỏ hàng
              </button>
              <a
                href="https://www.facebook.com/chinhakhoa.pinesmile"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-primary text-primary font-heading font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-center"
              >
                Mua ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}