'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ComparisonProduct {
  id: number;
  name: string;
  image: string;
  alt: string;
  price: number;
  rating: number;
  sustainabilityScore: number;
  features: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
}

interface ProductComparisonProps {
  products: ComparisonProduct[];
  onClose: () => void;
}

export default function ProductComparison({ products, onClose }: ProductComparisonProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-6xl w-full">
          <div className="h-96 animate-pulse bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-bold text-2xl text-foreground">So sánh sản phẩm</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
            aria-label="Close comparison"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-mint-white">
                <th className="p-4 text-left font-heading font-semibold text-foreground sticky left-0 bg-mint-white z-10">
                  Đặc điểm
                </th>
                {products.map(product => (
                  <th key={product.id} className="p-4 min-w-64">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-white">
                        <AppImage
                          src={product.image}
                          alt={product.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-heading font-semibold text-base text-center">{product.name}</h3>
                      <div className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString('vi-VN')}₫
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Rating Row */}
              <tr className="border-b border-border hover:bg-mint-white transition-colors duration-200">
                <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white">
                  Đánh giá
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, index) => (
                        <Icon
                          key={index}
                          name="StarIcon"
                          size={16}
                          variant={index < Math.floor(product.rating) ? 'solid' : 'outline'}
                          className={index < Math.floor(product.rating) ? 'text-tropical-yellow' : 'text-gray-300'}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold">{product.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Sustainability Score Row */}
              <tr className="border-b border-border hover:bg-mint-white transition-colors duration-200">
                <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white">
                  Điểm bền vững
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="SparklesIcon" size={20} className="text-tropical-green" variant="solid" />
                      <span className="text-lg font-bold text-tropical-green">{product.sustainabilityScore}/10</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Feature Rows */}
              {products[0].features.map((_, featureIndex) => (
                <tr key={featureIndex} className="border-b border-border hover:bg-mint-white transition-colors duration-200">
                  <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white">
                    {products[0].features[featureIndex].label}
                  </td>
                  {products.map(product => {
                    const feature = product.features[featureIndex];
                    return (
                      <td key={product.id} className="p-4 text-center">
                        <span className={`${feature.highlight ? 'text-tropical-green font-semibold' : 'text-text-secondary'}`}>
                          {feature.value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 bg-mint-white flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-white border-2 border-primary text-primary font-heading font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}