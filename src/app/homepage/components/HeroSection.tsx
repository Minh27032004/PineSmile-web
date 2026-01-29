'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const heroSlides = [
  {
    id: 1,
    title: 'Revolutionary Dental Care',
    subtitle: 'That Loves Your Teeth and the Planet',
    description: 'Khám phá sản phẩm chăm sóc răng miệng từ lá dứa - Kết hợp hoàn hảo giữa khoa học nha khoa tiên tiến và trách nhiệm môi trường',
    image: "https://images.unsplash.com/photo-1683412375248-d80a140375c8",
    alt: 'Close-up of fresh green pineapple leaves with water droplets in natural sunlight',
    cta: 'Khám Phá Ngay',
    ctaLink: '/product-collection'
  },
  {
    id: 2,
    title: 'Where Tropical Innovation',
    subtitle: 'Meets Dental Excellence',
    description: 'Biến phế phẩm nông nghiệp thành sản phẩm nha khoa cao cấp - Hiệu quả đã được chứng minh lâm sàng',
    image: "https://images.unsplash.com/photo-1646388593375-07df6a744519",
    alt: 'Smiling Vietnamese woman with bright white teeth holding eco-friendly toothbrush in modern bathroom',
    cta: 'Tìm Hiểu Thêm',
    ctaLink: '/about'
  },
  {
    id: 3,
    title: 'Proven Effectiveness',
    subtitle: 'Natural Ingredients, Zero Compromise',
    description: 'Được các nha sĩ Việt Nam tin dùng và khuyên dùng - An toàn cho cả gia đình',
    image: "https://images.unsplash.com/photo-1606787364410-947e10173148",
    alt: 'Happy Vietnamese family of four brushing teeth together in bright modern bathroom',
    cta: 'Xem Sản Phẩm',
    ctaLink: '/product-collection'
  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHydrated, heroSlides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  if (!isHydrated) {
    return (
      <section className={`relative h-screen bg-gradient-to-br from-tropical-green to-forest-green ${className}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6">
              Revolutionary Dental Care
            </h1>
            <p className="font-heading font-semibold text-3xl md:text-4xl mb-8">
              That Loves Your Teeth and the Planet
            </p>
            <p className="text-lg md:text-xl mb-8 text-mint-white">
              Khám phá sản phẩm chăm sóc răng miệng từ lá dứa - Kết hợp hoàn hảo giữa khoa học nha khoa tiên tiến và trách nhiệm môi trường
            </p>
          </div>
        </div>
      </section>);

  }

  return (
    <section className={`relative h-screen overflow-hidden ${className}`}>
      {/* Background Slides */}
      {heroSlides.map((slide, index) =>
      <div
        key={slide.id}
        className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? 'opacity-100' : 'opacity-0'}`
        }>

          <AppImage
          src={slide.image}
          alt={slide.alt}
          fill
          className="object-cover"
          priority={index === 0} />

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          {heroSlides.map((slide, index) =>
          <div
            key={slide.id}
            className={`transition-all duration-700 ${
            index === currentSlide ?
            'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 absolute'}`
            }>

              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="font-heading font-semibold text-3xl md:text-4xl mb-6 text-tropical-yellow">
                {slide.subtitle}
              </p>
              <p className="text-lg md:text-xl mb-8 text-mint-white max-w-2xl">
                {slide.description}
              </p>
              <Link
              href={slide.ctaLink}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-tropical-orange text-white font-heading font-semibold text-lg rounded-full hover:shadow-organic-hover transition-all duration-300 hover:scale-105">

                <span>{slide.cta}</span>
                <Icon name="ArrowRightIcon" size={20} variant="solid" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-4">
        {/* Prev Button */}
        <button
          onClick={handlePrevSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
          aria-label="Previous slide">

          <Icon name="ChevronLeftIcon" size={24} className="text-white" />
        </button>

        {/* Dots */}
        <div className="flex space-x-2">
          {heroSlides.map((_, index) =>
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
            index === currentSlide ?
            'w-12 h-3 bg-tropical-yellow' : 'w-3 h-3 bg-white/50 hover:bg-white/70'}`
            }
            aria-label={`Go to slide ${index + 1}`} />

          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
          aria-label="Next slide">

          <Icon name="ChevronRightIcon" size={24} className="text-white" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 animate-bounce">
        <Icon name="ChevronDownIcon" size={32} className="text-white" />
      </div>
    </section>);

};

export default HeroSection;