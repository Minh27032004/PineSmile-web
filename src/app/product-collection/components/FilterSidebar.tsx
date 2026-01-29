'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  priceRanges: FilterOption[];
  sustainabilityLevels: FilterOption[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  priceRanges: string[];
  sustainabilityLevels: string[];
  minRating: number;
}

export default function FilterSidebar({
  categories,
  priceRanges,
  sustainabilityLevels,
  onFilterChange
}: FilterSidebarProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRanges: [],
    sustainabilityLevels: [],
    minRating: 0
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      onFilterChange(filters);
    }
  }, [filters, isHydrated, onFilterChange]);

  const toggleFilter = (type: keyof Omit<FilterState, 'minRating'>, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRanges: [],
      sustainabilityLevels: [],
      minRating: 0
    });
  };

  const FilterSection = ({ title, options, type }: { 
    title: string; 
    options: FilterOption[]; 
    type: keyof Omit<FilterState, 'minRating'>;
  }) => (
    <div className="mb-6">
      <h3 className="font-heading font-semibold text-base text-foreground mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters[type].includes(option.id)}
              onChange={() => toggleFilter(type, option.id)}
              className="w-4 h-4 rounded border-2 border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-text-secondary group-hover:text-primary transition-colors duration-200">
              {option.label} ({option.count})
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  const sidebarContent = (
    <div className="bg-white rounded-lg shadow-organic p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-foreground">Bộ lọc</h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-primary hover:text-tropical-green transition-colors duration-200"
        >
          Xóa tất cả
        </button>
      </div>

      {/* Categories */}
      <FilterSection title="Danh mục" options={categories} type="categories" />

      {/* Price Range */}
      <FilterSection title="Khoảng giá" options={priceRanges} type="priceRanges" />

      {/* Sustainability */}
      <FilterSection title="Mức độ bền vững" options={sustainabilityLevels} type="sustainabilityLevels" />

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="font-heading font-semibold text-base text-foreground mb-3">Đánh giá tối thiểu</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                className="w-4 h-4 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Icon
                    key={index}
                    name="StarIcon"
                    size={14}
                    variant={index < rating ? 'solid' : 'outline'}
                    className={index < rating ? 'text-tropical-yellow' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-text-secondary ml-1">& lên</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isHydrated) {
    return (
      <div className="bg-white rounded-lg shadow-organic p-6">
        <div className="h-96 animate-pulse bg-muted rounded"></div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-24">
        {sidebarContent}
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-tropical-green transition-colors duration-300"
        >
          <Icon name="AdjustmentsHorizontalIcon" size={20} />
          <span className="font-semibold">Bộ lọc</span>
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-background overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-xl text-foreground">Bộ lọc</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}