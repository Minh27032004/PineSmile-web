'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  alt: string;
  verified: boolean;
}

interface TestimonialCarouselProps {
  className?: string;
}

const TestimonialCarousel = ({ className = '' }: TestimonialCarouselProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Bác Sĩ Nguyễn Thị Mai',
    role: 'Nha Sĩ Trưởng',
    location: 'Phòng Khám Nha Khoa Smile, Hà Nội',
    rating: 5,
    comment: 'Tôi đã khuyên dùng PineSmile cho hơn 500 bệnh nhân trong 6 tháng qua. Kết quả lâm sàng vượt xa mong đợi - răng trắng sáng tự nhiên, nướu khỏe mạnh, và quan trọng nhất là không có tác dụng phụ. Đây là bước đột phá trong nha khoa bền vững.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_192f25304-1767786255269.png",
    alt: 'Vietnamese female dentist in white coat smiling confidently in modern dental clinic with green plants',
    verified: true
  },
  {
    id: 2,
    name: 'Anh Trần Minh Tuấn',
    role: 'Kỹ Sư Phần Mềm',
    location: 'TP. Hồ Chí Minh',
    rating: 5,
    comment: 'Là người quan tâm đến môi trường, tôi đã thử nhiều sản phẩm nha khoa "xanh" nhưng không hài lòng về hiệu quả. PineSmile hoàn toàn khác biệt - vừa thân thiện môi trường vừa hiệu quả cao. Sau 3 tuần sử dụng, răng tôi trắng hơn rõ rệt và hơi thở luôn thơm mát.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d8aed28d-1763294966598.png",
    alt: 'Young Vietnamese man in casual blue shirt smiling with bright white teeth in modern office setting',
    verified: true
  },
  {
    id: 3,
    name: 'Chị Phạm Lan Anh',
    role: 'Giáo Viên Tiểu Học',
    location: 'Đà Nẵng',
    rating: 5,
    comment: 'Cả gia đình tôi đều dùng PineSmile được 4 tháng. Con trai 8 tuổi của tôi trước đây rất ngại đánh răng, nhưng giờ thích thú với hương vị tự nhiên của PineSmile. Tôi yên tâm vì không có hóa chất độc hại, và răng các con luôn sạch sẽ, khỏe mạnh.',
    image: "https://images.unsplash.com/photo-1646388468874-6f0f5e9faf95",
    alt: 'Vietnamese mother and young son brushing teeth together with eco-friendly toothbrushes in bright bathroom',
    verified: true
  },
  {
    id: 4,
    name: 'Ông Lê Văn Hùng',
    role: 'Chủ Doanh Nghiệp',
    location: 'Cần Thơ',
    rating: 5,
    comment: 'Ở tuổi 55, tôi gặp nhiều vấn đề về nướu nhạy cảm. Các sản phẩm thông thường gây kích ứng và chảy máu nướu. PineSmile đã thay đổi hoàn toàn - nướu không còn sưng đỏ, răng chắc khỏe hơn. Tôi rất ấn tượng với cam kết bền vững của thương hiệu.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1741f16a9-1763300317694.png",
    alt: 'Middle-aged Vietnamese businessman in navy suit smiling confidently showing healthy white teeth',
    verified: true
  }];


  useEffect(() => {
    if (!isHydrated) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHydrated, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isHydrated) {
    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              Khách Hàng Nói Gì Về PineSmile
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Hơn 50.000 khách hàng Việt Nam đã tin dùng và yêu thích PineSmile
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-organic p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <AppImage
                    src={testimonials[0].image}
                    alt={testimonials[0].alt}
                    fill
                    className="object-cover" />

                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) =>
                  <Icon key={i} name="StarIcon" size={20} className="text-tropical-yellow" variant="solid" />
                  )}
                </div>
                <p className="text-text-secondary text-lg mb-4 italic">
                  "{testimonials[0].comment}"
                </p>
                <div>
                  <h4 className="font-heading font-semibold text-xl text-foreground">
                    {testimonials[0].name}
                  </h4>
                  <p className="text-text-secondary">{testimonials[0].role}</p>
                  <p className="text-text-secondary text-sm">{testimonials[0].location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>);

  }

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Khách Hàng Nói Gì Về PineSmile
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Hơn 50.000 khách hàng Việt Nam đã tin dùng và yêu thích PineSmile
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-card rounded-2xl shadow-organic p-8 md:p-12">
            {testimonials.map((testimonial, index) =>
            <div
              key={testimonial.id}
              className={`transition-all duration-500 ${
              index === currentIndex ?
              'opacity-100 block' : 'opacity-0 hidden'}`
              }>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-tropical-green/20">
                      <AppImage
                      src={testimonial.image}
                      alt={testimonial.alt}
                      fill
                      className="object-cover" />

                      {testimonial.verified &&
                    <div className="absolute bottom-0 right-0 w-10 h-10 bg-tropical-green rounded-full flex items-center justify-center ring-4 ring-white">
                          <Icon name="CheckBadgeIcon" size={24} className="text-white" variant="solid" />
                        </div>
                    }
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Rating */}
                    <div className="flex items-center justify-center md:justify-start mb-4">
                      {[...Array(testimonial.rating)].map((_, i) =>
                    <Icon key={i} name="StarIcon" size={20} className="text-tropical-yellow" variant="solid" />
                    )}
                    </div>

                    {/* Comment */}
                    <p className="text-text-secondary text-lg mb-6 italic leading-relaxed">
                      "{testimonial.comment}"
                    </p>

                    {/* Author Info */}
                    <div>
                      <h4 className="font-heading font-semibold text-xl text-foreground mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-tropical-green font-medium">{testimonial.role}</p>
                      <p className="text-text-secondary text-sm flex items-center justify-center md:justify-start mt-1">
                        <Icon name="MapPinIcon" size={16} className="mr-1" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-white shadow-organic hover:shadow-organic-hover transition-all duration-300 flex items-center justify-center"
            aria-label="Previous testimonial">

            <Icon name="ChevronLeftIcon" size={24} className="text-tropical-green" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-white shadow-organic hover:shadow-organic-hover transition-all duration-300 flex items-center justify-center"
            aria-label="Next testimonial">

            <Icon name="ChevronRightIcon" size={24} className="text-tropical-green" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          {testimonials.map((_, index) =>
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
            index === currentIndex ?
            'w-12 h-3 bg-tropical-green' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'}`
            }
            aria-label={`Go to testimonial ${index + 1}`} />

          )}
        </div>
      </div>
    </section>);

};

export default TestimonialCarousel;