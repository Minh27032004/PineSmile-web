'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import FilterSidebar, { FilterState } from './FilterSidebar';
import ProductComparison from './ProductComparison';
import QuickViewModal from './QuickViewModal';
import Icon from '@/components/ui/AppIcon';

interface Product {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
  badge?: string;
  features: string[];
  sustainabilityScore: number;
  priceRange: string;
  sustainabilityLevel: string;
  description: string;
  images: {url: string;alt: string;}[];
  ingredients: string[];
  certifications: string[];
  status?: 'available' | 'coming-soon';
}

export default function ProductCollectionInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [products] = useState<Product[]>([
  {
    id: 1,
    name: "Chỉ nha khoa PineSmile - Loại bình thường",
    category: "Chỉ nha khoa",
    categoryId: "floss",
    price: 35000,
    image: "/assets/images/anh1.jpg",
    alt: "Chỉ nha khoa PineSmile loại bình thường từ sợi tơ tự nhiên",
    rating: 4.8,
    reviews: 342,
    badge: "Bán chạy",
    features: ["Sợi tơ tự nhiên", "Sáp ong", "Dễ sử dụng"],
    sustainabilityScore: 9.5,
    priceRange: "0-50k",
    sustainabilityLevel: "high",
    description: "Chỉ nha khoa PineSmile loại bình thường - chất lượng cao từ sợi tơ tự nhiên với phủ sáp ong, giúp làm sạch kẽ răng hiệu quả mà không gây tổn thương nướu.",
    images: [
    { url: "/assets/images/anh1.jpg", alt: "Chỉ nha khoa PineSmile loại bình thường - chính diện" },
    { url: "/assets/images/anh1.jpg", alt: "Chỉ nha khoa PineSmile loại bình thường - chi tiết sản phẩm" },
    { url: "/assets/images/anh1.jpg", alt: "Chỉ nha khoa PineSmile loại bình thường - cách sử dụng" }],
    ingredients: ["Sợi tơ tự nhiên", "Sáp ong", "Tinh dầu tự nhiên"],
    certifications: ["Natural Silk", "Biodegradable", "Cruelty-Free"],
    status: 'available'
  },
  {
    id: 2,
    name: "Chỉ nha khoa PineSmile - Loại bạc hà",
    category: "Chỉ nha khoa",
    categoryId: "floss",
    price: 40000,
    image: "/assets/images/anh2.jpg",
    alt: "Chỉ nha khoa PineSmile loại bạc hà từ sợi tơ tự nhiên",
    rating: 4.9,
    reviews: 567,
    badge: "Mới",
    features: ["Sợi tơ tự nhiên", "Hương bạc hà", "Phân hủy sinh học"],
    sustainabilityScore: 10,
    priceRange: "0-50k",
    sustainabilityLevel: "high",
    description: "Chỉ nha khoa PineSmile loại bạc hà - với hương bạc hà tự nhiên giúp hơi thở thơm mát. Từ sợi tơ tự nhiên với sáp ong, an toàn cho nướu.",
    images: [
    { url: "/assets/images/anh2.jpg", alt: "Chỉ nha khoa PineSmile loại bạc hà - chính diện" },
    { url: "/assets/images/anh2.jpg", alt: "Chỉ nha khoa PineSmile loại bạc hà - chi tiết" }],
    ingredients: ["Sợi tơ tự nhiên", "Sáp ong", "Tinh dầu bạc hà"],
    certifications: ["Natural Silk", "Biodegradable", "Vegan"],
    status: 'available'
  },
  {
    id: 3,
    name: "Chỉ nha khoa PineSmile - Combo 2 loại",
    category: "Chỉ nha khoa",
    categoryId: "floss",
    price: 70000,
    originalPrice: 75000,
    image: "/assets/images/anh3.jpg",
    alt: "Chỉ nha khoa PineSmile combo 2 loại bình thường và bạc hà",
    rating: 4.7,
    reviews: 289,
    badge: "Tiết kiệm",
    features: ["1 loại bình thường + 1 loại bạc hà", "Sợi tơ tự nhiên", "Sáp ong"],
    sustainabilityScore: 9,
    priceRange: "50-150k",
    sustainabilityLevel: "high",
    description: "Chỉ nha khoa PineSmile combo 2 loại - gồm 1 hộp loại bình thường và 1 hộp loại bạc hà. Tiết kiệm 5,000₫ so với mua riêng lẻ. Phù hợp cho cả gia đình.",
    images: [
    { url: "/assets/images/anh3.jpg", alt: "Chỉ nha khoa PineSmile combo 2 loại - chính diện" },
    { url: "/assets/images/anh3.jpg", alt: "Chỉ nha khoa PineSmile combo 2 loại - chi tiết" }],
    ingredients: ["Sợi tơ tự nhiên", "Sáp ong", "Tinh dầu tự nhiên", "Tinh dầu bạc hà"],
    certifications: ["Natural Silk", "Biodegradable", "Combo Set"],
    status: 'available'
  },
  {
    id: 4,
    name: "Chỉ nha khoa PineSmile Silk Floss",
    category: "Chỉ nha khoa",
    categoryId: "floss",
    price: 59000,
    image: "https://images.unsplash.com/photo-1486411820687-7684fa9efa54",
    alt: "Chỉ nha khoa PineSmile Silk Floss đang phát triển",
    rating: 0,
    reviews: 0,
    badge: "Đang phát triển",
    features: ["Sợi tơ tự nhiên", "Hương bạc hà nhẹ", "Không gây kích ứng"],
    sustainabilityScore: 0,
    priceRange: "0-50k",
    sustainabilityLevel: "medium",
    description: "Sản phẩm này đang trong quá trình phát triển. Chúng tôi sẽ sớm giới thiệu chỉ nha khoa cao cấp từ sợi tơ tự nhiên.",
    images: [
    { url: "https://images.unsplash.com/photo-1683724709592-7d0c0f00d341", alt: "Chỉ nha khoa - đang phát triển" }],
    ingredients: ["Sợi tơ tự nhiên", "Sáp ong", "Tinh dầu bạc hà"],
    certifications: ["Natural Silk", "Biodegradable", "Cruelty-Free"],
    status: 'coming-soon'
  },
  {
    id: 5,
    name: "Bộ kit PineSmile Complete Care",
    category: "Bộ sản phẩm",
    categoryId: "kit",
    price: 399000,
    originalPrice: 549000,
    image: "https://images.unsplash.com/photo-1588917827619-ae6651f70ae6",
    alt: "Bộ kit PineSmile Complete Care đang phát triển",
    rating: 0,
    reviews: 0,
    badge: "Đang phát triển",
    features: ["Bộ đầy đủ", "Tiết kiệm", "Hộp quà tặng"],
    sustainabilityScore: 0,
    priceRange: "250-500k",
    sustainabilityLevel: "high",
    description: "Sản phẩm này đang trong quá trình phát triển. Chúng tôi sẽ sớm giới thiệu bộ chăm sóc răng miệng hoàn chỉnh.",
    images: [
    { url: "https://images.unsplash.com/photo-1561328635-c1c6ad1753b0", alt: "Bộ sản phẩm - đang phát triển" }],
    ingredients: ["Tất cả sản phẩm PineSmile"],
    certifications: ["Complete Set", "Gift Ready", "Eco-Packaging"],
    status: 'coming-soon'
  },
  {
    id: 6,
    name: "Kem đánh răng PineSmile Sensitive Care",
    category: "Kem đánh răng",
    categoryId: "toothpaste",
    price: 199000,
    image: "https://images.unsplash.com/photo-1634984766806-7511c88ecc32",
    alt: "Kem đánh răng PineSmile Sensitive Care đang phát triển",
    rating: 0,
    reviews: 0,
    badge: "Đang phát triển",
    features: ["Cho răng nhạy cảm", "Giảm ê buốt", "Bảo vệ men răng"],
    sustainabilityScore: 0,
    priceRange: "150-250k",
    sustainabilityLevel: "high",
    description: "Sản phẩm này đang trong quá trình phát triển. Chúng tôi sẽ sớm giới thiệu kem đánh răng chuyên biệt cho răng nhạy cảm.",
    images: [
    { url: "https://images.unsplash.com/photo-1612705166160-97d3b2e8e212", alt: "Kem đánh răng sensitive - đang phát triển" }],
    ingredients: ["Chiết xuất lá dứa", "Potassium nitrate", "Fluoride", "Aloe vera"],
    certifications: ["Dentist Recommended", "Sensitive Formula", "Natural"],
    status: 'coming-soon'
  }]
  );

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [comparisonProducts, setComparisonProducts] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const filterCategories = [
  { id: 'toothpaste', label: 'Kem đánh răng', count: 0 },
  { id: 'toothbrush', label: 'Bàn chải', count: 0 },
  { id: 'mouthwash', label: 'Nước súc miệng', count: 0 },
  { id: 'floss', label: 'Chỉ nha khoa', count: 3 },
  { id: 'kit', label: 'Bộ sản phẩm', count: 0 }];


  const priceRanges = [
  { id: '0-50k', label: 'Dưới 50.000₫', count: 2 },
  { id: '50-150k', label: '50.000₫ - 150.000₫', count: 1 },
  { id: '150-250k', label: '150.000₫ - 250.000₫', count: 0 },
  { id: '250-500k', label: '250.000₫ - 500.000₫', count: 0 }];


  const sustainabilityLevels = [
  { id: 'high', label: 'Cao (9-10)', count: 3 },
  { id: 'medium', label: 'Trung bình (7-8)', count: 0 }];


  const handleFilterChange = useCallback((filters: FilterState) => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.categoryId));
    }

    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter((p) => filters.priceRanges.includes(p.priceRange));
    }

    if (filters.sustainabilityLevels.length > 0) {
      filtered = filtered.filter((p) => filters.sustainabilityLevels.includes(p.sustainabilityLevel));
    }

    if (filters.minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.minRating);
    }

    setFilteredProducts(filtered);
  }, [products]);

  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    let sorted = [...filteredProducts];

    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'sustainability':
        sorted.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  }, [filteredProducts]);

  const toggleComparison = (productId: number) => {
    setComparisonProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const handleAddToCart = (productId: number) => {
    console.log('Added to cart:', productId);
  };

  const handleQuickView = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setQuickViewProduct(product);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="h-96 animate-pulse bg-muted rounded"></div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Bộ sưu tập sản phẩm PineSmile
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Khám phá dòng sản phẩm chăm sóc răng miệng từ chiết xuất lá dứa tự nhiên - Hiệu quả vượt trội, thân thiện môi trường
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white rounded-lg shadow-organic p-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-sm text-text-secondary whitespace-nowrap">
              Hiển thị {filteredProducts.length} sản phẩm
            </span>
            {comparisonProducts.length > 0 &&
            <button
              onClick={() => setShowComparison(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full hover:bg-tropical-green transition-colors duration-300">

                <Icon name="ScaleIcon" size={18} />
                <span className="text-sm font-semibold">So sánh ({comparisonProducts.length})</span>
              </button>
            }
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-muted rounded-full p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`
                }
                aria-label="Grid view">

                <Icon name="Squares2X2Icon" size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`
                }
                aria-label="List view">

                <Icon name="ListBulletIcon" size={20} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border-2 border-border rounded-full bg-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">

              <option value="featured">Nổi bật</option>
              <option value="price-low">Giá: Thấp đến cao</option>
              <option value="price-high">Giá: Cao đến thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="sustainability">Bền vững nhất</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={filterCategories}
              priceRanges={priceRanges}
              sustainabilityLevels={sustainabilityLevels}
              onFilterChange={handleFilterChange} />

          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ?
            <div className="text-center py-16">
                <Icon name="FaceFrownIcon" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-text-secondary">
                  Vui lòng thử điều chỉnh bộ lọc của bạn
                </p>
              </div> :

            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredProducts.map((product) =>
              <div key={product.id} className="relative">
                    <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView} />

                    <button
                  onClick={() => toggleComparison(product.id)}
                  className={`absolute top-4 left-4 p-2 rounded-full shadow-md transition-all duration-300 ${
                  comparisonProducts.includes(product.id) ?
                  'bg-primary text-white' : 'bg-white text-foreground hover:bg-primary hover:text-white'}`
                  }
                  aria-label="Add to comparison">

                      <Icon name="ScaleIcon" size={18} />
                    </button>
                  </div>
              )}
              </div>
            }
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {showComparison && comparisonProducts.length > 0 &&
      <ProductComparison
        products={products.filter((p) => comparisonProducts.includes(p.id)).map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image,
          alt: p.alt,
          price: p.price,
          rating: p.rating,
          sustainabilityScore: p.sustainabilityScore,
          features: [
          { label: 'Danh mục', value: p.category },
          { label: 'Đánh giá', value: `${p.rating}/5` },
          { label: 'Lượt đánh giá', value: p.reviews.toString() },
          { label: 'Điểm bền vững', value: `${p.sustainabilityScore}/10`, highlight: true },
          ...p.features.map((f) => ({ label: 'Tính năng', value: f }))]

        }))}
        onClose={() => setShowComparison(false)} />

      }

      {/* Quick View Modal */}
      {quickViewProduct &&
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(id, qty) => console.log('Add to cart:', id, qty)} />

      }
    </div>);

}